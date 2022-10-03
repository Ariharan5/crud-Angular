import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { User } from '../model/User';
import { Sample } from './sample';
import { SampleService } from './sample.service';

@Component({
  selector: 'app-sample',
  templateUrl: './sample.component.html',
  styleUrls: ['./sample.component.css'],
})
export class SampleComponent implements OnInit {
  sampleGroup!: Sample;
  samples: Sample[] =[];
  form!: FormGroup;
  constructor(private userservice: SampleService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });
    this.get();
  }

  Create() {
    this.userservice
      .createService(this.form.value)
      .subscribe((res: Sample[]) => {
        console.log('Post created successfully!');
        this.form.reset();
        this.get();
      });
  }

  get() {
    this.userservice.getService().subscribe((data: Sample[]) => {
      this.samples = data;
      console.log(this.samples);
    });
  }

  deletePost(id: number) {
    this.userservice.deleteService(id).subscribe((res) => {
      this.samples = this.samples.filter((item) => item.id !== id);
      console.log('Post deleted successfully!');
    });
  }

  get f() {
    return this.form.get('username');
  }

  get p() {
    return this.form.get('password');
  }

  update(id:number) {
    this.userservice
      .UpdateService(this.sampleGroup.id, this.sampleGroup)
      .subscribe((res) => {
        this.form.reset();
        alert('Updated Successfully....');
        this.get();
      });
  }

  edit(samples: any) {
   this.form =samples.id;
    this.form.controls['username'].setValue(this.form.value.username);
    this.form.controls['password'].setValue(this.form.value.password);
  }


}
