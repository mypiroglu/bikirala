import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  content: {
    padding: 16,
    gap: 16,
  },
  heroCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    gap: 12,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(11, 31, 58, 0.08)',
  },
  heroIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroTitle: {
    fontSize: 18,
    fontWeight: '700',
  },
  heroSubtitle: {
    fontSize: 14,
    marginTop: 4,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
  },
  sectionBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: 'rgba(11, 31, 58, 0.06)',
  },
  sectionBadgeText: {
    fontSize: 13,
    fontWeight: '600',
  },
  listingGrid: {
    gap: 12,
  },
  listingCard: {
    borderRadius: 14,
    overflow: 'hidden',
    borderWidth: 1,
  },
  listingImage: {
    width: '100%',
    height: 180,
  },
  listingInfo: {
    padding: 12,
    gap: 6,
  },
  listingTitle: {
    fontSize: 15,
    fontWeight: '700',
  },
  listingPrice: {
    fontSize: 15,
    fontWeight: '700',
  },
  listingMeta: {
    fontSize: 13,
  },
});
