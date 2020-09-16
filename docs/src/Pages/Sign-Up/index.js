import React from "react";
import { Link, withRouter } from 'react-router-dom';
import "../styles.css";
import {withFirebase} from '../../components/firebase';
import {compose} from 'recompose'

const SignUpPage = () => (
  <div>
    <SignUpForm/>
  </div>
)

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null
}

class SignUp extends React.Component{
  constructor(props) {
      super(props)
      this.state = {
          ...INITIAL_STATE
      }
      this.onSubmit = this.onSubmit.bind(this)
      this.onChange = this.onChange.bind(this)

  }

  /*
      Uses Firebase to sign user in if there if an email and password
      otherwise, print out an error
   */
  onSubmit = (event) => {
    event.preventDefault()
      const {email, password} = this.state
    
      this.props.firebase.doCreateUserWithEmailAndPassword(email, password)
          .then(authUser => {
              return this.props.firebase
                  .user(authUser.user.uid)
                  .set({
                      email
                  })
                  
          })
          .then(authUser => {
              this.setState({...INITIAL_STATE})
              
              this.props.history.push('/')
              alert(`Welcome ${email.substring(0, email.indexOf("@"))} `)
          }).catch(error => {
              this.setState({error})
              alert(this.state.error)
      })
      
  }

  onChange = (event) => {
      this.setState({[event.target.name]: event.target.value})
  }

  render() {
      const{email, password} = this.state

      const isInvalid = password === '' || email === ''

return (
    <div className="sign-in-box">
      <div className="sign-in-center">
        <p>Hope You'll Join Us!</p>
        <form onSubmit={this.onSubmit}>
        <input type="text" className="email-input" placeholder="Email..." name="email" value={email} onChange={this.onChange}/>
        <input type="text" className="password-input" placeholder="Password..." name="password" value={password} onChange={this.onChange}/>
        <input type="submit" className = "submit-imput" value="Create Your Account" disabled={isInvalid}></input>
        </form>
        <div>Or Create an Account With:</div>
        <div style={{padding: '10px'}}>
          <i style={{cursor:'pointer'}} className="fab fa-google fa-2x social-media-icons"></i>     
          <i style={{cursor:'pointer'}} className="fab fa-facebook fa-2x social-media-icons"></i>
          <i style={{cursor:'pointer'}} className="fab fa-twitter fa-2x social-media-icons"></i>
          </div>
          <Link to='/signin'>
          <button style={{textAlign:'right'}}>Sign-In</button>
          </Link>
       </div>
       

    </div>
  );
}
}

const SignUpForm = compose(
  withRouter,
  withFirebase
)(SignUp)

export default SignUpPage;

export {SignUpForm}