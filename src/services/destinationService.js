// src/services/destinationService.js

const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/trips`;

const show = async (tripId, destinationId) => {
    try {
        const res = await fetch(`${BASE_URL}/${tripId}/destinations/${destinationId}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        return res.json();
    } catch (error) {
        console.log(error);
    };
};

// Fetches all destinations in TripDetails component. 
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


// delete?
// create?

export { index, show };