import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeuresSupComponent } from './heures-sup.component';

describe('HeuresSupComponent', () => {
  let component: HeuresSupComponent;
  let fixture: ComponentFixture<HeuresSupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeuresSupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeuresSupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
