import { MongoClient, ServerApiVersion } from "mongodb";
import "dotenv/config";

const client = new MongoClient(process.env.MONGODB_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

try {
  await client.connect();
  await client.db("thesis").command({ ping: 1 });
} catch (err) {
  console.err(err);
}

let db = client.db("thesis");

export default db;
