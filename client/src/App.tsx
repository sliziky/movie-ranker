import * as React from 'react';
import { Route, BrowserRouter, Routes } from "react-router-dom";
import { RecoilRoot } from 'recoil';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import NewReview from './pages/NewReview';

function App() {
  return (
    <BrowserRouter>
      <RecoilRoot>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/newreview" element={<NewReview/>} />
          {/* <Route path="/about" component={About} />
            <Route path="/contact" component={Contact} />
          <Route path="/faq" component={Faq} /> */}
        </Routes>
      </RecoilRoot>
    </BrowserRouter>
  );
}

export default App;
