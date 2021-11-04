import { Component, OnInit } from '@angular/core';
import {initialPost, Post} from "../../models/post.model";
import {PostService} from "../post.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'app-single-post',
  templateUrl: './single-post.component.html',
  styleUrls: ['./single-post.component.css']
})
export class SinglePostComponent implements OnInit {
 post: Post = initialPost;
  constructor( private postService: PostService,
               private route: ActivatedRoute,
               private router: Router
  ) {
  }
  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.postService.entities$.subscribe(
      (posts) => {
        const post = posts.find((post) => post.id === id);
        this.post = (post) ? post : initialPost;
      }
    )
  }
}
