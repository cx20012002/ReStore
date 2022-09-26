import React from 'react'
import {Button, ButtonGroup, Typography} from "@mui/material";
import {decrement, increment} from "./counterSlice";
import {useAppDispatch, useAppSelector} from "../../app/store/configureStore";

function ContactPage() {
    const dispatch = useAppDispatch();
    const {data, title} = useAppSelector(state => state.counter)

    return (
        <>
            <Typography variant={"h2"}>
                {title}
            </Typography>
            <Typography variant={"h5"}>
                The data is: {data}
            </Typography>
            <ButtonGroup>
                <Button onClick={() => dispatch(decrement(1))} variant={"contained"} color={"error"}>DECREMENT</Button>
                <Button onClick={() => dispatch(increment(1))} variant={"contained"} color={"primary"}>INCREMENT</Button>
                <Button onClick={() => dispatch(increment(5))} variant={"contained"} color={"secondary"}>INCREMENT BY 5</Button>
            </ButtonGroup>

        </>
        
    )
}

export default ContactPage