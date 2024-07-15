const scaleNames = {
  c: "Celcuis",
  f: "faranight",
};
function toCelcuis(fahreniheit){
   return ( fahreniheit - 320) * 5/ 9
}
function tofahreniheit(celcuis){
    return (celcuis * 9/ 5) + 32
}
function BoillingVerdict({ celcuis }) {
  if (celcuis >= 100) {
    return <div className="alert alert-success">L'eau bout</div>;
  }
  return <div className="alert alert-info">L'eau ne bout pas</div>;
}
class TemperatureInput extends React.Component {
  constructor(props) {
    super(props);
    // 
   this.handleChange = this.handleChange.bind(this)
  }

  handleChange(e) {
    this.props.onTemperatureChange(e.target.value)
  }
  render() {
    const { temperature } = this.props;

    const name= 'scale' + this.props.scale
    const scaleName = scaleNames[this.props.scale]
    return (
      <div>
        <div className="form-group ">
          <label htmlFor={name}>Temperature (en {scaleName})</label>
          <input
            type="text"
            id={name}
            value={temperature}
            onChange={this.handleChange}
            className="form-control"
          />
        </div>
      </div>
    );
  }
}

class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      temperature: 20,
    };
    this.handleTemperatureChange = this.handleTemperatureChange.bind(this)
   
  }
  handleTemperatureChange (temperature){
    this.setState({temperature})
  }
  render() {
    const { temperature } = this.state;
    const celcuis = temperature
    const fahreniheit =tofahreniheit(celcuis)
    return (
      <div>
       
        <TemperatureInput scale="c" temperature={celcuis}onTemperatureChange={this.handleTemperatureChange} />
        <TemperatureInput scale="f" temperature={fahreniheit} />
        <BoillingVerdict celcuis={parseFloat(temperature)} />
      </div>
    );
  }
}

ReactDOM.render(<Calculator />, document.querySelector(".app"));
