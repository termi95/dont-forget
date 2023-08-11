import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from "react";

const initialMenuState: boolean = false;

export interface MenuContextInterface {
  IsMenuExpaned: boolean;
  setIsMenuExpaned: Dispatch<SetStateAction<boolean>>;
}
const defaultState = {
  IsMenuExpaned: initialMenuState,
  setIsMenuExpaned: (prev: boolean) => {},
} as MenuContextInterface;

export const MenuContext = createContext<MenuContextInterface>(defaultState);

type MenuProviderProps = {
  children: ReactNode;
};
export default function MenuProvider({ children }: MenuProviderProps) {
  const [IsMenuExpaned, setIsMenuExpaned] = useState<boolean>(initialMenuState);

  return (
    <MenuContext.Provider value={{ IsMenuExpaned, setIsMenuExpaned }}>
      {children}
    </MenuContext.Provider>
  );
}
