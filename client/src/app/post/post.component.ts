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

  constructor(private httpService: HttpCollectorService) {
  }

  ngOnInit(): void {
    // We need to get the slug for the article that we want to fetch.
    this.httpService.getPost('kiasuism-vs-no8-wire').then((res) => {
      this.post.title = res['title'];
      this.post.author = res['author'];
      this.post.content = res['content'];
      this.post.tags = res['tags'];
    });
  }
}
