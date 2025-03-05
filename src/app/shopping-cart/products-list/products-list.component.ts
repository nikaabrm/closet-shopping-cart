import { Component, EventEmitter, Input, model, Output, ViewChild } from '@angular/core';
import { Options } from '@angular-slider/ngx-slider';
import { CategoriesService } from '../categories/categories.service';
import { ProductsListService } from './products-list.service';
import { GetProductsParams, ProductListPageType, SortOrder, type Product } from '../models/product.model'
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products-list',
  standalone: false,
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.scss',
})
export class ProductsListComponent {
  @Input() set favoritedItemIds(ids:number[]){
      this.filteredProducts = null;
      this.paginatedProducts = [];
      this.loadProducts(undefined,ids);
      
  }
  
  @Input() pageType:ProductListPageType = ProductListPageType.PRODUCT;
  @Output() favoriteRemoved =  new EventEmitter<number>();


  @ViewChild('paginator') paginator!: MatPaginator
  
  sortOptions: { value: string; viewValue: string }[] = [
    { value: 'asc', viewValue: 'Price Up' },
    { value: 'desc', viewValue: 'Price Down' },
  ];


  // Original array of products
  products: Product[] = [];

  filteredProducts: Product[] | null = null;

  // Page products
  // This will be generated dynamically based on page
  paginatedProducts: Product[] = [];

  // Pagination items, wE do not supports pages
  // And required to do with fetched data
  itemsPerPage = 10;
  currentPage = 1;
  totalPages = 0;

  minPrice: number = 0;
  maxPrice: number = 1000;
  selectedCategories:string[] = [];
  availableCategories:string[] = [];

  options: Options = {
    floor: 0,
    ceil: 1000,
  };

  constructor(
    private categoriesService: CategoriesService,
    private productsListService: ProductsListService,
    private router: Router
  ) {
   

    this.categoriesService.getAllCategories().subscribe((res) => {
      this.availableCategories = res;
    });

    this.loadProducts()
  }

  get paginatorItemsLength() {
    return this.filteredProducts
      ? this.filteredProducts.length
      : this.products.length;
  }

  loadProducts(params?:GetProductsParams,favoriteItemIds?:number[]){
    this.products = []
    this.productsListService.getAllProducts(params).subscribe((res) => {

      // We ar cehcking if page type is favorite
      // if yes we need to filter data based on favorited items which we have in localstorage
      const isFavoritesPage = this.pageType === ProductListPageType.FAVORITE;
      const filteredResponse = isFavoritesPage  ? res.filter(item => (favoriteItemIds || []).includes(item.id)) : res;

      this.products = filteredResponse; 
      this.totalPages = Math.ceil(this.products.length / this.itemsPerPage);
      this.filterProducts()
      this.updatePagination();
    });
  }

  sortChanged(event:any){
    const sortOrder = event.value as SortOrder;
    this.loadProducts({sort:sortOrder})
  }

  updatePagination() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const data = this.filteredProducts
      ? this.filteredProducts
      : this.products;

    this.paginatedProducts = data.slice(
      startIndex,
      startIndex + this.itemsPerPage
    );
  }

  resetPagination(){
    this.paginator.firstPage();

    this.currentPage = 1;

    const data = this.filteredProducts
    ? this.filteredProducts
    : this.products;

    this.totalPages = Math.ceil(data.length / this.itemsPerPage);
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePagination();
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePagination();
    }
  }

  navigateOnExactPage(pageNumber: number) {
    this.currentPage = pageNumber;
    this.updatePagination();
  }

  pageChanged(event: any) {
    if (event.previousPageIndex > event.pageIndex) {
      this.prevPage();
    } else {
      this.nextPage();
    }
  }


priceValuesChanged(event: any) {
    this.minPrice = event.value;
    this.maxPrice = event.highValue;
   this.filterProducts()  
  }

  categoriesChanged(event:any,categoryName:string){
    const categoryItem = this.selectedCategories.find(category => category === categoryName);

    if(categoryItem){
      const categoryIndex = this.selectedCategories.indexOf(categoryName);
      this.selectedCategories.splice(categoryIndex,1)
    }else{
      this.selectedCategories.push(categoryName)
    }


    this.filterProducts();
  }

  filterProducts(){
    this.paginatedProducts = []
    this.filteredProducts = [];
  
    let copiedProducts:Product[] =[...this.products];

    if(this.selectedCategories?.length){
      copiedProducts = copiedProducts.filter(product => this.selectedCategories.find(category=> category === product.category))
    }

    copiedProducts = copiedProducts.filter(item => item.price >= this.minPrice && item.price <= this.maxPrice);

    console.log(copiedProducts,'===')
    this.filteredProducts = copiedProducts
    this.resetPagination();
    this.updatePagination();

  }


  productItemClicked(id:number){
    this.router.navigate(['detailed', id]);
  }

  handleFavoriteRemoved(id:number){
    this.favoriteRemoved.emit(id)
  }

}
