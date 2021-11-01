import { useState } from 'react'
import { Col, Form, FormControl, FormGroup, FormLabel, Button } from 'react-bootstrap';
import web3 from 'web3';

function AddChild({Contract,myAccount}) {

    const addChild = async (e) => {
        e.preventDefault();
        Contract.methods.addChild(addr, time).send({ from: myAccount, value: web3.utils.toWei(eth) }).then(r=>console.log(r)).catch(err=>console.log(err));
    }

    const [addr, setAddr] = useState();
    const [time, setTime] = useState();
    const [eth, setEth] = useState();

    const handelAddrInput = (e) => {
        setAddr(e.target.value);
    }

    const handelTimeInput = (e) => {
        setTime(e.target.value);
    }

    const handelEth = (e) => {
        setEth(e.target.value);
    }

    return (
        <>
            <Col></Col>
                <Col>
                    <Form>
                        <FormGroup>
                            <FormLabel>Enter Childs Wallet Address</FormLabel>
                            <FormControl type="text" onChange={handelAddrInput}></FormControl>
                            <FormLabel>Enter Time In Secound</FormLabel>
                            <FormControl type="text" onChange={handelTimeInput}></FormControl>
                            <FormLabel>ETH</FormLabel>
                            <FormControl type="text" onChange={handelEth}></FormControl>
                        </FormGroup>
                    <Button style={{ margin: '10px 0' }} variant="primary" type="submit" onClick={ addChild }>Add Child</Button>
                    </Form>
                </Col>
            <Col></Col>
        </>
    )
}

export default AddChild
