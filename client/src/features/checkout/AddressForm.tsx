import React from 'react'
import { Grid, Typography} from "@mui/material";
import {useFormContext} from "react-hook-form";
import AppTextInput from "../../app/components/AppTextInput";
import AppCheckbox from "../../app/components/AppCheckbox";

function AddressForm() {
    const {control, formState} = useFormContext();
    return (
        <>
            <Typography variant="h6" gutterBottom>
                Shipping address
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={12}>
                    <AppTextInput label={"Full Name"} name={"fullName"} control={control}/>
                </Grid>
                <Grid item xs={12}>
                    <AppTextInput label={"Address 1"} name={"address1"} control={control}/>
                </Grid>
                <Grid item xs={12}>
                    <AppTextInput label={"Address 2"} name={"address2"} control={control}/>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <AppTextInput label={"City"} name={"city"} control={control}/>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <AppTextInput label={"State"} name={"state"} control={control}/>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <AppTextInput label={"Zipcode"} name={"zip"} control={control}/>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <AppTextInput label={"Country"} name={"country"} control={control}/>
                </Grid>
                <Grid item xs={12}>
                    <AppCheckbox 
                        disabled={!formState.isDirty}
                        label={"Save this as the default address"} 
                        name={"saveAddress"} 
                        control={control}
                    />
                </Grid>
            </Grid>
        </>
    )
}

export default AddressForm