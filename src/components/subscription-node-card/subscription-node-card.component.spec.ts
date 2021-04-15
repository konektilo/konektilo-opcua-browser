import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {IonicModule} from '@ionic/angular';

import {SubscriptionNodeCardComponent} from './subscription-node-card.component';

describe('SubscriptionNodeCardComponent', () => {
  let component: SubscriptionNodeCardComponent;
  let fixture: ComponentFixture<SubscriptionNodeCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SubscriptionNodeCardComponent],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SubscriptionNodeCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
