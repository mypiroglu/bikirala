import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { Stack, useLocalSearchParams } from 'expo-router';
import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { featuredListings } from '@/constants/data';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

import { styles } from './styles';

export default function ListingDetailsScreen() {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'light'];
  const params = useLocalSearchParams<{ id?: string }>();
  const cardBackground = colorScheme === 'dark' ? '#0b1f3a' : '#fff';
  const placeholderBackground = colorScheme === 'dark' ? '#101826' : '#eef2f7';

  const listing = React.useMemo(() => {
    const allListings = new Map(featuredListings.map((item) => [item.id, item]));

    return params.id ? allListings.get(params.id) : undefined;
  }, [params.id]);

  const description =
    'Ürün detayları, teslimat bilgileri ve satıcıyla ilgili tüm bilgilere bu sayfadan ulaşabilirsin. Güvenli ödeme ile satın al, teslim alırken kontrol et.';

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.background }]}>
      <Stack.Screen
        options={{
          title: listing?.title ?? 'İlan',
          headerStyle: { backgroundColor: theme.background },
          headerTintColor: theme.text,
          headerShadowVisible: false,
        }}
      />

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={[styles.imageCard, { backgroundColor: cardBackground }]}>
          {listing ? (
            <Image source={{ uri: listing.image }} style={styles.image} contentFit="cover" />
          ) : (
            <View style={[styles.placeholder, { backgroundColor: placeholderBackground }]}>
              <MaterialCommunityIcons name="image-off" size={32} color={theme.tabIconDefault} />
              <Text style={[styles.placeholderText, { color: theme.text }]}>İlan bulunamadı</Text>
            </View>
          )}

          {listing?.badge && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{listing.badge}</Text>
            </View>
          )}
        </View>

        <View style={[styles.infoCard, { backgroundColor: cardBackground }]}>
          <View style={styles.titleRow}>
            <Text style={[styles.title, { color: theme.text }]} numberOfLines={2}>
              {listing?.title ?? 'İlan detayları'}
            </Text>
            {listing?.isBoosted && (
              <View style={styles.boostedFlag}>
                <MaterialCommunityIcons name="lightning-bolt" size={16} color="#fff" />
                <Text style={styles.boostedText}>Boosted</Text>
              </View>
            )}
          </View>
          <Text style={[styles.price, { color: theme.tint }]}>{listing?.price ?? '-'}</Text>
          <View style={styles.metaRow}>
            <MaterialCommunityIcons name="map-marker" size={18} color={theme.tabIconDefault} />
            <Text style={[styles.metaText, { color: theme.tabIconDefault }]}>
              {listing ? `${listing.location} · ${listing.distance}` : 'Konum bilgisi bulunamadı'}
            </Text>
          </View>
        </View>

        <View style={[styles.section, { backgroundColor: cardBackground }]}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>Açıklama</Text>
          <Text style={[styles.description, { color: theme.tabIconDefault }]}>{description}</Text>
        </View>

        <View style={[styles.section, { backgroundColor: cardBackground }]}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>İletişim & güvenlik</Text>
          <View style={styles.bulletRow}>
            <MaterialCommunityIcons name="shield-check" size={18} color={theme.tint} />
            <Text style={[styles.bulletText, { color: theme.tabIconDefault }]}>Güvenli ödeme koruması</Text>
          </View>
          <View style={styles.bulletRow}>
            <MaterialCommunityIcons name="chat-processing" size={18} color={theme.tint} />
            <Text style={[styles.bulletText, { color: theme.tabIconDefault }]}>Satıcıyla uygulama içi mesajlaşma</Text>
          </View>
        </View>

        <TouchableOpacity style={[styles.primaryButton, { backgroundColor: theme.tint }]}>
          <Text style={styles.primaryButtonLabel}>Hemen satın al</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.secondaryButton, { borderColor: theme.tabIconDefault }]}>
          <Text style={[styles.secondaryButtonLabel, { color: theme.text }]}>Favorilere ekle</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
