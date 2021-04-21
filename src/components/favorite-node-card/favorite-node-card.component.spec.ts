import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {IonicModule} from '@ionic/angular';

import {FavoriteNodeCardComponent} from './favorite-node-card.component';

describe('FavoriteNodeCardComponent', () => {
  let component: FavoriteNodeCardComponent;
  let fixture: ComponentFixture<FavoriteNodeCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FavoriteNodeCardComponent],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FavoriteNodeCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
