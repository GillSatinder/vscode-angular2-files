"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toCamelCase = (input) => input.replace(/-([a-z])/ig, (all, letter) => letter.toUpperCase());
exports.toTileCase = (str) => str.replace(/\w\S*/g, txt => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
exports.toUpperCase = (input) => exports.toCamelCase(input.charAt(0).toUpperCase() + input.slice(1));
function toModel(input) {
    const newLine = exports.toCamelCase(input);
    const capitalInitialPart = newLine.charAt(0).toUpperCase();
    const wholeString = capitalInitialPart + newLine.slice(1);
    return wholeString;
    // if (input.includes('-')) { 
    //   const initialPart = input.substring(0, input.indexOf('-'));
    //   const capitalInitialPart = initialPart.charAt(0).toUpperCase();
    //   const wholeString = capitalInitialPart + initialPart.slice(1);
    //   return wholeString;
    // // tslint:disable-next-line:no-else-after-return
    // } else {
    //   const ip = input.charAt(0).toUpperCase();
    //   return ip + input.slice(1);
    // }
}
exports.toModel = toModel;
function toServiceName(input) {
    const newLine = exports.toCamelCase(input);
    const capitalInitialPart = newLine.charAt(0).toUpperCase();
    const wholeString = capitalInitialPart + newLine.slice(1);
    return wholeString + 'Service';
}
exports.toServiceName = toServiceName;
function toServiceNameVariable(input) {
    const newLine = exports.toCamelCase(input);
    const capitalInitialPart = newLine.charAt(0).toLowerCase();
    const wholeString = capitalInitialPart + newLine.slice(1);
    return wholeString + 'Service';
}
exports.toServiceNameVariable = toServiceNameVariable;
function toSmallModelName(input) {
    const initialPart = input.substring(0, input.indexOf('-'));
    const capitalInitialPart = initialPart.charAt(0).toUpperCase();
    const wholeString = capitalInitialPart + initialPart.slice(1);
    return wholeString.toLowerCase();
}
exports.toSmallModelName = toSmallModelName;
//# sourceMappingURL=formatting.js.map