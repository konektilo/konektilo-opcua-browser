import {TestBed} from '@angular/core/testing';

import {AccessUrlBuilderService} from './access-url-builder.service';

describe('AccessUrlBuilderService', () => {
  let service: AccessUrlBuilderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AccessUrlBuilderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
