import { Component } from '@angular/core';
import { CategoriesService } from './categories.service';

@Component({
  selector: 'app-categories',
  imports: [],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss',
})
export class CategoriesComponent {
  categories: { name: string; photoUrl: string }[] = [];
  categoryNames?: string[];
  categoryPhotos = [
    'https://img.lovepik.com/element/45008/3114.png_860.png',
    'https://images.unsplash.com/photo-1548950939-629ecb4d7101?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8d2ludGVyJTIwY2xvdGhpbmd8ZW58MHx8MHx8fDA%3D',
    'https://media.wired.com/photos/5ffcd2ef7576555735fb9eae/1:1/w_1600,h_1600,c_limit/Culture_heatedclothing_AH-WTOP-5V-B_11.jpg',
    'https://www.customfashionjewels.com/wp-content/uploads/2024/04/image_0.jpg',
    'https://media.istockphoto.com/id/887360960/photo/mens-suits-on-hangers-in-different-colors.jpg?s=612x612&w=0&k=20&c=RR19yJjRuR-CBWj9u1sQkFgtdYJ07KEkM678R0mtuZY=',
    'https://media.burford.co.uk/images/SNY04089.jpg_edit.width-1440_05001m7uKQ0crRoI.jpg',
  ];

  constructor(private categoriesService: CategoriesService) {


    this.categoriesService.getAllCategories().subscribe((res) => {
      this.categoryNames = res;
      console.log('categoryNames',this.categoryNames)

      this.categoryNames.forEach((el, i) => {
        this.categories.push({ name: el, photoUrl: this.categoryPhotos[i]});
      });
      console.log(this.categories, 'categories')

    });
  }
}
