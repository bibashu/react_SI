class Table extends React.Component {
  render() {
    return (
      <div className="border-top mt-5 pt-3">
        <h2 className="text-center mt-3">Utilisateurs</h2>
        <div className="table-responsive">
          <table id="table" className="table table-striped table-hover w-100">
            <thead>
              <tr className="border">
                <th scope="col">Prenom</th>
                <th scope="col">Nom</th>
                <th scope="col">Email</th>
                <th scope="col">Telephone</th>
                <th className="text-center" scope="col">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody id="tbody" className="w-100">
              {this.props.formdonees.map((user, index) => (
                <tr key={index}>
                  <td>{user.prenom}</td>
                  <td>{user.nom}</td>
                  <td>{user.email}</td>
                  <td>{user.telephone}</td>
                  <td className="text-center">
                    <button
                      onClick={() => this.props.onEdit(index)}
                      className="btn btn-warning btn-sm"
                    >
                      Modifier
                    </button>
                    <button
                      onClick={() => this.props.onDelete(index)}
                      className="btn btn-danger btn-sm ms-2"
                    >
                      Supprimer
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

class Formulaire extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      prenom: "",
      nom: "",
      email: "",
      telephone: "",
      formdonees: [],
      editIndex: null,
    };
    this.handleChange = this.handleChange.bind(this);
    this.submitForm = this.submitForm.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }
  componentDidMount() {
    const savedUsers = localStorage.getItem('users');
    if (savedUsers) {
      try {
        this.setState({ formdonees: JSON.parse(savedUsers) });
      } catch (e) {
        console.error('Error parsing localStorage data', e);
      }
    }
  }
  componentDidUpdate(_, prevState) {
    if (prevState.formdonees !== this.state.formdonees) {
      localStorage.setItem('users', JSON.stringify(this.state.formdonees));
    }
  }

 

  handleChange(event) {
    const { id, value } = event.target;
    this.setState({ [id]: value });
  }

  submitForm(e) {
    e.preventDefault();
    const { prenom, nom, email, telephone, formdonees, editIndex } = this.state;
    const info = { prenom, nom, email, telephone };

    if (editIndex !== null) {
      const updatedUsers = formdonees.slice();
      updatedUsers[editIndex] = info;
      this.setState({ formdonees: updatedUsers, editIndex: null });
      Swal.fire({
        title: "Modification reussi",
        text: "Click Okay",
        icon: "success",
      });
    } else {
      this.setState({
        formdonees: [...formdonees, info],
      
      });
 

      Swal.fire({
        title: "Ajout reussi",
        text: "Click Okay",
        icon: "success",
      });
    }

    this.setState({
      prenom: "",
      nom: "",
      email: "",
      telephone: "",
    });

    e.currentTarget.reset();
  }

  handleEdit(index) {
    const user = this.state.formdonees[index];
    this.setState({
      prenom: user.prenom,
      nom: user.nom,
      email: user.email,
      telephone: user.telephone,
      editIndex: index,
    });
  }

  handleDelete(index) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });
    swalWithBootstrapButtons
      .fire({
        title: "Etes-vous sure ?",
        text: "Vous serez plus en mesure de revenir en arriere!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Oui, Supprimer !",
        cancelButtonText: "No, annulez!",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          swalWithBootstrapButtons.fire({
            title: "Supprimer avec success!",
            text: "L'enregistrement a été supprimer.",
            icon: "success",
          });
          //   Pour la suppression
          const formdonees = this.state.formdonees.filter(
            (_, i) => i !== index
          );
          this.setState({ formdonees });
          //   Pour la suppression
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire({
            title: "Opération annulée",
            text: "Your imaginary file is safe :)",
            icon: "error",
          });
        }
      });
  }

  render() {
    const { prenom, nom, email, telephone, editIndex } = this.state;

    return (
      <div className="container">
        <h1 className="text-center fs-6 mt-5">
          Jeemacoder gestion utilisateurs
        </h1>
        <form
          id="form"
          className="shadow p-3 mx-auto my-3 w-50 "
          onSubmit={this.submitForm}
        >
          <div className="mb-3 d-sm-flex justify-content-center">
            <div>
              <label htmlFor="prenom" className="form-label">
                Prenom
              </label>
              <input
                required
                type="text"
                className="form-control"
                id="prenom"
                value={prenom}
                onChange={this.handleChange}
              />
            </div>
            <div className="ms-sm-3">
              <label htmlFor="nom" className="form-label">
                Nom
              </label>
              <input
                required
                type="text"
                className="form-control"
                id="nom"
                value={nom}
                onChange={this.handleChange}
              />
            </div>
          </div>
          <div className="mb-3 d-sm-flex justify-content-center">
            <div>
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                required
                type="email"
                className="form-control"
                id="email"
                value={email}
                onChange={this.handleChange}
              />
            </div>
            <div className="ms-sm-3">
              <label htmlFor="telephone" className="form-label">
                Telephone
              </label>
              <input
                required
                type="tel"
                className="form-control"
                id="telephone"
                value={telephone}
                onChange={this.handleChange}
              />
            </div>
            <input id="hidden" value="" type="text" hidden />
          </div>
          <button type="submit" className="btn btn-success w-100">
            {editIndex !== null ? "Modifier" : "Ajouter"}
          </button>
        </form>

        <Table
          formdonees={this.state.formdonees}
          onEdit={this.handleEdit}
          onDelete={this.handleDelete}
        />
      </div>
    );
  }
}

ReactDOM.render(<Formulaire />, document.querySelector(".app"));
