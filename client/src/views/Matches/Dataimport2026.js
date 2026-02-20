import { useEffect, useState, useContext } from "react";
import axios from 'axios';
import { AppContext } from "../common/AppContext.js";
import Html5QrcodePlugin from "../../components/Html5QrcodePlugin.js";
import { Container, Row, Col, ProgressBar } from "react-bootstrap";
import { sha1 } from "js-sha1";
import { APP_DATABASE_URL } from "../../constant/constant";
import './Matches.css';
import BackButton from '../common/BackButton';

const Dataimport = () => {

    const { appData } = useContext(AppContext);

    const [progressBarStatus, setProgressBarStatus] = useState(0);

    const [scannedData, setScannedData] = useState('');
    const [scannedDataSHA1, setScannedDataSHA1] = useState('');
    const [scannedState, setScannedState] = useState('Waiting...');

    const prepareMatchDataforDatabase = (matchData) => {
        let prepData = {};

        /* *** General Decoding logic *** */
        let botLocationEnum = [];
        const botLocationViewSbEnum = ['None', 'LeftTrench', 'LeftBump', 'Hub', 'RightBump', 'RightTrench']; // Scoring Blue, Spectator Red
        const botLocationViewSrEnum = ['None', 'RightTrench', 'RightBump', 'Hub', 'LeftBump', 'LeftTrench']; // Scoring Red, Spectator Blue
        // leftFieldOrientation is used to determine mapping for Reef scouted data to reference to the field orientation
        //  and will be used to determine the mapping of the data to the database
        if ( (matchData.allianceLocation[0] === 'R' && matchData.fieldOrientation === "Scoring") ||
                (matchData.allianceLocation[0] === 'B' && matchData.fieldOrientation === "Spectator") ) {
            botLocationEnum = [...botLocationViewSrEnum]; // Scoring Red, Spectator Blue
                if (matchData.sL === 1) {
                    prepData.startTrenchLeft = 0;
                    prepData.startBumpLeft = 0;
                    prepData.startHub = 0;
                    prepData.startBumpRight = 0;
                    prepData.startTrenchRight = 1;
                }
                else if (matchData.sL === 2) {
                    prepData.startTrenchLeft = 0;
                    prepData.startBumpLeft = 0;
                    prepData.startHub = 0;
                    prepData.startBumpRight = 1;
                    prepData.startTrenchRight = 0;
                }
                else if (matchData.sL === 3) {
                    prepData.startTrenchLeft = 0;
                    prepData.startBumpLeft = 0;
                    prepData.startHub = 1;
                    prepData.startBumpRight = 0;
                    prepData.startTrenchRight = 0;
                }
                else if (matchData.sL === 4) {
                    prepData.startTrenchLeft = 0;
                    prepData.startBumpLeft = 1;
                    prepData.startHub = 0;
                    prepData.startBumpRight = 0;
                    prepData.startTrenchRight = 0;
                }
                else if (matchData.sL === 5) {
                    prepData.startTrenchLeft = 1;
                    prepData.startBumpLeft = 0;
                    prepData.startHub = 0;
                    prepData.startBumpRight = 0;
                    prepData.startTrenchRight = 0;
                }
                else {
                    prepData.startTrenchLeft = 0;
                    prepData.startBumpLeft = 0;
                    prepData.startHub = 0;
                    prepData.startBumpRight = 0;
                    prepData.startTrenchRight = 0;
                }
        }
        else {
            botLocationEnum = [...botLocationViewSbEnum]; // Scoring Blue, Spectator Red
                if (matchData.sL === 1) {
                    prepData.startTrenchLeft = 1;
                    prepData.startBumpLeft = 0;
                    prepData.startHub = 0;
                    prepData.startBumpRight = 0;
                    prepData.startTrenchRight = 0;
                }
                else if (matchData.sL === 2) {
                    prepData.startTrenchLeft = 0;
                    prepData.startBumpLeft = 1;
                    prepData.startHub = 0;
                    prepData.startBumpRight = 0;
                    prepData.startTrenchRight = 0;
                }
                else if (matchData.sL === 3) {
                    prepData.startTrenchLeft = 0;
                    prepData.startBumpLeft = 0;
                    prepData.startHub = 1;
                    prepData.startBumpRight = 0;
                    prepData.startTrenchRight = 0;
                }
                else if (matchData.sL === 4) {
                    prepData.startTrenchLeft = 0;
                    prepData.startBumpLeft = 0;
                    prepData.startHub = 0;
                    prepData.startBumpRight = 1;
                    prepData.startTrenchRight = 0;
                }
                else if (matchData.sL === 5) {
                    prepData.startTrenchLeft = 0;
                    prepData.startBumpLeft = 0;
                    prepData.startHub = 0;
                    prepData.startBumpRight = 0;
                    prepData.startTrenchRight = 1;
                }
                else {
                    prepData.startTrenchLeft = 0;
                    prepData.startBumpLeft = 0;
                    prepData.startHub = 0;
                    prepData.startBumpRight = 0;
                    prepData.startTrenchRight = 0;
                }
        }

         
        /* *** General Match Data *** */
        prepData.schemaVersion = matchData.v;
        prepData.scouterName = matchData.currentScout;
        prepData.matchNumber = matchData.currentMatch;
        prepData.teamNumber = matchData.currentTeam;
        prepData.eventKey = appData.currentEventKey;
        prepData.matchKey = appData.currentEventKey + '_qm' + matchData.currentMatch;
        prepData.event_id = appData.currentEventID;
        prepData.allianceLocation = matchData.allianceLocation;
        prepData.fieldOrientation = matchData.fieldOrientation;

        prepData.startPreload = matchData.sP;
    
        // let autonActions = matchData.aP1 + matchData.aP2 + matchData.aP3 + matchData.aP4 + matchData.aP5 + matchData.aP6;

        // prepData.autonOne = matchData.aP1;
        // prepData.autonTwo = matchData.aP2;
        // prepData.autonThree = matchData.aP3;
        // prepData.autonFour = matchData.aP4;
        // prepData.autonFive = matchData.aP5;
        // prepData.autonSix = matchData.aP6;


        prepData.teleOpPassNeutralAlliance = matchData.tPNA;
        prepData.teleOpPassOpponentNeutral = matchData.tPON;
        prepData.teleOpPassOpponentAlliance = matchData.tPOA;
        prepData.teleOpShootMajority = matchData.tSM;
        prepData.teleOpShootHalf = matchData.tSH;
        prepData.teleOpShootLittle = matchData.tSL;

        if (matchData.tFH === 1) {
            prepData.teleOpFeedHumanMajority = 1;
            prepData.teleOpFeedHumanLittle = 0;
        }
        else if (matchData.tFH === 2) {
            prepData.teleOpFeedHumanMajority = 0;
            prepData.teleOpFeedHumanLittle = 1;
        }
        else {
            prepData.teleOpFeedHumanMajority = 0;
            prepData.teleOpFeedHumanLittle = 0;
        }
    
        if (matchData.tS === 1) {
            prepData.teleOpShiftOne = 1;
            prepData.teleOpShiftTwo = 0;
        }
        else if (matchData.tS === 2) {
            prepData.teleOpShiftOne = 0;
            prepData.teleOpShiftTwo = 1;
        }
        else {
            prepData.teleOpShiftOne = 0;
            prepData.teleOpShiftTwo = 0;
        }

        prepData.teleOpDefenceStealling = matchData.tDS;
        prepData.teleOpDefenceBlocking = matchData.tDB;


        // prepData.postgameClimb = matchData.pCL;
        prepData.postUnderTrench = matchData.pUT;
        prepData.postOverBump = matchData.pOB;
        prepData.postDisabledMechanically = matchData.pDB;
        prepData.postNotThere = matchData.pNT;
        prepData.postStuckFieldElement = matchData.pSFE;
        prepData.uniqueId = scannedDataSHA1;


        /* *** Returning the prepData to the calling method  *** */
        return prepData;
    };


    // This useEffect is for importing data from QR code scanned
    useEffect(() => { 
        const inportQRdata = async () => {
            // Calculate SHA1 of scannedData
            let scannedDataSHA1 = sha1(scannedData);
            setScannedDataSHA1(scannedDataSHA1);

            // Check if this QR code is already in database
            let inDatabase = false
            await axios.get(`${APP_DATABASE_URL}/matchData/2026/uniqueid/${scannedDataSHA1}`)
            .then(response => {
                if (response.data.length > 0) {
                    inDatabase = true;
                    setScannedState('Already in database');
                    console.log("Already in databaseUnique: Id Result:"+scannedDataSHA1)
                }
            })

            if(!inDatabase){
                // Import data to database
                let data = JSON.parse(scannedData);
                // alert(data.schemaVar);

                //call prepareMatchDataforDatabase with data.data
                let matchData = prepareMatchDataforDatabase(data.data);
                matchData = {...matchData, uniqueId: scannedDataSHA1};
                // console.log('matchData:', matchData);
                console.log('matchData for DB:', JSON.stringify(matchData));
                // Entering the data from the scanned QR code to the database
                await axios.post(`${APP_DATABASE_URL}/matchData/2026`,matchData,
                
                { headers: { 'Content-Type': 'application/json' } })
            
                // Import data to database complete
                setScannedState('Data imported');
                setProgressBarStatus(105);
            }
        }

        // Execute inportQRdata() only if scannedData is not empty
        if(scannedData !== '') {
            inportQRdata();
        }
        

    }, [scannedData]);

    // This useEffect is for progress bar
    useEffect(() => {
        let timer = setTimeout(() => {
            setProgressBarStatus((prevProgress) => {
                if (prevProgress > 10) {
                    return prevProgress - 10;
                }
                return 0;
            });
        }, 500);
        // console.log('ProgressBarStatus: ', progressBarStatus);
        if(progressBarStatus === 0) {
            setScannedData('');
            setScannedDataSHA1('');
            setScannedState('Waiting...');
        }
        return () => clearTimeout(timer);
    }, [progressBarStatus]);

    const onNewScanResult = (decodedText, decodedResult) => {
        setScannedData(decodedText);
        console.log(`Scan result:${scannedDataSHA1}| ${decodedText}`);
    };

    return (
        <Container>
            <Row>
                <Col md={1}><BackButton /></Col>
                <Col md={11}> 
                    <h1>Import Scouting Data 2026</h1>
                </Col>
                <hr></hr>
                <p>Event Year: {appData.currentEventYear}; Event Key: {appData.currentEventKey}; Event Id (serverDV): {appData.currentEventID};</p>
            </Row>
            <Row>
                <Col><ProgressBar variant="success" now={progressBarStatus}/></Col>
            </Row>
            <Row>
                <Col md={8}>
                    <h3>Scan QR Codes to import data: {scannedState}</h3>
                    <Html5QrcodePlugin
                        fps={10}
                        qrbox={550}
                        disableFlip={false}
                        qrCodeSuccessCallback={onNewScanResult}
                    />
                </Col>
                <Col md={4}>
                    <p>scannedData:<br></br><textarea value={scannedData} className="resizable-textarea" /></p>
                    <p>SHA1:<br></br><textarea value={scannedDataSHA1} className="resizable-textarea" /></p>
                </Col>
            </Row>
        </Container>
    );
}

export default Dataimport;