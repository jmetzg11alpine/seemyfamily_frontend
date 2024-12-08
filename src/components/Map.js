import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, CircleMarker, Tooltip } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { apiRequest } from '../apiRequest';
import styled from 'styled-components';

const Map = () => {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const data = await apiRequest('/get_geo_data/');
      setLocations(data.data || []);
    };

    getData();
  }, []);
  return (
    <MapContainer
      center={[40.505, -25]}
      zoom={3}
      style={{ height: '95vh', width: '100%' }}
    >
      <TileLayer
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {locations.map((location) => (
        <CircleMarker
          key={location.id}
          center={[location.lat, location.lng]}
          radius={8 * Math.sqrt(location.size)}
          color='blue'
          fillColor='rgba(0, 0, 255, 0.3)'
          fillOpacity={0.7}
          stroke={false}
        >
          <Tooltip>
            <h6>{location.name}</h6>
            {location.person.map((p, index) => (
              <NameHolder key={index}>{p}</NameHolder>
            ))}
          </Tooltip>
        </CircleMarker>
      ))}
    </MapContainer>
  );
};
export default Map;

const NameHolder = styled.div`
  maring: 3px 5px;
`;
