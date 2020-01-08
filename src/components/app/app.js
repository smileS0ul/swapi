import React, {Component} from 'react';
import Header from '../header';
import RandomPlanet from '../random-planet';
// import HideElem from "../hide-elem";
// import ErrorBtn from "../error-btn";
// import Row from "../row";
// import PeoplePage from "../people-page";
import './app.css';
import ErrorIndicator from "../error-indicator/error-indicator";
import SwapiService from "../../services/swapi-service";
import DummySwapiService from "../../services/dummy-swapi-service";
import {SwapiServiceProvider} from '../swapi-service-context';
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
import {StarshipDetails} from "../sw-components";
import {
    PeoplePage,
    PlanetPage,
    StarshipPage,
    LoginPage,
    SecretPage
} from "../pages";

export default class App extends Component {
    state = {
        hide_planet: false,
        hasError: false,
        swapiService: new SwapiService(),
        isLoggedIn: false
    };

    onLogin = () => {
        this.setState({
            isLoggedIn: true
        })
    };

    onServiceChange = () => {
        this.setState(({swapiService}) => {
            const Service = swapiService instanceof SwapiService ?
                DummySwapiService : SwapiService;
            return {
                swapiService: new Service()
            }
        })
    };

    hide = () => {
        const visible = !this.state.hide_planet;
        this.setState({
            hide_planet: visible
        });
    };

    componentDidCatch() {
        this.setState({hasError: true});
    }

    render() {
        if (this.state.hasError)
            return <ErrorIndicator/>;

        const randomPlanet = this.state.hide_planet ? '' : <RandomPlanet hide_planet={false} updateInterval={10000}/>;

        const {isLoggedIn} = this.state;

        return (
            <div>
                <SwapiServiceProvider value={this.state.swapiService}>
                    <Router>
                        <Header onServiceChange={this.onServiceChange}/>
                        {randomPlanet}
                        <Switch>
                            {/*<HideElem hide={this.hide}/>*/}
                            {/*<ErrorBtn/>*/}
                            <Route path='/' render={() => <h2>Welcome to StarDB App</h2>} exact/>
                            <Route path='/people/:id?' component={PeoplePage}/>
                            <Route path='/planets' component={PlanetPage}/>
                            <Route path='/starships' exact component={StarshipPage}/>
                            <Route path='/starships/:id'
                                   render={({match}) =>
                                       <StarshipDetails itemId={match.params.id}/>}/>
                            <Route path="/login"
                                   render={() => (
                                       <LoginPage
                                           isLoggedIn={isLoggedIn}
                                           onLogin={this.onLogin}
                                       />
                                   )}
                            />
                            <Route path="/secret"
                                   render={() => (
                                       <SecretPage
                                           isLoggedIn={isLoggedIn}
                                       />
                                   )}
                            />
                            {/*<Redirect to='/login'/>*/}
                            <Route render={() => <h2>Page not found</h2>}/>
                        </Switch>
                    </Router>
                </SwapiServiceProvider>
            </div>
        );
    }
};