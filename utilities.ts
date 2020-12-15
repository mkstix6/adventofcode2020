import * as fs from "file-system";

const getFileData = (fileLocation) => {
  const fileTextData = fs.readFileSync(fileLocation, "utf8");
  return fileTextData;
};

export { getFileData };
