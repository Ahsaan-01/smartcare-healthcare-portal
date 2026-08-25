import { Doctor } from '../types/doctor';

export const MOCK_DOCTORS: Doctor[] = [
  {
    id: 'doc-1',
    name: 'Dr. Ayesha Khan',
    title: 'Consultant Interventional Cardiologist',
    specialization: 'Cardiology',
    specializationId: 'cardiology',
    avatarUrl: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=400',
    pmdcVerified: true,
    pmdcNumber: 'PMC-29481-S',
    experienceYears: 14,
    rating: 4.9,
    reviewCount: 148,
    consultationFee: 2500,
    city: 'Karachi',
    area: 'Clifton, Block 4',
    clinicName: 'SmartCare Heart & Vascular Institute',
    clinicAddress: 'Plot 12-C, Khayaban-e-Iqbal, Clifton Block 4, Karachi',
    consultationType: 'both',
    languages: ['English', 'Urdu', 'Sindhi'],
    gender: 'Female',
    nextAvailableSlot: 'Today at 04:30 PM',
    featured: true,
    about: 'Dr. Ayesha Khan is a highly esteemed Cardiologist with over 14 years of clinical experience. She completed her post-graduate fellowship (FCPS) from the National Institute of Cardiovascular Diseases (NICVD) and an advanced fellowship in Interventional Cardiology in the UK.',
    expertise: [
      'Hypertension & Lipid Disorders',
      'Coronary Angiography & Stenting',
      'Echocardiography (Echo) & ETT',
      'Preventive Cardiac Risk Assessment',
      'Heart Failure Management'
    ],
    education: [
      { degree: 'MBBS', institution: 'Dow University of Health Sciences (DUHS), Karachi', year: '2009' },
      { degree: 'FCPS (Cardiology)', institution: 'College of Physicians & Surgeons Pakistan (CPSP)', year: '2015' },
      { degree: 'Fellowship in Interventional Cardiology', institution: 'Royal College of Physicians, Edinburgh', year: '2018' }
    ],
    experience: [
      { role: 'Senior Consultant Cardiologist', hospital: 'SmartCare Heart & Vascular Institute, Karachi', period: '2019 — Present' },
      { role: 'Associate Physician (Cardiology)', hospital: 'Aga Khan University Hospital, Karachi', period: '2015 — 2019' },
      { role: 'Registrar Cardiology', hospital: 'NICVD, Karachi', period: '2011 — 2015' }
    ],
    timings: [
      { days: 'Monday – Friday', hours: '04:00 PM – 08:30 PM' },
      { days: 'Saturday', hours: '11:00 AM – 03:00 PM' }
    ],
    services: [
      'In-Clinic Diagnostic Cardiac Evaluation',
      'High-Definition Video Consultation',
      'Digital Prescription & Report Evaluation',
      'Post-Operative Cardiac Rehabilitation'
    ]
  },
  {
    id: 'doc-2',
    name: 'Dr. Ahmed Raza',
    title: 'Consultant Dermatologist & Cosmetologist',
    specialization: 'Dermatology',
    specializationId: 'dermatology',
    avatarUrl: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=400',
    pmdcVerified: true,
    pmdcNumber: 'PMC-34192-S',
    experienceYears: 11,
    rating: 4.8,
    reviewCount: 215,
    consultationFee: 2000,
    city: 'Karachi',
    area: 'DHA Phase 5',
    clinicName: 'DermaCare Skin & Laser Clinic',
    clinicAddress: 'Suite 201, 26th Street Commercial, DHA Phase 5, Karachi',
    consultationType: 'both',
    languages: ['English', 'Urdu'],
    gender: 'Male',
    nextAvailableSlot: 'Today at 06:00 PM',
    featured: true,
    about: 'Dr. Ahmed Raza is a specialist in clinical dermatology, aesthetic procedures, and hair restoration. With 11+ years of practice, he specializes in treating chronic inflammatory skin conditions and acne scarring.',
    expertise: [
      'Severe Acne & Rosacea Management',
      'PRP & Hair Loss Therapies',
      'Pigmentation & Melasma Treatments',
      'Eczema, Psoriasis & Fungal Disorders',
      'Cosmetic Laser Procedures'
    ],
    education: [
      { degree: 'MBBS', institution: 'King Edward Medical University, Lahore', year: '2012' },
      { degree: 'MCPS (Dermatology)', institution: 'CPSP, Pakistan', year: '2016' },
      { degree: 'Diplomate in Clinical Dermatology', institution: 'Queen Mary University of London', year: '2019' }
    ],
    experience: [
      { role: 'Head Dermatologist', hospital: 'DermaCare Skin & Laser Clinic, DHA Karachi', period: '2019 — Present' },
      { role: 'Consultant Dermatologist', hospital: 'South City Hospital, Karachi', period: '2016 — 2019' }
    ],
    timings: [
      { days: 'Monday – Saturday', hours: '05:00 PM – 09:00 PM' }
    ],
    services: [
      'Comprehensive Skin Assessment',
      'Laser Skin Resurfacing',
      'PRP Treatment for Hair Loss',
      'Online Teledermatology Video Consultation'
    ]
  },
  {
    id: 'doc-3',
    name: 'Dr. Fatima Zahra',
    title: 'Consultant Obstetrician & Gynecologist',
    specialization: 'Gynecology & Obstetrics',
    specializationId: 'gynecology',
    avatarUrl: 'https://images.unsplash.com/photo-1594824813590-b18cb8e07833?auto=format&fit=crop&q=80&w=400',
    pmdcVerified: true,
    pmdcNumber: 'PMC-18239-P',
    experienceYears: 16,
    rating: 4.9,
    reviewCount: 310,
    consultationFee: 3000,
    city: 'Lahore',
    area: 'Gulberg III',
    clinicName: 'Prime Women Health & Fertility Care',
    clinicAddress: '42-A, Mian Mahmood Ali Kasuri Road, Gulberg III, Lahore',
    consultationType: 'both',
    languages: ['English', 'Urdu', 'Punjabi'],
    gender: 'Female',
    nextAvailableSlot: 'Tomorrow at 10:30 AM',
    featured: true,
    about: 'Dr. Fatima Zahra is an internationally trained Gynecologist with 16 years of experience in managing high-risk pregnancies, maternal health, PCOS, and fertility guidance.',
    expertise: [
      'High-Risk Pregnancy Care & Antenatal Health',
      'Polycystic Ovary Syndrome (PCOS) Protocols',
      'Infertility Workup & Management',
      'Laparoscopic Gynecological Surgeries',
      'Hormone Replacement & Menopause Guidance'
    ],
    education: [
      { degree: 'MBBS', institution: 'Fatima Jinnah Medical University, Lahore', year: '2007' },
      { degree: 'FCPS (Obstetrics & Gynecology)', institution: 'CPSP', year: '2013' },
      { degree: 'MRCOG (Part 1 & 2)', institution: 'Royal College of Obstetricians and Gynaecologists, UK', year: '2016' }
    ],
    experience: [
      { role: 'Head of Department (Obstetrics)', hospital: 'Prime Women Health Clinic, Lahore', period: '2018 — Present' },
      { role: 'Senior Registrar', hospital: 'Services Hospital, Lahore', period: '2013 — 2018' }
    ],
    timings: [
      { days: 'Monday – Friday', hours: '10:00 AM – 02:00 PM, 06:00 PM – 08:30 PM' }
    ],
    services: [
      'Comprehensive Prenatal Checks',
      'PCOS Metabolic Consultation',
      'Infertility Counseling',
      'Video Telehealth for Maternal Guidance'
    ]
  },
  {
    id: 'doc-4',
    name: 'Dr. Usman Tariq',
    title: 'Consultant Pediatrician & Neonatologist',
    specialization: 'Pediatrics & Child Care',
    specializationId: 'pediatrics',
    avatarUrl: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=400',
    pmdcVerified: true,
    pmdcNumber: 'PMC-41908-F',
    experienceYears: 12,
    rating: 4.8,
    reviewCount: 174,
    consultationFee: 2000,
    city: 'Islamabad',
    area: 'Blue Area',
    clinicName: 'Capital Child Health & Immunization Center',
    clinicAddress: 'Executive Heights, Sector G-7/Blue Area, Islamabad',
    consultationType: 'both',
    languages: ['English', 'Urdu', 'Pashto'],
    gender: 'Male',
    nextAvailableSlot: 'Today at 05:00 PM',
    featured: true,
    about: 'Dr. Usman Tariq is a dedicated Pediatrician specializing in newborn care, child development milestones, childhood infectious diseases, and pediatric nutritional therapies.',
    expertise: [
      'Newborn & Premature Infant Care',
      'Childhood Immunization & Vaccine Plans',
      'Pediatric Respiratory Illnesses & Asthma',
      'Growth & Nutritional Milestone Tracking',
      'Childhood Infectious Disease Care'
    ],
    education: [
      { degree: 'MBBS', institution: 'Rawalpindi Medical University', year: '2011' },
      { degree: 'FCPS (Pediatrics)', institution: 'CPSP', year: '2017' }
    ],
    experience: [
      { role: 'Consultant Pediatrician', hospital: 'Capital Child Health, Islamabad', period: '2019 — Present' },
      { role: 'Pediatric Specialist', hospital: 'Shifa International Hospital, Islamabad', period: '2017 — 2019' }
    ],
    timings: [
      { days: 'Monday – Saturday', hours: '04:00 PM – 08:00 PM' }
    ],
    services: [
      'Routine Baby Growth Screening',
      'EPI & Extended Vaccination Support',
      'Childhood Nutritional Assessment',
      'Tele-Consultation for Common Fevers'
    ]
  },
  {
    id: 'doc-5',
    name: 'Dr. Sana Farooq',
    title: 'Consultant General Physician & Diabetologist',
    specialization: 'General Medicine',
    specializationId: 'general-medicine',
    avatarUrl: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&q=80&w=400',
    pmdcVerified: true,
    pmdcNumber: 'PMC-22874-S',
    experienceYears: 15,
    rating: 4.9,
    reviewCount: 289,
    consultationFee: 1800,
    city: 'Karachi',
    area: 'Gulshan-e-Iqbal, Block 6',
    clinicName: 'Al-Shifa Family & Diabetic Care',
    clinicAddress: 'Main University Road, Gulshan-e-Iqbal Block 6, Karachi',
    consultationType: 'both',
    languages: ['English', 'Urdu'],
    gender: 'Female',
    nextAvailableSlot: 'Today at 03:00 PM',
    featured: true,
    about: 'Dr. Sana Farooq provides comprehensive primary care, diabetes management, hypertension monitoring, and treatment for seasonal endemic infections (Dengue, Typhoid, Malaria).',
    expertise: [
      'Type 1 & Type 2 Diabetes Management',
      'Hypertension & Cholesterol Regulation',
      'Seasonal Viral & Infectious Diseases',
      'Thyroid Disorders & General Fatigue',
      'Preventive Annual Health Screenings'
    ],
    education: [
      { degree: 'MBBS', institution: 'Sindh Medical College (JSMU), Karachi', year: '2008' },
      { degree: 'MCPS (Family Medicine)', institution: 'CPSP', year: '2014' },
      { degree: 'Diploma in Diabetes & Endocrinology', institution: 'Baqai Medical University', year: '2016' }
    ],
    experience: [
      { role: 'Lead Family Physician', hospital: 'Al-Shifa Family Care, Karachi', period: '2016 — Present' },
      { role: 'Medical Officer', hospital: 'Civil Hospital Karachi', period: '2009 — 2014' }
    ],
    timings: [
      { days: 'Monday – Saturday', hours: '02:00 PM – 07:00 PM' }
    ],
    services: [
      'Diabetic Comprehensive Review',
      'Acute Illness Diagnostics',
      'Online Follow-up Video Consultations',
      'Preventive Health Checkups'
    ]
  },
  {
    id: 'doc-6',
    name: 'Dr. Saad Malik',
    title: 'Consultant Orthopedic & Spine Surgeon',
    specialization: 'Orthopedics & Joint Care',
    specializationId: 'orthopedics',
    avatarUrl: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=400',
    pmdcVerified: true,
    pmdcNumber: 'PMC-30114-P',
    experienceYears: 17,
    rating: 4.7,
    reviewCount: 162,
    consultationFee: 2500,
    city: 'Lahore',
    area: 'DHA Phase 5',
    clinicName: 'Lahore Orthopedic & Sports Medicine Centre',
    clinicAddress: 'Sector C Commercial, DHA Phase 5, Lahore',
    consultationType: 'in-clinic',
    languages: ['English', 'Urdu', 'Punjabi'],
    gender: 'Male',
    nextAvailableSlot: 'Tomorrow at 05:30 PM',
    featured: false,
    about: 'Dr. Saad Malik specializes in orthopedic trauma, joint replacement surgery, arthroscopy, and non-surgical management of osteoarthritis, back pain, and sports injuries.',
    expertise: [
      'Knee & Hip Joint Replacement',
      'Arthroscopic Sports Injury Reconstruction',
      'Lower Back Pain & Sciatica Protocols',
      'Fracture Care & Trauma Surgery',
      'Platelet-Rich Plasma (PRP) for Joints'
    ],
    education: [
      { degree: 'MBBS', institution: 'Allama Iqbal Medical College, Lahore', year: '2006' },
      { degree: 'FCPS (Orthopedic Surgery)', institution: 'CPSP', year: '2013' },
      { degree: 'AO Spine Fellowship', institution: 'Davos, Switzerland', year: '2016' }
    ],
    experience: [
      { role: 'Head of Orthopedics', hospital: 'Lahore Orthopedic Centre', period: '2017 — Present' },
      { role: 'Consultant Surgeon', hospital: 'Jinnah Hospital, Lahore', period: '2013 — 2017' }
    ],
    timings: [
      { days: 'Monday, Wednesday, Friday', hours: '05:00 PM – 09:00 PM' }
    ],
    services: [
      'Joint & Bone Physical Assessment',
      'Pre-Operative Surgical Evaluation',
      'Casting & Splinting',
      'Post-Operative Rehabilitation Guidance'
    ]
  },
  {
    id: 'doc-7',
    name: 'Dr. Hira Ahmed',
    title: 'Consultant Psychiatrist & Behavioral Therapist',
    specialization: 'Psychiatry & Mental Health',
    specializationId: 'psychiatry',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400',
    pmdcVerified: true,
    pmdcNumber: 'PMC-38820-F',
    experienceYears: 9,
    rating: 4.9,
    reviewCount: 140,
    consultationFee: 3500,
    city: 'Islamabad',
    area: 'Sector F-7',
    clinicName: 'MindCare Wellbeing Clinic',
    clinicAddress: 'Jinnah Super Commercial Area, Sector F-7/2, Islamabad',
    consultationType: 'both',
    languages: ['English', 'Urdu'],
    gender: 'Female',
    nextAvailableSlot: 'Today at 07:00 PM',
    featured: true,
    about: 'Dr. Hira Ahmed is a compassionate psychiatrist providing evidence-based treatment for depressive disorders, severe anxiety, panic attacks, stress burnout, and OCD.',
    expertise: [
      'Major Depressive Disorder & Mood Regulation',
      'Generalized Anxiety & Panic Disorder',
      'Cognitive Behavioral Therapy (CBT) Integration',
      'Insomnia & Sleep Rhythm Disorders',
      'Workplace Stress & Burnout Counseling'
    ],
    education: [
      { degree: 'MBBS', institution: 'Army Medical College, Rawalpindi', year: '2014' },
      { degree: 'FCPS (Psychiatry)', institution: 'CPSP', year: '2020' }
    ],
    experience: [
      { role: 'Consultant Psychiatrist', hospital: 'MindCare Clinic, Islamabad', period: '2020 — Present' },
      { role: 'Senior Resident', hospital: 'Armed Forces Institute of Mental Health (AFIMH)', period: '2016 — 2020' }
    ],
    timings: [
      { days: 'Tuesday – Saturday', hours: '03:00 PM – 08:00 PM' }
    ],
    services: [
      'Mental Health Clinical Evaluation',
      'Psychopharmacology & Prescription Management',
      'Online Confidential Video Counseling',
      'Sleep Disorder Management Plan'
    ]
  },
  {
    id: 'doc-8',
    name: 'Dr. Muhammad Hamza',
    title: 'Consultant Neurologist',
    specialization: 'Neurology',
    specializationId: 'neurology',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400',
    pmdcVerified: true,
    pmdcNumber: 'PMC-25619-S',
    experienceYears: 13,
    rating: 4.8,
    reviewCount: 96,
    consultationFee: 3000,
    city: 'Karachi',
    area: 'PECHS, Block 2',
    clinicName: 'Karachi Neuro & Stroke Care',
    clinicAddress: 'Shahrah-e-Quaideen, PECHS Block 2, Karachi',
    consultationType: 'both',
    languages: ['English', 'Urdu'],
    gender: 'Male',
    nextAvailableSlot: 'Tomorrow at 03:00 PM',
    featured: false,
    about: 'Dr. Muhammad Hamza is a skilled neurologist focused on stroke prevention, chronic migraines, peripheral neuropathies, epilepsy, and neuromuscular conditions.',
    expertise: [
      'Chronic Migraine & Tension Headaches',
      'Epilepsy & Seizure Management',
      'Post-Stroke Rehabilitation & Care',
      'Parkinson’s Disease & Movement Disorders',
      'Peripheral Neuropathy & Sciatic Nerve Pain'
    ],
    education: [
      { degree: 'MBBS', institution: 'DUHS (Dow), Karachi', year: '2010' },
      { degree: 'FCPS (Neurology)', institution: 'CPSP', year: '2017' }
    ],
    experience: [
      { role: 'Consultant Neurologist', hospital: 'Karachi Neuro Care, PECHS', period: '2018 — Present' },
      { role: 'Assistant Professor', hospital: 'Liaquat National Hospital, Karachi', period: '2017 — 2021' }
    ],
    timings: [
      { days: 'Monday – Friday', hours: '02:30 PM – 06:30 PM' }
    ],
    services: [
      'Comprehensive Neurological Assessment',
      'EEG & EMG Report Evaluation',
      'Video Telehealth Consultations',
      'Migraine Trigger Management Plan'
    ]
  },
  {
    id: 'doc-9',
    name: 'Dr. Bilal Siddiqui',
    title: 'Consultant ENT, Head & Neck Surgeon',
    specialization: 'Ear, Nose & Throat (ENT)',
    specializationId: 'ent',
    avatarUrl: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&q=80&w=400',
    pmdcVerified: true,
    pmdcNumber: 'PMC-31980-P',
    experienceYears: 18,
    rating: 4.8,
    reviewCount: 182,
    consultationFee: 2200,
    city: 'Rawalpindi',
    area: 'Saddar',
    clinicName: 'Saddar ENT & Sinus Specialty Clinic',
    clinicAddress: 'Haider Road, Saddar Commercial Area, Rawalpindi',
    consultationType: 'both',
    languages: ['English', 'Urdu', 'Potohari'],
    gender: 'Male',
    nextAvailableSlot: 'Today at 04:00 PM',
    featured: false,
    about: 'Dr. Bilal Siddiqui is a renowned ENT specialist in Rawalpindi with 18 years of clinical expertise treating chronic sinus conditions, hearing loss, tonsillitis, and sleep apnea.',
    expertise: [
      'Endoscopic Sinus Surgery (FESS)',
      'Hearing Loss, Tinnitus & Vertigo',
      'Chronic Tonsillitis & Adenoid Disorders',
      'Deviated Nasal Septum (DNS) & Rhinoplasty',
      'Snoring & Obstructive Sleep Apnea'
    ],
    education: [
      { degree: 'MBBS', institution: 'Rawalpindi Medical College', year: '2005' },
      { degree: 'FCPS (Otolaryngology)', institution: 'CPSP', year: '2012' }
    ],
    experience: [
      { role: 'Senior ENT Consultant', hospital: 'Saddar ENT Clinic, Rawalpindi', period: '2014 — Present' },
      { role: 'Consultant', hospital: 'Holy Family Hospital, Rawalpindi', period: '2012 — 2014' }
    ],
    timings: [
      { days: 'Monday – Saturday', hours: '03:30 PM – 07:30 PM' }
    ],
    services: [
      'Diagnostic Nasal Endoscopy',
      'Ear Canal Debridement & Audiometry Review',
      'Sinusitis Video Consultation',
      'Pre-Surgical ENT Clearance'
    ]
  },
  {
    id: 'doc-10',
    name: 'Dr. Mariam Naveed',
    title: 'Consultant Ophthalmologist & Cataract Specialist',
    specialization: 'Ophthalmology (Eye Care)',
    specializationId: 'ophthalmology',
    avatarUrl: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=400',
    pmdcVerified: true,
    pmdcNumber: 'PMC-36421-P',
    experienceYears: 10,
    rating: 4.9,
    reviewCount: 118,
    consultationFee: 2000,
    city: 'Faisalabad',
    area: 'Civil Lines',
    clinicName: 'Noor Eye Hospital & Laser Vision',
    clinicAddress: 'Mall Road, Civil Lines, Faisalabad',
    consultationType: 'in-clinic',
    languages: ['English', 'Urdu', 'Punjabi'],
    gender: 'Female',
    nextAvailableSlot: 'Tomorrow at 11:00 AM',
    featured: false,
    about: 'Dr. Mariam Naveed is an eye specialist with extensive practice in refractive error correction, phacoemulsification cataract surgeries, glaucoma screening, and dry eye therapy.',
    expertise: [
      'Phaco Cataract Surgery with Premium IOLs',
      'Glaucoma Early Detection & Eye Pressure Control',
      'Diabetic Eye Retinopathy Screening',
      'Dry Eye Syndrome & Computer Vision Strain',
      'Pediatric Squint & Vision Checks'
    ],
    education: [
      { degree: 'MBBS', institution: 'Punjab Medical College, Faisalabad', year: '2013' },
      { degree: 'FCPS (Ophthalmology)', institution: 'CPSP', year: '2019' }
    ],
    experience: [
      { role: 'Consultant Eye Surgeon', hospital: 'Noor Eye Hospital, Faisalabad', period: '2020 — Present' },
      { role: 'Registrar', hospital: 'Allied Hospital, Faisalabad', period: '2015 — 2019' }
    ],
    timings: [
      { days: 'Monday – Saturday', hours: '10:30 AM – 02:30 PM' }
    ],
    services: [
      'Slit Lamp Diagnostic Examination',
      'Intraocular Pressure (IOP) Check',
      'Cataract Surgical Assessment',
      'Refraction & Spectacle Prescriptions'
    ]
  },
  {
    id: 'doc-11',
    name: 'Dr. Zainab Qureshi',
    title: 'Consultant Gastroenterologist & Hepatologist',
    specialization: 'Gastroenterology',
    specializationId: 'gastroenterology',
    avatarUrl: 'https://images.unsplash.com/photo-1594824813590-b18cb8e07833?auto=format&fit=crop&q=80&w=400',
    pmdcVerified: true,
    pmdcNumber: 'PMC-27510-S',
    experienceYears: 14,
    rating: 4.8,
    reviewCount: 165,
    consultationFee: 2800,
    city: 'Karachi',
    area: 'North Nazimabad, Block H',
    clinicName: 'Digestive Health & Liver Clinic',
    clinicAddress: 'Shahrah-e-Sher Shah Suri, North Nazimabad Block H, Karachi',
    consultationType: 'both',
    languages: ['English', 'Urdu'],
    gender: 'Female',
    nextAvailableSlot: 'Today at 05:30 PM',
    featured: false,
    about: 'Dr. Zainab Qureshi provides advanced diagnosis and treatment for GERD, hepatitis B/C, fatty liver disease, irritable bowel syndrome (IBS), and gastrointestinal bleeding.',
    expertise: [
      'Severe GERD & Peptic Ulcer Disease',
      'Hepatitis B, Hepatitis C & Fatty Liver Protocols',
      'Irritable Bowel Syndrome (IBS) & Celiac Disease',
      'Diagnostic Upper GI Endoscopy & Colonoscopy',
      'Gallbladder & Pancreatic Care'
    ],
    education: [
      { degree: 'MBBS', institution: 'Karachi Medical & Dental College (KMDC)', year: '2009' },
      { degree: 'FCPS (Gastroenterology)', institution: 'CPSP', year: '2016' }
    ],
    experience: [
      { role: 'Consultant Gastroenterologist', hospital: 'Digestive Health Clinic, Karachi', period: '2018 — Present' },
      { role: 'Assistant Professor', hospital: 'Abbasi Shaheed Hospital, Karachi', period: '2016 — 2021' }
    ],
    timings: [
      { days: 'Monday – Friday', hours: '04:00 PM – 08:00 PM' }
    ],
    services: [
      'Gastrointestinal Assessment',
      'Liver Function & Ultrasound Review',
      'Online Video Consultation for Acidity/IBS',
      'Dietary Digestive Guidance'
    ]
  },
  {
    id: 'doc-12',
    name: 'Dr. Kamran Ali',
    title: 'Consultant Dental Surgeon & Implantologist',
    specialization: 'Dentistry & Orthodontics',
    specializationId: 'dentistry',
    avatarUrl: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=400',
    pmdcVerified: true,
    pmdcNumber: 'PMC-19401-D',
    experienceYears: 12,
    rating: 4.9,
    reviewCount: 220,
    consultationFee: 1500,
    city: 'Lahore',
    area: 'Model Town',
    clinicName: 'Elite Smiles Dental Studio',
    clinicAddress: 'Bank Square Market, Model Town Block C, Lahore',
    consultationType: 'in-clinic',
    languages: ['English', 'Urdu', 'Punjabi'],
    gender: 'Male',
    nextAvailableSlot: 'Tomorrow at 04:00 PM',
    featured: true,
    about: 'Dr. Kamran Ali specializes in modern painless dentistry, dental implants, root canal therapy, smile design, and teeth alignment.',
    expertise: [
      'Single & Multi-Tooth Dental Implants',
      'Root Canal Therapy (RCT) with Digital Apex',
      'Cosmetic Smile Makeover & Veneers',
      'Invisible Aligners & Orthodontic Care',
      'Laser Teeth Whitening'
    ],
    education: [
      { degree: 'BDS', institution: 'de’Montmorency College of Dentistry, Lahore', year: '2011' },
      { degree: 'FCPS (Operative Dentistry)', institution: 'CPSP', year: '2017' }
    ],
    experience: [
      { role: 'Lead Dental Surgeon', hospital: 'Elite Smiles Dental Studio, Lahore', period: '2018 — Present' },
      { role: 'Consultant', hospital: 'Punjab Dental Hospital, Lahore', period: '2014 — 2018' }
    ],
    timings: [
      { days: 'Monday – Saturday', hours: '03:00 PM – 09:00 PM' }
    ],
    services: [
      'Comprehensive Oral & Dental Examination',
      'Digital Dental X-Ray Analysis',
      'Emergency Toothache Treatment',
      'Cosmetic Smile Consultation'
    ]
  }
];
