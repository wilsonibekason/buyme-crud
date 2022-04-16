import React from 'react';
import { InputLabel, Select, MenuItem, Button, Grid, Typography } from '@mui/material';
import { useForm, FormProvider } from 'react-hook-form';

const AddressForm = () => {
    const methods = useForm();

  return (
     <>
     <Typography variant='h6' gutterBottom> Shipping Address</Typography>
     <FormProvider {...methods} >
         <form action="" onSubmit={()=>{}}>
             <Grid container spacing={3} >
                 
             </Grid>
         </form>
     </FormProvider>
     </>
  )
}

export default AddressForm