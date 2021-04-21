import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {IonicModule} from '@ionic/angular';

import {FavoriteSubscriptionPopoverComponent} from './favorite-subscription-popover.component';

describe('FavoriteSubscriptionPopoverComponent', () => {
  let component: FavoriteSubscriptionPopoverComponent;
  let fixture: ComponentFixture<FavoriteSubscriptionPopoverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FavoriteSubscriptionPopoverComponent],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FavoriteSubscriptionPopoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
