import { useState } from "react";
import { Outlet } from "react-router";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { ReactQueryDevtoolsPanel } from '@tanstack/react-query-devtools'

export default function App()
{
    //const [isOpen, setIsOpen] = useState(false);
    const [category, setCategory] = useState("popular");
    
    return(
        <>
            <Navbar setCategory={setCategory}/>
            <Outlet context={{ category }}/>
            <Footer/>

            {/*<button
                onClick={() => setIsOpen(!isOpen)}
            >
                {`${isOpen ? 'Close' : 'Open'} the devtools panel`}
            </button>
            {
                isOpen &&
                    <ReactQueryDevtoolsPanel
                        onClose={() => setIsOpen(false)}
                    />
            } */}
        </>
    );
}
