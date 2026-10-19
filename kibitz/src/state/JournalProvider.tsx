import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { createRepository } from "../data/repository";
import type { Entry, PhilosopherId } from "../domain/model";

type JournalContextValue = {
  entries: Entry[];
  ready: boolean;
  loadError: boolean;
  reload: () => void;
  add: (entry: Entry) => Promise<void>;
  resonate: (id: string, value: PhilosopherId | null) => Promise<void>;
  remove: (id: string) => Promise<void>;
  clear: () => Promise<void>;
  mode: "demo" | "ai";
  setMode: (mode: "demo" | "ai") => void;
  serverUrl: string;
  setServerUrl: (url: string) => void;
  token: string;
  setToken: (token: string) => void;
};
const Context = createContext<JournalContextValue | null>(null);

export function JournalProvider({ children }: { children: ReactNode }) {
  const [repository] = useState(() => createRepository(AsyncStorage));
  const [entries, setEntries] = useState<Entry[]>([]);
  const [ready, setReady] = useState(false);
  const [loadError, setLoadError] = useState(false);
  const [mode, setMode] = useState<"demo" | "ai">("demo");
  const [serverUrl, setServerUrl] = useState(
    process.env.EXPO_PUBLIC_API_URL ?? "http://localhost:8787",
  );
  const [token, setToken] = useState("");
  async function reload() {
    setLoadError(false);
    try {
      setEntries(await repository.load());
      setReady(true);
    } catch {
      setLoadError(true);
      setReady(false);
    }
  }
  useEffect(() => {
    let active = true;
    repository
      .load()
      .then((loaded) => {
        if (active) {
          setEntries(loaded);
          setReady(true);
        }
      })
      .catch(() => {
        if (active) setLoadError(true);
      });
    return () => {
      active = false;
    };
  }, [repository]);
  const value: JournalContextValue = {
    entries,
    ready,
    loadError,
    reload,
    add: async (entry) => {
      setEntries(await repository.add(entry));
    },
    resonate: async (id, resonance) => {
      setEntries(await repository.resonate(id, resonance));
    },
    remove: async (id) => {
      setEntries(await repository.remove(id));
    },
    clear: async () => {
      setEntries(await repository.clear());
    },
    mode,
    setMode,
    serverUrl,
    setServerUrl,
    token,
    setToken,
  };
  return <Context.Provider value={value}>{children}</Context.Provider>;
}

export function useJournal() {
  const context = useContext(Context);
  if (!context) throw new Error("JournalProvider is required");
  return context;
}
