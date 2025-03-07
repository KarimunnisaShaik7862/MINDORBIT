import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Journal.css";

const Journal = () => {
  const [journals, setJournals] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [editId, setEditId] = useState(null);

  // 🔥 Read (GET) Data
  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/posts?_limit=5")
      .then((res) => setJournals(res.data))
      .catch((err) => console.log(err));
  }, []);

  // ✅ Create (POST) Data
  const createJournal = () => {
    axios
      .post("https://jsonplaceholder.typicode.com/posts", { title, body: content })
      .then((res) => {
        setJournals([...journals, res.data]);
        setTitle("");
        setContent("");
        alert("Journal Added Successfully ✅");
      });
  };

  // ✏️ Update (PUT) Data
  const updateJournal = () => {
    axios
      .put(`https://jsonplaceholder.typicode.com/posts/${editId}`, { title, body: content })
      .then((res) => {
        setJournals(
          journals.map((j) =>
            j.id === editId ? { ...j, title, body: content } : j
          )
        );
        setEditId(null);
        setTitle("");
        setContent("");
        alert("Journal Updated Successfully 🔥");
      });
  };

  // ❌ Delete (DELETE) Data
  const deleteJournal = (id) => {
    axios
      .delete(`https://jsonplaceholder.typicode.com/posts/${id}`)
      .then(() => {
        setJournals(journals.filter((j) => j.id !== id));
        alert("Journal Deleted ❌");
      });
  };

  return (
    <div className="journal">
      <h1>📝 Digital Journal</h1>

      <div className="journal-form">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Write your Journal here..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>

        {editId ? (
          <button onClick={updateJournal} className="btn update">
            Update
          </button>
        ) : (
          <button onClick={createJournal} className="btn create">
            Create
          </button>
        )}
      </div>

      <div className="journal-list">
        {journals.map((journal) => (
          <div key={journal.id} className="journal-card">
            <h3>{journal.title}</h3>
            <p>{journal.body}</p>
            <div className="actions">
              <button onClick={() => {
                setTitle(journal.title);
                setContent(journal.body);
                setEditId(journal.id);
              }} className="btn edit">
                Edit ✏️
              </button>
              <button onClick={() => deleteJournal(journal.id)} className="btn delete">
                Delete ❌
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Journal;
