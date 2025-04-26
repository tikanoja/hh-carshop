import React, { useState, useEffect } from 'react';
import { API_CONFIG } from '../config';
import { Car } from '../types';

export default function Carlist() {
  const [cars, setCars] = useState<Car[]>([]);

  useEffect(() => fetchData(), []);

  const fetchData = () => {
    fetch(`${API_CONFIG.BASE_URL}/cars`)
      .then((response) => response.json())
      .then((data: Car[]) => {
        setCars(data); // set the state (cars) with the fetched data (we got from the endpoint)
      })
      .catch((err) => {
        console.error('error fetching data:', err);
      });
  }

  return (
    <div></div>
  );
}