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

// This isn't currently being used, and may not be at all?
// const index = async () => {
//   try {
//       const res = await fetch(`${BASE_URL}/${tripId}/destinations`, {
//       headers: {
//         Authorization: `Bearer ${localStorage.getItem("token")}`,
//       },
//     });
//     return res.json();
//   } catch (error) {
//     console.log(error);
//   }
// };


// delete?
// create?

export { index, show };