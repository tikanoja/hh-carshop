import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function Editcar(props) {
  const [open, setOpen] = React.useState(false);
  const [car, setCar] = React.useState({
    brand: '',
    model: '',
    color: '',
    fuel: '',
    modelYear: '',
    price: ''
  });

  const handleClickOpen = () => {
    console.log(props.car);
    setCar({
      brand: props.car.brand,
      model: props.car.model,
      color: props.car.color,
      fuel: props.car.fuel,
      modelYear: props.car.modelYear,
      price: props.car.price
    });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCar({
      ...car,
      [event.target.name]: event.target.value
    });
  };

  const updateCar = () => {
    props.updateCar(car, props.car._links.car.href);
    handleClose();
  }

  return (
    <div>
      <Button color='primary' variant="outlined" onClick={handleClickOpen}>
        Edit car
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        slotProps={{
          paper: {
            component: 'form',
            onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
              event.preventDefault();
              const formData = new FormData(event.currentTarget);
              const formJson = Object.fromEntries((formData as any).entries());
              const email = formJson.email;
              console.log(email);
              handleClose();
            },
          },
        }}
      >
        <DialogTitle>Edit car</DialogTitle>
          <DialogContent>
              <TextField
                autoFocus
                margin="dense"
                name="brand"
                value={car.brand}
                onChange={e => handleInputChange(e)}
                fullWidth
                variant="standard"
                label="Brand"
              />
              <TextField
                margin="dense"
                name="model"
                value={car.model}
                onChange={e => handleInputChange(e)}
                fullWidth
                variant="standard"
                label="Model"
              />
              <TextField
                margin="dense"
                name="color"
                value={car.color}
                onChange={e => handleInputChange(e)}
                fullWidth
                variant="standard"
                label="Color"
              />
              <TextField
                margin="dense"
                name="fuel"
                value={car.fuel}
                onChange={e => handleInputChange(e)}
                fullWidth
                variant="standard"
                label="Fuel"
              />
              <TextField
                margin="dense"
                name="modelYear"
                value={car.modelYear}
                onChange={e => handleInputChange(e)}
                fullWidth
                variant="standard"
                label="Model Year"
              />
              <TextField
                margin="dense"
                name="price"
                value={car.price}
                onChange={e => handleInputChange(e)}
                fullWidth
                variant="standard"
                label="Price"
              />
          </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={updateCar}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}