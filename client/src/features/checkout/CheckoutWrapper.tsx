import React, {useEffect, useState} from 'react'
import {Elements} from "@stripe/react-stripe-js";
import CheckoutPage from "./CheckoutPage";
import {loadStripe} from "@stripe/stripe-js";
import {useAppDispatch} from "../../app/store/configureStore";
import agent from "../../app/api/agent";
import {setBasket} from "../basket/baskertSlice";
import LoadingComponent from "../../app/layout/LoadingComponent";

const stripePromise = loadStripe('pk_test_8ZmjzNPdXjFOsST3K8RuHmBH00Xvtu2Bov')

function CheckoutWrapper() {
    const dispatch = useAppDispatch();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        agent.Payments.createPaymentIntent()
            .then(basket => dispatch(setBasket(basket)))
            .catch(error => console.log(error))
            .finally(() => setLoading(false))
    }, [dispatch]);

    if (loading) return <LoadingComponent message={"Loading checkout..."}/>

    return (
        <Elements stripe={stripePromise}>
            <CheckoutPage/>
        </Elements>
    )
}

export default CheckoutWrapper