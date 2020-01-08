import React from 'react';
// import {withRouter} from 'react-router-dom';
import { Redirect } from 'react-router-dom';
const SecretPage = ({isLoggedIn, history}) => {
    if(isLoggedIn) {
        return (
            <div className="jumbotron text-center">
                <h3>This is a secret page!</h3>
            </div>
        );
    }
    // history.push('/login');
    return (<Redirect to="/login"/>);
};
// export default withRouter(SecretPage);
export default SecretPage;