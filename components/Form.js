// IMPORT FROM THIRD PARTY
import { useMutation  } from "@apollo/client";
import { ArrowUpIcon } from '@heroicons/react/solid'
import gql from "graphql-tag";
import {useState, useContext, useEffect} from 'react'

// IMPORT FROM THE APP
import Result from "./Result"
import ThemeContext from "../providers/themeProvider";

const Form = () => {

    // Get the themes from the provider
    const [theme] = useContext(ThemeContext)

    // Modal status
    const [isModalOpened, setIsModalOpened] = useState(false)

    const [host, setHost] = useState('')

    // Original link field status
    const [originalLink, setOriginalLink] = useState("")
    const [originalLinkError, setOriginalLinkError] = useState("")

    // Shorten link field status
    const [shortenLink, setShortenLink] = useState("")
    const [shortenLinkError, setShortenLinkError] = useState("")

    // General error status
    const [otherError, setOtherError] = useState("")

    // Original link field change handler
    const onOriginalLinkChange = (event) => {
        setOriginalLink(event.target.value.trim())
        if (originalLinkError !== "") setOriginalLinkError("")
    }

    // Shorten link field change handler
    const onShortenLinkChange = (event) => {
        setShortenLink(event.target.value.trim())
        if (shortenLinkError !== "") setShortenLinkError("")
    }

    // Close modal button handler
    const closeModal = () => {
        setIsModalOpened(false)
    }

    // Mutation method for insert one link
    const [addLink, {loading}] = useMutation(gql`
        mutation addLink(
            $path: String!
            $originalLink: String!
            $createdDate: DateTime!
            ) {
                insertOneLink(data: {
                    path: $path,
                    originalLink: $originalLink,
                    createdDate: $createdDate
                }) {
                    path
                    originalLink
                }
        }
    `, {
        // Mutation error handler
        onError: error => {
            if (error.message && error.message.startsWith("Duplicate")) {
                setShortenLinkError(shortenLink + " is already taken, please type another path")
            } else {
                setOtherError("Something error, please try again !")
            }
        },
        // Mutation complete handler
        onCompleted: ignored => {
            setIsModalOpened(true)
        }
    })

    // Form submit handler
    const createLink = async () => {

        // Initiate error status as false
        let isError = false;

        // If there was an ignored error, than it still error
        if (originalLinkError || shortenLinkError) isError = true

        // Check for original link field error
        if (originalLink === "") {
            setOriginalLinkError("Original URL cannot be empty")
            isError = true;
        } else if(originalLink.match(/^(https?|chrome):\/\/[^\s$.?#].[^\s]*$/g) === null) {
            setOriginalLinkError("URL is not valid")
            isError = true;
        }

        // Check for shorten link error
        if (shortenLink === "") {
            setShortenLinkError("path cannot be empty")
            isError = true;
        } else if(shortenLink.match(/^[a-zA-Z0-9]+$/g) === null) {
            setShortenLinkError("path must only contain alphanumeric")
            isError = true;
        }

        // If there is any error, than stop the process
        if (isError) return

        // If there is no error, then add link to database
        await addLink({
            variables: {
                path: shortenLink,
                originalLink: originalLink,
                createdDate: new Date()
            }
        })

    }

    useEffect(() => {
        setHost(window.location.href)
    }, [])

    return (
        <div className="mt-5 px-10 w-full md:w-3/4">
            <div className="flex space-x-2 sm:space-x-5 items-start">
                <div className="w-full">
                    <input
                        type="text"
                        name="original-link"
                        id="original-link"
                        value={originalLink}
                        onChange={onOriginalLinkChange}
                        className={"block w-full p-2 sm:p-4 border rounded-md text-"+theme.text+" bg-"+theme.input+" " + (originalLinkError !== "" ? "border-red-500" : ("border-" + theme.btnOutline))}
                        placeholder="https://example.com/very/very-long/path-to-write"
                    />
                    {originalLinkError !== "" && <p className="mt-2 text-red-500 text-sm">{originalLinkError}</p>}
                </div>
                <button className={"flex items-center px-5 py-2 sm:px-10 sm:py-4 bg-"+theme.btnBg+" text-"+theme.btnText+" rounded-md"} onClick={createLink}>
                    {loading && <ArrowUpIcon className="w-4 h-4 animate-bounce mr-3"/>}
                    shorten!
                </button>
            </div>
            <div className="flex justify-between items-start mt-5">
                <div className="flex w-full space-x-1 sm:space-x-3">
                    <p className={"text-"+theme.text+" mt-2 sm:mt-4"}>{host}</p>
                    <div className="w-full sm:w-96 ">
                        <input
                            type="text"
                            name="shorten-link"
                            id="shorten-link"
                            value={shortenLink}
                            onChange={onShortenLinkChange}
                            className={"block w-full p-2 sm:p-4 border rounded-md text-"+theme.text+" bg-"+theme.input+" " + (shortenLinkError !== "" ? "border-red-500" : ("border-" + theme.btnOutline))}
                            placeholder="path"
                        />
                        {shortenLinkError !== "" && <p className="mt-2 text-red-500 text-sm">{shortenLinkError}</p>}
                    </div>
                </div>
            </div>
            <Result originalLink={originalLink} path={shortenLink} isOpen={isModalOpened} closeModal={closeModal}/>
            {otherError &&
            <div className="mt-5">
                <p className="text-red-500">{otherError}</p>
            </div>
            }
        </div>
    )
}

export default Form