import React from 'react';

import Button from 'react-bootstrap/Button';



export default function LoadingButton(props) {
    let copy;
    const { working, done, workingMessage = 'Saving', children, ...buttonProps } = props;

    if (working) {
        copy = <div>{workingMessage}<span className="loading" /></div>;
    } else if (done) {
        copy = <div>Done!</div>;
    } else {
        copy = children;
    }

    return <Button { ...buttonProps }>
        {copy}
    </Button>;
}
