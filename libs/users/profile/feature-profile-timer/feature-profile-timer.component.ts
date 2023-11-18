import {ChangeDetectorRef, Component, inject, OnInit} from "@angular/core";
import { interval} from "rxjs";
import {LocalStorageTimerService} from "./feature-profile-timer.component.spec";
import {ITime} from "./feature-profile-models/IType";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";

@Component({
  selector: 'feature-profile-timer',
  styleUrls:['./feature-profile-timer.component.scss'],
  standalone: true,
  imports: [
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './feature-profile-timer.component.html'
})
export class FeatureProfileTimerComponent implements OnInit {
  cdr = inject(ChangeDetectorRef);
  LocalStore = inject(LocalStorageTimerService)

  isStart: boolean = false

  time: ITime = {
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  }
showMinutes:string= '00'
showSeconds:string= '00'

  ngOnInit() {
  this.getCurrentTimer()
  }
  getCurrentTimer() {
    let LocalSeconds = this.LocalStore.getItem()
    if (LocalSeconds) {
      console.log('get')
      this.time = JSON.parse(LocalSeconds)
    }
  }

  clearTimer() {
    this.LocalStore.removeItem()
    this.time = {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    }
    this.showTime()
  }
  showTime(){
    if(this.time.minutes < 10){
      this.showMinutes =`0${this.time.minutes}`
    }else {
      this.showMinutes = `${this.time.minutes}`
    }
    if(this.time.seconds < 10){
      this.showSeconds =`0${this.time.seconds}`
    }else {
      this.showSeconds = `${this.time.seconds}`
    }
  }

  startTimer() {
    this.isStart = !this.isStart
    let timer = interval(100).subscribe(d => {

      this.cdr.markForCheck()
      this.cdr.detectChanges()
      if (!this.isStart) {
        this.LocalStore.setItem(JSON.stringify(this.time))
        timer.unsubscribe()
        return
      }
      this.showTime()
      this.changeTime()
    })

    if (!this.isStart) {
      timer.unsubscribe()
    }
  }
changeTime(){
  this.time.seconds +=1
  if (this.time.seconds >= 60) {
    this.time.minutes += 1
    this.time.seconds = 0
  }
  if (this.time.minutes === 60) {
    this.time.hours +=1
    this.time.minutes = 0
  }

  if (this.time.hours === 24) {
    this.time.days += 1
    this.time.hours = 0
  }
}
}
