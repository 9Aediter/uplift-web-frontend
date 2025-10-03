'use client';

import { useEffect, useState } from 'react';
import { liffHelper, LineProfile } from '@/lib/integrations/liff';
import { Button } from '@/components/basic/button/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function TestLiffPage() {
  const [profile, setProfile] = useState<LineProfile | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Main LIFF function - simple like your example
  const main = async () => {
    try {
      console.log('🚀 Starting LIFF main function...');

      const isLoggedIn = await liffHelper.init();

      if (isLoggedIn) {
        console.log('✅ User is logged in');

        // Get profile
        const userProfile = await liffHelper.getProfile();
        const token = liffHelper.getAccessToken();

        // Update state
        setProfile(userProfile);
        setAccessToken(token);

        console.log('👤 Profile:', userProfile);
        console.log('🔑 Access Token:', token ? 'Got token' : 'No token');

      } else {
        console.log('❌ User not logged in - calling login()');
        liffHelper.login();
      }

      setIsReady(true);

    } catch (error: any) {
      console.error('❌ Main function error:', error);
      setError(error.message);
      setIsReady(true);
    }
  };

  // Run main on mount
  useEffect(() => {
    main();
  }, []);

  const handleLogin = () => {
    liffHelper.login();
  };

  const handleLogout = () => {
    liffHelper.logout();
    setProfile(null);
    setAccessToken(null);
    window.location.reload();
  };

  const handleRefresh = () => {
    main();
  };

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle>LINE LIFF Test (Simple Version)</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">

          {/* Environment Info */}
          <div className="bg-muted/30 border border-border p-4 rounded-lg">
            <h3 className="font-semibold mb-3 text-foreground">📋 Configuration</h3>
            <div className="space-y-2 text-sm">
              <p><span className="font-medium text-foreground">LIFF ID:</span> <code className="bg-muted px-2 py-1 rounded text-xs">{process.env.NEXT_PUBLIC_LINE_LIFF_ID || 'Not configured'}</code></p>
              <p><span className="font-medium text-foreground">Ready:</span> {isReady ? '✅ Yes' : '⏳ Loading...'}</p>
              <p><span className="font-medium text-foreground">In LINE Client:</span> {liffHelper.isInClient() ? '✅ Yes' : '❌ No'}</p>
              <div>
                <span className="font-medium text-foreground">Current URL:</span>
                <div className="bg-muted p-2 rounded mt-1 break-all text-xs font-mono text-muted-foreground">
                  {typeof window !== 'undefined' ? window.location.href : 'Loading...'}
                </div>
              </div>
            </div>
          </div>

          {/* Error */}
          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 p-4 rounded-lg">
              <h3 className="font-semibold text-red-800 dark:text-red-200 mb-2">❌ Error</h3>
              <p className="text-red-700 dark:text-red-300 text-sm">{error}</p>
            </div>
          )}

          {/* Profile */}
          {profile ? (
            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 p-4 rounded-lg">
              <h3 className="font-semibold text-green-800 dark:text-green-200 mb-4">✅ Successfully Logged In!</h3>
              <div className="flex items-start space-x-4">
                {profile.pictureUrl && (
                  <img
                    src={profile.pictureUrl}
                    alt="Profile"
                    className="w-16 h-16 rounded-full border-2 border-green-300 dark:border-green-600"
                  />
                )}
                <div className="flex-1 space-y-2 text-sm">
                  <p><span className="font-medium text-green-800 dark:text-green-200">Display Name:</span>
                    <span className="text-green-700 dark:text-green-300 ml-2">{profile.displayName}</span></p>
                  <div>
                    <span className="font-medium text-green-800 dark:text-green-200">User ID:</span>
                    <code className="bg-green-100 dark:bg-green-900/40 text-green-800 dark:text-green-200 px-2 py-1 rounded text-xs block mt-1 break-all">
                      {profile.userId}
                    </code>
                  </div>
                  {profile.statusMessage && (
                    <p><span className="font-medium text-green-800 dark:text-green-200">Status:</span>
                      <span className="text-green-700 dark:text-green-300 ml-2">{profile.statusMessage}</span></p>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 p-4 rounded-lg">
              <h3 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-2">⚠️ Not Logged In</h3>
              <p className="text-yellow-700 dark:text-yellow-300 text-sm">Profile not loaded or authentication pending</p>
            </div>
          )}

          {/* Access Token */}
          {accessToken && (
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 p-4 rounded-lg">
              <h3 className="font-semibold text-blue-800 dark:text-blue-200 mb-3">🔑 Access Token</h3>
              <div className="bg-card border border-border p-3 rounded-lg">
                <div className="text-xs font-mono break-all text-muted-foreground leading-relaxed">
                  {accessToken}
                </div>
              </div>
              <p className="text-xs text-blue-600 dark:text-blue-400 mt-2">
                ✓ Token received successfully - can be sent to backend API
              </p>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3 flex-wrap">
            {!profile ? (
              <Button onClick={handleLogin} className="bg-green-600 hover:bg-green-700 text-white">
                🔐 Login with LINE
              </Button>
            ) : (
              <Button variant="outline" onClick={handleLogout} className="border-red-200 text-red-600 hover:bg-red-50 dark:border-red-800 dark:text-red-400 dark:hover:bg-red-900/20">
                🚪 Logout
              </Button>
            )}

            <Button variant="outline" onClick={handleRefresh}>
              🔄 Refresh Status
            </Button>

            {liffHelper.isInClient() && (
              <Button variant="outline" onClick={() => liffHelper.closeWindow()}>
                ❌ Close LIFF
              </Button>
            )}
          </div>

          {/* Instructions */}
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 p-4 rounded-lg">
            <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-3">📖 How LIFF Works</h4>
            <div className="text-sm text-blue-700 dark:text-blue-300 space-y-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="font-medium mb-2">Simple Flow:</p>
                  <ol className="list-decimal list-inside space-y-1 text-xs">
                    <li><code className="bg-blue-100 dark:bg-blue-900/40 px-1 rounded">liff.init()</code> - Initialize</li>
                    <li><code className="bg-blue-100 dark:bg-blue-900/40 px-1 rounded">liff.isLoggedIn()</code> - Check status</li>
                    <li>If YES: <code className="bg-blue-100 dark:bg-blue-900/40 px-1 rounded">liff.getProfile()</code> - Get data</li>
                    <li>If NO: <code className="bg-blue-100 dark:bg-blue-900/40 px-1 rounded">liff.login()</code> - Redirect login</li>
                  </ol>
                </div>
                <div>
                  <p className="font-medium mb-2">LINE Console Setup:</p>
                  <ul className="space-y-1 text-xs">
                    <li>• Endpoint URL: <code className="bg-blue-100 dark:bg-blue-900/40 px-1 rounded">localhost:4000/test-liff</code></li>
                    <li>• Size: Compact/Full</li>
                    <li>• Scope: profile, openid</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

        </CardContent>
      </Card>
    </div>
  );
}