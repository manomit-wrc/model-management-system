import React from 'react';
import Aux from '../hoc/Aux';

const Blank = (props) => {
    return (
        <Aux>
            {props.children}
        </Aux>
    );
}

export default Blank;