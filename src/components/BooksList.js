import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchBooks, setSortBy, setOrder, selectSortedBooks } from '../features/books/booksSlice'

export default function BooksList() {
  const dispatch = useDispatch()
  const books = useSelector(selectSortedBooks)
  const loading = useSelector((s) => s.books.loading)
  const error = useSelector((s) => s.books.error)
  const sortBy = useSelector((s) => s.books.sortBy)
  const order = useSelector((s) => s.books.order)

  useEffect(() => {
    dispatch(fetchBooks())
  }, [dispatch])

  const onSortByChange = (e) => dispatch(setSortBy(e.target.value))
  const onOrderChange = (e) => dispatch(setOrder(e.target.value))

  return (
    <div className="container">
      <h1>Book Sorting App</h1>
      <div className="controls" style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
        <select value={sortBy} onChange={onSortByChange} aria-label="Sort By">
          <option value="title">Title</option>
          <option value="author">Author</option>
          <option value="publisher">Publisher</option>
        </select>

        <select value={order} onChange={onOrderChange} aria-label="Order">
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>

        <button onClick={() => dispatch(fetchBooks())} className="btn-refresh">Refresh</button>
      </div>

      {loading && <p>Loading books…</p>}
      {error && <p className="error">Error: {String(error)}</p>}

      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>Publisher</th>
              <th>ISBN</th>
            </tr>
          </thead>
          <tbody>
            {books.length === 0 && !loading ? (
              <tr>
                <td colSpan={4}>No books available.</td>
              </tr>
            ) : (
              books.map((b, idx) => (
                <tr key={`${b.isbn}-${idx}`}>
                  <td>{b.title}</td>
                  <td>{b.author}</td>
                  <td>{b.publisher}</td>
                  <td>{b.isbn}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}