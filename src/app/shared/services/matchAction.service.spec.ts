/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { MatchActionService } from './matchAction.service';

describe('Service: MatchAction', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MatchActionService]
    });
  });

  it('should ...', inject([MatchActionService], (service: MatchActionService) => {
    expect(service).toBeTruthy();
  }));
});
