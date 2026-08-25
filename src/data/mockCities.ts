import { PakistaniCity } from '../types/doctor';

export const MOCK_CITIES: PakistaniCity[] = [
  {
    id: 'karachi',
    name: 'Karachi',
    province: 'Sindh',
    popularAreas: [
      'Clifton',
      'DHA Phase 5 & 6',
      'Gulshan-e-Iqbal',
      'North Nazimabad',
      'PECHS',
      'Bahadurabad',
      'Saddar',
      'Gulistan-e-Johar',
      'Tariq Road'
    ],
    doctorCount: 420
  },
  {
    id: 'lahore',
    name: 'Lahore',
    province: 'Punjab',
    popularAreas: [
      'Gulberg III',
      'DHA Phase 3 & 5',
      'Model Town',
      'Johar Town',
      'Faisal Town',
      'Shadman',
      'Cantt'
    ],
    doctorCount: 380
  },
  {
    id: 'islamabad',
    name: 'Islamabad',
    province: 'Federal Capital',
    popularAreas: [
      'Blue Area',
      'Sector F-7',
      'Sector F-8',
      'Sector F-10',
      'Sector G-11',
      'DHA Phase 2',
      'Bahria Town'
    ],
    doctorCount: 260
  },
  {
    id: 'rawalpindi',
    name: 'Rawalpindi',
    province: 'Punjab',
    popularAreas: [
      'Saddar',
      'Satellite Town',
      'Westridge',
      'Bahria Town Phase 4',
      'Peshawar Road'
    ],
    doctorCount: 190
  },
  {
    id: 'faisalabad',
    name: 'Faisalabad',
    province: 'Punjab',
    popularAreas: [
      'Civil Lines',
      'Madina Town',
      'People Colony',
      'D Ground',
      'Kohinoor City'
    ],
    doctorCount: 140
  },
  {
    id: 'multan',
    name: 'Multan',
    province: 'Punjab',
    popularAreas: [
      'Cantt',
      'Gulgasht Colony',
      'Bosan Road',
      'Nishtar Road'
    ],
    doctorCount: 95
  },
  {
    id: 'peshawar',
    name: 'Peshawar',
    province: 'Khyber Pakhtunkhwa',
    popularAreas: [
      'Hayatabad',
      'University Town',
      'Saddar Road',
      'Dabgari Gardens'
    ],
    doctorCount: 110
  }
];
