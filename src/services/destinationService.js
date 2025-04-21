// src/services/destinationService.js

const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/trips`;

const showDestination = async (tripId, destinationId) => {
    try {
        const res = await fetch(`${BASE_URL}/${tripId}/destinations/${destinationId}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        return res.json();
    } catch (error) {
        console.log(error);
    };
};

const index = async (tripId) => {
  try {
      const res = await fetch(`${BASE_URL}/${tripId}/destinations`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};


const deleteDestination = async (tripId, destinationId) => {
    try {
        const res = await fetch(`${BASE_URL}/${tripId}/destinations/${destinationId}`, {
            method: 'DELETE',
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}`},
        });
        return res.json();
    } catch (error) {
        console.log(error);
    };
};

const createDestination = async (tripId, destinationData) => {
    try {
        const res = await fetch(`${BASE_URL}/${tripId}/destinations`, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}` 
            },
            body: JSON.stringify(destinationData),
        });
        return res.json();
    } catch {
        console.log(error);
    }
};

export { index, showDestination, deleteDestination, createDestination };