import logo from './mongoleaf.png';
import './App.css';
import { useState, useEffect } from 'react';

function App() {
  const [timer, setTimer] = useState(300);
  const [docInserted, setDocInserted] = useState({
    type: 'CASH_OUT',
    amount: '47835.13',
    nameOrig: 'C397008337',
    nameDest: 'C1429169944',
    isFraud: false,
    isFlaggedFraud: false,
    date: new Date('2019-03-05T00:00:00.000Z'),
    sourceCountry: 'Albania',
    destinationCountry: 'Albania'
  });
  const [docsInserted, setDocsInserted] = useState(0);
  const [docsArchived, setDocsArchived] = useState(0);
  const [btnDisabled, setBtnDisabled] = useState(false);

  //TODO: Add a notice for faster dashboard refreshes before clicking on inserts button. After the demo is done, restore the slower refreshes.

  const serverlessFn = startDate => {
    return new Promise(resolve => {
      //generate a doc
      //insert a doc
      //return inserted docs count in live data and archived count for data that is newer than startDate along with newly inserted doc
      setTimeout(() => resolve({
        docsInserted: Math.floor(Math.random()*1000),
        docsArchived: Math.floor(Math.random()*1000),
        docInserted: {
          type: 'CASH_OUT',
          amount: (Math.random() * 100000).toFixed(2),
          nameOrig: 'C397008337',
          newbalanceOrig: '0.0',
          nameDest: 'C1429169944',
          isFraud: false,
          isFlaggedFraud: false,
          date: new Date('2019-03-05'),
          country: 'Serbia'
        }
      }), 800);
    });
  };

  const insertMany = async () => {
    let localTimer = timer;

    setBtnDisabled(true);
    const dt = new Date();

    let interval;

    const countdown = () => {
      if (localTimer === 0) {
        clearInterval(interval);
        setTimeout(() => {
          setTimer(300);
          setBtnDisabled(false);
        }, 2000);
      }
      else {
        localTimer--;
        setTimer(localTimer);
      }
    }

    interval = setInterval(countdown, 1000);

    while (localTimer > 0) {
      const resp = await serverlessFn(dt);
      setDocInserted(resp.docInserted);
      setDocsInserted(resp.docsInserted);
      setDocsArchived(resp.docsArchived);
    }
  };

  useEffect(() => {
    // write do once code here on component load
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
          <div style={{ marginRight: 20 }}>{parseInt(timer / 60).toString().padStart(2, '0')}:{(timer % 60).toString().padStart(2, '0')}</div>
          <button disabled={btnDisabled} onClick={async () => await insertMany()} style={{ background: btnDisabled ? 'grey' : 'green', color: 'white', cursor: btnDisabled ? 'unset' : 'pointer', border: 'none', fontSize: 16, padding: 14 }}>START INSERTS</button>
        </div>
      </header>
      <div style={{ display: 'flex' }}>
        <iframe style={{ background: "#21313C", height: '90vh', flex: 1, border: "none", borderRadius: 2 }} src="https://charts.mongodb.com/charts-group2-hackathon-gwmai/embed/dashboards?id=6269646a-816a-40d6-8d69-52d515b36d07&theme=dark&autoRefresh=true&maxDataAge=3600&showTitleAndDesc=false&scalingWidth=fixed&scalingHeight=fixed"></iframe>
        {/* <div style={{ background: '#21313C', height: '100vh', flex: 1 }}></div> */}
        <div style={{ background: '#11212C', width: '20vw', display: docsInserted > 0? 'block':'none', textAlign: 'left', padding: 10, color: 'white' }}>
          <p>Document just inserted</p>
          <p style={{ backgroundColor: '#222', border: '1px solid darkgrey', padding: '5px 10px', fontSize: 15 }}>
            <code>
              <pre>
                {JSON.stringify(docInserted, null, 2)}
              </pre>
            </code>
          </p>
          <br />
          <br />
          <p>Total documents inserted<br /><span style={{ fontSize: 50 }}>{docsInserted}</span></p>
          <br />
          <p>Total documents archived<br /><span style={{ fontSize: 50 }}>{docsArchived}</span></p>
        </div>
      </div>

    </div>
  );
}

export default App;
