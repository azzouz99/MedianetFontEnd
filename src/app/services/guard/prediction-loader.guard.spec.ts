import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { predictionLoaderGuard } from './prediction-loader.guard';

describe('predictionLoaderGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => predictionLoaderGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
