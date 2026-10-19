import { router } from "expo-router";
import { useState } from "react";
import { Pressable, TextInput, View } from "react-native";
import {
  Button,
  Card,
  Confirm,
  Heading,
  Icon,
  Label,
  Notice,
  Page,
  Txt,
  colors,
  styles,
} from "../components/ui";
import { useJournal } from "../state/JournalProvider";
import { getServerOrigin } from "../services/server-url";

export default function SettingsScreen() {
  const journal = useJournal();
  const [url, setUrl] = useState(journal.serverUrl);
  const [token, setToken] = useState(journal.token);
  const [confirm, setConfirm] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  function enableAi() {
    try {
      const origin = getServerOrigin(url);
      journal.setServerUrl(origin);
      journal.setToken(token.trim());
      journal.setMode("ai");
      setError("");
      setMessage("AI mode selected. Return to Reflect to write your story.");
    } catch (e) {
      setError(
        e instanceof TypeError
          ? "Enter a valid server address, such as https://api.example.com."
          : e instanceof Error
            ? e.message
            : "Check the server address.",
      );
    }
  }
  async function clear() {
    setBusy(true);
    setError("");
    setMessage("");
    try {
      await journal.clear();
      setMessage("All reflections have been deleted from this device.");
    } catch {
      setError("Could not delete your reflections. Please try again.");
    } finally {
      setBusy(false);
      setConfirm(false);
    }
  }
  return (
    <Page>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Close settings"
        onPress={() =>
          router.canGoBack() ? router.back() : router.replace("/")
        }
        style={{ alignSelf: "flex-start", padding: 10, marginLeft: -10 }}
      >
        <Icon name="close" />
      </Pressable>
      <Heading
        title="Make Kibitz yours"
        subtitle="Choose how to reflect and manage your journal."
      />
      <Card>
        <Label>REFLECTION MODE</Label>
        <View style={styles.between}>
          <Txt style={{ fontWeight: "600", fontSize: 18 }}>
            Explore the demo
          </Txt>
          {journal.mode === "demo" && (
            <Icon name="checkmark-circle" color={colors.green} />
          )}
        </View>
        <Txt style={{ color: colors.muted, lineHeight: 23 }}>
          Explore prepared examples and four philosophical questions without
          signing in. Your writing stays on this device.
        </Txt>
        <Button
          title={
            journal.mode === "demo"
              ? "Demo mode is active"
              : "Switch to demo mode"
          }
          secondary
          onPress={() => {
            journal.setMode("demo");
            setMessage("Switched to demo mode.");
            setError("");
          }}
        />
      </Card>
      <Card>
        <View style={styles.between}>
          <Txt style={{ fontSize: 18, fontWeight: "600" }}>Reflect with AI</Txt>
          {journal.mode === "ai" && (
            <Icon name="checkmark-circle" color={colors.green} />
          )}
        </View>
        <Txt style={{ color: colors.muted, fontSize: 13, lineHeight: 22 }}>
          An evaluation server is required. Only your current entry and category
          are sent to the server and OpenAI, never your journal history.
        </Txt>
        <Label style={{ letterSpacing: 0 }}>Server address</Label>
        <TextInput
          accessibilityLabel="Server address"
          value={url}
          onChangeText={setUrl}
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="url"
          style={styles.input}
        />
        <Label style={{ letterSpacing: 0 }}>
          Beta access code (if required)
        </Label>
        <TextInput
          accessibilityLabel="Beta access code"
          value={token}
          onChangeText={setToken}
          secureTextEntry
          autoCapitalize="none"
          autoCorrect={false}
          placeholder="Code provided by the server operator"
          placeholderTextColor={colors.muted}
          style={styles.input}
        />
        <Txt style={{ fontSize: 12, color: colors.muted, lineHeight: 21 }}>
          Use the beta access code, not an OpenAI API key. Connection settings
          and the code reset when the app fully closes.
        </Txt>
        <Button
          title="Use AI mode"
          icon="sparkles-outline"
          onPress={enableAi}
        />
      </Card>
      {error ? <Notice error>{error}</Notice> : null}
      {message ? <Notice>{message}</Notice> : null}
      <Card>
        <Label>YOUR JOURNAL AND PRIVACY</Label>
        <Txt style={{ lineHeight: 24, color: colors.muted }}>
          Your journal is stored on this device without additional encryption.
          There is no cloud sync or account recovery. Uninstalling the app may
          remove your records.
        </Txt>
        <Txt style={{ lineHeight: 23, color: colors.muted, fontSize: 13 }}>
          The AI server does not keep a journal database and requests no stored
          OpenAI response. Separate provider data retention policies may still
          apply.
        </Txt>
        <Button
          title={`Delete all reflections (${journal.entries.length})`}
          secondary
          destructive
          disabled={!journal.ready || journal.entries.length === 0}
          onPress={() => setConfirm(true)}
        />
      </Card>
      <Txt
        style={{
          textAlign: "center",
          color: colors.muted,
          fontSize: 12,
          lineHeight: 21,
        }}
      >
        Kibitz · 0.1.0{"\n"}A little perspective. A better question.
      </Txt>
      <Confirm
        visible={confirm}
        busy={busy}
        title="Delete all reflections?"
        body="This permanently removes every reflection and chosen perspective on this device, and resets your philosophy map."
        onCancel={() => {
          if (!busy) setConfirm(false);
        }}
        onConfirm={() => void clear()}
      />
    </Page>
  );
}
