import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { FlatList, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

import { categories, featuredListings, trendingSearches } from '@/constants/data';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { styles } from './explore.styles';

export default function SearchScreen() {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'light'];
  const router = useRouter();
  const [searchQuery, setSearchQuery] = React.useState('');

  const searchResults = React.useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return [];

    return featuredListings.filter((listing) =>
      `${listing.title} ${listing.location}`.toLowerCase().includes(query),
    );
  }, [searchQuery]);

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.background }]}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={[styles.title, { color: theme.text }]}>Aradığın her şey tek uygulamada</Text>
        <Text style={styles.subtitle}>
          Trend aramaları incele, ilham veren sonuçlarla keşfetmeye devam et.
        </Text>

        <View style={styles.searchBar}>
          <MaterialCommunityIcons name="magnify" size={20} color={theme.tint} />
          <TextInput
            placeholder="Ürün, kategori veya marka ara"
            placeholderTextColor="#8b94a1"
            style={styles.searchInput}
            value={searchQuery}
            onChangeText={setSearchQuery}
            autoCapitalize="none"
            returnKeyType="search"
          />
        </View>

        {searchQuery.trim().length > 0 && (
          <>
            <View style={styles.resultsHeader}>
              <Text style={[styles.sectionTitle, { color: theme.text }]}>Arama Sonuçları</Text>
              <Text style={[styles.resultsCount, { color: theme.tint }]}>
                {searchResults.length} sonuç
              </Text>
            </View>

            {searchResults.length === 0 ? (
              <View style={styles.emptyState}>
                <MaterialCommunityIcons name="text-search" size={22} color={theme.tabIconDefault} />
                <Text style={[styles.emptyStateTitle, { color: theme.text }]}>Sonuç bulunamadı</Text>
                <Text style={styles.emptyStateHint}>
                  Aramanı farklı anahtar kelimelerle veya kategori adıyla yeniden dene.
                </Text>
              </View>
            ) : (
              <View style={styles.resultsGrid}>
                {searchResults.map((listing) => (
                  <TouchableOpacity
                    key={listing.id}
                    activeOpacity={0.85}
                    style={styles.resultCard}
                    onPress={() => router.push({ pathname: '/listing/[id]', params: { id: listing.id } })}>
                    <View style={styles.resultInfo}>
                      <Text style={styles.resultTitle} numberOfLines={2}>
                        {listing.title}
                      </Text>
                      <Text style={styles.resultMeta} numberOfLines={1}>
                        {listing.location} · {listing.price}
                      </Text>
                    </View>
                    <MaterialCommunityIcons name="chevron-right" size={18} color={theme.icon} />
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </>
        )}

        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>Trend olan aramalar</Text>
          <TouchableOpacity>
            <Text style={[styles.sectionLink, { color: theme.tint }]}>Tümü</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={trendingSearches}
          keyExtractor={(item) => item}
          scrollEnabled={false}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          renderItem={({ item, index }) => (
            <View style={styles.trendingRow}>
              <View style={styles.trendingIndex}>
                <Text style={styles.trendingIndexLabel}>{index + 1}</Text>
              </View>
              <View style={styles.trendingContent}>
                <Text style={styles.trendingTitle}>{item}</Text>
                <Text style={styles.trendingMeta}>Son 24 saatte %32 artış</Text>
              </View>
              <MaterialCommunityIcons name="arrow-top-right" size={18} color={theme.tint} />
            </View>
          )}
        />

        <Text style={[styles.sectionTitle, { color: theme.text }]}>Kategoriye göre keşfet</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryRow}>
          {categories.map((category) => (
            <TouchableOpacity
              key={category.id}
              style={[styles.categoryPill, { backgroundColor: category.color }]}
              onPress={() => router.push({ pathname: '/category/[id]', params: { id: category.id } })}>
              <MaterialCommunityIcons name={category.icon as any} size={22} color={theme.tint} />
              <View>
                <Text style={styles.categoryName}>{category.label}</Text>
                <Text style={styles.categoryCount}>Yeni 120+ ilan</Text>
              </View>
              <MaterialCommunityIcons name="chevron-right" size={18} color={theme.tint} />
            </TouchableOpacity>
          ))}
        </ScrollView>

        <Text style={[styles.sectionTitle, { color: theme.text }]}>Yakın zamanda aradıkların</Text>
        <View style={styles.recentGrid}>
          {featuredListings.slice(0, 4).map((listing) => (
            <View key={listing.id} style={styles.recentCard}>
              <MaterialCommunityIcons name="history" size={18} color={theme.tint} />
              <View style={{ flex: 1 }}>
                <Text style={styles.recentTitle}>{listing.title}</Text>
                <Text style={styles.recentMeta}>{listing.location} · {listing.price}</Text>
              </View>
              <MaterialCommunityIcons name="arrow-right" size={18} color={theme.icon} />
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

