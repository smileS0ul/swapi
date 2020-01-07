import Spinner from "../spinner";
import React, {Component} from "react";
import './with-data.css';
import ErrorIndicator from "../error-indicator/error-indicator";

const withData = (View) => {
    return class extends Component {

        state = {
            data: null,
            loading: true,
            error: false
        };

        componentDidUpdate(prevProps) {
            if (this.props.getData !== prevProps.getData) {
                this.update();
            }
        }

        componentDidMount() {
            this.update();
        }

        update() {
            this.setState({
                loading: true,
                error: false
            });
            this.props.getData()
                .then((data) => {
                    this.setState({
                        data,
                        loading: false
                    });
                })
                .catch(() => {
                    this.setState({error: true})
                });
        }

        render() {
            const {data, error, loading } = this.state;

            if (loading) return <Spinner/>;
            if (error) return <ErrorIndicator/>;

            return <View {...this.props} data={data}/>
        }
    }
};

export default withData;