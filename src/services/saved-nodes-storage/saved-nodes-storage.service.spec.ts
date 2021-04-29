import {TestBed} from '@angular/core/testing';

import {SavedNodesStorageService} from './saved-nodes-storage.service';

describe('SavedNodesStorageService', () => {
  let service: SavedNodesStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SavedNodesStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
