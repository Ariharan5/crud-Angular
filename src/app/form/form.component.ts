import { Student } from './Student';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { FormService } from './services/form.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnInit {
  studentgroup: Student = new Student();
  studentData: Student[] = [];
  showUpdate!: boolean;
  showCreate: boolean=true;
  buttontype = 'submit';

  constructor(public studentservice: FormService) {
    this.studentservice.getStudenet().subscribe((result) => {
      this.studentData = result;
    });
  }

  ngOnInit(): void {
    this.getStudentData();
  }

  studentForm = new FormGroup({
    firstName: new FormControl('', [
      Validators.required,
      Validators.pattern('[a-z A-Z]+$'),
    ]),
    lastName: new FormControl('', [
      Validators.required,
      Validators.pattern('[a-z A-Z]+$'),
    ]),
    mobile: new FormControl('', [
      Validators.required,
      Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$'),
    ]),
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  studentDetail() {
    console.log('This is Student form : >> ', this.studentForm.value);
  }
  get fname() {
    return this.studentForm.get('firstName');
  }
  get lname() {
    return this.studentForm.get('lastName');
  }
  get mobilenumber() {
    return this.studentForm.get('mobile');
  }
  get mailid() {
    return this.studentForm.get('email');
  }

  createStudentDetails() {
    this.studentgroup.firstName = this.studentForm.value.firstName as string;
    this.studentgroup.lastName = this.studentForm.value.lastName as string;
    this.studentgroup.mobile = this.studentForm.value.mobile as string;;
    this.studentgroup.email = this.studentForm.value.email as string;;
 
    this.studentservice
      .createStudent(this.studentgroup)
      .subscribe((result: Student[]) => {
        console.log('result of creating student deails', result);
        alert('student form is created successfully...');
        this.studentForm.reset();
        this.getStudentData();
      });
  }

  //get data
  getStudentData() {
    this.studentservice.getStudenet().subscribe((result) => {
      this.studentData = result;
      console.log('student data is getted', this.studentData);
    });
  }

  //  Updating the student Details..
  updateStudentDetails() {
    this.showCreate = true;
    this.showUpdate = false;
    this.studentgroup.firstName = this.studentForm.value.firstName as string;
    this.studentgroup.lastName = this.studentForm.value.lastName as string;
    this.studentgroup.mobile = this.studentForm.value.mobile as string;
    this.studentgroup.email = this.studentForm.value.email as string;
    this.studentservice
      .updatedata(this.studentgroup.id, this.studentgroup)
      .subscribe((result) => {
        console.log('Updated Details : >>>', result);
        alert('Updated Successfully....');
        this.studentForm.reset();
        this.getStudentData();
      });
  }
  //delete the student details
  deleteStudentDetails(id: number) {
    alert('student Details id deleted...');
    this.studentservice.removedata(id).subscribe((result: any) => {
      this.studentForm.reset();
      this.getStudentData();
    });
  }

  //Editing Student details
  editStudentDetails(studentData: any) {
    this.showUpdate = true;
    this.showCreate = false;
    this.buttontype = 'update';
    this.studentgroup.id = studentData.id;
    this.studentForm.controls['firstName'].setValue(studentData.firstName);
    this.studentForm.controls['lastName'].setValue(studentData.lastName);
    this.studentForm.controls['mobile'].setValue(studentData.mobile);
    this.studentForm.controls['email'].setValue(studentData.email);
  }

}
