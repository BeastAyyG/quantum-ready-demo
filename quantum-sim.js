/**
 * QUANTUM SIMULATOR ENGINE (JavaScript)
 * Implements a full state-vector quantum simulator for Grover's Algorithm.
 * No external libraries - Pure Linear Algebra.
 */

class QuantumCircuit {
    constructor(numQubits) {
        this.numQubits = numQubits;
        this.numStates = Math.pow(2, numQubits);
        // Initialize state vector |00...0> -> [1, 0, 0, ...]
        this.state = new Array(this.numStates).fill(0);
        this.state[0] = 1;
        this.gates = [];
    }

    // Apply Hadamard Gate to all qubits (Create Superposition)
    applyHadamard() {
        // H on all qubits transforms |0> to uniform superposition
        const prob = 1 / Math.sqrt(this.numStates);
        this.state.fill(prob);
        this.gates.push({ type: 'H', target: 'ALL' });
    }

    // Oracle: Marks the target state (flips the phase of the solution)
    // In real quantum hardware, this is a black box function.
    applyOracle(targetIndex) {
        // Flip the sign of the target state amplitude
        this.state[targetIndex] = -this.state[targetIndex];
        this.gates.push({ type: 'ORACLE', target: targetIndex });
    }

    // Grover Diffusion Operator (Inversion about the mean)
    // Amplifies the probability of the marked state
    applyDiffusion() {
        // Calculate mean amplitude
        const mean = this.state.reduce((sum, amp) => sum + amp, 0) / this.numStates;

        // Reflect across mean: Amp' = 2*mean - Amp
        for (let i = 0; i < this.numStates; i++) {
            this.state[i] = 2 * mean - this.state[i];
        }
        this.gates.push({ type: 'DIFFUSION', target: 'ALL' });
    }

    // Measure the system (Collapses state based on probabilities)
    measure() {
        const probabilities = this.state.map(amp => amp * amp);

        // In a simulator, we return the full probability distribution
        // In real hardware, we'd return a single collapsed state
        return probabilities;
    }

    // Get circuit diagram data
    getCircuitData() {
        return this.gates;
    }
}

// ===== UI INTEGRATION FOR AMUL DATA =====
const QuantumDemo = {
    circuit: null,
    targetIndex: 0,
    steps: 0,

    init(numQubits) {
        this.circuit = new QuantumCircuit(numQubits);
        this.steps = 0;
        console.log(`Quantum Circuit Initialized: ${numQubits} Qubits`);
    },

    // Run a full Grover Search simulation for a specific "Contaminated Sample"
    runSimulation(targetIndex) {
        // 1. Initialize
        this.circuit = new QuantumCircuit(3); // 3 Qubits = 8 States (Simulating 8 Batches)

        // 2. Superposition (Hadamard)
        this.circuit.applyHadamard();

        // 3. Grover Iterations (Optimal number for N=8 is ~2 iterations)
        // Iteration 1
        this.circuit.applyOracle(targetIndex);
        this.circuit.applyDiffusion();

        // Iteration 2 (Amplifies probability to >90%)
        this.circuit.applyOracle(targetIndex);
        this.circuit.applyDiffusion();

        return this.circuit.measure();
    }
};
