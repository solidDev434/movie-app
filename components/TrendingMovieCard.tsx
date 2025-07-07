import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import MaskedView from '@react-native-masked-view/masked-view';
import { Link } from 'expo-router';
import { images } from '@/constants/images';

interface ITrendingMovieCard {
    movie: TrendingMovie;
    index: number
}

const TrendingMovieCard = ({ movie, index }: ITrendingMovieCard) => {
  return (
    <Link 
        href={`/movies/${movie.movie_id}`} 
        asChild
    >
        <TouchableOpacity className="w-32 relative pl-5">
            <Image 
                source={{ uri: movie.poster_url }}
                className="w-32 h-48 rounded-lg"
                resizeMode="cover"
            />

            <View className="absolute bottom-9 -left-2.5 px-2 py-1 rounded-full">
                <MaskedView maskElement={
                    <Text className="font-bold text-white text-6xl">{index + 1}</Text>
                }>
                    <Image 
                        source={images.rankingGradient}
                        className="size-14"
                        resizeMode="cover"
                    />
                </MaskedView>
            </View>

            <Text 
                className="text-sm font-bold mt-2 text-light-200"
                numberOfLines={2}
            >
                {movie.title}
            </Text>
        </TouchableOpacity>
    </Link>
  )
}

export default TrendingMovieCard