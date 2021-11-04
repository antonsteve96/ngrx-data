import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {Post} from "../../models/post.model";
import {PostService} from "../post.service";
import {Router} from "@angular/router";
import {subscribeOn} from "rxjs/operators";

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent implements OnInit {
  addPostForm: FormGroup = new FormGroup({});
  constructor(private postService: PostService, private router: Router) { }

  ngOnInit(): void {
    this.addPostForm = new FormGroup({
      title: new FormControl(null),
      description: new FormControl(null)
    });
  }
  onAddPost(){
    const post: Post = this.addPostForm.value;
    this.postService.add(post).subscribe((data) =>{
      this.router.navigate(['/posts']);
    })
  }
}
