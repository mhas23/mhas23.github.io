import React from 'react'
import moment from 'moment'
import { withAuthorization } from '../../session'
import {withFirebase} from '../../components/firebase'
import {compose} from 'recompose'
import MovieList from '../../components/Movies/MovieList'


class FavoriteList extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            fil: []
        }
    }

  

    componentDidMount(){
        
        this.item =  this.props.firebase.item(this.props.user)
        
        this.item.on("value", snap => {
            let newArr = []
            snap.forEach((child) => {
                newArr.push({id: child.val().id, title:child.val().title, release_date: child.val().release_date, poster_path:child.val().poster_path})
            })
            this.setState({
                fil: Array.from(new Set(newArr.map(i => i.id))).map(id => {return newArr.find(a => a.id === id)}) 
            })
            
        }) 
        
    }

    componentWillUnmount(){
        this.item.off()
    }
    


render(){
    const date = moment(new Date()).format("YYYY-MM-DD")

    
    const soon = this.state.fil.filter(l => l.release_date > date)
    const already_released = this.state.fil.filter(r => r.release_date <= date)

    
    return (

        
        <div>
           
            
            <h3>My Favorites</h3>
            {this.state.fil.length === 0 ? <p>Go back and add some favorites</p> : 
                <>
                {already_released.length !== 0 ? (<><h3>Past Releases</h3>
                <MovieList movies={already_released} isLoggedIn={this.props.loggedin} userID={this.props.user}/> </>) : null}

                 {soon.length !== 0 ? (<><h3>Future Releases</h3>
                <MovieList movies={soon} isLoggedIn={this.props.loggedin} userID={this.props.user}/> </>) : null}   
                
                </>
            }
           
        </div>
        
    )
        
}
}


const condition = authUser => !!authUser;
export default compose(
    withAuthorization(condition),
    withFirebase
)(FavoriteList);