export type CaseStudy = {
  slug: string;
  industry: string;
  title: string;
  /** How the client is described while the engagement stays confidential. */
  client: string;
  /**
   * Set this ONLY after the client has agreed in writing to be named. When
   * present it replaces the "Confidential — …" line with the real company.
   */
  namedClient?: { name: string; href?: string };
  /** One line for cards. */
  summary: string;
  challenge: string;
  approach: string;
  outcome: string;
  metrics: { value: string; label: string }[];
  stack: string[];
  /** Google Play listing, when the product is a published Android app. */
  storeUrl?: string;
  /** Public website, when the project is a live WordPress or Shopify site. */
  siteUrl?: string;
};

const play = (id: string) => `https://play.google.com/store/apps/details?id=${id}`;

function androidApp(input: {
  slug: string;
  title: string;
  industry: string;
  id: string;
  summary: string;
  includes: string;
}): CaseStudy {
  const storeUrl = play(input.id);
  return {
    slug: input.slug,
    industry: input.industry,
    title: input.title,
    client: "Published on Google Play",
    namedClient: { name: "Google Play", href: storeUrl },
    summary: input.summary,
    challenge: input.summary,
    approach: input.includes,
    outcome: "The app is published on Google Play.",
    metrics: [],
    stack: ["Android", "Google Play"],
    storeUrl,
  };
}

function webProject(input: {
  slug: string;
  title: string;
  industry: string;
  summary: string;
  approach: string;
  outcome: string;
  stack: string[];
  siteUrl?: string;
}): CaseStudy {
  return {
    slug: input.slug,
    industry: input.industry,
    title: input.title,
    client: input.siteUrl ? "Live website" : "Client website",
    namedClient: input.siteUrl ? { name: input.title, href: input.siteUrl } : undefined,
    summary: input.summary,
    challenge: input.summary,
    approach: input.approach,
    outcome: input.outcome,
    metrics: [],
    stack: input.stack,
    siteUrl: input.siteUrl,
  };
}

/**
 * Shoaib Qureshi's CV, the Fast Video Downloader listing, then the Android
 * apps from Sadaqat Hussain's resume and Ghulam Rasool's project list.
 * Descriptions stay with those sources. No download counts or outcome
 * percentages are invented here.
 */
export const caseStudies: CaseStudy[] = [
  androidApp({
    slug: "mza-speaker-cleaner",
    title: "Speaker Cleaner & Water Eject",
    industry: "Utilities",
    id: "com.mzalogics.speakercleaner",
    summary: "Clears water from the speaker and cleans the sound in one tap.",
    includes: "A speaker cleaner published by mzalogics.",
  }),
  androidApp({
    slug: "doc-converter",
    title: "Doc Converter App",
    industry: "Documents",
    id: "com.professor.doc_converter",
    summary: "Converts PDF files to Word.",
    includes: "A document converter published by mzalogics.",
  }),
  androidApp({
    slug: "arabic-keyboard",
    title: "Arabic Keyboard",
    industry: "Utilities",
    id: "com.mzalogics.arabickeyboards",
    summary: "Arabic typing with keyboard themes and emoji.",
    includes: "An Arabic keyboard published by mzalogics.",
  }),
  androidApp({
    slug: "live-earth-map",
    title: "Live Earth Map: GPS Satellite",
    industry: "Maps",
    id: "liveearth.map.satellite.globe.terrain.gps",
    summary: "Satellite maps, traffic, a compass, famous places, and a world clock.",
    includes: "Search, 3D map views, and a timestamp camera.",
  }),
  webProject({
    slug: "digsup",
    title: "DigsUp",
    industry: "Real estate",
    summary: "Helps people find a home before it is listed on the market.",
    approach: "Search, owner contact, and alerts for homes that are not on the market yet.",
    outcome: "The site is live at digsup.com.",
    stack: ["Web"],
    siteUrl: "https://www.digsup.com/",
  }),
  webProject({
    slug: "real-chemistry",
    title: "Real Chemistry",
    industry: "Healthcare",
    summary: "Healthcare experience group site for brands and patients.",
    approach: "A public site for the company's healthcare work.",
    outcome: "The site is live at realchemistry.com.",
    stack: ["WordPress"],
    siteUrl: "https://www.realchemistry.com/",
  }),
  webProject({
    slug: "unicarriers",
    title: "UniCarriers",
    industry: "Industrial",
    summary: "Forklift and warehouse equipment site.",
    approach: "Product, dealer, and service pages for UniCarriers lifts.",
    outcome: "The site is live at unicarriers.com.",
    stack: ["Web"],
    siteUrl: "https://www.unicarriers.com/en",
  }),
  webProject({
    slug: "logisnext-americas",
    title: "Logisnext Americas",
    industry: "Industrial",
    summary: "Material handling, warehouse automation, and fleet support.",
    approach: "A public site for Logisnext products and services.",
    outcome: "The site is live at logisnextamericas.com.",
    stack: ["Web"],
    siteUrl: "https://www.logisnextamericas.com/",
  }),
  webProject({
    slug: "laugh-factory",
    title: "Laugh Factory",
    industry: "Entertainment",
    summary: "Website for the Laugh Factory comedy clubs.",
    approach: "A public site for shows and club information.",
    outcome: "The site is live at laughfactory.com.",
    stack: ["Web"],
    siteUrl: "https://www.laughfactory.com/",
  }),
  webProject({
    slug: "voice-actor-studio",
    title: "The Voice Actors Studio",
    industry: "Media",
    summary: "Sign-in portal for The Voice Actors Studio.",
    approach: "An account portal for studio members.",
    outcome: "The portal is live at portal.thevoiceactorstudio.com.",
    stack: ["Web"],
    siteUrl: "https://portal.thevoiceactorstudio.com/",
  }),
  webProject({
    slug: "grace-bay-resorts",
    title: "Grace Bay Resorts",
    industry: "Hospitality",
    summary: "Luxury resort site for Grace Bay in Turks and Caicos.",
    approach: "Resort, dining, and booking pages for the Grace Bay properties.",
    outcome: "The site is live at gracebayresorts.com.",
    stack: ["Web"],
    siteUrl: "https://gracebayresorts.com/",
  }),
  webProject({
    slug: "tempura-food-usa",
    title: "Tempura Foods",
    industry: "Food",
    summary: "Frozen and prepared food site for Tempura Foods in Houston.",
    approach: "A product catalog for samosas, spring rolls, and ready meals.",
    outcome: "The site is live at tempurafoodusa.com.",
    stack: ["WordPress"],
    siteUrl: "https://tempurafoodusa.com/",
  }),
  webProject({
    slug: "inro",
    title: "Inrō",
    industry: "Social",
    summary: "Instagram DM automation with an AI agent that replies.",
    approach: "A product site for comment-to-DM flows and an inbox.",
    outcome: "The site is live at inro.social.",
    stack: ["Web"],
    siteUrl: "https://www.inro.social/",
  }),
  webProject({
    slug: "sellio",
    title: "Sellio",
    industry: "Sales",
    summary: "One-time sales coaching built from real call transcripts.",
    approach: "A product page for managers and reps, with a call review and a live coaching session.",
    outcome: "The site is live at sellio.ai.",
    stack: ["Web"],
    siteUrl: "https://sellio.ai/",
  }),
  androidApp({
    slug: "fast-video-downloader",
    title: "Music Video Downloads & Player",
    industry: "Media",
    id: "com.incredible.fastvideodownloader.pro",
    summary: "Video downloader published on Google Play.",
    includes: "A Play Store app for saving videos on the device.",
  }),
  webProject({
    slug: "afzalmart",
    title: "Afzalmart",
    industry: "Shopify",
    summary: "Shopify storefront with a reworked layout, on-page SEO, and a faster load.",
    approach: "Store UI, structured metadata, and speed work on the live shop.",
    outcome: "The store is live at afzalmart.shop.",
    stack: ["Shopify", "Liquid", "SEO"],
    siteUrl: "https://afzalmart.shop/",
  }),
  webProject({
    slug: "ecommerce-data-aggregator",
    title: "E-commerce Data Aggregator",
    industry: "WordPress",
    summary: "Live product and shipping data pulled into a WordPress shop.",
    approach: "Custom PHP and the Apify API sync listings from Amazon, Walmart, and AliExpress.",
    outcome: "Inventory and pricing updates run from the feed instead of by hand.",
    stack: ["WordPress", "PHP", "Apify", "REST API"],
  }),
  webProject({
    slug: "ranoy",
    title: "Ranoy",
    industry: "Shopify",
    summary: "Shopify store for a fashion and apparel brand.",
    approach: "Theme customization, product setup, and checkout for an international store.",
    outcome: "Listed as a Shopify deployment.",
    stack: ["Shopify", "Liquid"],
  }),
  webProject({
    slug: "glore-sense",
    title: "Glore Sense",
    industry: "Shopify",
    summary: "Shopify store for a beauty and lifestyle brand.",
    approach: "Theme customization and product setup for the storefront.",
    outcome: "Listed as a Shopify deployment.",
    stack: ["Shopify", "Liquid"],
  }),
  webProject({
    slug: "caredox",
    title: "Caredox",
    industry: "WordPress",
    summary: "WordPress site for a healthcare client.",
    approach: "A responsive WordPress theme built from the client design.",
    outcome: "Listed as a WordPress deployment.",
    stack: ["WordPress", "PHP"],
  }),
  webProject({
    slug: "ic-legal",
    title: "IC Legal",
    industry: "WordPress",
    summary: "WordPress site for a corporate legal practice.",
    approach: "A responsive WordPress theme built from the client design.",
    outcome: "Listed as a WordPress deployment.",
    stack: ["WordPress", "PHP"],
  }),
  webProject({
    slug: "educon-international",
    title: "Educon International",
    industry: "WordPress",
    summary: "WordPress site for an education consultancy.",
    approach: "A responsive WordPress theme built from the client design.",
    outcome: "Listed as a WordPress deployment.",
    stack: ["WordPress", "PHP"],
  }),
  webProject({
    slug: "dynamic-growth",
    title: "Dynamic Growth",
    industry: "WordPress",
    summary: "WordPress site for a corporate services firm.",
    approach: "A responsive WordPress theme built from the client design.",
    outcome: "Listed as a WordPress deployment.",
    stack: ["WordPress", "PHP"],
  }),
  webProject({
    slug: "agr-marketing-solution",
    title: "AGR Marketing Solution",
    industry: "WordPress",
    summary: "WordPress site for a marketing company.",
    approach: "A responsive WordPress theme built from the client design.",
    outcome: "Listed as a WordPress deployment.",
    stack: ["WordPress", "PHP"],
  }),
  webProject({
    slug: "marqon",
    title: "Marqon",
    industry: "WordPress",
    summary: "WordPress site for a B2B services company.",
    approach: "A responsive WordPress theme built from the client design.",
    outcome: "Listed as a WordPress deployment.",
    stack: ["WordPress", "PHP"],
  }),
  androidApp({
    slug: "picsgen-ai-art-photo-editor",
    title: "PicsGen - AI Art & Photo Editor",
    industry: "AI & photo",
    id: "com.picsgen.ai.art.photo.editor",
    summary: "AI artwork from text prompts and style references.",
    includes: "Touch-ups, masking, and export in more than one format.",
  }),
  androidApp({
    slug: "beauty-cam-ai-generation",
    title: "Beauty Cam & AI Generation",
    industry: "AI & photo",
    id: "ai.photo.video.hdcamera.selfie.beauty.cam",
    summary: "Selfie camera and portrait generation.",
    includes: "Facial landmarks, segmentation, live beauty filters, and AI backgrounds.",
  }),
  androidApp({
    slug: "any-video-downloader",
    title: "Any Video Downloader",
    industry: "Media",
    id: "com.allvideo.downloader.reels",
    summary: "Media downloading with pause and resume.",
    includes: "Foreground downloads and Scoped Storage.",
  }),
  androidApp({
    slug: "data-recovery",
    title: "Data Recovery - Restore Deleted Files",
    industry: "Utilities",
    id: "com.filerecovery.photosrecovery.deletedrestore",
    summary: "Scans storage for deleted images, video, audio, and documents.",
    includes: "Asynchronous indexing and thumbnail caching.",
  }),
  androidApp({
    slug: "ai-voice-changer",
    title: "AI Voice Changer & Sound Effects",
    industry: "Media",
    id: "ai.voice.changer.app",
    summary: "Voice modulation with pitch, reverb, and sharing.",
    includes: "Waveform visualization and audio rendering.",
  }),
  androidApp({
    slug: "caller-screen-ringtone",
    title: "Caller Screen & Ringtone",
    industry: "Utilities",
    id: "com.call.theme.callscreen.ringtone",
    summary: "Incoming-call themes and ringtones.",
    includes: "Animated accept and decline buttons, and flash alerts.",
  }),
  androidApp({
    slug: "ai-tattoo-generator",
    title: "AI Tattoo Generator - Tattoome",
    industry: "AI & photo",
    id: "tattoome.ai.tattoogenerator",
    summary: "Generates and previews tattoos.",
    includes: "Subject segmentation, body-contour blending, and live AR.",
  }),
  androidApp({
    slug: "wallbox-live-wallpapers",
    title: "WallBox HD Live Wallpapers 4k",
    industry: "Media",
    id: "com.wallbox.wallpaper.live",
    summary: "HD and 4K wallpaper collections with live backgrounds.",
    includes: "Category browsing and home and lock-screen wallpapers.",
  }),
  androidApp({
    slug: "translate-all",
    title: "Translate All: Voice & Photo",
    industry: "Utilities",
    id: "com.tfl.alllanguagestranslator.text.voice.fasttranslation.camera",
    summary: "Translation from text, voice, and photos.",
    includes: "Voice input and photo translation.",
  }),
  androidApp({
    slug: "pixnova-ai-photo-editor",
    title: "PixNova: AI Art & Photo Editor",
    industry: "AI & photo",
    id: "ai.art.generated.bgremover.enhancer.photo.editor",
    summary: "AI artwork, photo enhancement, and background removal.",
    includes: "Portrait retouching and creative filters.",
  }),
  androidApp({
    slug: "aspireai-art-video-generator",
    title: "AspireAi Art & Video Generator",
    industry: "AI & photo",
    id: "com.aspire.ai.photo.video.hub",
    summary: "AI image, video, and text creation.",
    includes: "Social sharing, credits, and creator competitions.",
  }),
  androidApp({
    slug: "clap-to-find-phone",
    title: "Clap to Find Phone - Klapit",
    industry: "Utilities",
    id: "claptofind.findmyphone.app",
    summary: "Finds a phone by clap or whistle.",
    includes: "Flash alerts, alarm sounds, and an unplug alert.",
  }),
  androidApp({
    slug: "goqr-code-scanner",
    title: "goQR Code Scanner & Creator",
    industry: "Utilities",
    id: "com.xilli.qrscanner.app",
    summary: "Scans and creates QR codes and barcodes.",
    includes: "Gallery scans, scan history, and Drive backup.",
  }),
  androidApp({
    slug: "zmplayer-hd-video-player",
    title: "ZMPlayer: HD Video Player",
    industry: "Media",
    id: "com.hd.video.player.allformats.mediaplayer",
    summary: "HD and 4K video playback.",
    includes: "Downloading, music, video cutting, Chromecast, and subtitles.",
  }),
  androidApp({
    slug: "all-video-player",
    title: "All Video Player Media Player",
    industry: "Media",
    id: "com.bpva.video.player.free",
    summary: "HD media player with music and casting.",
    includes: "4K playback, music, video cutting, and casting.",
  }),
  androidApp({
    slug: "snaptune-ai-photo-editor",
    title: "Snaptune AI Photo Editor",
    industry: "AI & photo",
    id: "com.snaptune.ai.photoeditor.collagemaker",
    summary: "AI enhancement, background erase, and collages.",
    includes: "Frames and creative photo effects.",
  }),
  androidApp({
    slug: "fire-text-photo-frame",
    title: "Fire Text Photo Frame App",
    industry: "Photo",
    id: "com.bpva.firetext.photoframes.photoeffects",
    summary: "Name art, photo frames, and editing effects.",
    includes: "Stickers and photo effects.",
  }),
  androidApp({
    slug: "all-document-reader",
    title: "All Document Reader & Scanner",
    industry: "Documents",
    id: "com.documentreader.documentscanner.pdfreader",
    summary: "Opens documents and scans IDs.",
    includes: "PDF, Excel, and PowerPoint viewing, plus document and ID scanning.",
  }),
  androidApp({
    slug: "pdf-scanner-reader",
    title: "PDF Scanner & PDF Reader App",
    industry: "Documents",
    id: "com.camscanner.pdfscanner.pdfconverter.imagetopdf.pdfeditor.pdfreader",
    summary: "Scans documents and builds PDFs.",
    includes: "Cropping, JPG-to-PDF conversion, and sharing.",
  }),
  androidApp({
    slug: "bp-tracker-heart-rate",
    title: "BP Tracker: Heart Rate Monitor",
    industry: "Health",
    id: "com.health.apps.fitness.bloodpressure.bloodsugar.aidoctor.heartratemonitor",
    summary: "Logs blood pressure, heart rate, and BMI.",
    includes: "Health metric logging and pill reminders.",
  }),
  androidApp({
    slug: "independence-day-photo-frame",
    title: "Independence Day Photo Frame",
    industry: "Photo",
    id: "com.xilli.android.photoframes.photoeditor",
    summary: "Photo frames and patriotic templates.",
    includes: "Photo editing, stickers, and custom frames.",
  }),
  androidApp({
    slug: "caller-number-locator",
    title: "Caller Number Locator",
    industry: "Utilities",
    id: "com.tas.phone.number.locator",
    summary: "Caller number lookup and location.",
    includes: "Number lookup with a location result.",
  }),
  androidApp({
    slug: "language-translate-app",
    title: "Language Translate App",
    industry: "Utilities",
    id: "com.fl.language.translator.all",
    summary: "Translation across languages.",
    includes: "On-device translation for everyday text.",
  }),
  androidApp({
    slug: "bubble-level",
    title: "Bubble Level - Level Tool",
    industry: "Utilities",
    id: "leveltool.bubblelevel.level.leveler",
    summary: "On-screen spirit level.",
    includes: "A bubble level for lining up surfaces.",
  }),
  androidApp({
    slug: "speaker-cleaner",
    title: "Speaker Cleaner - Water Eject",
    industry: "Utilities",
    id: "com.ant.seaker.cleaner",
    summary: "Clears water from the phone speaker with sound.",
    includes: "A tone played through the speaker to eject water.",
  }),
  androidApp({
    slug: "screen-mirroring-tv",
    title: "Screen Mirroring TV - Miracast",
    industry: "TV & casting",
    id: "com.tas.tv.cast",
    summary: "Casts the phone screen to a TV.",
    includes: "Screen mirroring over Miracast.",
  }),
  androidApp({
    slug: "family-locator",
    title: "Family Locator: Phone Location",
    industry: "Location",
    id: "com.phonelocation.share.familylocator",
    summary: "Location sharing for families.",
    includes: "Shared phone location for a family group.",
  }),
  androidApp({
    slug: "prank-call",
    title: "Prank Call: Fake Video Call",
    industry: "Entertainment",
    id: "com.tas.prank.video.call",
    summary: "Simulated incoming calls and video calls.",
    includes: "Fake voice and video call screens.",
  }),
  androidApp({
    slug: "universal-tv-remote",
    title: "Universal TV Remote Control",
    industry: "TV & casting",
    id: "com.tas.tv.remote.universal",
    summary: "Controls a TV from the phone.",
    includes: "A remote for TVs from the handset.",
  }),
  androidApp({
    slug: "flight-tracker",
    title: "Flight Tracker: Flight Status",
    industry: "Travel",
    id: "com.fl.flight.tracker.flightstatus.flight.radar",
    summary: "Live flight status and tracking.",
    includes: "Flight status and a tracker view.",
  }),
];

export function getCaseStudy(slug: string) {
  return caseStudies.find((study) => study.slug === slug);
}
