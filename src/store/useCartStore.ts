import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product } from './useProductStore';

// Define the CartItem type
interface CartItem {
  product: Product;
  quantity: number;
}

// Define the store state
interface CartState {
  items: CartItem[];
  isOpen: boolean;
  
  // Actions
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  toggleCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  
  // Getters
  getTotalItems: () => number;
  getTotalPrice: () => number;
  getItem: (productId: string) => CartItem | undefined;
}

// Create the store
const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      
      // Add an item to the cart
      addItem: (product: Product, quantity = 1) => {
        const { items } = get();
        const existingItem = items.find(item => item.product._id === product._id);
        
        if (existingItem) {
          // If the item already exists, update the quantity
          set({
            items: items.map(item => 
              item.product._id === product._id 
                ? { ...item, quantity: item.quantity + quantity } 
                : item
            )
          });
        } else {
          // Otherwise, add a new item
          set({ items: [...items, { product, quantity }] });
        }
        
        // Open the cart when adding an item
        get().openCart();
      },
      
      // Remove an item from the cart
      removeItem: (productId: string) => {
        const { items } = get();
        set({ items: items.filter(item => item.product._id !== productId) });
      },
      
      // Update the quantity of an item
      updateQuantity: (productId: string, quantity: number) => {
        const { items } = get();
        
        if (quantity <= 0) {
          // If the quantity is 0 or less, remove the item
          get().removeItem(productId);
        } else {
          // Otherwise, update the quantity
          set({
            items: items.map(item => 
              item.product._id === productId 
                ? { ...item, quantity } 
                : item
            )
          });
        }
      },
      
      // Clear the cart
      clearCart: () => set({ items: [] }),
      
      // Toggle the cart
      toggleCart: () => set(state => ({ isOpen: !state.isOpen })),
      
      // Open the cart
      openCart: () => set({ isOpen: true }),
      
      // Close the cart
      closeCart: () => set({ isOpen: false }),
      
      // Get the total number of items in the cart
      getTotalItems: () => {
        const { items } = get();
        return items.reduce((total, item) => total + item.quantity, 0);
      },
      
      // Get the total price of the cart
      getTotalPrice: () => {
        const { items } = get();
        return items.reduce((total, item) => total + (item.product.price * item.quantity), 0);
      },
      
      // Get an item from the cart
      getItem: (productId: string) => {
        const { items } = get();
        return items.find(item => item.product._id === productId);
      },
    }),
    {
      name: 'cart-store', // Name for localStorage
    }
  )
);

export default useCartStore;
