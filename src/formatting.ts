export const toCamelCase = (input: string) => input.replace(/-([a-z])/ig, (all, letter) => letter.toUpperCase());

export const toTileCase = (str: string) => str.replace(/\w\S*/g, txt => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());

export const toUpperCase = (input: string) => toCamelCase(input.charAt(0).toUpperCase() + input.slice(1));

export function toModel(input: string) { 

  const newLine = toCamelCase(input);
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

export function toServiceName(input: string) {
  const newLine = toCamelCase(input);
  const capitalInitialPart = newLine.charAt(0).toUpperCase();
  const wholeString = capitalInitialPart + newLine.slice(1);
  return wholeString + 'Service';

}

export function toServiceNameVariable(input: string) {

  const newLine = toCamelCase(input);
  const capitalInitialPart = newLine.charAt(0).toLowerCase();
  const wholeString = capitalInitialPart + newLine.slice(1);
  return wholeString + 'Service';
}

export function toSmallModelName(input: string) {
  const initialPart = input.substring(0, input.indexOf('-'));
  const capitalInitialPart = initialPart.charAt(0).toUpperCase();
  const wholeString = capitalInitialPart + initialPart.slice(1);
  return wholeString.toLowerCase();
}

