import { type EntryInput, type Evaluation, philosopherIds } from "./model";
import { philosophers } from "./philosophers";

export const examples: {
  label: string;
  input: EntryInput;
  evaluation: Evaluation;
}[] = [
  {
    label: "Calling out a friend",
    input: {
      category: "relationships",
      text: "A friend used my things without asking. I got angry and called them out in our group chat in front of everyone.",
    },
    evaluation: {
      title: "How I defend my boundaries",
      judgments: [
        {
          philosopherId: "kant",
          score: 4,
          verdict: "Defend your boundaries. Respect their dignity.",
          reasoning:
            "You have a legitimate reason to object to someone using your things without permission. But using public embarrassment to enforce a boundary may treat your friend as a means to an end. Could you endorse public shaming as a principle for everyone resolving a disagreement?",
          question:
            "Did I apply the respect I wanted to the person I confronted?",
        },
        {
          philosopherId: "mill",
          score: 5,
          verdict: "Did the response solve more than it harmed?",
          reasoning:
            "Your response might discourage future borrowing without permission. It could also create embarrassment and tension across the group. If a private conversation could have protected the same boundary with less harm, it may have been the better option.",
          question:
            "Did this prevent the problem, or mainly make the relationship harder?",
        },
        {
          philosopherId: "aristotle",
          score: 5,
          verdict: "The skill is in how you express your anger.",
          reasoning:
            "Anger is not automatically a mistake. Practical wisdom means expressing it toward the right person, at the right time, and in a fitting way. Consider whether the intensity and public setting suited this particular situation.",
          question:
            "Is this a way of handling conflict I would want to practice again?",
        },
        {
          philosopherId: "nietzsche",
          score: 7,
          verdict: "Self-assertion, or a reaction to being hurt?",
          reasoning:
            "Expressing a boundary can be an act of self-affirmation. But recruiting the group's approval to punish a friend may reflect resentment rather than a value you chose for yourself. Being assertive does not require revenge.",
          question:
            "Would I have said the same thing if nobody else had taken my side?",
        },
      ],
      synthesis: {
        tension: "Protecting a boundary versus public humiliation",
        summary:
          "All four perspectives leave room for protecting your boundaries, but they question the method in different ways. Kant asks about dignity; Mill weighs the effects on everyone. Aristotle considers proportion and timing, while Nietzsche examines what motivated the response.",
        nextStep:
          "Speak to your friend privately. Acknowledge the public criticism while clearly asking them to get permission before using your things.",
        uncertainty:
          "The interpretation could change if this has happened repeatedly, or depending on the exact words you used.",
      },
    },
  },
  {
    label: "A well-meant white lie",
    input: {
      category: "relationships",
      text: "My friend's presentation needed work, but I said it was great because I didn't want to hurt their feelings. Their important presentation is tomorrow.",
    },
    evaluation: {
      title: "Kindness and honesty",
      judgments: [
        {
          philosopherId: "kant",
          score: 3,
          verdict: "A kind intention does not settle the question.",
          reasoning:
            "Your wish to spare your friend's feelings is understandable. However, hiding what you think may take away information they need to make their own choices. Consider how to be both truthful and considerate.",
          question:
            "Did I respect my friend's ability to decide with honest information?",
        },
        {
          philosopherId: "mill",
          score: 5,
          verdict: "Comfort today, consequences tomorrow.",
          reasoning:
            "Encouragement might have helped your friend's confidence. It might also have cost them a chance to improve before tomorrow. The outcome is uncertain, but specific and tactful feedback could offer more lasting help.",
          question: "Will this reassurance still help my friend tomorrow?",
        },
        {
          philosopherId: "aristotle",
          score: 6,
          verdict: "Tactful honesty takes practice.",
          reasoning:
            "Care for a friend is a good starting point. Truthfulness calls for practical judgment between harsh criticism and indiscriminate praise. You could name what worked while offering one useful improvement.",
          question: "What would a caring and courageous friend say?",
        },
        {
          philosopherId: "nietzsche",
          score: 4,
          verdict: "Whose discomfort was I trying to avoid?",
          reasoning:
            "Ask whether your response came from a value you endorse or from a fear of conflict. Believing in your friend's growth can include the courage to say something uncomfortable. That does not mean confusing cruelty with strength.",
          question:
            "Was I protecting their feelings, or protecting myself from disapproval?",
        },
      ],
      synthesis: {
        tension: "Immediate reassurance versus an opportunity to grow",
        summary:
          "Kant emphasizes honesty and agency, while Mill asks what will actually help. Aristotle brings care and truthfulness together through practice. Nietzsche asks whether avoiding conflict played a part in the choice.",
        nextStep:
          "Offer one specific suggestion: 'Your opening is strong. One concrete example in the conclusion could make it much more convincing.'",
        uncertainty:
          "Whether your friend wanted feedback and still has time to revise both matter here.",
      },
    },
  },
];

// Free writing receives a framework preview, never a fabricated offline AI score.
export function evaluateDemo(input: EntryInput): Evaluation {
  const example = examples.find(
    (item) => item.input.text === input.text.trim(),
  );
  if (example)
    return JSON.parse(JSON.stringify(example.evaluation)) as Evaluation;
  return {
    title: "Four questions for your story",
    judgments: philosopherIds.map((id) => ({
      philosopherId: id,
      score: null,
      verdict: philosophers[id].lens,
      reasoning: {
        kant: "Consider whether everyone could follow the principle behind your action, and whether you treated others as people with their own agency.",
        mill: "Look at the benefits and harms your choice could create for everyone involved. Compare it with the realistic alternatives.",
        aristotle:
          "Ask what habit this choice helps you build, and whether it showed the courage and restraint this situation called for.",
        nietzsche:
          "Consider whether you acted from values you chose, or mainly reacted to resentment or a need for approval.",
      }[id],
      question: philosophers[id].lens,
    })),
    synthesis: {
      tension: "Principles, consequences, character, and your own values",
      summary:
        "These are general questions from four philosophical frameworks. This offline demo does not analyze your writing. Switch to AI mode for an evaluation and synthesis based on your situation.",
      nextStep:
        "Choose the question that stays with you and write one sentence about why you made your choice.",
      uncertainty:
        "Personalized judgments and scores are not available for free writing in the offline demo.",
    },
  };
}
