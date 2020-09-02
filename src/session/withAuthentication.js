import React from 'react';
import AuthUserContext from './context';
import { withFirebase } from '../components/firebase';

const withAuthentication = Component => {
    class WithAuthentication extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                authUser: null,
            };
        }
        componentDidMount() {
            this.listener = this.props.firebase.auth.onAuthStateChanged( //Gets current user that is signed in
                authUser => {
                    authUser
                        ? this.setState({ authUser }) // Sets state as the current user
                        : this.setState({ authUser: null });
                },
            );
        }
        componentWillUnmount() {
            this.listener();
        }
        render() {
            return (
                <AuthUserContext.Provider value={this.state.authUser}>
                    <Component {...this.props} />
                </AuthUserContext.Provider>
            );
        }
    }
    return withFirebase(WithAuthentication);
};
export default withAuthentication;

