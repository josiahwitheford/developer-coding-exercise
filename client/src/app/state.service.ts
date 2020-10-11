import { Injectable } from '@angular/core';
import { Post } from 'src/classes/post';

@Injectable({
  providedIn: 'root'
})
export class StateService {

  selectedPost: Post = null;

  constructor() { }

}
