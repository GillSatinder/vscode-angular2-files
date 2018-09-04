export const toCamelCase = (input: string) => input.replace(/-([a-z])/ig, (all, letter) => letter.toUpperCase());

export const toTileCase = (str: string) => str.replace(/\w\S*/g, txt => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());

export const toUpperCase = (input: string) => toCamelCase(input.charAt(0).toUpperCase() + input.slice(1));


// export const toModel = (input: string) => input.substring(0, input.indexOf('-')).charAt(0).toUpperCase() + input.substring(0, input.indexOf('-')).slice(1); 

export function toModel(input: string) {
  const initialPart = input.substring(0, input.indexOf('-'));
  const capitalInitialPart = initialPart.charAt(0).toUpperCase();
  const wholeString = capitalInitialPart + initialPart.slice(1);
  return wholeString;
}

export function toServiceName(input: string) {
  const initialPart = input.substring(0, input.indexOf('-'));
  const capitalInitialPart = initialPart.charAt(0).toUpperCase();
  const wholeString = capitalInitialPart + initialPart.slice(1);
  return wholeString + 'Service';
}

export function toServiceNameVariable(input: string) {
  const initialPart = input.substring(0, input.indexOf('-'));
  const capitalInitialPart = initialPart.charAt(0).toLowerCase();
  const wholeString = capitalInitialPart + initialPart.slice(1);
  return wholeString + 'Service';
}

export function toSmallModelName(input: string) {
    const initialPart = input.substring(0, input.indexOf('-'));
    const capitalInitialPart = initialPart.charAt(0).toUpperCase();
    const wholeString = capitalInitialPart + initialPart.slice(1);
  return wholeString.toLowerCase();
}

