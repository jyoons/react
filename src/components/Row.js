import axios from '../api/axios';
import React, { useEffect, useState } from 'react';
import "./Row.css";
import MovieModal from './MovieModal';

export default function Row({title, id, fetchUrl, isLargeRow}){
  const [movies, setMovies] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [movieSeleted, setMovieSeleted] = useState({});//빈 객체

  useEffect(() => {
    fetchMovieData();
  }, []);

  const fetchMovieData = async () => {
    const request = await axios.get(fetchUrl);
    setMovies(request.data.results);
  };

  const handleClick = (movie) => {
    setModalOpen(true);
    setMovieSeleted(movie);
    // console.log(movie)
  }

  return (
    <section className="row">
      <h2>{title}</h2>
      <div className="slider">
        <div className="slider__arrow-left">
          <span className="arrow" 
            onClick={() => {
              document.getElementById(id).scrollLeft -= (window.innerWidth - 80);
              }}>
            {"<"}
          </span>
        </div>
        <div id={id} className="row__posters">
          {movies.map((movie)=>(
            <img
              key={movie.id}
              className={`row__poster ${isLargeRow && "row__posterLarge"}`} //값을 보존 반환(연산자 우선순위 && 다음 ||)
              src={`https://image.tmdb.org/t/p/original/${isLargeRow ? movie.poster_path : movie.backdrop_path}`}
              loading="lazy"
              alt={movie.name}
              onClick = {() => handleClick(movie)}
            />
          ))}
        </div>
        <div className="slider__arrow-right">
          <span className="arrow"
          onClick={() => {document.getElementById(id).scrollLeft += (window.innerWidth - 80)}}>
            {">"}
          </span>
        </div>
      </div>
      {
        modalOpen && (
           <MovieModal {...movieSeleted} setModalOpen={setModalOpen}/>
        )
      }
    </section>
  )
}