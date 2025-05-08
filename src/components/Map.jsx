import { useNavigate, useSearchParams } from 'react-router-dom';
import styles from './Map.module.css';
import { MapContainer, Marker, Popup, TileLayer, useMap, useMapEvents } from 'react-leaflet';
import { useEffect, useState } from 'react';
import { useCities } from '../contexts/CitiesContexts';
import { useGeolocation } from '../hooks/useGeoLocation';
import Button from './Button';

const Map = () => {
    const [searchParams] = useSearchParams();
    const [mapPosition, setMapPosition] = useState([40, 0])
    const { cities } = useCities();
    const { isLoading: isLoadingPosition, position: geoPosition, getPosition } = useGeolocation();

    const lat = searchParams.get('lat')
    const lng = searchParams.get('lng');

    useEffect(() => {
        if (geoPosition) setMapPosition([geoPosition.lat, geoPosition.lng])
        console.log(geoPosition)
    }, [geoPosition])

    useEffect(() => {
        if(lat && lng) setMapPosition([lat,lng])
    },[lat, lng])

    return (
        <div className={styles.mapContainer}>
           {!geoPosition && <Button type="position" onClick={getPosition}>{isLoadingPosition ? 'Loading...' : 'Use your position'}</Button>}
            <MapContainer className={styles.map} center={mapPosition} zoom={13} scrollWheelZoom={true}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {cities.map((city, index) => (
                    <Marker key={index} position={[city.position.lat, city.position.lng]}>
                        <Popup>
                            <span>{city.cityName}</span>
                        </Popup>
                    </Marker>
                )
                )}

                <ChangeCenter position={mapPosition} />
                <DetectClick />
            </MapContainer>
        </div>
    )
}

const ChangeCenter = ({ position }) => {
    const map = useMap();
    map.setView(position);
    return null;
}

const DetectClick = () => {
    const navigate = useNavigate();
    useMapEvents({
        click: (e) => navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`)
    })
}
export default Map;