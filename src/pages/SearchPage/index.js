import axios from '../../api/axios';
import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import './SearchPage.css';
import { useDebounce } from '../../hooks/useDebounce';

export default function SearchPage() {
  const navigate = useNavigate();
  const [searchResults, setSearchResults] = useState([]);
  const useQuery = () => {
    return new URLSearchParams(useLocation().search); // URL 파라미터값 확인
  }
  let query=useQuery();
  // const searchTerm = query.get('q');
  // const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const searchTerm = useDebounce(query.get('q'), 500);

  useEffect(() => {
    if(searchTerm){
      fetchSearchMovie(searchTerm);
    }
  }, [searchTerm]);

  const fetchSearchMovie = async(searchTerm) =>{//비동기처리
    try{
      const request = await axios.get(`search/multi?include_adult=false&query=${searchTerm}`); //성인영화 제외
      setSearchResults(request.data.results);
    }catch(error){
      console.log('error', error)
    }
  }

  const renderSearchResults = () => {
    return searchResults.length > 0 ? (
      <section className="search-container">
        {searchResults.map((movie) => {
          if(movie.backdrop_path !==null && movie.media_type !=='person'){
            const movieImageUrl = 'https://image.tmdb.org/t/p/w500' + movie.backdrop_path;
            return(
              <div className="movie" key={movie.id}>
                <div className="movie__column-poster">
                  <img 
                    src={movieImageUrl}
                    alt=''
                    className="movie__poster" 
                    onClick={() => navigate(`/${movie.id}`)}
                  />
                </div>
              </div>
            )
          }
        })}
      </section>
    ) : (
      <section className="no-results">
        <div className="no-reults__text">
          <p>no match {searchTerm}</p>
          <p>Suggestions:</p>
          <ul>
            <li>Try different keywords</li>
          </ul>
        </div>
      </section>
    )
  }
  return renderSearchResults();
}