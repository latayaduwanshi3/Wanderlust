console.log(JSON.stringify(listing));
  mapboxgl.accessToken = mapToken;

// Default coordinates (can be anywhere, this is just a fallback)
const defaultCoordinates = [77.2090, 28.6139]; // Delhi coordinates as default

// Use listing coordinates if available, otherwise use default
const coordinates = listing && listing.geometry && listing.geometry.coordinates 
    ? listing.geometry.coordinates 
    : defaultCoordinates;

const map = new mapboxgl.Map({
    container: 'map',
    style:'mapbox://styles/mapbox/streets-v12',
    center: coordinates,
    zoom: 8
});

if (listing && listing.geometry && listing.geometry.coordinates) {
    const marker = new mapboxgl.Marker({ color: "red" })
        .setLngLat(listing.geometry.coordinates)
        .setPopup(
            new mapboxgl.Popup({offset: 25})
                .setHTML(`<h4>${listing.location}</h4>
                        <p>Exact Location will be provided after booking</p>`)
        )
        .addTo(map);
}