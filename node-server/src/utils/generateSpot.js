const { ParkingSpot } = require("../models");

const generateSpot = () => {
  ParkingSpot.findAndCountAll().then((res) => {
    if (res.count === 0) {
      for (let count = 1; count <= 74; count++) {
        ParkingSpot.create({
          spotCode: `PS-${count}`,
        });
      }
    }
  });
};

module.exports = { generateSpot };
