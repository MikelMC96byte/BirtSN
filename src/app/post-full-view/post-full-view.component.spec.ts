import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostFullViewComponent } from './post-full-view.component';

describe('PostFullViewComponent', () => {
  let component: PostFullViewComponent;
  let fixture: ComponentFixture<PostFullViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostFullViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostFullViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
