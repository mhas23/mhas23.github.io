import React from "react";
import { Link } from "react-router-dom";
import "./Icon.css";

class Icon extends React.Component {

  render() {
    return (
      <>
        
       <Link
        to={this.props.prop ? "/profile" : '/signin'} /*style={{borderRightWidth: '3px', borderRightColor:'black', borderRightStyle: 'dashed'}}*/
      >
        {this.props.user !== "" ? <span style={{textAlign:'center', borderRadius: "50%",backgroundColor: 'wheat', width: '50px', display: 'inline-block', height:'50px', position:'absolute', right:'0%'}}><span style={{position: "relative", textAlign:'center' ,top:'14%', fontSize:'200%'}}>{this.props.user}</span></span> :   <i
          className="far fa-user fa-3x"
          style={{ width: "50px", position: "absolute", right: "0%" }}
        ></i>}
      
    
    </Link>
  
    </>
     
    );
  }
}

export default Icon;
