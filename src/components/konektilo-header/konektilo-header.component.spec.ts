import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {IonicModule} from '@ionic/angular';

import {KonektiloHeaderComponent} from './konektilo-header.component';

describe('KonektiloHeaderComponent', () => {
  let component: KonektiloHeaderComponent;
  let fixture: ComponentFixture<KonektiloHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [KonektiloHeaderComponent],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(KonektiloHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
