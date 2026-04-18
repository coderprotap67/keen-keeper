import { createContext, useState } from "react";

export const TabContext = createContext();

const TabProvider = ({ children }) => {
  const [currTab, setCurrTab] = useState("");
  const tab = { currTab, setCurrTab };

  return <TabContext.Provider value={tab}>{children}</TabContext.Provider>;
};

export default TabProvider;
