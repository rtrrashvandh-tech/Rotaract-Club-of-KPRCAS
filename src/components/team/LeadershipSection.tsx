import { TeamMemberCard } from './TeamMemberCard';

export const LeadershipSection = () => {
  const leadershipTeam = [
    {
      name: 'Rtr. Sanjith Kumar Sri Krishnan',
      position: 'President, Since 2024',
      image: '/src/assets/team-member-sanjith.jpg',
      description: 'A dedicated and dynamic member of Rotary since 2021, Rtr. Sanjith Kumar Sri Krishnan has made a significant impact through his leadership and passion for service.',
      details: [
        {
          title: 'Early Achievements',
          content: [
            '• Sergeant-at-Arms, Interact Club of National Model (2021-2022)',
            '• Advisor and Deputy Secretary, Interact Club of National Model (2022-2023)',
            '• Recipient of the Best Interactor Award'
          ]
        },
        {
          title: 'Impactful Contributions',
          content: [
            '• Conducted over 40 dynamic events during school days, positively impacting society',
            '• Supported the club as All Avenue Chair, setting and planning events as a Rotaractor (2024-2025)'
          ]
        },
        {
          title: 'Leadership Roles',
          content: [
            '• Secretary Administration (2024-2025): Led administrative aspects, framed bylaws, and structured club functions',
            '• Led a team of 100 members',
            '• Best Secretary (2024-2025): Achieved outstanding membership growth and mentored the club for wholesome success'
          ]
        },
        {
          title: 'Transformational Impact',
          content: [
            '• Transformed the club from active to hyper-active, earning a Rolling Trophy with 10+ recognitions',
            '• Built a strong foundation for legacy and attracted potential Rotaractors'
          ]
        },
        {
          title: 'Future Vision',
          content: 'Poised to lead the club in the new district with a clear vision and framework, set to unleash the legacy in 2025-2026.'
        }
      ],
      achievements: [
        { icon: '🏆', text: 'Best Secretary 2024-2025' },
        { icon: '⭐', text: 'Best Interactor Award' },
        { icon: '🎯', text: 'Rolling Trophy with 10+ Recognition' },
        { icon: '👥', text: 'Led Team of 100 Members' },
        { icon: '🚀', text: '40+ Impactful Events Conducted' }
      ]
    },
    {
      name: 'Rtr. Haripriya',
      position: 'Secretary Administration, Vision Year',
      image: '/src/assets/team/haripriya.jpg',
      description: 'A Visionary Leader, A Creative Soul. Rtr. Haripriya has been a defining presence in the Roar Year of the Rotaract Club of KPRCAS, embodying quiet strength and impactful leadership.',
      details: [
        {
          title: 'Leadership Journey',
          content: 'As Vice President, she played a crucial role in club operations—coordinating with the board, tracking events, resolving concerns, and maintaining seamless communication. Her calm, detail-oriented approach made her a strong support system to the President and a dependable force within the team.'
        },
        {
          title: 'Key Achievements',
          content: [
            '• Event Chairperson of "Blooming Blossom" - Major District Priority Project',
            '• Impacted over 100 beneficiaries across Coimbatore and Tiruppur',
            '• Earned esteemed Roar Recognition from the District',
            '• Editor of the Roar Year Scrapbook - Creative documentation'
          ]
        },
        {
          title: 'District Representation',
          content: 'Actively represented at district-level events such as Tanzanite, XVII District Conference, Rotabuzz, Rotamind, the Incoming IDYE, and the District Awards. Her consistent presence reflects her dedication to Rotaract\'s larger purpose and enthusiasm to grow through collaboration.'
        }
      ],
      achievements: [
        { icon: '🏆', text: 'Roar Recognition from District' },
        { icon: '🌸', text: 'Blooming Blossom Project Lead' },
        { icon: '📖', text: 'Roar Year Scrapbook Editor' },
        { icon: '👥', text: '100+ Beneficiaries Impacted' },
        { icon: '🎯', text: 'District Events Representative' }
      ]
    },
    {
      name: 'Rtr. Mounesh',
      position: 'Secretary Communication, Vision Year',
      image: '/src/assets/team/mounesh.jpg',
      description: 'A Steadfast Leader, A Pillar of Support. Rtr. Mounesh has been an integral part of the Rotaract Club of KPRCAS, demonstrating unwavering commitment and leadership throughout his journey.',
      details: [
        {
          title: 'Leadership Journey',
          content: 'Rtr. Mounesh began his Rotaract journey as Treasurer of the Rotaract Club of KPRCAS, where his keen knowledge in managing finances ensured transparency and efficiency in the club\'s operations. His dedication and skill in handling responsibilities set the tone for his journey as a dependable leader.'
        },
        {
          title: 'Key Contributions',
          content: [
            '• Successfully managed club finances as Treasurer with transparency and efficiency',
            '• Actively participated in numerous district-level events, showcasing commitment to learning and fellowship',
            '• Played a crucial role in hosting the club\'s first-ever IDYE',
            '• Provided operational support and moral strength to the team'
          ]
        },
        {
          title: 'Current Role',
          content: 'As Secretary - Communication for the Vision Year, Rtr. Mounesh continues to be a constant source of encouragement and stability. His experience and dedication ensure the smooth functioning of the club, and he remains a steadfast supporter of his fellow Rotaractors.'
        }
      ],
      achievements: [
        { icon: '💰', text: 'Former Treasurer - Financial Management' },
        { icon: '📊', text: 'Efficient Financial Stewardship' },
        { icon: '🤝', text: 'Team Support & Mentorship' },
        { icon: '🌐', text: 'Active District Participant' },
        { icon: '🎉', text: 'IDYE Event Organizer' }
      ]
    }
  ];

  return (
    <section className="section-padding">
      <div className="container-custom">
        <div className="text-center max-w-4xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">
            Our <span className="text-primary">Leadership</span>
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Meet the dedicated individuals who lead our club with passion and commitment.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {leadershipTeam.map((member, index) => (
            <TeamMemberCard
              key={member.name}
              name={member.name}
              position={member.position}
              image={member.image}
              description={member.description}
              details={member.details}
              achievements={member.achievements}
              delay={(index + 1) * 100}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default LeadershipSection;
