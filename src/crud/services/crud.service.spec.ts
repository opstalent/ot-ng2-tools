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
import { OAuthModule }      from 'ot-ng2-oauth';
import { CrudService }      from './crud.service';

class HttpServiceMock {}

describe('CrudService', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [OAuthModule],
            providers: [
                CrudService
            ]
        });
    }));

    it('can instantiate service when inject service', () => {
        inject([CrudService], (service: CrudService<any>) => {
            expect(service instanceof CrudService).toBe(true);
        });
    });

});