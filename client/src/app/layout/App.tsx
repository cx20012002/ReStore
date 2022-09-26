import React, {useCallback, useEffect, useState} from 'react';
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
import LoadingComponent from "./LoadingComponent";
import {useAppDispatch} from "../store/configureStore";
import {fetchBasketAsync} from "../../features/basket/baskertSlice";
import Login from "../../features/account/Login";
import Register from "../../features/account/Register";
import {fetchCurrentUser} from "../../features/account/accountSlice";
import PrivateRoute from "./PrivateRoute";
import Orders from "../../features/orders/Orders";
import CheckoutWrapper from "../../features/checkout/CheckoutWrapper";

function App() {
    const dispatch = useAppDispatch();
    const [loading, setLoading] = useState(true);

    const initApp = useCallback(async () => {
        try {
            await dispatch(fetchCurrentUser());
            await dispatch(fetchBasketAsync());
        } catch (error) {
            console.log(error);
        }
    }, [dispatch])

    useEffect(() => {
        initApp().then(() => setLoading(false));
    }, [initApp])

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
                    <PrivateRoute path={'/checkout'} component={CheckoutWrapper}/>
                    <PrivateRoute path={'/orders'} component={Orders}/>
                    <Route path={'/login'} component={Login}/>
                    <Route path={'/register'} component={Register}/>
                    <Route component={NotFound}/>
                </Switch>
            </Container>
        </ThemeProvider>

    );
}

export default App;
