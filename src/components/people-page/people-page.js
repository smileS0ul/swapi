import React, {Component} from 'react';
import './people-page.css';
import ItemList from "../item-list";
import ItemDetails from "../item-details";
import SwapiService from "../../services/swapi-service";
import Row from "../row";
import ErrorBoundry from "../error-boundry";


export default class PeoplePage extends Component {
    state = {
        selectedPerson: null
    };
    swapiService = new SwapiService();
    onItemSelected = (id) => {
        this.setState({
            selectedPerson: id
        });
    };

    render() {
        const {selectedPerson} = this.state;
        const itemList = (
            <ItemList
                onItemSelected={this.onItemSelected}
                getData={this.swapiService.getAllPersons}
                // renderItem={({name, gender, birthYear}) => `${name} (${gender} ${birthYear ? ', ' + birthYear : ''})`}
            >
                {(i) => `${i.name} (${i.gender} ${i.birthYear ? ', ' + i.birthYear : ''})`}
            </ItemList>
        );
        const personDetails = (
            <ErrorBoundry>
                <ItemDetails
                    itemId={selectedPerson}
                    getItemData={this.swapiService.getPerson}
                    getImageUrl={this.swapiService.getPeopleImageUrl}
                />
            </ErrorBoundry>
        );

        return (
            <ErrorBoundry>
                <Row left={itemList} right={personDetails}/>
            </ErrorBoundry>
        );
    }
}