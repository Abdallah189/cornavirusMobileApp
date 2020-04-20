import { TestBed } from '@angular/core/testing';

import { ReponseService } from './reponse.service';

describe('ReponseService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ReponseService = TestBed.get(ReponseService);
    expect(service).toBeTruthy();
  });
});
