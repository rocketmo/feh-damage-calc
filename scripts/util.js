/*
 * Utility functions
 */

 function allFalse(obj) {
     for (var i in obj) {
         if (obj[i] === true) return false;
     }
     return true;
 }

 // converts an array of strings to an object with the strings as fields
 function arrayToObject(array) {

     var obj = {};

     for (var i = 0; i < array.length; i++) {
         obj[array[i]] = true;
     }

     return obj;
 }

 // converts an object's fields into an array of strings
 function objectToArray(obj) {

     var arr = [];
     for (var key in obj) {
         arr.push(key);
     }
     return arr;
 }

 // checks if an object has no fields
 function objectIsEmpty(obj) {

     for (var key in obj) {
         if (obj.hasOwnProperty(key)) {
             return false;
         }
     }

     return true;
 }

 // limits number inputs
 // num is a number input, minNumber is the lower limit
 function limit(num, minNumber) {

     // check if value is outside of the limits
     if (!$.isNumeric(num.value) || num.value <= minNumber) {
         num.value = minNumber;
     } else if (num.id === "override-curr-hp") {
         if (num.value >= 100) {
             num.value = 100;
         } else if (Math.floor(num.value) !== num.value) {
             num.value = Math.floor(num.value);
         }
     } else if (num.value >= HIGHESTSTAT) {
         num.value = HIGHESTSTAT;
     } else if (Math.floor(num.value) !== num.value) {
         num.value = Math.floor(num.value);
     }
 }

 // rounds numbers up or down, rounds to closest int if the difference is less than 0.01
 // unrounded is the number to round, roundUp is true if we need to round up
 function roundNum(unrounded, roundUp) {

     if (roundUp) {
         if (unrounded - Math.floor(unrounded) < 0.01) {
             return Math.floor(unrounded);
         } else {
             return Math.ceil(unrounded);
         }
     } else if (Math.ceil(unrounded) - unrounded < 0.01) {
         return Math.ceil(unrounded);
     }

     return Math.floor(unrounded);
 }

 // checks if the given number is within 0.01 of an integer, if it is, return that integer; otherwise just return the given number
 function checkRoundError(num) {

     if (Math.ceil(num) - num < 0.01) {
         return Math.ceil(num);
     } else if (num - Math.floor(num) < 0.01) {
         return Math.floor(num);
     }

     return num;
 }
