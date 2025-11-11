import { TeamMemberCard } from './TeamMemberCard';

export const ExecutiveTeam = () => {
  const executiveTeam = [
    {
      name: 'Angala Pariwar',
      position: 'Director, Partner and Services',
      image: '/src/assets/team/angala-pariwar.jpg',
      description: 'Leading our partner and services initiatives with dedication and strategic vision.',
      details: [
        {
          title: 'Role',
          content: 'Oversees all partner relationships and service initiatives, ensuring alignment with our club\'s mission and values.'
        },
        {
          title: 'Contributions',
          content: [
            '• Developed strategic partnerships with local businesses',
            '• Led multiple community service projects',
            '• Mentored new members in service leadership'
          ]
        }
      ]
    },
    {
      name: 'Brinda',
      position: 'Director, Professional Service',
      image: '/src/assets/team/brinda.jpg',
      description: 'Driving professional development and service excellence within our community.',
      details: [
        {
          title: 'Role',
          content: 'Leads the professional service initiatives, focusing on skill development and career growth opportunities.'
        },
        {
          title: 'Key Projects',
          content: [
            '• Organized professional development workshops',
            '• Established mentorship programs',
            '• Coordinated networking events with industry leaders'
          ]
        }
      ]
    },
    {
      name: 'Dharsan Sastikesh',
      position: 'Public Image Chair',
      image: '/src/assets/team/dharsan.jpg',
      description: 'Enhancing our club\'s visibility and public engagement through strategic communications.',
      details: [
        {
          title: 'Role',
          content: 'Manages the club\'s public image, branding, and media relations.'
        },
        {
          title: 'Achievements',
          content: [
            '• Redesigned club branding materials',
            '• Increased social media engagement by 200%',
            '• Developed media relations strategy'
          ]
        }
      ]
    },
    {
      name: 'Deepana',
      position: 'Professional Service Chair',
      image: '/src/assets/team/deepana.jpg',
      description: 'Committed to fostering professional growth and service excellence among members.',
      details: [
        {
          title: 'Role',
          content: 'Coordinates professional development programs and service initiatives.'
        },
        {
          title: 'Initiatives',
          content: [
            '• Launched career development series',
            '• Organized skill-building workshops',
            '• Led community service projects'
          ]
        }
      ]
    },
    {
      name: 'Hari Priya G',
      position: 'Learning Facilitator Chair',
      image: '/src/assets/team/hari-priya.jpg',
      description: 'Empowering members through continuous learning and development opportunities.',
      details: [
        {
          title: 'Role',
          content: 'Designs and implements learning and development programs for club members.'
        },
        {
          title: 'Programs',
          content: [
            '• Leadership training series',
            '• Personal development workshops',
            '• Team-building activities'
          ]
        }
      ]
    }
  ];

  return (
    <section className="section-padding bg-gray-50">
      <div className="container-custom">
        <div className="text-center max-w-4xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">
            Our <span className="text-primary">Executive Team</span>
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Meet the dedicated team leading our various initiatives and operations.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {executiveTeam.map((member, index) => (
            <TeamMemberCard
              key={member.name}
              name={member.name}
              position={member.position}
              image={member.image}
              description={member.description}
              details={member.details}
              delay={(index % 3) * 100}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExecutiveTeam;
