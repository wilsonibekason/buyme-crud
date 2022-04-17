import React, { useEffect, useState } from 'react';
import { Paper, Stepper, Step, StepLabel, Typography, CircularProgress, Divider, Button, CssBaseline } from '@mui/material';
import useStyles from './styles';
import AddressForm from '../AddressForm';
import PaymentForm from '../PaymentForm';
import { commerce } from '../../../lib/commerce';
import { Link, useHistory } from 'react-router-dom';


const steps = ['Shipping Address', 'Paymeny Details'];

const Checkout = ({cart, error, order, onCaptureCheckout}) => {
    const [activeStep, setActiveStep] = useState(0);
    const [checkoutToken, setCheckoutToken] = useState(null);
    const [shippingData, setShippingData] = useState({});
    const [isFinsihed, setIsFinsihed] = useState(false);
    const classes = useStyles();
     /**checkoutToken && **/
    // console.log(checkoutToken);
    const history = useHistory();
   
    useEffect(() => {
        if (cart.id) {
          const generateToken = async () => {
            try {
              const token = await commerce.checkout.generateToken(cart.id, { type: 'cart' });
    
              setCheckoutToken(token);
              console.log(token);
            } catch (error){
              if (activeStep !== steps.length) history.push('/');
            }
          };
    
          generateToken();
        }
      }, [cart]);

     

      const nextStep = () => setActiveStep((prevActiveStep) => prevActiveStep + 1);
      const backStep = () => setActiveStep((prevActiveStep) => prevActiveStep - 1);

      const next = (data) => {
        setShippingData(data);
        nextStep();
    }
    const timeout = () => {
    setTimeout(() => {
      console.log('hello world');
      setIsFinsihed(true)
    }, 1000);
  }

    let Confirmation = () => order.customer ? (
      <>
       <div>
            <Typography variant='h5'>Thank you for your purchase {order.customer.firstname} {order.customer.lastname} </Typography> 
            <Divider />
            <Typography variant='subtitle2'>Order ref: {order.customer_reference}</Typography>
        </div>
        <Button variant='contained' type='submit' component={Link} to='/cart'> Back To Home</Button>
      </>
    ) :
    //  isFinsihed ?  (
    //   <>
    //   <div>
    //   <Typography variant='h5'>Thank you for your purchase {order.customer.firstname} {order.customer.lastname} </Typography> 
    //   <Divider />
    //       <Typography variant='subtitle2'>Order ref: {order.customer_reference}</Typography>
    //   </div>
    //   <Button variant='contained' type='submit' component={Link} to='/cart'> Back To Home</Button>

    //   </div>
    //   </>
    // ) :
     (
      <div className={classes.spinner}>
        <CircularProgress/>
      </div>
    );

    if(error) return (
      <>
      <Typography variant='h3' >Error: {error}</Typography> 
      <Button variant='contained' type='submit'  component={Link} to='/cart'>Back To Home</Button>
      </>
    )

    const Form = () => activeStep === 0 ? <AddressForm checkoutToken={checkoutToken} next={next}/> : <PaymentForm shippingData={shippingData} checkoutToken={checkoutToken} nextStep={nextStep} backStep={backStep} onCaptureCheckout={onCaptureCheckout} timeout={timeout}/>;

  return (
    <>
    <CssBaseline />
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