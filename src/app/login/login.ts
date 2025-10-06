import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login implements OnInit {
  loginForm!: FormGroup;
  
  constructor(private formBuilder: FormBuilder, private http: HttpClient) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: [''],
      password: ['']
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;
      console.log('Login attempt:', username, password);
      // Here you can call your authentication service
    const url = 'http://localhost:9025/api/login'; // replace with your endpoint
    const body = {
      username: this.loginForm.value.username,
      password: this.loginForm.value.password
    };

    // Use observe: 'response' to get the full HttpResponse
    this.http.post(url, body, { observe: 'response' }).subscribe({
      next: (response: HttpResponse<any>) => {
        console.log('Status code:', response.status);
        console.log('Response body:', response.body);
      },
      error: (err) => {
        console.error('Error status:', err.status);
        console.error('Error body:', err.error);
      }
    });
    }
  }
}
