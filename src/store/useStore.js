import { create } from 'zustand';

export const useStore = create((set) => ({
  theme: 'dark',
  toggleTheme: () => set((state) => ({ theme: state.theme === 'dark' ? 'light' : 'dark' })),
  
  bookmarks: [],
  addBookmark: (articleId) => set((state) => ({ bookmarks: [...state.bookmarks, articleId] })),
  removeBookmark: (articleId) => set((state) => ({ 
    bookmarks: state.bookmarks.filter(id => id !== articleId) 
  })),

  user: {
    name: 'Admin User',
    avatar: 'GP'
  }
}));
