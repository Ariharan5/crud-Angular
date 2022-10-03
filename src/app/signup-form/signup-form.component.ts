import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { User } from '../model/User';
import { UserService } from './user.service';


@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.css'],
})
export class SignupFormComponent implements OnInit {
  
  // New Variable  for assigning the values
  usergroup: User = new User ()  ;
  userData: User[] = [];
  showCreate: boolean = true;
  showUpdate!: boolean;

  // Inject of Service and FormBuilder we use get method here to get the value when the program starts
  constructor(private userservice: UserService,private fb:FormBuilder) {
    // this.userservice.getUser().subscribe((result) => {
    //   console.log('result of get data : >>', result);
    //   this.userData = result;
    // });
    this.getdata();
  }

  ngOnInit(): void {}

  // asigning the requirements and data type
  signup = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', [Validators.required, Validators.email]),
  });

  //get method
  getdata() {
    this.userservice.getUser().subscribe((result) => {
      this.userData = result;
      console.log('user data: >>', this.userData);
    });
  }

  // New funtion or method for user and password to get username and password
  get vuser() {
    return this.signup.get('username');
  }
  get vpass() {
    return this.signup.get('password');
  }

  // This to create the new form add user details
  createuserdetails() {
   
    this.usergroup.username = this.signup.value.username as string;
    this.usergroup.password = this.signup.value.password as string;
    this.userservice.createUser(this.usergroup).subscribe((result) => {
      alert('User data created successfully....');
      this.signup.reset();
      this.getdata();
    })
  }

  // This is for Updating purpose the user data
  updateuserData() {
    this.showCreate = true;
    this.showUpdate = false;
    this.usergroup.username = this.signup.value.username as string;
    this.usergroup.password = this.signup.value.password as string;
    this.userservice
      .updateUser(this.usergroup.id, this.usergroup)
      .subscribe((result) => {
        console.log('Updated value :>>', result);
        alert('Updated successfully....');
        this.signup.reset();
        this.getdata();
      });
  }


  // Editing the added value
  editUser(user: any) {
    this.showUpdate = true;
    this.showCreate = false;
    this.usergroup.id = user.id;
    this.signup.controls['username'].setValue(user.username);
    this.signup.controls['password'].setValue(user.password);
  }

  //remove the  data from the data base
  removeUser(id: number) {
    this.userservice.deleteUser(id).subscribe((result) => {
      alert('User data deleted successfully');
      this.getdata();
    });
  }
  
}
