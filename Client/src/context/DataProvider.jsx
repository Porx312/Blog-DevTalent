import { createContext, useState } from "react";

// Create a context with a default value of null
const DataContext = createContext(null);

const DataProvider = ({ children }) => {
    // Create a state variable `account` with an initial empty object.
    const [account, setAccount] = useState({ name: '', username: '' });

    return (
        // Use the DataContext.Provider to pass down the `account` state and `setAccount` function to child components.
        <DataContext.Provider value={{ 
            account, 
            setAccount 
        }}>
            {children} {/* Render any children components passed to DataProvider */}
        </DataContext.Provider>
    );
}

export default DataProvider;
export { DataContext }; // Export the DataContext to be used by other components
