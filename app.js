var n = 0;

function numberFormat(n) {
  return n.toString().padStart(2, "0");
}

function render() {
  const items = ["tache 1", "tache 2", "tache 3"];
  const lis = items.map((item, k) => <li key={k}>{item}</li>)
  const title = (
    <React.Fragment>
      <h1 className="title" id="title">
       
        Bonjour le monde<span>{numberFormat(n)}</span>
      </h1>
      <ul>
      {lis}
      </ul>
    </React.Fragment>
  );
  ReactDOM.render(title, document.querySelector(".app"));
}

render();
window.setInterval(() => {
  n++;
  render();
}, 1000);
// console.log(title)
