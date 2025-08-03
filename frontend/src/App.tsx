// import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from "./pages/Home/Home"
import Song from "./pages/Song/Song"

// Pages

const App = () => {
	return (
		<div className="App">
			<h1 style={{ fontSize: '3.6rem' }}>Velocity</h1>

			{/* Router for different pages */}
			<Router>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/song" element={<Song />} />
				</Routes>
			</Router>
		</div>
	)
}

export default App
