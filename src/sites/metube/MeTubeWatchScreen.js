import React, { useMemo } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { getVideoById, videos as allVideos } from './videos';
import VideoCard from '../../components/VideoCard';

const MeTubeWatchScreen = ({ route, navigation }) => {
  const { id } = route.params || {};
  const video = useMemo(() => getVideoById(id), [id]);
  const recommendations = useMemo(() => allVideos.filter((v) => v.category === (video?.category || '') && v.id !== id).slice(0, 10), [id, video]);

  if (!video) {
    return (
      <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Video not found.</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={[styles.player, { backgroundColor: video.thumbnailColor }]}>
          <View style={styles.playButton}>
            <Text style={styles.playIcon}>▶</Text>
          </View>
        </View>

        <Text style={styles.title}>{video.title}</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 6 }}>
          <TouchableOpacity onPress={() => navigation.navigate('MeTubeChannel', { channel: video.channel })}>
            <Text style={[styles.subtle, { textDecorationLine: 'underline' }]}>{video.channel}</Text>
          </TouchableOpacity>
          <Text style={styles.subtle}> • {video.views} • {video.ago}</Text>
        </View>

        <View style={styles.actionsRow}>
          <TouchableOpacity style={styles.subscribeBtn}>
            <Text style={styles.subscribeText}>Subscribe</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionPill}><Text style={styles.actionText}>Like</Text></TouchableOpacity>
          <TouchableOpacity style={styles.actionPill}><Text style={styles.actionText}>Share</Text></TouchableOpacity>
        </View>

        <Text style={styles.description}>{video.description}</Text>

        <Text style={styles.sectionHeader}>Up next</Text>
        {recommendations.map((v) => (
          <VideoCard key={v.id} video={v} onPress={() => navigation.replace('MeTubeWatch', { id: v.id })} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#fff' },
  container: { padding: 16, paddingBottom: 32 },
  player: {
    width: '100%',
    aspectRatio: 16 / 9,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  playButton: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  playIcon: { color: '#fff', fontSize: 28, fontWeight: '900', marginLeft: 4 },
  title: { fontSize: 20, fontWeight: '800', color: '#111', marginTop: 4 },
  subtle: { color: '#666', marginTop: 6 },
  actionsRow: { flexDirection: 'row', alignItems: 'center', marginTop: 12 },
  subscribeBtn: { backgroundColor: '#e53935', paddingHorizontal: 14, paddingVertical: 8, borderRadius: 8, marginRight: 8 },
  subscribeText: { color: '#fff', fontWeight: '800' },
  actionPill: { backgroundColor: '#f3f4f6', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 8, marginRight: 8, borderWidth: 1, borderColor: '#e5e7eb' },
  actionText: { color: '#111', fontWeight: '700' },
  description: { marginTop: 12, color: '#333', lineHeight: 20 },
  sectionHeader: { marginTop: 20, marginBottom: 8, fontSize: 16, color: '#111', fontWeight: '800' },
});

export default MeTubeWatchScreen;


