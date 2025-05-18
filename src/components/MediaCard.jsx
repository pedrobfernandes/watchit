import { useIntersectionObserver } from "../hooks/useIntersectionObserver";
import { Link } from "react-router";
import { useQueryClient } from "@tanstack/react-query";
import { MdStar } from "react-icons/md";
import { fetchTMDBMediaDetails } from "../api/tmdbAPI";
import { useRef } from "react";

export default function MediaCard(props)
{
    const { data, type } = props;
    const { isVisible, elementRef } = useIntersectionObserver();
    const queryClient = useQueryClient();
    const timeoutRef = useRef(null);
    const rating = data.vote_average.toFixed(1);

    function handlePrefetch()
    {
        queryClient.prefetchQuery
        ({
            queryKey: ["details", type, data.id],
            queryFn: () => fetchTMDBMediaDetails(type, data.id),
            staleTime: 20 * 60 * 1000
        });
    }

    function handleMouseEnter()
    {
        timeoutRef.current = setTimeout(handlePrefetch, 300);
    }

    function handleMouseLeave()
    {
        clearTimeout(timeoutRef.current);
    }

    function handleTouchStart()
    {
        timeoutRef.current = setTimeout(handlePrefetch, 500);
    }

    function handleTouchEnd()
    {
        clearTimeout(timeoutRef.current);
    }
        
    return(
            <Link
                to={`/details/${type}/${data.id}`}
                className="card"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
            >
                <img
                    ref={elementRef}
                    src={`https://image.tmdb.org/t/p/w500${data.poster_path}`}
                    srcSet={`
                        https://image.tmdb.org/t/p/w92${data.poster_path} 92w,
                        https://image.tmdb.org/t/p/w154${data.poster_path} 154w,
                        https://image.tmdb.org/t/p/w185${data.poster_path} 185w,
                        https://image.tmdb.org/t/p/w342${data.poster_path} 342w,
                        https://image.tmdb.org/t/p/w500${data.poster_path} 500w,
                        https://image.tmdb.org/t/p/w780${data.poster_path} 780w,
                        https://image.tmdb.org/t/p/original${data.poster_path} 1080w
                    `}
                    sizes="(max-width: 35.5em) 154px, (max-width: 64em) 342px, 500px"
                    alt={`Poster de ${data.title || data.name}`}
                    loading={isVisible ? "eager" : "lazy"}
                    fetchPriority={isVisible ? "high" : "auto"}
                    width={500}
                    height={750}
                    className="card-image"
                />
                <div className="link-overlay">
                    <p className="overlay-content overlay-align">
                        {data.title || data.name}
                        <span><MdStar aria-hidden="true"/> {rating}</span>
                    </p>
                </div>
            </Link>
    );
}
