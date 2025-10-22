import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { listingFormSteps } from '@/constants/data';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { styles } from './sell.styles';

export default function SellScreen() {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'light'];

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.background }]}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={[styles.title, { color: theme.text }]}>Yeni ilan oluştur</Text>
        <Text style={styles.subtitle}>
          Fotoğraflarını ekle, detayları doldur ve Bikirala topluluğuna ulaş. İlanın dakikalar içinde
          yayında olacak.
        </Text>

        <View style={styles.photoUpload}>
          <MaterialCommunityIcons name="image-plus" size={32} color={theme.tint} />
          <Text style={styles.photoTitle}>Fotoğraf ekle</Text>
          <Text style={styles.photoHint}>Sürükle bırak veya telefonundan yükle</Text>
          <View style={styles.photoActions}>
            <TouchableOpacity style={styles.primaryButton}>
              <Text style={styles.primaryButtonLabel}>Galeriden seç</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.secondaryButton}>
              <Text style={styles.secondaryButtonLabel}>Kamera</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Başlık</Text>
          <TextInput placeholder="Ürünün için dikkat çekici bir başlık" style={styles.input} />
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Açıklama</Text>
          <TextInput
            placeholder="Durumu, aksesuarları ve teslimat seçeneklerini anlat"
            style={[styles.input, styles.multiline]}
            multiline
            numberOfLines={4}
          />
        </View>

        <View style={styles.row}>
          <View style={[styles.inputGroup, styles.half]}>
            <Text style={styles.inputLabel}>Fiyat (TL)</Text>
            <TextInput placeholder="Örn. 1250" style={styles.input} keyboardType="numeric" />
          </View>
          <View style={[styles.inputGroup, styles.half]}>
            <Text style={styles.inputLabel}>Durum</Text>
            <TouchableOpacity style={styles.selectInput}>
              <Text style={styles.selectText}>Az kullanılmış</Text>
              <MaterialCommunityIcons name="chevron-down" size={20} color={theme.icon} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.row}>
          <View style={[styles.inputGroup, styles.half]}>
            <Text style={styles.inputLabel}>Kategori</Text>
            <TouchableOpacity style={styles.selectInput}>
              <Text style={styles.selectText}>Elektronik</Text>
              <MaterialCommunityIcons name="chevron-down" size={20} color={theme.icon} />
            </TouchableOpacity>
          </View>
          <View style={[styles.inputGroup, styles.half]}>
            <Text style={styles.inputLabel}>Konum</Text>
            <TouchableOpacity style={styles.selectInput}>
              <Text style={styles.selectText}>Kadıköy, İstanbul</Text>
              <MaterialCommunityIcons name="map-marker" size={20} color={theme.icon} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>Adım adım rehber</Text>
        </View>
        <View style={styles.stepList}>
          {listingFormSteps.map((step, index) => (
            <View key={step.id} style={styles.stepCard}>
              <View style={styles.stepIcon}>
                <MaterialCommunityIcons name={step.icon as any} size={20} color={theme.tint} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.stepTitle}>{step.title}</Text>
                <Text style={styles.stepDescription}>{step.description}</Text>
              </View>
              <View style={styles.stepOrder}>
                <Text style={styles.stepOrderLabel}>{index + 1}</Text>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.smartPricing}>
          <View style={{ flex: 1 }}>
            <Text style={styles.smartTitle}>Akıllı fiyat önerisi</Text>
            <Text style={styles.smartSubtitle}>
              Benzer ilanları analiz edip sana rekabetçi bir fiyat önerelim mi?
            </Text>
          </View>
          <TouchableOpacity style={styles.switchButton}>
            <MaterialCommunityIcons name="toggle-switch" size={42} color={theme.tint} />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={[styles.primaryButton, styles.publishButton]}>
          <Text style={styles.primaryButtonLabel}>İlanı yayınla</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

