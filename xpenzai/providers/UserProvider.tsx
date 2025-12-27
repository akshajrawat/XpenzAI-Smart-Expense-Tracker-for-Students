"use client";
import { createContext, useContext, useState } from "react";

export const UserContext = createContext<any>(null);

export default function UserProvider({ initialUser, children }: any) {
  const [user, setUser] = useState<any>(initialUser);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
