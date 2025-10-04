import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Image,
  StatusBar,
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
  red50: '#fef2f2',
  red600: '#dc2626',
};

export default function HomeScreen() {
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);

  const currentTrip = {
    destination: "Paris, France",
    dates: "Dec 15-22, 2024",
    daysLeft: 12,
    budget: 2500,
    spent: 450,
    image: "https://images.unsplash.com/photo-1646494836291-dccc011e3d83"
  };

  const quickActions = [
    { icon: 'book', label: 'Trip Atlas', color: COLORS.blue600 },
    { icon: 'flash-on', label: 'Post Generator', color: COLORS.orange600 },
    { icon: 'event-available', label: 'Bookings', color: COLORS.green600 },
    { icon: 'location-history', label: 'Location History', color: '#8b5cf6 ' },
    { icon: 'emergency', label: 'Emergency Finder', color: COLORS.red600 }
  ];

  const upcomingTrips = [
    {
      destination: "Tokyo, Japan",
      dates: "Jan 10-20, 2025",
      status: "Planning"
    },
    {
      destination: "Swiss Alps",
      dates: "Mar 5-12, 2025",
      status: "Saved"
    }
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />
      
      {/* Background */}
      <LinearGradient
        colors={[COLORS.orange50, COLORS.white]}
        style={styles.backgroundGradient}
      />

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.welcomeText}>Welcome back!</Text>
          <Text style={styles.nameText}>Alex Thompson</Text>
        </View>
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.notificationButton}>
            <MaterialIcons name="notifications" size={24} color={COLORS.red600} />
          </TouchableOpacity>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>AT</Text>
          </View>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Current Trip Card */}
        <View style={styles.currentTripCard}>
          <Image
            source={{ uri: currentTrip.image }}
            style={styles.tripImage}
          />
          <LinearGradient
            colors={['transparent', 'rgba(0,0,0,0.6)']}
            style={styles.tripOverlay}
          />
          <View style={styles.tripContent}>
            <View style={styles.tripHeader}>
              <MaterialIcons name="location-on" size={16} color={COLORS.white} />
              <Text style={styles.tripDestination}>{currentTrip.destination}</Text>
            </View>
            <Text style={styles.tripDates}>{currentTrip.dates}</Text>
            <Text style={styles.tripCountdown}>{currentTrip.daysLeft} days to go!</Text>
          </View>
        </View>

        {/* Budget Progress */}
        <View style={styles.budgetCard}>
          <LinearGradient
            colors={[COLORS.green50, COLORS.blue50]}
            style={styles.budgetGradient}
          >
            <View style={styles.budgetHeader}>
              <Text style={styles.budgetLabel}>Budget Progress</Text>
              <Text style={styles.budgetAmount}>${currentTrip.spent} / ${currentTrip.budget}</Text>
            </View>
            <View style={styles.progressBar}>
              <View 
                style={[
                  styles.progressFill, 
                  { width: `${(currentTrip.spent / currentTrip.budget) * 100}%` }
                ]} 
              />
            </View>
          </LinearGradient>
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.quickActionsGrid}>
            {quickActions.slice(0, 4).map((action, index) => (
              <TouchableOpacity key={index} style={styles.quickActionCard}>
                <View style={[styles.quickActionIcon, { backgroundColor: `${action.color}20` }]}>
                  <MaterialIcons name={action.icon as any} size={24} color={action.color} />
                </View>
                <Text style={styles.quickActionLabel}>{action.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Upcoming Trips */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Upcoming Trips</Text>
            <TouchableOpacity style={styles.addButton}>
              <MaterialIcons name="add" size={16} color={COLORS.primary} />
              <Text style={styles.addButtonText}>Add Trip</Text>
            </TouchableOpacity>
          </View>
          
          {upcomingTrips.map((trip, index) => (
            <TouchableOpacity key={index} style={styles.tripItem}>
              <View style={styles.tripItemContent}>
                <View style={styles.tripItemInfo}>
                  <Text style={styles.tripItemDestination}>{trip.destination}</Text>
                  <Text style={styles.tripItemDates}>{trip.dates}</Text>
                </View>
                <View style={styles.tripItemRight}>
                  <View style={styles.statusBadge}>
                    <Text style={styles.statusText}>{trip.status}</Text>
                  </View>
                  <MaterialIcons name="chevron-right" size={20} color={COLORS.gray400} />
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Floating Chat Button */}
      <TouchableOpacity
        style={styles.chatButton}
        onPress={() => setIsChatbotOpen(true)}
      >
        <LinearGradient
          colors={[COLORS.primary, COLORS.secondary]}
          style={styles.chatButtonGradient}
        >
          <MaterialIcons name="chat" size={24} color={COLORS.white} />
        </LinearGradient>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  backgroundGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 200,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    paddingTop: 8,
  },
  headerLeft: {
    flex: 1,
  },
  welcomeText: {
    fontSize: 14,
    color: COLORS.gray600,
    marginBottom: 4,
  },
  nameText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.gray900,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  notificationButton: {
    padding: 8,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: COLORS.white,
    fontWeight: 'bold',
    fontSize: 14,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  currentTripCard: {
    height: 160,
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 16,
  },
  tripImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  tripOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '100%',
  },
  tripContent: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    right: 16,
  },
  tripHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  tripDestination: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.white,
    marginLeft: 4,
  },
  tripDates: {
    fontSize: 14,
    color: COLORS.white,
    opacity: 0.9,
    marginBottom: 4,
  },
  tripCountdown: {
    fontSize: 12,
    color: COLORS.white,
    opacity: 0.8,
  },
  budgetCard: {
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 24,
  },
  budgetGradient: {
    padding: 16,
  },
  budgetHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  budgetLabel: {
    fontSize: 14,
    color: COLORS.gray600,
  },
  budgetAmount: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.gray900,
  },
  progressBar: {
    height: 8,
    backgroundColor: COLORS.gray100,
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: COLORS.gray900,
    borderRadius: 4,
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.gray900,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  addButtonText: {
    fontSize: 14,
    color: COLORS.primary,
    fontWeight: '500',
  },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  quickActionCard: {
    width: '47%',
    backgroundColor: 'rgba(142,180,245,0.2)',
    padding: 16,
    borderRadius: 7,
    alignItems: 'center',
    gap: 8,
  },
  quickActionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quickActionLabel: {
    fontSize: 12,
    fontWeight: '500',
    color: COLORS.gray900,
    textAlign: 'center',
  },
  tripItem: {
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
  tripItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  tripItemInfo: {
    flex: 1,
  },
  tripItemDestination: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.gray900,
    marginBottom: 4,
  },
  tripItemDates: {
    fontSize: 14,
    color: COLORS.gray600,
  },
  tripItemRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: COLORS.gray100,
    borderRadius: 4,
  },
  statusText: {
    fontSize: 12,
    color: COLORS.gray600,
  },
  chatButton: {
    position: 'absolute',
    bottom: 80,
    right: 16,
    width: 48,
    height: 48,
    borderRadius: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  chatButtonGradient: {
    width: '100%',
    height: '100%',
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
});