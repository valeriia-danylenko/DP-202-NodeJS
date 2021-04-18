const {checkingNoDubles} = require('./database/db.js');

const checkRequiredParams = function(query) {
    const requiredParams = ['name', 'surname', 'login', 'password', 'email', 'dob'];
    let present = requiredParams.every(el => Object.keys(query).includes(el))
    return present
}

const validator = {
    'name' : {
        'min' : 1,
        'max' : 50
    },
    'surname' : {
        'min' : 1,
        'max' : 50
    },
    'login' : {
        'min' : 1,
        'max' : 50
    },
    'password' : {
        'min' : 6,
        'max' : 50
    },
    'email' : /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
    'dob' : /^[0-9]{4}-[0-9]{2}-[0-9]{2}$/g
}

const paramsValidator = async function (value, type){

    if (typeof value !== 'string') return false;

    if (type === 'name' || type === 'surname' || type === 'password') {
        if (!checkingLength(value, type)) return false; }
    if (type === 'login') {
        if (!checkingLength(value, type)) return false;
        const dublicates = await checkingNoDubles(value, type);
        return dublicates;}
     if (type === 'email') {
        if (!checkingRegex(value, type)) return false;
        const dublicates =  await checkingNoDubles(value, type);
        return dublicates;}
    if (type === 'dob') {
        if (!checkingRegex(value, type)) return false;
        if (!checkValidDOB(value)) return false; }
    return true
}


function checkingLength (value, type) {
    if (value.length < validator[type].min || value.length > validator[type].max) {
        return false;
    }
    return true
}

function checkingRegex (value, type) {
    if (!value.match(validator[type])) {
        return false;
    }
    return true;
}

function checkValidDOB (value) {
    const now = new Date();
    const minDate = now.toISOString().substring(0,10);
    const changedDate = value
    return changedDate < minDate;
}

module.exports.paramsValidator = paramsValidator;
module.exports.checkRequiredParams = checkRequiredParams;