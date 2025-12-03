import { useState, useEffect } from 'react';
import { collection, query, getDocs } from 'firebase/firestore';
import { db } from '../config/firebase';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import StatCard from '../components/StatCard';
import { Eye, Heart, Share2, TrendingUp, Download } from 'lucide-react';

export default function Analytics() {
  const [stats, setStats] = useState({
    totalViews: 0,
    totalLikes: 0,
    totalShares: 0,
    viewsGrowth: 0,
    viewsByDay: [],
    contentByType: [],
    topContent: [],
  });
  const [loading, setLoading] = useState(true);
  const [period, setPeriod] = useState('7days'); // 7days, 30days, 90days

  useEffect(() => {
    loadAnalytics();
  }, [period]);

  const loadAnalytics = async () => {
    try {
      const contentSnap = await getDocs(collection(db, 'content'));
      const contentData = contentSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));

      // Calculate stats
      const totalViews = contentData.reduce((sum, item) => sum + (item.views || 0), 0);
      const totalLikes = contentData.reduce((sum, item) => sum + (item.likes?.length || 0), 0);
      const totalShares = contentData.reduce((sum, item) => sum + (item.shares || 0), 0);

      // Views by day (mock data for now)
      const viewsByDay = Array.from({ length: 7 }, (_, i) => ({
        date: new Date(Date.now() - (6 - i) * 24 * 60 * 60 * 1000).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short' }),
        vues: Math.floor(Math.random() * 1000) + 500,
        likes: Math.floor(Math.random() * 200) + 50,
      }));

      // Content by type
      const contentByType = [
        { name: 'Vidéos', value: contentData.filter(c => c.type === 'video').length, color: '#3B82F6' },
        { name: 'Podcasts', value: contentData.filter(c => c.type === 'podcast').length, color: '#8B5CF6' },
        { name: 'Témoignages', value: contentData.filter(c => c.type === 'testimony').length, color: '#EF4444' },
        { name: 'Événements', value: contentData.filter(c => c.type === 'event').length, color: '#F59E0B' },
      ];

      // Top content
      const topContent = contentData
        .sort((a, b) => (b.views || 0) - (a.views || 0))
        .slice(0, 10);

      setStats({
        totalViews,
        totalLikes,
        totalShares,
        viewsGrowth: 12.5,
        viewsByDay,
        contentByType,
        topContent,
      });
    } catch (error) {
      console.error('Error loading analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  const exportData = () => {
    // Export to CSV
    const csv = [
      ['Titre', 'Type', 'Vues', 'Likes', 'Partages'],
      ...stats.topContent.map(item => [
        item.title,
        item.type,
        item.views || 0,
        item.likes?.length || 0,
        item.shares || 0,
      ]),
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `analytics-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  if (loading) {
    return <div className="text-center py-12">Chargement...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Period Selector */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setPeriod('7days')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              period === '7days' ? 'bg-blue-600 text-white' : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
            }`}
          >
            7 jours
          </button>
          <button
            onClick={() => setPeriod('30days')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              period === '30days' ? 'bg-blue-600 text-white' : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
            }`}
          >
            30 jours
          </button>
          <button
            onClick={() => setPeriod('90days')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              period === '90days' ? 'bg-blue-600 text-white' : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
            }`}
          >
            90 jours
          </button>
        </div>
        
        <button
          onClick={exportData}
          className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
        >
          <Download size={16} />
          Exporter CSV
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard
          title="Total Vues"
          value={stats.totalViews.toLocaleString()}
          icon={Eye}
          trend={stats.viewsGrowth}
          color="blue"
        />
        <StatCard
          title="Total Likes"
          value={stats.totalLikes.toLocaleString()}
          icon={Heart}
          trend={8.3}
          color="red"
        />
        <StatCard
          title="Total Partages"
          value={stats.totalShares.toLocaleString()}
          icon={Share2}
          trend={15.7}
          color="green"
        />
        <StatCard
          title="Engagement"
          value={`${((stats.totalLikes / stats.totalViews) * 100).toFixed(1)}%`}
          icon={TrendingUp}
          trend={5.2}
          color="purple"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Views by Day */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Vues par jour</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={stats.viewsByDay}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="date" stroke="#6B7280" style={{ fontSize: '12px' }} />
              <YAxis stroke="#6B7280" style={{ fontSize: '12px' }} />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="vues" stroke="#3B82F6" strokeWidth={2} dot={{ r: 4 }} />
              <Line type="monotone" dataKey="likes" stroke="#EF4444" strokeWidth={2} dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Content by Type */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Contenu par type</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={stats.contentByType}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {stats.contentByType.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Top Content */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Top 10 Contenus</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-gray-200">
              <tr>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">#</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Titre</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Type</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Vues</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Likes</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Engagement</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {stats.topContent.map((item, idx) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="py-3 px-4 text-sm text-gray-900 font-medium">{idx + 1}</td>
                  <td className="py-3 px-4 text-sm text-gray-900 max-w-xs truncate">{item.title}</td>
                  <td className="py-3 px-4">
                    <span className="inline-block px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded-full">
                      {item.type}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-600">{item.views || 0}</td>
                  <td className="py-3 px-4 text-sm text-gray-600">{item.likes?.length || 0}</td>
                  <td className="py-3 px-4 text-sm text-gray-600">
                    {((item.likes?.length || 0) / (item.views || 1) * 100).toFixed(1)}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
