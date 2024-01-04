import Layout from './src/layout/Layout';
import Favorites from './src/screens/favorites/Favorites';
import Home from './src/screens/home/Home';
import { config } from '@gluestack-ui/config';
import { GluestackUIProvider } from '@gluestack-ui/themed';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';

const NavigtionTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'transparent',
  },
};

export default function App() {
  const Tab = createBottomTabNavigator();
  return (
    <GluestackUIProvider config={config}>
      <NavigationContainer theme={NavigtionTheme}>
        <Layout>
          <Tab.Navigator
            screenOptions={{
              headerShown: false,
              tabBarStyle: {
                backgroundColor: 'transparent',
                borderTopWidth: 0,
                elevation: 0,
              },
              tabBarIconStyle: { display: 'none' },
              tabBarLabelStyle: {
                fontSize: 14,
                fontWeight: 'bold',
                textTransform: 'uppercase',
                letterSpacing: 1,
                marginBottom: 10,
              },
            }}
          >
            <Tab.Screen name="Home" component={Home} />
            <Tab.Screen name="Favorites" component={Favorites} />
          </Tab.Navigator>
        </Layout>
      </NavigationContainer>
    </GluestackUIProvider>
  );
}
