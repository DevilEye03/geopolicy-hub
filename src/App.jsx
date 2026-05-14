import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MainLayout } from './components/layout/MainLayout';
import { Home } from './pages/Home';
import { Write } from './pages/Write';
import { Dashboard } from './pages/Dashboard';
import { ArticleView } from './pages/ArticleView';
import { Categories } from './pages/Categories';
import { Bookmarks } from './pages/Bookmarks';
import { Profile } from './pages/Profile';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="write" element={<Write />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="article/:id" element={<ArticleView />} />
          <Route path="categories" element={<Categories />} />
          <Route path="bookmarks" element={<Bookmarks />} />
          <Route path="profile" element={<Profile />} />
          <Route path="*" element={<div style={{ textAlign: 'center', padding: '100px 0' }}><h2>404 - Page Not Found</h2></div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
