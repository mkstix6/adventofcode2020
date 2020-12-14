const allDocumentFields = [
  {
    requiredForPassport: true,
    code: "byr",
    fieldName: "Birth Year",
    validator(fieldValue) {
      // byr (Birth Year) - four digits; at least 1920 and at most 2002.
      const requiredLength = 4;
      const minYear = 1920;
      const maxYear = 2002;
      // check length
      if (fieldValue.length !== requiredLength) return false;
      // larger than min
      if (parseInt(fieldValue) < minYear) return false;
      // smaller than max.
      if (parseInt(fieldValue) > maxYear) return false;
      // else
      return true;
    },
  },
  {
    requiredForPassport: true,
    code: "iyr",
    fieldName: "Issue Year",
    validator(fieldValue) {
      // iyr (Issue Year) - four digits; at least 2010 and at most 2020.
      const requiredLength = 4;
      const minYear = 2010;
      const maxYear = 2020;
      // check length
      if (fieldValue.length !== requiredLength) return false;
      // larger than min
      if (parseInt(fieldValue) < minYear) return false;
      // smaller than max.
      if (parseInt(fieldValue) > maxYear) return false;
      // else
      return true;
    },
  },
  {
    requiredForPassport: true,
    code: "eyr",
    fieldName: "Expiration Year",
    validator(fieldValue) {
      // eyr (Expiration Year) - four digits; at least 2020 and at most 2030.
      const requiredLength = 4;
      const minYear = 2020;
      const maxYear = 2030;
      // check length
      if (fieldValue.length !== requiredLength) return false;
      // larger than min
      if (parseInt(fieldValue) < minYear) return false;
      // smaller than max.
      if (parseInt(fieldValue) > maxYear) return false;
      // else
      return true;
    },
  },
  {
    requiredForPassport: true,
    code: "hgt",
    fieldName: "Height",
    validator(fieldValue) {
      // hgt (Height) - a number followed by either cm or in:
      // Extract unit from string // ASSUMPTION: All units we want to test for are 2 characters long.
      const unit = fieldValue.slice(-2);
      const value = parseInt(fieldValue.slice(0, -2));
      // Check unit is valid.
      const validUnits = ["cm", "in"];
      if (!validUnits.includes(unit)) return false;
      // If cm, the number must be at least 150 and at most 193.
      if (unit === "cm" && (value < 150 || value > 193)) return false;
      // If in, the number must be at least 59 and at most 76.
      if (unit === "in" && (value < 59 || value > 76)) return false;
      // else
      return true;
    },
  },
  {
    requiredForPassport: true,
    code: "hcl",
    fieldName: "Hair Color",
    validator(fieldValue) {
      // hcl (Hair Color) - a # followed by exactly six characters 0-9 or a-f.
      // Check first character is '#'.
      if (fieldValue.slice(0, 1) !== "#") return false;
      // Check last 6 chars are hex chars.
      if (!/^#[0-9A-F]{6}$/i.test(fieldValue)) return false;
      // else
      return true;
    },
  },
  {
    requiredForPassport: true,
    code: "ecl",
    fieldName: "Eye Color",
    validator(fieldValue) {
      // ecl (Eye Color) - exactly one of: amb blu brn gry grn hzl oth.
      const validEyeColors = ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"];
      return validEyeColors.includes(fieldValue);
    },
  },
  {
    requiredForPassport: true,
    code: "pid",
    fieldName: "Passport ID",
    validator(fieldValue) {
      // pid (Passport ID) - a nine-digit number, including leading zeroes.
      // Check length.
      if (fieldValue.length !== 9) return false;
      // Check chars are numbers.
      if (!/^[0-9]+$/.test(fieldValue)) return false;
      // else
      return true;
    },
  },
  {
    requiredForPassport: false,
    code: "cid",
    fieldName: "Country ID",
    validator(fieldValue) {
      // cid (Country ID) - ignored, missing or not.
      return !!fieldValue;
    },
  },
];

const invalidPassportExamples = [
  {
    eyr: "1972",
    cid: "100",
    hcl: "#18171d",
    ecl: "amb",
    hgt: "170",
    pid: "186cm",
    iyr: "2018",
    byr: "1926",
  },
  {
    iyr: "2019",
    hcl: "#602927",
    eyr: "1967",
    hgt: "170cm",
    ecl: "grn",
    pid: "012533040",
    byr: "1946",
  },
  {
    hcl: "dab227",
    iyr: "2012",
    ecl: "brn",
    hgt: "182cm",
    pid: "021572410",
    eyr: "2020",
    byr: "1992",
    cid: "277",
  },
  {
    hgt: "59cm",
    ecl: "zzz",
    eyr: "2038",
    hcl: "74454a",
    iyr: "2023",
    pid: "3556412378",
    byr: "2007",
  },
];

const validPassportExamples = [
  {
    pid: "087499704",
    hgt: "74in",
    ecl: "grn",
    iyr: "2012",
    eyr: "2030",
    byr: "1980",
    hcl: "#623a2f",
  },
  {
    eyr: "2029",
    ecl: "blu",
    cid: "129",
    byr: "1989",
    iyr: "2014",
    pid: "896056539",
    hcl: "#a97842",
    hgt: "165cm",
  },
  {
    hcl: "#888785",
    hgt: "164cm",
    byr: "2001",
    iyr: "2015",
    cid: "88",
    pid: "545766238",
    ecl: "hzl",
    eyr: "2022",
  },
  {
    iyr: "2010",
    hgt: "158cm",
    hcl: "#b6652a",
    ecl: "blu",
    byr: "1944",
    eyr: "2021",
    pid: "093154719",
  },
];

export { allDocumentFields, invalidPassportExamples, validPassportExamples };
