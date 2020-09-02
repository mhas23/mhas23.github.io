import React from 'react'
import ReactDOM from 'react-dom'
import AppPage from './components/App'
import Firebase, { FirebaseContext } from './components/firebase'

ReactDOM.render(
    <FirebaseContext.Provider value={new Firebase()}>
        <AppPage />
    </FirebaseContext.Provider>,
    document.getElementById("root")
)