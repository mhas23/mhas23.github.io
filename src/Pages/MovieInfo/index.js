import React, { useState, useEffect, useRef } from "react";
import Search from "../../components/Search";
import "../../components/Search/Search.css";
import {Movie_API} from "../../api/Movie_API";
import MovieList from "../../components/Movies/MovieList";
import "../styles.css";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import MovieCard from "../../components/Movies/MovieCard";
import { ClipLoader } from "react-spinners";
import Error from '../Error'


function MovieInfo({ match, loggedin, user }) {
  const [list, getList] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [info, setInfo] = useState({});
  const [castInfo, setCastInfo] = useState([]);
  const [crewInfo, setCrewInfo] = useState([]);
  const [recommendInfo, setRecInfo] = useState([]);
  const [error, setError] = useState(false)
  let time = useRef(0)


  useEffect(() => {
    const fetchData = async () => {
      if (query === "") {
        getList([]);
      } else {
        const KEY = process.env.REACT_APP_API;
        try {
        const response = await Movie_API.Search.get("/search/movie", {
          params: {
            api_key: KEY,
            language: "en-US",
            include_adult: "false",
            page: "1",
            query: query,
          },
        });
        getList(response.data.results);
      }catch(err){
        console.warn(err)
        getList([])
      }
        
      }
      
    };
    fetchData();
  }, [query]);

  const onTermSubmit = async (q) => {
    setQuery(q);
    
  };

  useEffect(() => {
    async function getData() {
      setLoading(true)
      setQuery("")
      try{
      const [movieInfo, castAndCrewInfo, recommendInfo] = await Promise.all([
        Movie_API.Info.get(`/${match.params.id}`, {
          params: {
            api_key: process.env.REACT_APP_API,
            language: "en-US",
          },
        }),

        Movie_API.Info.get(`/${match.params.id}/credits`, {
          params: {
            api_key: process.env.REACT_APP_API,
          },
        }),

        Movie_API.Info.get(`/${match.params.id}/recommendations`, {
          params: {
            api_key: process.env.REACT_APP_API,
          },
        }),
      ]);

      setInfo(movieInfo);
      setCastInfo(castAndCrewInfo);
      setCrewInfo(castAndCrewInfo);
      setRecInfo(recommendInfo);
    }catch(err){
      
      setError(true)
      
    }
 

    

    

      window.scrollTo(0, 0);
       time.current = setTimeout(() => {
        setLoading(false);
      }, 2000);
    }
    getList([])
    
    getData();

    return() => clearTimeout(time.current)
  }, [match]);




  


  return (
  <> 
  {error === false ?
  loading ? (
    <ClipLoader
      size={150}
      color={"#123abc"}
      css={`
        display: block;
        margin: 0 auto;
        border-color: black;
      `}
      loading={loading}
    ></ClipLoader>
  ) : (
    <>
      <span className="info">
        <span style={{ display: "flex", flexDirection: "column"}}>
          <span className="title"></span>

          <MovieCard
            image={`https://image.tmdb.org/t/p/w185${info.data.poster_path}`}
            id={info.data.id}
            title={info.data.title}
            release_date={info.data.release_date}
            isLoggedIn={loggedin}
            userID={user}
          />
        </span>
        <div className="description">
          <span className="title">
            {info.data.title !== info.data.original_title ? (
              <h2> {`${info.data.title} [${info.data.original_title}]`}</h2>
            ) : (
              <h2> {info.data.original_title}</h2>
            )}

            <h2 style={{ marginLeft: "10px" }}>({info.data.release_date})</h2>
          </span>
          <div
            className="movie-info"
          >
            <h4>Rating: {info.data.vote_average * 10}%</h4>
            <h4>Popularity: {info.data.popularity}</h4>
            <h4>Runtime: {info.data.runtime} minutes</h4>
          </div>
          <h3 style={{ border: "none" }}>
            {info.data.tagline !== "" ? info.data.tagline : null}
          </h3>
          <p style={{ display: "inline-block", padding: "20px" }}>
            {" "}
            {info.data.overview === "" ? "No info here" : info.data.overview}{" "}
          </p>
        </div>
        <div style={{display:'flex', flexDirection:'row', marginTop: '69px', overflow:'scroll', maxWidth:'100%'}}>
            {info.data.genres.map((index, key) => (
              <div key={key} style={{paddingLeft:'30px', paddingRight:'30px'}}>
              <h5 style={{fontSize:'large'}}>{index.name}</h5>
              </div>
            ))}
        </div>
      </span>

   

      <div
        style={{
          width: "100%",
          height: "0px",
          border: "2px black solid",
          marginTop: "3em",
        }}
      ></div>
        <h3>Cast</h3>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          overflowX: "scroll",
          overflowY: "hidden",
          marginTop: "20px",
          marginBottom: "90px",
        }}
      >
        {castInfo.data.cast.map((cast, key) => (
          <OverlayTrigger
            key={key}
            placement="bottom"
            overlay={
              <Tooltip
                key={key}
                style={{
                  paddingTop: "20px",
                  textAlign: "center",
                  justifyContent: "center",
                }}
              >
                <div>{cast.character}</div>
                <div>({cast.name})</div>
              </Tooltip>
            }
          >
            <div
              style={{ width: "100px", height: "122px", marginRight: "50px" }}
            >
              <img
                key={key}
                alt={cast.name}
                src={
                  cast.profile_path === null
                    ? "https://previews.123rf.com/images/urfandadashov/urfandadashov1805/urfandadashov180500070/100957966-photo-not-available-icon-isolated-on-white-background-vector-illustration.jpg"
                    : `https://image.tmdb.org/t/p/w185${cast.profile_path}`
                }
                style={{
                  borderRadius: "100%",
                  width: "95px",
                  height: "113px",
                  padding: "5px",
                }}
              />
            </div>
          </OverlayTrigger>
        ))}
      </div>
      <h3>Crew</h3>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          overflowX: "scroll",
          overflowY: "hidden",
          marginTop: "20px",
          marginBottom: "90px",
        }}
      >
        
        {crewInfo.data.crew.map((crew, key) => (
          <OverlayTrigger
            key={key}
            placement="bottom"
            overlay={
              <Tooltip
                key={key}
                style={{ paddingTop: "20px", textAlign: "center" }}
              >
                <div>{crew.name}</div>
                <div>({crew.job})</div>
              </Tooltip>
            }
          >
            <div
              style={{ width: "100px", height: "122px", marginRight: "50px" }}
            >
              <img
                key={key}
                alt={crew.name}
                src={
                  crew.profile_path === null
                    ? "https://previews.123rf.com/images/urfandadashov/urfandadashov1805/urfandadashov180500070/100957966-photo-not-available-icon-isolated-on-white-background-vector-illustration.jpg"
                    : `https://image.tmdb.org/t/p/w185${crew.profile_path}`
                }
                style={{
                  borderRadius: "50%",
                  width: "95px",
                  height: "113px",
                  padding: "5px",
                }}
              />
            </div>
          </OverlayTrigger>
        ))}
      </div>

      <div
        style={{
          width: "100%",
          height: "0px",
          border: "2px black solid",
          marginTop: "3em",
        }}
      ></div>

      <div style={{ textAlign: "center" }}>
        <h3>Recommendations</h3>
        <MovieList movies={recommendInfo.data.results} isLoggedIn = {loggedin} userID={user}/>
      </div>

      <div
        style={{
          width: "100%",
          height: "0px",
          border: "2px black solid",
          marginTop: "3em",
        }}
      ></div>
       <Search onFormSubmit={onTermSubmit} />
      <MovieList movies={list} isLoggedIn = {loggedin} userID={user}/>
       </>
  ):(
    <Error />
  ) }

     
      </>
  )
      }

    



export default MovieInfo;
