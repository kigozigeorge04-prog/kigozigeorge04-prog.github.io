// ============================================================
// SYMPTOM GUIDES — all presenting complaints
// ============================================================

const symptomGuides = {
    // ============================================================
    // 1. FEVER
    // ============================================================
    fever: {
        title: "🌡️ Fever",
        chapter: "Nelson, Ch. 275",
        questions: [
            { q: "How long has the fever been present?", hint: "Acute <7d, subacute 7–14d, chronic >14d", clues: [
                { text: "< 7 days", label: "Acute", color: "#e67e22", desc: "Malaria, viral URTI, pneumonia" },
                { text: "7–14 days", label: "Subacute", color: "#8e44ad", desc: "Typhoid, TB" },
                { text: "> 14 days", label: "Chronic/PUO", color: "#c0392b", desc: "TB, HIV, lymphoma" }
            ]},
            { q: "What is the highest recorded temperature?", hint: "Measure axillary or tympanic", clues: [
                { text: "37.5–38.4°C", label: "Low-grade", color: "#27ae60", desc: "Viral, mild bacterial" },
                { text: "38.5–39.4°C", label: "Moderate", color: "#e67e22", desc: "Bacterial, malaria" },
                { text: "≥ 39.5°C", label: "High-grade", color: "#c0392b", desc: "Risk of convulsions, severe infection" }
            ]},
            { q: "What is the fever pattern?", hint: "Continuous, intermittent, remittent", clues: [
                { text: "Continuous", label: "Continuous", color: "#2980b9", desc: "Typhoid, viral" },
                { text: "Intermittent", label: "Intermittent", color: "#e67e22", desc: "Malaria, abscess" },
                { text: "Remittent", label: "Remittent", color: "#8e44ad", desc: "TB, lymphoma" }
            ]},
            { q: "Does the child have rigors (uncontrollable shaking)?", hint: "Associated with bacteraemia or malaria", clues: [
                { text: "Yes", label: "Present", color: "#c0392b", desc: "Malaria, sepsis" },
                { text: "No", label: "Absent", color: "#27ae60", desc: "Less likely bacterial" }
            ]},
            { q: "Is there any associated cough, runny nose, or difficulty breathing?", hint: "Respiratory focus", clues: [
                { text: "Cough + fast breathing", label: "Pneumonia", color: "#e67e22", desc: "Likely pneumonia" },
                { text: "Runny nose only", label: "URTI", color: "#27ae60", desc: "Viral URTI" },
                { text: "Difficulty breathing", label: "Respiratory distress", color: "#c0392b", desc: "Severe pneumonia, asthma" }
            ]},
            { q: "Is there any vomiting, diarrhoea, or abdominal pain?", hint: "Gastrointestinal focus", clues: [
                { text: "Diarrhoea + vomiting", label: "Gastroenteritis", color: "#e67e22", desc: "Viral or bacterial" },
                { text: "Abdominal pain + fever", label: "Abdominal infection", color: "#c0392b", desc: "Appendicitis, UTI" },
                { text: "None", label: "No GI symptoms", color: "#27ae60", desc: "Fever from other source" }
            ]},
            { q: "Is there a skin rash? If yes, describe it.", hint: "Maculopapular, petechial, vesicular", clues: [
                { text: "Maculopapular", label: "Measles/viral", color: "#8e44ad", desc: "Measles, rubella" },
                { text: "Petechial/purpuric", label: "Meningococcaemia", color: "#c0392b", desc: "Emergency!" },
                { text: "Vesicular", label: "Chickenpox", color: "#e67e22", desc: "Varicella" }
            ]},
            { q: "Is there neck stiffness or photophobia?", hint: "Meningeal irritation", clues: [
                { text: "Yes", label: "Meningitis", color: "#c0392b", desc: "Urgent LP and antibiotics" },
                { text: "No", label: "No meningism", color: "#27ae60", desc: "CNS infection less likely" }
            ]},
            { q: "Is the child eating and drinking normally?", hint: "Hydration and severity", clues: [
                { text: "Normal", label: "Mild illness", color: "#27ae60", desc: "Can manage at home" },
                { text: "Reduced", label: "Moderate", color: "#e67e22", desc: "Monitor hydration" },
                { text: "Unable to drink", label: "Danger sign", color: "#c0392b", desc: "Immediate admission" }
            ]},
            { q: "Has the child had any convulsions?", hint: "Febrile seizure or CNS infection", clues: [
                { text: "Yes, brief (<5min)", label: "Simple febrile seizure", color: "#e67e22", desc: "Usually benign" },
                { text: "Yes, prolonged/focal", label: "Complex seizure", color: "#c0392b", desc: "Exclude meningitis" },
                { text: "No", label: "No seizures", color: "#27ae60", desc: "Less concern" }
            ]},
            { q: "Is the child lethargic or unusually irritable?", hint: "CNS or severe infection", clues: [
                { text: "Lethargic", label: "Danger sign", color: "#c0392b", desc: "Cerebral malaria, meningitis" },
                { text: "Irritable", label: "Meningism", color: "#e67e22", desc: "Could be early meningitis" },
                { text: "Normal", label: "Well", color: "#27ae60", desc: "Reassuring" }
            ]}
        ],
        redFlags: [
            "Fever + altered consciousness → cerebral malaria/meningitis",
            "Fever + non‑blanching rash → meningococcaemia",
            "Fever + inability to drink → severe illness, admit",
            "Fever + convulsions >5 min → treat as status epilepticus"
        ],
        tips: [
            "Always test for malaria in endemic areas.",
            "Check for HIV in prolonged fever or recurrent infections.",
            "Assess for dehydration in febrile children."
        ]
    },

    // ============================================================
    // 2. COUGH
    // ============================================================
    cough: {
        title: "🤧 Cough",
        chapter: "Nelson, Ch. 409",
        questions: [
            { q: "How long has the cough been present?", hint: "Acute <2w, subacute 2–8w, chronic >8w", clues: [
                { text: "< 2 weeks", label: "Acute", color: "#27ae60", desc: "Viral URTI, pneumonia" },
                { text: "2–8 weeks", label: "Subacute", color: "#e67e22", desc: "Pertussis, early TB" },
                { text: "> 8 weeks", label: "Chronic", color: "#c0392b", desc: "TB, asthma, GORD" }
            ]},
            { q: "Is the cough dry or productive?", hint: "Sputum production suggests infection", clues: [
                { text: "Dry", label: "Non‑productive", color: "#2980b9", desc: "Viral, asthma, allergy" },
                { text: "Productive", label: "Productive", color: "#e67e22", desc: "Bacterial pneumonia, TB" }
            ]},
            { q: "If productive, what colour is the sputum?", hint: "Purulent = bacterial, blood‑stained = TB", clues: [
                { text: "Clear/white", label: "Mucoid", color: "#27ae60", desc: "Viral, early infection" },
                { text: "Yellow/green", label: "Purulent", color: "#e67e22", desc: "Bacterial infection" },
                { text: "Blood‑stained", label: "Haemoptysis", color: "#c0392b", desc: "TB until proven" }
            ]},
            { q: "Is there any blood in the sputum?", hint: "Haemoptysis is a red flag", clues: [
                { text: "Yes", label: "Haemoptysis", color: "#c0392b", desc: "TB, bronchiectasis, malignancy" },
                { text: "No", label: "No blood", color: "#27ae60", desc: "Less urgent" }
            ]},
            { q: "Is the cough worse at night, in the morning, or after meals?", hint: "Timing gives aetiological clues", clues: [
                { text: "Night", label: "Asthma/GORD", color: "#8e44ad", desc: "Nocturnal asthma, GORD" },
                { text: "Morning", label: "Post‑nasal drip", color: "#e67e22", desc: "Sinusitis, allergic rhinitis" },
                { text: "After meals", label: "GORD", color: "#2980b9", desc: "Gastro‑oesophageal reflux" }
            ]},
            { q: "Is there any difficulty breathing, fast breathing, or chest indrawing?", hint: "Signs of respiratory distress", clues: [
                { text: "Fast breathing (>age‑specific)", label: "Tachypnoea", color: "#e67e22", desc: "Pneumonia, asthma" },
                { text: "Chest indrawing", label: "Severe", color: "#c0392b", desc: "Severe pneumonia" },
                { text: "None", label: "Mild", color: "#27ae60", desc: "Likely upper respiratory" }
            ]},
            { q: "Is there associated wheeze or stridor?", hint: "Wheeze = lower airway, stridor = upper airway", clues: [
                { text: "Wheeze", label: "Lower airway", color: "#e67e22", desc: "Asthma, bronchiolitis" },
                { text: "Stridor", label: "Upper airway", color: "#c0392b", desc: "Croup, epiglottitis, foreign body" },
                { text: "None", label: "No airway noise", color: "#27ae60", desc: "May be parenchymal" }
            ]},
            { q: "Has there been any contact with a person with chronic cough or TB?", hint: "TB exposure is key", clues: [
                { text: "Yes", label: "TB contact", color: "#c0392b", desc: "High risk for TB" },
                { text: "No", label: "No known contact", color: "#27ae60", desc: "Less likely TB" }
            ]},
            { q: "Is the child eating and drinking normally?", hint: "Assess severity", clues: [
                { text: "Normal", label: "Mild", color: "#27ae60", desc: "Can be managed at home" },
                { text: "Reduced", label: "Moderate", color: "#e67e22", desc: "Monitor, may need admission" },
                { text: "Unable to drink", label: "Danger sign", color: "#c0392b", desc: "Admit immediately" }
            ]},
            { q: "Has the child had any previous episodes of asthma or chest infections?", hint: "Recurrent illness", clues: [
                { text: "Yes, recurrent", label: "Asthma/COPD", color: "#e67e22", desc: "Consider asthma" },
                { text: "Yes, pneumonia", label: "Recurrent pneumonia", color: "#8e44ad", desc: "Consider immunodeficiency, foreign body" },
                { text: "No", label: "First episode", color: "#27ae60", desc: "Acute infection" }
            ]}
        ],
        redFlags: [
            "Cough + fast breathing + chest indrawing → severe pneumonia",
            "Haemoptysis → TB until proven",
            "Sudden onset in toddler → inhaled foreign body",
            "Stridor + drooling → epiglottitis (do NOT examine throat)"
        ],
        tips: [
            "Count respiratory rate for a full 60 seconds.",
            "In Uganda, TB is the most important cause of chronic cough.",
            "Always ask about TB contact and HIV status."
        ]
    },

    // ============================================================
    // 3. DIARRHOEA / VOMITING
    // ============================================================
    diarrhea: {
        title: "💩 Diarrhoea / Vomiting",
        chapter: "Nelson, Ch. 354",
        questions: [
            { q: "How long has diarrhoea been present?", hint: "Acute <14d, persistent 14–30d, chronic >30d", clues: [
                { text: "< 14 days", label: "Acute", color: "#27ae60", desc: "Infectious (viral/bacterial)" },
                { text: "14–30 days", label: "Persistent", color: "#e67e22", desc: "Giardia, HIV, TB" },
                { text: "> 30 days", label: "Chronic", color: "#c0392b", desc: "Malabsorption, HIV" }
            ]},
            { q: "How many stools per day?", hint: "Frequency indicates severity", clues: [
                { text: "1–3", label: "Mild", color: "#27ae60", desc: "Usually self‑limiting" },
                { text: "4–6", label: "Moderate", color: "#e67e22", desc: "Risk of dehydration" },
                { text: "≥ 7", label: "Severe", color: "#c0392b", desc: "High risk of dehydration" }
            ]},
            { q: "What is the stool character?", hint: "Watery, bloody, mucoid, rice‑water", clues: [
                { text: "Watery", label: "Secretory", color: "#2980b9", desc: "Cholera, rotavirus" },
                { text: "Bloody + mucus", label: "Dysentery", color: "#c0392b", desc: "Shigella, Campylobacter" },
                { text: "Mucus only", label: "Inflammatory", color: "#e67e22", desc: "Salmonella, E. coli" },
                { text: "Rice‑water", label: "Cholera", color: "#c0392b", desc: "Emergency! Rapid dehydration" }
            ]},
            { q: "Is there any blood or mucus in the stool?", hint: "Bloody diarrhoea = dysentery", clues: [
                { text: "Blood", label: "Dysentery", color: "#c0392b", desc: "Shigella, amoebiasis" },
                { text: "Mucus", label: "Infectious", color: "#e67e22", desc: "Bacterial infection" },
                { text: "Neither", label: "Non‑dysenteric", color: "#27ae60", desc: "Likely viral" }
            ]},
            { q: "Is the child vomiting? If yes, what is the character?", hint: "Bilious = obstruction, projectile = pyloric stenosis", clues: [
                { text: "Non‑bilious", label: "Gastroenteritis", color: "#e67e22", desc: "Common in viral infection" },
                { text: "Bilious (green)", label: "Obstruction", color: "#c0392b", desc: "Surgical emergency" },
                { text: "Projectile", label: "Pyloric stenosis", color: "#c0392b", desc: "Ultrasound and surgery" }
            ]},
            { q: "Is there associated fever?", hint: "Fever suggests infectious aetiology", clues: [
                { text: "Yes", label: "Infectious", color: "#e67e22", desc: "Bacterial or viral" },
                { text: "No", label: "Afebrile", color: "#27ae60", desc: "Could be non‑infectious (e.g., lactose intolerance)" }
            ]},
            { q: "Is there abdominal pain?", hint: "Pain may indicate surgical abdomen", clues: [
                { text: "Mild, cramping", label: "Gastroenteritis", color: "#e67e22", desc: "Common" },
                { text: "Severe, localised", label: "Appendicitis", color: "#c0392b", desc: "Surgical emergency" },
                { text: "None", label: "No pain", color: "#27ae60", desc: "More likely secretory" }
            ]},
            { q: "Is the child able to drink and keep fluids down?", hint: "Hydration status", clues: [
                { text: "Drinking normally", label: "No dehydration", color: "#27ae60", desc: "Plan A" },
                { text: "Drinking eagerly, but some vomiting", label: "Some dehydration", color: "#e67e22", desc: "Plan B" },
                { text: "Unable to drink", label: "Severe dehydration", color: "#c0392b", desc: "Plan C – IV fluids" }
            ]},
            { q: "Are the child's eyes sunken? Is skin turgor reduced?", hint: "Clinical signs of dehydration", clues: [
                { text: "Sunken eyes + reduced turgor", label: "Moderate dehydration", color: "#e67e22", desc: "Plan B" },
                { text: "Very sunken + slow turgor + lethargy", label: "Severe dehydration", color: "#c0392b", desc: "Plan C" },
                { text: "Normal", label: "No dehydration", color: "#27ae60", desc: "Plan A" }
            ]},
            { q: "Is the child lethargic?", hint: "Lethargy = severe dehydration or sepsis", clues: [
                { text: "Yes", label: "Danger sign", color: "#c0392b", desc: "Admit, urgent rehydration" },
                { text: "No", label: "Alert", color: "#27ae60", desc: "Less concern" }
            ]}
        ],
        redFlags: [
            "Unable to drink → severe dehydration, admit",
            "Bloody diarrhoea + fever → dysentery",
            "Rice‑water stool → cholera",
            "Bilious vomiting → intestinal obstruction",
            "Lethargy + sunken eyes → severe dehydration"
        ],
        tips: [
            "Assess dehydration using the IMCI algorithm.",
            "Give zinc 20 mg/day for 10 days.",
            "Continue feeding during diarrhoea.",
            "Check HIV in persistent diarrhoea."
        ]
    },

    // ============================================================
    // 4. POOR FEEDING
    // ============================================================
    "poor feeding": {
        title: "🍼 Poor Feeding",
        chapter: "Nelson, Ch. 38",
        questions: [
            { q: "How long has poor feeding been present?", hint: "Acute vs chronic", clues: [
                { text: "< 24 hours", label: "Acute", color: "#e67e22", desc: "Sepsis, URTI" },
                { text: "1–3 days", label: "Subacute", color: "#e67e22", desc: "Viral illness, oral thrush" },
                { text: "> 1 week", label: "Chronic", color: "#c0392b", desc: "Failure to thrive, GORD, metabolic" }
            ]},
            { q: "How would you describe the feeding problem?", hint: "Weak suck, refusal, tiring, regurgitation", clues: [
                { text: "Weak suck", label: "Neurological", color: "#8e44ad", desc: "Hypotonia, sepsis" },
                { text: "Refuses feeds", label: "Anorexia", color: "#e67e22", desc: "Infection, oral pain" },
                { text: "Tires during feeding", label: "Cardiac/respiratory", color: "#c0392b", desc: "CHD, respiratory distress" },
                { text: "Regurgitates frequently", label: "GORD", color: "#2980b9", desc: "Gastro‑oesophageal reflux" }
            ]},
            { q: "Is the child vomiting after feeds? If yes, describe.", hint: "Projectile = pyloric stenosis, bilious = obstruction", clues: [
                { text: "Possetting (small amount)", label: "Normal/GORD", color: "#27ae60", desc: "Reassure" },
                { text: "Projectile", label: "Pyloric stenosis", color: "#c0392b", desc: "Surgical emergency" },
                { text: "Bilious", label: "Obstruction", color: "#c0392b", desc: "Surgical emergency" }
            ]},
            { q: "Is there associated fever?", hint: "Infection is common", clues: [
                { text: "Yes", label: "Sepsis/UTI", color: "#e67e22", desc: "Check for infection" },
                { text: "No", label: "Afebrile", color: "#27ae60", desc: "Consider non‑infectious causes" }
            ]},
            { q: "Is the child lethargic or irritable?", hint: "Lethargy = sepsis, irritability = oral thrush or pain", clues: [
                { text: "Lethargic", label: "Sepsis", color: "#c0392b", desc: "Emergency!" },
                { text: "Irritable", label: "Pain", color: "#e67e22", desc: "Check for oral thrush, ear infection" },
                { text: "Normal", label: "Well", color: "#27ae60", desc: "Less concerning" }
            ]},
            { q: "Is there any jaundice?", hint: "Jaundice + poor feeding in neonate = pathological", clues: [
                { text: "Yes", label: "Jaundice", color: "#e67e22", desc: "Check bilirubin, sepsis" },
                { text: "No", label: "No jaundice", color: "#27ae60", desc: "Less likely haemolysis" }
            ]},
            { q: "Has the child had any convulsions?", hint: "Seizures can cause poor feeding", clues: [
                { text: "Yes", label: "Neurological", color: "#c0392b", desc: "Check glucose, electrolytes" },
                { text: "No", label: "No seizures", color: "#27ae60", desc: "Less likely CNS" }
            ]},
            { q: "Is the child gaining weight?", hint: "Weight loss = failure to thrive", clues: [
                { text: "Yes", label: "Growing well", color: "#27ae60", desc: "Reassuring" },
                { text: "No", label: "FTT", color: "#c0392b", desc: "Organic cause likely" }
            ]},
            { q: "Is there any difficulty breathing?", hint: "Respiratory distress impairs feeding", clues: [
                { text: "Yes", label: "Respiratory", color: "#e67e22", desc: "Pneumonia, CHD" },
                { text: "No", label: "No distress", color: "#27ae60", desc: "Less likely cardiac" }
            ]},
            { q: "What is the child's age?", hint: "Age determines likely causes", clues: [
                { text: "< 1 month", label: "Neonate", color: "#c0392b", desc: "Sepsis, metabolic" },
                { text: "1–6 months", label: "Infant", color: "#e67e22", desc: "Pyloric stenosis, GORD, thrush" },
                { text: "> 6 months", label: "Older infant", color: "#27ae60", desc: "Infection, behavioural" }
            ]}
        ],
        redFlags: [
            "Poor feeding + lethargy + fever in neonate → sepsis (admit)",
            "Projectile vomiting → pyloric stenosis",
            "Bilious vomiting → obstruction",
            "Failure to gain weight → investigate organic causes"
        ],
        tips: [
            "Neonates with poor feeding need urgent evaluation for sepsis.",
            "Always check oral cavity for thrush.",
            "Consider cardiac causes (CHF) if feeding tires easily."
        ]
    },

    // ============================================================
    // 5. CONVULSIONS
    // ============================================================
    convulsions: {
        title: "⚠️ Convulsions",
        chapter: "Nelson, Ch. 600",
        questions: [
            { q: "How long did the seizure last?", hint: "<5min = simple, 5–30min = prolonged, >30min = status", clues: [
                { text: "< 5 minutes", label: "Simple", color: "#27ae60", desc: "Febrile seizure likely" },
                { text: "5–15 minutes", label: "Prolonged", color: "#e67e22", desc: "Urgent treatment needed" },
                { text: "> 30 minutes", label: "Status epilepticus", color: "#c0392b", desc: "Emergency!" }
            ]},
            { q: "What type of seizure was it?", hint: "Generalised tonic‑clonic, focal, absence, myoclonic", clues: [
                { text: "Generalised tonic‑clonic", label: "Generalised", color: "#2980b9", desc: "Common" },
                { text: "Focal", label: "Focal", color: "#8e44ad", desc: "Structural lesion" },
                { text: "Absence", label: "Absence", color: "#e67e22", desc: "Typical childhood epilepsy" }
            ]},
            { q: "Was it generalised or focal?", hint: "Focal suggests structural cause", clues: [
                { text: "Generalised", label: "Generalised", color: "#27ae60", desc: "Febrile, metabolic" },
                { text: "Focal", label: "Focal", color: "#c0392b", desc: "Tumour, stroke, infection" }
            ]},
            { q: "Did the child have fever at the time of the seizure?", hint: "Febrile seizure vs meningitis", clues: [
                { text: "Yes", label: "Febrile", color: "#e67e22", desc: "Febrile seizure or CNS infection" },
                { text: "No", label: "Afebrile", color: "#c0392b", desc: "Epilepsy, metabolic, trauma" }
            ]},
            { q: "Has this happened before?", hint: "Recurrent afebrile = epilepsy", clues: [
                { text: "Yes", label: "Recurrent", color: "#e67e22", desc: "Epilepsy, febrile seizures" },
                { text: "No", label: "First episode", color: "#27ae60", desc: "Acute symptomatic" }
            ]},
            { q: "Is the child back to normal now (post‑ictal state)?", hint: "Prolonged drowsiness = concern", clues: [
                { text: "Fully alert", label: "Normal", color: "#27ae60", desc: "Reassuring" },
                { text: "Drowsy", label: "Post‑ictal", color: "#e67e22", desc: "Common, monitor" },
                { text: "Unresponsive", label: "Coma", color: "#c0392b", desc: "Emergency!" }
            ]},
            { q: "Was there any vomiting or headache before the seizure?", hint: "Raised ICP or infection", clues: [
                { text: "Yes", label: "CNS infection", color: "#c0392b", desc: "Meningitis, encephalitis" },
                { text: "No", label: "No prodrome", color: "#27ae60", desc: "Idiopathic" }
            ]},
            { q: "Is there any neck stiffness?", hint: "Meningism", clues: [
                { text: "Yes", label: "Meningitis", color: "#c0392b", desc: "Emergency!" },
                { text: "No", label: "No meningism", color: "#27ae60", desc: "Less likely meningitis" }
            ]},
            { q: "What is the child's age?", hint: "Age‑specific aetiologies", clues: [
                { text: "< 1 month", label: "Neonate", color: "#c0392b", desc: "Hypoglycaemia, HIE, sepsis" },
                { text: "1–6 months", label: "Infant", color: "#e67e22", desc: "Febrile, metabolic" },
                { text: "6 months – 5 years", label: "Toddler/preschool", color: "#e67e22", desc: "Febrile seizures, epilepsy" },
                { text: "> 5 years", label: "Older child", color: "#2980b9", desc: "Epilepsy, trauma" }
            ]},
            { q: "Is there any family history of epilepsy or febrile seizures?", hint: "Genetic predisposition", clues: [
                { text: "Yes", label: "Family history", color: "#e67e22", desc: "Likely benign" },
                { text: "No", label: "No family history", color: "#27ae60", desc: "Idiopathic" }
            ]}
        ],
        redFlags: [
            "Seizure > 5 min → IV diazepam/lorazepam",
            "Seizure + fever + altered consciousness → cerebral malaria or meningitis",
            "Afebrile seizure → check blood glucose immediately",
            "Focal seizure → urgent neuroimaging"
        ],
        tips: [
            "Always check blood glucose in any child with a seizure.",
            "In Uganda, cerebral malaria is a common cause of seizures with fever.",
            "Refer to paediatric neurology for recurrent afebrile seizures."
        ]
    },

    // ============================================================
    // 6. RASH
    // ============================================================
    rash: {
        title: "🔴 Skin Rash",
        chapter: "Nelson, Ch. 650",
        questions: [
            { q: "When did the rash first appear?", hint: "Onset and progression", clues: [
                { text: "< 24 hours", label: "Acute", color: "#e67e22", desc: "Allergic, viral" },
                { text: "1–3 days", label: "Subacute", color: "#e67e22", desc: "Measles, chickenpox" },
                { text: "> 3 days", label: "Chronic", color: "#c0392b", desc: "Eczema, psoriasis" }
            ]},
            { q: "What does the rash look like?", hint: "Macular, papular, vesicular, petechial, purpuric", clues: [
                { text: "Maculopapular", label: "Maculopapular", color: "#2980b9", desc: "Measles, rubella" },
                { text: "Vesicular", label: "Vesicular", color: "#e67e22", desc: "Chickenpox, herpes" },
                { text: "Petechial/purpuric", label: "Petechial", color: "#c0392b", desc: "Meningococcaemia, ITP" },
                { text: "Wheals", label: "Urticaria", color: "#8e44ad", desc: "Allergic reaction" }
            ]},
            { q: "Where did the rash start, and where is it now (distribution)?", hint: "Centripetal vs centrifugal", clues: [
                { text: "Face → trunk → limbs", label: "Measles", color: "#e67e22", desc: "Typical measles" },
                { text: "Trunk → outward", label: "Chickenpox", color: "#e67e22", desc: "Varicella" },
                { text: "Generalised", label: "Generalised", color: "#2980b9", desc: "Viral exanthem" }
            ]},
            { q: "Is it itchy?", hint: "Pruritus suggests allergy, scabies, or eczema", clues: [
                { text: "Yes, intense", label: "Itchy", color: "#e67e22", desc: "Scabies, eczema, urticaria" },
                { text: "No", label: "Non‑itchy", color: "#27ae60", desc: "Measles, meningococcaemia" }
            ]},
            { q: "Is there associated fever?", hint: "Infection often causes fever", clues: [
                { text: "Yes", label: "Infectious", color: "#e67e22", desc: "Measles, chickenpox, meningococcaemia" },
                { text: "No", label: "Afebrile", color: "#27ae60", desc: "Allergic, eczema" }
            ]},
            { q: "Is the child irritable or lethargic?", hint: "Systemic illness", clues: [
                { text: "Irritable", label: "Meningism", color: "#c0392b", desc: "Meningococcaemia" },
                { text: "Lethargic", label: "Sepsis", color: "#c0392b", desc: "Urgent" },
                { text: "Normal", label: "Well", color: "#27ae60", desc: "Reassuring" }
            ]},
            { q: "Any cough, runny nose, or red eyes?", hint: "Measles prodrome", clues: [
                { text: "Yes", label: "Measles", color: "#e67e22", desc: "Koplik spots" },
                { text: "No", label: "Other", color: "#27ae60", desc: "Non‑measles" }
            ]},
            { q: "Does the rash blanch with pressure?", hint: "Non‑blanching = emergency", clues: [
                { text: "Yes", label: "Blanching", color: "#27ae60", desc: "Viral, allergic" },
                { text: "No", label: "Non‑blanching", color: "#c0392b", desc: "Meningococcaemia, vasculitis" }
            ]},
            { q: "Are there any blisters or ulcers in the mouth?", hint: "Mucosal involvement", clues: [
                { text: "Yes", label: "Mucosal", color: "#c0392b", desc: "SJS, measles, herpes" },
                { text: "No", label: "No mucosal", color: "#27ae60", desc: "Less severe" }
            ]},
            { q: "Has the child had any medications recently?", hint: "Drug rash", clues: [
                { text: "Yes", label: "Drug reaction", color: "#e67e22", desc: "Stop offending drug" },
                { text: "No", label: "No drugs", color: "#27ae60", desc: "Infection likely" }
            ]}
        ],
        redFlags: [
            "Non‑blanching rash + fever → meningococcaemia (emergency)",
            "Rash + mucosal involvement → SJS/TEN",
            "Measles rash in malnourished child → give vitamin A immediately",
            "Petechiae + ill appearance → urgent antibiotics"
        ],
        tips: [
            "Do the glass test for non‑blanching rash.",
            "In Uganda, measles is a common cause of rash with fever.",
            "Check HIV in chronic or recurrent skin conditions."
        ]
    },

    // ============================================================
    // 7. JAUNDICE
    // ============================================================
    jaundice: {
        title: "🟡 Jaundice",
        chapter: "Nelson, Ch. 354",
        questions: [
            { q: "When did you first notice jaundice?", hint: "Onset timing", clues: [
                { text: "< 24 hours", label: "Pathological", color: "#c0392b", desc: "Haemolytic disease" },
                { text: "24–72 hours", label: "Early", color: "#e67e22", desc: "Physiological or sepsis" },
                { text: "3–7 days", label: "Physiological", color: "#27ae60", desc: "Usually benign" },
                { text: "> 7 days", label: "Prolonged", color: "#c0392b", desc: "Biliary atresia, hepatitis" }
            ]},
            { q: "What is the child's age?", hint: "Age determines aetiology", clues: [
                { text: "< 24 hours (neonate)", label: "Neonate", color: "#c0392b", desc: "Haemolysis, sepsis" },
                { text: "1–7 days (neonate)", label: "Neonate", color: "#e67e22", desc: "Physiological, sepsis" },
                { text: "> 7 days (neonate)", label: "Neonate", color: "#c0392b", desc: "Biliary atresia" },
                { text: "Infant >1 month", label: "Infant", color: "#e67e22", desc: "Hepatitis, metabolic" },
                { text: "Child >1 year", label: "Child", color: "#2980b9", desc: "Hepatitis, malaria" }
            ]},
            { q: "Is the child feeding well?", hint: "Poor feeding suggests sepsis or metabolic", clues: [
                { text: "Yes", label: "Good feeding", color: "#27ae60", desc: "Less urgent" },
                { text: "Reduced", label: "Ill", color: "#e67e22", desc: "Sepsis, metabolic" }
            ]},
            { q: "Is the child lethargic?", hint: "Lethargy = kernicterus or sepsis", clues: [
                { text: "Yes", label: "Danger sign", color: "#c0392b", desc: "Urgent" },
                { text: "No", label: "Alert", color: "#27ae60", desc: "Less concern" }
            ]},
            { q: "What colour are the stools?", hint: "Pale/clay = conjugated jaundice", clues: [
                { text: "Normal (yellow)", label: "Unconjugated", color: "#27ae60", desc: "Physiological, haemolysis" },
                { text: "Pale/Clay", label: "Conjugated", color: "#c0392b", desc: "Biliary obstruction" },
                { text: "Dark", label: "Conjugated", color: "#c0392b", desc: "Hepatitis" }
            ]},
            { q: "What colour is the urine?", hint: "Dark urine = conjugated bilirubin", clues: [
                { text: "Normal", label: "Unconjugated", color: "#27ae60", desc: "Physiological" },
                { text: "Dark (tea‑coloured)", label: "Conjugated", color: "#c0392b", desc: "Hepatitis, biliary" }
            ]},
            { q: "Is there any fever?", hint: "Infection (sepsis, hepatitis)", clues: [
                { text: "Yes", label: "Infectious", color: "#e67e22", desc: "Sepsis, hepatitis" },
                { text: "No", label: "Afebrile", color: "#27ae60", desc: "Metabolic, biliary" }
            ]},
            { q: "Is there any vomiting?", hint: "Vomiting + jaundice = hepatitis or obstruction", clues: [
                { text: "Yes", label: "Hepatitis", color: "#e67e22", desc: "Viral hepatitis" },
                { text: "No", label: "No vomiting", color: "#27ae60", desc: "Less GI cause" }
            ]},
            { q: "Is the child gaining weight?", hint: "Poor weight gain = chronic liver disease", clues: [
                { text: "Yes", label: "Growing", color: "#27ae60", desc: "Reassuring" },
                { text: "No", label: "FTT", color: "#c0392b", desc: "Biliary atresia, chronic hepatitis" }
            ]},
            { q: "Is there any abdominal distension?", hint: "Hepatomegaly or ascites", clues: [
                { text: "Yes", label: "Organomegaly", color: "#e67e22", desc: "Liver disease, heart failure" },
                { text: "No", label: "No distension", color: "#27ae60", desc: "Less likely" }
            ]}
        ],
        redFlags: [
            "Jaundice < 24 hours → pathological, urgent phototherapy",
            "Pale stools + dark urine → conjugated jaundice, urgent surgical referral",
            "Jaundice + altered consciousness → kernicterus",
            "Prolonged jaundice > 14 days in neonate → investigate for biliary atresia"
        ],
        tips: [
            "Check total and conjugated bilirubin.",
            "In Uganda, G6PD deficiency is a common cause of neonatal jaundice.",
            "Always rule out sepsis in neonates with jaundice."
        ]
    },

    // ============================================================
    // 8. DIFFICULTY BREATHING
    // ============================================================
    "difficulty breathing": {
        title: "💨 Difficulty Breathing",
        chapter: "Nelson, Ch. 409",
        questions: [
            { q: "How long has breathing difficulty been present?", hint: "Onset and duration", clues: [
                { text: "< 1 hour", label: "Acute", color: "#c0392b", desc: "Foreign body, anaphylaxis" },
                { text: "1–6 hours", label: "Subacute", color: "#e67e22", desc: "Pneumonia, asthma" },
                { text: "> 24 hours", label: "Chronic", color: "#2980b9", desc: "Asthma, CHD, TB" }
            ]},
            { q: "Was the onset sudden or gradual?", hint: "Sudden = foreign body, anaphylaxis", clues: [
                { text: "Sudden", label: "Emergency", color: "#c0392b", desc: "Foreign body, anaphylaxis" },
                { text: "Gradual", label: "Infectious", color: "#e67e22", desc: "Pneumonia, asthma" }
            ]},
            { q: "Is the child working hard to breathe?", hint: "Signs of respiratory distress", clues: [
                { text: "Nasal flaring, grunting", label: "Severe distress", color: "#c0392b", desc: "Pneumonia, bronchiolitis" },
                { text: "Chest indrawing", label: "Moderate", color: "#e67e22", desc: "Pneumonia" },
                { text: "No distress", label: "Mild", color: "#27ae60", desc: "URTI" }
            ]},
            { q: "Is there any wheeze or stridor?", hint: "Wheeze = lower, stridor = upper airway", clues: [
                { text: "Wheeze", label: "Lower airway", color: "#e67e22", desc: "Asthma, bronchiolitis" },
                { text: "Stridor", label: "Upper airway", color: "#c0392b", desc: "Croup, epiglottitis, foreign body" },
                { text: "None", label: "No noise", color: "#27ae60", desc: "Pneumonia, pleural effusion" }
            ]},
            { q: "Is there any cough?", hint: "Cough suggests infection", clues: [
                { text: "Yes", label: "Infectious", color: "#e67e22", desc: "Pneumonia, bronchiolitis" },
                { text: "No", label: "No cough", color: "#27ae60", desc: "Cardiac, foreign body" }
            ]},
            { q: "Is there associated fever?", hint: "Fever indicates infection", clues: [
                { text: "Yes", label: "Pneumonia, TB", color: "#e67e22", desc: "Infectious cause" },
                { text: "No", label: "Afebrile", color: "#27ae60", desc: "Asthma, CHD, foreign body" }
            ]},
            { q: "Is the child feeding normally?", hint: "Reduced feeding = severity", clues: [
                { text: "Normal", label: "Mild", color: "#27ae60", desc: "Manage at home" },
                { text: "Reduced", label: "Moderate", color: "#e67e22", desc: "Monitor, may need admission" },
                { text: "Unable to feed", label: "Danger sign", color: "#c0392b", desc: "Admit immediately" }
            ]},
            { q: "Is the child able to talk/speak?", hint: "Inability to speak = severe distress", clues: [
                { text: "Yes", label: "Mild", color: "#27ae60", desc: "Reassuring" },
                { text: "No", label: "Severe", color: "#c0392b", desc: "Emergency" }
            ]},
            { q: "Is there any cyanosis?", hint: "Cyanosis = hypoxia", clues: [
                { text: "Yes", label: "Hypoxia", color: "#c0392b", desc: "Oxygen urgently needed" },
                { text: "No", label: "No cyanosis", color: "#27ae60", desc: "Less severe" }
            ]},
            { q: "Has the child had any choking episode?", hint: "Foreign body aspiration", clues: [
                { text: "Yes", label: "Foreign body", color: "#c0392b", desc: "Bronchoscopy needed" },
                { text: "No", label: "No choking", color: "#27ae60", desc: "Other cause" }
            ]}
        ],
        redFlags: [
            "Stridor + drooling → epiglottitis (do NOT examine throat)",
            "SpO₂ < 90% → high‑flow oxygen",
            "Silent chest in asthma → near‑fatal asthma",
            "Inability to speak or feed → severe distress"
        ],
        tips: [
            "Count respiratory rate for a full minute.",
            "In Uganda, pneumonia and malaria are common causes.",
            "Always check oxygen saturation."
        ]
    },

    // ============================================================
    // 9. SWELLING
    // ============================================================
    swelling: {
        title: "💧 Swelling",
        chapter: "Nelson, Ch. 650",
        questions: [
            { q: "Where is the swelling located?", hint: "Site gives differential", clues: [
                { text: "Face/Periorbital", label: "Facial", color: "#2980b9", desc: "Nephrotic, allergy" },
                { text: "Neck", label: "Cervical", color: "#e67e22", desc: "Lymphadenitis, lymphoma" },
                { text: "Abdomen", label: "Abdominal", color: "#c0392b", desc: "Wilms, neuroblastoma" },
                { text: "Groin", label: "Inguinal", color: "#e67e22", desc: "Hernia, lymphadenopathy" },
                { text: "Limb", label: "Limb", color: "#2980b9", desc: "Osteomyelitis, trauma" },
                { text: "Scrotum", label: "Scrotal", color: "#c0392b", desc: "Testicular torsion, hernia" }
            ]},
            { q: "How long has it been present?", hint: "Duration indicates acute vs chronic", clues: [
                { text: "< 24 hours", label: "Acute", color: "#e67e22", desc: "Infection, trauma, torsion" },
                { text: "1–3 days", label: "Subacute", color: "#e67e22", desc: "Infection, allergy" },
                { text: "> 1 week", label: "Chronic", color: "#c0392b", desc: "Tumour, chronic infection" }
            ]},
            { q: "Was onset sudden or gradual?", hint: "Sudden = haemorrhage, torsion", clues: [
                { text: "Sudden", label: "Emergency", color: "#c0392b", desc: "Torsion, haemorrhage" },
                { text: "Gradual", label: "Chronic", color: "#e67e22", desc: "Tumour, infection" }
            ]},
            { q: "Is it painful or painless?", hint: "Pain suggests inflammation or torsion", clues: [
                { text: "Painful", label: "Inflammatory", color: "#e67e22", desc: "Infection, torsion" },
                { text: "Painless", label: "Neoplastic", color: "#c0392b", desc: "Lymphoma, Wilms" }
            ]},
            { q: "Is the swelling hard or soft?", hint: "Consistency gives clue", clues: [
                { text: "Hard", label: "Solid", color: "#c0392b", desc: "Tumour, fibrosis" },
                { text: "Soft/fluctuant", label: "Cystic/abscess", color: "#e67e22", desc: "Abscess, cyst" }
            ]},
            { q: "Is there associated fever?", hint: "Infection", clues: [
                { text: "Yes", label: "Infectious", color: "#e67e22", desc: "Abscess, lymphadenitis" },
                { text: "No", label: "Afebrile", color: "#27ae60", desc: "Tumour, trauma" }
            ]},
            { q: "Is there any weight loss?", hint: "Weight loss suggests malignancy", clues: [
                { text: "Yes", label: "Malignancy", color: "#c0392b", desc: "Burkitt, lymphoma" },
                { text: "No", label: "No weight loss", color: "#27ae60", desc: "Benign" }
            ]},
            { q: "Is there any difficulty passing urine (if abdominal/scrotal)?", hint: "Urinary obstruction", clues: [
                { text: "Yes", label: "Urinary", color: "#e67e22", desc: "Renal mass, bladder" },
                { text: "No", label: "No urinary", color: "#27ae60", desc: "Other" }
            ]},
            { q: "Is there any vomiting (if abdominal)?", hint: "Obstruction", clues: [
                { text: "Yes", label: "Obstruction", color: "#c0392b", desc: "Surgical emergency" },
                { text: "No", label: "No vomiting", color: "#27ae60", desc: "Less urgent" }
            ]},
            { q: "Is the swelling reducible (if hernia)?", hint: "Irreducible = incarceration", clues: [
                { text: "Yes", label: "Reducible", color: "#27ae60", desc: "Elective surgery" },
                { text: "No", label: "Irreducible", color: "#c0392b", desc: "Emergency" }
            ]}
        ],
        redFlags: [
            "Rapidly growing painless mass → Burkitt's lymphoma",
            "Groin swelling + pain + irreducible → incarcerated hernia",
            "Painless abdominal mass < 5 years → Wilms tumour",
            "Sudden painful scrotal swelling → testicular torsion (6‑hour window)"
        ],
        tips: [
            "In Uganda, Burkitt's lymphoma is a common cause of facial/abdominal mass.",
            "Always examine for lymphadenopathy.",
            "Ultrasound is the first‑line imaging for most swellings."
        ]
    },

    // ============================================================
    // 10. LETHARGY / IRRITABILITY
    // ============================================================
    lethargy: {
        title: "😴 Lethargy / Irritability",
        chapter: "Nelson, Ch. 600",
        questions: [
            { q: "How long has lethargy been present?", hint: "Duration indicates severity", clues: [
                { text: "< 6 hours", label: "Acute", color: "#e67e22", desc: "Hypoglycaemia, sepsis" },
                { text: "6–24 hours", label: "Subacute", color: "#e67e22", desc: "CNS infection" },
                { text: "> 24 hours", label: "Chronic", color: "#c0392b", desc: "Metabolic, neurodegenerative" }
            ]},
            { q: "Is the child drowsy or unresponsive?", hint: "AVPU scale", clues: [
                { text: "Drowsy but rousable", label: "Drowsy", color: "#e67e22", desc: "Monitor" },
                { text: "Difficult to rouse", label: "Stupor", color: "#c0392b", desc: "Urgent" },
                { text: "Unresponsive/Coma", label: "Coma", color: "#c0392b", desc: "Emergency!" }
            ]},
            { q: "Is there associated fever?", hint: "Fever indicates infection", clues: [
                { text: "Yes", label: "Infectious", color: "#e67e22", desc: "Malaria, meningitis" },
                { text: "No", label: "Afebrile", color: "#27ae60", desc: "Metabolic, toxic" }
            ]},
            { q: "Is there any neck stiffness?", hint: "Meningism", clues: [
                { text: "Yes", label: "Meningitis", color: "#c0392b", desc: "Urgent LP and antibiotics" },
                { text: "No", label: "No meningism", color: "#27ae60", desc: "Less likely CNS infection" }
            ]},
            { q: "Has the child had any convulsions?", hint: "Seizures + lethargy = cerebral malaria/meningitis", clues: [
                { text: "Yes", label: "CNS infection", color: "#c0392b", desc: "Urgent" },
                { text: "No", label: "No seizures", color: "#27ae60", desc: "Less CNS involvement" }
            ]},
            { q: "Is the child feeding?", hint: "Inability to feed = danger sign", clues: [
                { text: "Yes", label: "Feeding", color: "#27ae60", desc: "Reassuring" },
                { text: "Reduced", label: "Moderate", color: "#e67e22", desc: "Monitor" },
                { text: "Unable", label: "Danger sign", color: "#c0392b", desc: "Admit" }
            ]},
            { q: "Is there any vomiting?", hint: "Vomiting + lethargy = raised ICP or infection", clues: [
                { text: "Yes", label: "Raised ICP", color: "#c0392b", desc: "Meningitis, mass" },
                { text: "No", label: "No vomiting", color: "#27ae60", desc: "Less concern" }
            ]},
            { q: "Any headache (in older child)?", hint: "Headache + lethargy = meningitis", clues: [
                { text: "Yes", label: "Meningism", color: "#c0392b", desc: "Meningitis" },
                { text: "No", label: "No headache", color: "#27ae60", desc: "Other" }
            ]},
            { q: "Any rash?", hint: "Rash + lethargy = meningococcaemia", clues: [
                { text: "Yes, petechial", label: "Meningococcaemia", color: "#c0392b", desc: "Emergency!" },
                { text: "No", label: "No rash", color: "#27ae60", desc: "Less likely" }
            ]},
            { q: "What is the blood glucose? (if known)", hint: "Hypoglycaemia is a common cause", clues: [
                { text: "Normal (>3.5)", label: "Normoglycaemia", color: "#27ae60", desc: "Other causes" },
                { text: "Low (2.5-3.5)", label: "Hypoglycaemia", color: "#e67e22", desc: "Treat with glucose" },
                { text: "Very low (<2.5)", label: "Severe hypoglycaemia", color: "#c0392b", desc: "Emergency!" }
            ]}
        ],
        redFlags: [
            "Unable to wake → ABC first",
            "Lethargy + fever → cerebral malaria or meningitis",
            "Glucose < 2.5 → IV 10% dextrose",
            "Lethargy + neck stiffness → meningitis"
        ],
        tips: [
            "Always check blood glucose in any lethargic child.",
            "In Uganda, cerebral malaria is a leading cause of lethargy and coma.",
            "Assess AVPU and GCS."
        ]
    },

    // ============================================================
    // 11. PALLOR
    // ============================================================
    pallor: {
        title: "🩸 Pallor",
        chapter: "Nelson, Ch. 470",
        questions: [
            { q: "How long has pallor been present?", hint: "Acute vs chronic", clues: [
                { text: "< 24 hours", label: "Acute", color: "#c0392b", desc: "Haemorrhage, haemolysis" },
                { text: "1–3 days", label: "Subacute", color: "#e67e22", desc: "Infection, haemolysis" },
                { text: "> 3 days", label: "Chronic", color: "#2980b9", desc: "Iron deficiency, chronic disease" }
            ]},
            { q: "Was onset sudden or gradual?", hint: "Sudden = haemorrhage, haemolysis", clues: [
                { text: "Sudden", label: "Emergency", color: "#c0392b", desc: "Haemorrhage, malaria" },
                { text: "Gradual", label: "Chronic", color: "#e67e22", desc: "Iron deficiency, chronic disease" }
            ]},
            { q: "Is the child lethargic?", hint: "Anaemia causes fatigue", clues: [
                { text: "Yes", label: "Anaemia", color: "#e67e22", desc: "Check Hb" },
                { text: "No", label: "No lethargy", color: "#27ae60", desc: "Less severe" }
            ]},
            { q: "Is there any difficulty breathing?", hint: "Severe anaemia → dyspnoea", clues: [
                { text: "Yes", label: "Severe anaemia", color: "#c0392b", desc: "Transfusion may be needed" },
                { text: "No", label: "No dyspnoea", color: "#27ae60", desc: "Mild anaemia" }
            ]},
            { q: "Is there any jaundice?", hint: "Jaundice + pallor = haemolysis", clues: [
                { text: "Yes", label: "Haemolytic", color: "#e67e22", desc: "G6PD, malaria, sickle" },
                { text: "No", label: "No jaundice", color: "#27ae60", desc: "Iron deficiency likely" }
            ]},
            { q: "Is there any dark urine?", hint: "Dark urine = haemoglobinaemia", clues: [
                { text: "Yes", label: "Haemolysis", color: "#c0392b", desc: "Malaria, G6PD" },
                { text: "No", label: "Normal urine", color: "#27ae60", desc: "Less haemolysis" }
            ]},
            { q: "Is there associated fever?", hint: "Fever + pallor = malaria or sepsis", clues: [
                { text: "Yes", label: "Malaria", color: "#e67e22", desc: "Malarial anaemia" },
                { text: "No", label: "Afebrile", color: "#27ae60", desc: "Iron deficiency, chronic" }
            ]},
            { q: "Is the child eating well?", hint: "Poor diet contributes to iron deficiency", clues: [
                { text: "Yes", label: "Good intake", color: "#27ae60", desc: "Other causes" },
                { text: "Reduced", label: "Poor intake", color: "#e67e22", desc: "Iron deficiency" }
            ]},
            { q: "Any pica (eating non‑food items)?", hint: "Pica suggests iron deficiency", clues: [
                { text: "Yes", label: "Pica", color: "#e67e22", desc: "Iron deficiency" },
                { text: "No", label: "No pica", color: "#27ae60", desc: "Other" }
            ]},
            { q: "Any family history of anaemia or sickle cell disease?", hint: "Genetic", clues: [
                { text: "Yes", label: "Familial", color: "#c0392b", desc: "Sickle cell, thalassaemia" },
                { text: "No", label: "No family history", color: "#27ae60", desc: "Acquired" }
            ]}
        ],
        redFlags: [
            "Severe pallor + lethargy + RR > 40 → severe anaemia, transfuse",
            "Pallor + dark urine + fever → blackwater fever / G6PD crisis",
            "Pallor + splenomegaly + collapse in sickle cell → splenic sequestration",
            "Sudden pallor + dyspnoea → acute haemorrhage"
        ],
        tips: [
            "Check haemoglobin urgently.",
            "In Uganda, malaria and iron deficiency are the most common causes of anaemia.",
            "Sickle cell disease is prevalent – ask about family history."
        ]
    },

    // ============================================================
    // 12. NECK STIFFNESS
    // ============================================================
    "neck stiffness": {
        title: "🦟 Neck Stiffness",
        chapter: "Nelson, Ch. 600",
        questions: [
            { q: "How long has neck stiffness been present?", hint: "Duration", clues: [
                { text: "< 6 hours", label: "Acute", color: "#c0392b", desc: "Meningitis" },
                { text: "6–24 hours", label: "Subacute", color: "#e67e22", desc: "Meningitis, cerebral malaria" },
                { text: "> 24 hours", label: "Chronic", color: "#2980b9", desc: "TB meningitis" }
            ]},
            { q: "Is there associated fever?", hint: "Fever + stiffness = meningitis", clues: [
                { text: "Yes", label: "Meningitis", color: "#c0392b", desc: "Emergency" },
                { text: "No", label: "Afebrile", color: "#27ae60", desc: "Muscular, TB" }
            ]},
            { q: "Is there any headache?", hint: "Headache is common in meningitis", clues: [
                { text: "Yes", label: "Meningism", color: "#c0392b", desc: "Meningitis" },
                { text: "No", label: "No headache", color: "#27ae60", desc: "Other" }
            ]},
            { q: "Is there any photophobia?", hint: "Photophobia = meningeal irritation", clues: [
                { text: "Yes", label: "Meningitis", color: "#c0392b", desc: "Meningitis" },
                { text: "No", label: "No photophobia", color: "#27ae60", desc: "Less likely" }
            ]},
            { q: "Is the child vomiting?", hint: "Vomiting + stiffness = raised ICP", clues: [
                { text: "Yes", label: "Raised ICP", color: "#c0392b", desc: "Meningitis, mass" },
                { text: "No", label: "No vomiting", color: "#27ae60", desc: "Less concern" }
            ]},
            { q: "Is there any altered consciousness?", hint: "Altered consciousness = severe", clues: [
                { text: "Yes", label: "Severe", color: "#c0392b", desc: "Meningitis, cerebral malaria" },
                { text: "No", label: "Alert", color: "#27ae60", desc: "Mild" }
            ]},
            { q: "Has the child had any convulsions?", hint: "Seizures + stiffness = meningitis", clues: [
                { text: "Yes", label: "Meningitis", color: "#c0392b", desc: "Urgent" },
                { text: "No", label: "No seizures", color: "#27ae60", desc: "Less urgent" }
            ]},
            { q: "Is there any rash?", hint: "Rash + stiffness = meningococcaemia", clues: [
                { text: "Yes, petechial", label: "Meningococcaemia", color: "#c0392b", desc: "Emergency!" },
                { text: "No", label: "No rash", color: "#27ae60", desc: "Less urgent" }
            ]},
            { q: "Any TB contact?", hint: "TB meningitis is a common cause of chronic stiffness", clues: [
                { text: "Yes", label: "TB contact", color: "#c0392b", desc: "TB meningitis" },
                { text: "No", label: "No TB contact", color: "#27ae60", desc: "Other" }
            ]}
        ],
        redFlags: [
            "Neck stiffness + fever → IV ceftriaxone immediately",
            "Non‑blanching rash + neck stiffness → benzylpenicillin",
            "Neck stiffness + reduced consciousness → raised ICP, do NOT do LP",
            "TB contact + chronic stiffness → TB meningitis"
        ],
        tips: [
            "Assess Kernig's and Brudzinski's signs.",
            "In infants, bulging fontanelle is a key sign.",
            "In Uganda, consider cerebral malaria and TB meningitis."
        ]
    },

    // ============================================================
    // 13. EAR DISCHARGE
    // ============================================================
    "ear discharge": {
        title: "👂 Ear Discharge",
        chapter: "Nelson, Ch. 650",
        questions: [
            { q: "How long has ear discharge been present?", hint: "Acute vs chronic", clues: [
                { text: "< 1 week", label: "Acute", color: "#e67e22", desc: "AOM with perforation" },
                { text: "1–4 weeks", label: "Subacute", color: "#e67e22", desc: "Persistent AOM" },
                { text: "> 1 month", label: "Chronic", color: "#c0392b", desc: "CSOM" },
                { text: "> 3 months", label: "CSOM", color: "#c0392b", desc: "Cholesteatoma" }
            ]},
            { q: "What colour is the discharge?", hint: "Purulent = infection, bloody = trauma/CSF", clues: [
                { text: "Clear", label: "Serous", color: "#27ae60", desc: "Allergy, trauma" },
                { text: "Yellow/Purulent", label: "Purulent", color: "#e67e22", desc: "Bacterial infection" },
                { text: "Blood‑stained", label: "Bloody", color: "#c0392b", desc: "Trauma, CSF leak" },
                { text: "Foul‑smelling", label: "Foul", color: "#c0392b", desc: "CSOM, cholesteatoma" }
            ]},
            { q: "Is there associated ear pain?", hint: "Pain suggests acute infection", clues: [
                { text: "Yes", label: "Painful", color: "#e67e22", desc: "AOM, mastoiditis" },
                { text: "No", label: "Painless", color: "#27ae60", desc: "Chronic" }
            ]},
            { q: "Is there any fever?", hint: "Fever indicates infection", clues: [
                { text: "Yes", label: "Infectious", color: "#e67e22", desc: "AOM, mastoiditis" },
                { text: "No", label: "Afebrile", color: "#27ae60", desc: "Chronic" }
            ]},
            { q: "Is there any hearing loss?", hint: "Hearing loss suggests CSOM or cholesteatoma", clues: [
                { text: "Yes", label: "Hearing loss", color: "#e67e22", desc: "CSOM, cholesteatoma" },
                { text: "No", label: "Normal hearing", color: "#27ae60", desc: "Acute" }
            ]},
            { q: "Is there any dizziness?", hint: "Dizziness = labyrinthitis or cholesteatoma", clues: [
                { text: "Yes", label: "Dizziness", color: "#c0392b", desc: "Labyrinthitis, cholesteatoma" },
                { text: "No", label: "No dizziness", color: "#27ae60", desc: "Less concern" }
            ]},
            { q: "Is there any headache or neck stiffness?", hint: "Mastoiditis or meningitis", clues: [
                { text: "Yes", label: "Mastoiditis/meningitis", color: "#c0392b", desc: "Emergency!" },
                { text: "No", label: "No", color: "#27ae60", desc: "Less urgent" }
            ]},
            { q: "Is there any trauma history?", hint: "Trauma can cause perforation", clues: [
                { text: "Yes", label: "Traumatic", color: "#e67e22", desc: "Perforation" },
                { text: "No", label: "No trauma", color: "#27ae60", desc: "Spontaneous" }
            ]}
        ],
        redFlags: [
            "Ear discharge + mastoid tenderness → mastoiditis, IV antibiotics",
            "Blood‑stained discharge after head trauma → CSF leak",
            "Chronic foul discharge + hearing loss → cholesteatoma",
            "Neck stiffness + ear discharge → meningitis"
        ],
        tips: [
            "Inspect the ear with an otoscope (if available).",
            "CSOM is a common cause of hearing loss in Ugandan children.",
            "HIV increases risk of recurrent ear infections."
        ]
    },

    // ============================================================
    // 14. OEDEMA
    // ============================================================
    oedema: {
        title: "💧 Oedema",
        chapter: "Nelson, Ch. 650",
        questions: [
            { q: "Where is the swelling located?", hint: "Site indicates cause", clues: [
                { text: "Face/Periorbital", label: "Facial", color: "#2980b9", desc: "Nephrotic, allergy" },
                { text: "Lower limbs", label: "Peripheral", color: "#e67e22", desc: "Cardiac, renal, nutritional" },
                { text: "Generalised", label: "Generalised", color: "#c0392b", desc: "Cardiac, renal, malnutrition" },
                { text: "Scrotum", label: "Scrotal", color: "#e67e22", desc: "Nephrotic, filariasis" }
            ]},
            { q: "Is it pitting or non‑pitting?", hint: "Pitting = low protein; non‑pitting = lymphatic", clues: [
                { text: "Pitting", label: "Pitting", color: "#e67e22", desc: "Nephrotic, cardiac, kwashiorkor" },
                { text: "Non‑pitting", label: "Non‑pitting", color: "#2980b9", desc: "Lymphoedema, filariasis" }
            ]},
            { q: "How long has it been present?", hint: "Duration", clues: [
                { text: "< 3 days", label: "Acute", color: "#e67e22", desc: "Allergy, infection" },
                { text: "3–7 days", label: "Subacute", color: "#e67e22", desc: "Nephrotic, cardiac" },
                { text: "> 1 week", label: "Chronic", color: "#c0392b", desc: "Kwashiorkor, chronic disease" }
            ]},
            { q: "Is there associated difficulty breathing?", hint: "Pulmonary oedema", clues: [
                { text: "Yes", label: "Cardiac", color: "#c0392b", desc: "Heart failure" },
                { text: "No", label: "No dyspnoea", color: "#27ae60", desc: "Renal, nutritional" }
            ]},
            { q: "Is there any frothy urine?", hint: "Proteinuria", clues: [
                { text: "Yes", label: "Nephrotic", color: "#c0392b", desc: "Nephrotic syndrome" },
                { text: "No", label: "No froth", color: "#27ae60", desc: "Other" }
            ]},
            { q: "Is there any fever?", hint: "Infection", clues: [
                { text: "Yes", label: "Infectious", color: "#e67e22", desc: "Post‑streptococcal GN" },
                { text: "No", label: "Afebrile", color: "#27ae60", desc: "Nephrotic, nutritional" }
            ]},
            { q: "Is there any weight loss?", hint: "Weight loss = malnutrition", clues: [
                { text: "Yes", label: "Kwashiorkor", color: "#c0392b", desc: "Severe acute malnutrition" },
                { text: "No", label: "No weight loss", color: "#27ae60", desc: "Renal, cardiac" }
            ]},
            { q: "Is the child pale?", hint: "Anaemia + oedema = renal disease", clues: [
                { text: "Yes", label: "Anaemia", color: "#e67e22", desc: "Renal disease" },
                { text: "No", label: "Not pale", color: "#27ae60", desc: "Other" }
            ]},
            { q: "Any skin changes (flaky paint, hair changes)?", hint: "Kwashiorkor", clues: [
                { text: "Yes", label: "Kwashiorkor", color: "#c0392b", desc: "Protein deficiency" },
                { text: "No", label: "No skin changes", color: "#27ae60", desc: "Other" }
            ]}
        ],
        redFlags: [
            "Oedema + severe wasting + hypothermia → complicated SAM, F‑75 milk",
            "Oedema + anuria → acute kidney injury",
            "Oedema + flaky paint skin + hair changes → kwashiorkor",
            "Oedema + frothy urine → nephrotic syndrome"
        ],
        tips: [
            "Check MUAC, weight‑for‑height, and serum albumin.",
            "In Uganda, kwashiorkor is a common cause of oedema.",
            "Assess for cardiac and renal causes."
        ]
    },

    // ============================================================
    // 15. ABDOMINAL DISTENSION
    // ============================================================
    "abdominal distension": {
        title: "🫃 Abdominal Distension",
        chapter: "Nelson, Ch. 354",
        questions: [
            { q: "How long has distension been present?", hint: "Acute vs chronic", clues: [
                { text: "< 6 hours", label: "Acute", color: "#c0392b", desc: "Obstruction" },
                { text: "6–24 hours", label: "Subacute", color: "#e67e22", desc: "Obstruction, constipation" },
                { text: "> 24 hours", label: "Chronic", color: "#2980b9", desc: "Ascites, mass" }
            ]},
            { q: "Was onset sudden or gradual?", hint: "Sudden = obstruction", clues: [
                { text: "Sudden", label: "Emergency", color: "#c0392b", desc: "Intestinal obstruction" },
                { text: "Gradual", label: "Chronic", color: "#e67e22", desc: "Ascites, organomegaly" }
            ]},
            { q: "Is there associated pain?", hint: "Pain suggests peritonitis or obstruction", clues: [
                { text: "Yes", label: "Painful", color: "#c0392b", desc: "Peritonitis, obstruction" },
                { text: "No", label: "Painless", color: "#27ae60", desc: "Ascites, organomegaly" }
            ]},
            { q: "Is there any vomiting?", hint: "Vomiting = obstruction", clues: [
                { text: "Yes, bilious", label: "Obstruction", color: "#c0392b", desc: "Surgical emergency" },
                { text: "Yes, non‑bilious", label: "Gastroenteritis", color: "#e67e22", desc: "Medical" },
                { text: "No", label: "No vomiting", color: "#27ae60", desc: "Ascites, mass" }
            ]},
            { q: "Any constipation or diarrhoea?", hint: "Constipation = obstruction, diarrhoea = infection", clues: [
                { text: "Constipation", label: "Obstruction", color: "#c0392b", desc: "Surgical" },
                { text: "Diarrhoea", label: "Infectious", color: "#e67e22", desc: "Gastroenteritis" },
                { text: "Normal", label: "Normal", color: "#27ae60", desc: "Ascites, mass" }
            ]},
            { q: "Is there any fever?", hint: "Fever = infection or peritonitis", clues: [
                { text: "Yes", label: "Infectious", color: "#e67e22", desc: "Peritonitis, typhoid" },
                { text: "No", label: "Afebrile", color: "#27ae60", desc: "Obstruction, ascites" }
            ]},
            { q: "Is the child passing flatus?", hint: "No flatus = obstruction", clues: [
                { text: "Yes", label: "Passing flatus", color: "#27ae60", desc: "Less likely obstruction" },
                { text: "No", label: "No flatus", color: "#c0392b", desc: "Obstruction" }
            ]},
            { q: "Is there any visible peristalsis?", hint: "Visible peristalsis = obstruction", clues: [
                { text: "Yes", label: "Obstruction", color: "#c0392b", desc: "Surgical emergency" },
                { text: "No", label: "No visible", color: "#27ae60", desc: "Other" }
            ]},
            { q: "Is the abdomen tender?", hint: "Tenderness = peritonitis", clues: [
                { text: "Yes", label: "Peritonitis", color: "#c0392b", desc: "Emergency" },
                { text: "No", label: "Non‑tender", color: "#27ae60", desc: "Ascites, organomegaly" }
            ]}
        ],
        redFlags: [
            "Bilious vomiting → intestinal obstruction",
            "Rigid abdomen → peritonitis",
            "No flatus + distension → obstruction",
            "Visible peristalsis → obstruction"
        ],
        tips: [
            "Inspect, auscultate, percuss, palpate in that order.",
            "In Uganda, typhoid and tuberculosis can cause abdominal distension.",
            "Always consider surgical causes."
        ]
    },

    // ============================================================
    // 16. FAILURE TO THRIVE
    // ============================================================
    "failure to thrive": {
        title: "📉 Failure to Thrive",
        chapter: "Nelson, Ch. 38",
        questions: [
            { q: "How long has poor weight gain been noticed?", hint: "Duration", clues: [
                { text: "< 1 month", label: "Acute", color: "#e67e22", desc: "Infection, acute illness" },
                { text: "1–3 months", label: "Subacute", color: "#e67e22", desc: "Malabsorption, chronic illness" },
                { text: "> 3 months", label: "Chronic", color: "#c0392b", desc: "Organic cause" }
            ]},
            { q: "What is the child's feeding pattern?", hint: "Appetite and intake", clues: [
                { text: "Good appetite", label: "Increased metabolic demand", color: "#e67e22", desc: "Hyperthyroidism, HIV" },
                { text: "Poor appetite", label: "Anorexia", color: "#c0392b", desc: "Infection, malignancy" },
                { text: "Refuses food", label: "Feeding difficulty", color: "#e67e22", desc: "GORD, oral thrush" }
            ]},
            { q: "Is there any vomiting?", hint: "Vomiting = malabsorption or obstruction", clues: [
                { text: "Yes", label: "Malabsorption", color: "#e67e22", desc: "Coeliac, giardiasis" },
                { text: "No", label: "No vomiting", color: "#27ae60", desc: "Other" }
            ]},
            { q: "Any diarrhoea?", hint: "Diarrhoea = malabsorption", clues: [
                { text: "Yes", label: "Malabsorption", color: "#e67e22", desc: "Giardia, HIV" },
                { text: "No", label: "No diarrhoea", color: "#27ae60", desc: "Other" }
            ]},
            { q: "Is there any fever?", hint: "Fever = chronic infection", clues: [
                { text: "Yes", label: "Infectious", color: "#e67e22", desc: "TB, HIV, malaria" },
                { text: "No", label: "Afebrile", color: "#27ae60", desc: "Non‑infectious" }
            ]},
            { q: "Is the child developmentally delayed?", hint: "Delay suggests organic cause", clues: [
                { text: "Yes", label: "Organic", color: "#c0392b", desc: "Genetic, metabolic" },
                { text: "No", label: "Normal development", color: "#27ae60", desc: "Nutritional" }
            ]},
            { q: "Any regression of milestones?", hint: "Regression = neurodegenerative", clues: [
                { text: "Yes", label: "Neurodegenerative", color: "#c0392b", desc: "Urgent neurology" },
                { text: "No", label: "No regression", color: "#27ae60", desc: "Other" }
            ]},
            { q: "Is there any known chronic illness?", hint: "Chronic illness can cause FTT", clues: [
                { text: "Yes", label: "Chronic disease", color: "#e67e22", desc: "HIV, sickle cell" },
                { text: "No", label: "No known illness", color: "#27ae60", desc: "New diagnosis" }
            ]},
            { q: "What is the family situation?", hint: "Social factors", clues: [
                { text: "Good support", label: "Adequate", color: "#27ae60", desc: "Organic cause likely" },
                { text: "Challenging circumstances", label: "Social", color: "#e67e22", desc: "Non‑organic" }
            ]}
        ],
        redFlags: [
            "Weight < 2nd centile → investigate",
            "Regression in milestones → neurodegenerative",
            "Poor appetite + fever → chronic infection (TB, HIV)",
            "Projectile vomiting → pyloric stenosis"
        ],
        tips: [
            "Plot growth chart and assess centile crossing.",
            "In Uganda, HIV and TB are common causes of FTT.",
            "Always do a full history and examination."
        ]
    },

    // ============================================================
    // 17. LIMPING / BONE PAIN  (corrected key)
    // ============================================================
    "limping / bone pain": {
        title: "🦴 Limping / Bone Pain",
        chapter: "Nelson, Ch. 650",
        questions: [
            { q: "How long has limping/pain been present?", hint: "Duration", clues: [
                { text: "< 24 hours", label: "Acute", color: "#e67e22", desc: "Trauma, septic arthritis" },
                { text: "1–3 days", label: "Subacute", color: "#e67e22", desc: "Infection, transient synovitis" },
                { text: "> 3 days", label: "Chronic", color: "#c0392b", desc: "Malignancy, JIA" }
            ]},
            { q: "Is it painful?", hint: "Pain indicates inflammation", clues: [
                { text: "Yes", label: "Painful", color: "#e67e22", desc: "Arthritis, fracture, infection" },
                { text: "No", label: "Painless", color: "#c0392b", desc: "Malignancy, neuromuscular" }
            ]},
            { q: "Is there any fever?", hint: "Fever = infection", clues: [
                { text: "Yes", label: "Infectious", color: "#e67e22", desc: "Septic arthritis, osteomyelitis" },
                { text: "No", label: "Afebrile", color: "#27ae60", desc: "Trauma, JIA, malignancy" }
            ]},
            { q: "Is there any swelling?", hint: "Swelling suggests infection or trauma", clues: [
                { text: "Yes", label: "Swelling", color: "#e67e22", desc: "Septic arthritis, fracture" },
                { text: "No", label: "No swelling", color: "#27ae60", desc: "Transient synovitis" }
            ]},
            { q: "Is there any redness or heat?", hint: "Signs of inflammation", clues: [
                { text: "Yes", label: "Red/hot", color: "#c0392b", desc: "Septic arthritis, cellulitis" },
                { text: "No", label: "No redness", color: "#27ae60", desc: "Less inflammatory" }
            ]},
            { q: "Is the child able to bear weight?", hint: "Inability to bear weight = fracture or septic arthritis", clues: [
                { text: "No", label: "Non‑weight bearing", color: "#c0392b", desc: "Fracture, septic arthritis" },
                { text: "Yes", label: "Weight bearing", color: "#27ae60", desc: "Mild condition" }
            ]},
            { q: "Is there any trauma history?", hint: "Trauma = fracture or contusion", clues: [
                { text: "Yes", label: "Trauma", color: "#e67e22", desc: "Fracture, soft tissue injury" },
                { text: "No", label: "No trauma", color: "#27ae60", desc: "Non‑traumatic" }
            ]},
            { q: "Any night pain?", hint: "Night pain = malignancy", clues: [
                { text: "Yes", label: "Night pain", color: "#c0392b", desc: "Bone tumour" },
                { text: "No", label: "No night pain", color: "#27ae60", desc: "Less likely" }
            ]},
            { q: "Any known sickle cell disease?", hint: "Sickle crisis causes bone pain", clues: [
                { text: "Yes", label: "Sickle", color: "#c0392b", desc: "Sickle cell crisis" },
                { text: "No", label: "No sickle", color: "#27ae60", desc: "Other" }
            ]}
        ],
        redFlags: [
            "Hot, swollen, immobile joint → septic arthritis (emergency)",
            "Night pain + weight loss → malignancy",
            "Fever + inability to bear weight → osteomyelitis",
            "Sickle cell + bone pain → vaso‑occlusive crisis"
        ],
        tips: [
            "In Uganda, septic arthritis and osteomyelitis are common.",
            "X‑ray is the first‑line investigation.",
            "Always consider sickle cell disease."
        ]
    },

    // ============================================================
    // 18. HAEMATURIA
    // ============================================================
    haematuria: {
        title: "🔴 Haematuria",
        chapter: "Nelson, Ch. 500",
        questions: [
            { q: "When did you notice blood in urine?", hint: "Onset", clues: [
                { text: "< 24 hours", label: "Acute", color: "#e67e22", desc: "UTI, trauma" },
                { text: "1–3 days", label: "Subacute", color: "#e67e22", desc: "GN, UTI" },
                { text: "> 3 days", label: "Chronic", color: "#c0392b", desc: "Schistosomiasis, malignancy" }
            ]},
            { q: "Is it visible or microscopic?", hint: "Visible = macroscopic", clues: [
                { text: "Visible (macroscopic)", label: "Macroscopic", color: "#c0392b", desc: "UTI, GN, stones" },
                { text: "Microscopic (only on test)", label: "Microscopic", color: "#e67e22", desc: "Glomerular disease" }
            ]},
            { q: "Is there associated pain?", hint: "Pain = stones or UTI", clues: [
                { text: "Yes", label: "Painful", color: "#e67e22", desc: "UTI, stones" },
                { text: "No", label: "Painless", color: "#c0392b", desc: "Glomerulonephritis, malignancy" }
            ]},
            { q: "Is there any fever?", hint: "Fever = UTI", clues: [
                { text: "Yes", label: "Infectious", color: "#e67e22", desc: "UTI, pyelonephritis" },
                { text: "No", label: "Afebrile", color: "#27ae60", desc: "GN, stones" }
            ]},
            { q: "Is there any swelling (oedema)?", hint: "Oedema = nephritic/nephrotic", clues: [
                { text: "Yes", label: "Renal", color: "#c0392b", desc: "Glomerulonephritis" },
                { text: "No", label: "No oedema", color: "#27ae60", desc: "UTI, stones" }
            ]},
            { q: "Is there any difficulty passing urine?", hint: "Dysuria = UTI", clues: [
                { text: "Yes", label: "Dysuria", color: "#e67e22", desc: "UTI" },
                { text: "No", label: "No dysuria", color: "#27ae60", desc: "Other" }
            ]},
            { q: "Any recent throat infection?", hint: "Post‑streptococcal GN", clues: [
                { text: "Yes", label: "Post‑streptococcal", color: "#c0392b", desc: "GN" },
                { text: "No", label: "No recent infection", color: "#27ae60", desc: "Other" }
            ]},
            { q: "Any trauma?", hint: "Trauma can cause haematuria", clues: [
                { text: "Yes", label: "Traumatic", color: "#e67e22", desc: "Renal trauma" },
                { text: "No", label: "No trauma", color: "#27ae60", desc: "Non‑traumatic" }
            ]},
            { q: "Any family history of kidney disease?", hint: "Familial", clues: [
                { text: "Yes", label: "Familial", color: "#c0392b", desc: "Alport, IgA" },
                { text: "No", label: "No family history", color: "#27ae60", desc: "Acquired" }
            ]}
        ],
        redFlags: [
            "Painless total haematuria → malignancy",
            "Clots + retention → surgical emergency",
            "Haematuria + oedema + hypertension → acute GN",
            "Haematuria + fever → UTI/pyelonephritis"
        ],
        tips: [
            "In Uganda, schistosomiasis is a common cause of haematuria.",
            "Check urinalysis, urine culture, and renal function.",
            "Ask about sickle cell disease."
        ]
    },

    // ============================================================
    // 19. DYSURIA / FREQUENCY (corrected key)
    // ============================================================
    "dysuria / frequency": {
        title: "🚿 Dysuria / Frequency",
        chapter: "Nelson, Ch. 500",
        questions: [
            { q: "How long have urinary symptoms been present?", hint: "Duration", clues: [
                { text: "< 24 hours", label: "Acute", color: "#e67e22", desc: "UTI" },
                { text: "1–3 days", label: "Subacute", color: "#e67e22", desc: "UTI, vaginitis" },
                { text: "> 3 days", label: "Chronic", color: "#c0392b", desc: "Chronic UTI, diabetes" }
            ]},
            { q: "Is there pain on passing urine?", hint: "Dysuria", clues: [
                { text: "Yes", label: "Dysuria", color: "#e67e22", desc: "UTI, urethritis" },
                { text: "No", label: "No pain", color: "#27ae60", desc: "Frequency without infection" }
            ]},
            { q: "Is there increased frequency?", hint: "Frequency", clues: [
                { text: "Yes", label: "Frequency", color: "#e67e22", desc: "UTI, diabetes" },
                { text: "No", label: "Normal", color: "#27ae60", desc: "Other" }
            ]},
            { q: "Is there urgency?", hint: "Urgency = UTI or overactive bladder", clues: [
                { text: "Yes", label: "Urgency", color: "#e67e22", desc: "UTI" },
                { text: "No", label: "No urgency", color: "#27ae60", desc: "Less likely" }
            ]},
            { q: "Is there associated fever?", hint: "Fever = pyelonephritis", clues: [
                { text: "Yes", label: "Pyelonephritis", color: "#c0392b", desc: "Urgent IV antibiotics" },
                { text: "No", label: "Afebrile", color: "#27ae60", desc: "Lower UTI" }
            ]},
            { q: "Is there any abdominal pain?", hint: "Pain = pyelonephritis or cystitis", clues: [
                { text: "Yes", label: "Abdominal pain", color: "#e67e22", desc: "UTI" },
                { text: "No", label: "No pain", color: "#27ae60", desc: "Other" }
            ]},
            { q: "Is there any blood in urine?", hint: "Haematuria", clues: [
                { text: "Yes", label: "Haematuria", color: "#e67e22", desc: "UTI, stones" },
                { text: "No", label: "No blood", color: "#27ae60", desc: "Less likely" }
            ]},
            { q: "Is there any foul‑smelling urine?", hint: "Smell suggests UTI", clues: [
                { text: "Yes", label: "Foul smell", color: "#e67e22", desc: "UTI" },
                { text: "No", label: "Normal smell", color: "#27ae60", desc: "Other" }
            ]},
            { q: "Is the stream poor?", hint: "Poor stream = obstruction", clues: [
                { text: "Yes", label: "Poor stream", color: "#c0392b", desc: "Obstruction" },
                { text: "No", label: "Normal stream", color: "#27ae60", desc: "Other" }
            ]}
        ],
        redFlags: [
            "Fever + vomiting → pyelonephritis (admit)",
            "Poor stream → obstruction",
            "Haematuria + clots → surgical emergency",
            "Dysuria + fever + loin pain → pyelonephritis"
        ],
        tips: [
            "Urinalysis and culture are essential.",
            "In Uganda, schistosomiasis can cause haematuria and dysuria.",
            "Ask about diabetes symptoms (polyuria, polydipsia)."
        ]
    },

    // ============================================================
    // 20. DELAYED SPEECH (corrected key)
    // ============================================================
    "delayed speech": {
        title: "🗣️ Developmental Delay (Speech)",
        chapter: "Nelson, Ch. 38",
        questions: [
            { q: "What area of development is concerning?", hint: "Speech, motor, social, global", clues: [
                { text: "Speech", label: "Speech delay", color: "#e67e22", desc: "Hearing, autism" },
                { text: "Motor", label: "Motor delay", color: "#e67e22", desc: "Cerebral palsy, muscular" },
                { text: "Social", label: "Social delay", color: "#e67e22", desc: "Autism, environmental" },
                { text: "Global", label: "Global delay", color: "#c0392b", desc: "Genetic, metabolic" }
            ]},
            { q: "When did you first notice delay?", hint: "Age of concern", clues: [
                { text: "< 6 months", label: "Early", color: "#c0392b", desc: "Cerebral palsy, genetic" },
                { text: "6–12 months", label: "Infancy", color: "#e67e22", desc: "Global delay" },
                { text: "> 1 year", label: "Later", color: "#e67e22", desc: "Speech delay, autism" }
            ]},
            { q: "Has there been any regression?", hint: "Regression = neurodegenerative", clues: [
                { text: "Yes", label: "Regression", color: "#c0392b", desc: "Neurodegenerative" },
                { text: "No", label: "No regression", color: "#27ae60", desc: "Developmental" }
            ]},
            { q: "Is there any hearing or vision problem?", hint: "Sensory deficits", clues: [
                { text: "Yes", label: "Sensory", color: "#e67e22", desc: "Hearing/vision loss" },
                { text: "No", label: "No sensory", color: "#27ae60", desc: "Other" }
            ]},
            { q: "Any history of birth complications?", hint: "Perinatal insults", clues: [
                { text: "Yes", label: "Perinatal", color: "#c0392b", desc: "HIE, prematurity" },
                { text: "No", label: "No complications", color: "#27ae60", desc: "Other" }
            ]},
            { q: "Is there any seizures?", hint: "Seizures + delay = epilepsy syndrome", clues: [
                { text: "Yes", label: "Seizures", color: "#c0392b", desc: "Epilepsy syndrome" },
                { text: "No", label: "No seizures", color: "#27ae60", desc: "Other" }
            ]},
            { q: "Any family history of developmental delay?", hint: "Genetic", clues: [
                { text: "Yes", label: "Familial", color: "#c0392b", desc: "Genetic" },
                { text: "No", label: "No family history", color: "#27ae60", desc: "Acquired" }
            ]},
            { q: "Is the child meeting any milestones?", hint: "Specific milestones", clues: [
                { text: "Yes, some", label: "Partial", color: "#e67e22", desc: "Global delay" },
                { text: "No, none", label: "None", color: "#c0392b", desc: "Severe delay" }
            ]},
            { q: "Any chronic illnesses?", hint: "Chronic illness can cause delay", clues: [
                { text: "Yes", label: "Chronic", color: "#e67e22", desc: "HIV, sickle cell" },
                { text: "No", label: "No chronic", color: "#27ae60", desc: "Other" }
            ]}
        ],
        redFlags: [
            "Loss of acquired skills → neurodegenerative",
            "No babbling by 12 months → hearing or speech problem",
            "No walking by 18 months → motor delay",
            "Regression + seizures → neurodegenerative"
        ],
        tips: [
            "Use a validated developmental screening tool (e.g., Denver II).",
            "In Uganda, HIV and malnutrition can cause developmental delay.",
            "Refer to paediatric neurology and early intervention services."
        ]
    },

    // ============================================================
    // 21. EYE PROBLEMS
    // ============================================================
    "eye problems": {
        title: "👁️ Eye Problems",
        chapter: "Nelson, Ch. 650",
        questions: [
            { q: "What is the eye problem?", hint: "Redness, discharge, swelling, pain, visual loss", clues: [
                { text: "Redness", label: "Red eye", color: "#e67e22", desc: "Conjunctivitis, uveitis" },
                { text: "Discharge", label: "Discharge", color: "#e67e22", desc: "Conjunctivitis" },
                { text: "Swelling", label: "Swelling", color: "#e67e22", desc: "Cellulitis, allergy" },
                { text: "Pain", label: "Pain", color: "#c0392b", desc: "Keratitis, iritis" },
                { text: "Visual loss", label: "Visual loss", color: "#c0392b", desc: "Emergency!" }
            ]},
            { q: "How long has it been present?", hint: "Duration", clues: [
                { text: "< 24 hours", label: "Acute", color: "#e67e22", desc: "Conjunctivitis, trauma" },
                { text: "1–3 days", label: "Subacute", color: "#e67e22", desc: "Viral, bacterial" },
                { text: "> 3 days", label: "Chronic", color: "#c0392b", desc: "Glaucoma, uveitis" }
            ]},
            { q: "Is there any discharge?", hint: "Purulent = bacterial, watery = viral", clues: [
                { text: "Yes, purulent", label: "Bacterial", color: "#e67e22", desc: "Bacterial conjunctivitis" },
                { text: "Yes, watery", label: "Viral", color: "#27ae60", desc: "Viral conjunctivitis" },
                { text: "No", label: "No discharge", color: "#27ae60", desc: "Uveitis, trauma" }
            ]},
            { q: "Is there any pain?", hint: "Pain = keratitis, iritis", clues: [
                { text: "Yes", label: "Painful", color: "#c0392b", desc: "Keratitis, iritis" },
                { text: "No", label: "Painless", color: "#27ae60", desc: "Conjunctivitis" }
            ]},
            { q: "Is there any photophobia?", hint: "Photophobia = iritis, keratitis", clues: [
                { text: "Yes", label: "Photophobia", color: "#c0392b", desc: "Iritis, keratitis" },
                { text: "No", label: "No photophobia", color: "#27ae60", desc: "Conjunctivitis" }
            ]},
            { q: "Is there any redness?", hint: "Redness = inflammation", clues: [
                { text: "Yes", label: "Red", color: "#e67e22", desc: "Conjunctivitis, uveitis" },
                { text: "No", label: "Not red", color: "#27ae60", desc: "Other" }
            ]},
            { q: "Is there associated fever?", hint: "Fever = systemic infection", clues: [
                { text: "Yes", label: "Systemic", color: "#e67e22", desc: "Measles, dengue" },
                { text: "No", label: "Afebrile", color: "#27ae60", desc: "Local" }
            ]},
            { q: "Is there any rash?", hint: "Rash + red eyes = measles", clues: [
                { text: "Yes", label: "Measles", color: "#e67e22", desc: "Vitamin A needed" },
                { text: "No", label: "No rash", color: "#27ae60", desc: "Other" }
            ]},
            { q: "Any trauma?", hint: "Trauma = corneal abrasion", clues: [
                { text: "Yes", label: "Trauma", color: "#e67e22", desc: "Corneal abrasion" },
                { text: "No", label: "No trauma", color: "#27ae60", desc: "Non‑traumatic" }
            ]}
        ],
        redFlags: [
            "Painful red eye + photophobia → iritis / glaucoma",
            "Sudden loss of vision → emergency",
            "Red eye + fever + rash → measles (vitamin A)",
            "Corneal opacity → urgent ophthalmology"
        ],
        tips: [
            "In Uganda, measles is a common cause of eye problems.",
            "Always check for corneal involvement.",
            "Refer for slit‑lamp examination if available."
        ]
    },

    // ============================================================
    // 22. BLEEDING / BRUISING (corrected key)
    // ============================================================
    "bleeding / bruising": {
        title: "🩸 Bleeding / Bruising",
        chapter: "Nelson, Ch. 470",
        questions: [
            { q: "What type of bleeding/bruising?", hint: "Bruising, petechiae, epistaxis, gum bleeding, haemarthrosis", clues: [
                { text: "Bruising", label: "Bruising", color: "#e67e22", desc: "ITP, trauma" },
                { text: "Petechiae", label: "Petechiae", color: "#c0392b", desc: "ITP, meningococcaemia" },
                { text: "Epistaxis", label: "Epistaxis", color: "#e67e22", desc: "Platelet dysfunction" },
                { text: "Gum bleeding", label: "Gum bleeding", color: "#c0392b", desc: "Leukaemia, scurvy" },
                { text: "Haemarthrosis", label: "Haemarthrosis", color: "#c0392b", desc: "Haemophilia" }
            ]},
            { q: "How long has it been present?", hint: "Duration", clues: [
                { text: "< 24 hours", label: "Acute", color: "#e67e22", desc: "Infection, trauma" },
                { text: "1–3 days", label: "Subacute", color: "#e67e22", desc: "ITP, DIC" },
                { text: "> 3 days", label: "Chronic", color: "#c0392b", desc: "Leukaemia, haemophilia" }
            ]},
            { q: "Is there any fever?", hint: "Fever = infection or malignancy", clues: [
                { text: "Yes", label: "Infectious", color: "#e67e22", desc: "Meningococcaemia" },
                { text: "No", label: "Afebrile", color: "#27ae60", desc: "ITP, haemophilia" }
            ]},
            { q: "Is there any rash?", hint: "Petechial rash = meningococcaemia", clues: [
                { text: "Yes, petechial", label: "Meningococcaemia", color: "#c0392b", desc: "Emergency!" },
                { text: "Yes, purpuric", label: "Vasculitis", color: "#c0392b", desc: "HSP" },
                { text: "No", label: "No rash", color: "#27ae60", desc: "Other" }
            ]},
            { q: "Is there any joint swelling?", hint: "Haemarthrosis = haemophilia", clues: [
                { text: "Yes", label: "Haemarthrosis", color: "#c0392b", desc: "Haemophilia" },
                { text: "No", label: "No joint", color: "#27ae60", desc: "Other" }
            ]},
            { q: "Is there any pallor?", hint: "Pallor = anaemia", clues: [
                { text: "Yes", label: "Anaemia", color: "#e67e22", desc: "Leukaemia, chronic bleeding" },
                { text: "No", label: "No pallor", color: "#27ae60", desc: "Less chronic" }
            ]},
            { q: "Is there any lethargy?", hint: "Lethargy = severe illness", clues: [
                { text: "Yes", label: "Severe", color: "#c0392b", desc: "Leukaemia, sepsis" },
                { text: "No", label: "Alert", color: "#27ae60", desc: "Mild" }
            ]},
            { q: "Any family history of bleeding disorder?", hint: "Haemophilia, von Willebrand", clues: [
                { text: "Yes", label: "Familial", color: "#c0392b", desc: "Haemophilia" },
                { text: "No", label: "No family history", color: "#27ae60", desc: "Acquired" }
            ]},
            { q: "Any medications?", hint: "Drugs can cause thrombocytopenia", clues: [
                { text: "Yes", label: "Drug‑induced", color: "#e67e22", desc: "Stop offending drug" },
                { text: "No", label: "No medications", color: "#27ae60", desc: "Other" }
            ]}
        ],
        redFlags: [
            "Non‑blanching rash + sick child → meningococcaemia",
            "Haemarthrosis → haemophilia",
            "Petechiae + fever → meningococcaemia (emergency)",
            "Gum bleeding + pallor → leukaemia"
        ],
        tips: [
            "Check platelet count and coagulation profile.",
            "In Uganda, meningococcaemia and malaria are common causes.",
            "Ask about sickle cell disease and family history."
        ]
    },

    // ============================================================
    // 23. UNCONSCIOUSNESS
    // ============================================================
    unconsciousness: {
        title: "😶 Unconsciousness / Coma",
        chapter: "Nelson, Ch. 600",
        questions: [
            { q: "How long has the child been unconscious?", hint: "Duration", clues: [
                { text: "< 1 hour", label: "Acute", color: "#c0392b", desc: "Syncope, seizure" },
                { text: "1–6 hours", label: "Subacute", color: "#c0392b", desc: "Hypoglycaemia, head injury" },
                { text: "> 6 hours", label: "Prolonged", color: "#c0392b", desc: "Coma" }
            ]},
            { q: "Was onset sudden or gradual?", hint: "Sudden = seizure, hypoglycaemia; gradual = infection", clues: [
                { text: "Sudden", label: "Sudden", color: "#c0392b", desc: "Seizure, hypoglycaemia" },
                { text: "Gradual", label: "Gradual", color: "#c0392b", desc: "Meningitis, encephalitis" }
            ]},
            { q: "Is there any fever?", hint: "Fever = infection", clues: [
                { text: "Yes", label: "Infectious", color: "#c0392b", desc: "Malaria, meningitis" },
                { text: "No", label: "Afebrile", color: "#c0392b", desc: "Hypoglycaemia, head injury" }
            ]},
            { q: "Is there any neck stiffness?", hint: "Meningism", clues: [
                { text: "Yes", label: "Meningitis", color: "#c0392b", desc: "Emergency!" },
                { text: "No", label: "No neck stiffness", color: "#c0392b", desc: "Other" }
            ]},
            { q: "Has there been any convulsions?", hint: "Seizures + coma = cerebral malaria", clues: [
                { text: "Yes", label: "Seizures", color: "#c0392b", desc: "Cerebral malaria, epilepsy" },
                { text: "No", label: "No seizures", color: "#c0392b", desc: "Other" }
            ]},
            { q: "Is there any head trauma?", hint: "Trauma = intracranial bleed", clues: [
                { text: "Yes", label: "Trauma", color: "#c0392b", desc: "Intracranial bleed" },
                { text: "No", label: "No trauma", color: "#c0392b", desc: "Non‑traumatic" }
            ]},
            { q: "Is there any vomiting?", hint: "Vomiting = raised ICP", clues: [
                { text: "Yes", label: "Raised ICP", color: "#c0392b", desc: "Meningitis, bleed" },
                { text: "No", label: "No vomiting", color: "#c0392b", desc: "Other" }
            ]},
            { q: "Any known diabetes?", hint: "Diabetes can cause hypoglycaemia", clues: [
                { text: "Yes", label: "Diabetes", color: "#c0392b", desc: "Hypoglycaemia, DKA" },
                { text: "No", label: "No diabetes", color: "#c0392b", desc: "Other" }
            ]},
            { q: "What is the blood glucose? (if known)", hint: "Hypoglycaemia is a common cause", clues: [
                { text: "Normal (>3.5)", label: "Normoglycaemia", color: "#c0392b", desc: "Other causes" },
                { text: "Low (2.5-3.5)", label: "Hypoglycaemia", color: "#c0392b", desc: "Treat with glucose" },
                { text: "Very low (<2.5)", label: "Severe hypoglycaemia", color: "#c0392b", desc: "Emergency!" }
            ]}
        ],
        redFlags: [
            "GCS ≤ 8 → protect airway",
            "Seizures + coma → cerebral malaria",
            "Hypoglycaemia → IV dextrose",
            "Head injury + coma → CT head"
        ],
        tips: [
            "ABC is priority: Airway, Breathing, Circulation.",
            "In Uganda, cerebral malaria and hypoglycaemia are common causes.",
            "Always check blood glucose immediately."
        ]
    },

    // ============================================================
    // 24. MALNUTRITION
    // ============================================================
    malnutrition: {
        title: "⚖️ Malnutrition / Wasting",
        chapter: "Nelson, Ch. 38",
        questions: [
            { q: "What is the child's weight and height?", hint: "Anthropometry", clues: [
                { text: "Normal", label: "Normal", color: "#27ae60", desc: "Well‑nourished" },
                { text: "Mild wasting", label: "Mild", color: "#e67e22", desc: "MAM" },
                { text: "Moderate wasting", label: "Moderate", color: "#e67e22", desc: "MAM" },
                { text: "Severe wasting", label: "Severe", color: "#c0392b", desc: "SAM" }
            ]},
            { q: "What is the MUAC?", hint: "Mid‑upper arm circumference", clues: [
                { text: "> 12.5 cm", label: "Normal", color: "#27ae60", desc: "Well‑nourished" },
                { text: "11.5–12.5 cm", label: "MAM", color: "#e67e22", desc: "Moderate acute malnutrition" },
                { text: "< 11.5 cm", label: "SAM", color: "#c0392b", desc: "Severe acute malnutrition" }
            ]},
            { q: "Is there any oedema?", hint: "Bilateral pitting oedema = kwashiorkor", clues: [
                { text: "Yes", label: "Kwashiorkor", color: "#c0392b", desc: "SAM with oedema" },
                { text: "No", label: "No oedema", color: "#27ae60", desc: "Marasmus" }
            ]},
            { q: "Is there any skin changes (flaky paint)?", hint: "Flaky paint = kwashiorkor", clues: [
                { text: "Yes", label: "Kwashiorkor", color: "#c0392b", desc: "Protein deficiency" },
                { text: "No", label: "No skin changes", color: "#27ae60", desc: "Other" }
            ]},
            { q: "Is there any hair changes (thin, brown, sparse)?", hint: "Hair changes = kwashiorkor", clues: [
                { text: "Yes", label: "Kwashiorkor", color: "#c0392b", desc: "Protein deficiency" },
                { text: "No", label: "Normal hair", color: "#27ae60", desc: "Other" }
            ]},
            { q: "Is there any diarrhoea?", hint: "Diarrhoea = malabsorption", clues: [
                { text: "Yes", label: "Malabsorption", color: "#e67e22", desc: "Giardia, HIV" },
                { text: "No", label: "No diarrhoea", color: "#27ae60", desc: "Other" }
            ]},
            { q: "Is there any fever?", hint: "Fever = infection", clues: [
                { text: "Yes", label: "Infection", color: "#e67e22", desc: "TB, HIV, malaria" },
                { text: "No", label: "Afebrile", color: "#27ae60", desc: "Non‑infectious" }
            ]},
            { q: "Is the child feeding well?", hint: "Appetite", clues: [
                { text: "Yes", label: "Good appetite", color: "#27ae60", desc: "Increased metabolic demand" },
                { text: "Reduced", label: "Poor appetite", color: "#e67e22", desc: "Infection" },
                { text: "No", label: "Unable to feed", color: "#c0392b", desc: "Danger sign" }
            ]},
            { q: "Any known HIV?", hint: "HIV is a major cause of malnutrition", clues: [
                { text: "Yes", label: "HIV", color: "#c0392b", desc: "HIV‑related malnutrition" },
                { text: "No", label: "No HIV", color: "#27ae60", desc: "Other" }
            ]}
        ],
        redFlags: [
            "Hypothermia, hypoglycaemia → complicated SAM",
            "MUAC < 11.5 cm → severe acute malnutrition",
            "Bilateral pitting oedema → kwashiorkor",
            "Unable to feed → danger sign"
        ],
        tips: [
            "Use WHO growth charts and MUAC tape.",
            "In Uganda, SAM is a common cause of childhood mortality.",
            "Treat infections and give therapeutic feeds (F‑75/F‑100)."
        ]
    },

    // ============================================================
    // 25. NEONATAL PROBLEMS
    // ============================================================
    "neonatal problems": {
        title: "🍼 Neonatal Problems",
        chapter: "Nelson, Ch. 100",
        questions: [
            { q: "What is the neonate's age in days?", hint: "Age determines aetiology", clues: [
                { text: "< 1 day", label: "Day 1", color: "#c0392b", desc: "Perinatal problems" },
                { text: "1–3 days", label: "Day 2–3", color: "#e67e22", desc: "Physiological jaundice, sepsis" },
                { text: "3–7 days", label: "Day 3–7", color: "#e67e22", desc: "Sepsis, jaundice" },
                { text: "> 7 days", label: "Late neonate", color: "#2980b9", desc: "Sepsis, metabolic" }
            ]},
            { q: "What is the main concern?", hint: "Jaundice, poor feeding, lethargy, breathing difficulty, convulsions", clues: [
                { text: "Jaundice", label: "Jaundice", color: "#e67e22", desc: "Physiological, haemolytic" },
                { text: "Poor feeding", label: "Poor feeding", color: "#c0392b", desc: "Sepsis, metabolic" },
                { text: "Lethargy", label: "Lethargy", color: "#c0392b", desc: "Sepsis" },
                { text: "Breathing difficulty", label: "Respiratory", color: "#c0392b", desc: "RDS, pneumonia" },
                { text: "Convulsions", label: "Seizures", color: "#c0392b", desc: "Hypoglycaemia, HIE" }
            ]},
            { q: "Is there any jaundice?", hint: "Jaundice", clues: [
                { text: "Yes, <24h", label: "Pathological", color: "#c0392b", desc: "Haemolysis" },
                { text: "Yes, 1–7d", label: "Physiological", color: "#e67e22", desc: "Monitor" },
                { text: "No", label: "No jaundice", color: "#27ae60", desc: "Less concern" }
            ]},
            { q: "Is the baby feeding well?", hint: "Feeding", clues: [
                { text: "Yes", label: "Good", color: "#27ae60", desc: "Reassuring" },
                { text: "Reduced", label: "Reduced", color: "#e67e22", desc: "Sepsis" },
                { text: "No", label: "Unable", color: "#c0392b", desc: "Danger sign" }
            ]},
            { q: "Is the baby lethargic?", hint: "Lethargy = sepsis", clues: [
                { text: "Yes", label: "Lethargic", color: "#c0392b", desc: "Sepsis" },
                { text: "No", label: "Alert", color: "#27ae60", desc: "Reassuring" }
            ]},
            { q: "Is there any fever or hypothermia?", hint: "Temperature instability", clues: [
                { text: "Fever", label: "Fever", color: "#c0392b", desc: "Sepsis" },
                { text: "Hypothermia", label: "Hypothermia", color: "#c0392b", desc: "Sepsis, prematurity" },
                { text: "Normal", label: "Normal", color: "#27ae60", desc: "Less concern" }
            ]},
            { q: "Is there any breathing difficulty?", hint: "Respiratory distress", clues: [
                { text: "Yes", label: "RDS", color: "#c0392b", desc: "RDS, pneumonia" },
                { text: "No", label: "No distress", color: "#27ae60", desc: "Reassuring" }
            ]},
            { q: "Any convulsions?", hint: "Seizures", clues: [
                { text: "Yes", label: "Seizures", color: "#c0392b", desc: "Hypoglycaemia, HIE" },
                { text: "No", label: "No seizures", color: "#27ae60", desc: "Less concern" }
            ]},
            { q: "Is there any vomiting?", hint: "Vomiting = obstruction", clues: [
                { text: "Yes, bilious", label: "Obstruction", color: "#c0392b", desc: "Surgical emergency" },
                { text: "Yes, non‑bilious", label: "Gastrointestinal", color: "#e67e22", desc: "GORD, overfeeding" },
                { text: "No", label: "No vomiting", color: "#27ae60", desc: "Less concern" }
            ]}
        ],
        redFlags: [
            "Lethargy, poor feeding, hypothermia → neonatal sepsis",
            "Respiratory distress → RDS / pneumothorax",
            "Bilious vomiting → intestinal obstruction",
            "Jaundice < 24h → haemolytic disease"
        ],
        tips: [
            "Neonates can decompensate rapidly – admit and monitor closely.",
            "Always check blood glucose and temperature.",
            "In Uganda, sepsis and jaundice are common neonatal problems."
        ]
    },

    // ============================================================
    // 26. OTHER (General)
    // ============================================================
    other: {
        title: "💡 General Clinical Prompts",
        chapter: "Nelson, Ch. 1",
        questions: [
            { q: "What is the main complaint?", hint: "Describe in patient's own words", clues: [
                { text: "Describe briefly", label: "Main complaint", color: "#2980b9", desc: "Document verbatim" }
            ]},
            { q: "How long has it been present?", hint: "Duration", clues: [
                { text: "< 24 hours", label: "Acute", color: "#e67e22", desc: "Likely infection" },
                { text: "1–3 days", label: "Subacute", color: "#e67e22", desc: "Infection, trauma" },
                { text: "> 3 days", label: "Chronic", color: "#c0392b", desc: "Chronic illness" }
            ]},
            { q: "Is there any fever?", hint: "Fever suggests infection", clues: [
                { text: "Yes", label: "Febrile", color: "#e67e22", desc: "Infection" },
                { text: "No", label: "Afebrile", color: "#27ae60", desc: "Other" }
            ]},
            { q: "Is the child eating and drinking normally?", hint: "Hydration and severity", clues: [
                { text: "Yes", label: "Normal", color: "#27ae60", desc: "Mild" },
                { text: "Reduced", label: "Reduced", color: "#e67e22", desc: "Moderate" },
                { text: "Unable", label: "Unable", color: "#c0392b", desc: "Danger sign" }
            ]},
            { q: "Is the child playing normally?", hint: "Behaviour", clues: [
                { text: "Yes", label: "Normal", color: "#27ae60", desc: "Reassuring" },
                { text: "Reduced", label: "Reduced", color: "#e67e22", desc: "Illness" }
            ]},
            { q: "Are there any danger signs?", hint: "Lethargy, convulsions, unable to drink", clues: [
                { text: "Yes", label: "Danger signs", color: "#c0392b", desc: "Emergency" },
                { text: "No", label: "No danger signs", color: "#27ae60", desc: "Reassuring" }
            ]},
            { q: "Has the child had any similar episodes?", hint: "Recurrent", clues: [
                { text: "Yes", label: "Recurrent", color: "#e67e22", desc: "Chronic condition" },
                { text: "No", label: "First episode", color: "#27ae60", desc: "Acute" }
            ]},
            { q: "Is there any known chronic illness?", hint: "HIV, sickle cell, etc.", clues: [
                { text: "Yes", label: "Chronic", color: "#e67e22", desc: "Underlying condition" },
                { text: "No", label: "No chronic", color: "#27ae60", desc: "New illness" }
            ]},
            { q: "Is there any weight loss?", hint: "Weight loss is significant", clues: [
                { text: "Yes", label: "Weight loss", color: "#c0392b", desc: "Malignancy, chronic infection" },
                { text: "No", label: "No weight loss", color: "#27ae60", desc: "Less concern" }
            ]}
        ],
        redFlags: [
            "Always check danger signs first (lethargy, inability to feed, convulsions)",
            "Red flags are medical emergencies — do not delay referral",
            "In Uganda: always screen for malaria and HIV"
        ],
        tips: [
            "Take a thorough history and examination.",
            "Use IMCI guidelines for under‑5s.",
            "Document all findings clearly."
        ]
    }
};

// ============================================================
// ROS SYSTEM GUIDES
// ============================================================

const rosSystemGuides = {
    cardiovascular: ['Feeding fatigue, sweating, cyanosis, syncope, oedema.', 'Look for murmur, pulses, perfusion, hepatomegaly.'],
    respiratory: ['Cough, fast breathing, wheeze, stridor, TB contact.', 'Count RR, check SpO2, indrawing, air entry, crackles/wheeze.'],
    gastrointestinal: ['Vomiting, stool character, jaundice, abdominal pain, appetite.', 'Assess hydration, abdomen, liver, spleen, bowel sounds.'],
    genitourinary: ['Dysuria, frequency, haematuria, frothy urine, urine output.', 'Check BP, oedema, loin tenderness, bladder, genital findings when appropriate.'],
    neurological: ['Seizures, headache, lethargy, regression, weakness.', 'Check glucose, GCS/AVPU, pupils, meningism, tone, power.'],
    musculoskeletal: ['Limp, swelling, trauma, morning stiffness, night pain.', 'Inspect gait, range of movement, warmth, tenderness, swelling.'],
    skin: ['Rash type, itch, bruising, pallor, jaundice, wounds.', 'Check blanching, mucosa, distribution, nutrition, lymph nodes.'],
    ent: ['Ear discharge, hearing, throat, red eyes, photophobia.', 'Inspect ears, throat, eyes, mastoid, cervical nodes.'],
    endocrine: ['Polyuria, polydipsia, weight loss, heat/cold intolerance.', 'Check hydration, growth, thyroid, glucose-related signs.']
};

// ============================================================
// EXAM SYSTEM GUIDES
// ============================================================

const examSystemGuides = {
    general: ['Start with ABC, appearance, hydration, perfusion, nutrition, and vitals.', 'Red flags: shock, cyanosis, altered consciousness, severe dehydration.'],
    respiratory: ['Match inspection with auscultation: indrawing plus crackles suggests pneumonia; wheeze suggests lower airway narrowing.', 'Check symmetry and SpO2 before and after treatment if respiratory distress is present.'],
    cardiovascular: ['Peripheral pulses, CRT, liver size, murmur, cyanosis, and oedema help separate shock, heart failure, and congenital disease.', 'Poor feeding with sweating is an important infant cardiac clue.'],
    abdomen: ['Inspect before touching; auscultate before palpation if obstruction is possible.', 'Distension plus bilious vomiting, guarding, or absent bowel sounds is urgent.'],
    neurological: ['Document AVPU/GCS, pupils, meningism, tone, power, and focal signs.', 'Always check glucose in seizures, coma, or unexplained lethargy.'],
    skin: ['Describe rash morphology, distribution, blanching, mucosal involvement, and nutrition signs.', 'Petechiae/purpura with fever is an emergency.'],
    ent: ['Look for ear discharge source, mastoid tenderness, throat exudate, oral thrush, and eye red flags.', 'Photophobia, painful red eye, or reduced vision needs urgent attention.']
};