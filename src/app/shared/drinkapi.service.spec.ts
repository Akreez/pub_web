import { TestBed } from '@angular/core/testing';

import { DrinkapiService } from './drinkapi.service';

describe('DrinkapiService', () => {
  let service: DrinkapiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DrinkapiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
