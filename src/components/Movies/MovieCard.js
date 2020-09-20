import React from "react";
import "./Movies.scss";
import { Link } from "react-router-dom";
import Favorite from './Favorite'
import {withFirebase} from '../firebase'

let newID


class MovieCard extends React.Component {

  
  state = {
    favorite: false,
    favoriteList: []
  }

  componentDidMount(){
     this.mount = true
  
    newID  = this.props.firebase.item(this.props.userID)
 
  newID.on("value", snap => {
     let array = []
     snap.forEach((child) => {
          array.push({id: child.val().id, title: child.val().title, poster_path: child.val().poster_path, favorite: true, release_date: child.val().release_date})
     })
     if(this.mount){
    this.setState({favoriteList: array})
     }

  })
}

 

 componentWillUnmount(){
  this.mount = false
 }

  
handleFavs = (props) => {
  
  const found = this.state.favoriteList.some(el => el.id === props.movie[0].id)
  
    if (!found){
      this.setState({
        favorite: true
      })
      
      //arr.push({id: props.movie[0].id, title: props.movie[0].title, poster_path: props.movie[0].poster_path, favorite: true, release_date: props.movie[0].release_date})
      if(!this.props.firebase.auth.currentUser.isAnonymous){
      newID.push({id: props.movie[0].id, title: props.movie[0].title, poster_path: props.movie[0].poster_path, favorite: true, release_date: props.movie[0].release_date})

    }
  }
  else{

    if(window.confirm(`Remove "${props.movie[0].title}" from Favorites?`)){

        this.setState({
          favorite: false
        })
      
        newID.once("value", snap => {
        snap.forEach(child => {
          if(props.movie[0].id === child.val().id){
            this.props.firebase.childItems(child.key, this.props.userID)
          }
        })
      })


  }
}
  /*
  if(arr.includes(...props.movie)){
    const fav = arr.indexOf(...props.movie)
    arr.splice(fav, 1)
    localStorage.setItem("favoriteList", JSON.stringify(arr))
  }else{
    props.movie.map((index, key) => {
        arr.push(...props.movie)
        this.setState({
          favorites: arr
        })
      }
    )
  }
  */


}





render(){
  
  

  return (
    <>
      
      <div
        className=" movie-info"
      >
        <Link to={`/info/${this.props.id}/${encodeURIComponent(this.props.title)}`}>
          <img src={this.props.image} style={{ width: "100%" }} alt="Movie" />
            
        </Link>
      </div>  
         <Favorite key={this.props.id} id={this.props.id} title={this.props.title} release_date={this.props.release_date} img={this.props.image} handleFav={this.handleFavs} isLoggedIn={this.props.isLoggedIn} userID={this.props.userID}/>
    </>
  );
}
}

export default withFirebase(MovieCard);
