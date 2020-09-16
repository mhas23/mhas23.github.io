import React from "react";
import {withFirebase} from '../firebase'


class Favorite extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      clicked: false,
      movie: []
    }
  }





   handleClick = () => {

      let array = this.state.movie
      if(this.props.isLoggedIn){
        array.push({id: this.props.id, title: this.props.title, poster_path: this.props.img.replace("https://image.tmdb.org/t/p/w185", ""), release_date: this.props.release_date})
        this.setState({
          movie: [...array],
          clicked: !this.state.clicked
        })
        let movie = this.state.movie
        let clicked = this.state.clicked
        this.props.handleFav({movie, clicked})
      }else{
        alert("Make Sure to Sign In to Favorite :)")
      }
      
      
    
  }

 


 
render(){
  let isEqual = false
  this.props.firebase.item(this.props.userID).on("child_added", snap => {
                
    if(Object.values(snap.val()).includes(this.props.id)){
        isEqual = true
        
    }
  })


  


  return (
    <div
      style={{
        display: "inline-flex",
        marginTop: "20px",
        justifyContent: "center",
      }}
    
    >


           <button
        style={{
          backgroundColor: "transparent",
          border: "none",
          cursor: "pointer",
        }}
        onClick={this.handleClick}
        key={this.props.id}
        id={this.props.id}
      >

        
                  

       
      
        {!this.props.isLoggedIn ? (<i
          className={`far fa-heart fa-2x`}
          id={this.state.movie.id}
          style={{opacity: '0.2'}}
        ></i>) :
        
            ( 
          
            isEqual ? 
          
          
          <i
          className={`fas fa-heart fa-2x`}
          id={this.state.movie.id}
        
      ></i> : <i
      className={`far fa-heart fa-2x`}
      id={this.state.movie.id}
    
  ></i>) }
        
      </button>

      
      
     {/*  <button
        style={{
          backgroundColor: "transparent",
          border: "none",
          cursor: "pointer",
        }}
        key={props.id}
        id={props.id}
      >
        <i className="fas fa-list fa-2x"></i>
      </button> */}

      
     

   
    </div>
  );
    }
  
}


export default withFirebase(Favorite);
