import { getFileData } from "../utilities.mjs";

const requiredFields = [
  {
    code: "byr",
    fieldName: "Birth Year",
  },
  {
    code: "iyr",
    fieldName: "Issue Year",
  },
  {
    code: "eyr",
    fieldName: "Expiration Year",
  },
  {
    code: "hgt",
    fieldName: "Height",
  },
  {
    code: "hcl",
    fieldName: "Hair Color",
  },
  {
    code: "ecl",
    fieldName: "Eye Color",
  },
  {
    code: "pid",
    fieldName: "Passport ID",
  },
];
// Not-required fields.
// {
//   code: "cid",
//   fieldName: "Country ID",
// },

const requiredFieldKeys = requiredFields.map(({ code }) => code);

const dataFileLocation = "./passportdata.txt";
// const dataFileLocation = "./short-example-data.txt"; //TODO switch data file back
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

const filterValidDocuments = (documentObject) => {
  let aRequiredFieldIsMissing;
  requiredFields.forEach(({ code }) => {
    if (!documentObject.hasOwnProperty(code)) {
      aRequiredFieldIsMissing = true;
    }
  });
  return !aRequiredFieldIsMissing;
};

const allDocuments = fileDataToDocumentObjects(fileData);
const validDocuments = allDocuments.filter(filterValidDocuments);

console.log("04a Answer:", validDocuments.length);
