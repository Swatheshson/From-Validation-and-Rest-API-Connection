import { Component, signal } from '@angular/core';
import { FormControl, FormGroup} from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { TemperatureConverterComponent } from '@swatheshson/temperature-converter-lib';

@Component({
  selector: 'app-root',
  standalone:true,
  imports: [ReactiveFormsModule,CommonModule,TemperatureConverterComponent],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  protected readonly title = signal('reactiveform');

constructor(private http:HttpClient){
  this.getAllUser();
}

  // userObj: any = {
  //   id :'0',
  //   name:'',
  //   username:'',
  //   email:''
  // }

  //userssarray to save received value
  users:any[]=[];



  userforms: FormGroup = new FormGroup({
    id :new FormControl('0'),
    name:new FormControl(''),
    username:new FormControl(''),
    email:new FormControl('')
  });

  //editfunction
  onEdit(id:number){
    this.http.get('https://jsonplaceholder.typicode.com/users/'+id).subscribe((res:any)=>{
    this.userforms=new FormGroup({
    id :new FormControl(res.id),
    name:new FormControl(res.name),
    username:new FormControl(res.username),
    email:new FormControl(res.email)
  });
    })
  }
  //insert data
  onSaveUser(){
    //obtaining value from user forms
    const obj = this.userforms.value;
    this.http.post('https://jsonplaceholder.typicode.com/users',obj).subscribe((res:any)=>{
      alert("user created")
    })
  }

  getAllUser(){
    this.http.get('https://jsonplaceholder.typicode.com/users').subscribe((res:any)=>{
      this.users=res;
    })
  }
  
}
