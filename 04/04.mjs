import { getFileData } from "../utilities.mjs";
import { requiredPassportFields } from "./constants.mjs";

const dataFileLocation = "./passportdata.txt";
const fileData = getFileData(dataFileLocation);

const fileDataToDocumentObjects = (fileData) => {
  const regexBlankLine = /\r?\n\r?\n/;
  const documentStrings = fileData.split(regexBlankLine);
  const documentsList = documentStrings.map((docString) => {
    return docString
      .split(/\s/)
      .map((keyValueString) => keyValueString.split(":"))
      .reduce((acc, [key, value]) => {
        acc[key] = value;
        return acc;
      }, {});
  });
  return documentsList;
};

const documentIsPassport = (documentObject) => {
  let aRequiredFieldIsMissing;
  requiredPassportFields.forEach(({ code }) => {
    if (!documentObject.hasOwnProperty(code)) {
      aRequiredFieldIsMissing = true;
    }
  });
  return !aRequiredFieldIsMissing;
};

const allDocuments = fileDataToDocumentObjects(fileData);
const validDocuments = allDocuments.filter(documentIsPassport);

console.log("04a Answer:", validDocuments.length);
