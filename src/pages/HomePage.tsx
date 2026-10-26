
import { useEffect, useState } from 'react'
import type { FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import type { RootState, AppDispatch } from '../app/store'
import { logout } from '../features/auth/authSlice'

type ShoppingList = {
  id: string | number
  name: string
  userId: string | number
  createdAt: string
}

function HomePage() {
  const user = useSelector((state: RootState) => state.auth.currentUser)
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()

  const [lists, setLists] = useState<ShoppingList[]>([])
  const [listName, setListName] = useState('')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!user) {
      setLists([])
      setLoading(false)
      return
    }

    const userId = user.id

    let cancelled = false

    async function loadLists() {
      setLoading(true)
      setError('')

      try {
        const response = await fetch('http://localhost:3001/lists')
        if (!response.ok) throw new Error('Could not load shopping lists.')

        const data: ShoppingList[] = await response.json()

        if (!cancelled) {
          setLists(
            data.filter((list) => String(list.userId) === String(userId))
          )
        }
      } catch {
        if (!cancelled) {
          setError('Could not load your lists. Check that JSON Server is running.')
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    void loadLists()

    return () => {
      cancelled = true
    }
  }, [user])

  async function createList(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!user || !listName.trim()) return

    setError('')
    setSaving(true)

    try {
      const response = await fetch('http://localhost:3001/lists', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: listName.trim(),
          userId: user.id,
          createdAt: new Date().toISOString(),
        }),
      })

      if (!response.ok) throw new Error('Could not create list.')

      const newList: ShoppingList = await response.json()
      setLists((current) => [...current, newList])
      setListName('')
    } catch {
      setError('Could not save your list. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  function signOut() {
    dispatch(logout())
    navigate('/login')
  }

  return (
    <div className="pantry-page">
      <header className="pantry-header">
        <Link to="/home" className="pantry-brand">
          <span className="pantry-brand-icon">P</span>
          <span>pantry<span className="pantry-brand-dot">.</span></span>
        </Link>

        <nav className="pantry-nav">
          <Link to="/profile">My Profile</Link>
          <button type="button" className="pantry-signout" onClick={signOut}>
            Sign out
          </button>
        </nav>
      </header>

      <main className="pantry-main">
        <section className="pantry-welcome">
          <div>
            <p className="pantry-eyebrow">YOUR KITCHEN, ORGANISED</p>
            <h1>Let's get shopping{user?.name ? `, ${user.name}` : ''}.</h1>
            <p className="pantry-description">
              Plan your essentials, keep track of what you need, and tick things
              off as you shop.
            </p>
          </div>
          <div className="pantry-hero-icon" aria-hidden="true">🛒</div>
        </section>

        <section className="pantry-create-section">
          <div>
            <p className="pantry-eyebrow">START PLANNING</p>
            <h2>Create a shopping list</h2>
            <p className="pantry-muted">Give your next shopping trip a name.</p>
          </div>

          <form className="pantry-create-form" onSubmit={createList}>
            <label className="pantry-sr-only" htmlFor="listName">
              Shopping list name
            </label>
            <input
              id="listName"
              value={listName}
              onChange={(event) => setListName(event.target.value)}
              placeholder="e.g. Toiletries, Monthly groceries"
              maxLength={60}
              required
            />
            <button type="submit" disabled={saving}>
              {saving ? 'Creating...' : '+ Create list'}
            </button>
          </form>

          {error && <p className="pantry-error" role="alert">{error}</p>}
        </section>

        <section className="pantry-lists-section">
          <div className="pantry-section-heading">
            <div>
              <p className="pantry-eyebrow">YOUR PLANS</p>
              <h2>My shopping lists</h2>
            </div>
            <span className="pantry-list-count">
              {lists.length} {lists.length === 1 ? 'list' : 'lists'}
            </span>
          </div>

          {loading ? (
            <p className="pantry-muted">Loading your lists...</p>
          ) : lists.length === 0 ? (
            <div className="pantry-empty">
              <span className="pantry-empty-icon" aria-hidden="true">📝</span>
              <h3>Your lists start here</h3>
              <p>Create your first list above to keep your shopping organised.</p>
            </div>
          ) : (
            <div className="pantry-list-grid">
              {lists.map((list) => (
                <Link
                  to={`/lists/${list.id}`}
                  className="pantry-list-card"
                  key={list.id}
                >
                  <div className="pantry-card-icon" aria-hidden="true">🛍️</div>
                  <div className="pantry-card-content">
                    <h3>{list.name}</h3>
                    <p>
                      Created {new Date(list.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <span className="pantry-card-arrow" aria-hidden="true">↗</span>
                </Link>
              ))}
            </div>
          )}
        </section>

        <footer className="pantry-footer">
          A little planning goes a long way.
        </footer>
      </main>
    </div>
  )
}

export default HomePage
