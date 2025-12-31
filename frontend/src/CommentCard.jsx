import { useState } from 'react'
import './CommentCard.css'

function CommentCard({ comment, onDelete, onUpdate }) {
    const [editing, setEditing] = useState(false);
    const [text, setText] = useState(comment.text);

    const handleSave = () => {
        fetch(`http://127.0.0.1:8000/comments/${comment.id}/`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ text }),
            })
            .then(res => res.json())
            .then(updated => {
                onUpdate(comment.id, updated.text)
                setEditing(false)
            })
    }
    const handleDelete = () => {
        fetch(`http://127.0.0.1:8000/comments/${comment.id}/`, {
            method: 'DELETE',
            })
            .then(() => {
            onDelete(comment.id);
            })
    }
    
    return(
        <div className="comment-card">
            <div className="comment-header">
                <strong className="comment-author">{comment.author || "Admin"}</strong>
                <span className="comment-likes">❤️ {comment.likes}</span>
            </div>
            {editing ? (
                <>
                    <textarea
                    value={text}
                    onChange={e => setText(e.target.value)}
                    className="comment-edit"
                    />
                    <div className="comment-actions">
                    <button onClick={handleSave}>Save</button>
                    <button onClick={() => setEditing(false)}>Cancel</button>
                    </div>
                </>
                ) : (
                <p className="comment-text">{comment.text}</p>
                )}
                
                <div>
                    <button onClick={() => setEditing(true)}>Edit</button>
                    <button onClick={handleDelete}>Delete</button>
                </div>
            <small className="comment-timestamp">{new Date(comment.date).toLocaleString()}</small>
            <div>
                {comment.image && (
                    <img
                        className="comment-image"
                        src={comment.image}
                        alt="comment attachment"/>
                )}
            </div>
        </div>
    )}

export default CommentCard 