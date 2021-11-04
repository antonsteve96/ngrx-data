import {DefaultDataService, HttpUrlGenerator} from "@ngrx/data";
import {Injectable} from "@angular/core";
import {Post} from "../models/post.model";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {Update} from "@ngrx/entity";

@Injectable()
export class PostsDataService extends DefaultDataService<Post> {
  constructor(http: HttpClient, httpUrlGenerator: HttpUrlGenerator) {
    super('Post', http, httpUrlGenerator);
  }

  getAll(): Observable<Post[]> {
    return this.http.get<Post[]>(`https://ngrx-data-a340a-default-rtdb.europe-west1.firebasedatabase.app/posts.json`).pipe(
      map((data) => {
        let posts: Post[] = [];
        for (let key in data) {
          posts = [...posts, {...data[key], id: key}]
        }
        return posts;
      }))
  }

  add(post: Post): Observable<Post> {
    return this.http.post<{ name: string }>(`https://ngrx-data-a340a-default-rtdb.europe-west1.firebasedatabase.app/posts.json`, post).pipe(
      map((data) => {
          return {...post, id: data.name};
        }
      )
    )
  }

  update(post: Update<Post>): Observable<Post> {
    return this.http.put<Post>(`https://ngrx-data-a340a-default-rtdb.europe-west1.firebasedatabase.app/posts/${post.id}.json`, {...post.changes});
  }

  delete(id: string): Observable<string> {
    return this.http.delete(`https://ngrx-data-a340a-default-rtdb.europe-west1.firebasedatabase.app/posts/${id}.json`).pipe(
      map((data) => {
        console.log(`deleted ${id} of posts data`, data);
        return id;
      })
    );
  }
}
