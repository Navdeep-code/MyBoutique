//import important modules
const { response } = require("express");
const express = require("express");
const path = require("path");
const { MongoClient, ObjectId } = require("mongodb");

//Mongo config
const dbUrl = "mongodb://127.0.0.1:27017";
const client = new MongoClient(dbUrl);

//Set up express app and port number
const app = express();
const port = process.env.PORT || 8888;

//Set up template engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

//Set up static file paths
app.use(express.static(path.join(__dirname, "public")));

//Page Routes
app.get("/", async (request, response) => {
  Items = await getItems();
  response.render("index", { title: "Home", Itemlist: Items });
});

app.get("/NewArrivals", async (request, response) => {
  Items = await getItems();
  response.render("New Arrivals", { title: "New Arrivals", Itemlist: Items });
});

app.get("/Sale", async (request, response) => {
  Items = await getItems();
  response.render("Sale", { title: "Sale", Itemlist: Items });
});

app.get("/About", async (request, response) => {
  response.render("About", { title: "About" });
});

//Set up server listener
app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});

//MONGO FUNCTIONS
/* Function to connect to DB and return the "testdb" database */
async function connection() {
  await client.connect();
  db = client.db("Boutique");
  return db;
}

/*Functin to select all documents from menulinks*/
async function getItems() {
  db = await connection();
  var results = db.collection("Items").find({});
  res = await results.toArray(); // convert to array
  return res;
}
