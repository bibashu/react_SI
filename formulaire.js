class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
     nom: '',
     prenom:'',
     newsletter: false
    };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(e) {
    const name = e.target.name
    const type = e.target.type
    const value = type === 'checkbox' ? e.target.checked: e.target.value
    this.setState({
        // la valeeurqui correspond au nom
     [name]:value
    });
  }
  render() {
    return (
       <div>
            <div>
                <label htmlFor="nom">Nom: </label>
                <input type="text" value={this.state.nom} onChange={this.handleChange} id="nom" name="nom" />
            </div>
            <div>
                <label htmlFor="prenom">Prenom: </label>
                <input type="text" value={this.state.prenom} onChange={this.handleChange}  id="prenom" name="prenom" />
            </div>
            <div>
                <label htmlFor="newsletter">S'abonner</label>
                <input type="checkbox" checked={this.state.newsletter} onChange={this.handleChange}  id="newsletter" name="newsletter"/>
            </div>
            {/* champs cotroler */}
            <input type="text"/>
            {JSON.stringify(this.state)}
       </div>
    );
  }
}

ReactDOM.render(<Home />, document.querySelector(".app"));
