import { Link } from 'expo-router';
import { useRef, useState } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, useWindowDimensions, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

const crewOrder = ['scan', 'signals', 'inbound', 'warm', 'cold', 'scribe'] as const;

type CrewKey = typeof crewOrder[number];

const crewData: Record<CrewKey, { title: string; color: string }> = {
  scan: { title: 'Scan', color: '#e85a3c' },
  signals: { title: 'Signals', color: '#3d4e7e' },
  inbound: { title: 'Inbound', color: '#c07a2c' },
  warm: { title: 'Warm', color: '#2d7d7a' },
  cold: { title: 'Cold', color: '#7b9a8d' },
  scribe: { title: 'Scribe', color: '#b89656' },
};

const crewCountsToday: Record<CrewKey, number> = {
  scan: 3,
  signals: 17,
  inbound: 5,
  warm: 4,
  cold: 2,
  scribe: 1,
};

const latestByCrew: Record<CrewKey, string> = {
  scan: 'Sofia Alencar — Helix Tech · invoice scan',
  signals: 'Priya Meshram — secret signal warming phase',
  inbound: 'Keisha Song — prospect follow-up draft',
  warm: 'Elina Park — check-in pending response',
  cold: 'Kenji — 94d quiet · resurrection draft queued',
  scribe: 'Amina call — task list distilled',
};

const pendingDraftsCount: number = 7;

const activityLog = [
  {
    id: '1',
    time: '10:42',
    title: 'Scan filed Sofia Alencar (Helix Tech)',
    details: 'Extracted 7 fields · Genspark enriched LinkedIn + Crunchbase · 2 mutual connections',
    crew: 'scan' as CrewKey,
  },
  {
    id: '2',
    time: '10:15',
    title: 'Secret Signals warmed Priya +6 after “Hi!!”',
    details: 'Warmth delta tracked across 9 contacts · context preserved',
    crew: 'signals' as CrewKey,
  },
  {
    id: '3',
    time: '09:53',
    title: 'Cold queued resurrection draft for Kenji (94d silent)',
    details: 'Draft ready for review · +2 follow-up options suggested',
    crew: 'cold' as CrewKey,
  },
  {
    id: '4',
    time: '09:18',
    title: 'Warm flagged Maya for same-day follow-up',
    details: 'Reminder set · note captured for subject line',
    crew: 'warm' as CrewKey,
  },
  {
    id: '5',
    time: '08:46',
    title: 'Scribe extracted commitments from Cleo call',
    details: '3 action items surfaced · summary shared with team',
    crew: 'scribe' as CrewKey,
  },
];

function greeting(): string {
  const h = new Date().getHours();
  if (h < 5) return 'Working late, Waqar';
  if (h < 12) return 'Good morning, Waqar';
  if (h < 17) return 'Good afternoon, Waqar';
  if (h < 22) return 'Good evening, Waqar';
  return 'Still up, Waqar';
}

function statFor(key: CrewKey, count: number, pending: number): string {
  if (count === 0) return 'No activity today yet.';
  switch (key) {
    case 'scan':
      return `${count} cards processed today · 1 queued, 1 enriching`;
    case 'signals':
      return `${count} messages classified · Warmth delta +14 across 11 contacts`;
    case 'inbound':
      return `${count} cold asks qualified · ${pending} drafts staged · Gmail`;
    case 'scribe':
      return `${count} recordings processed · 4 commitments extracted`;
    default:
      return `${count} today`;
  }
}

const rotations = [-0.4, 0.4, -0.4, 0.4, -0.4, 0.4];

function DashboardCrewCard({ crewKey, count, stat, latest, rotation }: {
  crewKey: CrewKey;
  count: number;
  stat: string;
  latest: string;
  rotation: number;
}) {
  const crew = crewData[crewKey];

  return (
    <TouchableOpacity style={[styles.card, { borderColor: `${crew.color}66`, transform: [{ rotate: `${rotation}deg` }] }]} activeOpacity={0.9}>
      <View style={styles.cardHeader}>
        <View style={[styles.dot, { backgroundColor: crew.color }]} />
        <ThemedText style={styles.cardTitle}>{crew.title}</ThemedText>
        <ThemedText style={styles.cardCount}>{count} today</ThemedText>
      </View>
      <ThemedText style={styles.cardStat}>{stat}</ThemedText>
      <ThemedText type="subtitle" style={styles.cardPreview}>{latest}</ThemedText>
    </TouchableOpacity>
  );
}

function WarmthSparkline({ height }: { height: number }) {
  return (
    <View style={[styles.sparklineChart, { height }]}> 
      <View style={styles.sparklineLine} />
      <View style={[styles.sparklineDot, { left: '10%', backgroundColor: '#e85a3c' }]} />
      <View style={[styles.sparklineDot, { left: '28%', backgroundColor: '#2d7d7a' }]} />
      <View style={[styles.sparklineDot, { left: '46%', backgroundColor: '#3d4e7e' }]} />
      <View style={[styles.sparklineDot, { left: '64%', backgroundColor: '#c07a2c' }]} />
      <View style={[styles.sparklineDot, { left: '82%', backgroundColor: '#7b9a8d' }]} />
    </View>
  );
}

function ActivityLogRow({ entry }: { entry: (typeof activityLog)[number] }) {
  return (
    <TouchableOpacity style={styles.activityRow} activeOpacity={0.8}>
      <View style={[styles.activityBadge, { backgroundColor: crewData[entry.crew].color }]} />
      <View style={styles.activityContent}>
        <ThemedText style={styles.activityTime}>{entry.time}</ThemedText>
        <ThemedText style={styles.activityTitle}>{entry.title}</ThemedText>
        <ThemedText type="default" style={styles.activityDetails}>{entry.details}</ThemedText>
      </View>
    </TouchableOpacity>
  );
}

export default function DashboardScreen() {
  const scrollRef = useRef<ScrollView>(null);
  const [showAllActivity, setShowAllActivity] = useState(false);
  const [activityOffset, setActivityOffset] = useState(0);
  const { width } = useWindowDimensions();
  const isDesktop = width >= 900;

  const visibleActivity = showAllActivity ? activityLog : activityLog.slice(0, 10);

  return (
    <ThemedView style={styles.page}>
      <ScrollView ref={scrollRef} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View style={styles.headerCircle} />
          <ThemedText type="title" style={styles.greeting}>{greeting()}.</ThemedText>
          <ThemedText style={styles.summary}>
            Your Crew has{' '}
            <ThemedText type="default" style={styles.pendingCount}>{pendingDraftsCount}</ThemedText>{' '}
            {pendingDraftsCount === 1 ? 'thing' : 'things'} waiting for you.
          </ThemedText>

          <View style={styles.headerActions}>
            <Link href="../morning-connect" style={styles.primaryCta}>
              <ThemedText style={styles.primaryCtaText}>Open Morning Connect →</ThemedText>
            </Link>
            <TouchableOpacity onPress={() => scrollRef.current?.scrollTo({ y: activityOffset - 24, animated: true })} activeOpacity={0.7}>
              <ThemedText style={styles.secondaryLink}>See what the Crew did overnight</ThemedText>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.subhead}> 
          <ThemedText style={styles.subheadText}>Your Crew · Today</ThemedText>
        </View>

        <View style={[styles.grid, isDesktop ? styles.gridDesktop : styles.gridMobile]}>
          {crewOrder.map((key, index) => (
            <DashboardCrewCard
              key={key}
              crewKey={key}
              count={crewCountsToday[key]}
              stat={statFor(key, crewCountsToday[key], pendingDraftsCount)}
              latest={latestByCrew[key]}
              rotation={rotations[index]}
            />
          ))}
        </View>

        <View style={styles.sparklineSection}>
          <View style={styles.sparklineHeader}>
            <ThemedText style={styles.sectionLabel}>Today’s Warmth shifts</ThemedText>
            <ThemedText type="subtitle" style={styles.sparklineMeta}>16 warmth updates today · 3 resurrections pending</ThemedText>
          </View>
          <WarmthSparkline height={isDesktop ? 80 : 60} />
        </View>

        <View onLayout={(event) => setActivityOffset(event.nativeEvent.layout.y)}>
          <ThemedText style={styles.sectionLabel}>Recent Crew activity</ThemedText>
          <View style={styles.activityPanel}>
            {visibleActivity.map((entry) => (
              <ActivityLogRow key={entry.id} entry={entry} />
            ))}
          </View>
          {!showAllActivity && activityLog.length > 10 ? (
            <TouchableOpacity style={styles.loadMore} onPress={() => setShowAllActivity(true)} activeOpacity={0.8}>
              <ThemedText style={styles.loadMoreText}>Load more · {activityLog.length - 10} more entries</ThemedText>
            </TouchableOpacity>
          ) : null}
        </View>

        <View style={styles.noteWrapper}>
          <ThemedText type="subtitle" style={styles.noteText}>Fixture data · hackathon-day wiring flips everything live.</ThemedText>
        </View>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
  content: {
    padding: 24,
    paddingBottom: 32,
  },
  header: {
    marginBottom: 32,
    position: 'relative',
  },
  headerCircle: {
    position: 'absolute',
    top: -12,
    right: -12,
    width: 64,
    height: 64,
    borderRadius: 999,
    backgroundColor: '#1a1816',
    opacity: 0.08,
  },
  greeting: {
    fontSize: 36,
    fontWeight: '700',
    letterSpacing: -0.03,
    marginBottom: 10,
  },
  summary: {
    fontSize: 17,
    lineHeight: 26,
    color: '#1a1816',
    marginBottom: 20,
    maxWidth: 660,
  },
  pendingCount: {
    fontFamily: 'JetBrains Mono',
    backgroundColor: 'rgba(198, 90, 77, 0.14)',
    color: '#c65a4d',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
  },
  headerActions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: 16,
  },
  primaryCta: {
    backgroundColor: '#1a1816',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 999,
  },
  primaryCtaText: {
    color: '#ffffff',
    fontWeight: '600',
  },
  secondaryLink: {
    color: '#3d4e7e',
    textDecorationLine: 'underline',
    fontSize: 16,
  },
  subhead: {
    marginBottom: 12,
  },
  subheadText: {
    fontFamily: 'JetBrains Mono',
    fontSize: 11,
    letterSpacing: 1.5,
    color: '#6b6660',
  },
  grid: {
    gap: 16,
    marginBottom: 32,
  },
  gridDesktop: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  gridMobile: {
    flexDirection: 'column',
  },
  card: {
    minWidth: 260,
    maxWidth: 320,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderRadius: 18,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.03,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 6 },
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 999,
    marginRight: 10,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    flex: 1,
  },
  cardCount: {
    fontFamily: 'JetBrains Mono',
    fontSize: 13,
    color: '#6b6660',
  },
  cardStat: {
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 12,
  },
  cardPreview: {
    fontSize: 14,
    lineHeight: 20,
    color: '#6b6660',
  },
  sparklineSection: {
    marginBottom: 32,
  },
  sparklineHeader: {
    marginBottom: 12,
  },
  sectionLabel: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  sparklineMeta: {
    fontFamily: 'JetBrains Mono',
    fontSize: 13,
    color: '#6b6660',
  },
  sparklineChart: {
    backgroundColor: '#faf8f3',
    borderRadius: 16,
    paddingHorizontal: 16,
    justifyContent: 'center',
    overflow: 'hidden',
  },
  sparklineLine: {
    position: 'absolute',
    left: 20,
    right: 20,
    height: 2,
    backgroundColor: '#e4dfd4',
    top: '50%',
  },
  sparklineDot: {
    position: 'absolute',
    width: 12,
    height: 12,
    borderRadius: 999,
    top: 28,
  },
  activityRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    marginBottom: 18,
  },
  activityBadge: {
    width: 12,
    height: 12,
    borderRadius: 999,
    marginTop: 4,
  },
  activityContent: {
    flex: 1,
  },
  activityTime: {
    fontFamily: 'JetBrains Mono',
    fontSize: 12,
    color: '#6b6660',
    marginBottom: 4,
  },
  activityTitle: {
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 4,
  },
  activityDetails: {
    fontFamily: 'JetBrains Mono',
    fontSize: 13,
    color: '#6b6660',
  },
  activityPanel: {
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#e4dfd4',
    backgroundColor: '#ffffff',
    padding: 20,
  },
  loadMore: {
    marginTop: 8,
  },
  loadMoreText: {
    color: '#3d4e7e',
    fontSize: 15,
  },
  noteWrapper: {
    marginTop: 24,
    alignItems: 'center',
  },
  noteText: {
    fontFamily: 'JetBrains Mono',
    fontSize: 12,
    color: '#6b6660',
  },
});
