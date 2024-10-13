export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  imgUrls: string[]; // Utilisez string[] pour les URLs des images
  proceededImg?: string;  // Image principale traitée
  availableSizes: string[];
  colors: string[];
  categoryId: string;
  categoryName: string;
}
