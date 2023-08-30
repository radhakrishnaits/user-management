import {ComponentFixture, TestBed} from '@angular/core/testing';
import { AppComponent } from './app.component';
import {MaterialModule} from "./shared/material.module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {RouterModule} from "@angular/router";
import {RouterTestingModule} from "@angular/router/testing";
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
/*  it('should set and get data from sessionStorage', () => {
    const key = 'testKey';
    const value = 'testValue';

    service.setItem(key, value);

    expect(sessionStorage.getItem(key)).toEqual(value);
    expect(service.getItem(key)).toEqual(value);
  });*/

  /*it('should remove data from sessionStorage', () => {
    const key = 'testKey';
    const value = 'testValue';

    service.setItem(key, value);
    expect(sessionStorage.getItem(key)).toEqual(value);

    service.removeItem(key);
    expect(sessionStorage.getItem(key)).toBeNull();
  });*/

  /*it('should clear all data from sessionStorage', () => {
    const key1 = 'testKey1';
    const key2 = 'testKey2';
    component.onLogout();
    expect(sessionStorage.clear).toHaveBeenCalled();
    fixture.detectChanges();
  });*/

});
