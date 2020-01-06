import React from 'react';
import './hide-elem.css'
const HideElem = ({hide}) => {

    return(
      <button className="btn-hide-elem btn btn-warning btn-lg"
      onClick={()=>{hide()}}>
          Hide Planet
      </button>
    );
};
export default HideElem;