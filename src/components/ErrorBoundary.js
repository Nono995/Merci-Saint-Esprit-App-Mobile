import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useTheme } from '../theme/ThemeProvider';

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, info: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    this.setState({ error, info });
    // eslint-disable-next-line no-console
    console.error('Uncaught error:', error, info);
  }

  render() {
    if (!this.state.hasError) return this.props.children;

    // For functional styling we can't call hook in class; fall back to inline styles
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Une erreur est survenue</Text>
        <Text style={styles.message}>{String(this.state.error)}</Text>
        {this.state.info && <Text style={styles.stack}>{String(this.state.info.componentStack)}</Text>}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff4f4',
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 12,
    color: '#b91c1c',
  },
  message: {
    fontSize: 14,
    marginBottom: 8,
    color: '#111827',
  },
  stack: {
    fontFamily: 'monospace',
    fontSize: 12,
    color: '#374151',
  },
});

export default ErrorBoundary;
