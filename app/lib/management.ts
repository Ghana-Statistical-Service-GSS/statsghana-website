export type ManagementPerson = {
  id: string;
  slug: string;
  name: string;
  position: string;
  group: "GS" | "DGS" | "DIRECTOR";
  directorate?: string;
  photo: string;
  bio: string;
  email?: string;
  phone?: string;
};

export const slugify = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/['’]/g, "")
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

export const getPersonSlug = (person: ManagementPerson) =>
  slugify(person.slug || person.name);

const bioBase =
  "Mr. [Name] brings extensive experience in statistical leadership, policy advisory, and national development planning. Their work focuses on data quality, modernization of statistical systems, and strengthening the National Statistical System across sectors.";

const gsBio =
  "Dr. Alhassan Iddrisu is a distinguished economist with over 27 years of experience in economic policy management, public finance, development economics, climate change financing, petroleum revenue management, and economic integration. He has an extensive record of publications and contributions in these areas.\n\n" +
  "He is currently the Government Statistician of the Ghana Statistical Service. Prior to this appointment, he served as the Chief Economics Officer and Director of the Economic Strategy and Research Division (ESRD) at the Ministry of Finance. In that role, he led strategic economic research, policy analysis, and the design and implementation of policies to support Ghana's economic development agenda.\n\n" +
  "Dr. Iddrisu has held several key leadership positions within the Ministry of Finance, including Director of the Economic Planning Division (EPD), the Real Sector Division (RSD), and the Economic Research and Forecasting Division (ERFD). His leadership has been instrumental in shaping national economic strategies and advancing policy reforms.\n\n" +
  "Beyond the Ministry, he has served on numerous boards, councils, and committees, bringing his expertise to bear on national development initiatives. He has also worked extensively with international organisations such as the International Monetary Fund (IMF), World Bank, African Union (AU), and the Economic Community of West African States (ECOWAS), and has consulted for various global and local institutions.\n\n" +
  "In recognition of his exceptional service, Dr. Iddrisu was honoured as \"Best Director\" in Ghana's Civil Service for four years - 2018, 2019, 2020, and 2022 - underscoring his consistent performance and dedication.\n\n" +
  "He is also committed to academic excellence and capacity building. His teaching engagements in economics, public policy, and development have contributed to the training and professional growth of students and government staff alike.\n\n" +
  "Dr. Iddrisu holds a PhD and a Master's degree in International Development Studies from the National Graduate Institute for Policy Studies (GRIPS) in Tokyo, Japan. He also earned an MPhil in Economics and a BA in Economics and Statistics from the University of Ghana, Legon.";

const dgsBio =
  "Mr. Omar Seidu is a seasoned statistician with over two decades of professional experience in official statistics, social and demographic data systems, and national development monitoring.\n\n" +
  "He is currently serving as the Acting Deputy Government Statistician of the Ghana Statistical Service (GSS), where he provides strategic leadership in the coordination of the National Statistical System and oversees the production of high-quality official statistics to support national development planning and evidence-based decision-making.\n\n" +
  "Prior to this appointment, Mr. Seidu served as the Director of Social Statistics at GSS, leading the design, implementation, and dissemination of major social and demographic statistical programmes. His work spanned population and housing censuses, household surveys, labour and living standards surveys, gender statistics, migration statistics, and social inclusion indicators.\n\n" +
  "He has played a key role in strengthening Ghana's statistical architecture, particularly in:\n\n" +
  "Social and demographic statistics production\n\n" +
  "Survey methodology and sampling design\n\n" +
  "Sustainable Development Goals (SDGs) monitoring and reporting\n\n" +
  "Statistical quality assurance frameworks\n\n" +
  "Inter-agency coordination across MDAs\n\n" +
  "International data reporting and partnerships\n\n" +
  "Mr. Seidu also served as National Coordinator for the SDG Data Framework, spearheading Ghana's efforts in tracking, compiling, validating, and disseminating SDG indicators in collaboration with national and international partners.\n\n" +
  "In recognition of his outstanding contribution to national and global development data systems, Mr. Omar Seidu was honoured at the GEO Global Forum in 2025 for his leadership and impact as Head of the SDGs Unit at the Ghana Statistical Service. The recognition highlighted his role in advancing the use of geospatial and statistical integration for sustainable development monitoring.\n\n" +
  "Mr. Seidu has represented the Ghana Statistical Service at numerous regional and international statistical forums, including engagements with the United Nations Statistics Division (UNSD), African Union Commission, World Bank, UNDP, and other development partners. His work continues to contribute significantly to strengthening data-driven governance and improving access to reliable, timely, and disaggregated statistics.\n\n" +
  "He is widely respected for his technical depth, institutional knowledge, and commitment to building a credible, modern, and resilient national statistical system, in line with the Statistical Service Act, 2019 (Act 1003) and international best practices.";

const abenaBio =
  "Abena Asamoabea Osei-Akoto is a versatile, dedicated and intelligent woman who has the passion for and aims at setting excellence as the benchmark for whatever task that is at hand. Always ready to take up new and daunting challenges. An effective team player, a well-organised person, pays attention to details, easy to learn and adapt to new changes and is trustworthy and has strong moral principles.\n\n" +
  "Abena studied at the University of Ghana and received an M.A. in Development Studies. She read Mathematics and Computer Science for her Bachelor's degree at the same University. She has extensive research experience from the preparation of the project document to its implementation.\n\n" +
  "She joined the Service in May 1992 as an Assistant Programmer and currently a Chief Statistician. She Heads the Surveys and Censuses Directorate. Her office assists and guides other Institutions in the implementation of surveys.";

const kwadwoBio =
  "Kwadwo has a first degree in Sociology and Geography and a Master of Science degree in Development Policy and Planning, all from the Kwame Nkrumah University of Science and Technology. He has post-graduate certificates in International Applied Epidemiology from Emory University/CDC Atlanta, and Public Administration Management from Galilee International Management Institute, Israel.\n\n" +
  "Kwadwo has over 22 years of work experience from both the public and private sector. He had assignments in International Project Management, Administration, Employees' and Community Relations, Manganese Mining, Procurement, Events Organization, Customer Services, Marketing, Workshop/Seminar Organization.\n\n" +
  "He was a management member of National AIDS Control Programme of the Ghana Health Service for 11 years. He served as the Monitoring and Evaluation Officer and the Focal Person for the HIV Component of the Global Fund to fight AIDS, TB, and Malaria.\n\n" +
  "Kwadwo joined GSS in 2014 as the Director of Administration; and has been providing leadership and strategic direction over the activities of seven Units namely Transport, Estates, Records and Archives, Secretariat/Registry, Procurement, Legal and Security.";

const emmanuelBio =
  "Mr Emmanuel Amonoo Cobbinah holds MSc. Degree in Development Policy and Planning from KNUST and BA (Honours) Degree in Geography and Resource Development from University of Ghana as well as a certificate in Official Statistic from UNSIAP CHIBA Japan. He has in the past fifteen years served in three strategic positions in Ghana Statistical Service (GSS): Head of the Statistical Policy Planning and Coordination, Head of Planning and Budgeting and as the head of the Procurement Unit.\n\n" +
  "Mr Cobbinah is a result oriented professional with over twenty year's demonstrated experience and accomplishment in development work and Public Service and with commitment towards the development of a socially just and sustainable economies with accountable and inclusive system of governance. He has a track record of research and advocacy, publication and report writing, project design and appraisal, surveys, monitoring and evaluation as well as networking and collaboration with NGOs, MDAs, decentralised departments, development partners and community groups and committees. He also has close to a decade experience with Public Procurement including, the World Bank Procurement and other development Partners' procurement System. Mr Cobbinah has enormous skills in participatory methodologies and approaches, multi-stakeholder processes and Governance.";

const davidBio =
  "David began his career with a background in Mathematics and has worked in the Statistical Service for nearly two decades. For the first eight years, he served as a Statistician in Economic Statistics Directorate, where he had the opportunity to compile and provide insightful interpretations of economic indicators. This was followed by opportunities to deepen his statistical expertise in the fields of social statistics and demographics. David’s people-centred personality has shaped how he has spent the past decade, focusing on effective communication and dissemination of statistics.\n\n" +
  "His passion for addressing the needs of data users drew his attention to the inefficiencies in the GSS data response system, which ultimately led to the conceptualization and establishment of the Resource and Data Centre (RDC) in the Communication and Dissemination Directorate. In addition to generating income from data requests, the creation of the RDC addressed three major challenges: the lack of time series data, inconsistencies and gaps in MDAs’ datasets, and the need for improved turnaround times in responding to requests. In recognition of his contributions to the organization's goals, David has addressed specific user needs by authoring two foundational publications: the 2013 Ghana Statistical Yearbook and the 2016 Education Statistics report, which tracks progress at the basic level across districts.\n\n" +
  "David brings a strong analytical and storytelling ability to the communication field, demonstrated through his commitment to accuracy, relevance, timeliness, and high-quality data.\n\n" +
  "Championing inclusivity is a hallmark of David’s work. He believes that statistical products should be packaged and disseminated with all audiences in mind, including vulnerable and marginalized groups.";

const markBio =
  "Mr. Mark Abuabu-Dadzie is the Director of Digital Services & Technology (DST) at the Ghana Statistical Service (GSS), where he provides strategic leadership for the planning, development, and security of the Service's digital infrastructure and technology systems.\n\n" +
  "He brings over two decades of professional experience in information technology, with expertise in digital transformation, IT governance, cybersecurity, and enterprise systems management. His responsibilities include oversight of survey data collection platforms (CAPI), statistical production systems, dissemination platforms, and native web and mobile applications supporting nationwide data operations.\n\n" +
  "Mr. Abuabu-Dadzie plays a key role in advancing GSS's digital modernization agenda, ensuring scalable, secure, and reliable technology solutions that strengthen official statistics delivery in accordance with the Statistical Service Act, 2019 (Act 1003) and international best practices.";

export const MANAGEMENT: ManagementPerson[] = [
  {
    id: "gs",
    slug: "dr-alhassan-iddrisu",
    name: "Dr. Alhassan Iddrisu",
    position: "Government Statistician",
    group: "GS",
    directorate: "Office of the Government Statistician",
    photo: "/images/management/gs.jpg",
    bio: gsBio,
    email: "alhassan.iddrisu@statsghana.gov.gh",
  },
  {
    id: "dgs",
    slug: "mr-omar-seidu-dgs",
    name: "Mr. Omar Seidu",
    position: "Ag. Deputy Government Statistician",
    group: "DGS",
    directorate: "Office of the Deputy Government Statistician",
    photo: "/images/management/omarseidu.jpeg",
    bio: dgsBio,
    email: "omar.seidu@statsghana.gov.gh",
  },
  {
    id: "director-13",
    slug: "mr-mark-abuabu-dadzie",
    name: "Mr. Mark Abuabu-Dadzie",
    position: "Director",
    group: "DIRECTOR",
    directorate: "Digital Services and Technology",
    photo: "/images/management/mark.jpg",
    bio: markBio,
    email:"mabuabu-dadzie@statsghana.gov.gh"
  },
  {
    id: "director-10",
    slug: "mr-kwadwo-asante-mensah",
    name: "Mr. Kwadwo Asante Mensah",
    position: "Director",
    group: "DIRECTOR",
    directorate: "Administration",
    photo: "/images/management/kwadwoasante.jpg",
    bio: kwadwoBio,
    email:"kwadwo.asante@statsghana.gov.gh"
  },
  {
    id: "director-7",
    slug: "mrs-abena-osei-akoto",
    name: "Mrs. Abena Osei-Akoto",
    position: "Director",
    group: "DIRECTOR",
    directorate: "Survey and Census Organisation",
    photo: "/images/management/abenaosei.jpg",
    bio: abenaBio,
    email:"abena.osei-akoto@statsghana.gov.gh"
  },
  {
    id: "director-14",
    slug: "mr-emmanuel-cobbinah",
    name: "Mr. Emmanuel Cobbinah",
    position: "Director",
    group: "DIRECTOR",
    directorate: "Internal and External Cooperation",
    photo: "/images/management/cobinnah.jpg",
    bio: emmanuelBio,
    email:"emmanuel.cobbinah@statsghana.gov.gh"
  },
  {
    id: "director-1",
    slug: "dr-johnson-owusu-kagya",
    name: "Dr. Johnson Owusu Kagya",
    position: "Director",
    group: "DIRECTOR",
    directorate: "Business, Industry and Trade (BIT)",
    photo: "/images/placeholder-person.png",
    bio: bioBase.replace("[Name]", "Johnson Owusu Kagya"),
  },
  {
    id: "director-2",
    slug: "mr-francis-bright-mensah",
    name: "Mr Francis Bright Mensah",
    position: "Director",
    group: "DIRECTOR",
    directorate: "Economy",
    photo: "/images/management/francisbright.jpg",
    bio:
      "A senior statistician and economist with over 24 years of progressive professional experience in official statistics, macroeconomic measurement, national accounts, and applied data science. Currently serving as Chief Statistician and Director of the Economy Directorate, providing overall leadership, strategic direction and policy guidance for the development, coordination and management of Ghana’s economic statistics.",
  },
  {
    id: "director-4",
    slug: "coming-soon",
    name: "Coming Soon",
    position: "Director",
    group: "DIRECTOR",
    directorate: "Research and Data Science",
    photo: "/images/placeholder-person.png",
    bio: bioBase.replace("[Name]", "coming soon"),
  },
  {
    id: "director-5",
    slug: "comingsoon",
    name: "Coming-Soon",
    position: "Director",
    group: "DIRECTOR",
    directorate: "Social",
    photo: "/images/placeholder-person.png",
    bio: bioBase.replace("[Name]", "coming soon"),
  },
  {
    id: "director-6",
    slug: "mr-godwin-odei-gyebi",
    name: "Mr. Godwin Odei Gyebi",
    position: "Director",
    group: "DIRECTOR",
    directorate: "Demography",
    photo: "/images/management/odei.jpg",
    bio:
      "Mr. Godwin Odei Gyebi is a Chief Statistician and demography expert with over 26 years of experience in population research and national statistical systems in Ghana. He is a Director at the Ghana Statistical Service and currently heads the Demography Directorate, where he oversees demographic data validation, statistical publications, and the computation of population indicators, estimates, and projections.\n\n" +
      "He has played key roles in Ghana’s Population and Housing Censuses (2000, 2010, and 2021) and major national sample surveys, including the Demographic and Health Survey, Labour Force Survey, Ghana Living Standards Survey, Multiple Indicator Cluster Survey, and the Malaria Indicator Survey.\n\n" +
      "Mr. Gyebi holds a master’s degree in Population Studies from the University of Ghana and a B.Ed. in Social Studies with a Diploma in Geography from the University of Cape Coast. He has also contributed to national migration policy development and participated in several international and UN technical forums.",
  },
  {
    id: "director-12",
    slug: "mr-timothy-afful",
    name: "Mr. Timothy Afful",
    position: "Director",
    group: "DIRECTOR",
    directorate: "Finance",
    photo: "/images/placeholder-person.png",
    bio: bioBase.replace("[Name]", "Timothy Afful"),
  },
  {
    id: "director-9",
    slug: "mr-david-bessah",
    name: "Mr. David Bessah",
    position: "Ag. Director",
    group: "DIRECTOR",
    directorate: "Communication and Dissemination",
    photo: "/images/management/bessah.jpg",
    bio: davidBio,
    email:"david.bessah@statsghana.gov.gh"
  },
  {
    id: "director-3",
    slug: "dr-lucy-twumwaa-afriyie",
    name: "Dr. Lucy Twumwaa Afriyie",
    position: "Ag.Director",
    group: "DIRECTOR",
    directorate: "Methods and Standards",
    photo: "/images/placeholder-person.png",
    bio: bioBase.replace("[Name]", "Lucy Twumwaa"),
  },
  {
    id: "director-8",
    slug: "dr-abekah-ansah",
    name: "Dr. Abekah Ansah",
    position: "Ag. Director",
    group: "DIRECTOR",
    directorate: "Programme Monitoring and Evaluation",
    photo: "/images/placeholder-person.png",
    bio: bioBase.replace("[Name]", "Abekah Ansah"),
  },
  {
    id: "director-11",
    slug: "mr-isaac-odoom",
    name: "Mr. Isaac Odoom",
    position: "Ag.Director",
    group: "DIRECTOR",
    directorate: "Human Resource",
    photo: "/images/placeholder-person.png",
    bio: bioBase.replace("[Name]", "Isaac Odoom"),
  },
  {
    id: "director-15",
    slug: "mr-ansah-asare",
    name: "Mr. Ansah Asare",
    position: "Head",
    group: "DIRECTOR",
    directorate: "Internal Audit",
    photo: "/images/placeholder-person.png",
    bio: bioBase.replace("[Name]", "David Asare"),
  },
  {
    id: "director-16",
    slug: "mr-mabruk-fuseini",
    name: "Mr. Mabruk Fuseini",
    position: "Head",
    group: "DIRECTOR",
    directorate: "Procurement",
    photo: "/images/placeholder-person.png",
    bio: bioBase.replace("[Name]", "Mabruk Fuseini"),
  },
];
