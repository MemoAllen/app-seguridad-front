import { NgModule } from "@angular/core";
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar'
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSnackBarModule} from '@angular/material/snack-bar';

const myModules:any=[MatButtonModule,MatToolbarModule,MatSidenavModule,MatIconModule,MatListModule,MatCardModule,MatFormFieldModule,
  MatInputModule,MatSnackBarModule];

@NgModule({
    imports:[...myModules],
    exports:[...myModules]
})
export class MaterialModule{}
