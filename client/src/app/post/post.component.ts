import { Component, OnInit } from '@angular/core';
import { HttpCollectorService } from '../http-collector.service';
import { Post } from 'src/classes/post';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  post = new Post();

  constructor() {
  }

  ngOnInit(): void {
  }
}
