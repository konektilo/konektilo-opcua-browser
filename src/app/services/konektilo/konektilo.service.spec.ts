import {TestBed} from '@angular/core/testing';

import {KonektiloService} from './konektilo.service';

describe('KonektiloService', () => {
  let service: KonektiloService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KonektiloService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
