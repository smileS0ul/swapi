import React from 'react';
import ItemDetails, {Record} from "../item-details";
import withSwapiService from "../hoc-helpers/with-swapi-service";

const PlanetDetails = (props) => {
    return (
        <ItemDetails {...props}>
            <Record field="diameter" label="diameter"/>
            <Record field="population" label="population"/>
            <Record field="rotation" label="rotation"/>
        </ItemDetails>
    );
};

const mapMethodToProps = (swapiService) => {
    return {
        getItemData: swapiService.getPlanet,
        getImageUrl: swapiService.getPlanetImageUrl
    }
};

export default withSwapiService(PlanetDetails, mapMethodToProps);