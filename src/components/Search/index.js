import React from "react";
import "./Search.css";

class Search extends React.Component {
  state = {
    query: "",
    page: 0,
    list: [],
    loading: true
  };

  onHandleChange = (event) => {
    this.setState({
      query: event.target.value,
    });
  };

  onTermSubmit = async (e) => {
    e.preventDefault();
    this.props.onFormSubmit(this.state.query)
    this.setState({
      query: ''
    })
    
  };


  

  render() {
    
    return (
      
      <div style={{ textAlign: "center" }}>
        <form
          onSubmit={
            this.onTermSubmit
          }
        >
          <span className="input-searchicon">
            <span className="icon">
              <span
                className="fas fa-search"
              ></span>
            </span>

            <input
              style={{ width: "100%" }}
              className="search"
              value={this.state.query}
              placeholder="Search For Any Movie"
              onChange={this.onHandleChange}
              type="text"
            ></input>
          </span>
        </form>
        
      </div>
    );
  }
}

export default Search;
