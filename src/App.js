import logo from './mongoleaf.png';
import './App.css';
import { useState, useEffect } from 'react';
import * as Realm from "realm-web";
// Add your App ID
const app = new Realm.App({ id: 'mongodash-vyrdt' });
// Create an anonymous credential
const credentials = Realm.Credentials.anonymous();
let user;

// `App.currentUser` updates to match the logged in user


function App() {
  const [timer, setTimer] = useState(600);
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

  const insertMany = async () => {
    let localTimer = timer;

    setBtnDisabled(true);
    const dt = new Date();

    let interval;

    const countdown = () => {
      if (localTimer === 0) {
        clearInterval(interval);
        setTimeout(() => {
          setTimer(600);
          setBtnDisabled(false);
        }, 2000);
      }
      else {
        localTimer--;
        setTimer(localTimer);
      }
    }

    interval = setInterval(countdown, 1000);

    const startDate = (new Date()).toISOString();

    let docsPushed = 0;

    while (localTimer > 0) {
      const resp = await user.functions.insertRandom(startDate);
      docsPushed++;
      setDocInserted(resp.docInserted);
      setDocsArchived(docsPushed - resp.docsInserted);
      setDocsInserted(resp.docsInserted);
    }
  };

  useEffect(() => {
    // write do once code here on component load
    // Authenticate the user
    app.logIn(credentials).then(u => {
      user = u;
      console.log(user);
    });
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
        <iframe style={{ background: "#21313C", height: '90vh', flex: 1, border: "none", borderRadius: 2 }} src="https://charts.mongodb.com/charts-group2-hackathon-gwmai/embed/dashboards?id=6269646a-816a-40d6-8d69-52d515b36d07&theme=dark&autoRefresh=true&maxDataAge=10&showTitleAndDesc=false&scalingWidth=fixed&scalingHeight=fixed"></iframe>
        {/* <div style={{ background: '#21313C', height: '100vh', flex: 1 }}></div> */}
        <div style={{ background: '#11212C', width: '20vw', display: docsInserted > 0 ? 'block' : 'none', textAlign: 'left', padding: 10, color: 'white' }}>
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
