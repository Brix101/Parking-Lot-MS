const { ValidationError } = require("sequelize");
const { QueryTypes } = require("sequelize");
const sequilize = require("../utils/database");
const XLSX = require("xlsx");

const generateController = async (req, res) => {
  try {
    const data = await sequilize.query(
      `SELECT Parkers.plateNumber, Parkings.entered, Parkings.exited FROM Parkers INNER JOIN Parkings ON Parkings.parkerId = Parkers.id ORDER BY Parkings.entered DESC`,
      {
        type: QueryTypes.SELECT,
      }
    );
    const workSheet = XLSX.utils.json_to_sheet(data);
    const workBook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workBook, workSheet, "report");
    // Generate buffer
    XLSX.write(workBook, { bookType: "xlsx", type: "buffer" });

    // Binary string
    XLSX.write(workBook, { bookType: "xlsx", type: "binary" });

    XLSX.writeFile(workBook, "report.xlsx");

    const file = "report.xlsx";
    res.download(file);
  } catch (error) {
    return res.status(error instanceof ValidationError ? 400 : 500).send({
      message:
        error instanceof ValidationError
          ? error.errors[0].message
          : error.message || "Some error occurred",
    });
  }
};

module.exports = {
  generateController,
};
