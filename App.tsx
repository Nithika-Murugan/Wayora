import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
  StatusBar,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { MaterialIcons } from '@expo/vector-icons';
import ChatbotDialogRN from './ChatbotDialogRN';

const { width, height } = Dimensions.get('window');

type Screen = 'home' | 'explore' | 'trips' | 'budget' | 'profile';

const COLORS = {
  // Primary colors for clean modern theme
  primary: '#1A1A1A',        // Dark charcoal/black for main text
  background: '#FEFEFE',     // Off-white background
  surface: '#F8F8F8',       // Light surface color
  accent: '#E8D5FF',         // Light lilac accent
  accentSecondary: '#D5F2E8', // Subtle green accent
  accentTertiary: '#E0F4FF', // Light blue accent
  text: '#2D2D2D',          // Primary text color
  textSecondary: '#6B6B6B',  // Secondary text color
  textMuted: '#9B9B9B',     // Muted text color
  border: '#E5E5E5',        // Light border color
  white: '#FFFFFF',         // Pure white
};

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('home');
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const [isOfflineMode, setIsOfflineMode] = useState(false);

  const upcomingTrips = [
    {
      destination: "Sydney, Australia",
      dates: "Oct 5-19, 2025",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400",
      status: "Planning",
      price: 850
    },
    {
      destination: "Swiss Alps",
      dates: "Mar 5-12, 2025", 
      image: "https://images.unsplash.com/photo-1615472767332-e5615c7e617a?w=400",
      status: "Saved",
      price: 1200
    }
  ];

  const quickActions = [
    { icon: 'view-list' as const, label: 'Itinerary Builder', color: COLORS.accentSecondary },
    { icon: 'share' as const, label: 'Share Journey', color: COLORS.accent },
    { icon: 'account-balance-wallet' as const, label: 'Expenses', color: COLORS.accentTertiary },
    { icon: 'camera-alt' as const, label: 'Travel Journal', color: COLORS.primary },
    { icon: 'people' as const, label: 'Local Guides', color: COLORS.accent },
  ];

  const renderHomeScreen = () => (
    <ScrollView
      style={styles.screenContainer}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={[styles.scrollContent, { paddingBottom: 120 }]}
    >
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>Wayonara</Text>
          <Text style={styles.headerSubtitle}>Greetings, adventurer!</Text>
          <View style={styles.statusIndicator}>
            <View style={styles.statusDot} />
            <Text style={styles.statusText}>Maya Singh (MS)</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.notificationButton}>
          <MaterialIcons name="notifications" size={24} color={COLORS.white} />
        </TouchableOpacity>
      </View>

      {/* Featured Adventure Card */}
      <LinearGradient
        colors={[COLORS.accent, COLORS.accentTertiary]}
        style={styles.featuredCard}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.featuredCardContent}>
          <View style={styles.premiumBadge}>
            <MaterialIcons name="stars" size={16} color={COLORS.accentTertiary} />
            <Text style={styles.premiumText}>Premium Experience</Text>
          </View>
          <Text style={styles.featuredTitle}>Unlock Exclusive</Text>
          <Text style={styles.featuredTitle}>Travel Destinations</Text>
          <TouchableOpacity style={styles.startButton}>
            <Text style={styles.startButtonText}>Start Journey</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <BlurView intensity={80} style={styles.searchBar}>
          <View style={styles.searchIconContainer}>
            <MaterialIcons name="location-on" size={20} color={COLORS.white} />
          </View>
          <TextInput
            placeholder="Where would you like to go?"
            placeholderTextColor={COLORS.textMuted}
            style={styles.searchInput}
          />
          <TouchableOpacity style={styles.searchButton}>
            <Text style={styles.searchButtonText}>Search</Text>
          </TouchableOpacity>
        </BlurView>
      </View>

      {/* Sync Status */}
      <BlurView intensity={80} style={styles.syncCard}>
        <View style={styles.syncContent}>
          <View style={styles.syncLeft}>
            <View style={[styles.syncIcon, { backgroundColor: isOfflineMode ? 'rgba(153, 193, 214, 0.55)' : 'rgba(135, 192, 150, 0.6)' }]}>
              <MaterialIcons
                name={isOfflineMode ? "wifi-off" : "cloud-upload"} 
                size={20} 
                color={isOfflineMode ? COLORS.accentTertiary : COLORS.accentSecondary} 
              />
            </View>
            <View>
              <Text style={styles.syncTitle}>
                {isOfflineMode ? 'Offline Mode Active' : 'All Data Synced'}
              </Text>
              <Text style={styles.syncSubtitle}>
                Last sync: {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </Text>
            </View>
          </View>
          <TouchableOpacity 
            style={styles.syncButton}
            onPress={() => setIsOfflineMode(!isOfflineMode)}
          >
            <MaterialIcons name={isOfflineMode ? "wifi" : "file-download"} size={16} color={COLORS.white} />
          </TouchableOpacity>
        </View>
      </BlurView>

      {/* Quick Actions */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.quickActionsGrid}>
          {quickActions.map((action, index) => (
            <TouchableOpacity key={index} style={styles.actionCard}>
              <BlurView intensity={80} style={styles.actionCardContent}>
                <View style={[styles.actionIcon, { backgroundColor: action.color }]}>
                  <MaterialIcons name={action.icon} size={24} color={COLORS.white} />
                </View>
                <Text style={styles.actionLabel}>{action.label}</Text>
              </BlurView>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Featured Destinations */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Trending Destinations</Text>
        <View style={styles.destinationsGrid}>
          {upcomingTrips.map((trip, index) => (
            <TouchableOpacity key={index} style={styles.destinationCard}>
              <BlurView intensity={80} style={styles.destinationCardContent}>
                <View style={styles.destinationImageContainer}>
                  <Image source={{ uri: trip.image }} style={styles.destinationImage} />
                  <LinearGradient
                    colors={['transparent', 'rgba(0,0,0,0.6)']}
                    style={styles.destinationOverlay}
                  />
                  <TouchableOpacity style={styles.favoriteButton}>
                    <MaterialIcons name="star" size={16} color={COLORS.accentTertiary} />
                  </TouchableOpacity>
                  <View style={styles.destinationInfo}>
                    <Text style={styles.destinationName}>{trip.destination}</Text>
                    <Text style={styles.destinationDates}>{trip.dates}</Text>
                  </View>
                </View>
                <View style={styles.destinationFooter}>
                  <Text style={styles.destinationPrice}>${trip.price}</Text>
                                    <View style={[styles.statusBadge, { backgroundColor: COLORS.accent }]}>
                    <Text style={styles.statusBadgeText}>{trip.status}</Text>
                  </View>
                </View>
              </BlurView>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </ScrollView>
  );

  const renderCurrentScreen = () => {
    switch (currentScreen) {
      case 'home': return renderHomeScreen();
      case 'explore': return renderExploreScreen();
      case 'trips': return renderTripsScreen();
      case 'budget': return renderBudgetScreen();
      case 'profile': return renderProfileScreen();
      default: return renderHomeScreen();
    }
  };

  const renderExploreScreen = () => (
    <View style={styles.screenContainer}>
      <Text style={styles.screenTitle}>Explore</Text>
      <Text style={styles.screenSubtitle}>Coming soon...</Text>
    </View>
  );

  const renderTripsScreen = () => {
    const currentTrip = {
      id: 1,
      name: "NYC Explorer",
      destination: "New York City, USA",
      startDate: "2025-03-10",
      endDate: "2025-03-18",
      daysRemaining: 45,
      progress: 0.2125,
      itinerary: [
        {
          day_number: 1,
          date: "2025-03-10",
          activities: [
            { time: "09:00", name: "Arrive at JFK Airport", location: "JFK Airport", booking_ref: "DL123" },
            { time: "14:00", name: "Check-in Hotel", location: "Times Square Hotel", booking_ref: "TS456" },
            { time: "18:00", name: "Statue of Liberty Ferry", location: "Battery Park", booking_ref: null }
          ],
          daily_notes: "First day in NYC - iconic sights and settling in"
        },
        {
          day_number: 2,
          date: "2025-03-11", 
          activities: [
            { time: "09:00", name: "Central Park Walk", location: "Central Park", booking_ref: "CP789" },
            { time: "13:00", name: "Lunch in Little Italy", location: "Little Italy", booking_ref: null },
            { time: "15:00", name: "Brooklyn Bridge Walk", location: "Brooklyn Bridge", booking_ref: null }
          ],
          daily_notes: "Exploring NYC's famous landmarks"
        }
      ],
      bookings: {
        flights: [
          { type: "Departure", airline: "Delta", flight: "DL123", date: "Mar 10", time: "08:30", from: "LAX", to: "JFK" },
          { type: "Return", airline: "Delta", flight: "DL124", date: "Mar 18", time: "20:00", from: "JFK", to: "LAX" }
        ],
        hotels: [
          { name: "Times Square Hotel", checkin: "Mar 10", checkout: "Mar 15", nights: 5, room: "City View Suite" },
          { name: "Brooklyn Heights Inn", checkin: "Mar 15", checkout: "Mar 18", nights: 3, room: "Harbor View" }
        ],
        activities: [
          { name: "Statue of Liberty Tour", date: "Mar 11", time: "10:00", price: "$25" },
          { name: "Empire State Building", date: "Mar 12", time: "14:00", price: "$45" }
        ]
      },
      journal: [
        { type: "photo", url: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=300", caption: "Amazing view from Brooklyn Bridge!", date: "Mar 11" },
        { type: "video", url: "https://images.unsplash.com/photo-1518391846015-55a9cc003b25?w=300", caption: "Sunrise over Manhattan", date: "Mar 10" }
      ]
    };

    return (
      <ScrollView 
        style={styles.screenContainer}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[styles.scrollContent, { paddingBottom: 120 }]}
      >
        {/* Emergency Services Button */}
        <TouchableOpacity style={styles.emergencyButton}>
          <MaterialIcons name="warning" size={20} color={COLORS.white} />
          <Text style={styles.emergencyText}>Emergency Services</Text>
          <MaterialIcons name="phone" size={16} color={COLORS.white} />
        </TouchableOpacity>

        {/* Current Trip Overview */}
        <LinearGradient
          colors={[COLORS.primary, COLORS.accentSecondary]}
          style={styles.tripOverviewCard}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <View style={styles.tripHeader}>
            <Text style={styles.tripName}>{currentTrip.name}</Text>
            <Text style={styles.tripDestination}>{currentTrip.destination}</Text>
          </View>
          
          <View style={styles.tripProgress}>
            <Text style={styles.countdownText}>{currentTrip.daysRemaining} days to go</Text>
            <View style={styles.progressBarContainer}>
              <View style={[styles.progressBar, { width: `${currentTrip.progress * 100}%` }]} />
            </View>
            <Text style={styles.tripDates}>{currentTrip.startDate} - {currentTrip.endDate}</Text>
            <Text style={styles.budgetText}>$850 spent / $4000 total</Text>
          </View>
        </LinearGradient>

        {/* Interactive Itinerary */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Daily Itinerary</Text>
          {currentTrip.itinerary.map((day, index) => (
            <View key={index} style={styles.dayCard}>
              <BlurView intensity={80} style={styles.dayCardContent}>
                <View style={styles.dayHeader}>
                  <View style={styles.dayNumber}>
                    <Text style={styles.dayNumberText}>Day {day.day_number}</Text>
                  </View>
                  <Text style={styles.dayDate}>{new Date(day.date).toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}</Text>
                </View>
                
                <View style={styles.activitiesList}>
                  {day.activities.map((activity, actIndex) => (
                    <View key={actIndex} style={styles.activityItem}>
                      <View style={styles.activityTime}>
                        <Text style={styles.timeLabel}>{activity.time}</Text>
                      </View>
                      <View style={styles.activityDetails}>
                        <Text style={styles.activityName}>{activity.name}</Text>
                        <Text style={styles.activityLocation}>{activity.location}</Text>
                        {activity.booking_ref && (
                          <Text style={styles.bookingRef}>Ref: {activity.booking_ref}</Text>
                        )}
                      </View>
                    </View>
                  ))}
                </View>
                
                {day.daily_notes && (
                  <View style={styles.notesSection}>
                    <MaterialIcons name="note" size={16} color={COLORS.accentSecondary} />
                    <Text style={styles.notesText}>{day.daily_notes}</Text>
                  </View>
                )}
              </BlurView>
            </View>
          ))}
        </View>

        {/* Quick Access to Bookings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Bookings Overview</Text>
          
          {/* Flights */}
          <View style={styles.bookingCategory}>
            <View style={styles.bookingHeader}>
              <MaterialIcons name="flight" size={20} color={COLORS.accentSecondary} />
              <Text style={styles.bookingCategoryTitle}>Flights</Text>
            </View>
            {currentTrip.bookings.flights.map((flight, index) => (
              <BlurView key={index} intensity={80} style={styles.bookingCard}>
                <View style={styles.bookingInfo}>
                  <Text style={styles.bookingPrimary}>{flight.airline} {flight.flight}</Text>
                  <Text style={styles.bookingSecondary}>{flight.from} → {flight.to}</Text>
                  <Text style={styles.bookingTime}>{flight.date} at {flight.time}</Text>
                </View>
              </BlurView>
            ))}
          </View>

          {/* Hotels */}
          <View style={styles.bookingCategory}>
            <View style={styles.bookingHeader}>
              <MaterialIcons name="hotel" size={20} color={COLORS.accent} />
              <Text style={styles.bookingCategoryTitle}>Hotels</Text>
            </View>
            {currentTrip.bookings.hotels.map((hotel, index) => (
              <BlurView key={index} intensity={80} style={styles.bookingCard}>
                <View style={styles.bookingInfo}>
                  <Text style={styles.bookingPrimary}>{hotel.name}</Text>
                  <Text style={styles.bookingSecondary}>{hotel.room} • {hotel.nights} nights</Text>
                  <Text style={styles.bookingTime}>{hotel.checkin} - {hotel.checkout}</Text>
                </View>
              </BlurView>
            ))}
          </View>

          {/* Activities */}
          <View style={styles.bookingCategory}>
            <View style={styles.bookingHeader}>
              <MaterialIcons name="local-activity" size={20} color={COLORS.accentTertiary} />
              <Text style={styles.bookingCategoryTitle}>Activities</Text>
            </View>
            {currentTrip.bookings.activities.map((activity, index) => (
              <BlurView key={index} intensity={80} style={styles.bookingCard}>
                <View style={styles.bookingInfo}>
                  <Text style={styles.bookingPrimary}>{activity.name}</Text>
                  <Text style={styles.bookingSecondary}>{activity.date} at {activity.time}</Text>
                  <Text style={styles.bookingPrice}>{activity.price}</Text>
                </View>
              </BlurView>
            ))}
          </View>
        </View>

        {/* Trip Journal/Multimedia Feed */}
        <View style={styles.section}>
          <View style={styles.journalHeader}>
            <Text style={styles.sectionTitle}>Trip Journal</Text>
            <TouchableOpacity style={styles.addMediaButton}>
              <MaterialIcons name="add-a-photo" size={20} color={COLORS.white} />
            </TouchableOpacity>
          </View>
          
          <View style={styles.journalGrid}>
            {currentTrip.journal.map((item, index) => (
              <TouchableOpacity key={index} style={styles.journalItem}>
                <Image source={{ uri: item.url }} style={styles.journalMedia} />
                <LinearGradient
                  colors={['transparent', 'rgba(0,0,0,0.8)']}
                  style={styles.journalOverlay}
                >
                  <View style={styles.journalInfo}>
                    <MaterialIcons 
                      name={item.type === 'photo' ? 'photo' : 'videocam'} 
                      size={16} 
                      color={COLORS.white} 
                    />
                    <Text style={styles.journalDate}>{item.date}</Text>
                  </View>
                  <Text style={styles.journalCaption}>{item.caption}</Text>
                </LinearGradient>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    );
  };

  const renderBudgetScreen = () => (
    <View style={styles.screenContainer}>
      <Text style={styles.screenTitle}>Budget</Text>
      <Text style={styles.screenSubtitle}>Coming soon...</Text>
    </View>
  );

  const renderProfileScreen = () => (
    <View style={styles.screenContainer}>
      <Text style={styles.screenTitle}>Profile</Text>
      <Text style={styles.screenSubtitle}>Coming soon...</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />
      
      {/* Background */}
      <View style={styles.backgroundGradient}>
        {/* Safe Area for Status Bar */}
        <SafeAreaView style={styles.safeAreaTop}>
          <View style={styles.statusBar}>
            <Text style={styles.timeText}>09:41</Text>
            <View style={styles.statusIcons}>
              <View style={styles.signalBars}>
                {[1,2,3,4].map(i => <View key={i} style={styles.signalBar} />)}
              </View>
              <MaterialIcons name="wifi" size={16} color={COLORS.white} />
              <View style={styles.battery}>
                <View style={styles.batteryLevel} />
              </View>
            </View>
          </View>
        </SafeAreaView>

        {/* Main Content */}
        <View style={styles.mainContent}>
          {renderCurrentScreen()}
        </View>

        {/* Floating Chat Button */}
        <TouchableOpacity 
          style={styles.chatButton}
          onPress={() => setIsChatbotOpen(true)}
        >
          <LinearGradient
            colors={[COLORS.accentTertiary, COLORS.accent]}
            style={styles.chatButtonGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <MaterialIcons name="chat" size={28} color={COLORS.primary} />
          </LinearGradient>
        </TouchableOpacity>

        {/* Bottom Navigation - Always Visible */}
        <View style={styles.bottomNavContainer}>
          <SafeAreaView style={styles.safeAreaBottom}>
            <BlurView intensity={80} style={styles.bottomNav}>
              <View style={styles.navContent}>
                {[
                  { id: 'home', icon: 'home' as const, label: 'Home' },
                  { id: 'trips', icon: 'map' as const, label: 'Trips' },
                  { id: 'budget', icon: 'account-balance-wallet' as const, label: 'Budget' },
                  { id: 'explore', icon: 'explore' as const, label: 'Explore' },
                  { id: 'profile', icon: 'person' as const, label: 'Profile' }
                ].map((tab) => (
                  <TouchableOpacity
                    key={tab.id}
                    style={[
                      styles.navTab,
                      currentScreen === tab.id && { backgroundColor: COLORS.accent }
                    ]}
                    onPress={() => setCurrentScreen(tab.id as Screen)}
                  >
                    <MaterialIcons 
                      name={tab.icon} 
                      size={20} 
                      color={currentScreen === tab.id ? COLORS.text : COLORS.textMuted} 
                    />
                  </TouchableOpacity>
                ))}
              </View>
            </BlurView>
          </SafeAreaView>
        </View>

        {/* Chatbot Dialog */}
        <ChatbotDialogRN 
          isOpen={isChatbotOpen} 
          onClose={() => setIsChatbotOpen(false)} 
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  backgroundGradient: {
    flex: 1,
    backgroundColor: COLORS.background,
    position: 'relative',
  },
  safeAreaTop: {
    backgroundColor: 'transparent',
  },
  safeAreaBottom: {
    backgroundColor: 'transparent',
  },
  floatingOrb: {
    position: 'absolute',
    width: 200,
    height: 200,
    borderRadius: 100,
    opacity: 0.3,
  },
  orb1: {
    top: -80,
    right: -80,
  },
  orb2: {
    bottom: -80,
    left: -80,
  },
  orb3: {
    top: '50%',
    left: '50%',
    transform: [{ translateX: -100 }, { translateY: -100 }],
  },
  statusBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 8,
    backgroundColor: COLORS.white,
    minHeight: 44,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  timeText: {
    color: COLORS.primary,
    fontSize: 14,
    fontWeight: '600',
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
  },
  statusIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  signalBars: {
    flexDirection: 'row',
    gap: 2,
  },
  signalBar: {
    width: 3,
    height: 12,
    backgroundColor: COLORS.primary,
    borderRadius: 1,
  },
  battery: {
    width: 24,
    height: 12,
    borderWidth: 1,
    borderColor: COLORS.primary,
    borderRadius: 3,
    padding: 1,
  },
  batteryLevel: {
    flex: 1,
    backgroundColor: COLORS.primary,
    borderRadius: 1,
  },
  mainContent: {
    flex: 1,
    paddingBottom: 0,
  },
  screenContainer: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  scrollContent: {
    paddingBottom: Platform.OS === 'ios' ? 100 : 90,
    flexGrow: 1,
  },
  screenTitle: {
    fontSize: 32,
    fontWeight: '800',
    color: COLORS.primary,
    textAlign: 'center',
    marginTop: 100,
    letterSpacing: 0.5,
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
  },
  screenSubtitle: {
    fontSize: 18,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginTop: 20,
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 24,
    paddingTop: 8,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: '800',
    color: COLORS.primary,
    lineHeight: 40,
    letterSpacing: 0.5,
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
  },
  headerSubtitle: {
    fontSize: 32,
    fontWeight: '300',
    color: COLORS.textSecondary,
    lineHeight: 40,
    letterSpacing: 0.3,
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
  },
  statusIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    gap: 8,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.accentSecondary,
  },
  statusText: {
    color: COLORS.textSecondary,
    fontSize: 14,
    fontWeight: '500',
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
  },
  notificationButton: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  featuredCard: {
    borderRadius: 16,
    padding: 32,
    marginBottom: 32,
    overflow: 'hidden',
    backgroundColor: COLORS.accent,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 4,
  },
  featuredCardContent: {
    position: 'relative',
    zIndex: 2,
  },
  premiumBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  premiumText: {
    color: COLORS.primary,
    fontSize: 14,
    fontWeight: '600',
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
  },
  featuredTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: COLORS.primary,
    lineHeight: 34,
    letterSpacing: 0.5,
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
  },
  startButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 16,
    alignSelf: 'flex-start',
    marginTop: 24,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 6,
  },
  startButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '600',
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
  },
  searchContainer: {
    marginBottom: 20,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderRadius: 16,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
    gap: 16,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  searchIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: COLORS.accentTertiary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchInput: {
    flex: 1,
    color: COLORS.text,
    fontSize: 16,
    fontWeight: '500',
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
  },
  searchButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
  },
  searchButtonText: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: '600',
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
  },
  syncCard: {
    padding: 20,
    borderRadius: 16,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 32,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  syncContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  syncLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  syncIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  syncTitle: {
    color: COLORS.primary,
    fontSize: 16,
    fontWeight: '600',
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
  },
  syncSubtitle: {
    color: COLORS.textSecondary,
    fontSize: 14,
    marginTop: 4,
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
  },
  syncButton: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: COLORS.primary,
    marginBottom: 20,
    letterSpacing: 0.3,
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
  },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
  },
  actionCard: {
    width: (width - 56) / 2,
    maxWidth: 160,
  },
  actionCardContent: {
    padding: 20,
    borderRadius: 16,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
    minHeight: 100,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  actionIcon: {
    width: 48,
    height: 48,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  actionLabel: {
    color: COLORS.primary,
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
  },
  destinationsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
  },
  destinationCard: {
    width: (width - 56) / 2,
    maxWidth: 160,
  },
  destinationCardContent: {
    borderRadius: 16,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
    overflow: 'hidden',
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  destinationImageContainer: {
    position: 'relative',
    height: 120,
  },
  destinationImage: {
    width: '100%',
    height: '100%',
  },
  destinationOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '100%',
  },
  favoriteButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: COLORS.accent,
    borderWidth: 1,
    borderColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  destinationInfo: {
    position: 'absolute',
    bottom: 12,
    left: 12,
  },
  destinationName: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: 'bold',
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
  },
  destinationDates: {
    color: `${COLORS.white}CC`,
    fontSize: 12,
    marginTop: 2,
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
  },
  destinationFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  destinationPrice: {
    color: COLORS.text,
    fontSize: 20,
    fontWeight: 'bold',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusBadgeText: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: '500',
  },
  chatButton: {
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? 140 : 120,
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 16,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
    zIndex: 1000,
  },
  chatButtonGradient: {
    width: '100%',
    height: '100%',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
  },
  bottomNavContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
  },
  bottomNav: {
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
    overflow: 'hidden',
    marginHorizontal: 16,
    marginBottom: 0,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 8,
  },
  navContent: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
    minHeight: 64,
  },
  navTab: {
    width: 44,
    height: 44,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  // Trip Page Styles
  emergencyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E74C3C',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 16,
    marginBottom: 24,
    gap: 12,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  emergencyText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '600',
    flex: 1,
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
  },
  tripOverviewCard: {
    padding: 32,
    borderRadius: 16,
    marginBottom: 32,
    backgroundColor: COLORS.accent,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  tripHeader: {
    marginBottom: 24,
  },
  tripName: {
    fontSize: 28,
    fontWeight: '800',
    color: COLORS.primary,
    marginBottom: 8,
    letterSpacing: 0.5,
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
  },
  tripDestination: {
    fontSize: 16,
    color: COLORS.textSecondary,
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
  },
  tripProgress: {
    alignItems: 'center',
  },
  countdownText: {
    fontSize: 20,
    fontWeight: '600',
    color: COLORS.primary,
    marginBottom: 16,
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
  },
  progressBarContainer: {
    width: '100%',
    height: 8,
    backgroundColor: COLORS.border,
    borderRadius: 4,
    marginBottom: 12,
  },
  progressBar: {
    height: '100%',
    backgroundColor: COLORS.primary,
    borderRadius: 4,
  },
  tripDates: {
    fontSize: 14,
    color: COLORS.textSecondary,
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
  },
  dayCard: {
    marginBottom: 16,
  },
  dayCardContent: {
    padding: 20,
    borderRadius: 16,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  dayHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 12,
  },
  dayNumber: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.accent,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dayNumberText: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: 'bold',
  },
  dayDate: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text,
    flex: 1,
  },
  activitiesList: {
    gap: 12,
  },
  activityItem: {
    flexDirection: 'row',
    gap: 12,
  },
  activityTime: {
    width: 60,
    alignItems: 'center',
  },
  timeLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.textSecondary,
    backgroundColor: COLORS.surface,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  activityDetails: {
    flex: 1,
  },
  activityName: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 2,
  },
  activityLocation: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginBottom: 2,
  },
  bookingRef: {
    fontSize: 10,
    color: COLORS.textSecondary,
    backgroundColor: COLORS.surface,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    alignSelf: 'flex-start',
  },
  notesSection: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 12,
    padding: 12,
    backgroundColor: COLORS.surface,
    borderRadius: 8,
    gap: 8,
  },
  notesText: {
    fontSize: 12,
    color: COLORS.textSecondary,
    fontStyle: 'italic',
    flex: 1,
  },
  bookingCategory: {
    marginBottom: 20,
  },
  bookingHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 8,
  },
  bookingCategoryTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text,
  },
  bookingCard: {
    padding: 16,
    borderRadius: 16,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 12,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  bookingInfo: {
    gap: 4,
  },
  bookingPrimary: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.text,
  },
  bookingSecondary: {
    fontSize: 12,
    color: COLORS.textSecondary,
  },
  bookingTime: {
    fontSize: 11,
    color: COLORS.textMuted,
  },
  bookingPrice: {
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORS.accent,
    alignSelf: 'flex-end',
  },
  journalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  addMediaButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: COLORS.accent,
    justifyContent: 'center',
    alignItems: 'center',
  },
  journalGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  journalItem: {
    width: (width - 56) / 2,
    height: 120,
    borderRadius: 12,
    overflow: 'hidden',
  },
  journalMedia: {
    width: '100%',
    height: '100%',
  },
  journalOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '60%',
    padding: 8,
    justifyContent: 'space-between',
  },
  journalInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  journalDate: {
    fontSize: 10,
    color: COLORS.white,
  },
  journalCaption: {
    fontSize: 11,
    color: COLORS.white,
    fontWeight: '500',
  },
  budgetText: {
    fontSize: 14,
    color: COLORS.textSecondary,
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
    marginTop: 8,
  },
});