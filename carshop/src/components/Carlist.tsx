import React, { useState, useEffect } from 'react';
import { API_CONFIG } from '../config';
import { Car } from '../types';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { ColDef, ICellRendererParams } from 'ag-grid-community';
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import { deleteCar, getCars } from '../carapi';
import Addcar from './Addcar';
import Editcar from './Editcar';

export default function Carlist() {
  const [cars, setCars] = useState<Car[]>([]);
  const [open, setOpen] = useState(false);
  
  const columnDefs: ColDef<Car>[] = [
    { field: 'brand', sortable: true, filter: true },
    { field: 'model', sortable: true, filter: true },
    { field: 'color', sortable: true, filter: true },
    { field: 'fuel', sortable: true, filter: true },
    { field: 'modelYear', headerName: 'Year', sortable: true, filter: true },
    { field: 'price', sortable: true, filter: true },
    { 
      cellRenderer: (params: ICellRendererParams) =>
        <Editcar car={params.data} fetchCars={fetchCars} />
    },
    {
      cellRenderer: (params: ICellRendererParams) => 
        <Button 
          size="small" 
          color="error"
          onClick={() => handleDelete(params)}
        >
          Delete
        </Button>
    }
  ];

  const fetchCars = () => {
    getCars()
    .then(data => setCars(data._embedded.cars))
    .catch(err => console.error(err))
  }

  const handleDelete = (params: ICellRendererParams) => {
    if (window.confirm("Do you want to delete this car?")) {
      deleteCar(params.data._links.car.href)
      .then(() => fetchCars())
      .then(() => setOpen(true))
      .catch(err => console.error(err))
    }
  }

  const saveCar = (car: Car) => {
    fetch(`${API_CONFIG.BASE_URL}/cars`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(car)
    })
    .then(response => fetchCars())
    .catch(err => console.error(err))
  }

  useEffect(() => fetchCars(), []);

  return (
    <React.Fragment>
      <Addcar saveCar={saveCar}/>
      <div className="ag-theme-alpine" style={{ height: '100%', width: '100%' }}>
        <AgGridReact
          rowData={cars}
          columnDefs={columnDefs}
        />
      </div>
      <Snackbar 
        open={open}
        autoHideDuration={2500}
        onClose={() => setOpen(false)}
        message="car deleted !"
      />
    </React.Fragment>
  );
}