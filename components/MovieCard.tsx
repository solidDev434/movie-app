import React from 'react'
import { Link } from 'expo-router'
import { Image, Text, TouchableOpacity, View } from 'react-native'
import { icons } from '@/constants/icons'

const MovieCard = ({ id, poster_path, title, vote_average, release_date }: Movie) => {

  return (
    <Link
        href={`/movies/${id}`}
        asChild
    >
        <TouchableOpacity className="w-[30%]">
            <Image 
                source={{
                    uri: poster_path ? `https://image.tmdb.org/t/p/w500${poster_path}` : "https://placehold.co/600x400/1a1a1a/FFFFFF/png"
                }}
                className="w-full h-52 rounded-lg"
                resizeMode="cover"
            />
            <Text 
                className="text-sm font-bold text-white mt-2" 
                numberOfLines={1}
            >{title}</Text>

            <View className="flex-row items-center justify-start gap-x-0.5">
                {vote_average ? Array.from({ length: Math.round(vote_average / 2) }).map((_, idx) => (
                    <Image 
                        key={idx}
                        source={icons.star}
                        className="size-4"
                    />
                )) : (
                    <Image 
                        source={icons.star}
                        className="size-4"
                    /> 
                )}
            </View>
            
            <View className="flex-row items-center justify-between">
                <Text className="text-xs text-light-300 font-medium mt-1">{release_date?.split("-")[0]}</Text>
                {/* <Text className="text-xs text-light-300 font-medium uppercase">Movie</Text> */}
            </View>
        </TouchableOpacity>
    </Link>
  )
}

export default MovieCard