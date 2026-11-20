/**
 * UZUM MARKET CLONE - PRODUCT DATABASE
 * Contains 34+ realistic products across all core marketplace categories.
 */

const PRODUCTS = [
  {
    id: 1,
    title: "Smartfon Apple iPhone 15 Pro Max 256GB Natural Titanium",
    category: "elektronika",
    categoryName: "Elektronika",
    price: 15499000,
    oldPrice: 17800000,
    discount: "-13%",
    rating: 4.9,
    reviews: 428,
    image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=600&q=80",
    additionalImages: [
      "https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?auto=format&fit=crop&w=600&q=80"
    ],
    description: "Apple iPhone 15 Pro Max – innovatsion titan korpus, kuchli A17 Pro chipi va professional darajadagi 48 MP kamera tizimiga ega eng mukammal smartfon. 5x optik yaqinlashtirish, Action Button va Super Retina XDR OLED displey bilan.",
    installmentPrice: "1 291 000 so'm/oy",
    installmentMonths: 12,
    popularity: 99,
    badge: "Katta savdo",
    seller: "Apple Authorised Reseller",
    stock: 24,
    specs: {
      "Xotira": "256 GB",
      "Ekran o'lchami": "6.7 dyuym, Super Retina XDR",
      "Protsessor": "Apple A17 Pro (3 nm)",
      "Asosiy kamera": "48 MP + 12 MP + 12 MP (5x zoom)",
      "Batareya": "4422 mA/soat",
      "Kafolat": "1 yil rasmiy Apple kafolati"
    }
  },
  {
    id: 2,
    title: "Simsiz quloqchinlar Apple AirPods Pro 2 MagSafe USB-C",
    category: "elektronika",
    categoryName: "Elektronika",
    price: 2790000,
    oldPrice: 3400000,
    discount: "-18%",
    rating: 4.9,
    reviews: 612,
    image: "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?auto=format&fit=crop&w=600&q=80",
    additionalImages: [
      "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?auto=format&fit=crop&w=600&q=80"
    ],
    description: "Faol shovqinni bekor qilish (ANC) funksiyasi 2 baravar kuchaytirilgan AirPods Pro 2. Shaffoflik rejimi, fazoviy audio va USB-C zaryadlash qutisi bilan.",
    installmentPrice: "232 500 so'm/oy",
    installmentMonths: 12,
    popularity: 96,
    badge: "Xit savdo",
    seller: "iStore Official",
    stock: 58,
    specs: {
      "Turi": "TWS quloqchinlar",
      "Ulanish": "Bluetooth 5.3",
      "Shovqin bekor qilish": "Faol (ANC) + Adaptiv audio",
      "Ishlash vaqti": "30 soatgacha korpus bilan",
      "Suvdan himoya": "IP54"
    }
  },
  {
    id: 3,
    title: "Smartfon Samsung Galaxy S24 Ultra 12/512GB Titanium Gray",
    category: "elektronika",
    categoryName: "Elektronika",
    price: 13990000,
    oldPrice: 16200000,
    discount: "-14%",
    rating: 4.8,
    reviews: 215,
    image: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?auto=format&fit=crop&w=600&q=80",
    additionalImages: [
      "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?auto=format&fit=crop&w=600&q=80"
    ],
    description: "Galaxy AI imkoniyatlari bilan boyitilgan Samsung Galaxy S24 Ultra. 200 MP kamera, o'rnatilgan S Pen qalami va yorqin Dynamic AMOLED 2X ekranga ega flagman.",
    installmentPrice: "1 165 000 so'm/oy",
    installmentMonths: 12,
    popularity: 92,
    badge: "Yangi",
    seller: "Samsung Official Partner",
    stock: 18,
    specs: {
      "Operativ xotira": "12 GB",
      "Doimiy xotira": "512 GB",
      "Ekran": "6.8 dyuym QHD+ 120Hz",
      "Kamera": "200 MP + 50 MP + 12 MP + 10 MP",
      "Batareya": "5000 mA/soat, 45W tezkor zaryad"
    }
  },
  {
    id: 4,
    title: "Aqlli soat Apple Watch Series 9 GPS 45mm Midnight Aluminum",
    category: "elektronika",
    categoryName: "Elektronika",
    price: 4690000,
    oldPrice: 5300000,
    discount: "-12%",
    rating: 4.9,
    reviews: 189,
    image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=600&q=80",
    additionalImages: [
      "https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=600&q=80"
    ],
    description: "S9 SiP chipiga ega eng yangi Apple Watch. Yorqinroq Always-On Retina displey, yangi Double Tap boshqaruvi va sog'liq ko'rsatkichlarini chuqur kuzatish imkoniyati.",
    installmentPrice: "390 000 so'm/oy",
    installmentMonths: 12,
    popularity: 88,
    badge: "Tavsiya",
    seller: "iStore Official",
    stock: 30,
    specs: {
      "Korpus": "45 mm alyuminiy",
      "Datchiklar": "EKG, Kislorod miqdori, Harorat datchigi",
      "Suv o'tkazmaslik": "50 metr chuqurlikgacha",
      "Moslik": "iOS 17 va undan yuqori"
    }
  },
  {
    id: 5,
    title: "Robot changyutgich Xiaomi Robot Vacuum S10 Oq",
    category: "maishiy-texnika",
    categoryName: "Maishiy texnika",
    price: 2390000,
    oldPrice: 2990000,
    discount: "-20%",
    rating: 4.8,
    reviews: 340,
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80",
    additionalImages: [
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80"
    ],
    description: "LDS lazerli navigatsiya va 4000 Pa quvvatli so'rish kuchi bilan jihozlangan Xiaomi robot changyutgichi. Quruq va nam tozalash funksiyalarini mukammal bajaradi.",
    installmentPrice: "199 000 so'm/oy",
    installmentMonths: 12,
    popularity: 95,
    badge: "Katta savdo",
    seller: "Mi Store Uzbekistan",
    stock: 42,
    specs: {
      "So'rish kuchi": "4000 Pa",
      "Tozalash turi": "Quruq va nam tozalash",
      "Batareya": "3200 mA/soat, 130 daqiqa uzluksiz",
      "Xaritani tuzish": "LDS Lidar lazer"
    }
  },
  {
    id: 6,
    title: "Aerogrill Xiaomi Smart Air Fryer Pro 4L yog'siz pishirgich",
    category: "maishiy-texnika",
    categoryName: "Maishiy texnika",
    price: 990000,
    oldPrice: 1350000,
    discount: "-27%",
    rating: 4.9,
    reviews: 520,
    image: "https://images.unsplash.com/photo-1585515320310-259814833e62?auto=format&fit=crop&w=600&q=80",
    additionalImages: [
      "https://images.unsplash.com/photo-1585515320310-259814833e62?auto=format&fit=crop&w=600&q=80"
    ],
    description: "Sog'lom va mazali taomlar uchun yog'siz issiq havo bilan pishirish moslamasi. Shisha oynali qopqoq, OLED displey va 100 dan ortiq retseptlar bilan.",
    installmentPrice: "82 500 so'm/oy",
    installmentMonths: 12,
    popularity: 98,
    badge: "Xit savdo",
    seller: "Mi Store Uzbekistan",
    stock: 75,
    specs: {
      "Hajmi": "4 litr",
      "Quvvati": "1600 Vt",
      "Harorat diapazoni": "40°C - 200°C",
      "Boshqaruv": "OLED ekran + Mi Home ilovasi"
    }
  },
  {
    id: 7,
    title: "Elektr choynak Bosch TWK3A014 1.7L Qizil",
    category: "maishiy-texnika",
    categoryName: "Maishiy texnika",
    price: 389000,
    oldPrice: 490000,
    discount: "-21%",
    rating: 4.7,
    reviews: 180,
    image: "https://images.unsplash.com/photo-1594213114663-ddf4f24cf372?auto=format&fit=crop&w=600&q=80",
    additionalImages: [
      "https://images.unsplash.com/photo-1594213114663-ddf4f24cf372?auto=format&fit=crop&w=600&q=80"
    ],
    description: "Germaniya brendidan sifatli va ishonchli elektr choynak. Qizib ketishdan himoya, avtomatik o'chish va qulay ochiladigan qopqoq.",
    installmentPrice: "32 400 so'm/oy",
    installmentMonths: 12,
    popularity: 84,
    badge: "Aksiya",
    seller: "Bosch Home",
    stock: 65,
    specs: {
      "Hajmi": "1.7 litr",
      "Quvvati": "2400 Vt",
      "Filtr": "Zanglamas po'latdan qoplama",
      "Xavfsizlik": "Suvsiz yoqilganda avto-o'chish"
    }
  },
  {
    id: 8,
    title: "Fen Dyson Supersonic HD08 Nikel/Mis rangli",
    category: "gozallik",
    categoryName: "Goʻzallik va parvarish",
    price: 4990000,
    oldPrice: 5800000,
    discount: "-14%",
    rating: 5.0,
    reviews: 310,
    image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=600&q=80",
    additionalImages: [
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=600&q=80"
    ],
    description: "Soch salomatligini saqlab qoluvchi intellektual issiqlik nazoratiga ega afsonaviy Dyson feni. 5 xil magnitli nozul to'plamda mavjud.",
    installmentPrice: "415 800 so'm/oy",
    installmentMonths: 12,
    popularity: 97,
    badge: "Katta savdo",
    seller: "Dyson Premium Shop",
    stock: 19,
    specs: {
      "Dvigatel": "Dyson V9 raqamli motor",
      "Nozullar soni": "5 ta magnitli nozul",
      "Tezlik rejimlari": "3 ta havo oqimi, 4 ta issiqlik darajasi",
      "Og'irligi": "659 g"
    }
  },
  {
    id: 9,
    title: "Erkaklar krossovkasi Nike Air Monarch IV Qora/Oq",
    category: "poyabzal",
    categoryName: "Poyabzal",
    price: 699000,
    oldPrice: 950000,
    discount: "-26%",
    rating: 4.8,
    reviews: 432,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80",
    additionalImages: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80"
    ],
    description: "Kundalik yurish va mashg'ulotlar uchun juda qulay Nike Air amortizatsiyali krossovka. Yuqori sifatli tabiiy charm va bardoshli taglik.",
    installmentPrice: "58 250 so'm/oy",
    installmentMonths: 12,
    popularity: 94,
    badge: "Xit savdo",
    seller: "SportStyle Official",
    stock: 52,
    specs: {
      "O'lchamlar": "40 - 45",
      "Material": "Tabiiy va sintetik charm",
      "Amortizatsiya": "To'liq uzunlikdagi Nike Air havo yostig'i",
      "Mavsum": "Demisezon / Yoz"
    }
  },
  {
    id: 10,
    title: "Erkaklar qishki issiq kurtkasi Puffer Jacket Qora",
    category: "kiyim",
    categoryName: "Kiyim",
    price: 499000,
    oldPrice: 790000,
    discount: "-37%",
    rating: 4.7,
    reviews: 145,
    image: "https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=600&q=80",
    additionalImages: [
      "https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=600&q=80"
    ],
    description: "Sovuq shamol va yomg'irdan himoya qiluvchi suv o'tkazmaydigan matoli zamonaviy erkaklar qishki kurtkasi. Yengil va yuqori darajada issiq saqlovchi holofayber to'ldirgich.",
    installmentPrice: "41 500 so'm/oy",
    installmentMonths: 12,
    popularity: 87,
    badge: "Aksiya",
    seller: "Urban Wear",
    stock: 35,
    specs: {
      "O'lchamlar": "M, L, XL, 2XL",
      "Tashqi mato": "Suv o'tkazmaydigan poliester",
      "To'ldirgich": "Biotolaf (eko-pat)",
      "Kapushon": "Yechilmaydigan, chuqur"
    }
  },
  {
    id: 11,
    title: "Oversize Hoodie xudi paxtali uniseks Kulrang",
    category: "kiyim",
    categoryName: "Kiyim",
    price: 189000,
    oldPrice: 280000,
    discount: "-32%",
    rating: 4.9,
    reviews: 820,
    image: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=600&q=80",
    additionalImages: [
      "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=600&q=80"
    ],
    description: "100% tabiiy paxtadan tayyorlangan zich va yumshoq xudi. Ichki qismi qalin naches bilan, shaklini yo'qotmaydi va tivit chiqarmaydi.",
    installmentPrice: "15 750 so'm/oy",
    installmentMonths: 12,
    popularity: 99,
    badge: "Xit savdo",
    seller: "Cotton Valley",
    stock: 120,
    specs: {
      "Tarkibi": "80% Paxta, 20% Poliester",
      "O'lchamlar": "S, M, L, XL, XXL",
      "Fason": "Oversize erkin bichim",
      "Mavsum": "Kuz / Qish / Bahor"
    }
  },
  {
    id: 12,
    title: "Erkaklar klassik jinsi shimi Slim Fit Moviy",
    category: "kiyim",
    categoryName: "Kiyim",
    price: 249000,
    oldPrice: 360000,
    discount: "-31%",
    rating: 4.8,
    reviews: 290,
    image: "https://images.unsplash.com/photo-1542272604-780c96856592?auto=format&fit=crop&w=600&q=80",
    additionalImages: [
      "https://images.unsplash.com/photo-1542272604-780c96856592?auto=format&fit=crop&w=600&q=80"
    ],
    description: "Qulay cho'ziluvchan denim matosidan tikilgan erkaklar jinsi shimi. Qulay o'tirish va zamonaviy uslub.",
    installmentPrice: "20 750 so'm/oy",
    installmentMonths: 12,
    popularity: 83,
    badge: "Tavsiya",
    seller: "Denim Co.",
    stock: 45,
    specs: {
      "Material": "98% paxta, 2% elastan",
      "O'lcham": "30, 31, 32, 33, 34, 36",
      "Qo'nish": "O'rta qulay bel",
      "Rangi": "Klassik ko'k"
    }
  },
  {
    id: 13,
    title: "Ayollar sport poyabzali oq krossovka Chunky Sneakers",
    category: "poyabzal",
    categoryName: "Poyabzal",
    price: 289000,
    oldPrice: 420000,
    discount: "-31%",
    rating: 4.9,
    reviews: 380,
    image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=600&q=80",
    additionalImages: [
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=600&q=80"
    ],
    description: "Baland va yengil taglikka ega zamonaviy ayollar krossovkasi. Har qanday libos bilan ajoyib uyg'unlashadi, kun bo'yi qulaylik beradi.",
    installmentPrice: "24 080 so'm/oy",
    installmentMonths: 12,
    popularity: 91,
    badge: "Katta savdo",
    seller: "Lady Shoes Tashkent",
    stock: 60,
    specs: {
      "O'lcham": "36 - 40",
      "Taglik": "Yengil EVA ko'pik",
      "Tepasi": "Eko charm va to'rli nafas oluvchi mato",
      "Rangi": "Oppoq"
    }
  },
  {
    id: 14,
    title: "Parfyumeriya suvi Chanel Coco Mademoiselle 100ml",
    category: "gozallik",
    categoryName: "Goʻzallik va parvarish",
    price: 1890000,
    oldPrice: 2350000,
    discount: "-20%",
    rating: 5.0,
    reviews: 178,
    image: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=600&q=80",
    additionalImages: [
      "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=600&q=80"
    ],
    description: "Fransuz parfyumeriyasining klassik durdonasi. Apelsin, bergamot, atirgul va paçuli notalari bilan nozik va jozibador ifor.",
    installmentPrice: "157 500 so'm/oy",
    installmentMonths: 12,
    popularity: 93,
    badge: "Xit savdo",
    seller: "Parfum Gallery",
    stock: 14,
    specs: {
      "Hajmi": "100 ml",
      "Ifor turi": "Sharqona, gulli",
      "Ishlab chiqarilgan": "Fransiya",
      "Chidamliligi": "24 soatgacha"
    }
  },
  {
    id: 15,
    title: "Zanglamas po'latdan qozon va tovalar to'plami 12 bo'lakli",
    category: "uy-rozgor",
    categoryName: "Uy-roʻzgʻor buyumlari",
    price: 649000,
    oldPrice: 890000,
    discount: "-27%",
    rating: 4.8,
    reviews: 260,
    image: "https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&w=600&q=80",
    additionalImages: [
      "https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&w=600&q=80"
    ],
    description: "Har qanday turdagi plitalarga (shu jumladan induksion) mos keluvchi mustahkam qozonlar to'plami. Issiqlikka chidamli shisha qopqoqlar va zanglamas po'lat dastalar.",
    installmentPrice: "54 000 so'm/oy",
    installmentMonths: 12,
    popularity: 89,
    badge: "Katta savdo",
    seller: "Home Comfort",
    stock: 33,
    specs: {
      "Tarkibi": "4 ta qozon, 1 ta tova, 1 ta kovsh va qopqoqlar",
      "Material": "Oziq-ovqat zanglamas po'lati 18/10",
      "Moslik": "Gaz, elektr, induksiya",
      "Idish yuvish mashinasi": "Mumkin"
    }
  },
  {
    id: 16,
    title: "Ortopedik xotirali yostiq Memory Foam ergonomik",
    category: "uy-rozgor",
    categoryName: "Uy-roʻzgʻor buyumlari",
    price: 159000,
    oldPrice: 240000,
    discount: "-34%",
    rating: 4.9,
    reviews: 730,
    image: "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=600&q=80",
    additionalImages: [
      "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=600&q=80"
    ],
    description: "Bo'yin va umurtqa pog'onasi mushaklarini to'g'ri ushlab turuvchi anatomik yostiq. Qulay uyqu va tetik uyg'onish garovi.",
    installmentPrice: "13 250 so'm/oy",
    installmentMonths: 12,
    popularity: 96,
    badge: "Xit savdo",
    seller: "Sleep Well",
    stock: 90,
    specs: {
      "O'lchami": "50x30 sm",
      "To'ldirgich": "Xotirali Memory Foam ko'pik",
      "Qoplama": "Yechiladigan yuviladigan bambuk g'ilof",
      "Xususiyati": "Gipoallergen"
    }
  },
  {
    id: 17,
    title: "Mashg'ulotlar uchun yoga mati TPE sirpanmaydigan 6mm",
    category: "sport",
    categoryName: "Sport va hordiq",
    price: 149000,
    oldPrice: 210000,
    discount: "-29%",
    rating: 4.8,
    reviews: 320,
    image: "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?auto=format&fit=crop&w=600&q=80",
    additionalImages: [
      "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?auto=format&fit=crop&w=600&q=80"
    ],
    description: "Fitnes, yoga va cho'zilish mashqlari uchun qulay, sirpanmaydigan TPE gilamcha. Tasma bilan birga yetkazib beriladi.",
    installmentPrice: "12 400 so'm/oy",
    installmentMonths: 12,
    popularity: 81,
    badge: "Aksiya",
    seller: "FitPro Store",
    stock: 55,
    specs: {
      "Qalinligi": "6 mm",
      "O'lchami": "183 x 61 sm",
      "Material": "Ekologik toza TPE",
      "Og'irligi": "850 g"
    }
  },
  {
    id: 18,
    title: "Yig'iluvchi gantellar to'plami 20 kg (2x10kg) qutisi bilan",
    category: "sport",
    categoryName: "Sport va hordiq",
    price: 389000,
    oldPrice: 520000,
    discount: "-25%",
    rating: 4.9,
    reviews: 210,
    image: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=600&q=80",
    additionalImages: [
      "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=600&q=80"
    ],
    description: "Uy sharoitida mushaklarni mustahkamlash uchun sozlanuvchi xromlangan gantellar to'plami. Qulay saqlash chamadoni bilan.",
    installmentPrice: "32 400 so'm/oy",
    installmentMonths: 12,
    popularity: 85,
    badge: "Tavsiya",
    seller: "Iron Gym",
    stock: 22,
    specs: {
      "Umumiy og'irligi": "20 kg",
      "Disklar": "Xrom qoplangan po'lat",
      "Dasta": "Rezina qoplamali sirpanmaydigan",
      "To'plam": "2 ta dasta, biriktiruvchi shtanga, qulflar, disklar"
    }
  },
  {
    id: 19,
    title: "Konstruktor LEGO Technic Supercar poyga mashinasi 580 detal",
    category: "bolalar",
    categoryName: "Bolalar mahsulotlari",
    price: 459000,
    oldPrice: 620000,
    discount: "-26%",
    rating: 5.0,
    reviews: 190,
    image: "https://images.unsplash.com/photo-1585366119957-e9730b6d0f60?auto=format&fit=crop&w=600&q=80",
    additionalImages: [
      "https://images.unsplash.com/photo-1585366119957-e9730b6d0f60?auto=format&fit=crop&w=600&q=80"
    ],
    description: "Harakatlanuvchi porshenlar, differensial va ochiladigan eshiklarga ega ajoyib poyga mashinasi modeli. Bolalar va kattalar uchun ajoyib sovg'a.",
    installmentPrice: "38 250 so'm/oy",
    installmentMonths: 12,
    popularity: 91,
    badge: "Xit savdo",
    seller: "Lego World",
    stock: 28,
    specs: {
      "Detallar soni": "580 dona",
      "Tavsiya yoshi": "9 yoshdan yuqori",
      "Material": "Xavfsiz ABS plastik",
      "Model o'lchami": "32x15x9 sm"
    }
  },
  {
    id: 20,
    title: "Yumshoq o'yinchoq Ayiqcha Teddy katta 100 sm Pushti",
    category: "bolalar",
    categoryName: "Bolalar mahsulotlari",
    price: 219000,
    oldPrice: 320000,
    discount: "-32%",
    rating: 4.8,
    reviews: 410,
    image: "https://images.unsplash.com/photo-1559454403-b8fb88521f11?auto=format&fit=crop&w=600&q=80",
    additionalImages: [
      "https://images.unsplash.com/photo-1559454403-b8fb88521f11?auto=format&fit=crop&w=600&q=80"
    ],
    description: "Juda yumshoq, teginish yoqimli bo'lgan ulkan pelush ayiqcha. Bayramlar va tug'ilgan kunlar uchun eng yaxshi sovg'a.",
    installmentPrice: "18 250 so'm/oy",
    installmentMonths: 12,
    popularity: 88,
    badge: "Aksiya",
    seller: "ToyLand",
    stock: 40,
    specs: {
      "Balandligi": "100 sm",
      "To'ldirgich": "Sintepon",
      "Tashqi mato": "Gipoallergen mikroplush",
      "Xavfsizlik": "Sertifikatlangan"
    }
  },
  {
    id: 21,
    title: "Donli qahva Lavazza Qualita Oro 100% Arabica 1000g",
    category: "oziq-ovqat",
    categoryName: "Oziq-ovqat",
    price: 269000,
    oldPrice: 340000,
    discount: "-21%",
    rating: 4.9,
    reviews: 580,
    image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&w=600&q=80",
    additionalImages: [
      "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&w=600&q=80"
    ],
    description: "Italiyaning afsonaviy donli qahvasi. Markaziy va Janubiy Amerika 100% arabika navlaridan tayyorlangan, mevali va gulli iforli o'rta qovurilgan qahva.",
    installmentPrice: "22 400 so'm/oy",
    installmentMonths: 12,
    popularity: 95,
    badge: "Xit savdo",
    seller: "Coffee Import UZ",
    stock: 85,
    specs: {
      "Og'irligi": "1000 g (1 kg)",
      "Navi": "100% Arabika",
      "Qovurilish darajasi": "O'rta (Medium)",
      "Ishlab chiqaruvchi": "Italiya"
    }
  },
  {
    id: 22,
    title: "Belgiya shokoladli konfetlari to'plami Guylian Seashells 250g",
    category: "oziq-ovqat",
    categoryName: "Oziq-ovqat",
    price: 89000,
    oldPrice: 125000,
    discount: "-29%",
    rating: 4.9,
    reviews: 290,
    image: "https://images.unsplash.com/photo-1549007994-cb92caebd54b?auto=format&fit=crop&w=600&q=80",
    additionalImages: [
      "https://images.unsplash.com/photo-1549007994-cb92caebd54b?auto=format&fit=crop&w=600&q=80"
    ],
    description: "Mashhur dengiz qisqichbaqalari shaklidagi nozik praline qiyomli haqiqiy Belgiya shokoladi.",
    installmentPrice: "7 400 so'm/oy",
    installmentMonths: 12,
    popularity: 82,
    badge: "Tavsiya",
    seller: "Sweet Delights",
    stock: 110,
    specs: {
      "Og'irligi": "250 g",
      "Shokolad turi": "Sutli va oq shokolad aralashmasi",
      "Qiyomi": "O'rmon yong'og'i pralinasi",
      "Ishlab chiqarilgan": "Belgiya"
    }
  },
  {
    id: 23,
    title: "Noutbuk Apple MacBook Air 13 M2 8/256GB Midnight",
    category: "elektronika",
    categoryName: "Elektronika",
    price: 12490000,
    oldPrice: 14500000,
    discount: "-14%",
    rating: 5.0,
    reviews: 312,
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=600&q=80",
    additionalImages: [
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=600&q=80"
    ],
    description: "Inqilobiy Apple M2 chipiga ega o'ta yupqa va yengil noutbuk. 18 soatgacha batareya quvvati, Liquid Retina displey va jim ishlovchi ventsiz dizayn.",
    installmentPrice: "1 040 000 so'm/oy",
    installmentMonths: 12,
    popularity: 97,
    badge: "Katta savdo",
    seller: "Apple Authorised Reseller",
    stock: 15,
    specs: {
      "Protsessor": "Apple M2 8-core CPU, 8-core GPU",
      "Xotira": "8 GB Birlashgan xotira, 256 GB SSD",
      "Ekran": "13.6 dyuym Liquid Retina 2560x1664",
      "Vazni": "1.24 kg"
    }
  },
  {
    id: 24,
    title: "Tashqi akkumulyator Powerbank Baseus 20000mAh 65W tezkor quvvatlash",
    category: "elektronika",
    categoryName: "Elektronika",
    price: 489000,
    oldPrice: 650000,
    discount: "-25%",
    rating: 4.8,
    reviews: 450,
    image: "https://images.unsplash.com/photo-1609592426868-d0554ef46ba2?auto=format&fit=crop&w=600&q=80",
    additionalImages: [
      "https://images.unsplash.com/photo-1609592426868-d0554ef46ba2?auto=format&fit=crop&w=600&q=80"
    ],
    description: "Noutbuk, planshet va smartfonlarni bir vaqtning o'zida quvvatlash imkoniyatiga ega 65W PD quvvatli ixcham pauerbank. LED raqamli displey foizni aniq ko'rsatadi.",
    installmentPrice: "40 750 so'm/oy",
    installmentMonths: 12,
    popularity: 93,
    badge: "Xit savdo",
    seller: "Baseus Uzbekistan",
    stock: 67,
    specs: {
      "Sig'imi": "20000 mA/soat",
      "Chiqish quvvati": "65W Max Power Delivery",
      "Portlar": "2x USB-A, 1x USB Type-C, 1x Micro-USB",
      "Korpus": "Metall alyuminiy"
    }
  },
  {
    id: 25,
    title: "Statsionar blender Xiaomi Smart Blender 1000W issiq/sovuq",
    category: "maishiy-texnika",
    categoryName: "Maishiy texnika",
    price: 1190000,
    oldPrice: 1520000,
    discount: "-22%",
    rating: 4.9,
    reviews: 140,
    image: "https://images.unsplash.com/photo-1570222094114-d054a817e56b?auto=format&fit=crop&w=600&q=80",
    additionalImages: [
      "https://images.unsplash.com/photo-1570222094114-d054a817e56b?auto=format&fit=crop&w=600&q=80"
    ],
    description: "Issiq sho'rvalar, smuzilar va muz maydalash uchun mo'ljallangan 8 pichoqli kuchli blender. Borosilikat issiqqa chidamli shisha ko'za bilan.",
    installmentPrice: "99 100 so'm/oy",
    installmentMonths: 12,
    popularity: 86,
    badge: "Aksiya",
    seller: "Mi Store Uzbekistan",
    stock: 31,
    specs: {
      "Quvvati": "1000 Vt motor, 800 Vt isitish",
      "Ko'za hajmi": "1.6 litr sovuq, 1.2 litr issiq",
      "Pichoqlar": "8 tig'li po'lat",
      "Boshqaruv": "OLED buriluvchi tugma"
    }
  },
  {
    id: 26,
    title: "Erkaklar sochi va soqoli uchun trimmer Philips Series 5000",
    category: "gozallik",
    categoryName: "Goʻzallik va parvarish",
    price: 499000,
    oldPrice: 650000,
    discount: "-23%",
    rating: 4.8,
    reviews: 380,
    image: "https://images.unsplash.com/photo-1621607512214-68297480165e?auto=format&fit=crop&w=600&q=80",
    additionalImages: [
      "https://images.unsplash.com/photo-1621607512214-68297480165e?auto=format&fit=crop&w=600&q=80"
    ],
    description: "O'z-o'zini charhlaydigan po'lat pichoqli Philips trimmer. 0.5 dan 10 mm gacha 20 xil aniq uzunlik sozlamasi.",
    installmentPrice: "41 500 so'm/oy",
    installmentMonths: 12,
    popularity: 90,
    badge: "Tavsiya",
    seller: "Philips Official",
    stock: 48,
    specs: {
      "Pichoqlar": "Zanglamas titan po'lat",
      "Batareya": "60 daqiqa uzluksiz",
      "Suvga chidamlilik": "Suv ostida yuviladigan",
      "Kafolat": "2 yil"
    }
  },
  {
    id: 27,
    title: "Yuz terisini chuqur namlantiruvchi krem CeraVe Moisturising Cream 177ml",
    category: "gozallik",
    categoryName: "Goʻzallik va parvarish",
    price: 179000,
    oldPrice: 240000,
    discount: "-25%",
    rating: 4.9,
    reviews: 620,
    image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=600&q=80",
    additionalImages: [
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=600&q=80"
    ],
    description: "3 ta muhim seramidlar va gialuron kislotasi bilan boyitilgan dermatologik krem. Terining himoya to'sig'ini tiklaydi va 24 soat namlantiradi.",
    installmentPrice: "14 900 so'm/oy",
    installmentMonths: 12,
    popularity: 94,
    badge: "Xit savdo",
    seller: "DermaCare",
    stock: 82,
    specs: {
      "Hajmi": "177 ml",
      "Turi": "Yuz va tana uchun",
      "Tarkibi": "Seramidlar 1, 3, 6-II, gialuron kislota",
      "Ifori": "Xidsiz (fragrance-free)"
    }
  },
  {
    id: 28,
    title: "Klassik trench kot ayollar uchun bej rangli palto",
    category: "kiyim",
    categoryName: "Kiyim",
    price: 589000,
    oldPrice: 850000,
    discount: "-31%",
    rating: 4.9,
    reviews: 160,
    image: "https://images.unsplash.com/photo-1539533018447-63fcce667883?auto=format&fit=crop&w=600&q=80",
    additionalImages: [
      "https://images.unsplash.com/photo-1539533018447-63fcce667883?auto=format&fit=crop&w=600&q=80"
    ],
    description: "Bahoiy va kuz mavsumining eng nafis libosi. Ikki qatorli tugmalar, bog'ichli belbog' va suv o'tkazmaydigan zich gabardin matosi.",
    installmentPrice: "49 000 so'm/oy",
    installmentMonths: 12,
    popularity: 89,
    badge: "Katta savdo",
    seller: "Grace Fashion",
    stock: 25,
    specs: {
      "O'lchamlar": "S, M, L, XL",
      "Material": "Paxta va poliester gabardin",
      "Rang": "Klassik bej (qum rang)",
      "Uzunligi": "Midi tizzadan past"
    }
  },
  {
    id: 29,
    title: "Minimalist stol usti LED yoritgichi simsiz zaryadlash bilan",
    category: "uy-rozgor",
    categoryName: "Uy-roʻzgʻor buyumlari",
    price: 289000,
    oldPrice: 390000,
    discount: "-26%",
    rating: 4.8,
    reviews: 210,
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=600&q=80",
    additionalImages: [
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=600&q=80"
    ],
    description: "Ko'zni toliqtirmaydigan yumshoq yorug'lik rejimlariga ega zamonaviy stol chirog'i. Taglik qismida telefonni simsiz quvvatlovchi Qi zaryadlovchi mavjud.",
    installmentPrice: "24 080 so'm/oy",
    installmentMonths: 12,
    popularity: 87,
    badge: "Tavsiya",
    seller: "SmartHome Tech",
    stock: 45,
    specs: {
      "Yorug'lik harorati": "3 rejim: Issiq, Tabiiy, Sovuq oq",
      "Simsiz zaryadlash": "10W Qi tezkor",
      "Yorqinlik darajasi": "Sensorli 5 bosqich",
      "Material": "Alyuminiy va ABS"
    }
  },
  {
    id: 30,
    title: "Shahar ryukzaki noutbuk uchun USB portli Qora",
    category: "sport",
    categoryName: "Sport va hordiq",
    price: 199000,
    oldPrice: 290000,
    discount: "-31%",
    rating: 4.8,
    reviews: 430,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=600&q=80",
    additionalImages: [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=600&q=80"
    ],
    description: "15.6 dyuymgacha bo'lgan noutbuklar uchun xavfsiz himoyalangan bo'lmaga ega ergonomik ryukzak. Suv o'tkazmaydigan Oksford matosi va qulay yelkalar.",
    installmentPrice: "16 580 so'm/oy",
    installmentMonths: 12,
    popularity: 91,
    badge: "Xit savdo",
    seller: "PackMaster",
    stock: 70,
    specs: {
      "Hajmi": "25 litr",
      "Noutbuk bo'lmasi": "15.6 dyuymgacha",
      "Xususiyat": "Tashqi USB quvvatlash porti",
      "Mato": "Yirtilmas suv o'tkazmaydigan Oksford"
    }
  },
  {
    id: 31,
    title: "Termos zanglamas po'latdan harorat datchikli 500ml",
    category: "sport",
    categoryName: "Sport va hordiq",
    price: 89000,
    oldPrice: 130000,
    discount: "-32%",
    rating: 4.7,
    reviews: 550,
    image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=600&q=80",
    additionalImages: [
      "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=600&q=80"
    ],
    description: "Qopqog'ida sensorli LED harorat ko'rsatkichi bo'lgan zamonaviy termos. Ichimlik issiqligini 12 soat, sovuqligini 24 soat saqlaydi.",
    installmentPrice: "7 400 so'm/oy",
    installmentMonths: 12,
    popularity: 84,
    badge: "Aksiya",
    seller: "ThermoStyle",
    stock: 120,
    specs: {
      "Hajmi": "500 ml",
      "Material": "Oziq-ovqat po'lati SUS 304",
      "Displey": "Sensorli LED ekran",
      "Harorat saqlash": "12-24 soat"
    }
  },
  {
    id: 32,
    title: "Bolalar uchun yorug'likli rasm chizish plansheti LCD 8.5 dyuym",
    category: "bolalar",
    categoryName: "Bolalar mahsulotlari",
    price: 69000,
    oldPrice: 110000,
    discount: "-37%",
    rating: 4.8,
    reviews: 690,
    image: "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=600&q=80",
    additionalImages: [
      "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=600&q=80"
    ],
    description: "Bolajonlar tasavvurini rivojlantiruvchi elektron chizish plansheti. Bir tugma bilan tozalash funksiyasi, stilus qalam to'plamda.",
    installmentPrice: "5 750 so'm/oy",
    installmentMonths: 12,
    popularity: 90,
    badge: "Xit savdo",
    seller: "Kids Fun",
    stock: 140,
    specs: {
      "Ekran": "8.5 dyuym rangli LCD",
      "Batareya": "CR2025 (1 yilgacha yetadi)",
      "Og'irligi": "110 g",
      "Xavfsizlik": "Nurlanishsiz ko'zga zararsiz"
    }
  },
  {
    id: 33,
    title: "Premium paxtali 2 kishilik o'rin-ko'rpa to'shak jildi to'plami",
    category: "uy-rozgor",
    categoryName: "Uy-roʻzgʻor buyumlari",
    price: 389000,
    oldPrice: 550000,
    discount: "-29%",
    rating: 4.9,
    reviews: 310,
    image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=600&q=80",
    additionalImages: [
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=600&q=80"
    ],
    description: "100% tabiiy satin paxtasidan to'qilgan hashamatli yotoq to'plami. Yuvilganda o'z rangini va ipakdek yumshoqligini yo'qotmaydi.",
    installmentPrice: "32 400 so'm/oy",
    installmentMonths: 12,
    popularity: 88,
    badge: "Katta savdo",
    seller: "Textile Home",
    stock: 38,
    specs: {
      "Mato": "100% Satin paxta",
      "To'plam": "Ko'rpa jildi (200x220), choyshab (220x240), 2 ta yostiq jildi (50x70)",
      "Mavsum": "To'rt fasl",
      "Gipoallergen": "Ha"
    }
  },
  {
    id: 34,
    title: "Aqlli televizor Xiaomi TV A2 43 dyuym 4K UHD Smart Android TV",
    category: "elektronika",
    categoryName: "Elektronika",
    price: 3690000,
    oldPrice: 4400000,
    discount: "-16%",
    rating: 4.9,
    reviews: 245,
    image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&w=600&q=80",
    additionalImages: [
      "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&w=600&q=80"
    ],
    description: "Frameless ramkasiz metall dizayn, 4K Ultra HD yorqin tasvir va Dolby Audio ovoz tizimiga ega aqlli televizor. Google TV va ovozli qidiruv pulti bilan.",
    installmentPrice: "307 500 so'm/oy",
    installmentMonths: 12,
    popularity: 96,
    badge: "Katta savdo",
    seller: "Mi Store Uzbekistan",
    stock: 16,
    specs: {
      "Ekran": "43 dyuym 4K UHD (3840 x 2160)",
      "Operatsion tizim": "Android TV / Google TV",
      "Ovoz": "2x 12W Dolby Audio, DTS-HD",
      "Portlar": "3x HDMI, 2x USB, Wi-Fi 5GHz, Bluetooth 5.0"
    }
  }
];

/**
 * Currency and Number Formatting Helpers
 */
function formatPrice(amount) {
  if (typeof amount !== 'number') return amount;
  return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + " so'm";
}

function calculateInstallment(price, months = 12) {
  const perMonth = Math.round(price / months);
  return formatPrice(perMonth) + "/oy";
}

/**
 * Filter and query functions
 */
function getProductById(id) {
  return PRODUCTS.find(p => p.id === parseInt(id));
}

function getProductsByCategory(category) {
  if (!category || category === 'all') return PRODUCTS;
  return PRODUCTS.filter(p => p.category === category);
}

function getPopularProducts(limit = 10) {
  return [...PRODUCTS].sort((a, b) => b.popularity - a.popularity).slice(0, limit);
}

function getDiscountedProducts(limit = 10) {
  return PRODUCTS.filter(p => parseInt(p.discount) <= -20).slice(0, limit);
}

function getNewProducts(limit = 10) {
  return PRODUCTS.filter(p => p.badge === "Yangi" || p.id > 20).slice(0, limit);
}

function getRecommendedProducts(limit = 10) {
  return PRODUCTS.filter(p => p.rating >= 4.8).slice(0, limit);
}
