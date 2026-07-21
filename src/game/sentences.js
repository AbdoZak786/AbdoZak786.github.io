// Sentence banks per difficulty. At least 15-20 unique entries per level.
// No immediate repeats — game logic shuffles and de-dupes as it dispatches.

export const SENTENCES = {
  easy: [
    "the quick brown fox jumps over the lazy dog",
    "she sells sea shells by the shore",
    "coffee is best served hot in the morning",
    "birds fly south for the cold winter",
    "the moon looks bright above the tree",
    "a rolling stone gathers no moss",
    "clouds drift slow across a blue sky",
    "he reads a book beside the fire",
    "we walk to the park after lunch",
    "rain taps softly on the window pane",
    "children laugh while chasing paper kites",
    "the cat sleeps on a warm chair",
    "fresh bread smells better than gold",
    "sunlight fills the empty quiet room",
    "old friends meet again after years",
    "wind moves the tall grass in waves",
    "she paints small flowers on the wall",
    "a good song can lift any mood",
    "stars come out one by one tonight",
    "the river bends around the hill",
  ],
  medium: [
    "the engineer paused, sipped her coffee, and rewrote the failing test case.",
    "he'd been walking for hours, hoping the trail would eventually loop back.",
    "storms rolled in fast, faster than the weather app had predicted, catching everyone off guard.",
    "she opened the letter carefully, unfolding each crease as if it might tear.",
    "we don't always get the answers we want; sometimes we just get quiet.",
    "the small cafe on the corner served the best croissants in the city.",
    "when the lights came back on, no one remembered where the conversation had left off.",
    "his notes were meticulous, color-coded, and completely useless in a real emergency.",
    "the puppy chewed through the charger, the couch cushion, and finally, her patience.",
    "it wasn't a great plan, but it was the only plan they had left.",
    "old photographs have a way of making Tuesdays feel like decades ago.",
    "she muttered, half-asleep, that the alarm was clearly a personal attack.",
    "the deadline shifted twice, then vanished from the schedule entirely.",
    "he could hear the rain, the neighbor's radio, and the fridge humming to itself.",
    "somewhere between the third and fourth cup, the code finally started making sense.",
    "the map was old, the roads had changed, but the compass still worked.",
    "they promised to write, and for a while, they actually did.",
    "if you leave now, you'll beat the traffic, but you'll miss the sunset.",
    "her handwriting looped and slanted, unmistakable even after twenty years.",
    "the museum was quiet, save for the soft click of someone's camera.",
  ],
  hard: [
    "The 1927 monograph, though frequently cited, contains at least three arithmetical errors that subsequent editors — inexplicably — chose to preserve verbatim across every reprinting.",
    "By 04:17 the servers had already logged 12,844 anomalous requests, most of them originating from a single autonomous system in a jurisdiction with no functioning extradition treaty.",
    "Dr. Whitaker's thesis (unpublished, mercifully) proposed that consciousness was merely a side-effect of poorly optimized biological caching — a claim she later retracted, though not, one suspects, sincerely.",
    "The manuscript arrived in three parts: a hand-annotated draft, a USB drive labeled 'DO NOT OPEN', and a Post-it note reading simply, 'sorry about the ending.'",
    "Nearly 78% of respondents indicated that they'd read the terms of service; roughly 2% could correctly identify a single clause when tested twelve minutes later.",
    "Kepler's laws — elegant, deterministic, and utterly indifferent to our preferences — govern the orbit whether we've had breakfast or not.",
    "The audit turned up 47 discrepancies, an unpaid invoice from 2003, and one folder mysteriously titled 'DO NOT DELETE — EVER — Bradley 2011.'",
    "She quoted Wittgenstein ('whereof one cannot speak, thereof one must be silent'), and then, characteristically, continued speaking for another 40 minutes.",
    "Between the 14th and 19th of November, three separate teams — none aware of the others — independently arrived at the same, deeply incorrect conclusion.",
    "It's worth noting that Tesla's 1893 Columbian Exposition demonstration used roughly 100,000 lamps, most powered by a system his rivals had publicly declared 'impractical.'",
    "The compiler emitted 1,247 warnings, 3 errors, and — improbably — a Latin quotation neither developer had ever added to the source tree.",
    "By the time the arbitration concluded (some 22 months later), the disputed sum had depreciated by nearly 38% and no one particularly wanted it anymore.",
    "Marlowe's revised chapter — sharper, funnier, and about 4,000 words shorter — arrived on the editor's desk exactly 11 days past deadline.",
    "The 2019 expedition recovered the log book intact; entries from March 3rd onward are written in a hand markedly different from those preceding.",
    "You could, in theory, replace the 8-bit look-up table with a 12-bit variant — though the memory footprint would balloon and, frankly, no one would thank you.",
    "The lecture hall (capacity: 340) was standing-room only by 6:45 p.m., and by 7:10 the fire marshal had politely but firmly closed the doors.",
    "Objections were raised — some substantive, most procedural — and the meeting adjourned without a vote, as meetings so often do.",
    "A 1962 memo, declassified in 2004, casually mentions 'Project Halyard' in passing; no other reference to the project has ever surfaced.",
    "The typography — a bastardized Didone with slab serifs bolted on — was so aggressively ugly that the client, delighted, approved it on the spot.",
    "Following the 7th consecutive quarter of margin compression, the board did what boards do: they commissioned a strategy deck of exactly 84 slides.",
  ],
};

export const DIFFICULTY_CONFIG = {
  easy: {
    label: "Easy",
    subtitle: "Warm-up bout — 25-30 WPM opponent",
    computerAttackMs: 4500,
    computerDamage: 8,
    computerWpm: 28,
    sentenceCount: 5,
    accent: "var(--success)",
  },
  medium: {
    label: "Medium",
    subtitle: "Steady rhythm — 45-55 WPM opponent",
    computerAttackMs: 2800,
    computerDamage: 12,
    computerWpm: 50,
    sentenceCount: 5,
    accent: "var(--accent)",
  },
  hard: {
    label: "Hard",
    subtitle: "Brutal pace — 70-85 WPM opponent",
    computerAttackMs: 1700,
    computerDamage: 16,
    computerWpm: 78,
    sentenceCount: 5,
    accent: "var(--danger)",
  },
};

// Fisher-Yates shuffle for random sentence pick without immediate repeats.
export const buildQueue = (difficulty, count) => {
  const pool = [...SENTENCES[difficulty]];
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }
  return pool.slice(0, count);
};
