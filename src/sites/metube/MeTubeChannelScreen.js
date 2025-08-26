import React, { useMemo } from 'react';
import { View, Text, StyleSheet, SafeAreaView, FlatList } from 'react-native';
import { getVideosByChannel } from './videos';
import VideoCard from '../../components/VideoCard';

const MeTubeChannelScreen = ({ route, navigation }) => {
  const { channel } = route.params || {};
  const list = useMemo(() => (channel ? getVideosByChannel(channel) : []), [channel]);

  return (
    <SafeAreaView style={styles.safeArea}>
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


