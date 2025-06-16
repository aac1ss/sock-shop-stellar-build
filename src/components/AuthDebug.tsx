
import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const AuthDebug: React.FC = () => {
  const { user, profile, isAuthenticated, isLoading } = useAuth();

  return (
    <Card className="max-w-lg mx-auto mt-8">
      <CardHeader>
        <CardTitle>Authentication Debug</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <p><strong>Is Loading:</strong> {isLoading ? 'Yes' : 'No'}</p>
          <p><strong>Is Authenticated:</strong> {isAuthenticated ? 'Yes' : 'No'}</p>
          <p><strong>User Email:</strong> {user?.email || 'None'}</p>
          <p><strong>User ID:</strong> {user?.id || 'None'}</p>
          <p><strong>Profile:</strong> {profile ? JSON.stringify(profile, null, 2) : 'None'}</p>
          <p><strong>Profile Role:</strong> {profile?.role || 'None'}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default AuthDebug;
