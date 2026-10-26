import { i as __toESM } from "../_runtime.mjs";
import { K as require_react, b as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as ChevronLeft, i as ChevronRight, n as Plus, o as ArrowLeftRight, r as Minus } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-p8S1M6WM.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var AIRPORTS = [
	{
		code: "ICN",
		city: "서울/인천",
		airport: "인천",
		country: "한국",
		region: "dom",
		en: "Seoul Incheon"
	},
	{
		code: "GMP",
		city: "서울/김포",
		airport: "김포",
		country: "한국",
		region: "dom",
		en: "Seoul Gimpo"
	},
	{
		code: "PUS",
		city: "부산",
		airport: "김해",
		country: "한국",
		region: "dom",
		en: "Busan"
	},
	{
		code: "CJU",
		city: "제주",
		airport: "제주",
		country: "한국",
		region: "dom",
		en: "Jeju"
	},
	{
		code: "TAE",
		city: "대구",
		airport: "대구",
		country: "한국",
		region: "dom",
		en: "Daegu"
	},
	{
		code: "CJJ",
		city: "청주",
		airport: "청주",
		country: "한국",
		region: "dom",
		en: "Cheongju"
	},
	{
		code: "KWJ",
		city: "광주",
		airport: "광주",
		country: "한국",
		region: "dom",
		en: "Gwangju"
	},
	{
		code: "USN",
		city: "울산",
		airport: "울산",
		country: "한국",
		region: "dom",
		en: "Ulsan"
	},
	{
		code: "RSU",
		city: "여수",
		airport: "여수",
		country: "한국",
		region: "dom",
		en: "Yeosu"
	},
	{
		code: "HIN",
		city: "진주",
		airport: "사천",
		country: "한국",
		region: "dom",
		en: "Jinju Sacheon"
	},
	{
		code: "MWX",
		city: "무안",
		airport: "무안",
		country: "한국",
		region: "dom",
		en: "Muan"
	},
	{
		code: "NRT",
		city: "도쿄",
		airport: "나리타",
		country: "일본",
		region: "nea",
		en: "Tokyo Narita"
	},
	{
		code: "HND",
		city: "도쿄",
		airport: "하네다",
		country: "일본",
		region: "nea",
		en: "Tokyo Haneda"
	},
	{
		code: "KIX",
		city: "오사카",
		airport: "간사이",
		country: "일본",
		region: "nea",
		en: "Osaka"
	},
	{
		code: "FUK",
		city: "후쿠오카",
		airport: "후쿠오카",
		country: "일본",
		region: "nea",
		en: "Fukuoka"
	},
	{
		code: "NGO",
		city: "나고야",
		airport: "주부",
		country: "일본",
		region: "nea",
		en: "Nagoya"
	},
	{
		code: "OKA",
		city: "오키나와",
		airport: "나하",
		country: "일본",
		region: "nea",
		en: "Okinawa"
	},
	{
		code: "CTS",
		city: "삿포로",
		airport: "신치토세",
		country: "일본",
		region: "nea",
		en: "Sapporo"
	},
	{
		code: "KOJ",
		city: "가고시마",
		airport: "가고시마",
		country: "일본",
		region: "nea",
		en: "Kagoshima"
	},
	{
		code: "HIJ",
		city: "히로시마",
		airport: "히로시마",
		country: "일본",
		region: "nea",
		en: "Hiroshima"
	},
	{
		code: "KMJ",
		city: "구마모토",
		airport: "구마모토",
		country: "일본",
		region: "nea",
		en: "Kumamoto"
	},
	{
		code: "OKJ",
		city: "오카야마",
		airport: "오카야마",
		country: "일본",
		region: "nea",
		en: "Okayama"
	},
	{
		code: "FSZ",
		city: "시즈오카",
		airport: "시즈오카",
		country: "일본",
		region: "nea",
		en: "Shizuoka"
	},
	{
		code: "KIJ",
		city: "니가타",
		airport: "니가타",
		country: "일본",
		region: "nea",
		en: "Niigata"
	},
	{
		code: "TAK",
		city: "다카마쓰",
		airport: "다카마쓰",
		country: "일본",
		region: "nea",
		en: "Takamatsu"
	},
	{
		code: "MYJ",
		city: "마쓰야마",
		airport: "마쓰야마",
		country: "일본",
		region: "nea",
		en: "Matsuyama"
	},
	{
		code: "AKJ",
		city: "아사히카와",
		airport: "아사히카와",
		country: "일본",
		region: "nea",
		en: "Asahikawa"
	},
	{
		code: "PEK",
		city: "베이징",
		airport: "수도",
		country: "중국",
		region: "nea",
		en: "Beijing Capital"
	},
	{
		code: "PKX",
		city: "베이징",
		airport: "다싱",
		country: "중국",
		region: "nea",
		en: "Beijing Daxing"
	},
	{
		code: "PVG",
		city: "상하이",
		airport: "푸둥",
		country: "중국",
		region: "nea",
		en: "Shanghai Pudong"
	},
	{
		code: "SHA",
		city: "상하이",
		airport: "홍차오",
		country: "중국",
		region: "nea",
		en: "Shanghai Hongqiao"
	},
	{
		code: "CAN",
		city: "광저우",
		airport: "바이윈",
		country: "중국",
		region: "nea",
		en: "Guangzhou"
	},
	{
		code: "SZX",
		city: "선전",
		airport: "보안",
		country: "중국",
		region: "nea",
		en: "Shenzhen"
	},
	{
		code: "TAO",
		city: "칭다오",
		airport: "교동",
		country: "중국",
		region: "nea",
		en: "Qingdao"
	},
	{
		code: "DLC",
		city: "다롄",
		airport: "저우수이쯔",
		country: "중국",
		region: "nea",
		en: "Dalian"
	},
	{
		code: "SHE",
		city: "선양",
		airport: "타오셴",
		country: "중국",
		region: "nea",
		en: "Shenyang"
	},
	{
		code: "WEH",
		city: "웨이하이",
		airport: "다수이보",
		country: "중국",
		region: "nea",
		en: "Weihai"
	},
	{
		code: "YNT",
		city: "옌타이",
		airport: "펑라이",
		country: "중국",
		region: "nea",
		en: "Yantai"
	},
	{
		code: "TSN",
		city: "톈진",
		airport: "빈하이",
		country: "중국",
		region: "nea",
		en: "Tianjin"
	},
	{
		code: "KMG",
		city: "쿤밍",
		airport: "창수이",
		country: "중국",
		region: "nea",
		en: "Kunming"
	},
	{
		code: "XIY",
		city: "시안",
		airport: "셴양",
		country: "중국",
		region: "nea",
		en: "Xian"
	},
	{
		code: "CTU",
		city: "청두",
		airport: "톈푸",
		country: "중국",
		region: "nea",
		en: "Chengdu"
	},
	{
		code: "CKG",
		city: "충칭",
		airport: "장베이",
		country: "중국",
		region: "nea",
		en: "Chongqing"
	},
	{
		code: "HGH",
		city: "항저우",
		airport: "샤오산",
		country: "중국",
		region: "nea",
		en: "Hangzhou"
	},
	{
		code: "NKG",
		city: "난징",
		airport: "루커우",
		country: "중국",
		region: "nea",
		en: "Nanjing"
	},
	{
		code: "CSX",
		city: "창사",
		airport: "황화",
		country: "중국",
		region: "nea",
		en: "Changsha"
	},
	{
		code: "WUH",
		city: "우한",
		airport: "톈허",
		country: "중국",
		region: "nea",
		en: "Wuhan"
	},
	{
		code: "XMN",
		city: "샤먼",
		airport: "가오치",
		country: "중국",
		region: "nea",
		en: "Xiamen"
	},
	{
		code: "HRB",
		city: "하얼빈",
		airport: "타이핑",
		country: "중국",
		region: "nea",
		en: "Harbin"
	},
	{
		code: "CGQ",
		city: "창춘",
		airport: "룽자",
		country: "중국",
		region: "nea",
		en: "Changchun"
	},
	{
		code: "SYX",
		city: "싼야",
		airport: "피닉스",
		country: "중국",
		region: "nea",
		en: "Sanya"
	},
	{
		code: "KWL",
		city: "구이린",
		airport: "량장",
		country: "중국",
		region: "nea",
		en: "Guilin"
	},
	{
		code: "HAK",
		city: "하이커우",
		airport: "메이란",
		country: "중국",
		region: "nea",
		en: "Haikou"
	},
	{
		code: "YNJ",
		city: "옌지",
		airport: "차오양촨",
		country: "중국",
		region: "nea",
		en: "Yanji"
	},
	{
		code: "HKG",
		city: "홍콩",
		airport: "홍콩",
		country: "홍콩",
		region: "nea",
		en: "Hong Kong"
	},
	{
		code: "TPE",
		city: "타이베이",
		airport: "타오위안",
		country: "대만",
		region: "nea",
		en: "Taipei Taoyuan"
	},
	{
		code: "TSA",
		city: "타이베이",
		airport: "송산",
		country: "대만",
		region: "nea",
		en: "Taipei Songshan"
	},
	{
		code: "KHH",
		city: "가오슝",
		airport: "가오슝",
		country: "대만",
		region: "nea",
		en: "Kaohsiung"
	},
	{
		code: "ULN",
		city: "울란바토르",
		airport: "칭기스칸",
		country: "몽골",
		region: "nea",
		en: "Ulaanbaatar"
	},
	{
		code: "BKK",
		city: "방콕",
		airport: "수완나품",
		country: "태국",
		region: "sea",
		en: "Bangkok"
	},
	{
		code: "CNX",
		city: "치앙마이",
		airport: "치앙마이",
		country: "태국",
		region: "sea",
		en: "Chiang Mai"
	},
	{
		code: "SGN",
		city: "호찌민",
		airport: "떤선녓",
		country: "베트남",
		region: "sea",
		en: "Ho Chi Minh"
	},
	{
		code: "HAN",
		city: "하노이",
		airport: "노이바이",
		country: "베트남",
		region: "sea",
		en: "Hanoi"
	},
	{
		code: "DAD",
		city: "다낭",
		airport: "다낭",
		country: "베트남",
		region: "sea",
		en: "Da Nang"
	},
	{
		code: "CXR",
		city: "나트랑",
		airport: "깜라인",
		country: "베트남",
		region: "sea",
		en: "Nha Trang"
	},
	{
		code: "PQC",
		city: "푸꾸옥",
		airport: "푸꾸옥",
		country: "베트남",
		region: "sea",
		en: "Phu Quoc"
	},
	{
		code: "SIN",
		city: "싱가포르",
		airport: "창이",
		country: "싱가포르",
		region: "sea",
		en: "Singapore"
	},
	{
		code: "CGK",
		city: "자카르타",
		airport: "수카르노하타",
		country: "인도네시아",
		region: "sea",
		en: "Jakarta"
	},
	{
		code: "DPS",
		city: "발리",
		airport: "응우라라이",
		country: "인도네시아",
		region: "sea",
		en: "Bali Denpasar"
	},
	{
		code: "MNL",
		city: "마닐라",
		airport: "니노이아키노",
		country: "필리핀",
		region: "sea",
		en: "Manila"
	},
	{
		code: "CEB",
		city: "세부",
		airport: "막탄",
		country: "필리핀",
		region: "sea",
		en: "Cebu"
	},
	{
		code: "CRK",
		city: "클락",
		airport: "클라크",
		country: "필리핀",
		region: "sea",
		en: "Clark"
	},
	{
		code: "KUL",
		city: "쿠알라룸푸르",
		airport: "KLIA",
		country: "말레이시아",
		region: "sea",
		en: "Kuala Lumpur"
	},
	{
		code: "BKI",
		city: "코타키나발루",
		airport: "코타키나발루",
		country: "말레이시아",
		region: "sea",
		en: "Kota Kinabalu"
	},
	{
		code: "PEN",
		city: "페낭",
		airport: "페낭",
		country: "말레이시아",
		region: "sea",
		en: "Penang"
	},
	{
		code: "PNH",
		city: "프놈펜",
		airport: "프놈펜",
		country: "캄보디아",
		region: "sea",
		en: "Phnom Penh"
	},
	{
		code: "REP",
		city: "시엠립",
		airport: "시엠립",
		country: "캄보디아",
		region: "sea",
		en: "Siem Reap"
	},
	{
		code: "VTE",
		city: "비엔티안",
		airport: "왓타이",
		country: "라오스",
		region: "sea",
		en: "Vientiane"
	},
	{
		code: "RGN",
		city: "양곤",
		airport: "양곤",
		country: "미얀마",
		region: "sea",
		en: "Yangon"
	},
	{
		code: "GUM",
		city: "괌",
		airport: "괌",
		country: "괌",
		region: "sea",
		en: "Guam"
	},
	{
		code: "SPN",
		city: "사이판",
		airport: "사이판",
		country: "북마리아나",
		region: "sea",
		en: "Saipan"
	},
	{
		code: "DEL",
		city: "델리",
		airport: "인디라간디",
		country: "인도",
		region: "swa",
		en: "Delhi"
	},
	{
		code: "BOM",
		city: "뭄바이",
		airport: "차트라파티",
		country: "인도",
		region: "swa",
		en: "Mumbai"
	},
	{
		code: "CMB",
		city: "콜롬보",
		airport: "반다라나이케",
		country: "스리랑카",
		region: "swa",
		en: "Colombo"
	},
	{
		code: "MLE",
		city: "말레",
		airport: "벨라나",
		country: "몰디브",
		region: "swa",
		en: "Male"
	},
	{
		code: "KTM",
		city: "카트만두",
		airport: "트리부반",
		country: "네팔",
		region: "swa",
		en: "Kathmandu"
	},
	{
		code: "LAX",
		city: "로스앤젤레스",
		airport: "LAX",
		country: "미국",
		region: "long",
		en: "Los Angeles",
		americas: true
	},
	{
		code: "SFO",
		city: "샌프란시스코",
		airport: "SFO",
		country: "미국",
		region: "long",
		en: "San Francisco",
		americas: true
	},
	{
		code: "JFK",
		city: "뉴욕",
		airport: "JFK",
		country: "미국",
		region: "long",
		en: "New York JFK",
		americas: true
	},
	{
		code: "IAD",
		city: "워싱턴",
		airport: "덜레스",
		country: "미국",
		region: "long",
		en: "Washington",
		americas: true
	},
	{
		code: "ORD",
		city: "시카고",
		airport: "오헤어",
		country: "미국",
		region: "long",
		en: "Chicago",
		americas: true
	},
	{
		code: "ATL",
		city: "애틀랜타",
		airport: "하츠필드",
		country: "미국",
		region: "long",
		en: "Atlanta",
		americas: true
	},
	{
		code: "DFW",
		city: "댈러스",
		airport: "DFW",
		country: "미국",
		region: "long",
		en: "Dallas",
		americas: true
	},
	{
		code: "LAS",
		city: "라스베이거스",
		airport: "LAS",
		country: "미국",
		region: "long",
		en: "Las Vegas",
		americas: true
	},
	{
		code: "BOS",
		city: "보스턴",
		airport: "로건",
		country: "미국",
		region: "long",
		en: "Boston",
		americas: true
	},
	{
		code: "IAH",
		city: "휴스턴",
		airport: "인터컨티넨털",
		country: "미국",
		region: "long",
		en: "Houston",
		americas: true
	},
	{
		code: "HNL",
		city: "호놀룰루",
		airport: "이노우에",
		country: "미국",
		region: "long",
		en: "Honolulu",
		americas: true
	},
	{
		code: "SEA",
		city: "시애틀",
		airport: "시택",
		country: "미국",
		region: "long",
		en: "Seattle",
		americas: true
	},
	{
		code: "YVR",
		city: "밴쿠버",
		airport: "밴쿠버",
		country: "캐나다",
		region: "long",
		en: "Vancouver",
		americas: true
	},
	{
		code: "YYZ",
		city: "토론토",
		airport: "피어슨",
		country: "캐나다",
		region: "long",
		en: "Toronto",
		americas: true
	},
	{
		code: "CDG",
		city: "파리",
		airport: "샤를드골",
		country: "프랑스",
		region: "long",
		en: "Paris"
	},
	{
		code: "LHR",
		city: "런던",
		airport: "히스로",
		country: "영국",
		region: "long",
		en: "London"
	},
	{
		code: "FRA",
		city: "프랑크푸르트",
		airport: "프랑크푸르트",
		country: "독일",
		region: "long",
		en: "Frankfurt"
	},
	{
		code: "FCO",
		city: "로마",
		airport: "피우미치노",
		country: "이탈리아",
		region: "long",
		en: "Rome"
	},
	{
		code: "MXP",
		city: "밀라노",
		airport: "말펜사",
		country: "이탈리아",
		region: "long",
		en: "Milan"
	},
	{
		code: "AMS",
		city: "암스테르담",
		airport: "스키폴",
		country: "네덜란드",
		region: "long",
		en: "Amsterdam"
	},
	{
		code: "MAD",
		city: "마드리드",
		airport: "바라하스",
		country: "스페인",
		region: "long",
		en: "Madrid"
	},
	{
		code: "BCN",
		city: "바르셀로나",
		airport: "엘프라트",
		country: "스페인",
		region: "long",
		en: "Barcelona"
	},
	{
		code: "VIE",
		city: "비엔나",
		airport: "비엔나",
		country: "오스트리아",
		region: "long",
		en: "Vienna"
	},
	{
		code: "PRG",
		city: "프라하",
		airport: "바츨라프",
		country: "체코",
		region: "long",
		en: "Prague"
	},
	{
		code: "ZRH",
		city: "취리히",
		airport: "취리히",
		country: "스위스",
		region: "long",
		en: "Zurich"
	},
	{
		code: "BUD",
		city: "부다페스트",
		airport: "부다페스트",
		country: "헝가리",
		region: "long",
		en: "Budapest"
	},
	{
		code: "IST",
		city: "이스탄불",
		airport: "이스탄불",
		country: "튀르키예",
		region: "long",
		en: "Istanbul"
	},
	{
		code: "DXB",
		city: "두바이",
		airport: "두바이",
		country: "아랍에미리트",
		region: "long",
		en: "Dubai"
	},
	{
		code: "AUH",
		city: "아부다비",
		airport: "아부다비",
		country: "아랍에미리트",
		region: "long",
		en: "Abu Dhabi"
	},
	{
		code: "DOH",
		city: "도하",
		airport: "하마드",
		country: "카타르",
		region: "long",
		en: "Doha"
	},
	{
		code: "SYD",
		city: "시드니",
		airport: "시드니",
		country: "호주",
		region: "long",
		en: "Sydney"
	},
	{
		code: "BNE",
		city: "브리즈번",
		airport: "브리즈번",
		country: "호주",
		region: "long",
		en: "Brisbane"
	},
	{
		code: "AKL",
		city: "오클랜드",
		airport: "오클랜드",
		country: "뉴질랜드",
		region: "long",
		en: "Auckland"
	}
];
var AIRPORT = Object.fromEntries(AIRPORTS.map((a) => [a.code, a]));
var POPULAR = [
	"ICN",
	"GMP",
	"PUS",
	"CJU",
	"NRT",
	"HND",
	"KIX",
	"BKK",
	"SGN",
	"SIN",
	"HKG",
	"TPE",
	"LAX",
	"SFO",
	"JFK",
	"CDG",
	"SYD",
	"GUM"
];
var COUNTRY_TZ = {
	한국: 9,
	일본: 9,
	중국: 8,
	홍콩: 8,
	대만: 8,
	몽골: 8,
	태국: 7,
	베트남: 7,
	싱가포르: 8,
	인도네시아: 7,
	필리핀: 8,
	말레이시아: 8,
	캄보디아: 7,
	라오스: 7,
	미얀마: 6.5,
	괌: 10,
	북마리아나: 10,
	인도: 5.5,
	스리랑카: 5.5,
	몰디브: 5,
	네팔: 5.75,
	프랑스: 1,
	영국: 0,
	독일: 1,
	이탈리아: 1,
	네덜란드: 1,
	스페인: 1,
	오스트리아: 1,
	체코: 1,
	스위스: 1,
	헝가리: 1,
	튀르키예: 3,
	아랍에미리트: 4,
	카타르: 3,
	호주: 10,
	뉴질랜드: 13,
	미국: -5,
	캐나다: -5
};
var AIRPORT_TZ = {
	LAX: -7,
	SFO: -7,
	SEA: -7,
	LAS: -7,
	YVR: -7,
	HNL: -10,
	JFK: -4,
	IAD: -4,
	BOS: -4,
	YYZ: -4,
	ATL: -4,
	ORD: -5,
	DFW: -5,
	IAH: -5,
	DPS: 8,
	SYD: 11,
	BNE: 10
};
function tzOf(code) {
	if (AIRPORT_TZ[code] != null) return AIRPORT_TZ[code];
	return COUNTRY_TZ[AIRPORT[code]?.country ?? ""] ?? 9;
}
function AirportField({ label, value, exclude, onChange }) {
	const selected = AIRPORT[value];
	const [text, setText] = (0, import_react.useState)(selected ? labelOf(value) : "");
	const [open, setOpen] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		setText(labelOf(value));
	}, [value]);
	const results = (0, import_react.useMemo)(() => {
		const q = text.trim().toLowerCase();
		return (!open || q === "" || q === labelOf(value).toLowerCase() ? AIRPORTS.filter((a) => POPULAR.includes(a.code)) : AIRPORTS.filter((a) => {
			return `${a.code} ${a.city} ${a.airport} ${a.country} ${a.en}`.toLowerCase().includes(q);
		})).slice(0, 12);
	}, [
		open,
		text,
		value
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "relative block min-w-0 flex-1",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "mb-1 block text-xs font-medium text-muted",
				children: label
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				value: text,
				"aria-label": label,
				autoComplete: "off",
				className: "h-11 w-full rounded-lg border border-line bg-surface px-3 text-sm text-ink outline-none focus:ring-2 focus:ring-accent",
				onFocus: () => setOpen(true),
				onBlur: () => {
					setOpen(false);
					setText(labelOf(value));
				},
				onChange: (e) => {
					setText(e.target.value);
					setOpen(true);
				}
			}),
			open && results.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "absolute z-20 mt-1 max-h-64 w-full overflow-auto rounded-lg border border-line bg-surface py-1 shadow-sm",
				children: results.map((a) => {
					const blocked = a.code === exclude;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						disabled: blocked,
						className: "flex min-h-11 w-full items-center justify-between gap-3 px-3 text-left text-sm disabled:cursor-not-allowed disabled:opacity-40",
						onMouseDown: (e) => {
							e.preventDefault();
							if (blocked) return;
							onChange(a.code);
							setText(labelOf(a.code));
							setOpen(false);
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-medium",
							children: a.city
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-muted",
							children: [" ", a.airport]
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-xs text-muted",
							children: [
								a.code,
								" · ",
								a.country
							]
						})]
					}) }, a.code);
				})
			})
		]
	});
}
function labelOf(code) {
	const a = AIRPORT[code];
	if (!a) return code;
	return `${a.city} ${a.airport} (${a.code})`;
}
function dayIndex(iso) {
	const [y, m, d] = iso.split("-").map(Number);
	return Math.round(Date.UTC(y, m - 1, d) / 864e5);
}
function fromIndex(n) {
	return (/* @__PURE__ */ new Date(n * 864e5)).toISOString().slice(0, 10);
}
function addDays(iso, k) {
	return fromIndex(dayIndex(iso) + k);
}
function seoulToday() {
	return new Intl.DateTimeFormat("en-CA", {
		timeZone: "Asia/Seoul",
		year: "numeric",
		month: "2-digit",
		day: "2-digit"
	}).format(/* @__PURE__ */ new Date());
}
/** 1 = Monday … 7 = Sunday */
function isoDow(iso) {
	const js = (/* @__PURE__ */ new Date(`${iso}T00:00:00Z`)).getUTCDay();
	return js === 0 ? 7 : js;
}
function hm(value) {
	const [h, m] = value.split(":").map(Number);
	return h * 60 + m;
}
function absMinutes(iso, clock) {
	return dayIndex(iso) * 1440 + hm(clock);
}
function blockMinutes(dep, arr, plus, tzFrom, tzTo) {
	return Math.round(hm(arr) - hm(dep) + plus * 1440 - (tzTo - tzFrom) * 60);
}
function formatDuration(mins) {
	const h = Math.floor(mins / 60);
	const m = mins % 60;
	if (h <= 0) return `${m}분`;
	if (m === 0) return `${h}시간`;
	return `${h}시간 ${m}분`;
}
function formatMiles(n) {
	return `${n.toLocaleString("ko-KR")}`;
}
function formatWon(n) {
	return `${n.toLocaleString("ko-KR")}원`;
}
function monthKey(iso) {
	return iso.slice(0, 7);
}
function addMonths(key, delta) {
	const [y, m] = key.split("-").map(Number);
	const dt = new Date(Date.UTC(y, m - 1 + delta, 1));
	const mm = String(dt.getUTCMonth() + 1).padStart(2, "0");
	return `${dt.getUTCFullYear()}-${mm}`;
}
function monthLabel(key) {
	const [y, m] = key.split("-");
	return `${y}년 ${Number(m)}월`;
}
function shortDate(iso) {
	const [, m, d] = iso.split("-");
	return `${Number(m)}월 ${Number(d)}일 (${[
		"",
		"월",
		"화",
		"수",
		"목",
		"금",
		"토",
		"일"
	][isoDow(iso)]})`;
}
function monthGrid(key) {
	const [y, m] = key.split("-").map(Number);
	const startPad = new Date(Date.UTC(y, m - 1, 1)).getUTCDay();
	const days = new Date(Date.UTC(y, m, 0)).getUTCDate();
	const cells = [];
	for (let i = 0; i < startPad; i++) cells.push(null);
	for (let d = 1; d <= days; d++) cells.push(`${key}-${String(d).padStart(2, "0")}`);
	while (cells.length % 7 !== 0) cells.push(null);
	return cells;
}
function monthsBetween(startIso, endIso) {
	const out = [];
	let key = monthKey(startIso);
	const last = monthKey(endIso);
	while (key <= last) {
		out.push(key);
		key = addMonths(key, 1);
	}
	return out;
}
var RANGES = {
	dom: [
		"2026-01-01:2026-01-01",
		"2026-02-14:2026-02-19",
		"2026-03-01:2026-03-02",
		"2026-04-30:2026-04-30",
		"2026-05-01:2026-05-06",
		"2026-05-25:2026-05-26",
		"2026-07-26:2026-07-31",
		"2026-08-01:2026-08-22",
		"2026-09-23:2026-09-28",
		"2026-10-05:2026-10-06",
		"2026-10-08:2026-10-08",
		"2026-10-12:2026-10-12",
		"2026-12-24:2026-12-25",
		"2026-12-31:2026-12-31",
		"2027-01-01:2027-01-01",
		"2027-01-04:2027-01-04",
		"2027-02-06:2027-02-10",
		"2027-02-25:2027-02-28",
		"2027-03-01:2027-03-01",
		"2027-05-05:2027-05-05",
		"2027-05-13:2027-05-17",
		"2027-07-25:2027-07-31",
		"2027-08-01:2027-08-19",
		"2027-09-11:2027-09-18",
		"2027-09-20:2027-09-20",
		"2027-10-02:2027-10-05",
		"2027-10-09:2027-10-12",
		"2027-12-25:2027-12-28"
	],
	intl: [
		"2026-01-02:2026-01-11",
		"2026-02-13:2026-02-22",
		"2026-02-27:2026-02-28",
		"2026-03-01:2026-03-02",
		"2026-04-30:2026-04-30",
		"2026-05-01:2026-05-05",
		"2026-07-24:2026-07-31",
		"2026-08-01:2026-08-16",
		"2026-09-23:2026-09-27",
		"2026-10-02:2026-10-05",
		"2026-10-08:2026-10-11",
		"2026-12-25:2026-12-27",
		"2027-01-02:2027-01-11",
		"2027-02-05:2027-02-09",
		"2027-05-01:2027-05-05",
		"2027-05-13:2027-05-16",
		"2027-07-24:2027-07-31",
		"2027-08-01:2027-08-18",
		"2027-09-10:2027-09-19",
		"2027-10-01:2027-10-04",
		"2027-10-08:2027-10-11"
	],
	am: [
		"2026-02-20:2026-02-21",
		"2026-05-14:2026-05-31",
		"2026-06-01:2026-06-27",
		"2026-07-31:2026-07-31",
		"2026-08-01:2026-08-01",
		"2026-08-07:2026-08-08",
		"2026-09-26:2026-09-27",
		"2026-10-03:2026-10-04",
		"2026-12-10:2026-12-26",
		"2027-02-12:2027-02-13",
		"2027-05-07:2027-05-08",
		"2027-05-13:2027-05-31",
		"2027-06-01:2027-06-26",
		"2027-07-30:2027-07-31",
		"2027-08-06:2027-08-07",
		"2027-09-17:2027-09-18",
		"2027-12-09:2027-12-25"
	]
};
function expand(spec) {
	const [a, b] = spec.split(":");
	const out = [];
	for (let d = a; d <= b; d = addDays(d, 1)) out.push(d);
	return out;
}
var PEAK_DAYS = {
	dom: new Set(RANGES.dom.flatMap(expand)),
	intl: new Set(RANGES.intl.flatMap(expand)),
	am: new Set(RANGES.am.flatMap(expand))
};
var RAW = `
KE GMP CJU
1201 07:10 08:20 0 * 223 Y | 1202 09:05 10:15 0
1205 10:00 11:10 0 * 223 Y | 1206 12:00 13:10 0
1211 13:40 14:50 0 * 739 Y | 1212 15:40 16:50 0
1217 17:20 18:30 0 * 223 Y | 1218 19:20 20:30 0
1223 20:30 21:40 0 * 223 Y | 1224 22:10 23:20 0
OZ GMP CJU
8901 08:00 09:10 0 * 321 Y | 8902 10:00 11:10 0
8905 14:20 15:30 0 * 321 Y | 8906 16:30 17:40 0
8909 19:10 20:20 0 * 321 Y | 8910 21:10 22:20 0
KE GMP PUS
1401 08:30 09:30 0 * 739 Y | 1402 10:20 11:20 0
1405 14:10 15:10 0 * 739 Y | 1406 16:10 17:10 0
1409 19:00 20:00 0 12345 223 Y | 1410 20:40 21:40 0
KE GMP USN
1501 09:20 10:15 0 123456 223 Y | 1502 11:00 11:55 0
1505 17:40 18:35 0 135 223 Y | 1506 19:20 20:15 0
KE GMP RSU
1511 11:30 12:35 0 246 223 Y | 1512 13:20 14:25 0
KE GMP KWJ
1521 08:50 09:50 0 13567 223 Y | 1522 10:30 11:30 0
KE GMP HIN
1531 15:10 16:10 0 246 223 Y | 1532 16:50 17:50 0
KE GMP TAE
1541 12:40 13:30 0 1234567 223 Y | 1542 14:10 15:00 0
KE ICN CJU
1601 07:40 09:00 0 * 739 Y | 1602 10:00 11:20 0
1605 13:10 14:30 0 * 739 Y | 1606 15:30 16:50 0
1609 18:40 20:00 0 * 223 Y | 1610 20:50 22:10 0
OZ ICN CJU
8911 11:20 12:40 0 * 321 Y | 8912 13:40 15:00 0
KE ICN PUS
1611 09:10 10:10 0 * 223 Y | 1612 11:00 12:00 0
1615 16:20 17:20 0 123456 223 Y | 1616 18:10 19:10 0
OZ ICN PUS
8921 12:30 13:30 0 * 321 Y | 8922 14:20 15:20 0
KE ICN TAE
1621 10:40 11:35 0 123456 223 Y | 1622 12:20 13:15 0
KE ICN CJJ
1631 08:20 09:10 0 13567 223 Y | 1632 09:50 10:40 0
KE ICN KWJ
1641 17:10 18:15 0 246 223 Y | 1642 19:00 20:05 0
KE PUS CJU
1701 08:40 09:40 0 * 739 Y | 1702 10:30 11:30 0
1705 15:20 16:20 0 * 223 Y | 1706 17:10 18:10 0
OZ PUS CJU
8931 11:50 12:50 0 * 321 Y | 8932 13:40 14:40 0
KE TAE CJU
1711 09:30 10:40 0 13567 223 Y | 1712 11:20 12:30 0
KE CJJ CJU
1721 13:00 14:10 0 246 223 Y | 1722 14:50 16:00 0
KE KWJ CJU
1731 10:10 11:20 0 135 223 Y | 1732 12:00 13:10 0
KE MWX CJU
1741 11:40 12:40 0 246 223 Y | 1742 13:30 14:30 0
KE CJU NRT
1801 09:50 12:10 0 246 333 YJ | 1802 13:20 16:00 0
KE CJU KIX
1811 10:30 12:10 0 1357 739 YJ | 1812 13:10 15:20 0
KE CJU PEK
1821 08:40 10:50 0 246 333 YJ | 1822 12:00 15:10 0

KE ICN NRT
703 08:40 10:55 0 * 789 YJ | 704 12:20 14:55 0
705 14:10 16:25 0 * 333 YJ | 706 18:00 20:35 0
707 19:20 21:35 0 123456 739 Y | 708 22:40 01:10 1
OZ ICN NRT
102 09:30 11:45 0 * 321 YJ | 101 13:10 15:45 0
108 17:40 19:55 0 * 333 YJ | 107 21:10 23:50 0
KE ICN HND
701 09:15 11:25 0 * 789 YJ | 702 13:00 15:30 0
709 16:40 18:50 0 * 333 YJ | 710 20:10 22:40 0
OZ ICN HND
112 08:20 10:30 0 * 333 YJ | 111 12:00 14:30 0
KE GMP HND
7211 08:50 11:05 0 * 789 YJ | 7212 12:40 15:10 0
7215 15:30 17:45 0 123456 333 YJ | 7216 19:10 21:40 0
OZ GMP HND
172 10:10 12:25 0 * 321 YJ | 171 14:00 16:30 0
KE ICN KIX
721 09:00 10:40 0 * 333 YJ | 722 12:00 13:55 0
723 13:30 15:10 0 * 739 YJ | 724 16:30 18:25 0
725 19:00 20:40 0 12345 739 Y | 726 21:40 00:05 1
OZ ICN KIX
122 11:20 13:00 0 * 321 YJ | 121 14:40 16:40 0
KE GMP KIX
7221 09:40 11:30 0 * 333 YJ | 7222 13:00 15:05 0
OZ GMP KIX
182 16:10 18:00 0 123456 321 YJ | 181 19:20 21:30 0
KE PUS KIX
7231 10:50 12:20 0 * 739 YJ | 7232 13:40 15:40 0
KE ICN FUK
781 10:20 11:40 0 * 739 YJ | 782 13:00 14:40 0
783 18:10 19:30 0 13567 739 Y | 784 20:40 22:20 0
OZ ICN FUK
132 09:10 10:35 0 * 321 YJ | 131 12:00 13:40 0
KE PUS FUK
7241 11:40 13:00 0 123456 739 Y | 7242 14:20 16:10 0
KE ICN NGO
741 09:50 11:35 0 * 739 YJ | 742 13:00 15:05 0
OZ ICN NGO
142 15:20 17:05 0 123456 321 YJ | 141 18:20 20:20 0
KE ICN OKA
763 08:20 10:40 0 * 739 YJ | 764 12:00 14:10 0
OZ ICN OKA
152 13:40 16:00 0 13567 321 YJ | 151 17:10 19:20 0
KE ICN CTS
765 11:00 13:20 0 * 333 YJ | 766 14:40 16:50 0
OZ ICN CTS
162 08:30 10:50 0 123456 333 YJ | 161 12:10 14:20 0
KE ICN KOJ
787 13:40 15:10 0 1357 739 Y | 788 16:20 18:10 0
KE ICN HIJ
775 12:10 13:40 0 246 739 Y | 776 14:50 16:40 0
KE ICN KMJ
791 10:00 11:30 0 135 739 Y | 792 12:40 14:30 0
KE ICN OKJ
773 11:30 13:00 0 24 739 Y | 774 14:10 16:00 0
KE ICN FSZ
769 09:40 11:20 0 136 739 Y | 770 12:30 14:20 0
KE ICN KIJ
767 10:50 12:40 0 246 739 Y | 768 13:50 15:50 0
KE ICN TAK
777 12:30 14:00 0 135 739 Y | 778 15:10 16:55 0
KE ICN MYJ
779 13:10 14:40 0 46 739 Y | 780 15:50 17:40 0
KE ICN AKJ
761 10:30 13:00 0 26 739 Y | 762 14:10 16:20 0

KE ICN PEK
851 08:50 10:20 0 * 333 YJ | 852 11:50 15:00 0
853 15:30 17:00 0 * 789 YJ | 854 18:30 21:40 0
OZ ICN PEK
331 09:40 11:10 0 * 333 YJ | 332 12:40 15:50 0
KE GMP PEK
7251 08:10 09:50 0 * 333 YJ | 7252 11:20 14:40 0
OZ GMP PEK
192 13:00 14:40 0 123456 321 YJ | 191 16:10 19:30 0
KE PUS PEK
7261 10:20 11:50 0 123456 739 YJ | 7262 13:20 16:40 0
KE ICN PKX
855 12:20 13:55 0 123456 333 YJ | 856 15:30 18:40 0
KE ICN PVG
893 09:20 10:40 0 * 789 YJ | 894 12:10 15:20 0
895 16:00 17:20 0 * 333 YJ | 896 18:50 22:00 0
OZ ICN PVG
341 11:10 12:30 0 * 333 YJ | 342 14:00 17:10 0
KE PUS PVG
7271 13:40 15:10 0 13567 739 YJ | 7272 16:40 19:50 0
KE ICN SHA
831 08:30 09:55 0 * 739 YJ | 832 11:20 14:30 0
KE GMP SHA
7281 14:20 15:50 0 * 333 YJ | 7282 17:20 20:30 0
KE ICN CAN
865 09:00 12:10 0 * 333 YJ | 866 13:40 18:20 0
867 15:40 18:50 0 * 739 YJ | 868 20:10 00:50 1
OZ ICN CAN
351 10:30 13:40 0 * 333 YJ | 352 15:10 19:50 0
KE ICN SZX
869 13:20 16:20 0 123456 739 Y | 870 17:40 22:10 0
KE ICN TAO
841 08:40 09:50 0 * 739 Y | 842 11:10 13:50 0
OZ ICN TAO
361 14:50 16:00 0 13567 321 Y | 362 17:20 20:00 0
KE ICN DLC
843 11:20 12:40 0 123456 739 Y | 844 13:50 16:40 0
OZ ICN DLC
363 16:30 17:50 0 246 321 Y | 364 19:00 21:50 0
KE ICN SHE
845 09:30 11:00 0 13567 739 Y | 846 12:20 15:20 0
KE ICN WEH
847 10:10 11:20 0 246 739 Y | 848 12:40 15:20 0
KE ICN YNT
849 13:50 15:00 0 135 739 Y | 850 16:20 19:00 0
KE ICN TSN
871 12:40 14:10 0 246 739 Y | 872 15:30 18:30 0
KE ICN KMG
873 09:40 13:40 0 13567 333 YJ | 874 15:10 20:50 0
KE ICN XIY
875 10:50 13:20 0 123456 739 YJ | 876 14:50 18:40 0
KE ICN CTU
877 08:20 12:00 0 * 333 YJ | 878 13:30 18:50 0
KE ICN CKG
879 14:10 17:40 0 123456 739 Y | 880 19:00 00:10 1
KE ICN HGH
881 09:10 10:50 0 * 739 YJ | 882 12:10 15:20 0
KE ICN NKG
883 13:30 15:10 0 123456 739 Y | 884 16:30 19:40 0
KE ICN CSX
885 11:40 14:30 0 13567 739 Y | 886 15:50 20:10 0
KE ICN WUH
887 16:20 18:50 0 246 739 Y | 888 20:10 00:10 1
KE ICN XMN
889 10:00 12:40 0 13567 739 Y | 890 14:00 18:10 0
KE ICN HRB
891 08:50 11:10 0 246 739 Y | 892 12:30 16:20 0
KE ICN CGQ
897 15:10 17:20 0 135 739 Y | 898 18:40 22:20 0
KE ICN SYX
899 09:20 13:40 0 136 333 YJ | 900 15:10 20:50 0
KE ICN KWL
861 12:10 15:40 0 24 739 Y | 862 17:00 22:00 0
KE ICN HAK
863 08:30 12:20 0 1357 333 YJ | 864 13:50 19:10 0
KE ICN YNJ
857 11:50 13:10 0 246 739 Y | 858 14:20 17:10 0
KE ICN HKG
171 08:40 11:30 0 * 333 YJ | 172 13:00 17:20 0
173 15:20 18:10 0 * 789 YJ | 174 19:40 00:00 1
OZ ICN HKG
711 10:10 13:00 0 * 333 YJ | 712 14:30 18:50 0
KE PUS HKG
7291 09:30 12:10 0 13567 333 YJ | 7292 13:40 18:00 0
KE ICN TPE
691 09:00 11:00 0 * 333 YJ | 692 12:30 16:00 0
693 16:20 18:20 0 123456 739 YJ | 694 19:40 23:10 0
OZ ICN TPE
721 10:40 12:40 0 * 321 YJ | 722 14:00 17:30 0
KE ICN TSA
695 13:10 15:20 0 13567 739 Y | 696 16:40 20:20 0
KE ICN KHH
697 11:30 13:40 0 246 333 YJ | 698 15:00 18:40 0
KE CJJ TPE
7301 08:50 10:50 0 24 739 Y | 7302 12:10 15:40 0
KE ICN ULN
611 09:40 13:10 0 13567 739 YJ | 612 14:30 18:10 0

KE ICN BKK
651 09:10 13:00 0 * 333 YJ | 652 14:30 21:10 0
653 18:40 22:30 0 * 789 YJ | 654 00:10 06:50 1
OZ ICN BKK
741 10:20 14:10 0 * 333 YJ | 742 15:40 22:20 0
KE PUS BKK
7311 09:50 13:50 0 13567 333 YJ | 7312 15:20 22:00 0
KE CJJ BKK
7321 10:30 14:40 0 36 333 YJ | 7322 16:10 23:00 0
KE ICN CNX
655 11:40 15:50 0 246 739 Y | 656 17:10 00:10 1
KE ICN SGN
683 09:30 13:10 0 * 333 YJ | 684 14:40 21:50 0
685 19:10 22:50 0 * 789 YJ | 686 00:20 07:10 1
OZ ICN SGN
751 08:40 12:20 0 * 333 YJ | 752 13:50 21:00 0
KE PUS SGN
7331 10:10 14:00 0 246 333 YJ | 7332 15:30 22:40 0
KE ICN HAN
687 09:00 12:10 0 * 739 YJ | 688 13:40 18:20 0
OZ ICN HAN
761 14:20 17:30 0 * 321 YJ | 762 19:00 23:40 0
KE ICN DAD
689 08:20 11:40 0 * 333 YJ | 690 13:10 19:00 0
OZ ICN DAD
771 15:30 18:50 0 123456 321 YJ | 772 20:10 02:00 1
KE PUS DAD
7341 09:20 12:50 0 1357 739 YJ | 7342 14:20 20:20 0
KE ICN CXR
681 12:30 16:10 0 13567 739 Y | 682 17:40 23:50 0
KE ICN PQC
679 10:40 14:40 0 246 739 Y | 680 16:10 22:40 0
KE ICN SIN
645 09:40 15:10 0 * 789 YJ | 646 16:40 00:10 1
647 22:10 03:40 1 123456 333 YJ | 648 05:10 12:40 0
OZ ICN SIN
781 01:10 06:40 1 * 359 YJF | 782 08:20 15:50 0
KE ICN CGK
623 09:20 15:10 0 * 333 YJ | 624 16:50 00:40 1
OZ ICN CGK
791 21:40 03:30 1 13567 333 YJ | 792 05:00 12:50 0
KE ICN DPS
625 10:10 16:40 0 13567 333 YJ | 626 18:20 02:30 1
KE ICN MNL
627 08:50 12:10 0 * 333 YJ | 628 13:40 18:40 0
629 18:30 21:50 0 123456 739 YJ | 630 23:10 04:10 1
OZ ICN MNL
801 13:20 16:40 0 * 321 YJ | 802 18:10 23:10 0
KE ICN CEB
631 09:50 13:30 0 13567 739 Y | 632 15:00 20:20 0
OZ ICN CEB
811 22:20 02:00 1 246 321 Y | 812 03:30 08:50 0
KE ICN CRK
633 11:10 14:40 0 246 739 Y | 634 16:10 21:20 0
KE ICN KUL
671 09:30 15:20 0 * 333 YJ | 672 16:50 00:30 1
OZ ICN KUL
821 23:40 05:30 1 13567 333 YJ | 822 07:00 14:40 0
KE ICN BKI
673 10:20 15:00 0 135 739 Y | 674 16:30 23:00 0
KE ICN PEN
675 21:10 02:00 1 46 739 Y | 676 03:30 10:10 0
KE ICN PNH
677 09:40 13:20 0 * 739 YJ | 678 14:50 20:10 0
OZ ICN PNH
831 16:20 20:00 0 123456 321 YJ | 832 21:20 02:40 1
KE ICN REP
659 11:20 15:20 0 1357 739 Y | 660 16:50 22:20 0
KE ICN VTE
661 10:00 13:10 0 246 739 Y | 662 14:30 19:10 0
KE ICN RGN
663 22:40 02:10 1 135 739 Y | 664 03:40 09:50 0
KE ICN GUM
481 09:30 14:50 0 * 333 YJ | 482 16:20 20:50 0
OZ ICN GUM
841 13:10 18:30 0 13567 333 YJ | 842 20:00 00:30 1
KE PUS GUM
7351 10:40 15:40 0 246 333 YJ | 7352 17:10 21:20 0
KE ICN SPN
483 11:00 16:40 0 246 333 YJ | 484 18:10 23:00 0

KE ICN DEL
471 23:40 04:50 1 * 789 YJ | 472 06:40 16:10 0
OZ ICN DEL
851 01:20 06:40 1 13567 359 YJF | 852 08:20 17:50 0
KE ICN BOM
473 00:30 06:10 1 13567 789 YJ | 474 08:00 17:40 0
KE ICN CMB
475 23:10 04:40 1 246 333 YJ | 476 06:20 15:30 0
KE ICN MLE
477 22:20 04:10 1 1357 333 YJ | 478 05:50 15:20 0
KE ICN KTM
479 09:50 14:20 0 36 739 Y | 480 15:40 23:10 0

KE ICN LAX
017 14:50 09:40 0 * 748 YJF | 018 11:30 17:40 1
021 16:20 11:10 0 * 77W YJF | 022 13:00 19:10 1
OZ ICN LAX
201 15:40 10:30 0 * 359 YJF | 202 12:40 18:20 1
KE ICN SFO
023 15:10 09:20 0 * 789 YJ | 024 11:40 17:20 1
025 17:00 11:10 0 * 77W YJF | 026 13:20 19:00 1
OZ ICN SFO
211 16:10 10:20 0 * 359 YJF | 212 12:10 17:50 1
KE ICN JFK
081 10:40 11:30 0 * 748 YJF | 082 13:10 17:50 1
085 13:20 14:10 0 * 789 YJ | 086 16:00 20:40 1
OZ ICN JFK
221 11:50 12:50 0 13567 359 YJF | 222 14:40 19:20 1
KE ICN IAD
091 10:10 11:20 0 * 789 YJ | 092 13:00 17:40 1
KE ICN ORD
037 10:30 10:40 0 * 77W YJF | 038 12:50 17:10 1
KE ICN ATL
035 09:50 10:20 0 * 748 YJF | 036 12:10 16:50 1
KE ICN DFW
031 10:00 09:40 0 13567 789 YJ | 032 11:50 16:40 1
KE ICN LAS
033 16:40 12:10 0 246 789 YJ | 034 14:00 19:40 1
KE ICN BOS
093 11:20 12:40 0 13567 789 YJ | 094 14:30 19:20 1
KE ICN IAH
039 10:50 10:30 0 13567 789 YJ | 040 12:40 17:30 1
KE ICN HNL
053 09:40 00:10 1 * 789 YJ | 054 02:00 07:40 1
OZ ICN HNL
231 20:10 10:40 1 13567 333 YJ | 232 12:30 18:10 1
KE ICN SEA
041 15:30 09:10 0 * 789 YJ | 042 11:20 16:40 1
OZ ICN SEA
241 17:10 10:50 0 123456 359 YJF | 242 12:40 18:00 1
KE ICN YVR
071 15:50 09:40 0 * 789 YJ | 072 11:50 16:50 1
KE ICN YYZ
073 10:20 10:50 0 * 789 YJ | 074 13:00 17:20 1
KE ICN CDG
901 10:50 16:10 0 * 77W YJF | 902 18:40 13:20 1
903 13:30 18:50 0 * 789 YJ | 904 21:10 15:50 1
OZ ICN CDG
501 11:40 17:00 0 * 359 YJF | 502 19:20 14:00 1
KE ICN LHR
907 11:10 16:00 0 * 789 YJ | 908 18:30 13:40 1
OZ ICN LHR
521 13:00 17:50 0 13567 359 YJF | 522 19:50 15:00 1
KE ICN FRA
905 10:30 15:40 0 * 748 YJF | 906 17:50 12:40 1
OZ ICN FRA
541 12:20 17:30 0 * 359 YJF | 542 19:40 14:30 1
KE ICN FCO
931 11:40 17:20 0 * 789 YJ | 932 19:20 13:50 1
OZ ICN FCO
561 13:50 19:30 0 246 359 YJF | 562 21:20 15:50 1
KE ICN MXP
927 12:10 17:40 0 13567 789 YJ | 928 19:30 14:10 1
KE ICN AMS
925 11:00 16:20 0 * 789 YJ | 926 18:10 13:00 1
KE ICN MAD
917 12:40 18:50 0 13567 789 YJ | 918 20:40 15:40 1
KE ICN BCN
915 13:20 19:40 0 246 333 YJ | 916 21:20 16:30 1
KE ICN VIE
937 11:30 16:50 0 13567 789 YJ | 938 18:40 13:20 1
KE ICN PRG
935 12:00 17:10 0 246 789 YJ | 936 19:00 13:50 1
KE ICN ZRH
933 10:40 16:10 0 13567 333 YJ | 934 18:00 12:50 1
KE ICN BUD
939 13:10 18:20 0 246 333 YJ | 940 20:10 14:40 1
KE ICN IST
955 09:20 15:10 0 * 333 YJ | 956 16:50 08:40 1
KE ICN DXB
959 23:20 04:40 1 * 789 YJ | 960 06:30 19:10 0
KE ICN AUH
957 00:40 05:50 1 13567 333 YJ | 958 07:40 20:00 0
KE ICN DOH
951 01:10 05:40 1 246 333 YJ | 952 07:20 20:10 0
KE ICN SYD
121 19:00 06:30 1 * 77W YJF | 122 08:40 17:10 0
OZ ICN SYD
601 18:20 05:50 1 * 359 YJF | 602 08:00 16:30 0
KE ICN BNE
123 19:40 06:50 1 13567 789 YJ | 124 09:10 17:20 0
KE ICN AKL
129 20:10 09:40 1 13567 789 YJ | 130 11:20 18:50 0
`;
function expandDays(spec) {
	if (spec === "*") return [
		1,
		2,
		3,
		4,
		5,
		6,
		7
	];
	return [...spec].map((ch) => Number(ch));
}
function flags(code) {
	return {
		y: true,
		j: code.includes("J"),
		f: code.includes("F")
	};
}
function parse(raw) {
	const flights = [];
	const seen = /* @__PURE__ */ new Set();
	const claim = (id) => {
		if (!seen.has(id)) {
			seen.add(id);
			return id;
		}
		let n = 2;
		while (seen.has(`${id}#${n}`)) n += 1;
		const next = `${id}#${n}`;
		seen.add(next);
		return next;
	};
	let airline = "KE";
	let from = "";
	let to = "";
	for (const line of raw.split("\n")) {
		const text = line.trim();
		if (!text) continue;
		const head = text.match(/^(KE|OZ)\s+([A-Z]{3})\s+([A-Z]{3})$/);
		if (head) {
			airline = head[1];
			from = head[2];
			to = head[3];
			continue;
		}
		const parts = text.split("|").map((p) => p.trim());
		if (parts.length !== 2) throw new Error(`노선 형식 오류: ${text}`);
		const go = parts[0].split(/\s+/);
		const back = parts[1].split(/\s+/);
		if (go.length !== 7 || back.length !== 4) throw new Error(`편 형식 오류: ${text}`);
		const cab = flags(go[6]);
		const days = expandDays(go[4]);
		const goNo = `${airline}${go[0]}`;
		const backNo = `${airline}${back[0]}`;
		flights.push({
			id: claim(`${goNo}-${from}-${to}`),
			airline,
			no: goNo,
			from,
			to,
			dep: go[1],
			arr: go[2],
			plus: Number(go[3]),
			days,
			eq: go[5],
			...cab
		});
		flights.push({
			id: claim(`${backNo}-${to}-${from}`),
			airline,
			no: backNo,
			from: to,
			to: from,
			dep: back[1],
			arr: back[2],
			plus: Number(back[3]),
			days,
			eq: go[5],
			...cab
		});
	}
	return flights;
}
var FLIGHTS = parse(RAW);
var EQ_NAME = {
	"748": "보잉 747-8",
	"77W": "보잉 777-300ER",
	"789": "보잉 787-9",
	"781": "보잉 787-10",
	"333": "에어버스 A330-300",
	"332": "에어버스 A330-200",
	"739": "보잉 737-900",
	"223": "에어버스 A220-300",
	"359": "에어버스 A350-900",
	"321": "에어버스 A321"
};
var byDir = /* @__PURE__ */ new Map();
for (const flight of FLIGHTS) {
	const key = `${flight.from}-${flight.to}`;
	const list = byDir.get(key);
	if (list) list.push(flight);
	else byDir.set(key, [flight]);
}
function flightsBetween(from, to, airline) {
	const list = byDir.get(`${from}-${to}`) ?? [];
	if (airline === "all") return list;
	return list.filter((f) => f.airline === airline);
}
var CABINS = [
	"y",
	"j",
	"f"
];
var TAX = {
	dom: 11e3,
	nea: 85e3,
	sea: 15e4,
	swa: 23e4,
	long: 36e4
};
var RANK = {
	dom: 0,
	nea: 1,
	sea: 2,
	swa: 3,
	long: 4
};
for (const flight of FLIGHTS) if (!AIRPORT[flight.from] || !AIRPORT[flight.to]) throw new Error(`알 수 없는 공항: ${flight.id}`);
function round500(n) {
	return Math.round(n / 500) * 500;
}
function hash32(value) {
	let h = 2166136261;
	for (let i = 0; i < value.length; i++) {
		h ^= value.charCodeAt(i);
		h = Math.imul(h, 16777619);
	}
	return h >>> 0;
}
function peakCalendar(from, to) {
	if (from.region === "dom" && to.region === "dom") return "dom";
	if (from.americas) return "am";
	return "intl";
}
function isPeak(date, from, to) {
	return PEAK_DAYS[peakCalendar(from, to)].has(date);
}
function keEconomyOff(a, b) {
	if (a === "dom" && b === "dom") return 5e3;
	if (a === "dom") return keFromKorea(b);
	if (b === "dom") return keFromKorea(a);
	return {
		"nea-nea": 2e4,
		"nea-sea": 25e3,
		"nea-swa": 3e4,
		"nea-long": 35e3,
		"sea-sea": 2e4,
		"sea-swa": 35e3,
		"sea-long": 42500,
		"swa-swa": 25e3,
		"swa-long": 45e3,
		"long-long": 35e3
	}[RANK[a] <= RANK[b] ? `${a}-${b}` : `${b}-${a}`] ?? 35e3;
}
function keFromKorea(region) {
	if (region === "dom") return 5e3;
	if (region === "nea") return 15e3;
	if (region === "sea") return 2e4;
	if (region === "swa") return 25e3;
	return 35e3;
}
function keOff(yOff, cabin) {
	if (cabin === "y") return yOff;
	if (cabin === "j") {
		if (yOff >= 35e3) return round500(yOff * (62500 / 35e3));
		return yOff * 2;
	}
	if (yOff < 15e3) return null;
	if (yOff >= 35e3) return round500(yOff * (8e4 / 35e3));
	if (yOff >= 25e3) return 7e4;
	if (yOff >= 2e4) return 65e3;
	return 5e4;
}
var OZ_OFF = {
	dom: {
		y: 5e3,
		j: 6e3,
		f: null
	},
	nea: {
		y: 15e3,
		j: 22500,
		f: 25e3
	},
	sea: {
		y: 2e4,
		j: 3e4,
		f: 35e3
	},
	swa: {
		y: 25e3,
		j: 37500,
		f: 45e3
	},
	long: {
		y: 35e3,
		j: 52500,
		f: 62500
	}
};
function farther(a, b) {
	return RANK[a] >= RANK[b] ? a : b;
}
function awardMiles(airline, from, to, cabin, peak) {
	let off;
	if (airline === "KE") off = keOff(keEconomyOff(from.region, to.region), cabin);
	else off = OZ_OFF[farther(from.region, to.region)][cabin];
	if (off == null) return null;
	if (!peak) return off;
	if (airline === "KE" && cabin === "j" && off === 62500) return 92500;
	return round500(off * 1.5);
}
function awardTax(from, to) {
	return TAX[farther(from.region, to.region)];
}
function offers(flight, cabin) {
	if (cabin === "y") return flight.y;
	if (cabin === "j") return flight.j;
	return flight.f;
}
function awardSeats(flight, date, cabin, daysOut, peak, domestic) {
	if (cabin === "j" && !flight.j) return 0;
	if (cabin === "f" && !flight.f) return 0;
	const h = hash32(`${flight.id}|${date}|${cabin}`);
	const roll = h % 1e3;
	const dow = isoDow(date);
	let chance = cabin === "y" ? 240 : cabin === "j" ? 110 : 70;
	if (domestic && cabin === "y") chance = 480;
	if (dow === 2 || dow === 3) chance += 50;
	if (dow >= 5) chance -= 40;
	if (peak) chance -= cabin === "y" ? 70 : 35;
	if (daysOut < 18) chance -= 100;
	else if (daysOut < 40) chance -= 30;
	else if (daysOut > 300) chance += 25;
	chance = Math.max(35, Math.min(900, chance));
	if (roll >= chance) return 0;
	if (cabin === "y") return 1 + h % (peak ? 4 : 7);
	if (cabin === "j") return 1 + (h >>> 8) % (peak ? 2 : 4);
	return 1 + (h >>> 8) % (peak ? 1 : 2);
}
function offerFor(flight, date, cabin, peak, daysOut, pax, from, to, domestic) {
	if (cabin === "j" && !flight.j) return null;
	if (cabin === "f" && !flight.f) return null;
	const miles = awardMiles(flight.airline, from, to, cabin, peak);
	if (miles == null) return null;
	const seats = awardSeats(flight, date, cabin, daysOut, peak, domestic);
	return {
		miles,
		seats,
		tax: awardTax(from, to),
		enough: seats >= pax
	};
}
function segmentOf(flight, date) {
	return {
		airline: flight.airline,
		flightNo: flight.no,
		from: flight.from,
		to: flight.to,
		dep: flight.dep,
		arr: flight.arr,
		plus: flight.plus,
		date,
		eq: flight.eq,
		eqName: EQ_NAME[flight.eq] ?? flight.eq
	};
}
function summarize(cabins, pax) {
	return CABINS.some((c) => (cabins[c]?.seats ?? 0) >= pax);
}
function makeNonstop(flight, date, peak, daysOut, pax, from, to) {
	const domestic = from.region === "dom" && to.region === "dom";
	const cabins = {
		y: offerFor(flight, date, "y", peak, daysOut, pax, from, to, domestic),
		j: offerFor(flight, date, "j", peak, daysOut, pax, from, to, domestic),
		f: offerFor(flight, date, "f", peak, daysOut, pax, from, to, domestic)
	};
	return {
		id: `${flight.id}@${date}`,
		airline: flight.airline,
		stops: 0,
		segments: [segmentOf(flight, date)],
		durationMin: flownMinutes(flight),
		layoverMin: null,
		cabins,
		anySeats: summarize(cabins, pax)
	};
}
function makeConnection(first, second, date, secondDate, layoverMin, peak, daysOut, pax, from, to) {
	const domestic = from.region === "dom" && to.region === "dom";
	const primary = flownMinutes(first) >= flownMinutes(second) ? first : second;
	const feeder = primary === first ? second : first;
	const primaryDate = primary === first ? date : secondDate;
	const feederDate = feeder === first ? date : secondDate;
	const cabins = {};
	for (const cabin of CABINS) {
		const miles = awardMiles(first.airline, from, to, cabin, peak);
		if (miles == null) {
			cabins[cabin] = null;
			continue;
		}
		if (cabin !== "y" && !offers(primary, cabin)) {
			cabins[cabin] = null;
			continue;
		}
		const feederCabin = cabin !== "y" && offers(feeder, cabin) ? cabin : "y";
		const primarySeats = awardSeats(primary, primaryDate, cabin, daysOut, peak, domestic);
		const feederSeats = awardSeats(feeder, feederDate, feederCabin, daysOut, peak, domestic);
		const seats = Math.min(primarySeats, feederSeats);
		cabins[cabin] = {
			miles,
			seats,
			tax: awardTax(from, to),
			enough: seats >= pax
		};
	}
	return {
		id: `${first.id}+${second.id}@${date}`,
		airline: first.airline,
		stops: 1,
		segments: [segmentOf(first, date), segmentOf(second, secondDate)],
		durationMin: Math.max(flownMinutes(first) + layoverMin + flownMinutes(second), 0),
		layoverMin,
		cabins,
		anySeats: summarize(cabins, pax)
	};
}
function flownMinutes(flight) {
	return blockMinutes(flight.dep, flight.arr, flight.plus, tzOf(flight.from), tzOf(flight.to));
}
function operates(flight, date) {
	return flight.days.includes(isoDow(date));
}
function buildDay(from, to, date, input, nonstopExists) {
	const origin = AIRPORT[from];
	const dest = AIRPORT[to];
	const peak = isPeak(date, origin, dest);
	const daysOut = dayIndex(date) - dayIndex(input.today);
	const itineraries = [];
	for (const flight of flightsBetween(from, to, input.airline)) {
		if (!operates(flight, date)) continue;
		itineraries.push(makeNonstop(flight, date, peak, daysOut, input.pax, origin, dest));
	}
	if (!input.directOnly && !nonstopExists) for (const hub of ["ICN", "GMP"]) {
		if (hub === from || hub === to) continue;
		const firsts = flightsBetween(from, hub, input.airline).filter((f) => operates(f, date));
		for (const first of firsts) {
			const arrAbs = absMinutes(addDays(date, first.plus), first.arr);
			for (const extra of [0, 1]) {
				const secondDate = addDays(date, extra);
				const seconds = flightsBetween(hub, to, input.airline).filter((f) => f.airline === first.airline && operates(f, secondDate));
				for (const second of seconds) {
					const lay = absMinutes(secondDate, second.dep) - arrAbs;
					if (lay < (origin.region === "dom" && dest.region === "dom" ? 45 : 90) || lay > 960) continue;
					itineraries.push(makeConnection(first, second, date, secondDate, lay, peak, daysOut, input.pax, origin, dest));
				}
			}
		}
	}
	itineraries.sort((a, b) => {
		if (a.anySeats !== b.anySeats) return a.anySeats ? -1 : 1;
		if (a.stops !== b.stops) return a.stops - b.stops;
		return a.segments[0].dep.localeCompare(b.segments[0].dep);
	});
	const best = {
		y: null,
		j: null,
		f: null
	};
	for (const cabin of CABINS) {
		let miles = Infinity;
		let seats = 0;
		for (const itin of itineraries) {
			const offer = itin.cabins[cabin];
			if (!offer?.enough) continue;
			miles = Math.min(miles, offer.miles);
			seats = Math.max(seats, offer.seats);
		}
		if (seats > 0 && miles < Infinity) best[cabin] = {
			miles,
			seats
		};
	}
	return {
		date,
		peak,
		operates: itineraries.length > 0,
		anySeats: itineraries.some((itin) => itin.anySeats),
		best,
		itineraries
	};
}
function buildDirection(from, to, input) {
	const days = /* @__PURE__ */ new Map();
	const nonstop = flightsBetween(from, to, input.airline).length > 0;
	let seatDays = 0;
	let operateDays = 0;
	for (let i = 0; i <= 360; i++) {
		const date = addDays(input.today, i);
		const day = buildDay(from, to, date, input, nonstop);
		days.set(date, day);
		if (day.operates) operateDays += 1;
		if (day.anySeats) seatDays += 1;
	}
	return {
		days,
		seatDays,
		operateDays,
		nonstop
	};
}
function searchAwards(input) {
	return {
		outbound: buildDirection(input.from, input.to, input),
		inbound: input.roundTrip ? buildDirection(input.to, input.from, input) : null
	};
}
function cabinName(airline, cabin) {
	if (cabin === "y") return "일반석";
	if (cabin === "j") return airline === "OZ" ? "비즈니스" : airline === "KE" ? "프레스티지" : "비즈";
	return airline === "OZ" ? "스마티움" : airline === "KE" ? "일등석" : "일등·스마";
}
function firstSeatDate(days, month, notBefore) {
	let found = null;
	for (const [date, day] of days) {
		if (!date.startsWith(month)) continue;
		if (notBefore && date < notBefore) continue;
		if (!day.anySeats) continue;
		if (!found || date < found) found = date;
	}
	return found;
}
function FlightList({ date, itineraries, pax, selectedId, onSelect }) {
	if (!date) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "px-1 py-6 text-sm text-muted",
		children: "잔여가 있는 날을 고르면 그날 항공편이 모두 나옵니다."
	});
	const open = itineraries.filter((itin) => itin.anySeats).length;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mt-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-2 flex items-baseline justify-between gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "text-sm font-semibold",
				children: shortDate(date)
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-xs text-muted",
				children: [
					"운항 ",
					itineraries.length,
					"편 · 잔여 ",
					open,
					"편"
				]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "flex flex-col gap-2",
			children: itineraries.map((itin) => {
				const first = itin.segments[0];
				const last = itin.segments[itin.segments.length - 1];
				const on = itin.id === selectedId;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => onSelect(itin.id),
					className: "w-full rounded-xl border p-3 text-left " + (on ? "border-accent bg-bg" : "border-line bg-surface"),
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-start justify-between gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-sm font-semibold",
										children: [
											itin.airline === "KE" ? "대한항공" : "아시아나",
											" ",
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "font-medium text-muted",
												children: itin.segments.map((s) => s.flightNo).join(" + ")
											})
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "mt-1 text-sm",
										children: [
											first.dep,
											" ",
											city(first.from),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-muted",
												children: " → "
											}),
											last.arr,
											last.plus > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "text-peak",
												children: [" +", last.plus]
											}) : null,
											" ",
											city(last.to)
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "mt-1 text-xs text-muted",
										children: [
											first.eqName,
											" · ",
											formatDuration(itin.durationMin),
											" · ",
											itin.stops === 0 ? "직항" : `경유 1회 ${city(itin.segments[0].to)} ${formatDuration(itin.layoverMin ?? 0)}`
										]
									})
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "shrink-0 rounded-md border border-line px-2 py-1 text-xs",
								children: itin.anySeats ? "잔여" : "만석"
							})]
						}),
						itin.stops === 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-2 text-xs text-muted",
							children: [
								itin.segments[0].flightNo,
								" ",
								itin.segments[0].dep,
								"→",
								itin.segments[0].arr,
								itin.segments[0].plus > 0 ? ` +${itin.segments[0].plus}` : "",
								" ",
								city(itin.segments[0].to),
								" · ",
								itin.segments[1].flightNo,
								" ",
								shortDate(itin.segments[1].date),
								" ",
								itin.segments[1].dep,
								"→",
								itin.segments[1].arr
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-3 grid grid-cols-3 gap-2",
							children: CABINS.map((cabin) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CabinCell, {
								cabin,
								itin,
								pax
							}, cabin))
						})
					]
				}) }, itin.id);
			})
		})]
	});
}
function CabinCell({ cabin, itin, pax }) {
	const offer = itin.cabins[cabin];
	const name = cabinName(itin.airline, cabin);
	if (!offer) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-lg bg-bg px-2 py-2 text-xs text-muted",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: name }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "운항 없음" })]
	});
	const ok = offer.enough;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-lg px-2 py-2 text-xs " + (ok ? "bg-bg text-ink" : "bg-bg text-muted"),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-medium",
				children: name
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [formatMiles(offer.miles), "마일"] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [offer.seats > 0 ? `${offer.seats}석` : "만석", offer.seats > 0 && !ok ? ` · ${pax}명 부족` : ""] })
		]
	});
}
function city(code) {
	return AIRPORT[code]?.city ?? code;
}
function moneyLine(miles, tax, pax) {
	const totalMiles = miles * pax;
	const totalTax = tax * pax;
	if (pax === 1) return `${formatMiles(miles)}마일 · 세금·유류 약 ${formatWon(tax)}`;
	return `1인 ${formatMiles(miles)} · ${pax}인 ${formatMiles(totalMiles)}마일 · 세금 약 ${formatWon(totalTax)}`;
}
var WEEK = [
	"일",
	"월",
	"화",
	"수",
	"목",
	"금",
	"토"
];
function MonthCalendar({ title, month, onMonth, days, selected, onSelect, today, horizon, airline }) {
	const minMonth = monthKey(today);
	const maxMonth = monthKey(horizon);
	const cells = monthGrid(month);
	const months = monthsBetween(today, horizon);
	let monthSeats = 0;
	for (const [date, day] of days) if (date.startsWith(month) && day.anySeats) monthSeats += 1;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "min-w-0 rounded-xl border border-line bg-surface p-3 sm:p-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-3 flex items-start justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-base font-semibold",
					children: title
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-xs text-muted",
					children: [
						"이 달 잔여 ",
						monthSeats,
						"일"
					]
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-1",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							"aria-label": "이전 달",
							disabled: month <= minMonth,
							className: "flex h-11 w-11 items-center justify-center rounded-lg border border-line disabled:opacity-30",
							onClick: () => onMonth(addMonths(month, -1)),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "size-5" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "min-w-24 text-center text-sm font-semibold",
							children: monthLabel(month)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							"aria-label": "다음 달",
							disabled: month >= maxMonth,
							className: "flex h-11 w-11 items-center justify-center rounded-lg border border-line disabled:opacity-30",
							onClick: () => onMonth(addMonths(month, 1)),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "size-5" })
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mb-3 flex gap-2 overflow-x-auto pb-1",
				children: months.map((key) => {
					let seats = 0;
					for (const [date, day] of days) if (date.startsWith(key) && day.anySeats) seats += 1;
					const on = key === month;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => onMonth(key),
						className: "flex min-h-11 shrink-0 flex-col justify-center rounded-lg border px-3 text-left " + (on ? "border-accent bg-accent text-surface" : "border-line bg-bg text-ink"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "block text-xs font-medium",
							children: [Number(key.slice(5)), "월"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "block text-xs " + (on ? "text-surface" : "text-muted"),
							children: seats > 0 ? `잔여 ${seats}` : "없음"
						})]
					}, key);
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-2 flex flex-wrap gap-x-3 gap-y-1 text-xs text-muted",
				children: [CABINS.map((cabin) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: cabinClass(cabin, false),
					children: cabinName(airline, cabin)
				}, cabin)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-peak",
					children: "성수기"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-7 gap-1 text-center text-xs text-muted",
				children: WEEK.map((name) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "py-1",
					children: name
				}, name))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-7 gap-1",
				children: cells.map((date, index) => {
					if (!date) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {}, `e-${index}`);
					const day = days.get(date);
					const inRange = date >= today && date <= horizon;
					const selectedDay = date === selected;
					const open = Boolean(day?.anySeats);
					const operable = Boolean(day?.operates) && inRange;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						disabled: !operable,
						onClick: () => onSelect(date),
						"aria-label": aria(date, day),
						"aria-pressed": selectedDay,
						className: "flex min-h-20 flex-col items-center justify-center rounded-lg border px-0.5 py-1 text-xs leading-tight " + (selectedDay ? "border-accent bg-accent text-surface" : open ? "border-line bg-bg text-ink" : "border-transparent bg-transparent text-muted"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "font-semibold",
							children: [Number(date.slice(8)), day?.peak && inRange ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: selectedDay ? " text-surface" : " text-peak",
								children: " 성"
							}) : null]
						}), operable ? CABINS.map((cabin) => {
							const best = day?.best[cabin];
							return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: selectedDay ? "text-surface" : cabinClass(cabin, !best),
								children: best ? best.seats : "–"
							}, cabin);
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "mt-2 text-muted",
							children: inRange ? "" : ""
						})]
					}, date);
				})
			})
		]
	});
}
function cabinClass(cabin, empty) {
	if (empty) return "text-muted";
	if (cabin === "y") return "text-accent";
	if (cabin === "f") return "text-gold";
	return "text-ink";
}
function aria(date, day) {
	if (!day?.operates) return `${date} 운항 없음`;
	return `${date} ${CABINS.map((cabin) => {
		const best = day.best[cabin];
		return best ? `${cabinName("all", cabin)} ${best.seats}석` : `${cabinName("all", cabin)} 없음`;
	}).join(", ")}`;
}
function Finder() {
	const [today] = (0, import_react.useState)(seoulToday);
	const horizon = addDays(today, 360);
	const [trip, setTrip] = (0, import_react.useState)("rt");
	const [airline, setAirline] = (0, import_react.useState)("all");
	const [from, setFrom] = (0, import_react.useState)("ICN");
	const [to, setTo] = (0, import_react.useState)("LAX");
	const [pax, setPax] = (0, import_react.useState)(1);
	const [directOnly, setDirectOnly] = (0, import_react.useState)(false);
	const [outMonth, setOutMonth] = (0, import_react.useState)(monthKey(today));
	const [retMonth, setRetMonth] = (0, import_react.useState)(addMonths(monthKey(today), 1));
	const [outDate, setOutDate] = (0, import_react.useState)(null);
	const [retDate, setRetDate] = (0, import_react.useState)(null);
	const [outFlight, setOutFlight] = (0, import_react.useState)(null);
	const [retFlight, setRetFlight] = (0, import_react.useState)(null);
	const same = from === to;
	const result = (0, import_react.useMemo)(() => {
		if (same) return null;
		return searchAwards({
			from,
			to,
			airline,
			pax,
			directOnly,
			today,
			roundTrip: trip === "rt"
		});
	}, [
		airline,
		directOnly,
		from,
		pax,
		same,
		to,
		today,
		trip
	]);
	const outChosen = resolveDate(outDate, result?.outbound.days, outMonth);
	const retFloor = outChosen && outChosen > today ? outChosen : today;
	const retChosen = trip === "rt" && result?.inbound ? resolveDate(retDate, result.inbound.days, retMonth, retFloor) : null;
	(0, import_react.useEffect)(() => {
		if (retFloor.slice(0, 7) > retMonth) setRetMonth(retFloor.slice(0, 7));
	}, [retFloor, retMonth]);
	const outDay = outChosen ? result?.outbound.days.get(outChosen) : void 0;
	const retDay = retChosen && result?.inbound ? result.inbound.days.get(retChosen) : void 0;
	const outItin = outDay?.itineraries.find((itin) => itin.id === outFlight) ?? null;
	const retItin = retDay?.itineraries.find((itin) => itin.id === retFlight) ?? null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto w-full max-w-6xl px-4 py-6 sm:py-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "mb-5 max-w-3xl",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-semibold tracking-wide text-accent",
						children: "대한항공 · 아시아나 · 360일"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-1 text-3xl font-semibold tracking-tight",
						children: "마일캘린더"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm leading-relaxed text-muted",
						children: "일반석, 비즈니스, 일등석(스마티움) 예상 잔여가 있는 날만 달력에 진하게 나옵니다. 날짜를 누르면 그날 운항편이 한 편이 아니라 전부 펼쳐집니다."
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "rounded-xl border border-line bg-surface p-3 sm:p-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Seg, {
								options: [["rt", "왕복"], ["ow", "편도"]],
								value: trip,
								onChange: (v) => setTrip(v)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Seg, {
								options: [
									["all", "전체"],
									["KE", "대한항공"],
									["OZ", "아시아나"]
								],
								value: airline,
								onChange: (v) => setAirline(v)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								"aria-pressed": directOnly,
								onClick: () => setDirectOnly((v) => !v),
								className: "h-11 rounded-lg border px-3 text-sm " + (directOnly ? "border-accent bg-accent text-surface" : "border-line bg-bg text-ink"),
								children: "직항만"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex h-11 items-center rounded-lg border border-line bg-bg",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										"aria-label": "인원 줄이기",
										className: "flex h-11 w-11 items-center justify-center disabled:opacity-30",
										disabled: pax <= 1,
										onClick: () => setPax((n) => Math.max(1, n - 1)),
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Minus, { className: "size-4" })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "min-w-12 text-center text-sm",
										children: [pax, "명"]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										"aria-label": "인원 늘리기",
										className: "flex h-11 w-11 items-center justify-center disabled:opacity-30",
										disabled: pax >= 4,
										onClick: () => setPax((n) => Math.min(4, n + 1)),
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" })
									})
								]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-3 flex flex-col gap-2 sm:flex-row sm:items-end",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AirportField, {
								label: "출발",
								value: from,
								exclude: to,
								onChange: setFrom
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								"aria-label": "출발지와 도착지 바꾸기",
								className: "flex h-11 w-full shrink-0 items-center justify-center rounded-lg border border-line sm:mb-0 sm:w-11",
								onClick: () => {
									setFrom(to);
									setTo(from);
								},
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeftRight, { className: "size-4" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AirportField, {
								label: "도착",
								value: to,
								exclude: from,
								onChange: setTo
							})
						]
					}),
					same ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-sm text-peak",
						children: "출발지와 도착지가 같습니다."
					}) : result ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-3 text-sm text-muted",
						children: [
							routeBlurb(from, to, result.outbound.nonstop, result.outbound.operateDays, directOnly),
							" 가는 날 잔여",
							" ",
							result.outbound.seatDays,
							"일",
							result.inbound ? ` · 오는 날 잔여 ${result.inbound.seatDays}일` : "",
							". 조건이 바뀌면 360일을 바로 다시 계산합니다."
						]
					}) : null
				]
			}),
			result && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: trip === "rt" ? "mt-4 grid gap-4 lg:grid-cols-2" : "mt-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MonthCalendar, {
						title: "가는 날",
						month: outMonth,
						onMonth: setOutMonth,
						days: result.outbound.days,
						selected: outChosen,
						onSelect: (date) => {
							setOutDate(date);
							setOutFlight(null);
							if (retDate && date > retDate) setRetDate(null);
						},
						today,
						horizon,
						airline
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FlightList, {
						date: outChosen,
						itineraries: outDay?.itineraries ?? [],
						pax,
						selectedId: outItin?.id ?? null,
						onSelect: (id) => setOutFlight((cur) => cur === id ? null : id)
					})]
				}), trip === "rt" && result.inbound && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MonthCalendar, {
						title: "오는 날",
						month: retMonth,
						onMonth: setRetMonth,
						days: result.inbound.days,
						selected: retChosen,
						onSelect: (date) => {
							setRetDate(date);
							setRetFlight(null);
						},
						today: outChosen && outChosen > today ? outChosen : today,
						horizon,
						airline
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FlightList, {
						date: retChosen,
						itineraries: retDay?.itineraries ?? [],
						pax,
						selectedId: retItin?.id ?? null,
						onSelect: (id) => setRetFlight((cur) => cur === id ? null : id)
					})]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ComboSummary, {
				pax,
				airline,
				outDate: outChosen,
				retDate: trip === "rt" ? retChosen : null,
				outItin,
				retItin,
				outDay,
				retDay: trip === "rt" ? retDay : void 0,
				roundTrip: trip === "rt"
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("details", {
				className: "mt-6 rounded-xl border border-line bg-surface px-4 py-3 text-sm text-muted",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("summary", {
					className: "font-medium text-ink",
					children: "이 잔여석의 기준"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-3 space-y-2 leading-relaxed",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "대한항공·아시아나 사이트는 외부 조회가 막혀 있어 실시간 잔여석을 가져오지 못합니다. 달력의 숫자는 공개 공제표, 2026–2027 성수기, 대표 운항일, 좌석별 방출 패턴으로 계산한 예상 잔여입니다. 같은 조건이면 항상 같은 결과가 바로 나옵니다. 발권 전에는 항공사 화면에서 다시 확인하세요." }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "일반석 대한항공 편도 공제는 공식표입니다. 한국 출발 기준 국내 5,000/7,500, 일본·중국 15,000/22,500, 동남아·괌 20,000/30,000, 서남아 25,000/37,500, 미주·유럽·대양주 35,000/52,500(평수기/성수기). 프레스티지 장거리는 62,500/92,500, 일등석은 80,000/120,000을 기준으로 맞췄습니다." }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "아시아나는 공개 왕복 공제표의 절반을 편도로 봤습니다. 장거리 세 번째 칸은 일등석이 아니라 스마티움입니다. 성수기 날짜는 대한항공 국내·국제·미주 출발 달력을 쓰고, 아시아나에도 같은 달력을 참고로 적용합니다." }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "직항이 없는 도시 조합은 같은 항공사로 인천 또는 김포에서 한 번 갈아탑니다. 대기 45분(국내) 또는 90분에서 16시간. 공제는 구간을 더하지 않고 출도착 지역 한 장의 보너스로 계산합니다. 편명과 시각은 대표 스케줄이라 시즌에 따라 달라집니다." })
					]
				})]
			})
		]
	});
}
function resolveDate(chosen, days, month, notBefore) {
	if (!days) return null;
	if (chosen && days.get(chosen)?.operates && (!notBefore || chosen >= notBefore)) return chosen;
	return firstSeatDate(days, month, notBefore);
}
function routeBlurb(from, to, nonstop, operateDays, directOnly) {
	const a = AIRPORT[from]?.city ?? from;
	const b = AIRPORT[to]?.city ?? to;
	if (operateDays === 0) return `${a} → ${b} 구간의 운항편이 없습니다. 인천 출발로 바꿔 보세요.`;
	if (nonstop) return `${a} → ${b} 직항.`;
	if (directOnly) return `${a} → ${b} 직항이 없습니다.`;
	return `${a} → ${b} 직항이 없어 경유편만 보여 줍니다.`;
}
function Seg({ options, value, onChange }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex h-11 rounded-lg border border-line bg-bg p-1",
		children: options.map(([id, label]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			"aria-pressed": value === id,
			onClick: () => onChange(id),
			className: "h-full rounded-md px-3 text-sm " + (value === id ? "bg-accent text-surface" : "text-ink"),
			children: label
		}, id))
	});
}
function ComboSummary({ pax, airline, outDate, retDate, outItin, retItin, outDay, retDay, roundTrip }) {
	if (!outDate || !outDay) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "mt-4 rounded-xl border border-line bg-ink px-4 py-4 text-surface",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-sm font-medium",
				children: [
					"가는 날 ",
					shortDate(outDate),
					roundTrip && retDate ? ` · 오는 날 ${shortDate(retDate)}` : "",
					outItin ? ` · ${outItin.segments.map((s) => s.flightNo).join("+")}` : "",
					retItin ? ` / ${retItin.segments.map((s) => s.flightNo).join("+")}` : ""
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-3 grid gap-2 sm:grid-cols-3",
				children: CABINS.map((cabin) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "rounded-lg bg-surface px-3 py-2 text-sm text-ink",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted",
						children: cabinName(airline, cabin)
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1",
						children: lineFor(cabin, pax, roundTrip, outItin, retItin, outDay, retDay)
					})]
				}, cabin))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-xs text-surface",
				children: "항공편을 누르면 그 편 기준, 아니면 그날 가장 낮은 공제 기준입니다. 세금·유류는 대략치입니다."
			})
		]
	});
}
function lineFor(cabin, pax, roundTrip, outItin, retItin, outDay, retDay) {
	const out = pickOffer(cabin, outItin, outDay);
	if (!out) return "잔여 없음";
	if (!roundTrip) return moneyLine(out.miles, out.tax, pax);
	const back = retDay ? pickOffer(cabin, retItin, retDay) : null;
	if (!back) return `가는 편 ${formatMiles(out.miles)} · 오는 날 잔여 없음`;
	return moneyLine(out.miles + back.miles, out.tax + back.tax, pax);
}
function pickOffer(cabin, itin, day) {
	if (itin) {
		const offer = itin.cabins[cabin];
		if (!offer?.enough) return null;
		return offer;
	}
	const best = day.best[cabin];
	if (!best) return null;
	const tax = day.itineraries.find((item) => item.cabins[cabin]?.enough && item.cabins[cabin]?.miles === best.miles)?.cabins[cabin]?.tax;
	if (tax == null) return null;
	return {
		miles: best.miles,
		tax
	};
}
function Home() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Finder, {});
}
//#endregion
export { Home as component };
