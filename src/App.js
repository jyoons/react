import requests from './api/requests';
import './App.css';
import Banner from './components/Banner';
import Nav from './components/Nav';
import Row from './components/Row';

function App() {
  return (
    <div className="app">
     <Nav/>
     <Banner/>
     <Row
        title="NETFLIX ORIGINAL"
        id="AM"
        fetchUrl={requests.fetchNetflixOriginals}
        isLargeRow
     />
     <Row
        title="Action Movies"
        id="AM"
        fetchUrl={requests.fetchActionMovies}
        isLargeRow
     />
      <Row
        title="Comedy Movies"
        id="CM"
        fetchUrl={requests.fetchComedyMovies}
        isLargeRow
     />
    </div>
  );
}

export default App;
