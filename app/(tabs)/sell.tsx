import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { listingFormSteps } from '@/constants/data';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

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
  photoUpload: {
    backgroundColor: '#fff',
    borderRadius: 24,
    padding: 24,
    alignItems: 'center',
    gap: 12,
    borderWidth: 1,
    borderColor: '#f6d9dc',
    borderStyle: 'dashed',
  },
  photoTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0b1f3a',
  },
  photoHint: {
    fontSize: 13,
    color: '#6b7280',
    textAlign: 'center',
  },
  photoActions: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 4,
  },
  primaryButton: {
    backgroundColor: '#ff565f',
    paddingHorizontal: 22,
    paddingVertical: 14,
    borderRadius: 16,
    alignItems: 'center',
  },
  primaryButtonLabel: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 15,
  },
  secondaryButton: {
    paddingHorizontal: 22,
    paddingVertical: 14,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#ff565f',
  },
  secondaryButtonLabel: {
    color: '#ff565f',
    fontWeight: '700',
    fontSize: 15,
  },
  inputGroup: {
    gap: 8,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0b1f3a',
  },
  input: {
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 16,
    fontSize: 15,
    color: '#1f2933',
    shadowColor: '#101828',
    shadowOpacity: 0.04,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 12,
    elevation: 2,
  },
  multiline: {
    minHeight: 120,
    textAlignVertical: 'top',
  },
  row: {
    flexDirection: 'row',
    gap: 14,
  },
  half: {
    flex: 1,
  },
  selectInput: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 16,
    shadowColor: '#101828',
    shadowOpacity: 0.04,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 12,
    elevation: 2,
  },
  selectText: {
    fontSize: 15,
    color: '#0b1f3a',
    fontWeight: '600',
  },
  sectionHeader: {
    marginTop: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
  },
  stepList: {
    gap: 12,
  },
  stepCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 16,
    shadowColor: '#101828',
    shadowOpacity: 0.04,
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 16,
    elevation: 2,
  },
  stepIcon: {
    width: 40,
    height: 40,
    borderRadius: 14,
    backgroundColor: '#ffe7ea',
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0b1f3a',
  },
  stepDescription: {
    fontSize: 13,
    color: '#6b7280',
    marginTop: 4,
  },
  stepOrder: {
    width: 32,
    height: 32,
    borderRadius: 12,
    backgroundColor: '#0b1f3a',
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepOrderLabel: {
    color: '#fff',
    fontWeight: '700',
  },
  smartPricing: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    backgroundColor: '#f2f6ff',
    borderRadius: 20,
    padding: 20,
  },
  smartTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0b1f3a',
  },
  smartSubtitle: {
    fontSize: 13,
    color: '#4a4f58',
    marginTop: 4,
    lineHeight: 18,
  },
  switchButton: {
    paddingHorizontal: 8,
  },
  publishButton: {
    marginTop: 8,
  },
});
