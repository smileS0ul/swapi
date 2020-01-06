import React, {Component} from 'react';
import SwapiService from "../../services/swapi-service";
import './random-planet.css';
import Spinner from "../spinner";
import ErrorIndicator from "../error-indicator/error-indicator";

export default class RandomPlanet extends Component {

    // constructor() {
    //     console.log('constructor');
    //     super();
    //     this.updatePlanet();
    //     this.idInterval = setInterval(this.updatePlanet, 5000);
    // }

    componentDidMount() {
        this.updatePlanet();
        this.idInterval = setInterval(this.updatePlanet, 5000);
    }

    idInterval = null;

    state = {
        planet: {},
        loading: true,
        error: false
    };

    swapiService = new SwapiService();

    onPlanetLoaded = (planet) => {
        // this.setState({
        //     id: planet.id,
        //     name: planet.name,
        //     population: planet.population,
        //     rotation: planet.rotation,
        //     diameter: planet.diameter
        // });
        this.setState({
            planet,
            loading: false
        });
    };

    onError = () => {
        this.setState({
            error: true,
            loading: false
        });
    };

    componentWillUnmount() {
        clearInterval(this.idInterval);
    }

    updatePlanet = () => {
        const id = this.swapiService._getRandomId(2, 21);
        this.swapiService.getPlanet(id)
            .then(this.onPlanetLoaded)
            .catch(this.onError)
    };

    render() {
        const {planet, loading, error} = this.state;
        let content = loading ? <Spinner/> : (!error ? <PlanetView planet={planet}/> : <ErrorIndicator/>);

        // const {hide_planet} = this.props;
        let classNames = "random-planet jumbotron rounded";
        // classNames += (hide_planet ? ' hide': '');

        return (
            <div className={classNames}>
                {content}
            </div>
        );
    }
}

const PlanetView = (planet) => {
    const {planet: {id, name, population, rotation, diameter}} = planet;
    return (
        <React.Fragment>
            <img className="planet-image"
                 src={`https://starwars-visualguide.com/assets/img/planets/${id}.jpg`}
                 alt="pl"/>
            <div>
                <h4>{name}</h4>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">
                        <span className="term">Population</span>
                        <span>{population}</span>
                    </li>
                    <li className="list-group-item">
                        <span className="term">Rotation Period</span>
                        <span>{rotation}</span>
                    </li>
                    <li className="list-group-item">
                        <span className="term">Diameter</span>
                        <span>{diameter}</span>
                    </li>
                </ul>
            </div>
        </React.Fragment>
    );
};