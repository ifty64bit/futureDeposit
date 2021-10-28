import React from 'react'
import { Col, Button } from 'react-bootstrap';

function Withdraw({ Contract, myAccount }) {
    
    const withdraw = async () => {
        await Contract.methods.withdraw().send({ from: myAccount }).then(rec => console.log(rec)).catch(err => console.log(err));
    }

    return (
        <>
            <Col></Col>
            <Col>
                <Button variant="primary" onClick={withdraw}>Withdraw</Button>
            </Col>
            <Col></Col>
        </>
    )
}

export default Withdraw
