import {TestBed} from '@angular/core/testing';

import {KonektiloBrowserService} from './konektilo-browser.service';

describe('KonektiloBrowserService', () => {
  let service: KonektiloBrowserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KonektiloBrowserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
