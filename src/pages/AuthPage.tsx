
import { useState, type FormEvent } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import type { AppDispatch } from '../app/store'
import { setUser } from '../features/auth/authSlice'
import { registerUser, type RegisterData } from '../services/authService'
import '../styles/global.css'

function AuthPage() {
  const location = useLocation()
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()

  const page = location.pathname === '/register' ? 'register' : 'login'

  const [name, setName] = useState('')
  const [surname, setSurname] = useState('')
  const [email, setEmail] = useState('')
  const [cellNumber, setCellNumber] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState(
    (location.state as { message?: string } | null)?.message ?? ''
  )
  const [isLoading, setIsLoading] = useState(false)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setMessage('')
    setIsLoading(true)

    try {
      if (page === 'register') {
        const data: RegisterData = {
          name: name.trim(),
          surname: surname.trim(),
          email: email.trim(),
          cellNumber: cellNumber.trim(),
          password,
        }

        await registerUser(data)

        navigate('/login', {
          replace: true,
          state: {
            message: 'Account created successfully! You can now sign in.',
          },
        })
      } else {
        const response = await fetch('http://localhost:3001/users')

        if (!response.ok) {
          throw new Error('Could not connect to the database.')
        }

        const users: (RegisterData & {
          id: string | number
        })[] = await response.json()

        const user = users.find(
          (item) =>
            item.email.toLowerCase() === email.trim().toLowerCase() &&
            item.password === password
        )

        if (!user) {
          throw new Error('Incorrect email or password.')
        }

        dispatch(
          setUser({
            id: user.id,
            name: user.name,
            surname: user.surname,
            email: user.email,
            cellNumber: user.cellNumber,
          })
        )

        navigate('/home', { replace: true })
      }
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : 'Something went wrong. Please try again.'
      )
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="auth-page">
      <section className="auth-panel">
        <div className="brand">
          <span className="brand-icon">P</span>
          <span>Pantry</span>
        </div>

        <div className="auth-content">
          <p className="eyebrow">YOUR KITCHEN, ORGANISED</p>

          <h1>
            {page === 'register'
              ? 'Make room for what matters.'
              : 'Welcome back.'}
          </h1>

          <p className="subtitle">
            {page === 'register'
              ? 'Plan your shopping, organise your essentials, and make every trip count.'
              : 'Your shopping lists are waiting for you.'}
          </p>

          <form onSubmit={handleSubmit}>
            {page === 'register' && (
              <div className="form-row">
                <label>
                  First name
                  <input
                    type="text"
                    placeholder="First name"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    required
                  />
                </label>

                <label>
                  Surname
                  <input
                    type="text"
                    placeholder="Surname"
                    value={surname}
                    onChange={(event) => setSurname(event.target.value)}
                    required
                  />
                </label>
              </div>
            )}

            <label>
              Email address
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />
            </label>

            {page === 'register' && (
              <label>
                Cell number
                <input
                  type="tel"
                  placeholder="Your cell number"
                  value={cellNumber}
                  onChange={(event) => setCellNumber(event.target.value)}
                  required
                />
              </label>
            )}

            <label>
              Password
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                minLength={8}
                required
              />
            </label>

            {page === 'register' && (
              <label className="checkbox-label">
                <input type="checkbox" required />
                <span>I agree to the terms and privacy policy.</span>
              </label>
            )}

            {message && (
              <p role="status" aria-live="polite">
                {message}
              </p>
            )}

            <button
              className="primary-button"
              type="submit"
              disabled={isLoading}
            >
              {isLoading
                ? 'Please wait...'
                : page === 'register'
                  ? 'Create account'
                  : 'Sign in'}
              <span aria-hidden="true">→</span>
            </button>
          </form>

          <p className="switch-page">
            {page === 'register'
              ? 'Already have an account?'
              : "Don't have an account?"}{' '}

            <button
              className="text-button"
              type="button"
              onClick={() => {
                setMessage('')
                setPassword('')
                navigate(
                  page === 'register' ? '/login' : '/register'
                )
              }}
            >
              {page === 'register' ? 'Sign in' : 'Create account'}
            </button>
          </p>
        </div>

        <p className="footer-note">
          SIMPLE HABITS. BETTER EVERYDAY LIVING.
        </p>
      </section>

      <section className="visual-panel">
        <div className="visual-overlay">
          <span className="visual-tag">A FRESH START</span>
          <h2>A little more order. A lot more ease.</h2>
          <p>
            Everything you need for a thoughtful,
            organised shopping experience.
          </p>
        </div>
      </section>
    </main>
  )
}

export default AuthPage
