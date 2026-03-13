import React, { useState, useEffect, useContext  } from "react";
import axios from 'axios';
import { useLocation, Link, useHistory } from 'react-router-dom';
import BackButton from '../common/BackButton.js';
import { Col, Container, Row } from "react-bootstrap";
import { APP_DATABASE_URL } from "../../constant/constant.js";
import { arrayLookup } from "../../utils/common.js";
import { FaCircleInfo } from "react-icons/fa6";
import { AppContext } from "../common/AppContext.js";

const Matchdetails = () => {
    const { appData, setAppData } = useContext(AppContext);

    const [match, setMatch] = useState(null);
    const teamAverageDefault = [{avgStartPreload: -1, avgTeleOpPassNeutralAlliance: -1, avgTeleOpPassOpponentNeutral: -1, avgTeleOpPassOpponentAlliance: -1, avgTeleOpShootMajority: -1, avgTeleOpShootHalf: -1, avgTeleOpShootLittle: -1, avgTeleOpFeedHumanMajority: -1, avgTeleOpFeedHumanLittle: -1, avgTeleOpDefenceStealling: -1, avgTeleOpDefenceBlocking: -1, avgPostClimbLevelOne: -1, avgPostClimbLevelTwo: -1, avgPostClimbLevelThree: -1, avgPostClimbLevelLeft: -1, avgPostClimbLevelCenter: -1, avgPostClimbLevelRight: -1, avgPostUnderTrench: -1, avgPostOverBump: -1, avgPostDisabledMechanically: -1, avgPostStuckOnFieldElement: -1}];
    const teamMedianDefault = [{medTeleOpPassNeutralAlliance: -1, medTeleOpPassOpponentNeutral: -1, medTeleOpPassOpponentAlliance: -1, medTeleOpShootMajority: -1, medTeleOpShootHalf: -1, medTeleOpShootLittle: -1}];
    const [teamAverageBlueOne, setTeamAverageBlueOne] = useState(teamAverageDefault);
    const [teamMedianBlueOne, setTeamMedianBlueOne] = useState(teamMedianDefault);
    const [teamAverageBlueTwo, setTeamAverageBlueTwo] = useState(teamAverageDefault);
    const [teamMedianBlueTwo, setTeamMedianBlueTwo] = useState(teamMedianDefault);
    const [teamAverageBlueThree, setTeamAverageBlueThree] = useState(teamAverageDefault);
    const [teamMedianBlueThree, setTeamMedianBlueThree] = useState(teamMedianDefault);
    const [teamAverageRedOne, setTeamAverageRedOne] = useState(teamAverageDefault);
    const [teamMedianRedOne, setTeamMedianRedOne] = useState(teamMedianDefault);
    const [teamAverageRedTwo, setTeamAverageRedTwo] = useState(teamAverageDefault);
    const [teamMedianRedTwo, setTeamMedianRedTwo] = useState(teamMedianDefault);
    const [teamAverageRedThree, setTeamAverageRedThree] = useState(teamAverageDefault);
    const [teamMedianRedThree, setTeamMedianRedThree] = useState(teamMedianDefault);
    const [team, setTeam] = useState([]);

    const [event, setEvent] = useState(null);
    const history = useHistory();
    
    let matchId = null;
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    matchId = searchParams.get('matchId');

    useEffect(() => {
        if (!matchId) return;
        
        axios.get(`${APP_DATABASE_URL}/match/${matchId}`)
        .then(response => setMatch(response.data))
        .catch(error => console.error('Error fetching data:', error));
        
        axios.get(`${APP_DATABASE_URL}/teams`)
        .then(response => setTeam(response.data))
        .catch(error => console.error('Error fetching data:', error));

        axios.get(`${APP_DATABASE_URL}/events`)
        .then(response => setEvent(response.data))
        .catch(error => console.error('Error fetching data:', error));
        
    }, [matchId]);


    useEffect(() => {
        if(match){
        axios.get(`${APP_DATABASE_URL}/matchData/2026/${appData.currentEventID}/team/${match.blueOneTeamNumber}`)
        .then(response => setTeamAverageBlueOne(response.data))
        .catch(error => console.error('Error fetching data:', error));

        axios.get(`${APP_DATABASE_URL}/matchData/2026/${appData.currentEventID}/team/${match.blueOneTeamNumber}/median`)
        .then(response => setTeamMedianBlueOne(response.data))
        .catch(error => console.error('Error fetching data:', error));

        axios.get(`${APP_DATABASE_URL}/matchData/2026/${appData.currentEventID}/team/${match.blueTwoTeamNumber}`)
        .then(response => setTeamAverageBlueTwo(response.data))
        .catch(error => console.error('Error fetching data:', error));

        axios.get(`${APP_DATABASE_URL}/matchData/2026/${appData.currentEventID}/team/${match.blueTwoTeamNumber}/median`)
        .then(response => setTeamMedianBlueTwo(response.data))
        .catch(error => console.error('Error fetching data:', error));

        axios.get(`${APP_DATABASE_URL}/matchData/2026/${appData.currentEventID}/team/${match.blueThreeTeamNumber}`)
        .then(response => setTeamAverageBlueThree(response.data))
        .catch(error => console.error('Error fetching data:', error));

        axios.get(`${APP_DATABASE_URL}/matchData/2026/${appData.currentEventID}/team/${match.blueThreeTeamNumber}/median`)
        .then(response => setTeamMedianBlueThree(response.data))
        .catch(error => console.error('Error fetching data:', error));

        axios.get(`${APP_DATABASE_URL}/matchData/2026/${appData.currentEventID}/team/${match.redOneTeamNumber}`)
        .then(response => setTeamAverageRedOne(response.data))
        .catch(error => console.error('Error fetching data:', error));

        axios.get(`${APP_DATABASE_URL}/matchData/2026/${appData.currentEventID}/team/${match.blueThreeTeamNumber}/median`)
        .then(response => setTeamMedianBlueThree(response.data))
        .catch(error => console.error('Error fetching data:', error));

        axios.get(`${APP_DATABASE_URL}/matchData/2026/${appData.currentEventID}/team/${match.redOneTeamNumber}/median`)
        .then(response => setTeamMedianRedOne(response.data))
        .catch(error => console.error('Error fetching data:', error));

        axios.get(`${APP_DATABASE_URL}/matchData/2026/${appData.currentEventID}/team/${match.redTwoTeamNumber}`)
        .then(response => setTeamAverageRedTwo(response.data))
        .catch(error => console.error('Error fetching data:', error));

        axios.get(`${APP_DATABASE_URL}/matchData/2026/${appData.currentEventID}/team/${match.redTwoTeamNumber}/median`)
        .then(response => setTeamMedianRedTwo(response.data))
        .catch(error => console.error('Error fetching data:', error));

        axios.get(`${APP_DATABASE_URL}/matchData/2026/${appData.currentEventID}/team/${match.redThreeTeamNumber}`)
        .then(response => setTeamAverageRedThree(response.data))
        .catch(error => console.error('Error fetching data:', error));

        axios.get(`${APP_DATABASE_URL}/matchData/2026/${appData.currentEventID}/team/${match.redThreeTeamNumber}`)
        .then(response => setTeamMedianRedThree(response.data))
        .catch(error => console.error('Error fetching data:', error));
        }
    }, [match]);
    
    async function handleViewEvent(event) {
        await setAppData({
            ...appData,
            name: event.name,
            currentEventID: event.id,
            currentEventKey: event.key,
            currentEventYear: event.year
        });
        history.push(`/eventdetail/?eventId=${event.id}`);
    };

    return (
        <Container>
            <Row>
                <Col md={1}><BackButton /></Col>
                <Col md={11}><h2>{appData.currentEventYear} {appData.name}: {match ? match.matchKey : matchId}</h2></Col>
            </Row>
            <Row><hr></hr></Row>
            {match ? (
                <>
            <Row>
                <Col>
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th>Match Number</th>
                                <th>Blue 1</th>
                                <th>Blue 2</th>
                                <th>Blue 3</th>
                                <th>Red 1</th>
                                <th>Red 2</th>
                                <th>Red 3</th>
                                <th>Blue Score</th>
                                <th>Red Score</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr key={match.matchNumber}>
                                <td>{match.matchNumber}</td>
                                <td className="bg-primary bg-opacity-10"><Link to={`/team2026/?teamId=${arrayLookup(match.blueOneTeamNumber, team, "teamNumber", "id")}`}>{match.blueOneTeamNumber}</Link> ~ {teamAverageBlueOne[0].matchCount}</td>
                                <td className="bg-primary bg-opacity-10"><Link to={`/team2026/?teamId=${arrayLookup(match.blueTwoTeamNumber, team, "teamNumber", "id")}`}>{match.blueTwoTeamNumber}</Link> ~ {teamAverageBlueTwo[0].matchCount}</td>
                                <td className="bg-primary bg-opacity-10"><Link to={`/team2026/?teamId=${arrayLookup(match.blueThreeTeamNumber, team, "teamNumber", "id")}`}>{match.blueThreeTeamNumber}</Link> ~ {teamAverageBlueThree[0].matchCount}</td>
                                <td className="bg-danger bg-opacity-10"><Link to={`/team2026/?teamId=${arrayLookup(match.redOneTeamNumber, team, "teamNumber", "id")}`}>{match.redOneTeamNumber}</Link> ~ {teamAverageRedOne[0].matchCount}</td>
                                <td className="bg-danger bg-opacity-10"><Link to={`/team2026/?teamId=${arrayLookup(match.redTwoTeamNumber, team, "teamNumber", "id")}`}>{match.redTwoTeamNumber}</Link> ~ {teamAverageRedTwo[0].matchCount}</td>
                                <td className="bg-danger bg-opacity-10"><Link to={`/team2026/?teamId=${arrayLookup(match.redThreeTeamNumber, team, "teamNumber", "id")}`}>{match.redThreeTeamNumber}</Link> ~ {teamAverageRedThree[0].matchCount}</td>
                                <td>{match.blueScore}</td>
                                <td>{match.redScore}</td>
                            </tr>
                        </tbody>
                    </table>
                </Col>
            </Row>
                <Col>
                    <table className="table"> 
                        <thead>
                            <tr>
                                <th>Team Number</th>
                                <th>Has Preload</th>
                                <th>Pass Neutral to Alliance</th>
                                <th>Pass Opponent to Neutral</th>
                                <th>Pass Opponent to Alliance</th>
                                <th>Shoot Majority</th>
                                <th>Shoot Half</th>
                                <th>Shoot Little</th>
                                <th>Feeds Human Lots</th>
                                <th>Feeds Human Little</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="bg-primary bg-opacity-10">
                                <td>{match.blueOneTeamNumber} ~ {teamAverageBlueOne[0].matchCount}</td>
                                <td>{teamAverageBlueOne[0].avgStartPreload}</td>
                                <td>{teamAverageBlueOne[0].avgTeleOpPassNeutralAlliance}</td>
                                <td>{teamAverageBlueOne[0].avgTeleOpPassOpponentNeutral}</td>
                                <td>{teamAverageBlueOne[0].avgTeleOpPassOpponentAlliance}</td>
                                <td>{teamAverageBlueOne[0].avgTeleOpShootMajority}</td>
                                <td>{teamAverageBlueOne[0].avgTeleOpShootHalf}</td>
                                <td>{teamAverageBlueOne[0].avgTeleOpShootLittle}</td>
                                <td>{teamAverageBlueOne[0].avgTeleOpFeedHumanMajority}</td>
                                <td>{teamAverageBlueOne[0].avgTeleOpFeedHumanLittle}</td>
                            </tr>
                            <tr className="bg-primary bg-opacity-10">
                                <td>{match.blueTwoTeamNumber} ~ {teamAverageBlueTwo[0].matchCount}</td>
                                <td>{teamAverageBlueTwo[0].avgStartPreload}</td>
                                <td>{teamAverageBlueTwo[0].avgTeleOpPassNeutralAlliance}</td>
                                <td>{teamAverageBlueTwo[0].avgTeleOpPassOpponentNeutral}</td>
                                <td>{teamAverageBlueTwo[0].avgTeleOpPassOpponentAlliance}</td>
                                <td>{teamAverageBlueTwo[0].avgTeleOpShootMajority}</td>
                                <td>{teamAverageBlueTwo[0].avgTeleOpShootHalf}</td>
                                <td>{teamAverageBlueTwo[0].avgTeleOpShootLittle}</td>
                                <td>{teamAverageBlueTwo[0].avgTeleOpFeedHumanMajority}</td>
                                <td>{teamAverageBlueTwo[0].avgTeleOpFeedHumanLittle}</td>
                            </tr>
                            <tr className="bg-primary bg-opacity-10">
                                <td>{match.blueThreeTeamNumber} ~ {teamAverageBlueThree[0].matchCount}</td>
                                <td>{teamAverageBlueThree[0].avgStartPreload}</td>
                                <td>{teamAverageBlueThree[0].avgTeleOpPassNeutralAlliance}</td>
                                <td>{teamAverageBlueThree[0].avgTeleOpPassOpponentNeutral}</td>
                                <td>{teamAverageBlueThree[0].avgTeleOpPassOpponentAlliance}</td>
                                <td>{teamAverageBlueThree[0].avgTeleOpShootMajority}</td>
                                <td>{teamAverageBlueThree[0].avgTeleOpShootHalf}</td>
                                <td>{teamAverageBlueThree[0].avgTeleOpShootLittle}</td>
                                <td>{teamAverageBlueThree[0].avgTeleOpFeedHumanMajority}</td>
                                <td>{teamAverageBlueThree[0].avgTeleOpFeedHumanLittle}</td>
                            </tr>
                            <tr className="bg-danger bg-opacity-10">
                                <td>{match.redOneTeamNumber} ~ {teamAverageRedOne[0].matchCount}</td>
                                <td>{teamAverageRedOne[0].avgStartPreload}</td>
                                <td>{teamAverageRedOne[0].avgTeleOpPassNeutralAlliance}</td>
                                <td>{teamAverageRedOne[0].avgTeleOpPassOpponentNeutral}</td>
                                <td>{teamAverageRedOne[0].avgTeleOpPassOpponentAlliance}</td>
                                <td>{teamAverageRedOne[0].avgTeleOpShootMajority}</td>
                                <td>{teamAverageRedOne[0].avgTeleOpShootHalf}</td>
                                <td>{teamAverageRedOne[0].avgTeleOpShootLittle}</td>
                                <td>{teamAverageRedOne[0].avgTeleOpFeedHumanMajority}</td>
                                <td>{teamAverageRedOne[0].avgTeleOpFeedHumanLittle}</td>
                            </tr>
                            <tr className="bg-danger bg-opacity-10">
                                <td>{match.redTwoTeamNumber} ~ {teamAverageRedTwo[0].matchCount}</td>
                                <td>{teamAverageRedTwo[0].avgStartPreload}</td>
                                <td>{teamAverageRedTwo[0].avgTeleOpPassNeutralAlliance}</td>
                                <td>{teamAverageRedTwo[0].avgTeleOpPassOpponentNeutral}</td>
                                <td>{teamAverageRedTwo[0].avgTeleOpPassOpponentAlliance}</td>
                                <td>{teamAverageRedTwo[0].avgTeleOpShootMajority}</td>
                                <td>{teamAverageRedTwo[0].avgTeleOpShootHalf}</td>
                                <td>{teamAverageRedTwo[0].avgTeleOpShootLittle}</td>
                                <td>{teamAverageRedTwo[0].avgTeleOpFeedHumanMajority}</td>
                                <td>{teamAverageRedTwo[0].avgTeleOpFeedHumanLittle}</td>
                            </tr>
                            <tr className="bg-danger bg-opacity-10">
                                <td>{match.redThreeTeamNumber} ~ {teamAverageRedThree[0].matchCount}</td>
                                <td>{teamAverageRedThree[0].avgStartPreload}</td>
                                <td>{teamAverageRedThree[0].avgTeleOpPassNeutralAlliance}</td>
                                <td>{teamAverageRedThree[0].avgTeleOpPassOpponentNeutral}</td>
                                <td>{teamAverageRedThree[0].avgTeleOpPassOpponentAlliance}</td>
                                <td>{teamAverageRedThree[0].avgTeleOpShootMajority}</td>
                                <td>{teamAverageRedThree[0].avgTeleOpShootHalf}</td>
                                <td>{teamAverageRedThree[0].avgTeleOpShootLittle}</td>
                                <td>{teamAverageRedThree[0].avgTeleOpFeedHumanMajority}</td>
                                <td>{teamAverageRedThree[0].avgTeleOpFeedHumanLittle}</td>
                            </tr>
                        </tbody>
                    </table>
                </Col>
                <Col>
                    <table className="table"> 
                        <thead>
                            <tr>
                                <th>Team Number</th>
                                <th>Blocking</th>
                                <th>Stealling</th>
                                <th>Climbs L1</th>
                                <th>Climbs L2</th>
                                <th>Climbs L3</th>
                                <th>Climb Left</th>
                                <th>Climb Center</th>
                                <th>Climb Right</th>
                                <th>Under Trench</th>
                                <th>Over Bump</th>
                                <th>Disabled Mechanically</th>
                                <th>Stuck on Field Element</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="bg-primary bg-opacity-10">
                                <td>{match.blueOneTeamNumber} ~ {teamAverageBlueOne[0].matchCount}</td>
                                <td>{teamAverageBlueOne[0].avgTeleOpDefenceBlocking}</td>
                                <td>{teamAverageBlueOne[0].avgTeleOpDefenceStealling}</td>
                                <td>{teamAverageBlueOne[0].avgPostClimbLevelOne}</td>
                                <td>{teamAverageBlueOne[0].avgPostClimbLevelTwo}</td>
                                <td>{teamAverageBlueOne[0].avgPostClimbLevelThree}</td>
                                <td>{teamAverageBlueOne[0].avgPostClimbLevelLeft}</td>
                                <td>{teamAverageBlueOne[0].avgPostClimbLevelCenter}</td>
                                <td>{teamAverageBlueOne[0].avgPostClimbLevelRight}</td>
                                <td>{teamAverageBlueOne[0].avgPostUnderTrench}</td>
                                <td>{teamAverageBlueOne[0].avgPostOverBump}</td>
                                <td>{teamAverageBlueOne[0].avgPostDisabledMechanically}</td>
                                <td>{teamAverageBlueOne[0].avgPostStuckOnFieldElement}</td>
                            </tr>
                            <tr className="bg-primary bg-opacity-10">
                                <td>{match.blueTwoTeamNumber} ~ {teamAverageBlueTwo[0].matchCount}</td>
                                <td>{teamAverageBlueTwo[0].avgTeleOpDefenceBlocking}</td>
                                <td>{teamAverageBlueTwo[0].avgTeleOpDefenceStealling}</td>
                                <td>{teamAverageBlueTwo[0].avgPostClimbLevelOne}</td>
                                <td>{teamAverageBlueTwo[0].avgPostClimbLevelTwo}</td>
                                <td>{teamAverageBlueTwo[0].avgPostClimbLevelThree}</td>
                                <td>{teamAverageBlueTwo[0].avgPostClimbLevelLeft}</td>
                                <td>{teamAverageBlueTwo[0].avgPostClimbLevelCenter}</td>
                                <td>{teamAverageBlueTwo[0].avgPostClimbLevelRight}</td>
                                <td>{teamAverageBlueTwo[0].avgPostUnderTrench}</td>
                                <td>{teamAverageBlueTwo[0].avgPostOverBump}</td>
                                <td>{teamAverageBlueTwo[0].avgPostDisabledMechanically}</td>
                                <td>{teamAverageBlueTwo[0].avgPostStuckOnFieldElement}</td>
                            </tr>
                            <tr className="bg-primary bg-opacity-10">
                                <td>{match.blueThreeTeamNumber} ~ {teamAverageBlueThree[0].matchCount}</td>
                                <td>{teamAverageBlueThree[0].avgTeleOpDefenceBlocking}</td>
                                <td>{teamAverageBlueThree[0].avgTeleOpDefenceStealling}</td>
                                <td>{teamAverageBlueThree[0].avgPostClimbLevelOne}</td>
                                <td>{teamAverageBlueThree[0].avgPostClimbLevelTwo}</td>
                                <td>{teamAverageBlueThree[0].avgPostClimbLevelThree}</td>
                                <td>{teamAverageBlueThree[0].avgPostClimbLevelLeft}</td>
                                <td>{teamAverageBlueThree[0].avgPostClimbLevelCenter}</td>
                                <td>{teamAverageBlueThree[0].avgPostClimbLevelRight}</td>
                                <td>{teamAverageBlueThree[0].avgPostUnderTrench}</td>
                                <td>{teamAverageBlueThree[0].avgPostOverBump}</td>
                                <td>{teamAverageBlueThree[0].avgPostDisabledMechanically}</td>
                                <td>{teamAverageBlueThree[0].avgPostStuckOnFieldElement}</td>
                            </tr>
                            <tr className="bg-danger bg-opacity-10">
                                <td>{match.redOneTeamNumber} ~ {teamAverageRedOne[0].matchCount}</td>
                                <td>{teamAverageRedOne[0].avgTeleOpDefenceBlocking}</td>
                                <td>{teamAverageRedOne[0].avgTeleOpDefenceStealling}</td>
                                <td>{teamAverageRedOne[0].avgPostClimbLevelOne}</td>
                                <td>{teamAverageRedOne[0].avgPostClimbLevelTwo}</td>
                                <td>{teamAverageRedOne[0].avgPostClimbLevelThree}</td>
                                <td>{teamAverageRedOne[0].avgPostClimbLevelLeft}</td>
                                <td>{teamAverageRedOne[0].avgPostClimbLevelCenter}</td>
                                <td>{teamAverageRedOne[0].avgPostClimbLevelRight}</td>
                                <td>{teamAverageRedOne[0].avgPostUnderTrench}</td>
                                <td>{teamAverageRedOne[0].avgPostOverBump}</td>
                                <td>{teamAverageRedOne[0].avgPostDisabledMechanically}</td>
                                <td>{teamAverageRedOne[0].avgPostStuckOnFieldElement}</td>
                            </tr>
                            <tr className="bg-danger bg-opacity-10">
                                <td>{match.redTwoTeamNumber} ~ {teamAverageRedTwo[0].matchCount}</td>
                                <td>{teamAverageRedTwo[0].avgTeleOpDefenceBlocking}</td>
                                <td>{teamAverageRedTwo[0].avgTeleOpDefenceStealling}</td>
                                <td>{teamAverageRedTwo[0].avgPostClimbLevelOne}</td>
                                <td>{teamAverageRedTwo[0].avgPostClimbLevelTwo}</td>
                                <td>{teamAverageRedTwo[0].avgPostClimbLevelThree}</td>
                                <td>{teamAverageRedTwo[0].avgPostClimbLevelLeft}</td>
                                <td>{teamAverageRedTwo[0].avgPostClimbLevelCenter}</td>
                                <td>{teamAverageRedTwo[0].avgPostClimbLevelRight}</td>
                                <td>{teamAverageRedTwo[0].avgPostUnderTrench}</td>
                                <td>{teamAverageRedTwo[0].avgPostOverBump}</td>
                                <td>{teamAverageRedTwo[0].avgPostDisabledMechanically}</td>
                                <td>{teamAverageRedTwo[0].avgPostStuckOnFieldElement}</td>
                            </tr>
                            <tr className="bg-danger bg-opacity-10">
                                <td>{match.redThreeTeamNumber} ~ {teamAverageRedThree[0].matchCount}</td>
                                <td>{teamAverageRedThree[0].avgTeleOpDefenceBlocking}</td>
                                <td>{teamAverageRedThree[0].avgTeleOpDefenceStealling}</td>
                                <td>{teamAverageRedThree[0].avgPostClimbLevelOne}</td>
                                <td>{teamAverageRedThree[0].avgPostClimbLevelTwo}</td>
                                <td>{teamAverageRedThree[0].avgPostClimbLevelThree}</td>
                                <td>{teamAverageRedThree[0].avgPostClimbLevelLeft}</td>
                                <td>{teamAverageRedThree[0].avgPostClimbLevelCenter}</td>
                                <td>{teamAverageRedThree[0].avgPostClimbLevelRight}</td>
                                <td>{teamAverageRedThree[0].avgPostUnderTrench}</td>
                                <td>{teamAverageRedThree[0].avgPostOverBump}</td>
                                <td>{teamAverageRedThree[0].avgPostDisabledMechanically}</td>
                                <td>{teamAverageRedThree[0].avgPostStuckOnFieldElement}</td>
                            </tr>
                        </tbody>
                    </table>
                </Col>
            </>
            ) : (
                <Row>
                    <Col>
                        <h3><FaCircleInfo className='react-icons' size='1.5em' /> No data available for this match.</h3>
                    </Col>
                </Row>
            )}
        </Container>
    );
}

export default Matchdetails;