// ============================================================
// SURGERY DDX DATABASE — Uganda Context
// ============================================================

const ddxDatabase = {
    // ===== FEVER =====
    'fever': {
        'Malaria': { 
            likelihood: function(data) { 
                let score = 0;
                if (data.ageMonths !== null && data.ageMonths > 1) score += 10;
                if (data.feverPresent) score += 15;
                if (data.associatedSymptoms && (data.associatedSymptoms.includes('rigors') || data.associatedSymptoms.includes('chills'))) score += 10;
                if (data.associatedSymptoms && data.associatedSymptoms.includes('headache')) score += 5;
                if (data.associatedSymptoms && data.associatedSymptoms.includes('vomiting')) score += 5;
                if (data.rosData?.neurological?.present?.includes('Lethargy / Drowsiness')) score += 8;
                if (data.rosData?.gastrointestinal?.present?.includes('Vomiting (non-bilious / bilious / projectile)')) score += 5;
                if (data.examData?.general?.pills?.includes('Pale')) score += 5;
                if (data.examData?.general?.pills?.includes('Ill-looking')) score += 5;
                if (data.hivStatus === 'negative') score += 5;
                if (data.hivStatus === 'positive') score += 2;
                if (data.durationDays < 14) score += 5;
                return Math.min(score, 100);
            },
            description: "Falciparum malaria is the most common cause of fever in Ugandan children. Presents with fever, chills, sweats, headache, and sometimes vomiting. Severe malaria features include altered consciousness, seizures, and respiratory distress.",
            distinguishingFeatures: ["Intermittent fever pattern", "Seasonal variation (rainy season)", "Splenomegaly (chronic)", "Thrombocytopenia", "Positive RDT or blood film"],
            investigations: ["Blood smear (thick + thin)", "RDT (HRP2/pLDH)", "FBC", "Blood glucose"],
            treatment: "Artemether-lumefantrine (AL) for uncomplicated; IV artesunate for severe."
        },
        'Pneumonia': {
            likelihood: function(data) {
                let score = 0;
                if (data.ageMonths !== null && data.ageMonths > 1) score += 5;
                if (data.feverPresent) score += 10;
                if (data.associatedSymptoms && data.associatedSymptoms.includes('cough')) score += 10;
                if (data.associatedSymptoms && data.associatedSymptoms.includes('fast breathing')) score += 10;
                if (data.associatedSymptoms && data.associatedSymptoms.includes('difficulty breathing')) score += 8;
                if (data.rosData?.respiratory?.present?.includes('Fast breathing / Tachypnoea')) score += 10;
                if (data.rosData?.respiratory?.present?.includes('Chest indrawing / Recession')) score += 8;
                if (data.rosData?.respiratory?.present?.includes('Cough (dry / productive)')) score += 8;
                if (data.examData?.respiratory?.pills?.includes('Chest indrawing (subcostal)')) score += 8;
                if (data.examData?.respiratory?.pills?.includes('Reduced air entry')) score += 5;
                if (data.examData?.respiratory?.pills?.includes('Coarse crackles')) score += 5;
                if (data.examData?.respiratory?.pills?.includes('Bronchial breathing')) score += 5;
                if (data.vitals?.rr && parseInt(data.vitals.rr) > 50) score += 5;
                return Math.min(score, 100);
            },
            description: "Pneumonia is a leading cause of childhood morbidity and mortality in Uganda. Presents with fever, cough, fast breathing, and chest indrawing. Caused by bacteria (S. pneumoniae, H. influenzae) and viruses.",
            distinguishingFeatures: ["Fast breathing (age-specific)", "Chest indrawing", "Crackles on auscultation", "Reduced air entry", "Dullness to percussion"],
            investigations: ["CXR", "FBC", "CRP", "Blood culture"],
            treatment: "Amoxicillin for uncomplicated; IV ceftriaxone for severe."
        },
        'UTI / Pyelonephritis': {
            likelihood: function(data) {
                let score = 0;
                if (data.feverPresent) score += 10;
                if (data.associatedSymptoms && data.associatedSymptoms.includes('dysuria')) score += 10;
                if (data.associatedSymptoms && data.associatedSymptoms.includes('frequency')) score += 5;
                if (data.associatedSymptoms && data.associatedSymptoms.includes('abdominal pain')) score += 5;
                if (data.rosData?.genitourinary?.present?.includes('Dysuria / Pain on passing urine')) score += 10;
                if (data.rosData?.genitourinary?.present?.includes('Frequency of urination')) score += 5;
                if (data.examData?.abdomen?.pills?.includes('Tenderness (suprapubic)')) score += 5;
                if (data.ageMonths !== null && data.ageMonths < 24) score += 5;
                if (data.hivStatus === 'positive') score += 3;
                return Math.min(score, 100);
            },
            description: "Urinary tract infection is a common cause of fever in children, especially girls and uncircumcised boys. May present with fever, dysuria, frequency, and abdominal pain. Pyelonephritis presents with high fever and loin tenderness.",
            distinguishingFeatures: ["Dysuria", "Frequency", "Suprapubic tenderness", "Fever without localising signs in infants"],
            investigations: ["Urinalysis", "Urine culture", "FBC", "CRP"],
            treatment: "Oral antibiotics (e.g., amoxicillin, co-amoxiclav) for uncomplicated; IV for pyelonephritis."
        },
        'Meningitis': {
            likelihood: function(data) {
                let score = 0;
                if (data.feverPresent) score += 10;
                if (data.associatedSymptoms && data.associatedSymptoms.includes('neck stiffness')) score += 15;
                if (data.associatedSymptoms && data.associatedSymptoms.includes('altered consciousness')) score += 15;
                if (data.associatedSymptoms && data.associatedSymptoms.includes('convulsions')) score += 10;
                if (data.associatedSymptoms && data.associatedSymptoms.includes('headache')) score += 5;
                if (data.rosData?.neurological?.present?.includes('Neck stiffness / Photophobia')) score += 15;
                if (data.rosData?.neurological?.present?.includes('Lethargy / Drowsiness')) score += 10;
                if (data.rosData?.neurological?.present?.includes('Convulsions / Fits (describe)')) score += 10;
                if (data.examData?.neurological?.pills?.includes('Neck stiffness')) score += 10;
                if (data.examData?.neurological?.pills?.includes('Bulging fontanelle')) score += 8;
                if (data.examData?.general?.pills?.includes('Ill-looking') || data.examData?.general?.pills?.includes('Toxic')) score += 5;
                if (data.vitals?.gcs && parseInt(data.vitals.gcs) < 15) score += 8;
                return Math.min(score, 100);
            },
            description: "Bacterial meningitis is a medical emergency. Presents with fever, neck stiffness, altered consciousness, and vomiting. Infants may present with bulging fontanelle, poor feeding, and irritability.",
            distinguishingFeatures: ["Neck stiffness", "Bulging fontanelle (infants)", "Photophobia", "Kernig's / Brudzinski's signs", "Altered consciousness"],
            investigations: ["Lumbar puncture (after CT if indicated)", "Blood culture", "CRP", "FBC"],
            treatment: "IV ceftriaxone + vancomycin (empiric); dexamethasone in certain cases."
        },
        'Typhoid Fever': {
            likelihood: function(data) {
                let score = 0;
                if (data.feverPresent) score += 10;
                if (data.associatedSymptoms && data.associatedSymptoms.includes('abdominal pain')) score += 5;
                if (data.associatedSymptoms && (data.associatedSymptoms.includes('constipation') || data.associatedSymptoms.includes('diarrhoea'))) score += 5;
                if (data.associatedSymptoms && data.associatedSymptoms.includes('headache')) score += 5;
                if (data.durationDays && data.durationDays > 7) score += 10;
                if (data.rosData?.gastrointestinal?.present?.includes('Abdominal pain (site, character)')) score += 5;
                if (data.rosData?.gastrointestinal?.present?.includes('Constipation / Hard stools')) score += 5;
                if (data.rosData?.gastrointestinal?.present?.includes('Diarrhoea (watery / bloody / mucoid)')) score += 3;
                if (data.examData?.abdomen?.pills?.includes('Tenderness (generalised)')) score += 5;
                if (data.examData?.abdomen?.pills?.includes('Hepatosplenomegaly')) score += 5;
                if (data.examData?.general?.pills?.includes('Ill-looking')) score += 3;
                return Math.min(score, 100);
            },
            description: "Typhoid fever (Salmonella Typhi) is endemic in Uganda. Presents with prolonged fever, headache, abdominal pain, constipation or diarrhoea, and rose spots. Without treatment, can lead to intestinal perforation.",
            distinguishingFeatures: ["Prolonged fever (>7 days)", "Relative bradycardia", "Rose spots (rare)", "Constipation > diarrhoea", "Hepatosplenomegaly"],
            investigations: ["Blood culture (gold standard)", "Widal test (limited utility)", "FBC", "CRP"],
            treatment: "Azithromycin or ceftriaxone; chloramphenicol in some cases."
        },
        'Tuberculosis': {
            likelihood: function(data) {
                let score = 0;
                if (data.feverPresent) score += 5;
                if (data.associatedSymptoms && data.associatedSymptoms.includes('cough')) score += 5;
                if (data.associatedSymptoms && data.associatedSymptoms.includes('weight loss')) score += 10;
                if (data.associatedSymptoms && data.associatedSymptoms.includes('night sweats')) score += 10;
                if (data.durationDays && data.durationDays > 21) score += 10;
                if (data.hivStatus === 'positive') score += 10;
                if (data.familyHistory && data.familyHistory.toLowerCase().includes('tb')) score += 10;
                if (data.rosData?.respiratory?.present?.includes('Cough (dry / productive)')) score += 5;
                if (data.rosData?.respiratory?.present?.includes('Haemoptysis (blood in sputum)')) score += 8;
                if (data.examData?.respiratory?.pills?.includes('Reduced air entry')) score += 5;
                if (data.examData?.respiratory?.pills?.includes('Dull')) score += 5;
                if (data.examData?.general?.pills?.includes('Pale')) score += 3;
                if (data.examData?.general?.pills?.includes('Malnourished')) score += 5;
                return Math.min(score, 100);
            },
            description: "Tuberculosis is a major cause of chronic illness in Ugandan children. Presents with prolonged fever, cough, weight loss, night sweats, and sometimes haemoptysis. HIV co-infection is common.",
            distinguishingFeatures: ["Chronic cough >3 weeks", "Weight loss / failure to thrive", "Night sweats", "TB contact", "HIV co-infection"],
            investigations: ["CXR", "TST or IGRA", "GeneXpert (sputum or gastric aspirate)", "HIV test"],
            treatment: "Rifampicin, isoniazid, pyrazinamide, ethambutol (2 months) + R/H (4 months)."
        },
        'HIV-related infection': {
            likelihood: function(data) {
                let score = 0;
                if (data.hivStatus === 'positive') score += 20;
                if (data.feverPresent) score += 10;
                if (data.associatedSymptoms && data.associatedSymptoms.includes('weight loss')) score += 8;
                if (data.associatedSymptoms && data.associatedSymptoms.includes('chronic diarrhoea')) score += 8;
                if (data.associatedSymptoms && data.associatedSymptoms.includes('cough')) score += 5;
                if (data.hivOpportunisticInfections && data.hivOpportunisticInfections.length > 0) score += 10;
                if (data.rosData?.gastrointestinal?.present?.includes('Diarrhoea (watery / bloody / mucoid)')) score += 5;
                if (data.rosData?.skin?.present?.includes('Rash')) score += 5;
                if (data.examData?.general?.pills?.includes('Pale')) score += 3;
                if (data.examData?.general?.pills?.includes('Malnourished')) score += 5;
                return Math.min(score, 100);
            },
            description: "Children with HIV are at increased risk of opportunistic infections, including TB, cryptococcal meningitis, PCP, and bacterial infections. Fever with weight loss and chronic diarrhoea is a common presentation.",
            distinguishingFeatures: ["HIV positive", "Opportunistic infections", "Chronic diarrhoea", "Weight loss", "Recurrent infections"],
            investigations: ["CD4 count", "Viral load", "OI screening", "CXR", "CSF examination"],
            treatment: "Treat OI; start or optimise ART."
        }
    },

    // ===== COUGH =====
    'cough': {
        'Pneumonia': {
            likelihood: function(data) {
                let score = 0;
                if (data.coughPresent) score += 15;
                if (data.feverPresent) score += 10;
                if (data.associatedSymptoms && data.associatedSymptoms.includes('fast breathing')) score += 10;
                if (data.associatedSymptoms && data.associatedSymptoms.includes('difficulty breathing')) score += 8;
                if (data.rosData?.respiratory?.present?.includes('Fast breathing / Tachypnoea')) score += 10;
                if (data.rosData?.respiratory?.present?.includes('Chest indrawing / Recession')) score += 8;
                if (data.rosData?.respiratory?.present?.includes('Cough (dry / productive)')) score += 8;
                if (data.examData?.respiratory?.pills?.includes('Chest indrawing (subcostal)')) score += 8;
                if (data.examData?.respiratory?.pills?.includes('Reduced air entry')) score += 5;
                if (data.examData?.respiratory?.pills?.includes('Coarse crackles')) score += 5;
                if (data.vitals?.rr && parseInt(data.vitals.rr) > 50) score += 5;
                if (data.ageMonths !== null && data.ageMonths < 60) score += 5;
                return Math.min(score, 100);
            },
            description: "Pneumonia is a leading cause of childhood cough and fever. Presents with cough, fast breathing, chest indrawing, and fever. Common in children under 5 years.",
            distinguishingFeatures: ["Fast breathing (age-specific)", "Chest indrawing", "Crackles", "Fever", "Tachypnoea"],
            investigations: ["CXR", "FBC", "CRP"],
            treatment: "Amoxicillin or ceftriaxone depending on severity."
        },
        'Tuberculosis': {
            likelihood: function(data) {
                let score = 0;
                if (data.coughPresent) score += 10;
                if (data.durationDays && data.durationDays > 21) score += 10;
                if (data.associatedSymptoms && data.associatedSymptoms.includes('weight loss')) score += 10;
                if (data.associatedSymptoms && data.associatedSymptoms.includes('night sweats')) score += 10;
                if (data.associatedSymptoms && data.associatedSymptoms.includes('fever')) score += 5;
                if (data.hivStatus === 'positive') score += 10;
                if (data.familyHistory && data.familyHistory.toLowerCase().includes('tb')) score += 10;
                if (data.rosData?.respiratory?.present?.includes('Cough (dry / productive)')) score += 5;
                if (data.rosData?.respiratory?.present?.includes('Haemoptysis (blood in sputum)')) score += 8;
                if (data.examData?.respiratory?.pills?.includes('Reduced air entry')) score += 5;
                if (data.examData?.general?.pills?.includes('Pale')) score += 3;
                if (data.examData?.general?.pills?.includes('Malnourished')) score += 5;
                return Math.min(score, 100);
            },
            description: "Tuberculosis is a major cause of chronic cough. Presents with cough >3 weeks, weight loss, night sweats, and fever. HIV co-infection is common.",
            distinguishingFeatures: ["Chronic cough >3 weeks", "Weight loss", "Night sweats", "TB contact", "HIV co-infection"],
            investigations: ["CXR", "GeneXpert", "TST/IGRA"],
            treatment: "Anti-TB therapy (Rifampicin, Isoniazid, Pyrazinamide, Ethambutol)."
        },
        'Asthma / Wheeze-associated illness': {
            likelihood: function(data) {
                let score = 0;
                if (data.coughPresent) score += 8;
                if (data.associatedSymptoms && data.associatedSymptoms.includes('wheeze')) score += 15;
                if (data.associatedSymptoms && data.associatedSymptoms.includes('difficulty breathing')) score += 8;
                if (data.associatedSymptoms && data.associatedSymptoms.includes('nocturnal cough')) score += 10;
                if (data.rosData?.respiratory?.present?.includes('Wheeze / Noisy breathing')) score += 15;
                if (data.rosData?.respiratory?.present?.includes('Chest indrawing / Recession')) score += 5;
                if (data.examData?.respiratory?.pills?.includes('Wheeze (expiratory)')) score += 15;
                if (data.examData?.respiratory?.pills?.includes('Hyperresonant')) score += 5;
                if (data.familyHistory && data.familyHistory.toLowerCase().includes('asthma')) score += 10;
                if (data.ageMonths !== null && data.ageMonths > 24) score += 5;
                return Math.min(score, 100);
            },
            description: "Asthma and wheeze-associated illnesses are common in children. Presents with cough, wheeze, and difficulty breathing, often worse at night or with exercise.",
            distinguishingFeatures: ["Wheeze (expiratory)", "Nocturnal cough", "Family history of asthma", "Response to bronchodilators", "Atopy"],
            investigations: ["Response to bronchodilator", "CXR (exclude other causes)", "Peak flow (older children)"],
            treatment: "Inhaled bronchodilators (salbutamol) and corticosteroids; avoid triggers."
        },
        'Pertussis (Whooping Cough)': {
            likelihood: function(data) {
                let score = 0;
                if (data.coughPresent) score += 10;
                if (data.associatedSymptoms && data.associatedSymptoms.includes('whoop')) score += 20;
                if (data.associatedSymptoms && data.associatedSymptoms.includes('vomiting after cough')) score += 15;
                if (data.durationDays && data.durationDays > 14) score += 10;
                if (data.associatedSymptoms && data.associatedSymptoms.includes('apnoea')) score += 8;
                if (data.ageMonths !== null && data.ageMonths < 12) score += 8;
                if (data.immunizations && !data.immunizations.some(i => i.vaccine === 'DPT-HepB-Hib1' || i.vaccine === 'DPT-HepB-Hib2' || i.vaccine === 'DPT-HepB-Hib3')) score += 10;
                if (data.rosData?.respiratory?.present?.includes('Cough (dry / productive)')) score += 5;
                return Math.min(score, 100);
            },
            description: "Pertussis (whooping cough) is a highly contagious respiratory infection. Presents with paroxysmal cough, inspiratory whoop, and post-tussive vomiting. Most severe in infants.",
            distinguishingFeatures: ["Paroxysmal cough", "Inspiratory whoop", "Post-tussive vomiting", "Apnoea in infants", "Unvaccinated"],
            investigations: ["PCR (nasopharyngeal)", "Serology", "Culture"],
            treatment: "Macrolide antibiotics (azithromycin); supportive care."
        },
        'Foreign body aspiration': {
            likelihood: function(data) {
                let score = 0;
                if (data.associatedSymptoms && data.associatedSymptoms.includes('sudden onset')) score += 15;
                if (data.associatedSymptoms && data.associatedSymptoms.includes('choking episode')) score += 20;
                if (data.associatedSymptoms && data.associatedSymptoms.includes('difficulty breathing')) score += 10;
                if (data.associatedSymptoms && data.associatedSymptoms.includes('stridor')) score += 10;
                if (data.associatedSymptoms && data.associatedSymptoms.includes('cough')) score += 5;
                if (data.rosData?.respiratory?.present?.includes('Stridor / Croupy cough')) score += 15;
                if (data.examData?.respiratory?.pills?.includes('Reduced air entry')) score += 8;
                if (data.examData?.respiratory?.pills?.includes('Wheeze (expiratory)')) score += 5;
                if (data.ageMonths !== null && data.ageMonths > 6 && data.ageMonths < 48) score += 10;
                return Math.min(score, 100);
            },
            description: "Foreign body aspiration is a life-threatening emergency. Presents with sudden onset of cough, choking, wheeze, or stridor. Most common in toddlers.",
            distinguishingFeatures: ["Sudden onset", "Choking episode", "Stridor or wheeze", "Asymmetric air entry", "Age 1-3 years"],
            investigations: ["CXR (inspiratory/expiratory)", "CT chest", "Bronchoscopy (diagnostic and therapeutic)"],
            treatment: "Immediate bronchoscopy for removal."
        },
        'Bronchiolitis (infants)': {
            likelihood: function(data) {
                let score = 0;
                if (data.coughPresent) score += 10;
                if (data.associatedSymptoms && data.associatedSymptoms.includes('wheeze')) score += 10;
                if (data.associatedSymptoms && data.associatedSymptoms.includes('difficulty breathing')) score += 8;
                if (data.associatedSymptoms && data.associatedSymptoms.includes('coryza')) score += 5;
                if (data.ageMonths !== null && data.ageMonths < 12) score += 20;
                if (data.rosData?.respiratory?.present?.includes('Fast breathing / Tachypnoea')) score += 5;
                if (data.rosData?.respiratory?.present?.includes('Wheeze / Noisy breathing')) score += 5;
                if (data.examData?.respiratory?.pills?.includes('Wheeze (expiratory)')) score += 5;
                if (data.examData?.respiratory?.pills?.includes('Chest indrawing (subcostal)')) score += 5;
                if (data.vitals?.rr && parseInt(data.vitals.rr) > 50) score += 5;
                return Math.min(score, 100);
            },
            description: "Bronchiolitis is a common lower respiratory tract infection in infants <12 months. Presents with cough, wheeze, fast breathing, and chest indrawing. Usually caused by RSV.",
            distinguishingFeatures: ["Infant <12 months", "Wheeze", "Coryza", "Fast breathing", "Chest indrawing"],
            investigations: ["Clinical diagnosis", "CXR (exclude pneumonia)", "RSV testing (optional)"],
            treatment: "Supportive care (oxygen, hydration); bronchodilators in some cases."
        }
    },

    // ===== DIARRHOEA / VOMITING =====
    'diarrhea': {
        'Acute Gastroenteritis': {
            likelihood: function(data) {
                let score = 0;
                if (data.diarrheaPresent) score += 15;
                if (data.associatedSymptoms && data.associatedSymptoms.includes('vomiting')) score += 10;
                if (data.associatedSymptoms && data.associatedSymptoms.includes('fever')) score += 5;
                if (data.associatedSymptoms && data.associatedSymptoms.includes('abdominal pain')) score += 5;
                if (data.associatedSymptoms && data.associatedSymptoms.includes('watery stools')) score += 10;
                if (data.durationDays && data.durationDays < 14) score += 10;
                if (data.rosData?.gastrointestinal?.present?.includes('Diarrhoea (watery / bloody / mucoid)')) score += 10;
                if (data.rosData?.gastrointestinal?.present?.includes('Vomiting (non-bilious / bilious / projectile)')) score += 8;
                if (data.examData?.general?.pills?.includes('Dehydrated')) score += 8;
                if (data.examData?.general?.pills?.includes('Reduced skin turgor')) score += 5;
                if (data.ageMonths !== null && data.ageMonths < 60) score += 5;
                return Math.min(score, 100);
            },
            description: "Acute gastroenteritis is a common cause of diarrhoea and vomiting. Presents with watery stools, vomiting, fever, and abdominal pain. Most cases are viral (rotavirus, norovirus) or bacterial.",
            distinguishingFeatures: ["Acute onset", "Watery diarrhoea", "Vomiting", "Fever", "Dehydration"],
            investigations: ["Stool culture (if severe or bloody)", "FBC", "CRP", "Electrolytes"],
            treatment: "ORS for rehydration; zinc; continued feeding; antibiotics if dysentery."
        },
        'Dysentery (Shigella)': {
            likelihood: function(data) {
                let score = 0;
                if (data.diarrheaPresent) score += 10;
                if (data.associatedSymptoms && data.associatedSymptoms.includes('bloody stools')) score += 20;
                if (data.associatedSymptoms && data.associatedSymptoms.includes('mucus in stools')) score += 10;
                if (data.associatedSymptoms && data.associatedSymptoms.includes('fever')) score += 10;
                if (data.associatedSymptoms && data.associatedSymptoms.includes('tenesmus')) score += 10;
                if (data.rosData?.gastrointestinal?.present?.includes('Blood in stool (fresh / melaena)')) score += 15;
                if (data.rosData?.gastrointestinal?.present?.includes('Mucus in stool')) score += 10;
                if (data.examData?.general?.pills?.includes('Ill-looking')) score += 5;
                if (data.ageMonths !== null && data.ageMonths < 60) score += 5;
                return Math.min(score, 100);
            },
            description: "Dysentery (bloody diarrhoea) is most commonly caused by Shigella. Presents with bloody stools, mucus, fever, and tenesmus. Can lead to dehydration and seizures.",
            distinguishingFeatures: ["Bloody stools", "Mucus", "Tenesmus", "Fever", "Abdominal cramps"],
            investigations: ["Stool culture", "FBC", "CRP"],
            treatment: "Antibiotics (azithromycin or ceftriaxone); ORS; zinc."
        },
        'Cholera': {
            likelihood: function(data) {
                let score = 0;
                if (data.diarrheaPresent) score += 10;
                if (data.associatedSymptoms && data.associatedSymptoms.includes('rice-water stools')) score += 25;
                if (data.associatedSymptoms && data.associatedSymptoms.includes('severe dehydration')) score += 15;
                if (data.associatedSymptoms && data.associatedSymptoms.includes('vomiting')) score += 8;
                if (data.associatedSymptoms && data.associatedSymptoms.includes('no fever')) score += 5;
                if (data.rosData?.gastrointestinal?.present?.includes('Diarrhoea (watery / bloody / mucoid)')) score += 5;
                if (data.examData?.general?.pills?.includes('Dehydrated')) score += 10;
                if (data.examData?.general?.pills?.includes('Sunken fontanelle')) score += 5;
                if (data.vitals?.hr && parseInt(data.vitals.hr) > 140) score += 5;
                return Math.min(score, 100);
            },
            description: "Cholera is an acute diarrhoeal illness caused by Vibrio cholerae. Presents with profuse watery diarrhoea (rice-water stools), vomiting, and rapid dehydration. Outbreaks occur in Uganda during rainy seasons.",
            distinguishingFeatures: ["Rice-water stools", "Profuse diarrhoea", "Rapid dehydration", "No fever", "Epidemic setting"],
            investigations: ["Stool culture (TCBS)", "RDT (rapid diagnostic test)"],
            treatment: "Rapid rehydration (ORS or IV), antibiotics (azithromycin)."
        },
        'Giardiasis': {
            likelihood: function(data) {
                let score = 0;
                if (data.diarrheaPresent) score += 10;
                if (data.associatedSymptoms && data.associatedSymptoms.includes('chronic diarrhoea')) score += 10;
                if (data.associatedSymptoms && data.associatedSymptoms.includes('foul-smelling stools')) score += 10;
                if (data.associatedSymptoms && data.associatedSymptoms.includes('abdominal distension')) score += 8;
                if (data.associatedSymptoms && data.associatedSymptoms.includes('weight loss')) score += 8;
                if (data.durationDays && data.durationDays > 14) score += 10;
                if (data.rosData?.gastrointestinal?.present?.includes('Diarrhoea (watery / bloody / mucoid)')) score += 5;
                if (data.rosData?.gastrointestinal?.present?.includes('Abdominal distension')) score += 5;
                if (data.examData?.general?.pills?.includes('Malnourished')) score += 5;
                return Math.min(score, 100);
            },
            description: "Giardiasis is a parasitic infection causing chronic diarrhoea, malabsorption, and growth failure. Presents with foul-smelling stools, abdominal distension, and weight loss.",
            distinguishingFeatures: ["Chronic diarrhoea", "Foul-smelling stools", "Abdominal distension", "Weight loss", "Poor growth"],
            investigations: ["Stool microscopy (cysts/trophozoites)", "Stool antigen test"],
            treatment: "Metronidazole or tinidazole."
        },
        'Intestinal Obstruction': {
            likelihood: function(data) {
                let score = 0;
                if (data.associatedSymptoms && data.associatedSymptoms.includes('bilious vomiting')) score += 20;
                if (data.associatedSymptoms && data.associatedSymptoms.includes('abdominal distension')) score += 10;
                if (data.associatedSymptoms && data.associatedSymptoms.includes('constipation')) score += 10;
                if (data.associatedSymptoms && data.associatedSymptoms.includes('abdominal pain')) score += 5;
                if (data.associatedSymptoms && data.associatedSymptoms.includes('failure to pass meconium')) score += 15;
                if (data.rosData?.gastrointestinal?.present?.includes('Vomiting (non-bilious / bilious / projectile)')) score += 10;
                if (data.rosData?.gastrointestinal?.present?.includes('Abdominal distension')) score += 8;
                if (data.examData?.abdomen?.pills?.includes('Distended')) score += 5;
                if (data.examData?.abdomen?.pills?.includes('Rigid/Guarding')) score += 8;
                if (data.ageMonths !== null && data.ageMonths < 6) score += 10;
                return Math.min(score, 100);
            },
            description: "Intestinal obstruction is a surgical emergency. Presents with bilious vomiting, abdominal distension, constipation, and pain. Causes include intussusception, volvulus, and meconium ileus.",
            distinguishingFeatures: ["Bilious vomiting", "Abdominal distension", "Constipation", "High-pitched bowel sounds", "Infants"],
            investigations: ["Abdominal X-ray", "Ultrasound", "CT (if needed)"],
            treatment: "Surgical intervention; NG tube decompression; IV fluids."
        }
    },

    // ===== POOR FEEDING =====
    'poor feeding': {
        'Neonatal Sepsis': {
            likelihood: function(data) {
                let score = 0;
                if (data.associatedSymptoms && data.associatedSymptoms.includes('poor feeding')) score += 15;
                if (data.associatedSymptoms && data.associatedSymptoms.includes('lethargy')) score += 10;
                if (data.associatedSymptoms && (data.associatedSymptoms.includes('fever') || data.associatedSymptoms.includes('hypothermia'))) score += 10;
                if (data.associatedSymptoms && data.associatedSymptoms.includes('irritability')) score += 5;
                if (data.associatedSymptoms && data.associatedSymptoms.includes('apnoea')) score += 8;
                if (data.associatedSymptoms && data.associatedSymptoms.includes('jaundice')) score += 5;
                if (data.ageMonths !== null && data.ageMonths < 1) score += 20;
                if (data.rosData?.neurological?.present?.includes('Lethargy / Drowsiness')) score += 8;
                if (data.examData?.general?.pills?.includes('Ill-looking')) score += 8;
                if (data.examData?.general?.pills?.includes('Dehydrated')) score += 5;
                if (data.examData?.neurological?.pills?.includes('Hypotonia')) score += 5;
                return Math.min(score, 100);
            },
            description: "Neonatal sepsis is a life-threatening condition in the first 28 days of life. Presents with poor feeding, lethargy, temperature instability, respiratory distress, and jaundice.",
            distinguishingFeatures: ["Neonate (<28 days)", "Poor feeding", "Lethargy", "Temperature instability", "Apnoea"],
            investigations: ["Blood culture", "CRP", "FBC", "CSF (if indicated)"],
            treatment: "Empiric IV antibiotics (ampicillin + gentamicin or ceftriaxone)."
        },
        'Pyloric Stenosis': {
            likelihood: function(data) {
                let score = 0;
                if (data.associatedSymptoms && data.associatedSymptoms.includes('projectile vomiting')) score += 20;
                if (data.associatedSymptoms && data.associatedSymptoms.includes('poor feeding')) score += 10;
                if (data.associatedSymptoms && data.associatedSymptoms.includes('weight loss')) score += 10;
                if (data.associatedSymptoms && data.associatedSymptoms.includes('constipation')) score += 5;
                if (data.ageMonths !== null && data.ageMonths > 1 && data.ageMonths < 4) score += 20;
                if (data.rosData?.gastrointestinal?.present?.includes('Vomiting (non-bilious / bilious / projectile)')) score += 15;
                if (data.examData?.abdomen?.pills?.includes('Tenderness (localised)')) score += 5;
                if (data.examData?.abdomen?.pills?.includes('Visible peristalsis')) score += 10;
                if (data.examData?.general?.pills?.includes('Malnourished')) score += 5;
                return Math.min(score, 100);
            },
            description: "Pyloric stenosis is a condition in infants causing projectile vomiting and failure to thrive. Usually presents at 2-8 weeks of age with non-bilious projectile vomiting.",
            distinguishingFeatures: ["Projectile vomiting", "Age 2-8 weeks", "Visible peristalsis", "Olive-shaped mass (epigastric)", "Hypokalaemic alkalosis"],
            investigations: ["Abdominal ultrasound (pyloric muscle thickness)", "Blood electrolytes"],
            treatment: "Surgical (pyloromyotomy)."
        },
        'Oral Thrush (Candidiasis)': {
            likelihood: function(data) {
                let score = 0;
                if (data.associatedSymptoms && data.associatedSymptoms.includes('poor feeding')) score += 10;
                if (data.associatedSymptoms && data.associatedSymptoms.includes('white patches in mouth')) score += 20;
                if (data.associatedSymptoms && data.associatedSymptoms.includes('irritability')) score += 5;
                if (data.ageMonths !== null && data.ageMonths < 6) score += 10;
                if (data.rosData?.ent?.present?.includes('Oral thrush')) score += 15;
                if (data.hivStatus === 'positive') score += 10;
                if (data.examData?.ent?.pills?.includes('Oral thrush')) score += 10;
                return Math.min(score, 100);
            },
            description: "Oral thrush is a fungal infection caused by Candida albicans. Presents with white patches on the tongue, buccal mucosa, and palate, causing poor feeding and irritability.",
            distinguishingFeatures: ["White patches in mouth", "Poor feeding", "Irritability", "Infants", "HIV co-infection"],
            investigations: ["Clinical diagnosis", "Swab for microscopy/culture (if needed)"],
            treatment: "Nystatin oral suspension; fluconazole if severe."
        },
        'Gastro-oesophageal Reflux (GORD)': {
            likelihood: function(data) {
                let score = 0;
                if (data.associatedSymptoms && data.associatedSymptoms.includes('regurgitation')) score += 15;
                if (data.associatedSymptoms && data.associatedSymptoms.includes('poor feeding')) score += 10;
                if (data.associatedSymptoms && data.associatedSymptoms.includes('crying after feeds')) score += 8;
                if (data.associatedSymptoms && data.associatedSymptoms.includes('arching back')) score += 8;
                if (data.associatedSymptoms && data.associatedSymptoms.includes('failure to thrive')) score += 8;
                if (data.ageMonths !== null && data.ageMonths < 12) score += 10;
                if (data.rosData?.gastrointestinal?.present?.includes('Dysphagia / Difficulty swallowing')) score += 5;
                return Math.min(score, 100);
            },
            description: "Gastro-oesophageal reflux is common in infants. Presents with regurgitation, poor feeding, crying after feeds, and arching of the back. Most infants outgrow it by 12-18 months.",
            distinguishingFeatures: ["Regurgitation", "Crying after feeds", "Arching back", "Infants <12 months", "Normal growth (in mild cases)"],
            investigations: ["Clinical diagnosis", "pH monitoring (if needed)", "Upper GI series (if concerned)"],
            treatment: "Thickened feeds, positioning; proton pump inhibitors if severe."
        }
    },

    // ===== CONVULSIONS =====
    'convulsions': {
        'Febrile Seizures': {
            likelihood: function(data) {
                let score = 0;
                if (data.associatedSymptoms && data.associatedSymptoms.includes('convulsions')) score += 15;
                if (data.associatedSymptoms && data.associatedSymptoms.includes('fever')) score += 15;
                if (data.ageMonths !== null && data.ageMonths > 5 && data.ageMonths < 72) score += 15;
                if (data.associatedSymptoms && data.associatedSymptoms.includes('generalised seizure')) score += 10;
                if (data.associatedSymptoms && data.associatedSymptoms.includes('short duration')) score += 5;
                if (data.associatedSymptoms && data.associatedSymptoms.includes('post-ictal drowsiness')) score += 5;
                if (data.rosData?.neurological?.present?.includes('Convulsions / Fits (describe)')) score += 10;
                if (data.hivStatus === 'negative') score += 5;
                if (data.examData?.neurological?.pills?.includes('Alert and oriented')) score += 5;
                return Math.min(score, 100);
            },
            description: "Febrile seizures are the most common type of seizure in children. Occur between 6 months and 5 years of age, associated with fever. Simple febrile seizures are brief (<15 minutes), generalised, and do not recur within 24 hours.",
            distinguishingFeatures: ["Age 6 months – 5 years", "Fever >38°C", "Brief generalised seizure", "No focal features", "Resolves spontaneously"],
            investigations: ["Clinical diagnosis", "Evaluate source of fever"],
            treatment: "Treat fever; reassure parents; no long-term medication needed."
        },
        'Cerebral Malaria': {
            likelihood: function(data) {
                let score = 0;
                if (data.associatedSymptoms && data.associatedSymptoms.includes('convulsions')) score += 10;
                if (data.associatedSymptoms && data.associatedSymptoms.includes('fever')) score += 10;
                if (data.associatedSymptoms && data.associatedSymptoms.includes('altered consciousness')) score += 15;
                if (data.associatedSymptoms && data.associatedSymptoms.includes('lethargy')) score += 8;
                if (data.associatedSymptoms && data.associatedSymptoms.includes('coma')) score += 10;
                if (data.ageMonths !== null && data.ageMonths > 1) score += 5;
                if (data.rosData?.neurological?.present?.includes('Convulsions / Fits (describe)')) score += 8;
                if (data.rosData?.neurological?.present?.includes('Loss of consciousness')) score += 10;
                if (data.examData?.general?.pills?.includes('Ill-looking')) score += 5;
                if (data.examData?.neurological?.pills?.includes('Unresponsive')) score += 8;
                if (data.examData?.neurological?.pills?.includes('Neck stiffness')) score += 5;
                if (data.vitals?.gcs && parseInt(data.vitals.gcs) < 12) score += 10;
                return Math.min(score, 100);
            },
            description: "Cerebral malaria is a severe complication of falciparum malaria. Presents with convulsions, altered consciousness, coma, and fever. A major cause of childhood mortality in Uganda.",
            distinguishingFeatures: ["Seizures + coma", "Fever", "Positive malaria test", "Acidosis", "Hypoglycaemia"],
            investigations: ["Blood smear/RDT (malaria)", "Blood glucose", "FBC", "CSF (exclude meningitis)"],
            treatment: "IV artesunate; manage complications (hypoglycaemia, seizures, acidosis)."
        },
        'Meningitis': {
            likelihood: function(data) {
                let score = 0;
                if (data.associatedSymptoms && data.associatedSymptoms.includes('convulsions')) score += 10;
                if (data.associatedSymptoms && data.associatedSymptoms.includes('fever')) score += 10;
                if (data.associatedSymptoms && data.associatedSymptoms.includes('neck stiffness')) score += 15;
                if (data.associatedSymptoms && data.associatedSymptoms.includes('altered consciousness')) score += 10;
                if (data.associatedSymptoms && data.associatedSymptoms.includes('vomiting')) score += 5;
                if (data.rosData?.neurological?.present?.includes('Convulsions / Fits (describe)')) score += 8;
                if (data.rosData?.neurological?.present?.includes('Neck stiffness / Photophobia')) score += 10;
                if (data.examData?.neurological?.pills?.includes('Neck stiffness')) score += 10;
                if (data.examData?.neurological?.pills?.includes('Bulging fontanelle')) score += 8;
                if (data.vitals?.gcs && parseInt(data.vitals.gcs) < 15) score += 8;
                return Math.min(score, 100);
            },
            description: "Bacterial meningitis is a medical emergency. Presents with fever, neck stiffness, altered consciousness, and seizures. Infants may present with bulging fontanelle and irritability.",
            distinguishingFeatures: ["Neck stiffness", "Altered consciousness", "Seizures", "Fever", "Bulging fontanelle (infants)"],
            investigations: ["Lumbar puncture (after CT if indicated)", "Blood culture", "CRP"],
            treatment: "Empiric IV antibiotics (ceftriaxone + vancomycin); dexamethasone."
        },
        'Epilepsy': {
            likelihood: function(data) {
                let score = 0;
                if (data.associatedSymptoms && data.associatedSymptoms.includes('recurrent seizures')) score += 20;
                if (data.associatedSymptoms && data.associatedSymptoms.includes('afebrile seizures')) score += 15;
                if (data.associatedSymptoms && data.associatedSymptoms.includes('focal seizures')) score += 10;
                if (data.associatedSymptoms && data.associatedSymptoms.includes('post-ictal state')) score += 5;
                if (data.associatedSymptoms && data.associatedSymptoms.includes('normal development')) score += 5;
                if (data.ageMonths !== null && data.ageMonths > 12) score += 5;
                if (data.rosData?.neurological?.present?.includes('Convulsions / Fits (describe)')) score += 8;
                if (data.familyHistory && data.familyHistory.toLowerCase().includes('epilepsy')) score += 10;
                if (data.hivStatus === 'negative') score += 5;
                return Math.min(score, 100);
            },
            description: "Epilepsy is a chronic neurological disorder characterised by recurrent unprovoked seizures. Presents with afebrile seizures, which may be focal or generalised.",
            distinguishingFeatures: ["Recurrent afebrile seizures", "Focal or generalised", "Post-ictal state", "Normal neurological exam between episodes", "Family history"],
            investigations: ["EEG", "Neuroimaging (MRI/CT)", "Genetic testing (if indicated)"],
            treatment: "Antiepileptic drugs (e.g., carbamazepine, valproate, levetiracetam)."
        },
        'Hypoglycaemia': {
            likelihood: function(data) {
                let score = 0;
                if (data.associatedSymptoms && data.associatedSymptoms.includes('convulsions')) score += 10;
                if (data.associatedSymptoms && data.associatedSymptoms.includes('lethargy')) score += 10;
                if (data.associatedSymptoms && data.associatedSymptoms.includes('altered consciousness')) score += 10;
                if (data.associatedSymptoms && data.associatedSymptoms.includes('poor feeding')) score += 8;
                if (data.associatedSymptoms && data.associatedSymptoms.includes('jitteriness')) score += 5;
                if (data.ageMonths !== null && data.ageMonths < 6) score += 10;
                if (data.associatedSymptoms && data.associatedSymptoms.includes('malnutrition')) score += 8;
                if (data.examData?.general?.pills?.includes('Malnourished')) score += 8;
                if (data.examData?.neurological?.pills?.includes('Hypotonia')) score += 5;
                return Math.min(score, 100);
            },
            description: "Hypoglycaemia is a common cause of seizures in neonates and malnourished children. Presents with convulsions, lethargy, altered consciousness, and jitteriness.",
            distinguishingFeatures: ["Neonates", "Malnutrition", "Poor feeding", "Jitteriness", "Response to glucose"],
            investigations: ["Blood glucose (urgent)"],
            treatment: "IV 10% dextrose; treat underlying cause."
        }
    },

    // ===== RASH =====
    'rash': {
        'Measles': {
            likelihood: function(data) {
                let score = 0;
                if (data.rashPresent) score += 15;
                if (data.associatedSymptoms && data.associatedSymptoms.includes('fever')) score += 10;
                if (data.associatedSymptoms && data.associatedSymptoms.includes('cough')) score += 8;
                if (data.associatedSymptoms && data.associatedSymptoms.includes('coryza')) score += 8;
                if (data.associatedSymptoms && data.associatedSymptoms.includes('conjunctivitis')) score += 8;
                if (data.associatedSymptoms && data.associatedSymptoms.includes('Koplik spots')) score += 15;
                if (data.rosData?.skin?.present?.includes('Rash')) score += 10;
                if (data.rosData?.ent?.present?.includes('Red eyes / Conjunctivitis')) score += 5;
                if (data.immunizations && !data.immunizations.some(i => i.vaccine === 'Measles 1')) score += 10;
                if (data.examData?.ent?.pills?.includes('Koplik\'s spots')) score += 10;
                return Math.min(score, 100);
            },
            description: "Measles is a highly contagious viral infection. Presents with fever, cough, coryza, conjunctivitis, and a maculopapular rash. Koplik spots are pathognomonic.",
            distinguishingFeatures: ["Fever + cough + coryza + conjunctivitis + rash", "Koplik spots", "Maculopapular rash (face → trunk → limbs)", "Unvaccinated"],
            investigations: ["Clinical diagnosis", "IgM serology", "PCR (if needed)"],
            treatment: "Supportive care; vitamin A supplementation."
        },
        'Meningococcaemia': {
            likelihood: function(data) {
                let score = 0;
                if (data.rashPresent) score += 10;
                if (data.associatedSymptoms && data.associatedSymptoms.includes('fever')) score += 10;
                if (data.associatedSymptoms && data.associatedSymptoms.includes('non-blanching rash')) score += 20;
                if (data.associatedSymptoms && data.associatedSymptoms.includes('petechiae')) score += 15;
                if (data.associatedSymptoms && data.associatedSymptoms.includes('purpura')) score += 15;
                if (data.associatedSymptoms && data.associatedSymptoms.includes('neck stiffness')) score += 10;
                if (data.associatedSymptoms && data.associatedSymptoms.includes('altered consciousness')) score += 10;
                if (data.rosData?.skin?.present?.includes('Rash')) score += 5;
                if (data.rosData?.skin?.present?.includes('Bruising / Petechiae / Purpura')) score += 10;
                if (data.examData?.general?.pills?.includes('Ill-looking')) score += 5;
                if (data.examData?.skin?.pills?.includes('Petechiae')) score += 10;
                return Math.min(score, 100);
            },
            description: "Meningococcaemia is a life-threatening emergency. Presents with fever, non-blanching rash (petechiae/purpura), and signs of sepsis. Can progress rapidly to shock and death.",
            distinguishingFeatures: ["Non-blanching rash", "Fever", "Neck stiffness", "Altered consciousness", "Rapid progression"],
            investigations: ["Blood culture", "CSF examination", "CRP", "FBC"],
            treatment: "IV benzylpenicillin or ceftriaxone immediately; ICU care."
        },
        'Chickenpox (Varicella)': {
            likelihood: function(data) {
                let score = 0;
                if (data.rashPresent) score += 10;
                if (data.associatedSymptoms && data.associatedSymptoms.includes('vesicular rash')) score += 20;
                if (data.associatedSymptoms && data.associatedSymptoms.includes('itching')) score += 10;
                if (data.associatedSymptoms && data.associatedSymptoms.includes('fever')) score += 5;
                if (data.associatedSymptoms && data.associatedSymptoms.includes('crops of lesions')) score += 10;
                if (data.rosData?.skin?.present?.includes('Rash')) score += 5;
                if (data.rosData?.skin?.present?.includes('Itching / Pruritus')) score += 5;
                if (data.examData?.skin?.pills?.includes('Rash (vesicular)')) score += 10;
                if (data.immunizations && !data.immunizations.some(i => i.vaccine === 'BCG' || i.vaccine === 'Measles 1')) score += 3;
                return Math.min(score, 100);
            },
            description: "Chickenpox is a viral infection causing a characteristic vesicular rash. Presents with fever, itching, and crops of vesicles that progress to pustules and crusts.",
            distinguishingFeatures: ["Vesicular rash", "Crops of lesions", "Itching", "Mild fever", "Self-limiting"],
            investigations: ["Clinical diagnosis", "IgM serology (if needed)"],
            treatment: "Symptomatic (calamine lotion, antihistamines); acyclovir if severe."
        },
        'Scabies': {
            likelihood: function(data) {
                let score = 0;
                if (data.rashPresent) score += 10;
                if (data.associatedSymptoms && data.associatedSymptoms.includes('intense itching')) score += 15;
                if (data.associatedSymptoms && data.associatedSymptoms.includes('worse at night')) score += 15;
                if (data.associatedSymptoms && data.associatedSymptoms.includes('burrows')) score += 10;
                if (data.associatedSymptoms && data.associatedSymptoms.includes('rash between fingers')) score += 10;
                if (data.rosData?.skin?.present?.includes('Itching / Pruritus')) score += 10;
                if (data.rosData?.skin?.present?.includes('Scabies / Itchy lesions between fingers')) score += 15;
                if (data.examData?.skin?.pills?.includes('Scabies')) score += 10;
                if (data.familyHistory && data.familyHistory.toLowerCase().includes('itching')) score += 5;
                return Math.min(score, 100);
            },
            description: "Scabies is a parasitic infestation caused by Sarcoptes scabiei. Presents with intense itching (worse at night), rash between fingers, and burrows.",
            distinguishingFeatures: ["Intense itching (worse at night)", "Burrows", "Rash between fingers", "Family members affected", "Wrist, elbows, genital involvement"],
            investigations: ["Clinical diagnosis", "Skin scraping (microscopy)"],
            treatment: "Permethrin 5% cream; treat all family members."
        },
        'HIV-related skin conditions': {
            likelihood: function(data) {
                let score = 0;
                if (data.hivStatus === 'positive') score += 20;
                if (data.rashPresent) score += 10;
                if (data.associatedSymptoms && data.associatedSymptoms.includes('pruritus')) score += 5;
                if (data.associatedSymptoms && data.associatedSymptoms.includes('chronic rash')) score += 8;
                if (data.associatedSymptoms && data.associatedSymptoms.includes('eczema')) score += 5;
                if (data.rosData?.skin?.present?.includes('Rash')) score += 5;
                if (data.hivOpportunisticInfections && data.hivOpportunisticInfections.includes('KS')) score += 10;
                if (data.examData?.skin?.pills?.includes('Rash (maculopapular)')) score += 5;
                return Math.min(score, 100);
            },
            description: "Children with HIV may present with various skin conditions, including seborrhoeic dermatitis, eczema, prurigo, and opportunistic infections like HSV, VZV, and molluscum contagiosum.",
            distinguishingFeatures: ["HIV positive", "Chronic rash", "Pruritus", "Recurrent infections", "Treatment-resistant"],
            investigations: ["HIV viral load", "CD4 count", "Skin biopsy (if needed)"],
            treatment: "ART; treat specific skin conditions."
        }
    },

    // ===== JAUNDICE =====
    'jaundice': {
        'Physiological Jaundice (neonates)': {
            likelihood: function(data) {
                let score = 0;
                if (data.jaundicePresent) score += 15;
                if (data.ageMonths !== null && data.ageMonths < 1) score += 20;
                if (data.associatedSymptoms && data.associatedSymptoms.includes('onset 2-7 days')) score += 15;
                if (data.associatedSymptoms && data.associatedSymptoms.includes('normal stools')) score += 10;
                if (data.associatedSymptoms && data.associatedSymptoms.includes('normal feeding')) score += 8;
                if (data.associatedSymptoms && data.associatedSymptoms.includes('term baby')) score += 5;
                if (data.rosData?.skin?.present?.includes('Jaundice / Yellow skin')) score += 5;
                return Math.min(score, 100);
            },
            description: "Physiological jaundice occurs in the first week of life, peaking at 3-5 days. Presents with yellow discoloration of the skin, normal feeding, and normal stools.",
            distinguishingFeatures: ["Onset 2-7 days", "Term baby", "Normal feeding", "Normal stools", "Self-resolving"],
            investigations: ["Transcutaneous bilirubin", "Serum bilirubin (if high)"],
            treatment: "Monitor; phototherapy if levels exceed threshold."
        },
        'Haemolytic Jaundice (G6PD, ABO, Rh)': {
            likelihood: function(data) {
                let score = 0;
                if (data.jaundicePresent) score += 10;
                if (data.ageMonths !== null && data.ageMonths < 1) score += 10;
                if (data.associatedSymptoms && data.associatedSymptoms.includes('onset <24 hours')) score += 20;
                if (data.associatedSymptoms && data.associatedSymptoms.includes('pallor')) score += 10;
                if (data.associatedSymptoms && data.associatedSymptoms.includes('dark urine')) score += 10;
                if (data.associatedSymptoms && data.associatedSymptoms.includes('hepatosplenomegaly')) score += 8;
                if (data.rosData?.skin?.present?.includes('Pallor / Pale skin')) score += 8;
                if (data.rosData?.gastrointestinal?.present?.includes('Jaundice / Yellow eyes')) score += 5;
                if (data.examData?.general?.pills?.includes('Pale')) score += 5;
                if (data.examData?.abdomen?.pills?.includes('Hepatosplenomegaly')) score += 5;
                if (data.familyHistory && data.familyHistory.toLowerCase().includes('g6pd')) score += 8;
                return Math.min(score, 100);
            },
            description: "Haemolytic jaundice presents in the first 24 hours of life with jaundice, pallor, dark urine, and hepatosplenomegaly. Causes include G6PD deficiency, ABO incompatibility, and Rh disease.",
            distinguishingFeatures: ["Onset <24 hours", "Pallor", "Dark urine", "Hepatosplenomegaly", "Family history of G6PD"],
            investigations: ["Serum bilirubin", "FBC (anaemia)", "G6PD assay", "Direct Coombs test"],
            treatment: "Phototherapy; exchange transfusion if severe; treat underlying cause."
        },
        'Biliary Atresia (conjugated jaundice)': {
            likelihood: function(data) {
                let score = 0;
                if (data.jaundicePresent) score += 10;
                if (data.ageMonths !== null && data.ageMonths > 2 && data.ageMonths < 6) score += 15;
                if (data.associatedSymptoms && data.associatedSymptoms.includes('pale stools')) score += 20;
                if (data.associatedSymptoms && data.associatedSymptoms.includes('dark urine')) score += 15;
                if (data.associatedSymptoms && data.associatedSymptoms.includes('hepatomegaly')) score += 10;
                if (data.associatedSymptoms && data.associatedSymptoms.includes('failure to thrive')) score += 10;
                if (data.rosData?.gastrointestinal?.present?.includes('Jaundice / Yellow eyes')) score += 5;
                if (data.examData?.abdomen?.pills?.includes('Hepatomegaly')) score += 8;
                if (data.examData?.general?.pills?.includes('Jaundiced')) score += 5;
                if (data.examData?.general?.pills?.includes('Malnourished')) score += 5;
                return Math.min(score, 100);
            },
            description: "Biliary atresia is a surgical emergency presenting with conjugated jaundice, pale stools, dark urine, and hepatomegaly. Early diagnosis (Kasai procedure before 8 weeks) is critical.",
            distinguishingFeatures: ["Pale stools", "Dark urine", "Conjugated jaundice", "Hepatomegaly", "Age 2-6 weeks"],
            investigations: ["Serum bilirubin (conjugated fraction)", "Ultrasound (gallbladder)", "HIDA scan", "Liver biopsy"],
            treatment: "Kasai procedure (portoenterostomy); liver transplantation if failed."
        },
        'Neonatal Sepsis with Jaundice': {
            likelihood: function(data) {
                let score = 0;
                if (data.jaundicePresent) score += 10;
                if (data.ageMonths !== null && data.ageMonths < 1) score += 15;
                if (data.associatedSymptoms && data.associatedSymptoms.includes('poor feeding')) score += 10;
                if (data.associatedSymptoms && data.associatedSymptoms.includes('lethargy')) score += 10;
                if (data.associatedSymptoms && (data.associatedSymptoms.includes('fever') || data.associatedSymptoms.includes('hypothermia'))) score += 10;
                if (data.associatedSymptoms && data.associatedSymptoms.includes('apnoea')) score += 8;
                if (data.rosData?.neurological?.present?.includes('Lethargy / Drowsiness')) score += 5;
                if (data.examData?.general?.pills?.includes('Ill-looking')) score += 8;
                return Math.min(score, 100);
            },
            description: "Neonatal sepsis can present with jaundice, poor feeding, lethargy, and temperature instability. Jaundice in the context of sepsis is often conjugated.",
            distinguishingFeatures: ["Neonate", "Poor feeding", "Lethargy", "Temperature instability", "Apnoea"],
            investigations: ["Blood culture", "CRP", "FBC", "Serum bilirubin"],
            treatment: "Empiric IV antibiotics; phototherapy if needed."
        }
    },

    // ===== DIFFICULTY BREATHING =====
    'difficulty breathing': {
        'Pneumonia': {
            likelihood: function(data) {
                let score = 0;
                if (data.difficultyBreathing) score += 15;
                if (data.feverPresent) score += 10;
                if (data.coughPresent) score += 10;
                if (data.associatedSymptoms && data.associatedSymptoms.includes('fast breathing')) score += 10;
                if (data.rosData?.respiratory?.present?.includes('Fast breathing / Tachypnoea')) score += 10;
                if (data.rosData?.respiratory?.present?.includes('Chest indrawing / Recession')) score += 8;
                if (data.rosData?.respiratory?.present?.includes('Cough (dry / productive)')) score += 5;
                if (data.examData?.respiratory?.pills?.includes('Chest indrawing (subcostal)')) score += 8;
                if (data.examData?.respiratory?.pills?.includes('Coarse crackles')) score += 5;
                if (data.examData?.respiratory?.pills?.includes('Reduced air entry')) score += 5;
                if (data.vitals?.rr && parseInt(data.vitals.rr) > 50) score += 5;
                return Math.min(score, 100);
            },
            description: "Pneumonia is a common cause of difficulty breathing in children. Presents with fast breathing, chest indrawing, cough, and fever.",
            distinguishingFeatures: ["Fast breathing", "Chest indrawing", "Crackles", "Fever", "Cough"],
            investigations: ["CXR", "FBC", "CRP"],
            treatment: "Antibiotics (amoxicillin or ceftriaxone); oxygen if hypoxic."
        },
        'Asthma / Wheeze-associated illness': {
            likelihood: function(data) {
                let score = 0;
                if (data.difficultyBreathing) score += 10;
                if (data.associatedSymptoms && data.associatedSymptoms.includes('wheeze')) score += 15;
                if (data.associatedSymptoms && data.associatedSymptoms.includes('nocturnal cough')) score += 10;
                if (data.associatedSymptoms && data.associatedSymptoms.includes('cough')) score += 5;
                if (data.rosData?.respiratory?.present?.includes('Wheeze / Noisy breathing')) score += 15;
                if (data.rosData?.respiratory?.present?.includes('Chest indrawing / Recession')) score += 5;
                if (data.examData?.respiratory?.pills?.includes('Wheeze (expiratory)')) score += 15;
                if (data.examData?.respiratory?.pills?.includes('Hyperresonant')) score += 5;
                if (data.familyHistory && data.familyHistory.toLowerCase().includes('asthma')) score += 10;
                if (data.ageMonths !== null && data.ageMonths > 24) score += 5;
                return Math.min(score, 100);
            },
            description: "Asthma and wheeze-associated illnesses present with difficulty breathing, wheeze, and cough, often worse at night or with exercise.",
            distinguishingFeatures: ["Wheeze", "Nocturnal cough", "Family history", "Response to bronchodilators"],
            investigations: ["Response to bronchodilator", "CXR (exclude other causes)"],
            treatment: "Inhaled bronchodilators; corticosteroids; avoid triggers."
        },
        'Foreign Body Aspiration': {
            likelihood: function(data) {
                let score = 0;
                if (data.difficultyBreathing) score += 10;
                if (data.associatedSymptoms && data.associatedSymptoms.includes('sudden onset')) score += 15;
                if (data.associatedSymptoms && data.associatedSymptoms.includes('choking episode')) score += 20;
                if (data.associatedSymptoms && data.associatedSymptoms.includes('stridor')) score += 10;
                if (data.associatedSymptoms && data.associatedSymptoms.includes('cough')) score += 5;
                if (data.rosData?.respiratory?.present?.includes('Stridor / Croupy cough')) score += 15;
                if (data.examData?.respiratory?.pills?.includes('Reduced air entry')) score += 8;
                if (data.ageMonths !== null && data.ageMonths > 6 && data.ageMonths < 48) score += 10;
                return Math.min(score, 100);
            },
            description: "Foreign body aspiration is a life-threatening emergency. Presents with sudden onset of cough, choking, and difficulty breathing. Most common in toddlers.",
            distinguishingFeatures: ["Sudden onset", "Choking", "Stridor or wheeze", "Asymmetric air entry"],
            investigations: ["CXR", "CT chest", "Bronchoscopy"],
            treatment: "Immediate bronchoscopy for removal."
        },
        'Bronchiolitis (infants)': {
            likelihood: function(data) {
                let score = 0;
                if (data.difficultyBreathing) score += 10;
                if (data.associatedSymptoms && data.associatedSymptoms.includes('wheeze')) score += 10;
                if (data.associatedSymptoms && data.associatedSymptoms.includes('cough')) score += 8;
                if (data.associatedSymptoms && data.associatedSymptoms.includes('coryza')) score += 5;
                if (data.ageMonths !== null && data.ageMonths < 12) score += 20;
                if (data.rosData?.respiratory?.present?.includes('Fast breathing / Tachypnoea')) score += 5;
                if (data.rosData?.respiratory?.present?.includes('Wheeze / Noisy breathing')) score += 5;
                if (data.examData?.respiratory?.pills?.includes('Wheeze (expiratory)')) score += 5;
                if (data.examData?.respiratory?.pills?.includes('Chest indrawing (subcostal)')) score += 5;
                if (data.vitals?.rr && parseInt(data.vitals.rr) > 50) score += 5;
                return Math.min(score, 100);
            },
            description: "Bronchiolitis is a common lower respiratory tract infection in infants <12 months. Presents with cough, wheeze, fast breathing, and chest indrawing.",
            distinguishingFeatures: ["Infant <12 months", "Wheeze", "Coryza", "Fast breathing"],
            investigations: ["Clinical diagnosis", "CXR (exclude pneumonia)"],
            treatment: "Supportive care (oxygen, hydration); bronchodilators in some cases."
        },
        'Epiglottitis': {
            likelihood: function(data) {
                let score = 0;
                if (data.difficultyBreathing) score += 10;
                if (data.associatedSymptoms && data.associatedSymptoms.includes('stridor')) score += 15;
                if (data.associatedSymptoms && data.associatedSymptoms.includes('drooling')) score += 20;
                if (data.associatedSymptoms && data.associatedSymptoms.includes('fever')) score += 10;
                if (data.associatedSymptoms && data.associatedSymptoms.includes('tripod position')) score += 15;
                if (data.associatedSymptoms && data.associatedSymptoms.includes('difficulty swallowing')) score += 10;
                if (data.rosData?.respiratory?.present?.includes('Stridor / Croupy cough')) score += 10;
                if (data.examData?.ent?.pills?.includes('Inflamed throat')) score += 5;
                if (data.ageMonths !== null && data.ageMonths > 12) score += 5;
                return Math.min(score, 100);
            },
            description: "Epiglottitis is a life-threatening infection causing swelling of the epiglottis. Presents with fever, stridor, drooling, and tripod position. DO NOT examine the throat.",
            distinguishingFeatures: ["Stridor", "Drooling", "Tripod position", "Fever", "Rapid onset"],
            investigations: ["Clinical diagnosis (do NOT examine throat)", "CXR (thumbprint sign)"],
            treatment: "IV antibiotics (ceftriaxone), airway management, ICU."
        }
    },

    // ===== OEDEMA =====
    'oedema': {
        'Kwashiorkor (Severe Acute Malnutrition)': {
            likelihood: function(data) {
                let score = 0;
                if (data.oedemaPresent) score += 15;
                if (data.associatedSymptoms && data.associatedSymptoms.includes('bilateral pitting oedema')) score += 20;
                if (data.associatedSymptoms && data.associatedSymptoms.includes('flaky paint dermatosis')) score += 15;
                if (data.associatedSymptoms && data.associatedSymptoms.includes('hair changes')) score += 10;
                if (data.associatedSymptoms && data.associatedSymptoms.includes('weight loss')) score += 10;
                if (data.associatedSymptoms && data.associatedSymptoms.includes('irritability')) score += 5;
                if (data.rosData?.skin?.present?.includes('Flaky paint dermatosis (kwashiorkor)')) score += 15;
                if (data.rosData?.skin?.present?.includes('Dry skin / Xerosis')) score += 5;
                if (data.examData?.general?.pills?.includes('Oedematous')) score += 10;
                if (data.examData?.skin?.pills?.includes('Flaky paint dermatosis')) score += 10;
                if (data.muac && parseFloat(data.muac) < 11.5) score += 10;
                return Math.min(score, 100);
            },
            description: "Kwashiorkor is a form of severe acute malnutrition characterised by bilateral pitting oedema, flaky paint dermatosis, and hair changes. Caused by protein deficiency.",
            distinguishingFeatures: ["Bilateral pitting oedema", "Flaky paint dermatosis", "Hair changes", "Irritability", "MUAC <11.5 cm"],
            investigations: ["MUAC", "Weight-for-height Z-score", "FBC", "Albumin", "Electrolytes"],
            treatment: "WHO F-75 milk (phase 1) then F-100 (phase 2); treat infections."
        },
        'Nephrotic Syndrome': {
            likelihood: function(data) {
                let score = 0;
                if (data.oedemaPresent) score += 10;
                if (data.associatedSymptoms && data.associatedSymptoms.includes('pitting oedema')) score += 10;
                if (data.associatedSymptoms && data.associatedSymptoms.includes('frothy urine')) score += 20;
                if (data.associatedSymptoms && data.associatedSymptoms.includes('periorbital oedema')) score += 10;
                if (data.associatedSymptoms && data.associatedSymptoms.includes('ascites')) score += 8;
                if (data.associatedSymptoms && data.associatedSymptoms.includes('hypertension')) score += 5;
                if (data.rosData?.skin?.present?.includes('Oedema (pitting)')) score += 10;
                if (data.rosData?.genitourinary?.present?.includes('Frothy / Cloudy urine')) score += 10;
                if (data.examData?.general?.pills?.includes('Oedematous')) score += 10;
                if (data.examData?.abdomen?.pills?.includes('Distended')) score += 5;
                if (data.ageMonths !== null && data.ageMonths > 12) score += 5;
                return Math.min(score, 100);
            },
            description: "Nephrotic syndrome is a glomerular disease presenting with oedema, frothy urine, and hypoalbuminaemia. Most common in children 2-6 years.",
            distinguishingFeatures: ["Frothy urine", "Periorbital oedema", "Ascites", "Hypoalbuminaemia", "Hyperlipidaemia"],
            investigations: ["Urinalysis (proteinuria)", "Serum albumin", "Lipid profile", "Renal function"],
            treatment: "Prednisolone; salt restriction; diuretics if needed."
        },
        'Cardiac Failure': {
            likelihood: function(data) {
                let score = 0;
                if (data.oedemaPresent) score += 10;
                if (data.associatedSymptoms && data.associatedSymptoms.includes('peripheral oedema')) score += 10;
                if (data.associatedSymptoms && data.associatedSymptoms.includes('difficulty breathing')) score += 10;
                if (data.associatedSymptoms && data.associatedSymptoms.includes('tachypnoea')) score += 8;
                if (data.associatedSymptoms && data.associatedSymptoms.includes('hepatomegaly')) score += 8;
                if (data.associatedSymptoms && data.associatedSymptoms.includes('poor feeding')) score += 5;
                if (data.rosData?.cardiovascular?.present?.includes('Swollen feet / Peripheral oedema')) score += 10;
                if (data.rosData?.respiratory?.present?.includes('Fast breathing / Tachypnoea')) score += 5;
                if (data.examData?.cardiovascular?.pills?.includes('Peripheral oedema')) score += 10;
                if (data.examData?.cardiovascular?.pills?.includes('Apex beat displaced')) score += 5;
                if (data.examData?.cardiovascular?.pills?.includes('S3 (gallop)')) score += 8;
                if (data.examData?.abdomen?.pills?.includes('Hepatomegaly')) score += 8;
                return Math.min(score, 100);
            },
            description: "Cardiac failure in children presents with oedema, difficulty breathing, hepatomegaly, and poor feeding. Causes include congenital heart disease, myocarditis, and rheumatic heart disease.",
            distinguishingFeatures: ["Oedema", "Hepatomegaly", "Tachypnoea", "Gallop rhythm", "Poor feeding"],
            investigations: ["Echocardiogram", "CXR", "ECG", "BNP"],
            treatment: "Diuretics; treat underlying cause."
        },
        'Acute Glomerulonephritis': {
            likelihood: function(data) {
                let score = 0;
                if (data.oedemaPresent) score += 10;
                if (data.associatedSymptoms && data.associatedSymptoms.includes('facial oedema')) score += 10;
                if (data.associatedSymptoms && data.associatedSymptoms.includes('haematuria')) score += 15;
                if (data.associatedSymptoms && data.associatedSymptoms.includes('hypertension')) score += 10;
                if (data.associatedSymptoms && data.associatedSymptoms.includes('oliguria')) score += 8;
                if (data.associatedSymptoms && data.associatedSymptoms.includes('headache')) score += 5;
                if (data.rosData?.genitourinary?.present?.includes('Haematuria / Blood in urine')) score += 10;
                if (data.rosData?.skin?.present?.includes('Oedema (pitting)')) score += 5;
                if (data.examData?.general?.pills?.includes('Oedematous')) score += 8;
                if (data.vitals?.bp) {
                    const bp = data.vitals.bp.split('/');
                    if (bp.length === 2 && parseInt(bp[0]) > 130) score += 8;
                }
                return Math.min(score, 100);
            },
            description: "Acute glomerulonephritis presents with facial oedema, haematuria, hypertension, and oliguria. Often follows a streptococcal infection.",
            distinguishingFeatures: ["Facial oedema", "Haematuria", "Hypertension", "Oliguria", "Post-streptococcal"],
            investigations: ["Urinalysis (RBC casts)", "Renal function", "ASO titre", "C3 complement"],
            treatment: "Supportive (fluid and salt restriction); treat hypertension."
        }
    },

    // ===== LETHARGY =====
    'lethargy': {
        'Cerebral Malaria': {
            likelihood: function(data) {
                let score = 0;
                if (data.lethargyPresent) score += 15;
                if (data.feverPresent) score += 10;
                if (data.associatedSymptoms && data.associatedSymptoms.includes('convulsions')) score += 10;
                if (data.associatedSymptoms && data.associatedSymptoms.includes('altered consciousness')) score += 15;
                if (data.associatedSymptoms && data.associatedSymptoms.includes('coma')) score += 10;
                if (data.rosData?.neurological?.present?.includes('Lethargy / Drowsiness')) score += 10;
                if (data.rosData?.neurological?.present?.includes('Convulsions / Fits (describe)')) score += 5;
                if (data.examData?.general?.pills?.includes('Ill-looking')) score += 5;
                if (data.examData?.neurological?.pills?.includes('Unresponsive')) score += 8;
                if (data.vitals?.gcs && parseInt(data.vitals.gcs) < 12) score += 10;
                return Math.min(score, 100);
            },
            description: "Cerebral malaria is a severe complication of falciparum malaria. Presents with lethargy, altered consciousness, seizures, and coma.",
            distinguishingFeatures: ["Lethargy/coma", "Fever", "Seizures", "Positive malaria test", "Hypoglycaemia"],
            investigations: ["Blood smear/RDT", "Blood glucose", "FBC", "CSF (exclude meningitis)"],
            treatment: "IV artesunate; manage complications (hypoglycaemia, seizures, acidosis)."
        },
        'Meningitis': {
            likelihood: function(data) {
                let score = 0;
                if (data.lethargyPresent) score += 10;
                if (data.feverPresent) score += 10;
                if (data.associatedSymptoms && data.associatedSymptoms.includes('neck stiffness')) score += 15;
                if (data.associatedSymptoms && data.associatedSymptoms.includes('convulsions')) score += 10;
                if (data.associatedSymptoms && data.associatedSymptoms.includes('vomiting')) score += 5;
                if (data.rosData?.neurological?.present?.includes('Lethargy / Drowsiness')) score += 10;
                if (data.rosData?.neurological?.present?.includes('Neck stiffness / Photophobia')) score += 10;
                if (data.examData?.neurological?.pills?.includes('Neck stiffness')) score += 10;
                if (data.examData?.neurological?.pills?.includes('Bulging fontanelle')) score += 8;
                if (data.vitals?.gcs && parseInt(data.vitals.gcs) < 15) score += 8;
                return Math.min(score, 100);
            },
            description: "Bacterial meningitis presents with lethargy, fever, neck stiffness, and seizures. A medical emergency.",
            distinguishingFeatures: ["Neck stiffness", "Altered consciousness", "Seizures", "Fever", "Bulging fontanelle (infants)"],
            investigations: ["Lumbar puncture", "Blood culture", "CRP"],
            treatment: "Empiric IV antibiotics (ceftriaxone + vancomycin)."
        },
        'Neonatal Sepsis': {
            likelihood: function(data) {
                let score = 0;
                if (data.lethargyPresent) score += 10;
                if (data.ageMonths !== null && data.ageMonths < 1) score += 20;
                if (data.associatedSymptoms && data.associatedSymptoms.includes('poor feeding')) score += 10;
                if (data.associatedSymptoms && (data.associatedSymptoms.includes('fever') || data.associatedSymptoms.includes('hypothermia'))) score += 10;
                if (data.associatedSymptoms && data.associatedSymptoms.includes('apnoea')) score += 8;
                if (data.associatedSymptoms && data.associatedSymptoms.includes('jaundice')) score += 5;
                if (data.rosData?.neurological?.present?.includes('Lethargy / Drowsiness')) score += 8;
                if (data.examData?.general?.pills?.includes('Ill-looking')) score += 8;
                if (data.examData?.neurological?.pills?.includes('Hypotonia')) score += 5;
                return Math.min(score, 100);
            },
            description: "Neonatal sepsis presents with lethargy, poor feeding, temperature instability, and apnoea. A life-threatening condition.",
            distinguishingFeatures: ["Neonate", "Lethargy", "Poor feeding", "Temperature instability", "Apnoea"],
            investigations: ["Blood culture", "CRP", "FBC", "CSF (if indicated)"],
            treatment: "Empiric IV antibiotics (ampicillin + gentamicin or ceftriaxone)."
        },
        'Hypoglycaemia': {
            likelihood: function(data) {
                let score = 0;
                if (data.lethargyPresent) score += 10;
                if (data.associatedSymptoms && data.associatedSymptoms.includes('convulsions')) score += 10;
                if (data.associatedSymptoms && data.associatedSymptoms.includes('altered consciousness')) score += 10;
                if (data.associatedSymptoms && data.associatedSymptoms.includes('poor feeding')) score += 8;
                if (data.associatedSymptoms && data.associatedSymptoms.includes('jitteriness')) score += 5;
                if (data.ageMonths !== null && data.ageMonths < 6) score += 10;
                if (data.associatedSymptoms && data.associatedSymptoms.includes('malnutrition')) score += 8;
                if (data.examData?.general?.pills?.includes('Malnourished')) score += 8;
                if (data.examData?.neurological?.pills?.includes('Hypotonia')) score += 5;
                return Math.min(score, 100);
            },
            description: "Hypoglycaemia is a common cause of lethargy and seizures in neonates and malnourished children. Presents with lethargy, jitteriness, and altered consciousness.",
            distinguishingFeatures: ["Neonates", "Malnutrition", "Poor feeding", "Jitteriness", "Response to glucose"],
            investigations: ["Blood glucose (urgent)"],
            treatment: "IV 10% dextrose; treat underlying cause."
        }
    },

    // ===== PALLOR =====
    'pallor': {
        'Severe Anaemia (Malaria, Iron Deficiency, Sickle Cell)': {
            likelihood: function(data) {
                let score = 0;
                if (data.pallorPresent) score += 15;
                if (data.associatedSymptoms && data.associatedSymptoms.includes('lethargy')) score += 10;
                if (data.associatedSymptoms && data.associatedSymptoms.includes('difficulty breathing')) score += 10;
                if (data.associatedSymptoms && data.associatedSymptoms.includes('palpitations')) score += 5;
                if (data.associatedSymptoms && data.associatedSymptoms.includes('jaundice')) score += 5;
                if (data.rosData?.skin?.present?.includes('Pallor / Pale skin')) score += 10;
                if (data.rosData?.cardiovascular?.present?.includes('Dyspnoea on exertion')) score += 5;
                if (data.examData?.general?.pills?.includes('Pale')) score += 10;
                if (data.examData?.general?.pills?.includes('Ill-looking')) score += 5;
                if (data.examData?.cardiovascular?.pills?.includes('Murmur present')) score += 5;
                if (data.vitals?.hr && parseInt(data.vitals.hr) > 140) score += 5;
                if (data.muac && parseFloat(data.muac) < 11.5) score += 5;
                return Math.min(score, 100);
            },
            description: "Severe anaemia is a common cause of pallor in Ugandan children. Presents with pallor, lethargy, difficulty breathing, and palpitations. Causes include malaria, iron deficiency, and sickle cell disease.",
            distinguishingFeatures: ["Pallor", "Lethargy", "Dyspnoea", "Palpitations", "Low Hb"],
            investigations: ["FBC (Hb, MCV, MCH)", "Blood film", "Iron studies", "Malaria test", "Sickle cell test"],
            treatment: "Iron supplementation; blood transfusion if Hb <4 g/dL; treat underlying cause."
        },
        'G6PD Deficiency': {
            likelihood: function(data) {
                let score = 0;
                if (data.pallorPresent) score += 10;
                if (data.associatedSymptoms && data.associatedSymptoms.includes('jaundice')) score += 10;
                if (data.associatedSymptoms && data.associatedSymptoms.includes('dark urine')) score += 15;
                if (data.associatedSymptoms && data.associatedSymptoms.includes('fever')) score += 5;
                if (data.associatedSymptoms && data.associatedSymptoms.includes('lethargy')) score += 5;
                if (data.rosData?.skin?.present?.includes('Pallor / Pale skin')) score += 5;
                if (data.rosData?.skin?.present?.includes('Jaundice / Yellow skin')) score += 5;
                if (data.examData?.general?.pills?.includes('Pale')) score += 5;
                if (data.examData?.general?.pills?.includes('Jaundiced')) score += 5;
                if (data.familyHistory && data.familyHistory.toLowerCase().includes('g6pd')) score += 10;
                return Math.min(score, 100);
            },
            description: "G6PD deficiency is an inherited disorder causing haemolytic anaemia. Presents with pallor, jaundice, dark urine, and episodes triggered by fava beans or certain drugs.",
            distinguishingFeatures: ["Pallor", "Jaundice", "Dark urine", "Family history", "Trigger factors"],
            investigations: ["G6PD assay", "FBC", "Reticulocyte count", "Direct Coombs test"],
            treatment: "Avoid triggers; treat haemolysis; blood transfusion if severe."
        },
        'Sickle Cell Crisis (Vaso-occlusive / Aplastic)': {
            likelihood: function(data) {
                let score = 0;
                if (data.pallorPresent) score += 10;
                if (data.associatedSymptoms && data.associatedSymptoms.includes('bone pain')) score += 15;
                if (data.associatedSymptoms && data.associatedSymptoms.includes('jaundice')) score += 10;
                if (data.associatedSymptoms && data.associatedSymptoms.includes('fever')) score += 5;
                if (data.associatedSymptoms && data.associatedSymptoms.includes('lethargy')) score += 5;
                if (data.associatedSymptoms && data.associatedSymptoms.includes('hand-foot syndrome')) score += 10;
                if (data.rosData?.skin?.present?.includes('Pallor / Pale skin')) score += 5;
                if (data.rosData?.skin?.present?.includes('Jaundice / Yellow skin')) score += 5;
                if (data.examData?.general?.pills?.includes('Pale')) score += 5;
                if (data.examData?.general?.pills?.includes('Jaundiced')) score += 5;
                if (data.familyHistory && data.familyHistory.toLowerCase().includes('sickle')) score += 10;
                if (data.ageMonths !== null && data.ageMonths > 6) score += 5;
                return Math.min(score, 100);
            },
            description: "Sickle cell disease causes recurrent painful crises, anaemia, and infections. Presents with pallor, bone pain, jaundice, and fever.",
            distinguishingFeatures: ["Pallor", "Bone pain", "Jaundice", "Hand-foot syndrome (infants)", "Family history"],
            investigations: ["Sickle cell test", "FBC", "Blood film", "Reticulocyte count"],
            treatment: "Pain management; hydration; blood transfusion; antibiotics; folic acid."
        }
    },

    // ===== NECK STIFFNESS =====
    'neck stiffness': {
        'Meningitis': {
            likelihood: function(data) {
                let score = 0;
                if (data.neckStiffness) score += 20;
                if (data.feverPresent) score += 10;
                if (data.associatedSymptoms && data.associatedSymptoms.includes('altered consciousness')) score += 10;
                if (data.associatedSymptoms && data.associatedSymptoms.includes('convulsions')) score += 10;
                if (data.associatedSymptoms && data.associatedSymptoms.includes('photophobia')) score += 10;
                if (data.associatedSymptoms && data.associatedSymptoms.includes('vomiting')) score += 5;
                if (data.rosData?.neurological?.present?.includes('Neck stiffness / Photophobia')) score += 15;
                if (data.rosData?.neurological?.present?.includes('Lethargy / Drowsiness')) score += 5;
                if (data.examData?.neurological?.pills?.includes('Neck stiffness')) score += 10;
                if (data.examData?.neurological?.pills?.includes('Bulging fontanelle')) score += 8;
                if (data.vitals?.gcs && parseInt(data.vitals.gcs) < 15) score += 8;
                return Math.min(score, 100);
            },
            description: "Bacterial meningitis is a medical emergency. Presents with neck stiffness, fever, altered consciousness, and seizures.",
            distinguishingFeatures: ["Neck stiffness", "Fever", "Altered consciousness", "Photophobia", "Bulging fontanelle (infants)"],
            investigations: ["Lumbar puncture (after CT)", "Blood culture", "CRP"],
            treatment: "Empiric IV antibiotics (ceftriaxone + vancomycin); dexamethasone."
        },
        'Cerebral Malaria': {
            likelihood: function(data) {
                let score = 0;
                if (data.neckStiffness) score += 10;
                if (data.feverPresent) score += 10;
                if (data.associatedSymptoms && data.associatedSymptoms.includes('altered consciousness')) score += 15;
                if (data.associatedSymptoms && data.associatedSymptoms.includes('convulsions')) score += 10;
                if (data.associatedSymptoms && data.associatedSymptoms.includes('lethargy')) score += 5;
                if (data.rosData?.neurological?.present?.includes('Neck stiffness / Photophobia')) score += 10;
                if (data.rosData?.neurological?.present?.includes('Lethargy / Drowsiness')) score += 5;
                if (data.examData?.general?.pills?.includes('Ill-looking')) score += 5;
                if (data.examData?.neurological?.pills?.includes('Neck stiffness')) score += 5;
                if (data.vitals?.gcs && parseInt(data.vitals.gcs) < 12) score += 10;
                return Math.min(score, 100);
            },
            description: "Cerebral malaria can present with neck stiffness, fever, altered consciousness, and seizures. Distinguishing from meningitis is critical.",
            distinguishingFeatures: ["Fever", "Altered consciousness", "Seizures", "Positive malaria test", "Absence of focal neurological signs (usually)"],
            investigations: ["Blood smear/RDT", "CSF (exclude meningitis)", "Blood glucose"],
            treatment: "IV artesunate; manage complications."
        },
        'TB Meningitis': {
            likelihood: function(data) {
                let score = 0;
                if (data.neckStiffness) score += 10;
                if (data.feverPresent) score += 5;
                if (data.associatedSymptoms && data.associatedSymptoms.includes('headache')) score += 8;
                if (data.associatedSymptoms && data.associatedSymptoms.includes('altered consciousness')) score += 8;
                if (data.durationDays && data.durationDays > 14) score += 10;
                if (data.hivStatus === 'positive') score += 10;
                if (data.familyHistory && data.familyHistory.toLowerCase().includes('tb')) score += 10;
                if (data.rosData?.neurological?.present?.includes('Neck stiffness / Photophobia')) score += 5;
                if (data.examData?.neurological?.pills?.includes('Neck stiffness')) score += 5;
                if (data.examData?.general?.pills?.includes('Malnourished')) score += 5;
                return Math.min(score, 100);
            },
            description: "TB meningitis is a chronic form of meningitis. Presents with gradual onset of neck stiffness, headache, fever, and altered consciousness. More common in HIV-positive children.",
            distinguishingFeatures: ["Chronic course", "Neck stiffness", "HIV co-infection", "TB contact", "Gradual onset"],
            investigations: ["CSF examination (lymphocytosis, high protein)", "CXR", "GeneXpert", "TST/IGRA"],
            treatment: "Anti-TB therapy; corticosteroids."
        }
    },

    // ===== SWELLING =====
    'swelling': {
        'Burkitt\'s Lymphoma': {
            likelihood: function(data) {
                let score = 0;
                if (data.swellingPresent) score += 10;
                if (data.associatedSymptoms && data.associatedSymptoms.includes('painless mass')) score += 15;
                if (data.associatedSymptoms && data.associatedSymptoms.includes('jaw mass')) score += 15;
                if (data.associatedSymptoms && data.associatedSymptoms.includes('abdominal mass')) score += 10;
                if (data.associatedSymptoms && data.associatedSymptoms.includes('weight loss')) score += 10;
                if (data.associatedSymptoms && data.associatedSymptoms.includes('fever')) score += 5;
                if (data.ageMonths !== null && data.ageMonths > 24 && data.ageMonths < 96) score += 10;
                if (data.hivStatus === 'positive') score += 5;
                if (data.examData?.general?.pills?.includes('Ill-looking')) score += 5;
                if (data.examData?.general?.pills?.includes('Malnourished')) score += 5;
                return Math.min(score, 100);
            },
            description: "Burkitt's lymphoma is an aggressive B-cell lymphoma common in Ugandan children. Presents with a rapidly growing painless mass, often in the jaw or abdomen.",
            distinguishingFeatures: ["Painless mass", "Jaw or abdominal", "Rapid growth", "Age 2-8 years", "EBV association"],
            investigations: ["Biopsy (histopathology)", "FBC", "LDH", "Ultrasound/CT"],
            treatment: "Chemotherapy (cyclophosphamide, vincristine, methotrexate)."
        },
        'Wilms Tumour (Nephroblastoma)': {
            likelihood: function(data) {
                let score = 0;
                if (data.swellingPresent) score += 10;
                if (data.associatedSymptoms && data.associatedSymptoms.includes('abdominal mass')) score += 15;
                if (data.associatedSymptoms && data.associatedSymptoms.includes('painless mass')) score += 10;
                if (data.associatedSymptoms && data.associatedSymptoms.includes('haematuria')) score += 8;
                if (data.associatedSymptoms && data.associatedSymptoms.includes('fever')) score += 5;
                if (data.associatedSymptoms && data.associatedSymptoms.includes('hypertension')) score += 5;
                if (data.ageMonths !== null && data.ageMonths > 12 && data.ageMonths < 72) score += 10;
                if (data.rosData?.genitourinary?.present?.includes('Haematuria / Blood in urine')) score += 5;
                if (data.examData?.abdomen?.pills?.includes('Renal mass')) score += 10;
                if (data.examData?.abdomen?.pills?.includes('Other mass')) score += 5;
                return Math.min(score, 100);
            },
            description: "Wilms tumour (nephroblastoma) is a renal tumour in children. Presents with a painless abdominal mass, haematuria, fever, and hypertension.",
            distinguishingFeatures: ["Painless abdominal mass", "Haematuria", "Hypertension", "Age 1-5 years", "Unilateral (usually)"],
            investigations: ["Abdominal ultrasound", "CT/MRI", "Urinalysis", "FBC", "Renal function"],
            treatment: "Surgical resection; chemotherapy; radiotherapy (if needed)."
        },
        'Incarcerated Inguinal Hernia': {
            likelihood: function(data) {
                let score = 0;
                if (data.swellingPresent) score += 10;
                if (data.associatedSymptoms && data.associatedSymptoms.includes('groin swelling')) score += 15;
                if (data.associatedSymptoms && data.associatedSymptoms.includes('pain')) score += 10;
                if (data.associatedSymptoms && data.associatedSymptoms.includes('irreducible')) score += 15;
                if (data.associatedSymptoms && data.associatedSymptoms.includes('vomiting')) score += 8;
                if (data.associatedSymptoms && data.associatedSymptoms.includes('abdominal distension')) score += 5;
                if (data.ageMonths !== null && data.ageMonths > 0 && data.ageMonths < 12) score += 10;
                if (data.examData?.abdomen?.pills?.includes('Tenderness (localised)')) score += 5;
                if (data.examData?.abdomen?.pills?.includes('Distended')) score += 5;
                return Math.min(score, 100);
            },
            description: "Incarcerated inguinal hernia is a surgical emergency. Presents with a painful, irreducible groin swelling, vomiting, and abdominal distension.",
            distinguishingFeatures: ["Groin swelling", "Irreducible", "Pain", "Vomiting", "Infants"],
            investigations: ["Clinical diagnosis", "Ultrasound (if needed)"],
            treatment: "Urgent surgical reduction."
        },
        'Testicular Torsion': {
            likelihood: function(data) {
                let score = 0;
                if (data.swellingPresent) score += 10;
                if (data.associatedSymptoms && data.associatedSymptoms.includes('scrotal swelling')) score += 15;
                if (data.associatedSymptoms && data.associatedSymptoms.includes('severe pain')) score += 15;
                if (data.associatedSymptoms && data.associatedSymptoms.includes('nausea')) score += 5;
                if (data.associatedSymptoms && data.associatedSymptoms.includes('vomiting')) score += 5;
                if (data.associatedSymptoms && data.associatedSymptoms.includes('high-riding testis')) score += 10;
                if (data.ageMonths !== null && data.ageMonths > 12) score += 10;
                if (data.examData?.general?.pills?.includes('Ill-looking')) score += 5;
                if (data.examData?.abdomen?.pills?.includes('Tenderness (localised)')) score += 5;
                return Math.min(score, 100);
            },
            description: "Testicular torsion is a surgical emergency. Presents with sudden severe scrotal pain, swelling, nausea, and vomiting.",
            distinguishingFeatures: ["Sudden severe pain", "Scrotal swelling", "High-riding testis", "Nausea/vomiting", "Adolescents"],
            investigations: ["Doppler ultrasound (testicular blood flow)"],
            treatment: "Urgent surgical detorsion and orchidopexy."
        }
    },

    // ===== ABDOMINAL DISTENSION =====
    'abdominal distension': {
        'Intestinal Obstruction': {
            likelihood: function(data) {
                let score = 20;
                if (data.associatedSymptoms && data.associatedSymptoms.includes('bilious vomiting')) score += 20;
                if (data.associatedSymptoms && data.associatedSymptoms.includes('constipation')) score += 15;
                if (data.associatedSymptoms && data.associatedSymptoms.includes('abdominal pain')) score += 10;
                if (data.examData?.abdomen?.pills?.includes('Distended')) score += 10;
                if (data.examData?.abdomen?.pills?.includes('Rigid/Guarding')) score += 8;
                if (data.ageMonths !== null && data.ageMonths < 6) score += 10;
                return Math.min(score, 100);
            },
            description: "Intestinal obstruction presents with abdominal distension, bilious vomiting, and constipation. A surgical emergency.",
            distinguishingFeatures: ["Bilious vomiting", "Distension", "Constipation", "High-pitched bowel sounds"],
            investigations: ["Abdominal X-ray", "Ultrasound"],
            treatment: "Surgical intervention."
        },
        'Ascites (Kwashiorkor / Cardiac / Nephrotic)': {
            likelihood: function(data) {
                let score = 10;
                if (data.associatedSymptoms && data.associatedSymptoms.includes('oedema')) score += 15;
                if (data.associatedSymptoms && data.associatedSymptoms.includes('difficulty breathing')) score += 10;
                if (data.examData?.abdomen?.pills?.includes('Distended')) score += 10;
                if (data.examData?.abdomen?.pills?.includes('Dull (fluid — ascites)')) score += 10;
                if (data.examData?.general?.pills?.includes('Oedematous')) score += 10;
                return Math.min(score, 100);
            },
            description: "Ascites causes abdominal distension. Causes include kwashiorkor, cardiac failure, and nephrotic syndrome.",
            distinguishingFeatures: ["Oedema", "Abdominal distension", "Shifting dullness"],
            investigations: ["Ultrasound", "Ascitic fluid analysis"],
            treatment: "Treat underlying cause."
        }
    }
};

// ============================================================
// GENERIC DDX — Catch-all for malnutrition
// ============================================================

const genericDdx = {
    'malnutrition': {
        'Marasmus (Non-oedematous SAM)': {
            likelihood: function(data) {
                let score = 0;
                let oedemaPresent = false;
                if (data.oedemaPresent) oedemaPresent = true;
                if (data.associatedSymptoms && data.associatedSymptoms.includes('oedema')) oedemaPresent = true;
                if (data.examData?.general?.pills?.includes('Oedematous')) oedemaPresent = true;

                if (data.muac && parseFloat(data.muac) < 11.5) score += 25;
                else if (data.muac) score += 5;

                if (data.examData?.general?.pills?.includes('Malnourished')) score += 10;
                if (data.examData?.general?.pills?.includes('Wasted')) score += 15;
                if (data.examData?.general?.pills?.includes('Severe wasting')) score += 20;
                if (data.examData?.general?.pills?.includes('Rib visible')) score += 10;
                if (data.examData?.general?.pills?.includes('Loose skin folds')) score += 10;

                if (data.muac && parseFloat(data.muac) < 11.0) score += 5;
                if (data.muac && parseFloat(data.muac) < 10.5) score += 5;

                if (data.ageMonths !== null && data.ageMonths < 60) score += 5;

                if (oedemaPresent) score = Math.max(0, score - 30);

                let hasDermatosis = false;
                if (data.associatedSymptoms && data.associatedSymptoms.includes('flaky paint dermatosis')) hasDermatosis = true;
                if (data.rosData?.skin?.present?.includes('Flaky paint dermatosis')) hasDermatosis = true;
                if (data.examData?.skin?.pills?.includes('Flaky paint dermatosis')) hasDermatosis = true;
                if (hasDermatosis) score -= 10;

                return Math.min(Math.max(score, 0), 100);
            },
            description: "Marasmus is a form of severe acute malnutrition characterised by severe wasting, visible ribs, 'old man' facies, and loose skin folds ('baggy pants'). Unlike kwashiorkor, there is no oedema, dermatosis, or hair changes. Children are often alert but irritable.",
            distinguishingFeatures: ["Severe wasting (MUAC <11.5 cm)", "'Old man' / monkey facies", "Visible ribs", "Loose skin folds ('baggy pants')", "No oedema", "No dermatosis", "No hair changes", "Alert but irritable"],
            investigations: ["MUAC", "Weight-for-height Z-score (WHZ)", "FBC", "Blood glucose", "Electrolytes", "Albumin"],
            treatment: "WHO F-75 (stabilisation phase) then F-100 (rehabilitation phase); treat underlying infections; avoid overfeeding in phase 1; monitor for refeeding syndrome."
        },
        'Severe Acute Malnutrition (SAM) — Oedematous / Mixed': {
            likelihood: function(data) {
                let score = 0;
                let oedemaPresent = false;
                if (data.oedemaPresent) oedemaPresent = true;
                if (data.associatedSymptoms && data.associatedSymptoms.includes('oedema')) oedemaPresent = true;
                if (data.associatedSymptoms && data.associatedSymptoms.includes('bilateral pitting oedema')) oedemaPresent = true;
                if (data.examData?.general?.pills?.includes('Oedematous')) oedemaPresent = true;

                if (oedemaPresent) score += 35;

                if (data.muac && parseFloat(data.muac) < 11.5) score += 20;
                else if (data.muac && parseFloat(data.muac) < 12.5) score += 10;

                if (data.associatedSymptoms && data.associatedSymptoms.includes('flaky paint dermatosis')) score += 15;
                if (data.associatedSymptoms && data.associatedSymptoms.includes('hair changes')) score += 10;
                if (data.associatedSymptoms && data.associatedSymptoms.includes('irritability')) score += 5;
                if (data.rosData?.skin?.present?.includes('Flaky paint dermatosis (kwashiorkor)')) score += 15;
                if (data.rosData?.skin?.present?.includes('Dry skin / Xerosis')) score += 5;
                if (data.examData?.skin?.pills?.includes('Flaky paint dermatosis')) score += 15;

                if (data.examData?.general?.pills?.includes('Malnourished')) score += 10;
                if (data.examData?.general?.pills?.includes('Ill-looking')) score += 5;

                if (data.ageMonths !== null && data.ageMonths < 60) score += 5;

                if (!oedemaPresent) score = Math.max(0, score - 20);

                return Math.min(Math.max(score, 0), 100);
            },
            description: "Severe acute malnutrition with oedema (kwashiorkor or marasmic-kwashiorkor). Presents with bilateral pitting oedema, flaky paint dermatosis, hair changes, and irritability. Mixed cases also have wasting.",
            distinguishingFeatures: ["Bilateral pitting oedema", "Flaky paint dermatosis", "Hair changes (sparse, thin, reddish)", "Irritability", "MUAC <11.5 cm (may be masked by oedema)", "Mixed wasting and oedema possible"],
            investigations: ["MUAC", "Weight-for-height Z-score", "FBC", "Albumin", "Electrolytes", "Chest X-ray (exclude TB)", "HIV test"],
            treatment: "WHO F-75 milk (phase 1) then F-100 (phase 2); treat infections; meticulous fluid and electrolyte management; vitamin A supplementation."
        },
        'Moderate Acute Malnutrition (MAM)': {
            likelihood: function(data) {
                let score = 0;
                let oedemaPresent = false;
                if (data.oedemaPresent) oedemaPresent = true;
                if (data.associatedSymptoms && data.associatedSymptoms.includes('oedema')) oedemaPresent = true;
                if (data.examData?.general?.pills?.includes('Oedematous')) oedemaPresent = true;

                if (data.muac) {
                    const muac = parseFloat(data.muac);
                    if (muac >= 11.5 && muac < 12.5) score += 25;
                    else if (muac >= 12.5 && muac < 13.5) score += 10;
                    else if (muac < 11.5) score += 5;
                }

                if (data.examData?.general?.pills?.includes('Malnourished')) score += 10;
                if (data.examData?.general?.pills?.includes('Wasted')) score += 5;

                if (data.associatedSymptoms && data.associatedSymptoms.includes('failure to thrive')) score += 5;
                if (data.associatedSymptoms && data.associatedSymptoms.includes('poor weight gain')) score += 5;

                if (oedemaPresent) score = Math.max(0, score - 25);

                if (data.examData?.general?.pills?.includes('Severe wasting')) score -= 10;

                if (data.ageMonths !== null && data.ageMonths < 60) score += 5;

                return Math.min(Math.max(score, 0), 100);
            },
            description: "Moderate acute malnutrition (MAM) is a nutritional state between normal and severe acute malnutrition. Presents with MUAC 11.5–12.4 cm, without oedema. Often asymptomatic other than growth faltering, with increased susceptibility to infections.",
            distinguishingFeatures: ["MUAC 11.5–12.4 cm", "No oedema", "Mild-moderate wasting", "Often asymptomatic", "Growth faltering", "Increased infection risk"],
            investigations: ["MUAC", "Weight-for-height Z-score", "Growth chart review", "FBC (exclude anaemia)", "Nutritional assessment"],
            treatment: "Ready-to-use supplementary food (RUSF) or fortified blended flour; outpatient follow-up; nutrition counselling; routine vitamin A supplementation; deworming; treat underlying infections."
        }
    }
};

// ============================================================
// DDX ENGINE — Main function
// ============================================================

function runDdxEngine(complaint, patientData) {
    const categories = [];

    // Always include the primary complaint if it exists in the database
    if (complaint && ddxDatabase[complaint]) {
        categories.push(complaint);
    }

    // Supplementary trigger for malnutrition
    const hasMalnutritionTrigger = (
        patientData.muac && parseFloat(patientData.muac) < 12.5 ||
        patientData.oedemaPresent ||
        patientData.examData?.general?.pills?.includes('Oedematous') ||
        patientData.examData?.general?.pills?.includes('Malnourished') ||
        patientData.examData?.general?.pills?.includes('Wasted') ||
        patientData.examData?.general?.pills?.includes('Severe wasting') ||
        patientData.associatedSymptoms?.includes('oedema') ||
        patientData.associatedSymptoms?.includes('bilateral pitting oedema')
    );

    if (hasMalnutritionTrigger && !categories.includes('malnutrition')) {
        categories.push('malnutrition');
    }

    if (patientData.associatedSymptoms && patientData.associatedSymptoms.includes('failure to thrive')) {
        if (!categories.includes('malnutrition')) categories.push('malnutrition');
    }

    if (categories.length === 0) {
        return [];
    }

    let allResults = [];

    categories.forEach(category => {
        let ddxList = {};

        if (ddxDatabase[category]) {
            ddxList = ddxDatabase[category];
        }

        if (genericDdx[category]) {
            Object.assign(ddxList, genericDdx[category]);
        }

        Object.keys(ddxList).forEach(diagnosis => {
            const entry = ddxList[diagnosis];
            if (typeof entry.likelihood === 'function') {
                const score = entry.likelihood(patientData);
                if (score > 0) {
                    allResults.push({
                        diagnosis: diagnosis,
                        score: score,
                        description: entry.description || '',
                        distinguishingFeatures: entry.distinguishingFeatures || [],
                        investigations: entry.investigations || [],
                        treatment: entry.treatment || ''
                    });
                }
            }
        });
    });

    return allResults.sort((a, b) => b.score - a.score);
}

// ============================================================
// ALIASES for the page's expected variable names
// ============================================================

// The page looks for window.surgDdxDatabase and window.surgGenericDdx
// We'll alias our databases to these names
window.surgDdxDatabase = ddxDatabase;
window.surgGenericDdx = genericDdx;

// Also keep the original names for compatibility
window.ddxDatabase = ddxDatabase;
window.genericDdx = genericDdx;
window.runDdxEngine = runDdxEngine;
