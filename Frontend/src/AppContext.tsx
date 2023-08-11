import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from "react";
import LoginUserInfo from "./types/App";

const initialAppState: LoginUserInfo = {
  isDesktop: false,
  isMobile: false,
};

export interface AppContextInterface {
  loginUser: LoginUserInfo;
  setLoginUser: Dispatch<SetStateAction<LoginUserInfo>>;
}
const defaultState = {
  loginUser: initialAppState,
  setLoginUser: (loginUser: LoginUserInfo) => {},
} as AppContextInterface;
export const AppContext = createContext<AppContextInterface>(defaultState);

type AppProviderProps = {
  children: ReactNode;
};

export default function AppProvider({ children }: AppProviderProps) {
  const [loginUser, setLoginUser] = useState<LoginUserInfo>(initialAppState);

  return <AppContext.Provider value={{loginUser, setLoginUser}}>{children}</AppContext.Provider>;
}
