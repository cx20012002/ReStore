import React, {useState} from 'react';
import Catalog from "../../features/catelog/Catalog";
import Header from "./Header";
import {Container, createTheme, CssBaseline, ThemeProvider} from "@mui/material";
import {Route} from "react-router-dom";
import homePage from "../../features/home/HomePage";
import ProductDetails from "../../features/catelog/ProductDetails";
import AboutPage from "../../features/about/AboutPage";
import ContactPage from "../../features/contact/ContactPage";

function App() {
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

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <Header darkMode={darkMode} handleThemeChange={handleThemeChange}/>
            <Container>
                <Route exact path={'/'} component={homePage}/>
                <Route exact path={'/catalog'} component={Catalog}/>
                <Route path={'/catalog/:id'} component={ProductDetails}/>
                <Route path={'/about'} component={AboutPage}/>
                <Route path={'/contact'} component={ContactPage}/>
            </Container>
        </ThemeProvider>

    );
}

export default App;
