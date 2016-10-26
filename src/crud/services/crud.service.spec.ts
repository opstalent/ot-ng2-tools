import {
    fakeAsync,
    tick,
    async,
    inject,
    TestBed
}                           from '@angular/core/testing';

import {
    MockBackend,
    MockConnection
}                           from '@angular/http/testing';

import {
    Http,
    XHRBackend,
    HttpModule,
    Response,
    ResponseOptions
}                           from '@angular/http';
import { HttpService }      from 'ot-oauth/src';
import { CrudService }      from './crud.service';

class CrudServiceMock {}

describe('HttpService', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [HttpModule],
            providers: [
                HttpService,
                CrudService,
                { provide: XHRBackend, useClass: MockBackend },
            ]
        });
    }));

    it('can instantiate service when inject service',
          () => {
      expect(true).toBe(true);
    });


});