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
            if (!tripId || !destinationId) {
                console.error("Missing tripId or destinationId");
                return;
            }
            try {
                const destinationData = await destinationService.show(tripId, destinationId);
                setDestination(destinationData);
            } catch (error) {
                console.error("Error fetching destination details:", error);
            }
        };

        fetchDestinationDetails();
    }, [tripId, destinationId]);

    if (!destination) {
        return <div>Looks like you haven't added any destinations yet!</div>
    };

    return (
        <>
            <h1>{destination.name}</h1>
            <h2>Attractions</h2>
            <div>
                <ul>
                    {destination.attractions.map((attraction, index) => (
                        <li key={index}>
                            <p>{attraction.name}</p>
                            <button onClick={() => navigate(`/trips/${tripId}/destinations/${destinationId}/attractions/${attraction._id}`)}>View</button>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );

};

export default DestinationDetails;