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
        const botLocationViewSbEnum = ['None', 'Left', 'Center', 'Right']; // Scoring Blue, Spectator Red
        const botLocationViewSrEnum = ['None', 'Right', 'Center', 'Left']; // Scoring Red, Spectator Blue
        // leftFieldOrientation is used to determine mapping for Reef scouted data to reference to the field orientation
        //  and will be used to determine the mapping of the data to the database
        // For Reef Coral, 
        //  - Left: A->A, C->C, E->E, G->G, I->I, K->K (Scoring, Blue; Spectator, Red)
        //  - Right: A->G, C->I, E->K, G->A, I->C, K->E (Scoring, Red; Spectator, Blue)
        // For Reef Algea,
        //  - Left: A->A, B->B, C->C, D->D, E->E, F->F (Scoring, Blue; Spectator, Red)
        //  - Right: A->D, B->E, C->F, D->A, E->B, F->C (Scoring, Red; Spectator, Blue)
        let leftFieldOrientation = true;
        if ( (matchData.allianceLocation[0] === 'R' && matchData.fieldOrientation === "Scoring") ||
                (matchData.allianceLocation[0] === 'B' && matchData.fieldOrientation === "Spectator") ) {
            leftFieldOrientation = false;
            botLocationEnum = [...botLocationViewSrEnum]; // Scoring Red, Spectator Blue
        }
        else {
            leftFieldOrientation = true
            botLocationEnum = [...botLocationViewSbEnum]; // Scoring Blue, Spectator Red
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
        

    
        let autonActions = matchData.aP1 + matchData.aP2 + matchData.aP3 + matchData.aP4 + matchData.aP5 + matchData.aP6;

        // prepData.autonOne = matchData.aP1;
        // prepData.autonTwo = matchData.aP2;
        // prepData.autonThree = matchData.aP3;
        // prepData.autonFour = matchData.aP4;
        // prepData.autonFive = matchData.aP5;
        // prepData.autonSix = matchData.aP6;
        prepData.teleopNuetralAlliance = matchData.tPNA;
        prepData.teleopOAllianceNuetral = matchData.tPON;
        prepData.teleopOAllianceAlliance = matchData.tPOA;
        prepData.teleopMajority = matchData.tSM;
        prepData.teleopHalf = matchData.tSH;
        prepData.teleopShootLittle = matchData.tSL;
        prepData.teleopLoHuman = matchData.tFHM;
        prepData.teleopLiHuman = matchData.tFHL;
        prepData.teleopShift = matchData.tSh;
        prepData.teleopSteal = matchData.tDS;
        prepData.teleopBlock = matchData.tDB;
        prepData.postgameClimb = matchData.pCL;
        prepData.postgameTrench = matchData.pUT;
        prepData.postgameBump = matchData.pOB;
        prepData.postgameDisabled = matchData.pDB;
        prepData.postgameNoRobot = matchData.pNT;
        prepData.postgameStuck = matchData.pSFE;


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
            await axios.get(`${APP_DATABASE_URL}/matchData/2025/uniqueid/${scannedDataSHA1}`)
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
                await axios.post(`${APP_DATABASE_URL}/matchData/2025`,matchData,
                
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