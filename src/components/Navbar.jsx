import { useState, useEffect } from "react";
import { Link } from "react-router";
import { MdMovie } from "react-icons/md";
import Search from "./Search";

import "./Navbar.css";


export default function Navbar(props)
{
    const { setCategory } = props;
    const [isMobile, setIsMobile] = useState(window.innerWidth < 1200);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    function handleResize()
    {
        setIsMobile(window.innerWidth < 1200);
    }

    function scrollToSection(id)
    {
        const element = document.getElementById(id);
        if (element)
        {
            element.scrollIntoView
            ({
                behavior: "smooth",
                block: "start"
            });
        }

        if (isMobile)
        {
            setIsMenuOpen(false);
        }
    }


    useEffect(() =>
    {
        window.addEventListener("resize", handleResize);
        return(() => window.removeEventListener("resize", handleResize));
        
    }, []);


    useEffect(() =>
    {
        if (!isMobile && isMenuOpen)
        {
            setIsMenuOpen(false);
        }
        
    }, [isMobile]);

    
    return(
        <header>
            <h1 className="visually-hidden">WatchIt</h1>
            <div className="header-container">
                <Link
                    to={"/"}
                    className="app-logo"
                    aria-label="WatchIt - Clique para voltar á página inicial"
                >
                    <MdMovie aria-hidden="true"/>
                    WatchIt
                </Link>

                {isMobile && (
                    <button
                        className="hamburger"
                        type="button"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                       Menu
                    </button>
                )}

                <nav className={isMobile ? (isMenuOpen ? "open" : "") : "desktop"}>
                    <button
                        type="button"
                        className="nav-link"
                        aria-label="Navegue para a secção de filmes"
                        onClick={() => scrollToSection("movies-section")}
                    >
                        Filmes
                    </button>
    
                    <button
                        type="button"
                        className="nav-link"
                        aria-label="Navegue para a secção de séries"
                        onClick={() => scrollToSection("series-section")}
                    >
                        Séries
                    </button>


                    <button
                        type="button"
                        className="nav-link"
                        aria-label="Veja os filmes e séries populares"
                        onClick={() => setCategory("popular")}
                    >
                        Populares
                    </button>

                    <button
                        type="button"
                        className="nav-link"
                        aria-label="Veja os melhores filmes e séries, ( Os mais votados)"
                        onClick={() => setCategory("top_rated")}
                    >
                        Melhores
                    </button>


                    <button
                        type="button"
                        className="nav-link"
                        aria-label="Ir para os créditos do aplicativo"
                        onClick={() => scrollToSection("footer-section")}
                    >
                        Créditos
                    </button>
                    <Search setIsMenuOpen={setIsMenuOpen} isMobile={isMobile}/>
                </nav>
            </div>
        </header>
    );
}
