import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import BackButton from '../common/BackButton';
import { APP_DATABASE_URL } from "../../constant/constant";
import { Col, Container, Row } from "react-bootstrap";

const Team = () => {
    const [team, setTeam] = useState([]);
    const [matchdata, setMatchdata] = useState([]);

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const teamid2026 = searchParams.get('teamId');

    useEffect(() => {
        axios.get(`${APP_DATABASE_URL}/teams/${teamid2026}`)
        .then(response => setTeam(response.data))
        .catch(error => console.error('Error fetching data:', error));
        }, [teamid2026]);
    
    useEffect(() => {
        axios.get(`${APP_DATABASE_URL}/matchData/2026/teamMatches/${team.teamNumber}`)
        .then(response => setMatchdata(response.data))
        .catch(error => console.error('Error fetching data:', error));
    }, [team.teamNumber]);
    

    return (
        <Container>
            <Row>
                <Col md={1}><BackButton /></Col>
                <Col md={11}><h1> {team.teamNumber} - {team.nickname} 2026</h1></Col>
            </Row>
            <Row><hr></hr></Row>
            <Row>
                <Col md={10}>
                    <h2>Matches</h2>
                    <hr></hr>
                    <table className="table">
                    <thead>
                            <tr>
                                <th>Match Key</th>
                                <th>Position</th>
                                <th>Robot Position</th>
                                <th>Auton Path</th>
                                <th>Preload</th>
                                <th>TeleOp Trench</th>
                                <th>TeleOp Bump</th>
                                <th>Nuetral to Alliance</th>
                                <th>Oppenent to Nuetral</th>
                                <th>Oppenent to Alliance</th>
                                <th>Shoots Majority</th>
                                <th>Shoots Half</th>
                                <th>Shoots Less Than Half</th>
                                <th>Often does Human Feed</th>
                                <th>Rarely does Human Feed</th>
                                <th>Steals</th>
                                <th>Blocks</th>
                                <th>CL1R</th>
                                <th>CL1C</th>
                                <th>CL1L</th>
                                <th>CL2R</th>
                                <th>CL2C</th>
                                <th>CL2L</th>
                                <th>CL3R</th>
                                <th>CL3C</th>
                                <th>CL3L</th>
                            </tr>
                        </thead>
                        <tbody>
                            {matchdata.map(matchdata => (
                                <tr key= {matchdata.teamNumber}>
                                    <td>{matchdata.matchKey}</td>
                                    <td>{matchdata.allianceLocation}</td>
                                    <td>{matchdata.autonPath}</td>
                                    <td>{matchdata.startPreload}</td>
                                    <td>{matchdata.postUnderTrench}</td>
                                    <td>{matchdata.postOverBump}</td>
                                    <td>{matchdata.teleOpPassNeutralAlliance}</td>
                                    <td>{matchdata.teleOpPassOpponentNeutral}</td>
                                    <td>{matchdata.teleOpPassOpponentAlliance}</td>
                                    <td>{matchdata.teleOpShootMajority}</td>
                                    <td>{matchdata.teleOpShootHalf}</td>
                                    <td>{matchdata.teleOpShootLittle}</td>
                                    <td>{matchdata.teleOpFeedHumanMajority}</td>
                                    <td>{matchdata.teleOpFeedHumanLittle}</td>
                                    <td>{matchdata.teleOpDefenceStealling}</td>
                                    <td>{matchdata.teleOpDefenceBlocking}</td>
                                    <td>{matchdata.postClimbLevelOneRight}</td>
                                    <td>{matchdata.postClimbLevelOneCenter}</td>
                                    <td>{matchdata.postClimbLevelOneLeft}</td>
                                    <td>{matchdata.postClimbLevelTwoRight}</td>
                                    <td>{matchdata.postClimbLevelTwoCenter}</td>
                                    <td>{matchdata.postClimbLevelTwoLeft}</td>
                                    <td>{matchdata.postClimbLevelThreeRight}</td>
                                    <td>{matchdata.postClimbLevelThreeCenter}</td>
                                    <td>{matchdata.postClimbLevelThreeLeft}</td>
                                    <td>{matchdata.postDisabledMechanically}</td>
                                    <td>{matchdata.postNotThere}</td>
                                    <td>{matchdata.postStuckFieldElement}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </Col>
                <Col md={2}>
                    <h2>Team Information</h2>
                    <hr></hr>
                    <h5>Team Number:</h5>
                    <p>{team.teamNumber}</p>
                    <h5>Team Name:</h5>
                    <p>{team.nickname}</p>
                    <h5>Country:</h5>
                    <p>{team.country}</p>
                    <h5>State/Prov:</h5>
                    <p>{team.state_prov}</p>
                    <h5>City:</h5>
                    <p>{team.city}</p>
                </Col>
            </Row>
        </Container>
    );
}

export default Team;