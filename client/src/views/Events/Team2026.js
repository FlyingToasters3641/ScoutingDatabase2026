import React, { useState, useEffect, useContext } from "react";
import axios from 'axios';
import { useLocation, Link } from 'react-router-dom';
import BackButton from '../common/BackButton';
import { APP_DATABASE_URL } from "../../constant/constant";
import { Col, Container, Row } from "react-bootstrap";
import { AppContext } from "../common/AppContext.js";
import { InputSwitch } from 'primereact/inputswitch';
import "./Buttons.css";
import { RiEyeLine } from "react-icons/ri";

const Team = () => {
    const { appData, setAppData } = useContext(AppContext);
    const [team, setTeam] = useState([]);
    const [matchdata, setMatchdata] = useState([]);
     const teamMedianDefault = [{
        medStartPreload: -1,
        medTeleOpPassNeutralAlliance: -1, 
        medTeleOpPassOpponentNeutral: -1, 
        medTeleOpPassOpponentAlliance: -1, 
        medTeleOpShootMajority: -1, 
        medTeleOpShootHalf: -1, 
        medTeleOpShootLittle: -1, 
        medTeleOpFeedHumanMajority: -1, 
        medTeleOpFeedHumanLittle: -1, 
        medTeleOpDefenceStealling: -1, 
        medTeleOpDefenceBlocking: -1, 
        medPostClimbLevelOneRight: -1,
        medPostClimbLevelOneCenter: -1,
        medPostClimbLevelOneLeft: -1,
        medPostClimbLevelTwoRight: -1,
        medPostClimbLevelTwoCenter: -1,
        medPostClimbLevelTwoLeft: -1,
        medPostClimbLevelThreeRight: -1,
        medPostClimbLevelThreeCenter: -1,
        medPostClimbLevelThreeLeft: -1,
        medPostUnderTrench: -1, 
        medPostOverBump: -1, 
        medPostDisabledMechanically: -1, 
        medPostStuckOnFieldElement: -1,
        medPostPartBroken: -1, 
        medTeleOpCorralls: -1, 
        medAutonNeutralZone: -1,
        medAutonIntake: -1,
        medAutonClimbLevel: -1,
        medAutonOutpost: -1,
        medAutonDepot: -1,
        medAutonShootsFuel: -1,
        medTeleOpDefened: -1,
    }];
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
        avgPostPartBroken: -1, 
        avgTeleOpCorralls: -1, 
        avgAutonNeutralZone: -1,
        avgAutonIntakes: -1,
        avgAutonClimbLevel: -1,
        avgAutonOutpost: -1,
        avgAutonDepot: -1,
        avgAutonShootsFuel: -1,
        avgTeleOpDefened: -1,
    }];
    const [teamAverage, setTeamAverage] = useState(teamAverageDefault);
    const [teamMedian, setTeamMedian] = useState(teamMedianDefault);
    const [isMedian, setIsMedian] = useState(false);

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
                <Col md={11}><h2> {team.teamNumber} - {team.nickname} - {appData.currentEventKey}</h2></Col>
            </Row>
            <Row><hr></hr></Row>
            <Row>
                <Col md={10}>
                    <Row>
                        <Col md={12}>
                            <h2>Auton Data</h2>
                            <hr></hr>
                        {isMedian ? (
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
                                        <td>{teamMedian[0].medStartPreload}</td>
                                        <td>{teamMedian[0].medStartTrenchLeft}</td>
                                        <td>{teamMedian[0].medStartBumpLeft}</td>
                                        <td>{teamMedian[0].medStartHub}</td>
                                        <td>{teamMedian[0].medStartBumpRight}</td>
                                        <td>{teamMedian[0].medStartTrenchRight}</td>
                                    </tr>
                                </tbody>
                            </table>
                        ):(
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
                        )}

                        {isMedian ? (
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>Shoots</th>
                                        <th>Intakes</th>
                                        <th>Climb</th>
                                        <th>Outpost</th>
                                        <th>Neutral Zone</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="bg-secondary bg-opacity-10">
                                        <td>{teamMedian[0].medAutonShootsFuel}</td>
                                        <td>{teamMedian[0].medAutonIntake}</td>
                                        <td>{teamMedian[0].medAutonClimbLevel}</td>
                                        <td>{teamMedian[0].medAutonOutpost}</td>
                                        <td>{teamMedian[0].medAutonNeutralZone}</td>
                                    </tr>
                                </tbody>
                            </table>
                        ):(
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>Shoots</th>
                                        <th>Intakes</th>
                                        <th>Climb</th>
                                        <th>Outpost</th>
                                        <th>Neutral Zone</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="bg-secondary bg-opacity-10">
                                        <td>{teamAverage[0].avgAutonShootsFuel}</td>
                                        <td>{teamAverage[0].avgAutonIntakes}</td>
                                        <td>{teamAverage[0].avgAutonClimbLevel}</td>
                                        <td>{teamAverage[0].avgAutonOutpost}</td>
                                        <td>{teamAverage[0].avgAutonNeutralZone}</td>
                                    </tr>
                                </tbody>
                            </table>
                        )}
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
                                    {isMedian ? (
                                        <table className="table">
                                        <thead>
                                                <tr>
                                                    <th>Passing</th>
                                                    <th>Corralling</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr className="bg-secondary bg-opacity-10">
                                                    <td>{teamMedian[0].medTeleOpPassNeutralAlliance}</td>
                                                    <td>{teamMedian[0].medTeleOpCorralls}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    ) : (
                                    <table className="table">
                                        <thead>
                                                <tr>
                                                    <th>Passing</th>
                                                    <th>Corralling</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr className="bg-secondary bg-opacity-10">
                                                    <td>{teamAverage[0].avgTeleOpPassNeutralAlliance}</td>
                                                    <td>{teamAverage[0].avgTeleOpCorralls}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    )}
                                </Col>
                                <Col md={6}>
                                    <h5>Fuel in Hub</h5>
                                    <hr></hr>
                                    {isMedian ? (
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
                                                    <td>{teamMedian[0].medTeleOpShootMajority}</td>
                                                    <td>{teamMedian[0].medTeleOpShootHalf}</td>
                                                    <td>{teamMedian[0].medTeleOpShootLittle}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    ) : (
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
                                    )}
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
                                {isMedian ? (
<table className="table">
                                    <thead>
                                        <tr>
                                            <th>Category</th>
                                            <th>Median</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className="bg-secondary bg-opacity-10">
                                            <td>Under Trench</td>
                                            <td>{teamMedian[0].medPostUnderTrench}</td>
                                        </tr>
                                        <tr className="bg-secondary bg-opacity-10">
                                            <td>Over Bump</td>
                                            <td>{teamMedian[0].medPostOverBump}</td>
                                        </tr>
                                        <tr className="bg-secondary bg-opacity-10">
                                            <td>Not There</td>
                                            <td>{teamMedian[0].medPostNotThere}</td>
                                        </tr>
                                        <tr className="bg-secondary bg-opacity-10">
                                            <td>Disabled Mechanically</td>
                                            <td>{teamMedian[0].medPostDisabledMechanically}</td>
                                        </tr>
                                        <tr className="bg-secondary bg-opacity-10">
                                            <td>Part Broken</td>
                                            <td>{teamMedian[0].medPostPartBroken}</td>
                                        </tr>
                                        <tr className="bg-secondary bg-opacity-10">
                                            <td>Stuck on Field Element</td>
                                            <td>{teamMedian[0].medPostStuckOnFieldElement}</td>
                                        </tr>
                                        <tr className="bg-secondary bg-opacity-10">
                                            <td>Feeds Outpost</td>
                                            <td>{teamMedian[0].medTeleOpFeedHumanMajority}</td>
                                        </tr>
                                        <tr className="bg-secondary bg-opacity-10">
                                            <td>Defending</td>
                                            <td>{teamMedian[0].medTeleOpDefenceBlocking}</td>
                                        </tr>
                                        <tr className="bg-secondary bg-opacity-10">
                                            <td>Defended</td>
                                            <td>{teamMedian[0].medTeleOpDefened}</td>
                                        </tr>
                                    </tbody>
                                </table>
                                ) : (
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
                                            <td>Part Broken</td>
                                            <td>{teamAverage[0].avgPostPartBroken}</td>
                                        </tr>
                                        <tr className="bg-secondary bg-opacity-10">
                                            <td>Stuck on Field Element</td>
                                            <td>{teamAverage[0].avgPostStuckOnFieldElement}</td>
                                        </tr>
                                        <tr className="bg-secondary bg-opacity-10">
                                            <td>Feeds Outpost</td>
                                            <td>{teamAverage[0].avgTeleOpFeedHumanMajority}</td>
                                        </tr>
                                        <tr className="bg-secondary bg-opacity-10">
                                            <td>Defending</td>
                                            <td>{teamAverage[0].avgTeleOpDefenceBlocking}</td>
                                        </tr>
                                        <tr className="bg-secondary bg-opacity-10">
                                            <td>Defended</td>
                                            <td>{teamAverage[0].avgTeleOpDefened}</td>
                                        </tr>
                                    </tbody>
                                </table>
                                )}
                            </Col>
                            <Col md={6}>
                                <h5>Climb Data</h5>
                                <hr></hr>
                                {isMedian ? (
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th>Level</th>
                                            <th>Median</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className="bg-secondary bg-opacity-10">
                                            <td>L3</td>
                                            <td>{teamMedian[0].medPostClimbLevelThreeLeft}</td>
                                        </tr>
                                        <tr className="bg-secondary bg-opacity-10">
                                            <td>L2</td>
                                            <td>{teamMedian[0].medPostClimbLevelTwoLeft}</td>
                                        </tr>
                                        <tr className="bg-secondary bg-opacity-10">
                                            <td>L1</td>
                                            <td>{teamMedian[0].medPostClimbLevelOneLeft}</td>
                                        </tr>
                                    </tbody>
                                </table>
                                ) : (
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th>Level</th>
                                            <th>Average</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className="bg-secondary bg-opacity-10">
                                            <td>L3</td>
                                            <td>{teamAverage[0].avgPostClimbLevelThreeLeft}</td>
                                        </tr>
                                        <tr className="bg-secondary bg-opacity-10">
                                            <td>L2</td>
                                            <td>{teamAverage[0].avgPostClimbLevelTwoLeft}</td>
                                        </tr>
                                        <tr className="bg-secondary bg-opacity-10">
                                            <td>L1</td>
                                            <td>{teamAverage[0].avgPostClimbLevelOneLeft}</td>
                                        </tr>
                                    </tbody>
                                </table>
                                )}
                            </Col>
                        </Row>
                    </Row>
                </Col>

                <Col md={2}>
                    <h2>Team Information</h2>
                    <hr></hr>
                    <p><a href={`https://www.thebluealliance.com/team/${team.teamNumber}/2026`} target="_blank" rel="noopener noreferrer"><button type="button" class="btn btn-tba" ><RiEyeLine /> View on TBA</button></a></p>
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
                    <h5>Mode:</h5>
                    <h6><InputSwitch checked={isMedian} onChange={(e) => setIsMedian(e.value)} /> {isMedian ? "Median" : "Average"}</h6>
                </Col>
            </Row>
                <footer>
                    <Row>
                        <Row>
                            <Col>
                                <hr></hr>
                            </Col>
                        </Row>
                        <Col>
                            <p>Powered By <a href="https://www.thebluealliance.com/" target="_blank" rel="noopener noreferrer">The Blue Alliance</a></p>
                            <p>Event Year: {appData.currentEventYear}; Event Key: {appData.currentEventKey}; Event Id (serverDV): {appData.currentEventID}; <em><b>{appData.name}</b></em></p>
                        </Col>
                    </Row>
                </footer>
        </Container>
    );
}
export default Team;