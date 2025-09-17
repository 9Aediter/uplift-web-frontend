'use client';

import liff from '@line/liff';

export interface LineProfile {
  userId: string;
  displayName: string;
  pictureUrl?: string;
  statusMessage?: string;
}

class LiffHelper {
  private liffId: string;

  constructor() {
    this.liffId = process.env.NEXT_PUBLIC_LINE_LIFF_ID || '';
  }

  /**
   * Initialize LIFF and check login status
   * Simple init - just like the example
   */
  async init(): Promise<boolean> {
    try {
      if (!this.liffId) {
        throw new Error('LIFF_ID not configured');
      }

      console.log('🔄 LIFF init with ID:', this.liffId);
      
      await liff.init({ liffId: this.liffId });
      const isLoggedIn = liff.isLoggedIn();
      
      console.log('✅ LIFF ready, logged in:', isLoggedIn);
      
      return isLoggedIn;
    } catch (error: any) {
      console.error('❌ LIFF init failed:', error);
      throw error;
    }
  }

  /**
   * Login - simple like example
   */
  login(): void {
    if (typeof window === 'undefined') return;
    liff.login();
  }

  /**
   * Get profile - simple like example
   */
  async getProfile(): Promise<LineProfile | null> {
    try {
      if (!liff.isLoggedIn()) {
        return null;
      }
      
      const profile = await liff.getProfile();
      return {
        userId: profile.userId,
        displayName: profile.displayName,
        pictureUrl: profile.pictureUrl,
        statusMessage: profile.statusMessage
      };
    } catch (error) {
      console.error('❌ Get profile failed:', error);
      return null;
    }
  }

  /**
   * Get access token
   */
  getAccessToken(): string | null {
    try {
      return liff.isLoggedIn() ? liff.getAccessToken() : null;
    } catch (error) {
      console.error('❌ Get access token failed:', error);
      return null;
    }
  }

  /**
   * Check if logged in
   */
  isLoggedIn(): boolean {
    try {
      return liff.isLoggedIn();
    } catch (error) {
      return false;
    }
  }

  /**
   * Check if in LINE client
   */
  isInClient(): boolean {
    try {
      return liff.isInClient();
    } catch (error) {
      return false;
    }
  }

  /**
   * Logout
   */
  logout(): void {
    if (liff.isLoggedIn()) {
      liff.logout();
    }
  }

  /**
   * Close LIFF window
   */
  closeWindow(): void {
    if (this.isInClient()) {
      liff.closeWindow();
    }
  }
}

// Export singleton
export const liffHelper = new LiffHelper();
export default liffHelper;