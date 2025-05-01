import axios from 'axios';
import api from './api';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001/api';

// Helper function to save product to localStorage
const saveProductToLocalStorage = (product: any) => {
  try {
    console.log('Saving product to localStorage:', product);

    // Get existing products from localStorage or use an empty array
    const existingProductsStr = localStorage.getItem('marketplace_products');
    console.log('Existing products string:', existingProductsStr);

    const existingProducts = existingProductsStr ? JSON.parse(existingProductsStr) : [];
    console.log('Parsed existing products:', existingProducts);

    // Check if product already exists
    const existingIndex = existingProducts.findIndex((p: any) => p._id === product._id);
    console.log('Existing index:', existingIndex);

    if (existingIndex >= 0) {
      // Update existing product
      existingProducts[existingIndex] = product;
      console.log('Updated existing product');
    } else {
      // Add new product to the beginning of the array
      existingProducts.unshift(product);
      console.log('Added new product');
    }

    // Save the updated products to localStorage
    const updatedProductsStr = JSON.stringify(existingProducts);
    console.log('Updated products string:', updatedProductsStr);

    localStorage.setItem('marketplace_products', updatedProductsStr);
    console.log('Saved to localStorage');

    // Verify the save worked
    const verifyStr = localStorage.getItem('marketplace_products');
    console.log('Verification - products in localStorage:', verifyStr);
  } catch (error) {
    console.error('Error saving product to localStorage:', error);
  }
};

// Interface for product data
export interface ProductData {
  title: string;
  description: string;
  price: number;
  category: string;
  materials: string[];
  images: File[];
  ecoScore?: {
    score: number;
    materialsSustainability?: number;
    productionProcess?: number;
    packaging?: number;
    transportFootprint?: number;
  };
  storyVideo?: string;
  storyVideoType?: 'youtube' | 'vimeo' | 'upload' | null;
}

// Upload product images
export const uploadProductImages = async (images: File[]): Promise<string[]> => {
  try {
    // For a real implementation, we would use FormData to upload images to a server
    const formData = new FormData();
    images.forEach((image, index) => {
      formData.append(`image-${index}`, image);
    });

    try {
      // Try to upload images to the server
      const response = await axios.post(`${API_URL}/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${localStorage.getItem('token') || 'demo-token'}`
        }
      });

      if (response.data && response.data.imageUrls) {
        return response.data.imageUrls;
      }
    } catch (uploadError) {
      console.error('Error uploading to server, using fallback:', uploadError);
    }

    // Fallback: Use local URLs or placeholder images
    // Convert images to data URLs for demo purposes
    const imageUrls = await Promise.all(
      images.map(async (image) => {
        return new Promise<string>((resolve) => {
          const reader = new FileReader();
          reader.onload = (e) => {
            resolve(e.target?.result as string || 'https://via.placeholder.com/400x300?text=Product+Image');
          };
          reader.readAsDataURL(image);
        });
      })
    );

    return imageUrls;
  } catch (error) {
    console.error('Error uploading images:', error);
    // Return placeholder images as fallback
    return images.map(() => 'https://via.placeholder.com/400x300?text=Product+Image');
  }
};

// Create a new product
export const createProduct = async (productData: ProductData): Promise<any> => {
  try {
    // First upload images
    const imageUrls = await uploadProductImages(productData.images);

    // Prepare product data for API
    const apiData = {
      name: productData.title,
      description: productData.description,
      price: productData.price,
      category: productData.category,
      materials: productData.materials,
      images: imageUrls,
      ecoScore: productData.ecoScore,
      storyVideo: productData.storyVideo || null,
      storyVideoType: productData.storyVideoType || null,
      status: 'published' // Set to published for demo purposes
    };

    // Skip API call and use localStorage directly for now
    console.log('Creating product in localStorage');

    // Create a mock product for localStorage
    const mockProduct = {
      ...apiData,
      _id: `product-${Date.now()}`,
      artisan: {
        _id: 'current-user',
        name: 'Current User',
        location: 'Your Location'
      },
      createdAt: new Date().toISOString()
    };

    // Save to localStorage
    saveProductToLocalStorage(mockProduct);

    return {
      success: true,
      data: {
        product: mockProduct
      }
    };
  } catch (error) {
    console.error('Error creating product:', error);

    // For demo purposes, use mock data if the process fails
    const imageUrls = await uploadProductImages(productData.images);
    const apiData = {
      name: productData.title,
      description: productData.description,
      price: productData.price,
      category: productData.category,
      materials: productData.materials,
      images: imageUrls,
      ecoScore: productData.ecoScore,
      storyVideo: productData.storyVideo || null,
      storyVideoType: productData.storyVideoType || null,
      status: 'published'
    };

    return {
      success: true,
      data: {
        product: {
          ...apiData,
          _id: `product-${Date.now()}`,
          createdAt: new Date().toISOString()
        }
      }
    };
  }
};

// Get products by artisan
export const getProductsByArtisan = async (artisanId: string): Promise<any> => {
  try {
    console.log('Fetching products from localStorage');

    // Get products directly from localStorage
    const localStorageProducts = localStorage.getItem('marketplace_products');
    if (localStorageProducts) {
      const products = JSON.parse(localStorageProducts);
      console.log('Found products in localStorage:', products);
      return {
        success: true,
        data: {
          products: products
        }
      };
    }

    // If no localStorage data, return empty array
    console.log('No products found in localStorage');
    return {
      success: true,
      data: {
        products: []
      }
    };
  } catch (error) {
    console.error('Error fetching artisan products:', error);
    return {
      success: true,
      data: {
        products: []
      }
    };
  }
};

// Get product preview data
export const getProductPreview = async (productId: string): Promise<any> => {
  try {
    console.log('Fetching product preview from localStorage, id:', productId);

    // Get product directly from localStorage
    const products = JSON.parse(localStorage.getItem('marketplace_products') || '[]');
    console.log('All products in localStorage:', products);

    const product = products.find((p: any) => p._id === productId);

    if (!product) {
      console.error('Product not found in localStorage:', productId);
      throw new Error('Product not found');
    }

    console.log('Found product in localStorage:', product);
    return {
      success: true,
      data: {
        product
      }
    };
  } catch (error) {
    console.error('Error fetching product preview:', error);
    throw error;
  }
};

// Calculate eco score based on materials
export const calculateEcoScore = (materials: string[]): number => {
  if (materials.length === 0) return 0;

  // Define eco scores for different material types
  const materialScores: Record<string, number> = {
    'recycled': 9,
    'natural': 7,
    'synthetic': 3,
    'upcycled': 8,
    'organic': 8,
    'biodegradable': 8
  };

  // Calculate average score
  let totalScore = 0;
  let scoredMaterials = 0;

  materials.forEach(material => {
    if (materialScores[material]) {
      totalScore += materialScores[material];
      scoredMaterials++;
    }
  });

  if (scoredMaterials === 0) return 0;

  return Math.round((totalScore / scoredMaterials) * 10) / 10; // Round to 1 decimal place
};

// Update an existing product
export const updateProduct = async (productId: string, productData: ProductData): Promise<any> => {
  try {
    console.log('Updating product in localStorage, id:', productId);

    // First upload images if they are File objects
    const imageUrls = Array.isArray(productData.images) && productData.images[0] instanceof File
      ? await uploadProductImages(productData.images as File[])
      : productData.images;

    // Prepare product data for API
    const apiData = {
      name: productData.title,
      description: productData.description,
      price: productData.price,
      category: productData.category,
      materials: productData.materials,
      images: imageUrls,
      ecoScore: productData.ecoScore,
      storyVideo: productData.storyVideo || null,
      storyVideoType: productData.storyVideoType || null,
      status: 'published' // Set to published for demo purposes
    };

    // Update product in localStorage
    const existingProducts = JSON.parse(localStorage.getItem('marketplace_products') || '[]');
    const existingProduct = existingProducts.find((p: any) => p._id === productId);

    if (!existingProduct) {
      console.error('Product not found in localStorage:', productId);
      throw new Error('Product not found');
    }

    // Update the product
    const updatedProduct = {
      ...existingProduct,
      ...apiData,
      _id: productId,
      updatedAt: new Date().toISOString()
    };

    // Save to localStorage
    saveProductToLocalStorage(updatedProduct);
    console.log('Product updated in localStorage:', updatedProduct);

    return {
      success: true,
      data: {
        product: updatedProduct
      }
    };
  } catch (error) {
    console.error('Error updating product:', error);
    throw error;
  }
};
