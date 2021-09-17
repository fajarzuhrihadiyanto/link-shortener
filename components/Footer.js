// IMPORT FROM THIRD PARTY
import {useContext} from 'react'

// IMPORT FROM THE APP
import ThemeContext from "../providers/themeProvider";

const Footer = () => {
    // Get the theme from the provider
    const [theme] = useContext(ThemeContext)

    return (
        <div className={"fixed bottom-0 left-0 right-0 border-t-2 border-"+theme.footerOutline+" text-center p-3 bg-" + theme.footerBg}>
            <p className={"text-" + theme.text}>Made by Fajar Zuhri Hadiyanto</p>
        </div>
    )
}

export default Footer