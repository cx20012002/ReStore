import React from 'react'
import {Product} from "../../app/models/product";
import {Grid, List} from "@mui/material";
import ProductCard from "./ProductCard";

interface Props {
    products: Product[];
}

function ProductList({products}: Props) {
    return (
        <Grid container spacing={4}>
            {products.map((product: Product) => (
                <Grid item xs={3} key={product.id}>
                    <ProductCard product={product}/>
                </Grid>
            ))}
        </Grid>
    )
}

export default ProductList