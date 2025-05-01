import { Container, Row, Col, Modal } from "react-bootstrap";
import BackButton from '../common/BackButton';
import { RiDeleteBin2Line, RiEdit2Line } from "react-icons/ri";
import { APP_DATABASE_URL } from "../../constant/constant";
import axios from 'axios';
import React, { useState, useEffect } from "react";

const Admin = () => {
    const [match, setMatch] = useState([])

    const [showDelete, setShowDelete] = useState(false);

    const handleShowDelete = () => setShowDelete(true);

    const handleCloseDelete = () => setShowDelete(false)

     useEffect(() => {
            axios.get(`${APP_DATABASE_URL}/matches`)
            .then(response => setMatch(response.data))
            .catch(error => console.error('Error fetching data:', error));
            }, []);

    const tdRight={
        textAlign:'right'
    };

    return (
        <Container>
            <Row>
                <Col md={1}><BackButton /></Col>
                <Col md={11}> 
                    <h1>Hamburger Menu</h1>
                </Col>
                <hr></hr>
            </Row>
            <Row>
                <Col md={12}>
                    <h2>Settings</h2>
                    <hr></hr>
                </Col>
                <Col md={4}>
                    <h3>App Information</h3>
                    <hr></hr>
                    <p>Flying Toasters ScoutDB Version: 2025.1.0</p>
                    <p>Most Recent Server Model Version: 2025-v3</p>
                    <p>Powered By <a href="https://www.thebluealliance.com/" target="_blank" rel="noopener noreferrer">The Blue Alliance</a></p>
                </Col>
                <Col md={4}>
                    <h3>Compatible Years</h3>
                    <hr></hr>
                    <p>Reefscape ~ 2025</p>
                </Col>
                <Col md={4}>
                    <h3>Contributors</h3>
                    <hr></hr>
                    <p>ck2424</p>
                    <p>Jacobk12345</p>
                    <p>chase234568</p>
                    <p>JackSlisher1234</p>
                    <p>Divith-N</p>
                </Col>
            </Row>
            <Row>
                <Col md={12}>
                    <h2>Admin</h2>
                    <hr></hr>
                </Col>
                <Col md={4}>
                <Modal
                show={showDelete}
                onHide={handleCloseDelete}
                backdrop="static"
                keyboard={false}
                >
                    <Modal.Header>
                        <Modal.Title>Warning</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        By pressing "Delete" the match {match.matchKey} will be irreversible destroyed. If you don't want to do this, press cancel. 
                    </Modal.Body>
                    <Modal.Footer>
                        <button className="btn btn-primary" onClick={handleCloseDelete}> Cancel </button>
                        <button className="btn btn-danger" >Delete <RiDeleteBin2Line /> </button>
                    </Modal.Footer>
                </Modal>
                    <h3>Matches</h3>
                    <hr></hr>
                    <table classname="table">
                        <thead>
                            <tr>
                                <th>Match Key</th>
                                <th>Edit</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {match.map(match => (
                                <tr key={match.id}> 
                                <td>{match.matchKey}</td>
                                <td style={tdRight}>
                                    <button className="btn btn-primary" ><RiEdit2Line /> </button>
                                </td>
                                <td style={tdRight}>
                                    <button className="btn btn-danger" onClick={() => handleShowDelete(true)}><RiDeleteBin2Line /> </button>
                                </td>
                            </tr>
                            ))}
                        </tbody>
                    </table>
                </Col>
                <Col md={4}>
                    <h3>Events</h3>
                    <hr></hr>
                </Col>
                <Col md={4}>
                    <h3>Teams</h3>
                    <hr></hr>
                </Col>
            </Row>
        </Container>
    );
}

export default Admin;