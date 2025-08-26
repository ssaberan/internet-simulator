import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const VideoCard = ({ video, onPress }) => {
  if (!video) return null;
  return (
    <TouchableOpacity onPress={onPress} style={styles.card} activeOpacity={0.8}>
      <View style={[styles.thumbnail, { backgroundColor: video.thumbnailColor }]}>
        <View style={styles.durationPill}>
          <Text style={styles.durationText}>{video.duration}</Text>
        </View>
      </View>
      <View style={styles.metaRow}>
        <View style={styles.metaTexts}>
          <Text style={styles.title} numberOfLines={2}>{video.title}</Text>
          <Text style={styles.subtle} numberOfLines={1}>{video.channel} • {video.views} • {video.ago}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '100%',
    marginBottom: 16,
  },
  thumbnail: {
    width: '100%',
    aspectRatio: 16 / 9,
    borderRadius: 12,
    overflow: 'hidden',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  durationPill: {
    backgroundColor: 'rgba(0,0,0,0.7)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    margin: 8,
  },
  durationText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  metaRow: {
    flexDirection: 'row',
    marginTop: 8,
  },
  metaTexts: {
    flex: 1,
  },
  title: {
    color: '#111',
    fontSize: 16,
    fontWeight: '700',
  },
  subtle: {
    color: '#666',
    marginTop: 4,
  },
});

export default VideoCard;


