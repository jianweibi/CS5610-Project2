const { MongoClient } = require("mongodb");

// MongoDB username: user-321    password: northeastern5610
async function mongoConnect() {
  const uri =
    "mongodb+srv://user-321:northeastern5610@cluster0.3uxdm.mongodb.net/Project2?retryWrites=true&w=majority";
  const client = new MongoClient(uri);
  try {
    await client.connect();
    await listDatabases(client);
  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }
}

async function listDatabases(client) {
  var databasesList = await client.db().admin().listDatabases();

  console.log("Databases:");

  databasesList.databases.forEach((db) => console.log(` - ${db.name}`));
}

mongoConnect().catch(console.error);
