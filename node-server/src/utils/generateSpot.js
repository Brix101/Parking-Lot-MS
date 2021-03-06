const { ParkingSpot } = require("../models");
const blocks = require("../constants/blocks");

const generateSpot = async () => {
  const res = await ParkingSpot.findAndCountAll();
  if (res.count === 0) {
    const bl = blocks.length;
    for (let i = 0; i < bl; i++) {
      blockCode = blocks[i].name;
      numOfSpaces = blocks[i].numOfBlocks;
      for (let j = 0; j < numOfSpaces; j++) {
        await ParkingSpot.create({
          spotCode: `sp${j + 1}`,
          blockCode: blockCode,
        });
      }
    }
  }
};

module.exports = { generateSpot };
