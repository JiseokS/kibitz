import { router } from "expo-router";
import { Button, EmptyState, Page } from "../components/ui";
export default function NotFound() {
  return (
    <Page>
      <EmptyState
        icon="compass-outline"
        title="A little off the path"
        description="Start a new reflection and find your way back."
        action={
          <Button title="Back to Reflect" onPress={() => router.replace("/")} />
        }
      />
    </Page>
  );
}
