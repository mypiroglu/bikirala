import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import React from 'react';
import { FlatList, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { messageThreads } from '@/constants/data';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { styles } from './messages.styles';

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

