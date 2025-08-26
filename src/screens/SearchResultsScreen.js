import React, { useMemo, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, StatusBar, FlatList, TouchableOpacity, TextInput } from 'react-native';
import { searchInterverse } from '../search';
import VideoCard from '../components/VideoCard';

const ResultSiteCard = ({ result, onPress }) => (
  <TouchableOpacity onPress={onPress} style={styles.siteCard}>
    <View style={styles.siteIcon}><Text style={styles.siteIconText}>{(result.title || 'S')[0]}</Text></View>
    <View style={{ flex: 1 }}>
      <Text style={styles.siteTitle}>{result.title}</Text>
      <Text style={styles.siteSubtitle} numberOfLines={2}>{result.subtitle}</Text>
    </View>
  </TouchableOpacity>
);

const SearchResultsScreen = ({ route, navigation }) => {
  const initialQuery = route.params?.query || '';
  const [query, setQuery] = useState(initialQuery);

  const results = useMemo(() => searchInterverse(query), [query]);

  const renderItem = ({ item }) => {
    if (item.type === 'site') {
      return (
        <ResultSiteCard
          result={item}
          onPress={() => {
            if (item.siteId === 'metube') {
              navigation.navigate('MeTubeHome');
            }
          }}
        />
      );
    }
    if (item.type === 'video') {
      return (
        <VideoCard
          video={item.video}
          onPress={() => navigation.navigate('MeTubeWatch', { id: item.id })}
        />
      );
    }
    return null;
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}> 
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}><Text style={styles.backText}>‹</Text></TouchableOpacity>
        <TextInput
          style={styles.input}
          value={query}
          onChangeText={setQuery}
          placeholder="Search the Interverse..."
          placeholderTextColor="#999"
        />
        <TouchableOpacity onPress={() => setQuery(query)} style={styles.searchBtn}><Text style={styles.searchBtnText}>Search</Text></TouchableOpacity>
      </View>
      <FlatList
        data={results}
        keyExtractor={(_, idx) => String(idx)}
        renderItem={renderItem}
        contentContainerStyle={styles.content}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#fff' },
  header: { flexDirection: 'row', alignItems: 'center', padding: 12 },
  backBtn: { paddingHorizontal: 8, paddingVertical: 6, marginRight: 6 },
  backText: { fontSize: 28, fontWeight: '800', color: '#111' },
  input: { flex: 1, height: 42, backgroundColor: '#f3f4f6', borderRadius: 10, paddingHorizontal: 12, borderWidth: 1, borderColor: '#e5e7eb' },
  searchBtn: { marginLeft: 8, paddingHorizontal: 12, paddingVertical: 8, backgroundColor: '#111', borderRadius: 8 },
  searchBtnText: { color: '#fff', fontWeight: '700' },
  content: { paddingHorizontal: 12, paddingBottom: 24 },
  siteCard: { flexDirection: 'row', alignItems: 'center', padding: 12, borderRadius: 12, backgroundColor: '#f9fafb', borderWidth: 1, borderColor: '#e5e7eb', marginBottom: 12 },
  siteIcon: { width: 42, height: 42, borderRadius: 10, backgroundColor: '#e53935', alignItems: 'center', justifyContent: 'center', marginRight: 12 },
  siteIconText: { color: '#fff', fontWeight: '800', fontSize: 18 },
  siteTitle: { fontSize: 16, fontWeight: '800', color: '#111' },
  siteSubtitle: { color: '#555', marginTop: 4 },
});

export default SearchResultsScreen;


