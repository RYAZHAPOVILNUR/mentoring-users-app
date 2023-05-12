import {User} from "./user.interface";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {inject, Injectable} from "@angular/core";
import {Todo} from "./todo.interface";

enum DataTypes {
  users = 'users',
  comments = 'comments',
  todos = 'todos',
  photos = 'photos'
}

@Injectable({providedIn: 'root'})
export class UsersService {
  private readonly http = inject(HttpClient);

  public getUsers(): Observable<User[]> {
    return this.http.get<User[]>('https://jsonplaceholder.typicode.com/users')
  }

  public getData<T>(type: DataTypes): Observable<T[]> {
    return this.http.get<T[]>('https://jsonplaceholder.typicode.com/' + type)
  }

  constructor() {
    console.log("USER SERVICE CREATED")
    this.getUsers().subscribe(console.log)


    this.getData<Todo>(DataTypes.todos).subscribe(
      todos => console.log({todos})
    )
  }
}
