import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DecoratorsLibComponent } from './decorators-lib.component';

describe('DecoratorsLibComponent', () => {
  let component: DecoratorsLibComponent;
  let fixture: ComponentFixture<DecoratorsLibComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DecoratorsLibComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DecoratorsLibComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
