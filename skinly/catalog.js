// Skinly 로컬 큐레이션 카탈로그 — 인기 제품의 대표 성분 요약 (전체 전성분이 아님)
// code가 sk로 시작하면 내부 식별자(실제 바코드 아님)
const LOCAL_CATALOG = [
{
"code": "8809416470011",
"product_name": "Advanced Snail 96 Mucin Power Essence",
"brands": "COSRX",
"kw": "코스알엑스 스네일 달팽이 96 에센스",
"image_front_url": "",
"ingredients_text": "Snail Secretion Filtrate, Betaine, Butylene Glycol, 1,2-Hexanediol, Sodium Polyacrylate, Phenoxyethanol, Sodium Hyaluronate, Allantoin, Panthenol, Arginine"
},
{
"code": "8809640733185",
"product_name": "Heartleaf 77% Soothing Toner",
"brands": "Anua",
"kw": "아누아 어성초 77 수딩 토너 진정",
"image_front_url": "",
"ingredients_text": "Houttuynia Cordata Extract, Water, 1,2-Hexanediol, Glycerin, Betaine, Panthenol, Sodium Hyaluronate, Madecassoside, Allantoin, Ethylhexylglycerin"
},
{
"code": "8809676163310",
"product_name": "1025 Dokdo Toner",
"brands": "Round Lab",
"kw": "라운드랩 1025 독도 토너",
"image_front_url": "",
"ingredients_text": "Water, Butylene Glycol, Glycerin, Pentylene Glycol, Panthenol, Allantoin, Betaine, Chondrus Crispus Extract, Saccharide Isomerate, Sea Water, Ethylhexylglycerin"
},
{
"code": "sk001",
"product_name": "Birch Juice Moisturizing Toner",
"brands": "Round Lab",
"kw": "라운드랩 자작나무 수분 토너",
"image_front_url": "",
"ingredients_text": "Water, Betula Platyphylla Japonica Juice, Butylene Glycol, Glycerin, Sodium Hyaluronate, Panthenol, Allantoin, Betaine, Ethylhexylglycerin"
},
{
"code": "sk002",
"product_name": "Madagascar Centella Toning Toner",
"brands": "SKIN1004",
"kw": "스킨1004 마다가스카르 센텔라 토닝 토너",
"image_front_url": "",
"ingredients_text": "Water, Centella Asiatica Extract, Butylene Glycol, Glycerin, Gluconolactone, Panthenol, Madecassoside, Allantoin"
},
{
"code": "sk003",
"product_name": "Supple Preparation Unscented Toner",
"brands": "Klairs",
"kw": "클레어스 서플 프레퍼레이션 무향 토너",
"image_front_url": "",
"ingredients_text": "Water, Butylene Glycol, Glycerin, Sodium Hyaluronate, Centella Asiatica Extract, Panthenol, Beta-Glucan, Allantoin, Ethylhexylglycerin"
},
{
"code": "sk004",
"product_name": "Essence Toner",
"brands": "Pyunkang Yul",
"kw": "편강율 에센스 토너",
"image_front_url": "",
"ingredients_text": "Astragalus Membranaceus Root Extract, Water, Butylene Glycol, Glycerin, Betaine, 1,2-Hexanediol"
},
{
"code": "sk005",
"product_name": "AHA/BHA Clarifying Treatment Toner",
"brands": "COSRX",
"kw": "코스알엑스 AHA BHA 클라리파잉 토너 각질",
"image_front_url": "",
"ingredients_text": "Water, Salix Alba (Willow) Bark Water, Glycolic Acid, Betaine Salicylate, Salicylic Acid, Allantoin, Panthenol, Sodium Hyaluronate"
},
{
"code": "8809647391227",
"product_name": "AHA BHA PHA 30 Days Miracle Toner",
"brands": "Some By Mi",
"kw": "썸바이미 미라클 토너",
"image_front_url": "",
"ingredients_text": "Water, Butylene Glycol, Dipropylene Glycol, Glycereth-26, Niacinamide, Melaleuca Alternifolia (Tea Tree) Leaf Water, Carica Papaya Fruit Extract, Lactobionic Acid, Salicylic Acid, Lactic Acid, Citric Acid, Adenosine, Fragrance"
},
{
"code": "sk006",
"product_name": "Hyaluronic Acid Toner Plus",
"brands": "Isntree",
"kw": "이즌트리 히알루론산 토너",
"image_front_url": "",
"ingredients_text": "Water, Sodium Hyaluronate, Hyaluronic Acid, Hydrolyzed Hyaluronic Acid, Butylene Glycol, Betaine, Panthenol, Allantoin"
},
{
"code": "sk007",
"product_name": "Rice Toner",
"brands": "I'm From",
"kw": "아임프롬 라이스 쌀 토너",
"image_front_url": "",
"ingredients_text": "Oryza Sativa (Rice) Extract, Water, Butylene Glycol, Glycerin, Niacinamide, Sodium Hyaluronate, 1,2-Hexanediol, Adenosine"
},
{
"code": "sk008",
"product_name": "Time Revolution The First Treatment Essence",
"brands": "Missha",
"kw": "미샤 타임레볼루션 퍼스트 트리트먼트 에센스",
"image_front_url": "",
"ingredients_text": "Saccharomyces Ferment Filtrate, Butylene Glycol, 1,2-Hexanediol, Niacinamide, Bifida Ferment Lysate, Adenosine, Fragrance"
},
{
"code": "sk009",
"product_name": "Aloe BHA Skin Toner",
"brands": "Benton",
"kw": "벤튼 알로에 BHA 토너",
"image_front_url": "",
"ingredients_text": "Aloe Barbadensis Leaf Water, Water, Butylene Glycol, Salicylic Acid, Snail Secretion Filtrate, Allantoin, Panthenol, Beta-Glucan"
},
{
"code": "sk010",
"product_name": "SoonJung pH 5.5 Relief Toner",
"brands": "Etude",
"kw": "에뛰드 순정 약산성 토너",
"image_front_url": "",
"ingredients_text": "Water, Glycerin, Butylene Glycol, Panthenol, Madecassoside, Camellia Sinensis Leaf Extract, Butyrospermum Parkii (Shea) Butter"
},
{
"code": "sk011",
"product_name": "Cream Skin Refiner",
"brands": "Laneige",
"kw": "라네즈 크림스킨 토너",
"image_front_url": "",
"ingredients_text": "Water, Glycerin, Cetearyl Alcohol, Butylene Glycol, Ceramide NP, Camellia Sinensis Leaf Water, Stearic Acid, Fragrance"
},
{
"code": "sk012",
"product_name": "Gokujyun Premium Hyaluronic Lotion",
"brands": "Hada Labo",
"kw": "하다라보 고쿠쥰 프리미엄 토너",
"image_front_url": "",
"ingredients_text": "Water, Butylene Glycol, Glycerin, Sodium Hyaluronate, Hydrolyzed Hyaluronic Acid, Sodium Acetylated Hyaluronate, Hydroxyethylcellulose, Methylparaben"
},
{
"code": "sk013",
"product_name": "Witch Hazel Facial Toner Rose Petal",
"brands": "Thayers",
"kw": "세이어스 위치하젤 토너",
"image_front_url": "",
"ingredients_text": "Water, Hamamelis Virginiana (Witch Hazel) Extract, Aloe Barbadensis Leaf Juice, Glycerin, Rosa Centifolia Flower Water, Citric Acid, Fragrance"
},
{
"code": "sk014",
"product_name": "Rose Water Toner",
"brands": "Mamonde",
"kw": "마몽드 로즈워터 토너",
"image_front_url": "",
"ingredients_text": "Rosa Damascena Flower Water, Water, Butylene Glycol, Glycerin, 1,2-Hexanediol, Fragrance, Citronellol, Geraniol"
},
{
"code": "sk015",
"product_name": "Black Rice Hyaluronic Toner",
"brands": "Haruharu Wonder",
"kw": "하루하루원더 블랙라이스 토너",
"image_front_url": "",
"ingredients_text": "Water, Oryza Sativa (Rice) Extract, Butylene Glycol, Glycerin, Sodium Hyaluronate, Aspergillus Ferment, Betaine, Panthenol"
},
{
"code": "sk016",
"product_name": "Cicaful Calming Toner",
"brands": "Beplain",
"kw": "비플레인 시카풀 진정 토너",
"image_front_url": "",
"ingredients_text": "Water, Centella Asiatica Extract, Butylene Glycol, Glycerin, Madecassoside, Asiaticoside, Panthenol, Allantoin"
},
{
"code": "sk017",
"product_name": "Milk Skin Toner",
"brands": "TIRTIR",
"kw": "티르티르 밀크스킨 토너",
"image_front_url": "",
"ingredients_text": "Water, Butylene Glycol, Glycerin, Niacinamide, Oryza Sativa (Rice) Ferment Filtrate, Betaine, Sodium Hyaluronate, Adenosine"
},
{
"code": "sk018",
"product_name": "Calendula Herbal-Extract Toner",
"brands": "Kiehl's",
"kw": "키엘 카렌듈라 토너",
"image_front_url": "",
"ingredients_text": "Water, Glycerin, Butylene Glycol, Calendula Officinalis Flower Extract, Allantoin, Fragrance"
},
{
"code": "sk019",
"product_name": "Beauty Water",
"brands": "Son & Park",
"kw": "손앤박 뷰티워터 닦토",
"image_front_url": "",
"ingredients_text": "Water, Butylene Glycol, Glycerin, Lavandula Angustifolia (Lavender) Water, Papain, Salix Alba Bark Extract, Fragrance, Linalool"
},
{
"code": "8809784606034",
"product_name": "DIVE-IN Low Molecular Hyaluronic Acid Serum",
"brands": "Torriden",
"kw": "토리든 다이브인 저분자 히알루론산 세럼",
"image_front_url": "",
"ingredients_text": "Water, Butylene Glycol, Glycerin, Pentylene Glycol, Sodium Hyaluronate, Hyaluronic Acid, Hydrolyzed Hyaluronic Acid, Panthenol, Allantoin, Madecassoside, Ethylhexylglycerin"
},
{
"code": "8809738312244",
"product_name": "Glow Serum : Propolis + Niacinamide",
"brands": "Beauty of Joseon",
"kw": "조선미녀 글로우 세럼 프로폴리스",
"image_front_url": "",
"ingredients_text": "Propolis Extract, Water, Glycerin, Butylene Glycol, Niacinamide, Trehalose, Panthenol, Sodium Hyaluronate, Betaine, 1,2-Hexanediol, Adenosine, Ethylhexylglycerin"
},
{
"code": "sk020",
"product_name": "Glow Deep Serum : Rice + Arbutin",
"brands": "Beauty of Joseon",
"kw": "조선미녀 글로우 딥 세럼 쌀 알부틴",
"image_front_url": "",
"ingredients_text": "Oryza Sativa (Rice) Bran Water, Alpha-Arbutin, Niacinamide, Butylene Glycol, Glycerin, Sodium Hyaluronate, Panthenol, Adenosine"
},
{
"code": "sk021",
"product_name": "The Niacinamide 15 Serum",
"brands": "COSRX",
"kw": "코스알엑스 더 나이아신아마이드 15 세럼 모공",
"image_front_url": "",
"ingredients_text": "Water, Niacinamide, Butylene Glycol, Glycerin, Zinc PCA, Sodium Hyaluronate, Allantoin, Adenosine"
},
{
"code": "769915190358",
"product_name": "Niacinamide 10% + Zinc 1%",
"brands": "The Ordinary",
"kw": "디오디너리 나이아신아마이드 아연 세럼",
"image_front_url": "",
"ingredients_text": "Aqua, Niacinamide, Pentylene Glycol, Zinc PCA, Dimethyl Isosorbide, Tamarindus Indica Seed Gum, Xanthan Gum, Isoceteth-20, Ethoxydiglycol, Phenoxyethanol, Chlorphenesin"
},
{
"code": "sk022",
"product_name": "Hyaluronic Acid 2% + B5",
"brands": "The Ordinary",
"kw": "디오디너리 히알루론산 세럼",
"image_front_url": "",
"ingredients_text": "Aqua, Sodium Hyaluronate, Sodium Hyaluronate Crosspolymer, Panthenol, Pentylene Glycol, Propanediol, Phenoxyethanol, Chlorphenesin"
},
{
"code": "sk023",
"product_name": "Retinol 0.5% in Squalane",
"brands": "The Ordinary",
"kw": "디오디너리 레티놀 스쿠알란",
"image_front_url": "",
"ingredients_text": "Squalane, Caprylic/Capric Triglyceride, Simmondsia Chinensis (Jojoba) Seed Oil, Retinol, Solanum Lycopersicum (Tomato) Fruit Extract, Rosmarinus Officinalis Leaf Extract, Tocopherol, BHT"
},
{
"code": "sk024",
"product_name": "No.3 Skin Softening Serum",
"brands": "numbuzin",
"kw": "넘버즈인 3번 결 세럼",
"image_front_url": "",
"ingredients_text": "Galactomyces Ferment Filtrate, Water, Glycerin, Niacinamide, Bifida Ferment Lysate, Saccharomyces Ferment Filtrate, Butylene Glycol, Adenosine, Panthenol"
},
{
"code": "sk025",
"product_name": "No.5 Vitamin-Niacinamide Concentrated Serum",
"brands": "numbuzin",
"kw": "넘버즈인 5번 비타민 세럼 잡티",
"image_front_url": "",
"ingredients_text": "Water, Niacinamide, Butylene Glycol, Glycerin, 3-O-Ethyl Ascorbic Acid, Ascorbic Acid, Glutathione, Tranexamic Acid, Adenosine"
},
{
"code": "sk026",
"product_name": "Green Tangerine Vita C Dark Spot Care Serum",
"brands": "Goodal",
"kw": "구달 청귤 비타C 잡티 세럼",
"image_front_url": "",
"ingredients_text": "Water, Citrus Aurantium Dulcis (Orange) Fruit Water, Butylene Glycol, Niacinamide, Ascorbic Acid, Alpha-Arbutin, Sodium Hyaluronate, Panthenol, Adenosine"
},
{
"code": "sk027",
"product_name": "Freshly Juiced Vitamin Drop",
"brands": "Klairs",
"kw": "클레어스 프레시 쥬스드 비타민 드롭 세럼",
"image_front_url": "",
"ingredients_text": "Water, Propylene Glycol, Ascorbic Acid, Hydroxyethylcellulose, Centella Asiatica Extract, Citrus Junos Fruit Extract, Panthenol"
},
{
"code": "sk028",
"product_name": "Real Hyaluronic Blue 100 Ampoule",
"brands": "Wellage",
"kw": "웰라쥬 리얼 히알루로닉 블루 앰플",
"image_front_url": "",
"ingredients_text": "Water, Sodium Hyaluronate, Hyaluronic Acid, Hydrolyzed Hyaluronic Acid, Glycerin, Butylene Glycol, Betaine, Panthenol"
},
{
"code": "sk029",
"product_name": "Reedle Shot 100",
"brands": "VT",
"kw": "브이티 리들샷 100 시카 앰플",
"image_front_url": "",
"ingredients_text": "Water, Butylene Glycol, Glycerin, Centella Asiatica Extract, Madecassoside, Asiaticoside, Panthenol, Sodium Hyaluronate, Cica Care Complex"
},
{
"code": "sk030",
"product_name": "Deep Vita C Ampoule",
"brands": "Medicube",
"kw": "메디큐브 딥 비타C 앰플",
"image_front_url": "",
"ingredients_text": "Water, 3-O-Ethyl Ascorbic Acid, Butylene Glycol, Glycerin, Niacinamide, Ferulic Acid, Tocopherol, Sodium Hyaluronate, Adenosine"
},
{
"code": "sk031",
"product_name": "Madagascar Centella Ampoule",
"brands": "SKIN1004",
"kw": "스킨1004 마다가스카르 센텔라 앰플",
"image_front_url": "",
"ingredients_text": "Centella Asiatica Extract, Madecassoside, Asiaticoside, Asiatic Acid, Madecassic Acid"
},
{
"code": "sk032",
"product_name": "Centella Green Level Buffet Serum",
"brands": "Purito",
"kw": "퓨리토 센텔라 버핏 세럼",
"image_front_url": "",
"ingredients_text": "Water, Butylene Glycol, Centella Asiatica Extract, Glycerin, Sodium Hyaluronate, Panthenol, Madecassoside, Acetyl Hexapeptide-8, Copper Tripeptide-1, Allantoin"
},
{
"code": "sk033",
"product_name": "Heartleaf Spot Pad Calming Touch Essence",
"brands": "Abib",
"kw": "아비브 어성초 스팟 패드 에센스",
"image_front_url": "",
"ingredients_text": "Water, Houttuynia Cordata Extract, Butylene Glycol, Glycerin, Betaine, Panthenol, Salicylic Acid, Allantoin, Madecassoside"
},
{
"code": "sk034",
"product_name": "Bean Essence",
"brands": "Mixsoon",
"kw": "믹순 콩 에센스",
"image_front_url": "",
"ingredients_text": "Glycine Soja (Soybean) Seed Extract, Fermented Soybean Extract, Butylene Glycol, Water, 1,2-Hexanediol"
},
{
"code": "887167534551",
"product_name": "Advanced Night Repair Serum",
"brands": "Estee Lauder",
"kw": "에스티로더 어드밴스드 나이트 리페어 갈색병 세럼",
"image_front_url": "",
"ingredients_text": "Bifida Ferment Lysate, Water, Methyl Gluceth-20, PEG-8, Glycerin, Butylene Glycol, Sodium Hyaluronate, Caffeine, Adenosine, Tocopheryl Acetate, Phenoxyethanol"
},
{
"code": "4979006035025",
"product_name": "Facial Treatment Essence",
"brands": "SK-II",
"kw": "에스케이투 피테라 페이셜 트리트먼트 에센스",
"image_front_url": "",
"ingredients_text": "Galactomyces Ferment Filtrate, Butylene Glycol, Pentylene Glycol, Water, Sodium Benzoate, Methylparaben, Sorbic Acid"
},
{
"code": "8809774963417",
"product_name": "First Care Activating Serum",
"brands": "Sulwhasoo",
"kw": "설화수 윤조에센스 퍼스트 케어 세럼",
"image_front_url": "",
"ingredients_text": "Water, Butylene Glycol, Glycerin, Cyclopentasiloxane, Panax Ginseng Root Extract, Nelumbo Nucifera Flower Extract, Glycyrrhiza Glabra Root Extract, PEG-40 Hydrogenated Castor Oil, Fragrance, Limonene, Linalool, Citral"
},
{
"code": "sk035",
"product_name": "Stem III Ampoule",
"brands": "IOPE",
"kw": "아이오페 스템쓰리 앰플",
"image_front_url": "",
"ingredients_text": "Water, Butylene Glycol, Glycerin, Niacinamide, Panax Ginseng Callus Culture Extract, Adenosine, Sodium Hyaluronate, Panthenol"
},
{
"code": "sk036",
"product_name": "White Truffle First Spray Serum",
"brands": "d'Alba",
"kw": "달바 화이트 트러플 퍼스트 스프레이 세럼 미스트",
"image_front_url": "",
"ingredients_text": "Water, Butylene Glycol, Glycerin, Tuber Magnatum (White Truffle) Extract, Niacinamide, Sodium Hyaluronate, Tocopherol, Helianthus Annuus Seed Oil, Fragrance, Limonene"
},
{
"code": "sk037",
"product_name": "Tea Tree Cica Soothing Serum",
"brands": "Bring Green",
"kw": "브링그린 티트리 시카 수딩 세럼",
"image_front_url": "",
"ingredients_text": "Melaleuca Alternifolia (Tea Tree) Leaf Water, Water, Butylene Glycol, Centella Asiatica Extract, Madecassoside, Niacinamide, Panthenol, Allantoin, Zinc PCA"
},
{
"code": "sk038",
"product_name": "Marine Collagen Serum",
"brands": "Mary & May",
"kw": "메리앤메이 마린 콜라겐 세럼",
"image_front_url": "",
"ingredients_text": "Water, Hydrolyzed Collagen, Butylene Glycol, Glycerin, Niacinamide, Sodium Hyaluronate, Adenosine, Panthenol"
},
{
"code": "sk039",
"product_name": "Bulgarian Rose Blemish Care Serum",
"brands": "isoi",
"kw": "아이소이 불가리안 로즈 잡티 세럼",
"image_front_url": "",
"ingredients_text": "Water, Butylene Glycol, Rosa Damascena Flower Oil, Niacinamide, Glycerin, Sodium Hyaluronate, Adenosine, Citronellol, Geraniol"
},
{
"code": "8809843687049",
"product_name": "Green Tea Seed Hyaluronic Serum",
"brands": "Innisfree",
"kw": "이니스프리 그린티 씨드 세럼 녹차",
"image_front_url": "",
"ingredients_text": "Water, Camellia Sinensis Leaf Water, Butylene Glycol, Glycerin, Camellia Sinensis Seed Oil, Sodium Hyaluronate, Panthenol, Betaine, Camellia Sinensis Leaf Extract, Fragrance, Linalool"
},
{
"code": "sk040",
"product_name": "Water Bank Blue Hyaluronic Serum",
"brands": "Laneige",
"kw": "라네즈 워터뱅크 블루 히알루로닉 세럼",
"image_front_url": "",
"ingredients_text": "Water, Butylene Glycol, Glycerin, Sodium Hyaluronate, Hydrolyzed Hyaluronic Acid, Squalane, Panthenol, Ceramide NP, Fragrance"
},
{
"code": "sk041",
"product_name": "Bifida Biome Complex Ampoule",
"brands": "ma:nyo",
"kw": "마녀공장 비피다 바이옴 콤플렉스 앰플",
"image_front_url": "",
"ingredients_text": "Bifida Ferment Lysate, Water, Butylene Glycol, Glycerin, Lactobacillus Ferment Lysate, Saccharomyces Ferment Filtrate, Sodium Hyaluronate, Panthenol, Adenosine"
},
{
"code": "sk042",
"product_name": "Retinol Expert 0.1%",
"brands": "IOPE",
"kw": "아이오페 레티놀 엑스퍼트 주름",
"image_front_url": "",
"ingredients_text": "Water, Glycerin, Butylene Glycol, Retinol, Niacinamide, Adenosine, Panthenol, Tocopherol, Hydrogenated Lecithin"
},
{
"code": "sk043",
"product_name": "Retinol Cica Repair Ampoule",
"brands": "Innisfree",
"kw": "이니스프리 레티놀 시카 흔적 앰플",
"image_front_url": "",
"ingredients_text": "Water, Butylene Glycol, Glycerin, Retinol, Centella Asiatica Extract, Madecassoside, Panthenol, Adenosine, Tocopherol"
},
{
"code": "sk044",
"product_name": "Skin Perfecting 2% BHA Liquid Exfoliant",
"brands": "Paula's Choice",
"kw": "폴라초이스 2% BHA 리퀴드 각질 토너",
"image_front_url": "",
"ingredients_text": "Water, Methylpropanediol, Butylene Glycol, Salicylic Acid, Camellia Sinensis (Green Tea) Leaf Extract, Sodium Hyaluronate, Panthenol"
},
{
"code": "3606000537843",
"product_name": "Moisturizing Cream",
"brands": "CeraVe",
"kw": "세라비 세라베 모이스처라이징 수분크림",
"image_front_url": "",
"ingredients_text": "Aqua, Glycerin, Cetearyl Alcohol, Caprylic/Capric Triglyceride, Cetyl Alcohol, Ceramide NP, Ceramide AP, Ceramide EOP, Hyaluronic Acid, Cholesterol, Petrolatum, Dimethicone, Phytosphingosine, Tocopherol, Xanthan Gum, Ethylhexylglycerin, Phenoxyethanol"
},
{
"code": "sk045",
"product_name": "Atobarrier 365 Cream",
"brands": "AESTURA",
"kw": "에스트라 아토배리어 365 크림 장벽",
"image_front_url": "",
"ingredients_text": "Water, Glycerin, Cetearyl Alcohol, Caprylic/Capric Triglyceride, Ceramide NP, Cholesterol, Butyrospermum Parkii (Shea) Butter, Panthenol, Hydrogenated Lecithin, Allantoin"
},
{
"code": "sk046",
"product_name": "Ceramide Ato Concentrate Cream",
"brands": "Illiyoon",
"kw": "일리윤 세라마이드 아토 컨센트레이트 크림",
"image_front_url": "",
"ingredients_text": "Water, Glycerin, Caprylic/Capric Triglyceride, Cetearyl Alcohol, Ceramide NP, Butyrospermum Parkii (Shea) Butter, Panthenol, Hydrogenated Lecithin, Allantoin, Betaine"
},
{
"code": "sk047",
"product_name": "Cicapair Tiger Grass Cream",
"brands": "Dr.Jart+",
"kw": "닥터자르트 시카페어 타이거 그래스 크림",
"image_front_url": "",
"ingredients_text": "Water, Glycerin, Cetearyl Alcohol, Centella Asiatica Extract, Madecassoside, Asiaticoside, Panthenol, Niacinamide, Butyrospermum Parkii (Shea) Butter"
},
{
"code": "sk048",
"product_name": "Ceramidin Cream",
"brands": "Dr.Jart+",
"kw": "닥터자르트 세라마이딘 크림",
"image_front_url": "",
"ingredients_text": "Water, Glycerin, Caprylic/Capric Triglyceride, Ceramide NP, Ceramide AP, Cholesterol, Panthenol, Butylene Glycol, Hydrogenated Lecithin"
},
{
"code": "sk049",
"product_name": "The True Cream Aqua Bomb",
"brands": "belif",
"kw": "빌리프 트루 크림 아쿠아밤 수분크림",
"image_front_url": "",
"ingredients_text": "Water, Glycerin, Dipropylene Glycol, Cetearyl Alcohol, Squalane, Ceratonia Siliqua Gum, Panthenol, Fragrance, Linalool"
},
{
"code": "sk050",
"product_name": "Daily Moisture Therapy Cream",
"brands": "Physiogel",
"kw": "피지오겔 데일리 모이스처 테라피 크림",
"image_front_url": "",
"ingredients_text": "Aqua, Caprylic/Capric Triglyceride, Glycerin, Pentylene Glycol, Hydrogenated Lecithin, Squalane, Betaine, Carbomer, Xanthan Gum"
},
{
"code": "sk051",
"product_name": "Moisturising Cream",
"brands": "Cetaphil",
"kw": "세타필 모이스춰라이징 크림",
"image_front_url": "",
"ingredients_text": "Aqua, Glycerin, Petrolatum, Dicaprylyl Ether, Dimethicone, Glyceryl Stearate, Cetyl Alcohol, Prunus Amygdalus Dulcis (Sweet Almond) Oil, Tocopheryl Acetate"
},
{
"code": "sk052",
"product_name": "Ultra Facial Cream",
"brands": "Kiehl's",
"kw": "키엘 울트라 페이셜 크림",
"image_front_url": "",
"ingredients_text": "Aqua, Glycerin, Cyclohexasiloxane, Squalane, Bis-PEG-18 Methyl Ether Dimethyl Silane, Sweet Almond Oil, Glacial Glycoprotein Extract, Urea"
},
{
"code": "sk053",
"product_name": "Moisture Surge 100H Auto-Replenishing Hydrator",
"brands": "Clinique",
"kw": "크리니크 모이스처 서지 수분크림",
"image_front_url": "",
"ingredients_text": "Water, Dimethicone, Butylene Glycol, Glycerin, Aloe Barbadensis Leaf Water, Sodium Hyaluronate, Caffeine, Squalane, Trehalose"
},
{
"code": "sk054",
"product_name": "Advanced Snail 92 All in One Cream",
"brands": "COSRX",
"kw": "코스알엑스 스네일 92 올인원 크림",
"image_front_url": "",
"ingredients_text": "Snail Secretion Filtrate, Betaine, Caprylic/Capric Triglyceride, Cetearyl Alcohol, Sodium Hyaluronate, Panthenol, Allantoin, Adenosine"
},
{
"code": "sk055",
"product_name": "Dynasty Cream",
"brands": "Beauty of Joseon",
"kw": "조선미녀 왕조크림",
"image_front_url": "",
"ingredients_text": "Water, Glycerin, Oryza Sativa (Rice) Bran Water, Butylene Glycol, Niacinamide, Panax Ginseng Root Extract, Squalane, Sodium Hyaluronate, Adenosine, Butyrospermum Parkii (Shea) Butter"
},
{
"code": "sk056",
"product_name": "DIVE-IN Soothing Cream",
"brands": "Torriden",
"kw": "토리든 다이브인 수딩 크림",
"image_front_url": "",
"ingredients_text": "Water, Glycerin, Butylene Glycol, Squalane, Sodium Hyaluronate, Panthenol, Madecassoside, Allantoin, Ceramide NP"
},
{
"code": "sk057",
"product_name": "Birch Juice Moisturizing Cream",
"brands": "Round Lab",
"kw": "라운드랩 자작나무 수분 크림",
"image_front_url": "",
"ingredients_text": "Water, Betula Platyphylla Japonica Juice, Glycerin, Butylene Glycol, Squalane, Ceramide NP, Panthenol, Sodium Hyaluronate, Betaine"
},
{
"code": "sk058",
"product_name": "Madagascar Centella Soothing Cream",
"brands": "SKIN1004",
"kw": "스킨1004 센텔라 수딩 크림",
"image_front_url": "",
"ingredients_text": "Water, Centella Asiatica Extract, Glycerin, Butylene Glycol, Squalane, Madecassoside, Panthenol, Ceramide NP"
},
{
"code": "sk059",
"product_name": "Heartleaf 70% Intense Calming Cream",
"brands": "Anua",
"kw": "아누아 어성초 70 진정 크림",
"image_front_url": "",
"ingredients_text": "Houttuynia Cordata Extract, Water, Glycerin, Squalane, Butylene Glycol, Panthenol, Madecassoside, Ceramide NP, Allantoin"
},
{
"code": "4005808158706",
"product_name": "Creme",
"brands": "Nivea",
"kw": "니베아 크림",
"image_front_url": "",
"ingredients_text": "Aqua, Paraffinum Liquidum, Cera Microcristallina, Glycerin, Lanolin Alcohol, Paraffin, Panthenol, Decyl Oleate, Octyldodecanol, Aluminum Stearates, Citric Acid, Magnesium Sulfate, Fragrance, Limonene, Geraniol, Hydroxycitronellal, Linalool, Citronellol"
},
{
"code": "sk060",
"product_name": "Skin Food Original",
"brands": "Weleda",
"kw": "벨레다 스킨푸드 크림",
"image_front_url": "",
"ingredients_text": "Water, Helianthus Annuus (Sunflower) Seed Oil, Lanolin, Prunus Amygdalus Dulcis (Sweet Almond) Oil, Beeswax, Viola Tricolor Extract, Rosmarinus Officinalis Leaf Extract, Fragrance, Limonene, Linalool, Geraniol, Coumarin"
},
{
"code": "sk061",
"product_name": "Ultra Repair Cream",
"brands": "First Aid Beauty",
"kw": "퍼스트에이드뷰티 울트라 리페어 크림",
"image_front_url": "",
"ingredients_text": "Water, Stearic Acid, Glycerin, Cetearyl Alcohol, Caprylic/Capric Triglyceride, Butyrospermum Parkii (Shea) Butter, Avena Sativa (Oat) Kernel Extract, Allantoin, Ceramide NP, Eucalyptus Globulus Leaf Oil"
},
{
"code": "sk062",
"product_name": "Cicaplast Baume B5+",
"brands": "La Roche-Posay",
"kw": "라로슈포제 시카플라스트 밤 B5",
"image_front_url": "",
"ingredients_text": "Aqua, Hydrogenated Polyisobutene, Dimethicone, Glycerin, Panthenol, Butyrospermum Parkii (Shea) Butter, Madecassoside, Zinc Gluconate, Manganese Gluconate, Copper Gluconate"
},
{
"code": "sk063",
"product_name": "Cicalfate+ Repairing Protective Cream",
"brands": "Avene",
"kw": "아벤느 시칼파트 리페어 크림",
"image_front_url": "",
"ingredients_text": "Avene Thermal Spring Water, Zinc Oxide, Caprylic/Capric Triglyceride, Glycerin, Copper Sulfate, Zinc Sulfate, Squalane, Aqua"
},
{
"code": "sk064",
"product_name": "Rich Moist Soothing Cream",
"brands": "Klairs",
"kw": "클레어스 리치 모이스트 수딩 크림",
"image_front_url": "",
"ingredients_text": "Water, Glycerin, Caprylic/Capric Triglyceride, Butylene Glycol, Ceramide NP, Beta-Glucan, Centella Asiatica Extract, Panthenol, Allantoin"
},
{
"code": "sk065",
"product_name": "B5 Panthenol Re-Barrier Cream",
"brands": "Purito",
"kw": "퓨리토 판테놀 리배리어 크림",
"image_front_url": "",
"ingredients_text": "Water, Glycerin, Panthenol, Squalane, Butylene Glycol, Ceramide NP, Madecassoside, Allantoin, Betaine"
},
{
"code": "sk066",
"product_name": "Dual Barrier Skin Wearing Cream",
"brands": "Celimax",
"kw": "셀리맥스 듀얼 배리어 스킨 웨어링 크림",
"image_front_url": "",
"ingredients_text": "Water, Glycerin, Caprylic/Capric Triglyceride, Cetearyl Alcohol, Ceramide NP, Squalane, Panthenol, Hydrogenated Lecithin, Betaine"
},
{
"code": "sk067",
"product_name": "Pro Trouble Cica Gel Cream",
"brands": "Dermatory",
"kw": "더마토리 프로 트러블 시카 젤 크림",
"image_front_url": "",
"ingredients_text": "Water, Butylene Glycol, Glycerin, Centella Asiatica Extract, Madecassoside, Panthenol, Allantoin, Zinc PCA"
},
{
"code": "sk068",
"product_name": "Soothing & Moisture Aloe Vera 92% Soothing Gel",
"brands": "Nature Republic",
"kw": "네이처리퍼블릭 알로에베라 92 수딩젤",
"image_front_url": "",
"ingredients_text": "Aloe Barbadensis Leaf Extract, Water, Glycerin, Alcohol Denat, Butylene Glycol, Carbomer, Fragrance"
},
{
"code": "8809738312664",
"product_name": "Relief Sun : Rice + Probiotics SPF50+",
"brands": "Beauty of Joseon",
"kw": "조선미녀 릴리프 선 맑은쌀 선크림",
"image_front_url": "",
"ingredients_text": "Water, Dibutyl Adipate, Propanediol, Ethylhexyl Triazone, Oryza Sativa (Rice) Extract, Methoxyphenyl Triazine, Coco-Caprylate/Caprate, Glycerin, Diethylamino Hydroxybenzoyl Hexyl Benzoate, Galactomyces Ferment Filtrate, Butylene Glycol, Niacinamide, Camellia Sinensis Leaf Extract, Panthenol, Adenosine, Tocopherol"
},
{
"code": "sk069",
"product_name": "Birch Juice Moisturizing Sun Cream SPF50+",
"brands": "Round Lab",
"kw": "라운드랩 자작나무 수분 선크림",
"image_front_url": "",
"ingredients_text": "Water, Butylene Glycol, Ethylhexyl Methoxycinnamate, Betula Platyphylla Japonica Juice, Diethylamino Hydroxybenzoyl Hexyl Benzoate, Ethylhexyl Triazone, Glycerin, Niacinamide, Panthenol, Sodium Hyaluronate, Adenosine"
},
{
"code": "sk070",
"product_name": "Green Mild Up Sun+ SPF50+",
"brands": "Dr.G",
"kw": "닥터지 그린 마일드업 선 무기자차 선크림",
"image_front_url": "",
"ingredients_text": "Water, Zinc Oxide, Butylene Glycol, Titanium Dioxide, Caprylic/Capric Triglyceride, Centella Asiatica Extract, Madecassoside, Glycerin, Panthenol, Squalane"
},
{
"code": "sk071",
"product_name": "DIVE-IN Watery Moisture Sun Cream SPF50+",
"brands": "Torriden",
"kw": "토리든 다이브인 워터리 수분 선크림",
"image_front_url": "",
"ingredients_text": "Water, Dibutyl Adipate, Diethylamino Hydroxybenzoyl Hexyl Benzoate, Butylene Glycol, Ethylhexyl Triazone, Sodium Hyaluronate, Panthenol, Allantoin, Adenosine"
},
{
"code": "sk072",
"product_name": "Hyalu-Cica Water-Fit Sun Serum SPF50+",
"brands": "SKIN1004",
"kw": "스킨1004 히알루시카 워터핏 선세럼 선크림",
"image_front_url": "",
"ingredients_text": "Water, Dibutyl Adipate, Propanediol, Ethylhexyl Triazone, Centella Asiatica Extract, Diethylamino Hydroxybenzoyl Hexyl Benzoate, Sodium Hyaluronate, Madecassoside, Panthenol, Adenosine"
},
{
"code": "sk073",
"product_name": "Hyaluronic Acid Watery Sun Gel SPF50+",
"brands": "Isntree",
"kw": "이즌트리 히알루론산 워터리 선젤 선크림",
"image_front_url": "",
"ingredients_text": "Water, Dibutyl Adipate, Diethylamino Hydroxybenzoyl Hexyl Benzoate, Ethylhexyl Triazone, Sodium Hyaluronate, Hyaluronic Acid, Butylene Glycol, Panthenol, Adenosine"
},
{
"code": "3337875597186",
"product_name": "Anthelios Invisible Fluid SPF50+",
"brands": "La Roche-Posay",
"kw": "라로슈포제 안뗄리오스 인비저블 플루이드 선크림",
"image_front_url": "",
"ingredients_text": "Aqua, Alcohol Denat, Diisopropyl Sebacate, Isopropyl Lauroyl Sarcosinate, Silica, Drometrizole Trisiloxane, Butyl Methoxydibenzoylmethane, Ethylhexyl Triazone, Glycerin, Panthenol, Tocopherol, Fragrance, Linalool"
},
{
"code": "sk074",
"product_name": "UV Aqua Rich Watery Essence SPF50+",
"brands": "Biore",
"kw": "비오레 UV 아쿠아리치 워터리 에센스 선크림",
"image_front_url": "",
"ingredients_text": "Water, Ethylhexyl Methoxycinnamate, Alcohol Denat, Lauryl Methacrylate/Sodium Methacrylate Crosspolymer, Bis-Ethylhexyloxyphenol Methoxyphenyl Triazine, Glycerin, Sodium Hyaluronate, Fragrance"
},
{
"code": "sk075",
"product_name": "Perfect UV Sunscreen Skincare Milk SPF50+",
"brands": "Anessa",
"kw": "아네사 퍼펙트 UV 선스크린 스킨케어 밀크 선크림",
"image_front_url": "",
"ingredients_text": "Water, Zinc Oxide, Alcohol Denat, Cyclopentasiloxane, Ethylhexyl Methoxycinnamate, Titanium Dioxide, Dimethicone, Camellia Sinensis Leaf Extract, Tocopheryl Acetate, Fragrance"
},
{
"code": "sk076",
"product_name": "All Around Safe Block Essence Sun SPF45",
"brands": "Missha",
"kw": "미샤 올어라운드 세이프블록 에센스 선 선크림",
"image_front_url": "",
"ingredients_text": "Water, Ethylhexyl Methoxycinnamate, Butylene Glycol, Isoamyl p-Methoxycinnamate, Bis-Ethylhexyloxyphenol Methoxyphenyl Triazine, Glycerin, Aloe Barbadensis Leaf Extract, Sodium Hyaluronate, Adenosine, Fragrance"
},
{
"code": "sk077",
"product_name": "Daily Go-To Sunscreen SPF50+",
"brands": "Purito",
"kw": "퓨리토 데일리 고투 선크림",
"image_front_url": "",
"ingredients_text": "Water, Butylene Glycol, Ethylhexyl Methoxycinnamate, Diethylamino Hydroxybenzoyl Hexyl Benzoate, Ethylhexyl Triazone, Centella Asiatica Extract, Panthenol, Sodium Hyaluronate, Adenosine"
},
{
"code": "sk078",
"product_name": "Laser Sunscreen 100 SPF50+",
"brands": "Cell Fusion C",
"kw": "셀퓨전씨 레이저 선스크린 100 선크림",
"image_front_url": "",
"ingredients_text": "Water, Cyclopentasiloxane, Zinc Oxide, Butylene Glycol, Titanium Dioxide, Dimethicone, Glycerin, Panthenol, Madecassoside, Tocopheryl Acetate"
},
{
"code": "8809416471490",
"product_name": "Low pH Good Morning Gel Cleanser",
"brands": "COSRX",
"kw": "코스알엑스 로우 pH 굿모닝 젤 클렌저 약산성 클렌징폼",
"image_front_url": "",
"ingredients_text": "Water, Cocamidopropyl Betaine, Sodium Lauroyl Methyl Isethionate, Polysorbate 20, Styrax Japonicus Branch/Fruit/Leaf Extract, Butylene Glycol, Saccharomyces Ferment, Melaleuca Alternifolia (Tea Tree) Leaf Oil, Allantoin, Caprylyl Glycol, Ethylhexylglycerin, Betaine Salicylate, Citric Acid, Sodium Benzoate"
},
{
"code": "sk079",
"product_name": "Pure Cleansing Oil",
"brands": "ma:nyo",
"kw": "마녀공장 퓨어 클렌징 오일",
"image_front_url": "",
"ingredients_text": "Olea Europaea (Olive) Fruit Oil, Caprylic/Capric Triglyceride, Sorbeth-30 Tetraoleate, Argania Spinosa Kernel Oil, Simmondsia Chinensis (Jojoba) Seed Oil, Camellia Sinensis Leaf Extract, Tocopherol"
},
{
"code": "sk080",
"product_name": "Clean It Zero Cleansing Balm Original",
"brands": "Banila Co",
"kw": "바닐라코 클린잇제로 클렌징밤",
"image_front_url": "",
"ingredients_text": "Cetyl Ethylhexanoate, PEG-20 Glyceryl Triisostearate, Caprylic/Capric Triglyceride, Polyethylene, Butylene Glycol, Water, Papain, Fragrance"
},
{
"code": "sk081",
"product_name": "All Clean Balm",
"brands": "Heimish",
"kw": "헤이미쉬 올클린밤 클렌징밤",
"image_front_url": "",
"ingredients_text": "Cetyl Ethylhexanoate, Caprylic/Capric Triglyceride, PEG-20 Glyceryl Triisostearate, Polyethylene, Butyrospermum Parkii (Shea) Butter, Coco-Caprylate/Caprate, Citrus Aurantium Bergamia (Bergamot) Fruit Oil, Fragrance, Limonene, Linalool, Citral"
},
{
"code": "sk082",
"product_name": "1025 Dokdo Cleanser",
"brands": "Round Lab",
"kw": "라운드랩 1025 독도 클렌저 클렌징폼",
"image_front_url": "",
"ingredients_text": "Water, Glycerin, Myristic Acid, Stearic Acid, Potassium Hydroxide, Lauric Acid, Cocamidopropyl Betaine, Sea Water, Panthenol, Betaine"
},
{
"code": "sk083",
"product_name": "Heartleaf Quercetinol Pore Deep Cleansing Foam",
"brands": "Anua",
"kw": "아누아 어성초 퀘르세티놀 모공 딥 클렌징폼",
"image_front_url": "",
"ingredients_text": "Water, Glycerin, Stearic Acid, Myristic Acid, Potassium Hydroxide, Houttuynia Cordata Extract, Cocamidopropyl Betaine, Salicylic Acid, Allantoin"
},
{
"code": "sk084",
"product_name": "SoonJung Whip Cleanser",
"brands": "Etude",
"kw": "에뛰드 순정 휩 클렌저 약산성 클렌징폼",
"image_front_url": "",
"ingredients_text": "Water, Glycerin, Cocamidopropyl Betaine, Butylene Glycol, Sodium Cocoyl Glycinate, Panthenol, Madecassoside, Camellia Sinensis Leaf Extract"
},
{
"code": "sk085",
"product_name": "Perfect Whip Facial Wash",
"brands": "Senka",
"kw": "센카 퍼펙트휩 클렌징폼",
"image_front_url": "",
"ingredients_text": "Water, Glycerin, Stearic Acid, Myristic Acid, Potassium Hydroxide, Palmitic Acid, Sorbitol, Sodium Hyaluronate, Fragrance"
},
{
"code": "sk086",
"product_name": "Foaming Facial Cleanser",
"brands": "CeraVe",
"kw": "세라비 포밍 페이셜 클렌저 클렌징폼",
"image_front_url": "",
"ingredients_text": "Aqua, Cocamidopropyl Hydroxysultaine, Glycerin, Niacinamide, Ceramide NP, Ceramide AP, Sodium Lauroyl Sarcosinate, Hyaluronic Acid, Cholesterol, Phytosphingosine"
},
{
"code": "sk087",
"product_name": "Sensibio H2O Micellar Water",
"brands": "Bioderma",
"kw": "바이오더마 센시비오 H2O 클렌징워터",
"image_front_url": "",
"ingredients_text": "Aqua, PEG-6 Caprylic/Capric Glycerides, Cucumis Sativus (Cucumber) Fruit Extract, Propylene Glycol, Cetrimonium Bromide, Disodium EDTA"
},
{
"code": "sk088",
"product_name": "Mung Bean pH-Balanced Cleansing Foam",
"brands": "Beplain",
"kw": "비플레인 녹두 약산성 클렌징폼",
"image_front_url": "",
"ingredients_text": "Water, Glycerin, Cocamidopropyl Betaine, Phaseolus Radiatus (Mung Bean) Seed Extract, Sodium Cocoyl Isethionate, Butylene Glycol, Panthenol, Allantoin"
},
{
"code": "8809803544726",
"product_name": "Water Sleeping Mask EX",
"brands": "Laneige",
"kw": "라네즈 워터 슬리핑 마스크 수면팩",
"image_front_url": "",
"ingredients_text": "Water, Butylene Glycol, Glycerin, Cyclopentasiloxane, Trehalose, Sodium Hyaluronate, Squalane, Beta-Glucan, Panthenol, Cetearyl Alcohol, Fragrance, Limonene, Linalool"
},
{
"code": "sk089",
"product_name": "Tea Tree Essential Blemish Care Mask",
"brands": "Mediheal",
"kw": "메디힐 티트리 에센셜 마스크팩",
"image_front_url": "",
"ingredients_text": "Water, Butylene Glycol, Glycerin, Melaleuca Alternifolia (Tea Tree) Leaf Extract, Centella Asiatica Extract, Salicylic Acid, Panthenol, Allantoin, Betaine"
},
{
"code": "sk090",
"product_name": "N.M.F Aquaring Ampoule Mask",
"brands": "Mediheal",
"kw": "메디힐 NMF 아쿠아링 앰플 마스크팩",
"image_front_url": "",
"ingredients_text": "Water, Butylene Glycol, Glycerin, Sodium Hyaluronate, Betaine, Panthenol, Allantoin, Trehalose, Sodium PCA"
},
{
"code": "sk091",
"product_name": "Mild Acidic pH Sheet Mask Heartleaf Fit",
"brands": "Abib",
"kw": "아비브 약산성 pH 시트 마스크팩 어성초",
"image_front_url": "",
"ingredients_text": "Water, Butylene Glycol, Glycerin, Houttuynia Cordata Extract, Betaine, Panthenol, Madecassoside, Allantoin"
},
{
"code": "sk092",
"product_name": "Super Volcanic Pore Clay Mask 2X",
"brands": "Innisfree",
"kw": "이니스프리 슈퍼 화산송이 모공 클레이 마스크팩",
"image_front_url": "",
"ingredients_text": "Water, Kaolin, Bentonite, Butylene Glycol, Glycerin, Titanium Dioxide, Volcanic Ash, Camellia Sinensis Leaf Extract, Lactic Acid, Fragrance"
},
{
"code": "sk093",
"product_name": "Indian Healing Clay",
"brands": "Aztec Secret",
"kw": "아즈텍 시크릿 인디언 힐링 클레이 팩",
"image_front_url": "",
"ingredients_text": "Bentonite"
},
{
"code": "sk094",
"product_name": "Ultimate Nourishing Rice Overnight Spa Mask",
"brands": "COSRX",
"kw": "코스알엑스 얼티밋 라이스 오버나이트 스파 마스크팩",
"image_front_url": "",
"ingredients_text": "Oryza Sativa (Rice) Extract, Glycerin, Butylene Glycol, Niacinamide, Sodium Hyaluronate, Panthenol, Squalane, Allantoin"
},
{
"code": "sk095",
"product_name": "Black Sugar Mask Wash Off",
"brands": "Skinfood",
"kw": "스킨푸드 블랙슈가 마스크 워시오프 팩 각질",
"image_front_url": "",
"ingredients_text": "Sucrose, Mineral Oil, Polybutene, Macadamia Ternifolia Seed Oil, Glycerin, Simmondsia Chinensis (Jojoba) Seed Oil, Fragrance"
},
{
"code": "sk096",
"product_name": "Youth Lasting Real Eye Cream For Face",
"brands": "AHC",
"kw": "AHC 유스 래스팅 리얼 아이크림",
"image_front_url": "",
"ingredients_text": "Water, Glycerin, Butylene Glycol, Niacinamide, Cetearyl Alcohol, Squalane, Sodium Hyaluronate, Adenosine, Palmitoyl Tripeptide-5, Panthenol"
},
{
"code": "sk097",
"product_name": "Snail Repair Eye Cream",
"brands": "Mizon",
"kw": "미즌 스네일 리페어 아이크림 달팽이",
"image_front_url": "",
"ingredients_text": "Snail Secretion Filtrate, Water, Butylene Glycol, Glycerin, Cetearyl Alcohol, Niacinamide, Adenosine, Palmitoyl Pentapeptide-4, Panthenol"
},
{
"code": "sk098",
"product_name": "Acne Pimple Master Patch",
"brands": "COSRX",
"kw": "코스알엑스 아크네 여드름 패치",
"image_front_url": "",
"ingredients_text": "Cellulose Gum, Styrene Isoprene Styrene Block Copolymer, Polyisobutylene, Petroleum Resin, Polyurethane Film"
},
{
"code": "sk099",
"product_name": "Lip Sleeping Mask Berry",
"brands": "Laneige",
"kw": "라네즈 립 슬리핑 마스크 립케어",
"image_front_url": "",
"ingredients_text": "Diisostearyl Malate, Hydrogenated Polyisobutene, Phytosteryl/Isostearyl/Cetyl/Stearyl/Behenyl Dimer Dilinoleate, Butyrospermum Parkii (Shea) Butter, Cocos Nucifera (Coconut) Oil, Squalane, Sodium Hyaluronate, Tocopherol, Fragrance, Limonene, Linalool"
},
{
"code": "sk100",
"product_name": "Original Petroleum Jelly",
"brands": "Vaseline",
"kw": "바세린 오리지널 퓨어 페트롤리움 젤리 립 바디",
"image_front_url": "",
"ingredients_text": "Petrolatum"
},
{
"code": "sk101",
"product_name": "Eau Thermale Thermal Spring Water Mist",
"brands": "Avene",
"kw": "아벤느 오 떼르말 미스트",
"image_front_url": "",
"ingredients_text": "Avene Thermal Spring Water, Nitrogen"
},
{
"code": "sk102",
"product_name": "Cicapair Calming Mist",
"brands": "Dr.Jart+",
"kw": "닥터자르트 시카페어 카밍 미스트",
"image_front_url": "",
"ingredients_text": "Water, Butylene Glycol, Glycerin, Centella Asiatica Extract, Madecassoside, Panthenol, Allantoin, Betaine"
},
{
"code": "sk103",
"product_name": "Ceramide Ato Lotion",
"brands": "Illiyoon",
"kw": "일리윤 세라마이드 아토 로션 바디로션",
"image_front_url": "",
"ingredients_text": "Water, Glycerin, Caprylic/Capric Triglyceride, Cetearyl Alcohol, Ceramide NP, Butyrospermum Parkii (Shea) Butter, Panthenol, Allantoin, Betaine"
},
{
"code": "sk104",
"product_name": "Atobarrier 365 Lotion",
"brands": "AESTURA",
"kw": "에스트라 아토배리어 365 로션 바디",
"image_front_url": "",
"ingredients_text": "Water, Glycerin, Caprylic/Capric Triglyceride, Cetearyl Alcohol, Ceramide NP, Cholesterol, Panthenol, Hydrogenated Lecithin, Allantoin"
},
{
"code": "sk105",
"product_name": "Daily Moisturizing Lotion",
"brands": "Aveeno",
"kw": "아비노 데일리 모이스처라이징 바디로션",
"image_front_url": "",
"ingredients_text": "Water, Glycerin, Distearyldimonium Chloride, Petrolatum, Isopropyl Palmitate, Cetyl Alcohol, Avena Sativa (Oat) Kernel Flour, Dimethicone, Benzyl Alcohol"
},
{
"code": "sk106",
"product_name": "Moisturizing Lotion",
"brands": "CeraVe",
"kw": "세라비 모이스처라이징 바디로션",
"image_front_url": "",
"ingredients_text": "Aqua, Glycerin, Caprylic/Capric Triglyceride, Cetearyl Alcohol, Ceramide NP, Ceramide AP, Hyaluronic Acid, Cholesterol, Dimethicone, Phenoxyethanol"
},
{
"code": "sk107",
"product_name": "Deep Moisture Body Wash",
"brands": "Dove",
"kw": "도브 딥 모이스처 바디워시",
"image_front_url": "",
"ingredients_text": "Water, Cocamidopropyl Betaine, Sodium Lauroyl Isethionate, Sodium Laureth Sulfate, Glycerin, Stearic Acid, Helianthus Annuus (Sunflower) Seed Oil, Fragrance, Citric Acid"
},
{
"code": "sk108",
"product_name": "Ceramide Ato Bubble Wash",
"brands": "Illiyoon",
"kw": "일리윤 세라마이드 아토 버블 워시 바디워시",
"image_front_url": "",
"ingredients_text": "Water, Glycerin, Cocamidopropyl Betaine, Lauryl Hydroxysultaine, Ceramide NP, Panthenol, Allantoin, Citric Acid"
},
{
"code": "sk109",
"product_name": "Honey & Macadamia Nature Shampoo",
"brands": "Kundal",
"kw": "쿤달 허니 앤 마카다미아 샴푸",
"image_front_url": "",
"ingredients_text": "Water, Sodium Cocoyl Isethionate, Cocamidopropyl Betaine, Lauryl Glucoside, Glycerin, Macadamia Ternifolia Seed Oil, Mel (Honey) Extract, Panthenol, Fragrance, Limonene"
},
{
"code": "sk110",
"product_name": "Damage Care & Nourishing Shampoo",
"brands": "Ryo",
"kw": "려 함빛 손상 케어 샴푸",
"image_front_url": "",
"ingredients_text": "Water, Sodium Laureth Sulfate, Cocamidopropyl Betaine, Sodium Chloride, Glycerin, Panax Ginseng Root Extract, Camellia Japonica Seed Oil, Panthenol, Fragrance, Hexyl Cinnamal"
},
{
"code": "sk111",
"product_name": "Perfect Serum Original",
"brands": "Mise en Scene",
"kw": "미장센 퍼펙트 세럼 헤어 에센스",
"image_front_url": "",
"ingredients_text": "Cyclopentasiloxane, Dimethiconol, Cyclohexasiloxane, Argania Spinosa Kernel Oil, Camellia Japonica Seed Oil, Cocos Nucifera (Coconut) Oil, Olea Europaea (Olive) Fruit Oil, Fragrance, Limonene, Linalool, Hexyl Cinnamal"
},
{
"code": "sk112",
"product_name": "Rosemary Scalp Scaling Shampoo",
"brands": "Aromatica",
"kw": "아로마티카 로즈마리 스칼프 스케일링 샴푸",
"image_front_url": "",
"ingredients_text": "Water, Sodium Cocoyl Isethionate, Cocamidopropyl Betaine, Glycerin, Rosmarinus Officinalis (Rosemary) Leaf Oil, Salicylic Acid, Menthol, Panthenol, Limonene, Linalool"
},
{
"code": "sk113",
"product_name": "Water Treatment Miracle 10",
"brands": "Moremo",
"kw": "모레모 워터 트리트먼트 미라클10 헤어",
"image_front_url": "",
"ingredients_text": "Water, Cetearyl Alcohol, Behentrimonium Chloride, Hydrolyzed Keratin, Hydrolyzed Collagen, Camellia Japonica Seed Oil, Panthenol, Fragrance"
},
{
"code": "sk114",
"product_name": "M Perfect Cover BB Cream No.23",
"brands": "Missha",
"kw": "미샤 M 퍼펙트커버 비비크림",
"image_front_url": "",
"ingredients_text": "Water, Cyclopentasiloxane, Titanium Dioxide, Ethylhexyl Methoxycinnamate, PEG-10 Dimethicone, Iron Oxides, Rosa Damascena Flower Water, Adenosine, Fragrance"
},
{
"code": "sk115",
"product_name": "No-Sebum Mineral Powder",
"brands": "Innisfree",
"kw": "이니스프리 노세범 미네랄 파우더 피지",
"image_front_url": "",
"ingredients_text": "Silica, Mica, Lauroyl Lysine, Zinc Oxide, Mentha Piperita (Peppermint) Extract, Camellia Sinensis Leaf Extract"
},
{
"code": "sk116",
"product_name": "Dear Darling Water Gel Tint",
"brands": "Etude",
"kw": "에뛰드 디어달링 워터젤 틴트 립",
"image_front_url": "",
"ingredients_text": "Water, Butylene Glycol, Alcohol Denat, Glycerin, Red 33, Yellow 5, Fragrance, Sodium Hyaluronate"
},
{
"code": "sk117",
"product_name": "Velvet Lip Tint",
"brands": "3CE",
"kw": "쓰리씨이 벨벳 립 틴트",
"image_front_url": "",
"ingredients_text": "Diisostearyl Malate, Hydrogenated Polyisobutene, Silica Dimethyl Silylate, Polyglyceryl-2 Triisostearate, Red 7 Lake, Titanium Dioxide, Fragrance"
},
{
"code": "sk118",
"product_name": "Red Blemish Clear Soothing Cream",
"brands": "Dr.G",
"kw": "닥터지 레드 블레미쉬 클리어 수딩 크림",
"image_front_url": "",
"ingredients_text": "Water, Glycerin, Butylene Glycol, Centella Asiatica Extract, Madecassoside, Asiaticoside, Panthenol, Squalane, Ceramide NP, Allantoin"
},
{
"code": "sk119",
"product_name": "Houttuynia Cordata Calming Moisture Cream",
"brands": "Goodal",
"kw": "구달 어성초 진정 수분 크림",
"image_front_url": "",
"ingredients_text": "Water, Houttuynia Cordata Extract, Glycerin, Butylene Glycol, Squalane, Panthenol, Madecassoside, Allantoin, Betaine"
},
{
"code": "sk120",
"product_name": "Royal Honey Propolis Enrich Essence",
"brands": "Skinfood",
"kw": "스킨푸드 로얄허니 프로폴리스 인리치 에센스",
"image_front_url": "",
"ingredients_text": "Propolis Extract, Water, Butylene Glycol, Glycerin, Niacinamide, Royal Jelly Extract, Sodium Hyaluronate, Adenosine, Fragrance"
},
{
"code": "sk121",
"product_name": "Aloe 99% Soothing Gel",
"brands": "Holika Holika",
"kw": "홀리카홀리카 알로에 99 수딩젤",
"image_front_url": "",
"ingredients_text": "Aloe Barbadensis Leaf Extract, Water, Butylene Glycol, Glycerin, Alcohol Denat, Carbomer, Fragrance, Limonene"
},
{
"code": "sk122",
"product_name": "Gold & Snail Hydrogel Eye Patch",
"brands": "Petitfee",
"kw": "쁘띠페 골드 스네일 하이드로겔 아이패치",
"image_front_url": "",
"ingredients_text": "Water, Glycerin, Snail Secretion Filtrate, Butylene Glycol, Sodium Hyaluronate, Gold, Niacinamide, Adenosine, Allantoin"
},
{
"code": "sk123",
"product_name": "Solid-In Ceramide Cream",
"brands": "Torriden",
"kw": "토리든 솔리드인 세라마이드 크림",
"image_front_url": "",
"ingredients_text": "Water, Glycerin, Caprylic/Capric Triglyceride, Ceramide NP, Squalane, Cetearyl Alcohol, Panthenol, Madecassoside, Hydrogenated Lecithin"
},
{
"code": "sk124",
"product_name": "Green Tea Fresh Toner",
"brands": "Isntree",
"kw": "이즌트리 그린티 프레시 토너 녹차",
"image_front_url": "",
"ingredients_text": "Camellia Sinensis Leaf Water, Water, Butylene Glycol, Glycerin, Salix Alba (Willow) Bark Extract, Betaine, Allantoin, Panthenol"
},
{
"code": "sk125",
"product_name": "Gummy Sheet Mask Madecassoside",
"brands": "Abib",
"kw": "아비브 껌딱지 시트 마스크팩 마데카소사이드",
"image_front_url": "",
"ingredients_text": "Water, Butylene Glycol, Glycerin, Madecassoside, Centella Asiatica Extract, Panthenol, Allantoin, Sodium Hyaluronate"
},
{
"code": "sk126",
"product_name": "Madecassoside Blemish Pad",
"brands": "Mediheal",
"kw": "메디힐 마데카소사이드 흔적 패드 토너패드",
"image_front_url": "",
"ingredients_text": "Water, Butylene Glycol, Glycerin, Madecassoside, Centella Asiatica Extract, Niacinamide, Panthenol, Allantoin"
},
{
"code": "sk127",
"product_name": "Kill Cover The New Founwear Cushion",
"brands": "Clio",
"kw": "클리오 킬커버 파운웨어 쿠션 베이스",
"image_front_url": "",
"ingredients_text": "Water, Cyclopentasiloxane, Titanium Dioxide, Ethylhexyl Methoxycinnamate, Phenyl Trimethicone, Iron Oxides, Niacinamide, Adenosine, Fragrance"
},
{
"code": "sk128",
"product_name": "Dear Hydration Boosting Cream",
"brands": "Banila Co",
"kw": "바닐라코 디어 하이드레이션 수분크림",
"image_front_url": "",
"ingredients_text": "Water, Glycerin, Butylene Glycol, Squalane, Cetearyl Alcohol, Sodium Hyaluronate, Trehalose, Panthenol, Fragrance"
},
{
"code": "sk129",
"product_name": "Water Splash Sun Cream SPF50+",
"brands": "espoir",
"kw": "에스쁘아 워터 스플래시 선크림",
"image_front_url": "",
"ingredients_text": "Water, Ethylhexyl Methoxycinnamate, Butylene Glycol, Diethylamino Hydroxybenzoyl Hexyl Benzoate, Ethylhexyl Triazone, Glycerin, Niacinamide, Panthenol, Fragrance"
},
{
"code": "sk130",
"product_name": "Time Is Running Out Mist",
"brands": "Sioris",
"kw": "시오리스 타임 이즈 러닝 아웃 미스트",
"image_front_url": "",
"ingredients_text": "Citrus Unshiu Fruit Water, Water, Glycerin, Butylene Glycol, Sodium Hyaluronate, Panthenol, Tocopherol, Fragrance, Limonene"
},
{
"code": "sk131",
"product_name": "Jeju Cica Serum",
"brands": "Ongredients",
"kw": "온그리디언츠 제주 시카 세럼 성분에디터",
"image_front_url": "",
"ingredients_text": "Centella Asiatica Extract, Water, Butylene Glycol, Glycerin, Madecassoside, Panthenol, Sodium Hyaluronate, Allantoin"
}
];
