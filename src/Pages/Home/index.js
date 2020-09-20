import React, { useState, useEffect, useRef } from "react";
import Search from "../../components/Search";
import { Link } from "react-router-dom";

import "../../components/Search/Search.css";
import { Movie_API } from "../../api/Movie_API";
import MovieList from "../../components/Movies/MovieList";
const KEY = process.env.REACT_APP_API;

const Home = (props) => {
  const [list, getList] = useState([]);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1)
  const totalPages = useRef(0)

  
  const nextPage = () => {
      setPage(page + 1)
      if(page === totalPages.current){
        setPage(totalPages.current)
      }
  }

  const lastPage = () => {
    setPage(totalPages.current)
    
}

  const prevPage = () => {
    setPage(page - 1)
  }

  const firstPage = () => {
    setPage(1)
    
}
  

  useEffect(() => {
    const fetchData = async () => {
      if (query === "") {
        getList([]);
      } else {
        try {
           const response = await Movie_API.Search.get("/search/movie", {
            params: {
              api_key: KEY,
              language: "en-US",
              include_adult: "false",
              page: page,
              query: query,
            },
          });
          totalPages.current = response.data.total_pages
          
          if(totalPages.current >= page){
          getList(response.data.results);
          }else{
            alert("end of page")
            getList([])
          }
        } catch (err) {
          console.warn(err);
          
        }
      }
    };
    fetchData();

    
  }, [query, page]);

  const onTermSubmit = async (q) => {
    setQuery(q);
    setPage(1)
  };

  return (
    <>
      <>
        <span
          style={{
            justifyContent: "center",
            display: "flex",
            flexDirection: "row",
          }}
        >
          <h1>The Movie Hub</h1>
          <i
            style={{ marginLeft: "10px", marginTop: "15px" }}
            className="fas fa-film fa-3x"
          ></i>
        </span>
        <Search onFormSubmit={onTermSubmit} />
        <MovieList movies={list} isLoggedIn = {props.loggedin} userID = {props.user}/>
        <div style={{display:'flex', flexDirection:'row', justifyContent:'center', margin:'30px'}}>
          {list.length === 0 || page === totalPages.current ? null : <div style={{textAlign:'center'}}><i className="fas fa-arrow-right fa-2x" style={{  fontSize:'larger' ,margin: '5%', cursor:'pointer'}} onClick={nextPage} disabled={page === totalPages.current}>Next Page</i> <i className="fas fa-angle-double-right fa-2x" style={{fontSize:'larger',margin: '5%', cursor:'pointer'}} onClick={lastPage} disabled={page === totalPages.current}>Last Page</i>   </div> }
          {page > 1 ? <div style={{textAlign:'center'}}><i className="fas fa-arrow-left fa-2x" style={{fontSize:'larger',margin: '5%', cursor:'pointer'}}  onClick={prevPage}>Previous Page</i> <i className="fas fa-angle-double-left fa-2x" style={{fontSize:'larger',margin: '5%', cursor:'pointer'}} onClick={firstPage} disabled={page === totalPages.current}>First Page</i> </div> : null }
        </div>
        {list.length === 0 ? null : <h3 style={{textAlign:'center'}}>Page {page} / {totalPages.current}</h3>}

        <div className="filter">
          <Link to={"/filter"}>
            <button className="filter-button">Discover One!</button>
          </Link>
        </div>
      </>
    </>
  );
};

export default Home;
