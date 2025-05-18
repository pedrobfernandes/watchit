import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import ScrollToTop from "./components/ScrollToTop";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import Home from "./pages/Home";
import Details from "./pages/Details";
import SearchResults from "./pages/SearchResults";
import App from "./App";

import "./index.css";

const queryClient = new QueryClient();

const root = createRoot(document.getElementById("root"));
root.render(
    <StrictMode>
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <ScrollToTop/>
                <Routes>
                    <Route path="/" element={<App/>}>
                        <Route index element={<Home/>}/>
                        <Route path="details/:type/:id" element={<Details/>}/>
                        <Route path="search/" element={<SearchResults/>}/>
                    </Route>
                </Routes>
            </BrowserRouter>
        </QueryClientProvider>
    </StrictMode>
);
