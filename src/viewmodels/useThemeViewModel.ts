import { useState, useEffect } from 'react';

export type PageView = 'home' | 'shop' | 'track-order' | 'policy';

export function useThemeViewModel() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [activePage, setActivePage] = useState<PageView>('home');
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  const navigateTo = (page: PageView, searchParam?: string) => {
    setActivePage(page);
    if (searchParam !== undefined) {
      setSearchQuery(searchParam);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return {
    theme,
    toggleTheme,
    activePage,
    navigateTo,
    searchQuery,
    setSearchQuery
  };
}
