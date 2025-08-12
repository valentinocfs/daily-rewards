/**
 * PARAM YANG DIPERLUKAN :
 * ?ocid=windirect => on dekstop
 * ?ocid=hpmsn     => on mobile
 * 
 * ?cvid={random-generate-id}
 * ?ei={number-that-increased-2-after-new-tab}
 */

const news_bank = [
  "africa/top-stories/african-union-expresses-deep-grief-following-tragic-helicopter-crash-in-ghana/ar-AA1K3dpE", 
  "africa/top-stories/gerd-powering-a-nation-inspiring-a-continent/ar-AA1JjESR",
  "asia/pakistan/openai-unveils-powerful-free-ai-models-for-developers/ar-AA1JZWhg",
  "id-id/berita/other/indonesia-kiwari-dari-jejak-yang-tertinggal/ar-AA1JS3CY", 
  "id-id/berita/other/7-tempat-wisata-indah-di-turkiye-ada-cappadocia/ar-AA1tU9lL",
  "lifestyle/shopping/samsung-chips-away-at-apple-s-us-lead-with-mass-market-ai-phones/ar-AA1JQSXW", 
  "lifestyle/other/the-world-s-most-lavish-palaces-you-can-actually-visit/ss-AA1rgiWm",
  "money/other/hanoi-metro-triples-profit-in-h1/ar-AA1K3Mh3", 
  "news/other/i-m-a-travel-agent-this-is-the-first-thing-i-do-on-entering-a-hotel-room-and-it-s-not-unpacking/ar-AA1HVQty",
  "news/other/cork-or-galway-which-city-besides-dublin-should-you-visit-in-ireland/ar-AA1I3fOZ", 
  "news/other/russian-missile-and-drone-strikes-injure-at-least-18-across-ukraine/ar-AA1JOvQr", 
  "news/other/what-is-acute-myocardial-infarction-ozzy-osbourne-s-cause-of-death-explained-as-death-certificate-is-released/ar-AA1K0neJ", 
  "news/other/ukraine-updates-trump-says-likely-to-meet-putin-very-soon/ar-AA1JZMtG", 
  "news/other/lost-to-history-countries-that-no-longer-exist/ss-AA1zF5kh", 
  "news/other/starting-a-garden-try-these-26-budget-friendly-hacks/ss-AA1sYdPw", 
  "news/other/what-us-city-has-the-most-stolen-cars/ss-AA1qLofg", 
  "news/other/walk-japan-s-ancient-travellers-highway-for-historic-post-towns-teahouses-and-mountain-shrines/ar-AA1yZjpo", 
  "news/other/china-unveils-humanoid-robot-with-self-swapping-battery/vi-AA1K2OD8", 
  "news/other/bmw-i5-five-reasons-why-we-love-it-and-five-why-we-don-t/ss-AA1JN2Zy", 
  "news/other/9-best-and-5-worst-things-to-order-at-the-capital-grille/vi-AA1p8X06", 
  "news/other/common-habits-that-negatively-affect-your-mental-health/ss-AA1meYJM", 
  "news/other/what-to-visit-in-havana-7-unmissable-spots-for-an-unforgettable-trip-to-cuba-s-capital/ar-AA1ybw0i", 
  "news/other/5-picturesque-villages-to-visit-in-the-dolomites-all-year-round/ar-AA1wjj6Q", 
  "news/other/some-interesting-junkyard-finds-at-collins-auto-salvage-in-auburn-georgia/ss-AA1EKTAy", 
  "news/other/fes-hotel-stays-up-19-through-may-tourism-data-shows/ar-AA1K2f86", 
  "news/other/what-i-d-do-differently-to-get-hired-faster-if-i-were-a-student-again/ar-AA1ENpbU", 
  "news/other/the-most-fun-countries-in-the-world/ss-AA1K0M0j", 
  "news/other/the-perfect-10-day-road-trip-to-discover-the-italian-island-of-sardinia/ar-AA1ujigO",
  "news/other/students-create-robot-that-solves-rubik-s-cube-faster-than-a-blink-of-an-eye/vi-AA1F4qKv",
  "news/other/this-invention-spelled-the-end-for-evs-first-golden-age/ar-AA1r49Hq",
  "news/other/dedicated-motorcycle-lanes-sound-great-but-only-if-they-re-well-thought-out/ar-AA1uRfSe",
  "news/other/the-best-war-movies-on-netflix/ss-AA1H0nap",
  "news/other/underwater-city-discovered-near-resting-place-of-noah-s-ark-rewrites-bible-story/ar-AA1K1QDl",
  "news/other/tv-theme-songs-that-made-it-onto-the-charts/ss-BB1nOw1V",
  "news/other/choosing-the-right-college-major-in-us-what-every-international-student-s-parent-should-know/ar-AA1DlzjL4",
  "news/other/60-seconds-in-okinawa/vi-AA1qzfCw",
  "news/other/explore-ouarzazate-s-souks/ar-AA1tKOTo",
  "news/other/used-tesla-model-s-five-things-we-love-and-five-things-we-loathe/ss-AA1Iu6lc",
  "news/other/zero-starts-delivering-its-most-important-ev-motorcycle-yet/ar-AA1JWL7Q",
  "news/other/debunking-major-misconceptions-about-space/ss-AA1hMQFi",
  "news/other/the-junkyard-gems-of-jim-s-vintage-automotive-idaho/ss-AA1GWq4M",
  "news/other/9-things-to-never-do-on-the-golf-course/vi-AA1rIiE6",
  "news/other/some-interesting-junkyard-finds-at-collins-auto-salvage-in-auburn-georgia/ss-AA1EKTAy",
  "news/other/26-underwater-treasures-that-are-worth-billions/ss-AA1q2WGj",
  "news/other/tanum-s-rock-carvings-unravel-the-mysteries-of-the-bronze-age/ar-AA1xodTm",
  "news/other/19-inventors-you-ve-never-heard-of-who-shaped-the-world/ss-BB1rfp9U",
  "news/other/1993-british-troops-help-evacuate-more-than-2000-refugees-from-srebrenica/vi-AA1HxeeT",
];