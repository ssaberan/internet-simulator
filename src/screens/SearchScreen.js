import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, StatusBar, ScrollView } from 'react-native';
import sites from '../sites';
import AddressBarSpacer from '../components/AddressBarSpacer';
import { useAddressBar } from '../context/AddressBarContext';

const SearchScreen = ({ navigation }) => {
  const [query, setQuery] = useState('');
  const { onScroll, setCurrentPageMeta } = useAddressBar();

  useEffect(() => {
    setCurrentPageMeta({ routeName: 'Search', title: 'Interverse', params: {} });
  }, [setCurrentPageMeta]);
  return (
    <SafeAreaView style={styles.safeArea}>
      <AddressBarSpacer />
      <StatusBar barStyle="dark-content" />
      <View style={styles.container}>
        <Text style={styles.title}>Interverse</Text>
        <TextInput
          style={styles.searchInput}
          placeholder="Search the offline web..."
          placeholderTextColor="#999"
          value={query}
          onChangeText={setQuery}
          onSubmitEditing={() => navigation.navigate('SearchResults', { query })}
        />
        <TouchableOpacity style={styles.searchButton} onPress={() => navigation.navigate('SearchResults', { query })}>
          <Text style={styles.searchButtonText}>Search</Text>
        </TouchableOpacity>

        <ScrollView
          style={styles.quickLinks}
          contentContainerStyle={styles.quickLinksContent}
          onScroll={onScroll}
          scrollEventThrottle={16}
        >
          <Text style={styles.quickTitle}>Popular sites</Text>
          {sites.map((site) => (
            <TouchableOpacity
              key={site.id}
              style={styles.siteLink}
              onPress={() => {
                if (site.id === 'metube') {
                  navigation.navigate('MeTubeHome');
                }
              }}
            >
              <Text style={styles.siteLinkText}>{site.name}</Text>
              <Text style={styles.siteLinkDomain}>{site.domain}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f0f2f5',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 40,
  },
  searchInput: {
    width: '100%',
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 25,
    paddingHorizontal: 20,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  searchButton: {
    backgroundColor: '#4a90e2',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  searchButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  quickLinks: {
    marginTop: 30,
    width: '100%',
  },
  quickLinksContent: {
    alignItems: 'stretch',
  },
  quickTitle: {
    fontSize: 16,
    fontWeight: '800',
    marginBottom: 12,
    color: '#333',
  },
  siteLink: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    marginBottom: 12,
  },
  siteLinkText: {
    fontSize: 16,
    fontWeight: '800',
    color: '#111',
  },
  siteLinkDomain: {
    color: '#666',
    marginTop: 4,
  },
});

export default SearchScreen;
