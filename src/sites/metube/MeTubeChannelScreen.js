import React, { useEffect, useMemo } from 'react';
import { View, Text, StyleSheet, SafeAreaView, FlatList } from 'react-native';
import { getVideosByChannel } from './videos';
import VideoCard from '../../components/VideoCard';
import AddressBarSpacer from '../../components/AddressBarSpacer';
import { useAddressBar } from '../../context/AddressBarContext';

const MeTubeChannelScreen = ({ route, navigation }) => {
  const { channel } = route.params || {};
  const list = useMemo(() => (channel ? getVideosByChannel(channel) : []), [channel]);
  const { onScroll, setCurrentPageMeta } = useAddressBar();

  useEffect(() => {
    setCurrentPageMeta({ routeName: 'MeTubeChannel', title: channel || 'Channel', params: { channel } });
  }, [setCurrentPageMeta, channel]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <AddressBarSpacer />
      <View style={styles.header}> 
        <Text style={styles.channelTitle}>{channel || 'Channel'}</Text>
      </View>
      <FlatList
        data={list}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <VideoCard
            video={item}
            onPress={() => navigation.navigate('MeTubeWatch', { id: item.id })}
          />
        )}
        contentContainerStyle={styles.content}
        onScroll={onScroll}
        scrollEventThrottle={16}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#fff' },
  header: { padding: 16 },
  channelTitle: { fontSize: 22, fontWeight: '800', color: '#111' },
  content: { paddingHorizontal: 16, paddingBottom: 24 },
});

export default MeTubeChannelScreen;


