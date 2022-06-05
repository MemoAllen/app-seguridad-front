
import { Component, OnDestroy, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { AuthService } from '@app/pages/auth/auth.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit,OnDestroy{

  isAdmin=false;
  isLogged= false;
  private destroy$ = new Subject<any>();

  @Output() toggleSidenav = new EventEmitter<void>();


  onToggleSidenav():void{
    this.toggleSidenav.emit();
  }
  constructor(private authService:AuthService) { }



  ngOnInit(): void {

    this.authService.isLogged
    .pipe(takeUntil(this.destroy$))
    .subscribe(res=>{
      this.isLogged= res;
    })
  }

  ngOnDestroy(): void {
    this.destroy$.next({});
    this.destroy$.complete();
  }

  onLogout(){
    this.authService.logout();
  }



}
