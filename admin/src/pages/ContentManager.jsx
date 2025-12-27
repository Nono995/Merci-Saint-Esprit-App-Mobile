import { useState, useEffect } from 'react';
import { collection, getDocs, deleteDoc, doc, updateDoc, addDoc, Timestamp, where, query, orderBy } from 'firebase/firestore';
import { db, auth } from '../config/firebase';
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
  
  // Champs spécifiques pour vidéo
  const [videoUrl, setVideoUrl] = useState('');
  const [videoDuration, setVideoDuration] = useState('');
  const [videoAuthor, setVideoAuthor] = useState('');
  
  // Champs spécifiques pour podcast
  const [podcastUrl, setPodcastUrl] = useState('');
  const [podcastDuration, setPodcastDuration] = useState('');
  const [podcastAuthor, setPodcastAuthor] = useState('');
  
  // Champs spécifiques pour témoignage
  const [testimonyAuthor, setTestimonyAuthor] = useState('');
  const [testimonyDate, setTestimonyDate] = useState('');
  const [testimonyCategory, setTestimonyCategory] = useState('');

  // Champs spécifiques pour prière
  const [prayerAuthor, setPrayerAuthor] = useState('');

  // Champs spécifiques pour messages du jour
  const [msgReference, setMsgReference] = useState('');
  const [msgCategory, setMsgCategory] = useState('');

  useEffect(() => {
    loadContent();
  }, [activeTab]);

  const loadContent = async () => {
    setLoading(true);
    try {
      if (activeTab === 'prayers') {
        const q = query(
          collection(db, 'prayers'),
          orderBy('createdAt', 'desc')
        );
        const snapshot = await getDocs(q);
        setContents(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        setLoading(false);
        return;
      }

      if (activeTab === 'dailyMessages') {
        const q = query(
          collection(db, 'daily_messages'),
          orderBy('createdAt', 'desc')
        );
        const snapshot = await getDocs(q);
        setContents(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        setLoading(false);
        return;
      }

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
      
      // Generate thumbnail URL for videos
      let thumbnailUrl = null;
      if (response.data.resource_type === 'video') {
        // Cloudinary automatically generates thumbnails for videos
        // Format: replace /upload/ with /upload/so_0/ to get first frame
        thumbnailUrl = response.data.secure_url.replace('/upload/', '/upload/so_0,w_640,h_360,c_fill,q_auto/').replace(/\.(mp4|mov|avi|webm)$/i, '.jpg');
      }
      
      return {
        url: response.data.secure_url,
        publicId: response.data.public_id,
        type: response.data.resource_type,
        thumbnailUrl: thumbnailUrl,
        duration: response.data.duration,
      };
    } catch (error) {
      throw new Error(`Upload Cloudinary échoué: ${error.message}`);
    }
  };

  const handleAddContent = async (e) => {
    e.preventDefault();
    const contentType = getContentTypeForTab();
    
    // Validation selon le type
    const isPrayer = activeTab === 'prayers';
    if ((!isPrayer && !formData.title.trim()) || !formData.description.trim()) {
      alert('❌ Veuillez remplir tous les champs obligatoires');
      return;
    }

    // Validation spécifique pour vidéo
    if (contentType === 'video' && !isPrayer) {
      if (!videoUrl.trim() && !selectedFile) {
        alert('❌ Veuillez fournir une URL ou sélectionner une vidéo');
        return;
      }
    }

    // Validation spécifique pour podcast
    if (contentType === 'audio') {
      if (!podcastAuthor.trim()) {
        alert('❌ Veuillez indiquer l\'auteur du podcast');
        return;
      }
      if (!podcastUrl.trim() && !selectedFile) {
        alert('❌ Veuillez fournir une URL ou sélectionner un fichier audio');
        return;
      }
    }

    // Validation spécifique pour témoignage
    if (contentType === 'testimony') {
      if (!testimonyAuthor.trim()) {
        alert('❌ Veuillez indiquer l\'auteur du témoignage');
        return;
      }
      if (!testimonyCategory.trim()) {
        alert('❌ Veuillez indiquer la catégorie du témoignage');
        return;
      }
      if (!testimonyDate.trim()) {
        alert('❌ Veuillez indiquer la date du témoignage');
        return;
      }
    }

    // Validation spécifique pour prière
    if (activeTab === 'prayers') {
      if (!prayerAuthor.trim()) {
        alert('❌ Veuillez indiquer le nom de la personne qui demande la prière');
        return;
      }
      if (!formData.description.trim()) {
        alert('❌ Veuillez indiquer l\'intention de prière');
        return;
      }
    }

    // Validation spécifique pour messages du jour
    if (activeTab === 'dailyMessages') {
      if (!formData.title.trim()) {
        alert('❌ Veuillez indiquer un titre');
        return;
      }
      if (!formData.description.trim()) {
        alert('❌ Veuillez indiquer le message');
        return;
      }
    }

    setUploading(true);
    try {
      let cloudinaryData = null;
      
      // Upload fichier si présent
      if (selectedFile) {
        cloudinaryData = await uploadToCloudinary(selectedFile);
      }

      // Récupérer l'utilisateur connecté
      const currentUser = auth.currentUser;
      if (!currentUser) {
        alert('❌ Vous devez être connecté pour publier du contenu');
        return;
      }

      // Logique pour les messages du jour
      if (activeTab === 'dailyMessages') {
        await addDoc(collection(db, 'daily_messages'), {
          title: formData.title,
          message: formData.description,
          author: msgReference || 'Saint Esprit',
          reference: msgReference,
          category: msgCategory || 'Inspiration',
          createdAt: Timestamp.now(),
        });
        
        setMsgReference('');
        setMsgCategory('');
        setFormData({ title: '', description: '', type: 'video', authorName: 'Admin' });
        setShowForm(false);
        loadContent();
        alert('✅ Message du jour ajouté avec succès !');
        setUploading(false);
        return;
      }

      // Logique pour les prières (collection différente)
      if (activeTab === 'prayers') {
        await addDoc(collection(db, 'prayers'), {
          authorId: currentUser.uid,
          authorName: prayerAuthor,
          request: formData.description,
          createdAt: Timestamp.now(),
          prayers: [],
        });
        
        setPrayerAuthor('');
        setFormData({ title: '', description: '', type: 'video', authorName: 'Admin' });
        setShowForm(false);
        loadContent();
        alert('✅ Demande de prière ajoutée avec succès !');
        setUploading(false);
        return;
      }

      // Déterminer le nom de l'auteur selon le type de contenu
      let authorName;
      if (contentType === 'audio') {
        authorName = podcastAuthor; // Nom de l'auteur du podcast
      } else if (contentType === 'testimony') {
        authorName = testimonyAuthor; // Nom de l'auteur du témoignage
      } else if (contentType === 'video' && videoAuthor.trim()) {
        authorName = videoAuthor; // Nom de l'auteur de la vidéo (si renseigné)
      } else {
        authorName = currentUser.displayName || currentUser.email || 'Admin'; // Fallback
      }

      // Préparer les données de base
      const contentData = {
        title: formData.title,
        description: formData.description,
        type: contentType,
        authorId: currentUser.uid,
        authorName: authorName,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
        views: 0,
        likes: [],
        shares: 0,
        status: 'published',
      };

      // Ajouter URL du fichier si uploadé
      if (cloudinaryData) {
        contentData.mediaUrl = cloudinaryData.url;
        contentData.publicId = cloudinaryData.publicId;
        contentData.duration = cloudinaryData.duration;
        // Ajouter thumbnail pour les vidéos
        if (cloudinaryData.thumbnailUrl) {
          contentData.thumbnailUrl = cloudinaryData.thumbnailUrl;
        }
      }

      // Ajouter les champs spécifiques selon le type
      if (contentType === 'video') {
        contentData.videoUrl = videoUrl || null;
        contentData.duration = videoDuration || null;
      } else if (contentType === 'audio') {
        contentData.audioUrl = podcastUrl || null;
        contentData.duration = podcastDuration || null;
        contentData.author = podcastAuthor; // Champ supplémentaire pour podcast
      } else if (contentType === 'testimony') {
        contentData.author = testimonyAuthor; // Champ supplémentaire pour témoignage
        contentData.date = testimonyDate;
        contentData.category = testimonyCategory || null;
      }

      await addDoc(collection(db, 'content'), contentData);

      // Reset tous les champs
      setFormData({ title: '', description: '', type: contentType, authorName: 'Admin' });
      setSelectedFile(null);
      setVideoUrl('');
      setVideoDuration('');
      setVideoAuthor('');
      setPodcastUrl('');
      setPodcastDuration('');
      setPodcastAuthor('');
      setTestimonyAuthor('');
      setTestimonyDate('');
      setTestimonyCategory('');
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
      let collectionName = 'content';
      if (activeTab === 'prayers') collectionName = 'prayers';
      else if (activeTab === 'dailyMessages') collectionName = 'daily_messages';
      
      await deleteDoc(doc(db, collectionName, id));
      setContents(contents.filter(c => c.id !== id));
    } catch (error) {
      console.error('Error deleting:', error);
    }
  };

  const tabs = [
    { id: 'videos', label: 'Vidéos', icon: '🎥', description: 'Gérer les vidéos de prédications' },
    { id: 'podcasts', label: 'Podcasts', icon: '🎙️', description: 'Gérer les podcasts audio' },
    { id: 'testimonies', label: 'Témoignages', icon: '💬', description: 'Gérer les témoignages' },
    { id: 'dailyMessages', label: 'Inspirations', icon: '✨', description: 'Messages du jour' },
    { id: 'prayers', label: 'Prières', icon: '🙏', description: 'Gérer les intentions de prière' },
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
        <div className="grid grid-cols-5 divide-x divide-gray-200">
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
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xl">{tab.icon}</span>
                <span className={`font-semibold text-sm ${
                  activeTab === tab.id ? 'text-blue-600' : 'text-gray-900'
                }`}>
                  {tab.label}
                </span>
              </div>
              <p className="text-[10px] text-gray-500 leading-tight">{tab.description}</p>
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={() => {
          setShowForm(!showForm);
          setFormData({ ...formData, type: getContentTypeForTab() });
        }}
        className="flex items-center gap-2 btn-primary"
      >
        <Plus size={20} />
        Ajouter {activeTab === 'videos' ? 'une vidéo' : 
                 activeTab === 'podcasts' ? 'un podcast' : 
                 activeTab === 'dailyMessages' ? 'une inspiration' :
                 activeTab === 'testimonies' ? 'un témoignage' : 'une intention de prière'}
      </button>

      {/* Upload Form */}
      {showForm && (
        <div className="card bg-gradient-to-br from-white to-blue-50 border-2 border-blue-200">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="font-bold text-gray-900 text-lg">
                {activeTab === 'videos' ? '📹 Nouvelle Vidéo' : 
                 activeTab === 'podcasts' ? '🎙️ Nouveau Podcast' : 
                 activeTab === 'dailyMessages' ? '✨ Nouvelle Inspiration' :
                 activeTab === 'testimonies' ? '💬 Nouveau Témoignage' :
                 '🙏 Nouvelle Intention de Prière'}
              </h3>
              <p className="text-sm text-gray-600 mt-1">
                {activeTab === 'videos' ? 'Ajoutez une vidéo de prédication' : 
                 activeTab === 'podcasts' ? 'Ajoutez un podcast audio' : 
                 activeTab === 'dailyMessages' ? 'Ajoutez un verset ou message inspirant' :
                 activeTab === 'testimonies' ? 'Ajoutez un témoignage' :
                 'Ajoutez une intention de prière pour la communauté'}
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

            {activeTab !== 'prayers' && (
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
            )}

            {activeTab !== 'prayers' ? (
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
            ) : (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  🙏 Intention de prière
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="input-field"
                  placeholder="Écrivez l'intention de prière ici..."
                  rows="5"
                  required
                />
              </div>
            )}

            {/* Formulaire spécifique pour VIDÉO */}
            {activeTab === 'videos' && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    👤 Auteur de la vidéo
                  </label>
                  <input
                    type="text"
                    value={videoAuthor}
                    onChange={(e) => setVideoAuthor(e.target.value)}
                    className="input-field"
                    placeholder="Nom du prédicateur ou auteur (ex: Pasteur Jean)"
                  />
                  <p className="text-xs text-gray-500 mt-1">Laissez vide pour utiliser votre nom d'admin</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    🔗 URL de la vidéo (YouTube, Vimeo...)
                  </label>
                  <input
                    type="url"
                    value={videoUrl}
                    onChange={(e) => setVideoUrl(e.target.value)}
                    className="input-field"
                    placeholder="https://youtube.com/watch?v=..."
                  />
                  <p className="text-xs text-gray-500 mt-1">Ou uploadez un fichier ci-dessous</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    ⏱️ Durée (optionnel)
                  </label>
                  <input
                    type="text"
                    value={videoDuration}
                    onChange={(e) => setVideoDuration(e.target.value)}
                    className="input-field"
                    placeholder="Ex: 15:30"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    🎬 Ou uploader une vidéo
                  </label>
                  <div className="border-2 border-dashed border-blue-300 rounded-lg p-6 text-center hover:border-blue-500 bg-white transition-colors cursor-pointer">
                    <input
                      type="file"
                      onChange={(e) => setSelectedFile(e.target.files[0])}
                      className="hidden"
                      id="file-input"
                      accept="video/*"
                    />
                    <label htmlFor="file-input" className="cursor-pointer flex flex-col items-center gap-2">
                      <Upload size={32} className="text-blue-600" />
                      <span className="text-sm font-medium">
                        {selectedFile ? `✓ ${selectedFile.name}` : 'Cliquez pour ajouter une vidéo'}
                      </span>
                      <span className="text-xs text-gray-500">MP4, MOV, AVI...</span>
                    </label>
                  </div>
                </div>
              </>
            )}

            {/* Formulaire spécifique pour PODCAST */}
            {activeTab === 'podcasts' && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    👤 Auteur du podcast <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={podcastAuthor}
                    onChange={(e) => setPodcastAuthor(e.target.value)}
                    className="input-field"
                    placeholder="Nom de l'auteur ou prédicateur"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    🔗 URL du podcast (SoundCloud, Spotify...)
                  </label>
                  <input
                    type="url"
                    value={podcastUrl}
                    onChange={(e) => setPodcastUrl(e.target.value)}
                    className="input-field"
                    placeholder="https://soundcloud.com/..."
                  />
                  <p className="text-xs text-gray-500 mt-1">Ou uploadez un fichier ci-dessous</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    ⏱️ Durée (optionnel)
                  </label>
                  <input
                    type="text"
                    value={podcastDuration}
                    onChange={(e) => setPodcastDuration(e.target.value)}
                    className="input-field"
                    placeholder="Ex: 45:00"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    🎵 Ou uploader un fichier audio
                  </label>
                  <div className="border-2 border-dashed border-purple-300 rounded-lg p-6 text-center hover:border-purple-500 bg-white transition-colors cursor-pointer">
                    <input
                      type="file"
                      onChange={(e) => setSelectedFile(e.target.files[0])}
                      className="hidden"
                      id="file-input"
                      accept="audio/*"
                    />
                    <label htmlFor="file-input" className="cursor-pointer flex flex-col items-center gap-2">
                      <Upload size={32} className="text-purple-600" />
                      <span className="text-sm font-medium">
                        {selectedFile ? `✓ ${selectedFile.name}` : 'Cliquez pour ajouter un fichier audio'}
                      </span>
                      <span className="text-xs text-gray-500">MP3, WAV, M4A...</span>
                    </label>
                  </div>
                </div>
              </>
            )}

            {/* Formulaire spécifique pour TÉMOIGNAGE */}
            {activeTab === 'testimonies' && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    👤 Auteur du témoignage <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={testimonyAuthor}
                    onChange={(e) => setTestimonyAuthor(e.target.value)}
                    className="input-field"
                    placeholder="Nom de la personne"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    🏷️ Catégorie <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={testimonyCategory}
                    onChange={(e) => setTestimonyCategory(e.target.value)}
                    className="input-field"
                    required
                  >
                    <option value="">Sélectionnez une catégorie</option>
                    <option value="Guérison">Guérison</option>
                    <option value="Conversion">Conversion</option>
                    <option value="Miracle">Miracle</option>
                    <option value="Délivrance">Délivrance</option>
                    <option value="Provision">Provision</option>
                    <option value="Restauration">Restauration</option>
                    <option value="Autre">Autre</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    📅 Date du témoignage <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    value={testimonyDate}
                    onChange={(e) => setTestimonyDate(e.target.value)}
                    className="input-field"
                    required
                  />
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <AlertCircle size={20} className="text-blue-600 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-blue-900">Témoignages texte uniquement</p>
                      <p className="text-xs text-blue-700 mt-1">
                        Les témoignages sont publiés sous forme de texte. Pas besoin d'uploader de fichier.
                        Pour les vidéos courtes (30-40s), utilisez la section "Vidéos".
                      </p>
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* Formulaire spécifique pour MESSAGE DU JOUR */}
            {activeTab === 'dailyMessages' && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    📖 Référence Biblique / Auteur <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={msgReference}
                    onChange={(e) => setMsgReference(e.target.value)}
                    className="input-field"
                    placeholder="Ex: Jean 3:16 ou Pasteur Jean"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    🏷️ Catégorie
                  </label>
                  <input
                    type="text"
                    value={msgCategory}
                    onChange={(e) => setMsgCategory(e.target.value)}
                    className="input-field"
                    placeholder="Ex: Espérance, Paix, Foi..."
                  />
                </div>
              </>
            )}

            {/* Formulaire spécifique pour PRIÈRE */}
            {activeTab === 'prayers' && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    👤 Nom du demandeur
                  </label>
                  <input
                    type="text"
                    value={prayerAuthor}
                    onChange={(e) => setPrayerAuthor(e.target.value)}
                    className="input-field"
                    placeholder="Nom de la personne (ex: Marie K.)"
                    required
                  />
                </div>
              </>
            )}

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
              <p className="text-sm text-gray-600">Total {activeTab === 'videos' ? 'Vidéos' : activeTab === 'podcasts' ? 'Podcasts' : activeTab === 'testimonies' ? 'Témoignages' : 'Prières'}</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{contents.length}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <span className="text-2xl">
                {activeTab === 'videos' ? '🎥' : activeTab === 'podcasts' ? '🎙️' : activeTab === 'testimonies' ? '💬' : '🙏'}
              </span>
            </div>
          </div>
        </div>

        {activeTab !== 'prayers' ? (
          <>
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
          </>
        ) : (
          <>
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Soutiens totaux</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">
                    {contents.reduce((sum, c) => sum + (c.prayers?.length || 0), 0).toLocaleString()}
                  </p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Heart size={24} className="text-purple-600" />
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Dernière intention</p>
                  <p className="text-sm font-bold text-gray-900 mt-1 truncate">
                    {contents[0]?.authorName || 'Aucune'}
                  </p>
                </div>
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                  <Plus size={24} className="text-orange-600" />
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Content Table */}
      <div className="card overflow-x-auto">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-gray-900">
            Liste des {activeTab === 'videos' ? 'Vidéos' : 
                       activeTab === 'podcasts' ? 'Podcasts' : 
                       activeTab === 'testimonies' ? 'Témoignages' : 'Prières'}
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
              {activeTab === 'videos' ? '🎥' : activeTab === 'podcasts' ? '🎙️' : activeTab === 'testimonies' ? '💬' : '🙏'}
            </div>
            <p className="text-gray-500 mb-4">
              Aucun {activeTab === 'videos' ? 'vidéo' : 
                     activeTab === 'podcasts' ? 'podcast' : 
                     activeTab === 'testimonies' ? 'témoignage' : 'intention de prière'} pour le moment
            </p>
            <button
              onClick={() => {
                setShowForm(true);
                setFormData({ ...formData, type: getContentTypeForTab() });
              }}
              className="btn-primary"
            >
              <Plus size={16} className="inline mr-2" />
              Ajouter {activeTab === 'prayers' ? 'la' : 'le'} premièr{activeTab === 'prayers' ? 'e' : ''}
            </button>
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-600">
                  {activeTab === 'prayers' ? 'Intention' : 'Titre'}
                </th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">Type</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">
                  {activeTab === 'dailyMessages' ? 'Référence' : 'Auteur'}
                </th>
                <th className="text-center py-3 px-4 font-medium text-gray-600">Stats</th>
                <th className="text-center py-3 px-4 font-medium text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {contents.map((content) => (
                <tr key={content.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <div className="max-w-md">
                      <p className="font-medium text-gray-900 truncate">
                        {activeTab === 'prayers' ? content.request : content.title}
                      </p>
                      <p className="text-xs text-gray-500 truncate">
                        {activeTab === 'prayers' ? '' : (activeTab === 'dailyMessages' ? content.message : content.description)}
                      </p>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`inline-block px-2 py-1 text-xs rounded font-medium ${
                      activeTab === 'prayers' ? 'bg-orange-100 text-orange-700' :
                      activeTab === 'dailyMessages' ? 'bg-yellow-100 text-yellow-700' :
                      content.type === 'video' ? 'bg-blue-100 text-blue-700' :
                      content.type === 'audio' ? 'bg-purple-100 text-purple-700' :
                      'bg-green-100 text-green-700'
                    }`}>
                      {activeTab === 'prayers' ? '🙏 Prière' :
                       activeTab === 'dailyMessages' ? '✨ Inspiration' :
                       content.type === 'video' ? '🎥 Vidéo' : 
                       content.type === 'audio' ? '🎙️ Podcast' : 
                       '💬 Témoignage'}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-gray-600">
                    {activeTab === 'dailyMessages' ? content.author : content.authorName}
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center justify-center gap-3 text-xs text-gray-600">
                      {activeTab !== 'prayers' && activeTab !== 'dailyMessages' ? (
                        <>
                          <span className="flex items-center gap-1">
                            <Eye size={14} /> {content.views || 0}
                          </span>
                          <span className="flex items-center gap-1">
                            <Heart size={14} /> {content.likes?.length || 0}
                          </span>
                        </>
                      ) : (
                        <span className="flex items-center gap-1">
                          <Heart size={14} /> {content.prayers?.length || 0} soutiens
                        </span>
                      )}
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
