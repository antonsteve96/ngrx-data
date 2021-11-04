import { NgModule } from '@angular/core';
import { SinglePostComponent } from './single-post/single-post.component';
import { PostsListComponent } from './posts-list/posts-list.component';
import { EditPostComponent } from './edit-post/edit-post.component';
import { AddPostComponent } from './add-post/add-post.component';
import {ReactiveFormsModule} from "@angular/forms";
import {RouterModule, Routes} from "@angular/router";
import {CommonModule} from "@angular/common";
import {PostsResolver} from "./posts.resolver";
import {EntityDataService, EntityDefinitionService, EntityMetadataMap} from "@ngrx/data";
import {PostsDataService} from "./posts-data.service";
import {Post} from "../models/post.model";

const routes: Routes = [
  { path: '',
    component: PostsListComponent,
    resolve: {posts: PostsResolver}
  },
  { path: 'add', component: AddPostComponent},
  { path: 'edit/:id', component: EditPostComponent},
  {
    path: 'details/:id',
    component: SinglePostComponent,
    resolve: {posts: PostsResolver}
  },
]

const entityMetadata: EntityMetadataMap = {
  Post: {
    sortComparer: sortByName,
    entityDispatcherOptions: {
      optimisticUpdate: true,
      optimisticDelete: false
    }
  }
}
function sortByName(a: Post, b: Post): number{
  let compare = a.title.localeCompare(b.title);
  if(compare > 0 )
    return -1;
  if(compare > 0)
    return 1;
  return compare;
}

@NgModule({
  declarations: [
    SinglePostComponent,
    PostsListComponent,
    EditPostComponent,
    AddPostComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
  ],
  providers: [PostsResolver, PostsDataService],
})
export class PostsModule {
  constructor(
    eds: EntityDefinitionService,
    entityDataService: EntityDataService,
    postsDataService: PostsDataService,
  ) {
    eds.registerMetadataMap(entityMetadata);
    entityDataService.registerService('Post', postsDataService);
  }
}
