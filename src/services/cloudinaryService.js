import axios from 'axios';
import { CLOUDINARY_CONFIG } from '../config/env';

const CLOUDINARY_URL = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CONFIG.CLOUD_NAME}/upload`;
const CLOUDINARY_PRESET = CLOUDINARY_CONFIG.UPLOAD_PRESET;

export async function uploadToCloudinary(file, resourceType = 'auto') {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', CLOUDINARY_PRESET);
  formData.append('resource_type', resourceType);

  try {
    const response = await axios.post(CLOUDINARY_URL, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
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
      duration: response.data.duration,
      thumbnailUrl: thumbnailUrl,
    };
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    throw new Error(`Upload failed: ${error.message}`);
  }
}

export async function deleteFromCloudinary(publicId) {
  try {
    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/${CLOUDINARY_CONFIG.CLOUD_NAME}/resources/video/destroy`,
      { public_id: publicId },
      {
        auth: {
          username: CLOUDINARY_CONFIG.API_KEY,
          password: CLOUDINARY_CONFIG.API_SECRET,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Cloudinary delete error:', error);
    throw error;
  }
}

export function getOptimizedUrl(url, options = {}) {
  if (!url) return null;
  
  const cloudinaryBase = `https://res.cloudinary.com/${CLOUDINARY_CONFIG.CLOUD_NAME}/image/upload/`;
  const transformations = [];
  
  if (options.width) transformations.push(`w_${options.width}`);
  if (options.height) transformations.push(`h_${options.height}`);
  if (options.crop) transformations.push(`c_${options.crop}`);
  if (options.quality) transformations.push(`q_${options.quality}`);
  
  const params = transformations.length > 0 ? transformations.join(',') + '/' : '';
  return url.replace(cloudinaryBase, cloudinaryBase + params);
}

export function getVideoThumbnail(videoUrl) {
  if (!videoUrl) return null;
  
  // Check if it's a Cloudinary video URL
  if (videoUrl.includes('cloudinary.com') && videoUrl.includes('/video/upload/')) {
    // Generate thumbnail from video: get first frame at 0 seconds
    return videoUrl
      .replace('/video/upload/', '/video/upload/so_0,w_640,h_360,c_fill,q_auto/')
      .replace(/\.(mp4|mov|avi|webm)$/i, '.jpg');
  }
  
  return null;
}
