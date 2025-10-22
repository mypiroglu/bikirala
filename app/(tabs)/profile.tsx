import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { featuredListings, sellerActions, sellerHighlights } from '@/constants/data';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { styles } from './profile.styles';

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
                uri: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=300&q=60',
              }}
              style={styles.avatar}
              contentFit="cover"
            />
            <TouchableOpacity style={styles.editAvatar}>
              <MaterialCommunityIcons name="pencil" size={16} color="#fff" />
            </TouchableOpacity>
          </View>
          <View style={styles.userInfo}>
            <Text style={[styles.userName, { color: theme.text }]}>Zeynep Arslan</Text>
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

