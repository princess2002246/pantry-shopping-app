
import { useEffect, useState } from 'react'
import type { FormEvent } from 'react'
import { Link, useParams } from 'react-router-dom'

type ShoppingItem = {
  id: string | number
  listId: string | number
  name: string
  quantity: number
  purchased: boolean
}

function ShoppingListPage() {
  const { listId } = useParams()

  const [items, setItems] = useState<ShoppingItem[]>([])
  const [itemName, setItemName] = useState('')
  const [quantity, setQuantity] = useState('1')
  const [listName, setListName] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    let cancelled = false

    async function loadList() {
      setLoading(true)
      setError('')

      try {
        if (!listId) throw new Error('Invalid shopping list.')

        const listResponse = await fetch(
          `http://localhost:3001/lists/${listId}`
        )

        if (!listResponse.ok) throw new Error('Shopping list not found.')

        const list = await listResponse.json()

        const itemsResponse = await fetch(
          `http://localhost:3001/items?listId=${encodeURIComponent(listId)}`
        )

        if (!itemsResponse.ok) throw new Error('Could not load items.')

        const data: ShoppingItem[] = await itemsResponse.json()

        if (!cancelled) {
          setListName(list.name)
          setItems(data)
        }
      } catch {
        if (!cancelled) {
          setError('Could not load this list. Check that JSON Server is running.')
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    void loadList()

    return () => {
      cancelled = true
    }
  }, [listId])

  async function addItem(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError('')

    const trimmedName = itemName.trim()
    const amount = Number(quantity)

    if (!trimmedName || !listId || !Number.isInteger(amount) || amount < 1) {
      setError('Enter an item name and a quantity of at least 1.')
      return
    }

    setSaving(true)

    try {
      const response = await fetch('http://localhost:3001/items', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          listId,
          name: trimmedName,
          quantity: amount,
          purchased: false,
        }),
      })

      if (!response.ok) throw new Error('Could not add item.')

      const newItem: ShoppingItem = await response.json()
      setItems((current) => [...current, newItem])
      setItemName('')
      setQuantity('1')
    } catch {
      setError('Could not save the item. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  async function togglePurchased(item: ShoppingItem) {
    setError('')

    try {
      const response = await fetch(
        `http://localhost:3001/items/${item.id}`,
        {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ purchased: !item.purchased }),
        }
      )

      if (!response.ok) throw new Error('Could not update item.')

      const updatedItem: ShoppingItem = await response.json()

      setItems((current) =>
        current.map((currentItem) =>
          currentItem.id === updatedItem.id ? updatedItem : currentItem
        )
      )
    } catch {
      setError('Could not update the item. Please try again.')
    }
  }

  async function deleteItem(id: string | number) {
    setError('')

    try {
      const response = await fetch(
        `http://localhost:3001/items/${encodeURIComponent(String(id))}`,
        { method: 'DELETE' }
      )

      if (!response.ok) throw new Error('Could not delete item.')

      setItems((current) => current.filter((item) => item.id !== id))
    } catch {
      setError('Could not delete the item. Please try again.')
    }
  }

  const purchasedCount = items.filter((item) => item.purchased).length
  const progress = items.length
    ? Math.round((purchasedCount / items.length) * 100)
    : 0

  if (loading) {
    return (
      <div className="pantry-page">
        <main className="pantry-main">
          <p className="pantry-muted">Loading your shopping list...</p>
        </main>
      </div>
    )
  }

  return (
    <div className="pantry-page">
      <header className="pantry-header">
        <Link to="/home" className="pantry-brand">
          <span className="pantry-brand-icon">P</span>
          <span>pantry<span className="pantry-brand-dot">.</span></span>
        </Link>

        <Link to="/home" className="pantry-back-link">
          ← My lists
        </Link>
      </header>

      <main className="pantry-main pantry-detail-main">
        <Link to="/home" className="pantry-back-small">
          ← Back to all lists
        </Link>

        <section className="pantry-detail-hero">
          <p className="pantry-eyebrow">YOUR SHOPPING LIST</p>
          <h1>{listName || 'Shopping list'}</h1>
          <p className="pantry-description">
            Everything you need, all in one place.
          </p>

          <div className="pantry-progress-heading">
            <span>Shopping progress</span>
            <strong>{progress}%</strong>
          </div>

          <div
            className="pantry-progress-track"
            role="progressbar"
            aria-label="Shopping progress"
            aria-valuenow={progress}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            <div
              className="pantry-progress-fill"
              style={{ width: `${progress}%` }}
            />
          </div>

          <p className="pantry-progress-caption">
            {purchasedCount} of {items.length} {items.length === 1 ? 'item' : 'items'} purchased
          </p>
        </section>

        <section className="pantry-create-section pantry-item-form-section">
          <p className="pantry-eyebrow">ADD TO YOUR LIST</p>
          <h2>What do you need?</h2>

          <form className="pantry-item-form" onSubmit={addItem}>
            <div className="pantry-item-field pantry-item-name-field">
              <label htmlFor="itemName">Item name</label>
              <input
                id="itemName"
                value={itemName}
                onChange={(event) => setItemName(event.target.value)}
                placeholder="e.g. Toothpaste"
                maxLength={80}
                required
              />
            </div>

            <div className="pantry-item-field pantry-quantity-field">
              <label htmlFor="quantity">Quantity</label>
              <input
                id="quantity"
                type="number"
                min="1"
                max="999"
                step="1"
                value={quantity}
                onChange={(event) => setQuantity(event.target.value)}
                required
              />
            </div>

            <button type="submit" disabled={saving}>
              {saving ? 'Adding...' : '+ Add item'}
            </button>
          </form>

          {error && <p className="pantry-error" role="alert">{error}</p>}
        </section>

        <section className="pantry-items-section">
          <div className="pantry-section-heading">
            <div>
              <p className="pantry-eyebrow">YOUR ESSENTIALS</p>
              <h2>Items to shop</h2>
            </div>
            <span className="pantry-list-count">{items.length} items</span>
          </div>

          {items.length === 0 ? (
            <div className="pantry-empty">
              <span className="pantry-empty-icon" aria-hidden="true">🧺</span>
              <h3>Your list is ready</h3>
              <p>Add your first item using the form above.</p>
            </div>
          ) : (
            <div className="pantry-items-list">
              {items.map((item) => (
                <div
                  className={`pantry-item-row ${item.purchased ? 'is-purchased' : ''}`}
                  key={item.id}
                >
                  <label className="pantry-item-check">
                    <input
                      type="checkbox"
                      checked={item.purchased}
                      onChange={() => void togglePurchased(item)}
                    />
                    <span className="pantry-custom-check" aria-hidden="true" />
                    <span className="pantry-item-name">
                      {item.name}
                      <small>Quantity: {item.quantity}</small>
                    </span>
                  </label>

                  <div className="pantry-item-actions">
                    <span className="pantry-item-status">
                      {item.purchased ? 'Purchased' : 'To buy'}
                    </span>
                    <button
                      type="button"
                      className="pantry-delete-button"
                      onClick={() => void deleteItem(item.id)}
                      aria-label={`Delete ${item.name}`}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="pantry-shopping-summary">
            <span>Still to buy</span>
            <strong>{items.length - purchasedCount}</strong>
          </div>
        </section>

        <footer className="pantry-footer">
          A little planning goes a long way.
        </footer>
      </main>
    </div>
  )
}

export default ShoppingListPage
