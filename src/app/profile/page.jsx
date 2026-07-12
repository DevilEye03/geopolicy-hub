"use client";
import React, { useState } from 'react';
import { User, Mail, Globe, MapPin, FileText, Save, ExternalLink, MessageCircle } from 'lucide-react';
import { useStore } from '../../store/useStore';

export default function Profile() {
  const { user } = useStore();
  
  const [profile, setProfile] = useState(() => {
    const saved = (typeof window !== 'undefined' ? localStorage.getItem('geopolicy-profile') : null);
    return saved ? JSON.parse(saved) : {
      name: user.name || 'Admin User',
      bio: 'Geopolitics analyst and policy researcher.',
      email: '',
      location: '',
      website: '',
      whatsapp: '',
      twitter: '',
      linkedin: '',
      instagram: '',
      youtube: '',
      telegram: '',
      facebook: '',
    };
  });

  const [saved, setSaved] = useState(false);

  const handleChange = (field, value) => {
    setProfile(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    (typeof window !== 'undefined' && localStorage.setItem('geopolicy-profile', JSON.stringify(profile)));
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const articles = JSON.parse((typeof window !== 'undefined' ? localStorage.getItem('geopolicy-articles') : null) || '[]');
  const subscribers = JSON.parse((typeof window !== 'undefined' ? localStorage.getItem('geopolicy-subscribers') : null) || '[]');
  
  const allViews = JSON.parse((typeof window !== 'undefined' ? localStorage.getItem('geopolicy-article-views') : null) || '{}');
  const loggedViewsSum = Object.values(allViews).reduce((a, b) => Number(a) + Number(b), 0);

  return (
    <div className="profile-page">
      <div className="profile-header">
        <div className="profile-avatar-large">
          {profile.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()}
        </div>
        <div className="profile-header-info">
          <h1 style={{ marginBottom: 'var(--space-xs)' }}>{profile.name}</h1>
          <p style={{ color: 'var(--text-secondary)', marginBottom: 'var(--space-sm)' }}>{profile.bio}</p>
          <div className="profile-stats">
            <div className="profile-stat">
              <span className="stat-number">{articles.length}</span>
              <span className="stat-label">Articles</span>
            </div>
            <div className="profile-stat">
              <span className="stat-number">{subscribers.length.toLocaleString()}</span>
              <span className="stat-label">Subscribers</span>
            </div>
            <div className="profile-stat">
              <span className="stat-number">{loggedViewsSum.toLocaleString()}</span>
              <span className="stat-label">Total Views</span>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Profile Form */}
      <div className="profile-section">
        <h2 style={{ marginBottom: 'var(--space-lg)', display: 'flex', alignItems: 'center', gap: 'var(--space-sm)' }}>
          <User size={24} /> Personal Information
        </h2>
        
        <div className="form-grid">
          <div className="form-group">
            <label><User size={16} /> Display Name</label>
            <input type="text" value={profile.name} onChange={(e) => handleChange('name', e.target.value)} placeholder="Your name" />
          </div>
          <div className="form-group">
            <label><Mail size={16} /> Email</label>
            <input type="email" value={profile.email} onChange={(e) => handleChange('email', e.target.value)} placeholder="your@email.com" />
          </div>
          <div className="form-group">
            <label><MapPin size={16} /> Location</label>
            <input type="text" value={profile.location} onChange={(e) => handleChange('location', e.target.value)} placeholder="City, Country" />
          </div>
          <div className="form-group">
            <label><Globe size={16} /> Website</label>
            <input type="url" value={profile.website} onChange={(e) => handleChange('website', e.target.value)} placeholder="https://your-website.com" />
          </div>
          <div className="form-group full-width">
            <label><FileText size={16} /> Bio</label>
            <textarea value={profile.bio} onChange={(e) => handleChange('bio', e.target.value)} placeholder="Tell readers about yourself..." rows={3} />
          </div>
        </div>
      </div>

      {/* Social Media & Contact Links */}
      <div className="profile-section">
        <h2 style={{ marginBottom: 'var(--space-lg)', display: 'flex', alignItems: 'center', gap: 'var(--space-sm)' }}>
          <ExternalLink size={24} /> Social Media & Contact Links
        </h2>
        
        <div className="form-grid">
          <div className="form-group">
            <label><MessageCircle size={16} /> WhatsApp</label>
            <input type="tel" value={profile.whatsapp} onChange={(e) => handleChange('whatsapp', e.target.value)} placeholder="+91 XXXXXXXXXX" />
          </div>
          <div className="form-group">
            <label>𝕏 Twitter / X</label>
            <input type="text" value={profile.twitter} onChange={(e) => handleChange('twitter', e.target.value)} placeholder="https://twitter.com/username" />
          </div>
          <div className="form-group">
            <label>🔗 LinkedIn</label>
            <input type="text" value={profile.linkedin} onChange={(e) => handleChange('linkedin', e.target.value)} placeholder="https://linkedin.com/in/username" />
          </div>
          <div className="form-group">
            <label>📸 Instagram</label>
            <input type="text" value={profile.instagram} onChange={(e) => handleChange('instagram', e.target.value)} placeholder="https://instagram.com/username" />
          </div>
          <div className="form-group">
            <label>📺 YouTube</label>
            <input type="text" value={profile.youtube} onChange={(e) => handleChange('youtube', e.target.value)} placeholder="https://youtube.com/@channel" />
          </div>
          <div className="form-group">
            <label>✈️ Telegram</label>
            <input type="text" value={profile.telegram} onChange={(e) => handleChange('telegram', e.target.value)} placeholder="https://t.me/username" />
          </div>
          <div className="form-group">
            <label>📘 Facebook</label>
            <input type="text" value={profile.facebook} onChange={(e) => handleChange('facebook', e.target.value)} placeholder="https://facebook.com/username" />
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: 'var(--space-md)' }}>
        <button className="btn btn-primary" onClick={handleSave} style={{ padding: 'var(--space-md) var(--space-2xl)' }}>
          <Save size={18} />
          {saved ? '✓ Saved!' : 'Save Profile'}
        </button>
      </div>
    </div>
  );
}
