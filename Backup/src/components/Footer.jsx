    import "./Footer.css";
    
    export default function Footer()
    {
        return(
            <footer id="footer-section">
                <div className="footer-container">
    
                    <p className="author-link">
                        <span className="copyright">© 2025</span>
                        <a
                            href="https://github.com/pedrobfernandes"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Pedro Fernandes
                        </a>
                    </p>
        
                    <p className="attributtions-paragraph">
                        Este aplicativo utiliza a API do TMDB, mas não é
                        endossado ou certificado pelo TMDB.
                        <br/>
                        Dados de disponibilidade fornecidos pelo JustWatch, via TMDB.
                    </p>
    
    
    
                    <a
                        href="https://www.themoviedb.org/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="tmdb-link"
                    >
                        <img
                            src="/tmdb-logo.svg"
                            alt="Logo do TMDB"
                            loading="lazy"
                            width={273}
                            height={36}
                        />
                    </a>
                </div>
            </footer>
        );
    }
    
