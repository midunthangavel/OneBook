import React, { ReactNode } from 'react';
import { View, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { ErrorBoundary } from './ErrorBoundary';
import { LoadingSpinner } from './LoadingSpinner';
import { colors } from '../../utils/constants/colors';

interface BaseScreenProps {
  children: ReactNode;
  loading?: boolean;
  error?: string | null;
  scrollable?: boolean;
  safeArea?: boolean;
  backgroundColor?: string;
  onRetry?: () => void;
  loadingMessage?: string;
}

export const BaseScreen: React.FC<BaseScreenProps> = ({
  children,
  loading = false,
  error = null,
  scrollable = false,
  safeArea = true,
  backgroundColor = colors.background,
  onRetry,
  loadingMessage,
}) => {
  const Container = safeArea ? SafeAreaView : View;
  const Content = scrollable ? ScrollView : View;

  const containerStyle = [
    styles.container,
    { backgroundColor },
  ];

  const contentStyle = scrollable 
    ? styles.scrollContent 
    : styles.content;

  return (
    <ErrorBoundary>
      <Container style={containerStyle}>
        {loading ? (
          <LoadingSpinner message={loadingMessage} />
        ) : (
          <Content style={contentStyle} showsVerticalScrollIndicator={false}>
            {children}
          </Content>
        )}
      </Container>
    </ErrorBoundary>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
});
