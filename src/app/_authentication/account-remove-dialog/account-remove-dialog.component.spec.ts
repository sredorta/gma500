import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountRemoveDialogComponent } from './account-remove-dialog.component';

describe('AccountRemoveDialogComponent', () => {
  let component: AccountRemoveDialogComponent;
  let fixture: ComponentFixture<AccountRemoveDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountRemoveDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountRemoveDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
