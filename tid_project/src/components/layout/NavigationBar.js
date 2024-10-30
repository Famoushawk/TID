import React from "react";
import AddButton from "./AddButton.js";
import BurgerMenu from "./BurgerMenu.js";
import { useLocation } from "react-router-dom/dist/index.js";
import SettingsButton from "./SettingsButton.js"

function NavigationBar(){
    const location = useLocation();

    const renderButton = () => {
    switch (location.pathname) {
        case "/frame1":
            return <SettingsButton />
        case "/frame2":
            return <SettingsButton />
        case "/frame3":
            return <AddButton />
        case "/frame4":
            return <AddButton />
    }
}
    return (
    <nav className="fixed top-0 right-0 flex flex-col items-center bg-primary p-1 min-h-screen">
      <BurgerMenu />
     {renderButton()}
    </nav>
    )
}

export default NavigationBar;