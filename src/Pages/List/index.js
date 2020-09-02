import React from 'react'
import { withAuthorization } from '../../session';


const List = () => {
    return (
        <div>

            <h3>My List</h3>
            <button>Edit list</button>


        </div>
    )
}

const condition = authUser => !!authUser;
 
export default withAuthorization(condition)(List);