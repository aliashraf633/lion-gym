export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  image: string;
}
const img = (id: string) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=1200&q=80`;
export const gallery: GalleryItem[] = [
  { id: 'floor', title: 'صالة التمرين', category: 'Gym Floor', image: img('1534438327276-14e5300c3a48') },
  { id: 'equipment', title: 'أجهزة القوة', category: 'Equipment', image: img('1583454110551-21f2fa2afe61') },
  { id: 'cardio', title: 'منطقة الكارديو', category: 'Cardio', image: img('1538805060514-97d8f5c2a5f1') },
  { id: 'weights', title: 'منطقة الأوزان', category: 'Weights', image: img('1517836357463-d25dfeac3438') },
  { id: 'training', title: 'منطقة التدريب', category: 'Training', image: img('1546483875-ad9014c88eba') },
  { id: 'exterior', title: 'واجهة الجيم', category: 'Exterior', image: img('1497366754035-f200968a6e72') },
];
