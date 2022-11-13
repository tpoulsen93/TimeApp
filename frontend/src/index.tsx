import ReactDOM from 'react-dom/client';
import React, { createContext, useContext } from 'react';
import reportWebVitals from './reportWebVitals';
import { RootStore } from './stores/RootStore';
import App from './App';

const rootStore = new RootStore()
export const StoreContext = createContext(rootStore)
const useStores = () => useContext(StoreContext)

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <StoreContext.Provider value={rootStore}>
      <App />
    </StoreContext.Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(console.log);

export { useStores }
