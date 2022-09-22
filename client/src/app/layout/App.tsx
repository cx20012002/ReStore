import React, {useEffect, useState} from 'react';
import Catalog from "../../features/catelog/Catalog";
import Header from "./Header";
import {Container, createTheme, CssBaseline, ThemeProvider} from "@mui/material";
import {Route, Switch} from "react-router-dom";
import homePage from "../../features/home/HomePage";
import ProductDetails from "../../features/catelog/ProductDetails";
import AboutPage from "../../features/about/AboutPage";
import ContactPage from "../../features/contact/ContactPage";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import ServerError from "../errors/ServerError";
import NotFound from "../errors/NotFound";
import BasketPage from "../../features/basket/BasketPage";
import {getCookie} from "../util/util";
import agent from "../api/agent";
import LoadingComponent from "./LoadingComponent";
import CheckoutPage from "../../features/checkout/CheckoutPage";
import {useAppDispatch} from "../store/configureStore";
import {setBasket} from "../../features/basket/baskertSlice";

function App() {
    const dispatch = useAppDispatch();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const buyerId = getCookie('buyerId');
        if (buyerId) {
            agent.Basket.get()
                .then(basket => dispatch(setBasket(basket)))
                .catch(error => console.log(error))
                .finally(() => setLoading(false));
        } else {
            setLoading(false);
        }
    }, [dispatch])

    const [darkMode, setDarkMode] = useState(false);
    const paletteType = darkMode ? 'dark' : 'light';
    const theme = createTheme({
        palette: {
            mode: paletteType,
            background: {
                default: paletteType === 'light' ? '#eaeaea' : '#121212'
            }
        }
    })

    function handleThemeChange() {
        setDarkMode(!darkMode);
    }

    if (loading) return <LoadingComponent message={"Initialising app..."}/>

    return (
        <ThemeProvider theme={theme}>
            <ToastContainer theme={"colored"} position={"bottom-right"} hideProgressBar/>
            <CssBaseline/>
            <Header darkMode={darkMode} handleThemeChange={handleThemeChange}/>
            <Container>
                <Switch>
                    <Route exact path={'/'} component={homePage}/>
                    <Route exact path={'/catalog'} component={Catalog}/>
                    <Route path={'/catalog/:id'} component={ProductDetails}/>
                    <Route path={'/about'} component={AboutPage}/>
                    <Route path={'/contact'} component={ContactPage}/>
                    <Route path={'/server-error'} component={ServerError}/>
                    <Route path={'/basket'} component={BasketPage}/>
                    <Route path={'/checkout'} component={CheckoutPage}/>
                    <Route component={NotFound}/>
                </Switch>
            </Container>
        </ThemeProvider>

    );
}

export default App;
