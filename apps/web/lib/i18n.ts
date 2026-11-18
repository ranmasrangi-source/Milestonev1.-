import type { LocalizedText } from '@pherinepal/domain';

export const LOCALES = ['en', 'ne'] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = 'en';

export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}

const en = {
  siteName: 'PheriNepal',
  tagline: 'Your Complete Nepal Travel Companion.',
  promise: 'Before You Go. While You Explore. After You Return. PheriNepal Is With You.',
  navPrimary: 'Primary',
  navHome: 'Home',
  navServices: 'Services',
  navPlan: 'Plan a trip',
  navSafety: 'Safety',
  switchLabel: 'नेपाली',
  skipToContent: 'Skip to content',
  heroTitle: 'Plan, book and explore Nepal with one trusted companion.',
  heroBody:
    'Discover destinations, compare services and follow your trip from start to finish. Services open one by one, only when they are verified and ready.',
  ctaBrowse: 'Browse all services',
  ctaPlan: 'Plan a trip',
  ctaPartner: 'Register as a partner',
  searchLabel: 'Search services',
  searchPlaceholder: 'Search trekking, hotels, eSIM',
  searchButton: 'Search',
  locationLabel: 'Location',
  pickLocation: 'Choose a location',
  statusFilterLabel: 'Status',
  allStatuses: 'All statuses',
  applyFilters: 'Apply',
  filterHeading: 'Filter services',
  statusIntro: 'Current status in',
  summaryTitle: 'Status summary',
  groupsTitle: 'All planned services',
  servicesTitle: 'All services',
  servicesIntro:
    'Every planned service is listed here from the start. Its status tells you whether it is open in your chosen location.',
  resultsCount: (n: number) => `${n} ${n === 1 ? 'service' : 'services'} shown`,
  noResultsTitle: 'No matching services',
  noResults: 'No service matches your search. Try another word or clear the filters.',
  learnMore: 'Learn more',
  bookingTitle: 'Booking',
  bookingNotOpen:
    'Booking is not open for this service in this location yet. Booking appears only after verification, approval and testing are complete.',
  bookingOpen: 'Booking is open for this service in this location.',
  informationService: 'This is an information service. There is nothing to book here.',
  expectTitle: 'What this service will offer',
  noFakePrices: 'No prices or availability are shown until a service is verified and open for booking.',
  notOpenBody: 'This service is not open for use in this location yet.',
  partnerRegister: 'Register as partner',
  partnerFormLater: 'The partner registration form opens in a later milestone. No listing is created at this stage.',
  notifyMe: 'Notify Me',
  notifyMeBody:
    'Get a message when this service opens here. You will choose how to be contacted and give consent before anything is stored.',
  notifyMeNote: 'Sign-up opens in the next milestone.',
  breadcrumb: 'Breadcrumb',
  trustTitle: 'How we decide what is open',
  trustBody:
    'A service becomes bookable only when its legal basis, partner verification, insurance and safety requirements, payment arrangements, tested booking logic, operational staffing and two-person approval are all complete.',
  safetyTitle: 'Safety and emergencies',
  safetyBody:
    'Emergency assistance is being prepared. Until a staffed and verified service is in place, please contact local emergency services directly.',
  sampleLabel: 'Development build.',
  sampleNotice: 'Sample data only. Locations and statuses shown here are not launch decisions.',
  footerNote: 'Prototype build. No live bookings, payments or emergency services are active.',
  legalPending: 'Terms, privacy and policy pages will be published after legal review.',
  notFoundTitle: 'Page not found',
  notFoundBody: 'The page you are looking for does not exist.',
  groupLabels: {
    stay: 'Stay',
    adventure: 'Adventures & Trekking',
    travel: 'Travel & Transport',
    connectivity: 'Connectivity & Maps',
    shop: 'Shopping',
    local: 'Local Experiences',
    planning: 'Planning & AI',
    safety: 'Safety',
    community: 'Community & Memories',
    platform: 'Account & Support',
  },
  heroVisualCaption: 'Annapurna & Machhapuchhre Sanctuary · Sample Catalogue Preview',
  heroMetricCategories: '31 Planned Services',
  heroMetricGroups: '10 Ecosystem Pillars',
  heroMetricLocations: '4 Development Regions',
  destinationsEyebrow: 'Regional Service Availability',
  destinationsSubtitle:
    'Select a sample region below to inspect how service readiness and partner onboarding vary by location.',
  destinationDescriptions: {
    kathmandu: 'Historic Newari heritage, valley gateways, connectivity and cultural quarters.',
    pokhara: 'Lakeside stays, Annapurna trailheads, aerial adventure sports and local dining.',
    chitwan: 'Subtropical riverplains, wildlife conservation corridors and community homestays.',
    solukhumbu: 'High-altitude Khumbu trekking routes, mountaineering peaks and licensed guides.',
  },
  groupJumpLabel: 'Jump to service group',
  serviceTypeTransactional: 'Transactional (Booking Gate)',
  serviceTypeInformational: 'Information & Utility',
  readinessStepsTitle: '8-Point Verification & Two-Person Approval Gate',
  readinessSteps: [
    '01. Legal & Regulatory Basis',
    '02. Partner Licence Verification',
    '03. Insurance & Safety Standards',
    '04. Payment & Refund Rules',
    '05. Technical & Booking Testing',
    '06. Operational Staffing',
    '07. Bilingual Customer Support',
    '08. Two-Approver Sign-Off',
  ],
  emergencyNoticeTag: 'Public SOS Dispatch Inactive in Milestone 1',
  footerNavHeading: 'Explore Ecosystem',
  footerGovernanceHeading: 'Governance & Architecture',
};

export type Dict = typeof en;

const ne: Dict = {
  siteName: 'PheriNepal',
  tagline: 'तपाईंको सम्पूर्ण नेपाल यात्रा साथी।',
  promise: 'जानु अघि। घुम्दा। फर्किसकेपछि। PheriNepal तपाईंसँगै छ।',
  navPrimary: 'मुख्य',
  navHome: 'गृहपृष्ठ',
  navServices: 'सेवाहरू',
  navPlan: 'यात्रा योजना',
  navSafety: 'सुरक्षा',
  switchLabel: 'English',
  skipToContent: 'मुख्य सामग्रीमा जानुहोस्',
  heroTitle: 'नेपालको यात्रा एउटै भरपर्दो साथीसँग योजना बनाउनुहोस्, बुक गर्नुहोस् र घुम्नुहोस्।',
  heroBody:
    'गन्तव्य खोज्नुहोस्, सेवाहरू तुलना गर्नुहोस् र सुरुदेखि अन्त्यसम्म आफ्नो यात्रा हेर्नुहोस्। सेवाहरू प्रमाणित र तयार भएपछि मात्र एक-एक गरी खुल्छन्।',
  ctaBrowse: 'सबै सेवाहरू हेर्नुहोस्',
  ctaPlan: 'यात्रा योजना बनाउनुहोस्',
  ctaPartner: 'साझेदारको रूपमा दर्ता गर्नुहोस्',
  searchLabel: 'सेवाहरू खोज्नुहोस्',
  searchPlaceholder: 'ट्रेकिङ, होटल, eSIM खोज्नुहोस्',
  searchButton: 'खोज्नुहोस्',
  locationLabel: 'स्थान',
  pickLocation: 'स्थान छनोट गर्नुहोस्',
  statusFilterLabel: 'स्थिति',
  allStatuses: 'सबै स्थिति',
  applyFilters: 'लागू गर्नुहोस्',
  filterHeading: 'सेवाहरू छान्नुहोस्',
  statusIntro: 'यहाँको हालको स्थिति',
  summaryTitle: 'स्थिति सारांश',
  groupsTitle: 'योजनाबद्ध सबै सेवाहरू',
  servicesTitle: 'सबै सेवाहरू',
  servicesIntro:
    'सुरुदेखि नै यहाँ हरेक योजनाबद्ध सेवा देखाइएको छ। त्यसको स्थितिले तपाईंले छनोट गरेको स्थानमा खुला छ कि छैन भन्ने बताउँछ।',
  resultsCount: (n: number) => `${n} वटा सेवा देखाइँदै`,
  noResultsTitle: 'मिल्ने सेवा भेटिएन',
  noResults: 'तपाईंको खोजसँग मिल्ने कुनै सेवा छैन। अर्को शब्द प्रयास गर्नुहोस् वा फिल्टर हटाउनुहोस्।',
  learnMore: 'थप जानकारी',
  bookingTitle: 'बुकिङ',
  bookingNotOpen:
    'यो स्थानमा यो सेवाको बुकिङ अहिले खुला छैन। प्रमाणीकरण, स्वीकृति र परीक्षण पूरा भएपछि मात्र बुकिङ देखिनेछ।',
  bookingOpen: 'यो स्थानमा यो सेवाको बुकिङ खुला छ।',
  informationService: 'यो सूचना सेवा हो। यहाँ बुक गर्ने केही छैन।',
  expectTitle: 'यो सेवाले के दिनेछ',
  noFakePrices: 'सेवा प्रमाणित भई बुकिङका लागि खुलेपछि मात्र मूल्य वा उपलब्धता देखाइनेछ।',
  notOpenBody: 'यो सेवा यो स्थानमा प्रयोगका लागि अहिले खुलेको छैन।',
  partnerRegister: 'साझेदारको रूपमा दर्ता गर्नुहोस्',
  partnerFormLater: 'साझेदार दर्ता फारम पछिल्लो चरणमा खुल्नेछ। यो चरणमा कुनै सूची सिर्जना गरिँदैन।',
  notifyMe: 'मलाई सूचित गर्नुहोस्',
  notifyMeBody:
    'यो सेवा यहाँ खुल्दा सन्देश पाउनुहोस्। केही पनि भण्डारण गर्नु अघि तपाईंले सम्पर्क गर्ने तरिका छनोट गरी सहमति दिनुहुनेछ।',
  notifyMeNote: 'साइन-अप अर्को चरणमा खुल्नेछ।',
  breadcrumb: 'पथ-चिह्न',
  trustTitle: 'कुन कुरा कहिले खुल्छ भन्ने निर्णय',
  trustBody:
    'सेवा बुक गर्न मिल्नु अघि कानुनी आधार, साझेदार प्रमाणीकरण, बीमा र सुरक्षा आवश्यकता, भुक्तानी व्यवस्था, परीक्षण गरिएको बुकिङ तर्क, सञ्चालन जनशक्ति र दुई-व्यक्ति स्वीकृति सबै पूरा हुनु पर्छ।',
  safetyTitle: 'सुरक्षा र आपतकाल',
  safetyBody:
    'आपतकालीन सहायता तयारी हुँदैछ। कर्मचारी सहित प्रमाणित सेवा सुरु नहुँदासम्म, कृपया स्थानीय आपतकालीन सेवालाई सीधै सम्पर्क गर्नुहोस्।',
  sampleLabel: 'विकास संस्करण।',
  sampleNotice: 'केवल नमूना डेटा। यहाँ देखिने स्थान र स्थिति अन्तिम व्यावसायिक निर्णय होइनन्।',
  footerNote: 'प्रोटोटाइप संस्करण। यहाँ प्रत्यक्ष बुकिङ, भुक्तानी वा आपतकालीन सेवा सक्रिय छैन।',
  legalPending: 'सर्त, गोपनीयता र नीति पृष्ठहरू कानुनी समीक्षापछि प्रकाशित गरिनेछ।',
  notFoundTitle: 'पृष्ठ भेटिएन',
  notFoundBody: 'तपाईंले खोजेको पृष्ठ अवस्थित छैन।',
  groupLabels: {
    stay: 'बसोबास',
    adventure: 'साहसिक यात्रा तथा ट्रेकिङ',
    travel: 'यात्रा र यातायात',
    connectivity: 'जडान तथा नक्सा',
    shop: 'बजार',
    local: 'स्थानीय अनुभव',
    planning: 'योजना तथा AI',
    safety: 'सुरक्षा',
    community: 'समुदाय तथा सम्झना',
    platform: 'खाता र सहायता',
  },
  heroVisualCaption: 'अन्नपूर्ण र माछापुच्छ्रे क्षेत्र · नमूना सेवा सूची',
  heroMetricCategories: '३१ योजनाबद्ध सेवाहरू',
  heroMetricGroups: '१० सेवा समूहहरू',
  heroMetricLocations: '४ नमूना क्षेत्रहरू',
  destinationsEyebrow: 'क्षेत्रीय सेवा उपलब्धता',
  destinationsSubtitle:
    'स्थान अनुसार सेवाको तयारी र साझेदार दर्ता स्थिति हेर्न तलको नमूना क्षेत्र छनोट गर्नुहोस्।',
  destinationDescriptions: {
    kathmandu: 'ऐतिहासिक नेवारी सम्पदा, उपत्यका प्रवेशद्वार, जडान र सांस्कृतिक क्षेत्र।',
    pokhara: 'फेवाताल बसोबास, अन्नपूर्ण पदमार्ग सुरुवात, साहसिक खेल र स्थानीय भान्सा।',
    chitwan: 'तराईका नदीनाला, वन्यजन्तु संरक्षण क्षेत्र र सामुदायिक होमस्टे।',
    solukhumbu: 'उच्च हिमाली खुम्बु पदमार्ग, पर्वतारोहण शिखर र इजाजतपत्रप्राप्त गाइड।',
  },
  groupJumpLabel: 'सेवा समूहमा जानुहोस्',
  serviceTypeTransactional: 'कारोबार सेवा (बुकिङ गेट)',
  serviceTypeInformational: 'सूचना तथा उपयोगी सेवा',
  readinessStepsTitle: '८-बुँदे प्रमाणीकरण र दुई-व्यक्ति स्वीकृति नियम',
  readinessSteps: [
    '01. कानुनी र नियामक आधार',
    '02. साझेदार इजाजतपत्र प्रमाणीकरण',
    '03. बीमा र सुरक्षा मापदण्ड',
    '04. भुक्तानी र फिर्ता नियम',
    '05. प्राविधिक र बुकिङ परीक्षण',
    '06. सञ्चालन जनशक्ति तयारी',
    '07. द्विभाषी ग्राहक सहायता',
    '08. दुई-व्यक्ति अन्तिम स्वीकृति',
  ],
  emergencyNoticeTag: 'Milestone 1 मा सार्वजनिक SOS निष्क्रिय छ',
  footerNavHeading: 'सेवा र मार्गहरू',
  footerGovernanceHeading: 'प्रणाली र पारदर्शिता',
};

const DICTIONARIES: Record<Locale, Dict> = { en, ne };

export function getDict(locale: Locale): Dict {
  return DICTIONARIES[locale];
}

export function localize(text: LocalizedText, locale: Locale): string {
  return text[locale];
}
