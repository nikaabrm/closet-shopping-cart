import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import {  Options } from '@angular-slider/ngx-slider';
import { CategoriesService } from '../categories/categories.service';
import { ProductsListService } from './products-list.service';
import {
  GetProductsParams,
  ProductListPageType,
  SortOrder,
  type Product,
} from '../models/product.model';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSelectChange } from '@angular/material/select';
import { MatCheckboxChange } from '@angular/material/checkbox';

@Component({
  selector: 'app-products-list',
  standalone: false,
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.scss',
})
export class ProductsListComponent implements OnInit {
  private _favoritedItemIds: number[] = [];
  
  @Input() set favoritedItemIds(ids: number[] | undefined) {
    if (ids) {
      this._favoritedItemIds = ids;
      if (this.pageType === ProductListPageType.FAVORITE) {
        this.loadProducts(undefined, ids);
      }
    }
  }
  get favoritedItemIds(): number[] {
    return this._favoritedItemIds;
  }

  @Input() pageType: ProductListPageType = ProductListPageType.PRODUCT;
  @Output() favoriteRemoved = new EventEmitter<number>();

  @ViewChild('paginator') paginator!: MatPaginator;

  sortOptions: { value: string; viewValue: string }[] = [
    { value: 'asc', viewValue: 'Price Up' },
    { value: 'desc', viewValue: 'Price Down' },
  ];

  products: Product[] = [];
  filteredProducts: Product[] | null = null;
  paginatedProducts: Product[] = [];

  itemsPerPage = 10;
  currentPage = 1;
  totalPages = 0;

  minPrice: number = 0;
  maxPrice: number = 1000;
  selectedCategories: string[] = [];
  availableCategories: string[] = [];

  options: Options = {
    floor: 0,
    ceil: 1000,
  };

  constructor(
    private categoriesService: CategoriesService,
    private productsListService: ProductsListService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
  
  }

  ngOnInit() {
    // First get the categories
    this.categoriesService.getAllCategories().subscribe(categories => {
      this.availableCategories = categories;

      // Then check URL parameters and initialize selected categories
      this.route.queryParams.subscribe(params => {
        const categoryParam = params['category'];
        if (categoryParam) {
          // Split the category parameter by comma to get all selected categories
          const categories = categoryParam.split(',');
          // Only include categories that exist in availableCategories
          this.selectedCategories = categories.filter((cat: string) => this.availableCategories.includes(cat));
        } else {
          this.selectedCategories = [];
        }
        
        // Load products with current favorite IDs if on favorites page
        if (this.pageType === ProductListPageType.FAVORITE) {
          this.loadProducts(undefined, this.favoritedItemIds);
        } else {
          this.loadProducts();
        }
      });
    });
  }

  get paginatorItemsLength() {
    return this.filteredProducts
      ? this.filteredProducts.length
      : this.products.length;
  }

  loadProducts(params?: GetProductsParams, favoriteItemIds?: number[]) {
    this.products = [];
    this.productsListService.getAllProducts(params).subscribe((res) => {
      // We ar cehcking if page type is favorite
      // if yes we need to filter data based on favorited items which we have in localstorage
      const isFavoritesPage = this.pageType === ProductListPageType.FAVORITE;
      const filteredResponse = isFavoritesPage
        ? res.filter((item) => (favoriteItemIds || []).includes(item.id))
        : res;

      this.products = filteredResponse;
      this.totalPages = Math.ceil(this.products.length / this.itemsPerPage);
      this.filterProducts();
      this.updatePagination();
    });
  }

  sortChanged(event: MatSelectChange) {
    const sortOrder = event.value as SortOrder;
    this.loadProducts({ sort: sortOrder });
  }

  updatePagination() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const data = this.filteredProducts ? this.filteredProducts : this.products;

    this.paginatedProducts = data.slice(
      startIndex,
      startIndex + this.itemsPerPage
    );
  }

  resetPagination() {
    this.paginator.firstPage();

    this.currentPage = 1;

    const data = this.filteredProducts ? this.filteredProducts : this.products;

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

  pageChanged(event: PageEvent) {
    console
    if (event.previousPageIndex! > event.pageIndex) {
      this.prevPage();
    } else {
      this.nextPage();
    }
  }

  priceValuesChanged(event:{value: number; highValue?: number }) {
    this.minPrice = event.value!;
    this.maxPrice = event.highValue!;
    this.filterProducts();
  }

  categoriesChanged(event: MatCheckboxChange,categoryName:string){
    console.log(event);

    const categoryIndex = this.selectedCategories.indexOf(categoryName);
    
    if (categoryIndex > -1) {
      if (!event.checked) {
        this.selectedCategories.splice(categoryIndex, 1);
      }
    } else {
      if (event.checked) {
        this.selectedCategories.push(categoryName);
      }
    }

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        category: this.selectedCategories.length ? this.selectedCategories.join(',') : null
      },
      queryParamsHandling: 'merge'
    });

    this.filterProducts();
  }

  filterProducts() {
    this.paginatedProducts = [];
    this.filteredProducts = [];

    let copiedProducts: Product[] = [...this.products];

    if (this.selectedCategories?.length) {
      copiedProducts = copiedProducts.filter((product) =>
        this.selectedCategories.find(
          (category) => category === product.category
        )
      );
    }

    copiedProducts = copiedProducts.filter(
      (item) => item.price >= this.minPrice && item.price <= this.maxPrice
    );

    this.filteredProducts = copiedProducts;
    this.resetPagination();
    this.updatePagination();
  }

  productItemClicked(id: number) {
    this.router.navigate(['detailed', id]);
  }

  handleFavoriteRemoved(id: number) {
    this.favoriteRemoved.emit(id);
  }
}
