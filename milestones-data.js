// ============================================================
// DEVELOPMENTAL MILESTONES & IMMUNIZATION DATA
// ============================================================

// ============================================================
// MILESTONES — Expanded
// ============================================================

const milestonesData = [
    // Gross motor
    { value: "Lifts head prone (1-2 months)", minAge: 1, label: "Lifts head prone (1-2m)" },
    { value: "Holds head upright (2-3 months)", minAge: 2, label: "Holds head upright (2-3m)" },
    { value: "Rolls over (4-5 months)", minAge: 4, label: "Rolls over (4-5m)" },
    { value: "Sits with support (5-6 months)", minAge: 5, label: "Sits with support (5-6m)" },
    { value: "Sits without support (6-8 months)", minAge: 6, label: "Sits unsupported (6-8m)" },
    { value: "Crawls (8-10 months)", minAge: 8, label: "Crawls (8-10m)" },
    { value: "Pulls to stand (9-12 months)", minAge: 9, label: "Pulls to stand (9-12m)" },
    { value: "Walks holding furniture (12-14 months)", minAge: 12, label: "Walks holding furniture (12-14m)" },
    { value: "Walks alone (15-18 months)", minAge: 15, label: "Walks alone (15-18m)" },
    { value: "Runs (24 months)", minAge: 24, label: "Runs (24m)" },
    { value: "Jumps (30 months)", minAge: 30, label: "Jumps (30m)" },
    { value: "Stands on one foot (36 months)", minAge: 36, label: "Stands on one foot (36m)" },
    // Fine motor
    { value: "Reaches for objects (4 months)", minAge: 4, label: "Reaches for objects (4m)" },
    { value: "Transfers objects (6-7 months)", minAge: 6, label: "Transfers objects (6-7m)" },
    { value: "Pincer grasp (9-10 months)", minAge: 9, label: "Pincer grasp (9-10m)" },
    { value: "Stacks two blocks (12-15 months)", minAge: 12, label: "Stacks 2 blocks (12-15m)" },
    { value: "Draws circle (36 months)", minAge: 36, label: "Draws circle (36m)" },
    // Speech & language
    { value: "Coos (2-3 months)", minAge: 2, label: "Coos (2-3m)" },
    { value: "Social smile (6 weeks-2 months)", minAge: 2, label: "Social smile (by 2m)" },
    { value: "Babbling (6-8 months)", minAge: 6, label: "Babbling (6-8m)" },
    { value: "Speaks first words (12-18 months)", minAge: 12, label: "First words (12-18m)" },
    { value: "Speaks simple sentences (24-30 months)", minAge: 24, label: "Simple sentences (24-30m)" },
    { value: "Tells stories (36-48 months)", minAge: 36, label: "Tells stories (36-48m)" },
    // Social & emotional
    { value: "Responds to name (6-9 months)", minAge: 6, label: "Responds to name (6-9m)" },
    { value: "Stranger anxiety (8-10 months)", minAge: 8, label: "Stranger anxiety (8-10m)" },
    { value: "Imitates actions (12-15 months)", minAge: 12, label: "Imitates actions (12-15m)" },
    { value: "Parallel play (24-30 months)", minAge: 24, label: "Parallel play (24-30m)" },
    { value: "Shares with others (36-48 months)", minAge: 36, label: "Shares with others (36-48m)" },
    // Red flags
    { value: "Any regression (loss of skills)", minAge: null, label: "⚠️ Regression (red flag)" }
];

// ============================================================
// VACCINE LIST — Uganda EPI Schedule
// ============================================================

const vaccineList = [
    { name: "BCG", due: "Birth" }, { name: "OPV0", due: "Birth" },
    { name: "DPT-HepB-Hib1", due: "6 weeks" }, { name: "PCV1", due: "6 weeks" }, { name: "Rota1", due: "6 weeks" },
    { name: "DPT-HepB-Hib2", due: "10 weeks" }, { name: "PCV2", due: "10 weeks" }, { name: "Rota2", due: "10 weeks" },
    { name: "DPT-HepB-Hib3", due: "14 weeks" }, { name: "PCV3", due: "14 weeks" }, { name: "IPV", due: "14 weeks" },
    { name: "Measles 1", due: "9 months" }, { name: "Yellow Fever", due: "9 months" }, { name: "Measles 2", due: "18 months" }
];