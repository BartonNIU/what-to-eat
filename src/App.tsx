import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import { QueryClient, QueryClientProvider } from "react-query";
import Home from "./pages/Home";
import Recipe from "./pages/Recipe";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import { useTypeDispatch, useTypeSelector } from "./hooks/baseHooks";
import { useEffect } from "react";
import { checkLogin } from "./redux/usersSlice";
import CreateMenu from "./pages/CreateMenu";

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
  const { isLogin } = useTypeSelector((state) => state.users);
  const dispatch = useTypeDispatch();

  useEffect(() => {
    const isLocalToken = !!localStorage.getItem("accessToken");
    dispatch(checkLogin(isLogin || isLocalToken));
  }, []);

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
            <Route path='/register'>
              <Register />
            </Route>
            <Route path='/dashboard'>
              <Dashboard />
            </Route>
            <Route path='/create-menu/:key'>
              <CreateMenu />
            </Route>
          </Switch>
        </div>
      </QueryClientProvider>
    </Router>
  );
}

export default App;
