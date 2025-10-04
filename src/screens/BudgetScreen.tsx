import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';

const COLORS = {
  primary: '#ea580c',
  secondary: '#fb923c',
  white: '#ffffff',
  gray50: '#f9fafb',
  gray100: '#f3f4f6',
  gray400: '#9ca3af',
  gray600: '#4b5563',
  gray900: '#111827',
  blue50: '#eff6ff',
  blue600: '#2563eb',
  green50: '#f0fdf4',
  green600: '#16a34a',
  orange50: '#fff7ed',
  orange600: '#ea580c',
  amber50: '#fffbeb',
  amber600: '#d97706',
};

export default function BudgetScreen() {
  const currentTrip = {
    budget: 2500,
    spent: 450,
  };

  const budgetCategories = [
    { category: 'Accommodation', amount: 180, budget: 800, icon: 'home', color: COLORS.blue600 },
    { category: 'Food & Dining', amount: 150, budget: 600, icon: 'restaurant', color: COLORS.orange600 },
    { category: 'Transportation', amount: 80, budget: 400, icon: 'directions-car', color: COLORS.green600 },
    { category: 'Activities', amount: 40, budget: 500, icon: 'camera-alt', color: COLORS.amber600 }
  ];

  const recentTransactions = [
    { description: 'Hotel Le Marais', amount: 120, category: 'Accommodation', date: 'Dec 16', time: '2:30 PM' },
    { description: 'Café de Flore', amount: 28, category: 'Food', date: 'Dec 16', time: '10:45 AM' },
    { description: 'Metro Day Pass', amount: 15, category: 'Transportation', date: 'Dec 15', time: '8:20 AM' }
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Budget Tracker</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Budget Summary */}
        <View style={styles.summaryCard}>
          <LinearGradient
            colors={[COLORS.orange50, COLORS.amber50]}
            style={styles.summaryGradient}
          >
            <Text style={styles.summaryTitle}>Paris Trip Budget</Text>
            
            <View style={styles.summaryGrid}>
              <View style={styles.summaryItem}>
                <Text style={[styles.summaryAmount, { color: COLORS.orange600 }]}>
                  ${currentTrip.budget}
                </Text>
                <Text style={styles.summaryLabel}>Total Budget</Text>
              </View>
              <View style={styles.summaryItem}>
                <Text style={[styles.summaryAmount, { color: COLORS.green600 }]}>
                  ${currentTrip.spent}
                </Text>
                <Text style={styles.summaryLabel}>Spent</Text>
              </View>
              <View style={styles.summaryItem}>
                <Text style={[styles.summaryAmount, { color: COLORS.amber600 }]}>
                  ${currentTrip.budget - currentTrip.spent}
                </Text>
                <Text style={styles.summaryLabel}>Remaining</Text>
              </View>
            </View>

            <View style={styles.progressSection}>
              <View style={styles.progressHeader}>
                <Text style={styles.progressLabel}>Budget Progress</Text>
                <Text style={styles.progressPercentage}>
                  {Math.round((currentTrip.spent / currentTrip.budget) * 100)}%
                </Text>
              </View>
              <View style={styles.progressBar}>
                <View 
                  style={[
                    styles.progressFill, 
                    { width: `${(currentTrip.spent / currentTrip.budget) * 100}%` }
                  ]} 
                />
              </View>
            </View>

            <View style={styles.dailyAverage}>
              <Text style={styles.dailyLabel}>Daily average so far</Text>
              <Text style={styles.dailyAmount}>${Math.round(currentTrip.spent / 3)}</Text>
            </View>
          </LinearGradient>
        </View>

        {/* Budget Categories */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Budget Breakdown</Text>
          {budgetCategories.map((item, index) => (
            <View key={index} style={styles.categoryCard}>
              <View style={styles.categoryHeader}>
                <View style={[styles.categoryIcon, { backgroundColor: `${item.color}20` }]}>
                  <MaterialIcons name={item.icon as any} size={20} color={item.color} />
                </View>
                <View style={styles.categoryInfo}>
                  <View style={styles.categoryTitleRow}>
                    <Text style={styles.categoryTitle}>{item.category}</Text>
                    <Text style={styles.categoryPercentage}>
                      {Math.round((item.amount / item.budget) * 100)}%
                    </Text>
                  </View>
                  <View style={styles.categoryAmountRow}>
                    <Text style={styles.categoryAmount}>${item.amount} of ${item.budget}</Text>
                    <Text style={styles.categoryRemaining}>${item.budget - item.amount} left</Text>
                  </View>
                </View>
              </View>
              <View style={styles.categoryProgress}>
                <View 
                  style={[
                    styles.categoryProgressFill, 
                    { width: `${(item.amount / item.budget) * 100}%`, backgroundColor: item.color }
                  ]} 
                />
              </View>
            </View>
          ))}
        </View>

        {/* Recent Transactions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Transactions</Text>
          {recentTransactions.map((transaction, index) => (
            <View key={index} style={styles.transactionCard}>
              <View style={styles.transactionContent}>
                <View style={styles.transactionInfo}>
                  <Text style={styles.transactionDescription}>{transaction.description}</Text>
                  <Text style={styles.transactionMeta}>
                    {transaction.category} • {transaction.date} at {transaction.time}
                  </Text>
                </View>
                <Text style={styles.transactionAmount}>${transaction.amount}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Smart Budget Tip */}
        <View style={styles.tipCard}>
          <LinearGradient
            colors={[COLORS.green50, COLORS.blue50]}
            style={styles.tipGradient}
          >
            <View style={styles.tipHeader}>
              <MaterialIcons name="trending-up" size={16} color={COLORS.green600} />
              <Text style={styles.tipTitle}>Smart Budget Tip</Text>
            </View>
            <Text style={styles.tipDescription}>
              You're 18% under budget for food! Consider trying a Michelin-starred restaurant for a special dinner.
            </Text>
            <View style={styles.tipBadge}>
              <Text style={styles.tipBadgeText}>On Track</Text>
            </View>
          </LinearGradient>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  header: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray100,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.gray900,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  summaryCard: {
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 24,
  },
  summaryGradient: {
    padding: 24,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.gray900,
    textAlign: 'center',
    marginBottom: 24,
  },
  summaryGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  summaryItem: {
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.7)',
    borderRadius: 7,
    padding: 12,
    flex: 1,
    marginHorizontal: 4,
  },
  summaryAmount: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  summaryLabel: {
    fontSize: 12,
    color: COLORS.gray600,
    textAlign: 'center',
  },
  progressSection: {
    marginBottom: 16,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  progressLabel: {
    fontSize: 14,
    color: COLORS.gray600,
  },
  progressPercentage: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.gray900,
  },
  progressBar: {
    height: 12,
    backgroundColor: COLORS.gray100,
    borderRadius: 6,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: COLORS.gray900,
    borderRadius: 6,
  },
  dailyAverage: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.5)',
    borderRadius: 7,
    padding: 12,
  },
  dailyLabel: {
    fontSize: 14,
    color: COLORS.gray600,
  },
  dailyAmount: {
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORS.gray900,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.gray900,
    marginBottom: 12,
  },
  categoryCard: {
    backgroundColor: COLORS.white,
    borderRadius: 7,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  categoryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 16,
  },
  categoryIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryInfo: {
    flex: 1,
  },
  categoryTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  categoryTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.gray900,
  },
  categoryPercentage: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.gray600,
  },
  categoryAmountRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  categoryAmount: {
    fontSize: 14,
    color: COLORS.gray600,
  },
  categoryRemaining: {
    fontSize: 14,
    color: COLORS.gray600,
  },
  categoryProgress: {
    height: 8,
    backgroundColor: COLORS.gray100,
    borderRadius: 4,
    overflow: 'hidden',
  },
  categoryProgressFill: {
    height: '100%',
    borderRadius: 4,
  },
  transactionCard: {
    backgroundColor: COLORS.white,
    borderRadius: 7,
    padding: 16,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  transactionContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  transactionInfo: {
    flex: 1,
  },
  transactionDescription: {
    fontSize: 16,
    fontWeight: '500',
    color: COLORS.gray900,
    marginBottom: 4,
  },
  transactionMeta: {
    fontSize: 12,
    color: COLORS.gray600,
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.gray900,
  },
  tipCard: {
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 24,
  },
  tipGradient: {
    padding: 16,
  },
  tipHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  tipTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.gray900,
  },
  tipDescription: {
    fontSize: 14,
    color: COLORS.gray600,
    marginBottom: 12,
    lineHeight: 20,
  },
  tipBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: 'rgba(34,197,94,0.1)',
    borderColor: COLORS.green600,
    borderWidth: 1,
    borderRadius: 4,
  },
  tipBadgeText: {
    fontSize: 12,
    color: COLORS.green600,
    fontWeight: '500',
  },
});