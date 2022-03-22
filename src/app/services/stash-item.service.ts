import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from './../../environments/environment'
import { StashTab } from '../models/stash-tab.mode';
import { Observable, of } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class StashItemService {

    constructor(private http: HttpClient) { }

    getStashTabs(): Observable<Array<StashTab>> {
        return this.http.get<any>(`${environment.api}public-stash-tabs`);
    }

    getStashTabById(id: string): Observable<Array<StashTab>> {
        return this.http.get<Array<StashTab>>(`${environment.api}public-stash-tabs`, { params: { id } });
    }

    getNextChangeId(): Observable<string> {
        return of('b9799e92-0a0a-456f-b427-f4c67ed114f3');
    }
}
