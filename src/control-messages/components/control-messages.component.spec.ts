import {Injector}       from '@angular/core';
import {FormControl}    from '@angular/forms';
import {By}             from '@angular/platform-browser';
import {
    ResponseOptions, 
    Response, 
    XHRBackend, 
    HttpModule
}                       from '@angular/http';
import {
    MockBackend, 
    MockConnection
}                       from '@angular/http/testing';
import {
    TranslateService, 
    TranslateModule
}                       from 'ng2-translate/ng2-translate';
import {
    getTestBed, 
    TestBed, 
    ComponentFixture
}                       from '@angular/core/testing';
import {ControlMessagesComponent}   from './control-messages.component';

const mockBackendResponse = (connection: MockConnection, response: string) => {
    connection.mockRespond(new Response(new ResponseOptions({body: response})));
};

describe('TranslateService', () => {
    let injector: Injector;
    let backend: MockBackend;
    let translate: TranslateService;
    let connection: MockConnection; // this will be set when a new connection is emitted from the backend.
    
    let fixture: ComponentFixture<ControlMessagesComponent>;
    let comp: ControlMessagesComponent;
    let element: any;
        let errors = {
            required: true
        };

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpModule, TranslateModule.forRoot()],
            providers: [
                {provide: XHRBackend, useClass: MockBackend}
            ],
            declarations: [ControlMessagesComponent]
        });

        injector = getTestBed();
        backend = injector.get(XHRBackend);
        translate = injector.get(TranslateService);

        // sets the connection when someone tries to access the backend with an xhr request
        backend.connections.subscribe((c: MockConnection) => connection = c);

        fixture = TestBed.createComponent(ControlMessagesComponent);
        element = fixture.nativeElement;   

        comp = fixture.componentInstance;
        comp.control = new FormControl();     
        comp.control.markAsTouched();

        translate.use('en');
    });

    afterEach(() => {
        injector = undefined;
        backend = undefined;
        translate = undefined;
        connection = undefined;
    });

    it('is defined', () => {
        expect(TranslateService).toBeDefined();
        expect(translate).toBeDefined();
        expect(translate instanceof TranslateService).toBeTruthy();
    });

    it('(view)should be able set translations in div', () => {
        comp.control.setErrors(errors);
        comp.errorMessage.subscribe( data => {
           fixture.detectChanges();
           let viewInsideText = element.querySelector('div').innerText;
           expect(viewInsideText).toBe(data);
        });

        mockBackendResponse(connection, '{"formErrorMessage.required": "Required"}');

    });

    it('(view)should have not div when no errors', () => {
        
        comp.control.setErrors({});
        let eM = comp.errorMessage;
        if (eM !== null) {
            eM.subscribe( data => {
                fixture.detectChanges();
                let divs = fixture.debugElement.queryAll(By.css('div'));
                expect(divs.length).toBe(0);
            });
        } else {
            fixture.detectChanges();
            let divs = fixture.debugElement.queryAll(By.css('div'));
            expect(divs.length).toBe(0);
        }

        mockBackendResponse(connection, '{"formErrorMessage.required": "Required"}');

    });


});
