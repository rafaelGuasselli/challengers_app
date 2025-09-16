import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, ScrollView } from 'react-native';
import { Amplify } from 'aws-amplify';
import { fetchAuthSession, signOut } from 'aws-amplify/auth';
import { Authenticator } from '@aws-amplify/ui-react-native';
import "@aws-amplify/ui-react-native/dist/styles.css";
import config from './src/amplifyConfig';

Amplify.configure(config);

function Home() {
  const [result, setResult] = useState<string>('');

  const callHello = async () => {
    try {
      const session = await fetchAuthSession();
      const idToken = session?.tokens?.idToken?.toString();
      if (!idToken) throw new Error('No ID token');

      const endpoint = config?.backend?.endpoint;
      if (!endpoint) throw new Error('Missing backend.endpoint in amplifyConfig');

      const res = await fetch(`${endpoint}/hello`, {
        method: 'GET',
        headers: {
          Authorization: idToken
        }
      });
      const text = await res.text();
      setResult(`Status: ${res.status}\n${text}`);
    } catch (e: any) {
      setResult(`Error: ${e?.message || String(e)}`);
    }
  };

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Welcome!</Text>
      <View style={styles.buttonRow}>
        <Button title="Call /hello" onPress={callHello} />
        <View style={{ width: 16 }} />
        <Button title="Sign out" onPress={handleSignOut} />
      </View>
      <Text style={styles.result} selectable>{result}</Text>
    </ScrollView>
  );
}

export default function App() {
  return (
    <Authenticator>
      <Home />
    </Authenticator>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 24,
    paddingTop: 64,
    backgroundColor: '#fff'
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 16
  },
  buttonRow: {
    flexDirection: 'row',
    marginBottom: 16
  },
  result: {
    fontFamily: 'monospace',
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 12,
    borderRadius: 8
  }
});

