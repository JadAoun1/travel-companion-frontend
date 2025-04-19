// src/components/AttractionDetails/AttractionDetails.jsx

import { useNavigate, useParams } from 'react-router';
import { useState, useEffect } from 'react';

import * as attractionService from '../../services/attractionService.js';
import MapView from '../MapView/MapView.jsx';

const AttractionDetails = () => {
    const { tripId, destinationId, attractionId } = useParams();
    const [attraction, setAttraction] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAttractionDetails = async () => {
            const attractionDetails = await attractionService.showAttraction(tripId, destinationId, attractionId);
            setAttraction(attractionDetails);
        };
        fetchAttractionDetails();
    }, [attractionId]);

    if (!attraction) {
        return <div>Looks like you haven't added any attractions yet!</div>
    };

    const handleDeleteAttraction = async () => {
        try {
            const deletedAttraction = await attractionService.deleteAttraction(tripId, destinationId, attractionId);
            console.log(deletedAttraction);
            navigate(`/trips/${tripId}/destinations/${destinationId}`);
        } catch (error) {
            console.log(error);
        };
    };

    return (
        <>
            <h1>{attraction.name}</h1>
            <p>Lat: {attraction.location.lat}</p>
            <p>Lng: {attraction.location.lng}</p>
            <MapView />
            <button onClick={() => handleDeleteAttraction()}>Delete Attraction</button>
        </>
    );
};

export default AttractionDetails;