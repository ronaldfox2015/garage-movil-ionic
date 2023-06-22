import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListAdvertisementPage } from './list-advertisement.page';

describe('ListAdvertisementPage', () => {
  let component: ListAdvertisementPage;
  let fixture: ComponentFixture<ListAdvertisementPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ListAdvertisementPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
