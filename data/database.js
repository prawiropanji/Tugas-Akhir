const mongodb = require('mongodb');

const MongodbClient = mongodb.MongoClient;

let database;

async function connectDatabase() {
  const client = await MongodbClient.connect('mongodb://localhost:27017');
  database = client.db('okoonodb');
}

function getDb() {
  if (!database) {
    throw { message: `can't connect to database` };
    return;
  } else {
    return database;
  }
}

module.exports = { connectDatabase: connectDatabase, getDb: getDb };
