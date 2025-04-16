// src/services/attractoinService.js

const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/trips`;

// index

// create

// show
const show = async (tripId, destinationId, attractionId) => {
    try {
        const res = await fetch(`${BASE_URL}/${tripId}/destinations/${destinationId}/attractions/${attractionId}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        return res.json();
    } catch (error) {
        console.log(error);
    }
};

// edit

// delete

export { show };