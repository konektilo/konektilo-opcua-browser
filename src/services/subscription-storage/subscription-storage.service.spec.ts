import {TestBed} from '@angular/core/testing';

import {SubscriptionStorageService} from './subscription-storage.service';

describe('SubscriptionStorageService', () => {
  let service: SubscriptionStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubscriptionStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
