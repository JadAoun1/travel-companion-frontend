const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/users`;

// This code allows the user to fetch their data from the server
// User must be logged in for this to work
const index = async () => {
  try {
    const res = await fetch(BASE_URL, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });

    const data = await res.json();

    if (data.err) {
      throw new Error(data.err);
    }

    return data
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
};


export {
  index,
};