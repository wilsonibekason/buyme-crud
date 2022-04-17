import React, { useEffect, useState } from 'react';
import { InputLabel, Select, MenuItem, Button, Grid, Typography } from '@mui/material';
import { useForm, FormProvider } from 'react-hook-form';
import CustomTextFeld from './CustomTextFeld';
import { commerce } from '../../lib/commerce';
import {Link} from 'react-router-dom';

const AddressForm = ({checkoutToken}) => {
    const methods = useForm();
     
    console.log("The token ",checkoutToken["id"]);
    console.log(checkoutToken);
    console.log("The  second token ",checkoutToken["cart_id"]);
    console.log("tHE shopping method contains " , checkoutToken.shipping_methods);


    // creating form states
    const [shippingCountries, setShippingCountries] = useState([]);
    const [shippingCountry, setShippingCountry] = useState([]);
    const [shippingSubdivisions, setShippingSubdivisions] = useState([]);
    const [shippingSubdivision, setShippingSubdivision] = useState([]);
    const [shippingOptions, setShippingOptions] = useState([]);
    const [shippingOption, setShippingOption] = useState([]);

    
    const fetchShippingCountries = async (checkoutTokenId) => {
        const { countries } = await commerce.services.localeListShippingCountries(checkoutTokenId);
    
        setShippingCountries(countries);
        setShippingCountry(Object.keys(countries)[0]);
      };
     
    const fetchSubdivisions = async(countryCode) => {
        const { subdivisions} = await commerce.services.localeListSubdivisions(countryCode);
        setShippingSubdivisions(subdivisions);
        setShippingSubdivision(Object.keys(subdivisions)[0]);
    }

    const fetchShippingOptions = async(checkoutTokenId, country, stateProvince = null) => {
        const options = await commerce.checkout.getShippingOptions(checkoutTokenId, {country, rejoin: stateProvince});
        setShippingOptions(options);
        setShippingOption(options[0].id);
    }
    
    console.log(shippingOptions);
     
    const country = Object.entries(shippingCountries).map(([code, name]) => ({id: code, label: name}));
    console.log(country);

    const division = Object.entries(shippingSubdivisions).map(([code, name]) => ({id: code, label: name}));


    useEffect(() => {
           fetchShippingCountries(checkoutToken.id);
      }, []);

      useEffect(() => {
          if(shippingCountry) fetchSubdivisions(shippingCountry)
      }, [shippingCountry]);

      useEffect(() => {
        if(shippingSubdivision) fetchShippingOptions(checkoutToken.id, shippingCountry, shippingSubdivision);
      }, [shippingSubdivision]);

   

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
                 <Select value={shippingCountry} fullWidth onChange={(e) => setShippingCountry(e.target.value)} >
                 {country.map((countryItem) => (
                    <MenuItem key={countryItem.id} value={countryItem.id}>
                {countryItem.label}
                 </MenuItem>
                 ))}
                 </Select>
              </Grid>
              
              <Grid item xs={12} sm={6}>
                 <InputLabel> Shipping SubDivisions</InputLabel>
                 <Select value={shippingSubdivision} fullWidth onChange={(e) => setShippingSubdivision(e.target.value)}>
                     {division.map((divisionItem) => (
                        <MenuItem key={divisionItem.id} value={divisionItem.id}>
                      {divisionItem.label}
                        </MenuItem>
                     ))}
                 </Select>
              </Grid>
              
              <Grid item xs={12} sm={6}>
                 <InputLabel> Shipping Options</InputLabel>
                 <Select value={shippingOption} fullWidth onChange={(e) => setShippingOption(e.target.value)}>
                  { shippingOptions.map((sO) => ({id: sO, label: `${sO.description} - (${sO.price.formatted_with_symbol})`})).map((option) => (
                      <MenuItem key={option.id} value={option.id}>
                      {option.label}
                        </MenuItem>
                  ))}
                 
                 </Select>
              </Grid>
             </Grid> 
             <br />
             <div style={{display: 'flex', justifyContent: 'space-between'}}>
             <Button component={Link} to='/cart' variant='oulined'>Back To Cart</Button>
             <Button variant='oulined'>Next</Button>
             </div>
         </form>
     </FormProvider>
     </>
  )
}

export default AddressForm