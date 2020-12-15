import { getFileData } from "../utilities";
import {
  fileDataToDocumentObjects,
  documentIsPassport,
} from "./functions-for-documents";

// Import puzzle input data.
const dataFileLocation: string = "./passportdata.txt";
const fileData: string = getFileData(dataFileLocation);

// Count valid passports.
const allDocuments: object[] = fileDataToDocumentObjects(fileData);
const validPassports: object[] = allDocuments.filter(documentIsPassport);
const puzzle04bAnswer: number = validPassports.length; // Number of valid passports.
console.log(
  "04b Answer:",
  `${puzzle04bAnswer} valid passports out of ${allDocuments.length} documents`
);
