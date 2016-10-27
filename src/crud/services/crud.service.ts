import { 
    URLSearchParams, 
    RequestOptionsArgs 
}                       from '@angular/http';
import { HttpService }  from 'ot-ng2-oauth';
import { Entity }       from '../models/entity';
import { 
    Observable, 
    Subscription, 
    Subject 
}                       from 'rxjs/Rx';

declare var _: any;

export class CrudService<T extends Entity> {
    
    protected baseUrl: string;
    protected path: string;
    protected entities: Subject<T[]>;
    protected total: Subject<number>;
    protected errors: Subject<any>;
    protected dataStore: {
        entities: T[],
        total: number,
        errors: any
    };

    constructor(protected http: HttpService) {
        this.dataStore = { entities: [], total: 0, errors: [] };
        this.entities = <Subject<T[]>>new Subject();
        this.total = <Subject<number>>new Subject();
        this.errors = <Subject<any>>new Subject();
    }

    get entities$(): Observable<T[]> {
        return this.entities.asObservable();
    }

    get total$(): Observable<number> {
        return this.total.asObservable();
    }

    get errors$(): Observable<any> {
        return this.errors.asObservable();
    }

    loadAll(parameters?: any, options?: RequestOptionsArgs): Subscription {
        let url = `${this.baseUrl}/${this.path}`;
        if (parameters) {
            let search = new URLSearchParams();
            for (let key in parameters) {
                if (parameters.hasOwnProperty(key)) {
                    search.set(key, parameters[key]);
                }
            }
            url += `?${search}`;
        }

        return this.http.get(url, options)
            .map(resp => resp.json())
            .subscribe(data => {
                if (data.total) {
                    this.dataStore.total = data.total;
                    this.total.next(this.dataStore.total);
                }
                if (data.items) {
                    this.dataStore.entities = data.items;
                } else {
                    this.dataStore.entities = data;
                }

                this.entities.next(this.dataStore.entities);
            }, error => {
                console.log(`Could not load ${this.path} entities.`);
            });
    }

    load(id: number, options?: RequestOptionsArgs): Subscription {
        return this.http.get(`${this.baseUrl}/${this.path}/${id}`, options)
            .map(response => response.json())
            .subscribe(data => {
                let notFound = true;

                this.dataStore.entities.forEach((item, index) => {
                    if (item.id === data.id) {
                        this.dataStore.entities[index] = data;
                        notFound = false;
                    }
                });

                if (notFound) {
                    this.dataStore.entities.push(data);
                }

                this.entities.next(this.dataStore.entities);
            }, error => {
                console.log(`Could not load ${this.path} entities.`);
            });
    }

    create(entity: any, options?: RequestOptionsArgs) {
        this.http.post(`${this.baseUrl}/${this.path}`, JSON.stringify(entity), options)
            .map(response => response.json())
            .subscribe(
            data => {
                this.dataStore.entities.push(data);
                this.entities.next(this.dataStore.entities);
            },
            error => {
                this.dataStore.errors = error;
                this.errors.next(this.dataStore.errors);
            }
            );
    }

    update(entity: any, options?: RequestOptionsArgs): Subscription {
        return this.http.put(`${this.baseUrl}/${this.path}/${entity.id}`, JSON.stringify(entity), options)
            .map(response => response.json())
            .subscribe(data => {
                if (this.dataStore.entities.length > 0) {
                    this.dataStore.entities.forEach((todo, i) => {
                        if (todo.id === data.id) {
                            this.dataStore.entities[i] = _.merge(this.dataStore.entities[i], data);
                        } else {
                            this.dataStore.entities.push(data);
                        }
                    });
                } else {
                    this.dataStore.entities.push(data);
                }

                this.entities.next(this.dataStore.entities);
            }, error => console.log(`Could not update ${this.path} entity with id:${entity.id}.`));
    }

    remove(id: number, options?: RequestOptionsArgs): Subscription {
        return this.http.delete(`${this.baseUrl}/${this.path}/${id}`, options)
            .subscribe(response => {
                this.dataStore.entities.forEach((t, i) => {
                    if (t.id === id) {
                        this.dataStore.entities.splice(i, 1);
                    }
                });

                this.entities.next(this.dataStore.entities);
            }, error => console.log(`Could not delete ${this.path} entity with id:${id}.`));
    }

    csv(parameters?: any): Observable<string> {
        let url = `${this.baseUrl}/${this.path}/export`;
        if (parameters) {
            let search = new URLSearchParams();
            for (let key in parameters) {
                if (parameters.hasOwnProperty(key)) {
                    search.set(key, parameters[key]);
                }
            }
            url += `?${search}`;
        }
        return this.http.get(url, parameters)
            .map(resp => resp.text());
    }
}
