import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <Tabs>
      <Tabs.Screen name="index" options={{ title: "User Home screen" }} />
      <Tabs.Screen name="feed" options={{ title: "Feed screen" }} />
      <Tabs.Screen name="post" options={{ title: "Post Screen", headerShown:false }} />
      <Tabs.Screen name="profile" options={{ title: "Profile screen" }} />
    </Tabs>
  );
}
