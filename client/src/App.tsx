import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store";
import Layout from "./components/Layout/Layout";
import Dashboard from "./pages/Dashboard";
import Statistics from "./pages/Statistics";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/statistics" element={<Statistics />} />
          </Routes>
        </Layout>
      </Router>
    </Provider>
  );
}

export default App;
