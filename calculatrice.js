

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentValue: '0',
      previousValue: null,
      operator: null,
      waitingForOperand: false
    };
  }

  handleDigit = digit => {
    const { currentValue, waitingForOperand } = this.state;

    if (waitingForOperand) {
      this.setState({
        currentValue: String(digit),
        waitingForOperand: false
      });
    } else {
      this.setState({
        currentValue: currentValue === '0' ? String(digit) : currentValue + digit
      });
    }
  };

  handleOperator = nextOperator => {
    const { currentValue, operator, previousValue } = this.state;
    const inputValue = parseFloat(currentValue);

    if (previousValue == null) {
      this.setState({
        previousValue: inputValue
      });
    } else if (operator) {
      const currentValue = previousValue || 0;
      const newValue = this.performCalculation(operator, currentValue, inputValue);

      this.setState({
        previousValue: newValue,
        currentValue: String(newValue)
      });
    }

    this.setState({
      waitingForOperand: true,
      operator: nextOperator
    });
  };

  performCalculation = (operator, left, right) => {
    switch (operator) {
      case '+':
        return left + right;
      case '-':
        return left - right;
      case '*':
        return left * right;
      case '/':
        return left / right;
      default:
        return right;
    }
  };

  handleDecimal = () => {
    const { currentValue, waitingForOperand } = this.state;

    if (waitingForOperand) {
      this.setState({
        currentValue: '0.',
        waitingForOperand: false
      });
    } else if (!currentValue.includes('.')) {
      this.setState({
        currentValue: currentValue + '.'
      });
    }
  };

  handleClear = () => {
    this.setState({
      currentValue: '0',
      previousValue: null,
      operator: null,
      waitingForOperand: false
    });
  };

  handleEqual = () => {
    const { currentValue, operator, previousValue } = this.state;
    const inputValue = parseFloat(currentValue);

    if (operator && previousValue != null) {
      this.setState({
        currentValue: String(this.performCalculation(operator, previousValue, inputValue)),
        previousValue: null,
        operator: null,
        waitingForOperand: false
      });
    }
  };

  renderButton = (label, onClick, color='') => (
    <button className={color} onClick={() => onClick(label)}>{label}</button>
  );

  render() {
    const { currentValue } = this.state;

    return (
      <div className="calculator">
        <div className="display">{currentValue}</div>
        <div className="buttons">
          <div className="button-row">
            {this.renderButton('7', this.handleDigit)}
            {this.renderButton('8', this.handleDigit)}
            {this.renderButton('9', this.handleDigit)}
            {this.renderButton('/', this.handleOperator, 'orange')}
          </div>
          <div className="button-row">
            {this.renderButton('4', this.handleDigit)}
            {this.renderButton('5', this.handleDigit)}
            {this.renderButton('6', this.handleDigit)}
            {this.renderButton('*', this.handleOperator, 'orange')}
          </div>
          <div className="button-row">
            {this.renderButton('1', this.handleDigit)}
            {this.renderButton('2', this.handleDigit)}
            {this.renderButton('3', this.handleDigit)}
            {this.renderButton('-', this.handleOperator, 'orange')}
          </div>
          <div className="button-row">
            {this.renderButton('0', this.handleDigit)}
            {this.renderButton('.', this.handleDecimal)}
            {this.renderButton('=', this.handleEqual, 'orange')}
            {this.renderButton('+', this.handleOperator, 'orange')}
          </div>
          <div className="button-row">
            {this.renderButton('C', this.handleClear, 'orange')}
          </div>
        </div>
      </div>
    );
  }
}
ReactDOM.render(<App />, document.querySelector(".app"));


// export default App;
