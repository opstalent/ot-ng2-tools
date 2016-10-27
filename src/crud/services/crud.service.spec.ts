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
import { OAuthModule, HttpService }      from 'ot-ng2-oauth';
import { CrudService }      from './crud.service';

class HttpServiceMock {}

describe('CrudService', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [OAuthModule],
            providers: [
                CrudService,
                { provide: HttpService, useClass: HttpServiceMock }
            ]
        });
    }));

    it('can instantiate service when inject service', () => {
        inject([CrudService], (service: CrudService<any>) => {
            expect(service instanceof CrudService).toBe(true);
        });
    });

    it('can provide the HttpServiceMock as HttpService',
        inject([HttpService], (backend: HttpServiceMock) => {
            expect(backend).not.toBeNull('HttpService should be provided');
        })
    );

});