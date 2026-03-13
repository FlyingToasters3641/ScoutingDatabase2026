const { Model, DataTypes } = require('sequelize');
const sequelize = require('../database'); // Adjust the path as needed


class MatchData2026 extends Model {}

// Changes
// v1: Initial version
MatchData2026.init({
    // General match info
    schemaVersion: DataTypes.STRING,
    scouterName: DataTypes.STRING,
    matchNumber: DataTypes.INTEGER,
    teamNumber: DataTypes.INTEGER,
    allianceLocation: DataTypes.STRING,
    eventKey: DataTypes.STRING,
    matchKey: DataTypes.STRING,
    event_id: DataTypes.INTEGER,
    uniqueId: DataTypes.STRING,
    fieldOrientation: DataTypes.STRING,


    // Prematch (use 'start' prefix)
    startTrenchLeft: DataTypes.INTEGER,
    startBumpLeft: DataTypes.INTEGER,
    startHub: DataTypes.INTEGER,
    startBumpRight: DataTypes.INTEGER,
    startTrenchRight: DataTypes.INTEGER,
    startPreload: DataTypes.INTEGER,

    // Auton (use 'auton' prefix)
    autonPath: DataTypes.STRING,
    autonOne: DataTypes.STRING,
    autonTwo: DataTypes.STRING,
    autonThree: DataTypes.STRING,
    autonFour: DataTypes.STRING,
    autonFive: DataTypes.STRING,
    autonSix: DataTypes.STRING,

    // TeleOp (use 'teleop' prefix)
    teleOpPassNeutralAlliance: DataTypes.INTEGER,
    teleOpPassOpponentNeutral: DataTypes.INTEGER,
    teleOpPassOpponentAlliance: DataTypes.INTEGER,
    teleOpShootMajority: DataTypes.INTEGER,
    teleOpShootHalf: DataTypes.INTEGER,
    teleOpShootLittle: DataTypes.INTEGER,
    teleOpFeedHumanMajority: DataTypes.INTEGER,
    teleOpFeedHumanLittle: DataTypes.INTEGER,
    teleOpShiftOne: DataTypes.INTEGER,
    teleOpShiftTwo: DataTypes.INTEGER,
    teleOpDefenceStealling: DataTypes.INTEGER,
    teleOpDefenceBlocking: DataTypes.INTEGER,

    // Post match (use 'post' prefix)
    postClimbLevelOneRight: DataTypes.INTEGER,
    postClimbLevelOneCenter: DataTypes.INTEGER,
    postClimbLevelOneLeft: DataTypes.INTEGER,
    postClimbLevelTwoRight: DataTypes.INTEGER,
    postClimbLevelTwoCenter: DataTypes.INTEGER,
    postClimbLevelTwoLeft: DataTypes.INTEGER,
    postClimbLevelThreeRight: DataTypes.INTEGER,
    postClimbLevelThreeCenter: DataTypes.INTEGER,
    postClimbLevelThreeLeft: DataTypes.INTEGER,
    postUnderTrench: DataTypes.INTEGER,
    postOverBump: DataTypes.INTEGER,
    postDisabledMechanically: DataTypes.INTEGER,
    postNotThere: DataTypes.INTEGER,
    postStuckFieldElement: DataTypes.INTEGER,
    postPartBroken: DataTypes.INTEGER,

}, { sequelize, modelName: 'matchdata2026' });

module.exports = MatchData2026;