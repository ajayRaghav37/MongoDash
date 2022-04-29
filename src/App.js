import logo from './mongoleaf.png';
import './App.css';
import {useState, useEffect} from 'react';

function App() {
  const [timer, setTimer] = useState(600);

  const insertMany = () => {
    setTimer(timer-10);
  }

  useEffect(() => {
    // Update the document title using the browser API
    insertMany();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          MongoDash
        </p>
        <div style={{ flex: 1 }}></div>
        <div style={{ padding: 10, marginRight: 10, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div style={{marginRight: 20}}>{parseInt(timer/60).toString().padStart(2,'0')}:{(timer%60).toString().padStart(2,'0')}</div>
          <button onClick={()=>alert('hello world')} style={{ background: 'green', color: 'white', cursor: 'pointer', border: 'none', fontSize: 20, padding: 10 }}>START INSERTS</button>
        </div>
      </header>
      <iframe style={{ background: "#21313C", height: '90vh', width: '100vw', border: "none", borderRadius: 2 }} src="https://charts.mongodb.com/charts-group2-hackathon-gwmai/embed/dashboards?id=6269646a-816a-40d6-8d69-52d515b36d07&theme=dark&autoRefresh=true&maxDataAge=3600&showTitleAndDesc=false&scalingWidth=fixed&scalingHeight=fixed"></iframe>

    </div>
  );
}

export default App;
