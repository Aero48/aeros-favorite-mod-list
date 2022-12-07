import { TestBed } from '@angular/core/testing';

import { ModrinthService } from './modrinth.service';

describe('ModrinthService', () => {
  let service: ModrinthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModrinthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
