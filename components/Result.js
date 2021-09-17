// IMPORT FROM THIRD PARTY
import { Dialog, Transition } from '@headlessui/react'
import { useEffect, useState, Fragment } from 'react'
import QRCode from 'qrcode.react'
import { DuplicateIcon } from '@heroicons/react/solid'

// IMPORT FROM THE APP
import {useContext} from 'react'
import ThemeContext from "../providers/themeProvider"


const Result = (props) => {
    // Get the theme from the provider
    const [theme] = useContext(ThemeContext)
    
    // Get the host
    const [host, setHost] = useState('')

    useEffect(() => {
        setHost(window.location.href)
    })
    return (
        <Transition appear show={props.isOpen} as={Fragment}>
            <Dialog
                as="div"
                className="fixed inset-0 z-10 overflow-y-auto"
                onClose={props.closeModal}
            >
                <div className="min-h-screen px-4 text-center">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-75" />
                    </Transition.Child>

                    {/* This element is to trick the browser into centering the modal contents. */}
                    <span
                        className="inline-block h-screen align-middle"
                        aria-hidden="true"
                    >
                      &#8203;
                    </span>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 scale-95"
                        enterTo="opacity-100 scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 scale-100"
                        leaveTo="opacity-0 scale-95"
                    >
                        <div className={"inline-block max-w-sm p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl bg-"+theme.bg}>
                            <div className="mt-2 flex flex-col items-center">
                                <QRCode bgColor={theme.barcode.bg} fgColor={theme.barcode.fg} size={256} value={host + props.path}/>
                                <div className="flex w-full mt-4 space-x-4">
                                    <input className={"w-full p-3 border rounded-md text-"+theme.text+" bg-" + theme.input + " border border-" + theme.btnOutline} type="text" value={host + props.path} readOnly/>
                                    <button className={"bg-"+theme.text+" rounded-md p-3"} onClick={() => navigator.clipboard.writeText(host + props.path)}><DuplicateIcon className={"w-5 h-5 text-"+theme.btnText}/></button>
                                </div>
                            </div>
                            <div className="mt-5">
                                <p className={"font-bold text-sm text-"+theme.text}>NOTE : Copy the link or screenshot the QR code before close this modal</p>
                                <button
                                    type="button"
                                    className={"inline-flex justify-center w-full py-2 mt-2 text-sm font-medium text-"+theme.dangerBtn.text+" bg-"+theme.dangerBtn.bg+" border border-transparent rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"}
                                    onClick={props.closeModal}
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition>
    )
}

export default Result