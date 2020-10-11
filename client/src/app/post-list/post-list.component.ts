import { Component, OnInit } from '@angular/core';
import { HttpCollectorService } from '../http-collector.service';
import { Post } from 'src/classes/post';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {

  posts: Array<Post> = new Array<Post>();
  selectedPost: Post;

  constructor(private http: HttpCollectorService, private router: Router) {
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
    this.selectedPost = await this.getPost(item.slug);
    console.log(`navigating to post ${item.slug}`);
    console.log(this.selectedPost);
    this.router.navigate([`/posts/${item.slug}`, this.selectedPost]);
  }

  getPost(slug) {
    return new Promise<Post>((resolve, reject) => {
      this.http.getPost(slug).then((res) => {
        let post = new Post();
        post.title = res['title'];
        post.author = res['author'];
        post.content = res['content'];
        post.tags = res['tags'];
        resolve(post);
      }, error => {
        reject(error)
      });
    })

  }
}
