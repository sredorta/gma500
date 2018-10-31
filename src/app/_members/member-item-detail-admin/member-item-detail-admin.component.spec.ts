import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberItemDetailAdminComponent } from './member-item-detail-admin.component';

describe('MemberItemDetailAdminComponent', () => {
  let component: MemberItemDetailAdminComponent;
  let fixture: ComponentFixture<MemberItemDetailAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemberItemDetailAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberItemDetailAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
