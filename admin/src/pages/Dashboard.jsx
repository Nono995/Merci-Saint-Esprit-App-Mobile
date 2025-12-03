import { useState, useEffect } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../config/firebase';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { Play, Users, Eye, Heart, Plus, Send, Calendar, FileText } from 'lucide-react';
import StatCard from '../components/StatCard';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalContent: 0,
    totalUsers: 0,
    totalViews: 0,
    totalLikes: 0,
    recentContent: [],
    chartData: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      // Compter le contenu
      const contentQuery = query(collection(db, 'content'), where('status', '==', 'published'));
      const contentSnap = await getDocs(contentQuery);
      const contentData = contentSnap.docs.map(doc => doc.data());

      // Compter les utilisateurs
      const usersSnap = await getDocs(collection(db, 'users'));
      const usersData = usersSnap.docs.map(doc => doc.data());

      // Calculer les statistiques
      const totalViews = contentData.reduce((sum, content) => sum + (content.views || 0), 0);
      const totalLikes = contentData.reduce((sum, content) => sum + (content.likes?.length || 0), 0);

      setStats({
        totalContent: contentData.length,
        totalUsers: usersData.length,
        totalViews: totalViews,
        totalLikes: totalLikes,
        recentContent: contentData.slice(0, 5),
        chartData: [
          { name: 'Vidéos', value: contentData.filter(c => c.type === 'video').length, color: '#3B82F6' },
          { name: 'Podcasts', value: contentData.filter(c => c.type === 'podcast').length, color: '#8B5CF6' },
          { name: 'Témoignages', value: contentData.filter(c => c.type === 'testimony').length, color: '#EF4444' },
          { name: 'Événements', value: contentData.filter(c => c.type === 'event').length, color: '#F59E0B' },
        ],
      });
    } catch (error) {
      console.error('Error loading dashboard:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center py-12">Chargement...</div>;
  }

  const quickActions = [
    { label: 'Ajouter Vidéo', icon: Play, color: 'blue', action: () => navigate('/content') },
    { label: 'Ajouter Événement', icon: Calendar, color: 'orange', action: () => navigate('/events') },
    { label: 'Envoyer Notification', icon: Send, color: 'green', action: () => navigate('/notifications') },
    { label: 'Voir Analytics', icon: FileText, color: 'purple', action: () => navigate('/analytics') },
  ];

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard 
          title="Total Contenus" 
          value={stats.totalContent} 
          icon={Play} 
          trend={12.5}
          color="blue"
        />
        <StatCard 
          title="Utilisateurs" 
          value={stats.totalUsers} 
          icon={Users} 
          trend={8.3}
          color="green"
        />
        <StatCard 
          title="Total Vues" 
          value={stats.totalViews.toLocaleString()} 
          icon={Eye} 
          trend={15.7}
          color="purple"
        />
        <StatCard 
          title="Total Likes" 
          value={stats.totalLikes.toLocaleString()} 
          icon={Heart} 
          trend={5.2}
          color="red"
        />
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Actions rapides</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {quickActions.map((action, idx) => {
            const Icon = action.icon;
            const colorClasses = {
              blue: 'bg-blue-50 text-blue-600 hover:bg-blue-100',
              green: 'bg-green-50 text-green-600 hover:bg-green-100',
              orange: 'bg-orange-50 text-orange-600 hover:bg-orange-100',
              purple: 'bg-purple-50 text-purple-600 hover:bg-purple-100',
            };
            return (
              <button
                key={idx}
                onClick={action.action}
                className={`flex items-center gap-3 p-4 rounded-lg transition-colors ${colorClasses[action.color]}`}
              >
                <Icon size={20} />
                <span className="font-medium text-sm">{action.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Content Types Pie Chart */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Types de contenu</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={stats.chartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {stats.chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Activity Chart */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Activité récente</h3>
          <div className="space-y-3">
            {stats.recentContent.length === 0 ? (
              <p className="text-center text-gray-500 py-4">Aucune activité récente</p>
            ) : (
              stats.recentContent.map((content, idx) => (
                <div key={idx} className="flex items-center justify-between pb-3 border-b border-gray-100 last:border-0">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900 truncate">{content.title}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <p className="text-xs text-gray-500">{content.authorName}</p>
                      <span className="text-xs text-gray-400">•</span>
                      <span className="text-xs px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full">
                        {content.type}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">{content.views || 0} vues</p>
                    <p className="text-xs text-gray-500">{content.likes?.length || 0} likes</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Recent Content */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Contenu récent</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b border-gray-200">
              <tr>
                <th className="text-left py-3 px-4 font-medium text-gray-600">Titre</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">Type</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">Auteur</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">Vues</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">Likes</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">Statut</th>
              </tr>
            </thead>
            <tbody>
              {stats.recentContent.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center py-8 text-gray-500">
                    Aucun contenu disponible
                  </td>
                </tr>
              ) : (
                stats.recentContent.map((content, idx) => (
                  <tr key={idx} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="py-3 px-4 text-gray-900 font-medium max-w-xs truncate">{content.title}</td>
                    <td className="py-3 px-4">
                      <span className="inline-block px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded-full font-medium">
                        {content.type}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-gray-600">{content.authorName}</td>
                    <td className="py-3 px-4 text-gray-600">{content.views || 0}</td>
                    <td className="py-3 px-4 text-gray-600">{content.likes?.length || 0}</td>
                    <td className="py-3 px-4">
                      <span className={`inline-block px-2 py-1 text-xs rounded-full font-medium ${
                        content.status === 'published' 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-orange-100 text-orange-700'
                      }`}>
                        {content.status === 'published' ? 'Publié' : 'Brouillon'}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
