const requiredPassportFields = [
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

export { requiredPassportFields };
