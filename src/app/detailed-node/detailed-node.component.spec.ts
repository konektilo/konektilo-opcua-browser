import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {IonicModule} from '@ionic/angular';

import {DetailedNodeComponent} from './detailed-node.component';

describe('DetailedNodeComponent', () => {
  let component: DetailedNodeComponent;
  let fixture: ComponentFixture<DetailedNodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DetailedNodeComponent],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DetailedNodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
