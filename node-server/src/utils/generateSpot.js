const { ParkingSpot } = require("../models");

const generateSpot = async () => {
  const res = await ParkingSpot.findAndCountAll();
  if (res.count === 0) {
    for (let count = 1; count <= 74; count++) {
      await ParkingSpot.create({
        spotCode: `sp${count}`,
      });
    }
  }
};

module.exports = { generateSpot };
