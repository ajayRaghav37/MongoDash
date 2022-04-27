import logo from './mongoleaf.png';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          MongoDash
        </p>
        <div style={{ flex: 1 }}></div>
        <div style={{ padding: 10, marginRight: 10, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div style={{marginRight: 20}}>10:00</div>
          <button style={{ background: 'green', color: 'white', cursor: 'pointer', border: 'none', fontSize: 20, padding: 10 }}>START INSERTS</button>
        </div>
      </header>
      <iframe style={{ background: "#21313C", height: '90vh', width: '100vw', border: "none", borderRadius: 2 }} src="https://charts.mongodb.com/charts-ajayraghav-qlztg/embed/dashboards?id=62184c8f-c186-440c-82d3-b5e3a69ad9c0&theme=dark&autoRefresh=true&maxDataAge=3600&showTitleAndDesc=false&scalingWidth=fixed&scalingHeight=fixed"></iframe>

    </div>
  );
}

export default App;
