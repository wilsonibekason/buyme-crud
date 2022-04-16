import React, { useState } from 'react';
import { Paper, Stepper, Step, StepLabel, Typography, CircularProgress, Divider, Button } from '@mui/material';
import useStyles from './styles';
import AddressForm from '../AddressForm';
import PaymentForm from '../PaymentForm';


const steps = ['Shipping Address', 'Paymeny Details'];

const Checkout = () => {
    const [activeStep, setActiveStep] = useState(0);
    const classes = useStyles();

    const Confirmation = () => (
        <div>
            comfirmaton
        </div>
    )

    const Form = () => activeStep === 0 ? <AddressForm /> : <PaymentForm />;

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
            {activeStep === steps.length ? <Confirmation /> : <Form/> }
         </Paper>
     </main>
    </>
  )
}

export default Checkout