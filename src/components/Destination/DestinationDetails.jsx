// src/components/Destination/DestinationDetails.jsx

import { useParams, useNavigate } from 'react-router';
import { useEffect, useState } from 'react';

import * as destinationService from "../../services/destinationService.js";
// AMEN'S CODE BELOW THAT CAN BE DELETED WHEN MERGED WITH MAIN
const DestinationDetails = () => {
    const { tripId, destinationId } = useParams();
    const [destination, setDestination] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchDestinationDetails = async () => {
            const destinationData = await destinationService.showDestination(tripId, destinationId);
            setDestination(destinationData);
        };
        console.log(destinationId);
        fetchDestinationDetails();
    }, [destinationId]);

    if (!destination) {
        return <div>Looks like you haven't added any destinations yet!</div>
    };

    const handleDeleteDestination = async () => {
        try {
            const deletedDestination = await destinationService.deleteDestination(tripId, destinationId);
            console.log(deletedDestination);
            navigate(`/trips/${tripId}`);
        } catch (error) {
            console.log(error);
        };
    };

    return (
        <>
            <h1>{destination.name}</h1>
            {/* delete button */}
            <button onClick={() => handleDeleteDestination()}>Delete Destination</button>
            {/* edit button to edit start and end dates */}
            <button>Edit Destination</button>
            <h2>Attractions</h2>

            <div>
                <ul>
                    {destination.attractions.map((attraction, index) => (
                        // Updating key so that if the order or attractions changes (from deleting or adding), React knows exactly which li is which.
                        <li key={attraction._id}>
                            <p>{attraction.name}</p>
                            {/* need to figure out how to pass attractionId forward onto this page (through props?) */}
                            <button onClick={() => navigate(`/trips/${tripId}/destinations/${destinationId}/attractions/${attraction._id}`)}>View Attraction</button>

                        </li>
                    ))}
                </ul>
            </div>
        </>
    );

};

export default DestinationDetails;