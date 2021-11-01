import React from 'react'
import { Table, Col } from 'react-bootstrap';

function DisplayData({data}) {
    return (
        <Col>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Contract Address</th>
                        <th>Deployd By</th>
                    </tr>
                </thead>
                    <tbody>
                    {
                        Object.keys(data).map((l,index) => {
                            return (
                                <tr key={index}>
                                    <td>{data[l].contractAddr}</td>
                                    <td>{data[l].deployedBy}</td>
                                </tr>
                            )
                        })
                    }
                </tbody> 
            </Table>
        </Col>
    )
}

export default DisplayData
