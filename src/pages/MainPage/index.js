import React from 'react'
import Banner from '../../components/Banner'
import Row from '../../components/Row'
import requests from '../../api/requests';

export default function index() {
  return (
    <div>
      <Banner/>
      <Row
          title="NETFLIX ORIGINALwww"
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
          title="Romance Movies"
          id="CM"
          fetchUrl={requests.fetchRomanceMovies}
          isLargeRow
      />
    </div>
  )
}
