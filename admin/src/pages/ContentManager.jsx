import { useState, useEffect } from 'react';
import { collection, getDocs, deleteDoc, doc, updateDoc, addDoc, Timestamp, where, query } from 'firebase/firestore';
import { db } from '../config/firebase';
import { Trash2, Eye, Heart, Plus, Upload, AlertCircle, X, Loader } from 'lucide-react';
import axios from 'axios';

const CLOUDINARY_CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const CLOUDINARY_UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
const CLOUDINARY_URL = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/upload`;

export default function ContentManager() {
  const [contents, setContents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('videos'); // videos, podcasts, testimonies
  const [showForm, setShowForm] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: 'video',
    authorName: 'Admin',
  });

  useEffect(() => {
    loadContent();
  }, [activeTab]);

  const loadContent = async () => {
    setLoading(true);
    try {
      let contentType;
      if (activeTab === 'videos') contentType = 'video';
      else if (activeTab === 'podcasts') contentType = 'audio';
      else if (activeTab === 'testimonies') contentType = 'testimony';

      const q = query(
        collection(db, 'content'), 
        where('type', '==', contentType),
        where('status', '==', 'published')
      );
      
      const snapshot = await getDocs(q);
      setContents(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    } catch (error) {
      console.error('Error loading content:', error);
    } finally {
      setLoading(false);
    }
  };

  const getContentTypeForTab = () => {
    if (activeTab === 'videos') return 'video';
    if (activeTab === 'podcasts') return 'audio';
    if (activeTab === 'testimonies') return 'testimony';
    return 'video';
  };

  const uploadToCloudinary = async (file) => {
    const formDataCloud = new FormData();
    formDataCloud.append('file', file);
    formDataCloud.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
    formDataCloud.append('resource_type', 'auto');

    try {
      const response = await axios.post(CLOUDINARY_URL, formDataCloud, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      return {
        url: response.data.secure_url,
        publicId: response.data.public_id,
        type: response.data.resource_type,
      };
    } catch (error) {
      throw new Error(`Upload Cloudinary échoué: ${error.message}`);
    }
  };

  const handleAddContent = async (e) => {
    e.preventDefault();
    if (!selectedFile) {
      alert('Veuillez sélectionner un fichier');
      return;
    }

    setUploading(true);
    try {
      const cloudinaryData = await uploadToCloudinary(selectedFile);
      const contentType = getContentTypeForTab();

      await addDoc(collection(db, 'content'), {
        title: formData.title,
        description: formData.description,
        type: contentType,
        mediaUrl: cloudinaryData.url,
        publicId: cloudinaryData.publicId,
        authorId: 'admin',
        authorName: formData.authorName,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
        views: 0,
        likes: [],
        shares: 0,
        status: 'published',
      });

      setFormData({ title: '', description: '', type: contentType, authorName: 'Admin' });
      setSelectedFile(null);
      setShowForm(false);
      loadContent();
      
      const successMessage = activeTab === 'videos' ? 'Vidéo publiée' : 
                            activeTab === 'podcasts' ? 'Podcast publié' : 
                            'Témoignage publié';
      alert(`✅ ${successMessage} avec succès !`);
    } catch (error) {
      alert('❌ Erreur: ' + error.message);
      console.error('Error adding content:', error);
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Êtes-vous sûr ?')) return;
    
    try {
      await deleteDoc(doc(db, 'content', id));
      setContents(contents.filter(c => c.id !== id));
    } catch (error) {
      console.error('Error deleting:', error);
    }
  };

  const tabs = [
    { id: 'videos', label: 'Vidéos', icon: '🎥', description: 'Gérer les vidéos de prédications et enseignements' },
    { id: 'podcasts', label: 'Podcasts', icon: '🎙️', description: 'Gérer les podcasts et contenus audio' },
    { id: 'testimonies', label: 'Témoignages', icon: '💬', description: 'Gérer les témoignages des fidèles' },
  ];

  const getTabStats = () => {
    const videoCount = contents.filter(c => c.type === 'video').length;
    const audioCount = contents.filter(c => c.type === 'audio').length;
    const testimonyCount = contents.filter(c => c.type === 'testimony').length;
    
    return {
      videos: videoCount,
      podcasts: audioCount,
      testimonies: testimonyCount,
    };
  };

  return (
    <div className="space-y-6">
      {/* Header avec statistiques */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 text-white">
        <h2 className="text-2xl font-bold mb-2">Gestion du Contenu</h2>
        <p className="text-blue-100">Organisez et publiez vos vidéos, podcasts et témoignages</p>
      </div>

      {/* Tabs Navigation */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="grid grid-cols-3 divide-x divide-gray-200">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id);
                setShowForm(false);
              }}
              className={`p-4 text-left transition-all ${
                activeTab === tab.id
                  ? 'bg-blue-50 border-b-2 border-blue-600'
                  : 'hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl">{tab.icon}</span>
                <span className={`font-semibold ${
                  activeTab === tab.id ? 'text-blue-600' : 'text-gray-900'
                }`}>
                  {tab.label}
                </span>
                <span className={`ml-auto px-2 py-1 rounded-full text-xs font-medium ${
                  activeTab === tab.id 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-200 text-gray-700'
                }`}>
                  {contents.length}
                </span>
              </div>
              <p className="text-xs text-gray-500">{tab.description}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Add Button */}
      <button
        onClick={() => {
          setShowForm(!showForm);
          setFormData({ ...formData, type: getContentTypeForTab() });
        }}
        className="flex items-center gap-2 btn-primary"
      >
        <Plus size={20} />
        Ajouter {activeTab === 'videos' ? 'une vidéo' : activeTab === 'podcasts' ? 'un podcast' : 'un témoignage'}
      </button>

      {/* Upload Form */}
      {showForm && (
        <div className="card bg-gradient-to-br from-white to-blue-50 border-2 border-blue-200">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="font-bold text-gray-900 text-lg">
                {activeTab === 'videos' ? '📹 Nouvelle Vidéo' : 
                 activeTab === 'podcasts' ? '🎙️ Nouveau Podcast' : 
                 '💬 Nouveau Témoignage'}
              </h3>
              <p className="text-sm text-gray-600 mt-1">
                {activeTab === 'videos' ? 'Ajoutez une vidéo de prédication ou enseignement' : 
                 activeTab === 'podcasts' ? 'Ajoutez un podcast ou contenu audio' : 
                 'Ajoutez un témoignage inspirant'}
              </p>
            </div>
            <button 
              onClick={() => setShowForm(false)}
              className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          <form onSubmit={handleAddContent} className="space-y-4">
            <input type="hidden" name="type" value={getContentTypeForTab()} />

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Titre
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="input-field"
                placeholder="Titre du contenu"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="input-field"
                placeholder="Description"
                rows="3"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Auteur / Pasteur
              </label>
              <input
                type="text"
                name="authorName"
                value={formData.authorName}
                onChange={(e) => setFormData({ ...formData, authorName: e.target.value })}
                className="input-field"
                placeholder="Nom de l'auteur"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {activeTab === 'videos' ? '🎬 Fichier Vidéo' : 
                 activeTab === 'podcasts' ? '🎵 Fichier Audio' : 
                 '🎤 Fichier Audio/Vidéo'}
              </label>
              <div className="border-2 border-dashed border-blue-300 rounded-lg p-6 text-center hover:border-blue-500 bg-white transition-colors cursor-pointer">
                <input
                  type="file"
                  onChange={(e) => setSelectedFile(e.target.files[0])}
                  className="hidden"
                  id="file-input"
                  accept={activeTab === 'videos' ? 'video/*' : activeTab === 'podcasts' ? 'audio/*' : 'video/*,audio/*'}
                  required
                />
                <label htmlFor="file-input" className="cursor-pointer flex flex-col items-center gap-2">
                  <Upload size={32} className="text-blue-600" />
                  <span className="text-sm font-medium">
                    {selectedFile
                      ? `✓ ${selectedFile.name}`
                      : `Cliquez pour ajouter ${activeTab === 'videos' ? 'une vidéo' : activeTab === 'podcasts' ? 'un audio' : 'un fichier'}`}
                  </span>
                  <span className="text-xs text-gray-500">
                    {activeTab === 'videos' ? 'MP4, MOV, AVI...' : 
                     activeTab === 'podcasts' ? 'MP3, WAV, M4A...' : 
                     'Tous formats supportés'}
                  </span>
                </label>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                type="submit"
                disabled={uploading}
                className="flex items-center gap-2 btn-primary disabled:opacity-50"
              >
                {uploading ? (
                  <>
                    <Loader size={16} className="animate-spin" />
                    Upload...
                  </>
                ) : (
                  <>
                    <Upload size={16} />
                    Publier
                  </>
                )}
              </button>
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

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total {activeTab === 'videos' ? 'Vidéos' : activeTab === 'podcasts' ? 'Podcasts' : 'Témoignages'}</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{contents.length}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <span className="text-2xl">
                {activeTab === 'videos' ? '🎥' : activeTab === 'podcasts' ? '🎙️' : '💬'}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Vues</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                {contents.reduce((sum, c) => sum + (c.views || 0), 0).toLocaleString()}
              </p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Eye size={24} className="text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Likes</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                {contents.reduce((sum, c) => sum + (c.likes?.length || 0), 0).toLocaleString()}
              </p>
            </div>
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
              <Heart size={24} className="text-red-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Content Table */}
      <div className="card overflow-x-auto">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-gray-900">
            Liste des {activeTab === 'videos' ? 'Vidéos' : activeTab === 'podcasts' ? 'Podcasts' : 'Témoignages'}
          </h3>
          <span className="text-sm text-gray-500">{contents.length} élément(s)</span>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <Loader size={32} className="animate-spin mx-auto text-blue-600" />
            <p className="mt-4 text-gray-600">Chargement...</p>
          </div>
        ) : contents.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">
              {activeTab === 'videos' ? '🎥' : activeTab === 'podcasts' ? '🎙️' : '💬'}
            </div>
            <p className="text-gray-500 mb-4">
              Aucun {activeTab === 'videos' ? 'vidéo' : activeTab === 'podcasts' ? 'podcast' : 'témoignage'} pour le moment
            </p>
            <button
              onClick={() => {
                setShowForm(true);
                setFormData({ ...formData, type: getContentTypeForTab() });
              }}
              className="btn-primary"
            >
              <Plus size={16} className="inline mr-2" />
              Ajouter le premier
            </button>
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-600">Titre</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">Type</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">Auteur</th>
                <th className="text-center py-3 px-4 font-medium text-gray-600">Stats</th>
                <th className="text-center py-3 px-4 font-medium text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {contents.map((content) => (
                <tr key={content.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <div>
                      <p className="font-medium text-gray-900 truncate">{content.title}</p>
                      <p className="text-xs text-gray-500 truncate">{content.description}</p>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`inline-block px-2 py-1 text-xs rounded font-medium ${
                      content.type === 'video' ? 'bg-blue-100 text-blue-700' :
                      content.type === 'audio' ? 'bg-purple-100 text-purple-700' :
                      'bg-green-100 text-green-700'
                    }`}>
                      {content.type === 'video' ? '🎥 Vidéo' : 
                       content.type === 'audio' ? '🎙️ Podcast' : 
                       '💬 Témoignage'}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-gray-600">{content.authorName}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center justify-center gap-3 text-xs text-gray-600">
                      <span className="flex items-center gap-1">
                        <Eye size={14} /> {content.views || 0}
                      </span>
                      <span className="flex items-center gap-1">
                        <Heart size={14} /> {content.likes?.length || 0}
                      </span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => handleDelete(content.id)}
                        className="p-1 text-red-600 hover:bg-red-50 rounded"
                        title="Supprimer"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
