import { useSearchParams } from "react-router";
import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchSearchedTMDBData } from "../api/tmdbAPI";
import MediaCard from "../components/MediaCard";
import LoadingSpinner from "../components/LoadingSpinner";
import LoadMoreButton from "../components/LoadMoreButton";

import "./display.css";
import "../components/MediaCard.css"


export default function SearchResults()
{
    const [searchParams] = useSearchParams();
    const query = searchParams.get("q");

    const
    {
        data,
        isLoading,
        isError,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        error,

    } = useInfiniteQuery
    ({
        queryKey: ["search", query],
        queryFn: ({ pageParam = 1 }) => fetchSearchedTMDBData(query, pageParam),
        getNextPageParam: (lastPage) =>
            lastPage.nextPage <= lastPage.totalPages
                ? lastPage.nextPage
                : undefined,

        enabled: query?.trim() !== "",
        staleTime: 20 * 60 * 1000,
        gcTime: 2 * 60 * 60 * 1000,
    })

    if (isLoading)
    {
        return(<LoadingSpinner/>);
    }

    if (isError)
    {
        return(<p>Erro: {error.message}</p>);
    }


    const resultList =
        data?.pages.flatMap(page =>
            page.results.map(result =>
            {
                const type = result.media_type === "movie" ? "movie" : "tv";
                return(<MediaCard key={result.id} data={result} type={type}/>); 
            })
            
        ) ?? [];

    return(
        <main>
            <section className="results-section">
                <h2>Resultados (Filme/Série)</h2>
                <div className="card-container">
                    {resultList}
                </div>
                 <LoadMoreButton
                    fetchNextPage={fetchNextPage}
                    isFetchingNextPage={isFetchingNextPage}
                    isLoading={isLoading}
                    hasNextPage={hasNextPage}
                    prefetchConfig={{
                        queryKey: ["search", query],
                        queryFn: ({ pageParam = 1 }) => fetchSearchedTMDBData(query, pageParam),
                        getNextPageParam: (lastPage) =>
                            lastPage.nextPage <= lastPage.totalPages
                                ? lastPage.nextPage
                                : undefined,
                        pages: data?.pages ?? [],
                    }}
                />
            </section>
        </main>
    );
}
