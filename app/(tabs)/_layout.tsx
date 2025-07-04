import { Tabs } from "expo-router";
import { Image, ImageBackground, Text, View } from "react-native";

import { icons } from "@/constants/icons";
import { images } from "@/constants/images";

interface ITabIcon {
  focused: boolean,
  icon: any,
  title: string
}

const TabIcon = ({ focused, icon, title }: ITabIcon) => {

  if (focused) {
    return (
      <ImageBackground
        source={images.highlight}
        className="flex flex-col w-full min-w-[112px] justify-center items-center rounded-full overflow-hidden mt-4"
        style={{ minHeight: 73, minWidth: 122, justifyContent: "center", alignItems: "center" }}
      >
        <Image 
          source={icon}
          tintColor="#151312"
          className="size-5"
        />
        <Text className="text-secondary text-sm font-semibold">{title}</Text>
      </ImageBackground>
    )
  }

  return (
    <View className="size-full justify-center items-center rounded-full py-2">
      <Image 
        source={icon}
        tintColor="#A8B5DB"
        className="size-5"
      />
    </View>
  )    
}

export default function Layout() {
  return (
    <Tabs 
      screenOptions={{
        tabBarShowLabel: false,
        tabBarItemStyle: {
          width: "100%",
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
        },
        tabBarStyle: {
          backgroundColor: "#0f0D23",
          borderRadius: 50,
          marginHorizontal: 20,
          marginBottom: 36,
          height: 52,
          position: "absolute",
          overflow: "hidden",
          borderWidth: 1,
          borderColor: "#0f0D23"
        }
      }}
    >
      <Tabs.Screen 
        name="index"
        options={{ 
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon 
              focused={focused} 
              icon={icons.home} 
              title="Home"
            />
          )
        }}
      />

      <Tabs.Screen 
        name="saved"
        options={{ 
          title: "Saved",
          headerShown: false,tabBarIcon: ({ focused }) => (
            <TabIcon 
              focused={focused} 
              icon={icons.save} 
              title="Saved"
            />
          )
        }}
      />

      <Tabs.Screen 
        name="search"
        options={{ 
          title: "Search",
          headerShown: false,tabBarIcon: ({ focused }) => (
            <TabIcon 
              focused={focused} 
              icon={icons.search} 
              title="Search"
            />
          ) 
        }}
      />

      <Tabs.Screen 
        name="profile"
        options={{ 
          title: "Profile",
          headerShown: false,tabBarIcon: ({ focused }) => (
            <TabIcon 
              focused={focused} 
              icon={icons.person} 
              title="Profile"
            />
          ) 
        }}
      />
    </Tabs>
  );
}
