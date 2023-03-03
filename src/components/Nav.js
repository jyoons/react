import React, { useState, useEffect} from 'react';
import './Nav.css'

export default function Nav() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if(window.scrollY > 50){
        setShow(true)
      }else{
        setShow(false)}
    });
    return () => {
      window.removeEventListener("scroll", () => {});
    }
  }, [])
  
  return (
    //true일때 nav__black 적용
    <nav className={`nav ${show && "nav__black"}`}>
      <img 
      alt="Netflix logo"
      src="https://www1.netflixsurveys.com/survey/selfserve/a34/logo_2020.png"
      className="nav__logo"
      onClick={() => window.location.reload()}
      />
      <img 
        alt="User logged"
        src="https://occ-0-2218-1360.1.nflxso.net/dnm/api/v6/K6hjPJd6cR6FpVELC5Pd6ovHRSk/AAAABR2_CnwLC_fGf1EGaAxpU3cAzAwjj4q3yVg_n99iZREET5eSWAZ_B0kemHB5GOEPXtk7ekGULELzDrWZk4WCAULubeSwxTg_UQ.png" 
        className="nav__avatar"
     />
    </nav>
  )
}
