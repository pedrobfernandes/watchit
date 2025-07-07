function throwRequestError(response)
{
    throw new Error(
        `Erro na requisição: ${response.status} ` +
            `- ${response.statusText}`
    );
}

function hasValidTitle(item)
{
    return(item.title || item.name);
}

function hasValidRating(item)
{
    return(
        item.vote_average !== undefined &&
        item.vote_average > 0 &&
        item.vote_average <= 10
    );
}

function hasValidReleaseDate(item)
{
    return(item.release_date || item.first_air_date);
}

function isValidItem(item)
{
    return(
        hasValidTitle(item) &&
        item.overview &&
        hasValidRating(item) &&
        hasValidReleaseDate(item) &&
        item.poster_path?.startsWith("/")
    )
}

function filterValidResults(data)
{
    return(data.results.filter(isValidItem));        
}


async function makeTMDBFetch(path, queryParams = "", isBaseQuery = true)
{
    try
    {
        const response = await fetch("/.netlify/functions/tmdb", {
            method: "POST",
            body: JSON.stringify({ path, query: queryParams }),
        });
        
        if (response.ok === false)
        {
            throwRequestError(response);
        }

        const data = await response.json();

        if (isBaseQuery)
        {
            if (!data.results || !Array.isArray(data.results))
            {
                return({ results: [], totalPages: 0 });
            }
            
            const filteredData = filterValidResults(data);
            return({
                results: filteredData,
                totalPages: data.total_pages || 0,
            });
        }

        return(data);
        
    }
    catch (error)
    {
        console.error(error.message);
        return(
            isBaseQuery
            ? { results: [], totalPages: 0 }
            : {}
        );
    }
}

export async function fetchSearchedTMDBData(searchQuery, page = 1)
{
    const path = "/search/multi";
    const query = `query=${searchQuery}&language=pt-BR&page=${page}`;
        
    const { results , totalPages } = await makeTMDBFetch(path, query);
    return({
        results: results,
        nextPage: page + 1,
        totalPages: totalPages,
    });
}


export async function fetchTMDBTopRated(mediaType, page = 1)
{
    const path = `/${mediaType}/top_rated`;
    const query = `language=pt-BR&page=${page}`;

    const { results , totalPages } = await makeTMDBFetch(path, query);
    return({
        results: results,
        nextPage: page + 1,
        totalPages: totalPages,
    });
}


export async function fetchTMDBPopular(mediaType, page = 1)
{
    const path = `/${mediaType}/popular`;
    const query = `language=pt-BR&page=${page}`;

    const { results, totalPages } =  await makeTMDBFetch(path, query);
    return({
        results: results,
        nextPage: page + 1,
        totalPages: totalPages,
    });
}


export async function fetchTMDBCasting(mediaType, mediaId)
{
    const path = `/${mediaType}/${mediaId}/credits`;
    const searchResults = await makeTMDBFetch(path, "", false);
    return(searchResults.cast || []);
}

export async function fetchTMDBWatchProviders(mediaType, mediaId)
{
    const path = `/${mediaType}/${mediaId}/watch/providers`;
    const searchResults = await makeTMDBFetch(path, "", false);
    return(searchResults.results?.BR || {});
}


export async function fetchTMDBMediaDetails(mediaType, mediaId)
{
    const path = `/${mediaType}/${mediaId}`;
    const query = `language=pt-BR`;

    const searchResults = await makeTMDBFetch(path, query, false);
    return(searchResults);
}

export async function fetchTMDBTrailer(mediaType, mediaId)
{
    const path = `/${mediaType}/${mediaId}/videos`;
    const query = `language=pt-BR`;

    let searchResults = await makeTMDBFetch(path, query, false);

    let trailer = extractTrailer(searchResults);

    if (!trailer)
    {
        
        searchResults = await makeTMDBFetch(path, "", false);
        trailer = extractTrailer(searchResults);
    }

    return(trailer || null);
}


function extractTrailer(searchResults)
{
    if (!searchResults.results || !Array.isArray(searchResults.results))
    {
        return(null);
    }

    let trailer = searchResults.results.find(video =>
        video.type === "Trailer" &&
        video.site === "YouTube" &&
        video.official
    );

    if (!trailer)
    {
        trailer = searchResults.results.find(video =>
            video.type === "Trailer" &&
            video.site === "YouTube"
        );
    }

    return(trailer || null);
}
