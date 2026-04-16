import CryptoJS from 'crypto-js';

// Get salt from environment variable
const CLIENT_SALT = import.meta.env.VITE_CLIENT_SALT || 'default-salt-key-change-this';

/**
 * Hash password on client side before sending to server
 * This adds an extra layer of security
 */
export const hashPassword = (password) => {
    if (!password) return '';
    
    // Create a unique hash with salt
    const saltedPassword = password + CLIENT_SALT;
    const hash = CryptoJS.SHA256(saltedPassword).toString();
    
    // Add another round of hashing for extra security
    const doubleHash = CryptoJS.SHA256(hash + CLIENT_SALT).toString();
    
    return doubleHash;
};

/**
 * Verify if password matches hash (client-side)
 * Note: This is rarely needed as server does the verification
 */
export const verifyPassword = (password, hash) => {
    const computedHash = hashPassword(password);
    return computedHash === hash;
};