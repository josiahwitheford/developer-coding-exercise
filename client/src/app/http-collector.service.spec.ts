import { TestBed } from '@angular/core/testing';

import { HttpCollectorService } from './http-collector.service';

describe('HttpCollectorService', () => {
  let service: HttpCollectorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpCollectorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
