import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import React from 'react';
import { FlatList, Modal, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { messageThreads } from '@/constants/data';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { styles } from './messages.styles';

const filters = ['Tümü', 'Okunmamış', 'Takipte', 'Arşiv'];

type MessageThread = (typeof messageThreads)[number];

export default function MessagesScreen() {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'light'];
  const [activeFilter, setActiveFilter] = React.useState(filters[0]);
  const [threads, setThreads] = React.useState(messageThreads);
  const [selectedThread, setSelectedThread] = React.useState<MessageThread | null>(null);
  const [modalVisible, setModalVisible] = React.useState(false);

  const handleOpenThread = (thread: MessageThread) => {
    setThreads((prevThreads) =>
      prevThreads.map((item) => (item.id === thread.id ? { ...item, unread: 0 } : item)),
    );
    setSelectedThread({ ...thread, unread: 0 });
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedThread(null);
  };

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
          data={threads}
          keyExtractor={(item) => item.id}
          scrollEnabled={false}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.threadCard} onPress={() => handleOpenThread(item)}>
              <View style={styles.avatarWrapper}>
                <Image source={{ uri: item.avatar }} style={styles.avatar} contentFit="cover" />
                {Boolean(item.unread) && (
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

        <Modal visible={modalVisible} transparent animationType="slide" onRequestClose={closeModal}>
          <View style={styles.modalOverlay}>
            <View style={[styles.modalCard, { backgroundColor: theme.background }]}>
              <View style={styles.modalHeader}>
                <View style={styles.modalUser}>
                  {selectedThread && (
                    <Image
                      source={{ uri: selectedThread.avatar }}
                      style={styles.modalAvatar}
                      contentFit="cover"
                    />
                  )}
                  <View>
                    <Text style={[styles.modalTitle, { color: theme.text }]}>Yeni Bildirim</Text>
                    <Text style={styles.modalSubtitle}>Mesaj okundu olarak işaretlendi</Text>
                  </View>
                </View>
                <TouchableOpacity onPress={closeModal}>
                  <MaterialCommunityIcons name="close" size={24} color={theme.icon} />
                </TouchableOpacity>
              </View>

              {selectedThread && (
                <View style={styles.modalBody}>
                  <View style={styles.modalRow}>
                    <Text style={styles.modalLabel}>Gönderen</Text>
                    <Text style={[styles.modalValue, { color: theme.text }]}>{selectedThread.name}</Text>
                  </View>
                  <View style={styles.modalRow}>
                    <Text style={styles.modalLabel}>Mesaj</Text>
                    <Text style={[styles.modalValue, { color: theme.text }]}>{selectedThread.lastMessage}</Text>
                  </View>
                  <View style={styles.modalRow}>
                    <Text style={styles.modalLabel}>Zaman</Text>
                    <Text style={[styles.modalValue, { color: theme.text }]}>{selectedThread.timestamp}</Text>
                  </View>

                  <View style={styles.modalListing}>
                    <Image
                      source={{ uri: selectedThread.listingImage }}
                      style={styles.modalListingImage}
                      contentFit="cover"
                    />
                    <View style={{ flex: 1 }}>
                      <Text style={[styles.modalListingTitle, { color: theme.text }]}>
                        {selectedThread.listingTitle}
                      </Text>
                      <Text style={styles.modalListingNote}>İlgili ilan detayları</Text>
                    </View>
                  </View>
                </View>
              )}

              <TouchableOpacity style={[styles.modalButton, { backgroundColor: theme.tint }]} onPress={closeModal}>
                <Text style={styles.modalButtonText}>Anladım</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </SafeAreaView>
  );
}

