import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import {
  categories,
  featuredListings,
  nearbyListings,
  proTips,
  stories,
} from '@/constants/data';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function HomeScreen() {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'light'];

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.background }]}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}>
        <View style={styles.headerRow}>
          <View>
            <Text style={[styles.welcomeLabel, { color: theme.icon }]}>Bikirala&apos;ya hoş geldin</Text>
            <Text style={[styles.headline, { color: theme.text }]}>Yakınındaki fırsatları keşfet</Text>
          </View>
          <TouchableOpacity style={[styles.notificationButton, { borderColor: theme.tabIconDefault }]}>
            <MaterialCommunityIcons
              name="bell-badge"
              size={22}
              color={theme.tint}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.searchCard}>
          <MaterialCommunityIcons name="map-marker" size={18} color={theme.tint} />
          <TextInput
            placeholder="Mahallende ne arıyorsun?"
            placeholderTextColor="#8b94a1"
            style={styles.searchInput}
          />
          <TouchableOpacity style={styles.filterButton}>
            <MaterialCommunityIcons name="tune-variant" size={20} color={theme.background} />
          </TouchableOpacity>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.storyRow}>
          {stories.map((story) => (
            <View key={story.id} style={styles.storyItem}>
              <View style={[styles.storyAvatarWrapper, story.isLive && styles.storyLive]}> 
                <Image
                  source={{ uri: story.avatar }}
                  style={styles.storyAvatar}
                />
              </View>
              <Text style={styles.storyLabel}>{story.seller}</Text>
            </View>
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
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.featuredRow}>
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

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  content: {
    padding: 20,
    paddingBottom: 120,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  welcomeLabel: {
    fontSize: 14,
    letterSpacing: 0.2,
    textTransform: 'uppercase',
    fontWeight: '600',
  },
  headline: {
    fontSize: 28,
    fontWeight: '700',
    marginTop: 6,
  },
  notificationButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  searchCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 18,
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
    shadowColor: '#101828',
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 20,
    elevation: 3,
    marginBottom: 20,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#1f2933',
  },
  filterButton: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: '#ff565f',
    alignItems: 'center',
    justifyContent: 'center',
  },
  storyRow: {
    paddingVertical: 6,
    gap: 16,
  },
  storyItem: {
    alignItems: 'center',
    width: 72,
  },
  storyAvatarWrapper: {
    borderRadius: 34,
    padding: 3,
    backgroundColor: '#fff',
    shadowColor: '#0b1f3a',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 2,
  },
  storyLive: {
    borderWidth: 2,
    borderColor: '#ff565f',
  },
  storyAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  storyLabel: {
    marginTop: 8,
    fontSize: 12,
    color: '#4a4f58',
    fontWeight: '600',
  },
  sectionHeader: {
    marginTop: 24,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
  },
  actionLink: {
    fontSize: 14,
    fontWeight: '600',
  },
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  categoryCard: {
    width: '30%',
    minWidth: 100,
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
    gap: 10,
  },
  categoryLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#0b1f3a',
    textAlign: 'center',
  },
  featuredRow: {
    gap: 16,
    paddingRight: 8,
  },
  featuredCard: {
    width: 260,
    borderRadius: 20,
    backgroundColor: '#fff',
    overflow: 'hidden',
    shadowColor: '#1f2933',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 12 },
    shadowRadius: 24,
    elevation: 4,
  },
  featuredImageWrapper: {
    position: 'relative',
  },
  featuredImage: {
    width: '100%',
    height: 160,
  },
  badge: {
    position: 'absolute',
    top: 12,
    left: 12,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    shadowColor: '#0b1f3a',
    shadowOpacity: 0.12,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 12,
    elevation: 2,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#ff565f',
    textTransform: 'uppercase',
  },
  boostedFlag: {
    position: 'absolute',
    right: 12,
    top: 12,
    backgroundColor: '#ff8a65',
    borderRadius: 16,
    paddingHorizontal: 10,
    paddingVertical: 4,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  boostedText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  featuredInfo: {
    padding: 16,
    gap: 6,
  },
  featuredTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
  },
  featuredPrice: {
    fontSize: 18,
    fontWeight: '700',
    color: '#ff565f',
  },
  featuredMeta: {
    fontSize: 13,
    color: '#4a4f58',
  },
  nearbyGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  nearbyCard: {
    width: '47%',
    borderRadius: 18,
    backgroundColor: '#fff',
    overflow: 'hidden',
    shadowColor: '#1f2933',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 18,
    elevation: 3,
  },
  nearbyImage: {
    width: '100%',
    height: 120,
  },
  nearbyInfo: {
    padding: 12,
    gap: 4,
  },
  nearbyTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#0b1f3a',
  },
  nearbyPrice: {
    fontSize: 16,
    fontWeight: '700',
    color: '#ff565f',
  },
  nearbyMeta: {
    fontSize: 12,
    color: '#6b7280',
  },
  tipGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  tipCard: {
    width: '47%',
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 16,
    gap: 10,
    shadowColor: '#0b1f3a',
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 20,
    elevation: 3,
  },
  tipIconWrapper: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: '#ffe7ea',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tipTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0b1f3a',
  },
  tipDescription: {
    fontSize: 13,
    color: '#4a4f58',
    lineHeight: 18,
  },
});
