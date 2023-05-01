const authAdmin = require("firebase-admin");

const serviceAccount = require("./blockchat-db-firebase-adminsdk-famk5-fb8bda9fa1.json");

authAdmin.initializeApp({
  credential: authAdmin.credential.cert(serviceAccount),
  databaseURL: "https://blockchat-db-default-rtdb.firebaseio.com"
});

module.exports = authAdmin;