export async function handler(event)
{
    const API_KEY = process.env.TMDB_API_KEY;
    const BASE_URL = "https://api.themoviedb.org/3";

    const { path, query } = JSON.parse(event.body || "{}");

    if (!path)
    {
        return({
            statusCode: 400,
            body: JSON.stringify({ error: "Caminho faltando" }),
        });
    }

    const fullUrl = `${BASE_URL}${path}?api_key=${API_KEY}&${query || ""}`;

    try
    {
        const response = await fetch(fullUrl);
        const data = await response.json();

        return({
            statusCode: 200,
            body: JSON.stringify(data),
        });
    }
    catch (error)
    {
        return({
            statusCode: 500,
            body: JSON.stringify({ error: error.message }),
        });
    }
}
