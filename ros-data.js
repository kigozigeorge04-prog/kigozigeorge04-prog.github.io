// ============================================================
// REVIEW OF SYSTEMS (ROS) — Pediatric
// ============================================================

const pedsROS = {
    cardiovascular: {
        name: "Cardiovascular",
        icon: "❤️",
        common: [
            "Poor feeding / Tires during feeds",
            "Shortness of breath on exertion",
            "Sweating during feeding",
            "Blue spells / Cyanotic episodes (parent-reported)",
            "Palpitations (older child)",
            "Swollen feet / Ankle swelling (parent-reported)",
            "Chest pain (older child)",
            "Fainting / Loss of consciousness",
            "Recurrent chest infections",
            "Reduced exercise tolerance"
        ]
    },
    respiratory: {
        name: "Respiratory",
        icon: "💨",
        common: [
            "Cough (dry / productive)",
            "Fast breathing (parent-reported)",
            "Noisy breathing / Wheeze",
            "Difficult breathing / Breathlessness",
            "Blood in sputum / Haemoptysis",
            "Sputum colour (white / yellow / green)",
            "Snoring",
            "Apnoea spells noticed by parent (neonates)",
            "Recurrent chest infections",
            "Night-time cough"
        ]
    },
    gastrointestinal: {
        name: "Gastrointestinal",
        icon: "🍽️",
        common: [
            "Diarrhoea (watery / bloody / mucoid)",
            "Vomiting (non-bilious / bilious / projectile)",
            "Abdominal pain (location, character)",
            "Abdominal bloating / Distension (parent-reported)",
            "Constipation / Hard stools",
            "Blood in stool (fresh / melaena)",
            "Mucus in stool",
            "Tenesmus (feeling of incomplete emptying)",
            "Yellow eyes / Skin (jaundice — parent-reported)",
            "Difficulty swallowing / Dysphagia",
            "Excessive drooling",
            "Loss of appetite / Reduced food intake"
        ]
    },
    genitourinary: {
        name: "Genitourinary",
        icon: "💧",
        common: [
            "Pain on passing urine / Dysuria",
            "Passing urine too often / Frequency",
            "Urgency / Unable to hold urine",
            "Waking at night to pass urine / Nocturia",
            "Poor urine stream / Straining (boys)",
            "Blood in urine / Haematuria (parent-reported)",
            "Frothy / Cloudy urine (parent-reported)",
            "Urethral discharge (parent-reported)",
            "Scrotal swelling (parent-reported, boys)",
            "Bedwetting / Enuresis (age >5 years)"
        ]
    },
    neurological: {
        name: "Neurological",
        icon: "🧠",
        common: [
            "Convulsions / Fits (parent description)",
            "Developmental delay (milestone concerns)",
            "Headache (severe / persistent)",
            "Lethargy / Unusual drowsiness",
            "Neck stiffness / Dislike of light (parent-reported)",
            "Repeated vomiting / Projectile vomiting",
            "Weakness in limbs / Difficulty walking",
            "Unsteady gait / Falls",
            "Speech difficulty / Regression",
            "Behavioural changes / Mood changes",
            "Loss of consciousness / Unresponsive episodes",
            "Abnormal eye movements (parent-reported)"
        ]
    },
    musculoskeletal: {
        name: "Musculoskeletal",
        icon: "🦴",
        common: [
            "Joint pain / Arthralgia",
            "Joint swelling noticed by parent",
            "Limping / Abnormal gait",
            "Bone pain (localised / generalised)",
            "Muscle weakness / Difficulty climbing stairs",
            "Limb asymmetry (parent-reported)",
            "Limited movement of a limb",
            "Morning stiffness",
            "Muscle cramps",
            "Neck pain"
        ]
    },
    skin: {
        name: "Skin & Integumentary",
        icon: "🩹",
        common: [
            "Rash (parent description: spots / blisters / red areas)",
            "Itching / Pruritus",
            "Dry skin / Peeling",
            "Bruising easily",
            "Yellow skin or eyes noticed by parent",
            "Paleness noticed by parent",
            "Blue colour noticed by parent",
            "Itchy lesions between fingers (night itch)",
            "Circular skin lesions",
            "Sores / Non-healing wounds",
            "Hair loss"
        ]
    },
    ent: {
        name: "ENT & Eyes",
        icon: "👂",
        common: [
            "Ear discharge noticed by parent",
            "Ear pain / Otalgia",
            "Hearing loss / Not responding to sound",
            "Sore throat / Painful swallowing",
            "Runny nose / Nasal discharge",
            "Blocked nose",
            "Sneezing / Itchy nose",
            "Red eyes (parent-reported)",
            "Eye discharge noticed by parent",
            "Sensitivity to light",
            "Visual disturbance / Blurred vision",
            "Eyelid swelling noticed by parent"
        ]
    },
    endocrine: {
        name: "Endocrine / Metabolic",
        icon: "⚗️",
        common: [
            "Passing very large amounts of urine / Polyuria",
            "Drinking excessively / Polydipsia",
            "Always hungry / Polyphagia",
            "Weight loss despite eating well",
            "Feeling very hot / Heat intolerance",
            "Always feeling cold",
            "Shaking / Tremors",
            "Excessive sweating",
            "Delayed puberty (older child)",
            "Episodes of shakiness / faintness (possible hypoglycaemia)"
        ]
    }
};