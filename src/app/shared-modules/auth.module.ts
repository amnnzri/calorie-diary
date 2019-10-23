import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AuthFormComponent } from 'src/app/components/auth-form/auth-form.component';

@NgModule({
  imports: [CommonModule, IonicModule, ReactiveFormsModule],
  declarations: [AuthFormComponent],
  exports: [AuthFormComponent],
  entryComponents: [AuthFormComponent]
})
export class AuthModule {}
