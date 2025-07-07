import { Client, Databases, ID, Query } from "react-native-appwrite"
import { TMDB_CONFIG } from "./api";

const DATABASE_ID = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID as string;
const COLLECTION_ID = process.env.EXPO_PUBLIC_APPWRITE_COLLECTION_ID as string;

const client = new Client()
    .setEndpoint(process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT as string)
    .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID as string)
    .setPlatform("com.soliddev.movieapp");
const database = new Databases(client);

export const updateSearchCount = async (query: string, movie: Movie) => {
    try {
        const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
            Query.equal("searchTerm", query)
        ]);
    
        // Check if a record of that search has already been stored
        if (result.documents.length > 0) {
            const existingMovie = result.documents[0];
    
            await database.updateDocument(
                DATABASE_ID,
                COLLECTION_ID,
                existingMovie.$id,
                {
                    count: existingMovie.count + 1
                }
            )
        } else {
            await database.createDocument(
                DATABASE_ID,
                COLLECTION_ID,
                ID.unique(),
                {
                    title: movie.title,
                    searchTerm: query,
                    count: 1,
                    poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
                    movie_id: movie.id,
                }
            )
        }
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const getTrendingMovies = async (): Promise<TrendingMovie[] | undefined> => {
    try {
        const result = await database.listDocuments(
            DATABASE_ID,
            COLLECTION_ID,
            [
                Query.limit(5),
                Query.orderDesc("count")
            ]
        );

        return result.documents as unknown as TrendingMovie[]
    } catch (error) {
        console.log(error);
        return undefined;
    }
}

export const fetchMovieDetails = async (movieId: string): Promise<MovieDetails> => {
    try {
        const response = await fetch(`${TMDB_CONFIG.BASE_URL}/movie/${movieId}?api_key=${TMDB_CONFIG.API_KEY}`, {
            method: "GET",
            headers: TMDB_CONFIG.headers
        });

        if (!response.ok) throw new Error("Failed to fetch movie details");
        
        const data = await response.json();

        return data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}