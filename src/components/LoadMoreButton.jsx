import { useQueryClient } from "@tanstack/react-query";
import { useRef } from "react";
import LoadingSpinner from "../components/LoadingSpinner";

export default function LoadMoreButton(props)
{
    const
    {
        fetchNextPage,
        isFetchingNextPage,
        isLoading,
        hasNextPage,
        prefetchConfig,
        
    } = props;

    const timeoutRef = useRef(null);
    const queryClient = useQueryClient();

    if (!hasNextPage)
    {
        return(null);
    }

    if (isLoading)
    {
        return(<LoadingSpinner/>)
    }

    function handlePrefetch()
    {
        if (!prefetchConfig)
        {
            return;
        }

        const { queryKey, getNextPageParam, queryFn, pages } = prefetchConfig;

        const lastPage = pages[pages.length - 1];
        const nextPage = getNextPageParam(lastPage);

        if (!nextPage)
        {
            return;
        }

        queryClient.prefetchQuery
        ({
            queryKey: [...queryKey, nextPage],
            queryFn: () => queryFn({ pageParam: nextPage }),
            staleTime: 20 * 60 * 1000,
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
        <button
            type="button"
            className="load-more-button"
            onClick={fetchNextPage}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            disabled={isFetchingNextPage}
        >
            Mais dados
        </button>
    );
}
