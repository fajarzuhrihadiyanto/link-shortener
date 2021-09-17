// IMPORT FROM THIRD PARTY
import { useContext } from 'react'
import { SearchIcon } from '@heroicons/react/solid'

// IMPORT FROM THE APP
import ThemeContext from "../providers/themeProvider";

const Logo = () => {

    // Get the themes from the provider
    const [theme] = useContext(ThemeContext)

    return (
        <div className="flex flex-col sm:flex-row items-center">
            <SearchIcon className={"w-28 h-28 " + theme.text}/>
            <p className={"font-mono font-bold text-5xl " + theme.text}>buka.in</p>
        </div>
    )
}

export default Logo