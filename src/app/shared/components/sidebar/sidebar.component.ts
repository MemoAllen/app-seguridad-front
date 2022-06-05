import { Component, OnInit } from '@angular/core';
import { AdminComponent } from '@app/pages/admin/admin.component';
import { CheckLoginGuard } from '@app/shared/guards/check-login.guard';
import { AuthService } from '@app/pages/auth/auth.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})



export class SidebarComponent implements OnInit {
  isAdmin=false;
  isLogged= false;
  private destroy$ = new Subject<any>();
  Menu!: any[];
  Menu2!:any[];

  typesOfShoes: string[] = [];
  constructor(private service:AuthService) {

  }

  ngOnInit(): void {

    this.service.isLogged
    .pipe(takeUntil(this.destroy$))
    .subscribe(res=>{
      this.isLogged= res;
    })


    this.Menu =[
      // {nombre:'Inicio',icon:'home',ruta:'/'},
      {nombre:'Administrador',icon:'people',ruta:'/admin',component: AdminComponent,  canActivateAdmin: [CheckLoginGuard] },
    ]


    this.Menu2=[
      {nombre:'Inicio',icon:'home',ruta:'/login'}    ]
  }
}

