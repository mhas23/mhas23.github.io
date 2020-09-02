import React, { useState } from "react";
import MovieList from "../../components/Movies/MovieList";
import "../../components/Search/Search.css";
import { Movie_API } from "../../api/Movie_API";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

let response;

const sort = [
  {
    name: "popularity.desc",
    title: "Descending Popularity",
    id: 1,
  },

  {
    name: "popularity.asc",
    title: "Ascending Popularity",
    id: 2,
  },

  {
    name: "release_date.desc",
    title: "Ascending Release Date",
    id: 3,
  },

  {
    name: "release_date.desc",
    title: "Descending Release Date",
    id: 4,
  },

  {
    name: "revenue.asc",
    title: "Ascending Revenue",
    id: 5,
  },

  {
    name: "revenue.desc",
    title: "Descending Revenue",
    id: 6,
  },

  {
    name: "original_title.desc",
    title: "Descending Title",
    id: 7,
  },

  {
    name: "original_title.asc",
    title: "Ascending Title",
    id: 8,
  },

  {
    name: "vote_average.asc",
    title: "Ascending Rating",
    id: 9,
  },

  {
    name: "vote_average.desc",
    title: "Descending Rating",
    id: 10,
  },
];

const genre = [
  {
    name: "Action",
    id: 28,
  },
  {
    name: "Adventure",
    id: 12,
  },

  {
    name: "Animation",
    id: 16,
  },

  {
    name: "Comedy",
    id: 35,
  },
  {
    name: "Crime",
    id: 80,
  },

  {
    name: "Documentary",
    id: 99,
  },
  {
    name: "Drama",
    id: 18,
  },
  {
    name: "Family",
    id: 10751,
  },

  {
    name: "Fantasy",
    id: 14,
  },

  {
    name: "History",
    id: 36,
  },

  {
    name: "Horror",
    id: 27,
  },

  {
    name: "Music",
    id: 10402,
  },

  {
    name: "Mystery",
    id: 9648,
  },

  {
    name: "Romance",
    id: 10749,
  },

  {
    name: "Science Fiction",
    id: 878,
  },

  {
    name: "TV Movie",
    id: 10770,
  },
  {
    name: "Thriller",
    id: 53,
  },
  {
    name: "War",
    id: 10752,
  },
  {
    name: "Western",
    id: 37,
  },
];

let getAllID;
let total_page;

function Filter(props) {
  const [checked, setChecked] = useState({});
  const [id, setID] = useState([]);
  const [list, setList] = useState([]);
  const [select, setSelection] = useState(sort[0].name);
  const [startDate, setStartDate] = useState(new Date());
  const [page, setPage] = useState(1)

  const handleClick = async (event) => {
    setChecked({ [event.target.id]: [event.target.checked] });
    if (event.target.checked === true) {
      setID(id.concat(event.target.id));
    } else {
      let index = id.indexOf(event.target.id);
      if (index > -1) {
        id.splice(index, 1);
      }
    }

    //setList(response.data.results)
    setPage(1)
    

  };

  const handleSelection = async (event) => {
    setSelection(event.target.value);
    setPage(1)
  
  };

  const nextPage = () => {
    setPage(page + 1)
  }

  const previousPage = () => {
    setPage(page - 1)
  }

  const onTermSubmit = async (e) => {
    const KEY = process.env.REACT_APP_API;
        e.preventDefault();


    getAllID = id.toString();
    

    response = await Movie_API.Search.get("/discover/movie", {
      params: {
        api_key: KEY,
        language: "en-US",
        include_adult: "false",
        page: page,
        with_genres: getAllID,
        primary_release_year: startDate.getFullYear(),
        sort_by: select,
      },
    });

    setList(response.data.results);
    total_page = response.data.total_pages
    
    
  };

  return (
    <div>
      <div style={{ display: "inline-flex", flexDirection: "row" }}>
        <form
          onSubmit={onTermSubmit}
          style={{
            display: "inline-flex",
            flexDirection: "column",
            alignSelf: "flex-start",
            position: "sticky",
            top: "0",
            border: "4px solid black",
            padding: "10px",
          }}
        >
          <div>
            Search using these filters{" "}
            <span role="img" aria-label="down">
              ⬇️
            </span>
          </div>
          <h4>Select Genre: </h4>

          <div
            style={{ display: "inline-grid", gridTemplateColumns: "auto auto" }}
          >

            {genre.map((item, key) => (
              <div key={key}>
                <label key={key} style={{ display: "block", margin: "10px" }}>
                  {item.name}
                  <input
                    key={key}
                    type="checkbox"
                    name={item.name}
                    id={item.id}
                    checked={checked[item.checked]}
                    onChange={handleClick}
                  />
                </label>
              </div>
            ))}
          </div>

          <h4>Select sorting order:</h4>

          <select name="sort" id="sort_type" onChange={handleSelection}>
            {sort.map((item, key) => (
              <option key={key} value={item.name}>
                {item.title}
              </option>
            ))}
          </select>

          <h4>Enter Year</h4>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            showYearPicker
            dateFormat="yyyy"
          />
          <button type="submit" disabled={id.length === 0}>Enter Here!</button>
          {list.length === 0 ? null : <button onClick={nextPage} disabled={page === total_page}>Next Page</button>}
          {page >= 1 ? <button onClick={previousPage} disabled={page === 1}> Previous page</button>  : null }
        </form>
        <div style={{ padding: "30px" }}>
          <MovieList movies={list} isLoggedIn={props.loggedin} userID={props.user}/>
        </div>
      </div>
      
    </div>
  );
}

export default Filter;
