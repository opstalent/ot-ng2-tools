import { Component, Input }   from '@angular/core';
import { FormControl }        from '@angular/forms';
import { TranslateService }   from 'ng2-translate/ng2-translate';
import { Observable }         from 'rxjs';

@Component({
    selector: 'control-message',
    templateUrl: './control-messages.component.html',
    styleUrls: ['./control-messages.component.scss']
})
export class ControlMessagesComponent {

    @Input() control: FormControl;
    private message: string;

    constructor(
        private translateService: TranslateService
    ) {}

    /**
     * @readonly
     * 
     * @memberOf ControlMessagesComponent
     */
    get errorMessage(): Observable<any> {
        
        for (let propertyName in this.control.errors) {
            if (this.control.errors.hasOwnProperty(propertyName) && this.control.touched) {
                let subscribeTranslation = this.translateService.get(`formErrorMessage.${propertyName}`);
                subscribeTranslation.subscribe(errorString => this.message = errorString);
                return subscribeTranslation;
            }
        }
        return null;
    }
}
