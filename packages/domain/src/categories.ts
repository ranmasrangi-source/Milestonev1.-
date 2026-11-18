import type { LocalizedText } from './status';

export const SERVICE_GROUPS = [
  'stay',
  'adventure',
  'travel',
  'connectivity',
  'shop',
  'local',
  'planning',
  'safety',
  'community',
  'platform',
] as const;

export type ServiceGroup = (typeof SERVICE_GROUPS)[number];

export interface ServiceCategory {
  code: string;
  group: ServiceGroup;
  name: LocalizedText;
  description: LocalizedText;
  /**
   * True when the category involves money or reservations and must pass the booking gate.
   * Information services (planning, maps, safety info) are never bookable.
   */
  transactional: boolean;
}

const c = (
  code: string,
  group: ServiceGroup,
  nameEn: string,
  nameNe: string,
  descriptionEn: string,
  descriptionNe: string,
  transactional: boolean,
): ServiceCategory => ({
  code,
  group,
  name: { en: nameEn, ne: nameNe },
  description: { en: descriptionEn, ne: descriptionNe },
  transactional,
});

/**
 * Every planned service category from the PheriNepal master scope (Batches 1 to 4).
 * Adding a category here requires a matching row in the database seed.
 */
export const SERVICE_CATEGORIES: readonly ServiceCategory[] = [
  c('hotels', 'stay', 'Hotels & Resorts', 'होटल तथा रिसोर्ट',
    'Verified hotels, resorts, lodges, guesthouses and hostels across Nepal.',
    'नेपालभरका प्रमाणित होटल, रिसोर्ट, लज, गेस्टहाउस र होस्टल।', true),
  c('homestays', 'stay', 'Homestays', 'होमस्टे',
    'Stay with local families in verified homestays with clear house rules.',
    'प्रमाणित होमस्टेमा स्पष्ट नियमसहित स्थानीय परिवारसँग बस्नुहोस्।', true),
  c('adventures', 'adventure', 'Adventures', 'साहसिक यात्रा',
    'Verified rafting, paragliding, canyoning, zipline and other adventure activities.',
    'प्रमाणित र्याफ्टिङ, प्याराग्लाइडिङ, क्यानियोनिङ, जिप-लाइन र अन्य साहसिक गतिविधि।', true),
  c('trekking', 'adventure', 'Trekking & Hiking', 'ट्रेकिङ तथा पदयात्रा',
    'Trekking and hiking routes with verified guides, permit guidance and safety information.',
    'प्रमाणित गाइड, अनुमति मार्गदर्शन र सुरक्षा जानकारीसहित ट्रेकिङ मार्गहरू।', true),
  c('peak-climbing', 'adventure', 'Peak Climbing & Mountaineering', 'हिमाल आरोहण तथा पर्वतारोहण',
    'Peak climbing and mountaineering programmes with certified guides and insurance checks.',
    'प्रमाणित गाइड र बीमा जाँचसहित हिमाल आरोहण कार्यक्रम।', true),
  c('guides', 'travel', 'Guides & Tour Operators', 'गाइड तथा टुर सञ्चालक',
    'Licensed local, trekking, cultural and language guides, and tour operators.',
    'इजाजतपत्रप्राप्त स्थानीय, ट्रेकिङ, सांस्कृतिक र भाषा गाइड तथा टुर सञ्चालक।', true),
  c('transport', 'travel', 'Transport & Airport Transfers', 'यातायात तथा विमानस्थल ओसार',
    'Tourist buses, private cars, jeeps, taxis, vehicle rental and airport transfers.',
    'पर्यटक बस, निजी कार, जिप, ट्याक्सी, सवारी भाडा र विमानस्थल ओसार।', true),
  c('flights', 'travel', 'Flights & Flight Status', 'उडान तथा उडान स्थिति',
    'Domestic and international flight search and status through approved providers.',
    'स्वीकृत प्रदायकमार्फत घरेलु तथा अन्तर्राष्ट्रिय उडान खोज र स्थिति।', true),
  c('luggage', 'travel', 'Luggage Storage & Transfer', 'सामान भण्डारण तथा ओसार',
    'Luggage storage and luggage transfer between hotels, stations and airports.',
    'होटल, स्टेसन र विमानस्थलबीच सामान भण्डारण तथा ओसार।', true),
  c('nearby-services', 'travel', 'Nearby Services', 'नजिकका सेवाहरू',
    'Nearby hospitals, pharmacies, ATMs, banks, fuel stations and tourist information.',
    'नजिकका अस्पताल, फार्मेसी, ATM, बैंक, इन्धन स्टेसन र पर्यटक सूचना।', false),
  c('esim', 'connectivity', 'Nepal eSIM', 'नेपाल eSIM',
    'Nepal data eSIM packages with device checks and QR activation, once provider agreements are confirmed.',
    'उपकरण जाँच र QR सक्रियतासहित नेपाल डाटा eSIM प्याकेज, प्रदायक सम्झौता पुष्टि भएपछि।', true),
  c('sim-info', 'connectivity', 'SIM & Connectivity Info', 'SIM तथा जडान जानकारी',
    'Physical SIM information and how to get connected in Nepal.',
    'भौतिक SIM जानकारी र नेपालमा जडान गर्ने तरिका।', false),
  c('offline-maps', 'connectivity', 'Offline Maps & Navigation', 'अफलाइन नक्सा तथा नेभिगेसन',
    'Downloadable maps and offline travel information where licensing permits.',
    'इजाजतले अनुमति दिएको ठाउँमा डाउनलोड योग्य नक्सा र अफलाइन यात्रा जानकारी।', false),
  c('shopping', 'shop', 'Nepali Marketplace', 'नेपाली बजार',
    'A marketplace for Nepali handicrafts, pashmina, tea, coffee and local products.',
    'नेपाली हस्तकला, पश्मिना, चिया, कफी र स्थानीय उत्पादनको बजार।', true),
  c('restaurants', 'local', 'Restaurants & Reservations', 'रेस्टुरेन्ट तथा आरक्षण',
    'Restaurant discovery and table reservations with partner venues.',
    'साझेदार रेस्टुरेन्टहरूमा खोज र टेबल आरक्षण।', true),
  c('local-experiences', 'local', 'Local Experiences', 'स्थानीय अनुभव',
    'Cooking classes, village tourism, cultural programmes, festivals and wellness.',
    'खाना पकाउने कक्षा, गाउँ पर्यटन, सांस्कृतिक कार्यक्रम, चाडपर्व र वेलनेस।', true),
  c('hidden-nepal', 'local', 'Hidden Nepal', 'लुकेको नेपाल',
    'Lesser-known destinations and authentic community experiences, selected by editors.',
    'सम्पादकहरूले छनोट गरेका कम चिनिएका गन्तव्य र प्रामाणिक सामुदायिक अनुभव।', false),
  c('ai-guide', 'planning', 'AI Travel Guide', 'AI यात्रा गाइड',
    'An AI travel guide grounded in verified platform information, with human escalation.',
    'प्रमाणित प्लेटफर्म जानकारीमा आधारित AI यात्रा गाइड, मानिससम्म पुग्ने व्यवस्थासहित।', false),
  c('trip-planning', 'planning', 'Trip Planning, Budget & Permits', 'यात्रा योजना, बजेट तथा अनुमति',
    'Itinerary, budget, packing checklist, visa and permit information, and travel insurance information.',
    'यात्रा तालिका, बजेट, सामान सूची, भिसा तथा अनुमति जानकारी र यात्रा बीमा जानकारी।', false),
  c('weather-alerts', 'safety', 'Weather & Safety Alerts', 'मौसम तथा सुरक्षा सूचना',
    'Weather and safety alerts from official and verified sources.',
    'आधिकारिक र प्रमाणित स्रोतबाट मौसम तथा सुरक्षा सूचना।', false),
  c('sos', 'safety', 'SOS & Emergency Assistance', 'SOS तथा आपतकालीन सहायता',
    'Emergency contacts, incident reporting and SOS assistance. Not yet active.',
    'आपतकालीन सम्पर्क, घटना रिपोर्ट र SOS सहायता। अहिले सक्रिय छैन।', false),
  c('qr-scan', 'community', 'QR Scan Nepal', 'QR स्क्यान नेपाल',
    'Scan QR codes at destinations, hotels and shops for verified information.',
    'गन्तव्य, होटल र पसलमा QR कोड स्क्यान गरी प्रमाणित जानकारी हेर्नुहोस्।', false),
  c('passport', 'community', 'Digital Travel Passport', 'डिजिटल यात्रा राहदानी',
    'A digital record of the places you have visited in Nepal.',
    'नेपालमा तपाईंले भ्रमण गर्नुभएका ठाउँको डिजिटल अभिलेख।', false),
  c('memories', 'community', 'Pheri Memories', 'फेरी सम्झना',
    'Store trip photos and stories privately, and share only with your consent.',
    'यात्राका फोटो र कथा निजी रूपमा सुरक्षित गर्नुहोस्, सहमतिमा मात्र साझा गर्नुहोस्।', false),
  c('reviews', 'community', 'Reviews & TrustScore', 'समीक्षा तथा TrustScore',
    'Verified reviews from completed bookings and a transparent TrustScore.',
    'पूरा भएका बुकिङबाट प्रमाणित समीक्षा र पारदर्शी TrustScore।', false),
  c('rewards', 'community', 'Rewards & Referrals', 'पुरस्कार तथा रेफरल',
    'Loyalty points and referral rewards.',
    'वफादारी अंक र रेफरल पुरस्कार।', false),
  c('lost-found', 'community', 'Lost & Found', 'हराएको तथा फेला परेको',
    'Report lost belongings and help reunite found items with their owners.',
    'हराएका सामान रिपोर्ट गर्नुहोस् र फेला परेका सामान मालिकसम्म पुर्‍याउन सहयोग गर्नुहोस्।', false),
  c('companion-matching', 'community', 'Travel Companion Matching', 'यात्री साथी मिलान',
    'Find travel companions with privacy and safety controls. Subject to review before any launch.',
    'गोपनीयता र सुरक्षा नियन्त्रणसहित यात्री साथी खोज्नुहोस्। सुरु गर्नु अघि समीक्षा आवश्यक।', false),
  c('group-travel', 'community', 'Group Travel', 'समूह यात्रा',
    'Shared itineraries, group bookings and shared expenses.',
    'साझा तालिका, समूह बुकिङ र साझा खर्च।', false),
  c('travel-wallet', 'platform', 'Travel Wallet & Expenses', 'यात्रा वालेट तथा खर्च',
    'Payment history, invoices, refunds and expense tracking in one place.',
    'भुक्तानी इतिहास, इनभ्वाइस, फिर्ता र खर्च ट्र्याकिङ एउटै ठाउँमा।', false),
  c('support', 'platform', 'Customer Support', 'ग्राहक सहायता',
    'Support tickets, complaints and dispute tracking in English and Nepali.',
    'अंग्रेजी र नेपालीमा सहायता टिकट, गुनासो तथा विवाद ट्र्याकिङ।', false),
];

export function findCategory(code: string): ServiceCategory | undefined {
  return SERVICE_CATEGORIES.find((category) => category.code === code);
}
