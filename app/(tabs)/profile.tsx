import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { featuredListings, sellerActions, sellerHighlights } from '@/constants/data';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function ProfileScreen() {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'light'];

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.background }]}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View style={styles.avatarContainer}>
            <Image
              source={{
                uri: 'https://media.licdn.com/dms/image/v2/D4D03AQF-hWNnXzTtZw/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1728987512239?e=1762992000&v=beta&t=U6YfWk3ocUr5k5OHf3dZuFmbkv1LNTnHc3rodoEATv8',
              }}
              style={styles.avatar}
              contentFit="cover"
            />
            <TouchableOpacity style={styles.editAvatar}>
              <MaterialCommunityIcons name="pencil" size={16} color="#fff" />
            </TouchableOpacity>
          </View>
          <View style={styles.userInfo}>
            <Text style={[styles.userName, { color: theme.text }]}>Muhammet Yusuf Piroglu</Text>
            <View style={styles.userMetaRow}>
              <MaterialCommunityIcons name="map-marker" size={16} color={theme.icon} />
              <Text style={styles.userMeta}>Kadıköy, İstanbul</Text>
            </View>
            <View style={styles.userMetaRow}>
              <MaterialCommunityIcons name="shield-check" size={16} color={theme.tint} />
              <Text style={[styles.userMeta, { color: theme.tint }]}>Kimlik doğrulandı</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.settingsButton}>
            <MaterialCommunityIcons name="cog-outline" size={20} color={theme.tint} />
          </TouchableOpacity>
        </View>

        <View style={styles.highlightRow}>
          {sellerHighlights.map((highlight) => (
            <View key={highlight.label} style={styles.highlightCard}>
              <Text style={styles.highlightValue}>{highlight.value}</Text>
              <Text style={styles.highlightLabel}>{highlight.label}</Text>
            </View>
          ))}
        </View>

        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>Hızlı eylemler</Text>
        </View>
        <View style={styles.actionGrid}>
          {sellerActions.map((action) => (
            <TouchableOpacity key={action.id} style={styles.actionCard}>
              <View style={styles.actionIcon}>
                <MaterialCommunityIcons name={action.icon as any} size={22} color={theme.tint} />
              </View>
              <Text style={styles.actionLabel}>{action.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>Mağazam</Text>
          <TouchableOpacity>
            <Text style={[styles.sectionLink, { color: theme.tint }]}>İstatistikler</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.shopCard}>
          <View style={{ flex: 1 }}>
            <Text style={styles.shopTitle}>Bikirala Plus satıcısı</Text>
            <Text style={styles.shopSubtitle}>
              Premium satıcı rozeti ile ilanların daha çok kişiye gösteriliyor.
            </Text>
          </View>
          <TouchableOpacity style={styles.shopButton}>
            <Text style={styles.shopButtonLabel}>Avantajlar</Text>
          </TouchableOpacity>
        </View>

        <Text style={[styles.sectionTitle, { color: theme.text }]}>Aktif ilanlar</Text>
        <View style={styles.listingGrid}>
          {featuredListings.map((listing) => (
            <View key={listing.id} style={styles.listingCard}>
              <Image source={{ uri: listing.image }} style={styles.listingImage} contentFit="cover" />
              <View style={styles.listingInfo}>
                <Text style={styles.listingTitle} numberOfLines={2}>
                  {listing.title}
                </Text>
                <Text style={styles.listingPrice}>{listing.price}</Text>
                <View style={styles.listingMetaRow}>
                  <MaterialCommunityIcons name="eye-outline" size={16} color={theme.icon} />
                  <Text style={styles.listingMeta}>Son 24 saatte 238 görüntülenme</Text>
                </View>
              </View>
              <TouchableOpacity style={styles.listingAction}>
                <MaterialCommunityIcons name="dots-horizontal" size={18} color={theme.icon} />
              </TouchableOpacity>
            </View>
          ))}
        </View>

        <View style={styles.feedbackCard}>
          <MaterialCommunityIcons name="star-circle" size={34} color={theme.tint} />
          <View style={{ flex: 1 }}>
            <Text style={styles.feedbackTitle}>Yorumların parlıyor!</Text>
            <Text style={styles.feedbackSubtitle}>
              Alıcıların senden bahsettiği son 10 yorumu cevapla, güvenini artır.
            </Text>
          </View>
          <TouchableOpacity style={styles.feedbackButton}>
            <Text style={styles.feedbackButtonLabel}>Yanıtla</Text>
          </TouchableOpacity>
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
    gap: 24,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  avatarContainer: {
    position: 'relative',
  },
  avatar: {
    width: 84,
    height: 84,
    borderRadius: 28,
  },
  editAvatar: {
    position: 'absolute',
    bottom: -4,
    right: -4,
    width: 32,
    height: 32,
    borderRadius: 12,
    backgroundColor: '#ff565f',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#101828',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 12,
    elevation: 4,
  },
  userInfo: {
    flex: 1,
    gap: 6,
  },
  userName: {
    fontSize: 22,
    fontWeight: '700',
    textAlign:'center'
  },
  userMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  userMeta: {
    fontSize: 13,
    color: '#4a4f58',
  },
  settingsButton: {
    width: 42,
    height: 42,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#ffd6da',
    alignItems: 'center',
    justifyContent: 'center',
  },
  highlightRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  highlightCard: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 16,
    alignItems: 'center',
    gap: 6,
    shadowColor: '#101828',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 12,
    elevation: 3,
  },
  highlightValue: {
    fontSize: 22,
    fontWeight: '700',
    color: '#0b1f3a',
  },
  highlightLabel: {
    fontSize: 12,
    color: '#6b7280',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
  },
  sectionLink: {
    fontSize: 13,
    fontWeight: '600',
  },
  actionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  actionCard: {
    width: '47%',
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 16,
    gap: 12,
    shadowColor: '#101828',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 16,
    elevation: 3,
  },
  actionIcon: {
    width: 40,
    height: 40,
    borderRadius: 14,
    backgroundColor: '#ffe7ea',
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionLabel: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0b1f3a',
  },
  shopCard: {
    flexDirection: 'row',
    gap: 16,
    backgroundColor: '#101d34',
    borderRadius: 22,
    padding: 20,
    alignItems: 'center',
  },
  shopTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#fff',
  },
  shopSubtitle: {
    fontSize: 13,
    color: '#d1d5db',
    marginTop: 6,
    lineHeight: 18,
  },
  shopButton: {
    backgroundColor: '#ff565f',
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 16,
  },
  shopButtonLabel: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 13,
  },
  listingGrid: {
    gap: 16,
  },
  listingCard: {
    backgroundColor: '#fff',
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#101828',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 18,
    elevation: 3,
  },
  listingImage: {
    width: '100%',
    height: 160,
  },
  listingInfo: {
    padding: 16,
    gap: 6,
  },
  listingTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0b1f3a',
  },
  listingPrice: {
    fontSize: 16,
    fontWeight: '700',
    color: '#ff565f',
  },
  listingMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  listingMeta: {
    fontSize: 12,
    color: '#6b7280',
  },
  listingAction: {
    position: 'absolute',
    top: 16,
    right: 16,
    backgroundColor: 'rgba(255,255,255,0.92)',
    width: 36,
    height: 36,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  feedbackCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 18,
    shadowColor: '#101828',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 18,
    elevation: 3,
  },
  feedbackTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0b1f3a',
  },
  feedbackSubtitle: {
    fontSize: 13,
    color: '#4a4f58',
    marginTop: 4,
    lineHeight: 18,
  },
  feedbackButton: {
    backgroundColor: '#ff565f',
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 16,
  },
  feedbackButtonLabel: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 13,
  },
});
