import React, { useState, useEffect, useContext  } from "react";
import axios from 'axios';
import { useLocation, Link, useHistory } from 'react-router-dom';
import BackButton from '../common/BackButton.js';
import { Col, Container, Row } from "react-bootstrap";
import { APP_DATABASE_URL } from "../../constant/constant.js";
import { arrayLookup } from "../../utils/common.js";
import { FaCircleInfo } from "react-icons/fa6";
import { AppContext } from "../common/AppContext.js";
import { InputSwitch } from 'primereact/inputswitch';

const Matchdetails = () => {
    const { appData, setAppData } = useContext(AppContext);

    const [match, setMatch] = useState(null);
    const teamAverageDefault = [{
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
        avgPostClimbLevelOne: -1, 
        avgPostClimbLevelTwo: -1, 
        avgPostClimbLevelThree: -1, 
        avgPostClimbLevelLeft: -1, 
        avgPostClimbLevelCenter: -1,
        avgPostClimbLevelRight: -1,
        avgPostUnderTrench: -1, 
        avgPostOverBump: -1, 
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
        avgPostClimbLevelOneLeft: -1,
        avgPostClimbLevelTwoLeft: -1,
        avgPostClimbLevelThreeLeft: -1,
    }];
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
        medPostClimbLevelOne: -1, 
        medPostClimbLevelTwo: -1, 
        medPostClimbLevelThree: -1, 
        medPostClimbLevelLeft: -1, 
        medPostClimbLevelCenter: -1,
        medPostClimbLevelRight: -1,
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
        medPostClimbLevelOneLeft: -1,
        medPostClimbLevelTwoLeft: -1,
        medPostClimbLevelThreeLeft: -1,
    }];
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
    const [isMedian, setIsMedian] = useState(false);

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

        axios.get(`${APP_DATABASE_URL}/matchData/2026/${appData.currentEventID}/team/${match.redThreeTeamNumber}/median`)
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
                                <th>{isMedian ? "Median" : "Average"}</th>
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
                                <td className="bg-danger bg-opacity-10"><Link to={`/team2026    /?teamId=${arrayLookup(match.redThreeTeamNumber, team, "teamNumber", "id")}`}>{match.redThreeTeamNumber}</Link> ~ {teamAverageRedThree[0].matchCount}</td>
                                <td><InputSwitch checked={isMedian} onChange={(e) => setIsMedian(e.value)} /></td>
                            </tr>
                        </tbody>
                    </table>
                </Col>
            </Row>
            <Row>
                {isMedian ? (
<p>
                        <Col>
                            <table className="table"> 
                                <thead>
                                    <tr>
                                        <th>Team<br/>Number</th>
                                        <th>Preload</th>
                                        <th>Auton Intake</th>
                                        <th>Auton<br/>Shoots Fuel</th>
                                        <th>Shoots<br/>Fuel Majority</th>
                                        <th>Shoots<br/>Fuel Half</th>
                                        <th>Shoots<br/>Fuel Little</th>
                                        <th>Passing</th>
                                        <th>Corralls</th>
                                        <th>Defense</th>
                                        <th>Defended</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="bg-primary bg-opacity-10">
                                        <td>{match.blueOneTeamNumber} ~ {teamAverageBlueOne[0].matchCount}</td>
                                        <td>{teamMedianBlueOne[0].medStartPreload}</td>
                                        <td>{teamMedianBlueOne[0].medAutonIntake}</td>
                                        <td>{teamMedianBlueOne[0].medAutonShootsFuel}</td>
                                        <td>{teamMedianBlueOne[0].medTeleOpShootMajority}</td>
                                        <td>{teamMedianBlueOne[0].medTeleOpShootHalf}</td>
                                        <td>{teamMedianBlueOne[0].medTeleOpShootLittle}</td>
                                        <td>{teamMedianBlueOne[0].medTeleOpPassNeutralAlliance}</td>
                                        <td>{teamMedianBlueOne[0].medTeleOpCorralls}</td>
                                        <td>{teamMedianBlueOne[0].medTeleOpDefenceBlocking}</td> 
                                        <td>{teamMedianBlueOne[0].medTeleOpDefened}</td>
                                    </tr>
                                    <tr className="bg-primary bg-opacity-10">
                                        <td>{match.blueTwoTeamNumber} ~ {teamAverageBlueTwo[0].matchCount}</td>
                                        <td>{teamMedianBlueTwo[0].medStartPreload}</td>
                                        <td>{teamMedianBlueTwo[0].medAutonIntake}</td>
                                        <td>{teamMedianBlueTwo[0].medAutonShootsFuel}</td>
                                        <td>{teamMedianBlueTwo[0].medTeleOpShootMajority}</td>
                                        <td>{teamMedianBlueTwo[0].medTeleOpShootHalf}</td>
                                        <td>{teamMedianBlueTwo[0].medTeleOpShootLittle}</td>
                                        <td>{teamMedianBlueTwo[0].medTeleOpPassNeutralAlliance}</td>
                                        <td>{teamMedianBlueTwo[0].medTeleOpCorralls}</td>
                                        <td>{teamMedianBlueTwo[0].medTeleOpDefenceBlocking}</td> 
                                        <td>{teamMedianBlueTwo[0].medTeleOpDefened}</td>
                                    </tr>
                                    <tr className="bg-primary bg-opacity-10">
                                        <td>{match.blueThreeTeamNumber} ~ {teamAverageBlueThree[0].matchCount}</td>
                                        <td>{teamMedianBlueThree[0].medStartPreload}</td>
                                        <td>{teamMedianBlueThree[0].medAutonIntake}</td>
                                        <td>{teamMedianBlueThree[0].medAutonShootsFuel}</td>
                                        <td>{teamMedianBlueThree[0].medTeleOpShootMajority}</td>
                                        <td>{teamMedianBlueThree[0].medTeleOpShootHalf}</td>
                                        <td>{teamMedianBlueThree[0].medTeleOpShootLittle}</td>
                                        <td>{teamMedianBlueThree[0].medTeleOpPassNeutralAlliance}</td>
                                        <td>{teamMedianBlueThree[0].medTeleOpCorralls}</td>
                                        <td>{teamMedianBlueThree[0].medTeleOpDefenceBlocking}</td> 
                                        <td>{teamMedianBlueThree[0].medTeleOpDefened}</td>
                                    </tr>
                                    <tr className="bg-danger bg-opacity-10">
                                        <td>{match.redOneTeamNumber} ~ {teamAverageRedOne[0].matchCount}</td>
                                        <td>{teamMedianRedOne[0].medStartPreload}</td>
                                        <td>{teamMedianRedOne[0].medAutonIntake}</td>
                                        <td>{teamMedianRedOne[0].medAutonShootsFuel}</td>
                                        <td>{teamMedianRedOne[0].medTeleOpShootMajority}</td>
                                        <td>{teamMedianRedOne[0].medTeleOpShootHalf}</td>
                                        <td>{teamMedianRedOne[0].medTeleOpShootLittle}</td>
                                        <td>{teamMedianRedOne[0].medTeleOpPassNeutralAlliance}</td>
                                        <td>{teamMedianRedOne[0].medTeleOpCorralls}</td>
                                        <td>{teamMedianRedOne[0].medTeleOpDefenceBlocking}</td> 
                                        <td>{teamMedianRedOne[0].medTeleOpDefened}</td>
                                    </tr>
                                    <tr className="bg-danger bg-opacity-10">
                                        <td>{match.redTwoTeamNumber} ~ {teamAverageRedTwo[0].matchCount}</td>
                                        <td>{teamMedianRedTwo[0].medStartPreload}</td>
                                        <td>{teamMedianRedTwo[0].medAutonIntake}</td>
                                        <td>{teamMedianRedTwo[0].medAutonShootsFuel}</td>
                                        <td>{teamMedianRedTwo[0].medTeleOpShootMajority}</td>
                                        <td>{teamMedianRedTwo[0].medTeleOpShootHalf}</td>
                                        <td>{teamMedianRedTwo[0].medTeleOpShootLittle}</td>
                                        <td>{teamMedianRedTwo[0].medTeleOpPassNeutralAlliance}</td>
                                        <td>{teamMedianRedTwo[0].medTeleOpCorralls}</td>
                                        <td>{teamMedianRedTwo[0].medTeleOpDefenceBlocking}</td> 
                                        <td>{teamMedianRedTwo[0].medTeleOpDefened}</td>
                                    </tr>
                                    <tr className="bg-danger bg-opacity-10">
                                        <td>{match.redThreeTeamNumber} ~ {teamAverageRedThree[0].matchCount}</td>
                                        <td>{teamMedianRedThree[0].medStartPreload}</td>
                                        <td>{teamMedianRedThree[0].medAutonIntake}</td>
                                        <td>{teamMedianRedThree[0].medAutonShootsFuel}</td>
                                        <td>{teamMedianRedThree[0].medTeleOpShootMajority}</td>
                                        <td>{teamMedianRedThree[0].medTeleOpShootHalf}</td>
                                        <td>{teamMedianRedThree[0].medTeleOpShootLittle}</td>
                                        <td>{teamMedianRedThree[0].medTeleOpPassNeutralAlliance}</td>
                                        <td>{teamMedianRedThree[0].medTeleOpCorralls}</td>
                                        <td>{teamMedianRedThree[0].medTeleOpDefenceBlocking}</td> 
                                        <td>{teamMedianRedThree[0].medTeleOpDefened}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </Col>
                        <Col>
                            <table className="table"> 
                                <thead>
                                    <tr>
                                        <th>Team<br/>Number</th>
                                        <th>Climb<br/>Level 1</th>
                                        <th>Climb<br/>Level 2</th>
                                        <th>Climb<br/>Level 3</th>
                                        <th>Under Trench</th>
                                        <th>Over Bump</th>
                                        <th>Disabled<br/>Mechanically</th>
                                        <th>Stuck of<br/>Field Element</th>
                                        <th>Parts broken</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="bg-primary bg-opacity-10">
                                        <td>{match.blueOneTeamNumber} ~ {teamAverageBlueOne[0].matchCount}</td>
                                        <td>{teamMedianBlueOne[0].medPostClimbLevelOneLeft}</td>
                                        <td>{teamMedianBlueOne[0].medPostClimbLevelTwoLeft}</td>
                                        <td>{teamMedianBlueOne[0].medPostClimbLevelThreeLeft}</td>
                                        <td>{teamMedianBlueOne[0].medPostUnderTrench}</td>
                                        <td>{teamMedianBlueOne[0].medPostOverBump}</td>
                                        <td>{teamMedianBlueOne[0].medPostDisabledMechanically}</td>
                                        <td>{teamMedianBlueOne[0].medPostStuckOnFieldElement}</td>
                                        <td>{teamMedianBlueOne[0].medPostPartBroken}</td>
                                    </tr>
                                    <tr className="bg-primary bg-opacity-10">
                                        <td>{match.blueTwoTeamNumber} ~ {teamAverageBlueTwo[0].matchCount}</td>
                                        <td>{teamMedianBlueTwo[0].medPostClimbLevelOneLeft}</td>
                                        <td>{teamMedianBlueTwo[0].medPostClimbLevelTwoLeft}</td>
                                        <td>{teamMedianBlueTwo[0].medPostClimbLevelThreeLeft}</td>
                                        <td>{teamMedianBlueTwo[0].medPostUnderTrench}</td>
                                        <td>{teamMedianBlueTwo[0].medPostOverBump}</td>
                                        <td>{teamMedianBlueTwo[0].medPostDisabledMechanically}</td>
                                        <td>{teamMedianBlueTwo[0].medPostStuckOnFieldElement}</td>
                                        <td>{teamMedianBlueTwo[0].medPostPartBroken}</td>
                                    </tr>
                                    <tr className="bg-primary bg-opacity-10">
                                        <td>{match.blueThreeTeamNumber} ~ {teamAverageBlueThree[0].matchCount}</td>
                                        <td>{teamMedianBlueThree[0].medPostClimbLevelOneLeft}</td>
                                        <td>{teamMedianBlueThree[0].medPostClimbLevelTwoLeft}</td>
                                        <td>{teamMedianBlueThree[0].medPostClimbLevelThreeLeft}</td>
                                        <td>{teamMedianBlueThree[0].medPostUnderTrench}</td>
                                        <td>{teamMedianBlueThree[0].medPostOverBump}</td>
                                        <td>{teamMedianBlueThree[0].medPostDisabledMechanically}</td>
                                        <td>{teamMedianBlueThree[0].medPostStuckOnFieldElement}</td>
                                        <td>{teamMedianBlueThree[0].medPostPartBroken}</td>
                                    </tr>
                                    <tr className="bg-danger bg-opacity-10">
                                        <td>{match.redOneTeamNumber} ~ {teamAverageRedOne[0].matchCount}</td>
                                        <td>{teamMedianRedOne[0].medPostClimbLevelOneLeft}</td>
                                        <td>{teamMedianRedOne[0].medPostClimbLevelTwoLeft}</td>
                                        <td>{teamMedianRedOne[0].medPostClimbLevelThreeLeft}</td>
                                        <td>{teamMedianRedOne[0].medPostUnderTrench}</td>
                                        <td>{teamMedianRedOne[0].medPostOverBump}</td>
                                        <td>{teamMedianRedOne[0].medPostDisabledMechanically}</td>
                                        <td>{teamMedianRedOne[0].medPostStuckOnFieldElement}</td>
                                        <td>{teamMedianRedOne[0].medPostPartBroken}</td>
                                    </tr>
                                    <tr className="bg-danger bg-opacity-10">
                                        <td>{match.redTwoTeamNumber} ~ {teamAverageRedTwo[0].matchCount}</td>
                                        <td>{teamMedianRedTwo[0].medPostClimbLevelOneLeft}</td>
                                        <td>{teamMedianRedTwo[0].medPostClimbLevelTwoLeft}</td>
                                        <td>{teamMedianRedTwo[0].medPostClimbLevelThreeLeft}</td>
                                        <td>{teamMedianRedTwo[0].medPostUnderTrench}</td>
                                        <td>{teamMedianRedTwo[0].medPostOverBump}</td>
                                        <td>{teamMedianRedTwo[0].medPostDisabledMechanically}</td>
                                        <td>{teamMedianRedTwo[0].medPostStuckOnFieldElement}</td>
                                        <td>{teamMedianRedTwo[0].medPostPartBroken}</td>
                                    </tr>
                                    <tr className="bg-danger bg-opacity-10">
                                        <td>{match.redThreeTeamNumber} ~ {teamAverageRedThree[0].matchCount}</td>
                                        <td>{teamMedianRedThree[0].medPostClimbLevelOneLeft}</td>
                                        <td>{teamMedianRedThree[0].medPostClimbLevelTwoLeft}</td>
                                        <td>{teamMedianRedThree[0].medPostClimbLevelThreeLeft}</td>
                                        <td>{teamMedianRedThree[0].medPostUnderTrench}</td>
                                        <td>{teamMedianRedThree[0].medPostOverBump}</td>
                                        <td>{teamMedianRedThree[0].medPostDisabledMechanically}</td>
                                        <td>{teamMedianRedThree[0].medPostStuckOnFieldElement}</td>
                                        <td>{teamMedianRedThree[0].medPostPartBroken}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </Col>
                    </p>
                    ) : (
                    <p>
                        <Col>
                            <table className="table"> 
                                <thead>
                                    <tr>
                                        <th>Team<br/>Number</th>
                                        <th>Preload</th>
                                        <th>Auton Intake</th>
                                        <th>Auton<br/>Shoots Fuel</th>
                                        <th>Shoots<br/>Fuel Majority</th>
                                        <th>Shoots<br/>Fuel Half</th>
                                        <th>Shoots<br/>Fuel Little</th>
                                        <th>Passing</th>
                                        <th>Corralls</th>
                                        <th>Defense</th>
                                        <th>Defended</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="bg-primary bg-opacity-10">
                                        <td>{match.blueOneTeamNumber} ~ {teamAverageBlueOne[0].matchCount}</td>
                                        <td>{teamAverageBlueOne[0].avgStartPreload}</td>
                                        <td>{teamAverageBlueOne[0].avgAutonIntakes}</td>
                                        <td>{teamAverageBlueOne[0].avgAutonShootsFuel}</td>
                                        <td>{teamAverageBlueOne[0].avgTeleOpShootMajority}</td>
                                        <td>{teamAverageBlueOne[0].avgTeleOpShootHalf}</td>
                                        <td>{teamAverageBlueOne[0].avgTeleOpShootLittle}</td>
                                        <td>{teamAverageBlueOne[0].avgTeleOpPassNeutralAlliance}</td>
                                        <td>{teamAverageBlueOne[0].avgTeleOpCorralls}</td>
                                        <td>{teamAverageBlueOne[0].avgTeleOpDefenceBlocking}</td> 
                                        <td>{teamAverageBlueOne[0].avgTeleOpDefened}</td>
                                    </tr>
                                    <tr className="bg-primary bg-opacity-10">
                                        <td>{match.blueTwoTeamNumber} ~ {teamAverageBlueTwo[0].matchCount}</td>
                                        <td>{teamAverageBlueTwo[0].avgStartPreload}</td>
                                        <td>{teamAverageBlueTwo[0].avgAutonIntakes}</td>
                                        <td>{teamAverageBlueTwo[0].avgAutonShootsFuel}</td>
                                        <td>{teamAverageBlueTwo[0].avgTeleOpShootMajority}</td>
                                        <td>{teamAverageBlueTwo[0].avgTeleOpShootHalf}</td>
                                        <td>{teamAverageBlueTwo[0].avgTeleOpShootLittle}</td>
                                        <td>{teamAverageBlueTwo[0].avgTeleOpPassNeutralAlliance}</td>
                                        <td>{teamAverageBlueTwo[0].avgTeleOpCorralls}</td>
                                        <td>{teamAverageBlueTwo[0].avgTeleOpDefenceBlocking}</td> 
                                        <td>{teamAverageBlueTwo[0].avgTeleOpDefened}</td>
                                    </tr>
                                    <tr className="bg-primary bg-opacity-10">
                                        <td>{match.blueThreeTeamNumber} ~ {teamAverageBlueThree[0].matchCount}</td>
                                        <td>{teamAverageBlueThree[0].avgStartPreload}</td>
                                        <td>{teamAverageBlueThree[0].avgAutonIntakes}</td>
                                        <td>{teamAverageBlueThree[0].avgAutonShootsFuel}</td>
                                        <td>{teamAverageBlueThree[0].avgTeleOpShootMajority}</td>
                                        <td>{teamAverageBlueThree[0].avgTeleOpShootHalf}</td>
                                        <td>{teamAverageBlueThree[0].avgTeleOpShootLittle}</td>
                                        <td>{teamAverageBlueThree[0].avgTeleOpPassNeutralAlliance}</td>
                                        <td>{teamAverageBlueThree[0].avgTeleOpCorralls}</td>
                                        <td>{teamAverageBlueThree[0].avgTeleOpDefenceBlocking}</td> 
                                        <td>{teamAverageBlueThree[0].avgTeleOpDefened}</td>
                                    </tr>
                                    <tr className="bg-danger bg-opacity-10">
                                        <td>{match.redOneTeamNumber} ~ {teamAverageRedOne[0].matchCount}</td>
                                        <td>{teamAverageRedOne[0].avgStartPreload}</td>
                                        <td>{teamAverageRedOne[0].avgAutonIntakes}</td>
                                        <td>{teamAverageRedOne[0].avgAutonShootsFuel}</td>
                                        <td>{teamAverageRedOne[0].avgTeleOpShootMajority}</td>
                                        <td>{teamAverageRedOne[0].avgTeleOpShootHalf}</td>
                                        <td>{teamAverageRedOne[0].avgTeleOpShootLittle}</td>
                                        <td>{teamAverageRedOne[0].avgTeleOpPassNeutralAlliance}</td>
                                        <td>{teamAverageRedOne[0].avgTeleOpCorralls}</td>
                                        <td>{teamAverageRedOne[0].avgTeleOpDefenceBlocking}</td> 
                                        <td>{teamAverageRedOne[0].avgTeleOpDefened}</td>
                                    </tr>
                                    <tr className="bg-danger bg-opacity-10">
                                        <td>{match.redTwoTeamNumber} ~ {teamAverageRedTwo[0].matchCount}</td>
                                        <td>{teamAverageRedTwo[0].avgStartPreload}</td>
                                        <td>{teamAverageRedTwo[0].avgAutonIntakes}</td>
                                        <td>{teamAverageRedTwo[0].avgAutonShootsFuel}</td>
                                        <td>{teamAverageRedTwo[0].avgTeleOpShootMajority}</td>
                                        <td>{teamAverageRedTwo[0].avgTeleOpShootHalf}</td>
                                        <td>{teamAverageRedTwo[0].avgTeleOpShootLittle}</td>
                                        <td>{teamAverageRedTwo[0].avgTeleOpPassNeutralAlliance}</td>
                                        <td>{teamAverageRedTwo[0].avgTeleOpCorralls}</td>
                                        <td>{teamAverageRedTwo[0].avgTeleOpDefenceBlocking}</td> 
                                        <td>{teamAverageRedTwo[0].avgTeleOpDefened}</td>
                                    </tr>
                                    <tr className="bg-danger bg-opacity-10">
                                        <td>{match.redThreeTeamNumber} ~ {teamAverageRedThree[0].matchCount}</td>
                                        <td>{teamAverageRedThree[0].avgStartPreload}</td>
                                        <td>{teamAverageRedThree[0].avgAutonIntakes}</td>
                                        <td>{teamAverageRedThree[0].avgAutonShootsFuel}</td>
                                        <td>{teamAverageRedThree[0].avgTeleOpShootMajority}</td>
                                        <td>{teamAverageRedThree[0].avgTeleOpShootHalf}</td>
                                        <td>{teamAverageRedThree[0].avgTeleOpShootLittle}</td>
                                        <td>{teamAverageRedThree[0].avgTeleOpPassNeutralAlliance}</td>
                                        <td>{teamAverageRedThree[0].avgTeleOpCorralls}</td>
                                        <td>{teamAverageRedThree[0].avgTeleOpDefenceBlocking}</td> 
                                        <td>{teamAverageRedThree[0].avgTeleOpDefened}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </Col>
                        <Col>
                            <table className="table"> 
                                <thead>
                                    <tr>
                                        <th>Team<br/>Number</th>
                                        <th>Climb<br/>Level 1</th>
                                        <th>Climb<br/>Level 2</th>
                                        <th>Climb<br/>Level 3</th>
                                        <th>Under Trench</th>
                                        <th>Over Bump</th>
                                        <th>Disabled<br/>Mechanically</th>
                                        <th>Stuck of<br/>Field Element</th>
                                        <th>Parts broken</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="bg-primary bg-opacity-10">
                                        <td>{match.blueOneTeamNumber} ~ {teamAverageBlueOne[0].matchCount}</td>
                                        <td>{teamAverageBlueOne[0].avgPostClimbLevelOneLeft}</td>
                                        <td>{teamAverageBlueOne[0].avgPostClimbLevelTwoLeft}</td>
                                        <td>{teamAverageBlueOne[0].avgPostClimbLevelThreeLeft}</td>
                                        <td>{teamAverageBlueOne[0].avgPostUnderTrench}</td>
                                        <td>{teamAverageBlueOne[0].avgPostOverBump}</td>
                                        <td>{teamAverageBlueOne[0].avgPostDisabledMechanically}</td>
                                        <td>{teamAverageBlueOne[0].avgPostStuckOnFieldElement}</td>
                                        <td>{teamAverageBlueOne[0].avgPostPartBroken}</td>
                                    </tr>
                                    <tr className="bg-primary bg-opacity-10">
                                        <td>{match.blueTwoTeamNumber} ~ {teamAverageBlueTwo[0].matchCount}</td>
                                        <td>{teamAverageBlueTwo[0].avgPostClimbLevelOneLeft}</td>
                                        <td>{teamAverageBlueTwo[0].avgPostClimbLevelTwoLeft}</td>
                                        <td>{teamAverageBlueTwo[0].avgPostClimbLevelThreeLeft}</td>
                                        <td>{teamAverageBlueTwo[0].avgPostUnderTrench}</td>
                                        <td>{teamAverageBlueTwo[0].avgPostOverBump}</td>
                                        <td>{teamAverageBlueTwo[0].avgPostDisabledMechanically}</td>
                                        <td>{teamAverageBlueTwo[0].avgPostStuckOnFieldElement}</td>
                                        <td>{teamAverageBlueTwo[0].avgPostPartBroken}</td>
                                    </tr>
                                    <tr className="bg-primary bg-opacity-10">
                                        <td>{match.blueThreeTeamNumber} ~ {teamAverageBlueThree[0].matchCount}</td>
                                        <td>{teamAverageBlueThree[0].avgPostClimbLevelOneLeft}</td>
                                        <td>{teamAverageBlueThree[0].avgPostClimbLevelTwoLeft}</td>
                                        <td>{teamAverageBlueThree[0].avgPostClimbLevelThreeLeft}</td>
                                        <td>{teamAverageBlueThree[0].avgPostUnderTrench}</td>
                                        <td>{teamAverageBlueThree[0].avgPostOverBump}</td>
                                        <td>{teamAverageBlueThree[0].avgPostDisabledMechanically}</td>
                                        <td>{teamAverageBlueThree[0].avgPostStuckOnFieldElement}</td>
                                        <td>{teamAverageBlueThree[0].avgPostPartBroken}</td>
                                    </tr>
                                    <tr className="bg-danger bg-opacity-10">
                                        <td>{match.redOneTeamNumber} ~ {teamAverageRedOne[0].matchCount}</td>
                                        <td>{teamAverageRedOne[0].avgPostClimbLevelOneLeft}</td>
                                        <td>{teamAverageRedOne[0].avgPostClimbLevelTwoLeft}</td>
                                        <td>{teamAverageRedOne[0].avgPostClimbLevelThreeLeft}</td>
                                        <td>{teamAverageRedOne[0].avgPostUnderTrench}</td>
                                        <td>{teamAverageRedOne[0].avgPostOverBump}</td>
                                        <td>{teamAverageRedOne[0].avgPostDisabledMechanically}</td>
                                        <td>{teamAverageRedOne[0].avgPostStuckOnFieldElement}</td>
                                        <td>{teamAverageRedOne[0].avgPostPartBroken}</td>
                                    </tr>
                                    <tr className="bg-danger bg-opacity-10">
                                        <td>{match.redTwoTeamNumber} ~ {teamAverageRedTwo[0].matchCount}</td>
                                        <td>{teamAverageRedTwo[0].avgPostClimbLevelOneLeft}</td>
                                        <td>{teamAverageRedTwo[0].avgPostClimbLevelTwoLeft}</td>
                                        <td>{teamAverageRedTwo[0].avgPostClimbLevelThreeLeft}</td>
                                        <td>{teamAverageRedTwo[0].avgPostUnderTrench}</td>
                                        <td>{teamAverageRedTwo[0].avgPostOverBump}</td>
                                        <td>{teamAverageRedTwo[0].avgPostDisabledMechanically}</td>
                                        <td>{teamAverageRedTwo[0].avgPostStuckOnFieldElement}</td>
                                        <td>{teamAverageRedTwo[0].avgPostPartBroken}</td>
                                    </tr>
                                    <tr className="bg-danger bg-opacity-10">
                                        <td>{match.redThreeTeamNumber} ~ {teamAverageRedThree[0].matchCount}</td>
                                        <td>{teamAverageRedThree[0].avgPostClimbLevelOneLeft}</td>
                                        <td>{teamAverageRedThree[0].avgPostClimbLevelTwoLeft}</td>
                                        <td>{teamAverageRedThree[0].avgPostClimbLevelThreeLeft}</td>
                                        <td>{teamAverageRedThree[0].avgPostUnderTrench}</td>
                                        <td>{teamAverageRedThree[0].avgPostOverBump}</td>
                                        <td>{teamAverageRedThree[0].avgPostDisabledMechanically}</td>
                                        <td>{teamAverageRedThree[0].avgPostStuckOnFieldElement}</td>
                                        <td>{teamAverageRedThree[0].avgPostPartBroken}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </Col>
                    </p>
                )}
                </Row>
            </>
            ) : (
                <Row>
                    <Col>
                        <h3><FaCircleInfo className='react-icons' size='1.5em' /> No data available for this match.</h3>
                    </Col>
                </Row>
            )}
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

export default Matchdetails;