import { useState, useEffect } from 'react';
import { collection, getDocs, deleteDoc, doc, addDoc, Timestamp } from 'firebase/firestore';
import { db } from '../config/firebase';
import { Trash2, Plus, Calendar } from 'lucide-react';

export default function EventManager() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    location: '',
  });

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    try {
      const snapshot = await getDocs(collection(db, 'events'));
      setEvents(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    } catch (error) {
      console.error('Error loading events:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddEvent = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'events'), {
        ...formData,
        createdAt: Timestamp.now(),
        attendees: 0,
      });
      setFormData({ title: '', description: '', date: '', location: '' });
      setShowForm(false);
      loadEvents();
    } catch (error) {
      console.error('Error adding event:', error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Supprimer cet événement ?')) return;
    
    try {
      await deleteDoc(doc(db, 'events', id));
      setEvents(events.filter(e => e.id !== id));
    } catch (error) {
      console.error('Error deleting event:', error);
    }
  };

  return (
    <div className="space-y-6">
      <button
        onClick={() => setShowForm(!showForm)}
        className="flex items-center gap-2 btn-primary"
      >
        <Plus size={20} />
        Ajouter un événement
      </button>

      {showForm && (
        <div className="card">
          <form onSubmit={handleAddEvent} className="space-y-4">
            <input
              type="text"
              name="title"
              placeholder="Titre"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="input-field"
              required
            />
            <textarea
              name="description"
              placeholder="Description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="input-field"
              rows="3"
            />
            <input
              type="datetime-local"
              name="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              className="input-field"
              required
            />
            <input
              type="text"
              name="location"
              placeholder="Lieu"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              className="input-field"
            />
            <div className="flex gap-2">
              <button type="submit" className="btn-primary">Créer</button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="btn-secondary"
              >
                Annuler
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="card">
        <h3 className="font-semibold text-gray-900 mb-4">Événements ({events.length})</h3>
        
        {loading ? (
          <div className="text-center py-12">Chargement...</div>
        ) : events.length === 0 ? (
          <div className="text-center py-12 text-gray-500">Aucun événement</div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {events.map((event) => (
              <div key={event.id} className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-medium text-gray-900 flex-1">{event.title}</h4>
                  <button
                    onClick={() => handleDelete(event.id)}
                    className="p-1 text-red-600 hover:bg-red-50 rounded"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
                <p className="text-sm text-gray-600 mb-2">{event.description}</p>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Calendar size={14} />
                  {event.date && new Date(event.date).toLocaleDateString('fr-FR')}
                </div>
                {event.location && (
                  <p className="text-sm text-gray-500 mt-1">📍 {event.location}</p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
