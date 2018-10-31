import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberItemAdminComponent } from './member-item-admin.component';

describe('MemberItemAdminComponent', () => {
  let component: MemberItemAdminComponent;
  let fixture: ComponentFixture<MemberItemAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemberItemAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberItemAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
