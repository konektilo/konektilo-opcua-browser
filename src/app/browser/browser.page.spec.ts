import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {IonicModule} from '@ionic/angular';

import {BrowserPage} from './browser.page';

describe('BrowserPage', () => {
  let component: BrowserPage;
  let fixture: ComponentFixture<BrowserPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BrowserPage],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BrowserPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
