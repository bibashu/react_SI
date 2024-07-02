// LES COMPOSANTS 

function WelcomeFunc({name, children}) {

     return <div>
        <h1>Bonjour {name}</h1>
        <p>{children}</p>
        </div>
}
class Welcome extends React.Component{
    render(){
        return <div>
             <h1>Bonjour {this.props.name}</h1>
             <p>{this.props.children}</p>
        </div>
    }
}
class Clock extends React.Component{
    constructor (props){
        super(props)
        this.state = {date: new Date()}
        this.timer = null
    }
    componentDidMount(){
        this.timer = window.setInterval(this.tick.bind(this)

        , 1000)
    }
    ComponentWillUnmount(){
        window.clearInterval(this.timer)
    }
    tick(){
        this.setState({date: new Date()})
    }


    render(){
      
        return <div>
           On est le {this.state.date.toLocaleDateString()} {this.state.date.toLocaleTimeString()}
        </div>
    }
}
class Incrementer extends React.Component{
    constructor(props){
        super(props)
        // console.log(props)
        // Pour creer un  états

        this.state  = {n: props.start,timer: null }
      
       }
       componentDidMount(){
        // window.setInterval(this.increment.bind(this), 1000): Configure une minuterie pour appeler la incrementméthode toutes les secondes (1 000 millisecondes). this.increment.bind(this)garantit que la incrementméthode a le contexte correct this.
        this.play()
       }
    //    méthode de cycle de vie est appelée juste avant que le composant ne soit supprimé du DOM.

       ComponentWillUnmount(){
        // Efface l'intervalle pour arrêter l' incrementappel de la méthode après le démontage du composant, évitant ainsi les fuites de mémoire.
        window.clearInterval(this.state.timer)
       }
       increment(){
        // setState quipermet demodifierl'état
        // this.setState({n: this.state.n + 1}) -- Methode no recommander
        // met à jour l'état à l'aide d'une fonction pour garantir qu'il obtient la valeur d'état la plus récente.
        this.setState(function(state, props){
            return {n: this.state.n + props.step}
        })
       }
       pause(){
        window.clearInterval(this.state.timer)
        this.setState({
            timer: null
        })

       }
       play(){
        this.setState({
            timer:window.setInterval(this.increment.bind(this), 1000)

        })

       }
       reset(){
        this.setState((state, props) => ({n: state.n + props.start}))
       }
    render(){
        return <div>Valeur: {this.state.n}
        {this.state.timer ?
            <button onClick={this.pause.bind(this)}>Pause</button>:
            <button onClick={this.play.bind(this)}>Play</button>}
             <button onClick={this.reset.bind(this)}>Réinitialiser</button>
        </div>
    }
}

Incrementer.defaultProps = {
    start: 0,
    step: 1
}
// ---------Les evenementst React ------------

// class ManualIncrementer extends React.Component{
//     constructor(props){
//         super(props)
//         this.state = {n: 0}
//     }
//     increment(){
//         this.setState((state, props) => ({n: this.state.n + 1}))
           
//     }
//     render(){
//         return <div>Valeur: {this.state.n} <button onClick={this.increment.bind(this)}>Incrementer</button></div>
//     }
// }





function Home (){
    return <div>
        <Welcome name="Aby"/>
        <Welcome name="Toto"/>
     <Incrementer />
    </div>
}
// CHILDREN pour utiliser le contenu du composant
ReactDOM.render(<Home />, document.querySelector('.app'))
