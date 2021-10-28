import { useState, useEffect, useRef } from 'react';
import { Container, Row, Col, Form, FormControl, FormGroup, FormLabel, Button } from "react-bootstrap";
import AddChild from './AddChild';
import Withdraw from './Withdraw';
import 'bootstrap/dist/css/bootstrap.min.css';
import web3 from 'web3';
import abi from "./contracts/MyContract.json";

function App() {

    const Web3 = useRef();
    const contract = useRef();
    const [myAccount, setMyAccount] = useState();
    const [admin, setAdmin] = useState();
    const [keyInput, setKeyInput] = useState();

    const handelKeyInput = (e) => {
        setKeyInput(e.target.value);
    }

    const connectToWallet = async (e) => {
        e.preventDefault();
        const acc = await Web3.current.eth.accounts.privateKeyToAccount(keyInput);
        setMyAccount(acc.address);
    }


    useEffect(() => {
        const init = async () => {
            Web3.current = new web3("http://127.0.0.1:7545");
            const netID = await Web3.current.eth.net.getId();
            contract.current = await new Web3.current.eth.Contract(abi.abi,abi.networks[netID].address);
            console.log(contract.current);
            const ADMIN = await contract.current.methods.admin().call();
            setAdmin(ADMIN);
        }
        init();
    },[admin])

    return (
        <Container>
            <Row>
                <Col></Col>
                <Col>
                    <Form>
                        <FormGroup>
                            <FormLabel>Enter Private Key</FormLabel>
                            <FormControl type="text" onChange={handelKeyInput}></FormControl>
                        </FormGroup>
                        <Button style={{ margin: '10px 0' }} variant="primary" type="submit" onClick={connectToWallet}>Connect</Button>
                        <h3>Connected To: { myAccount }</h3>
                    </Form>
                </Col>
                <Col></Col>
            </Row>
            <Row style={{ backgroundColor:"#00d4ff", margin: '10px 0', padding: "20px 0" }}>
                <AddChild Contract={contract.current} myAccount={ myAccount }/>
            </Row>
            <Row style={{ backgroundColor:"#00d4ff", margin: '10px 0', padding: "20px 0" }}>
                <Withdraw Contract={contract.current} myAccount={ myAccount } />
            </Row>
        </Container>
    )
}

export default App
