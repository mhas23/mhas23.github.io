import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import Icon from "../Icon";

class Header extends React.Component {
  state = {
    clicked: false,
  };



  onButtonClicked = () => {
    const { clicked } = this.state;
    this.setState({
      clicked: !clicked,
    });

  };

  getImg = () => (this.state.clicked ? "-times-circle" : "-bars");

  render() {
    const imgName = this.getImg();
    return (
      <>
      
        <i
          className={`fas fa${imgName} fa-3x`}
          onClick={this.onButtonClicked}
          style={{ cursor: "pointer" }}
        ></i>
        <div
          className={`header-content${
            this.state.clicked ? "-fade-in" : "-fade-out"
          }`}
        >
          <Link to="/"> Home</Link>
          <Link to="/favorites">Favorites</Link>
        
          {//<Link
            //to="/list" /*style={{borderLeftWidth: '3px', borderLeftColor:'black', borderLeftStyle: 'dashed'}}*/
          //>
            
            //List
         // </Link>
        
          }
         
        </div>
        <Icon prop = {this.props.loggedin} user={this.props.user}/>
      </>
    );
  }
}

export default Header;
