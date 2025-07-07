import { useRouter } from "expo-router";
import { ActivityIndicator, FlatList, Image, ScrollView, Text, View } from "react-native";

import SearchBar from "@/components/SearchBar";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import useFetch from "@/hooks/useFetch";
import { fetchMovies } from "@/services/api";
import MovieCard from "@/components/MovieCard";
import { getTrendingMovies } from "@/services/appwrite";
import TrendingMovieCard from "@/components/TrendingMovieCard";

export default function Index() {
  const router = useRouter();

  const {
    data: trendingMovies, 
    loading: trendingMoviesLoading, 
    error: trendingMoviesError,
  } = useFetch<TrendingMovie[] | undefined>(getTrendingMovies);

  const { 
    data: movies, 
    loading: moviesLoading, 
    error: moviesError 
  } = useFetch(() => fetchMovies({ query: "" }));

  return (
    <View className="flex-1 bg-primary">
      <Image 
        source={images.bg}
        className="flex-1 absolute w-full z-0"
        resizeMode="cover"
      />

      <ScrollView className="flex-1 px-5">
        <Image 
          source={icons.logo}
          className="w-12 h-10 mt-20 mb-5 mx-auto"
        />

        {moviesLoading || trendingMoviesLoading ? (
          <ActivityIndicator
            size="large"
            color="#0000ff"
            className="mt-10 self-center"
          />
        ) : moviesError || trendingMoviesError ? (
          <Text className="text-white text-lg">Error: {moviesError?.message || trendingMoviesError?.message}</Text>
        ) : (
          <View className="flex-1 mt-5">
            <SearchBar 
              onPress={() => router.push("/search")}
              placeholder="Search for a movie"
            />

            {trendingMovies && (
              <View className="mt-10">
                <Text className="text-lg text-white font-bold mb-3">Trending Movies</Text>

                <FlatList 
                  data={trendingMovies}
                  className="mb-4 mt-3"
                  renderItem={({ item, index }) => (
                    <TrendingMovieCard 
                      movie={item}
                      index={index}
                    />
                  )}
                  keyExtractor={(item) => item.movie_id.toString()}
                  showsHorizontalScrollIndicator={false}
                  ItemSeparatorComponent={() => <View className="w-4" />}
                  contentContainerStyle={{ paddingRight: 8 }}
                  horizontal
                />
              </View>
            )}

            <View>
              <Text className="text-lg text-white font-bold mt-5 mb-3">Latest Movies</Text>

              <FlatList 
                data={movies}
                renderItem={({ item }) => (
                  <MovieCard {...item} />
                )}
                keyExtractor={(item) => item.id.toString()}
                numColumns={3}
                columnWrapperStyle={{
                  justifyContent: "flex-start",
                  gap: 20,
                  paddingRight: 5,
                  marginBottom: 10
                }}
                className="mt-2 pb-32"
                scrollEnabled={true}
                // contentContainerStyle={{ paddingBottom: 50 }}
              />
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  );
}
