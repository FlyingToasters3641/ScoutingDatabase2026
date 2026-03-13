import React, { useState, useEffect, useContext } from "react";
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import BackButton from '../common/BackButton';
import { APP_DATABASE_URL } from "../../constant/constant";
import { Col, Container, Row } from "react-bootstrap";
import { AppContext } from "../common/AppContext.js";

const Team = () => {
    const { appData, setAppData } = useContext(AppContext);
    const [team, setTeam] = useState([]);
    const [matchdata, setMatchdata] = useState([]);
    const teamMedianDefault = [{medTeleOpPassNeutralAlliance: -1, medTeleOpPassOpponentNeutral: -1, medTeleOpPassOpponentAlliance: -1, medTeleOpShootMajority: -1, medTeleOpShootHalf: -1, medTeleOpShootLittle: -1}];
    const teamAverageDefault = [{
        avgStartTrenchLeft: -1,
        avgStartBumpLeft: -1,
        avgStartHub: -1,
        avgStartBumpRight: -1,
        avgStartTrenchRight: -1,
        avgStartPreload: -1,
        avgTeleOpPassNeutralAlliance: -1,
        avgTeleOpPassOpponentNeutral: -1,
        avgTeleOpPassOpponentAlliance: -1,
        avgTeleOpShootMajority: -1,
        avgTeleOpShootHalf: -1,
        avgTeleOpShootLittle: -1,
        avgTeleOpFeedHumanMajority: -1,
        avgTeleOpFeedHumanLittle: -1,
        avgTeleOpDefenceStealling: -1,
        avgTeleOpDefenceBlocking: -1,
        avgPostClimbLevelOneRight: -1,
        avgPostClimbLevelOneCenter: -1,
        avgPostClimbLevelOneLeft: -1,
        avgPostClimbLevelTwoRight: -1,
        avgPostClimbLevelTwoCenter: -1,
        avgPostClimbLevelTwoLeft: -1,
        avgPostClimbLevelThreeRight: -1,
        avgPostClimbLevelThreeCenter: -1,
        avgPostClimbLevelThreeLeft: -1,
        avgPostUnderTrench: -1,
        avgPostOverBump: -1,
        avgPostNotThere: -1,
        avgPostDisabledMechanically: -1,
        avgPostStuckOnFieldElement: -1,
    }];
    const [teamAverage, setTeamAverage] = useState(teamAverageDefault);
    const [teamMedian, setTeamMedian] = useState(teamMedianDefault);

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const teamid = searchParams.get('teamId');

    

    useEffect(() => {
        axios.get(`${APP_DATABASE_URL}/teams/${teamid}`)
        .then(response => setTeam(response.data))
        .catch(error => console.error('Error fetching data:', error));
        }, [teamid]);
    
    useEffect(() => {
        axios.get(`${APP_DATABASE_URL}/matchData/2026/${appData.currentEventID}/team/${team.teamNumber}`)
        .then(response => setTeamAverage(response.data))
        .catch(error => console.error('Error fetching data:', error));
    }, [team.teamNumber]);

    useEffect(() => {
        axios.get(`${APP_DATABASE_URL}/matchData/2026/${appData.currentEventID}/team/${team.teamNumber}/median`)
        .then(response => setTeamMedian(response.data))
        .catch(error => console.error('Error fetching data:', error));
    }, [team.teamNumber]);
   
    useEffect(() => {
        axios.get(`${APP_DATABASE_URL}/matchData/2026/teamMatches/${team.teamNumber}`)
        .then(response => setMatchdata(response.data))
        .catch(error => console.error('Error fetching data:', error));
    }, [team.teamNumber]);

    return (
        <Container>
            <Row>
                <Col md={1}><BackButton /></Col>
                <Col md={11}><h1> {team.teamNumber} - {team.nickname} - {appData.currentEventKey}</h1></Col>
            </Row>
            <Row><hr></hr></Row>
            <Row>
                <Col md={10}>
                    <Row>
                        <Col md={12}>
                            <h2>Auton Data</h2>
                            <hr></hr>
                        <table className="table">
                            <thead>
                                    <tr>
                                        <th>Preloaded</th>
                                        <th>Trench Left</th>
                                        <th>Bump Left</th>
                                        <th>Hub</th>
                                        <th>Bump Right</th>
                                        <th>Trench Right</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="bg-secondary bg-opacity-10">
                                        <td>{teamAverage[0].avgStartPreload}</td>
                                        <td>{teamAverage[0].avgStartTrenchLeft}</td>
                                        <td>{teamAverage[0].avgStartBumpLeft}</td>
                                        <td>{teamAverage[0].avgStartHub}</td>
                                        <td>{teamAverage[0].avgStartBumpRight}</td>
                                        <td>{teamAverage[0].avgStartTrenchRight}</td>
                                    </tr>
                                </tbody>
                            </table>

                        <table className="table">
                            <thead>
                                    <tr>
                                        <th>Match Key</th>
                                        <th>Action 1</th>
                                        <th>Action 2</th>
                                        <th>Action 3</th>
                                        <th>Action 4</th>
                                        <th>Action 5</th>
                                        <th>Action 6</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {matchdata.map(matchdata => (
                                        <tr key= {matchdata.teamNumber} className="bg-secondary bg-opacity-10">
                                            <td>{matchdata.matchKey}</td>
                                            <td>{matchdata.autonOne}</td>
                                            <td>{matchdata.autonTwo}</td>
                                            <td>{matchdata.autonThree}</td>
                                            <td>{matchdata.autonFour}</td>
                                            <td>{matchdata.autonFive}</td>
                                            <td>{matchdata.autonSix}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={12}>
                            <h2>TeleOp Data</h2>
                            <hr></hr>
                            <Row>
                                <Col md={6}>
                                    <h5>Passing</h5>
                                    <hr></hr>
                                    <table className="table">
                                        <thead>
                                                <tr>
                                                    <th>Neutral to Alliance</th>
                                                    <th>Opposing to Neutral</th>
                                                    <th>Opposing to Alliance</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr className="bg-secondary bg-opacity-10">
                                                    <td>{teamAverage[0].avgTeleOpPassNeutralAlliance}</td>
                                                    <td>{teamAverage[0].avgTeleOpPassOpponentNeutral}</td>
                                                    <td>{teamAverage[0].avgTeleOpPassOpponentAlliance}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                </Col>
                                <Col md={6}>
                                    <h5>Fuel in Hub</h5>
                                    <hr></hr>
                                        <table className="table">
                                        <thead>
                                                <tr>
                                                    <th>Majority</th>
                                                    <th>About Half</th>
                                                    <th>Little</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr className="bg-secondary bg-opacity-10">
                                                    <td>{teamAverage[0].avgTeleOpShootMajority}</td>
                                                    <td>{teamAverage[0].avgTeleOpShootHalf}</td>
                                                    <td>{teamAverage[0].avgTeleOpShootLittle}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                </Col>
                            </Row>
                        </Col>
                        <Row>
                        <h2>Other Data</h2>
                        <hr></hr>
                        </Row>
                        <Row>
                            <Col md={6}>
                                <h5>General Data</h5>
                                <hr></hr>
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th>Category</th>
                                            <th>Average</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className="bg-secondary bg-opacity-10">
                                            <td>Under Trench</td>
                                            <td>{teamAverage[0].avgPostUnderTrench}</td>
                                        </tr>
                                        <tr className="bg-secondary bg-opacity-10">
                                            <td>Over Bump</td>
                                            <td>{teamAverage[0].avgPostOverBump}</td>
                                        </tr>
                                        <tr className="bg-secondary bg-opacity-10">
                                            <td>Not There</td>
                                            <td>{teamAverage[0].avgPostNotThere}</td>
                                        </tr>
                                        <tr className="bg-secondary bg-opacity-10">
                                            <td>Disabled Mechanically</td>
                                            <td>{teamAverage[0].avgPostDisabledMechanically}</td>
                                        </tr>
                                        <tr className="bg-secondary bg-opacity-10">
                                            <td>Stuck on Field Element</td>
                                            <td>{teamAverage[0].avgPostStuckOnFieldElement}</td>
                                        </tr>
                                        <tr className="bg-secondary bg-opacity-10">
                                            <td>Feed Human Lots</td>
                                            <td>{teamAverage[0].avgTeleOpFeedHumanMajority}</td>
                                        </tr>
                                        <tr className="bg-secondary bg-opacity-10">
                                            <td>Feed Human Little</td>
                                            <td>{teamAverage[0].avgTeleOpFeedHumanLittle}</td>
                                        </tr>
                                        <tr className="bg-secondary bg-opacity-10">
                                            <td>Defence Stealling</td>
                                            <td>{teamAverage[0].avgTeleOpDefenceStealling}</td>
                                        </tr>
                                        <tr className="bg-secondary bg-opacity-10">
                                            <td>Defence Blocking</td>
                                            <td>{teamAverage[0].avgTeleOpDefenceBlocking}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </Col>
                            <Col md={6}>
                                <h5>Climb Data</h5>
                                <hr></hr>
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th>Level</th>
                                            <th>Left</th>
                                            <th>Center</th>
                                            <th>Right</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className="bg-secondary bg-opacity-10">
                                            <td>L3</td>
                                            <td>{teamAverage[0].avgPostClimbLevelThreeLeft}</td>
                                            <td>{teamAverage[0].avgPostClimbLevelThreeCenter}</td>
                                            <td>{teamAverage[0].avgPostClimbLevelThreeRight}</td>
                                        </tr>
                                        <tr className="bg-secondary bg-opacity-10">
                                            <td>L2</td>
                                            <td>{teamAverage[0].avgPostClimbLevelTwoLeft}</td>
                                            <td>{teamAverage[0].avgPostClimbLevelTwoCenter}</td>
                                            <td>{teamAverage[0].avgPostClimbLevelTwoRight}</td>
                                        </tr>
                                        <tr className="bg-secondary bg-opacity-10">
                                            <td>L1</td>
                                            <td>{teamAverage[0].avgPostClimbLevelOneLeft}</td>
                                            <td>{teamAverage[0].avgPostClimbLevelOneCenter}</td>
                                            <td>{teamAverage[0].avgPostClimbLevelOneRight}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </Col>
                        </Row>
                    </Row>
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
                    <h5>Total Matches:</h5>
                    <p>{teamAverage[0].matchCount}</p>
                </Col>
            </Row>
        </Container>
    );
}

export default Team;