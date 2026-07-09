// ============================================================
// PHYSICAL EXAMINATION SYSTEMS — 4-step approach
// ============================================================

const examSystems = {
    general: {
        name: "General & Vitals",
        icon: "🩺",
        hasVitals: true,
        normal: "Child appears well, alert, and interactive. No pallor, jaundice, cyanosis, or oedema. Hydration adequate. Skin turgor normal. No lymphadenopathy palpable. Capillary refill <2 seconds. Age-appropriate behaviour and responsiveness.",
        steps: [
            { name: "Inspection", items: ["Well", "Ill-looking", "Toxic", "Pale", "Jaundiced", "Cyanosed",
                    "Oedematous", "Dehydrated", "Malnourished", "Dysmorphic features"
                ] },
            { name: "Palpation", items: ["Skin turgor normal", "Reduced skin turgor",
                    "Lymphadenopathy present"
                ] },
            { name: "Percussion", items: ["Not applicable"] },
            { name: "Auscultation", items: ["Not applicable"] }
        ]
    },
    respiratory: {
        name: "Respiratory",
        icon: "💨",
        normal: "Chest symmetrical with no deformities. Trachea central. Equal bilateral chest expansion. Percussion resonant throughout. Vesicular breath sounds audible in all zones. No added sounds (no crackles, wheeze, or stridor). Respiratory rate within normal limits for age. No use of accessory muscles or nasal flaring. SpO₂ ≥95% on room air.",
        steps: [
            { name: "Inspection", items: ["Normal chest shape", "Barrel chest", "Chest asymmetry",
                    "Harrison's sulcus", "Chest indrawing (subcostal)", "Intercostal recession",
                    "Nasal flaring", "Tracheal tug", "Head nodding", "Grunting",
                    "Use of accessory muscles", "Cyanosis"
                ] },
            { name: "Palpation", items: ["Trachea central", "Trachea deviated", "Reduced chest expansion",
                    "Tactile fremitus normal", "Tactile fremitus increased", "Tactile fremitus reduced"
                ] },
            { name: "Percussion", items: ["Resonant", "Dull", "Stony dull", "Hyperresonant"] },
            { name: "Auscultation", items: ["Vesicular breath sounds", "Bronchial breathing",
                    "Reduced air entry", "Absent air entry", "Fine crackles", "Coarse crackles",
                    "Wheeze (expiratory)", "Stridor (inspiratory)", "Pleural rub"
                ] }
        ]
    },
    cardiovascular: {
        name: "Cardiovascular",
        icon: "❤️",
        normal: "Precordium quiet with no visible pulsations or bulge. Apex beat felt at 4th/5th intercostal space at midclavicular line. No heaves or thrills. Heart sounds S1 and S2 heard clearly. No murmurs, gallops, or rubs. Peripheral pulses palpable and equal bilaterally. Capillary refill <2 seconds. No peripheral oedema, clubbing, or cyanosis.", 
        steps: [
            { name: "Inspection", items: ["Normal precordium", "Visible pulsations", "Precordial bulge",
                    "Scars (sternotomy)", "Peripheral oedema", "Clubbing", "Cyanosis (central)",
                    "Cyanosis (peripheral)"
                ] },
            { name: "Palpation", items: ["Apex beat normal position", "Apex beat displaced", "Heave",
                    "Thrill", "Weak pulses", "Bounding pulses", "Capillary refill <2s",
                    "Capillary refill >2s"
                ] },
            { name: "Auscultation", items: ["Normal S1 S2", "S3 (gallop)", "S4", "Murmur present",
                    "Pericardial rub"
                ] }
        ]
    },
    abdomen: {
        name: "Abdomen",
        icon: "🍽️",
        normal: "Abdomen soft, flat, and non-tender. No visible distension, scars, or striae. No visible peristalsis or dilated veins. Bowel sounds present and normoactive. No organomegaly (liver and spleen not palpable). No masses or hernias. No guarding or rebound tenderness. Percussion tympanitic with no dullness or shifting dullness. Umbilicus normal.",
        steps: [
            { name: "Inspection", items: ["Flat", "Distended", "Scaphoid", "Visible peristalsis",
                    "Dilated veins", "Umbilical hernia", "Surgical scars", "Striae"
                ] },
            { name: "Auscultation (first)", items: ["Bowel sounds normal", "Bowel sounds absent",
                    "Bowel sounds increased (tinkling)", "Bruit"
                ] },
            { name: "Palpation", items: ["Soft", "Rigid/Guarding", "Tenderness (generalised)",
                    "Tenderness (localised)", "Hepatomegaly", "Splenomegaly",
                    "Hepatosplenomegaly", "Renal mass", "Other mass"
                ] },
            { name: "Percussion", items: ["Tympanic", "Dull (solid organ)", "Dull (fluid — ascites)",
                    "Liver dullness normal", "Spleen dullness", "Shifting dullness"
                ] }
        ]
    },
    neurological: {
        name: "Neurological",
        icon: "🧠",
        normal: "Alert and oriented to person, place, and time (age-appropriate). Pupils equal, round, and reactive to light. No neck stiffness. Cranial nerves intact. Motor: normal tone, power 5/5 in all limbs. Sensation intact to light touch and pin-prick. Reflexes present and symmetrical. Plantar reflexes downgoing bilaterally. Coordination and gait normal for age. No involuntary movements. AVPU: Alert. GCS 15/15.",
        steps: [
            { name: "Inspection", items: ["Alert and oriented", "Drowsy", "Confused", "Unresponsive",
                    "Abnormal posture", "Involuntary movements", "Bulging fontanelle",
                    "Sunken fontanelle", "Microcephaly", "Macrocephaly"
                ] },
            { name: "Palpation", items: ["Fontanelle tense", "Fontanelle flat", "Fontanelle sunken",
                    "Neck stiffness", "Kernig's sign positive", "Brudzinski's sign positive"
                ] },
            { name: "Motor/Reflexes", items: ["Tone normal", "Hypotonia", "Hypertonia", "Power normal",
                    "Weakness", "Reflexes normal", "Hyperreflexia", "Hyporeflexia",
                    "Babinski positive", "Clonus"
                ] },
            { name: "Cranial nerves", items: ["Pupils equal reactive", "Pupils unequal", "Facial asymmetry",
                    "Gaze deviation"
                ] }
        ],
        hasGcs: true,
        hasAvpu: true
    },
    skin: {
        name: "Skin",
        icon: "🩹",
        normal: "Skin colour appropriate for age and ethnicity. No pallor, jaundice, or cyanosis. No rash, petechiae, purpura, or bruising. No lesions, ulcers, or wounds. Skin turgor normal. Hair normal texture and distribution. Nails unremarkable. No lymphadenopathy palpable. No oedema.",
        steps: [
            { name: "Inspection", items: ["Normal skin", "Pallor", "Jaundice", "Cyanosis",
                    "Rash (maculopapular)", "Rash (vesicular)", "Petechiae", "Purpura",
                    "Bruising", "Flaky paint dermatosis", "Wasting (loose skin)", "Oedema (pitting)",
                    "Oedema (non-pitting)", "Wounds/ulcers", "Scabies", "Tinea"
                ] },
            { name: "Palpation", items: ["Skin turgor normal", "Skin turgor reduced",
                    "Lymphadenopathy (cervical)", "Lymphadenopathy (axillary)",
                    "Lymphadenopathy (inguinal)", "Generalised lymphadenopathy"
                ] }
        ]
    },
    ent: {
        name: "ENT",
        icon: "👂",
        normal: "Ears: External ears normal. Tympanic membranes pearly grey with light reflex present, no perforation, congestion, or discharge. No mastoid tenderness. Nose: No discharge, mucosa pink. Throat: Oral mucosa moist and pink. Oropharynx clear, no erythema, exudate, or tonsillar enlargement. No oral thrush or Koplik's spots. Neck: no lymphadenopathy or masses.",
        steps: [
            { name: "Inspection", items: ["Normal tympanic membranes", "Perforated TM", "Congested TM",
                    "Ear discharge (purulent)", "Ear discharge (clear)", "Mastoid tenderness",
                    "Normal oropharynx", "Inflamed throat", "Tonsillar enlargement",
                    "Tonsillar exudate", "Oral thrush", "Koplik's spots", "Dry mucous membranes"
                ] },
            { name: "Palpation", items: ["Cervical lymphadenopathy", "Submandibular lymphadenopathy",
                    "Parotid enlargement"
                ] }
        ]
    }
};