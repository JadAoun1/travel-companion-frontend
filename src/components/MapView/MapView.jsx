// src/components/MapView/MapView.jsx

// imports
import { APIProvider, Map } from "@vis.gl/react-google-maps";

const MapView = () => {
    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
    // Handle changes to the view of the map
    // event.detail contains { center, zoom, tilt, heading }
    const handleCameraChange = (event) => {
        console.log(event.detail);
    };

    if (!apiKey) {
        return <div>Error: API key is missing.</div>
    }

    return (
        <>
            <APIProvider
                apiKey={apiKey}
                onLoad={() => console.log('Maps API has loaded.')}>
                <Map
                    defaultZoom={13}
                    defaultCenter={{ lat: -33.860664, lng: 151.208138 }}
                    // Change view of map changes. 
                    onCameraChanged={handleCameraChange}
                    style={{ width: '100%', height: '500px' }} />
            </APIProvider>
        </>
    );
};

export default MapView;