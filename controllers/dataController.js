const Gun = require("gun");
let gun;

const setDbInstance = () => {
    this.gun = Gun(getPeers());
}
const getPeers = () => {
    return ["http://localhost:3000/gun"];
}

// Dummy Data
const addDummyData = async (req, res) => {
  try {
    gun.get("users").get(2).put(req.body);
    res.send("Added");
  } catch (error) {
    res.status(500).json({ error: "An error occurred while fetching data" });
  }
};

// GET Data
const getDummyData = async (req, res) => {
  try {
    gun.get('users').once((storedData) => {
        res.json(storedData);
    });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching data' });
  }
};

module.exports = {
    setDbInstance,
    getDummyData,
    addDummyData
}