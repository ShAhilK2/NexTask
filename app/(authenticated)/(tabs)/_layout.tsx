import { Tabs } from "@/components/Tabs";

export default function TabLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="today"
        options={{
          title: "Today",
          tabBarIcon: () => ({ sfSymbol: "house" }),
        }}
      />
      <Tabs.Screen
        name="upcoming"
        options={{
          title: "Upcoming",
          tabBarIcon: ({focused}) => ({ sfSymbol: focused ? "calendar.circle.fill": "calendar.circle" }),
        }}
        
      />
           <Tabs.Screen
        name="search"
        options={{
          title: "Search",
          tabBarIcon: ({focused}) => ({ sfSymbol: focused ? "text.magnifyingglass" : "magnifyingglass" }),
        }}
        
      />
           <Tabs.Screen
        name="browse"
        options={{
          title: "Browse",
          tabBarIcon: ({focused}) => ({ sfSymbol: focused ? "square.grid.2x2.fill" : "square.grid.2x2" }),
        }}
        
      />
    </Tabs>
  );
}