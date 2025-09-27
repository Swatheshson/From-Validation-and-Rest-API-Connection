import { Component, signal } from '@angular/core';
import { FormControl, FormGroup, Validators} from '@angular/forms';
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
  id: new FormControl('', [
    Validators.required,
    Validators.pattern(/^[0-9]*$/) // only numbers allowed
  ]),
  name: new FormControl(''),
  username: new FormControl(''),
  email: new FormControl('',[Validators.required,Validators.email])
});


  //editfunction
  onEdit(id:number){
    this.http.get('https://jsonplaceholder.typicode.com/users/'+id).subscribe((res:any)=>{
    this.userforms.patchValue({
    id :res.id.toString(),
    name:res.name,
    username:res.username,
    email:res.email
  });
    })
  }
  //insert data
  onSaveUser() {
  if (this.userforms.valid) {
    const obj = this.userforms.value;
    this.http.post('https://jsonplaceholder.typicode.com/users', obj)
      .subscribe(() => alert('User created'));
  } else {
    alert('Form is invalid! Please check the fields.');
  }
}


  getAllUser(){
    this.http.get('https://jsonplaceholder.typicode.com/users').subscribe((res:any)=>{
      this.users=res;
    })
  }
  
}
