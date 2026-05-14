import React, { useState, useRef, useCallback } from 'react';
import { Bold, Italic, Underline, List, ListOrdered, Quote, Link2, Image, Type, Heading1, Heading2, Heading3, Send, Save, Eye, EyeOff, Tag } from 'lucide-react';

function ToolbarButton({ icon: Icon, label, active, onClick }) {
  return (
    <button
      type="button"
      className={`editor-toolbar-btn ${active ? 'active' : ''}`}
      onClick={onClick}
      title={label}
    >
      <Icon size={18} />
    </button>
  );
}

export function Write() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('Geopolitics');
  const [tags, setTags] = useState('');
  const [coverImage, setCoverImage] = useState('');
  const [isPreview, setIsPreview] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const editorRef = useRef(null);

  const execCommand = useCallback((command, value = null) => {
    document.execCommand(command, false, value);
    editorRef.current?.focus();
  }, []);

  const handleInsertLink = () => {
    const url = prompt('Enter URL:');
    if (url) execCommand('createLink', url);
  };

  const handleInsertImage = () => {
    const url = prompt('Enter image URL:');
    if (url) execCommand('insertImage', url);
  };

  const handleSaveDraft = () => {
    const articleData = {
      title,
      content: editorRef.current?.innerHTML || '',
      category,
      tags: tags.split(',').map(t => t.trim()).filter(Boolean),
      coverImage,
      savedAt: new Date().toISOString(),
      status: 'draft'
    };
    localStorage.setItem('geopolicy-draft', JSON.stringify(articleData));
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  const handlePublish = () => {
    const articleData = {
      id: Date.now().toString(),
      title,
      content: editorRef.current?.innerHTML || '',
      excerpt: editorRef.current?.innerText?.substring(0, 200) || '',
      category,
      tags: tags.split(',').map(t => t.trim()).filter(Boolean),
      coverImage: coverImage || 'https://images.unsplash.com/photo-1526450616598-f51cb1c26b86?auto=format&fit=crop&q=80',
      author: 'Admin User',
      authorInitials: 'GP',
      readTime: Math.max(1, Math.ceil((editorRef.current?.innerText?.split(' ').length || 0) / 200)),
      publishedAt: new Date().toISOString(),
      status: 'published'
    };

    // Save to localStorage articles list
    const existing = JSON.parse(localStorage.getItem('geopolicy-articles') || '[]');
    existing.unshift(articleData);
    localStorage.setItem('geopolicy-articles', JSON.stringify(existing));
    
    // Clear draft
    localStorage.removeItem('geopolicy-draft');
    
    alert('🎉 Article published successfully!');
    setTitle('');
    setContent('');
    setTags('');
    setCoverImage('');
    if (editorRef.current) editorRef.current.innerHTML = '';
  };

  // Load draft on mount
  React.useEffect(() => {
    const draft = localStorage.getItem('geopolicy-draft');
    if (draft) {
      try {
        const data = JSON.parse(draft);
        setTitle(data.title || '');
        setCategory(data.category || 'Geopolitics');
        setTags(data.tags?.join(', ') || '');
        setCoverImage(data.coverImage || '');
        if (editorRef.current && data.content) {
          editorRef.current.innerHTML = data.content;
        }
      } catch {}
    }
  }, []);

  return (
    <div className="write-page">
      {/* Header bar */}
      <div className="write-header">
        <h1 style={{ marginBottom: 0, fontSize: 'var(--text-2xl)' }}>
          ✍️ Draft New Article
        </h1>
        <div style={{ display: 'flex', gap: 'var(--space-sm)', alignItems: 'center' }}>
          <button className="btn btn-ghost" onClick={() => setIsPreview(!isPreview)} title={isPreview ? 'Edit' : 'Preview'}>
            {isPreview ? <EyeOff size={18} /> : <Eye size={18} />}
            <span>{isPreview ? 'Edit' : 'Preview'}</span>
          </button>
          <button className="btn btn-ghost" onClick={handleSaveDraft}>
            <Save size={18} />
            <span>{isSaved ? 'Saved ✓' : 'Save Draft'}</span>
          </button>
          <button className="btn btn-primary" onClick={handlePublish}>
            <Send size={18} />
            <span>Publish</span>
          </button>
        </div>
      </div>

      {/* Meta fields */}
      <div className="write-meta">
        <input 
          type="text" 
          placeholder="Article Title..." 
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="write-title-input"
        />

        <div style={{ display: 'flex', gap: 'var(--space-md)', flexWrap: 'wrap' }}>
          <select 
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="write-select"
          >
            <option value="Geopolitics">🌍 Geopolitics</option>
            <option value="International Relations">🤝 International Relations</option>
            <option value="Laws & Legislation">⚖️ Laws & Legislation</option>
            <option value="Policies">📋 Policies</option>
            <option value="Diplomacy">🕊️ Diplomacy</option>
            <option value="Defense & Security">🛡️ Defense & Security</option>
            <option value="Global Economy">💹 Global Economy</option>
            <option value="Science & Tech">💻 Science & Tech</option>
            <option value="Health">🏥 Health</option>
            <option value="Energy & Climate">⚡ Energy & Climate</option>
          </select>

          <div style={{ flex: 1, minWidth: '200px', display: 'flex', alignItems: 'center', gap: 'var(--space-xs)' }}>
            <Tag size={16} style={{ color: 'var(--text-tertiary)' }} />
            <input 
              type="text" 
              placeholder="Tags (comma-separated)..." 
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              className="write-tag-input"
            />
          </div>
        </div>

        <input 
          type="text" 
          placeholder="Cover image URL (optional)..." 
          value={coverImage}
          onChange={(e) => setCoverImage(e.target.value)}
          className="write-cover-input"
        />
      </div>

      {/* Editor */}
      {isPreview ? (
        <div className="write-preview">
          <h1 style={{ fontFamily: 'var(--font-serif)', marginBottom: 'var(--space-lg)' }}>{title || 'Untitled Article'}</h1>
          {coverImage && <img src={coverImage} alt="Cover" style={{ width: '100%', maxHeight: '400px', objectFit: 'cover', borderRadius: 'var(--radius-md)', marginBottom: 'var(--space-lg)' }} />}
          <div 
            className="article-body"
            dangerouslySetInnerHTML={{ __html: editorRef.current?.innerHTML || '<p>Nothing written yet...</p>' }} 
          />
        </div>
      ) : (
        <div className="write-editor-container">
          {/* Toolbar */}
          <div className="editor-toolbar">
            <div className="toolbar-group">
              <ToolbarButton icon={Heading1} label="Heading 1" onClick={() => execCommand('formatBlock', 'H1')} />
              <ToolbarButton icon={Heading2} label="Heading 2" onClick={() => execCommand('formatBlock', 'H2')} />
              <ToolbarButton icon={Heading3} label="Heading 3" onClick={() => execCommand('formatBlock', 'H3')} />
              <ToolbarButton icon={Type} label="Paragraph" onClick={() => execCommand('formatBlock', 'P')} />
            </div>
            <div className="toolbar-divider" />
            <div className="toolbar-group">
              <ToolbarButton icon={Bold} label="Bold" onClick={() => execCommand('bold')} />
              <ToolbarButton icon={Italic} label="Italic" onClick={() => execCommand('italic')} />
              <ToolbarButton icon={Underline} label="Underline" onClick={() => execCommand('underline')} />
            </div>
            <div className="toolbar-divider" />
            <div className="toolbar-group">
              <ToolbarButton icon={List} label="Bullet List" onClick={() => execCommand('insertUnorderedList')} />
              <ToolbarButton icon={ListOrdered} label="Numbered List" onClick={() => execCommand('insertOrderedList')} />
              <ToolbarButton icon={Quote} label="Blockquote" onClick={() => execCommand('formatBlock', 'BLOCKQUOTE')} />
            </div>
            <div className="toolbar-divider" />
            <div className="toolbar-group">
              <ToolbarButton icon={Link2} label="Insert Link" onClick={handleInsertLink} />
              <ToolbarButton icon={Image} label="Insert Image" onClick={handleInsertImage} />
            </div>
          </div>

          {/* Content editable area */}
          <div 
            ref={editorRef}
            className="editor-content"
            contentEditable
            suppressContentEditableWarning
            data-placeholder="Write your brilliant analysis here..."
            onInput={(e) => setContent(e.currentTarget.innerHTML)}
          />
        </div>
      )}
    </div>
  );
}
