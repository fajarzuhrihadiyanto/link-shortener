// IMPORT FROM THIRD PARTY
import { useEffect, useState, useContext } from 'react'
import { Switch } from '@headlessui/react'
import { MoonIcon, SunIcon } from '@heroicons/react/solid'

// IMPORT FROM THE APP
import themes from "../providers/themes";
import ThemeContext from "../providers/themeProvider";

const ThemeToggle = () => {

    // Get the themes from the provider
    const [themeContext, setThemeContext] = useContext(ThemeContext)

    // Dark mode status
    const [isDark, setIsDark] = useState(false)

    // Theme toggle handler
    const [themeToggleHandler, setThemeToggleHandler] = useState(undefined)

    useEffect(() => {
        // Get dark status from browser storage
        const isDark = localStorage.getItem('theme') === 'dark'
        setIsDark(isDark)

        // Set theme toggle handler
        const themeToggle = (yes) => {
            if (!yes) {
                setThemeContext(themes.light)
                localStorage.setItem('theme', 'light')
            } else {
                setThemeContext(themes.dark)
                localStorage.setItem('theme', 'dark')
            }

            setIsDark(yes)
        }
        setThemeToggleHandler(() => themeToggle)
    }, [])

    return (
        <div className="absolute flex space-x-3 top-10 right-10 ">
            <SunIcon className={"w-6 h-6 "+(isDark ? "text-yellow-300" : "text-yellow-400")}/>
            <Switch
                checked={isDark}
                onChange={themeToggleHandler}
                className={`${
                    isDark ? 'bg-gray-600' : 'bg-gray-300'
                } inline-flex items-center h-6 rounded-full w-11`}
            >
                <span className="sr-only">Enable notifications</span>
                <span
                    className={`${
                        isDark ? 'translate-x-6' : 'translate-x-1'
                    } transform transition ease-in-out duration-200 inline-block w-4 h-4 transform bg-white rounded-full`}
                />
            </Switch>
            <MoonIcon className={"w-6 h-6 "+(isDark ? "text-gray-300" : "text-gray-400")}/>
        </div>
    )
}

export default ThemeToggle