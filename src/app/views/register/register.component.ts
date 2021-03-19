import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/interfaces/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  users: User;
  registerForm: FormGroup;

  constructor(private userService: UserService, private router: Router, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.validation();
  }

  //Valida os campos do formulário
  validation(){
    this.registerForm = this.fb.group({
      user_name: ['', Validators.required],
      user_email: ['', Validators.required],
      user_password: ['', Validators.required],
      user_phone: ['', Validators.required],
      user_bio: ['', Validators.required]
    })
  }


  //Cadastra um usuário
  addUser(){
    if(this.registerForm.valid){
      this.users = Object.assign({password: this.registerForm.get('user_password'). value}, this.registerForm.value);

      this.userService.postUser(this.users).subscribe(
        () => {
          alert("Usuário cadastrado com sucesso!");
          this.router.navigateByUrl('/');
        }, error => {
          const erro = error.error;

          error.array.forEach(element => {
            switch (element.code) {
              case 'DuplicateUserName':
                alert('Cadastro duplicado!');
                break;

              default: 
                alert("Erro no cadastro!");
                break;
            }
          });
        }
      )
    }
  }

}
