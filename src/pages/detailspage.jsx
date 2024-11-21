import React from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { useLocation } from "react-router-dom";

const DetailsPage = () => {
  const location = useLocation();
  const countryData = location.state;

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyBzRRsFH6kUE_PP5QaBIGytJIowSkPiAUQ",
  });

  const containerStyle = {
    width: "100%",
    height: "100vh",
  };

  

  const center = {
    lat: countryData.latlng ? countryData.latlng[0] : 0,
    lng: countryData.latlng ? countryData.latlng[1] : 0,
  };

  const openGoogleMaps = () => {
    const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${center.lat},${center.lng}`;
    window.open(googleMapsUrl, "_blank");
  };

  return (
    <div className="container-fluid p-0">
      <div className="row g-0">
        <div className="col-12 col-md-6">
          {isLoaded && (
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={center}
              zoom={5}
              
            >
              <Marker position={center} />
            </GoogleMap>
          )}
        </div>
        <div className="col-12 col-md-6 d-flex flex-column justify-content-center align-items-center p-3">
          <Card style={{ width: "100%" }}>
            <Card.Img
              variant="top"
              src={countryData.flags.svg}
              style={{ height: "50vh", objectFit: "cover" }}
            />
            <Card.Body>
              <Card.Title>{countryData.name.common}</Card.Title>
              <Card.Text>
                <strong>Capital: </strong>
                {countryData.capital ? countryData.capital.join(", ") : "N/A"}
                <br />
                <strong>Population: </strong>
                {countryData.population.toLocaleString()}
                <br />
                <strong>Region: </strong>
                {countryData.region}
              </Card.Text>
              <Button variant="primary" onClick={openGoogleMaps}>
                Open in Google Maps
              </Button>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DetailsPage;
