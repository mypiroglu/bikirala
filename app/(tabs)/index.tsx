import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import React from 'react';
import { ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

import {
  categories,
  featuredListings,
  nearbyListings,
  proTips,
  stories,
} from '@/constants/data';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

import { styles } from './index.styles';

export default function HomeScreen() {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'light'];
  const [searchQuery, setSearchQuery] = React.useState('');
  const router = useRouter();

  const allListings = React.useMemo(() => {
    const listingMap = new Map([
      ...featuredListings.map((listing) => [listing.id, listing]),
      ...nearbyListings.map((listing) => [listing.id, listing]),
    ]);

    return Array.from(listingMap.values());
  }, []);

  const searchResults = React.useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return [];

    return allListings.filter((listing) => listing.title.toLowerCase().includes(query));
  }, [allListings, searchQuery]);

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.background }]}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.headerRow}>
          <View>
            <Text style={[styles.welcomeLabel, { color: theme.icon }]}>Bikirala&apos;ya hoş geldin</Text>
            <Text style={[styles.headline, { color: theme.text }]}>Yakınındaki fırsatları keşfet</Text>
          </View>
          <TouchableOpacity style={[styles.notificationButton, { borderColor: theme.tabIconDefault }]}>
            <MaterialCommunityIcons name="bell-badge" size={22} color={theme.tint} />
          </TouchableOpacity>
        </View>

        <View style={styles.searchCard}>
          <MaterialCommunityIcons name="map-marker" size={18} color={theme.tint} />
          <TextInput
            placeholder="Mahallende ne arıyorsun?"
            placeholderTextColor="#8b94a1"
            style={styles.searchInput}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          <TouchableOpacity style={styles.filterButton}>
            <MaterialCommunityIcons name="tune-variant" size={20} color={theme.background} />
          </TouchableOpacity>
        </View>

        {searchQuery.trim().length > 0 && (
          <>
            <View style={styles.sectionHeader}>
              <Text style={[styles.sectionTitle, { color: theme.text }]}>Arama Sonuçları</Text>
              <Text style={[styles.actionLink, { color: theme.tint }]}>{searchResults.length} sonuç</Text>
            </View>

            {searchResults.length === 0 ? (
              <View style={[styles.emptyStateCard, { backgroundColor: theme.background }]}>
                <MaterialCommunityIcons name="magnify" size={20} color={theme.tabIconDefault} />
                <Text style={[styles.emptyStateText, { color: theme.text }]}>Sonuç bulunamadı</Text>
                <Text style={[styles.emptyStateHint, { color: theme.tabIconDefault }]}>Aramanızı farklı anahtar kelimelerle deneyin.</Text>
              </View>
            ) : (
              <View style={styles.searchResultsGrid}>
                {searchResults.map((listing) => (
                  <View key={listing.id} style={styles.searchResultCard}>
                    <Image source={{ uri: listing.image }} style={styles.searchResultImage} contentFit="cover" />
                    <View style={styles.searchResultInfo}>
                      <Text style={styles.searchResultTitle} numberOfLines={2}>
                        {listing.title}
                      </Text>
                      <Text style={styles.searchResultPrice}>{listing.price}</Text>
                      <Text style={styles.searchResultMeta}>
                        {listing.location} · {listing.distance}
                      </Text>
                    </View>
                  </View>
                ))}
              </View>
            )}
          </>
        )}

        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.storyRow}>
          {stories.map((story) => (
            <TouchableOpacity
              key={story.id}
              style={styles.storyItem}
              activeOpacity={0.8}
              onPress={() => router.push({ pathname: '/story/[id]', params: { id: story.id } })}>
              <View style={[styles.storyAvatarWrapper, story.isLive && styles.storyLive]}>
                <Image source={{ uri: story.avatar }} style={styles.storyAvatar} />
              </View>
              <Text style={styles.storyLabel}>{story.seller}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>Kategoriler</Text>
          <TouchableOpacity>
            <Text style={[styles.actionLink, { color: theme.tint }]}>Tümünü gör</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.categoryGrid}>
          {categories.map((category) => (
            <TouchableOpacity key={category.id} style={[styles.categoryCard, { backgroundColor: category.color }]}>
              <MaterialCommunityIcons name={category.icon as any} size={28} color={theme.tint} />
              <Text style={styles.categoryLabel}>{category.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>Öne Çıkan İlanlar</Text>
          <TouchableOpacity>
            <Text style={[styles.actionLink, { color: theme.tint }]}>Hepsini keşfet</Text>
          </TouchableOpacity>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.featuredRow}>
          {featuredListings.map((listing) => (
            <View key={listing.id} style={styles.featuredCard}>
              <View style={styles.featuredImageWrapper}>
                <Image source={{ uri: listing.image }} style={styles.featuredImage} contentFit="cover" />
                {listing.badge && (
                  <View style={styles.badge}>
                    <Text style={styles.badgeText}>{listing.badge}</Text>
                  </View>
                )}
                {listing.isBoosted && (
                  <View style={styles.boostedFlag}>
                    <MaterialCommunityIcons name="lightning-bolt" size={16} color="#fff" />
                    <Text style={styles.boostedText}>Boosted</Text>
                  </View>
                )}
              </View>
              <View style={styles.featuredInfo}>
                <Text style={styles.featuredTitle}>{listing.title}</Text>
                <Text style={styles.featuredPrice}>{listing.price}</Text>
                <Text style={styles.featuredMeta}>
                  {listing.location} · {listing.distance}
                </Text>
              </View>
            </View>
          ))}
        </ScrollView>

        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>Yakınındakiler</Text>
          <TouchableOpacity>
            <Text style={[styles.actionLink, { color: theme.tint }]}>Haritada gör</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.nearbyGrid}>
          {nearbyListings.map((listing) => (
            <TouchableOpacity key={listing.id} style={styles.nearbyCard}>
              <Image source={{ uri: listing.image }} style={styles.nearbyImage} contentFit="cover" />
              <View style={styles.nearbyInfo}>
                <Text style={styles.nearbyTitle} numberOfLines={2}>
                  {listing.title}
                </Text>
                <Text style={styles.nearbyPrice}>{listing.price}</Text>
                <Text style={styles.nearbyMeta}>
                  {listing.location} · {listing.distance}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>Bikirala İpuçları</Text>
        </View>
        <View style={styles.tipGrid}>
          {proTips.map((tip) => (
            <View key={tip.id} style={styles.tipCard}>
              <View style={styles.tipIconWrapper}>
                <MaterialCommunityIcons name={tip.icon as any} size={20} color={theme.tint} />
              </View>
              <Text style={styles.tipTitle}>{tip.title}</Text>
              <Text style={styles.tipDescription}>{tip.description}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
