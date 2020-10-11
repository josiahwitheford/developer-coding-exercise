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
    let sub = this.route.params.subscribe(params => {
      this.post = params['selectedPost'];
    })
  }
}
