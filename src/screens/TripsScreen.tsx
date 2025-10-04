import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
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
};

export default function TripsScreen() {
  const planningTools = [
    { icon: 'navigation', title: 'Smart Route', desc: 'AI-powered navigation' },
    { icon: 'event', title: 'Itinerary Builder', desc: 'Personalized schedules' },
    { icon: 'home', title: 'Find Stays', desc: 'Budget to luxury options' },
    { icon: 'restaurant', title: 'Food', desc: 'Local dining spots' }
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Trips</Text>
        <TouchableOpacity style={styles.planButton}>
          <LinearGradient
            colors={[COLORS.primary, COLORS.secondary]}
            style={styles.planButtonGradient}
          >
            <MaterialIcons name="add" size={16} color={COLORS.white} />
            <Text style={styles.planButtonText}>Plan Trip</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Trip Planning Tools */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Planning Tools</Text>
          <View style={styles.toolsGrid}>
            {planningTools.map((tool, index) => (
              <TouchableOpacity key={index} style={styles.toolCard}>
                <View style={styles.toolIcon}>
                  <MaterialIcons name={tool.icon as any} size={20} color={COLORS.primary} />
                </View>
                <Text style={styles.toolTitle}>{tool.title}</Text>
                <Text style={styles.toolDesc}>{tool.desc}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Current Trip Details */}
        <View style={[styles.section, styles.currentTripSection]}>
          <Text style={styles.sectionTitle}>Current Trip: Paris</Text>
          <View style={styles.tripDetailsList}>
            {[
              { icon: 'event', label: 'Itinerary' },
              { icon: 'bookmark', label: 'Bookmarks', count: '12 places' },
              { icon: 'group', label: 'Travel Companions', count: '3 people' }
            ].map((item, index) => (
              <TouchableOpacity key={index} style={styles.tripDetailItem}>
                <View style={styles.tripDetailLeft}>
                  <MaterialIcons name={item.icon as any} size={16} color={COLORS.blue600} />
                  <Text style={styles.tripDetailLabel}>{item.label}</Text>
                </View>
                <View style={styles.tripDetailRight}>
                  {item.count && (
                    <View style={styles.countBadge}>
                      <Text style={styles.countText}>{item.count}</Text>
                    </View>
                  )}
                  <MaterialIcons name="chevron-right" size={16} color={COLORS.gray400} />
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Trip History */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Trips</Text>
          {[
            { destination: 'Barcelona, Spain', dates: 'Sep 2024', rating: 5 },
            { destination: 'Amsterdam, Netherlands', dates: 'Jul 2024', rating: 4 },
            { destination: 'Prague, Czech Republic', dates: 'May 2024', rating: 5 }
          ].map((trip, index) => (
            <TouchableOpacity key={index} style={styles.historyItem}>
              <View style={styles.historyContent}>
                <View style={styles.historyInfo}>
                  <Text style={styles.historyDestination}>{trip.destination}</Text>
                  <Text style={styles.historyDates}>{trip.dates}</Text>
                </View>
                <View style={styles.ratingContainer}>
                  {[...Array(trip.rating)].map((_, i) => (
                    <MaterialIcons key={i} name="star" size={14} color="#fbbf24" />
                  ))}
                </View>
              </View>
            </TouchableOpacity>
          ))}
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray100,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.gray900,
  },
  planButton: {
    borderRadius: 8,
    overflow: 'hidden',
  },
  planButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    gap: 4,
  },
  planButtonText: {
    color: COLORS.white,
    fontWeight: '500',
    fontSize: 14,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  section: {
    marginBottom: 24,
  },
  currentTripSection: {
    backgroundColor: 'rgba(206,142,245,0.2)',
    padding: 16,
    borderRadius: 7,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.gray900,
    marginBottom: 12,
  },
  toolsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  toolCard: {
    width: '47%',
    backgroundColor: 'rgba(142,180,245,0.2)',
    padding: 16,
    borderRadius: 7,
    alignItems: 'center',
  },
  toolIcon: {
    width: 48,
    height: 48,
    backgroundColor: 'rgba(234,88,12,0.1)',
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  toolTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.gray900,
    marginBottom: 4,
    textAlign: 'center',
  },
  toolDesc: {
    fontSize: 12,
    color: COLORS.gray600,
    textAlign: 'center',
  },
  tripDetailsList: {
    gap: 8,
  },
  tripDetailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
    backgroundColor: COLORS.gray50,
    borderRadius: 7,
  },
  tripDetailLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  tripDetailLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.gray900,
  },
  tripDetailRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  countBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: COLORS.gray100,
    borderRadius: 4,
  },
  countText: {
    fontSize: 12,
    color: COLORS.gray600,
  },
  historyItem: {
    backgroundColor: COLORS.white,
    borderRadius: 7,
    padding: 12,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  historyContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  historyInfo: {
    flex: 1,
  },
  historyDestination: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.gray900,
    marginBottom: 4,
  },
  historyDates: {
    fontSize: 14,
    color: COLORS.gray600,
  },
  ratingContainer: {
    flexDirection: 'row',
    gap: 2,
  },
});