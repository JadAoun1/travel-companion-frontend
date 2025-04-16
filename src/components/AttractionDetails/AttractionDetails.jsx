// src/components/AttractionDetails/AttractionDetails.jsx

import { useParams } from 'react-router';
import { useState, useEffect } from 'react';

import * as attractionService from '../../services/attractionService.js';

const AttractionDetails = () => {
    const { tripId, destinationId, attractionId } = useParams();
    const [attraction, setAtraction] = useState(null);

    useEffect(() => {
        const fetchAttractionDetails = async () => {
            const attractionDetails = await attractionService.show(tripId, destinationId, attractionId);
            setAtraction(attractionDetails);
        };
        fetchAttractionDetails();
    }, [attractionId]);

    if (!attraction) {
        return <div>Looks like you haven't added any attractions yet!</div>
    };

    return (
        <>
            <h1>{attraction.name}</h1>
            <p>Lat: {attraction.location.lat}</p>
            <p>Lng: {attraction.location.lng}</p>
        </>
    );
};

export default AttractionDetails;