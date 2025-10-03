'use client';

import liff from '@line/liff';
import type { LineProfile, LineLiffAuthData } from '@/types/external/line';

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

      await liff.init({ liffId: this.liffId });
      const isLoggedIn = liff.isLoggedIn();

      return isLoggedIn;
    } catch (error) {
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
    } catch {
      return false;
    }
  }

  /**
   * Check if in LINE client
   */
  isInClient(): boolean {
    try {
      return liff.isInClient();
    } catch {
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

  /**
   * Get authentication data (profile and access token)
   * Used for backend authentication
   */
  async getAuthData(): Promise<LineLiffAuthData | null> {
    try {
      if (!liff.isLoggedIn()) {
        return null;
      }

      const profile = await this.getProfile();
      const accessToken = this.getAccessToken();

      if (!profile || !accessToken) {
        return null;
      }

      return {
        profile,
        accessToken
      };
    } catch (error) {
      console.error('❌ Get auth data failed:', error);
      return null;
    }
  }
}

// Export singleton
export const liffHelper = new LiffHelper();
export default liffHelper;