class Stopwatch {
  constructor(display, results) {
    this.running = false;
    this.display = display;
    this.results = results;
    this.reset();
    this.print(this.times);
    this.counter = 0;
  }

  reset() {
    this.times = {
      minutes: 0,
      seconds: 0,
      miliseconds: 0
    };
  }

  print() {
    this.display.innerText = this.format(this.times);
  }
  format(times) {
    return `${this.pad0(times.minutes)}:${this.pad0(times.seconds)}:${this.pad0(
      Math.floor(times.miliseconds)
    )}`;
  }
  pad0(value) {
    let result = value.toString();
    if (result.length < 2) {
      result = "0" + result;
    }
    return result;
  }
  start() {
    if (!this.running) {
      this.running = true;
      this.watch = setInterval(() => {
        this.step();
      }, 10);
    }
  }
  step() {
    if (!this.running) return;
    this.calculate();
    this.print();
  }

  calculate() {
    this.times.miliseconds += 1;
    if (this.times.miliseconds >= 100) {
      this.times.seconds += 1;
      this.times.miliseconds = 0;
    }
    if (this.times.seconds >= 60) {
      this.times.minutes += 1;
      this.times.seconds = 0;
    }
  }

  stop() {
    if (this.running) {
      this.running = false;
      clearInterval(this.watch);
    } else if (!this.running) {
      this.counter++;
      const li = document.createElement("li");
      li.textContent = `${this.counter}. ${this.format(this.times)}`;
      this.results.append(li);
      this.reset();
      this.print(this.times);
    }
  }
}

const stopwatch = new Stopwatch(
  document.querySelector(".stopwatch"),
  document.querySelector(".results")
);

let startButton = document.getElementById("start");
startButton.addEventListener("click", () => stopwatch.start());

let stopButton = document.getElementById("stop");
stopButton.addEventListener("click", () => stopwatch.stop());
