// import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from "./pages/Home/Home"
import Song from "./pages/Song/Song"

// Styles
import "./App.css"

// Pages
const Content = () => {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/song/:id" element={<Song />} />
			</Routes>
		</Router>
	);
}

const App = () => {
	return (
		<div className="App">
			<h1 className="App-Title">Velocity</h1>

			{/* Router for different pages */}
			<Content />
		</div>
	)
}

export default App
