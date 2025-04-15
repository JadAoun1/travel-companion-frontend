const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/trips`;

const index = async () => {
  try {
    const res = await fetch(BASE_URL, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

const create = async (newTripFormData) => {
  try {
    const res = await fetch(BASE_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTripFormData),
    });

    return res.json();
  } catch (error) {
    console.log("Error in tripService.create:", error);
  }
};

const show = async (tripId) => {
  try {
    const res = await fetch(`${BASE_URL}/${tripId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

const deleteTrip = async (tripId) => {
  try {
    const res = await fetch(`${BASE_URL}/${tripId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

export { index, create, show, deleteTrip};
