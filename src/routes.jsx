import App from './App'
import AdminRoute from './components/AdminRoute'
import ProtectedRoute from './components/ProtectedRoute'
import { Navigate, Route, Routes } from './lib/router'
import Admin from './pages/Admin'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import Profile from './pages/Profile'
import Unauthorized from './pages/Unauthorized'

const AppRoutes = () => (
  <Routes>
    <Route
      element={<App />}
      path="/"
    />
    <Route
      element={<App focusSectionId="cardapio" />}
      path="/cardapio"
    />
    <Route
      element={<Login />}
      path="/login"
    />
    <Route element={<ProtectedRoute />}>
      <Route
        element={<Dashboard />}
        path="/dashboard"
      />
      <Route
        element={<Profile />}
        path="/perfil"
      />
    </Route>
    <Route element={<AdminRoute allowedRoles={['admin', 'editor']} />}>
      <Route
        element={<Admin />}
        path="/admin"
      />
    </Route>
    <Route
      element={<Unauthorized />}
      path="/unauthorized"
    />
    <Route
      element={<Navigate replace to="/" />}
      path="*"
    />
  </Routes>
)

export default AppRoutes
