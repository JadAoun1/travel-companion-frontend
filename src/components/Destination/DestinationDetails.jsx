// src/components/Destination/DestinationDetails.jsx

import { useParams, Link } from 'react-router';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from "../../contexts/UserContext.jsx";

import * as destinationService from '../../services/destinationService.js';

const DestinationDetails = () => {
    const { user } = useContext(UserContext);
    // this isn't doing anything (destinationId is returning undefined)
    const { destinationId } = useParams();
    // not used (yet?); not sure what should be in useState() yet
    const [destination, setDestination] = useState();
    const [attraction, setAttraction] = useState();

    useEffect(() => {
        const fetchDestination = async () => {
            try {
                const fetchedDestination = await destinationService.index();
                setDestination(fetchedDestination);
            } catch (error) {
                console.log(error);
            };
        };

        if (user) {
            fetchDestination();
            console.log(destinationId)
        };
        // Every time destinationId changes, we want to rerun (changed to user because that's passed, and destinationId isn't currently working)
    }, [user]);

    // Even though there is a destination, this is always rendering on the page...
    // if (!destination) return <main>No destinations added...</main>

    return (
        <>
            <h1>{user.username}'s Destination</h1>
            <p>List all attractions here...</p>
            <p>Testing dynamic info here: {}</p>
        </>
    )
};

export default DestinationDetails;