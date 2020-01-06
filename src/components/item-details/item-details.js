import React, {Component} from 'react';
import SwapiService from "../../services/swapi-service";
import './item-details.css';
import Spinner from "../spinner";
import ErrorBtn from "../error-btn";
import ErrorBoundry from "../error-boundry";

const Record = ({item, field, label}) => {
    if (item[field])
        return (
            <li className="list-group-item">
                <span className="term">{label}</span>
                <span>{item[field]}</span>
            </li>
        );

    return null;
};
export {Record};

export default class ItemDetails extends Component {

    state = {
        item: null,
        image: null,
        loading: true
    };

    swapiService = new SwapiService();

    componentDidMount() {
        this.updateItem();
    }

    componentDidUpdate(prevProps) {
        if (this.props.itemId !== prevProps.itemId ||
         this.props.getData !== prevProps.getData ||
            this.props.getImageUrl !== prevProps.getImageUrl) {
            this.updateItem();
        }
    }

    updateItem() {
        const {itemId, getItemData, getImageUrl} = this.props;
        this.setState({
            loading: true
        });

        if (!itemId)
            return;

        getItemData(itemId)
            .then((item) => {
                this.setState({
                    item,
                    loading: false,
                    hasError: false,
                    image: getImageUrl(item)
                });
            })
            .catch(() => {
                this.setState({hasError: true})
            });
    };

    render() {

        if (this.state.loading)
            return (<div>
                <span>Please choose item</span>
                <Spinner/>
            </div>);

        const {item, image} = this.state;
        const {name} = item;

        return (

            <ErrorBoundry>
                <div className="item-details card">
                    <img className="item-image"
                         src={image}
                         alt="per"/>

                    <div className="card-body">
                        <h4>{name}</h4>
                        <ul className="list-group list-group-flush">
                            {React.Children.map(this.props.children,
                                (child) => {
                                    return React.cloneElement(child, { item });
                                })
                            }
                            <ErrorBtn/>
                        </ul>
                    </div>
                </div>
            </ErrorBoundry>
        )
    }
}
