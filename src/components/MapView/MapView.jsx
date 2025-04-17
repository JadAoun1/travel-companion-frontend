// src/components/MapView/MapView.jsx

// imports
import { useState } from 'react';
import { APIProvider, Map, Marker } from "@vis.gl/react-google-maps";

const MapView = () => {
    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
    // Store user input (city, state)
    const [location, setLocation] = useState('');
    // Store location as lat/lng once fetched from Google Geocoding API
    const [coordinates, setCoordinates] = useState(null);
    // Display feedback if the entered data (city, state) is not found (i.e. mispelled)
    const [error, setError] = useState(null);

    // Update location state as user types in input field
    const handleLocationChange = (event) => {
        setLocation(event.target.value);
    };

    const handleSearch = async () => {
        if (!location) return;

        try {
            // Use location input to send a GET request to Google Geocoding API
            const response = await fetch(
                `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(location)}&key=${apiKey}`
            );
            // Convert response into an object
            const data = await response.json();

            // If status of response is 'OK' (i.e. a location match was found in the API)...
            if (data.status === 'OK') {
                // Extract lat and lng and set equal to the deconstructed object from the API
                // data.results[0] => results of possible matches from the API call; takes the first (and most likely) match
                // geometry => an object from the returned API results that holds spatial info; location holds lat and lng within the geometry object, so it's just pulling that data and setting it to lat and lng
                const { lat, lng } = data.results[0].geometry.location;
                // Set coordinates
                setCoordinates({ lat, lng });
                // Clear any errors
                setError(null);
            } else {
                setError('Location not found.');
                setCoordinates(null);
            }
        } catch (error) {
            console.log(error);
        };
    };

    // Handle changes to the view of the map
    // event.detail contains { center, zoom, tilt, heading }
    const handleCameraChange = (event) => {
        console.log(event.detail);
    };

    if (!apiKey) {
        return <div>Error: API key is missing.</div>
    }

    return (
        <>
            <APIProvider apiKey={apiKey}>
                <div>
                    <input
                        type='text'
                        value={location}
                        onChange={handleLocationChange}
                        placeholder='Enter city, state'
                    />
                    <button onClick={handleSearch}>Search</button>
                    {error && <p>{error}</p>}
                </div>
                <Map
                    defaultZoom={10}
                    center ={ coordinates || { lat: -33.860664, lng: 151.208138 }}
                    // Change view of map changes. 
                    onCameraChanged={handleCameraChange}
                    style={{ width: '50%', height: '400px' }} 
                >
                    {/* If there are coordinates, set Marker position to those coordinates */}
                    {coordinates && <Marker position={coordinates} />}
                </Map>

            </APIProvider>
        </>
    );
};

export default MapView;