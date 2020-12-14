import { requiredPassportFields } from "./constants.mjs";

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

export { fileDataToDocumentObjects, documentIsPassport };
