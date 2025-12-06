import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Stack } from 'expo-router';
import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { categories } from '@/constants/data';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

import { styles } from './categories.styles';

export default function CategoriesScreen() {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'light'];
  const cardBackground = colorScheme === 'dark' ? '#121723' : '#fff';

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.background }]}>
      <Stack.Screen
        options={{
          title: 'Kategoriler',
          headerStyle: { backgroundColor: theme.background },
          headerTintColor: theme.text,
          headerTitleStyle: { color: theme.text },
          headerShadowVisible: false,
        }}
      />

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={[styles.heroCard, { backgroundColor: cardBackground }]}> 
          <View style={[styles.heroIcon, { backgroundColor: theme.tint }]}>
            <MaterialCommunityIcons name="view-grid-outline" size={24} color="#fff" />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={[styles.heroTitle, { color: theme.text }]}>Kategorilere göz at</Text>
            <Text style={[styles.heroSubtitle, { color: theme.tabIconDefault }]}>
              İhtiyacına en uygun ürünleri bulmak için kategori listesine göz at.
            </Text>
          </View>
        </View>

        <View style={styles.categoryGrid}>
          {categories.map((category) => (
            <TouchableOpacity
              key={category.id}
              style={[styles.categoryCard, { backgroundColor: category.color }]}
              activeOpacity={0.9}>
              <View style={styles.categoryHeader}>
                <MaterialCommunityIcons name={category.icon as any} size={26} color={theme.tint} />
              </View>
              <Text style={[styles.categoryLabel, { color: theme.text }]}>{category.label}</Text>
              <View style={[styles.categoryFooter, { borderColor: theme.tabIconDefault }]}>
                <Text style={[styles.categoryAction, { color: theme.tint }]}>İlanları gör</Text>
                <MaterialCommunityIcons name="chevron-right" size={18} color={theme.tint} />
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <View style={[styles.tipCard, { backgroundColor: cardBackground }]}>
          <MaterialCommunityIcons name="lightbulb-on" size={22} color={theme.tint} />
          <Text style={[styles.tipText, { color: theme.text }]}>
            Aradığın ürünü daha hızlı bulmak için arama çubuğuna marka veya model ekle.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
