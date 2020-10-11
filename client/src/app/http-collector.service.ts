import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpCollectorService {

  urlBase:string = '127.0.0.1:3000';

  constructor(private http: HttpClient) {

  }

  public getPosts(): Promise<any> {
    let url = `http://${this.urlBase}/posts/api/posts/`;
    return new Promise((resolve, reject) => {
      this.http.get(url).subscribe((res) => {
        resolve(res)
      }, error => {
        reject(error);
      })
    })

  }

  public getPost(postTitle: string): Promise<any> {
    let url = `http://${this.urlBase}/posts/api/posts/${postTitle}`
    return new Promise((resolve, reject) => {
      this.http.get(url).subscribe((res) => {
        resolve(res)
      }, error => {
        reject(error);
      })
    })

  }
}
