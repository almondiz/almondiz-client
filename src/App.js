import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import LoginPage from "./pages/login";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/*<Route path="/" element={<Layout />}>*/}
        <Route path="/" element={<LoginPage />}>
          {/*<Route index element={<Home />} />*/}
          {/*<Route path="blogs" element={<Blogs />} />*/}
          {/*<Route path="contact" element={<Contact />} />*/}
          {/*<Route path="*" element={<NoPage />} />*/}
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
