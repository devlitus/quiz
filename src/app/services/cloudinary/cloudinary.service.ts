import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { ImageCloudinary } from '../../models/imageCloudinary.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CloudinaryService {
  private url: string =
    'https://api.cloudinary.com/v1_1/djhxmjnb4/image/upload';
  private currenUser = JSON.parse(localStorage.getItem('user') || 'demo');
  
  constructor(private http: HttpClient) {}

  uploadImage(image: File): Observable<string> {
    const body = new FormData();
      body.append('file', image);
      body.append('folder', `kahoot/${this.currenUser.displayName}`);
      body.append('upload_preset', 'um7mj5dg');
      return this.http.post<ImageCloudinary>(this.url, body).pipe(
        map((image) => image.secure_url)
      )
  }
}
