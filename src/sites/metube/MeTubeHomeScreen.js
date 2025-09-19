import React, { useEffect, useMemo, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, StatusBar, FlatList, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import VideoCard from '../../components/VideoCard';
import videosData from './videos';
import AddressBarSpacer from '../../components/AddressBarSpacer';
import { useAddressBar } from '../../context/AddressBarContext';

const categories = ['All', 'Music', 'Gaming', 'Education', 'Science', 'News', 'Sports', 'Tech', 'Cooking', 'Travel', 'Comedy', 'DIY', 'Art', 'Vlogs', 'ASMR', 'Pranks', 'Memes', 'Absurdist Humor', 'Brain Rot'];

const MeTubeHomeScreen = ({ navigation }) => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [filterText, setFilterText] = useState('');
  const { onScroll, setCurrentPageMeta } = useAddressBar();

  const filtered = useMemo(() => {
    const list = activeCategory === 'All' ? videosData : videosData.filter((v) => v.category === activeCategory);
    if (!filterText.trim()) return list;
    const q = filterText.toLowerCase();
    return list.filter((v) =>
      v.title.toLowerCase().includes(q) ||
      v.channel.toLowerCase().includes(q) ||
      (v.tags || []).some((t) => t.toLowerCase().includes(q))
    );
  }, [activeCategory, filterText]);

  const renderItem = ({ item }) => (
    <VideoCard
      video={item}
      onPress={() => navigation.navigate('MeTubeWatch', { id: item.id })}
    />
  );

  useEffect(() => {
    setCurrentPageMeta({ routeName: 'MeTubeHome', title: 'MeTube', params: {} });
  }, [setCurrentPageMeta]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <AddressBarSpacer />
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}> 
        <Text style={styles.logo}><Text style={{ color: '#e53935' }}>Me</Text>Tube</Text>
        <TouchableOpacity onPress={() => navigation.navigate('SearchResults', { query: 'metube' })} style={styles.headerButton}>
          <Text style={styles.headerButtonText}>Interverse</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.searchRow}>
        <TextInput
          value={filterText}
          onChangeText={setFilterText}
          placeholder="Search MeTube"
          placeholderTextColor="#999"
          style={styles.searchInput}
        />
      </View>
      <View style={styles.categoryRow}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} onScroll={onScroll} scrollEventThrottle={16}>
          {categories.map((c) => (
            <TouchableOpacity
              key={c}
              style={[styles.pill, activeCategory === c && styles.pillActive]}
              onPress={() => setActiveCategory(c)}
            >
              <Text style={[styles.pillText, activeCategory === c && styles.pillTextActive]}>{c}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        onScroll={onScroll}
        scrollEventThrottle={16}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#ffffff' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 6,
    paddingBottom: 10,
  },
  logo: { fontSize: 28, fontWeight: '900', color: '#111' },
  headerButton: {
    backgroundColor: '#111',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  headerButtonText: { color: '#fff', fontWeight: '700' },
  searchRow: { paddingHorizontal: 16, paddingBottom: 8 },
  searchInput: {
    height: 44,
    backgroundColor: '#f3f4f6',
    borderRadius: 12,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  categoryRow: { paddingVertical: 10, paddingHorizontal: 8 },
  pill: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: '#f3f4f6',
    marginHorizontal: 6,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  pillActive: { backgroundColor: '#111', borderColor: '#111' },
  pillText: { color: '#111', fontWeight: '600' },
  pillTextActive: { color: '#fff' },
  listContent: { paddingHorizontal: 16, paddingBottom: 24 },
});

export default MeTubeHomeScreen;


