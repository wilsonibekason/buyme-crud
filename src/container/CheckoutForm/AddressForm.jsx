import React, { useEffect, useState } from 'react';
import { InputLabel, Select, MenuItem, Button, Grid, Typography } from '@mui/material';
import { useForm, FormProvider } from 'react-hook-form';
import CustomTextFeld from './CustomTextFeld';
import { commerce } from '../../lib/commerce';

const AddressForm = ({checkoutToken}) => {
    const methods = useForm();
     
    console.log("The token ",checkoutToken["id"]);
    console.log(checkoutToken);
    console.log("The  second token ",checkoutToken["cart_id"]);
    console.log("tHE shopping method contains " , checkoutToken.shopping_methods);


    // creating form states
    const [shippingCountries, setShippingCountries] = useState([]);
    const [shippingCountry, setShippingCountry] = useState([]);
    const [shippingSubdivisions, setShippingSubdivisions] = useState([]);
    const [shippingSubdivision, setShippingSubdivision] = useState([]);
    const [shippingOptions, setShippingOptions] = useState([]);
    const [shippingOption, setShippingOption] = useState([]);

    const fetchShippingOptions  = async(checkoutTokenId) => {
        const { countries} =  await commerce.services.localeListShippingCountries(checkoutTokenId);
        setShippingCountries(countries);
        console.log(setShippingCountries(Object.keys(countries)[0]));
    };

    const country = Object.entries(shippingCountries).map(([code, name]) => ({id: code, label: name}));
    console.log(country);
    

    useEffect(() => {
      fetchShippingOptions(checkoutToken.id);
    
    }, []);
     
    // const fetchSubdivisions = async(countryCode) => {
    //     const { subdivisions} = commerce.services.localeListShippingSubdivisions(countryCode);
    //     setShippingSubdivision(subdivisions);
    //     setShippingSubdivision(object.keys(subdivisions)[0]);
    // }

    // const division = Object.entries(shippingSubdivision).map(([codeName]) => ({id: code, label: names}));


  return (
     <>
     <Typography variant='h6' gutterBottom> Shipping Address</Typography>
     <FormProvider {...methods} >
         <form action="" onSubmit={()=>{}}>
             <Grid container spacing={3} >
             <CustomTextFeld required name='Firstname' label='First Name'/>  
             <CustomTextFeld required name='LastName' label='Last Name'/>  
             <CustomTextFeld required name='email' label='Email'/>  
             <CustomTextFeld required name='City' label='city'/>  
             <CustomTextFeld required name='address' label='Address'/>  
             <CustomTextFeld required name='ZIP' label='ZIP'/>  
             <Grid item xs={12} sm={6}>
                 <InputLabel> Shipping Country</InputLabel>
                 <Select value={12} fullWidth onChange={(e) => setShippingCountries(e.target.value)} />
                 {/* {countries.map((country) => (
                    <MenuItem key={country.id} value={country.label}>
                 Select Me
                 </MenuItem>
                 ))} */}
              </Grid>
              {/*
              <Grid item xs={12} sm={6}>
                 <InputLabel> Shipping SubDivisions</InputLabel>
                 <Select value={12} fullWidth onChange={} />
                 <MenuItem key={} value={}>
                 Select Me
                 </MenuItem>
              </Grid>
              <Grid item xs={12} sm={6}>
                 <InputLabel> Shipping Options</InputLabel>
                 <Select value={12} fullWidth onChange={} />
                 <MenuItem key={} value={}>
                 Select Me
                 </MenuItem>
              </Grid>*/}
             </Grid> 
         </form>
     </FormProvider>
     </>
  )
}

export default AddressForm