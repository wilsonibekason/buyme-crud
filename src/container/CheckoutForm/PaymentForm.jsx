import React from 'react';
import {Typography, Button , Divider} from '@mui/material';
import {Elements, CardElement, ElementConsumer} from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Review from './Review';

const stripePromise = loadStripe('pk_test_51Ko94ZHsdry1BnPVuyk0JdoJJDF6wLa4pQKLa3ESEVZulKcXI8UH0Sfcb8aTWw8wCRlMjKgOr7H9MVQPUgNw3RZc00ck62w0ES');
const PaymentForm = ({checkoutToken, backStep}) => {
    const handleSubmit = async(event, elements, stripe) => {
        //  event.preventDefault();

        //  if(!stripe || !elements) return

        //  const cardElement = elements.getElement(cardElement)

        //  const {error, paymentMethod}  = await stripe.createPaymentMethod({ type: 'card', card: cardElement});
    }
  return (
    <>
    <Review  checkoutToken={checkoutToken}/>
    <Divider />
    <Typography variant='h6' gutterBottom style={{margin: '20px 0'}}> Payment Method</Typography>
    <Elements stripe={stripePromise}>
     <ElementConsumer>
         {({elements, stripe}) => (
           <form onSubmit={(e) => handleSubmit(e, elements, stripe)}>
               <CardElement />
               <br />  <br />
               <div style={{display: 'flex', justifyContent: 'space-between'}}>
                   <Button variant='outlined' onClick={backStep}>
                       Back
                   </Button>
                   <Button type='submit' variant='contained' disabled={!stripe} color='primary' >
                       Pay {checkoutToken.live.subtotal_formatted_with_symbol}
                   </Button>
               </div>
           </form>
         )}
     </ElementConsumer>
    </Elements>
    </>
  )
}

export default PaymentForm