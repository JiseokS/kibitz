import { router } from "expo-router";
import { randomUUID } from "expo-crypto";
import { useEffect, useRef, useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  TextInput,
  View,
} from "react-native";
import {
  Avatar,
  Button,
  Card,
  Icon,
  Label,
  Notice,
  Page,
  Txt,
  colors,
  serif,
  styles,
} from "../../components/ui";
import { evaluateDemo, examples } from "../../domain/demo";
import {
  categories,
  categoryLabels,
  entryInputSchema,
  philosopherIds,
  type Entry,
} from "../../domain/model";
import { philosophers } from "../../domain/philosophers";
import { evaluateRemote } from "../../services/evaluate";
import { useJournal } from "../../state/JournalProvider";

export default function ReflectScreen() {
  const journal = useJournal();
  const [text, setText] = useState("");
  const [category, setCategory] =
    useState<(typeof categories)[number]>("relationships");
  const [consent, setConsent] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [pending, setPending] = useState<Entry | null>(null);
  const controller = useRef<AbortController | null>(null);
  const inFlight = useRef(false);
  useEffect(() => () => controller.current?.abort(), []);
  const valid = entryInputSchema.safeParse({ text, category }).success;

  async function submit() {
    if (inFlight.current) return;
    inFlight.current = true;
    setError("");
    setBusy(true);
    Keyboard.dismiss();
    let timedOut = false;
    const abort = new AbortController();
    controller.current = abort;
    const timeout = setTimeout(() => {
      timedOut = true;
      abort.abort();
    }, 50_000);
    try {
      let entry = pending;
      if (!entry) {
        const input = entryInputSchema.parse({ text, category });
        const evaluation =
          journal.mode === "demo"
            ? evaluateDemo(input)
            : await evaluateRemote(input, {
                url: journal.serverUrl,
                token: journal.token,
                signal: abort.signal,
              });
        if (abort.signal.aborted) return;
        entry = {
          id: randomUUID(),
          createdAt: new Date().toISOString(),
          input,
          source: journal.mode,
          evaluation,
          resonance: null,
        };
        setPending(entry);
      }
      await journal.add(entry);
      setPending(null);
      setText("");
      setConsent(false);
      router.push({ pathname: "/entry/[id]", params: { id: entry.id } });
    } catch (e) {
      if (abort.signal.aborted)
        setError(
          timedOut
            ? "This is taking longer than expected. Please try again shortly."
            : "Evaluation canceled. Your writing is still here.",
        );
      else
        setError(
          e instanceof TypeError
            ? "Could not reach the server. Check the address in Settings and your connection."
            : e instanceof Error
              ? e.message
              : "Something went wrong. Please try again.",
        );
    } finally {
      clearTimeout(timeout);
      inFlight.current = false;
      setBusy(false);
      controller.current = null;
    }
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <Page>
        <View style={styles.between}>
          <View style={styles.row}>
            <View
              style={{
                backgroundColor: colors.green,
                borderRadius: 11,
                padding: 9,
              }}
            >
              <Icon name="library-outline" color="#F2F3DB" size={20} />
            </View>
            <Txt style={{ fontFamily: serif, fontSize: 26, letterSpacing: 2 }}>
              Kibitz
            </Txt>
          </View>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Evaluation mode and settings"
            onPress={() => router.push("/settings")}
            style={{
              flexDirection: "row",
              gap: 6,
              alignItems: "center",
              borderWidth: 1,
              borderColor: colors.line,
              paddingHorizontal: 12,
              paddingVertical: 12,
              borderRadius: 30,
            }}
          >
            <View
              style={{
                width: 6,
                height: 6,
                borderRadius: 3,
                backgroundColor:
                  journal.mode === "demo" ? "#BA9451" : colors.green,
              }}
            />
            <Txt style={{ fontSize: 12 }}>
              {journal.mode === "demo" ? "Demo mode" : "AI mode"}
            </Txt>
            <Icon name="chevron-down" size={12} />
          </Pressable>
        </View>
        <View style={{ marginTop: 22, gap: 16 }}>
          <Label>A LITTLE REFLECTION, EVERY DAY</Label>
          <Txt
            accessibilityRole="header"
            style={{
              fontSize: 36,
              fontWeight: "700",
              lineHeight: 49,
              letterSpacing: -1.6,
            }}
          >
            Your choices,{"\n"}a little perspective.
          </Txt>
          <Txt style={{ color: colors.muted, lineHeight: 24 }}>
            Four perspectives. A fresh way to reflect.{"\n"}Bring a moment from
            your day.
          </Txt>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingVertical: 17,
            borderTopWidth: 1,
            borderBottomWidth: 1,
            borderColor: colors.line,
            marginVertical: 4,
          }}
        >
          {philosopherIds.map((id) => (
            <View key={id} style={{ flex: 1, alignItems: "center", gap: 7 }}>
              <Avatar id={id} size={46} />
              <Txt style={{ fontSize: 12, fontWeight: "600" }}>
                {philosophers[id].shortName}
              </Txt>
              <Txt style={{ fontSize: 10, color: colors.muted }}>
                {philosophers[id].school}
              </Txt>
            </View>
          ))}
        </View>
        {journal.loadError && (
          <>
            <Notice error>
              Your journal could not be loaded. New entries are paused to
              protect your existing records.
            </Notice>
            <Button secondary title="Reload journal" onPress={journal.reload} />
          </>
        )}
        <Card style={{ gap: 17 }}>
          <View style={styles.between}>
            <Txt style={{ fontSize: 18, fontWeight: "600" }}>
              What happened?
            </Txt>
            <Icon name="create-outline" color={colors.muted} />
          </View>
          <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}>
            {categories.map((item) => (
              <Pressable
                key={item}
                disabled={busy || !!pending}
                accessibilityRole="radio"
                accessibilityState={{ checked: category === item }}
                onPress={() => setCategory(item)}
                style={{
                  paddingHorizontal: 13,
                  paddingVertical: 9,
                  backgroundColor: category === item ? colors.soft : "#F6F6F2",
                  borderRadius: 8,
                }}
              >
                <Txt
                  style={{
                    fontSize: 12,
                    color: category === item ? colors.green : colors.muted,
                    fontWeight: category === item ? "700" : "400",
                  }}
                >
                  {categoryLabels[item]}
                </Txt>
              </Pressable>
            ))}
          </View>
          <TextInput
            accessibilityLabel="Something I did or said"
            placeholder={
              "Describe something you did or said.\nA little context and how you felt can help."
            }
            placeholderTextColor="#92968C"
            value={text}
            onChangeText={(value) => {
              setText(value);
              setError("");
            }}
            multiline
            maxLength={2000}
            editable={!busy && !pending}
            textAlignVertical="top"
            style={{
              minHeight: 142,
              fontSize: 15,
              lineHeight: 25,
              color: colors.ink,
              paddingTop: 0,
            }}
          />
          <View style={styles.between}>
            <Txt style={{ color: colors.muted, fontSize: 11 }}>
              At least 10 characters
            </Txt>
            <Txt style={{ color: colors.muted, fontSize: 11 }}>
              {text.length.toLocaleString("en-US")} / 2,000
            </Txt>
          </View>
          {journal.mode === "ai" && (
            <Pressable
              accessibilityRole="checkbox"
              accessibilityState={{ checked: consent }}
              disabled={busy || !!pending}
              onPress={() => setConsent(!consent)}
              style={{
                flexDirection: "row",
                gap: 9,
                alignItems: "flex-start",
                paddingVertical: 8,
              }}
            >
              <Icon
                name={consent ? "checkbox" : "square-outline"}
                color={colors.green}
              />
              <Txt
                style={{
                  flex: 1,
                  fontSize: 12,
                  lineHeight: 20,
                  color: colors.muted,
                }}
              >
                I agree to send this entry and its category to the AI server and
                OpenAI. Please leave out names and personal details.
              </Txt>
            </Pressable>
          )}
          {error ? (
            <Notice error>
              {pending
                ? "Your reflection is ready, but could not be saved on this device. Retry saving without requesting another evaluation."
                : error}
            </Notice>
          ) : null}
          <Button
            testID="evaluate-button"
            title={
              busy
                ? "Gathering perspectives…"
                : pending
                  ? "Retry saving"
                  : journal.mode === "demo"
                    ? "Explore four perspectives"
                    : "Ask the philosophers"
            }
            icon="arrow-forward"
            loading={busy}
            disabled={
              !journal.ready ||
              (!pending && (!valid || (journal.mode === "ai" && !consent)))
            }
            onPress={() => void submit()}
          />
          {busy && (
            <Button
              title="Cancel evaluation"
              secondary
              onPress={() => controller.current?.abort()}
            />
          )}
          {pending && !busy && (
            <Button
              title="Discard result and edit"
              secondary
              onPress={() => {
                setPending(null);
                setError("");
              }}
            />
          )}
        </Card>
        <View style={{ gap: 11 }}>
          <Label>NEED A PLACE TO START?</Label>
          <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 9 }}>
            {examples.map((example) => (
              <Pressable
                key={example.label}
                accessibilityRole="button"
                disabled={busy || !!pending}
                onPress={() => {
                  setText(example.input.text);
                  setCategory(example.input.category);
                  setError("");
                }}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 7,
                  borderWidth: 1,
                  borderColor: colors.line,
                  borderRadius: 30,
                  paddingVertical: 12,
                  paddingHorizontal: 14,
                }}
              >
                <Txt style={{ fontSize: 12 }}>{example.label}</Txt>
                <Icon name="arrow-forward-outline" size={13} />
              </Pressable>
            ))}
          </View>
        </View>
        {journal.mode === "demo" ? (
          <Txt style={{ fontSize: 12, lineHeight: 20, color: colors.muted }}>
            Demo examples use prepared interpretations. Free writing receives
            general reflection questions, without AI analysis.
          </Txt>
        ) : (
          <Txt style={{ fontSize: 12, lineHeight: 20, color: colors.muted }}>
            AI interpretations inspired by philosophical frameworks. These are
            not historical quotations or judgments of your worth.
          </Txt>
        )}
        <View
          style={{
            flexDirection: "row",
            gap: 6,
            justifyContent: "center",
            marginVertical: 6,
          }}
        >
          <Icon name="lock-closed-outline" size={12} color={colors.muted} />
          <Txt style={{ fontSize: 11, color: colors.muted }}>
            Your journal stays on this device
          </Txt>
        </View>
      </Page>
    </KeyboardAvoidingView>
  );
}
