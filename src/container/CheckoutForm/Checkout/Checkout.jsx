import React, { useEffect, useState } from 'react';
import { Paper, Stepper, Step, StepLabel, Typography, CircularProgress, Divider, Button } from '@mui/material';
import useStyles from './styles';
import AddressForm from '../AddressForm';
import PaymentForm from '../PaymentForm';
import { commerce } from '../../../lib/commerce';


const steps = ['Shipping Address', 'Paymeny Details'];

const Checkout = ({cart}) => {
    const [activeStep, setActiveStep] = useState(0);
    const [checkoutToken, setCheckoutToken] = useState(null);
    const classes = useStyles();
     /**checkoutToken && **/
    // console.log(checkoutToken);
   
    useEffect(() => {
        if (cart.id) {
          const generateToken = async () => {
            try {
              const token = await commerce.checkout.generateToken(cart.id, { type: 'cart' });
    
              setCheckoutToken(token);
              console.log(token);
            } catch {
              // if (activeStep !== steps.length) history.push('/');
            }
          };
    
          generateToken();
        }
      }, [cart]);
    

    const Confirmation = () => (
        <div>
            comfirmaton
        </div>
    )

    const Form = () => activeStep === 0 ? <AddressForm checkoutToken={checkoutToken}/> : <PaymentForm />;

  return (
    <>
    <div className={classes.toolbar} />
     <main className={classes.layout}> 
         <Paper className={classes.paper}>
            <Typography variant='h4' align='center'>
                Checkout
            </Typography>
            <Stepper  activeStep={0} className={classes.stepper}>
                {steps.map((step) => (
                    <Step key={step}>
                        <StepLabel> {step} </StepLabel>
                    </Step> 
                ))}
            </Stepper>
            {activeStep === steps.length ? <Confirmation /> : checkoutToken && <Form/> }
            
         </Paper>
     </main>
    </>
  )
}

export default Checkout