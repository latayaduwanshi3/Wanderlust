const mongoose = require("mongoose");
const Listing = require("./models/listing");
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
require("dotenv").config();
const mapToken = process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: mapToken });

main()
  .then(() => {
    console.log("Successfully updated all listings!");
    mongoose.connection.close();
  })
  .catch((err) => {
    console.log(err);
    mongoose.connection.close();
  });

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/wanderlust");
  
  // Get all listings without geometry
  const listings = await Listing.find({ geometry: { $exists: false } });
  
  console.log(`Found ${listings.length} listings without map coordinates`);

  // Update each listing with coordinates
  for (const listing of listings) {
    try {
      const response = await geocodingClient
        .forwardGeocode({
          query: `${listing.location}, ${listing.country}`,
          limit: 1,
        })
        .send();

      if (response.body.features.length > 0) {
        listing.geometry = response.body.features[0].geometry;
        await listing.save();
        console.log(`Updated coordinates for: ${listing.title}`);
      } else {
        console.log(`No coordinates found for: ${listing.title}`);
      }
    } catch (err) {
      console.log(`Error updating coordinates for ${listing.title}:`, err.message);
    }
  }
} 