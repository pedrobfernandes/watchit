import { useOutletContext } from "react-router";
import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchTMDBTopRated, fetchTMDBPopular } from "../api/tmdbAPI";
import MediaCard from "../components/MediaCard";
import LoadingSpinner from "../components/LoadingSpinner";
import LoadMoreButton from "../components/LoadMoreButton";

import "./display.css";
import "../components/MediaCard.css"


export default function Home()
{
    const { category } = useOutletContext();

    const fetcher = category === "popular" ? fetchTMDBPopular : fetchTMDBTopRated;
    
    const
    {
        data: movieData,
        isLoading: isLoadingMovies,
        isError: isErrorMovies,
        fetchNextPage: fetchNextMoviePage,
        hasNextPage: hasNextMoviePage,
        isFetchingNextPage: isFetchingNextMoviePage,
        error: movieError,

    } = useInfiniteQuery
    ({
        queryKey: [category, "movie"],
        queryFn: ({ pageParam = 1 }) => fetcher("movie", pageParam),
        getNextPageParam: (lastPage) =>
            lastPage.nextPage <= lastPage.totalPages
                ? lastPage.nextPage
                : undefined,

        staleTime: 20 * 60 * 1000,
        gcTime: 2 * 60 * 60 * 1000,

    })


    const
    {
        data: tvData,
        isLoading: isLoadingTv,
        isError: isErrorTv,
        fetchNextPage: fetchNextTvPage,
        hasNextPage: hasNextTvPage,
        isFetchingNextPage: isFetchingNextTvPage,
        error: tvError,
        
    } = useInfiniteQuery
    ({
        queryKey: [category, "tv"],
        queryFn: ({ pageParam = 1 }) => fetcher("tv", pageParam),
        getNextPageParam: (lastPage) =>
            lastPage.nextPage <= lastPage.totalPages
                ? lastPage.nextPage
                : undefined,

        staleTime: 20 * 60 * 1000,
        gcTime: 2 * 60 * 60 * 1000,

    })


    if (isLoadingMovies || isLoadingTv)
    {
        return(<LoadingSpinner/>);
    }

    if (isErrorMovies || isErrorTv)
    {
        return(
            <p>{movieError?.message ||
                tvError?.message ||
                "Erro ao carregar dados"}
            </p>
        );
    }

    const movieList =
        movieData?.pages.flatMap(page =>
            page.results.map(card =>
                <MediaCard key={`movie-${card.id}`} data={card} type="movie"/>
            )

        ) ?? [];

    const tvList =
         tvData?.pages.flatMap(page =>
            page.results.map(card =>
                <MediaCard key={`tv-${card.id}`} data={card} type="tv"/>
            )

        ) ?? [];
    

    return(
        <main>           
            <section id="movies-section" className="movies-section">
                <h2>{category === "popular" ? "Filmes populares" : "Filmes mais votados"}</h2>
                <div className="card-container">
                    {movieList}
                </div>
                <LoadMoreButton
                    fetchNextPage={fetchNextMoviePage}
                    isFetchingNextPage={isFetchingNextMoviePage}
                    isLoading={isLoadingMovies}
                    hasNextPage={hasNextMoviePage}
                    prefetchConfig={{
                        queryKey: [category, "movie"],
                        queryFn: ({ pageParam = 1 }) => fetcher("movie", pageParam),
                        getNextPageParam: (lastPage) =>
                            lastPage.nextPage <= lastPage.totalPages
                                ? lastPage.nextPage
                                : undefined,
                        pages: movieData?.pages ?? [],
                    }}
                />
            </section>
            <section id="series-section" className="series-section">
                <h2>{category === "popular" ? "Séries Populares" : "Séries mais votadas"}</h2>
                <div className="card-container">
                    {tvList}
                </div>
                <LoadMoreButton
                    fetchNextPage={fetchNextTvPage}
                    isFetchingNextPage={isFetchingNextTvPage}
                    isLoading={isLoadingTv}
                    hasNextPage={hasNextTvPage}
                     prefetchConfig={{
                        queryKey: [category, "tv"],
                        queryFn: ({ pageParam = 1 }) => fetcher("tv", pageParam),
                        getNextPageParam: (lastPage) =>
                            lastPage.nextPage <= lastPage.totalPages
                                ? lastPage.nextPage
                                : undefined,
                        pages: tvData?.pages ?? [],
                    }}
                />
            </section>
        </main>
    );
}
