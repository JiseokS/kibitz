import Ionicons from "@expo/vector-icons/Ionicons";
import { type ComponentProps, type ReactNode } from "react";
import {
  ActivityIndicator,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  type StyleProp,
  type TextStyle,
  type ViewStyle,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { philosophers } from "../domain/philosophers";
import type { PhilosopherId } from "../domain/model";

export const colors = {
  paper: "#F8F7F2",
  card: "#FFFFFF",
  ink: "#263A32",
  muted: "#71786F",
  line: "#E5E7DE",
  green: "#355D49",
  soft: "#EAF0E7",
  accent: "#CDDDB7",
  error: "#9B453A",
};
export const serif = Platform.select({
  ios: "Georgia",
  android: "serif",
  default: "Georgia",
});
export function Txt({
  children,
  style,
  ...props
}: ComponentProps<typeof Text>) {
  return (
    <Text {...props} style={[styles.text, style]}>
      {children}
    </Text>
  );
}
export function Icon({
  name,
  color = colors.ink,
  size = 20,
}: {
  name: ComponentProps<typeof Ionicons>["name"];
  color?: string;
  size?: number;
}) {
  return <Ionicons name={name} size={size} color={color} />;
}
export function Page({ children }: { children: ReactNode }) {
  return (
    <SafeAreaView
      edges={["top", "left", "right"]}
      style={{ flex: 1, backgroundColor: colors.paper }}
    >
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.page}
      >
        {children}
      </ScrollView>
    </SafeAreaView>
  );
}
export function Label({
  children,
  style,
}: {
  children: ReactNode;
  style?: StyleProp<TextStyle>;
}) {
  return <Txt style={[styles.label, style]}>{children}</Txt>;
}
export function Heading({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <View style={{ gap: 8, marginVertical: 24 }}>
      <Txt accessibilityRole="header" style={styles.title}>
        {title}
      </Txt>
      {subtitle && (
        <Txt style={{ color: colors.muted, lineHeight: 23 }}>{subtitle}</Txt>
      )}
    </View>
  );
}
export function Card({
  children,
  style,
}: {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
}) {
  return <View style={[styles.card, style]}>{children}</View>;
}
export function Button({
  title,
  onPress,
  disabled,
  loading,
  secondary,
  destructive,
  icon,
  testID,
}: {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
  secondary?: boolean;
  destructive?: boolean;
  icon?: ComponentProps<typeof Ionicons>["name"];
  testID?: string;
}) {
  const color = secondary
    ? destructive
      ? colors.error
      : colors.ink
    : "#FFFFFF";
  return (
    <Pressable
      testID={testID}
      accessibilityRole="button"
      accessibilityState={{ disabled: !!disabled, busy: !!loading }}
      disabled={disabled || loading}
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        secondary && { backgroundColor: colors.soft },
        destructive && !secondary && { backgroundColor: colors.error },
        (disabled || loading) && { opacity: 0.45 },
        pressed && { opacity: 0.78 },
      ]}
    >
      {loading ? (
        <ActivityIndicator color={color} />
      ) : icon ? (
        <Icon name={icon} color={color} />
      ) : null}
      <Txt style={{ color, fontWeight: "600", fontSize: 15 }}>{title}</Txt>
    </Pressable>
  );
}
export function Notice({
  children,
  error = false,
}: {
  children: ReactNode;
  error?: boolean;
}) {
  return (
    <View
      accessibilityRole={error ? "alert" : undefined}
      style={[styles.notice, error && { backgroundColor: "#F6EAE5" }]}
    >
      <Icon
        name={error ? "alert-circle-outline" : "information-circle-outline"}
        color={error ? colors.error : colors.green}
        size={18}
      />
      <Txt
        style={{
          flex: 1,
          fontSize: 13,
          lineHeight: 21,
          color: error ? colors.error : colors.green,
        }}
      >
        {children}
      </Txt>
    </View>
  );
}
export function Avatar({
  id,
  size = 44,
}: {
  id: PhilosopherId;
  size?: number;
}) {
  const p = philosophers[id];
  return (
    <View
      accessibilityElementsHidden
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
        backgroundColor: p.background,
        alignItems: "center",
        justifyContent: "center",
        borderColor: `${p.color}30`,
        borderWidth: 1,
      }}
    >
      <Txt style={{ fontFamily: serif, fontSize: size * 0.49, color: p.color }}>
        {p.initial}
      </Txt>
    </View>
  );
}
export function EmptyState({
  icon,
  title,
  description,
  action,
}: {
  icon: ComponentProps<typeof Ionicons>["name"];
  title: string;
  description: string;
  action?: ReactNode;
}) {
  return (
    <Card style={{ alignItems: "center", paddingVertical: 38, gap: 14 }}>
      <View
        style={{ backgroundColor: colors.soft, padding: 18, borderRadius: 60 }}
      >
        <Icon name={icon} color={colors.green} size={30} />
      </View>
      <Txt style={{ fontSize: 20, fontWeight: "600", textAlign: "center" }}>
        {title}
      </Txt>
      <Txt style={{ color: colors.muted, textAlign: "center", lineHeight: 24 }}>
        {description}
      </Txt>
      {action && (
        <View style={{ alignSelf: "stretch", marginTop: 8 }}>{action}</View>
      )}
    </Card>
  );
}
export function Confirm({
  visible,
  title,
  body,
  busy,
  onCancel,
  onConfirm,
}: {
  visible: boolean;
  title: string;
  body: string;
  busy?: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onCancel}
    >
      <View style={styles.overlay}>
        <Card style={{ width: "100%", maxWidth: 400, gap: 20 }}>
          <Txt
            accessibilityRole="header"
            style={{ fontSize: 21, fontWeight: "700" }}
          >
            {title}
          </Txt>
          <Txt style={{ color: colors.muted, lineHeight: 24 }}>{body}</Txt>
          <Button
            title="Delete"
            destructive
            loading={busy}
            onPress={onConfirm}
          />
          <Button title="Cancel" secondary disabled={busy} onPress={onCancel} />
        </Card>
      </View>
    </Modal>
  );
}
export const styles = StyleSheet.create({
  text: { color: colors.ink, fontSize: 15 },
  page: {
    width: "100%",
    maxWidth: 700,
    alignSelf: "center",
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 40,
    gap: 20,
  },
  label: {
    fontSize: 11,
    fontWeight: "700",
    color: colors.muted,
    letterSpacing: 1.7,
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    letterSpacing: -1.2,
    lineHeight: 43,
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.line,
    padding: 22,
    gap: 14,
  },
  button: {
    minHeight: 54,
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 14,
    backgroundColor: colors.green,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 9,
  },
  notice: {
    padding: 14,
    borderRadius: 12,
    backgroundColor: colors.soft,
    flexDirection: "row",
    gap: 9,
    alignItems: "flex-start",
  },
  overlay: {
    flex: 1,
    backgroundColor: "#17241CCC",
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  row: { flexDirection: "row", alignItems: "center", gap: 10 },
  between: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.line,
    backgroundColor: "#FDFDFB",
    borderRadius: 12,
    padding: 15,
    color: colors.ink,
    fontSize: 15,
  },
});
