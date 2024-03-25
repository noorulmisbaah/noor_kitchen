const fs = require('fs');

/**
 * Reads the content of a JSON file
 * 
 * @function readJSONFile
 * @param {String} path The path to the file
 * @returns The content of the JSON file
 * @description Reads the content of a JSON file and returns the content of the file. undefined is returned if
 * either the file path is invalid or the JSON file could not be read.
 * @example
 * var fileContent = readJSONFile(the_file_path); //returns the content of the JSON file
 */
function readJSONFile(path) {
    if (!fs.existsSync(path))
        return undefined;
    try {
        return JSON.parse(fs.readFileSync(path));
    } catch (e) {
        return undefined;
    }
}

/**
 * Writes a JSON file
 * 
 * @function writeJSONFile
 * @param {String} path The path to write the file
 * @param {String} content The content of the file
 * @description Writes a JSON file. An error is thrown if the file could not be written.
 */

function writeJSONFile(path, content) {
    fs.writeFile(path, JSON.stringify(content, null, '\t'), (err) => {
        if (err) {
            throw new Error('The file could not be written');
        }
    });
}

/**
 * Creates a directory
 * 
 * @function createDirectory
 * @param {String} path The path where the directory is to be created
 * @param {String} name Optional JSON filename
 * @param {Object} content The content of the JSON file
 * @description Creates a new directory at the a specified path. The optional second argument specifies the JSON 
 * filename. The third argument specifies the content of the JSON. It has to be of the type 'object'. An error is thrown if something went wrong and the directory is not created.
 */
function createDirectory(path, name = '', content) {
    fs.mkdir(path, (err) => {
        if (err)
            throw new Error(`The directory could not be created at '${path}'.`);
        if ((name) && (typeof content === 'object'))
            writeJSONFile(`${path}/${name}.json`, content);
        else {
            return;
        }
    });
}

/**
 * Reverses the elements in an array
 * 
 * @function reverseArrayContent
 * @param {Array} arr 
 * @returns The reversed elements of the array
 * @description Reverses the element of an array. Instead of mutating the original array, a new array is returned
 * containing the elements of the array passed to the function in a reversed way.
 * @example
 * var numbers = [2, 5, 6, 9];
 * var reversed = reverseArrayContent(numbers);
 * console.log(reversed) //prints 9, 6, 5, 2
 */
function reverseArrayContent(arr) {
    if (!Array.isArray(arr))
        return undefined;
    var newArray = [];

    for (var i = arr.length - 1, c = 0; i >= 0; i--, c++)
        newArray[c] = arr[i];
    return newArray;
}

module.exports = { 
    readJSONFile,
    writeJSONFile,
    createDirectory,
    reverseArrayContent
};