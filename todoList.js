const inputArea = {
    width: 235,
    margin: 5,
    height: 50,
  };
  const styleFlex = {
    display: "flex",
  };
  
  class MyToDoList extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        userInput: "",
        toDoList: [],
      };
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleChange = this.handleChange.bind(this);
      this.handleDelete = this.handleDelete.bind(this); // Bind the delete method
    }

    handleSubmit() {
      if (this.state.userInput.trim() !== "") {
        this.setState((state) => ({
          toDoList: [...state.toDoList, state.userInput],
          userInput: "",
        }));
      }
    }

    handleDelete(index) {
      this.setState((state) => ({
        toDoList: state.toDoList.filter((_, i) => i !== index),
      }));
    }

    handleChange(e) {
      this.setState({
        userInput: e.target.value,
      });
    }

    render() {
      const items = this.state.toDoList.map((item, index) => (
        <li style={{ listStyle: "none" }} key={index}>
          {item}
          <button
            onClick={() => this.handleDelete(index)} // Pass the index to the delete method
            style={{ marginLeft: 5 }}
          >
            Supprimer
          </button>
        </li>
      ));
      return (
        <div>
          <h1>To Do List: composant de classe</h1>
          <div style={styleFlex}>
            <input
              onChange={this.handleChange}
              value={this.state.userInput}
              style={inputArea}
              placeholder="ajouter tache"
            />
            <br />
            <button
              style={{
                border: "none",
                background: "green",
                color: "white",
                height: 50,
                marginTop: 5,
              }}
              onClick={this.handleSubmit}
            >
              Ajouter
            </button>
          </div>
          <ul>{items}</ul>
        </div>
      );
    }
  }
  
  ReactDOM.render(<MyToDoList />, document.querySelector(".app"));
  