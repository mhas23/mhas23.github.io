import React from 'react';
import {withFirebase} from '../../components/firebase';
import { withRouter } from 'react-router-dom';
import {compose} from 'recompose'

const SignOutForm = () => (
    <div>
        <SignOutApp/>
    </div>
)

class SignOut extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            error: null
        }
    }

    onSubmit = (event) => {
        this.props.firebase.doSignOut()
              .then((user) => {
                 
                  this.props.history.push('/signin')
                  alert("Signed Out")
    
              }).catch(error => {
              this.setState({error})
              alert(this.state.error)
          })
          event.preventDefault()
    }


render(){
    return (
        <div>
            <form onSubmit={this.onSubmit}>
                 <button>Sign out</button>
            </form>

        </div>
    )
}
}

const SignOutApp = compose(
    withRouter,
    withFirebase
  )(SignOut)

  export default SignOutForm

  export {SignOutApp}