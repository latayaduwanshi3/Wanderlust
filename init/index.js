const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const MONGO_URL = 'mongodb://127.0.0.1:27017/wanderlust';

main()
    .then(() =>{
        console.log("connected to DB");
    })
    .catch((err) => {
        console.log(err)
    });

async function main() {
  await mongoose.connect(MONGO_URL);
}

const initDB = async () => {
    try {
        await Listing.deleteMany({});
        const listingsToInsert = initData.data.map((obj) => ({
            ...obj,
            owner: "680c589ed8438b88f2e91647",
        }));
        await Listing.insertMany(listingsToInsert);
        console.log("Data was initialized successfully");
    } catch (err) {
        console.error("Error initializing the database:", err);
    }
};

initDB();