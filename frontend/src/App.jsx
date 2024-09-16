import { BrowserRouter, Routes, Route } from "react-router-dom"
import { RecoilRoot } from 'recoil'
import Signup from "./pages/Signup"
import Signin from "./pages/Signin"
import Dashboard from "./pages/Dashboard"
import SendMoney from "./pages/SendMoney"
import PrivateRoute from "./utils/PrivateRoute"
import AuthRoute from "./utils/AuthRoute"
import Profile from "./pages/Profile"
function App() {
  return (
    <RecoilRoot>
      <BrowserRouter>
        <Routes>
          {/* Protected route */}
          <Route path="/" element={<PrivateRoute element={<Dashboard />} />} />
          <Route path="/dashboard" element={<PrivateRoute element={<Dashboard />} />} />
          <Route path="/send" element={<PrivateRoute element={<SendMoney />} />} />
          <Route path="/changeprofile" element={<PrivateRoute element={<Profile/>}/>}/>
          {/* Authenticated users should be redirected from these */}
          <Route path="/signin" element={<AuthRoute element={<Signin />} />} />
          <Route path="/signup" element={<AuthRoute element={<Signup />} />} />
        </Routes>
      </BrowserRouter>
    </RecoilRoot>
  )
}

export default App
