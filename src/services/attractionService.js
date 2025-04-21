const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/trips`;

const createAttraction = async (tripId, destinationId, attractionData) => {
    try {
        const res = await fetch(`${BASE_URL}/${tripId}/destinations/${destinationId}/attractions/`, {
            method: 'POST',
            
            headers: { 
                'Content-Type': 'application/json', 
                Authorization: `Bearer ${localStorage.getItem('token')}` },
            body: JSON.stringify(attractionData),
        });
        return res.json();
    } catch (error) {
        console.log(error);
    }
}

const showAttraction = async (tripId, destinationId, attractionId) => {
    try {
        const res = await fetch(`${BASE_URL}/${tripId}/destinations/${destinationId}/attractions/${attractionId}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        return res.json();
    } catch (error) {
        console.log(error);
    }
};

const deleteAttraction = async (tripId, destinationId, attractionId) => {
    try {
        const res = await fetch(`${BASE_URL}/${tripId}/destinations/${destinationId}/attractions/${attractionId}`, {
            method: 'DELETE',
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}`},
        });
        return res.json();
    } catch (error) {
        console.log(error);
    };
};

export { showAttraction, deleteAttraction, createAttraction };