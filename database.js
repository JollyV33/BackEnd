// server/database.js
const Datastore = require("@seald-io/nedb"); // Updated for Node.js 24 compatibility
const path = require("path");
const fs = require("fs");

const dataDir = path.join(__dirname, "data");
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir);
}

const tasks = new Datastore({
  filename: path.join(dataDir, "tasks.db"),
  autoload: true, 
  timestampData: true,
});

module.exports = { tasks };