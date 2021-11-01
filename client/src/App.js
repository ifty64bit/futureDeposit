import { useState, useEffect, useRef } from 'react';
import { Container, Row, Col, Form, FormControl, FormGroup, FormLabel, Button } from "react-bootstrap";
import AddChild from './AddChild';
import Withdraw from './Withdraw';
import DisplayData from './DisplayData';
import 'bootstrap/dist/css/bootstrap.min.css';
import web3 from 'web3';
import HDWallet from '@truffle/hdwallet-provider';
import abi from "./contracts/MyContract.json";
import exp from './firebase';

function App() {
    const { database, ref, onValue, push } = exp; //destructering values
    const Web3 = useRef();
    const [contract, setContract] = useState();  //Contract State
    const [myAccount, setMyAccount] = useState();   //user account address
    const [privateKey, setPrivateKey] = useState(); //useraccount private address
    const [addresses, setAddresses] = useState([]); // addresses of smart contract
    const [contractAddr, setContractAddr] = useState(); //input to connect existing contract

    //save data to firebase
    function writeUserData(admin,address) {
        push(ref(database, 'users/'), {
          deployedBy: admin,
          contractAddr: address,
        });
      }

    const handelKeyInput = (e) => {
        setPrivateKey(e.target.value);
    }

    const handelContractAddrInput = (e) => {
        setContractAddr(e.target.value);
    }

    const connectExistingContract = async () => {
        let cont = await new Web3.current.eth.Contract(abi.abi, contractAddr);
        setContract(cont);
    }

    const connectToWallet = async (e) => {
        e.preventDefault();
        
        const acc = await Web3.current.eth.accounts.privateKeyToAccount(privateKey);
        setMyAccount(acc.address);
        
    }

    const deploy = async () => {
        let contractAddress;
        let cont = await new Web3.current.eth.Contract(abi.abi);
        cont = await cont.deploy({ data: abi.bytecode }).send({ from: myAccount })
            .then(rec =>
            {
                contractAddress = rec._address;
                writeUserData(myAccount,contractAddress)
                cont.options.address = contractAddress;
                setContract(cont);
                console.log(contractAddress)
            })
            .catch(err => console.log(err));
    }


    useEffect(() => {
        const init = async () => {
            const provider = new HDWallet("van easily ladder usual rude cinnamon wild vicious couch range stairs dance", "http://127.0.0.1:7545",0,10);
            Web3.current = new web3(provider);
        }
        init();
    },[])

    // retrive data from firebase
    useEffect(() => {
        const starCountRef = ref(database, 'users/');
        onValue(starCountRef, (snapshot) => {
        const data = snapshot.val();
        console.log(data);
        setAddresses(data)
    });
    },[ref, onValue, database])

    return (
        <Container>
            <Row style={{ backgroundColor:"#02FD8D", margin: '10px 0', padding: "20px 0" }}>
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
                <Col></Col>
                <Col>
                    <DisplayData data={addresses} />
                    <Button style={{ margin: '10px 0' }} variant="primary" onClick={deploy}>Deploy</Button>
                    <Form>
                        <FormGroup>
                            <FormLabel>Enter Smert Contract Address</FormLabel>
                            <FormControl type="text" onChange={handelContractAddrInput}></FormControl>
                        </FormGroup>
                        <Button style={{ margin: '10px 0' }} variant="primary" onClick={connectExistingContract}>Connect to Existing Contract</Button>
                        <h3>Current Smart Contract Address: { contract?contract.options.address: "" }</h3>
                    </Form>
                </Col>
                <Col></Col>
            </Row>
            <Row style={{ backgroundColor:"#02FD8D", margin: '10px 0', padding: "20px 0" }}>
                <AddChild Contract={contract} myAccount={ myAccount }/>
            </Row>
            <Row style={{ backgroundColor:"#00d4ff", margin: '10px 0', padding: "20px 0" }}>
                <Withdraw Contract={contract} myAccount={ myAccount } />
            </Row>
        </Container>
    )
}

export default App
