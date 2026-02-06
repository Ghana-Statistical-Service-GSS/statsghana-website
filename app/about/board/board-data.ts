export type BoardMember = {
  slug: string;
  name: string;
  role: "Board Chair" | "Board Member" | "Ex-Officio Member" | "Board Secretary";
  image: string;
  bio: string[];
  managementHref?: string;
};

export const BOARD_MEMBERS: BoardMember[] = [
  {
    slug: "dr-anthony-yaw-baah",
    name: "Dr. Anthony Yaw Baah",
    role: "Board Chair",
    image: "/images/board/Dr. Anthony Yaw Baah (Board Chair).jpg",
    bio: [
      "Dr. Yaw Baah is a seasoned Economist and Trade Unionist with over 34 years of experience gained through lecturing university students, managing donor projects and directing labour policy formulation. He is currently the Executive Director of the Kaizen Institute for Labour Economics.",
      "Dr. Yaw Baah once served as the General Secretary of the Trade Union Congress of Ghana for eight years. Prior to that he served as the Deputy General Secretary, and Director of Labour Research and Policy Institute. While serving in those positions, he also served as part-time lecturer at the Institute for Development Studies (IDS), University of Cape Coast.",
      "Dr. Yaw Baah holds a Doctor of Philosophy degree in Economics from the University of Sussex, UK; Master of Science in Financial Economics from the Norwegian School of Management, Oslo; and bachelor's degree in Economics from University of Ghana. He has several publications to his credit.",
      "His public services include serving on the Boards and National Committees including Public Services Joint Standing Negotiating Committee (PSNJC); Ghana National Tripartite Committee Management Committee; Institute for Statistical, Social and Economic Research, University of Ghana, Legon; National Pensions Regulatory Authority; Presidential Committee on Emoluments Technical Committee on Public Sector Pay Reform Advisory Board; International Center for Development and Decent Work, University of Kassel, Germany. It must be noted that he once served on the Governing Board of Ghana Statistical Service.",
    ],
  },
  {
    slug: "dr-alhassan-iddrisu",
    name: "Dr. Alhassan Iddrisu",
    role: "Ex-Officio Member",
    image: "/images/board/Dr. Alhassan.jpg",
    managementHref: "/about/management/dr-alhassan-iddrisu",
    bio: [
      "Dr. Alhassan Iddrisu has been the Government Statistician of the Republic of Ghana since April 2025. He is a distinguished economist with over 27 years of expertise in economic policy management, public finance, development economics, statistics, climate change financing, petroleum revenue management, and economic integration. He has an extensive publication record in these domains and has made significant contributions to Ghana's economic development.",
      "He served as the Chief Economics Officer and Director of the Economic Strategy and Research Division (ESRD) at Ghana's Ministry of Finance from 2019 to April 2025. In this capacity, he led strategic economic research, policy analysis, and the formulation and implementation of policies aimed at advancing the nation's economic goals.",
      "Dr. Iddrisu holds a PhD and Master's degree in International Development Studies from the National Graduate Institute for Policy Studies (GRIPS) in Tokyo, Japan. He also earned an MPhil in Economics and a BA in Economics and Statistics from the University of Ghana, Legon.",
    ],
  },
  {
    slug: "prof-mariama-awumbila",
    name: "Prof. Mariama Awumbila",
    role: "Board Member",
    image: "/images/board/Prof. Mariama Awumbila.jpg",
    bio: [
      "Profile Mariama Awumbila holds a Ph.D. (Geography) from the University of Newcastle Upon Tyne, UK, an MA in Population Studies from the University of Ghana, and a Bachelors degree in Geography with Sociology also from the University of Ghana.",
      "She is a Professor at the Department of Geography and Resource Development, and also at the Centre for Migration Studies, both at the University of Ghana. She is also the founding Director of the Centre for Migration Studies from 2006 to 2014. She has been a David Bell Research Fellow and a Fulbright Senior African Visiting Scholar at the Harvard Center for Population and Development, Harvard University, Cambridge, Massachusetts.",
      "Her research interests are in the areas of migration, livelihoods and development, intra-regional labour migration, gender and development, urbanization, population and development among others. She has provided consultancy and extension services in several areas for several international and national agencies including the UK Department for International Development (DFID), UK Research and Innovation GCRF, International Organisation for Migration (IOM), the European Union (EU), World Bank, and several MMDAs among others. She was lead consultant to the Ghana Inter Ministerial Steering Committee on Migration (IMSCM) for the development of a Ghana National migration policy from 2012 to 2016.",
      "She was also the Lead Partner and Principal Researcher for the DFID funded \"Migrating Out of Poverty\" project from 2010 to 2019. From 2007 to 2014, She was the Project Director for the Netherlands Universities Foundation for International Cooperation Netherlands (NUFFIC) Project \"Support to Centre for Migration Studies\". Since 2006 she nurtured the establishment of the Centre for Migration Studies into a full-fledged University Centre, undertaking extensive migration research and extension services, and offering MA, M.Phil and Ph.D courses in migration studies, currently the only such Centre in West Africa.",
      "She has served on several professional and national governing boards including the Savannah Accelerated Development Authority (SADA) Board (2013 to 2016), Ghana Statistical Service Board (2005 to 2016, 2025), the Inter Ministerial Steering Committee on Migration, the National Council for Tertiary Education, the Governing Council of the University of Development Studies and the World Vision Ghana Advisory Board among others. From 2017 to 2022, she was a member of the Networks of Centres of Excellence of Canada (NCE) Standing Selection Committee.",
    ],
  },
  {
    slug: "mrs-nelly-mireku",
    name: "Mrs. Nelly Mireku",
    role: "Board Member",
    image: "/images/board/Mrs Nelly Mireku.jpg",
    bio: [
      "Mrs. Nelly Mireku is a Chief Economics Officer and Director of the Research Division with over two decades of experience as an economist in the Ministry of Finance with specialization in macroeconomic management, fiscal policy and multilateral cooperation.",
      "She was the Head of the World Bank Group Unit of the Ministry from September 2021 to April 2025, where she led the team to mobilize resources from the World Bank and manage the over US$4 billion World Bank portfolio in Ghana. She concurrently held the position of Head of International Advocacy in the Office of the Finance Minister, where she utilized her expertise in international economic relations and in-depth understanding of the global financial architecture to advance Ghana's interests.",
      "Prior to her appointment as Head of the World Bank Group Unit, Mrs. Mireku served as Senior Advisor to Ghana's Executive Director at the World Bank from 2016 to 2021, where she provided strategic support to the Executive Director and provided advice on the World Bank Group's policies, operations, strategies, lending, resource mobilization and its role in global issues.",
      "Mrs. Mireku holds an MPhil in Economics from the University of Ghana and a B.A. (Hons) in Economics from the University of Cape Coast. She is a member of the Institute of Certified Economists of Ghana (ICEG) and has enhanced her professional development in macroeconomic management and leadership through programs at institutions, such as the University of Oxford, Georgia State University, and the International Monetary Fund.",
    ],
  },
  {
    slug: "dr-philomena-efua-nyarko",
    name: "Dr. Philomena Efua Nyarko",
    role: "Board Member",
    image: "/images/board/Dr. Philomena Nyarko.jpg",
    bio: [
      "Dr. Philomena Efua Nyarko holds a PhD in Social Statistics from the University of Southampton (UK) and a Graduate Diploma in Population Studies from the University of Ghana, Legon. She once served as Government Statistician until her retirement from public service in November 2016. Prior to that she had served as the Deputy Government Statistician and as Acting Government Statistician at the GSS from August 2010 to April 2013.",
      "As Government Statistician, She supervised the successful completion of several research projects, including the 2010 Population and Housing Census, the 2011 Multiple Indicator Cluster Survey (MICS), the 2012 Transport Survey, the 2012/2013 Ghana Living Standards Survey (GLSS6), the 2014 Demographic and Health Survey, the 2015 Family Life and Health Survey, the 2015 Ghana Labour Force Survey, the Integrated Business Establishment Survey.",
      "Currently, she is a Research Consultant and had consulted for UN Women, African Development Bank, Common Market for Eastern and Southern Africa (COMESA), Nigeria and Seychelles National Statistical Systems.",
    ],
  },
  {
    slug: "dr-paul-kwame-butakor",
    name: "Dr. Paul Kwame Butakor",
    role: "Board Member",
    image: "/images/board/Dr. Paul Kwame Butakor.jpg",
    bio: [],
  },
  {
    slug: "dr-zakaria-mumuni",
    name: "Dr. Zakaria Mumuni",
    role: "Board Member",
    image: "/images/board/Dr. Zakaria Mumuni.jpg",
    bio: [],
  },
  {
    slug: "mr-kwadwo-asante",
    name: "Mr. Kwadwo Asante",
    role: "Board Secretary",
    image: "/images/board/Mr. Kwadwo Asante.jpg",
    managementHref: "/about/management/mr-kwadwo-asante-mensah",
    bio: [],
  },
];
