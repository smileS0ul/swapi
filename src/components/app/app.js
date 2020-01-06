import React, {Component} from 'react';
import Header from '../header';
import RandomPlanet from '../random-planet';
import HideElem from "../hide-elem";
import ErrorBtn from "../error-btn";
import PeoplePage from "../people-page";
import './app.css';
import ErrorIndicator from "../error-indicator/error-indicator";
import SwapiService from "../../services/swapi-service";
import DummySwapiService from "../../services/dummy-swapi-service";
import ItemDetails, {Record} from "../item-details/item-details";
import Row from "../row";
import ItemList from "../item-list/item-list";
import {SwapiServiceProvider} from '../swapi-service-context';
import {
    PersonList,
    PlanetList,
    StarshipList,
    PersonDetails,
    PlanetDetails,
    StarshipDetails
} from "../sw-components";

export default class App extends Component {
    state = {
        hide_planet: false,
        hasError: false,
        swapiService: new DummySwapiService()
    };

    onServiceChange = () => {
        this.setState(({ swapiService }) => {
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

        const {hide_planet} = this.state;
        const {
            getPerson,
            getStarship,
            getPlanet,
            getPeopleImageUrl,
            getStarshipImageUrl,
            getPlanetImageUrl,
            getAllPersons
        } = this.state.swapiService;
        const randomPlanet = hide_planet ? '' : <RandomPlanet hide_planet={false}/>;
        const personDetails = (
            <ItemDetails
                itemId={11}
                getItemData={getPerson}
                getImageUrl={getPeopleImageUrl}
            >
                <Record field="gender" label="Gender"/>
                <Record field="eyeColor" label="Eye Color"/>
            </ItemDetails>
        );
        const starshipDetails = (
            <ItemDetails
                itemId={5}
                getItemData={getStarship}
                getImageUrl={getStarshipImageUrl}
            >
                <Record field="model" label="Model"/>
                <Record field="length" label="Length"/>
                <Record field="costInCredits" label="Cost"/>
            </ItemDetails>
        );

        const planetDetails = (
            <ItemDetails
                itemId={6}
                getItemData={getPlanet}
                getImageUrl={getPlanetImageUrl}
            >
                <Record field="diameter" label="diameter"/>
                <Record field="population" label="population"/>
                <Record field="rotation" label="rotation"/>
            </ItemDetails>
        );
        return (
            <div>
                <SwapiServiceProvider value={this.state.swapiService}>
                    <Header onServiceChange={this.onServiceChange}/>
                    {randomPlanet}
                    <HideElem hide={this.hide}/>
                    <ErrorBtn/>
                    {/*<Row*/}
                    {/*    left={personDetails}*/}
                    {/*    right={starshipDetails}*/}
                    {/*/>*/}
                    {/*<PeoplePage/>*/}
                    {/*<ItemList*/}
                    {/*    getData={getAllPersons}*/}
                    {/*    onItemSelected={() => {}}>*/}
                    {/*    { ({name}) => <span>{name}</span>}*/}
                    {/*</ItemList>*/}

                    <PersonDetails itemId={11}/>
                    <PlanetDetails itemId={11}/>
                    <StarshipDetails itemId={11}/>

                    <PersonList/>
                    <PlanetList/>
                    <StarshipList/>
                </SwapiServiceProvider>
            </div>
        );
    }
};