// IMOPRT FROM THIRD PARTY
import {useContext} from 'react'

// IMPORT FROM THE APP
import ThemeContext from "../providers/themeProvider";
import Footer from "./Footer";
import ThemeToggle from "./ThemeToggle";
import Logo from "./Logo";

export default ({children}) => {

    // Get the theme from the provider
    const [theme] = useContext(ThemeContext)

    return (
        <>
            <div className={"flex flex-col justify-center items-center w-screen h-screen bg-" + theme.bg}>
                <ThemeToggle/>
                <Logo/>
                {children}
            </div>
            <Footer/>
        </>
    )
}

// export default class Layout extends Component {
//
//
//
//     render() {
//         return (
//             <ThemeProvider>
//                 <div className={"flex flex-col justify-center items-center w-screen h-screen bg-" + theme.bg}>
//                     {/*<ThemeToggle/>*/}
//                     {/*<Logo/>*/}
//                     {this.props.children}
//                 </div>
//                 <Footer/>
//             </ThemeProvider>
//         )
//     }
// }