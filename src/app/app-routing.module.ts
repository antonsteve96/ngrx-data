import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {PostsListComponent} from "./posts/posts-list/posts-list.component";
import {SinglePostComponent} from "./posts/single-post/single-post.component";
import {AddPostComponent} from "./posts/add-post/add-post.component";
import {EditPostComponent} from "./posts/edit-post/edit-post.component";
import {PostsResolver} from "./posts/posts.resolver";

const routes: Routes = [
  { path: '', component: HomeComponent},
  {
    path: 'posts',
    loadChildren: () => import('./posts/posts.module').then((module) => module.PostsModule)
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
