import { Rating } from './../Data/Rating';
import { Order } from './../Data/Order';
import { Book } from './../Data/Book';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Roles } from '../Data/Roles';
import { User } from '../Data/User';
import { ApiServiceService } from '../services/api-service.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-main-view',
  templateUrl: './main-view.component.html',
  styleUrls: ['./main-view.component.css'],
  encapsulation: ViewEncapsulation.None,
  providers: [ApiServiceService]
})
export class MainViewComponent implements OnInit {

  public user: User = {
    userId: 0, username: "", password: "", dob: new Date('0000-00-00'), address: '', role: Roles.ADMIN, order: [],
    name: '',
    fine: 0
  };

  public books: Book[] = [];
  public orders: Order[] = [];
  public ordersAll: Order[] = [];
  public ratings: Rating[] = [];

  public book1: Book ={
    isbn: '',
    title: '',
    cover: '',
    publisher: '',
    pages: 0,
    available: 0,
    orders: [],
    rating: 0
  }

  public bookForm = new FormGroup({});

  public rating: Rating = {
    rating_id: 0,
    rating: 0,
    bookid: '',
    userid: 0
  }

  public rating1 = new FormGroup({});
  public userid: number = 0;

  public isAdmin: boolean = true;

  constructor(private router:Router,private route: ActivatedRoute,private apiserv: ApiServiceService) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params)=>{
        this.userid = parseInt(params["id"]);
      }
      );

      this.rating1 = new FormGroup({
          rating_number: new FormControl(0)
      })

      this.bookForm = new FormGroup({
        isbn: new FormControl("",[
          Validators.required
        ]),
        title: new FormControl("",[
          Validators.required
        ]),
        cover: new FormControl("",[
          Validators.required
        ]),
        publisher: new FormControl('',[
          Validators.required
        ]),
        pages: new FormControl(0,[
          Validators.required,
        ]),
        available: new FormControl(0,[
          Validators.required,
        ])
        });

      this.getUserByid(this.userid);
      this.getAllorders(this.userid);
      this.getOrders(this.userid);

      this.getBooks(this.userid);

      for(var i of this.books){
        i.rating = this.getRatings(i.isbn);
      }


      this.user.fine = 0;
      for(var x of this.orders){
        if(x.isOverdue){
           var diff = Math.abs(Date.now() - x.return_date.getTime());
           var diffdays = Math.ceil(diff/(1000 * 3600 * 24));
          this.user.fine += 50 * diffdays;
        }
      }
      console.warn(this.user.role.toString());


      if(this.user.role == Roles.ADMIN) {
        this.isAdmin = true;
        console.log(this.isAdmin);
      } else {
        this.isAdmin = false;
      }
      this.apiserv.updateUser(this.userid, this.user);
  }

  updateBook(book: Book){
    this.apiserv.updateBook(book).subscribe(
      (success)=>{
        window.location.reload();
      }
    );
  }
  getUserByid(userid : number){
    this.apiserv.getUserById(userid).subscribe(
      (user: User)=>{
        this.user = user;
      }
    );
  }

  getBooks(userid: number){
    this.apiserv.getAllBooks(userid).subscribe(
      (books: Book[])=>{
        this.books = books;
      }
    );
  }

  getRatings(bookid: string): number{
    this.apiserv.getRatingbyBookid(bookid).subscribe(
      (rat: number)=>{
        return rat;
      }
    );
    return 0;
  }

  addRating(bookid: string, userid: number){
    this.rating.bookid = bookid;
    this.rating.userid = userid;
    this.rating.rating = this.rating1.get("rating_number")?.value;
    console.log(this.rating.rating);
    this.apiserv.addRating(this.rating).subscribe(
      (success)=>{
        //window.location.reload();
      }
    );
  }

  getAllorders(userid: number){
    this.apiserv.getAllOrders(userid).subscribe(
      (orders: Order[])=>{
        this.ordersAll = orders;
        console.log(this.ordersAll[0].book.isbn);
      }
    );
  }

  getOrders(userid: number){
    this.apiserv.getOrdersByUser(userid).subscribe(
      (orders: Order[])=>{
        this.orders = orders;
      }
    );
  }

  addOrder(book: Book){
    this.apiserv.addOrders(this.userid,book).subscribe(
      (success)=>{
        window.location.reload();
      }
    );
  }

  delOrder(orderid: string){
    this.apiserv.delOrders(this.userid,orderid).subscribe(
      (success)=>{
        window.location.reload();
      }
    );
  }

  logout(){
    this.router.navigate(["../../"],{relativeTo: this.route});
  }

  addBooks(){
    this.book1 = this.bookForm.value;

    console.log(this.book1.isbn);
    this.apiserv.addBooks(this.userid,this.book1).subscribe(
      (success)=>{
        window.location.reload();
      }
    );
  }

  delBook(book: Book){
    this.apiserv.deleteBooks(this.userid,book).subscribe(
      (success)=>{
        window.location.reload();
      }
    );
  }


}
