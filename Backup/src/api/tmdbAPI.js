const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = import.meta.env.VITE_TMDB_BASE_URL;

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


async function makeTMDBFetch(url, isBaseQuery = true)
{
    try
    {
        const response = await fetch(url);
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
    const queryUrl =
        `${BASE_URL}` +
        `search/multi?` +
        `${API_KEY}&query=${searchQuery}` +
        `&language=pt-Br&page=${page}`;
        
    const { results , totalPages } = await makeTMDBFetch(queryUrl);
    return({
        results: results,
        nextPage: page + 1,
        totalPages: totalPages,
    });
}


export async function fetchTMDBTopRated(mediaType, page = 1)
{
    const queryUrl =
        `${BASE_URL}${mediaType}` +
        `/top_rated?${API_KEY}&` +
        `language=pt-Br&page=${page}`;

    const { results , totalPages } = await makeTMDBFetch(queryUrl);
    return({
        results: results,
        nextPage: page + 1,
        totalPages: totalPages,
    });
}


export async function fetchTMDBPopular(mediaType, page = 1)
{
    const queryUrl =
        `${BASE_URL}${mediaType}` +
        `/popular?${API_KEY}&` +
        `language=pt-Br&page=${page}`;

    const { results, totalPages } =  await makeTMDBFetch(queryUrl);
    return({
        results: results,
        nextPage: page + 1,
        totalPages: totalPages,
    });
}


export async function fetchTMDBCasting(mediaType, mediaId)
{
    const queryUrl = `${BASE_URL}${mediaType}/${mediaId}/credits?${API_KEY}`;
    const searchResults = await makeTMDBFetch(queryUrl, false);
    return(searchResults.cast || []);
}

export async function fetchTMDBWatchProviders(mediaType, mediaId)
{
    const queryUrl = `${BASE_URL}${mediaType}/${mediaId}/watch/providers?${API_KEY}`;
    const searchResults = await makeTMDBFetch(queryUrl, false);
    return(searchResults.results?.BR || {});
}


export async function fetchTMDBMediaDetails(mediaType, mediaId)
{
    const queryUrl = `${BASE_URL}${mediaType}/${mediaId}?${API_KEY}&language=pt-Br`;

    const searchResults = await makeTMDBFetch(queryUrl, false);
    return(searchResults);
}

export async function fetchTMDBTrailer(mediaType, mediaId)
{
    let queryUrlPtBr =
        `${BASE_URL}${mediaType}/${mediaId}/videos?` +
        `${API_KEY}&language=pt-BR`;

    let searchResults = await makeTMDBFetch(queryUrlPtBr, false);

    let trailer = extractTrailer(searchResults);

    if (!trailer)
    {
        let fallbackUrl = `${BASE_URL}${mediaType}/${mediaId}/videos?${API_KEY}`;
        let fallbackResults = await makeTMDBFetch(fallbackUrl, false);
        trailer = extractTrailer(fallbackResults);
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
