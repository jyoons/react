import axios from '../api/axios';
import React, { useEffect, useState } from 'react';
import "./Row.css";
import MovieModal from './MovieModal';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

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
  }

  return (
    <section className="row">
      <h2>{title}</h2>
      <div className="slider">
        <Swiper
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          // spaceBetween={50}
          // slidesPerView={3}
          navigation
          pagination={{ clickable: true }}
          // scrollbar={{ draggable: true }}
          // onSwiper={(swiper) => console.log(swiper)}
          // onSlideChange={() => console.log('slide change')}
          breakpoints={{
            1378:{
              slidesPerView:6,
              slidesPerGroup:6,
            },
            998:{
              slidesPerView:5,
              slidesPerGroup:5,
            },
            625:{
              slidesPerView:4,
              slidesPerGroup:4,
            },
            0:{
              slidesPerView:3,
              slidesPerGroup:3,
            },
          }}
        >        
          <div id={id} className="row__posters">
            {movies.map((movie)=>(
              <SwiperSlide key={movie.id}>
                <img
                  className={`row__poster ${isLargeRow && "row__posterLarge"}`} //값을 보존 반환(연산자 우선순위 && 다음 ||)
                  src={`https://image.tmdb.org/t/p/original/${isLargeRow ? movie.poster_path : movie.backdrop_path}`}
                  loading="lazy"
                  alt={movie.name}
                  onClick = {() => handleClick(movie)}
                />
              </SwiperSlide>
            ))}
          </div>
        </Swiper>
      </div>
      {
        modalOpen && (
           <MovieModal {...movieSeleted} setModalOpen={setModalOpen}/>
        )
      }
    </section>
  )
}