import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-page',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './login-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginPageComponent {
  
  formBuilder = inject(FormBuilder);

  hasErrorSignal = signal(false); 
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

    console.log(this.form.value);
  }
}
