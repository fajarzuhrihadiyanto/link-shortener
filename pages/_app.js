// IMPORT FROM THIRD  PARTY
import { ApolloProvider } from "@apollo/client"
import 'tailwindcss/tailwind.css'

// IMPORT FROM THE APP
import {ThemeProvider} from "../providers/themeProvider"
import Layout from "../components/Layout"
import client from "../apollo-client"
import Head from 'next/head'

const MyApp = ({ Component, pageProps }) => {
    return (
        <>
        <ApolloProvider client={client}>
            <ThemeProvider>
                <Head>
                    <title>buka in</title>
                </Head>
                <Layout>
                    <Component {...pageProps} />
                </Layout>
            </ThemeProvider>
        </ApolloProvider>
        </>
    )
}

export default MyApp
