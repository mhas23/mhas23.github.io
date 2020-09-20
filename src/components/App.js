import React from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect, HashRouter} from 'react-router-dom';
import Home from '../Pages/Home'
import MovieInfo from '../Pages/MovieInfo'
//import List from '../Pages/List'
import FavoritesList from '../Pages/FavoritesList'
import Filter from '../Pages/Filter'
import SignIn from '../Pages/Sign-In'
import SignUpPage from '../Pages/Sign-Up'
import Logo from '../components/TMDB-Image'
import Header from '../components/Header'
import Error from '../Pages/Error'
import {compose} from 'recompose'
import {withFirebase} from './firebase'
import Profile from '../Pages/Profile'


  const AppPage = () => (
    <div>
      <AppForm/>
    </div>
  )

class App  extends React.Component{
  constructor(props){
    super(props)

    this.state = {
      loggedIn: null,
      user: null,
      userChar: '',
      username: '',
      favorites: []
    }
  
  }

  componentDidMount(){
   this.props.firebase.auth.onAuthStateChanged(user => {
      if(user){
        this.setState({loggedIn: true, user: user.uid, username: user.email.substring(0, user.email.indexOf("@"))})
        if(!user.isAnonymous){
          localStorage.setItem("uid", this.state.user)
          this.setState({
            userChar: user.email.charAt(0).toUpperCase()
            
          })
         
        }else{
          this.setState({
            userChar: "An",
            username: ""
          })
        }
        

      }else{
        this.setState({loggedIn: false, user: "", userChar: "", username: ""})
        localStorage.setItem("uid", "")
        
       }
    })
    
  }
 
    render(){

        return (
          
          
            <HashRouter>
            <Header loggedin = {this.state.loggedIn} user = {this.state.userChar}/>
                
            <div>
                    <Switch>
                        <Route exact path="/" render={(props) => <Home {...props} loggedin = {this.state.loggedIn} user={localStorage.getItem("uid")} /> }/>
                        <Route exact path="/info/:id/:name" render={(props) => <MovieInfo {...props} loggedin = {this.state.loggedIn} user={localStorage.getItem("uid")}/> } />
                        <Route exact path='/profile' render={(props) => <Profile {...props} user = {localStorage.getItem("uid")}/> } />
                        <Route exact path='/favorites' render={(props) => <FavoritesList {...props} loggedin = {this.state.loggedIn} user={localStorage.getItem("uid")}/> }/>
                        <Route exact path='/filter' render={(props) => <Filter {...props} loggedin = {this.state.loggedIn} user={localStorage.getItem("uid")}/> } />
                        <Route exact path='/signin' render = {(props) => <SignIn username={this.state.username} />} />
                        <Route exact path='/signup' render = {(props) => <SignUpPage username={this.state.username} />} />

                        <Route exact path='/signin'  render={(props) => (this.state.loggedIn ? <div><Redirect to= "/signin" /> </div>: <Redirect to= "/profile" />)}/>
                        <Route exact path='/signup' render={(props) => (this.state.loggedIn ? <SignUpPage/> : <Redirect to= "/profile" />)}/>
                        <Route component={Error} />
                    </Switch>
            </div>
            <Logo />
            </HashRouter>


        )


    }
}

const AppForm = compose(
  withFirebase
)(App)

export default AppPage