/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import {
  CompositeScreenProps,
  NavigatorScreenParams,
} from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { QueryType } from "./api/GraphQL/Queries";
import { ItemProps } from "./components/Item";

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type RootStackParamList = {
  Root: NavigatorScreenParams<MainStackParamList> | undefined;
  Modal: ItemProps | undefined;
  NotFound: undefined;
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, Screen>;

export type MainStackParamList = {
  Home: undefined;
  List: {
    title: string;
    type: QueryType;
  };
};

export type RootScreenProps<Screen extends keyof MainStackParamList> =
  CompositeScreenProps<
    NativeStackScreenProps<MainStackParamList, Screen>,
    NativeStackScreenProps<RootStackParamList>
  >;
