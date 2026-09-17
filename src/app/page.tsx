import LearningCoach from "@/components/LearningCoach";

export default function Home() {
  return (
    <div className="container" style={{ paddingTop: 48, paddingBottom: 80 }}>
      <header style={{ textAlign: "center", marginBottom: 36 }}>
        <h1 style={{ fontSize: "2.2rem", letterSpacing: "-0.5px" }}>TypeFluentAI</h1>
        <p style={{ color: "var(--muted)", marginTop: 8 }}>
          Learn English by Writing — a local, self-hosted writing coach.
        </p>
      </header>
      <LearningCoach />
    </div>
  );
}
