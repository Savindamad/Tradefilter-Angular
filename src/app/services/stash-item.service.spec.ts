import { TestBed } from '@angular/core/testing';

import { StashItemService } from './stash-item.service';

describe('StashItemService', () => {
  let service: StashItemService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StashItemService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
