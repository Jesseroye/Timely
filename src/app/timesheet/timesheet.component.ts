import { Component, OnInit } from '@angular/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { TimesheetService } from './timesheet.service';
import { AuthService } from '../login-sign-up/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';




@Component({
  selector: 'app-timesheet',
  templateUrl: './timesheet.component.html',
  styleUrls: ['./timesheet.component.css']
})
export class TimesheetComponent implements OnInit {

  startTimeHour: number;
  startTimeMinutes: number;
  endTimeHour: number;
  endTimeMinutes: number;
  am_pm_toggleStart = '';
  am_pm_toggleEnd = '';

  totalTime = {
    hours: 0,
    minutes: 0
  };
  taskInfo = {
    workTitle: '',
    clientName: '',
    dateSelected: '',
    time: [],
    totalTime: ''
  };

  managerName = '';
  id='';
  clients:any;
  private clientSub: Subscription;
  address= '';
  userName = '';

  onAddTimeSheet() {
    if ( this.checkform()) {
    this.taskInfo.totalTime = `${this.totalTime.hours}:${this.totalTime.minutes}`;
    const task = this.taskInfo;
    this.timesheetService.addTask(task, this.router.url);
    this.reset();
     } else {
      alert('Please complete the form and review for submission');
    }
  }
  onAddTime() {
    this.taskInfo.time.push({startTime: `${this.startTimeHour}:${this.startTimeMinutes}${this.am_pm_toggleStart}`,
    endTime: `${this.endTimeHour}:${this.endTimeMinutes}${this.am_pm_toggleEnd}`});
    this.addTotalTime();
  }

  checkform() {
    if (this.totalTime.hours === 0 && this.totalTime.minutes === 0){
      return false;
    }
    if ( this.taskInfo.workTitle === '' || this.taskInfo.clientName === '' || this.taskInfo.dateSelected === '' ){
      return false;
    } else {
      return true;
    }
  }

  checkTimeForm(){
    if (this.startTimeHour === undefined || this.endTimeHour === undefined || this.endTimeMinutes === undefined ||
      this.startTimeMinutes === undefined) {
        alert('Please review timeslots for empty fields');
        return false;
    } else {
      return true;
    }
  }

  addTime(event: MatDatepickerInputEvent<Date>) {
    this.taskInfo.dateSelected = `${event.value}`;
  }

  reset() {
    this.startTimeHour = null;
    this.startTimeMinutes = null;
    this.endTimeHour = null;
    this.endTimeMinutes = null;
    this.am_pm_toggleStart = '';
    this.am_pm_toggleEnd = '';
  }
  resetComplete() {
    this.startTimeHour = null;
    this.startTimeMinutes = null;
    this.endTimeHour = null;
    this.endTimeMinutes = null;
    this.am_pm_toggleStart = '';
    this.am_pm_toggleEnd = '';
    this.totalTime = {
      hours: 0,
      minutes: 0
    };
    this.taskInfo = {
      workTitle: '',
      clientName: '',
      dateSelected: '',
      time: [],
      totalTime: ''
    };
  }
  addAmPmStart(event) {
    this.am_pm_toggleStart = `${event.value}`;
  }
  addAmPmEnd(event) {
    this.am_pm_toggleEnd = `${event.value}`;
  }

  addTotalTime() {
    let endTimeHour: number;
    let startTimeHour: number;
    let endTimeMinutes: number;
    let startTimeMinutes: number;
    if (this.checkTimeForm()){
      if ( this.am_pm_toggleEnd === 'AM' && this.am_pm_toggleStart === 'PM'
      || this.am_pm_toggleEnd === 'AM' && this.endTimeHour === 12) {
        alert('This time slot exceeds the date entered. Please seperate the times accordingly');
        return;
      }
      if (this.am_pm_toggleEnd === 'PM' && this.endTimeHour !== 12) {
        endTimeHour = this.endTimeHour + 12;
      } else {
        endTimeHour = this.endTimeHour;
      }
      if (this.am_pm_toggleStart === 'PM' && this.startTimeHour !== 12) {
        startTimeHour = this.startTimeHour + 12;
      } else {
        if (this.am_pm_toggleStart === 'AM' && this.startTimeHour === 12){
          startTimeHour = 0;
        } else {
          startTimeHour = this.startTimeHour;
        }
      }
      if (this.startTimeMinutes > this.endTimeMinutes) {
        endTimeHour = endTimeHour - 1;
        endTimeMinutes = this.endTimeMinutes + 60;
        startTimeMinutes = this.startTimeMinutes;
      } else {
        endTimeMinutes = this.endTimeMinutes;
        startTimeMinutes = this.startTimeMinutes;
      }
      const totalHoursTime = endTimeHour - startTimeHour;
      const totalMinutesTime = endTimeMinutes - startTimeMinutes;

      if (this.totalTime.hours === 0 && this.totalTime.minutes === 0) {
        this.totalTime.hours = totalHoursTime;
        this.totalTime.minutes = totalMinutesTime;
      } else {
        this.totalTime.hours = this.totalTime.hours + totalHoursTime;
        this.totalTime.minutes = this.totalTime.minutes + totalMinutesTime;
      }
      alert('You may enter another timeslot for the day');
      this.reset();
    } else {
      return;
    }
  }

  constructor(private timesheetService: TimesheetService, private router: Router, private authService: AuthService) { }

  ngOnInit() {
    this.managerName = this.authService.getManager();
    this.id = this.authService.getId();
    this.address = this.authService.getAddress();
    this.userName = this.authService.getUserName();
    this.timesheetService.getClients(this.id);
    this.timesheetService.getClientUpdateListener()
      .subscribe((clients) => {
        this.clients = clients;
      });
  }

}
