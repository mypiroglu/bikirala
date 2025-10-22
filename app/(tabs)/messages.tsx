import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import React from 'react';
import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { messageThreads } from '@/constants/data';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

const filters = ['Tümü', 'Okunmamış', 'Takipte', 'Arşiv'];

export default function MessagesScreen() {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'light'];
  const [activeFilter, setActiveFilter] = React.useState(filters[0]);

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.background }]}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.headerRow}>
          <View>
            <Text style={[styles.title, { color: theme.text }]}>Sohbetlerin</Text>
            <Text style={styles.subtitle}>Alıcılarla hızlıca iletişim kur, satışlarını hızlandır.</Text>
          </View>
          <TouchableOpacity style={styles.newMessageButton}>
            <MaterialCommunityIcons name="message-plus" size={20} color="#fff" />
          </TouchableOpacity>
        </View>

        <View style={styles.filterRow}>
          {filters.map((filter) => {
            const isActive = activeFilter === filter;
            return (
              <TouchableOpacity
                key={filter}
                style={[styles.filterChip, isActive && { backgroundColor: theme.tint }]}
                onPress={() => setActiveFilter(filter)}>
                <Text style={[styles.filterText, isActive && { color: '#fff' }]}>{filter}</Text>
                {isActive && (
                  <View style={styles.filterBadge}>
                    <Text style={styles.filterBadgeLabel}>12</Text>
                  </View>
                )}
              </TouchableOpacity>
            );
          })}
        </View>

        <View style={styles.infoCard}>
          <MaterialCommunityIcons name="shield-key" size={24} color={theme.tint} />
          <View style={{ flex: 1 }}>
            <Text style={styles.infoTitle}>Güvende Kal</Text>
            <Text style={styles.infoDescription}>
              Ödemelerini sadece Bikirala üzerinden tamamla, şüpheli mesajları bize bildir.
            </Text>
          </View>
          <TouchableOpacity>
            <Text style={[styles.infoLink, { color: theme.tint }]}>Detaylar</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={messageThreads}
          keyExtractor={(item) => item.id}
          scrollEnabled={false}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.threadCard}>
              <View style={styles.avatarWrapper}>
                <Image source={{ uri: item.avatar }} style={styles.avatar} contentFit="cover" />
                {item.unread && (
                  <View style={styles.unreadBadge}>
                    <Text style={styles.unreadLabel}>{item.unread}</Text>
                  </View>
                )}
              </View>
              <View style={styles.threadContent}>
                <View style={styles.threadHeader}>
                  <Text style={styles.threadName}>{item.name}</Text>
                  <Text style={styles.threadTime}>{item.timestamp}</Text>
                </View>
                <Text style={styles.threadMessage} numberOfLines={2}>
                  {item.lastMessage}
                </Text>
                <View style={styles.threadListing}>
                  <Image
                    source={{ uri: item.listingImage }}
                    style={styles.threadListingImage}
                    contentFit="cover"
                  />
                  <Text style={styles.threadListingTitle} numberOfLines={1}>
                    {item.listingTitle}
                  </Text>
                </View>
              </View>
              <MaterialCommunityIcons
                name="chevron-right"
                size={24}
                color={theme.icon}
              />
            </TouchableOpacity>
          )}
        />
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
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 16,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
  },
  subtitle: {
    fontSize: 14,
    color: '#4a4f58',
    marginTop: 8,
    lineHeight: 20,
  },
  newMessageButton: {
    width: 44,
    height: 44,
    borderRadius: 16,
    backgroundColor: '#ff565f',
    alignItems: 'center',
    justifyContent: 'center',
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
    borderRadius: 16,
    shadowColor: '#101828',
    shadowOpacity: 0.04,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 12,
    elevation: 2,
  },
  filterText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#0b1f3a',
  },
  filterBadge: {
    minWidth: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 6,
  },
  filterBadgeLabel: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '700',
  },
  infoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 18,
    shadowColor: '#101828',
    shadowOpacity: 0.04,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 12,
    elevation: 2,
  },
  infoTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0b1f3a',
  },
  infoDescription: {
    fontSize: 13,
    color: '#6b7280',
    marginTop: 4,
  },
  infoLink: {
    fontSize: 13,
    fontWeight: '600',
  },
  separator: {
    height: 1,
    backgroundColor: '#eef1f6',
    marginVertical: 10,
  },
  threadCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 18,
    shadowColor: '#101828',
    shadowOpacity: 0.04,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 12,
    elevation: 2,
  },
  avatarWrapper: {
    position: 'relative',
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 20,
  },
  unreadBadge: {
    position: 'absolute',
    right: -4,
    top: -4,
    minWidth: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#ff565f',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 6,
  },
  unreadLabel: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '700',
  },
  threadContent: {
    flex: 1,
    gap: 8,
  },
  threadHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  threadName: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0b1f3a',
  },
  threadTime: {
    fontSize: 12,
    color: '#6b7280',
  },
  threadMessage: {
    fontSize: 13,
    color: '#4a4f58',
  },
  threadListing: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: '#f5f7fb',
    padding: 10,
    borderRadius: 12,
  },
  threadListingImage: {
    width: 40,
    height: 40,
    borderRadius: 10,
  },
  threadListingTitle: {
    flex: 1,
    fontSize: 13,
    color: '#0b1f3a',
    fontWeight: '600',
  },
});
