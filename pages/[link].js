// IMPORT FROM THIRD PARTY
import { useRouter } from 'next/router'
import { useState, useEffect } from "react"
import { useQuery } from "@apollo/client"
import gql from "graphql-tag"

// IMPORT FROM THE APP
import NotFound from "../components/NotFound"

const LinkRedirect = () => {
    // Get url path from browser
    const router = useRouter()
    const {link} = router.query

    // is found state
    const [isFound, setIsFound] = useState(true)

    // fetch the original link from the database
    useQuery(gql`
        query getLink($path: String!) {
            link(query: {
                path: $path
            }) {
                originalLink
            }
        }
    `, {
        // Set the path variable
        variables: {
            path: link
        },
        // Query complete handler
        onCompleted: data => {
            if (data.link) {
                // If data is found, then redirect to the original link
                window.location.href = data.link.originalLink
            } else {
                // If data is not found, then show the 404 message error
                setIsFound(false)
            }
        }
    })

    return (
        <>{isFound && <div className="h-36 w-36 border-t-4 rounded-full border-gray-500 animate-spin"/>}
            {!isFound && <NotFound/>}</>
    )
}

export default LinkRedirect