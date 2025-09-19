import React, { useEffect, useMemo, useRef, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Animated, Easing } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAddressBar } from '../context/AddressBarContext';

const COLLAPSED_HEIGHT = 8; // show a thin grab area when collapsed

const AddressBar = () => {
  const { top } = useSafeAreaInsets();
  const {
    collapsed,
    search,
    goHome,
    openFavorites,
    isCurrentFavorite,
    toggleFavoriteForCurrent,
  } = useAddressBar();

  const [input, setInput] = useState('');

  // Smoothly animate between collapsed (0) and expanded (1)
  const anim = useRef(new Animated.Value(collapsed ? 0 : 1)).current;
  useEffect(() => {
    Animated.timing(anim, {
      toValue: collapsed ? 0 : 1,
      duration: 200,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: false,
    }).start();
  }, [collapsed, anim]);

  const expandedHeight = top + 64;
  const collapsedHeight = top + COLLAPSED_HEIGHT + 6;
  const height = anim.interpolate({ inputRange: [0, 1], outputRange: [collapsedHeight, expandedHeight] });
  const expandedOpacity = anim;
  const collapsedOpacity = anim.interpolate({ inputRange: [0, 1], outputRange: [1, 0] });

  const containerStyle = useMemo(() => {
    return [styles.container, { paddingTop: top + 6, height }];
  }, [top, height]);

  return (
    <Animated.View style={containerStyle}>
      <Animated.View style={[styles.collapsedBar, { opacity: collapsedOpacity }]} pointerEvents={collapsed ? 'auto' : 'none'}>
        <TouchableOpacity onPress={goHome} style={styles.iconBtn}>
          <Text style={styles.iconText}>⌂</Text>
        </TouchableOpacity>
        <View style={styles.grabber} />
        <TouchableOpacity onPress={openFavorites} onLongPress={toggleFavoriteForCurrent} style={styles.iconBtn}>
          <Text style={[styles.iconText, isCurrentFavorite && styles.favActive]}>★</Text>
        </TouchableOpacity>
      </Animated.View>

      <Animated.View style={[styles.barRow, { opacity: expandedOpacity }]} pointerEvents={collapsed ? 'none' : 'auto'}>
        <TouchableOpacity onPress={goHome} style={[styles.iconBtn, { marginRight: 8 }]}>
          <Text style={styles.iconText}>⌂</Text>
        </TouchableOpacity>
        <TextInput
          style={styles.input}
          value={input}
          onChangeText={setInput}
          placeholder="Search the Interverse..."
          placeholderTextColor="#999"
          returnKeyType="search"
          onSubmitEditing={() => search(input)}
        />
        <TouchableOpacity onPress={openFavorites} onLongPress={toggleFavoriteForCurrent} style={[styles.iconBtn, { marginLeft: 8 }]}>
          <Text style={[styles.iconText, isCurrentFavorite && styles.favActive]}>★</Text>
        </TouchableOpacity>
      </Animated.View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    backgroundColor: '#ffffffee',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    zIndex: 1000,
  },
  barRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
  },
  collapsedBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 14,
  },
  iconBtn: {
    paddingHorizontal: 8,
    paddingVertical: 8,
  },
  iconText: {
    fontSize: 20,
    fontWeight: '900',
    color: '#111',
  },
  favActive: {
    color: '#eab308',
  },
  input: {
    flex: 1,
    height: 40,
    backgroundColor: '#f3f4f6',
    borderRadius: 10,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    marginHorizontal: 10,
  },
  grabber: {
    flex: 1,
    marginHorizontal: 8,
    height: 3,
    backgroundColor: '#e5e7eb',
    borderRadius: 999,
  },
});

export default AddressBar;


