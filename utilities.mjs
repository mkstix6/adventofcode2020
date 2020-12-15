import fs from "fs";

const getFileData = (fileLocation) => {
  const fileTextData = fs.readFileSync(fileLocation, "utf8");
  return fileTextData;
};

export { getFileData };
