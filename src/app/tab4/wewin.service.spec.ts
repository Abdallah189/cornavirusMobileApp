import { TestBed } from '@angular/core/testing';

import { WewinService } from './wewin.service';

describe('WewinService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WewinService = TestBed.get(WewinService);
    expect(service).toBeTruthy();
  });
});
