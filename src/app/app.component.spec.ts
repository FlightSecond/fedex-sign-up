import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';

@Component({ selector: 'app-sign-up', template: '' })
class SignUpComponent {}

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let appComponent: AppComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent, SignUpComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    appComponent = fixture.componentInstance;
  });

  it(`should have as title 'FedEx Sign-up'`, () => {
    expect(appComponent.title).toBe('FedEx Sign-up');
  });

  it('should have the logo', () => {
    const logo = fixture.nativeElement.querySelector('img');

    expect(logo.src).toContain('assets/images/logo.png');
    expect(logo.alt).toBe('FedEx');
    expect(logo.width).toBe(88);
    expect(logo.height).toBe(25);
  });

  it('should contain sign up component', () => {
    expect(fixture.nativeElement.querySelector('app-sign-up')).toBeDefined();
  });
});
