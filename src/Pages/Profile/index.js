import React from 'react'
import {withFirebase} from '../../components/firebase'
import {compose} from 'recompose'
import {withRouter} from 'react-router-dom'
import { withAuthorization } from '../../session'
import SignOutApp from '../../components/SignOut'

const ProfileForm = (props) => (
    <div>
        <ProfileApp/>
    </div>
)

class Profile extends React.Component{
   

    handleDelete = (event) => {
        event.preventDefault()
        
        if(window.confirm("Are you sure you want to delete your account?")){
        this.props.firebase.doDeleteAccount()
       
        .then((user) => {
            this.props.firebase.user(this.props.firebase.auth.W).remove()
                 
            this.props.history.push('/signup')
            alert("Account Deleted!")

        }).catch(error => {
        this.setState({error})
        alert(this.state.error)
        this.props.firebase.doSignOut()
              .then((user) => {
                 
                  this.props.history.push('/signin')
                    console.log("sign out")
              }).catch(error => {
              this.setState({error})
              alert(this.state.error)
              
          })
          

    })
    }
}

    render(){

        return (
            <div>
    
                <h3>This is my Profile!</h3>
                <button>Edit Profile</button>
                <form onSubmit={this.handleDelete}>
                     <button>Delete Profile</button>
    
                </form>
                <SignOutApp/>

    
            </div>
        )
    }
}

const condition = authuser => !!authuser

const ProfileApp = compose(
    withRouter,
    withFirebase,
    withAuthorization(condition)
  )(Profile)

  export default ProfileForm

  export {ProfileApp}