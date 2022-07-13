import { Rating } from './../Data/Rating';
import { Order } from './../Data/Order';
import { Book } from './../Data/Book';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../Data/User';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  private urla: string = environment.urla;

  private urlm: string = environment.urlm;

  private urlr: string = environment.urlr;

  constructor(private http: HttpClient) { }

  public login(username:string, password:string): Observable<User>{
    return this.http.post<User>(this.urlm + "/login", {"username":username,"password": password});
  }

  public register(user: User): Observable<void>{
    return this.http.post<void>(this.urlm + "/register", user);
  }

  public getAllBooks(userid: number): Observable<Book[]>{
    return this.http.get<Book[]>(this.urla + "/"+userid+"/getBooks");
  }

  public getAllOrders(userid: number): Observable<Order[]>{
    return this.http.get<Order[]>(this.urla + "/"+userid+"/getBookingDetails");
  }

  public addBooks(userid: number, book: Book): Observable<void>{
    return this.http.post<void>(this.urla + "/"+userid+"/addBook", book);
  }

  public deleteBooks(userid: number, book: Book): Observable<void>{
    return this.http.post<void>(this.urla + "/"+userid+"/delBook",book);
  }

  public addOrders(userid: number, book: Book): Observable<void>{
    return this.http.post<void>(this.urla + "/"+userid+"/makeBooking",book);
  }

  public delOrders(userid: number, orderid: string): Observable<void>{
    return this.http.delete<void>(this.urla + "/"+userid+"/cancelBooking/"+orderid);
  }

  public getOrdersByUser(userid: number): Observable<Order[]>{
    return this.http.get<Order[]>(this.urla + "/"+userid+"/orders");
  }

  public deleteUsers(userid: number, users: User[]): Observable<void>{
    return this.http.post<void>(this.urla + "/"+userid+"/delUser",users);
  }

  public getUserById(userid: number): Observable<User>{
    return this.http.get<User>(this.urla + "/"+userid);
  }

  public updateUser(userid: number, user: User): Observable<void> {
    return this.http.put<void>(this.urla + "/"+userid+"/update",user);
  }

  public addRating(rat: Rating): Observable<void>{
    return this.http.post<void>(this.urlr + "/addRating",rat);
  }

  public getRatingbyBookid(bookid: string): Observable<number>{
    return this.http.get<number>(this.urlr + "/rating/"+bookid);
  }

  public updateBook(book: Book): Observable<void> {
    return this.http.put<void>(this.urla + "/updateBook",book);
  }
}
