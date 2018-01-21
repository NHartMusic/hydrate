import RNLocalNotifications from 'react-native-local-notifications';

class Math {

  constructor(options) {
    this.calculateMoments = this.calculateMoments.bind(this);
    this.notify = this.notify.bind(this);
    this.generateTimeouts = this.generateTimeouts.bind(this);

    this.frequency = options.frequency;
    this.startTime = options.startTime; // milleseconds since midnight
    this.endTime = options.endTime; // milliseconds since midnight

    this.moments = [];
    this.timeoutIds = [];
    this.midnightID = undefined;

    const date = new Date();
    const offset = date.getTimezoneOffset();
    this.currentDate = new Date(Date.now() - (offset * 60 * 1000)); //date
    this.currentMoment = this.currentDate.getTime(); // milliseconds
  }

  notify() {
    RNLocalNotifications.createNotification(1, 'Drink water, dangus', '2018-01-21 1:00', 'default');
  }

  generateTimeouts() {
    for (let i = 0; i < this.moments.length; i++) {
      const moment = this.moments.pop;
      const id = setTimeout(() => {
        this.notify();
      }, moment);
      this.timeoutIds.push(id);
    }
  }

  calculateMoments() {
    const totalWindow = this.endTime - this.startTime;
    const singleWindow = Math.round(totalWindow / this.frequency);
    for (let i = 0; i < this.frequency; i++) {
      const newOffset = Math.floor(Math.random() * singleWindow);
      const moment = this.startTime + (i * singleWindow) + newOffset;
      this.moments.push(moment);
    }
  }

  setMidnightInterval() {
    const msPerDay = (24 * 60 * 60 * 1000);
    const msTilMidnight = msPerDay - (this.currentMoment % msPerDay);
    this.midnightID = setTimeout(() => {
      this.calculateMoments();
      this.generateTimeouts();
    }, msTilMidnight);
  }

}
