import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { Stack, useLocalSearchParams } from 'expo-router';
import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { categories, featuredListings } from '@/constants/data';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

import { styles } from './styles';

export default function CategoryDetailsScreen() {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'light'];
  const cardBackground = colorScheme === 'dark' ? '#121723' : '#fff';
  const params = useLocalSearchParams<{ id?: string }>();
  const category = categories.find((item) => item.id === params.id);

  const listings = React.useMemo(() => {
    return featuredListings;
  }, []);

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.background }]}>
      <Stack.Screen
        options={{
          title: category ? category.label : 'Kategori',
          headerStyle: { backgroundColor: theme.background },
          headerTintColor: theme.text,
          headerShadowVisible: false,
        }}
      />

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={[styles.heroCard, { backgroundColor: cardBackground }]}>
          <View style={[styles.heroIcon, { backgroundColor: theme.tint }]}>
            <MaterialCommunityIcons
              name={(category?.icon as any) ?? 'shape-outline'}
              size={26}
              color="#fff"
            />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={[styles.heroTitle, { color: theme.text }]}>
              {category ? `${category.label} ürünleri` : 'Kategori bulunamadı'}
            </Text>
            <Text style={[styles.heroSubtitle, { color: theme.tabIconDefault }]}>
              {category
                ? `${category.label} kategorisindeki en güncel ilanları keşfet.`
                : 'İstenilen kategoriye ait ilanlar bulunamadı.'}
            </Text>
          </View>
        </View>

        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>
            {category ? `${category.label} ilanları` : 'İlanlar'}
          </Text>
          <View style={styles.sectionBadge}>
            <MaterialCommunityIcons name="check-decagram" size={16} color={theme.tint} />
            <Text style={[styles.sectionBadgeText, { color: theme.tint }]}>Güncel</Text>
          </View>
        </View>

        <View style={styles.listingGrid}>
          {listings.map((listing) => (
            <View
              key={listing.id}
              style={[
                styles.listingCard,
                {
                  backgroundColor: cardBackground,
                  borderColor: colorScheme === 'dark' ? '#1f2a3b' : 'rgba(11, 31, 58, 0.08)',
                },
              ]}>
              <Image source={{ uri: listing.image }} style={styles.listingImage} contentFit="cover" />
              <View style={styles.listingInfo}>
                <Text style={[styles.listingTitle, { color: theme.text }]} numberOfLines={2}>
                  {listing.title}
                </Text>
                <Text style={[styles.listingPrice, { color: theme.tint }]}>{listing.price}</Text>
                <Text style={[styles.listingMeta, { color: theme.tabIconDefault }]}>
                  {listing.location} · {listing.distance}
                </Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
