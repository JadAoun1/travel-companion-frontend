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
            <h2>Attractions</h2>
            <div>
                <ul>
                    {destination.attractions.map((attraction, index) => (
                        <li key={index}>
                            <p>{attraction.name}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );

};

export default DestinationDetails;