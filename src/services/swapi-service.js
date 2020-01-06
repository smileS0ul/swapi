export default class SwapiService {
    _api_base = 'https://swapi.co/api/';
    _image_base = 'https://starwars-visualguide.com/assets/img/';
    getInfo = async (url) => {
        const res = await fetch(`${this._api_base}${url}`);
        if (!res.ok)
            throw new Error(`Could not fetch ${url} status is: ${res.status}`);

        return await res.json();
    };

    getAllPersons = async () => {
        const res = await this.getInfo('people/');
        return res.results.map(this._transformPerson);
    };

    getPerson = async (id) => {
        const person = await this.getInfo(`people/${id}`);
        return this._transformPerson(person);
    };

    getAllPlanets = async () => {
        const res = await this.getInfo('planets/');
        return res.results.map(this._transformPlanet);
    };

    getPlanet = async (id) => {
        const planet = await this.getInfo(`planets/${id}`);
        return this._transformPlanet(planet);
    };

    getAllStarships = async () => {
        const res = await this.getInfo('starships/');
        return res.results.map(this._transformStarship);
    };

    getStarship = async (url) => {
        const starsip = await this.getInfo(`starships/${url}`);
        return this._transformStarship(starsip);
    };

    getPeopleImageUrl = ({id}) => {
        return this._image_base+`characters/${id}.jpg`
    };

    getStarshipImageUrl = ({id}) => {
        return this._image_base+`starships/${id}.jpg`
    };

    getPlanetImageUrl = ({id}) => {
        return this._image_base+`planets/${id}.jpg`
    };

    _extractId = (item) => {
        const idRegexp = /([\d]+)\/$/;
        return item.url.match(idRegexp)[1];
    };

    _transformPlanet = (planet) => {
        return {
            id: this._extractId(planet),
            name: planet.name,
            population: planet.population,
            rotation: planet.rotation_period,
            diameter: planet.diameter
        };
    };

    _transformStarship = (starship) => {
        return {
            id: this._extractId(starship),
            name: starship.name,
            model: starship.model,
            manufacturer: starship.manufacturer,
            costInCredits: starship.costInCredits,
            length: starship.length,
            crew: starship.crew,
            passengers: starship.passengers,
            cargoCapacity: starship.cargoCapacity
        }
    };

    _transformPerson = (person) => {
        return {
            id: this._extractId(person),
            name: person.name,
            gender: person.gender,
            birthYear: person.birthYear,
            eyeColor: person.eyeColor
        }
    };

    _getRandomId(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}
