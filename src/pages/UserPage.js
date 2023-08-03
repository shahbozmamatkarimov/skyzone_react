import * as React from 'react';
import { useMemo, useState } from 'react';
import { MaterialReactTable } from 'material-react-table';
import { Helmet } from 'react-helmet-async';
// @mui
import {
  Stack,
  Container,
  Typography,
} from '@mui/material';
// components
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
// form
import TextField from '@mui/material/TextField';
import TextareaAutosize from '@mui/base/TextareaAutosize';
import { styled } from '@mui/system';
import { LoadingButton } from '@mui/lab';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import Iconify from '../components/iconify';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  borderRadius: '10px',
  border: '2px solid #000',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

// ----------------------------------------------------------------------
export default function UserPage() {
  const [open, setOpen] = React.useState(false);
  const [name, setName] = React.useState("");
  const description = React.useRef("");
  const [age, setAge] = React.useState("");
  const [edit, setEdit] = React.useState(false);
  const [id, setId] = React.useState(false);
  const [deleted, setDelete] = React.useState(false);
  const [deleteId, setDeleteId] = React.useState('');
  const handleEdit = (id) => {
    id -= 1
    setAge(data[id].lastName)
    setName(data[id].firstName)
    description.current = data[id].city
    setId(id)
    setEdit(true);
  }

  const handleDelete = (id) => {
    console.log(id);
    setDelete(true);
    setDeleteId(id);
  }

  const dataStore = [
    {
      firstName: 'Dylan',
      lastName: 'Phones',
      city: 'East Daphne',
    },
    {
      firstName: 'Raquel',
      lastName: 'Technologies',
      city: 'Columbus',
    },
    {
      firstName: 'Ervin',
      lastName: 'Builds',
      city: 'South Linda',
    },
    {
      firstName: 'Brittany',
      lastName: 'Phones',
      city: 'Lincoln',
    },
    {
      firstName: 'Branson',
      lastName: 'Technologies',
      city: 'Charleston',
    },
  ];

  const blue = {
    100: '#DAECFF',
    200: '#b6daff',
    400: '#3399FF',
    500: '#007FFF',
    600: '#0072E5',
    900: '#003A75',
  };

  const grey = {
    50: '#f6f8fa',
    100: '#eaeef2',
    200: '#d0d7de',
    300: '#afb8c1',
    400: '#8c959f',
    500: '#6e7781',
    600: '#57606a',
    700: '#424a53',
    800: '#32383f',
    900: '#24292f',
  };

  const [data, setData] = useState(() => dataStore);

  for (let i = 0; i < data.length;) {
    data[i].icon = <div><EditIcon onClick={() => handleEdit(i)} sx={{ cursor: 'pointer' }} />&nbsp;&nbsp;&nbsp;&nbsp;<DeleteIcon onClick={() => handleDelete(i)} sx={{ cursor: 'pointer' }} /></div>

    // const div = React.createElement('div')
    // const EditIcon = React.createElement('EditIcon')
    // const DeleteIcon = React.createElement('DeleteIcon')
    // EditIcon.setAttribute('onclick', () => handleEdit(i))
    // DeleteIcon.setAttribute('onclick', () => handleDelete(i))
    // div.append(EditIcon, DeleteIcon);
    // data[i].icon = div

    i += 1;
  }

  console.log(data);

  const StyledTextarea = styled(TextareaAutosize)(
    ({ theme }) => `
    width: 320px;
    font-family: IBM Plex Sans, sans-serif;
    font-size: 0.875rem;
    font-weight: 400;
    line-height: 1.5;
    padding: 12px;
    border-radius: 12px 12px 0 12px;
    color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
    background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
    border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
    box-shadow: 0px 2px 2px ${theme.palette.mode === 'dark' ? grey[900] : grey[50]};
  
    &:hover {
      border-color: ${blue[400]};
    }
  
    &:focus {
      border-color: ${blue[400]};
      box-shadow: 0 0 0 3px ${theme.palette.mode === 'dark' ? blue[500] : blue[200]};
    }
  
    // firefox
    &:focus-visible {
      outline: 0;
    }
  `,
  );

  const handleChange = (event) => {
    setAge(event.target.value);
  };
  const handleName = (event) => {
    setName(event.target.value);
  };

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setEdit(false);
    setName("")
    setAge("")
    description.current.value = "";
  };

  function Tables() {
    return (
      <MaterialReactTable
        autoResetPageIndex={false}
        columns={columns}
        data={data}
        enableRowOrdering
        enableSorting={false}
        muiTableBodyRowDragHandleProps={({ table }) => ({
          onDragEnd: () => {
            const { draggingRow, hoveredRow } = table.getState();
            if (hoveredRow && draggingRow) {
              data.splice(
                hoveredRow.index,
                0,
                data.splice(draggingRow.index, 1)[0],
              );
              setData([...data]);
            }
          },
        })}
      />
    )
  }

  const columns = useMemo(
    () => [
      {
        accessorKey: 'firstName',
        header: 'First Name',
      },
      {
        accessorKey: 'lastName',
        header: 'Last Name',
      },
      {
        accessorKey: 'city',
        header: 'City',
      },
      {
        accessorKey: "icon",
        header: "Icon",
      }
    ],
    [],
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    const info = description.current.value
    data.push({ firstName: name, lastName: age, city: info, icon: <div><EditIcon onClick={() => handleEdit(data.length - 1)} sx={{ cursor: 'pointer' }} />&nbsp;&nbsp;&nbsp;&nbsp;<DeleteIcon onClick={() => handleDelete(data.length - 1)} sx={{ cursor: 'pointer' }} /></div> })
    setData(data);
    setName("")
    setAge("")
    description.current.value = "";
    setOpen(false);
  }

  const handleEditSubmit = (e) => {
    e.preventDefault();
    const info = description.current.value
    data[id].firstName = name
    data[id].lastName = age
    data[id].city = info
    setData(data);
    setName("")
    setAge("")
    description.current = "";
    setEdit(false);
  }

  const handleDeleteId = (e) => {
    e.preventDefault();
    data.splice(deleteId - 1, 1);
    setData(data);
    setDelete(false);
  }

  return (
    <>
      <Helmet>
        <title> User | Ecommerce </title>
      </Helmet>


      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Button onClick={handleOpen} variant="contained" sx={{ mb: -7, zIndex: 50, ml: { lg: -3 } }} startIcon={<Iconify icon="eva:plus-fill" />}>
            New Category
          </Button>
        </Stack>
      </Container>
      <Tables />
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="child-modal-title"
          aria-describedby="child-modal-description"
          sx={{
            overflowY: 'auto', maxHeight: '100vw', height: '100%', minHeight: '100vw',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            my: 'auto',
            mx: 'auto',
          }}
        >
          <form onSubmit={(e) => handleSubmit(e)}>
            <Box sx={{ ...style, width: { sm: 500 } }}>
              <h2 id="child-modal-title">New Category</h2>
              <Box sx={{ display: 'flex', flexDirection: 'column', flexWrap: 'wrap', gap: '1rem' }}>
                <TextField onInput={e => handleName(e)} value={name} id="outlined-search" label="Name" type="search" required />
                <FormControl sx={{ minWidth: 120, width: '100%' }} size="small">
                  <InputLabel id="demo-select-small-label">Select category</InputLabel>
                  <Select
                    labelId="demo-select-small-label"
                    id="demo-select-small"
                    value={age}
                    label="Select category"
                    onChange={(e) => handleChange(e)}
                  >
                    <MenuItem value={'Phones'}>Phones</MenuItem>
                    <MenuItem value={'Builds'}>Builds</MenuItem>
                    <MenuItem value={'Technologies'}>Technologies</MenuItem>
                  </Select>
                </FormControl>
                <StyledTextarea
                  ref={description}
                  sx={{ width: '100%' }}
                  aria-label="minimum height"
                  minRows={3}
                  maxRows={5}
                  maxLength={200}
                  placeholder="Description"
                />
              </Box>
              <Box sx={{ display: 'flex', gap: '20px', justifyContent: 'end', mt: '20px' }}>
                <Button sx={{ bgcolor: '#fff', color: 'bue', padding: '5px 10px', '&:hover': { color: '#fff', bgcolor: 'blue' }, border: '1px solid grey' }} onClick={handleClose}>Cancel</Button>
                <LoadingButton size="small" type="submit" variant="contained">
                  Create
                </LoadingButton>
              </Box>
            </Box>
          </form>
        </Modal>
        <Modal
          open={edit}
          onClose={handleClose}
          aria-labelledby="child-modal-title"
          aria-describedby="child-modal-description"
          sx={{
            overflowY: 'auto', maxHeight: '100vw', height: '100%', minHeight: '100vw',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            my: 'auto',
            mx: 'auto',
          }}
        >
          <form onSubmit={(e) => handleEditSubmit(e)}>
            <Box sx={{ ...style, width: { sm: 500 } }}>
              <h2 id="child-modal-title">New Category</h2>
              <Box sx={{ display: 'flex', flexDirection: 'column', flexWrap: 'wrap', gap: '1rem' }}>
                <TextField onInput={e => handleName(e)} value={name} id="outlined-search" label="Name" type="search" required />
                <FormControl sx={{ minWidth: 120, width: '100%' }} size="small">
                  <InputLabel id="demo-select-small-label">Select category</InputLabel>
                  <Select
                    labelId="demo-select-small-label"
                    id="demo-select-small"
                    value={age}
                    label="Select category"
                    onChange={(e) => handleChange(e)}
                  >
                    <MenuItem value={'Phones'}>Phones</MenuItem>
                    <MenuItem value={'Builds'}>Builds</MenuItem>
                    <MenuItem value={'Technologies'}>Technologies</MenuItem>
                  </Select>
                </FormControl>
                {
                  typeof (description.current) === 'string' ? <StyledTextarea
                    ref={description}
                    value={description.current}
                    sx={{ width: '100%' }}
                    aria-label="minimum height"
                    minRows={3}
                    maxRows={5}
                    maxLength={200}
                    placeholder="Description"
                  /> :
                    <StyledTextarea
                      ref={description}
                      value={description.current?.value}
                      sx={{ width: '100%' }}
                      aria-label="minimum height"
                      minRows={3}
                      maxRows={5}
                      maxLength={200}
                      placeholder="Description"
                    />
                }

              </Box>
              <Box sx={{ display: 'flex', gap: '20px', justifyContent: 'end', mt: '20px' }}>
                <Button sx={{ bgcolor: '#fff', color: 'bue', padding: '5px 10px', '&:hover': { color: '#fff', bgcolor: 'blue' }, border: '1px solid grey' }} onClick={handleClose}>Cancel</Button>
                <LoadingButton size="small" type="submit" variant="contained">
                  Create
                </LoadingButton>
              </Box>
            </Box>
          </form>
        </Modal>

        <Modal
          open={deleted}
          aria-labelledby="child-modal-title"
          aria-describedby="child-modal-description"
          sx={{
            overflowY: 'auto', maxHeight: '100vw', height: '100%', minHeight: '100vw',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            my: 'auto',
            mx: 'auto',
          }}
        >
          <form onSubmit={(e) => handleDeleteId(e)}>
            <Box sx={{ ...style, display: 'flex', flexDirection: 'column', alignItems: 'center', width: { sm: 500 } }}>
              <Typography sx={{ fontSize: 25 }} variant="subtitle2">Do you want to delete?</Typography>
              <Box sx={{ display: 'flex', gap: '20px', justifyContent: 'end', mt: '20px' }}>
                <Button type='submit' sx={{ bgcolor: '#fff', color: 'bue', padding: '5px 10px', '&:hover': { color: '#fff', bgcolor: 'red' }, border: '1px solid grey' }}>Yes</Button>
                <LoadingButton onClick={() => setDelete(false)} size="small" type="button" variant="contained">
                  No
                </LoadingButton>
              </Box>
            </Box>
          </form>
        </Modal>
      </div >
    </>
  );
}