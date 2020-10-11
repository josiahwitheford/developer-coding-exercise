import { Component, OnInit } from '@angular/core';
import { HttpCollectorService } from '../http-collector.service';
import { Post } from 'src/classes/post';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  post = new Post();

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      console.log('got params');
      console.log(params);
      this.post = new Post();
      this.post.title = params.title;
      this.post.author = params.author;
      this.post.content = params.content;
      this.post.tags = params.tags;
      this.post.slug = params.slug;
    })
  }
}
