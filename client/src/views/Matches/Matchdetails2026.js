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
                                <th>Mode Switch</th>
                                <th>Mode</th>
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
                                <td>{isMedian ? "Median" : "Average"}</td>
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
                                        <th>Team Number</th>
                                        <th>Preload</th>
                                        <th>Passing</th>
                                        <th>Majority</th>
                                        <th>Half</th>
                                        <th>Little</th>
                                        <th>Auton Climb Level</th>
                                        <th>Auton Depot</th>
                                        <th>Auton Intake</th>
                                        <th>Auton Nuetral zone</th>
                                        <th>Auton Outpost</th>
                                        <th>Auton Shoots fuel</th>
                                        <th>Teleop Corralls</th>
                                        <th>Parts broken</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="bg-primary bg-opacity-10">
                                        <td>{match.blueOneTeamNumber} ~ {teamAverageBlueOne[0].matchCount}</td>
                                        <td>{teamMedianBlueOne[0].medStartPreload}</td>
                                        <td>{teamMedianBlueOne[0].medTeleOpPassNeutralAlliance}</td>
                                        <td>{teamMedianBlueOne[0].medTeleOpShootMajority}</td>
                                        <td>{teamMedianBlueOne[0].medTeleOpShootHalf}</td>
                                        <td>{teamMedianBlueOne[0].medTeleOpShootLittle}</td>
                                        <td>{teamMedianBlueOne[0].medAutonClimbLevel}</td>
                                        <td>{teamMedianBlueOne[0].medAutonDepot}</td>
                                        <td>{teamMedianBlueOne[0].medAutonIntake}</td>
                                        <td>{teamMedianBlueOne[0].medAutonNeutralZone}</td>
                                        <td>{teamMedianBlueOne[0].medAutonOutpost}</td>
                                        <td>{teamMedianBlueOne[0].medAutonShootsFuel}</td>
                                        <td>{teamMedianBlueOne[0].medTeleOpCorralls}</td>
                                        <td>{teamMedianBlueOne[0].medPostPartBroken}</td>
                                    </tr>
                                    <tr className="bg-primary bg-opacity-10">
                                        <td>{match.blueOneTeamNumber} ~ {teamAverageBlueOne[0].matchCount}</td>
                                        <td>{teamMedianBlueTwo[0].medStartPreload}</td>
                                        <td>{teamMedianBlueTwo[0].medTeleOpPassNeutralAlliance}</td>
                                        <td>{teamMedianBlueTwo[0].medTeleOpShootMajority}</td>
                                        <td>{teamMedianBlueTwo[0].medTeleOpShootHalf}</td>
                                        <td>{teamMedianBlueTwo[0].medTeleOpShootLittle}</td>
                                        <td>{teamMedianBlueTwo[0].medAutonClimbLevel}</td>
                                        <td>{teamMedianBlueTwo[0].medAutonDepot}</td>
                                        <td>{teamMedianBlueTwo[0].medAutonIntake}</td>
                                        <td>{teamMedianBlueTwo[0].medAutonNeutralZone}</td>
                                        <td>{teamMedianBlueTwo[0].medAutonOutpost}</td>
                                        <td>{teamMedianBlueTwo[0].medAutonShootsFuel}</td>
                                        <td>{teamMedianBlueTwo[0].medTeleOpCorralls}</td>
                                        <td>{teamMedianBlueTwo[0].medPostPartBroken}</td>
                                    </tr>
                                    <tr className="bg-primary bg-opacity-10">
                                        <td>{match.blueOneTeamNumber} ~ {teamAverageBlueOne[0].matchCount}</td>
                                        <td>{teamMedianBlueThree[0].medStartPreload}</td>
                                        <td>{teamMedianBlueThree[0].medTeleOpPassNeutralAlliance}</td>
                                        <td>{teamMedianBlueThree[0].medTeleOpShootMajority}</td>
                                        <td>{teamMedianBlueThree[0].medTeleOpShootHalf}</td>
                                        <td>{teamMedianBlueThree[0].medTeleOpShootLittle}</td>
                                        <td>{teamMedianBlueThree[0].medAutonClimbLevel}</td>
                                        <td>{teamMedianBlueThree[0].medAutonDepot}</td>
                                        <td>{teamMedianBlueThree[0].medAutonIntake}</td>
                                        <td>{teamMedianBlueThree[0].medAutonNeutralZone}</td>
                                        <td>{teamMedianBlueThree[0].medAutonOutpost}</td>
                                        <td>{teamMedianBlueThree[0].medAutonShootsFuel}</td>
                                        <td>{teamMedianBlueThree[0].medTeleOpCorralls}</td>
                                        <td>{teamMedianBlueThree[0].medPostPartBroken}</td>
                                    </tr>
                                    <tr className="bg-primary bg-opacity-10">
                                        <td>{match.blueOneTeamNumber} ~ {teamAverageBlueOne[0].matchCount}</td>
                                        <td>{teamMedianRedOne[0].medStartPreload}</td>
                                        <td>{teamMedianRedOne[0].medTeleOpPassNeutralAlliance}</td>
                                        <td>{teamMedianRedOne[0].medTeleOpShootMajority}</td>
                                        <td>{teamMedianRedOne[0].medTeleOpShootHalf}</td>
                                        <td>{teamMedianRedOne[0].medTeleOpShootLittle}</td>
                                        <td>{teamMedianRedOne[0].medAutonClimbLevel}</td>
                                        <td>{teamMedianRedOne[0].medAutonDepot}</td>
                                        <td>{teamMedianRedOne[0].medAutonIntake}</td>
                                        <td>{teamMedianRedOne[0].medAutonNeutralZone}</td>
                                        <td>{teamMedianRedOne[0].medAutonOutpost}</td>
                                        <td>{teamMedianRedOne[0].medAutonShootsFuel}</td>
                                        <td>{teamMedianRedOne[0].medTeleOpCorralls}</td>
                                        <td>{teamMedianRedOne[0].medPostPartBroken}</td>
                                    </tr>
                                    <tr className="bg-primary bg-opacity-10">
                                        <td>{match.blueOneTeamNumber} ~ {teamAverageBlueOne[0].matchCount}</td>
                                        <td>{teamMedianRedTwo[0].medStartPreload}</td>
                                        <td>{teamMedianRedTwo[0].medTeleOpPassNeutralAlliance}</td>
                                        <td>{teamMedianRedTwo[0].medTeleOpShootMajority}</td>
                                        <td>{teamMedianRedTwo[0].medTeleOpShootHalf}</td>
                                        <td>{teamMedianRedTwo[0].medTeleOpShootLittle}</td>
                                        <td>{teamMedianRedTwo[0].medAutonClimbLevel}</td>
                                        <td>{teamMedianRedTwo[0].medAutonDepot}</td>
                                        <td>{teamMedianRedTwo[0].medAutonIntake}</td>
                                        <td>{teamMedianRedTwo[0].medAutonNeutralZone}</td>
                                        <td>{teamMedianRedTwo[0].medAutonOutpost}</td>
                                        <td>{teamMedianRedTwo[0].medAutonShootsFuel}</td>
                                        <td>{teamMedianRedTwo[0].medTeleOpCorralls}</td>
                                        <td>{teamMedianRedTwo[0].medPostPartBroken}</td>
                                    </tr>
                                    <tr className="bg-primary bg-opacity-10">
                                        <td>{match.blueOneTeamNumber} ~ {teamAverageBlueOne[0].matchCount}</td>
                                        <td>{teamMedianRedThree[0].medStartPreload}</td>
                                        <td>{teamMedianRedThree[0].medTeleOpPassNeutralAlliance}</td>
                                        <td>{teamMedianRedThree[0].medTeleOpShootMajority}</td>
                                        <td>{teamMedianRedThree[0].medTeleOpShootHalf}</td>
                                        <td>{teamMedianRedThree[0].medTeleOpShootLittle}</td>
                                        <td>{teamMedianRedThree[0].medAutonClimbLevel}</td>
                                        <td>{teamMedianRedThree[0].medAutonDepot}</td>
                                        <td>{teamMedianRedThree[0].medAutonIntake}</td>
                                        <td>{teamMedianRedThree[0].medAutonNeutralZone}</td>
                                        <td>{teamMedianRedThree[0].medAutonOutpost}</td>
                                        <td>{teamMedianRedThree[0].medAutonShootsFuel}</td>
                                        <td>{teamMedianRedThree[0].medTeleOpCorralls}</td>
                                        <td>{teamMedianRedThree[0].medPostPartBroken}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </Col>
                        <Col>
                            <table className="table"> 
                                <thead>
                                    <tr>
                                        <th>Team Number</th>
                                        <th>Preload</th>
                                        <th>Defense</th>
                                        <th>Climb Level 1</th>
                                        <th>Climb Level 2</th>
                                        <th>Climb Level 3</th>
                                        <th>Under Trench</th>
                                        <th>Over Bump</th>
                                        <th>Disabled Mechanically</th>
                                        <th>Stuck of Field Element</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="bg-primary bg-opacity-10">
                                        <td>{match.blueOneTeamNumber} ~ {teamAverageBlueOne[0].matchCount}</td>
                                        <td>{teamMedianBlueOne[0].medTeleOpDefenceBlocking}</td>
                                        <td>{teamMedianBlueOne[0].medTeleOpDefenceStealling}</td>
                                        <td>{teamMedianBlueOne[0].medPostClimbLevelOne}</td>
                                        <td>{teamMedianBlueOne[0].medPostClimbLevelTwo}</td>
                                        <td>{teamMedianBlueOne[0].medPostClimbLevelThree}</td>
                                        <td>{teamMedianBlueOne[0].medPostUnderTrench}</td>
                                        <td>{teamMedianBlueOne[0].medPostOverBump}</td>
                                        <td>{teamMedianBlueOne[0].medPostDisabledMechanically}</td>
                                        <td>{teamMedianBlueOne[0].medPostStuckOnFieldElement}</td>
                                    </tr>
                                    <tr className="bg-primary bg-opacity-10">
                                        <td>{match.blueTwoTeamNumber} ~ {teamAverageBlueTwo[0].matchCount}</td>
                                        <td>{teamMedianBlueTwo[0].medTeleOpDefenceBlocking}</td>
                                        <td>{teamMedianBlueTwo[0].medTeleOpDefenceStealling}</td>
                                        <td>{teamMedianBlueTwo[0].medPostClimbLevelOne}</td>
                                        <td>{teamMedianBlueTwo[0].medPostClimbLevelTwo}</td>
                                        <td>{teamMedianBlueTwo[0].medPostClimbLevelThree}</td>
                                        <td>{teamMedianBlueTwo[0].medPostClimbLevelLeft}</td>
                                        <td>{teamMedianBlueTwo[0].medPostClimbLevelCenter}</td>
                                        <td>{teamMedianBlueTwo[0].medPostClimbLevelRight}</td>
                                        <td>{teamMedianBlueTwo[0].medPostUnderTrench}</td>
                                        <td>{teamMedianBlueTwo[0].medPostOverBump}</td>
                                        <td>{teamMedianBlueTwo[0].medPostDisabledMechanically}</td>
                                        <td>{teamMedianBlueTwo[0].medPostStuckOnFieldElement}</td>
                                        <td>{teamMedianBlueTwo[0].medAutonClimbLevel}</td>
                                        <td>{teamMedianBlueTwo[0].medAutonDepot}</td>
                                        <td>{teamMedianBlueTwo[0].medAutonIntake}</td>
                                        <td>{teamMedianBlueTwo[0].medAutonNeutralZone}</td>
                                        <td>{teamMedianBlueTwo[0].medAutonOutpost}</td>
                                        <td>{teamMedianBlueTwo[0].medAutonShootsFuel}</td>
                                        <td>{teamMedianBlueTwo[0].medTeleOpCorralls}</td>
                                        <td>{teamMedianBlueTwo[0].medPostPartBroken}</td>
                                    </tr>
                                    <tr className="bg-primary bg-opacity-10">
                                        <td>{match.blueThreeTeamNumber} ~ {teamAverageBlueThree[0].matchCount}</td>
                                        <td>{teamMedianBlueThree[0].medTeleOpDefenceBlocking}</td>
                                        <td>{teamMedianBlueThree[0].medTeleOpDefenceStealling}</td>
                                        <td>{teamMedianBlueThree[0].medPostClimbLevelOne}</td>
                                        <td>{teamMedianBlueThree[0].medPostClimbLevelTwo}</td>
                                        <td>{teamMedianBlueThree[0].medPostClimbLevelThree}</td>
                                        <td>{teamMedianBlueThree[0].medPostClimbLevelLeft}</td>
                                        <td>{teamMedianBlueThree[0].medPostClimbLevelCenter}</td>
                                        <td>{teamMedianBlueThree[0].medPostClimbLevelRight}</td>
                                        <td>{teamMedianBlueThree[0].medPostUnderTrench}</td>
                                        <td>{teamMedianBlueThree[0].medPostOverBump}</td>
                                        <td>{teamMedianBlueThree[0].medPostDisabledMechanically}</td>
                                        <td>{teamMedianBlueThree[0].medPostStuckOnFieldElement}</td>
                                        <td>{teamMedianBlueThree[0].medAutonClimbLevel}</td>
                                        <td>{teamMedianBlueThree[0].medAutonDepot}</td>
                                        <td>{teamMedianBlueThree[0].medAutonIntake}</td>
                                        <td>{teamMedianBlueThree[0].medAutonNeutralZone}</td>
                                        <td>{teamMedianBlueThree[0].medAutonOutpost}</td>
                                        <td>{teamMedianBlueThree[0].medAutonShootsFuel}</td>
                                        <td>{teamMedianBlueThree[0].medTeleOpCorralls}</td>
                                        <td>{teamMedianBlueThree[0].medPostPartBroken}</td>
                                    </tr>
                                    <tr className="bg-danger bg-opacity-10">
                                        <td>{match.redOneTeamNumber} ~ {teamAverageRedOne[0].matchCount}</td>
                                        <td>{teamMedianRedOne[0].medTeleOpDefenceBlocking}</td>
                                        <td>{teamMedianRedOne[0].medTeleOpDefenceStealling}</td>
                                        <td>{teamMedianRedOne[0].medPostClimbLevelOne}</td>
                                        <td>{teamMedianRedOne[0].medPostClimbLevelTwo}</td>
                                        <td>{teamMedianRedOne[0].medPostClimbLevelThree}</td>
                                        <td>{teamMedianRedOne[0].medPostClimbLevelLeft}</td>
                                        <td>{teamMedianRedOne[0].medPostClimbLevelCenter}</td>
                                        <td>{teamMedianRedOne[0].medPostClimbLevelRight}</td>
                                        <td>{teamMedianRedOne[0].medPostUnderTrench}</td>
                                        <td>{teamMedianRedOne[0].medPostOverBump}</td>
                                        <td>{teamMedianRedOne[0].medPostDisabledMechanically}</td>
                                        <td>{teamMedianRedOne[0].medPostStuckOnFieldElement}</td>
                                        <td>{teamMedianRedOne[0].medAutonClimbLevel}</td>
                                        <td>{teamMedianRedOne[0].medAutonDepot}</td>
                                        <td>{teamMedianRedOne[0].medAutonIntake}</td>
                                        <td>{teamMedianRedOne[0].medAutonNeutralZone}</td>
                                        <td>{teamMedianRedOne[0].medAutonOutpost}</td>
                                        <td>{teamMedianRedOne[0].medAutonShootsFuel}</td>
                                        <td>{teamMedianRedOne[0].medTeleOpCorralls}</td>
                                        <td>{teamMedianRedOne[0].medPostPartBroken}</td>
                                    </tr>
                                    <tr className="bg-danger bg-opacity-10">
                                        <td>{match.redTwoTeamNumber} ~ {teamAverageRedTwo[0].matchCount}</td>
                                        <td>{teamMedianRedTwo[0].medTeleOpDefenceBlocking}</td>
                                        <td>{teamMedianRedTwo[0].medTeleOpDefenceStealling}</td>
                                        <td>{teamMedianRedTwo[0].medPostClimbLevelOne}</td>
                                        <td>{teamMedianRedTwo[0].medPostClimbLevelTwo}</td>
                                        <td>{teamMedianRedTwo[0].medPostClimbLevelThree}</td>
                                        <td>{teamMedianRedTwo[0].medPostClimbLevelLeft}</td>
                                        <td>{teamMedianRedTwo[0].medPostClimbLevelCenter}</td>
                                        <td>{teamMedianRedTwo[0].medPostClimbLevelRight}</td>
                                        <td>{teamMedianRedTwo[0].medPostUnderTrench}</td>
                                        <td>{teamMedianRedTwo[0].medPostOverBump}</td>
                                        <td>{teamMedianRedTwo[0].medPostDisabledMechanically}</td>
                                        <td>{teamMedianRedTwo[0].medPostStuckOnFieldElement}</td>
                                        <td>{teamMedianRedTwo[0].medAutonClimbLevel}</td>
                                        <td>{teamMedianRedTwo[0].medAutonDepot}</td>
                                        <td>{teamMedianRedTwo[0].medAutonIntake}</td>
                                        <td>{teamMedianRedTwo[0].medAutonNeutralZone}</td>
                                        <td>{teamMedianRedTwo[0].medAutonOutpost}</td>
                                        <td>{teamMedianRedTwo[0].medAutonShootsFuel}</td>
                                        <td>{teamMedianRedTwo[0].medTeleOpCorralls}</td>
                                        <td>{teamMedianRedTwo[0].medPostPartBroken}</td>
                                    </tr>
                                    <tr className="bg-danger bg-opacity-10">
                                        <td>{match.redThreeTeamNumber} ~ {teamAverageRedThree[0].matchCount}</td>
                                        <td>{teamMedianRedThree[0].medTeleOpDefenceBlocking}</td>
                                        <td>{teamMedianRedThree[0].medTeleOpDefenceStealling}</td>
                                        <td>{teamMedianRedThree[0].medPostClimbLevelOne}</td>
                                        <td>{teamMedianRedThree[0].medPostClimbLevelTwo}</td>
                                        <td>{teamMedianRedThree[0].medPostClimbLevelThree}</td>
                                        <td>{teamMedianRedThree[0].medPostClimbLevelLeft}</td>
                                        <td>{teamMedianRedThree[0].medPostClimbLevelCenter}</td>
                                        <td>{teamMedianRedThree[0].medPostClimbLevelRight}</td>
                                        <td>{teamMedianRedThree[0].medPostUnderTrench}</td>
                                        <td>{teamMedianRedThree[0].medPostOverBump}</td>
                                        <td>{teamMedianRedThree[0].medPostDisabledMechanically}</td>
                                        <td>{teamMedianRedThree[0].medPostStuckOnFieldElement}</td>
                                        <td>{teamMedianRedThree[0].medAutonClimbLevel}</td>
                                        <td>{teamMedianRedThree[0].medAutonDepot}</td>
                                        <td>{teamMedianRedThree[0].medAutonIntake}</td>
                                        <td>{teamMedianRedThree[0].medAutonNeutralZone}</td>
                                        <td>{teamMedianRedThree[0].medAutonOutpost}</td>
                                        <td>{teamMedianRedThree[0].medAutonShootsFuel}</td>
                                        <td>{teamMedianRedThree[0].medTeleOpCorralls}</td>
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
                                        <th>Team Number</th>
                                        <th>Preload</th>
                                        <th>Passing</th>
                                        <th>Majority</th>
                                        <th>Half</th>
                                        <th>Little</th>
                                        <th>Climb Level</th>
                                        <th>Auton Depot</th>
                                        <th>Auton Intake</th>
                                        <th>Auton Nuetral zone</th>
                                        <th>Auton Outpost</th>
                                        <th>Auton Shoots fuel</th>
                                        <th>Teleop Corralls</th>
                                        <th>Parts broken</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="bg-primary bg-opacity-10">
                                        <td>{match.blueOneTeamNumber} ~ {teamAverageBlueOne[0].matchCount}</td>
                                        <td>{teamAverageBlueOne[0].avgStartPreload}</td>
                                        <td>{teamAverageBlueOne[0].avgTeleOpPassNeutralAlliance}</td>
                                        <td>{teamAverageBlueOne[0].avgTeleOpShootMajority}</td>
                                        <td>{teamAverageBlueOne[0].avgTeleOpShootHalf}</td>
                                        <td>{teamAverageBlueOne[0].avgTeleOpShootLittle}</td>
                                        <td>{teamAverageBlueOne[0].avgStartPreload}</td>
                                        <td>{teamAverageBlueOne[0].avgAutonClimbLevel}</td>
                                        <td>{teamAverageBlueOne[0].avgAutonDepot}</td>
                                        <td>{teamAverageBlueOne[0].avgAutonIntake}</td>
                                        <td>{teamAverageBlueOne[0].avgAutonNeutralZone}</td>
                                        <td>{teamAverageBlueOne[0].avgAutonOutpost}</td>
                                        <td>{teamAverageBlueOne[0].avgAutonShootsFuel}</td>
                                        <td>{teamAverageBlueOne[0].avgTeleOpCorralls}</td>
                                        <td>{teamAverageBlueOne[0].avgPostPartBroken}</td>
                                    </tr>
                                    <tr className="bg-primary bg-opacity-10">
                                        <td>{match.blueTwoTeamNumber} ~ {teamAverageBlueTwo[0].matchCount}</td>
                                        <td>{teamAverageBlueTwo[0].avgStartPreload}</td>
                                        <td>{teamAverageBlueTwo[0].avgTeleOpPassNeutralAlliance}</td>
                                        <td>{teamAverageBlueTwo[0].avgTeleOpShootMajority}</td>
                                        <td>{teamAverageBlueTwo[0].avgTeleOpShootHalf}</td>
                                        <td>{teamAverageBlueTwo[0].avgTeleOpShootLittle}</td>
                                        <td>{teamAverageBlueTwo[0].avgStartPreload}</td>
                                        <td>{teamAverageBlueTwo[0].avgAutonClimbLevel}</td>
                                        <td>{teamAverageBlueTwo[0].avgAutonDepot}</td>
                                        <td>{teamAverageBlueTwo[0].avgAutonIntake}</td>
                                        <td>{teamAverageBlueTwo[0].avgAutonNeutralZone}</td>
                                        <td>{teamAverageBlueTwo[0].avgAutonOutpost}</td>
                                        <td>{teamAverageBlueTwo[0].avgAutonShootsFuel}</td>
                                        <td>{teamAverageBlueTwo[0].avgTeleOpCorralls}</td>
                                        <td>{teamAverageBlueTwo[0].avgPostPartBroken}</td>
                                    </tr>
                                    <tr className="bg-primary bg-opacity-10">
                                        <td>{match.blueThreeTeamNumber} ~ {teamAverageBlueThree[0].matchCount}</td>
                                        <td>{teamAverageBlueThree[0].avgStartPreload}</td>
                                        <td>{teamAverageBlueThree[0].avgTeleOpPassNeutralAlliance}</td>
                                        <td>{teamAverageBlueThree[0].avgTeleOpShootMajority}</td>
                                        <td>{teamAverageBlueThree[0].avgTeleOpShootHalf}</td>
                                        <td>{teamAverageBlueThree[0].avgTeleOpShootLittle}</td>
                                        <td>{teamAverageBlueThree[0].avgStartPreload}</td>
                                        <td>{teamAverageBlueThree[0].avgAutonClimbLevel}</td>
                                        <td>{teamAverageBlueThree[0].avgAutonDepot}</td>
                                        <td>{teamAverageBlueThree[0].avgAutonIntake}</td>
                                        <td>{teamAverageBlueThree[0].avgAutonNeutralZone}</td>
                                        <td>{teamAverageBlueThree[0].avgAutonOutpost}</td>
                                        <td>{teamAverageBlueThree[0].avgAutonShootsFuel}</td>
                                        <td>{teamAverageBlueThree[0].avgTeleOpCorralls}</td>
                                        <td>{teamAverageBlueThree[0].avgPostPartBroken}</td>
                                    </tr>
                                    <tr className="bg-danger bg-opacity-10">
                                        <td>{match.redOneTeamNumber} ~ {teamAverageRedOne[0].matchCount}</td>
                                        <td>{teamAverageRedOne[0].avgStartPreload}</td>
                                        <td>{teamAverageRedOne[0].avgTeleOpPassNeutralAlliance}</td>
                                        <td>{teamAverageRedOne[0].avgTeleOpShootMajority}</td>
                                        <td>{teamAverageRedOne[0].avgTeleOpShootHalf}</td>
                                        <td>{teamAverageRedOne[0].avgTeleOpShootLittle}</td>
                                        <td>{teamAverageRedOne[0].avgStartPreload}</td>
                                        <td>{teamAverageRedOne[0].avgAutonClimbLevel}</td>
                                        <td>{teamAverageRedOne[0].avgAutonDepot}</td>
                                        <td>{teamAverageRedOne[0].avgAutonIntake}</td>
                                        <td>{teamAverageRedOne[0].avgAutonNeutralZone}</td>
                                        <td>{teamAverageRedOne[0].avgAutonOutpost}</td>
                                        <td>{teamAverageRedOne[0].avgAutonShootsFuel}</td>
                                        <td>{teamAverageRedOne[0].avgTeleOpCorralls}</td>
                                        <td>{teamAverageRedOne[0].avgPostPartBroken}</td>
                                    </tr>
                                    <tr className="bg-danger bg-opacity-10">
                                        <td>{match.redTwoTeamNumber} ~ {teamAverageRedTwo[0].matchCount}</td>
                                        <td>{teamAverageRedTwo[0].avgStartPreload}</td>
                                        <td>{teamAverageRedTwo[0].avgTeleOpPassNeutralAlliance}</td>
                                        <td>{teamAverageRedTwo[0].avgTeleOpShootMajority}</td>
                                        <td>{teamAverageRedTwo[0].avgTeleOpShootHalf}</td>
                                        <td>{teamAverageRedTwo[0].avgTeleOpShootLittle}</td>
                                        <td>{teamAverageRedTwo[0].avgStartPreload}</td>
                                        <td>{teamAverageRedTwo[0].avgAutonClimbLevel}</td>
                                        <td>{teamAverageRedTwo[0].avgAutonDepot}</td>
                                        <td>{teamAverageRedTwo[0].avgAutonIntake}</td>
                                        <td>{teamAverageRedTwo[0].avgAutonNeutralZone}</td>
                                        <td>{teamAverageRedTwo[0].avgAutonOutpost}</td>
                                        <td>{teamAverageRedTwo[0].avgAutonShootsFuel}</td>
                                        <td>{teamAverageRedTwo[0].avgTeleOpCorralls}</td>
                                        <td>{teamAverageRedTwo[0].avgPostPartBroken}</td>
                                    </tr>
                                    <tr className="bg-danger bg-opacity-10">
                                        <td>{match.redThreeTeamNumber} ~ {teamAverageRedThree[0].matchCount}</td>
                                        <td>{teamAverageRedThree[0].avgStartPreload}</td>
                                        <td>{teamAverageRedThree[0].avgTeleOpPassNeutralAlliance}</td>
                                        <td>{teamAverageRedThree[0].avgTeleOpShootMajority}</td>
                                        <td>{teamAverageRedThree[0].avgTeleOpShootHalf}</td>
                                        <td>{teamAverageRedThree[0].avgTeleOpShootLittle}</td>
                                        <td>{teamAverageRedThree[0].avgAutonClimbLevel}</td>
                                        <td>{teamAverageRedThree[0].avgAutonDepot}</td>
                                        <td>{teamAverageRedThree[0].avgAutonIntake}</td>
                                        <td>{teamAverageRedThree[0].avgAutonNeutralZone}</td>
                                        <td>{teamAverageRedThree[0].avgAutonOutpost}</td>
                                        <td>{teamAverageRedThree[0].avgAutonShootsFuel}</td>
                                        <td>{teamAverageRedThree[0].avgTeleOpCorralls}</td>
                                        <td>{teamAverageRedThree[0].avgPostPartBroken}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </Col>
                        <Col>
                            <table className="table"> 
                                <thead>
                                    <tr>
                                        <th>Team Number</th>
                                        <th>Preload</th>
                                        <th>Passing</th>
                                        <th>Majority</th>
                                        <th>Half</th>
                                        <th>Little</th>
                                        <th>Climb Level</th>
                                        <th>Auton Depot</th>
                                        <th>Auton Intake</th>
                                        <th>Auton Nuetral zone</th>
                                        <th>Auton Outpost</th>
                                        <th>Auton Shoots fuel</th>
                                        <th>Teleop Corralls</th>
                                        <th>Parts broken</th>
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
        </Container>
    );
}

export default Matchdetails;