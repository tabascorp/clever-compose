import { placeholder } from '../config/constants';

function generateArrayOf(count: number, entry: string): Array<string> {
  return Array.from({ length: count }, () => entry);
}

export function generateArrayOfPlaceholders(count: number): Array<string> {
  return generateArrayOf(count, `${placeholder}`);
}

export function generateArrayOfPlaceholdersWithColon(count: number): Array<string> {
  return generateArrayOf(count, `${placeholder}:`);
}

export function generateArrayOfMapPlaceholders(count: number): Array<string> {
  return generateArrayOf(count, `${placeholder}:${placeholder}`);
}

export function generateArrayOfKeyPlaceholders(count: number): Array<string> {
  return generateArrayOf(count, `KEY=${placeholder}`);
}
