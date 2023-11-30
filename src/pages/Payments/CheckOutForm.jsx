import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const CheckOutForm = ({campaign}) => {
    const [error, setError] = useState('')
    const [clientSecret, setClientSecret] = useState('')
    const [transactionId, setTransactionId] = useState('')
    const axoisSecure = useAxiosSecure()
    const navigate = useNavigate()
    const stripe = useStripe()
    const elements = useElements()
    const {user} = useAuth()
    const [amount, setAmount] = useState(0)


    useEffect(() => {
        if(amount > 0){
            axoisSecure.post('/create-payment-intent', {price: amount})
            .then(res => {
                console.log(res.data.clientSecret);
                setClientSecret(res.data.clientSecret)
            })
        }
    }, [axoisSecure, amount])

    const handleAmount = event => {
        const amountInput = event.target.value;
        setAmount(amountInput)
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        const form  = event.target;

        if(!stripe || !elements){
            return;
        }

        const card = elements.getElement(CardElement)

        if(card === null){
            return;
        }

        const {error, paymentMethod} = await stripe.createPaymentMethod({
            type: 'card',
            card
        })

        if(error){
            console.log('payment error', error);
            setError(error.message)
        }
        else{
            console.log('payment method', paymentMethod);
            setError('')
        }

        // confirm payment
        const {paymentIntent, error: confirmError} = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: user?.email || 'anonymous',
                    name: user?.displayName || 'anonymous',
                }
            }
        })

        if(confirmError){
            console.log('confirm error', confirmError);
        }
        else{
            console.log('payment intent' , paymentIntent);
            if(paymentIntent.status === 'succeeded'){
                console.log('payment id', paymentIntent.id);
                setTransactionId(paymentIntent.id)
                form.reset()

                // save payment in database
                const payment = {
                    campaignId: campaign._id,
                    name: campaign.name,
                    image: campaign.image,
                    donarName: user.displayName,
                    donarEmail: user.email,
                    amount: amount,
                    transactionId: paymentIntent.id,
                    date: new Date(), // utc date convert. use moment js to do it.
                }

                const res = await axoisSecure.post('/donations', payment)
                console.log('Donation saved', res.data);
                if(res.data?.result?.insertedId){
                    toast.success('Donation Successfull');
                    navigate(`/campaign-details/${campaign._id}`)
                }
            }
        }

    }    
    return (
        <form onSubmit={handleSubmit}>
            <div className="form-control mb-1">
                <label className="label">
                    <span className="label-text">Amount</span>
                </label>
                <input onChange={handleAmount} type="number" name="amount" placeholder="Enter amount" className="input input-bordered" required />
            </div>
            <label className="label">
                <span className="label-text">Card Information</span>
            </label>
            <div className="border p-4 rounded-lg">
                <CardElement
                    options={{
                    style: {
                        base: {
                        fontSize: '16px',
                        color: '#424770',
                        '::placeholder': {
                            color: '#aab7c4',
                        },
                        },
                        invalid: {
                        color: '#9e2146',
                        },
                    },
                    }}
                />
            </div>
            <button className="btn btn-sm md:btn-md btn-primary mt-8 md:text-base w-full" type="submit" disabled={!stripe || !clientSecret}>
                Pay
            </button>
            <p className="text-red-500 text-sm text-center mt-2">{error}</p>
            {transactionId && <p className="text-green-500 text-sm text-center mt-3">Your Transaction Id: {transactionId}</p>}
            <Toaster/>
        </form>
    );
};

export default CheckOutForm;