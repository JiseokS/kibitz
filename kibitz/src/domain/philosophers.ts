import type { PhilosopherId } from "./model";

export const philosophers: Record<
  PhilosopherId,
  {
    name: string;
    shortName: string;
    english: string;
    initial: string;
    school: string;
    lens: string;
    color: string;
    background: string;
  }
> = {
  kant: {
    name: "Kant",
    shortName: "Kant",
    english: "IMMANUEL KANT",
    initial: "K",
    school: "Duty ethics",
    lens: "Could this principle work for everyone?",
    color: "#49695B",
    background: "#E4EBE3",
  },
  mill: {
    name: "J. S. Mill",
    shortName: "Mill",
    english: "JOHN STUART MILL",
    initial: "M",
    school: "Utilitarianism",
    lens: "Whose well-being did this improve?",
    color: "#8B692C",
    background: "#F3EAD4",
  },
  aristotle: {
    name: "Aristotle",
    shortName: "Aristotle",
    english: "ARISTOTLE",
    initial: "A",
    school: "Virtue ethics",
    lens: "What kind of person am I becoming?",
    color: "#AD634C",
    background: "#F4E5DE",
  },
  nietzsche: {
    name: "Nietzsche",
    shortName: "Nietzsche",
    english: "FRIEDRICH NIETZSCHE",
    initial: "N",
    school: "Self-creation",
    lens: "Was this choice guided by values I chose for myself?",
    color: "#756484",
    background: "#EAE4EE",
  },
};
