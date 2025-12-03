import { useState, useEffect } from 'react';
import { collection, addDoc, query, getDocs, orderBy } from 'firebase/firestore';
import { db } from '../config/firebase';
import { Send, Bell, Clock, CheckCircle, Users } from 'lucide-react';

export default function NotificationManager() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    message: '',
    type: 'info',
    target: 'all',
    scheduled: false,
    scheduledDate: '',
  });

  useEffect(() => {
    loadNotifications();
  }, []);

  const loadNotifications = async () => {
    try {
      const q = query(collection(db, 'notifications'), orderBy('createdAt', 'desc'));
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setNotifications(data);
    } catch (error) {
      console.error('Error loading notifications:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await addDoc(collection(db, 'notifications'), {
        ...formData,
        sent: !formData.scheduled,
        sentDate: formData.scheduled ? null : new Date(),
        createdAt: new Date(),
        openRate: 0,
      });

      alert('Notification envoyée avec succès !');
      setFormData({
        title: '',
        message: '',
        type: 'info',
        target: 'all',
        scheduled: false,
        scheduledDate: '',
      });
      loadNotifications();
    } catch (error) {
      console.error('Error sending notification:', error);
      alert('Erreur lors de l\'envoi de la notification');
    } finally {
      setLoading(false);
    }
  };

  const typeColors = {
    info: 'bg-blue-100 text-blue-700',
    success: 'bg-green-100 text-green-700',
    warning: 'bg-orange-100 text-orange-700',
    error: 'bg-red-100 text-red-700',
  };

  return (
    <div className="space-y-6">
      {/* Send Notification Form */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-blue-100 rounded-lg">
            <Send size={20} className="text-blue-600" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900">Envoyer une notification</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Titre
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Type
              </label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="info">Information</option>
                <option value="success">Succès</option>
                <option value="warning">Avertissement</option>
                <option value="error">Erreur</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Message
            </label>
            <textarea
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Cible
              </label>
              <select
                value={formData.target}
                onChange={(e) => setFormData({ ...formData, target: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">Tous les utilisateurs</option>
                <option value="group">Groupe spécifique</option>
                <option value="user">Utilisateur spécifique</option>
              </select>
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                <input
                  type="checkbox"
                  checked={formData.scheduled}
                  onChange={(e) => setFormData({ ...formData, scheduled: e.target.checked })}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                Programmer l'envoi
              </label>
              {formData.scheduled && (
                <input
                  type="datetime-local"
                  value={formData.scheduledDate}
                  onChange={(e) => setFormData({ ...formData, scheduledDate: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              )}
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full md:w-auto px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            <Send size={18} />
            {loading ? 'Envoi en cours...' : formData.scheduled ? 'Programmer' : 'Envoyer maintenant'}
          </button>
        </form>
      </div>

      {/* Notification History */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-gray-100 rounded-lg">
            <Clock size={20} className="text-gray-600" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900">Historique des notifications</h2>
        </div>

        <div className="space-y-3">
          {notifications.length === 0 ? (
            <p className="text-center text-gray-500 py-8">Aucune notification envoyée</p>
          ) : (
            notifications.map((notif) => (
              <div key={notif.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold text-gray-900">{notif.title}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${typeColors[notif.type]}`}>
                        {notif.type}
                      </span>
                      {notif.sent ? (
                        <span className="flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                          <CheckCircle size={12} />
                          Envoyée
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 px-2 py-1 bg-orange-100 text-orange-700 rounded-full text-xs font-medium">
                          <Clock size={12} />
                          Programmée
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{notif.message}</p>
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <Users size={12} />
                        Cible: {notif.target === 'all' ? 'Tous' : notif.target}
                      </span>
                      <span>
                        {notif.sentDate ? new Date(notif.sentDate.toDate()).toLocaleString('fr-FR') : 'Non envoyée'}
                      </span>
                      {notif.openRate !== undefined && (
                        <span>Taux d'ouverture: {notif.openRate}%</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
