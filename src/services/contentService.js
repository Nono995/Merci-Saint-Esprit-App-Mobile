import {
  collection,
  addDoc,
  getDocs,
  getDoc,
  updateDoc,
  deleteDoc,
  doc,
  query,
  where,
  orderBy,
  limit,
  Timestamp,
  onSnapshot,
} from 'firebase/firestore';
import { db } from './firebaseConfig';
import { uploadToCloudinary, deleteFromCloudinary } from './cloudinaryService';

export async function publishContent(contentData) {
  try {
    let mediaUrl = null;
    let publicId = null;
    let duration = null;
    let thumbnailUrl = null;

    if (contentData.file) {
      const resourceType = contentData.type === 'video' ? 'video' : 'auto';
      const uploaded = await uploadToCloudinary(contentData.file, resourceType);
      mediaUrl = uploaded.url;
      publicId = uploaded.publicId;
      duration = uploaded.duration;
      thumbnailUrl = uploaded.thumbnailUrl;
    }

    const docRef = await addDoc(collection(db, 'content'), {
      title: contentData.title,
      description: contentData.description,
      type: contentData.type,
      mediaUrl: mediaUrl,
      publicId: publicId,
      duration: duration,
      thumbnailUrl: thumbnailUrl,
      authorId: contentData.authorId,
      authorName: contentData.authorName,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
      views: 0,
      likes: [],
      shares: 0,
      status: 'published',
    });

    return { id: docRef.id, mediaUrl, publicId, thumbnailUrl };
  } catch (error) {
    console.error('Publish error:', error);
    throw error;
  }
}

export async function fetchAllContent(limitCount = 20) {
  try {
    const q = query(
      collection(db, 'content'),
      where('status', '==', 'published'),
      orderBy('createdAt', 'desc'),
      limit(limitCount)
    );

    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate(),
      updatedAt: doc.data().updatedAt?.toDate(),
    }));
  } catch (error) {
    console.error('Fetch all error:', error);
    return [];
  }
}

export async function fetchContentByType(type, limitCount = 20) {
  try {
    const q = query(
      collection(db, 'content'),
      where('type', '==', type),
      where('status', '==', 'published'),
      orderBy('createdAt', 'desc'),
      limit(limitCount)
    );

    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate(),
      updatedAt: doc.data().updatedAt?.toDate(),
    }));
  } catch (error) {
    console.error('Fetch by type error:', error);
    return [];
  }
}

export async function fetchUserContent(userId, limitCount = 50) {
  try {
    const q = query(
      collection(db, 'content'),
      where('authorId', '==', userId),
      orderBy('createdAt', 'desc'),
      limit(limitCount)
    );

    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate(),
      updatedAt: doc.data().updatedAt?.toDate(),
    }));
  } catch (error) {
    console.error('Fetch user content error:', error);
    return [];
  }
}

export async function getContentById(contentId) {
  try {
    const docRef = doc(db, 'content', contentId);
    const snapshot = await getDoc(docRef);

    if (snapshot.exists()) {
      return {
        id: snapshot.id,
        ...snapshot.data(),
        createdAt: snapshot.data().createdAt?.toDate(),
        updatedAt: snapshot.data().updatedAt?.toDate(),
      };
    }
    return null;
  } catch (error) {
    console.error('Get content error:', error);
    return null;
  }
}

export async function updateContent(contentId, updates) {
  try {
    const docRef = doc(db, 'content', contentId);
    await updateDoc(docRef, {
      ...updates,
      updatedAt: Timestamp.now(),
    });
  } catch (error) {
    console.error('Update error:', error);
    throw error;
  }
}

export async function deleteContent(contentId) {
  try {
    const content = await getContentById(contentId);
    
    if (content?.publicId) {
      await deleteFromCloudinary(content.publicId);
    }

    const docRef = doc(db, 'content', contentId);
    await deleteDoc(docRef);
  } catch (error) {
    console.error('Delete error:', error);
    throw error;
  }
}

export async function incrementViews(contentId) {
  try {
    const content = await getContentById(contentId);
    const docRef = doc(db, 'content', contentId);
    await updateDoc(docRef, {
      views: (content?.views || 0) + 1,
    });
  } catch (error) {
    console.error('Increment views error:', error);
  }
}

export async function likeContent(contentId, userId) {
  try {
    const content = await getContentById(contentId);
    const likes = content?.likes || [];
    
    const docRef = doc(db, 'content', contentId);
    if (likes.includes(userId)) {
      await updateDoc(docRef, {
        likes: likes.filter(id => id !== userId),
      });
    } else {
      await updateDoc(docRef, {
        likes: [...likes, userId],
      });
    }
  } catch (error) {
    console.error('Like error:', error);
    throw error;
  }
}

export async function incrementShares(contentId) {
  try {
    const content = await getContentById(contentId);
    const docRef = doc(db, 'content', contentId);
    await updateDoc(docRef, {
      shares: (content?.shares || 0) + 1,
    });
  } catch (error) {
    console.error('Increment shares error:', error);
  }
}

export function listenAllContent(callback, limitCount = 20) {
  try {
    const q = query(
      collection(db, 'content'),
      where('status', '==', 'published')
    );

    console.log('Setting up listenAllContent listener...');
    const unsubscribe = onSnapshot(q, (snapshot) => {
      console.log(`listenAllContent: Received ${snapshot.docs.length} documents`);
      const content = snapshot.docs
        .map(doc => ({
          id: doc.id,
          ...doc.data(),
          createdAt: doc.data().createdAt?.toDate(),
          updatedAt: doc.data().updatedAt?.toDate(),
        }))
        .sort((a, b) => (b.createdAt || new Date()) - (a.createdAt || new Date()))
        .slice(0, limitCount);
      callback(content);
    }, (error) => {
      console.error('ListenAllContent Error Code:', error.code);
      console.error('ListenAllContent Error Message:', error.message);
      console.error('Full error:', error);
      callback([]);
    });

    return unsubscribe;
  } catch (error) {
    console.error('Listen all setup error:', error);
    return () => {};
  }
}

export function listenContentByType(type, callback, limitCount = 20) {
  try {
    const q = query(
      collection(db, 'content'),
      where('type', '==', type),
      where('status', '==', 'published')
    );

    console.log(`Setting up listenContentByType listener for type: ${type}`);
    const unsubscribe = onSnapshot(q, (snapshot) => {
      console.log(`listenContentByType(${type}): Received ${snapshot.docs.length} documents`);
      const content = snapshot.docs
        .map(doc => ({
          id: doc.id,
          ...doc.data(),
          createdAt: doc.data().createdAt?.toDate(),
          updatedAt: doc.data().updatedAt?.toDate(),
        }))
        .sort((a, b) => (b.createdAt || new Date()) - (a.createdAt || new Date()))
        .slice(0, limitCount);
      callback(content);
    }, (error) => {
      console.error(`ListenContentByType(${type}) Error Code:`, error.code);
      console.error(`ListenContentByType(${type}) Error Message:`, error.message);
      console.error('Full error:', error);
      callback([]);
    });

    return unsubscribe;
  } catch (error) {
    console.error(`Listen ${type} setup error:`, error);
    return () => {};
  }
}

export function listenUserContent(userId, callback, limitCount = 50) {
  try {
    const q = query(
      collection(db, 'content'),
      where('authorId', '==', userId)
    );

    console.log(`Setting up listenUserContent listener for userId: ${userId}`);
    const unsubscribe = onSnapshot(q, (snapshot) => {
      console.log(`listenUserContent(${userId}): Received ${snapshot.docs.length} documents`);
      const content = snapshot.docs
        .map(doc => ({
          id: doc.id,
          ...doc.data(),
          createdAt: doc.data().createdAt?.toDate(),
          updatedAt: doc.data().updatedAt?.toDate(),
        }))
        .sort((a, b) => (b.createdAt || new Date()) - (a.createdAt || new Date()))
        .slice(0, limitCount);
      callback(content);
    }, (error) => {
      console.error(`ListenUserContent(${userId}) Error Code:`, error.code);
      console.error(`ListenUserContent(${userId}) Error Message:`, error.message);
      console.error('Full error:', error);
      callback([]);
    });

    return unsubscribe;
  } catch (error) {
    console.error('Listen user content setup error:', error);
    return () => {};
  }
}

// Prayer Services
export function listenPrayers(callback, limitCount = 50) {
  try {
    const q = query(
      collection(db, 'prayers'),
      orderBy('createdAt', 'desc'),
      limit(limitCount)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const prayers = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate(),
      }));
      callback(prayers);
    }, (error) => {
      console.error('Listen prayers error:', error);
      callback([]);
    });

    return unsubscribe;
  } catch (error) {
    console.error('Listen prayers setup error:', error);
    return () => {};
  }
}

export async function addPrayer(prayerData) {
  try {
    const docRef = await addDoc(collection(db, 'prayers'), {
      authorId: prayerData.authorId,
      authorName: prayerData.authorName,
      request: prayerData.request,
      createdAt: Timestamp.now(),
      prayers: [], // List of user IDs who prayed for this request
    });
    return docRef.id;
  } catch (error) {
    console.error('Add prayer error:', error);
    throw error;
  }
}

export async function prayFor(prayerId, userId) {
  try {
    const docRef = doc(db, 'prayers', prayerId);
    const snapshot = await getDoc(docRef);
    if (snapshot.exists()) {
      const data = snapshot.data();
      const prayingUsers = data.prayers || [];
      if (!prayingUsers.includes(userId)) {
        await updateDoc(docRef, {
          prayers: [...prayingUsers, userId]
        });
      }
    }
  } catch (error) {
    console.error('Pray for error:', error);
    throw error;
  }
}

// Daily Messages Services
export function listenDailyMessages(callback) {
  try {
    const q = query(
      collection(db, 'daily_messages'),
      orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const messages = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate(),
      }));
      callback(messages);
    }, (error) => {
      console.error('Listen daily messages error:', error);
      callback([]);
    });

    return unsubscribe;
  } catch (error) {
    console.error('Listen daily messages setup error:', error);
    return () => {};
  }
}

export async function addDailyMessage(messageData) {
  try {
    const docRef = await addDoc(collection(db, 'daily_messages'), {
      title: messageData.title,
      message: messageData.message,
      author: messageData.author || 'Saint Esprit',
      category: messageData.category || 'Inspiration',
      createdAt: Timestamp.now(),
    });
    return docRef.id;
  } catch (error) {
    console.error('Add daily message error:', error);
    throw error;
  }
}

export async function deleteDailyMessage(messageId) {
  try {
    await deleteDoc(doc(db, 'daily_messages', messageId));
  } catch (error) {
    console.error('Delete daily message error:', error);
    throw error;
  }
}
