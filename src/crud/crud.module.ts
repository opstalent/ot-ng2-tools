import {
    NgModule,
    ModuleWithProviders
}                               from '@angular/core';
import {CommonModule}           from '@angular/common';
import {CrudService}            from './services/crud.service';

@NgModule({
    imports: [
        CommonModule,
    ],
    declarations: [

    ],
    exports: [

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
