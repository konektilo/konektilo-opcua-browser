import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {IonicModule} from '@ionic/angular';

import {NodeCardComponent} from './node-card.component';

describe('NodeCardComponent', () => {
  let component: NodeCardComponent;
  let fixture: ComponentFixture<NodeCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NodeCardComponent],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NodeCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
