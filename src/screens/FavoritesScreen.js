import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, FlatList, TouchableOpacity } from 'react-native';
import { useAddressBar } from '../context/AddressBarContext';

const FavoritesScreen = ({ navigation }) => {
  const { favorites, removeFavorite } = useAddressBar();

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}><Text style={styles.backText}>‹</Text></TouchableOpacity>
        <Text style={styles.title}>Favorites</Text>
        <View style={{ width: 32 }} />
      </View>

      <FlatList
        data={favorites}
        keyExtractor={(item) => item.key}
        contentContainerStyle={styles.content}
        ListEmptyComponent={() => (
          <View style={{ padding: 16 }}>
            <Text style={{ color: '#555' }}>No favorites yet. Long-press ★ to add the current page.</Text>
          </View>
        )}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <TouchableOpacity
              style={{ flex: 1 }}
              onPress={() => navigation.navigate(item.routeName, item.params)}
            >
              <Text style={styles.rowTitle}>{item.title || item.routeName}</Text>
              <Text style={styles.rowSub} numberOfLines={1}>{item.routeName}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => removeFavorite(item.key)} style={styles.removeBtn}>
              <Text style={styles.removeText}>Remove</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#fff' },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 12 },
  backBtn: { paddingHorizontal: 8, paddingVertical: 6 },
  backText: { fontSize: 28, fontWeight: '800', color: '#111' },
  title: { fontSize: 18, fontWeight: '800', color: '#111' },
  content: { paddingHorizontal: 12, paddingBottom: 24 },
  row: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#eee' },
  rowTitle: { fontWeight: '800', color: '#111', marginBottom: 4 },
  rowSub: { color: '#666' },
  removeBtn: { paddingHorizontal: 10, paddingVertical: 6, backgroundColor: '#f3f4f6', borderRadius: 8, borderWidth: 1, borderColor: '#e5e7eb' },
  removeText: { color: '#111', fontWeight: '700' },
});

export default FavoritesScreen;


