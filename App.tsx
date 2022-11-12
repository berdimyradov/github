import { ApolloProvider } from "@apollo/client";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";

import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";
import { gqlClient } from "./api/gqlClient";

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <ApolloProvider client={gqlClient}>
          <Navigation colorScheme={colorScheme} />
        </ApolloProvider>
        <StatusBar />
      </SafeAreaProvider>
    );
  }
}
