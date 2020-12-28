import fs from "fs";

const regexEndOfLineNewLine = /\r?\n/;

const getFileData = (fileLocation) => {
  const fileTextData = fs.readFileSync(fileLocation, "utf8");
  return fileTextData;
};

const getFileLinesIntoArray = (fileLocation) => {
  const wholeFile = getFileData(fileLocation);
  const arrayOfLines = wholeFile.split(regexEndOfLineNewLine);
  return arrayOfLines;
};

export { getFileData, getFileLinesIntoArray };
