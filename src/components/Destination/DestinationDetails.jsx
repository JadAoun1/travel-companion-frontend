// src/components/Destination/DestinationDetails.jsx

import { useParams, useNavigate } from 'react-router';
import { useEffect, useState } from 'react';

import * as destinationService from "../../services/destinationService.js";

const DestinationDetails = () => {
    const { tripId, destinationId } = useParams();
    const [destination, setDestination] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchDestinationDetails = async () => {
            const destinationData = await destinationService.show(tripId, destinationId);
            setDestination(destinationData);
        };
        console.log(destinationId);
        fetchDestinationDetails();
    }, [destinationId]);

    if (!destination) {
        return <div>Looks like you haven't added any destinations yet!</div>
    };

    return (
        <>
            <h1>{destination.name}</h1>
            <p>List all attractions here...</p>
            <p>Testing dynamic info here: {}</p>
        </>
    )

};

export default DestinationDetails;