import React, {Component} from 'react';
import './error-boundry.css';
import ErrorIndicator from "../error-indicator/error-indicator";

export default class ErrorBoundry extends Component {

    state = {
        hasError: false
    };
    componentDidMount() {
        this.setState({hasError: false});
    }

    componentDidCatch() {
        this.setState({hasError: true})
    }

    render() {
        return this.state.hasError ? <ErrorIndicator/> : this.props.children;
    }
}