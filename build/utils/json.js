"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.serialize = exports.parse = void 0;
const fs_1 = __importDefault(require("fs"));
const node_path_1 = __importDefault(require("node:path"));
/**
 * Parse items given in a .json file
 * @param {String} filePath - path to the .json file
 * If the file does not exist or it's content cannot be parsed as JSON data,
 * use the default data.
 * @param {Array} defaultArray - Content to be used when the .json file does not exists
 * @returns {Array} : the array that was parsed from the file (or defaultArray)
 */
function parse(filePath, defaultArray = []) {
    if (!fs_1.default.existsSync(filePath))
        return defaultArray;
    const fileData = fs_1.default.readFileSync(filePath, 'utf8');
    try {
        // parse() Throws a SyntaxError exception if the string to parse is not valid JSON.
        return JSON.parse(fileData);
    }
    catch (err) {
        return defaultArray;
    }
}
exports.parse = parse;
/**
 * Serialize the content of an Object within a file
 * @param {String} filePath - path to the .json file
 * @param {Array} object - Object to be written within the .json file.
 * Even if the file exists, its whole content is reset by the given object.
 */
function serialize(filePath, object) {
    const objectSerialized = JSON.stringify(object);
    createPotentialLastDirectory(filePath);
    fs_1.default.writeFileSync(filePath, objectSerialized);
}
exports.serialize = serialize;
/**
 *
 * @param {String} filePath - path to the .json file
 */
function createPotentialLastDirectory(filePath) {
    const pathToLastDirectory = filePath.substring(0, filePath.lastIndexOf(node_path_1.default.sep));
    if (fs_1.default.existsSync(pathToLastDirectory))
        return;
    fs_1.default.mkdirSync(pathToLastDirectory);
}
