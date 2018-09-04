"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toCamelCase = (input) => input.replace(/-([a-z])/ig, (all, letter) => letter.toUpperCase());
exports.toTileCase = (str) => str.replace(/\w\S*/g, txt => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
exports.toUpperCase = (input) => exports.toCamelCase(input.charAt(0).toUpperCase() + input.slice(1));
// export const toModel = (input: string) => input.substring(0, input.indexOf('-')).charAt(0).toUpperCase() + input.substring(0, input.indexOf('-')).slice(1); 
function toModel(input) {
    const initialPart = input.substring(0, input.indexOf('-'));
    const capitalInitialPart = initialPart.charAt(0).toUpperCase();
    const wholeString = capitalInitialPart + initialPart.slice(1);
    return wholeString;
}
exports.toModel = toModel;
function toServiceName(input) {
    const initialPart = input.substring(0, input.indexOf('-'));
    const capitalInitialPart = initialPart.charAt(0).toUpperCase();
    const wholeString = capitalInitialPart + initialPart.slice(1);
    return wholeString + 'Service';
}
exports.toServiceName = toServiceName;
function toServiceNameVariable(input) {
    const initialPart = input.substring(0, input.indexOf('-'));
    const capitalInitialPart = initialPart.charAt(0).toLowerCase();
    const wholeString = capitalInitialPart + initialPart.slice(1);
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