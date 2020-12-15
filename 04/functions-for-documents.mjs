import { allDocumentFields } from "./constants.mjs";

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
  let isDocumentAValidPassport;

  // Extract the fields we MUST test.
  const requiredPassportFields = allDocumentFields.filter(
    ({ requiredForPassport }) => requiredForPassport
  );

  // Check required fields are present.
  requiredPassportFields.forEach(({ code }) => {
    if (!documentObject.hasOwnProperty(code)) {
      isDocumentAValidPassport = false;
    }
  });
  // Exit early if document already identified as invalid passport.
  if (isDocumentAValidPassport === false) return false;

  // Validate all fields with validator functions.
  const failedFieldValidations = [];
  requiredPassportFields.forEach((field) => {
    const isValid = field.validator(documentObject[field.code]);
    if (!isValid) {
      failedFieldValidations.push({
        code: field.code,
        value: documentObject[field.code],
      });
      isDocumentAValidPassport = false;
    }
  });

  if (isDocumentAValidPassport === undefined) {
    isDocumentAValidPassport = true;
  }

  return isDocumentAValidPassport;
};

export { fileDataToDocumentObjects, documentIsPassport };
