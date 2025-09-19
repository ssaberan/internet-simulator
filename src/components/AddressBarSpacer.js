import React, { useMemo } from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAddressBar } from '../context/AddressBarContext';

const COLLAPSED_HEIGHT = 8;

const AddressBarSpacer = () => {
  const { top } = useSafeAreaInsets();
  const { collapsed } = useAddressBar();
  const height = useMemo(() => (collapsed ? top + COLLAPSED_HEIGHT + 6 : top + 64), [collapsed, top]);
  return <View style={{ height }} />;
};

export default AddressBarSpacer;


