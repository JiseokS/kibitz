import { router } from "expo-router";
import { useState } from "react";
import { Pressable, TextInput, View } from "react-native";
import {
  Button,
  Card,
  EmptyState,
  Heading,
  Icon,
  Label,
  Notice,
  Page,
  Txt,
  colors,
  styles,
} from "../../components/ui";
import { averageScore, categoryLabels } from "../../domain/model";
import { useJournal } from "../../state/JournalProvider";

export default function HistoryScreen() {
  const { entries, ready, loadError, reload } = useJournal();
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<"all" | "ai" | "demo">("all");
  const filtered = entries.filter(
    (entry) =>
      (filter === "all" || entry.source === filter) &&
      `${entry.input.text} ${entry.evaluation.title}`
        .toLowerCase()
        .includes(query.trim().toLowerCase()),
  );
  return (
    <Page>
      <View style={styles.between}>
        <Label>YOUR REFLECTIONS</Label>
        <Txt style={{ color: colors.muted, fontSize: 12 }}>
          {entries.length} {entries.length === 1 ? "reflection" : "reflections"}
        </Txt>
      </View>
      <Heading
        title={"Past choices,\nfresh questions."}
        subtitle="Revisit a moment and notice what you see differently."
      />
      {loadError ? (
        <>
          <Notice error>
            Your journal could not be loaded. Existing records have been
            preserved.
          </Notice>
          <Button title="Try loading again" onPress={reload} />
        </>
      ) : !ready ? (
        <Notice>Loading your journal…</Notice>
      ) : entries.length === 0 ? (
        <EmptyState
          icon="book-outline"
          title="Your first story starts here"
          description={
            "Start with one small choice.\nYour reflections will find a home here."
          }
          action={
            <Button
              title="Write your first entry"
              icon="add"
              onPress={() => router.navigate("/")}
            />
          }
        />
      ) : (
        <>
          <View style={[styles.input, styles.row]}>
            <Icon name="search-outline" color={colors.muted} size={18} />
            <TextInput
              accessibilityLabel="Search journal"
              value={query}
              onChangeText={setQuery}
              placeholder="Find a reflection"
              placeholderTextColor={colors.muted}
              style={{
                flex: 1,
                color: colors.ink,
                fontSize: 14,
                paddingVertical: 2,
              }}
            />
          </View>
          <View style={{ flexDirection: "row", gap: 8 }}>
            {(
              [
                ["all", "All"],
                ["ai", "AI entries"],
                ["demo", "Demo"],
              ] as const
            ).map(([value, label]) => (
              <Pressable
                accessibilityRole="radio"
                accessibilityState={{ checked: filter === value }}
                key={value}
                onPress={() => setFilter(value)}
                style={{
                  paddingHorizontal: 15,
                  paddingVertical: 10,
                  borderRadius: 20,
                  backgroundColor:
                    filter === value ? colors.green : colors.soft,
                }}
              >
                <Txt
                  style={{
                    fontSize: 12,
                    color: filter === value ? "#FFF" : colors.muted,
                  }}
                >
                  {label}
                </Txt>
              </Pressable>
            ))}
          </View>
          {filtered.length === 0 && (
            <EmptyState
              icon="search-outline"
              title="No matching reflections"
              description="Try another search or filter."
            />
          )}
          {filtered.map((entry) => (
            <Pressable
              key={entry.id}
              accessibilityRole="button"
              accessibilityLabel={`Open reflection: ${entry.evaluation.title}`}
              onPress={() =>
                router.push({
                  pathname: "/entry/[id]",
                  params: { id: entry.id },
                })
              }
            >
              <Card>
                <View style={styles.between}>
                  <Label style={{ letterSpacing: 0 }}>
                    {new Date(entry.createdAt).toLocaleDateString("en-US")} ·{" "}
                    {categoryLabels[entry.input.category]}
                  </Label>
                  <Txt
                    style={{
                      fontSize: 10,
                      color: entry.source === "demo" ? "#8B692C" : colors.green,
                    }}
                  >
                    {entry.source === "demo" ? "DEMO" : "AI"}
                  </Txt>
                </View>
                <Txt style={{ fontSize: 19, fontWeight: "600" }}>
                  {entry.evaluation.title}
                </Txt>
                <Txt
                  numberOfLines={2}
                  style={{ color: colors.muted, lineHeight: 23 }}
                >
                  {entry.input.text}
                </Txt>
                <View style={styles.between}>
                  <Txt
                    style={{
                      fontSize: 12,
                      color: colors.green,
                      flex: 1,
                      lineHeight: 19,
                    }}
                  >
                    {averageScore(entry.evaluation)
                      ? `Framework average ${averageScore(entry.evaluation)} / 10`
                      : "Four questions"}
                    {entry.resonance ? "  ·  Perspective saved" : ""}
                  </Txt>
                  <Icon name="arrow-forward" size={17} />
                </View>
              </Card>
            </Pressable>
          ))}
        </>
      )}
      <Txt style={{ color: colors.muted, fontSize: 12, lineHeight: 20 }}>
        Your journal is stored on this device. Uninstalling the app may remove
        it.
      </Txt>
    </Page>
  );
}
