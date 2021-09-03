//
class CountdownTimer {
  //метод класса - коструктор в котором обьяв. переменные и получаем значения
  constructor({ selector, targetDate }) {
    this.selector = document.querySelector(selector);
    this.daysRef = this.selector.querySelector('[data-value="days"]');
    this.hoursRef = this.selector.querySelector('[data-value="hours"]');
    this.minsRef = this.selector.querySelector('[data-value="mins"]');
    this.secsRef = this.selector.querySelector('[data-value="secs"]');
    this.targetDate = targetDate;
  }
  // метод расчета переменных времени
  getTime(time) {
    const days = Math.floor(time / (1000 * 60 * 60 * 24));

    const hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

    const mins = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));

    const secs = Math.floor((time % (1000 * 60)) / 1000);
    return { days, hours, mins, secs };
  }
  //метот записи текстового контента времени
  updateTime(time) {
    const { days, hours, mins, secs } = this.getTime(time);

    this.daysRef.textContent = this.padStartTime(days);
    this.hoursRef.textContent = this.padStartTime(hours);
    this.minsRef.textContent = this.padStartTime(mins);
    this.secsRef.textContent = this.padStartTime(secs);
  }
  //метод возвнащает 2-х значное число или 0 если нет цифры
  padStartTime(value) {
    return String(value).padStart(2, '0');
  }
  // метод задает начало отсчета времени от текущего момента до указанной даты с тайаутом 1 секунда
  start() {
    //(раздница в мс)  (будущая дата)   (дата сегодняшняя)
    const time = this.targetDate - Date.now();
    if (time <= 0) {
      return;
    }
    this.updateTime(time);
    setTimeout(() => {
      this.start();
    }, 1000);
  }
}
//переменная заданного времени
const timer = new CountdownTimer({
  selector: '#timer-1',
  targetDate: new Date('Jul 17, 2022'),
});
//вызов функции начала отсчета
timer.start();
