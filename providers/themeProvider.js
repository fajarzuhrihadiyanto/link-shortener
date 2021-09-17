// IMPORT FROM THIRD PARTY
import React, {Component, useState, useEffect} from 'react'

// IMPORT FROM THE APP
import themes from "./themes";

// CREATE NEW CONTEXT
const ThemeContext = React.createContext(themes.light)

export const ThemeProvider = ({children}) => {

    // Set theme as state
    const [themeContext, setThemeContext] = useState(themes.light)

    useEffect(() => {
        // Get theme from browser storage
        const savedTheme = localStorage.getItem('theme') || 'light'
        setThemeContext(themes[savedTheme])
    }, [])

    return (
        <ThemeContext.Provider value={[themeContext, setThemeContext]}>
            {children}
        </ThemeContext.Provider>
    )
}

export default ThemeContext