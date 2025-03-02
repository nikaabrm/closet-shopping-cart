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
@Component({
  selector: 'app-products-list',
  standalone: false,
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.scss',
})
export class ProductsListComponent {
  productsFilterForm!: FormGroup;
  categoriesFormGroupControls: any[] = [];

  isReady = false;
  minPrice: number = 20;
  maxPrice: number = 120;

  options: Options = {
    floor: 0,
    ceil: 300,
  };

  constructor(
    private categoriesService: CategoriesService,
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
  }

  SliderValueChanged(event: any) {
    this.minPrice = event.value;
    this.maxPrice = event.highValue;
    this.productsFilterForm.controls['priceMin'].setValue(this.minPrice);
    this.productsFilterForm.controls['priceMax'].setValue(this.maxPrice);
    console.log(this.productsFilterForm.value);

  }
  matCheckboxChanged(event: any) {
    console.log(this.productsFilterForm.value);
  }
}
