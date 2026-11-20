// Generator script to produce 1050+ realistic Uzum Market products
const fs = require('fs');
const path = require('path');

const imagePool = {
  elektronika: [
    "https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1609592426868-d0554ef46ba2?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?auto=format&fit=crop&w=600&q=80"
  ],
  "maishiy-texnika": [
    "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1585515320310-259814833e62?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1594213114663-ddf4f24cf372?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1570222094114-d054a817e56b?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=600&q=80"
  ],
  kiyim: [
    "https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1542272604-780c96856592?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1539533018447-63fcce667883?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=600&q=80"
  ],
  poyabzal: [
    "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=600&q=80"
  ],
  gozallik: [
    "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1621607512214-68297480165e?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=600&q=80"
  ],
  "uy-rozgor": [
    "https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=600&q=80"
  ],
  sport: [
    "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=600&q=80"
  ],
  bolalar: [
    "https://images.unsplash.com/photo-1585366119957-e9730b6d0f60?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1559454403-b8fb88521f11?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?auto=format&fit=crop&w=600&q=80"
  ],
  "oziq-ovqat": [
    "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1549007994-cb92caebd54b?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1579722820308-d74e571900a9?auto=format&fit=crop&w=600&q=80"
  ],
  avtotovarlar: [
    "https://images.unsplash.com/photo-1553440569-bcc63803a83d?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1489824904134-891ab64532f1?auto=format&fit=crop&w=600&q=80"
  ]
};

const categoryDefinitions = [
  {
    category: 'elektronika',
    categoryName: 'Elektronika',
    sellers: ['Apple Authorised Reseller', 'iStore Official', 'Mi Store Uzbekistan', 'Samsung Official Partner', 'TexnoMart Partner', 'Gadget Zone'],
    badges: ['Katta savdo', 'Xit savdo', 'Yangi', 'Tavsiya', null],
    templates: [
      { prefix: 'Smartfon', brands: ['Apple iPhone 15 Pro', 'Apple iPhone 14', 'Samsung Galaxy S24', 'Samsung Galaxy A54', 'Xiaomi Redmi Note 13', 'Xiaomi Poco X6 Pro', 'Honor 90', 'Realme 11 Pro'], models: ['128GB', '256GB', '512GB'], colors: ['Titanium', 'Midnight Black', 'Silver', 'Deep Purple', 'Phantom Gray'], minPrice: 2200000, maxPrice: 17500000 },
      { prefix: 'Simsiz quloqchinlar', brands: ['Apple AirPods Pro 2', 'Apple AirPods 3', 'Samsung Galaxy Buds 2 Pro', 'Sony WF-1000XM5', 'JBL Tune 520BT', 'Xiaomi Redmi Buds 5 Pro', 'Anker Soundcore Life'], models: ['ANC shovqin bekor qiluvchi', 'Bluetooth 5.3', 'Spatial Audio'], colors: ['Oq', 'Qora', 'Moviy', 'Kulrang'], minPrice: 180000, maxPrice: 3200000 },
      { prefix: 'Aqlli soat', brands: ['Apple Watch Series 9', 'Apple Watch Ultra 2', 'Samsung Galaxy Watch 6', 'Xiaomi Watch S3', 'Amazfit GTR 4', 'Huawei Watch GT 4'], models: ['44mm GPS', '45mm', '47mm', 'Sport Edition'], colors: ['Qora', 'Kumush', 'Oltinrang', 'Tungi ko\'k'], minPrice: 350000, maxPrice: 7900000 },
      { prefix: 'Noutbuk', brands: ['Apple MacBook Air 13 M2', 'Apple MacBook Pro 14 M3', 'Lenovo Legion 5', 'Asus TUF Gaming A15', 'HP Pavilion 15', 'Acer Aspire 5'], models: ['16/512GB SSD', '8/256GB SSD', '32GB/1TB RTX 4060'], colors: ['Space Gray', 'Silver', 'Shadow Black', 'Steel Gray'], minPrice: 4200000, maxPrice: 24500000 },
      { prefix: 'Tashqi akkumulyator Powerbank', brands: ['Baseus Bipow', 'Xiaomi Power Bank 3', 'Anker PowerCore', 'Remax Proda', 'Hoco J86'], models: ['10000 mAh', '20000 mAh 65W', '30000 mAh 22.5W', 'MagSafe simsiz'], colors: ['Qora', 'Oq', 'Ko\'k'], minPrice: 99000, maxPrice: 590000 },
      { prefix: 'Aqlli televizor', brands: ['Xiaomi TV A2', 'Samsung Crystal UHD', 'LG 4K UHD', 'Artel Smart TV', 'TCL QLED'], models: ['43 dyuym 4K', '50 dyuym HDR10+', '55 dyuym Google TV', '65 dyuym 120Hz'], colors: ['Qora ramkasiz'], minPrice: 2400000, maxPrice: 11500000 }
    ]
  },
  {
    category: 'maishiy-texnika',
    categoryName: 'Maishiy texnika',
    sellers: ['Mi Store Uzbekistan', 'Bosch Home', 'Samsung Tech', 'Artel Official', 'Philips Domestic', 'Tefal Store'],
    badges: ['Katta savdo', 'Aksiya', 'Xit savdo', 'Tavsiya', null],
    templates: [
      { prefix: 'Robot changyutgich', brands: ['Xiaomi Robot Vacuum S10', 'Roborock Q7 Max', 'Dreame D9 Max', 'Ecovacs Deebot', 'Xiaomi Mijia 3C'], models: ['LDS lazer nam va quruq tozalash', '5000 Pa quvvatli', 'O\'zini tozalovchi stantsiya'], colors: ['Oq', 'Qora'], minPrice: 1690000, maxPrice: 6500000 },
      { prefix: 'Aerogrill', brands: ['Xiaomi Smart Air Fryer Pro', 'Philips Airfryer XL', 'Tefal Easy Fry', 'Gorenje Air Fryer'], models: ['4 litr oynali', '6.5 litr katta oila uchun', '1800W sensorli'], colors: ['Oq', 'Qora'], minPrice: 650000, maxPrice: 1950000 },
      { prefix: 'Elektr choynak', brands: ['Bosch TWK', 'Xiaomi Electric Kettle 2', 'Tefal Express', 'Artel Diamond', 'Polaris Smart'], models: ['1.7L zanglamas po\'lat', '1.5L harorat sozlagichli', '2.0L tez qaynash'], colors: ['Qora', 'Oq', 'Qizil', 'Metall'], minPrice: 160000, maxPrice: 680000 },
      { prefix: 'Statsionar blender', brands: ['Xiaomi Smart Blender', 'Philips ProBlend', 'Bosch VitaPower', 'Braun MultiQuick', 'Tefal Blendforce'], models: ['1000W 8 pichoqli', '1200W muz maydalovchi', 'Ko\'p funksiyali'], colors: ['Oq', 'Kumush', 'Qora'], minPrice: 380000, maxPrice: 1650000 },
      { prefix: 'Dazmol bug\' generatori', brands: ['Philips PerfectCare', 'Tefal Pro Express', 'Braun TexStyle', 'Bosch Sensixx'], models: ['Avtomatik harorat nazorati', '2600W kuchli bug\' zarbasi'], colors: ['Moviy', 'Binafsharang', 'Qora'], minPrice: 290000, maxPrice: 2400000 }
    ]
  },
  {
    category: 'kiyim',
    categoryName: 'Kiyim',
    sellers: ['Cotton Valley', 'Urban Wear', 'Grace Fashion', 'Denim Co.', 'Zara Style', 'Terra Pro Partner'],
    badges: ['Xit savdo', 'Katta savdo', 'Aksiya', 'Yangi', null],
    templates: [
      { prefix: 'Oversize Hoodie xudi', brands: ['Cotton Club', 'Urban Style', 'Essential Wear', 'Basic Line', 'Streetwear Pro'], models: ['100% tabiiy paxta nachesli', 'Erkin bichim kapushonli', 'Termo qalin'], colors: ['Qora', 'Kulrang', 'Bej', 'Yashil', 'To\'q ko\'k'], minPrice: 149000, maxPrice: 390000 },
      { prefix: 'Erkaklar qishki issiq kurtkasi', brands: ['The North Style', 'Nordic Warm', 'Columbia Type', 'Urban Puffer'], models: ['Biotolaf suv o\'tkazmaydigan', 'Yengil patli puffer', 'Kuz/Qish demi'], colors: ['Qora', 'Xaki', 'To\'q kulrang', 'Moviy'], minPrice: 380000, maxPrice: 1150000 },
      { prefix: 'Klassik jinsi shim', brands: ['Levi Style 501', 'Denim Co Original', 'Wrangler Type', 'Zara Fit'], models: ['Slim Fit cho\'ziluvchan', 'Regular Fit to\'g\'ri bichim'], colors: ['Moviy', 'To\'q ko\'k', 'Qora denim', 'Och ko\'k'], minPrice: 189000, maxPrice: 450000 },
      { prefix: 'Erkaklar paxtali futbolkasi', brands: ['Cotton Basic', 'Pure Cotton', 'Polo Classic', 'Minimalist'], models: ['Premium paxta 220g/m2', 'Klassik yoqali polo'], colors: ['Oq', 'Qora', 'Bej', 'Yalpiz yashil'], minPrice: 65000, maxPrice: 220000 },
      { prefix: 'Ayollar trenchi midi palto', brands: ['Grace Classic', 'London Trench', 'Elegance Fashion'], models: ['Ikki qatorli tugmali belbog\'li', 'Gabardin suv o\'tkazmas'], colors: ['Klassik bej', 'Qora', 'Krem rang'], minPrice: 420000, maxPrice: 950000 }
    ]
  },
  {
    category: 'poyabzal',
    categoryName: 'Poyabzal',
    sellers: ['SportStyle Official', 'Lady Shoes Tashkent', 'Sneaker Hub UZ', 'Step Comfort', 'Clarks Style'],
    badges: ['Xit savdo', 'Aksiya', 'Katta savdo', null],
    templates: [
      { prefix: 'Krossovka', brands: ['Nike Air Monarch IV', 'Nike Air Force 1', 'Adidas Ultraboost', 'New Balance 574', 'Puma RS-X', 'Asics Gel-Kayano'], models: ['Kundalik yurish va yugurish uchun', 'Yengil EVA havo yostig\'i bilan', 'Tabiiy charm'], colors: ['Oq/Qora', 'Oppoq', 'Kulrang', 'Ko\'k'], minPrice: 289000, maxPrice: 1450000 },
      { prefix: 'Klassik erkaklar tuflisi', brands: ['Oxford Leather', 'Derby Classic', 'Brogue Shoes'], models: ['100% tabiiy buzoq charmi', 'Ortopedik qulay taglik'], colors: ['Qora', 'Jigarrang', 'To\'q qahva'], minPrice: 350000, maxPrice: 920000 },
      { prefix: 'Ayollar qulay shippaklari va loferlari', brands: ['Comfort Soft', 'Lady Classic', 'Zara Style Footwear'], models: ['Yumshoq eko-charm', 'Anatomik qolip'], colors: ['Bej', 'Qora', 'Sutrang'], minPrice: 129000, maxPrice: 420000 }
    ]
  },
  {
    category: 'gozallik',
    categoryName: 'Goʻzallik va parvarish',
    sellers: ['Parfum Gallery', 'Dyson Premium Shop', 'DermaCare', 'Beauty World UZ', 'L\'Oreal Partner'],
    badges: ['Xit savdo', 'Tavsiya', 'Katta savdo', null],
    templates: [
      { prefix: 'Parfyumeriya suvi 100ml', brands: ['Chanel Coco Mademoiselle', 'Dior Sauvage', 'Tom Ford Lost Cherry', 'Baccarat Rouge 540', 'Creed Aventus', 'Versace Bright Crystal'], models: ['Original uzoq saqlanuvchi ifor', 'Fransiya / Italiya'], colors: ['Parfyum'], minPrice: 390000, maxPrice: 2850000 },
      { prefix: 'Fen va stayler', brands: ['Dyson Supersonic HD08', 'Dyson Airwrap Styler', 'Philips MoistureProtect', 'Babyliss Pro'], models: ['Ionizatsiyali aqlli harorat', '5 xil magnit nozullar'], colors: ['Nikel/Mis', 'Pushti/Fuksiya', 'Qora/Oltin'], minPrice: 280000, maxPrice: 5900000 },
      { prefix: 'Yuz terisi kremi', brands: ['CeraVe Moisturising Cream', 'La Roche-Posay Cicaplast B5', 'The Ordinary Niacinamide', 'Bioderma Sensibio'], models: ['Seramidlar va gialuron kislotali', 'Tinchlantiruvchi krem-gel'], colors: ['Oq'], minPrice: 95000, maxPrice: 380000 },
      { prefix: 'Soch va soqol trimeri', brands: ['Philips Series 5000', 'Braun All-in-One Series 7', 'Panasonic Wet/Dry', 'Geemy Professional'], models: ['O\'tkir titan pichoqli 20 xil uzunlik', 'Suv ostida yuviluvchi'], colors: ['Qora metall'], minPrice: 140000, maxPrice: 650000 }
    ]
  },
  {
    category: 'uy-rozgor',
    categoryName: 'Uy-roʻzgʻor buyumlari',
    sellers: ['Home Comfort', 'Sleep Well', 'SmartHome Tech', 'Textile Home', 'Ikea Style'],
    badges: ['Katta savdo', 'Aksiya', 'Xit savdo', null],
    templates: [
      { prefix: 'Zanglamas po\'latdan qozonlar to\'plami', brands: ['Tefal Ingenio', 'Rondell Flamme', 'Home Master Pro', 'Granit Granite'], models: ['6 bo\'lakli induksion', '10 bo\'lakli marmar qoplamali', '12 bo\'lakli qopqoqlari bilan'], colors: ['Kumush', 'Qora granit', 'Kulrang'], minPrice: 320000, maxPrice: 1650000 },
      { prefix: 'Ortopedik xotirali yostiq', brands: ['Memory Foam Ergonomic', 'Sleep Pro Anatomik', 'Bamboo Air'], models: ['50x30 sm bo\'yinni to\'g\'ri tutuvchi', 'Gipoallergen bambuk g\'ilofli'], colors: ['Oq', 'Kulrang g\'ilof'], minPrice: 110000, maxPrice: 380000 },
      { prefix: 'Yotoq o\'rin-ko\'rpa jildi to\'plami', brands: ['Textile Home Premium', 'Satin Royal 100%', 'Beshik Textile'], models: ['2 kishilik evro to\'plam', '1.5 kishilik zich satin'], colors: ['Geometrik', 'Bir tusli bej', 'Zumrad yashil'], minPrice: 220000, maxPrice: 690000 },
      { prefix: 'LED stol chirog\'i', brands: ['Xiaomi Mijia Desk Lamp', 'Smart Light Qi', 'Baseus Reading Pro'], models: ['Simsiz quvvatlash va sensorli rejimlar', 'Ko\'zni asrovchi tabiiy yorug\'lik'], colors: ['Oq minimalist', 'Qora'], minPrice: 150000, maxPrice: 420000 }
    ]
  },
  {
    category: 'sport',
    categoryName: 'Sport va hordiq',
    sellers: ['FitPro Store', 'Iron Gym', 'PackMaster', 'ThermoStyle', 'Active Life'],
    badges: ['Aksiya', 'Tavsiya', 'Xit savdo', null],
    templates: [
      { prefix: 'Yoga va fitnes mati', brands: ['FitPro TPE', 'Lotus Eco Mat', 'Nike Training Mat'], models: ['6mm sirpanmaydigan tasma bilan', '8mm qalin yumshoq'], colors: ['Binafsha', 'Pushti', 'Moviy', 'Qora'], minPrice: 95000, maxPrice: 290000 },
      { prefix: 'Gantellar to\'plami', brands: ['Iron Gym Set', 'Chrome Pro 20kg', 'Bitum Home Dumbbells'], models: ['2x10kg sozlanuvchi chamadonda', '2x15kg xrom shtangali'], colors: ['Xrom kumush', 'Qora'], minPrice: 280000, maxPrice: 790000 },
      { prefix: 'Shahar ryukzaki noutbuk bo\'lmasi bilan', brands: ['PackMaster Urban', 'SwissGear Type', 'Tigernu Anti-Theft', 'Xiaomi City Backpack'], models: ['15.6 dyuym USB portli suv o\'tkazmas', '25 litr kundalik'], colors: ['Qora', 'To\'q kulrang', 'Ko\'k'], minPrice: 145000, maxPrice: 380000 },
      { prefix: 'Zanglamas termos', brands: ['ThermoStyle LED', 'Stanley Classic Type', 'Xiaomi Mijia Vacuum Flask'], models: ['500ml harorat sensorli LED displey', '750ml 24 soat issiq saqlovchi'], colors: ['Qora mot', 'Oq', 'Po\'lat'], minPrice: 69000, maxPrice: 250000 }
    ]
  },
  {
    category: 'bolalar',
    categoryName: 'Bolalar mahsulotlari',
    sellers: ['Lego World', 'ToyLand', 'Kids Fun', 'Baby Star UZ'],
    badges: ['Xit savdo', 'Aksiya', 'Tavsiya', null],
    templates: [
      { prefix: 'Konstruktor LEGO', brands: ['LEGO Technic Supercar', 'LEGO City Politsiya', 'LEGO Classic Quti', 'LEGO Ninjago'], models: ['580 detal harakatlanuvchi', '300 detal to\'plam', '900 detal ijodiy'], colors: ['Rang-barang'], minPrice: 190000, maxPrice: 980000 },
      { prefix: 'Yumshoq o\'yinchoq', brands: ['Ayiqcha Teddy', 'Multfilm qahramonlari', 'Katta quyoncha'], models: ['100 sm ulkan pelush', '60 sm yumshoq gipoallergen'], colors: ['Pushti', 'Jigarrang', 'Oq'], minPrice: 120000, maxPrice: 350000 },
      { prefix: 'LCD rasm chizish plansheti', brands: ['Kids Art LCD', 'Smart Drawing Tab', 'Xiaomi Wicue'], models: ['8.5 dyuym qalamchali', '10 dyuym rangli bir tugmada tozalash'], colors: ['Ko\'k', 'Pushti', 'Qora'], minPrice: 49000, maxPrice: 145000 }
    ]
  },
  {
    category: 'oziq-ovqat',
    categoryName: 'Oziq-ovqat',
    sellers: ['Coffee Import UZ', 'Sweet Delights', 'ChocoLand', 'Premium Food Tashkent'],
    badges: ['Xit savdo', 'Tavsiya', 'Aksiya', null],
    templates: [
      { prefix: 'Donli qahva 1000g', brands: ['Lavazza Qualita Oro', 'Lavazza Crema e Aroma', 'Illy Espresso Arabica', 'Paulig Presidentti'], models: ['100% Arabika o\'rta qovurilgan', 'Arabika va Robusta aralashmasi'], colors: ['Donli'], minPrice: 180000, maxPrice: 380000 },
      { prefix: 'Belgiya shokoladli konfetlari', brands: ['Guylian Seashells', 'Ferrero Rocher', 'Lindt Lindor', 'Merci Finest'], models: ['250g dengiz qisqichbaqalari pralinasi', '300g yong\'oqli assorti'], colors: ['Sovg\'abop quti'], minPrice: 65000, maxPrice: 220000 }
    ]
  },
  {
    category: 'avtotovarlar',
    categoryName: 'Avtotovarlar',
    sellers: ['AutoPro UZ', 'CarZone Tashkent', 'Baseus Car Store'],
    badges: ['Xit savdo', 'Aksiya', 'Yangi', null],
    templates: [
      { prefix: 'Avtomobil uchun magnitli telefon ushlagich', brands: ['Baseus MagPro', 'Hoco Car Holder', 'Joyroom Vent'], models: ['Deflektor panjarasiga o\'rnatiluvchi', 'Vakuumli so\'rg\'ichli 360 burilish'], colors: ['Qora', 'Kumush'], minPrice: 55000, maxPrice: 160000 },
      { prefix: 'Avtomobil videoregistratori', brands: ['70mai Dash Cam Pro Plus', 'Xiaomi Dash Cam 4K', 'BlackVue Style'], models: ['GPS va tungi tasvir rejimi bilan', '2 ta kamera old va orqa'], colors: ['Qora'], minPrice: 420000, maxPrice: 1450000 },
      { prefix: 'Avtomobil uchun ixcham simsiz changyutgich', brands: ['Baseus A2 Pro', 'Xiaomi Mijia Car Cleaner'], models: ['6000 Pa kuchli so\'rish quvvati', 'Akkumulyatorli USB Type-C'], colors: ['Qora', 'To\'q kulrang'], minPrice: 180000, maxPrice: 450000 }
    ]
  }
];

const totalTarget = 1060;
const products = [];
let idCounter = 1;

// First generate from categories iteratively to reach 1060 items
let catIndex = 0;
while (products.length < totalTarget) {
  const catDef = categoryDefinitions[catIndex % categoryDefinitions.length];
  const template = catDef.templates[Math.floor(Math.random() * catDef.templates.length)];
  const brand = template.brands[Math.floor(Math.random() * template.brands.length)];
  const model = template.models[Math.floor(Math.random() * template.models.length)];
  const color = template.colors[Math.floor(Math.random() * template.colors.length)];
  const seller = catDef.sellers[Math.floor(Math.random() * catDef.sellers.length)];
  const badge = catDef.badges[Math.floor(Math.random() * catDef.badges.length)];
  
  // Price generation with realistic step
  const priceRange = template.maxPrice - template.minPrice;
  const rawPrice = template.minPrice + Math.floor(Math.random() * (priceRange / 10000)) * 10000;
  const discountPercent = Math.floor(10 + Math.random() * 32);
  const oldPrice = Math.round((rawPrice / (1 - discountPercent / 100)) / 1000) * 1000;
  
  const imgs = imagePool[catDef.category] || imagePool['elektronika'];
  const mainImg = imgs[Math.floor(Math.random() * imgs.length)];
  const addImgs = [mainImg];
  for (let k = 0; k < 2; k++) {
    addImgs.push(imgs[Math.floor(Math.random() * imgs.length)]);
  }

  const rating = (4.5 + Math.random() * 0.5).toFixed(1);
  const reviews = Math.floor(18 + Math.random() * 950);
  const popularity = Math.floor(60 + Math.random() * 40);
  const stock = Math.floor(10 + Math.random() * 90);

  const title = `${template.prefix} ${brand} ${model} (${color})`;
  const monthly = Math.round(rawPrice / 12);
  const monthlyStr = monthly.toString().replace(/\\B(?=(\\d{3})+(?!\\d))/g, " ") + " so'm/oy";

  products.push({
    id: idCounter++,
    title: title,
    category: catDef.category,
    categoryName: catDef.categoryName,
    price: rawPrice,
    oldPrice: oldPrice,
    discount: `-${discountPercent}%`,
    rating: parseFloat(rating),
    reviews: reviews,
    image: mainImg,
    additionalImages: addImgs,
    description: `${title} — yuqori sifat, zamonaviy dizayn va qulaylik uyg'unligi. ${seller} tomonidan rasmiy kafolat bilan taqdim etiladi. Uzum Market orqali 1 kunda bepul yetkazib beriladi.`,
    installmentPrice: monthlyStr,
    installmentMonths: 12,
    popularity: popularity,
    badge: badge,
    seller: seller,
    stock: stock,
    specs: {
      "Kafolat": "1 yil rasmiy kafolat",
      "Ishlab chiqaruvchi": seller,
      "Rangi": color,
      "Holati": "Yangi, qadoqlangan",
      "Yetkazib berish": "1 kun, mutlaqo bepul"
    }
  });

  catIndex++;
}

console.log(`Generated ${products.length} products successfully.`);

const fileContent = `/**
 * UZUM MARKET CLONE - MASSIVE REALISTIC PRODUCT DATABASE
 * Contains ${products.length} products across 10 categories.
 */

const PRODUCTS = ${JSON.stringify(products, null, 2)};

/**
 * Currency and Number Formatting Helpers
 */
function formatPrice(amount) {
  if (typeof amount !== 'number') return amount;
  return amount.toString().replace(/\\B(?=(\\d{3})+(?!\\d))/g, " ") + " so'm";
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
  return PRODUCTS.filter(p => p.badge === "Yangi" || p.id % 7 === 0).slice(0, limit);
}

function getRecommendedProducts(limit = 10) {
  return PRODUCTS.filter(p => p.rating >= 4.8).slice(0, limit);
}
`;

fs.writeFileSync(path.join(__dirname, 'uzum-market-clone', 'js', 'products.js'), fileContent, 'utf8');
console.log('Successfully wrote uzum-market-clone/js/products.js');
