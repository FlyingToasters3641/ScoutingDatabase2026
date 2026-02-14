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
    startTrenchSpectator: DataTypes.INTEGER,
    startBumpSpectator: DataTypes.INTEGER,
    startHub: DataTypes.INTEGER,
    startBumpTable: DataTypes.INTEGER,
    startTrenchTable: DataTypes.INTEGER,
    startPreload: DataTypes.INTEGER,

    // Auton (use 'auton' prefix)
    autonPath: DataTypes.STRING,

    // TeleOp (use 'teleOp' prefix)
    teleOpPassNeutralAlliance: DataTypes.INTEGER,
    teleOpPassOpponentNeutral: DataTypes.INTEGER,
    teleOpPassOpponentAlliance: DataTypes.INTEGER,
    teleOpShootMajority: DataTypes.INTEGER,
    teleOpShootHalf: DataTypes.INTEGER,
    teleOpShootLittle: DataTypes.INTEGER,
    teleOpFeedHuman: DataTypes.INTEGER, //Robot feeds fuel to human player 0=None, 1=little, 2=lots
    teleOpShiftOne: DataTypes.INTEGER,
    teleOpShiftTwo: DataTypes.INTEGER,
    teleOpDefenceStealling: DataTypes.INTEGER,
    teleOpDefenceBlocking: DataTypes.INTEGER,

    // Post match (use 'post' prefix)
    postClimbLevelOneSpectator: DataTypes.INTEGER,
    postClimbLevelOneCenter: DataTypes.INTEGER,
    postClimbLevelOneTable: DataTypes.INTEGER,
    postClimbLevelTwoSpectator: DataTypes.INTEGER,
    postClimbLevelTwoCenter: DataTypes.INTEGER,
    postClimbLevelTwoTable: DataTypes.INTEGER,
    postClimbLevelThreeSpectator: DataTypes.INTEGER,
    postClimbLevelThreeCenter: DataTypes.INTEGER,
    postClimbLevelThreeTable: DataTypes.INTEGER,
    postUnderTrench: DataTypes.INTEGER,
    postOverBump: DataTypes.INTEGER,
    postDisabledMechanically: DataTypes.INTEGER,
    postNotThere: DataTypes.INTEGER,
    postStuckFieldElement: DataTypes.INTEGER

}, { sequelize, modelName: 'matchdata2026' });

module.exports = MatchData2026;