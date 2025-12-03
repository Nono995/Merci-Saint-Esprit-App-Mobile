import { useState, useEffect } from 'react';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '../config/firebase';
import { DollarSign, TrendingUp } from 'lucide-react';

export default function DonationManager() {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalDonations: 0,
    totalAmount: 0,
    averageAmount: 0,
  });

  useEffect(() => {
    loadDonations();
  }, []);

  const loadDonations = async () => {
    try {
      const q = query(collection(db, 'donations'), orderBy('createdAt', 'desc'));
      const snapshot = await getDocs(q);
      const donationData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      
      setDonations(donationData);

      const totalAmount = donationData.reduce((sum, d) => sum + (d.amount || 0), 0);
      setStats({
        totalDonations: donationData.length,
        totalAmount: totalAmount,
        averageAmount: donationData.length > 0 ? totalAmount / donationData.length : 0,
      });
    } catch (error) {
      console.error('Error loading donations:', error);
    } finally {
      setLoading(false);
    }
  };

  const StatCard = ({ icon: Icon, label, value }) => (
    <div className="card flex items-center gap-4">
      <div className="p-3 bg-primary/10 rounded-lg">
        <Icon size={24} className="text-primary" />
      </div>
      <div>
        <p className="text-sm text-gray-600">{label}</p>
        <p className="text-2xl font-bold text-gray-900">{value}</p>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard icon={DollarSign} label="Total collecté" value={`$${stats.totalAmount.toFixed(2)}`} />
        <StatCard icon={TrendingUp} label="Donations" value={stats.totalDonations} />
        <StatCard icon={DollarSign} label="Moyenne" value={`$${stats.averageAmount.toFixed(2)}`} />
      </div>

      {/* Donations List */}
      <div className="card">
        <h3 className="font-semibold text-gray-900 mb-4">Historique des donations</h3>
        
        {loading ? (
          <div className="text-center py-12">Chargement...</div>
        ) : donations.length === 0 ? (
          <div className="text-center py-12 text-gray-500">Aucune donation</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Donateur</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Email</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Montant</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Message</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Date</th>
                </tr>
              </thead>
              <tbody>
                {donations.map((donation) => (
                  <tr key={donation.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 font-medium text-gray-900">{donation.donorName || 'Anonyme'}</td>
                    <td className="py-3 px-4 text-gray-600">{donation.email || '-'}</td>
                    <td className="py-3 px-4 font-medium text-green-600">${donation.amount?.toFixed(2)}</td>
                    <td className="py-3 px-4 text-gray-600 max-w-xs truncate">{donation.message || '-'}</td>
                    <td className="py-3 px-4 text-gray-600">
                      {donation.createdAt?.toDate?.()?.toLocaleDateString('fr-FR') || 'N/A'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
