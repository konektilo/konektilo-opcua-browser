import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {IonicModule} from '@ionic/angular';

import {KonektiloFooterComponent} from './konektilo-footer.component';

describe('KonektiloFooterComponent', () => {
  let component: KonektiloFooterComponent;
  let fixture: ComponentFixture<KonektiloFooterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [KonektiloFooterComponent],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(KonektiloFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
