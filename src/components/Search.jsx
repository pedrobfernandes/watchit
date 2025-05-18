import { useState } from "react";
import { useNavigate } from "react-router";


export default function Search(props)
{
    const { setIsMenuOpen, isMobile } = props;
    const [query, setQuery] = useState("");
    const navigate = useNavigate();

    function handleSubmit(event)
    {
        event.preventDefault();

        if (!query.trim())
        {
            setQuery("");
            return;
        }
   
        navigate(`/search?q=${encodeURIComponent(query)}`);
        setQuery("");

        if (isMobile && setIsMenuOpen)
        {
            setIsMenuOpen(false);
        }
    }
    
    return(
        <form role="search" onSubmit={handleSubmit}>
            <label
                htmlFor="search-input"
                className="visually-hidden"
            >
                Pesquise por filmes ou séries
            </label>
            <input
                type="text"
                id="search-input"
                value={query}
                onChange={event => setQuery(event.target.value)}
                placeholder="Pesquise por filmes ou séries"
            />
            <button
                type="submit"
                aria-label="Buscar filme ou série"
            >
                Buscar
            </button>
        </form>
    );
}
