import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { MaterialModule } from "./shared/material.module";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RouterModule } from "@angular/router";
import { RouterTestingModule } from "@angular/router/testing";
describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [
        MaterialModule,
        BrowserAnimationsModule,
        RouterModule,
        RouterTestingModule
      ]
    });
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit()', () => {
    it('User loggen in and email present in the session storage', () => {
      spyOn(sessionStorage, 'getItem').and.returnValue('test@test.com');

      // When
      component.ngOnInit();

      // Then
      expect(component.isLogin).toBe(true);
    });

    it('User not logged in and email is not present in the session storage', () => {
      spyOn(sessionStorage, 'getItem').and.returnValue('');

      // When
      component.ngOnInit();

      // Then
      expect(component.isLogin).toBe(false);
    });
  });

  describe('onResize()', () => {
    it('should call onResize if width less than or equal to 768', () => {
      // Given
      const event = {
        target: {
          innerWidth: window.innerWidth
        }
      }

      // When
      component.onResize(event);

      // Then
      expect(component.matGridCol).toEqual(3);
    });
  });

  describe('onLogout()', () => {
    it('should logout and clear session storage', () => {
      // Given
      component.sessionStorageLogin = 'clear';
      const sessionStorageSpy = spyOn(sessionStorage, 'clear');

      // When
      component.onLogout();

      // Then
      expect(sessionStorageSpy).toHaveBeenCalled();
    });
  });
});
