import {
    NgModule,
    ModuleWithProviders
}                               from '@angular/core';
import {CommonModule}           from '@angular/common';
import {OAuthModule}            from 'ot-ng2-oauth';
import {CrudService}            from './services/crud.service';

@NgModule({
    imports: [
        OAuthModule,
        CommonModule,
    ]
})
export class CrudModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: CrudModule,
            providers: [
                CrudService
            ]
        };
    }
}
