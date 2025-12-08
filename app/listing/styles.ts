import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  content: {
    padding: 20,
    gap: 16,
  },
  imageCard: {
    borderRadius: 16,
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: '#0b1f3a',
  },
  image: {
    width: '100%',
    height: 280,
    borderRadius: 16,
  },
  placeholder: {
    height: 280,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#101826',
    gap: 8,
  },
  placeholderText: {
    fontSize: 16,
    fontWeight: '600',
  },
  badge: {
    position: 'absolute',
    top: 12,
    left: 12,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#0b1f3a',
  },
  infoCard: {
    backgroundColor: '#0b1f3a',
    padding: 16,
    borderRadius: 16,
    gap: 8,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
  },
  title: {
    flex: 1,
    fontSize: 20,
    fontWeight: '700',
  },
  price: {
    fontSize: 22,
    fontWeight: '800',
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  metaText: {
    fontSize: 14,
    fontWeight: '500',
  },
  boostedFlag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffb703',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
    gap: 4,
  },
  boostedText: {
    color: '#0b1f3a',
    fontWeight: '700',
    fontSize: 12,
  },
  section: {
    backgroundColor: '#0b1f3a',
    padding: 16,
    borderRadius: 16,
    gap: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
  },
  bulletRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  bulletText: {
    fontSize: 14,
    fontWeight: '500',
  },
  sellerCard: {
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    gap: 12,
  },
  sellerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  sellerAvatar: {
    width: 52,
    height: 52,
    borderRadius: 14,
  },
  sellerName: {
    fontSize: 16,
    fontWeight: '700',
  },
  sellerMetaText: {
    fontSize: 13,
    fontWeight: '500',
  },
  sellerStats: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
    backgroundColor: 'rgba(245, 158, 11, 0.12)',
  },
  sellerStatText: {
    fontWeight: '700',
    fontSize: 13,
  },
  sellerMetaRow: {
    flexDirection: 'row',
    gap: 12,
    flexWrap: 'wrap',
  },
  sellerMetaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 12,
    backgroundColor: 'rgba(11, 31, 58, 0.05)',
  },
  messageButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    padding: 14,
    borderRadius: 14,
    borderWidth: 1,
  },
  messageButtonLabel: {
    fontWeight: '700',
    fontSize: 15,
  },
  primaryButton: {
    padding: 16,
    borderRadius: 14,
    alignItems: 'center',
  },
  primaryButtonLabel: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
  secondaryButton: {
    padding: 14,
    borderRadius: 14,
    alignItems: 'center',
    borderWidth: 1,
  },
  secondaryButtonLabel: {
    fontWeight: '700',
    fontSize: 15,
  },
});
