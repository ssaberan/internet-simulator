import React, { createContext, useCallback, useContext, useMemo, useRef, useState } from 'react';
import { Platform } from 'react-native';
import { navigationRef, navigate, resetTo, getCurrentRoute } from '../navigation/navigationRef';

const AddressBarContext = createContext(null);

function createPageKey(routeName, params) {
  try {
    if (!params || Object.keys(params).length === 0) return routeName;
    // Keep keys stable and short
    const compact = JSON.stringify(params, Object.keys(params).sort());
    return `${routeName}::${compact}`;
  } catch (_) {
    return routeName;
  }
}

export const AddressBarProvider = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [currentPage, setCurrentPage] = useState({ routeName: 'Search', params: {}, title: 'Interverse', key: 'Search' });

  const lastYRef = useRef(0);
  const lastDirRef = useRef('up');

  const setCurrentPageMeta = useCallback((meta) => {
    const routeName = meta?.routeName || getCurrentRoute()?.name || 'Search';
    const params = meta?.params || {};
    const title = meta?.title || routeName;
    const key = meta?.key || createPageKey(routeName, params);
    setCurrentPage({ routeName, params, title, key });
  }, []);

  const isCurrentFavorite = useMemo(() => {
    return favorites.some((f) => f.key === currentPage.key);
  }, [favorites, currentPage]);

  const toggleFavoriteForCurrent = useCallback(() => {
    setFavorites((prev) => {
      const exists = prev.find((f) => f.key === currentPage.key);
      if (exists) return prev.filter((f) => f.key !== currentPage.key);
      return [
        {
          key: currentPage.key,
          title: currentPage.title || currentPage.routeName,
          routeName: currentPage.routeName,
          params: currentPage.params || {},
          addedAt: Date.now(),
        },
        ...prev,
      ];
    });
  }, [currentPage]);

  const removeFavorite = useCallback((key) => {
    setFavorites((prev) => prev.filter((f) => f.key !== key));
  }, []);

  const search = useCallback((queryRaw) => {
    const query = String(queryRaw || '').trim();
    if (!query) return;
    navigate('SearchResults', { query });
  }, []);

  const goHome = useCallback(() => {
    resetTo('Search');
  }, []);

  const openFavorites = useCallback(() => {
    navigate('Favorites');
  }, []);

  const onScroll = useCallback((eventOrY) => {
    const y = typeof eventOrY === 'number' ? eventOrY : eventOrY?.nativeEvent?.contentOffset?.y || 0;
    const prevY = lastYRef.current;
    const dy = y - prevY;
    lastYRef.current = y;

    // Ignore tiny jitters
    if (Math.abs(dy) < 4) return;

    // Only react after small thresholds to reduce flicker
    if (dy > 8 && lastDirRef.current !== 'down') {
      lastDirRef.current = 'down';
      setCollapsed(true);
    } else if (dy < -8 && lastDirRef.current !== 'up') {
      lastDirRef.current = 'up';
      setCollapsed(false);
    }
  }, []);

  const value = useMemo(
    () => ({
      collapsed,
      setCollapsed,
      onScroll,
      search,
      goHome,
      openFavorites,
      favorites,
      isCurrentFavorite,
      toggleFavoriteForCurrent,
      removeFavorite,
      currentPage,
      setCurrentPageMeta,
    }),
    [collapsed, onScroll, search, goHome, openFavorites, favorites, isCurrentFavorite, toggleFavoriteForCurrent, removeFavorite, currentPage, setCurrentPageMeta]
  );

  return <AddressBarContext.Provider value={value}>{children}</AddressBarContext.Provider>;
};

export function useAddressBar() {
  const ctx = useContext(AddressBarContext);
  if (!ctx) throw new Error('useAddressBar must be used within AddressBarProvider');
  return ctx;
}


