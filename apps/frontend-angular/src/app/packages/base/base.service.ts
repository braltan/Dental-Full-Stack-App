import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

export interface CrudOperations<T, ID> {
    save(t: T): Observable<T>;
    findOne(id: ID): Observable<T>;
    findAll(): Observable<T[]>;
    delete(id: ID): Observable<any>;
}


export abstract class BaseService<T, ID> implements CrudOperations<T, ID> {

    constructor(
        protected _http: HttpClient,
        protected _base: string
    ) {}

    save(t: T): Observable<T> {
        return this._http.post<T>(this._base, t);
    }

    findOne(id: ID): Observable<T> {
        return this._http.get<T>(this._base + '/' + id);
    }

    findAll(): Observable<T[]> {
        return this._http.get<T[]>(this._base);
    }

    delete(id: ID): Observable<T> {
        return this._http.delete<T>(this._base + '/' + id);
    }
    deleteAll(): Observable<T> {
        return this._http.delete<T>(this._base + '/');
    }
}
