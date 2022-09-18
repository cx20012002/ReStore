import React from 'react'
import {AppBar, Switch, Toolbar, Typography} from "@mui/material";

interface Props {
    darkMode: boolean;
    handleThemeChange: () => void;
}

function Header({darkMode, handleThemeChange}:Props) {
    return (
        <AppBar sx={{mb: 4}} position={"static"}>
            <Toolbar>
                <Typography variant={"h6"}>
                    RE-STORE
                </Typography>
                <Switch checked={darkMode} onChange={handleThemeChange}/>
            </Toolbar>
        </AppBar>
    )
}

export default Header