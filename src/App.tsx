import { Routes, Route, Navigate } from "react-router-dom";
import Home from "@/pages/Home";
import Blog from "@/pages/Blog";
import Catalog from "@/pages/Catalog";
import Navbar from "@/components/Navbar";
import AppProvider from "./AppProvider";
import Footer from "./page-sections/Home/Footer";
import SinglePost from "./pages/SinglePost";

function App() {
	return (
		<AppProvider>
			<Navbar />
			<Routes>
				<Route path="/" element={<Home />}></Route>
				<Route path="/products" element={<Catalog />}></Route>
				<Route path="/articles" element={<Blog />}></Route>
				<Route path="/articles/:slug" element={<SinglePost />}></Route>
				<Route path="*" element={<Navigate to="/" />}></Route>
			</Routes>
			<Footer />
		</AppProvider>
	);
}

export default App;
