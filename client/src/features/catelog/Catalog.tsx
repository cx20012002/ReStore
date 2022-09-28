import React from 'react'
import ProductList from "./ProductList";
import LoadingComponent from "../../app/layout/LoadingComponent";
import {useAppDispatch, useAppSelector} from "../../app/store/configureStore";
import {setPageNumber, setProductParams} from "./catalogSlice";
import {
    Grid, Paper,
} from "@mui/material";
import ProductSearch from "./ProductSearch";
import RadioButtonGroup from "../../app/components/RadioButtonGroup";
import CheckBoxButtons from "../../app/components/CheckBoxButtons";
import AddPagination from "../../app/components/AddPagination";
import useProducts from "../../app/hooks/useProducts";

const sortOptions = [
    {value: 'name', label: 'Alphabetical'},
    {value: 'priceDesc', label: 'Price - High to low'},
    {value: 'price', label: 'Price - Low to high'},
]

function Catalog() {
    const {products, brands, types, filtersLoaded, metaData} = useProducts();

    const {productParams,} = useAppSelector(state => state.catalog);
    const dispatch = useAppDispatch();

    if (!filtersLoaded) return <LoadingComponent message={'Loading products...'}/>

    return (
        <Grid container spacing={4}>
            <Grid item xs={3}>
                <Paper sx={{mb: 2}}>
                    <ProductSearch/>
                </Paper>
                <Paper sx={{mb: 2, p: 2}}>
                    <RadioButtonGroup
                        options={sortOptions}
                        onChange={(e) => dispatch(setProductParams({orderBy: e.target.value}))}
                        selectedValue={productParams.orderBy}/>
                </Paper>

                <Paper sx={{mb: 2, p: 2}}>
                    <CheckBoxButtons
                        items={brands}
                        checked={productParams.brands}
                        onChange={(items: string[]) => dispatch(setProductParams({brands: items}))}
                    />
                </Paper>

                <Paper sx={{mb: 2, p: 2}}>
                    <CheckBoxButtons
                        items={types}
                        checked={productParams.types}
                        onChange={(items: string[]) => dispatch(setProductParams({types: items}))}
                    />
                </Paper>

            </Grid>
            <Grid item xs={9}>
                <ProductList products={products}/>
            </Grid>
            <Grid item xs={3}></Grid>
            <Grid item xs={9} sx={{mb: 2}}>
                {metaData &&
                    <AddPagination
                        metaData={metaData}
                        onPageChange={(page: number) => dispatch(setPageNumber({pageNumber: page}))}
                    />
                }

            </Grid>
        </Grid>
    )
}

export default Catalog

