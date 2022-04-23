import MapView, { Marker } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import { useDispatch, useSelector } from "react-redux";
import { selectDestination, selectOrigin, setTravelTimeInformation } from "../redux/slices/navSlice";
import { GOOGLE_MAPS_APIKEY } from "@env";
import { useEffect, useRef } from "react";

const Map = () => {
    const origin = useSelector(selectOrigin);
    const destination = useSelector(selectDestination);
    const dispatch = useDispatch();
    const mapref = useRef(null);

    useEffect(() => {
        if (!origin || !destination) {
            return;
        }

        mapref.current.fitToSuppliedMarkers(["origin", "destination"], {
            edgePadding: { top: 50, bottom: 50, left: 50, right: 50 },
        });
    }, [origin, destination]);

    useEffect(() => {
        if (!origin || !destination) {
            return;
        }
        const getTravelTime = async () => {
            const URL = `https://maps.google.com/maps/api/distancematrix/json?units=si&origins=${origin.description}&destinations=${destination.description}&key=${GOOGLE_MAPS_APIKEY}`;
            fetch(URL).then(res=>res.json()).then(data=> {
                dispatch(setTravelTimeInformation(data.rows[0].elements[0]))
            })
        };
        getTravelTime();
    }, [origin, destination, GOOGLE_MAPS_APIKEY]);

    return (
        <MapView
            mapType="mutedStandard"
            ref={mapref}
            initialRegion={{
                latitude: origin.location.lat,
                longitude: origin.location.lng,
                latitudeDelta: 0.005,
                longitudeDelta: 0.005,
            }}
            style={{ flex: 1 }}
        >
            {origin && destination && (
                <MapViewDirections
                    origin={origin.description}
                    destination={destination.description}
                    apikey={GOOGLE_MAPS_APIKEY}
                    strokeWidth={3}
                    strokeColor="black"
                />
            )}
            {origin?.location && (
                <Marker
                    coordinate={{
                        latitude: origin.location.lat,
                        longitude: origin.location.lng,
                    }}
                    identifier="origin"
                />
            )}
            {destination?.location && (
                <Marker
                    coordinate={{
                        latitude: destination.location.lat,
                        longitude: destination.location.lng,
                    }}
                    identifier="destination"
                />
            )}
        </MapView>
    );
};

export default Map;

