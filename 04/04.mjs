import { getFileData } from "../utilities.mjs";
import {
  fileDataToDocumentObjects,
  documentIsPassport,
} from "./functions-for-documents.mjs";

// Import puzzle input data.
const dataFileLocation = "./passportdata.txt";
const fileData = getFileData(dataFileLocation);

// Count valid passports.
const allDocuments = fileDataToDocumentObjects(fileData);
const validPassports = allDocuments.filter(documentIsPassport);
const puzzle04bAnswer = validPassports.length; // Number of valid passports.
console.log(
  "04b Answer:",
  `${puzzle04bAnswer} valid passports out of ${allDocuments.length} documents`
);
