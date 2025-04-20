// src/components/MapView/MapView.jsx

// imports
import { useState, useEffect } from 'react';
import { APIProvider, Map, Marker } from "@vis.gl/react-google-maps";
import { data, useParams } from 'react-router';
import * as destinationService from '../../services/destinationService.js';
import * as attractionService from '../../services/attractionService.js';

// Destructuring onAddAttraction from DestinationDetails
const MapView = ({ onAddAttraction, onAddDestination }) => {
    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
    // Store user input (city, state)
    const [location, setLocation] = useState('');
    // Store location as lat/lng once fetched from Google Geocoding API
    const [coordinates, setCoordinates] = useState(null);
    // Display feedback if the entered data (city, state) is not found (i.e. mispelled)
    const [error, setError] = useState(null);

    // I'm going use this when adding a destination or attraction
    const { tripId, destinationId, attractionId } = useParams();
    // What needs to be passed into useState to not fuck up the current attractions/destinations?
    const [attractions, setAttractions] = useState([]);
    const [destinations, setDestinations] = useState([]);
    // Adding this to set the searched data (using Google Geocoding API) in handleSearch to overall state so it can be accessed in handleAdd
    const [geocodeData, setGeocodeData] = useState(null)
    // Update location state as user types in input field
    const handleLocationChange = (event) => {
        setLocation(event.target.value);
    };

    // Adding so that destination and attraction show pages show marker at the lat and lng
    useEffect(() => {
        const fetchLocation = async () => {
            try {
                if (attractionId) {
                    const attraction = await attractionService.showAttraction(tripId, destinationId, attractionId);
                    setCoordinates(attraction.location);
                } else if (destinationId) {
                    const destination = await destinationService.showDestination(tripId, destinationId);
                    setCoordinates(destination.location);
                };
            } catch (err) {
                console.error('Error fetching location data:', err);
            };
        };
        fetchLocation();
    }, [tripId, destinationId, attractionId]);

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
                const result = data.results[0];
                // Extract lat and lng and set equal to the deconstructed object from the API
                // data.results[0] => results of possible matches from the API call; takes the first (and most likely) match
                // geometry => an object from the returned API results that holds spatial info; location holds lat and lng within the geometry object, so it's just pulling that data and setting it to lat and lng
                // const { lat, lng } = data.results[0].geometry.location;
                const { lat, lng } = result.geometry.location;
                const placeId = result.place_id
                // Set coordinates
                setCoordinates({ lat, lng });

                // Updates here to further incorporate Places API
                // Once fetchPlacesDetails runs using placeId, assign to value placeDetails
                const placeDetails = await fetchPlaceDetails(placeId);

                if (placeDetails) {
                    // Then updated GeocodeData state to includ old results (via spread operator) and add on newly fetched placeDetails
                    // This means that we can now access placeDetails (from Places API) via geocodeData.placeDetails
                    setGeocodeData({
                        ...result,
                        placeDetails,
                    });
                } else {
                    setGeocodeData(result);
                }
                // setGeocodeData(result);
                // Clear any errors
                setError(null);
            } else {
                setError('Location not found.');
                setCoordinates(null);
                setGeocodeData(null);
            }
        } catch (error) {
            console.log(error);
        };
    };

    // Trying to incorporate Google Places API on top of Google Geocoding API (I'm not sure if this was the cleanest way of doing things, but it's where I'm at right now...)
    // Pass in placeId which was gathered through Geocoding API, so that can be used in Places API
    const fetchPlaceDetails = async (placeId) => {
        try {
            // Places API URL here with dynamically added placeId and apiKey
            const response = await fetch(
                `https://places.googleapis.com/v1/places/${placeId}?fields=displayName,formattedAddress,location,photos,websiteUri,rating,userRatingCount,regularOpeningHours,shortFormattedAddress,primaryType&key=${apiKey}`
            );

            const placeData = await response.json();
            // Just get the data to display in the UI
            // This could potentially be a place to refactor the use of Geocoding API. Maybe everything I've been doing using that API can be done using Places API instead?
            return placeData;
        } catch (error) {
            console.log(error);
        }
    };


    const handleAdd = async () => {
        // Some kind of error logic here (setError('')) if a user hasn't added an actual location?

        const newLocation = {
            // The way the data was being passed to the backend meant that it was receiving req.body.name as undefined. I updated to this because I knew it was working as "address", but now name and address are the same. I'm going to come back to this later to work on because ultimately it's still working right now, just doesn't look the best. (Data is currently being sent accurately to the backend, but then the name is just set to the address instead of "Oregon Zoo" or the like.)
            name: geocodeData.formatted_address || 'Unnamed Location',
            // Fixed this to match backend schema
            location: {
                lat: coordinates.lat,
                lng: coordinates.lng,
            },
            address: geocodeData.formatted_address || '',
            placeId: geocodeData.place_id || '',
        };

        try {
            // Add a searched and selected attraction to the destination
            // Since adding an attraction is done on the destination route (/trip/:tripId/destination/:destinationId), we need to check first if there's a destinationId in params (via useParams()), and then we can add the logic to add the location to the destination (I think...)
            if (destinationId) {
                // Logic here
                // Make sure to pass in newLocation (declared above) so it can be added to the newAttraction
                const newAttraction = await attractionService.createAttraction(tripId, destinationId, newLocation);
                setAttractions([...attractions, newAttraction]);
                // Once setAttractions successfully updates, call the function and pass it newAttraction (which prompts the function in DestinationDetails to run again, state updates and React responds by rerendering so the new attraction shows up on the page)
                if (onAddAttraction) onAddAttraction(newAttraction);
                setLocation('');
                setGeocodeData(null);
            }

            // Add a searched and selected destination to the trip
            // Since adding a destination is done on the trip route (/trip/:tripId), we need to first deal with destinationId (above) and catch the rest to add a destination to a trip
            else if (tripId) {
                // Logic here
                const newDestination = await destinationService.createDestination(tripId, newLocation);
                setDestinations([...destinations, newDestination]);
                if (onAddDestination) {
                    await onAddDestination(newDestination)
                };
                setLocation('');
                setGeocodeData(null);
            }
            else {
                console.log(error);
            }
        } catch (error) {
            console.log(error);
            // Maybe another setError('') here? Could not add location?
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
                {attractionId ? (
                    <>
                    </>
                ) : (
                    <>
                        <div>
                            <input
                                type='text'
                                value={location}
                                onChange={handleLocationChange}
                                placeholder='Enter location'
                            />
                            <button onClick={handleSearch}>Search</button>

                            {/* Update UI to show results from Places API. This is just a temporary placeholder for now. */}
                            <p>{geocodeData?.placeDetails.displayName.text}</p>

                            {geocodeData && <p>Found: {geocodeData.formatted_address}</p>}

                            {error && <p>{error}</p>}
                        </div>
                        <div>
                            <button onClick={handleAdd}>Add</button>
                        </div>
                    </>
                )}
                <Map
                    defaultZoom={10}
                    center={coordinates || { lat: -33.860664, lng: 151.208138 }}
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