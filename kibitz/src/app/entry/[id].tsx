import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { Pressable, View } from "react-native";
import {
  Avatar,
  Button,
  Card,
  Confirm,
  EmptyState,
  Icon,
  Label,
  Notice,
  Page,
  Txt,
  colors,
  serif,
  styles,
} from "../../components/ui";
import {
  averageScore,
  categoryLabels,
  philosopherIds,
  type PhilosopherId,
} from "../../domain/model";
import { philosophers } from "../../domain/philosophers";
import { useJournal } from "../../state/JournalProvider";

export default function EntryScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const journal = useJournal();
  const entry = journal.entries.find((item) => item.id === id);
  const [confirm, setConfirm] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const goBack = () => {
    if (router.canGoBack()) router.back();
    else router.replace("/history");
  };
  if (!journal.ready)
    return (
      <Page>
        <Notice>
          {journal.loadError
            ? "Your journal could not be loaded."
            : "Loading your reflection…"}
        </Notice>
        {journal.loadError && (
          <Button title="Try loading again" onPress={journal.reload} />
        )}
      </Page>
    );
  if (!entry)
    return (
      <Page>
        <EmptyState
          icon="book-outline"
          title="Reflection not found"
          description="It may have been deleted or saved on another device."
          action={
            <Button
              title="Back to journal"
              onPress={() => router.replace("/history")}
            />
          }
        />
      </Page>
    );
  const { evaluation } = entry;
  const average = averageScore(evaluation);
  async function remove() {
    setBusy(true);
    setError("");
    try {
      await journal.remove(id);
      setConfirm(false);
      router.replace("/history");
    } catch {
      setError("Could not delete this reflection. Please try again.");
      setConfirm(false);
    } finally {
      setBusy(false);
    }
  }
  async function vote(value: PhilosopherId | null) {
    setBusy(true);
    setError("");
    try {
      await journal.resonate(id, value);
    } catch {
      setError("Could not save your choice. Please try again.");
    } finally {
      setBusy(false);
    }
  }
  return (
    <Page>
      <View style={styles.between}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Back"
          onPress={goBack}
          style={{ padding: 10, marginLeft: -10 }}
        >
          <Icon name="arrow-back" />
        </Pressable>
        <Label>THE PHILOSOPHERS’ COUNCIL</Label>
        <Icon name="sparkles-outline" size={18} />
      </View>
      <View style={{ gap: 12 }}>
        <Label>
          {entry.source === "demo"
            ? "Demo · prepared perspectives"
            : "AI reflections"}{" "}
          / {categoryLabels[entry.input.category]}
        </Label>
        <Txt accessibilityRole="header" style={styles.title}>
          {evaluation.title}
        </Txt>
        <Txt style={{ color: colors.muted, fontSize: 12 }}>
          {new Date(entry.createdAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </Txt>
      </View>
      <Card style={{ backgroundColor: "#EEEEE5", borderWidth: 0 }}>
        <Label>YOUR STORY</Label>
        <Txt selectable style={{ lineHeight: 25 }}>
          {entry.input.text}
        </Txt>
      </Card>
      {entry.source === "demo" && (
        <Notice>
          This is a demo. Examples use prepared interpretations; free writing
          receives general questions. Demo choices do not affect your
          perspective map.
        </Notice>
      )}
      <View style={[styles.between, { marginTop: 8 }]}>
        <Txt
          accessibilityRole="header"
          style={{ fontSize: 22, fontWeight: "700", flex: 1 }}
        >
          Four different lenses
        </Txt>
        {average && (
          <View style={{ alignItems: "flex-end" }}>
            <Txt style={{ fontFamily: serif, fontSize: 29 }}>
              {average}
              <Txt style={{ fontSize: 13, color: colors.muted }}> / 10</Txt>
            </Txt>
            <Txt style={{ fontSize: 10, color: colors.muted }}>
              Framework average
            </Txt>
          </View>
        )}
      </View>
      <Txt
        style={{
          fontSize: 12,
          color: colors.muted,
          lineHeight: 20,
          marginTop: -12,
        }}
      >
        Scores describe how the action fits each framework. The average combines
        different criteria and is only a reference, never a measure of your
        worth.
      </Txt>
      {philosopherIds.map((id) => {
        const judgment = evaluation.judgments.find(
          (item) => item.philosopherId === id,
        )!;
        const p = philosophers[id];
        return (
          <Card
            key={id}
            style={{ gap: 16, borderTopWidth: 3, borderTopColor: p.color }}
          >
            <View style={styles.between}>
              <View style={styles.row}>
                <Avatar id={id} />
                <View style={{ gap: 5 }}>
                  <Txt style={{ fontWeight: "700", fontSize: 16 }}>
                    {p.name}
                  </Txt>
                  <Txt style={{ fontSize: 11, color: p.color }}>{p.school}</Txt>
                </View>
              </View>
              <Txt style={{ fontFamily: serif, fontSize: 30, color: p.color }}>
                {judgment.score ?? "—"}
                {judgment.score !== null && (
                  <Txt style={{ fontSize: 12, color: colors.muted }}> / 10</Txt>
                )}
              </Txt>
            </View>
            {judgment.score !== null && (
              <View
                style={{
                  height: 3,
                  backgroundColor: p.background,
                  borderRadius: 3,
                }}
              >
                <View
                  style={{
                    height: 3,
                    width: `${judgment.score * 10}%`,
                    backgroundColor: p.color,
                    borderRadius: 3,
                  }}
                />
              </View>
            )}
            <Txt style={{ fontSize: 19, lineHeight: 28, fontWeight: "600" }}>
              {judgment.verdict}
            </Txt>
            <Txt selectable style={{ lineHeight: 26, color: "#576158" }}>
              {judgment.reasoning}
            </Txt>
            <View
              style={{
                padding: 14,
                borderRadius: 10,
                backgroundColor: p.background,
                gap: 6,
              }}
            >
              <Label style={{ color: p.color, letterSpacing: 0 }}>
                A QUESTION TO SIT WITH
              </Label>
              <Txt style={{ fontSize: 14, lineHeight: 23, color: p.color }}>
                {judgment.question}
              </Txt>
            </View>
          </Card>
        );
      })}
      <Card style={{ backgroundColor: colors.green, borderWidth: 0, gap: 18 }}>
        <View style={styles.row}>
          <Icon name="git-compare-outline" color={colors.accent} />
          <Label style={{ color: colors.accent }}>BRINGING IT TOGETHER</Label>
        </View>
        <Txt
          style={{
            color: "#FFFFFF",
            fontSize: 24,
            fontWeight: "600",
            lineHeight: 34,
          }}
        >
          {evaluation.synthesis.tension}
        </Txt>
        <Txt selectable style={{ color: "#E2EADD", lineHeight: 26 }}>
          {evaluation.synthesis.summary}
        </Txt>
        <View style={{ height: 1, backgroundColor: "#FFFFFF30" }} />
        <Label style={{ color: colors.accent }}>ONE SMALL NEXT STEP</Label>
        <Txt style={{ color: "#FFFFFF", lineHeight: 25 }}>
          {evaluation.synthesis.nextStep}
        </Txt>
      </Card>
      <Txt style={{ fontSize: 12, color: colors.muted, lineHeight: 21 }}>
        {evaluation.synthesis.uncertainty}
      </Txt>
      <Card>
        <Txt style={{ fontSize: 19, fontWeight: "600" }}>
          Which perspective stayed with you?
        </Txt>
        <Txt style={{ color: colors.muted, fontSize: 13, lineHeight: 21 }}>
          {entry.source === "demo"
            ? "Try choosing a perspective. Demo choices do not count toward your map."
            : "Choose the perspective that resonates most. It will inform your philosophy map. Tap again to undo."}
        </Txt>
        <View style={{ gap: 9 }}>
          {philosopherIds.map((id) => (
            <Pressable
              key={id}
              accessibilityRole="radio"
              accessibilityState={{
                checked: entry.resonance === id,
                disabled: busy,
              }}
              disabled={busy}
              onPress={() => void vote(entry.resonance === id ? null : id)}
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 10,
                padding: 13,
                borderRadius: 12,
                backgroundColor:
                  entry.resonance === id ? colors.soft : "#F9F9F5",
                borderWidth: 1,
                borderColor:
                  entry.resonance === id ? colors.green : colors.line,
              }}
            >
              <Avatar id={id} size={30} />
              <Txt style={{ flex: 1, fontSize: 13 }}>
                {philosophers[id].name} · {philosophers[id].school}
              </Txt>
              <Icon
                name={
                  entry.resonance === id
                    ? "checkmark-circle"
                    : "ellipse-outline"
                }
                color={entry.resonance === id ? colors.green : "#B7BDB0"}
                size={20}
              />
            </Pressable>
          ))}
        </View>
      </Card>
      {error ? <Notice error>{error}</Notice> : null}
      <Button
        title="Reflect on another moment"
        icon="add"
        onPress={() => router.replace("/")}
      />
      <Button
        title="Delete reflection"
        secondary
        destructive
        disabled={busy}
        onPress={() => setConfirm(true)}
      />
      <Confirm
        visible={confirm}
        busy={busy}
        title="Delete this reflection?"
        body="This removes the reflection and your chosen perspective from this device. This cannot be undone."
        onCancel={() => {
          if (!busy) setConfirm(false);
        }}
        onConfirm={() => void remove()}
      />
    </Page>
  );
}
