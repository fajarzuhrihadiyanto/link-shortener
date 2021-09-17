// IMPORT FROM THRIRD PARTY
import {useContext} from 'react'

// IMPORT FROM THE APP
import ThemeContext from "../providers/themeProvider";

const NotFound = () => {

    // Get the theme from the provider
    const [theme] = useContext(ThemeContext)

    return (
        <div>
            <p className={theme.text}>ERROR 404 : Not Found</p>
        </div>
    )
}

export default NotFound