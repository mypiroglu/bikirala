import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import {
  FlatList,
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
  savedSearches,
  trendingSearches,
} from '@/constants/data';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function SearchScreen() {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'light'];

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.background }]}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={[styles.title, { color: theme.text }]}>Aradığın her şey tek uygulamada</Text>
        <Text style={styles.subtitle}>
          Kaydedilmiş aramalarını kontrol et, ilham veren sonuçlarla keşfetmeye devam et.
        </Text>

        <View style={styles.searchBar}>
          <MaterialCommunityIcons name="magnify" size={20} color={theme.tint} />
          <TextInput
            placeholder="Ürün, kategori veya marka ara"
            placeholderTextColor="#8b94a1"
            style={styles.searchInput}
          />
          <TouchableOpacity style={styles.scanButton}>
            <MaterialCommunityIcons name="qrcode-scan" size={20} color={theme.background} />
          </TouchableOpacity>
        </View>

        <Text style={[styles.sectionTitle, { color: theme.text }]}>Kaydedilen aramalar</Text>
        <View style={styles.savedContainer}>
          {savedSearches.map((item) => (
            <TouchableOpacity key={item} style={styles.savedChip}>
              <MaterialCommunityIcons name="bookmark-outline" size={16} color="#ff565f" />
              <Text style={styles.savedText}>{item}</Text>
            </TouchableOpacity>
          ))}
          <TouchableOpacity style={styles.savedChipGhost}>
            <MaterialCommunityIcons name="plus" size={16} color={theme.tint} />
            <Text style={[styles.savedText, { color: theme.tint }]}>Yeni ekle</Text>
          </TouchableOpacity>
        </View>

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

        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>Popüler filtreler</Text>
          <TouchableOpacity>
            <Text style={[styles.sectionLink, { color: theme.tint }]}>Filtreleri yönet</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.filterRow}>
          {['Sadece fotoğraflı', '7 gün içinde', 'Ücretsiz teslimat', 'Sertifikalı satıcı'].map(
            (label) => (
              <TouchableOpacity key={label} style={styles.filterChip}>
                <MaterialCommunityIcons name="checkbox-blank-circle" size={10} color={theme.tint} />
                <Text style={styles.filterLabel}>{label}</Text>
              </TouchableOpacity>
            ),
          )}
        </View>

        <Text style={[styles.sectionTitle, { color: theme.text }]}>Kategoriye göre keşfet</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryRow}>
          {categories.map((category) => (
            <TouchableOpacity key={category.id} style={[styles.categoryPill, { backgroundColor: category.color }]}>
              <MaterialCommunityIcons name={category.icon as any} size={22} color={theme.tint} />
              <View>
                <Text style={styles.categoryName}>{category.label}</Text>
                <Text style={styles.categoryCount}>Yeni 120+ ilan</Text>
              </View>
              <MaterialCommunityIcons name="chevron-right" size={18} color={theme.tint} />
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>Aramanı hızlandır</Text>
        </View>
        <View style={styles.assistantCard}>
          <MaterialCommunityIcons name="robot-love" size={36} color={theme.tint} />
          <View style={{ flex: 1 }}>
            <Text style={styles.assistantTitle}>Yapay zekâ asistanı</Text>
            <Text style={styles.assistantDescription}>
              Bikirala Asistan aradığın ürünü saniyeler içinde bulur, fiyat uyarıları gönderir.
            </Text>
          </View>
          <TouchableOpacity style={styles.assistantButton}>
            <Text style={styles.assistantButtonLabel}>Aktifleştir</Text>
          </TouchableOpacity>
        </View>

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

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  content: {
    padding: 20,
    paddingBottom: 120,
    gap: 18,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
  },
  subtitle: {
    fontSize: 15,
    color: '#4a4f58',
    lineHeight: 22,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 18,
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
    shadowColor: '#101828',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 16,
    elevation: 2,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#1f2933',
  },
  scanButton: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: '#ff565f',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
  },
  savedContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  savedChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#fff',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 16,
    shadowColor: '#101828',
    shadowOpacity: 0.04,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 12,
    elevation: 2,
  },
  savedChipGhost: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#ff565f',
  },
  savedText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#0b1f3a',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionLink: {
    fontSize: 13,
    fontWeight: '600',
  },
  separator: {
    height: 1,
    backgroundColor: '#e3e7ef',
    marginVertical: 12,
  },
  trendingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  trendingIndex: {
    width: 32,
    height: 32,
    borderRadius: 10,
    backgroundColor: '#ffe7ea',
    alignItems: 'center',
    justifyContent: 'center',
  },
  trendingIndexLabel: {
    fontSize: 15,
    fontWeight: '700',
    color: '#ff565f',
  },
  trendingContent: {
    flex: 1,
  },
  trendingTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0b1f3a',
  },
  trendingMeta: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 2,
  },
  filterRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  filterChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#fff',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 18,
    shadowColor: '#101828',
    shadowOpacity: 0.04,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 12,
    elevation: 2,
  },
  filterLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#0b1f3a',
  },
  categoryRow: {
    paddingVertical: 4,
    gap: 14,
  },
  categoryPill: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 18,
    gap: 14,
    minWidth: 220,
  },
  categoryName: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0b1f3a',
  },
  categoryCount: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 4,
  },
  assistantCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    backgroundColor: '#101d34',
    borderRadius: 22,
    padding: 20,
  },
  assistantTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#fff',
  },
  assistantDescription: {
    fontSize: 13,
    color: '#d1d5db',
    marginTop: 6,
    lineHeight: 18,
  },
  assistantButton: {
    backgroundColor: '#ff565f',
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 14,
  },
  assistantButtonLabel: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 13,
  },
  recentGrid: {
    gap: 12,
  },
  recentCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 16,
    shadowColor: '#101828',
    shadowOpacity: 0.04,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 12,
    elevation: 2,
  },
  recentTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0b1f3a',
  },
  recentMeta: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 2,
  },
});
