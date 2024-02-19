import React from "react";

class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
    };
  }

  // seperti pada angular ngOnInit
  componentDidMount() {
    this.setState({ count: 1 });
  }

  // seperti pada angular update
  componentDidUpdate() {
    console.log("Component did update");
    if ((this.state.count = 0)) {
      this.setState({ count: 5 });
    }
  }

  render() {
    return (
      <div className="flex items-center">
        <button
          className="bg-black text-white p-3"
          onClick={() => this.setState({ count: this.state.count - 1 })}>
          -
        </button>
        <h1 className="mx-5">{this.state.count}</h1>
        <button
          className="bg-black text-white p-3"
          onClick={() => this.setState({ count: this.state.count + 1 })}>
          +
        </button>
      </div>
    );
  }
}

export default Counter;
