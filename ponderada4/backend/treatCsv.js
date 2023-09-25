const fs = require("fs");
const csv = require("csv-parser");


function getDataFromCsv() {
  return new Promise((resolve, reject) => {
    const resultados = [];

    fs.createReadStream("files/mall_customers.csv")
      .pipe(csv())
      .on("data", (row) => {
        resultados.push(row);
      })
      .on("end", () => {
        resolve(resultados);
      })
      .on("error", (error) => {
        reject(error);
      });
  });
}

module.exports = {
  getDataFromCsv,
};
