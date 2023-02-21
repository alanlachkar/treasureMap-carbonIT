// React imports
import { useState, useEffect } from 'react';
// Component imports
import TreasureMap from '../../components/TreasureMap/TreasureMap';
// Utils imports
// Css imports
import styles from './MapPage.css';

const MapPage = (): JSX.Element => {
  return (
    <div>
      <p>Hello Treasure Map !</p>
      <TreasureMap />
    </div>
  );
};

export default MapPage;
