# 🎤 Hackathon Pitch Script & Demo Guide

## 🚀 The Elevator Pitch
"We built **QuantumReady**—the bridge between 'Quantum Hype' and 'Business Reality'. It's a dual-engine platform: one part **AI Analyst** that assesses enterprise readiness, and one part **Physics Simulator** that proves quantum advantage on real data."

---

## 📅 The 3-Minute Demo Walkthrough

### 1. The Problem (Landing Page)
**Screen:** `index.html`
*   **"The problem is that CTOs don't know if they need Quantum.** They spend millions on R&D for problems that a classical GPU could solve better."
*   "We built a standardized assessment engine to solve this."

### 2. The Assessment (The Form)
**Action:** Click **"Analyze Now"**.
*   *Fast-forward through the form:*
    *   **Industry:** Manufacturing/Logistics.
    *   **Problem:** Optimization (Route Planning).
    *   **Scale:** High limits.
*   **Screen:** `Results Dashboard` (`index.html#results`)
*   **"Look at this Score (78/100).** We don't just say 'Yes/No'. We give:
    *   Scale of investment needed.
    *   **Classical Alternatives** (Honesty is key!).
    *   ROI Timeline."

### 3. The Real-World Proof (Amul Case Study)
**Action:** Click **"Live Case Study"** Banner.
**Screen:** `analysis.html`
*   **"We applied this to Amul.** We ingested 60 real raw milk samples from Gujarat."
*   **Show:** The Charts. "Contamination correlates with Transport Temp."
*   **"The Problem:** Tracing contamination source in a live supply chain is an $O(N)$ search problem. It's slow."

### 4. The Technical "Flex" (The Quantum Simulator)
**Action:** Scroll down -> Click **"Launch Quantum Simulator"**.
**Screen:** `quantum-demo.html`
*   **"Most hackathon projects just ask an LLM <i>'imagine you are a quantum computer'</i>. We didn't do that."**
*   **"We wrote a State-Vector Simulator in pure JavaScript."**
*   **Action:**
    1.  Select **"Batch AMQ-006 (Vadodara)"** (The contaminated one).
    2.  Click **"Run Quantum Circuit"**.
*   **Narrate strictly:**
    1.  **"Initialization:** We prepare 3 Qubits."
    2.  **"H-Gate:** We put them in Superposition (all states possible)."
    3.  **"Oracle:** We mark the bad batch phase mathematically."
    4.  **"Diffusion:** We amplify the probability."
*   **"Result:** We found the contamination in **2 steps**. Classically, checking 8 batches would take 4-8 steps. That's a quadratic speedup."

---

## ❓ Q&A Cheat Sheet

**Q: "Did you use a real Quantum Computer?"**
**A:** "No, we used a **Simulator**. Real quantum computers (IBM Q) have queues and errors. For a hackathon demo, a noiseless simulator is better to prove the *algorithmic* concept (Grover's Search) without waiting 20 minutes for a cloud job."

**Q: "How is the Suitability Score calculated?"**
**A:** "It's a weighted algorithm (not AI). We assign weights to problem types—Simulation gets +95, Optimization +80, but basic Search only +40. We then adjust for team size and budget. It's deterministic logic."

**Q: "Can this scale?"**
**A:** "The **Readiness Assessment** scales infinitely (it's a web app). The **Simulator** scales exponentially in RAM ($2^N$), so currently it works for demos (up to 20 qubits). For production, we'd hook the backend into **AWS Braket** or **Qiskit Runtime**."
