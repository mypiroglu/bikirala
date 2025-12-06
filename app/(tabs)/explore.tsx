import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { FlatList, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

import {
  categories,
  featuredListings,
  savedSearches,
  trendingSearches,
} from '@/constants/data';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { styles } from './explore.styles';

export default function SearchScreen() {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'light'];
  const router = useRouter();

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

