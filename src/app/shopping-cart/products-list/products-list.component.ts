import { Component, model } from '@angular/core';
import { Options } from '@angular-slider/ngx-slider';
import { CategoriesService } from '../categories/categories.service';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
  FormArray,
  AbstractControl,
} from '@angular/forms';
import { ProductsListService } from './products-list.service';

@Component({
  selector: 'app-products-list',
  standalone: false,
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.scss',
})
export class ProductsListComponent {
  productsFilterForm!: FormGroup;
  categoriesFormGroupControls: string[] = [];
  // Original array of products
  products: {
    category: string;
    description: string;
    id: number;
    image: string;
    price: number;
    rating: { rate: number; count: number };
    title: string;
  }[] = [];

  // filteredProducts aq chemtvis mqodne ssul da fasis shedarebebze aq vyaro da amit mivamarto mere
  filteredProducts: {
    category: string;
    description: string;
    id: number;
    image: string;
    price: number;
    rating: { rate: number; count: number };
    title: string;
  }[] = [];

   chosenCategorieItems: {
    category: string;
    description: string;
    id: number;
    image: string;
    price: number;
    rating: { rate: number; count: number };
    title: string;
  }[] = [];

  // Page products
  // This will be generated dynamically based on page
  paginatedProducts: {
    category: string;
    description: string;
    id: number;
    image: string;
    price: number;
    rating: { rate: number; count: number };
    title: string;
  }[] = [];

  // Pagination items, wE do not supports pages
  // And required to do with fetched data
  itemsPerPage = 10;
  currentPage = 1;
  totalPages = 0;

  isFavorite = false;
  minPrice: number = 0;
  maxPrice: number = 120;

  options: Options = {
    floor: 0,
    ceil: 300,
  };

  constructor(
    private categoriesService: CategoriesService,
    private productsListService: ProductsListService,
    private fb: FormBuilder
  ) {
    this.productsFilterForm = this.fb.group({
      priceMin: ['', Validators.required],
      priceMax: ['', Validators.required],
      categories: this.fb.group({}),
    });

    this.categoriesService.getAllCategories().subscribe((res) => {
      const categoriesFormGroup = this.productsFilterForm.get(
        'categories'
      ) as FormGroup;

      res.forEach((item, i) => {
        categoriesFormGroup.addControl(item, new FormControl(''));
      });

      this.categoriesFormGroupControls = Object.keys(
        categoriesFormGroup.controls
      );
    });

    this.productsListService.getAllProducts().subscribe((res) => {
      this.products = res; // Assuming API returns an array of 20 items
      this.totalPages = Math.ceil(this.products.length / this.itemsPerPage);

      this.updatePagination();
    });
  }

  get paginatorItemsLength() {
    return this.filteredProducts.length
      ? this.filteredProducts.length
      : this.products.length;
  }

  updatePagination() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const data = this.filteredProducts?.length
      ? this.filteredProducts
      : this.products;
    this.paginatedProducts = data.slice(
      startIndex,
      startIndex + this.itemsPerPage
    );
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

  SliderValueChanged(event: any) {
    this.minPrice = event.value;
    this.maxPrice = event.highValue;
    this.productsFilterForm.controls['priceMin'].setValue(this.minPrice);
    this.productsFilterForm.controls['priceMax'].setValue(this.maxPrice);
  }








  matCheckboxChanged(event: any) {
    this.filteredProducts  = [];

    const chosenCategoryNames = Object.entries(this.productsFilterForm.value.categories)
    .filter(([key, value]) => value)
    .map(([key]) => key);


    chosenCategoryNames.forEach((name) => {
      this.products.filter((item) => item.category === name).map(
        item => {
            this.filteredProducts.push(item);
        }
      );
    });

    this.updatePagination();
  }












  Favorite() {
    this.isFavorite = !this.isFavorite;
  }

  foods: { value: string; viewValue: string }[] = [
    { value: 'priceUp', viewValue: 'Price Up' },
    { value: 'priceDown', viewValue: 'Price Down' },
  ];

  p: number = 1;
  collection: any[] = ['1', '232', '23'];
}
