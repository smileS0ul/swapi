import React, {Component} from 'react';
import './error-btn.css';
export default class ErrorBtn extends Component{

    state = {err:false};

    err = () => {this.setState({err:true})};

    render() {
        if (this.state.err)
            this.foo.bar = 0;

        return (
            <button className="btn btn-danger btn-lg error-button"
                    onClick={this.err}>
                Throw Error
            </button>
        )
    }
};