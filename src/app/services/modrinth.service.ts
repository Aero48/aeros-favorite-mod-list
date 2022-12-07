import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ModrinthService {
  private searchURL = `https://api.modrinth.com/v2/search?limit=100&query=`;

  constructor(private httpClient: HttpClient) {}

  getModQuery(query: string): Observable<any> {
    return this.httpClient.get(this.searchURL + query);
  }
}
