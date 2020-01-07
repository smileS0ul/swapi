import React, {Component} from 'react';
import Header from '../header';
import RandomPlanet from '../random-planet';
import HideElem from "../hide-elem";
import ErrorBtn from "../error-btn";
// import Row from "../row";
// import PeoplePage from "../people-page";
import {PeoplePage, PlanetPage, StarshipPage} from "../pages";
import './app.css';
import ErrorIndicator from "../error-indicator/error-indicator";
import SwapiService from "../../services/swapi-service";
import DummySwapiService from "../../services/dummy-swapi-service";
import {SwapiServiceProvider} from '../swapi-service-context';

export default class App extends Component {
    state = {
        hide_planet: false,
        hasError: false,
        swapiService: new SwapiService()
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

        return (
            <div>
                <SwapiServiceProvider value={this.state.swapiService}>
                    <Header onServiceChange={this.onServiceChange}/>
                    {randomPlanet}
                    <HideElem hide={this.hide}/>
                    <ErrorBtn/>
                    <PeoplePage/>
                    <PlanetPage/>
                    <StarshipPage/>
                </SwapiServiceProvider>
            </div>
        );
    }
};