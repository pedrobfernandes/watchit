import { useState } from "react";
import { Outlet } from "react-router";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export default function App()
{
    const [category, setCategory] = useState("top_rated");
    
    return(
        <>
            <Navbar setCategory={setCategory}/>
            <Outlet context={{ category }}/>
            <Footer/>
        </>
    );
}
