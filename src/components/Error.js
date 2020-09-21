import React from 'react';

function Error(props) {
    return props.error === true ?(
        <div className="error">
            <h1>City Not Found</h1>
        </div>
    ): null
}

export default Error;