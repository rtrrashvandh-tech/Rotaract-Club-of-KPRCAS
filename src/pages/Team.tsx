import React, { useState } from 'react';

/* ─── DATA ─────────────────────────────────────────────────── */

const patrons = [
  {
    name: 'Dr. K.P. Ramasamy',
    role: 'Patron',
    badge: 'Chairman, KPR Group of Institutions',
    image: 'https://res.cloudinary.com/drmwtmeg3/image/upload/v1755411671/Chairman_sir_mcs6ns.avif',
    quote: 'Guiding the institution with visionary leadership and unwavering commitment to excellence in education.',
  },
  {
    name: 'Dr. Geetha P.',
    role: 'Patron',
    badge: 'Principal, KPRCAS',
    image: 'https://res.cloudinary.com/drmwtmeg3/image/upload/v1755411672/principal_mam_gzmnvm.jpg',
    quote: 'Providing invaluable support to every student initiative with vision and dedication.',
  },
  {
    name: 'Dr. Vinayak SP',
    role: 'Staff Coordinator',
    badge: 'Faculty Advisor & Head Coordinator',
    image: 'https://res.cloudinary.com/drmwtmeg3/image/upload/v1755411699/staff_coordinator_u61x5h.jpg',
    quote: 'I have always believed in the incredible potential of student leadership.',
  },
];

const leadership = [
  {
    name: 'Rtr. Sanjith Kumar Sri Krishnan',
    role: 'President',
    year: 'Vision Year 2025–26',
    image: 'https://res.cloudinary.com/drmwtmeg3/image/upload/v1755411667/sanjith_yfeoyr.jpg',
    highlights: ['Best Secretary 2024-2025', 'Best Interactor Award', 'Rolling Trophy with 10+ Recognition', 'Led Team of 100 Members', '40+ Impactful Events Conducted'],
    bio: 'A dedicated and dynamic member of Rotary since 2021, Rtr. Sanjith Kumar Sri Krishnan has made a significant impact through his leadership and passion for service. Transformed the club from active to hyper-active, earning a Rolling Trophy with 10+ recognitions. Poised to lead the club in the new district with a clear vision and framework, set to unleash the legacy in 2025-2026.',
  },
  {
    name: 'Rtr. Haripriya',
    role: 'Secretary – Administration',
    year: 'Vision Year 2025–26',
    image: 'https://res.cloudinary.com/drmwtmeg3/image/upload/v1755411703/team-member-haripriya_gj96fq.jpg',
    highlights: ['Roar Recognition from District', 'Blooming Blossom Project Lead', 'Roar Year Scrapbook Editor', '100+ Beneficiaries Impacted', 'District Events Representative'],
    bio: 'A Visionary Leader, A Creative Soul. Rtr. Haripriya has been a defining presence in the Roar Year of the Rotaract Club of KPRCAS, embodying quiet strength and impactful leadership. As Vice President, she played a crucial role in club operations—coordinating with the board, tracking events, resolving concerns, and maintaining seamless communication.',
  },
  {
    name: 'Rtr. Mounesh',
    role: 'Secretary – Communication',
    year: 'Vision Year 2025–26',
    image: 'https://res.cloudinary.com/drmwtmeg3/image/upload/v1755411701/mounish_kblucw.jpg',
    highlights: ['Financial Transparency as Treasurer', 'Active Participation in District Events', 'Pillar of Support in IDYE', 'Reliable & Resilient Leader'],
    bio: 'Rtr. Mounesh began his Rotaract journey as Treasurer of the Rotaract Club of KPRCAS, where his keen knowledge in managing finances ensured transparency and efficiency in the club’s operations. His experience, steadfast nature, and passion for service continue to strengthen the spirit of teamwork.',
  },
  {
    name: 'Rtr. Saran G',
    role: 'Vice President',
    year: 'Vision Year 2025–26',
    image: 'https://res.cloudinary.com/drmwtmeg3/image/upload/v1755412967/team-member-saran_rhfrcq.jpg',
    highlights: ['Outstanding DPP Performance Award', 'BEST PROJECT - BLOOMING BLOSSOM', 'Radiant Circle of Academic Excellence Award'],
    bio: 'Serving the Rotaract Club of KPRCAS since 2022, this is his 4th year of Rotaraction. He served as Community Service Chair, TRF Chair, and DPP Chair. His leadership in the "BLOOMING" theme earned wide acclaim and district-level recognition.',
  },
  {
    name: 'Rtr. Pratheesh',
    role: 'Special Aid to the President',
    year: 'Vision Year 2025–26',
    image: 'https://res.cloudinary.com/drmwtmeg3/image/upload/v1755413221/prateesh_xfstxd.jpg',
    highlights: ['Advisor & Collaborator with the President', 'Proactive & Strategic Mindset', 'Coordinates with Committees', 'Fosters Teamwork & Collaboration'],
    bio: 'A key advisor and collaborator working directly with the President to ensure the seamless execution of our club\'s goals. He brings a strategic mind instrumental in supporting various avenues of service and driving projects forward.',
  },
  {
    name: 'Rtr. Netra',
    role: 'Joint Secretary',
    year: 'Vision Year 2025–26',
    image: 'https://res.cloudinary.com/drmwtmeg3/image/upload/v1755411704/team-member-netra_obbhqr.jpg',
    highlights: ['World Record - Bharathanatyam', '1,200 Students Coordinated', 'Cultural Preservation Champion', 'Youth Engagement Leader'],
    bio: 'A dynamic and committed member showcasing exceptional leadership and a deep passion for community service. Netra contributed to a world record in Bharathanatyam with 1,200 students, symbolizing cultural pride and unity.',
  },
  {
    name: 'Rtr. Sanjay Harish',
    role: 'Past President & Mentor',
    year: 'Vision Year 2025–26',
    image: 'https://res.cloudinary.com/drmwtmeg3/image/upload/v1755411708/team-member-sanjay_lpxwng.jpg',
    highlights: ['Exceptional Leadership', 'Innovative Projects', 'Service Excellence', 'Team Building Expert', 'Active Mentor'],
    bio: 'Known for exceptional leadership, vision, and unwavering dedication. Sanjay Harish elevated the club’s presence through innovative projects and continues to be an active mentor for future leaders.',
  },
  {
    name: 'Rtr. Midun',
    role: 'Treasurer',
    year: 'Vision Year 2025–26',
    image: 'https://res.cloudinary.com/drmwtmeg3/image/upload/v1755411704/team-member-midun_gxbwsp.jpg',
    highlights: ['Cricket Enthusiast & Team Player', 'Calm & Focused Under Pressure', 'Financial Accuracy & Transparency', 'Vision of Family Leadership'],
    bio: 'A passionate individual who believes in hard work and balance. Midun manages financial responsibilities with accuracy and transparency, remaining calm and focused during challenging situations.',
  },
];

const boardMembers = [
  {
    name: 'Rtr. Sakthi Ram',
    role: 'IMMEDIATE PAST PRESIDENT',
    year: 'Vision Year 2025–26',
    image: 'https://res.cloudinary.com/drmwtmeg3/image/upload/v1755411666/srisakti_vtnylf.jpg',
    bio: 'Providing continuity and mentorship to the current board, drawing from a year of successful leadership.',
    highlights: ['Mentorship', 'Leadership Continuation']
  },
  {
    name: 'Rtr. Surya Prakash',
    role: 'SEARGANT AT ARMS',
    year: 'Vision Year 2025–26',
    image: 'https://res.cloudinary.com/drmwtmeg3/image/upload/v1755411667/Surya_Prakash_joopwi.jpg',
    bio: 'Ensuring decorum and maintaining protocol during all official meetings and events.',
    highlights: ['Protocol Expert', 'Event Management']
  },
  {
    name: 'Rtr. Priyanka J. K',
    role: 'Chair – All Operations',
    year: 'Vision Year 2025–26',
    image: 'https://res.cloudinary.com/drmwtmeg3/image/upload/v1755411663/JK_priyanka_hit03k.jpg',
    bio: 'A dedicated member who held the position of Secretary of Communication for 2024–2025. This role sharpened her planning and organizational skills, which she now applies to overseeing club operations with efficiency.',
    highlights: ['Chair – All Operations (2025–2026)', 'Former Secretary of Communication (2024–2025)', 'Teamwork & Coordination', 'Efficient Planning & Execution', 'Leadership & Professional Growth']
  },
  {
    name: 'Rtr. Indupriya S',
    role: 'Community Service Chair',
    year: 'Vision Year 2025–26',
    image: 'https://res.cloudinary.com/drmwtmeg3/image/upload/v1755411703/team-member-indupriya_emom2c.jpg',
    bio: 'Being the Community Service Chair is a responsibility she truly values. Always active and committed, she believes in giving her best in everything. Community service has taught her that even the smallest effort can bring a smile.',
    highlights: ['Dedicated to Community Impact', 'Strong Team Player & Communicator', 'Handles Challenges Calmly & Practically', 'Hardworking & Responsible Leader', 'Passionate About Service Projects']
  },
  {
    name: 'Rtr. Prabhagar S',
    role: 'Community Service Director',
    year: 'Vision Year 2025–26',
    image: 'https://res.cloudinary.com/drmwtmeg3/image/upload/v1755411707/team-member-prabhagar_x5ggfk.jpg',
    bio: 'As the Community Service Director, Prabhagar takes pride in serving with confidence, bold vision, and an unwavering commitment to positive change. His journey is driven by a passion for making a difference and standing up for those in need.',
    highlights: ['Passionate Community Service Leader', 'Bold & Confident Decision Maker', 'Hands-On in Planning & Execution', 'Impactful Outreach & Partnerships', 'Inspires & Emowers Communities']
  },
  {
    name: 'Rtr. Monisha',
    role: 'Chair – District Priority Projects',
    year: 'Vision Year 2025–26',
    image: 'https://res.cloudinary.com/drmwtmeg3/image/upload/v1755411704/team-member-monisha_jpfpnu.jpg',
    bio: 'Currently serving as the Chair – District Priority Projects. Pursuing studies at KPRCAS, she strives to grow as an individual who can make a meaningful difference in society through both academics and Rotaract.',
    highlights: ['Chair – District Priority Projects', 'Leadership, Service & Personal Growth', 'Creative Thinker (Crocheting)', 'Impact-Oriented Vision', 'Embodies “Service Above Self”']
  },
  {
    name: 'Rtr. Prajjeeith',
    role: 'District Priority Projects Director',
    year: 'Vision Year 2025–26',
    image: 'https://res.cloudinary.com/drmwtmeg3/image/upload/v1755411707/team-member-prajjeeith_ckmlxz.jpg',
    bio: 'Serving as the District Priority Project Director. His journey is shaped by values of leadership, confidence, and pressure management, helping him grow as both an individual and a professional during project execution.',
    highlights: ['District Priority Projects Director', 'Strong Leadership & Team Support', 'Event Management & Project Execution', 'Team Collaboration & Coordination', 'Vision for Innovation & Sustainability']
  },
  {
    name: 'Rtr. Naren',
    role: 'International Service Director',
    year: 'Vision Year 2025–26',
    image: 'https://res.cloudinary.com/drmwtmeg3/image/upload/v1755411704/team-member-naren_ntcxpk.jpg',
    bio: 'A passionate individual who believes in teamwork and balance. With a keen interest in sports like cricket, he applies discipline, strategy, and collaboration to build cross-cultural connections and inclusivity.',
    highlights: ['International Service Director', 'Cricket Enthusiast – Discipline & Strategy', 'Calm & Focused Under Pressure', 'Cross-Cultural Connections & Inclusivity', 'Leadership & Family Values']
  },
  {
    name: 'Rtr. Miruthula Sri',
    role: 'International Service Chair',
    year: 'Vision Year 2025–26',
    image: 'https://res.cloudinary.com/drmwtmeg3/image/upload/v1755411664/mirthal_sri_hmns70.jpg',
    bio: 'A dynamic teenage leader bursting with energy. Passionate about traveling and exploring cultures, she committed to building global connections and empowering her peers through impactful international service.',
    highlights: ['International Service Chair', 'Young, Energetic & Passionate', 'Loves Traveling & Exploring Cultures', 'Natural Leadership Skills', 'Committed to Global Service & Fellowship']
  },
  {
    name: 'Rtr. Mirthula R',
    role: 'International Service Director',
    year: 'Vision Year 2025–26',
    image: 'https://res.cloudinary.com/drmwtmeg3/image/upload/v1755411704/team-member-mirthural_shkrm3.jpg',
    bio: 'As International Service Director, Mirthula considers herself a person who is constantly learning and evolving. She believes that life is about growth and embraces every opportunity to connect with people from diverse backgrounds.',
    highlights: ['International Service Advocate', 'Balances Learning & Practical Experience', 'Team-Oriented & Independent Worker', 'Creative Thinker & Problem Solver', 'Motivated & Positive Contributor']
  },
  {
    name: 'Rtr. Rithanya L',
    role: 'Director – Professional Services',
    year: 'Vision Year 2025–26',
    image: 'https://res.cloudinary.com/drmwtmeg3/image/upload/v1755413228/rithanaya_m5iwib.jpg',
    bio: 'Proudly serving as the Director – Professional Services. Rithanya strives to create a balance between academics and Rotaract, shaping herself into an individual who can bring purposeful change to society.',
    highlights: ['Director – Professional Services', 'Leadership, Service & Personal Growth', 'Creative Thinker (Crocheting)', 'Transforms Ideas into Action', 'Embodies “Service with Impact”']
  },
  {
    name: 'Rtr. Deepana S.',
    role: 'Chair of Professional Services',
    year: 'Vision Year 2025–26',
    image: 'https://res.cloudinary.com/drmwtmeg3/image/upload/v1755411662/deepana_wqphgt.jpg',
    bio: 'Driven to make a lasting impact, Deepana merges academic pursuits with community service. She views Rotaract as a catalyst for change, finding a home among passionate individuals united by "Service with Impact".',
    highlights: ['Chair of Professional Services', 'Leadership & Continuous Growth', 'Collaboration & Team Spirit', 'Service with Purpose & Impact', 'Personal Growth & Creativity']
  },
  {
    name: 'Rtr. Anuvarshini K.M',
    role: 'Director – Reporting and Grievance',
    year: 'Vision Year 2025–26',
    image: 'https://res.cloudinary.com/drmwtmeg3/image/upload/v1755411699/team-member-anuvarshini_dp3vxl.jpg',
    bio: 'As an enthusiastic and active individual, she believes in taking responsibility with dedication. Her role involves addressing grievances, ensuring transparency, and maintaining smooth communication between board and members.',
    highlights: ['Director – Reporting and Grievance', 'Transparency & Communication', 'Problem-Solver with Positive Mindset', 'Unity & Member Participation', 'Dedicated to Service & Growth']
  },
  {
    name: 'Rtr. Sivaharini K.',
    role: 'Chair – Grievances and Reporting',
    year: 'Vision Year 2025–26',
    image: 'https://res.cloudinary.com/drmwtmeg3/image/upload/v1755411666/sivaharini_ze7s9y.jpg',
    bio: 'An enthusiastic and responsible individual with a strong foundation in leadership and communication. Sivaharini aims to deliver quality results and maintain a positive club environment through conflict resolution and active listening.',
    highlights: ['Chair – Grievances and Reporting', 'Leadership, Communication & Teamwork', 'Event Host & Public Speaker', 'Organizer of MAVERICKS\'25', 'Conflict Resolution & Transparency']
  },
  {
    name: 'Rtr. Srinithi',
    role: 'Club Service Chair',
    year: 'Vision Year 2025–26',
    image: 'https://res.cloudinary.com/drmwtmeg3/image/upload/v1755411666/Srinith_zb8k5t.jpg',
    bio: 'Brings an enthusiastic and cheerful approach backed by strong leadership and communication skills. Srinithi focuses on building strong networks and fostering peer collaboration through engaging club activities.',
    highlights: ['Club Service Chair', 'Leadership & Team Collaboration', 'Event Host – Farewell ’24 & Charter’s Day ’25', 'Organizer of Club Service Events', 'Department President Experience']
  },
  {
    name: 'Rtr. Dharaneesh',
    role: 'Treasurer',
    year: 'Vision Year 2025–26',
    image: 'https://res.cloudinary.com/drmwtmeg3/image/upload/v1755413218/Dharanessh_fowipx.jpg',
    bio: 'Serving as a Board Member for two years was a transformative journey. Now as Treasurer, he applies his experience in planning and executing service-oriented activities to provide financial oversight for the club.',
    highlights: ['Treasurer – Financial Oversight', 'Organizer of Events & Campaigns', 'Collaboration & Partnerships', 'Leadership & Decision-Making', 'Service Above Self']
  },
  {
    name: 'Rtr. Brindha P',
    role: 'Director – Professional Services',
    year: 'Vision Year 2025–26',
    image: 'https://res.cloudinary.com/drmwtmeg3/image/upload/v1755413216/Brinda_uk2jgf.jpg',
    bio: 'Proudly serving as the Director – Professional Services. Brindha strives to balance academics with Rotaract responsibilities, shaping herself into an individual capable of bringing purposeful change to society.',
    highlights: ['Director – Professional Services', 'Balancing Academics & Service', 'Service Beyond Self', 'Creative Hobby – Crocheting', 'Leadership, Growth & Inspiration']
  },
  {
    name: 'Rtr. Pavithra KS',
    role: 'Chair – Interact–Rotaract Relationship',
    year: 'Vision Year 2025–26',
    image: 'https://res.cloudinary.com/drmwtmeg3/image/upload/v1755413219/Pavithra_utrapb.jpg',
    bio: 'Proudly serving as the Chair – Interact–Rotaract Relationship. Pavithra strives to create purposeful change by bridging the gap between Interact and Rotaract, fostering mentorship and collaboration across both clubs.',
    highlights: ['Chair – Interact–Rotaract Relationship', 'Balancing Academics & Service', 'Transforming Ideas into Action', 'Creative Hobby – Crocheting', 'Leadership, Growth & Inspiration']
  },
  {
    name: 'Rtr. Praveen',
    role: 'Club Service Director',
    year: 'Vision Year 2025–26',
    image: 'https://res.cloudinary.com/drmwtmeg3/image/upload/v1755411664/praveen_l0psb8.jpg',
    bio: 'A passionate and dedicated individual who believes in hard work, teamwork and balance. With a strong interest in sports, especially cricket and football, he embraces discipline and promotes fellowship among members.',
    highlights: ['Club Service Director', 'Sports Enthusiast – Cricket & Football', 'Calm & Focused Under Pressure', 'Promotes Fellowship & Bonding', 'Vision – Lead with Dignity & Determination']
  },
  {
    name: 'Rtr. Sanjay D',
    role: 'All Avenue Chair',
    year: 'Vision Year 2025–26',
    image: 'https://res.cloudinary.com/drmwtmeg3/image/upload/v1755411667/Sanjay_f8kema.jpg',
    bio: 'Proudly serving as the All Avenue Chair, carrying the responsibility of harmonizing every avenue of service into one united vision for the club. He promotes collaboration and encourages innovation.',
    highlights: ['All Avenue Chair', 'Harmonizes All Avenues of Service', 'Promotes Collaboration & Inclusiveness', 'Encourages Innovation & Creativity', 'Embodies “Service Above Self”']
  },
  {
    name: 'Rtr. Rashvandh A',
    role: 'Web Chair',
    year: 'Vision Year 2025–26',
    image: 'https://res.cloudinary.com/drmwtmeg3/image/upload/v1755411665/rashvandh_vkgvm4.jpg',
    bio: 'As a first-year Rotaractor, Rashvandh is determined to use his passion for technology and creativity to strengthen the club’s digital identity and connect members through online platforms.',
    highlights: ['Web Chair – First Year', 'Fresh Perspective & Eager to Learn', 'Passionate About Technology & Digital Growth', 'Connects Members Through Online Platforms', 'Vision – Strengthen Club’s Digital Identity']
  },
  {
    name: 'Rtr. Dharsan Sastikesh S.P',
    role: 'Public Relations Chair',
    year: 'Vision Year 2025–26',
    image: 'https://res.cloudinary.com/drmwtmeg3/image/upload/v1755411662/Darshan_jnxkak.jpg',
    bio: 'As the Public Relations (PR) Chair, his focus is on Promoting Club Image (PCI) through effective communication, social media presence, and creative outreach to enhance visibility.',
    highlights: ['Promotes Club Image (PCI)', 'Manages Social Media (SMM)', 'Creative Event Promotion (EP)', 'Documentation & Reporting (DR)', 'Maintains Photo & Video Archive (PVA)']
  },
  {
    name: 'Rtr. Angala Pariwar',
    role: 'DIRECTOR-PARTNER AND SERVICES',
    year: 'Vision Year 2025–26',
    image: 'https://res.cloudinary.com/drmwtmeg3/image/upload/v1755411663/angala_pariwar_vauawb.jpg',
    bio: 'Dedicated to fostering strong partnerships and coordinating essential services for the club.',
    highlights: ['Partnership Building', 'Service Coordination']
  },
  {
    name: 'Rtr. Hari Priya G',
    role: 'LEARNING FACILITATOR - CHAIR',
    year: 'Vision Year 2025–26',
    image: 'https://res.cloudinary.com/drmwtmeg3/image/upload/v1755411665/Hari_PriyaG_f7xxu4.jpg',
    bio: 'Passionate about educational growth and facilitating learning workshops for our members.',
    highlights: ['Workshop Facilitation', 'Educational Leadership']
  },
  {
    name: 'Rtr. Jairam',
    role: 'MEMBERSHIP CHAIR',
    year: 'Vision Year 2025–26',
    image: 'https://res.cloudinary.com/drmwtmeg3/image/upload/v1755411664/Jairam_wiwxrr.jpg',
    bio: 'Focused on growing our Rotaract family and welcoming new members into our vibrant community.',
    highlights: ['Recruitment Lead', 'Member Onboarding']
  },
  {
    name: 'Rtr. Lohit',
    role: 'PHOTOGRAPHY CHAIR',
    year: 'Vision Year 2025–26',
    image: 'https://res.cloudinary.com/drmwtmeg3/image/upload/v1755411664/lohit_nnfyiq.jpg',
    bio: 'Capturing the most precious memories of our club’s journey through a professional lens.',
    highlights: ['Visual Storyteller', 'Event Coverage']
  },
  {
    name: 'Rtr. Niswetha',
    role: 'CHAIR SOCIAL MEDIA',
    year: 'Vision Year 2025–26',
    image: 'https://res.cloudinary.com/drmwtmeg3/image/upload/v1755411664/niswetha_yvg0d0.jpg',
    bio: 'Managing our digital footprint and engaging with the community through innovative social media strategies.',
    highlights: ['Content Strategy', 'Community Engagement']
  },
  {
    name: 'Rtr. Vallamai',
    role: 'HOSPITALITY',
    year: 'Vision Year 2025–26',
    image: 'https://res.cloudinary.com/drmwtmeg3/image/upload/v1755411667/vallamai_leog4m.jpg',
    bio: 'Ensuring every visitor and member feels welcomed and cared for with the highest standards of hospitality.',
    highlights: ['Guest Relations', 'Event Hosting']
  },
  {
    name: 'Rtr. Vishnu Prasad',
    role: 'MEMBERSHIP DIRECTOR',
    year: 'Vision Year 2025–26',
    image: 'https://res.cloudinary.com/drmwtmeg3/image/upload/v1755411662/vishnu_prasad_x8dh8n.jpg',
    bio: 'Driving growth strategies and ensuring a fulfilling experience for all club members.',
    highlights: ['Growth Strategy', 'Retention Specialist']
  }
];

/* ─── COMPONENTS ────────────────────────────────────────────── */

const PatronCard = ({ patron }: { patron: typeof patrons[0] }) => (
  <div className="team-patron-card">
    <div className="team-patron-img-wrap">
      <img src={patron.image} alt={patron.name} />
      <div className="team-patron-ring" />
    </div>
    <div className="team-patron-badge">{patron.role}</div>
    <h3 className="team-patron-name">{patron.name}</h3>
    <p className="team-patron-sub">{patron.badge}</p>
    <p className="team-patron-quote">"{patron.quote}"</p>
  </div>
);

const LeaderCard = ({ member, index }: { member: typeof leadership[0]; index: number }) => {
  const [flipped, setFlipped] = useState(false);
  return (
    <div
      className={`team-leader-card${flipped ? ' flipped' : ''}`}
      onClick={() => setFlipped(f => !f)}
    >
      {/* FRONT */}
      <div className="team-leader-front">
        <div className="team-leader-img-wrap">
          <img src={member.image} alt={member.name} />
          <div className="team-leader-gradient" />
        </div>
        <div className="team-leader-info">
          <span className="team-leader-role">{member.role}</span>
          <h3 className="team-leader-name">{member.name}</h3>
          <span className="team-leader-year">{member.year}</span>
        </div>
      </div>
      {/* BACK */}
      <div className="team-leader-back">
        <div className="team-leader-back-ring" />
        <span className="team-leader-role" style={{ color: '#f5c6c6' }}>{member.role}</span>
        <h3 className="team-leader-name" style={{ color: '#fff', marginBottom: '0.6rem' }}>{member.name}</h3>

        <div className="team-leader-bio-scroll">
          <p className="team-leader-bio">{member.bio}</p>
          <div className="team-leader-back-chips">
            {member.highlights.map((h, i) => (
              <span key={i} className="team-chip-light">★ {h}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};


/* ─── PAGE ──────────────────────────────────────────────────── */

const Team = () => (
  <div className="min-h-screen bg-white">

    {/* ── HERO ── */}
    <section className="team-hero">
      <div className="team-hero-bg" />
      <div className="team-hero-content">
        <p className="team-hero-eyebrow">Rotaract Club of KPRCAS</p>
        <h1 className="team-hero-title">
          The People Behind<br />
          <span className="team-hero-accent">Every Impact</span>
        </h1>
        <p className="team-hero-sub">
          Dedicated leaders and passionate members working together to create<br />
          meaningful change — one service at a time.
        </p>
        <div className="team-hero-stats">
          {[['100+', 'Active Members'], ['40+', 'Events Yearly'], ['3', 'Awards'], ['4', 'Avenues']].map(([n, l]) => (
            <div key={l} className="team-hero-stat">
              <span className="team-hero-stat-num">{n}</span>
              <span className="team-hero-stat-label">{l}</span>
            </div>
          ))}
        </div>
      </div>
      {/* decorative circles */}
      <div className="team-hero-blob team-hero-blob-1" />
      <div className="team-hero-blob team-hero-blob-2" />
    </section>

    {/* ── PATRONS ── */}
    <section className="team-section bg-white">
      <div className="team-section-head">
        <span className="team-section-eyebrow">Our Pillars</span>
        <h2 className="team-section-title">Patrons & <span className="text-primary">Coordinators</span></h2>
        <p className="team-section-sub">The visionary leaders who empower and guide our every initiative.</p>
      </div>
      <div className="team-patron-grid">
        {patrons.map((p, i) => <PatronCard key={i} patron={p} />)}
      </div>
    </section>

    {/* ── DIVIDER ── */}
    <div className="team-divider">
      <div className="team-divider-line" />
      <span className="team-divider-label">✦ Vision Year 2025–26 ✦</span>
      <div className="team-divider-line" />
    </div>

    {/* ── LEADERSHIP ── */}
    <section className="team-section" style={{ background: '#fafafa' }}>
      <div className="team-section-head">
        <span className="team-section-eyebrow">Board of Directors</span>
        <h2 className="team-section-title">Our <span className="text-primary">Leadership</span></h2>
        <p className="team-section-sub">Click any card to reveal their journey and achievements.</p>
      </div>
      <div className="team-leader-grid">
        {leadership.map((m, i) => <LeaderCard key={i} member={m} index={i} />)}
      </div>
    </section>

    {/* ── BOARD ── */}
    <section className="team-section bg-white">
      <div className="team-section-head">
        <span className="team-section-eyebrow">The Core Team</span>
        <h2 className="team-section-title">Committee <span className="text-primary">Members</span></h2>
        <p className="team-section-sub">The dedicated chairs and directors powering every service avenue.</p>
      </div>
      <div className="team-leader-grid">
        {boardMembers.map((m, i) => (
          <LeaderCard key={i} member={m} index={leadership.length + i} />
        ))}
      </div>
    </section>

    {/* ── STYLES ── */}
    <style>{`
      /* ─── HERO ─── */
      .team-hero {
        position: relative;
        min-height: 55vh;
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
        background: linear-gradient(135deg, #1a0000 0%, #4a0000 45%, #2d0000 100%);
        padding: 4rem 1.5rem 2rem;
      }
      .team-hero-bg {
        position: absolute; inset: 0;
        background: linear-gradient(to bottom, rgba(30,0,0,0.85), rgba(45,10,10,0.75)), url('https://res.cloudinary.com/drmwtmeg3/image/upload/v1755412154/team-photo_lefoty.jpg');
        background-size: cover;
        background-position: center;
        pointer-events: none;
      }
      .team-hero-blob {
        position: absolute; border-radius: 50%; pointer-events: none; filter: blur(70px);
      }
      .team-hero-blob-1 { width: 300px; height: 300px; top: -60px; left: -80px; background: rgba(128,0,0,0.2); }
      .team-hero-blob-2 { width: 240px; height: 240px; bottom: -40px; right: -60px; background: rgba(200,50,50,0.12); }
      .team-hero-content {
        position: relative; z-index: 2; text-align: center; max-width: 800px;
        transform: translateY(-10px);
      }
      .team-hero-eyebrow {
        display: block; font-size: 0.65rem; font-weight: 700; letter-spacing: 0.3em;
        text-transform: uppercase; color: rgba(255,255,255,0.45); margin-bottom: 1rem;
      }
      .team-hero-title {
        font-size: clamp(2.2rem, 6vw, 4rem); font-weight: 900; color: #fff;
        line-height: 1.1; margin-bottom: 1rem; letter-spacing: -0.02em;
      }
      .team-hero-accent {
        background: linear-gradient(90deg, #f5c6c6, #ffdddd, #ffffff);
        -webkit-background-clip: text; -webkit-text-fill-color: transparent;
      }
      .team-hero-sub {
        font-size: 0.95rem; color: rgba(255,255,255,0.55); line-height: 1.6;
        margin-bottom: 2rem; max-width: 600px; margin-inline: auto;
      }
      .team-hero-stats {
        display: flex; justify-content: center; gap: 2rem; flex-wrap: wrap;
      }
      .team-hero-stat { text-align: center; background: rgba(255,255,255,0.03); padding: 0.5rem 1rem; border-radius: 12px; border: 1px solid rgba(255,255,255,0.05); }
      .team-hero-stat-num {
        display: block; font-size: 1.5rem; font-weight: 800; color: #fca5a5; line-height: 1;
      }
      .team-hero-stat-label {
        font-size: 0.65rem; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase;
        color: rgba(255,255,255,0.4); margin-top: 4px; display: block;
      }

      /* ─── SECTION WRAPPER ─── */
      .team-section { padding: 3.5rem 1.5rem; }
      .team-section-head { text-align: center; max-width: 600px; margin: 0 auto 2.5rem; }
      .team-section-eyebrow {
        display: inline-block; font-size: 0.6rem; font-weight: 700;
        letter-spacing: 0.25em; text-transform: uppercase;
        color: #800000; margin-bottom: 0.5rem;
        padding: 0.25rem 0.7rem; border: 1px solid rgba(128,0,0,0.2);
        border-radius: 100px; background: rgba(128,0,0,0.05);
      }
      .team-section-title {
        font-size: clamp(1.6rem, 3.5vw, 2.3rem); font-weight: 800; color: #111;
        margin-bottom: 0.5rem; line-height: 1.2;
      }
      .team-section-sub { font-size: 0.9rem; color: #6b7280; line-height: 1.6; }

      /* ─── DIVIDER ─── */
      .team-divider {
        display: flex; align-items: center; gap: 1.5rem;
        padding: 1rem 2rem; margin: 0; background: #f5f5f5;
      }
      .team-divider-line { flex: 1; height: 1px; background: linear-gradient(90deg, transparent, #d1d5db, transparent); }
      .team-divider-label {
        font-size: 0.65rem; font-weight: 700; letter-spacing: 0.2em;
        text-transform: uppercase; color: #800000; white-space: nowrap;
      }

      /* ─── PATRONS ─── */
      .team-patron-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
        gap: 2rem; max-width: 1100px; margin: 0 auto;
      }
      .team-patron-card {
        background: #fff; border-radius: 24px; padding: 2.5rem 2rem;
        text-align: center; box-shadow: 0 4px 24px rgba(0,0,0,0.06);
        border: 1px solid rgba(0,0,0,0.06);
        transition: transform 0.3s ease, box-shadow 0.3s ease;
      }
      .team-patron-card:hover { transform: translateY(-6px); box-shadow: 0 16px 48px rgba(128,0,0,0.12); }
      .team-patron-img-wrap {
        position: relative; width: 120px; height: 120px; margin: 0 auto 1.2rem;
      }
      .team-patron-img-wrap img {
        width: 100%; height: 100%; border-radius: 50%; object-fit: cover;
        position: relative; z-index: 1;
      }
      .team-patron-ring {
        position: absolute; inset: -4px; border-radius: 50%;
        border: 2px solid #800000; opacity: 0.4;
        animation: patron-ring-pulse 3s ease-in-out infinite;
      }
      @keyframes patron-ring-pulse {
        0%, 100% { transform: scale(1); opacity: 0.4; }
        50% { transform: scale(1.06); opacity: 0.15; }
      }
      .team-patron-badge {
        display: inline-block; font-size: 0.62rem; font-weight: 700;
        letter-spacing: 0.18em; text-transform: uppercase;
        background: linear-gradient(135deg, #800000, #b30000);
        color: #fff; border-radius: 100px; padding: 0.25rem 0.75rem; margin-bottom: 0.6rem;
      }
      .team-patron-name { font-size: 1.15rem; font-weight: 800; color: #111; margin-bottom: 0.2rem; }
      .team-patron-sub { font-size: 0.75rem; color: #6b7280; margin-bottom: 0.8rem; }
      .team-patron-quote {
        font-size: 0.82rem; color: #374151; line-height: 1.65;
        font-style: italic; border-top: 1px solid #f0f0f0; padding-top: 0.8rem; margin-top: 0.4rem;
      }

      /* ─── LEADER CARDS (flip) ─── */
      .team-leader-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
        gap: 1.25rem; max-width: 1200px; margin: 0 auto;
      }
      .team-leader-card {
        position: relative; height: 410px; cursor: pointer;
        perspective: 1000px;
        transform-style: preserve-3d;
        border-radius: 20px;
      }
      .team-leader-front, .team-leader-back {
        position: absolute; inset: 0; border-radius: 20px; overflow: hidden;
        backface-visibility: hidden; -webkit-backface-visibility: hidden;
        transition: transform 0.65s cubic-bezier(0.4, 0.2, 0.2, 1);
      }
      .team-leader-front { transform: rotateY(0deg); }
      .team-leader-back  { transform: rotateY(180deg); background: linear-gradient(135deg, #2d0000, #800000); padding: 2.5rem 2rem; display: flex; flex-direction: column; justify-content: center; }
      .team-leader-card.flipped .team-leader-front { transform: rotateY(-180deg); }
      .team-leader-card.flipped .team-leader-back  { transform: rotateY(0deg); }

      .team-leader-img-wrap { position: absolute; inset: 0; }
      .team-leader-img-wrap img { width: 100%; height: 100%; object-fit: cover; }
      .team-leader-gradient {
        position: absolute; inset: 0;
        background: linear-gradient(to top, rgba(15,0,0,0.95) 0%, rgba(10,0,0,0.4) 25%, transparent 50%);
      }
      .team-leader-info {
        position: absolute; bottom: 0; left: 0; right: 0; padding: 1.25rem 1.25rem;
      }
      .team-leader-role {
        font-size: 0.62rem; font-weight: 700; letter-spacing: 0.22em;
        text-transform: uppercase; color: #fca5a5; display: block; margin-bottom: 0.3rem;
      }
      .team-leader-name {
        font-size: 1.05rem; font-weight: 800; color: #fff; margin-bottom: 0.3rem; line-height: 1.3;
      }
      .team-leader-year {
        font-size: 0.67rem; color: rgba(255,255,255,0.45); display: block; margin-bottom: 0.75rem;
      }
      .team-leader-chips { display: flex; flex-wrap: wrap; gap: 0.35rem; margin-bottom: 0.6rem; }
      .team-chip {
        font-size: 0.6rem; font-weight: 600; padding: 0.2rem 0.5rem; border-radius: 100px;
        background: rgba(255,255,255,0.12); color: rgba(255,255,255,0.75);
        border: 1px solid rgba(255,255,255,0.15);
      }
      .team-leader-tap { font-size: 0.65rem; color: rgba(255,255,255,0.35); margin: 0; }

      /* BACK */
      .team-leader-back-ring {
        position: absolute; top: -40px; right: -40px; width: 150px; height: 150px;
        border-radius: 50%; border: 1px solid rgba(255,255,255,0.08); pointer-events: none;
      }
      .team-leader-bio {
        font-size: 0.85rem; color: rgba(255,255,255,0.8); line-height: 1.6;
        margin-bottom: 1rem;
      }
      .team-leader-bio-scroll {
        flex: 1; overflow-y: auto; padding-right: 0.5rem;
        mask-image: linear-gradient(to bottom, black 85%, transparent 100%);
      }
      /* scrollbar */
      .team-leader-bio-scroll::-webkit-scrollbar { width: 3px; }
      .team-leader-bio-scroll::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.15); border-radius: 10px; }

      .team-leader-back-chips { display: flex; flex-direction: column; gap: 0.35rem; margin-bottom: 1rem; }
      .team-chip-light {
        font-size: 0.68rem; font-weight: 600; color: #fca5a5; letter-spacing: 0.02em;
      }
    `}</style>

    <footer
      style={{
        padding: '3rem 2rem',
        borderTop: '1px solid rgba(255,255,255,0.05)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '0.75rem',
        background: '#0a0000'
      }}
    >
      <div style={{ fontSize: '0.7rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)' }}>
        © 2025 · All Rights Reserved
      </div>
      <div style={{ fontFamily: "'Unbounded', sans-serif", fontSize: '0.85rem', fontWeight: 900, letterSpacing: '-0.02em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.15)' }}>
        Rotaract Club of KPRCAS
      </div>
    </footer>
  </div>
);

export default Team;