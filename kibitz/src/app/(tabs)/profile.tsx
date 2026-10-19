import { router } from "expo-router";
import { Pressable, View } from "react-native";
import {
  Avatar,
  Button,
  Card,
  Heading,
  Icon,
  Label,
  Notice,
  Page,
  Txt,
  colors,
  styles,
} from "../../components/ui";
import { alignment } from "../../domain/model";
import { philosophers } from "../../domain/philosophers";
import { useJournal } from "../../state/JournalProvider";

export default function ProfileScreen() {
  const { entries, ready, loadError, reload } = useJournal();
  const profile = alignment(entries);
  const topCount = Math.max(...profile.rows.map((row) => row.count));
  const leaders = profile.rows.filter(
    (row) => row.count === topCount && row.count > 0,
  );
  return (
    <Page>
      <View style={styles.between}>
        <Label>YOUR PHILOSOPHICAL COMPASS</Label>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Settings"
          onPress={() => router.push("/settings")}
          style={{ padding: 10 }}
        >
          <Icon name="options-outline" />
        </Pressable>
      </View>
      <Heading
        title={"What speaks\nto you?"}
        subtitle="The perspectives you choose become a map of your own."
      />
      {!ready ? (
        <>
          <Notice error={loadError}>
            {loadError
              ? "Your journal could not be loaded."
              : "Loading your perspective map…"}
          </Notice>
          {loadError && <Button title="Try loading again" onPress={reload} />}
        </>
      ) : (
        <>
          <Card
            style={{
              backgroundColor: colors.soft,
              borderWidth: 0,
              paddingVertical: 28,
            }}
          >
            <View style={styles.row}>
              <Icon
                name={profile.unlocked ? "compass-outline" : "leaf-outline"}
                color={colors.green}
                size={26}
              />
              <Label style={{ color: colors.green, flex: 1 }}>
                {profile.unlocked
                  ? "YOUR CURRENT PERSPECTIVES"
                  : "YOUR PHILOSOPHY IS TAKING SHAPE"}
              </Label>
            </View>
            <Txt style={{ fontSize: 25, fontWeight: "600", lineHeight: 36 }}>
              {profile.unlocked
                ? leaders.length === 1
                  ? `You most often connected with\n${philosophers[leaders[0].id].school.toLowerCase()}.`
                  : "More than one perspective\nresonates with you."
                : `${Math.max(0, 5 - profile.total)} more ${5 - profile.total === 1 ? "choice" : "choices"}\nuntil your first map.`}
            </Txt>
            <Txt style={{ color: colors.muted, fontSize: 13, lineHeight: 22 }}>
              Choose the perspective that resonates on five different AI
              reflections to reveal your first map.
            </Txt>
            {!profile.unlocked && (
              <>
                <View
                  style={{
                    height: 6,
                    borderRadius: 3,
                    backgroundColor: "#D6DECF",
                  }}
                >
                  <View
                    style={{
                      width: `${Math.min(100, (profile.total / 5) * 100)}%`,
                      height: 6,
                      borderRadius: 3,
                      backgroundColor: colors.green,
                    }}
                  />
                </View>
                <Txt style={{ color: colors.green, fontSize: 12 }}>
                  {profile.total} / 5 choices
                </Txt>
              </>
            )}
          </Card>
          {profile.unlocked && (
            <Card>
              <View style={styles.between}>
                <Txt style={{ fontSize: 18, fontWeight: "600" }}>
                  Your perspective map
                </Txt>
                <Txt style={{ fontSize: 12, color: colors.muted }}>
                  {profile.total} reflections
                </Txt>
              </View>
              {profile.rows.map((row) => (
                <View key={row.id} style={{ gap: 8, marginVertical: 8 }}>
                  <View style={styles.between}>
                    <View style={styles.row}>
                      <Avatar id={row.id} size={28} />
                      <Txt style={{ fontSize: 14 }}>
                        {philosophers[row.id].school}
                      </Txt>
                    </View>
                    <Txt
                      style={{
                        fontSize: 18,
                        fontWeight: "600",
                        color: philosophers[row.id].color,
                      }}
                    >
                      {row.percent}%
                    </Txt>
                  </View>
                  <View
                    style={{
                      height: 8,
                      borderRadius: 4,
                      backgroundColor: philosophers[row.id].background,
                    }}
                  >
                    <View
                      accessibilityRole="progressbar"
                      accessibilityValue={{
                        min: 0,
                        max: 100,
                        now: row.percent,
                      }}
                      accessibilityLabel={philosophers[row.id].school}
                      style={{
                        height: 8,
                        borderRadius: 4,
                        width: `${row.percent}%`,
                        backgroundColor: philosophers[row.id].color,
                      }}
                    />
                  </View>
                </View>
              ))}
            </Card>
          )}
          <View style={{ flexDirection: "row", gap: 12 }}>
            <Card style={{ flex: 1 }}>
              <Label style={{ letterSpacing: 0 }}>AI reflections</Label>
              <Txt style={{ fontSize: 32, fontWeight: "600" }}>
                {entries.filter((e) => e.source === "ai").length}
              </Txt>
            </Card>
            <Card style={{ flex: 1 }}>
              <Label style={{ letterSpacing: 0 }}>Perspectives chosen</Label>
              <Txt style={{ fontSize: 32, fontWeight: "600" }}>
                {profile.total}
              </Txt>
            </Card>
          </View>
          <Notice>
            Your map reflects the perspectives you chose, not AI scores. Demo
            and unselected entries are excluded. It is not a personality test or
            a fixed identity. Changing a choice or deleting an entry updates
            your map.
          </Notice>
          <Button
            title="Choose perspectives in your journal"
            secondary
            icon="book-outline"
            onPress={() => router.navigate("/history")}
          />
        </>
      )}
    </Page>
  );
}
