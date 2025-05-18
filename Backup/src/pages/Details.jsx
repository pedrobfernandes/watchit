import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import ActorLink from "../components/ActorLink";
import ProviderLink from "../components/ProviderLink";
import LoadingSpinner from "../components/LoadingSpinner";
import TrailerModal from "../components/TrailerModal";

import
{
    fetchTMDBMediaDetails,
    fetchTMDBCasting,
    fetchTMDBWatchProviders,
    fetchTMDBTrailer
    
} from "../api/tmdbAPI";


import "./Details.css";
import "./display.css";
import "../components/MediaCard.css";


export default function Details()
{
    const { type, id } = useParams();
    const [isTrailerOpen, setIsTrailerOpen] = useState(false);
   
    const
    {
        data: detailsData,
        isLoading: isLoadingDetailsData,
        error: errorDetailsData
        
    } = useQuery
    ({
        queryKey: ["details", type, id],
        queryFn : () => fetchTMDBMediaDetails(type, id),
        staleTime: 20 * 60 * 1000,
        gcTime: 2 * 60 * 60 * 1000,
    });

    const
    {
        data: castingData,
        isLoading: isLoadingCastingData,
        error: errorCastingData
        
    } = useQuery
    ({
        queryKey: ["casting", type, id],
        queryFn: () => fetchTMDBCasting(type, id),
        staleTime: 30 * 60 * 1000,
        gcTime: 60 * 60 * 1000,
    })

    const
    {
        data: providersData,
        isLoading: isLoadingProvidersData,
        error: errorProvidersData
        
    } = useQuery
    ({
        queryKey: ["providers", type, id],
        queryFn: () => fetchTMDBWatchProviders(type, id),
        staleTime: 30 * 60 * 1000,
        gcTime: 60 * 60 * 1000,
    })

    const { data: trailerData } = useQuery
    ({
        queryKey: ["trailer", type, id],
        queryFn: () => fetchTMDBTrailer(type, id),
    });


     useEffect(() => {
        if (detailsData?.poster_path) {
            const link = document.createElement("link");
            link.rel = "preload";
            link.as = "image";
            link.href = `https://image.tmdb.org/t/p/w500${detailsData.poster_path}`;
            link.fetchPriority = "high";
            document.head.appendChild(link);

            return () => {
                document.head.removeChild(link);
            };
        }
    }, [detailsData?.poster_path]);


    if
    (
        isLoadingDetailsData ||
        isLoadingCastingData ||
        isLoadingProvidersData
    )
    {
        return(<LoadingSpinner/>);
    }

    if
    (
        errorDetailsData ||
        errorCastingData ||
        errorProvidersData
    )
    {
        return(
            <p>
                Erro: {errorDetailsData?.message ||
                errorCreditsData?.message ||
                errorProvidersData?.message}
            </p>
        );
    }

    function handlePosterClick()
    {
        if (trailerData?.key)
        {
            setIsTrailerOpen(true);
        }
    }


    function getDetails(detailsData, castingData, providersData)
    {
        const poster =
        {
            src: `https://image.tmdb.org/t/p/w500${detailsData.poster_path}`,
            alt: `Poster de ${detailsData.title || detailsData.name}`,
            loading: "eager",
            fetchPriority: "high",
            width: 500,
            height: 750,
        };

        const title = detailsData.title || detailsData.name;

        const releaseYear = detailsData.release_date?.slice(0, 4) ||
            detailsData.first_air_date?.slice(0, 4);

        const titleInfo = releaseYear
            ? `${title} (${releaseYear})`
            : `${title}`;

        const sinopse = detailsData.overview;
        const genreList = detailsData.genres?.map(genre =>
        {
            return(genre.name);
            
        }).join(", ");

        const seasons = detailsData.number_of_seasons
            ? `Temporadas: ${detailsData.number_of_seasons}`
            : "";

        const episodes = detailsData.number_of_episodes
            ? `Episódios: ${detailsData.number_of_episodes}`
            : "";
             
        const castingList = (castingData?.slice(0, 18) || []).map(actor =>
        {
            return(
                <ActorLink key={actor.id} actor={actor}/>
            );
        });


        const providersList = (providersData?.flatrate || []).map(provider =>
        {
            return(
                <ProviderLink key={provider.provider_id} provider={provider}/>
            );
        });

        return(
            {
                poster, titleInfo,
                sinopse, genreList,
                seasons, episodes,
                castingList, providersList
            }
        );
    }

    const
    {
        poster, titleInfo, genreList,
        seasons, episodes, sinopse,
        castingList, providersList
        
    } = getDetails(detailsData, castingData, providersData);


    return(
        <main>
            <section className="overview-section">

                <h2>{titleInfo}</h2>
    
                <div className="details-container">
                    <button
                        className="poster-container"
                        onClick={handlePosterClick}
                        aria-label="Assistir Trailer"
                    >
                        <img
                            src={poster.src}
                            alt={poster.alt}
                            loading={poster.loading}
                            fetchPriority={poster.fetchPriority}
                            width={poster.width}
                            height={poster.height}
                        />
                    </button>
                    <TrailerModal
                        isOpen={isTrailerOpen}
                        onClose={() => setIsTrailerOpen(false)}
                        videoKey={trailerData?.key}
                    />

                    <div className="details">
                        <p>{genreList}</p>
                        {seasons && <p>{seasons}</p>}
                        {episodes && <p>{episodes}</p>}
                    </div>
                </div>

                <div className="sinopse-container">
                    <p>{sinopse}</p>
                </div>

                    
                            
            </section>

            {castingList.length !== 0 ?
                (
                    <section className="casting-section">
                        <h2>Elenco</h2>
                        <div className="card-container">  
                            {castingList}
                        </div>
                    </section>
                ) :

                (
                    <p>Informações de elenco indisponiveis</p>
                )
            }

            {providersList.length !== 0 ?
                (
                    <section className="providers-section">
                        <h2>Assista</h2>
                        <div className="card-container">
                            {providersList}
                        </div>
                    </section>
                ) :

                (
                    <p>Indisponivel em streaming por assinatura</p>
                )
            }
            
            <section className="link-section">
                <a
                    href={`https://www.themoviedb.org/${type}/${id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Veja mais detalhes de ${detailsData.title || detailsData.name}`}
                >
                    Veja mais detalhes
                </a>
            </section>
        </main>
    );
}
