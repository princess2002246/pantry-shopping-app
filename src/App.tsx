
import type { ReactNode } from 'react'
import { Link, Navigate, Route, Routes } from 'react-router-dom'

import { useSelector } from 'react-redux'
import type { RootState } from './app/store'
import AuthPage from './pages/AuthPage'
import HomePage from './pages/HomePage'
import ShoppingListPage from './pages/ShoppingListPage'


function Profile() {
  const user = useSelector(
    (state: RootState) => state.auth.currentUser
  )

  if (!user) {
    return <Navigate to="/login" replace />
  }

  const initials = `${user.name.charAt(0)}${user.surname.charAt(0)}`.toUpperCase()

  return (
    <div className="pantry-page">
      <header className="pantry-header">
        <Link to="/home" className="pantry-brand">
          <span className="pantry-brand-icon">P</span>
          <span>pantry<span className="pantry-brand-dot">.</span></span>
        </Link>

        <Link to="/home" className="pantry-back-link">
          ← Back to Home
        </Link>
      </header>

      <main className="pantry-main pantry-profile-main">
        <p className="pantry-eyebrow">YOUR ACCOUNT</p>
        <h1 className="pantry-profile-title">My Profile</h1>
        <p className="pantry-description">
          Your personal details, all in one place.
        </p>

        <section className="pantry-profile-card">
          <div className="pantry-profile-top">
            <div className="pantry-profile-avatar">
              {initials}
            </div>
            <div className="pantry-profile-intro">
              <h2>{user.name} {user.surname}</h2>
              <p>{user.email}</p>
              <span className="pantry-profile-badge">
                Pantry member
              </span>
            </div>
          </div>

          <div className="pantry-profile-divider" />

          <h3 className="pantry-profile-section-title">
            Personal information
          </h3>

          <div className="pantry-profile-details">
            <div className="pantry-profile-detail">
              <span>First name</span>
              <strong>{user.name}</strong>
            </div>

            <div className="pantry-profile-detail">
              <span>Surname</span>
              <strong>{user.surname}</strong>
            </div>

            <div className="pantry-profile-detail">
              <span>Email address</span>
              <strong>{user.email}</strong>
            </div>

            <div className="pantry-profile-detail">
              <span>Cell number</span>
              <strong>{user.cellNumber}</strong>
            </div>
          </div>

          <Link to="/home" className="pantry-profile-button">
            Back to my shopping lists
          </Link>
        </section>

        <footer className="pantry-footer">
          A little planning goes a long way.
        </footer>
      </main>
    </div>
  )
}


function ProtectedRoute({ children }: { children: ReactNode }) {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  )

  return isAuthenticated
    ? children
    : <Navigate to="/login" replace />
}

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={<Navigate to="/login" replace />}
      />
      <Route path="/login" element={<AuthPage />} />
      <Route path="/register" element={<AuthPage />} />
      <Route
        path="/home"
        element={
          <ProtectedRoute>
            <HomePage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />
      <Route
        path="/lists/:listId"
        element={
         <ProtectedRoute>
          <ShoppingListPage />
        </ProtectedRoute>
   }
/>
      <Route
        path="*"
        element={<Navigate to="/login" replace />}
      />
    </Routes>
  )
}

export default App
