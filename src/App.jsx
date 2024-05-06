
import {BrowserRouter, Route, Routes} from "react-router-dom";
import ReactDOM from "react-dom/client";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import Film from "./pages/Film.jsx";
import Series from "./pages/Series.jsx";
import NoPage from "./pages/NoPage";
import  './scss/style.scss';


function App() {

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="film" element={<Film />} />
                    <Route path="series" element={<Series />} />
                    <Route path="*" element={<NoPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
export default App
