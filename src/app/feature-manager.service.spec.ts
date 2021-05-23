import { TestBed } from '@angular/core/testing';

import { FeatureManagerService } from './feature-manager.service';

describe('FeatureManagerService', () => {
  let service: FeatureManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FeatureManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
