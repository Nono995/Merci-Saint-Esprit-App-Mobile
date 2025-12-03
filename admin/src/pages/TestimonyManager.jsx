import { useState, useEffect } from 'react';
import { collection, query, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../config/firebase';
import DataTable from '../components/DataTable';
import { CheckCircle, XCircle, Clock, Eye, Heart } from 'lucide-react';

export default function TestimonyManager() {
  const [testimonies, setTestimonies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // all, pending, approved, rejected

  useEffect(() => {
    loadTestimonies();
  }, []);

  const loadTestimonies = async () => {
    try {
      const q = query(collection(db, 'content'));
      const snapshot = await getDocs(q);
      const data = snapshot.docs
        .map(doc => ({ id: doc.id, ...doc.data() }))
        .filter(item => item.type === 'testimony');
      setTestimonies(data);
    } catch (error) {
      console.error('Error loading testimonies:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (testimony) => {
    try {
      await updateDoc(doc(db, 'content', testimony.id), {
        status: 'published',
        moderatedAt: new Date(),
      });
      loadTestimonies();
    } catch (error) {
      console.error('Error approving testimony:', error);
    }
  };

  const handleReject = async (testimony) => {
    try {
      await updateDoc(doc(db, 'content', testimony.id), {
        status: 'rejected',
        moderatedAt: new Date(),
      });
      loadTestimonies();
    } catch (error) {
      console.error('Error rejecting testimony:', error);
    }
  };

  const handleDelete = async (testimony) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce témoignage ?')) return;
    
    try {
      await deleteDoc(doc(db, 'content', testimony.id));
      loadTestimonies();
    } catch (error) {
      console.error('Error deleting testimony:', error);
    }
  };

  const filteredTestimonies = testimonies.filter(t => {
    if (filter === 'all') return true;
    if (filter === 'pending') return t.status === 'draft' || !t.status;
    if (filter === 'approved') return t.status === 'published';
    if (filter === 'rejected') return t.status === 'rejected';
    return true;
  });

  const columns = [
    {
      key: 'title',
      label: 'Titre',
      sortable: true,
      render: (value) => (
        <div className="max-w-xs truncate font-medium">{value}</div>
      ),
    },
    {
      key: 'authorName',
      label: 'Auteur',
      sortable: true,
    },
    {
      key: 'createdAt',
      label: 'Date',
      sortable: true,
      render: (value) => {
        if (!value) return '-';
        const date = value.toDate ? value.toDate() : new Date(value);
        return date.toLocaleDateString('fr-FR');
      },
    },
    {
      key: 'views',
      label: 'Vues',
      sortable: true,
      render: (value) => (
        <div className="flex items-center gap-1">
          <Eye size={14} className="text-gray-400" />
          <span>{value || 0}</span>
        </div>
      ),
    },
    {
      key: 'likes',
      label: 'Likes',
      sortable: true,
      render: (value) => (
        <div className="flex items-center gap-1">
          <Heart size={14} className="text-gray-400" />
          <span>{value?.length || 0}</span>
        </div>
      ),
    },
    {
      key: 'status',
      label: 'Statut',
      sortable: true,
      render: (value) => {
        const statusConfig = {
          published: { label: 'Approuvé', color: 'green', icon: CheckCircle },
          draft: { label: 'En attente', color: 'orange', icon: Clock },
          rejected: { label: 'Rejeté', color: 'red', icon: XCircle },
        };
        const config = statusConfig[value] || statusConfig.draft;
        const Icon = config.icon;
        
        return (
          <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-${config.color}-100 text-${config.color}-700`}>
            <Icon size={12} />
            {config.label}
          </span>
        );
      },
    },
  ];

  if (loading) {
    return <div className="text-center py-12">Chargement...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total</p>
              <p className="text-2xl font-bold text-gray-900">{testimonies.length}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <Heart size={20} className="text-blue-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">En attente</p>
              <p className="text-2xl font-bold text-orange-600">
                {testimonies.filter(t => t.status === 'draft' || !t.status).length}
              </p>
            </div>
            <div className="p-3 bg-orange-100 rounded-lg">
              <Clock size={20} className="text-orange-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Approuvés</p>
              <p className="text-2xl font-bold text-green-600">
                {testimonies.filter(t => t.status === 'published').length}
              </p>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <CheckCircle size={20} className="text-green-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Rejetés</p>
              <p className="text-2xl font-bold text-red-600">
                {testimonies.filter(t => t.status === 'rejected').length}
              </p>
            </div>
            <div className="p-3 bg-red-100 rounded-lg">
              <XCircle size={20} className="text-red-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filter === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Tous ({testimonies.length})
          </button>
          <button
            onClick={() => setFilter('pending')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filter === 'pending' ? 'bg-orange-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            En attente ({testimonies.filter(t => t.status === 'draft' || !t.status).length})
          </button>
          <button
            onClick={() => setFilter('approved')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filter === 'approved' ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Approuvés ({testimonies.filter(t => t.status === 'published').length})
          </button>
          <button
            onClick={() => setFilter('rejected')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filter === 'rejected' ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Rejetés ({testimonies.filter(t => t.status === 'rejected').length})
          </button>
        </div>
      </div>

      {/* Table */}
      <DataTable
        columns={columns}
        data={filteredTestimonies}
        onEdit={(testimony) => {
          if (testimony.status !== 'published') {
            handleApprove(testimony);
          }
        }}
        onDelete={handleDelete}
      />
    </div>
  );
}
