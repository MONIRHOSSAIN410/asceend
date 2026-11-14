import React, { useState } from 'react';
import { 
  Play, 
  Calendar, 
  Clock, 
  ArrowRight, 
  X, 
  Image as ImageIcon, 
  Video as VideoIcon, 
  Newspaper 
} from 'lucide-react';
import { PageView } from '../types';
import { NEWS_ITEMS, GALLERY_PHOTOS, GALLERY_VIDEOS } from '../data/mockData';

interface MediaViewProps {
  initialTab?: 'news' | 'photos' | 'videos';
  onNavigate: (view: PageView) => void;
  onRequestCall: () => void;
}

export const MediaView: React.FC<MediaViewProps> = ({
  initialTab = 'news',
  onNavigate,
  onRequestCall
}) => {
  const [activeTab, setActiveTab] = useState<'news' | 'photos' | 'videos'>(initialTab);
  const [photoCategory, setPhotoCategory] = useState<string>('All');
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<{ title: string; videoUrl: string } | null>(null);

  const categories = ['All', 'Projects', 'Hospitality', 'Corporate', 'Technology', 'Education'];

  const filteredPhotos = GALLERY_PHOTOS.filter((p) => {
    if (photoCategory === 'All') return true;
    return p.category === photoCategory;
  });

  return (
    <div className="pb-16 space-y-12">
      
      {/* 1. Header Hero Banner */}
      <section className="relative py-20 bg-neutral-900 text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?auto=format&fit=crop&w=1600&q=80"
            alt="Media Center"
            className="w-full h-full object-cover opacity-25"
          />
          <div className="absolute inset-0 bg-linear-to-t from-neutral-950 via-neutral-900/80 to-transparent" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center space-y-3">
         
          <h1 className="text-3xl sm:text-5xl font-extrabold font-heading text-white capitalize">
            {activeTab === 'news' ? 'News & Events' : activeTab === 'photos' ? 'Photo Gallery' : 'Video Gallery'}
          </h1>
          <p className="text-sm sm:text-base text-white font-light">
            Latest press releases, visual milestones, and corporate progress documentaries
          </p>
        </div>
      </section>

      {/* 2. Media Tabs */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-center gap-2 p-1.5 bg-neutral-100 dark:bg-neutral-800 rounded-2xl border border-neutral-200 dark:border-neutral-700">
          <button
            onClick={() => setActiveTab('news')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'news'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'text-neutral-600 dark:text-neutral-300 hover:text-emerald-600'
            }`}
          >
            <Newspaper className="w-4 h-4" />
            <span>News & Events</span>
          </button>

          <button
            onClick={() => setActiveTab('photos')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'photos'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'text-neutral-600 dark:text-neutral-300 hover:text-emerald-600'
            }`}
          >
            <ImageIcon className="w-4 h-4" />
            <span>Photo Gallery</span>
          </button>

          <button
            onClick={() => setActiveTab('videos')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'videos'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'text-neutral-600 dark:text-neutral-300 hover:text-emerald-600'
            }`}
          >
            <VideoIcon className="w-4 h-4" />
            <span>Video Gallery</span>
          </button>
        </div>
      </div>

      {/* 3. TAB CONTENT */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* NEWS & EVENTS TAB */}
        {activeTab === 'news' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {NEWS_ITEMS.map((item) => (
              <article
                key={item.id}
                className="bg-white dark:bg-neutral-900 rounded-3xl overflow-hidden border border-neutral-200 dark:border-neutral-800 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 bg-emerald-700 text-white text-[10px] font-bold px-2.5 py-1 rounded-md">
                      {item.category}
                    </div>
                  </div>

                  <div className="p-6 space-y-3">
                    <div className="flex items-center gap-3 text-[11px] text-neutral-400">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{item.date}</span>
                      </span>
                      <span>·</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{item.readTime}</span>
                      </span>
                    </div>

                    <h3 className="text-base font-bold font-heading text-neutral-900 dark:text-white leading-snug">
                      {item.title}
                    </h3>

                    <p className="text-xs text-neutral-600 dark:text-neutral-400 line-clamp-3 leading-relaxed">
                      {item.summary}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <button
                    onClick={onRequestCall}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:text-emerald-700"
                  >
                    <span>Read Press Coverage</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* PHOTO GALLERY TAB */}
        {activeTab === 'photos' && (
          <div className="space-y-8">
            {/* Filter buttons */}
            <div className="flex flex-wrap items-center justify-center gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setPhotoCategory(cat)}
                  className={`px-4 py-1.5 rounded-full text-xs font-medium transition-colors ${
                    photoCategory === cat
                      ? 'bg-emerald-600 text-white'
                      : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Photo Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredPhotos.map((photo, idx) => (
                <div
                  key={idx}
                  onClick={() => setSelectedPhoto(photo.url)}
                  className="group relative rounded-2xl overflow-hidden aspect-4/3 cursor-pointer shadow-sm border border-neutral-200 dark:border-neutral-800"
                >
                  <img
                    src={photo.url}
                    alt={photo.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4 text-white">
                    <span className="text-[10px] text-emerald-300 font-bold uppercase">
                      {photo.category}
                    </span>
                    <span className="text-xs font-bold line-clamp-1">{photo.title}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* VIDEO GALLERY TAB */}
        {activeTab === 'videos' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {GALLERY_VIDEOS.map((vid, idx) => (
              <div
                key={idx}
                onClick={() => setSelectedVideo({ title: vid.title, videoUrl: vid.videoUrl })}
                className="bg-white dark:bg-neutral-900 rounded-3xl overflow-hidden border border-neutral-200 dark:border-neutral-800 shadow-sm hover:shadow-xl transition-all cursor-pointer group"
              >
                <div className="relative h-48 overflow-hidden bg-neutral-950">
                  <img
                    src={vid.thumbnail}
                    alt={vid.title}
                    className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-14 h-14 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <Play className="w-6 h-6 fill-white ml-0.5" />
                    </div>
                  </div>
                  <div className="absolute bottom-3 right-3 bg-black/75 text-white text-[10px] font-mono font-bold px-2 py-0.5 rounded">
                    {vid.duration}
                  </div>
                </div>

                <div className="p-5">
                  <h3 className="text-sm font-bold font-heading text-neutral-900 dark:text-white line-clamp-2 leading-snug group-hover:text-emerald-600 transition-colors">
                    {vid.title}
                  </h3>
                  <div className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold mt-2 flex items-center gap-1">
                    <span>Watch Full Video</span>
                    <ArrowRight className="w-3 h-3" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>

      {/* Lightbox Photo Modal */}
      {selectedPhoto && (
        <div
          onClick={() => setSelectedPhoto(null)}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in"
        >
          <button
            onClick={() => setSelectedPhoto(null)}
            className="absolute top-6 right-6 text-white p-2 rounded-full bg-white/10 hover:bg-white/20"
          >
            <X className="w-6 h-6" />
          </button>
          <img
            src={selectedPhoto}
            alt="Enlarged view"
            className="max-w-5xl max-h-[85vh] rounded-2xl object-contain shadow-2xl border border-white/10"
          />
        </div>
      )}

      {/* Video Player Modal */}
      {selectedVideo && (
        <div
          onClick={() => setSelectedVideo(null)}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-neutral-900 w-full max-w-3xl rounded-3xl overflow-hidden border border-neutral-800 shadow-2xl"
          >
            <div className="px-6 py-4 flex items-center justify-between border-b border-neutral-800 text-white">
              <h4 className="text-sm font-bold truncate pr-4">{selectedVideo.title}</h4>
              <button
                onClick={() => setSelectedVideo(null)}
                className="text-neutral-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="relative aspect-video bg-black">
              <video
                src={selectedVideo.videoUrl}
                controls
                autoPlay
                className="w-full h-full"
              />
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
