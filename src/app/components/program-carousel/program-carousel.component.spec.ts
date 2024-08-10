import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramCarouselComponent } from './program-carousel.component';

describe('ProgramCarouselComponent', () => {
  let component: ProgramCarouselComponent;
  let fixture: ComponentFixture<ProgramCarouselComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProgramCarouselComponent]
    });
    fixture = TestBed.createComponent(ProgramCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
