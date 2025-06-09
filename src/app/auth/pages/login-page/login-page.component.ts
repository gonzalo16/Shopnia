import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login-page',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './login-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginPageComponent {
  
   formBuilder = inject(FormBuilder);
   hasErrorSignal = signal(false); 
   authService = inject(AuthService);
   enrutador = inject(Router);

  form = this.formBuilder.group({
    email:['',[Validators.required,Validators.email]],
    password:['',[Validators.required, Validators.minLength(6)]],
  })

  onSubmit(){
    if(this.form.invalid){
      this.hasErrorSignal.set(true);
      setTimeout(() => {
        this.hasErrorSignal.set(false);
      },2000);
      return ;
    }
    const {email = '',password = ''} = this.form.value;
    console.log(this.form.value);
    this.authService.login(email!,password!).subscribe((isValid) => {
      if(isValid){
        this.enrutador.navigateByUrl('/');
        return;
      }

      this.hasErrorSignal.set(true);
    });
  }
}
