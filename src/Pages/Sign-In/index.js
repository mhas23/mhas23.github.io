import React from "react";
import { Link, withRouter } from 'react-router-dom';
import "../styles.css";
import {withFirebase} from '../../components/firebase';
import {compose} from 'recompose'

const SignInPage = () => (
  <div>
    <SignInForm/>
  </div>
)

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
  favorites:[]
}

class SignIn extends React.Component{
  constructor(props) {
      super(props)
      this.state = {
          ...INITIAL_STATE
      }
  }

  /*
      Uses Firebase to sign user in if there if an email and password
      otherwise, print out an error
   */
  onSubmit = (event) => {

      const {email, password} = this.state
      

      this.props.firebase.doSignInWithEmailAndPassword(email, password)
          .then((user) => {
              this.setState({...INITIAL_STATE})
              this.props.history.push('/')
              //window.location.reload()
              alert(`Welcome ${email.substring(0, email.indexOf("@"))} `)
              

          }).catch(error => {
          this.setState({error})
          alert(this.state.error)

      })
      event.preventDefault()

  }

  onSubmit2 = (event) => {
      this.props.firebase.doSignInAnonymously()
          .then(() => {
            this.props.history.push('/')
          }).catch(error => {
          this.setState({error})
          alert(this.state.error)

      })
      event.preventDefault()

      
  }

  onChange = (event) => {
      this.setState({[event.target.name]: event.target.value})
  }

render(){
  const{email, password} = this.state

  const isInvalid = password === '' || email === '';


  return (
    <div className="sign-in-box">
      <div className="sign-in-center">
        <p>Welcome Back!</p>
        <form onSubmit={this.onSubmit}>
          <input type="text" className="email-input" placeholder="Email..." onChange={this.onChange} value={email} name="email"/>
          <input type="text" className="password-input" placeholder="Password..." onChange={this.onChange} value={password} name="password"/>
          <input type="submit" className="submit-imput" value="Sign-In" disabled={isInvalid}></input>
        </form>
        <form onSubmit={this.onSubmit2}>
          <input type="submit" className="submit-imput" value="Sign in Anon"/>
        </form>
        <div>Or sign in with:</div>
        <div style={{padding: '10px'}}>
          <i style={{cursor:'pointer'}} className="fab fa-google fa-2x social-media-icons"></i>     
          <i style= {{cursor:'pointer'}} className="fab fa-facebook fa-2x social-media-icons"></i>
          <i style={{cursor:'pointer'}} className="fab fa-twitter fa-2x social-media-icons"></i>
          </div>
          <button style={{textAlign:'left'}}>Forgot password</button>
          <Link to="/signup">
            <button style={{textAlign:'right'}}>Sign-Up</button>
          </Link>
       </div>
       

    </div>
  );

  }
}

const SignInForm = compose(
  withRouter,
  withFirebase
)(SignIn)

export default SignInPage;

export {SignInForm}
