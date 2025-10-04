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
  orange50: '#fff7ed',
  amber50: '#fffbeb',
  pink600: '#db2777',
  amber600: '#d97706',
};

export default function ProfileScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Profile Header */}
        <View style={styles.profileHeader}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>AT</Text>
          </View>
          <Text style={styles.profileName}>Alex Thompson</Text>
          <Text style={styles.profileSubtitle}>Wanderlust Explorer • Level 12</Text>
          
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={[styles.statNumber, { color: COLORS.primary }]}>24</Text>
              <Text style={styles.statLabel}>Countries</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={[styles.statNumber, { color: COLORS.pink600 }]}>1,250</Text>
              <Text style={styles.statLabel}>Points</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={[styles.statNumber, { color: COLORS.amber600 }]}>48</Text>
              <Text style={styles.statLabel}>Badges</Text>
            </View>
          </View>
        </View>

        {/* Quick Settings */}
        <View style={styles.quickSettingsCard}>
          <LinearGradient
            colors={[COLORS.orange50, COLORS.amber50]}
            style={styles.quickSettingsGradient}
          >
            <Text style={styles.sectionTitle}>Quick Settings</Text>
            {[
              { icon: 'notifications', label: 'Notifications', action: 'On' },
              { icon: 'security', label: 'Privacy', action: 'chevron' },
              { icon: 'help', label: 'Help & Support', action: 'chevron' },
              { icon: 'language', label: 'Language', action: 'English' }
            ].map((item, index) => (
              <TouchableOpacity key={index} style={styles.settingItem}>
                <View style={styles.settingLeft}>
                  <MaterialIcons name={item.icon as any} size={20} color={COLORS.gray600} />
                  <Text style={styles.settingLabel}>{item.label}</Text>
                </View>
                {item.action === 'chevron' ? (
                  <MaterialIcons name="chevron-right" size={16} color={COLORS.gray400} />
                ) : (
                  <Text style={styles.settingAction}>{item.action}</Text>
                )}
              </TouchableOpacity>
            ))}
          </LinearGradient>
        </View>

        {/* Travel Preferences */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Travel Preferences</Text>
          {[
            { icon: 'attach-money', label: 'Budget Range', value: 'Mid-range', iconColor: COLORS.primary },
            { icon: 'group', label: 'Travel Style', value: 'Cultural Explorer', iconColor: '#8b5cf6' },
            { icon: 'home', label: 'Accommodation', value: 'Hotels & B&Bs', iconColor: '#2563eb' },
            { icon: 'restaurant', label: 'Cuisine', value: 'Local & International', iconColor: COLORS.primary }
          ].map((pref, index) => (
            <TouchableOpacity key={index} style={styles.preferenceItem}>
              <View style={styles.preferenceLeft}>
                <MaterialIcons name={pref.icon as any} size={16} color={pref.iconColor} />
                <Text style={styles.preferenceLabel}>{pref.label}</Text>
              </View>
              <Text style={styles.preferenceValue}>{pref.value}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Account Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account</Text>
          {[
            { icon: 'edit', label: 'Edit Profile', color: COLORS.gray600 },
            { icon: 'backup', label: 'Backup & Sync', color: COLORS.gray600 },
            { icon: 'share', label: 'Invite Friends', color: COLORS.primary },
            { icon: 'rate-review', label: 'Rate Wayora', color: COLORS.gray600 },
            { icon: 'logout', label: 'Sign Out', color: '#dc2626' }
          ].map((action, index) => (
            <TouchableOpacity key={index} style={styles.actionItem}>
              <View style={styles.actionLeft}>
                <MaterialIcons name={action.icon as any} size={20} color={action.color} />
                <Text style={[styles.actionLabel, { color: action.color }]}>{action.label}</Text>
              </View>
              <MaterialIcons name="chevron-right" size={16} color={COLORS.gray400} />
            </TouchableOpacity>
          ))}
        </View>

        {/* App Version */}
        <View style={styles.versionContainer}>
          <Text style={styles.versionText}>Wayora v1.0.0</Text>
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
  content: {
    flex: 1,
    padding: 16,
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 24,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  avatarText: {
    color: COLORS.white,
    fontWeight: 'bold',
    fontSize: 24,
  },
  profileName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.gray900,
    marginBottom: 4,
  },
  profileSubtitle: {
    fontSize: 14,
    color: COLORS.gray600,
    marginBottom: 12,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 16,
  },
  statItem: {
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.7)',
    borderRadius: 7,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 1,
    elevation: 1,
  },
  statNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: COLORS.gray600,
  },
  quickSettingsCard: {
    borderRadius: 7,
    overflow: 'hidden',
    marginBottom: 24,
  },
  quickSettingsGradient: {
    padding: 16,
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
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.6)',
    borderRadius: 7,
    padding: 12,
    marginBottom: 8,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  settingLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.gray900,
  },
  settingAction: {
    fontSize: 14,
    color: COLORS.gray600,
  },
  preferenceItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.6)',
    borderRadius: 7,
    padding: 12,
    marginBottom: 8,
  },
  preferenceLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  preferenceLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.gray900,
  },
  preferenceValue: {
    fontSize: 14,
    color: COLORS.gray600,
  },
  actionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  actionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  actionLabel: {
    fontSize: 14,
    fontWeight: '500',
  },
  versionContainer: {
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 32,
  },
  versionText: {
    fontSize: 12,
    color: COLORS.gray400,
  },
});