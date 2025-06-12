// This file is deprecated - all API calls now go through supabaseApi.ts
// Keeping this file only for backward compatibility until all imports are updated

export { productsAPI, ordersAPI, cartAPI, categoriesAPI, brandsAPI, adminAPI } from './supabaseApi';

// Payment API - placeholder for future implementation
export const paymentAPI = {
  initiate: async (paymentData: any) => {
    throw new Error('Payment API not implemented yet');
  },
  verify: async (verificationData: any) => {
    throw new Error('Payment API not implemented yet');
  },
};

export default {};
