import React, { useState, useEffect, useContext } from "react";
import axios from 'axios';
// import { useLocation } from 'react-router-dom';
import { AppContext } from "../common/AppContext.js";
import BackButton from '../common/BackButton';
import { APP_DATABASE_URL } from "../../constant/constant";
import { Col, Container, Row } from "react-bootstrap";
import DataTable from '../../components/DataTableNetBase.js';
import { FaEdit } from 'react-icons/fa'; // Import edit icon
import { Chips } from 'primereact/chips';
import { InputSwitch } from 'primereact/inputswitch';

const Eventdata = () => {
    const { appData } = useContext(AppContext);
    // const [event, setEvent] = useState([]);
    const [teamAverage, setTeamAverage] = useState([]);
    const [teamMedian, setTeamMedian] = useState([]);
    const [title, setTitle] = useState('Printable Pick List'); // State to handle title
    const [isEditing, setIsEditing] = useState(false); // State to handle editing
    const [newTitle, setNewTitle] = useState(title); // State to handle new title

    const [chipsValue, setChipsValue] = useState([]);

    const [isMedian, setIsMedian] = useState(false);

    // const location = useLocation();
    // const searchParams = new URLSearchParams(location.search);
    // const eventid = searchParams.get('eventId');

    // useEffect(() => {
    //     axios.get(`${APP_DATABASE_URL}/events/${eventid}`)
    //     .then(response => setEvent(response.data))
    //     .catch(error => console.error('Error fetching data:', error));
    // }, [eventid]);

    useEffect(() => {
        const excludeList = chipsValue.length > 0 ? chipsValue.join(',') : "0"; // Convert array to comma-separated string
        axios.get(`${APP_DATABASE_URL}/matchData/2026/eventkey/${appData.currentEventKey}/exclude/${excludeList}`)
            .then(response => setTeamAverage(response.data))
            .catch(error => console.error('Error fetching data:', error));

        axios.get(`${APP_DATABASE_URL}/matchData/2026/eventkey/${appData.currentEventKey}/exclude/${excludeList}/median`)
            .then(response => setTeamMedian(response.data))
            .catch(error => console.error('Error fetching data:', error));
    }, [chipsValue, appData.currentEventKey]);


    const handleTitleChange = (e) => {
        if (e.target.value.length <= 100) {
            setNewTitle(e.target.value);
        }
    };

    const saveTitle = () => {
        setTitle(newTitle);
        setIsEditing(false);
    };

    const tdRight = {
        textAlign: 'right'
    };

    return (
        <Container fluid>
            <Row>
                <Col md={1}><BackButton /></Col>
                <Col md={11}>
                    <h2>{appData.name} Pick List</h2>
                </Col>
            </Row>
            <Row>
                <Col>
                    <hr></hr>
                    <p>Event Year: {appData.currentEventYear}; Event Key: {appData.currentEventKey}; Event Id (serverDV): {appData.currentEventID}; <em><b>{appData.name}</b></em></p>
                </Col>
            </Row>
            <Row>
                <Col>
                    <h4><InputSwitch checked={isMedian} onChange={(e) => setIsMedian(e.value)} /> {isMedian ? "Median" : "Average"}</h4>
                    <h4>
                        {isEditing ? (
                            <input 
                                type="text" 
                                value={newTitle} 
                                onChange={handleTitleChange} 
                                onBlur={saveTitle} 
                                autoFocus 
                            />
                        ) : (
                            <>
                                {title} <FaEdit onClick={() => setIsEditing(true)} />
                            </>
                        )}
                    </h4>
                </Col>
                <Col style={tdRight}>
                    <h5>
                        Excluded Teams:&nbsp;
                        <Chips 
                            value={chipsValue} 
                            onChange={(e) => setChipsValue(e.value)}
                            keyfilter="int"  
                        />
                    </h5>
                </Col>
            </Row>
            <Row>
                {isMedian ? (
                    <p>
                    <DataTable
                        data={teamMedian}
                        key="median"
                        options={{
                            columns: [
                                { data: 'teamNumber' },
                                { data: 'matchCount' },
                                { data: 'medStartPreload', searchable: false, },
                                { data: 'medAutonShootsFuel', searchable: false, },
                                { data: 'medTeleOpPassNeutralAlliance', searchable: false, },
                                { data: 'medTeleOpCorralls', searchable: false, },
                                { data: 'medTeleOpShootMajority', searchable: false, },
                                { data: 'medTeleOpShootHalf', searchable: false, },
                                { data: 'medTeleOpFeedHumanMajority', searchable: false, },
                                { data: 'medTeleOpDefenceBlocking', searchable: false, },
                                { data: 'medPostDisabledMechanically', searchable: false, },
                                { data: 'medPostPartBroken', searchable: false, },
                                { data: 'medPostUnderTrench', searchable: false, },
                                { data: 'medPostOverBump', searchable: false, }
                            ],
                            responsive: false,
                        }}
                    >
                    <thead>
                        <tr>
                            <th>Team Number</th>
                            <th>Total Matches</th>
                            <th>Is Preloaded</th>
                            <th>Auton Fuel Shots</th>
                            <th>Launched Fuel</th>
                            <th>Corralls Fuel</th>
                            <th>Shoots Majority of Fuel in Hub</th>
                            <th>Shoots About Half of Fuel in Hub</th>
                            <th>Feeds Human Player</th>
                            <th>Is Defending</th>
                            <th>Disabled Mechanically</th>
                            <th>Part Broken</th>
                            <th>Goes Under Trench</th>
                            <th>Goes Over Bump</th>
                        </tr>
                    </thead>
                </DataTable>
                </p>
                ) : (
                <p>
                <DataTable
                    data={teamAverage}
                    key="average"
                    options={{
                        columns: [
                            { data: 'teamNumber' },
                            { data: 'matchCount' },
                            { data: 'avgStartPreload', searchable: false, },
                            { data: 'avgAutonShootsFuel', searchable: false, },
                            { data: 'avgTeleOpPassNeutralAlliance', searchable: false, },
                            { data: 'avgTeleOpCorralls', searchable: false, },
                            { data: 'avgTeleOpShootMajority', searchable: false, },
                            { data: 'avgTeleOpShootHalf', searchable: false, },
                            { data: 'avgTeleOpFeedHumanMajority', searchable: false, },
                            { data: 'avgTeleOpDefenceBlocking', searchable: false, },
                            { data: 'avgPostDisabledMechanically', searchable: false, },
                            { data: 'avgPostPartBroken', searchable: false, },
                            { data: 'avgPostUnderTrench', searchable: false, },
                            { data: 'avgPostOverBump', searchable: false, }
                        ],
                        responsive: false,
                    }}
                >
                    <thead>
                        <tr>
                            <th>Team Number</th>
                            <th>Total Matches</th>
                            <th>Is Preloaded</th>
                            <th>Auton Fuel Shots</th>
                            <th>Launched Fuel</th>
                            <th>Corralls Fuel</th>
                            <th>Shoots Majority of Fuel in Hub</th>
                            <th>Shoots About Half of Fuel in Hub</th>
                            <th>Feeds Human Player</th>
                            <th>Is Defending</th>
                            <th>Disabled Mechanically</th>
                            <th>Part Broken</th>
                            <th>Goes Under Trench</th>
                            <th>Goes Over Bump</th>
                        </tr>
                    </thead>
                </DataTable>
                </p>
                )}
            </Row>
        </Container>
    );
}

export default Eventdata;