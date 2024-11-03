import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Upload } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import * as api from '../lib/api';
import PhotoGrid from '../components/PhotoGrid';
import UploadModal from '../components/UploadModal';

export default function Dashboard() {
  const [photos, setPhotos] = useState<Array<{ url: string; name: string }>>([]);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const auth = useAuth();

  useEffect(() => {
    if (auth?.token) {
      loadPhotos();
    }
  }, [auth?.token]);

  const loadPhotos = async () => {
    if (!auth?.token) return;
    try {
      const photos = await api.getPhotos(auth.token);
      setPhotos(photos);
    } catch (error) {
      console.error('Failed to load photos:', error);
    }
  };

  const handleDelete = async (photoName: string) => {
    if (!auth?.token) return;
    try {
      await api.deletePhoto(photoName, auth.token);
      await loadPhotos();
    } catch (error) {
      console.error('Failed to delete photo:', error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="container mx-auto px-4 py-8"
    >
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Your Photos</h1>
        <button
          onClick={() => setShowUploadModal(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors"
        >
          <Upload className="h-5 w-5" />
          <span>Upload Photos</span>
        </button>
      </div>

      <PhotoGrid photos={photos} onDelete={handleDelete} />
      
      {showUploadModal && (
        <UploadModal
          isOpen={showUploadModal}
          onClose={() => setShowUploadModal(false)}
          onUploadComplete={loadPhotos}
        />
      )}
    </motion.div>
  );
}