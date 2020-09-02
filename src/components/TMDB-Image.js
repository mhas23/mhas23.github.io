import React from 'react'
import Logo from '../images/themoviedb-logo.png'

const TMDBImage = () => {
    return (
        <div style={{display:'flex', flexDirection:'column', alignItems:'flex-end'}}>
            <a href ="https://www.themoviedb.org/" style={{textDecoration:'none'}}>
                <h3>Powered By</h3>
                <img src={Logo} style={{width:'100px', height:'100px'}} alt="TMBD Logo" />
            </a>
        
        </div>
    )
}

export default TMDBImage