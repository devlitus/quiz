import { TestBed } from '@angular/core/testing';

import { ServieQuizService } from './servie-quiz.service';

describe('ServieQuizService', () => {
  let service: ServieQuizService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServieQuizService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
