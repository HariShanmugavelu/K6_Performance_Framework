import { check, fail } from 'k6';
const slice = Array.prototype.slice;
function extend(obj) {
    slice.call(arguments, 1).forEach(function (props) {
        let prop;
        for(prop in props) {
            obj[prop]=props[prop];
        }

    });
    return obj;
};

function replace(str, values) {
    let name, value;
    for(name in values) {
        value = values[name];
        str = str.replace(new RegExp(':' + name, 'g'), value);
    }
    return str;
};

function generateLowercaseString(length) {
    return Math.random().toString(36).substr(2, length).replace(/\d/g, 'x');
};

function isUndefined(data) {
    return (data === undefined);
};

function logDataExist(objectName, totalCount) {
    if(totalCount === 0) {
      console.log('No data exists for an object with name: '+objectName);
    }
};

function abortIfNoData(actualCount, expectedCount) {
    if(actualCount < expectedCount) {
        fail("Object data os less than expected, Hence terminating the script")
    }
};

module.exports = {extend, replace, generateLowercaseString, isUndefined, logDataExist, abortIfNoData };