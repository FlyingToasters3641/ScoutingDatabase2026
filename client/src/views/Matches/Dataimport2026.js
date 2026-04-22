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

        prepData.teleOpPassNeutralAlliance = matchData.tPNA;
        prepData.teleOpShootMajority = matchData.tSM;
        prepData.teleOpShootHalf = matchData.tSH;
        prepData.teleOpShootLittle = matchData.tSL;

        if (matchData.pUT === true) {
            prepData.postUnderTrench = 1;
        }
        else {
            prepData.postUnderTrench = 0;
        }

        if (matchData.pUB === true) {
            prepData.postOverBump = 1;
        }
        else {
            prepData.postOverBump = 0;
        }

        if (matchData.pDB === true) {
            prepData.postDisabledMechanically = 1;
        }
        else {
            prepData.postDisabledMechanically = 0;
        }

        if (matchData.pNT === true) {
            prepData.postNotThere = 1;
        }
        else {
            prepData.postNotThere = 0;
        }   

        if (matchData.pSFE === true) {
            prepData.postStuckFieldElement = 1;
        }
        else {
            prepData.postStuckFieldElement = 0;
        }
        prepData.uniqueId = scannedDataSHA1;

        prepData.teleOpDefenceBlocking = matchData.tDB;


        if(matchData.v === '2026.2.0') {

            if (matchData.aNZ === true) {
                prepData.autonNeutralZone = 1;
            }
            else {
                prepData.autonNeutralZone = 0;
            }

            if (matchData.aCL === true) {
                prepData.autonClimbLevel = 1;
            }
            else {
                prepData.autonClimbLevel = 0;
            }

            if (matchData.aOP === true) {
                prepData.autonOutpost = 1;
            }
            else {
                prepData.autonOutpost = 0;
            }
            
            if (matchData.aDP === true) {
                prepData.autonDepot = 1;
            }
            else {
                prepData.autonDepot = 0;
            }

            if (matchData.aIN === true) {
                prepData.autonIntakes = 1;
            }
            else {
                prepData.autonIntakes = 0;
            }

            prepData.autonShootsFuel = matchData.aSF;
            prepData.teleOpCorralls = matchData.tPC;


            if (matchData.tFH === 1) {
                prepData.teleOpFeedHumanMajority = 1;
            }
            else {
                prepData.teleOpFeedHumanMajority = 0;
            }

            if (matchData.pCL === 1) {
                prepData.postClimbLevelOneLeft = 0;
                prepData.postClimbLevelTwoLeft = 0;
                prepData.postClimbLevelThreeLeft = 1;
            }
            else if (matchData.pCL === 2) {
                prepData.postClimbLevelOneLeft = 0;
                prepData.postClimbLevelTwoLeft = 1;
                prepData.postClimbLevelThreeLeft = 0;
            }
            else if (matchData.pCL === 3) {
                prepData.postClimbLevelOneLeft = 1;
                prepData.postClimbLevelTwoLeft = 0;
                prepData.postClimbLevelThreeLeft = 0;
            }
            else {
                prepData.postClimbLevelOneLeft = 0;
                prepData.postClimbLevelTwoLeft = 0;
                prepData.postClimbLevelThreeLeft = 0;
            }

            if (matchData.pPB === true) {
                prepData.postPartBroken = 1;
            }
            else {
                prepData.postPartBroken = 0;
            }

            if (matchData.tPD === true) {
                prepData.teleOpDefened = 1;
            }
            else {
                prepData.teleOpDefened = 0;
            }

        }
        else {
            if (matchData.aP1 === 1) {
                prepData.autonOne = 'Shoot';
            }
            else if (matchData.aP1 === 2) {
                prepData.autonOne = 'Passing';
            }
            else if (matchData.aP1 === 3) {
                prepData.autonOne = 'Outpost';
            }
            else if (matchData.aP1 === 4) {
                prepData.autonOne = 'Depot';
            }
            else if (matchData.aP1 === 5) {
                prepData.autonOne = 'Climb';
            }
            else if (matchData.aP1 === 6) {
                prepData.autonOne = 'All of Neutral Zone';
            }
            else if (matchData.aP1 === 7) {
                if ((matchData.allianceLocation[0] === 'R' && matchData.fieldOrientation === "Scoring") ||
                    (matchData.allianceLocation[0] === 'B' && matchData.fieldOrientation === "Spectator")) {
                    prepData.autonOne = 'Left Neutral Zone';
                }
                else {
                    prepData.autonOne = 'Right Neutral Zone';
                }
            }
            else if (matchData.aP1 === 8) {
                if ((matchData.allianceLocation[0] === 'R' && matchData.fieldOrientation === "Scoring") ||
                    (matchData.allianceLocation[0] === 'B' && matchData.fieldOrientation === "Spectator")) {
                    prepData.autonOne = 'Right Neutral Zone';
                }
                else {
                    prepData.autonOne = 'Left Neutral Zone';
                }
            }
            else {
                prepData.autonOne = 'None';
            }

            if (matchData.aP2 === 1) {
                prepData.autonTwo = 'Shoot';
            }
            else if (matchData.aP2 === 2) {
                prepData.autonTwo = 'Passing';
            }
            else if (matchData.aP2 === 3) {
                prepData.autonTwo = 'Outpost';
            }
            else if (matchData.aP2 === 4) {
                prepData.autonTwo = 'Depot';
            }
            else if (matchData.aP2 === 5) {
                prepData.autonTwo = 'Climb';
            }
            else if (matchData.aP2 === 6) {
                prepData.autonTwo = 'All of Neutral Zone';
            }
            else if (matchData.aP2 === 7) {
                if ((matchData.allianceLocation[0] === 'R' && matchData.fieldOrientation === "Spectator") ||
                    (matchData.allianceLocation[0] === 'B' && matchData.fieldOrientation === "Scoring")) {
                    prepData.autonTwo = 'Left Neutral Zone';
                }
                else {
                    prepData.autonTwo = 'Right Neutral Zone';
                }
            }
            else if (matchData.aP2 === 8) {
                if ((matchData.allianceLocation[0] === 'R' && matchData.fieldOrientation === "Spectator") ||
                    (matchData.allianceLocation[0] === 'B' && matchData.fieldOrientation === "Scoring")) {
                    prepData.autonTwo = 'Right Neutral Zone';
                }
                else {
                    prepData.autonTwo = 'Left Neutral Zone';
                }
            }
            else {
                prepData.autonTwo = 'None';
            }

            if (matchData.aP3 === 1) {
                prepData.autonThree = 'Shoot';
            }
            else if (matchData.aP3 === 2) {
                prepData.autonThree = 'Passing';
            }
            else if (matchData.aP3 === 3) {
                prepData.autonThree = 'Outpost';
            }
            else if (matchData.aP3 === 4) {
                prepData.autonThree = 'Depot';
            }
            else if (matchData.aP3 === 5) {
                prepData.autonThree = 'Climb';
            }
            else if (matchData.aP3 === 6) {
                prepData.autonThree = 'All of Neutral Zone';
            }
            else if (matchData.aP3 === 7) {
                if ((matchData.allianceLocation[0] === 'R' && matchData.fieldOrientation === "Spectator") ||
                    (matchData.allianceLocation[0] === 'B' && matchData.fieldOrientation === "Scoring")) {
                    prepData.autonThree = 'Left Neutral Zone';
                }
                else {
                    prepData.autonThree = 'Right Neutral Zone';
                }
            }
            else if (matchData.aP3 === 8) {
                if ((matchData.allianceLocation[0] === 'R' && matchData.fieldOrientation === "Spectator") ||
                    (matchData.allianceLocation[0] === 'B' && matchData.fieldOrientation === "Scoring")) {
                    prepData.autonThree = 'Right Neutral Zone';
                }
                else {
                    prepData.autonThree = 'Left Neutral Zone';
                }
            }
            else {
                prepData.autonThree = 'None';
            }

            if (matchData.aP4 === 1) {
                prepData.autonFour = 'Shoot';
            }
            else if (matchData.aP4 === 2) {
                prepData.autonFour = 'Passing';
            }
            else if (matchData.aP4 === 3) {
                prepData.autonFour = 'Outpost';
            }
            else if (matchData.aP4 === 4) {
                prepData.autonFour = 'Depot';
            }
            else if (matchData.aP4 === 5) {
                prepData.autonFour = 'Climb';
            }
            else if (matchData.aP4 === 6) {
                prepData.autonFour = 'All of Neutral Zone';
            }
            else if (matchData.aP4 === 7) {
                if ((matchData.allianceLocation[0] === 'R' && matchData.fieldOrientation === "Spectator") ||
                    (matchData.allianceLocation[0] === 'B' && matchData.fieldOrientation === "Scoring")) {
                    prepData.autonFour = 'Left Neutral Zone';
                }
                else {
                    prepData.autonFour = 'Right Neutral Zone';
                }
            }
            else if (matchData.aP4 === 8) {
                if ((matchData.allianceLocation[0] === 'R' && matchData.fieldOrientation === "Spectator") ||
                    (matchData.allianceLocation[0] === 'B' && matchData.fieldOrientation === "Scoring")) {
                    prepData.autonFour = 'Right Neutral Zone';
                }
                else {
                    prepData.autonFour = 'Left Neutral Zone';
                }
            }
            else {
                prepData.autonFour = 'None';
            }
            
            if (matchData.aP5 === 1) {
                prepData.autonFive = 'Shoot';
            }
            else if (matchData.aP5 === 2) {
                prepData.autonFive = 'Passing';
            }
            else if (matchData.aP5 === 3) {
                prepData.autonFive = 'Outpost';
            }
            else if (matchData.aP5 === 4) {
                prepData.autonFive = 'Depot';
            }
            else if (matchData.aP5 === 5) {
                prepData.autonFive = 'Climb';
            }
            else if (matchData.aP5 === 6) {
                prepData.autonFive = 'All of Neutral Zone';
            }
            else if (matchData.aP5 === 7) {
                if ((matchData.allianceLocation[0] === 'R' && matchData.fieldOrientation === "Spectator") ||
                    (matchData.allianceLocation[0] === 'B' && matchData.fieldOrientation === "Scoring")) {
                    prepData.autonFive = 'Left Neutral Zone';
                }
                else {
                    prepData.autonFive = 'Right Neutral Zone';
                }
            }
            else if (matchData.aP5 === 8) {
                if ((matchData.allianceLocation[0] === 'R' && matchData.fieldOrientation === "Spectator") ||
                    (matchData.allianceLocation[0] === 'B' && matchData.fieldOrientation === "Scoring")) {
                    prepData.autonFive = 'Right Neutral Zone';
                }
                else {
                    prepData.autonFive = 'Left Neutral Zone';
                }
            }
            else {
                prepData.autonFive = 'None';
            }

            if (matchData.aP6 === 1) {
                prepData.autonSix = 'Shoot';
            }
            else if (matchData.aP6 === 2) {
                prepData.autonSix = 'Passing';
            }
            else if (matchData.aP6 === 3) {
                prepData.autonSix = 'Outpost';
            }
            else if (matchData.aP6 === 4) {
                prepData.autonSix = 'Depot';
            }
            else if (matchData.aP6 === 5) {
                prepData.autonSix = 'Climb';
            }
            else if (matchData.aP6 === 6) {
                prepData.autonSix = 'All of Neutral Zone';
            }
            else if (matchData.aP6 === 7) {
                if ((matchData.allianceLocation[0] === 'R' && matchData.fieldOrientation === "Spectator") ||
                    (matchData.allianceLocation[0] === 'B' && matchData.fieldOrientation === "Scoring")) {
                    prepData.autonSix = 'Left Neutral Zone';
                }
                else {
                    prepData.autonSix = 'Right Neutral Zone';
                }
            }
            else if (matchData.aP6 === 8) {
                if ((matchData.allianceLocation[0] === 'R' && matchData.fieldOrientation === "Spectator") ||
                    (matchData.allianceLocation[0] === 'B' && matchData.fieldOrientation === "Scoring")) {
                    prepData.autonSix = 'Right Neutral Zone';
                }
                else {
                    prepData.autonSix = 'Left Neutral Zone';
                }
            }
            else {
                prepData.autonSix = 'None';
            }

            prepData.autonPath = prepData.autonOne + ', ' + prepData.autonTwo + ', ' + prepData.autonThree + ', ' + prepData.autonFour + ', ' + prepData.autonFive + ', ' + prepData.autonSix;

            prepData.teleOpPassOpponentNeutral = matchData.tPON;
            prepData.teleOpPassOpponentAlliance = matchData.tPOA;

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

            if (matchData.pCL === 1) {
                prepData.postClimbLevelOneRight = 0;
                prepData.postClimbLevelOneCenter = 0;
                prepData.postClimbLevelOneLeft = 0;
                prepData.postClimbLevelTwoRight = 0;
                prepData.postClimbLevelTwoCenter = 0;
                prepData.postClimbLevelTwoLeft = 0;
                prepData.postClimbLevelThreeRight = 0;
                prepData.postClimbLevelThreeCenter = 0;
                prepData.postClimbLevelThreeLeft = 1;
            }
            else if (matchData.pCL === 2) {
                prepData.postClimbLevelOneRight = 0;
                prepData.postClimbLevelOneCenter = 0;
                prepData.postClimbLevelOneLeft = 0;
                prepData.postClimbLevelTwoRight = 0;
                prepData.postClimbLevelTwoCenter = 0;
                prepData.postClimbLevelTwoLeft = 0;
                prepData.postClimbLevelThreeRight = 0;
                prepData.postClimbLevelThreeCenter = 1;
                prepData.postClimbLevelThreeLeft = 0;
            }
            else if (matchData.pCL === 3) {
                prepData.postClimbLevelOneRight = 0;
                prepData.postClimbLevelOneCenter = 0;
                prepData.postClimbLevelOneLeft = 0;
                prepData.postClimbLevelTwoRight = 0;
                prepData.postClimbLevelTwoCenter = 0;
                prepData.postClimbLevelTwoLeft = 0;
                prepData.postClimbLevelThreeRight = 1;
                prepData.postClimbLevelThreeCenter = 0;
                prepData.postClimbLevelThreeLeft = 0;
            }
            else if (matchData.pCL === 4) {
                prepData.postClimbLevelOneRight = 0;
                prepData.postClimbLevelOneCenter = 0;
                prepData.postClimbLevelOneLeft = 0;
                prepData.postClimbLevelTwoRight = 0;
                prepData.postClimbLevelTwoCenter = 0;
                prepData.postClimbLevelTwoLeft = 1;
                prepData.postClimbLevelThreeRight = 0;
                prepData.postClimbLevelThreeCenter = 0;
                prepData.postClimbLevelThreeLeft = 0;
            }
            else if (matchData.pCL === 5) {
                prepData.postClimbLevelOneRight = 0;
                prepData.postClimbLevelOneCenter = 0;
                prepData.postClimbLevelOneLeft = 0;
                prepData.postClimbLevelTwoRight = 0;
                prepData.postClimbLevelTwoCenter = 1;
                prepData.postClimbLevelTwoLeft = 0;
                prepData.postClimbLevelThreeRight = 0;
                prepData.postClimbLevelThreeCenter = 0;
                prepData.postClimbLevelThreeLeft = 0;
            }  
            else if (matchData.pCL === 6) {
                prepData.postClimbLevelOneRight = 0;
                prepData.postClimbLevelOneCenter = 0;
                prepData.postClimbLevelOneLeft = 0;
                prepData.postClimbLevelTwoRight = 1;
                prepData.postClimbLevelTwoCenter = 0;
                prepData.postClimbLevelTwoLeft = 0;
                prepData.postClimbLevelThreeRight = 0;
                prepData.postClimbLevelThreeCenter = 0;
                prepData.postClimbLevelThreeLeft = 0;
            }
            else if (matchData.pCL === 7) {
                prepData.postClimbLevelOneRight = 0;
                prepData.postClimbLevelOneCenter = 0;
                prepData.postClimbLevelOneLeft = 1;
                prepData.postClimbLevelTwoRight = 0;
                prepData.postClimbLevelTwoCenter = 0;
                prepData.postClimbLevelTwoLeft = 0;
                prepData.postClimbLevelThreeRight = 0;
                prepData.postClimbLevelThreeCenter = 0;
                prepData.postClimbLevelThreeLeft = 0;
            }
            else if (matchData.pCL === 8) {
                prepData.postClimbLevelOneRight = 0;
                prepData.postClimbLevelOneCenter = 1;
                prepData.postClimbLevelOneLeft = 0;
                prepData.postClimbLevelTwoRight = 0;
                prepData.postClimbLevelTwoCenter = 0;
                prepData.postClimbLevelTwoLeft = 0;
                prepData.postClimbLevelThreeRight = 0;
                prepData.postClimbLevelThreeCenter = 0;
                prepData.postClimbLevelThreeLeft = 0;
            }
            else if (matchData.pCL === 9) {
                prepData.postClimbLevelOneRight = 1;
                prepData.postClimbLevelOneCenter = 0;
                prepData.postClimbLevelOneLeft = 0;
                prepData.postClimbLevelTwoRight = 0;
                prepData.postClimbLevelTwoCenter = 0;
                prepData.postClimbLevelTwoLeft = 0;
                prepData.postClimbLevelThreeRight = 0;
                prepData.postClimbLevelThreeCenter = 0;
                prepData.postClimbLevelThreeLeft = 0;
            }  
            else {
                prepData.postClimbLevelOneRight = 0;
                prepData.postClimbLevelOneCenter = 0;
                prepData.postClimbLevelOneLeft = 0;
                prepData.postClimbLevelTwoRight = 0;
                prepData.postClimbLevelTwoCenter = 0;
                prepData.postClimbLevelTwoLeft = 0;
                prepData.postClimbLevelThreeRight = 0;
                prepData.postClimbLevelThreeCenter = 0;
                prepData.postClimbLevelThreeLeft = 0;
            }
        }



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