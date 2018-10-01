import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class TimesheetService {

  private tasks = [];
  private clients = [];
  private tasksUpdated = new Subject<any>();
  private clientsUpdated = new Subject<any>();

  addTask(task, url) {
    this.http.post<{ message: string }>(`http://localhost:3000/api${url}`, task)
    .subscribe((responseData) => {
      this.tasks.push(task);
      this.tasksUpdated.next([...this.tasks]);
    });
  }
  getTaskUpdateListener() {
    return this.tasksUpdated.asObservable();
  }

  getClientUpdateListener() {
    return this.clientsUpdated.asObservable();
  }

  getTasks() {
    this.tasksUpdated.next([...this.tasks]);
  }

  getClientList(){
    this.clientsUpdated.next([...this.clients]);
  }


  getClients(id){
    this.http.get<{ clients: any }>(`http://localhost:3000/api/clients/${id}`)
    .subscribe((responseData) => {
      this.clients = responseData.clients;
      this.clientsUpdated.next([...this.clients]);
    });
  }

  constructor(private http: HttpClient) { }
}
