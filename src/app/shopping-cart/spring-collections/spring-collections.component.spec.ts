import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpringCollectionsComponent } from './spring-collections.component';

describe('SprintCollectionsComponent', () => {
  let component: SpringCollectionsComponent;
  let fixture: ComponentFixture<SpringCollectionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SpringCollectionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpringCollectionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
