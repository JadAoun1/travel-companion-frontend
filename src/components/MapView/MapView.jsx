// src/components/MapView/MapView.jsx

import { useState, useEffect } from 'react';
import { APIProvider, Map, Marker } from "@vis.gl/react-google-maps";
import { data, useParams } from 'react-router';
import * as destinationService from '../../services/destinationService.js';
import * as attractionService from '../../services/attractionService.js';

import InputField from '../microComponents/InputField/InputField';
import ButtonPrimary from '../microComponents/ButtonPrimary/ButtonPrimary';
import ButtonSecondary from '../microComponents/ButtonSecondary/ButtonSecondary';
import { Paragraph } from '../microComponents/Typography';
import Alert from '../microComponents/Alert/Alert';
import styles from './MapView.module.css';

const MapView = ({ onAddAttraction, onAddDestination }) => {
    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
    const { tripId, destinationId, attractionId } = useParams();
    const [location, setLocation] = useState('');
    const [coordinates, setCoordinates] = useState(null);
    const [error, setError] = useState(null);
    const [attractions, setAttractions] = useState([]);
    const [destinations, setDestinations] = useState([]);
    const [geocodeData, setGeocodeData] = useState(null)

    const handleLocationChange = (event) => {
        setLocation(event.target.value);
    };

    // Centers map marker based on attraction or destination ID in params
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
            const response = await fetch(
                `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(location)}&key=${apiKey}`
            );

            const data = await response.json();

            if (data.status === 'OK') {
                const result = data.results[0];
                const { lat, lng } = result.geometry.location;
                const placeId = result.place_id
                setCoordinates({ lat, lng });

                const placeDetails = await fetchPlaceDetails(placeId);

                if (placeDetails) {
                    setGeocodeData({
                        ...result,
                        placeDetails,
                    });
                } else {
                    setGeocodeData(result);
                }
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

    const fetchPlaceDetails = async (placeId) => {
        try {
            const response = await fetch(
                `https://places.googleapis.com/v1/places/${placeId}?fields=displayName,formattedAddress,location,photos,websiteUri,rating,userRatingCount,regularOpeningHours,shortFormattedAddress,primaryType&key=${apiKey}`
            );

            const placeData = await response.json();
            return placeData;
        } catch (error) {
            console.log(error);
        }
    };


    const handleAdd = async () => {
        const newLocation = {
            name: geocodeData.formatted_address || 'Unnamed Location',
            location: {
                lat: coordinates.lat,
                lng: coordinates.lng,
            },
            address: geocodeData.formatted_address || '',
            placeId: geocodeData.place_id || '',
        };

        try {
            if (destinationId) {
                const newAttraction = await attractionService.createAttraction(tripId, destinationId, newLocation);
                setAttractions([...attractions, newAttraction]);
                // If passed from parent, call callback to update parent state (e.g., DestinationDetails)
                if (onAddAttraction) onAddAttraction(newAttraction);
                setLocation('');
                setGeocodeData(null);
            }

            else if (tripId) {
                const newDestination = await destinationService.createDestination(tripId, newLocation);
                setDestinations([...destinations, newDestination]);
                // If passed from parent, call callback to update parent state (e.g., TripDetails)
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
        };
    };

    if (!apiKey) {
        return <Alert severity="error">Error: API key is missing.</Alert>
    }

    return (
        <>
            <APIProvider apiKey={apiKey}>
                {!attractionId && (
                    <>
                        <div className={styles.searchControls}>
                            <InputField
                                type='text'
                                label="Location Search"
                                value={location}
                                onChange={handleLocationChange}
                                placeholder='Enter location'
                            />
                            <ButtonSecondary onClick={handleSearch}>Search</ButtonSecondary>
                        </div>

                        {geocodeData?.placeDetails.displayName.text && (
                            <Paragraph>Place: {geocodeData.placeDetails.displayName.text}</Paragraph>
                        )}
                        {geocodeData?.formatted_address && (
                            <Paragraph>Address: {geocodeData.formatted_address}</Paragraph>
                        )}
                        {error && <Alert severity="error">{error}</Alert>}

                        {coordinates && (
                            <div className={styles.addControls}>
                                <ButtonPrimary onClick={handleAdd}>Add Location</ButtonPrimary>
                            </div>
                        )}
                    </>
                )}
                <div className={styles.mapContainer}>
                    <Map
                        defaultZoom={10}
                        center={coordinates || { lat: -33.860664, lng: 151.208138 }}
                        mapId={'YOUR_MAP_ID'}
                        gestureHandling={'greedy'}
                        disableDefaultUI={false}
                    >
                        {coordinates && <Marker position={coordinates} />}
                    </Map>
                </div>
            </APIProvider>
        </>
    );
};

export default MapView;