import {ComponentFixture, TestBed} from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { NavBarComponent } from './shared/layout/nav-bar/nav-bar.component';
import {MatToolbar, MatToolbarModule} from '@angular/material/toolbar';
import {MatGridListModule} from "@angular/material/grid-list";
import {MatIconModule} from "@angular/material/icon";
import {MatSidenavModule} from "@angular/material/sidenav";
import {NO_ERRORS_SCHEMA} from "@angular/core";
import { MaterialModule } from './shared/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  beforeEach(() => TestBed.configureTestingModule({

    imports: [
      RouterTestingModule,
      MatGridListModule,
      MatToolbarModule,
      MatIconModule,
      MatSidenavModule,
      BrowserAnimationsModule,
      RouterTestingModule,MaterialModule,BrowserAnimationsModule
    ],
    declarations: [AppComponent,NavBarComponent,MatToolbar],
    schemas: [NO_ERRORS_SCHEMA]
  }).compileComponents());


  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
  it('should call onResize() on  method',()=>{
    const event =  {
      target : {
        innerWidth:window.innerWidth
      }
    }
    component.onResize(event);
    expect(component.matGridCol).toEqual(3);
  });
  /*it('should call onLogout()',()=>{
    component.onLogout()
    spyOn(window.sessionStorage, 'clear').and.callFake(()=>{
      expect(window.sessionStorage.clear()).toHaveBeenCalled()
      expect(window.location.href='/').toHaveBeenCalled()
    })
  });*/
});
