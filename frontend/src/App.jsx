import React from 'react';
import api from './services/api';
import './global.css';
import './app.css';
import './main.css';
import './sidebar.css';
import Notes from './components/Notes';
import RadioButton from './components/RadioButton';

function App() {
  const [title, setTitle] = React.useState('');
  const [notes, setNotes] = React.useState('');
  const [allNotes, setAllNotes] = React.useState([]);
  const [selectedValue, setSelectedValue] = React.useState('all');

  async function getAllNotes() {
    const response = await api.get('/annotations');
    setAllNotes(response.data);
  }
  React.useEffect(() => {
    getAllNotes();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();

    const response = await api.post('/annotations', {
      title,
      notes,
      priority: false,
    });

    setTitle('');
    setNotes('');
    setAllNotes([...allNotes, response.data]);
  }

  async function handleDelete(id) {
    const deletedNote = await api.delete(`/annotations/${id}`);
    if (deletedNote) {
      setAllNotes(allNotes.filter((note) => note._id !== id));
    }
  }

  async function handlePriority(id) {
    const changeNote = await api.post(`/priorities/${id}`);
    if (changeNote) {
      getAllNotes();
    }
  }

  async function loadNotes(option) {
    const params = { priority: option };
    const response = await api.get(`/priorities/`, { params });

    if (response) {
      setAllNotes(response.data);
    }
  }

  async function handleChange(e) {
    setSelectedValue(e.value);
    if (e.checked && e.value != 'all') {
      loadNotes(e.value);
    } else {
      getAllNotes();
    }
  }

  return (
    <div id="app">
      <aside>
        <strong>Caderno de notas</strong>
        <form onSubmit={handleSubmit}>
          <div className="input-block">
            <label htmlFor="title">Título da Anotação</label>
            <input
              type="text"
              maxLength="30"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="input-block">
            <label htmlFor="nota">Anotações</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className={notes && title ? 'enabled' : 'disabled'}
          >
            Salvar
          </button>
        </form>
        <RadioButton
          selectedValue={selectedValue}
          handleChangeApp={handleChange}
        />
      </aside>
      <main>
        <ul>
          {allNotes &&
            allNotes.map((note) => (
              <Notes
                data={note}
                key={note._id}
                handleDelete={handleDelete}
                handlePriority={handlePriority}
              />
            ))}
        </ul>
      </main>
    </div>
  );
}

export default App;
