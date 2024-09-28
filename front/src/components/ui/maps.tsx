import { useState } from "react";
import {
  GoogleMap,
  useLoadScript,
  Autocomplete,
  Marker,
} from "@react-google-maps/api";

interface LatLng {
  lat: number;
  lng: number;
}

interface LocationSearchInputProps {
  setLocation: (location: LatLng) => void;
  disabled?: boolean; // Pass the disabled prop for consistency with your form
}

const mapContainerStyle = {
  width: "100%",
  height: "400px",
};

const center = {
  lat: 40.712776, // Default latitude (New York)
  lng: -74.005974, // Default longitude
};

export default function LocationSearchInput({
  setLocation,
  disabled,
}: LocationSearchInputProps) {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string, // Add your API key in env variables
    libraries: ["places"],
  });

  const [autocomplete, setAutocomplete] =
    useState<google.maps.places.Autocomplete | null>(null);
  const [selectedPosition, setSelectedPosition] = useState<LatLng | null>(null);

  const onLoad = (autoC: google.maps.places.Autocomplete) => {
    setAutocomplete(autoC);
  };

  const onPlaceChanged = () => {
    if (autocomplete) {
      const place = autocomplete.getPlace();
      if (place.geometry) {
        const newLocation = {
          lat: place.geometry.location?.lat() ?? 0,
          lng: place.geometry.location?.lng() ?? 0,
        };
        setSelectedPosition(newLocation);
        setLocation(newLocation); // Pass the selected location to parent component
      }
    }
  };

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading Maps...</div>;

  return (
    <div>
      {/* Autocomplete input styled like the first name input */}
      <label className="sr-only" htmlFor="location">
        Location
      </label>
      <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
        <input
          id="location"
          placeholder="Search for a location"
          type="text"
          autoCapitalize="none"
          autoComplete="off"
          autoCorrect="off"
          className="input" // Assuming your `Input` component applies some class here
          disabled={disabled} // Disabled state passed from form
          style={{
            width: "100%",
            height: "40px",
            padding: "10px",
            border: "1px solid #ccc",
            borderRadius: "4px",
          }}
        />
      </Autocomplete>

      {selectedPosition && (
        <div>
          <p>
            Selected Location: Latitude {selectedPosition.lat}, Longitude{" "}
            {selectedPosition.lng}
          </p>
        </div>
      )}
    </div>
  );
}
