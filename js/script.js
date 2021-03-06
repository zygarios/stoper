const StopWatch = props => {
  const pad0 = props.pad0();
  return (
    <div className="stopwatch">
      {pad0(props.min)}:{pad0(props.sec)}:{pad0(Math.floor(props.ms))}
    </div>
  );
};
const Results = props => {
  return <ul>{props.stats}</ul>;
};

class App extends React.Component {
  state = {
    miliseconds: 0,
    seconds: 0,
    minutes: 0,
    running: false,
    counter: 0,
    results: []
  };
  reset() {
    this.setState({
      miliseconds: 0,
      seconds: 0,
      minutes: 0
    });
  }
  pad0(value) {
    let result = value.toString();
    if (result.length < 2) {
      result = "0" + result;
    }
    return result;
  }
  start() {
    if (!this.state.running) {
      this.setState({
        running: true,
        watch: setInterval(() => {
          this.calculate();
        }, 10)
      });
    }
  }
  print() {
    const {
      miliseconds: ms,
      seconds: sec,
      minutes: min,
      counter,
      results
    } = this.state;
    const newLi = (
      <li key={counter}>
        {counter + 1}. {this.pad0(min)}:{this.pad0(sec)}:
        {this.pad0(Math.floor(ms))}
      </li>
    );
    results.push(newLi);
  }
  calculate() {
    this.setState(prev => ({
      miliseconds: prev.miliseconds + 1
    }));
    if (this.state.miliseconds >= 100) {
      this.setState(prev => ({
        miliseconds: 0,
        seconds: prev.seconds + 1
      }));
    }
    if (this.state.seconds >= 60) {
      this.setState(prev => ({
        minutes: prev + 1,
        seconds: 0
      }));
    }
  }
  stop() {
    if (this.state.running) {
      this.setState({
        running: false
      });

      clearInterval(this.state.watch);
    } else if (!this.running) {
      this.setState(prev => ({
        counter: prev.counter + 1
      }));
      this.print();
      this.reset();
    }
  }
  render = () => {
    const { miliseconds, seconds, minutes, running, results } = this.state;
    return (
      <>
        <nav className="controls">
          <button
            href="#"
            className="button"
            id="start"
            onClick={() => this.start()}
          >
            Start
          </button>
          <button
            href="#"
            className="button"
            id="start"
            onClick={() => this.stop()}
          >
            {running ? "Stop" : "Resetuj"}
          </button>
        </nav>
        <StopWatch
          pad0={() => this.pad0}
          sec={seconds}
          min={minutes}
          ms={miliseconds}
        />
        <Results stats={results} />
      </>
    );
  };
}

ReactDOM.render(<App />, document.getElementById("root"));
