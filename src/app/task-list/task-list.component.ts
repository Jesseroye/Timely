import { Component, OnInit, OnDestroy } from '@angular/core';
import { TimesheetService } from '../timesheet/timesheet.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit, OnDestroy {
  tasks = [];
  private tasksSub: Subscription;

  constructor(public timesheetService: TimesheetService) { }

  ngOnInit() {
    this.timesheetService.getTasks();
    this.tasksSub = this.timesheetService.getTaskUpdateListener()
      .subscribe((tasks) => {
        this.tasks = tasks;
      });
  }

  ngOnDestroy() {
    this.tasksSub.unsubscribe();
  }
}
