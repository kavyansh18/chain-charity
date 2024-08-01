import React from 'react';
import { OktoProvider, BuildType } from 'okto-sdk-react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './Pages/LoginPage.jsx';
import HomePage from './Pages/HomePage.jsx'
import Explore from './Pages/Explore.jsx';
import Donate from './Pages/Donate.jsx';
import Register from './Pages/Register.jsx';
import Feedback from './Pages/Feedback.jsx';

const OKTO_CLIENT_API_KEY = "3469fac8-410e-4fab-8f16-a0345461045c";

function App() {
  //console.log('App component rendered');
  return (
    <Router>
      <OktoProvider apiKey={OKTO_CLIENT_API_KEY} buildType={BuildType.SANDBOX}>
        <Routes>
          <Route path="/" element={<Explore />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/donate" element={<Donate />} />
          <Route path="/register" element={<Register />} />
          <Route path="/feedback" element={<Feedback />} />
        </Routes>
      </OktoProvider>
    </Router>
  );
}

export default App;
