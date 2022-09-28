import {useEffect} from 'react'
import {useAppDispatch, useAppSelector} from "../store/configureStore";
import {fetchFilters, fetchProductsAsync, productSelectors} from "../../features/catelog/catalogSlice";

function UseProducts() {
    const products = useAppSelector(productSelectors.selectAll);
    const {
        productsLoaded,
        filtersLoaded,
        types,
        brands,
        metaData
    } = useAppSelector(state => state.catalog);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (!productsLoaded) dispatch(fetchProductsAsync());
    }, [productsLoaded, dispatch])

    useEffect(() => {
        if (!filtersLoaded) dispatch(fetchFilters());
    }, [filtersLoaded, dispatch])


    return {
        products,
        productsLoaded,
        filtersLoaded,
        brands,
        types,
        metaData
    }
       
}

export default UseProducts