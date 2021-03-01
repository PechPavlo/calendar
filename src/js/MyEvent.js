export default class MyEvent {
  constructor(day, time, eventName, members) {
    this.day = day;
    this.time = time;
    this.dayTime = `${day}${time}`;
    this.eventName = eventName;
    this.participants = members;
  }
}
