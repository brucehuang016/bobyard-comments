import { useEffect, useState } from 'react'
import CommentCard from './CommentCard'
import './App.css'

function App() {
  const [comments, setComments] = useState([])
  const [newText, setNewText] = useState('')
  const handleDelete = (id) => { 
    setComments(prev => prev.filter(c => c.id !== id))
  }
  const handleAdd = () => {
    fetch('http://127.0.0.1:8000/comments/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify({
        author: 'Admin',
        text: newText,
        likes: 0,
        }),
        })
        .then(res => res.json())
        .then(created => {
        setComments(prev => [created, ...prev])
        setNewText('')
        })
  }
  const handleUpdate = (id, newText) => {
    setComments(prev =>
      prev.map(c =>
        c.id === id ? { ...c, text: newText } : c
      )
    )
  }

  useEffect(() => {
    fetch('http://127.0.0.1:8000/comments/')
      .then(res => res.json())
      .then(data => {
        console.log(data)
        setComments(data.results)
      })
      .catch(err => console.error(err))
  }, [])

  return (
    <div className="app-container">
      <h1>Comments</h1>
      <div>
        <textarea
          value={newText}
          onChange={e => setNewText(e.target.value)}
          placeholder="Add a comment..."
        />
        <br />
        <button onClick={handleAdd}>Post</button>
      </div>
      {comments.length === 0 && <p>Loading...</p>}
      {comments.map(comment => (
        <CommentCard 
          key={comment.id} 
          comment={comment} 
          onDelete={handleDelete}
          onUpdate={handleUpdate}
        />
      ))}
    </div>
  )
}

export default App
