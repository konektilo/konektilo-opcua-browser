import {TestBed} from '@angular/core/testing';

import {NodeConverterService} from './node-converter.service';

describe('NodeConverterService', () => {
  let service: NodeConverterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NodeConverterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
