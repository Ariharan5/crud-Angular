import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormComponent } from './form/form.component';
import { SignupFormComponent } from './signup-form/signup-form.component';
import { HttpClientModule } from "@angular/common/http";
import { SampleComponent } from './sample/sample.component';
import { ViewComponent } from './post/view/view.component';
import { EditComponent } from './post/edit/edit.component';
import { PostService } from './post/post.service';
import { CreateComponent } from './post/create/create.component';
import { IndexComponent } from './post/index/index.component';



@NgModule({
  declarations: [
    AppComponent,
    FormComponent,
    SignupFormComponent,
    SampleComponent,
    ViewComponent,
    EditComponent,
    CreateComponent,
    IndexComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [PostService],
  bootstrap: [AppComponent]
})
export class AppModule { }

