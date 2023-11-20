import React from 'react';
import api from './services/api';
import './global.css';
import './app.css';
import './main.css';
import './sidebar.css';
import Notes from './components/Notes';
import RadioButton from './components/RadioButton';
import Loader from './components/Loader';

function App() {
  const [title, setTitle] = React.useState('');
  const [notes, setNotes] = React.useState('');
  const [allNotes, setAllNotes] = React.useState([]);
  const [selectedValue, setSelectedValue] = React.useState('all');
  const [loading, setLoading] = React.useState(false);

  async function getAllNotes() {
    setLoading(true);
    const response = await api.get('/annotations');
    setAllNotes(response.data);
    setLoading(false);
  }

  React.useEffect(() => {
    getAllNotes();
  }, []);

  async function handleSubmit(e) {
    setLoading(true);
    e.preventDefault();

    const response = await api.post('/annotations', {
      title,
      notes,
      priority: false,
    });

    setTitle('');
    setNotes('');
    setAllNotes([...allNotes, response.data]);
    setLoading(false);
  }

  async function handleDelete(id) {
    setLoading(true);

    const deletedNote = await api.delete(`/annotations/${id}`);
    if (deletedNote) {
      setAllNotes(allNotes.filter((note) => note._id !== id));
    }

    setLoading(false);
  }

  async function handlePriority(id) {
    setLoading(true);

    const changeNote = await api.post(`/priorities/${id}`);
    if (changeNote) {
      getAllNotes();
    }

    setLoading(false);
  }

  async function loadNotes(option) {
    setLoading(true);

    const params = { priority: option };
    const response = await api.get(`/priorities/`, { params });

    if (response) {
      setAllNotes(response.data);
    }

    setLoading(false);
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
        {!loading ? (
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
        ) : (
          <Loader />
        )}
      </main>
    </div>
  );
}

export default App;
