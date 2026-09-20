// Sample problems (original placeholders). $...$ is inline KaTeX.
const TOPICS = {
  "number-theory": {
    name: "Number Theory", lead: "questions.", accent: "--accent-nt",
    sub: "Primes, divisibility, and modular arithmetic.",
    questions: [
      { level: "hard", text: "Let $T_i$ be the set of integers $n$ with $50i \\le n < 50(i+1)$. How many of $T_0,\\dots,T_{99}$ contain no perfect cube?", solution: "Sample solution goes here.", video: true, image: true },
      { level: "easy", text: "How many positive perfect squares less than $10^4$ are multiples of $12$?", image: true },
      { level: "medium", text: "Find the remainder when $7^{2026}$ is divided by $100$.", solution: "$7^4 \\equiv 1 \\pmod{100}$, and $2026 \\equiv 2 \\pmod 4$, so the remainder is $49$.", image: true }
    ]
  },
  "trigonometry": { name: "Trigonometry", lead: "questions.", accent: "--accent-trig", sub: "Angles, identities, and the unit circle.",
    questions: [{ level: "easy", text: "Evaluate $\\sin^2 15^\\circ + \\cos^2 15^\\circ$.", solution: "It equals $1$." }] },
  "calculus": { name: "Calculus", lead: "questions.", accent: "--accent-calc", sub: "Limits, derivatives, and integrals.",
    questions: [{ level: "medium", text: "Evaluate $\\displaystyle\\int_0^1 x e^{x}\\,dx$.", solution: "Integrate by parts: the value is $1$." }] },
  "combinatorics": { name: "Combinatorics", lead: "questions.", accent: "--accent-comb", sub: "Counting, arrangements, and probability.",
    questions: [{ level: "easy", text: "In how many ways can $5$ people sit around a circular table?", solution: "$(5-1)! = 24$." }] },
  "algebra": { name: "Algebra", lead: "questions.", accent: "--accent-alg", sub: "Equations, inequalities, and functions.",
    questions: [{ level: "hard", text: "If $a+b=3$ and $ab=1$, find $a^3+b^3$.", solution: "$a^3+b^3=27-9=18$." }] }
};
