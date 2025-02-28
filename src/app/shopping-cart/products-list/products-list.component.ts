import { Component, model } from '@angular/core';
import { Options } from '@angular-slider/ngx-slider';
import { CategoriesService } from '../categories/categories.service';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
  FormArray,
} from '@angular/forms';
@Component({
  selector: 'app-products-list',
  standalone: false,
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.scss',
})
export class ProductsListComponent {
  productsFilterForm!: FormGroup;
  categoryNames: string[] = [];
  isReady = false;
  minPrice: number = 20;
  maxPrice: number = 120;

  options: Options = {
    floor: 0,
    ceil: 300,
  };

  readonly indeterminate = model(false);

  constructor(
    private categoriesService: CategoriesService,
    private fb: FormBuilder
  ) {
    this.productsFilterForm = this.fb.group({
      priceMin: ['', Validators.required],
      priceMax: ['', Validators.required],
      categories: this.fb.array([]),
    });

    this.categoriesService.getAllCategories().subscribe((res) => {
      const categoriesFormArr = this.productsFilterForm.get(
        'categories'
      ) as FormArray;

      this.categoryNames = res;

      res.forEach((item, i) => {
        categoriesFormArr.push(new FormControl(item));
      });

      // categoriesArr.push(
      //   this.fb.group({
      //     street: ['', Validators.required],
      //     city: ['', Validators.required],
      //     zip: ['', [Validators.required, Validators.minLength(5)]],
      //   })
      // )
    });

    setTimeout(() => {
      
      console.log(this.productsFilterForm,this.productsFilterForm?.get('categories')); aqedan
    }, 1500);

  }

  SliderValueChanged(event: any) {
    this.minPrice = event.value;
    this.maxPrice = event.highValue;
    this.productsFilterForm.controls['priceMin'].setValue(this.minPrice);
    this.productsFilterForm.controls['priceMax'].setValue(this.maxPrice);

    console.log(
      event,
      this.minPrice,
      this.maxPrice,
      this.productsFilterForm.value
    );
  }
}
