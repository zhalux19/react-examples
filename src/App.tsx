import "./App.css"
import { Routes, Route, BrowserRouter } from "react-router-dom"
import HomePage from "./pages/HomePage"
import AboutPage from "./pages/AboutPage"
import ContactPage from "./pages/ContactPage"
import ProductPage from "./pages/ProductPage"
import Posts from "./features/posts/Posts"

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="product/:id" element={<ProductPage />} />
          <Route path="posts" element={<Posts />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
