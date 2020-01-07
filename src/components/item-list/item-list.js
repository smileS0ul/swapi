import React from 'react';
import PropTypes from 'prop-types';
import './item-list.css';

const ItemList = (props) => {
    let count = 0;
    const { data, onItemSelected, children } = props;

    const items = data.map((item) => {
        if (++count > 5) return;
        const label = children(item);
        return (
            <li className="list-group-item"
                key={item.id}
                onClick={() => onItemSelected(item.id)}>
                {label}
            </li>
        )
    });
    return (
        <ul className="item-list list-group">
            {items}
        </ul>
    )
};

ItemList.defaultProps = {
    onItemSelected: () => {}
};

ItemList.propTypes = {
    onItemSelected: PropTypes.func,
    data: PropTypes.arrayOf(PropTypes.object).isRequired,
    children: PropTypes.func.isRequired
};

export default ItemList;