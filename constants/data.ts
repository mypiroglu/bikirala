export type Category = {
  id: string;
  label: string;
  icon: string;
  color: string;
};

export type Listing = {
  id: string;
  title: string;
  price: string;
  location: string;
  distance: string;
  image: string;
  categoryId: string;
  badge?: string;
  isBoosted?: boolean;
  sellerName: string;
  sellerAvatar: string;
  sellerRating?: number;
  sellerSales?: number;
  sellerResponseTime?: string;
};

export type Story = {
  id: string;
  seller: string;
  avatar: string;
  isLive?: boolean;
};

export type Tip = {
  id: string;
  title: string;
  description: string;
  icon: string;
};

export const categories: Category[] = [
  { id: '1', label: 'Elektronik', icon: 'laptop-mac', color: '#eef4ff' },
  { id: '2', label: 'Araçlar', icon: 'car-sports', color: '#fdf1f0' },
  { id: '3', label: 'Ev & Yaşam', icon: 'sofa', color: '#f3f9f1' },
  { id: '4', label: 'Moda', icon: 'tshirt-crew', color: '#f8f1fd' },
  { id: '5', label: 'Hobi', icon: 'camera-iris', color: '#fdf6ed' },
  { id: '6', label: 'Bebek', icon: 'baby-carriage', color: '#f1f7ff' },
];

export const featuredListings: Listing[] = [
  {
    id: '1',
    title: '2022 iPhone 14 Pro 256GB',
    price: '32.500 TL',
    location: 'Kadıköy',
    distance: '1.2 km',
    image:
      'https://images.unsplash.com/photo-1661961110671-44ecca942d87?auto=format&fit=crop&w=800&q=60',
    categoryId: '1',
    badge: 'Günün Fırsatı',
    isBoosted: true,
    sellerName: 'Zeynep Yılmaz',
    sellerAvatar:
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=200&q=60',
    sellerRating: 4.9,
    sellerSales: 124,
    sellerResponseTime: 'Genellikle 10 dk içinde yanıt verir',
  },
  {
    id: '2',
    title: 'Minimalist Keten Kanepe',
    price: '9.800 TL',
    location: 'Beşiktaş',
    distance: '3.4 km',
    image:
      'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=800&q=60',
    categoryId: '3',
    sellerName: 'Mert Karaca',
    sellerAvatar:
      'https://images.unsplash.com/photo-1504593811423-6dd665756598?auto=format&fit=crop&w=200&q=60',
    sellerRating: 4.7,
    sellerSales: 86,
    sellerResponseTime: '1 saat içinde yanıt verir',
  },
  {
    id: '3',
    title: 'Giant Escape 3 Bisiklet',
    price: '6.500 TL',
    location: 'Üsküdar',
    distance: '4.1 km',
    image:
      'https://images.unsplash.com/photo-1525104254931-6afc3fd675c5?auto=format&fit=crop&w=800&q=60',
    categoryId: '2',
    badge: 'Kargo Bedava',
    sellerName: 'Ahmet Demir',
    sellerAvatar:
      'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=60',
    sellerRating: 4.8,
    sellerSales: 203,
    sellerResponseTime: 'Hızlı yanıt verir',
  },
  {
    id: '4',
    title: 'Vintage Deri Omuz Çantası',
    price: '1.250 TL',
    location: 'Nişantaşı',
    distance: '2.1 km',
    image:
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=800&q=60',
    categoryId: '4',
    sellerName: 'Selin Kaya',
    sellerAvatar:
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=200&q=60',
    sellerRating: 5,
    sellerSales: 57,
    sellerResponseTime: 'Aynı gün dönüş yapar',
  },
  {
    id: '5',
    title: 'Fujifilm X-T30 Kamera Gövdesi',
    price: '18.400 TL',
    location: 'Bakırköy',
    distance: '5.2 km',
    image:
      'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=60',
    categoryId: '5',
    badge: 'Temiz Kullanım',
    sellerName: 'Elif Tufan',
    sellerAvatar:
      'https://images.unsplash.com/photo-1528892952291-009c663ce843?auto=format&fit=crop&w=200&q=60',
    sellerRating: 4.6,
    sellerSales: 142,
    sellerResponseTime: 'Ortalama 30 dk içinde yanıt verir',
  },
  {
    id: '6',
    title: 'Mama Sandalyesi (Katlanabilir)',
    price: '950 TL',
    location: 'Ataşehir',
    distance: '3.9 km',
    image:
      'https://images.unsplash.com/photo-1509474520651-53cf6a80543d?auto=format&fit=crop&w=800&q=60',
    categoryId: '6',
    sellerName: 'Deniz Erol',
    sellerAvatar:
      'https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?auto=format&fit=crop&w=200&q=60',
    sellerRating: 4.4,
    sellerSales: 33,
    sellerResponseTime: 'Aynı gün içinde dönüş yapar',
  },
];

export const stories: Story[] = [
  {
    id: '1',
    seller: 'Zeynep',
    avatar:
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=200&q=60',
    isLive: true,
  },
  {
    id: '2',
    seller: 'Ahmet',
    avatar:
      'https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=200&q=60',
  },
  {
    id: '3',
    seller: 'Selin',
    avatar:
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=200&q=60',
  },
  {
    id: '4',
    seller: 'Mert',
    avatar:
      'https://images.unsplash.com/photo-1504593811423-6dd665756598?auto=format&fit=crop&w=200&q=60',
  },
  {
    id: '5',
    seller: 'Elif',
    avatar:
      'https://images.unsplash.com/photo-1528892952291-009c663ce843?auto=format&fit=crop&w=200&q=60',
  },
];

export const proTips: Tip[] = [
  {
    id: '1',
    title: 'Güvenli Ödeme',
    description: 'Bikirala Güvenli Ödeme ile ürününü teslim aldıktan sonra satıcıya ödeme yapılır.',
    icon: 'shield-check',
  },
  {
    id: '2',
    title: 'Anında Mesajlaşma',
    description: 'Sahip olduğumuz filtrelerle mesaj kutunu düzenli tut, hızlıca anlaş.',
    icon: 'message-badge-outline',
  },
  {
    id: '3',
    title: 'Ücretsiz Listele',
    description: 'İlanını birkaç dakikada oluştur, öne çıkarma paketleriyle daha fazla kişiye ulaş.',
    icon: 'rocket-launch',
  },
];

export const trendingSearches = [
  'iPhone 15 Pro',
  'oyuncu koltuğu',
  'kamp ekipmanı',
  'klasik plak',
  'robot süpürge',
];

export const savedSearches = [
  'Kadıköy ikinci el gitar',
  'Sıfır sneaker 43 numara',
];

export const messageThreads = [
  {
    id: '1',
    name: 'Gökhan',
    lastMessage: 'Ürün hala satılık mı?',
    timestamp: '2 dk önce',
    avatar:
      'https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?auto=format&fit=crop&w=200&q=60',
    unread: 2,
    listingTitle: 'Sony WH-1000XM5',
    listingImage:
      'https://images.unsplash.com/photo-1583391733956-6c782e7b4fbd?auto=format&fit=crop&w=300&q=60',
  },
  {
    id: '2',
    name: 'Deniz',
    lastMessage: 'Teşekkürler, yarın teslim alırım.',
    timestamp: 'dün',
    avatar:
      'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=60',
    listingTitle: 'MacBook Air M2',
    listingImage:
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=300&q=60',
  },
  {
    id: '3',
    name: 'Berna',
    lastMessage: '3500 olur mu?',
    timestamp: '3 gün önce',
    avatar:
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=200&q=60',
    unread: 1,
    listingTitle: 'Dyson V12 Detect',
    listingImage:
      'https://images.unsplash.com/photo-1581579186989-0a3b46f79da5?auto=format&fit=crop&w=300&q=60',
  },
];

export const sellerHighlights = [
  { label: 'Toplam Satış', value: '128' },
  { label: 'Puan', value: '4.9' },
  { label: 'Takipçi', value: '2.4K' },
];

export const sellerActions = [
  { id: '1', label: 'İlanlarım', icon: 'view-grid-plus' },
  { id: '2', label: 'Favoriler', icon: 'heart-outline' },
  { id: '3', label: 'Mağaza Analitiği', icon: 'chart-line' },
  { id: '4', label: 'Satıcı Destek', icon: 'lifebuoy' },
];

export const listingFormSteps = [
  {
    id: '1',
    title: 'Fotoğraf Ekle',
    description: 'En az 3 net fotoğraf ile ürününü öne çıkar.',
    icon: 'camera-plus',
  },
  {
    id: '2',
    title: 'Detayları Gir',
    description: 'Başlık, açıklama ve kategori ile alıcıların güvenini kazan.',
    icon: 'note-edit',
  },
  {
    id: '3',
    title: 'Fiyat Belirle',
    description: 'Piyasa fiyatlarını karşılaştır, akıllı fiyat önerisini kullan.',
    icon: 'cash-multiple',
  },
];
