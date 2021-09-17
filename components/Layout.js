// IMOPRT FROM THIRD PARTY
import {useContext} from 'react'

// IMPORT FROM THE APP
import ThemeContext from "../providers/themeProvider";
import Footer from "./Footer";
import ThemeToggle from "./ThemeToggle";
import Logo from "./Logo";

const Layout = ({children}) => {

    // Get the theme from the provider
    const [theme] = useContext(ThemeContext)

    return (
        <>
            <div className={"flex flex-col justify-center items-center w-screen h-screen " + theme.bg}>
                <ThemeToggle/>
                <Logo/>
                {children}
            </div>
            <Footer/>
        </>
    )
}

export default Layout