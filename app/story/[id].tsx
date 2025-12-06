import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { Image } from 'expo-image';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { stories } from '@/constants/data';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

import { styles } from './story.styles';

export default function StoryScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id?: string }>();
  const story = React.useMemo(() => stories.find((item) => item.id === id), [id]);

  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'light'];

  React.useEffect(() => {
    if (!story) {
      router.replace('/');
    }
  }, [router, story]);

  if (!story) {
    return null;
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <Stack.Screen options={{ headerShown: false, animation: 'fade' }} />

      <Image
        source={{ uri: story.avatar }}
        style={styles.backgroundImage}
        contentFit="cover"
        blurRadius={18}
      />
      <View style={styles.overlay} />

      <View style={styles.header}>
        <TouchableOpacity
          style={styles.iconButton}
          accessibilityLabel="Önceki ekrana dön"
          onPress={() => router.back()}>
          <MaterialCommunityIcons name="chevron-left" size={26} color="#fff" />
        </TouchableOpacity>

        {story.isLive && (
          <View style={styles.livePill}>
            <View style={styles.liveDot} />
            <Text style={styles.liveText}>CANLI</Text>
          </View>
        )}
      </View>

      <View style={styles.content}>
        <Image source={{ uri: story.avatar }} style={styles.avatarLarge} contentFit="cover" />

        <Text style={styles.sellerName}>{story.seller}</Text>
        <Text style={styles.caption}>En yeni hikayelerini izlemek için dokun.</Text>

        <View style={styles.actions}>
          <TouchableOpacity style={styles.iconButton} onPress={() => router.back()}>
            <MaterialCommunityIcons name="close" size={22} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity style={[styles.ctaButton, { backgroundColor: theme.tint }]}>
            <MaterialCommunityIcons name="chat-processing" size={18} color="#fff" />
            <Text style={styles.ctaLabel}>Mesaj gönder</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
