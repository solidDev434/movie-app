import { View, Image, TextInput } from 'react-native'
import React, { useState } from 'react'
import { icons } from '@/constants/icons'

interface ISearchBar {
    onPress?: () => void;
    placeholder: string;
}

const SearchBar = ({ onPress, placeholder }: ISearchBar) => {
    const [query, setQuery] = useState();


    return (
        <View className="flex-row items-center gap-x-1 bg-dark-200 rounded-full px-5 py-4">
            <Image 
                source={icons.search}
                className="size-5"
                resizeMode="contain"
                tintColor="#ab8bff"
            />
            <TextInput 
                onPress={onPress}
                placeholder={placeholder}
                value={query}
                onChange={(da) => console.log("dsfdsf", da.currentTarget)}
                placeholderTextColor="#a8b5db"
                className="flex-1 text-white"
            />
        </View>
    )
}

export default SearchBar