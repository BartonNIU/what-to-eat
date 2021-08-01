import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import { QueryClient, QueryClientProvider } from "react-query";
import Home from "./pages/Home";
import Recipe from "./pages/Recipe";
import Login from "./pages/Login";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      // staleTime: Infinity, //5000,
      // cacheTime: Infinity, //1000 * 60 * 60 * 24 * 2, // 2 days
    },
  },
});

function App() {
  return (
    <Router>
      <QueryClientProvider client={queryClient}>
        <div className='h-screen text-center dark:bg-gray-800'>
          <Switch>
            <Route path='/' exact>
              <Home />
            </Route>
            <Route path='/recipe'>
              <Recipe />
            </Route>
            <Route path='/login'>
              <Login />
            </Route>
          </Switch>
        </div>
      </QueryClientProvider>
    </Router>
  );
}

export default App;
