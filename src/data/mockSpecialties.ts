import { Specialty } from '../types/doctor';

export const MOCK_SPECIALTIES: Specialty[] = [
  {
    id: 'cardiology',
    name: 'Cardiology',
    iconName: 'Heart',
    description: 'Heart health, hypertension, chest pain, arrhythmias & preventive cardiac care.',
    doctorCount: 42,
    popularConditions: ['Hypertension', 'Chest Pain', 'Coronary Artery Disease', 'Heart Palpitations']
  },
  {
    id: 'dermatology',
    name: 'Dermatology',
    iconName: 'Sparkles',
    description: 'Skin, hair, nail disorders, acne treatments, eczema, and cosmetic procedures.',
    doctorCount: 56,
    popularConditions: ['Acne', 'Eczema', 'Hair Fall', 'Psoriasis', 'Skin Allergies']
  },
  {
    id: 'general-medicine',
    name: 'General Medicine',
    iconName: 'Stethoscope',
    description: 'Primary care, viral fevers, seasonal flu, diabetes, and comprehensive health checks.',
    doctorCount: 88,
    popularConditions: ['Fever', 'Diabetes Management', 'Blood Pressure', 'Seasonal Allergies']
  },
  {
    id: 'pediatrics',
    name: 'Pediatrics & Child Care',
    iconName: 'Baby',
    description: 'Newborn care, childhood immunization, growth milestones, and pediatric illnesses.',
    doctorCount: 38,
    popularConditions: ['Childhood Fever', 'Vaccination', 'Asthma in Children', 'Growth Delay']
  },
  {
    id: 'gynecology',
    name: 'Gynecology & Obstetrics',
    iconName: 'Activity',
    description: 'Maternal health, prenatal care, PCOS management, fertility, and hormonal wellness.',
    doctorCount: 47,
    popularConditions: ['PCOS', 'Pregnancy Care', 'Infertility', 'Hormonal Imbalance']
  },
  {
    id: 'orthopedics',
    name: 'Orthopedics & Joint Care',
    iconName: 'Bone',
    description: 'Bone fractures, joint pain, arthritis, spinal issues, and sports injuries.',
    doctorCount: 34,
    popularConditions: ['Back Pain', 'Knee Osteoarthritis', 'Sciatica', 'Fractures']
  },
  {
    id: 'neurology',
    name: 'Neurology',
    iconName: 'Brain',
    description: 'Migraines, epilepsy, stroke rehabilitation, nerve pain, and movement disorders.',
    doctorCount: 26,
    popularConditions: ['Migraine', 'Epilepsy', 'Neuropathy', 'Tremors', 'Vertigo']
  },
  {
    id: 'psychiatry',
    name: 'Psychiatry & Mental Health',
    iconName: 'Smile',
    description: 'Anxiety disorders, clinical depression, stress counseling, and sleep disorders.',
    doctorCount: 29,
    popularConditions: ['Anxiety', 'Depression', 'Insomnia', 'Panic Attacks', 'ADHD']
  },
  {
    id: 'ent',
    name: 'Ear, Nose & Throat (ENT)',
    iconName: 'Ear',
    description: 'Sinusitis, tonsillitis, hearing problems, tinnitus, and throat infections.',
    doctorCount: 31,
    popularConditions: ['Sinusitis', 'Tonsillitis', 'Hearing Loss', 'Tinnitus']
  },
  {
    id: 'ophthalmology',
    name: 'Ophthalmology (Eye Care)',
    iconName: 'Eye',
    description: 'Cataracts, vision correction, glaucoma, diabetic retinopathy, and dry eye syndrome.',
    doctorCount: 28,
    popularConditions: ['Cataract', 'Refractive Error', 'Glaucoma', 'Dry Eyes']
  },
  {
    id: 'dentistry',
    name: 'Dentistry & Orthodontics',
    iconName: 'SmilePlus',
    description: 'Dental implants, root canal therapy, teeth whitening, and corrective braces.',
    doctorCount: 40,
    popularConditions: ['Toothache', 'Cavities', 'Braces / Aligners', 'Gum Disease']
  },
  {
    id: 'gastroenterology',
    name: 'Gastroenterology',
    iconName: 'Flame',
    description: 'Acid reflux (GERD), IBS, liver health, endoscopy, and digestive wellness.',
    doctorCount: 33,
    popularConditions: ['GERD / Acidity', 'IBS', 'Fatty Liver', 'Stomach Ulcers']
  }
];
