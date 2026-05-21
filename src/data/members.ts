export interface MemberHighlight {
  emoji: string;
  text: string;
}

export interface MemberType {
  id: number;
  name: string;
  image: string;
  badges: string[];
  category: 'patron' | 'core' | 'director' | 'chair' | 'member';
  paragraphs: string[];
  achievements: string[];
  keyHighlights: MemberHighlight[];
}

export const membersData: MemberType[] = [
  {
    "id": 1,
    "name": "Dr. K.P. Ramasamy",
    "image": "https://res.cloudinary.com/drmwtmeg3/image/upload/v1755411671/Chairman_sir_mcs6ns.avif",
    "badges": [
      "Chairman",
      "KPR Group of Institutions"
    ],
    "category": "patron",
    "paragraphs": [
      "Guiding the institution with visionary leadership and unwavering commitment to excellence in education."
    ],
    "achievements": [],
    "keyHighlights": []
  },
  {
    "id": 2,
    "name": "Dr. Geetha .P",
    "image": "https://res.cloudinary.com/drmwtmeg3/image/upload/v1755411672/principal_mam_gzmnvm.jpg",
    "badges": [
      "Principal",
      "KPRCAS"
    ],
    "category": "patron",
    "paragraphs": [
      "Leading the institution with vision and dedication, our Principal provides invaluable support to all student initiatives."
    ],
    "achievements": [],
    "keyHighlights": []
  },
  {
    "id": 3,
    "name": "Dr. Vinayak SP",
    "image": "https://res.cloudinary.com/drmwtmeg3/image/upload/v1755411699/staff_coordinator_u61x5h.jpg",
    "badges": [
      "Head Staff Coordinator",
      "Faculty Advisor"
    ],
    "category": "patron",
    "paragraphs": [
      "As the Staff Coordinator, it has been an honor to support and guide our Rotaract Club through the Roar year 2024-25. I have always believed in the incredible potential of student leadership, and it has been truly inspiring to witness the enthusiasm, creativity, and commitment of our members.",
      "My role has been to provide steady support, help navigate administrative processes, and encourage bold ideas that can make a meaningful impact. Seeing the club's revival and growth has been one of the most rewarding experiences in my career.",
      "I am proud of how the team has taken ownership and demonstrated resilience in the face of challenges. Together, we have created a culture of trust and collaboration that will continue to strengthen the club's future. I look forward to continuing this journey and supporting our members as they lead with passion and purpose.",
      "Committed to continuing the journey of supporting passionate student leaders who drive meaningful change in our community through service, innovation, and collaborative leadership."
    ],
    "achievements": [
      "Guided the club through the transformative Roar year 2024-25",
      "Provided steady administrative support and mentorship",
      "Encouraged innovative ideas and bold initiatives",
      "Fostered a culture of trust and collaboration",
      "Supported student leadership development"
    ],
    "keyHighlights": []
  },
  {
    "id": 4,
    "name": "Rtr. Sanjith Kumar Sri Krishnan",
    "image": "https://res.cloudinary.com/drmwtmeg3/image/upload/v1755411667/sanjith_yfeoyr.jpg",
    "badges": [
      "President",
      "Since 2024"
    ],
    "category": "core",
    "paragraphs": [
      "A dedicated and dynamic member of Rotary since 2021, Rtr. Sanjith Kumar Sri Krishnan has made a significant impact through his leadership and passion for service.",
      "Poised to lead the club in the new district with a clear vision and framework, set to unleash the legacy in 2025-2026."
    ],
    "achievements": [
      "Sergeant-at-Arms, Interact Club of National Model (2021-2022)",
      "Advisor and Deputy Secretary, Interact Club of National Model (2022-2023)",
      "Recipient of the Best Interactor Award",
      "Conducted over 40 dynamic events during school days, positively impacting society",
      "Supported the club as All Avenue Chair, setting and planning events as a Rotaractor (2024-2025)",
      "Secretary Administration (2024-2025): Led administrative aspects, framed bylaws, and structured club functions",
      "Led a team of 100 members",
      "Best Secretary (2024-2025): Achieved outstanding membership growth and mentored the club for wholesome success",
      "Transformed the club from active to hyper-active, earning a Rolling Trophy with 10+ recognitions",
      "Built a strong foundation for legacy and attracted potential Rotaractors"
    ],
    "keyHighlights": [
      {
        "emoji": "🏆",
        "text": "Best Secretary 2024-2025"
      },
      {
        "emoji": "⭐",
        "text": "Best Interactor Award"
      },
      {
        "emoji": "🎯",
        "text": "Rolling Trophy with 10+ Recognition"
      },
      {
        "emoji": "👥",
        "text": "Led Team of 100 Members"
      },
      {
        "emoji": "🚀",
        "text": "40+ Impactful Events Conducted"
      }
    ]
  },
  {
    "id": 5,
    "name": "Rtr. Haripriya",
    "image": "https://res.cloudinary.com/drmwtmeg3/image/upload/v1755411703/team-member-haripriya_gj96fq.jpg",
    "badges": [
      "Secretary Administration",
      "Vision Year"
    ],
    "category": "core",
    "paragraphs": [
      "A Visionary Leader, A Creative Soul. Rtr. Haripriya has been a defining presence in the Roar Year of the Rotaract Club of KPRCAS, embodying quiet strength and impactful leadership.",
      "As Vice President, she played a crucial role in club operations—coordinating with the board, tracking events, resolving concerns, and maintaining seamless communication. Her calm, detail-oriented approach made her a strong support system to the President and a dependable force within the team.",
      "Actively represented at district-level events such as Tanzanite, XVII District Conference, Rotabuzz, Rotamind, the Incoming IDYE, and the District Awards. Her consistent presence reflects her dedication to Rotaract's larger purpose and enthusiasm to grow through collaboration.",
      "Continuing her commitment to service as Secretary - Administration for the Vision Year. With her proven leadership, creative capabilities, and unwavering dedication, she is all set to contribute with renewed purpose, adding value to every initiative she touches and leading with both heart and vision."
    ],
    "achievements": [
      "Event Chairperson of \"Blooming Blossom\" - Major District Priority Project",
      "Impacted over 100 beneficiaries across Coimbatore and Tiruppur",
      "Earned esteemed Roar Recognition from the District",
      "Editor of the Roar Year Scrapbook - Creative documentation"
    ],
    "keyHighlights": [
      {
        "emoji": "🏆",
        "text": "Roar Recognition from District"
      },
      {
        "emoji": "🌸",
        "text": "Blooming Blossom Project Lead"
      },
      {
        "emoji": "📖",
        "text": "Roar Year Scrapbook Editor"
      },
      {
        "emoji": "👥",
        "text": "100+ Beneficiaries Impacted"
      },
      {
        "emoji": "🎯",
        "text": "District Events Representative"
      }
    ]
  },
  {
    "id": 6,
    "name": "Rtr. Mounesh",
    "image": "https://res.cloudinary.com/drmwtmeg3/image/upload/v1755411701/mounish_kblucw.jpg",
    "badges": [
      "Secretary – Communication",
      "Former Treasurer"
    ],
    "category": "core",
    "paragraphs": [
      "Rtr. Mounesh began his Rotaract journey as Treasurer of the Rotaract Club of KPRCAS, where his keen knowledge in managing finances ensured transparency and efficiency in the club’s operations. His dedication and skill in handling responsibilities set the tone for his journey as a dependable leader.",
      "Beyond his role as Treasurer, Mounesh showcased his activeness by enthusiastically participating in numerous district-level events, reflecting his commitment to learning, collaboration, and fellowship.",
      "A defining milestone during his tenure was when the club proudly hosted its first-ever IDYE. Behind the success of this grand initiative stood Mounesh, who served as one of the strongest pillars of the event—providing both operational support and unwavering morale strength to the team.",
      "Throughout his journey, he has been a constant source of encouragement and stability, ensuring the smooth functioning of the club and standing by his fellow Rotaractors with quiet resilience. His dedication, humility, and reliability have made him a trusted presence within the club.",
      "Recognizing his contributions and commitment, Rtr. Mounesh now serves as the Secretary – Communication for the Vision Year. With his experience, steadfast nature, and passion for service, he continues to strengthen the spirit of teamwork, ensure effective communication, and add immense value to the club’s endeavors."
    ],
    "achievements": [],
    "keyHighlights": [
      {
        "emoji": "💰",
        "text": "Financial Transparency as Treasurer"
      },
      {
        "emoji": "🌍",
        "text": "Active Participation in District Events"
      },
      {
        "emoji": "🏛️",
        "text": "Pillar of Support in IDYE"
      },
      {
        "emoji": "🛡️",
        "text": "Reliable & Resilient Leader"
      },
      {
        "emoji": "📢",
        "text": "Secretary – Communication (Vision Year)"
      }
    ]
  },
  {
    "id": 7,
    "name": "Rtr.Saran G",
    "image": "https://res.cloudinary.com/drmwtmeg3/image/upload/v1755412967/team-member-saran_rhfrcq.jpg",
    "badges": [
      "Vice President",
      "Since 2022"
    ],
    "category": "core",
    "paragraphs": [
      "Rtr.Saran G is serving the Rotaract Club of KPRCAS since 2022. This is his 4th year of Rotaraction. He served in the Club as Community Service Chair, The Rotary Foundation Chair, District Priority Projects Chair in the past three years.",
      "Currently, he serves as Vice President with 100% commitment. As the DPP Chair he organized events under the Theme BLOOMING in an admirable way and won the Outstanding DPP Performance Award from the District and the our event BLOOMING BLOSSOM 🌸 was also named as the BEST PROJECT for the Year.",
      "He had also received Radiant Circle of Academic Excellence Award from the District for his exemplary Performance in Rotaract as well as Academics."
    ],
    "achievements": [],
    "keyHighlights": [
      {
        "emoji": "🏆",
        "text": "Outstanding DPP Performance Award"
      },
      {
        "emoji": "🌸",
        "text": "BEST PROJECT - BLOOMING BLOSSOM"
      },
      {
        "emoji": "⭐",
        "text": "Radiant Circle of Academic Excellence Award"
      },
      {
        "emoji": "🏆",
        "text": "Outstanding DPP Performance Award"
      },
      {
        "emoji": "🌸",
        "text": "BEST PROJECT - BLOOMING BLOSSOM"
      },
      {
        "emoji": "⭐",
        "text": "Radiant Circle of Academic Excellence Award"
      }
    ]
  },
  {
    "id": 8,
    "name": "Rtr. Pratheesh",
    "image": "https://res.cloudinary.com/drmwtmeg3/image/upload/v1755413221/prateesh_xfstxd.jpg",
    "badges": [
      "Special Aid to the President"
    ],
    "category": "core",
    "paragraphs": [
      "We are thrilled to welcome <span className=\"font-semibold\">Rtr. Pratheesh</span> to our leadership team in his new role as <span className=\"font-semibold\"> Special Aid to the President</span>. In this vital position, he will serve as a key advisor and collaborator, working directly with the President to ensure the seamless execution of our club's goals.",
      "His journey in Rotaract has been defined by his dedication and proactive spirit. He brings a fresh perspective and a strategic mind, which will be instrumental in supporting the various avenues of service and driving our projects forward.",
      "His responsibilities will include coordinating with different committees, providing support for major initiatives, and helping to maintain the high standards of our club’s work.",
      "Beyond his official duties, he is known for his ability to inspire teamwork and foster a positive, collaborative environment among members.",
      "His commitment to the Rotaract motto <span className=\"italic\"> “Service Above Self”</span> is evident in everything he does. We are confident that his leadership and passion will be a tremendous asset to our club as we strive to make a lasting impact."
    ],
    "achievements": [],
    "keyHighlights": []
  },
  {
    "id": 9,
    "name": "Rtr. Netra",
    "image": "https://res.cloudinary.com/drmwtmeg3/image/upload/v1755411704/team-member-netra_obbhqr.jpg",
    "badges": [
      "Joint Secretary",
      "3rd Year"
    ],
    "category": "core",
    "paragraphs": [
      "Netra, the Joint Secretary of the Rotaract Club of KPRCAS, has been a dynamic and committed member of the club, showcasing exceptional leadership and a deep passion for community service.",
      "Throughout her journey, she has actively contributed to the growth and visibility of the club by taking part in impactful initiatives and fostering youth engagement. Her consistent dedication and ability to work collaboratively have made her a respected and inspiring figure within the Rotaract community.",
      "One of Netra's most remarkable achievements is her contribution to a world record in Bharathanatyam, performed with 1,200 students through the Rotaract Club. This extraordinary feat stands as a symbol of cultural pride, discipline, and unity, and reflects her dedication to preserving and promoting India's classical art forms.",
      "Her efforts played a key role in coordinating and bringing together a large group of performers, making the event a memorable moment in both club and cultural history.",
      "Now in her third year with the Rotaract Club, Netra continues to grow as a leader and changemaker. Her journey reflects a perfect balance of passion, cultural commitment, and organizational skills."
    ],
    "achievements": [],
    "keyHighlights": [
      {
        "emoji": "🏆",
        "text": "World Record - Bharathanatyam"
      },
      {
        "emoji": "🎭",
        "text": "1,200 Students Coordinated"
      },
      {
        "emoji": "⭐",
        "text": "Cultural Preservation Champion"
      },
      {
        "emoji": "👥",
        "text": "Youth Engagement Leader"
      },
      {
        "emoji": "🚀",
        "text": "3rd Year Dedicated Member"
      }
    ]
  },
  {
    "id": 10,
    "name": "Rtr. Sanjay Harish",
    "image": "https://res.cloudinary.com/drmwtmeg3/image/upload/v1755411708/team-member-sanjay_lpxwng.jpg",
    "badges": [
      "Past President",
      "Mentor"
    ],
    "category": "core",
    "paragraphs": [
      "Rtr. Sanjay Harish, Past President of the Rotaract Club of KPRCAS, is known for his exceptional leadership, vision, and unwavering dedication to the ideals of Rotaract.",
      "During his tenure, he played a pivotal role in elevating the club's presence through innovative projects, impactful community service, and strong team-building initiatives. Under his guidance, the club reached new milestones and gained recognition for its vibrant activities and strong member engagement.",
      "Sanjay's presidency was marked by a focus on inclusivity, professionalism, and service excellence. He encouraged members to step out of their comfort zones and take up responsibilities that would develop both personal and professional skills.",
      "His approachable nature and commitment to teamwork created a motivating environment for everyone involved. He also encouraged members to take up responsibilities that would develop both personal and professional skills.",
      "Even after completing his term, Sanjay Harish continues to be an active mentor and guiding force within the club. His journey stands as an inspiration for future leaders, reflecting the spirit of service above self and the lasting impact of strong Rotaract leadership."
    ],
    "achievements": [],
    "keyHighlights": [
      {
        "emoji": "🏆",
        "text": "Exceptional Leadership"
      },
      {
        "emoji": "🎯",
        "text": "Innovative Projects"
      },
      {
        "emoji": "⭐",
        "text": "Service Excellence"
      },
      {
        "emoji": "👥",
        "text": "Team Building Expert"
      },
      {
        "emoji": "🚀",
        "text": "Active Mentor"
      }
    ]
  },
  {
    "id": 11,
    "name": "Rtr. Midun",
    "image": "https://res.cloudinary.com/drmwtmeg3/image/upload/v1755411704/team-member-midun_gxbwsp.jpg",
    "badges": [
      "Treasurer"
    ],
    "category": "core",
    "paragraphs": [
      "A passionate and dedicated individual who believes in hard work, teamwork, and balance in both personal and professional life. With a strong interest in sports, Midun enjoys playing cricket, which teaches him discipline, strategy, and collaboration—values that make him a reliable team player both on and off the field.",
      "One of his greatest strengths is the ability to manage work pressure effectively. He remains calm and focused during challenging situations, ensuring clarity, efficiency, and responsibility in everything he undertakes. This quality has earned him leadership opportunities and the trust of his peers.",
      "Currently serving as the Treasurer of the Rotaract Club, Midun manages financial responsibilities with accuracy and transparency. This role has sharpened his organizational skills and reinforced his sense of accountability in handling key tasks for the club.",
      "Looking ahead, his ultimate goal is to lead his family with dignity and provide them with a life filled with comfort, respect, and happiness. He firmly believes in continuous growth, learning from experiences, and moving forward with determination and resilience."
    ],
    "achievements": [],
    "keyHighlights": [
      {
        "emoji": "🏏",
        "text": "Cricket Enthusiast & Team Player"
      },
      {
        "emoji": "🧘",
        "text": "Calm & Focused Under Pressure"
      },
      {
        "emoji": "💼",
        "text": "Financial Accuracy & Transparency"
      },
      {
        "emoji": "📊",
        "text": "Organizational & Leadership Skills"
      },
      {
        "emoji": "🎯",
        "text": "Vision of Family Leadership & Growth"
      }
    ]
  },
  {
    "id": 12,
    "name": "Rtr. Prabhagar S",
    "image": "https://res.cloudinary.com/drmwtmeg3/image/upload/v1755411707/team-member-prabhagar_x5ggfk.jpg",
    "badges": [
      "Community Service Director"
    ],
    "category": "director",
    "paragraphs": [
      "As the Community Service Director of our Rotaract Club, Prabhagar takes pride in serving with confidence, bold vision, and an unwavering commitment to positive change. His journey in service is driven by a passion for making a difference and standing up for those in need.",
      "Being an active member, he stays involved in every stage of projects—from planning to execution—ensuring that efforts create a real impact in the lives of others. Consistency, dedication, and teamwork are his guiding principles.",
      "Confidence allows him to take the lead in building partnerships, organizing outreach programs, and inspiring others to join the journey of service. He is bold in his approach—never afraid to step out of his comfort zone and represent the club with pride.",
      "Through service, Prabhagar aims to inspire, empower, and uplift communities. His vision is to build a stronger, kinder, and more united society where teamwork creates lasting change."
    ],
    "achievements": [],
    "keyHighlights": [
      {
        "emoji": "🤝",
        "text": "Passionate Community Service Leader"
      },
      {
        "emoji": "⚡",
        "text": "Bold & Confident Decision Maker"
      },
      {
        "emoji": "📋",
        "text": "Hands-On in Planning & Execution"
      },
      {
        "emoji": "🌍",
        "text": "Impactful Outreach & Partnerships"
      },
      {
        "emoji": "✨",
        "text": "Inspires & Empowers Communities"
      }
    ]
  },
  {
    "id": 13,
    "name": "Rtr. Mirthula R",
    "image": "https://res.cloudinary.com/drmwtmeg3/image/upload/v1755411704/team-member-mirthural_shkrm3.jpg",
    "badges": [
      "International Service Director"
    ],
    "category": "director",
    "paragraphs": [
      "As International Service Director, Mirthula considers herself a person who is constantly learning and evolving. She believes that life is about growth, and embraces every opportunity that comes her way. Her curious and open-minded nature allows her to adapt to new situations and connect with people from diverse backgrounds.",
      "Mirthula strives to balance both academics and practical experiences. She enjoys taking up responsibilities, discovering her strengths, and working on her weaknesses. While teamwork excites her, she also values independence and self-reliance when needed.",
      "Honesty, kindness, and respect are qualities she holds close. In her free time, she loves reading, exploring new ideas, and engaging in meaningful conversations. She also nurtures creativity and problem-solving in her everyday life.",
      "A motivated and enthusiastic individual, Mirthula is determined to make positive contributions wherever she goes. Her goal is to keep improving herself and use her skills to benefit others, strengthening the spirit of international fellowship and collaboration in Rotaract."
    ],
    "achievements": [],
    "keyHighlights": [
      {
        "emoji": "🌐",
        "text": "International Service Advocate"
      },
      {
        "emoji": "📚",
        "text": "Balances Learning & Practical Experience"
      },
      {
        "emoji": "🤝",
        "text": "Team-Oriented & Independent Worker"
      },
      {
        "emoji": "💡",
        "text": "Creative Thinker & Problem Solver"
      },
      {
        "emoji": "✨",
        "text": "Motivated & Positive Contributor"
      }
    ]
  },
  {
    "id": 14,
    "name": "Rtr. Indupriya S",
    "image": "https://res.cloudinary.com/drmwtmeg3/image/upload/v1755411703/team-member-indupriya_emom2c.jpg",
    "badges": [
      "Community Service Chair"
    ],
    "category": "chair",
    "paragraphs": [
      "Being the Community Service Chair of our club is not just a role for Indupriya, it is a responsibility she truly values. Always active and committed, she believes in giving her best in everything she takes up. Community service has taught her that even the smallest effort can bring a smile to someone’s face, and that is what motivates her every day.",
      "Indupriya adapts quickly to situations and people, which helps her contribute effectively across different projects. Whether it’s planning, organizing, or hands-on execution, she gives her fullest effort. With bold and clear communication, she shares ideas openly while also listening to others, ensuring teamwork remains at the core of every initiative.",
      "She handles challenges calmly and practically, believing that every obstacle is an opportunity to prove that with the right mindset, solutions can always be found. As a potential leader, she never hesitates to take responsibility and works tirelessly until goals are achieved.",
      "As Community Service Chair, her only aim is to create projects that truly make a difference in people’s lives—uplifting communities with compassion, action, and dedication."
    ],
    "achievements": [],
    "keyHighlights": [
      {
        "emoji": "🌱",
        "text": "Dedicated to Community Impact"
      },
      {
        "emoji": "🤝",
        "text": "Strong Team Player & Communicator"
      },
      {
        "emoji": "🧘",
        "text": "Handles Challenges Calmly & Practically"
      },
      {
        "emoji": "💪",
        "text": "Hardworking & Responsible Leader"
      },
      {
        "emoji": "✨",
        "text": "Passionate About Service Projects"
      }
    ]
  },
  {
    "id": 15,
    "name": "Rtr. Monisha",
    "image": "https://res.cloudinary.com/drmwtmeg3/image/upload/v1755411704/team-member-monisha_jpfpnu.jpg",
    "badges": [
      "Chair – District Priority Projects"
    ],
    "category": "chair",
    "paragraphs": [
      "I am Rtr. Monisha, currently serving as the Chair – District Priority Projects of the Rotaract Club of KPRCAS. Pursuing my studies at KPRCAS, I strive to grow as an individual who can make a meaningful difference in society through both academics and Rotaract.",
      "My passion lies in leadership, community service, and personal development, and I believe Rotaract provides the perfect platform to bring these together.",
      "Being part of this club has not only shaped my skills but also connected me with like-minded individuals who share the vision of “Service Above Self.”",
      "Alongside my academic and Rotaract journey, I nurture my creativity through crocheting, a craft that reflects patience and passion for creating meaningful work.",
      "As part of the Rotaract movement, my goal is to continue learning, growing, and serving with dedication to achieve impactful results!"
    ],
    "achievements": [],
    "keyHighlights": [
      {
        "emoji": "🏅",
        "text": "Chair – District Priority Projects"
      },
      {
        "emoji": "🤝",
        "text": "Leadership, Service & Personal Growth"
      },
      {
        "emoji": "🧶",
        "text": "Creative Thinker (Crocheting)"
      },
      {
        "emoji": "🎯",
        "text": "Impact-Oriented Vision"
      },
      {
        "emoji": "🌟",
        "text": "Embodies “Service Above Self”"
      }
    ]
  },
  {
    "id": 16,
    "name": "Rtr. Rithanya L",
    "image": "https://res.cloudinary.com/drmwtmeg3/image/upload/v1755413228/rithanaya_m5iwib.jpg",
    "badges": [
      "Director – Professional Services"
    ],
    "category": "director",
    "paragraphs": [
      "I am Rtr. Rithanya L, proudly serving as the Director – Professional Services of the Rotaract Club of KPRCAS. At KPRCAS, I strive to create a balance between academics and Rotaract, shaping myself into an individual who can bring purposeful change to society.",
      "With a passion for leadership, community service, and personal growth, I see Rotaract as more than just a platform—it is a movement that empowers me to transform ideas into action.",
      "This journey has enriched my skills while connecting me with passionate changemakers who share the vision of “Service with Impact.”",
      "Beyond my academic and Rotaract commitments, I find joy in crocheting—a creative pursuit that reflects patience, focus, and dedication to detail.",
      "As part of the Rotaract movement, my mission is to learn continuously, lead with purpose, and serve wholeheartedly, creating meaningful outcomes that inspire others."
    ],
    "achievements": [],
    "keyHighlights": [
      {
        "emoji": "🏅",
        "text": "Director – Professional Services"
      },
      {
        "emoji": "🤝",
        "text": "Leadership, Service & Personal Growth"
      },
      {
        "emoji": "🧶",
        "text": "Creative Thinker (Crocheting)"
      },
      {
        "emoji": "🎯",
        "text": "Transforms Ideas into Action"
      },
      {
        "emoji": "🌟",
        "text": "Embodies “Service with Impact”"
      }
    ]
  },
  {
    "id": 17,
    "name": "Rtr. Anuvarshini K.M",
    "image": "https://res.cloudinary.com/drmwtmeg3/image/upload/v1755411699/team-member-anuvarshini_dp3vxl.jpg",
    "badges": [
      "Director – Reporting and Grievance"
    ],
    "category": "director",
    "paragraphs": [
      "As an enthusiastic and active individual, I believe in taking responsibility with dedication and commitment. My role primarily involves addressing grievances, ensuring transparency, and maintaining smooth communication between the board and members.",
      "I strive to create an open environment where everyone feels comfortable sharing their opinions, challenges, and suggestions. As Director of Reporting and Grievance, I aim to ensure that every member’s voice is heard, valued, and represented fairly.",
      "I strongly believe that teamwork and mutual respect are the keys to success in any organization. My focus is to maintain harmony and transparency within the club.",
      "Apart from my official duties, I actively take part in club events, community service projects, and social initiatives. I am passionate about helping others and solving problems with a positive mindset.",
      "My vision is to foster unity within our club, encourage active participation, and strengthen the bond among members so that together we can achieve greater heights and make a meaningful difference in society."
    ],
    "achievements": [],
    "keyHighlights": [
      {
        "emoji": "🏅",
        "text": "Director – Reporting and Grievance"
      },
      {
        "emoji": "🤝",
        "text": "Transparency & Communication"
      },
      {
        "emoji": "🌟",
        "text": "Problem-Solver with Positive Mindset"
      },
      {
        "emoji": "🎯",
        "text": "Unity & Member Participation"
      },
      {
        "emoji": "💡",
        "text": "Dedicated to Service & Growth"
      }
    ]
  },
  {
    "id": 18,
    "name": "Rtr. Sivaharini K.",
    "image": "https://res.cloudinary.com/drmwtmeg3/image/upload/v1755411666/sivaharini_ze7s9y.jpg",
    "badges": [
      "Chair – Grievances and Reporting"
    ],
    "category": "chair",
    "paragraphs": [
      "I am an enthusiastic and responsible individual with a strong foundation in leadership, communication, and teamwork. Known for my dedication and ability to uphold a positive reputation for my department, I consistently aim to deliver quality results in every role I take on.",
      "I quickly adapt to new environments, remain eager to learn, and embrace challenges with a proactive mindset.",
      "During my tenure as Secretary (2024–2025), I acted as a vital link between faculty and students, effectively managing communication and leading several initiatives. One of my key accomplishments was spearheading  MAVERICKS'25, a successful intra-collegiate event that reflected my event management capabilities and collaborative spirit. I have also served as an emcee at various programs, honing my public speaking and presentation skills.",
      "My active involvement in the Rotaract Club has further enriched my experience. Currently serving as the  Grievances & Reporting Chair, I’m recognized for my approachable nature, active listening, and conflict resolution skills that contribute to a positive club environment. Additionally, I have served as the reporting head, assisting in the creation of monthly bulletins.",
      "With a strong sense of responsibility and a passion for leadership and service, I strive to make a meaningful impact in all I do."
    ],
    "achievements": [],
    "keyHighlights": [
      {
        "emoji": "🏅",
        "text": "Chair – Grievances and Reporting"
      },
      {
        "emoji": "🤝",
        "text": "Leadership, Communication & Teamwork"
      },
      {
        "emoji": "🎤",
        "text": "Event Host & Public Speaker"
      },
      {
        "emoji": "🎯",
        "text": "Organizer of MAVERICKS'25"
      },
      {
        "emoji": "🌟",
        "text": "Conflict Resolution & Transparency"
      }
    ]
  },
  {
    "id": 19,
    "name": "Rtr. Srinithi",
    "image": "https://res.cloudinary.com/drmwtmeg3/image/upload/v1755411666/Srinith_zb8k5t.jpg",
    "badges": [
      "Club Service Chair"
    ],
    "category": "chair",
    "paragraphs": [
      "As the Club Service Chair, I bring with me an enthusiastic and cheerful approach backed by strong leadership and effective communication skills. Last year, I served as the Joint Chair in the Club Service Avenue of our Rotaract Club, gaining valuable exposure to organizing activities, collaborating with peers, and building strong networks.",
      "I also had the privilege of serving as the Department President, where I successfully organized a major departmental event, further strengthening my ability to lead teams, manage responsibilities, and deliver impactful outcomes.",
      "I believe club service is more than just managing activities—it is about creating meaningful connections, fostering collaboration, and encouraging participation. In my current role, I have initiated and organized several engaging events under the Club Service Avenue, ensuring smooth execution and enthusiastic involvement.",
      "I also had the opportunity to emcee key programs such as Farewell ’24 and  Charter’s Day ’25, showcasing my confidence in public speaking and ability to engage audiences effectively.",
      "With empathy, energy, and commitment, I strive to uphold the values of Rotaract while contributing positively to my peers and institution, continuously learning and growing in the process."
    ],
    "achievements": [],
    "keyHighlights": [
      {
        "emoji": "🏅",
        "text": "Club Service Chair"
      },
      {
        "emoji": "🤝",
        "text": "Leadership & Team Collaboration"
      },
      {
        "emoji": "🎤",
        "text": "Event Host – Farewell ’24 & Charter’s Day ’25"
      },
      {
        "emoji": "🎯",
        "text": "Organizer of Club Service Events"
      },
      {
        "emoji": "🌟",
        "text": "Department President Experience"
      }
    ]
  },
  {
    "id": 20,
    "name": "Rtr. Priyanka J. K",
    "image": "https://res.cloudinary.com/drmwtmeg3/image/upload/v1755411663/JK_priyanka_hit03k.jpg",
    "badges": [
      "Chair – All Operations"
    ],
    "category": "chair",
    "paragraphs": [
      "I am Priyanka J. K, a dedicated member of the Rotaract Club of KPRCAS, where I have had the privilege of serving in key leadership roles. For the year 2024–2025, I held the position of Secretary of Communication, a role that sharpened my communication, planning, and organizational skills.",
      "In this role, I actively engaged with members, managed effective communication channels, and strengthened the overall visibility of the club. I coordinated updates, handled correspondence, and ensured smooth information flow across all levels of the club’s functioning.",
      "Building on this foundation, I have taken up the role of Chair – All Operations for the year 2025–2026. This role carries greater responsibility, involving the coordination and oversight of multiple activities within the club. I am committed to ensuring efficiency, teamwork, and impactful execution of initiatives that reflect the spirit of Rotaract.",
      "Through these experiences, Rotaract has given me the platform to grow as a leader, improve my interpersonal skills, and contribute to service, fellowship, and professional development."
    ],
    "achievements": [],
    "keyHighlights": [
      {
        "emoji": "🏅",
        "text": "Chair – All Operations (2025–2026)"
      },
      {
        "emoji": "📩",
        "text": "Former Secretary of Communication (2024–2025)"
      },
      {
        "emoji": "🤝",
        "text": "Teamwork & Coordination"
      },
      {
        "emoji": "🎯",
        "text": "Efficient Planning & Execution"
      },
      {
        "emoji": "🌟",
        "text": "Leadership & Professional Growth"
      }
    ]
  },
  {
    "id": 21,
    "name": "Rtr. Naren",
    "image": "https://res.cloudinary.com/drmwtmeg3/image/upload/v1755411704/team-member-naren_ntcxpk.jpg",
    "badges": [
      "International Service Director"
    ],
    "category": "director",
    "paragraphs": [
      "I am a passionate and dedicated individual who strongly believes in teamwork, hard work, and balance in all aspects of life. With a keen interest in sports, especially cricket, I have developed qualities of discipline, strategy, and collaboration—values that continue to shape my personal and professional journey.",
      "I am known for staying calm and focused, even in challenging situations. My ability to manage pressure effectively helps me handle responsibilities with clarity and efficiency, earning the trust and respect of my peers.",
      "As the International Service Director of the Rotaract Club, I am committed to building cross-cultural connections and organizing impactful collaborations. I strive to strengthen global understanding and promote inclusivity through meaningful projects and partnerships, embodying the true essence of Rotaract’s international service.",
      "Looking ahead, I aspire to create lasting opportunities that inspire service and leadership. Guided by determination and continuous learning, I also hold a personal goal of leading my family with dignity, ensuring they live with comfort, respect, and happiness."
    ],
    "achievements": [],
    "keyHighlights": [
      {
        "emoji": "🌍",
        "text": "International Service Director"
      },
      {
        "emoji": "🏏",
        "text": "Cricket Enthusiast – Discipline & Strategy"
      },
      {
        "emoji": "🧘",
        "text": "Calm & Focused Under Pressure"
      },
      {
        "emoji": "🤝",
        "text": "Cross-Cultural Connections & Inclusivity"
      },
      {
        "emoji": "🌟",
        "text": "Leadership & Family Values"
      }
    ]
  },
  {
    "id": 22,
    "name": "Rtr. Prajjeeith",
    "image": "https://res.cloudinary.com/drmwtmeg3/image/upload/v1755411707/team-member-prajjeeith_ckmlxz.jpg",
    "badges": [
      "District Priority Projects Director"
    ],
    "category": "director",
    "paragraphs": [
      "I am Prajjeeith MurgaPrakash, serving as the District Priority Project Director at the Rotaract Club of KPRCAS. My journey in Rotaract has been shaped by values of leadership, confidence, and pressure management, which have helped me grow as both an individual and a professional.",
      "True leadership is not only about guiding others but also about being a strong pillar of support to ensure collective success. I take pride in standing by my peers and contributing wherever needed to achieve common goals.",
      "Recently, I contributed to a remarkable project in our district. While I was not the lead, my role in supporting, coordinating, and ensuring smooth execution was an enriching experience that highlighted the power of teamwork and consistency.",
      "Through Rotaract, I have developed skills in event management, project execution, and collaboration. I value adaptability, responsibility, and the ability to turn challenges into opportunities for growth and service.",
      "As District Priority Projects Director, I aspire to support initiatives that encourage innovation, inclusivity, and sustainability. My vision is to inspire others to recognize their potential and create lasting contributions that align with Rotaract’s values."
    ],
    "achievements": [],
    "keyHighlights": [
      {
        "emoji": "📌",
        "text": "District Priority Projects Director"
      },
      {
        "emoji": "💡",
        "text": "Strong Leadership & Team Support"
      },
      {
        "emoji": "🛠️",
        "text": "Event Management & Project Execution"
      },
      {
        "emoji": "🤝",
        "text": "Team Collaboration & Coordination"
      },
      {
        "emoji": "🚀",
        "text": "Vision for Innovation & Sustainability"
      }
    ]
  },
  {
    "id": 23,
    "name": "Rtr. Deepana S.",
    "image": "https://res.cloudinary.com/drmwtmeg3/image/upload/v1755411662/deepana_wqphgt.jpg",
    "badges": [
      "Chair of Professional Services"
    ],
    "category": "chair",
    "paragraphs": [
      "As the Chair of Professional Services at Rotaract Club of KPRCAS, I am driven to make a lasting impact. Rotaract is a powerful catalyst for change, allowing me to merge my academic pursuits with community service while finding a community of passionate individuals united by the vision of “Service with Impact.”",
      "Through this journey, I’ve developed leadership skills, learned to collaborate with my peers, and engaged in impactful projects that benefit society. Every step has been an opportunity for both service and self-improvement.",
      "Outside of Rotaract, I enjoy exploring new opportunities for personal growth and creativity. Whether it’s acquiring new skills or pursuing hobbies, I am always eager to challenge myself and improve.",
      "My goal is to embody the spirit of Rotaract – learning, leading, and serving with purpose – while inspiring others to do the same. Together, we can create a positive impact in our community and beyond."
    ],
    "achievements": [],
    "keyHighlights": [
      {
        "emoji": "📌",
        "text": "Chair of Professional Services"
      },
      {
        "emoji": "🌱",
        "text": "Leadership & Continuous Growth"
      },
      {
        "emoji": "🤝",
        "text": "Collaboration & Team Spirit"
      },
      {
        "emoji": "🎯",
        "text": "Service with Purpose & Impact"
      },
      {
        "emoji": "✨",
        "text": "Personal Growth & Creativity"
      }
    ]
  },
  {
    "id": 24,
    "name": "Rtr. Miruthula Sri",
    "image": "https://res.cloudinary.com/drmwtmeg3/image/upload/v1755411664/mirthal_sri_hmns70.jpg",
    "badges": [
      "International Service Chair"
    ],
    "category": "chair",
    "paragraphs": [
      "Meet the dynamic teenage leader bursting with energy! Passionate about traveling, exploring cultures, and creating unforgettable memories, she blends her adventurous spirit with leadership. As the <span className=\"font-semibold\"> International Service Chair</span>, she’s committed to building global connections and empowering her peers through impactful service.",
      "Always full of life and enthusiasm, I thrive on new experiences that challenge me to grow and inspire others along the way.",
      "Exploring new cultures and meeting people across the globe has broadened my perspective and fueled my commitment to international service.",
      "With natural leadership skills, I embrace responsibility, guide others with confidence, and aim to make every initiative impactful and inclusive.",
      "As International Service Chair, I aim to promote cultural exchange, strengthen global fellowship, and empower young people to create a positive impact that reaches far beyond borders."
    ],
    "achievements": [],
    "keyHighlights": [
      {
        "emoji": "🌍",
        "text": "International Service Chair"
      },
      {
        "emoji": "✨",
        "text": "Young, Energetic & Passionate"
      },
      {
        "emoji": "✈️",
        "text": "Loves Traveling & Exploring Cultures"
      },
      {
        "emoji": "👑",
        "text": "Natural Leadership Skills"
      },
      {
        "emoji": "🤝",
        "text": "Committed to Global Service & Fellowship"
      }
    ]
  },
  {
    "id": 25,
    "name": "Rtr. Dharaneesh",
    "image": "https://res.cloudinary.com/drmwtmeg3/image/upload/v1755413218/Dharanessh_fowipx.jpg",
    "badges": [
      "Treasurer"
    ],
    "category": "core",
    "paragraphs": [
      "Serving as a Board Member in the Rotaract Club of KPRCAS for the past two years has been a transformative journey. This role gave me the opportunity to actively plan, execute, and evaluate impactful service-oriented and professional development activities, while building strong collaboration with peers and leaders.",
      "I have contributed to organizing awareness campaigns, leadership workshops, and outreach programs that made a difference both on campus and in the community.",
      "My role involved coordinating with other clubs and external organizations, which helped foster partnerships and broaden our impact.",
      "Being part of the decision-making body sharpened my leadership, teamwork, and time-management skills while giving me valuable insight into club management and financial responsibility."
    ],
    "achievements": [],
    "keyHighlights": [
      {
        "emoji": "💰",
        "text": "Treasurer – Financial Oversight"
      },
      {
        "emoji": "📅",
        "text": "Organizer of Events & Campaigns"
      },
      {
        "emoji": "🤝",
        "text": "Collaboration & Partnerships"
      },
      {
        "emoji": "👨‍💼",
        "text": "Leadership & Decision-Making"
      },
      {
        "emoji": "🌟",
        "text": "Service Above Self"
      }
    ]
  },
  {
    "id": 26,
    "name": "Rtr. Brindha P",
    "image": "https://res.cloudinary.com/drmwtmeg3/image/upload/v1755413216/Brinda_uk2jgf.jpg",
    "badges": [
      "Director – Professional Services"
    ],
    "category": "director",
    "paragraphs": [
      "I am Rtr. Brindha P, proudly serving as the <span className=\"font-semibold\"> Director – Professional Services</span> of the Rotaract Club of KPRCAS. At KPRCAS, I strive to balance academics with Rotaract responsibilities, shaping myself into an individual capable of bringing purposeful change to society.",
      "With a passion for leadership and community service, I see Rotaract as more than just a platform—it is a movement that empowers me to transform ideas into impactful actions.",
      "This journey has enriched my skills, strengthened my vision, and connected me with changemakers who share the goal of “Service Beyond Self, Impact Beyond Measure.”",
      "Beyond academics and Rotaract, I find joy in crocheting—a hobby that reflects patience, creativity, and dedication to detail.",
      "My mission is to learn continuously, lead with purpose, and serve wholeheartedly to create meaningful outcomes that inspire others."
    ],
    "achievements": [],
    "keyHighlights": [
      {
        "emoji": "📌",
        "text": "Director – Professional Services"
      },
      {
        "emoji": "📖",
        "text": "Balancing Academics & Service"
      },
      {
        "emoji": "🌍",
        "text": "Service Beyond Self, Impact Beyond Measure"
      },
      {
        "emoji": "🧶",
        "text": "Creative Hobby – Crocheting"
      },
      {
        "emoji": "✨",
        "text": "Leadership, Growth & Inspiration"
      }
    ]
  },
  {
    "id": 27,
    "name": "Rtr. Pavithra KS",
    "image": "https://res.cloudinary.com/drmwtmeg3/image/upload/v1755413219/Pavithra_utrapb.jpg",
    "badges": [
      "Chair – Interact–Rotaract Relationship"
    ],
    "category": "chair",
    "paragraphs": [
      "I am Rtr. Pavithra KS, proudly serving as the <span className=\"font-semibold\"> Chair – Interact–Rotaract Relationship</span> of the Rotaract Club of KPRCAS. At KPRCAS, I strive to balance academics with Rotaract responsibilities, shaping myself into an individual capable of creating purposeful change in society.",
      "With a deep passion for leadership, community service, and personal growth, I see Rotaract not just as a platform, but as a movement that transforms ideas into impactful actions.",
      "This journey has strengthened my skills while connecting me with like-minded changemakers who are driven by a shared vision of progress.",
      "Beyond academics and Rotaract, I find joy in crocheting—a creative pursuit that reflects patience, focus, and dedication to detail.",
      "As a proud Rotaractor, my mission is to learn continuously, lead with integrity, and serve wholeheartedly—leaving behind footprints of positive change.",
      "✨ “True leadership lies in learning, serving, and inspiring others to believe that change begins with them.”"
    ],
    "achievements": [],
    "keyHighlights": [
      {
        "emoji": "📌",
        "text": "Chair – Interact–Rotaract Relationship"
      },
      {
        "emoji": "📖",
        "text": "Balancing Academics & Service"
      },
      {
        "emoji": "🌍",
        "text": "Transforming Ideas into Action"
      },
      {
        "emoji": "🧶",
        "text": "Creative Hobby – Crocheting"
      },
      {
        "emoji": "✨",
        "text": "Leadership, Growth & Inspiration"
      }
    ]
  },
  {
    "id": 28,
    "name": "Rtr. Praveen",
    "image": "https://res.cloudinary.com/drmwtmeg3/image/upload/v1755411664/praveen_l0psb8.jpg",
    "badges": [
      "Club Service Director"
    ],
    "category": "director",
    "paragraphs": [
      "I am Rtr. Praveen, a passionate and dedicated individual who believes in <span className=\"font-semibold\">hard work, teamwork and balance</span> in both personal and professional life. With a strong interest in sports, especially cricket and football, I embrace the discipline, strategy, and collaboration that they teach.",
      "Being on the field has shaped me into a true team player, someone who motivates and supports others while working toward common goals.",
      "One of my greatest strengths is managing work pressure with focus and clarity, ensuring responsibilities are handled with efficiency. This quality has allowed me to lead successfully and earn trust from peers.",
      "Currently, I serve as the Club Service Director of the Rotaract Club, where I organize engaging activities and events that foster fellowship and strengthen bonds among members.",
      "My ultimate goal is to lead my family with dignity and provide them a life of comfort, respect, and happiness—while growing continuously, learning from every experience, and moving forward with determination."
    ],
    "achievements": [],
    "keyHighlights": [
      {
        "emoji": "📌",
        "text": "Club Service Director"
      },
      {
        "emoji": "⚽",
        "text": "Sports Enthusiast – Cricket & Football"
      },
      {
        "emoji": "🌟",
        "text": "Calm & Focused Under Pressure"
      },
      {
        "emoji": "🤝",
        "text": "Promotes Fellowship & Bonding"
      },
      {
        "emoji": "🎯",
        "text": "Vision – Lead with Dignity & Determination"
      }
    ]
  },
  {
    "id": 29,
    "name": "Rtr. Sanjay D",
    "image": "https://res.cloudinary.com/drmwtmeg3/image/upload/v1755411667/Sanjay_f8kema.jpg",
    "badges": [
      "All Avenue Chair"
    ],
    "category": "chair",
    "paragraphs": [
      "I am Rtr. Sanjay D, proudly serving as the <span className=\"font-semibold\"> All Avenue Chair</span> of the Rotaract Club of KPRCAS, carrying the responsibility of harmonizing every avenue of service into one united vision for the club.",
      "With dedication and leadership, I ensure that the activities of Club Service, Community Service, International Service, and Professional Development are well-coordinated and impactful.",
      "As a connecting link among avenues, I promote collaboration, encourage innovation, and support directors in executing meaningful projects.",
      "My role extends beyond coordination—I inspire creativity, motivate members, and nurture a spirit of inclusiveness within the club, ensuring every project contributes to collective growth.",
      "My commitment as All Avenue Chair reflects the true essence of Rotaract leadership— bringing people together, driving harmony, and creating lasting change in the community and beyond.",
      "✨ “Service Above Self.”"
    ],
    "achievements": [],
    "keyHighlights": [
      {
        "emoji": "📌",
        "text": "All Avenue Chair"
      },
      {
        "emoji": "🤝",
        "text": "Harmonizes All Avenues of Service"
      },
      {
        "emoji": "🌍",
        "text": "Promotes Collaboration & Inclusiveness"
      },
      {
        "emoji": "💡",
        "text": "Encourages Innovation & Creativity"
      },
      {
        "emoji": "✨",
        "text": "Embodies “Service Above Self”"
      }
    ]
  },
  {
    "id": 30,
    "name": "Rtr. Rashvandh A",
    "image": "https://res.cloudinary.com/drmwtmeg3/image/upload/v1755411665/rashvandh_vkgvm4.jpg",
    "badges": [
      "Web Chair"
    ],
    "category": "chair",
    "paragraphs": [
      "As a <span className=\"font-semibold\">first-year Rotaractor</span>, I proudly serve as the <span className=\"font-semibold\"> Web Chair</span> of the Rotaract Club of KPRCAS. My journey in Rotaract is just beginning, but I am determined to use my passion for technology and creativity to strengthen our club’s digital presence.",
      "Being in my first year, I bring a fresh outlook filled with curiosity, eagerness to learn, and the drive to contribute meaningfully to every project.",
      "With a deep interest in web development and digital creativity, I aim to create impactful online platforms that represent our club’s spirit, projects, and values to a wider audience.",
      "Through my role, I strive to connect Rotaractors not just within our club, but also with the wider community—fostering collaboration, innovation, and unity.",
      "My goal is to grow alongside Rotaract, develop my skills, and ensure that our club’s digital identity remains strong, engaging, and inspiring for all.",
      "✨ “Every big journey starts with a small step—and this is mine.”"
    ],
    "achievements": [],
    "keyHighlights": [
      {
        "emoji": "🌐",
        "text": "Web Chair – First Year"
      },
      {
        "emoji": "🚀",
        "text": "Fresh Perspective & Eager to Learn"
      },
      {
        "emoji": "💻",
        "text": "Passionate About Technology & Digital Growth"
      },
      {
        "emoji": "🤝",
        "text": "Connects Members Through Online Platforms"
      },
      {
        "emoji": "✨",
        "text": "Vision – Strengthen Club’s Digital Identity"
      }
    ]
  },
  {
    "id": 31,
    "name": "Rtr. Dharsan Sastikesh S.P",
    "image": "https://res.cloudinary.com/drmwtmeg3/image/upload/v1755411662/Darshan_jnxkak.jpg",
    "badges": [
      "Public Relations Chair"
    ],
    "category": "chair",
    "paragraphs": [
      "As the <span className=\"font-semibold\">Public Relations (PR) Chair</span>, I play a vital role in enhancing the image and visibility of the Rotaract Club of KPRCAS. My focus is on <span className=\"font-semibold\">Promoting Club Image (PCI)</span> through effective communication, social media presence, and creative outreach.",
      "I ensure a consistent and professional outlook across all platforms, aligning our branding with Rotaract values and maintaining visibility.",
      "From engaging posts to reels, I make sure our social media reflects our vibrant projects and inspires wider community engagement.",
      "I handle event publicity through creative campaigns and maintain effective internal communication (IC) with members and external communication (EC) with partners and media.",
      "I capture photographs, videos, and maintain a <span className=\"font-semibold\">Photo & Video Archive (PVA)</span>. I also contribute to Monthly Newsletters (MN) and press releases.",
      "✨ “Visibility creates impact—and impact builds legacy.”"
    ],
    "achievements": [],
    "keyHighlights": [
      {
        "emoji": "📢",
        "text": "Promotes Club Image (PCI)"
      },
      {
        "emoji": "📱",
        "text": "Manages Social Media (SMM)"
      },
      {
        "emoji": "🎉",
        "text": "Creative Event Promotion (EP)"
      },
      {
        "emoji": "📝",
        "text": "Documentation & Reporting (DR)"
      },
      {
        "emoji": "📸",
        "text": "Maintains Photo & Video Archive (PVA)"
      }
    ]
  },
  {
    "id": 32,
    "name": "{member.name}",
    "image": "",
    "badges": [],
    "category": "chair",
    "paragraphs": [
      "{member.position}"
    ],
    "achievements": [],
    "keyHighlights": []
  }
];
