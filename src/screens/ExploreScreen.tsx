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
  yellow500: '#eab308',
  orange50: '#fff7ed',
  amber50: '#fffbeb',
};

export default function ExploreScreen() {
  const exploriaChallenges = [
    { title: 'Hidden Gem Hunter', progress: 75, points: 150, icon: 'explore' },
    { title: 'Budget Master', progress: 60, points: 120, icon: 'attach-money' },
    { title: 'Photo Explorer', progress: 90, points: 200, icon: 'camera-alt' },
    { title: 'Cultural Connector', progress: 45, points: 80, icon: 'public' }
  ];

  const recentAchievements = [
    { title: 'First Check-in', icon: 'location-on', earned: '2 days ago' },
    { title: 'Budget Saver', icon: 'attach-money', earned: '1 week ago' },
    { title: 'Photo Pro', icon: 'camera-alt', earned: '2 weeks ago' }
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Exploria</Text>
        <View style={styles.pointsContainer}>
          <MaterialIcons name="emoji-events" size={20} color={COLORS.yellow500} />
          <Text style={styles.pointsText}>1,250 pts</Text>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Level Progress */}
        <View style={styles.levelCard}>
          <LinearGradient
            colors={[COLORS.orange50, COLORS.amber50]}
            style={styles.levelGradient}
          >
            <View style={styles.levelHeader}>
              <View>
                <Text style={styles.levelTitle}>Explorer Level 12</Text>
                <Text style={styles.levelSubtitle}>World Wanderer</Text>
              </View>
              <View style={styles.levelBadge}>
                <MaterialIcons name="emoji-events" size={24} color={COLORS.yellow500} />
              </View>
            </View>
            
            <View style={styles.levelProgress}>
              <View style={styles.progressHeader}>
                <Text style={styles.progressLabel}>Progress to Level 13</Text>
                <Text style={styles.progressPoints}>1,250 / 1,500 XP</Text>
              </View>
              <View style={styles.progressBar}>
                <View style={[styles.progressFill, { width: '83%' }]} />
              </View>
            </View>
          </LinearGradient>
        </View>

        {/* Active Challenges */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Active Challenges</Text>
          {exploriaChallenges.map((challenge, index) => (
            <View key={index} style={styles.challengeCard}>
              <View style={styles.challengeHeader}>
                <View style={styles.challengeIcon}>
                  <MaterialIcons name={challenge.icon as any} size={16} color={COLORS.primary} />
                </View>
                <View style={styles.challengeInfo}>
                  <Text style={styles.challengeTitle}>{challenge.title}</Text>
                  <Text style={styles.challengePoints}>{challenge.points} points</Text>
                </View>
                <Text style={styles.challengeProgress}>{challenge.progress}%</Text>
              </View>
              <View style={styles.challengeProgressBar}>
                <View 
                  style={[
                    styles.challengeProgressFill, 
                    { width: `${challenge.progress}%` }
                  ]} 
                />
              </View>
            </View>
          ))}
        </View>

        {/* Recent Achievements */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Achievements</Text>
          <View style={styles.achievementsGrid}>
            {recentAchievements.map((achievement, index) => (
              <View key={index} style={styles.achievementCard}>
                <View style={styles.achievementIcon}>
                  <MaterialIcons name={achievement.icon as any} size={16} color={COLORS.yellow500} />
                </View>
                <Text style={styles.achievementTitle}>{achievement.title}</Text>
                <Text style={styles.achievementDate}>{achievement.earned}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Statistics */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Your Stats</Text>
          <View style={styles.statsGrid}>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>24</Text>
              <Text style={styles.statLabel}>Countries</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>89</Text>
              <Text style={styles.statLabel}>Trips</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>48</Text>
              <Text style={styles.statLabel}>Badges</Text>
            </View>
          </View>
        </View>

        {/* Leaderboard Preview */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Global Leaderboard</Text>
          {[
            { name: 'Alex Thompson (You)', points: 1250, rank: 1, isUser: true },
            { name: 'Sarah Johnson', points: 1180, rank: 2, isUser: false },
            { name: 'Mike Chen', points: 1050, rank: 3, isUser: false }
          ].map((user, index) => (
            <View key={index} style={[styles.leaderboardItem, user.isUser && styles.userLeaderboardItem]}>
              <View style={styles.leaderboardLeft}>
                <View style={[styles.rankBadge, user.isUser && styles.userRankBadge]}>
                  <Text style={[styles.rankText, user.isUser && styles.userRankText]}>
                    #{user.rank}
                  </Text>
                </View>
                <Text style={[styles.leaderboardName, user.isUser && styles.userLeaderboardName]}>
                  {user.name}
                </Text>
              </View>
              <Text style={[styles.leaderboardPoints, user.isUser && styles.userLeaderboardPoints]}>
                {user.points} pts
              </Text>
            </View>
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
  pointsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  pointsText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.gray900,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  levelCard: {
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 24,
  },
  levelGradient: {
    padding: 16,
  },
  levelHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  levelTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.gray900,
    marginBottom: 4,
  },
  levelSubtitle: {
    fontSize: 14,
    color: COLORS.gray600,
  },
  levelBadge: {
    width: 48,
    height: 48,
    backgroundColor: 'rgba(234,179,8,0.2)',
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  levelProgress: {},
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  progressLabel: {
    fontSize: 14,
    color: COLORS.gray600,
  },
  progressPoints: {
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
    backgroundColor: COLORS.primary,
    borderRadius: 4,
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
  challengeCard: {
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
  challengeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 12,
  },
  challengeIcon: {
    width: 32,
    height: 32,
    backgroundColor: 'rgba(234,88,12,0.1)',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  challengeInfo: {
    flex: 1,
  },
  challengeTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.gray900,
    marginBottom: 2,
  },
  challengePoints: {
    fontSize: 14,
    color: COLORS.gray600,
  },
  challengeProgress: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.gray900,
  },
  challengeProgressBar: {
    height: 8,
    backgroundColor: COLORS.gray100,
    borderRadius: 4,
    overflow: 'hidden',
  },
  challengeProgressFill: {
    height: '100%',
    backgroundColor: COLORS.primary,
    borderRadius: 4,
  },
  achievementsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  achievementCard: {
    width: '30%',
    backgroundColor: COLORS.white,
    borderRadius: 7,
    padding: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  achievementIcon: {
    width: 32,
    height: 32,
    backgroundColor: 'rgba(234,179,8,0.2)',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  achievementTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.gray900,
    textAlign: 'center',
    marginBottom: 4,
  },
  achievementDate: {
    fontSize: 10,
    color: COLORS.gray600,
    textAlign: 'center',
  },
  statsGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.7)',
    borderRadius: 7,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 1,
    elevation: 1,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: COLORS.gray600,
  },
  leaderboardItem: {
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
  userLeaderboardItem: {
    backgroundColor: 'rgba(234,88,12,0.1)',
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
  leaderboardLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  rankBadge: {
    width: 24,
    height: 24,
    backgroundColor: COLORS.gray100,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  userRankBadge: {
    backgroundColor: COLORS.primary,
  },
  rankText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: COLORS.gray600,
  },
  userRankText: {
    color: COLORS.white,
  },
  leaderboardName: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.gray900,
  },
  userLeaderboardName: {
    fontWeight: 'bold',
  },
  leaderboardPoints: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.gray600,
  },
  userLeaderboardPoints: {
    color: COLORS.primary,
    fontWeight: 'bold',
  },
});