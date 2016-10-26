import {
    NgModule,
    ModuleWithProviders
}                                   from '@angular/core';
import { CommonModule }             from '@angular/common';
import { ControlMessagesComponent } from './';

@NgModule({
    imports: [
        CommonModule,
    ],
    declarations: [
        ControlMessagesComponent
    ],
    exports: [

    ]
})
export class ControlMessagesModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: ControlMessagesModule,
            providers: [
            ]
        };
    }
}
