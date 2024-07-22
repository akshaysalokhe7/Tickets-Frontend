import { Injectable } from '@angular/core';
import { TicketData } from './app.component';
import { HttpClient } from '@angular/common/http'

const serveURL = "http://localhost:3000/tickets";

@Injectable({
  providedIn: 'root'
})
export class AppService {
  constructor(private http: HttpClient) { }

  addTicket(data:TicketData){
    return this.http.post(`${serveURL}/add`,data);
  }

  getTickets(){
    return this.http.get(`${serveURL}/getAll`);
  }

  deleteTicket(id:number){
    return this.http.delete(`${serveURL}/delete/${id}`);
  }
}
