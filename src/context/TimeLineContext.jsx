import { createContext, useState } from "react";

export const TimelineContext = createContext();

const TimeLineProvider = ({ children }) => {
    const [currTimeLine, setCurrTimeLine] = useState([]);
    const timeline = { currTimeLine, setCurrTimeLine };

    return <TimelineContext.Provider value={timeline}>{children}</TimelineContext.Provider>
}

export default TimeLineProvider;