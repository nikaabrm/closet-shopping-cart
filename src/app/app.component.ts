import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

export interface PhotosApi {
  albumId?: number;
  id?: number;
  title?: string;
  url?: string;
  thumbnailUrl?: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'closet-shopping-cart';

  constructor(private readonly http: HttpClient) {}


 
}
