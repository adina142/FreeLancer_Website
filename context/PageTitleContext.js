import React, { createContext, useState, useContext } from 'react';

// Create the PageTitle context
const PageTitleContext = createContext();

// Custom hook to use the PageTitle context
export const usePageTitle = () => {
  return useContext(PageTitleContext);
};

// Create a provider component
export const PageTitleProvider = ({ children }) => {
  const [pageTitle, setPageTitle] = useState('Default Title'); // Default title can be changed

  return (
    <PageTitleContext.Provider value={{ pageTitle, setPageTitle }}>
      {children}
    </PageTitleContext.Provider>
  );
};

