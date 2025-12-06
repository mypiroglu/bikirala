import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import React from 'react';
import { Modal, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

import {
  categories,
  featuredListings,
  messageThreads,
  proTips,
  stories,
} from '@/constants/data';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

import { styles } from './index.styles';

type MessageThread = (typeof messageThreads)[number];

export default function HomeScreen() {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'light'];
  const [searchQuery, setSearchQuery] = React.useState('');
  const router = useRouter();
  const [notificationModalVisible, setNotificationModalVisible] = React.useState(false);
  const [latestNotification, setLatestNotification] = React.useState<MessageThread | null>(
    messageThreads[0] ?? null,
  );

  const allListings = React.useMemo(() => {
    return featuredListings;
  }, []);

  const hasUnreadNotification = React.useMemo(() => {
    if (!latestNotification) return false;

    return Boolean(latestNotification.unread && latestNotification.unread > 0);
  }, [latestNotification]);

  const searchResults = React.useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return [];

    return allListings.filter((listing) => listing.title.toLowerCase().includes(query));
  }, [allListings, searchQuery]);

  const handleNotificationPress = () => {
    if (!latestNotification) return;

    setNotificationModalVisible(true);
    if (latestNotification.unread) {
      setLatestNotification({ ...latestNotification, unread: 0 });
    }
  };

  const closeNotificationModal = () => {
    setNotificationModalVisible(false);
  };

  const goToMessages = () => {
    setNotificationModalVisible(false);
    router.push('/(tabs)/messages');
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.background }]}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.headerRow}>
          <View>
            <Text style={[styles.welcomeLabel, { color: theme.icon }]}>Bikirala&apos;ya hoş geldin</Text>
            <Text style={[styles.headline, { color: theme.text }]}>Yakınındaki fırsatları keşfet</Text>
          </View>
          <TouchableOpacity
            style={[styles.notificationButton, { borderColor: theme.tabIconDefault }]}
            onPress={handleNotificationPress}
            activeOpacity={0.85}>
            <MaterialCommunityIcons name="bell-badge" size={22} color={theme.tint} />
            {hasUnreadNotification && (
              <View style={[styles.notificationBadge, { backgroundColor: theme.tint }]}>
                <Text style={styles.notificationBadgeLabel}>{latestNotification?.unread}</Text>
              </View>
            )}
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
          <TouchableOpacity onPress={() => router.push('/categories')}>
            <Text style={[styles.actionLink, { color: theme.tint }]}>Tümünü gör</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.categoryGrid}>
          {categories.map((category) => (
            <TouchableOpacity
              key={category.id}
              style={[styles.categoryCard, { backgroundColor: category.color }]}
              onPress={() => router.push({ pathname: '/category/[id]', params: { id: category.id } })}>
              <MaterialCommunityIcons name={category.icon as any} size={28} color={theme.tint} />
              <Text style={styles.categoryLabel}>{category.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>Öne Çıkan İlanlar</Text>
          <TouchableOpacity onPress={() => router.push('/explore')}>
            <Text style={[styles.actionLink, { color: theme.tint }]}>Hepsini keşfet</Text>
          </TouchableOpacity>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.featuredRow}>
          {featuredListings.map((listing) => (
            <TouchableOpacity
              key={listing.id}
              activeOpacity={0.85}
              style={styles.featuredCard}
              onPress={() => router.push({ pathname: '/listing/[id]', params: { id: listing.id } })}>
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
            </TouchableOpacity>
          ))}
        </ScrollView>

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

      <Modal
        visible={notificationModalVisible}
        transparent
        animationType="slide"
        onRequestClose={closeNotificationModal}>
        <View style={styles.modalOverlay}>
          <View style={[styles.modalCard, { backgroundColor: theme.background }]}>
            <View style={styles.modalHeader}>
              <View style={styles.modalUser}>
                {latestNotification && (
                  <Image
                    source={{ uri: latestNotification.avatar }}
                    style={styles.modalAvatar}
                    contentFit="cover"
                  />
                )}
                <View>
                  <Text style={[styles.modalTitle, { color: theme.text }]}>Bildirimler</Text>
                  <Text style={styles.modalSubtitle}>
                    Yeni mesaj okundu olarak işaretlendi
                  </Text>
                </View>
              </View>
              <TouchableOpacity onPress={closeNotificationModal}>
                <MaterialCommunityIcons name="close" size={22} color={theme.icon} />
              </TouchableOpacity>
            </View>

            {latestNotification ? (
              <>
                <View style={styles.modalRow}>
                  <Text style={styles.modalLabel}>Gönderen</Text>
                  <View style={styles.modalValueRow}>
                    <Text style={[styles.modalValue, { color: theme.text }]}>
                      {latestNotification.name}
                    </Text>
                    {!hasUnreadNotification && (
                      <View style={styles.readPill}>
                        <MaterialCommunityIcons name="check-all" size={14} color="#0f5132" />
                        <Text style={styles.readPillLabel}>Okundu</Text>
                      </View>
                    )}
                  </View>
                </View>
                <View style={styles.modalRow}>
                  <Text style={styles.modalLabel}>Mesaj</Text>
                  <Text style={[styles.modalValue, { color: theme.text }]}>
                    {latestNotification.lastMessage}
                  </Text>
                </View>
                <View style={styles.modalRow}>
                  <Text style={styles.modalLabel}>Zaman</Text>
                  <Text style={[styles.modalValue, { color: theme.text }]}>
                    {latestNotification.timestamp}
                  </Text>
                </View>

                <View style={styles.modalListing}>
                  <Image
                    source={{ uri: latestNotification.listingImage }}
                    style={styles.modalListingImage}
                    contentFit="cover"
                  />
                  <View style={{ flex: 1 }}>
                    <Text style={[styles.modalListingTitle, { color: theme.text }]}> 
                      {latestNotification.listingTitle}
                    </Text>
                    <Text style={styles.modalListingNote}>İlan detaylarına gitmek için mesaj kutunu aç</Text>
                  </View>
                </View>
              </>
            ) : (
              <Text style={[styles.modalValue, { color: theme.text }]}>Şu anda bildirimin yok</Text>
            )}

            <View style={styles.modalActions}>
              <TouchableOpacity style={styles.secondaryButton} onPress={closeNotificationModal}>
                <Text style={styles.secondaryButtonText}>Kapat</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.primaryButton, { backgroundColor: theme.tint }]}
                onPress={goToMessages}>
                <MaterialCommunityIcons name="message-badge" size={18} color="#fff" />
                <Text style={styles.primaryButtonText}>Mesajlara git</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
