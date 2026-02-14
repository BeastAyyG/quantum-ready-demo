// ===== QUANTUM READINESS ANALYZER - Core Engine =====

// ===== Navigation =====
function toggleMobileMenu() {
    const menu = document.getElementById('mobileMenu');
    menu.classList.toggle('active');
}

function scrollToAnalyzer() {
    document.getElementById('analyzer').scrollIntoView({ behavior: 'smooth' });
}

// ===== Animated Counters =====
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const target = parseInt(el.dataset.count);
                animateNumber(el, 0, target, 2000);
                observer.unobserve(el);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => observer.observe(counter));
}

function animateNumber(el, start, end, duration) {
    const startTime = performance.now();
    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = Math.floor(start + (end - start) * eased);
        el.textContent = current.toLocaleString();
        if (progress < 1) requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
}

// ===== Multi-Step Form =====
let currentStep = 1;
const totalSteps = 4;

function nextStep(step) {
    if (!validateStep(step)) return;

    document.getElementById(`step${step}`).classList.remove('active');
    document.getElementById(`step${step + 1}`).classList.add('active');
    currentStep = step + 1;
    updateProgress();
}

function prevStep(step) {
    document.getElementById(`step${step}`).classList.remove('active');
    document.getElementById(`step${step - 1}`).classList.add('active');
    currentStep = step - 1;
    updateProgress();
}

function updateProgress() {
    const fill = document.getElementById('progressFill');
    fill.style.width = `${(currentStep / totalSteps) * 100}%`;

    document.querySelectorAll('.progress-step').forEach((stepEl, index) => {
        stepEl.classList.remove('active', 'completed');
        if (index + 1 === currentStep) stepEl.classList.add('active');
        else if (index + 1 < currentStep) stepEl.classList.add('completed');
    });
}

function validateStep(step) {
    if (step === 1) {
        const companyName = document.getElementById('companyName').value;
        const industry = document.getElementById('industry').value;
        const companySize = document.getElementById('companySize').value;

        if (!companyName || !industry || !companySize) {
            shakeElement(document.querySelector(`#step${step} .form-card`));
            return false;
        }
    }
    if (step === 2) {
        const problems = document.querySelectorAll('input[name="problems"]:checked');
        if (problems.length === 0) {
            shakeElement(document.querySelector(`#step${step} .form-card`));
            return false;
        }
    }
    return true;
}

function shakeElement(el) {
    el.style.animation = 'shake 0.5s ease';
    setTimeout(() => el.style.animation = '', 500);
}

// Add shake animation
const shakeStyle = document.createElement('style');
shakeStyle.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        10%, 30%, 50%, 70%, 90% { transform: translateX(-4px); }
        20%, 40%, 60%, 80% { transform: translateX(4px); }
    }
`;
document.head.appendChild(shakeStyle);

// ===== Quantum Analysis Engine =====
const QUANTUM_KNOWLEDGE = {
    optimization: {
        name: 'Optimization Problems',
        suitability: 82,
        algorithms: ['QAOA (Quantum Approximate Optimization Algorithm)', 'VQE (Variational Quantum Eigensolver)', 'Grover\'s Adaptive Search'],
        qubits: { logical: '50-500', physical: '5,000-50,000' },
        speedup: 'Quadratic to Polynomial',
        timeline: '2-4 years',
        reasoning: 'Optimization problems are among the most promising near-term quantum applications. Combinatorial optimization (routing, scheduling, portfolio) can leverage QAOA on NISQ devices. However, for problems with fewer than ~1000 variables, classical solvers like Gurobi often remain competitive.',
        classicalAlt: 'Simulated Annealing, Genetic Algorithms, Mixed Integer Programming (Gurobi/CPLEX), Tensor Network methods',
        industries: ['logistics', 'finance', 'manufacturing', 'retail']
    },
    simulation: {
        name: 'Quantum Simulation',
        suitability: 95,
        algorithms: ['VQE', 'QPE (Quantum Phase Estimation)', 'Hamiltonian Simulation'],
        qubits: { logical: '100-1,000', physical: '10,000-100,000' },
        speedup: 'Exponential',
        timeline: '3-5 years',
        reasoning: 'Molecular and materials simulation is the strongest use case for quantum computing. Simulating quantum mechanical systems on classical computers scales exponentially, while quantum computers handle this naturally. Drug discovery, catalyst design, and materials science will see the earliest quantum advantage.',
        classicalAlt: 'Density Functional Theory (DFT), Molecular Dynamics (MD), Monte Carlo methods — but these fundamentally cannot scale for large molecular systems',
        industries: ['pharma', 'energy', 'manufacturing', 'agriculture']
    },
    ml: {
        name: 'Quantum Machine Learning',
        suitability: 55,
        algorithms: ['QML Kernels', 'Quantum Neural Networks', 'Quantum Boltzmann Machines'],
        qubits: { logical: '100-2,000', physical: '10,000-200,000' },
        speedup: 'Unclear / Problem-dependent',
        timeline: '5-8 years',
        reasoning: 'Quantum ML is highly researched but practical advantage remains unproven for most tasks. Classical deep learning continues to advance rapidly. Potential advantages exist in specific feature spaces, kernel methods, and generative models. However, data loading bottleneck (classical→quantum) limits near-term value.',
        classicalAlt: 'GPU-accelerated deep learning (PyTorch/TensorFlow), Transformers, Foundation Models, AutoML — these are improving faster than QML currently',
        industries: ['technology', 'finance', 'retail']
    },
    cryptography: {
        name: 'Cryptography & Security',
        suitability: 70,
        algorithms: ['Shor\'s Algorithm (future threat)', 'Quantum Key Distribution (QKD)', 'Post-Quantum Cryptography migration'],
        qubits: { logical: '2,000-4,000', physical: '1M-20M' },
        speedup: 'Exponential (for code-breaking)',
        timeline: '8-15 years (threat), NOW (preparation)',
        reasoning: 'While large-scale quantum computers that can break RSA/ECC are 8-15 years away, organizations must start preparing NOW. "Harvest now, decrypt later" attacks are an immediate threat. Migrating to post-quantum cryptography (PQC) standards like CRYSTALS-Kyber should begin today.',
        classicalAlt: 'Post-Quantum Cryptography (NIST PQC standards), Lattice-based cryptography — these ARE the recommended path for now',
        industries: ['finance', 'defense', 'telecom', 'technology']
    },
    search: {
        name: 'Search & Database Operations',
        suitability: 40,
        algorithms: ['Grover\'s Algorithm', 'Quantum Walk Search', 'Amplitude Amplification'],
        qubits: { logical: '50-500', physical: '5,000-50,000' },
        speedup: 'Quadratic (√N)',
        timeline: '5-10 years',
        reasoning: 'Grover\'s algorithm provides proven quadratic speedup for unstructured search, but the practical overhead is high. Classical databases with proper indexing, caching, and distributed computing often outperform quantum search for structured queries. Quantum advantage requires truly unstructured search over massive datasets.',
        classicalAlt: 'Elasticsearch, Vector databases (Pinecone, Weaviate), GPU-accelerated search, Approximate Nearest Neighbor algorithms',
        industries: ['technology', 'retail', 'telecom']
    },
    financial: {
        name: 'Financial Modeling',
        suitability: 78,
        algorithms: ['Quantum Monte Carlo', 'Quantum Amplitude Estimation', 'QAOA for Portfolio Optimization'],
        qubits: { logical: '100-1,000', physical: '10,000-100,000' },
        speedup: 'Quadratic to Polynomial',
        timeline: '3-5 years',
        reasoning: 'Financial modeling is a strong near-term use case. Monte Carlo simulations for risk analysis can achieve quadratic speedup. Portfolio optimization maps directly to combinatorial optimization. Major banks (JPMorgan, Goldman Sachs, BBVA) are already running quantum experiments.',
        classicalAlt: 'GPU-accelerated Monte Carlo, Traditional MIP solvers, Neural network-based pricing models',
        industries: ['finance']
    }
};

const INDUSTRY_CONTEXT = {
    finance: { name: 'Finance & Banking', quantum_readiness: 'High', key_use_cases: 'Portfolio optimization, risk modeling, fraud detection, derivative pricing', investment_level: 'Leaders (JPMorgan, Goldman) already investing heavily' },
    pharma: { name: 'Pharmaceuticals', quantum_readiness: 'Very High', key_use_cases: 'Drug discovery, molecular simulation, clinical trial optimization', investment_level: 'Major pharma companies partnering with quantum startups' },
    logistics: { name: 'Logistics & Supply Chain', quantum_readiness: 'High', key_use_cases: 'Route optimization, supply chain resilience, demand forecasting', investment_level: 'Growing interest, early POCs at major logistics firms' },
    energy: { name: 'Energy & Utilities', quantum_readiness: 'Medium-High', key_use_cases: 'Grid optimization, materials for solar/batteries, carbon capture simulation', investment_level: 'Moderate investment, long-term strategic importance' },
    manufacturing: { name: 'Manufacturing', quantum_readiness: 'Medium', key_use_cases: 'Process optimization, materials science, quality control', investment_level: 'Early exploration phase for most manufacturers' },
    telecom: { name: 'Telecommunications', quantum_readiness: 'Medium', key_use_cases: 'Network optimization, quantum-safe communications, signal processing', investment_level: 'Growing interest in quantum-safe infrastructure' },
    retail: { name: 'Retail & E-commerce', quantum_readiness: 'Low-Medium', key_use_cases: 'Supply chain optimization, personalization, inventory management', investment_level: 'Limited direct investment, benefits via cloud platforms' },
    defense: { name: 'Defense & Aerospace', quantum_readiness: 'Very High', key_use_cases: 'Cryptography, simulation, optimization, sensing', investment_level: 'Government-level investment globally' },
    agriculture: { name: 'Agriculture', quantum_readiness: 'Low', key_use_cases: 'Fertilizer simulation, crop optimization, weather modeling', investment_level: 'Very early stage, mostly academic research' },
    automotive: { name: 'Automotive', quantum_readiness: 'Medium', key_use_cases: 'Battery simulation, traffic optimization, supply chain, materials', investment_level: 'BMW, Volkswagen, Hyundai actively exploring' },
    technology: { name: 'Technology & SaaS', quantum_readiness: 'High', key_use_cases: 'Cloud quantum services, algorithm development, security', investment_level: 'Big tech (Google, IBM, Microsoft, Amazon) leading investment' },
    other: { name: 'Other Industry', quantum_readiness: 'Variable', key_use_cases: 'Depends on specific computational challenges', investment_level: 'Cross-industry quantum cloud access growing' }
};

function collectFormData() {
    const problems = Array.from(document.querySelectorAll('input[name="problems"]:checked')).map(cb => cb.value);
    const quantumExp = document.querySelector('input[name="quantumExp"]:checked')?.value || 'none';

    return {
        companyName: document.getElementById('companyName').value,
        industry: document.getElementById('industry').value,
        companySize: document.getElementById('companySize').value,
        annualRevenue: document.getElementById('annualRevenue').value || 'medium',
        problems,
        problemDescription: document.getElementById('problemDescription').value,
        currentCompute: document.getElementById('currentCompute').value || 'cloud',
        dataScale: document.getElementById('dataScale').value || 'tb',
        teamSize: document.getElementById('teamSize').value || 'medium',
        quantumExp,
        primaryGoal: document.getElementById('primaryGoal').value || 'speed',
        timeline: document.getElementById('timeline').value || 'medium',
        constraints: document.getElementById('constraints').value
    };
}

function calculateQuantumReadiness(data) {
    // Calculate composite score
    let totalScore = 0;
    let problemDetails = [];
    let bestAlgorithms = [];
    let allClassicalAlts = [];

    data.problems.forEach(problem => {
        const info = QUANTUM_KNOWLEDGE[problem];
        if (info) {
            totalScore += info.suitability;
            problemDetails.push(info);
            bestAlgorithms.push(...info.algorithms);
            allClassicalAlts.push(info.classicalAlt);
        }
    });

    let avgScore = Math.round(totalScore / data.problems.length);

    // Adjustments based on context
    const industryInfo = INDUSTRY_CONTEXT[data.industry];

    // Industry readiness modifier
    const readinessMap = { 'Very High': 10, 'High': 5, 'Medium-High': 2, 'Medium': 0, 'Low-Medium': -5, 'Low': -10, 'Variable': 0 };
    avgScore += readinessMap[industryInfo?.quantum_readiness] || 0;

    // Company size modifier
    const sizeMap = { 'startup': -8, 'small': -5, 'medium': 0, 'large': 5, 'enterprise': 8 };
    avgScore += sizeMap[data.companySize] || 0;

    // Budget modifier
    const budgetMap = { 'low': -10, 'medium': -3, 'high': 5, 'very-high': 10 };
    avgScore += budgetMap[data.annualRevenue] || 0;

    // Experience modifier
    const expMap = { 'none': -5, 'research': 0, 'poc': 8, 'production': 15 };
    avgScore += expMap[data.quantumExp] || 0;

    avgScore = Math.max(10, Math.min(98, avgScore));

    // Calculate qubit estimate
    let minQubits = 0, maxQubits = 0;
    problemDetails.forEach(p => {
        const logicalRange = p.qubits.logical.split('-').map(s => parseInt(s.replace(/,/g, '')));
        minQubits = Math.max(minQubits, logicalRange[0]);
        maxQubits = Math.max(maxQubits, logicalRange[1] || logicalRange[0]);
    });

    // ROI timeline
    let roiYears = '3-5';
    if (avgScore >= 80) roiYears = '2-3';
    else if (avgScore >= 60) roiYears = '3-5';
    else if (avgScore >= 40) roiYears = '5-8';
    else roiYears = '8+';

    // Speedup estimate
    let speedup = '';
    const hasSimulation = data.problems.includes('simulation');
    const hasCrypto = data.problems.includes('cryptography');
    if (hasSimulation || hasCrypto) speedup = 'Exponential';
    else if (data.problems.includes('optimization') || data.problems.includes('financial')) speedup = 'Quadratic+';
    else if (data.problems.includes('search')) speedup = 'Quadratic';
    else speedup = 'Variable';

    // Generate Technical Reasoning
    let technicalHTML = '';
    problemDetails.forEach(problem => {
        technicalHTML += `<h4>${problem.name}</h4>`;
        technicalHTML += `<p>${problem.reasoning}</p>`;
        technicalHTML += `<p><strong>Recommended Quantum Algorithms:</strong></p><ul>`;
        problem.algorithms.forEach(algo => {
            technicalHTML += `<li>${algo}</li>`;
        });
        technicalHTML += `</ul>`;
        technicalHTML += `<p>Required Qubits: <span class="highlight">${problem.qubits.logical} logical</span> (${problem.qubits.physical} physical with error correction)</p>`;
        technicalHTML += `<p>Expected Speedup: <span class="positive">${problem.speedup}</span></p>`;
    });

    if (data.problemDescription) {
        technicalHTML += `<h4>Your Specific Challenge</h4>`;
        technicalHTML += `<p>Based on your description: "<em>${data.problemDescription}</em>"</p>`;
        technicalHTML += `<p>This problem maps to ${data.problems.map(p => QUANTUM_KNOWLEDGE[p]?.name || p).join(', ')} domain(s). `;
        if (avgScore >= 70) {
            technicalHTML += `This is a <span class="positive">strong candidate</span> for quantum computing, with near-term potential on NISQ devices or medium-term advantage on fault-tolerant quantum computers.</p>`;
        } else if (avgScore >= 45) {
            technicalHTML += `This shows <span class="highlight">moderate quantum potential</span>. We recommend starting with hybrid classical-quantum approaches while monitoring quantum hardware advancement.</p>`;
        } else {
            technicalHTML += `Classical solutions currently <span class="warning">outperform quantum approaches</span> for this type of challenge. However, strategic preparation is still valuable.</p>`;
        }
    }

    // Generate Economic Analysis
    let economicHTML = '';
    economicHTML += `<h4>Industry Position: ${industryInfo.name}</h4>`;
    economicHTML += `<p>Industry Quantum Readiness: <span class="highlight">${industryInfo.quantum_readiness}</span></p>`;
    economicHTML += `<p>${industryInfo.investment_level}</p>`;
    economicHTML += `<p>Key Use Cases in Your Industry: ${industryInfo.key_use_cases}</p>`;

    economicHTML += `<h4>ROI Projection</h4>`;
    if (avgScore >= 70) {
        economicHTML += `<p>With a quantum suitability score of <span class="positive">${avgScore}/100</span>, your organization stands to gain significant competitive advantage.</p>`;
        economicHTML += `<ul>`;
        economicHTML += `<li><span class="positive">Early mover advantage</span> — Organizations investing now will lead in 3-5 years</li>`;
        economicHTML += `<li>Estimated <span class="highlight">${roiYears} years</span> to positive quantum ROI</li>`;
        economicHTML += `<li>Potential <span class="highlight">15-40% improvement</span> in computational efficiency for target problems</li>`;
        economicHTML += `</ul>`;
    } else if (avgScore >= 45) {
        economicHTML += `<p>With a moderate score of <span class="highlight">${avgScore}/100</span>, a measured approach is recommended.</p>`;
        economicHTML += `<ul>`;
        economicHTML += `<li>Start with <span class="highlight">quantum-ready</span> classical optimization first</li>`;
        economicHTML += `<li>Budget for quantum experimentation: <span class="highlight">5-10%</span> of R&D</li>`;
        economicHTML += `<li>Estimated ${roiYears} years to positive ROI — <span class="warning">high uncertainty</span></li>`;
        economicHTML += `</ul>`;
    } else {
        economicHTML += `<p>With current score of <span class="warning">${avgScore}/100</span>, direct quantum investment has limited near-term return.</p>`;
        economicHTML += `<ul>`;
        economicHTML += `<li>Focus on <span class="positive">classical optimization</span> for immediate gains</li>`;
        economicHTML += `<li>Maintain <span class="highlight">awareness</span> through industry conferences and partnerships</li>`;
        economicHTML += `<li>Re-evaluate quantum readiness in <span class="highlight">2-3 years</span></li>`;
        economicHTML += `</ul>`;
    }

    // Budget consideration
    const budgetNames = { 'low': 'below ₹1 Crore', 'medium': '₹1-10 Crore', 'high': '₹10-100 Crore', 'very-high': '₹100+ Crore' };
    economicHTML += `<h4>Budget Assessment</h4>`;
    economicHTML += `<p>With your tech budget of <span class="highlight">${budgetNames[data.annualRevenue] || 'moderate'}</span>, `;
    if (data.annualRevenue === 'very-high' || data.annualRevenue === 'high') {
        economicHTML += `you have sufficient resources to pursue a dedicated quantum program. Consider allocating ₹50L-2Cr for initial quantum POC and team building.</p>`;
    } else {
        economicHTML += `we recommend leveraging quantum cloud services (IBM Quantum, Amazon Braket, Azure Quantum) rather than building in-house capability. Cloud access starts at minimal cost.</p>`;
    }

    // Classical Alternatives
    let classicalHTML = '';
    classicalHTML += `<h4>Recommended Classical Approaches</h4>`;
    classicalHTML += `<p>Before committing to quantum, these classical solutions may address your current needs:</p>`;
    classicalHTML += `<ul>`;
    allClassicalAlts.forEach(alt => {
        classicalHTML += `<li>${alt}</li>`;
    });
    classicalHTML += `</ul>`;
    classicalHTML += `<h4>Honest Assessment</h4>`;
    if (avgScore >= 75) {
        classicalHTML += `<p>While classical alternatives exist, your problems are approaching the <span class="positive">limits of classical computation</span>. Quantum advantage is realistic for your use cases within the next ${roiYears} years. We recommend a <span class="highlight">hybrid strategy</span>: optimize classically today while building quantum capability.</p>`;
    } else if (avgScore >= 50) {
        classicalHTML += `<p>Classical solutions remain <span class="highlight">competitive</span> for your current scale. However, as your data and problem complexity grows, quantum approaches may become advantageous. We recommend <span class="highlight">quantum-inspired algorithms</span> as a bridge — they run classically but use quantum-derived techniques.</p>`;
    } else {
        classicalHTML += `<p>For your current challenges, classical approaches are <span class="positive">significantly more practical</span>. Invest in <span class="highlight">GPU acceleration</span>, better algorithms, and distributed computing. These will deliver immediate, measurable improvements at a fraction of quantum investment.</p>`;
    }

    // Migration Roadmap
    let roadmapHTML = '<div class="roadmap-timeline">';

    if (avgScore >= 60) {
        roadmapHTML += `
            <div class="roadmap-phase">
                <span class="phase-time">Month 1-3</span>
                <div class="phase-content">
                    <h5>Phase 1: Assessment & Training</h5>
                    <p>Complete internal quantum literacy program. Identify top 3 problems for quantum POC. Choose quantum cloud provider (IBM/Amazon/Azure).</p>
                </div>
            </div>
            <div class="roadmap-phase">
                <span class="phase-time">Month 4-9</span>
                <div class="phase-content">
                    <h5>Phase 2: Proof of Concept</h5>
                    <p>Build quantum POC for highest-value problem using ${problemDetails[0]?.algorithms[0] || 'VQE/QAOA'}. Benchmark against classical solutions. Document results and learnings.</p>
                </div>
            </div>
            <div class="roadmap-phase">
                <span class="phase-time">Year 1-2</span>
                <div class="phase-content">
                    <h5>Phase 3: Hybrid Integration</h5>
                    <p>Deploy hybrid classical-quantum pipeline. Establish quantum team (2-3 specialists). Develop quantum-ready data workflows. Partner with quantum hardware vendors.</p>
                </div>
            </div>
            <div class="roadmap-phase">
                <span class="phase-time">Year 2-5</span>
                <div class="phase-content">
                    <h5>Phase 4: Quantum Advantage</h5>
                    <p>Scale quantum workloads as hardware matures. Target fault-tolerant quantum computing for maximum speedup. Establish competitive moat in quantum-enabled services.</p>
                </div>
            </div>`;
    } else {
        roadmapHTML += `
            <div class="roadmap-phase">
                <span class="phase-time">Now</span>
                <div class="phase-content">
                    <h5>Phase 1: Classical Optimization</h5>
                    <p>Maximize current infrastructure. Implement GPU acceleration, better algorithms, and distributed computing for immediate gains.</p>
                </div>
            </div>
            <div class="roadmap-phase">
                <span class="phase-time">Year 1</span>
                <div class="phase-content">
                    <h5>Phase 2: Quantum Awareness</h5>
                    <p>Send 1-2 team members for quantum computing courses. Attend industry conferences. Monitor quantum hardware progress relevant to ${industryInfo.name}.</p>
                </div>
            </div>
            <div class="roadmap-phase">
                <span class="phase-time">Year 2-3</span>
                <div class="phase-content">
                    <h5>Phase 3: Re-Evaluation</h5>
                    <p>Re-assess quantum readiness as hardware advances. Begin small-scale quantum experiments via cloud. Evaluate quantum-inspired algorithms for current workloads.</p>
                </div>
            </div>
            <div class="roadmap-phase">
                <span class="phase-time">Year 3-5</span>
                <div class="phase-content">
                    <h5>Phase 4: Strategic Decision</h5>
                    <p>Based on quantum hardware maturity and business needs, make informed decision on quantum investment. Market may be ready for meaningful quantum advantage by then.</p>
                </div>
            </div>`;
    }

    roadmapHTML += '</div>';

    // Score label
    let scoreLabel = '';
    if (avgScore >= 80) scoreLabel = '🟢 Highly Quantum Suitable';
    else if (avgScore >= 60) scoreLabel = '🔵 Strong Quantum Potential';
    else if (avgScore >= 40) scoreLabel = '🟡 Moderate Quantum Fit';
    else scoreLabel = '🟠 Limited Near-Term Quantum Value';

    return {
        score: avgScore,
        scoreLabel,
        qubitEstimate: `${minQubits}-${maxQubits}`,
        roiTimeline: roiYears,
        speedup,
        technicalHTML,
        economicHTML,
        classicalHTML,
        roadmapHTML,
        companyName: data.companyName,
        industry: industryInfo.name
    };
}

// ===== Run Analysis =====
async function analyzeQuantumReadiness() {
    if (!validateStep(4)) return;

    const data = collectFormData();

    // Show loading
    const form = document.getElementById('analyzerForm');
    const progress = document.getElementById('progressContainer');
    const loading = document.getElementById('loadingState');

    form.style.display = 'none';
    progress.style.display = 'none';
    loading.style.display = 'block';

    // Animated loading
    const loadingTexts = [
        'Evaluating computational problems...',
        'Mapping quantum algorithms...',
        'Estimating qubit requirements...',
        'Analyzing hardware availability...',
        'Calculating ROI projections...',
        'Building migration roadmap...',
        'Generating final report...'
    ];

    const loadingBar = document.getElementById('loadingBar');
    const loadingText = document.getElementById('loadingText');

    for (let i = 0; i < loadingTexts.length; i++) {
        await sleep(400 + Math.random() * 300);
        loadingText.textContent = loadingTexts[i];
        loadingBar.style.width = `${((i + 1) / loadingTexts.length) * 100}%`;
    }

    await sleep(500);

    // Calculate results
    const results = calculateQuantumReadiness(data);

    // Show results
    loading.style.display = 'none';
    const dashboard = document.getElementById('resultsDashboard');
    dashboard.style.display = 'block';

    // Populate header
    document.getElementById('resultsCompany').innerHTML = `
        📊 Quantum Readiness Report: <span class="gradient-text">${results.companyName}</span>
    `;
    document.getElementById('resultsDate').textContent = new Date().toLocaleDateString('en-IN', {
        day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit'
    });

    // Animate score ring
    setTimeout(() => {
        const circle = document.getElementById('scoreCircle');
        const circumference = 2 * Math.PI * 52;
        const offset = circumference - (results.score / 100) * circumference;
        circle.style.transition = 'stroke-dashoffset 1.5s cubic-bezier(0.4, 0, 0.2, 1)';
        circle.style.strokeDashoffset = offset;

        animateNumber(document.getElementById('mainScore'), 0, results.score, 1500);
    }, 200);

    document.getElementById('scoreLabel').textContent = results.scoreLabel;
    document.getElementById('qubitEstimate').textContent = results.qubitEstimate;
    document.getElementById('roiTimeline').textContent = `${results.roiTimeline} yr`;
    document.getElementById('speedup').textContent = results.speedup;

    // Populate panels
    document.getElementById('technicalContent').innerHTML = results.technicalHTML;
    document.getElementById('economicContent').innerHTML = results.economicHTML;
    document.getElementById('classicalContent').innerHTML = results.classicalHTML;
    document.getElementById('roadmapContent').innerHTML = results.roadmapHTML;

    // Scroll to dashboard
    dashboard.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function resetAnalyzer() {
    const dashboard = document.getElementById('resultsDashboard');
    const form = document.getElementById('analyzerForm');
    const progress = document.getElementById('progressContainer');

    dashboard.style.display = 'none';
    form.style.display = 'block';
    progress.style.display = 'block';

    // Reset to step 1
    document.querySelectorAll('.form-step').forEach(step => step.classList.remove('active'));
    document.getElementById('step1').classList.add('active');
    currentStep = 1;
    updateProgress();

    // Reset score circle
    document.getElementById('scoreCircle').style.transition = 'none';
    document.getElementById('scoreCircle').style.strokeDashoffset = '327';

    scrollToAnalyzer();
}

// ===== Download Report =====
function downloadReport() {
    const companyName = document.getElementById('resultsCompany').textContent.trim();
    const date = document.getElementById('resultsDate').textContent;
    const score = document.getElementById('mainScore').textContent;
    const label = document.getElementById('scoreLabel').textContent;
    const qubits = document.getElementById('qubitEstimate').textContent;
    const roi = document.getElementById('roiTimeline').textContent;
    const speedup = document.getElementById('speedup').textContent;

    const technical = document.getElementById('technicalContent').innerText;
    const economic = document.getElementById('economicContent').innerText;
    const classical = document.getElementById('classicalContent').innerText;
    const roadmap = document.getElementById('roadmapContent').innerText;

    const report = `
════════════════════════════════════════════════════
     QUANTUM READINESS ASSESSMENT REPORT
     QuantumReady™ — Enterprise Quantum Analyzer
════════════════════════════════════════════════════

${companyName}
Generated: ${date}

────────────────────────────────────────────────────
EXECUTIVE SUMMARY
────────────────────────────────────────────────────

Quantum Suitability Score: ${score}/100 — ${label}
Estimated Qubits Required: ${qubits} logical qubits
ROI Timeline: ${roi}
Potential Speedup: ${speedup}

────────────────────────────────────────────────────
TECHNICAL REASONING
────────────────────────────────────────────────────

${technical}

────────────────────────────────────────────────────
ECONOMIC ANALYSIS
────────────────────────────────────────────────────

${economic}

────────────────────────────────────────────────────
CLASSICAL ALTERNATIVES
────────────────────────────────────────────────────

${classical}

────────────────────────────────────────────────────
MIGRATION ROADMAP
────────────────────────────────────────────────────

${roadmap}

════════════════════════════════════════════════════
© 2026 QuantumReady. All rights reserved.
This report is for informational purposes only.
════════════════════════════════════════════════════
    `.trim();

    const blob = new Blob([report], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `QuantumReady_Report_${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

// ===== Smooth Scroll Reveal =====
function initScrollReveal() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.feature-card, .step, .pricing-card, .result-panel').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// ===== Navbar scroll effect =====
function initNavbarScroll() {
    window.addEventListener('scroll', () => {
        const navbar = document.getElementById('navbar');
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(10, 10, 15, 0.95)';
            navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.3)';
        } else {
            navbar.style.background = 'rgba(10, 10, 15, 0.8)';
            navbar.style.boxShadow = 'none';
        }
    });
}

// ===== Init =====
document.addEventListener('DOMContentLoaded', () => {
    animateCounters();
    initScrollReveal();
    initNavbarScroll();
});
