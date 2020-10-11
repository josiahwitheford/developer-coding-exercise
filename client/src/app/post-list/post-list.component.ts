import { Component, OnInit } from '@angular/core';
import { HttpCollectorService } from '../http-collector.service';
import { Post } from 'src/classes/post';
import { Router } from '@angular/router';
import { StateService } from '../state.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {

  posts: Array<Post> = new Array<Post>();
  selectedPost: Post;

  constructor(private http: HttpCollectorService,
              private router: Router,
              private stateService: StateService) {
    console.log('fetching posts from the server')
    this.http.getPosts().then((res) => {
      console.log('I have posts!!');
      this.posts = new Array<Post>();  // Reset the lists of posts to avoid duplicates
      res.forEach(element => {
        let newPost = new Post();
        newPost.slug = element;
        this.posts.push(newPost);
      });
    })
  }

  ngOnInit(): void {
  }

  async click(item) {
    console.log('item clicked');
    console.log(item);
    this.selectedPost = await this.http.getPost(item.slug);
    console.log(`navigating to post ${item.slug}`);
    this.stateService.selectedPost = this.selectedPost;
    this.router.navigate([`/posts/${item.slug}`]);
  }
}
