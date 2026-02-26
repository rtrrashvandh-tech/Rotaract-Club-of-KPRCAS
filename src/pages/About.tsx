import { Target, Eye, Users, Award, Calendar, Heart } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import AnimationWrapper from '@/components/AnimationWrapper';
const teamPhoto = "https://res.cloudinary.com/drmwtmeg3/image/upload/v1755412154/team-photo_lefoty.jpg";

const About = () => {
  const milestones = [
    { year: '2021', event: 'Foundation Laid', description: 'Rotaract Club of KPRCAS established under Rotary International District 3201, sponsored by Rotary Club of Coimbatore Central' },
    { year: '2022', event: 'First Steps', description: 'Began operations as a vibrant youth-led organization at KPR College of Arts Science and Research' },
    { year: '2023', event: 'Building Momentum', description: 'Launched impactful service projects and awareness drives, fostering community engagement' },
    { year: '2024', event: 'Leadership Development', description: 'Strengthened fellowship programs and leadership initiatives, empowering young leaders' },
    { year: '2025', event: '5th Rotaract Year', description: 'Entering 5th year as a reviving force with renewed passion and commitment to "Fellowship through Service"' },
  ];

  const values = [
    {
      icon: Heart,
      title: 'Service Above Self',
      description: 'We prioritize community service and making a positive impact in the lives of others.'
    },
    {
      icon: Users,
      title: 'Fellowship',
      description: 'Building lasting friendships and professional relationships through shared experiences.'
    },
    {
      icon: Award,
      title: 'Excellence',
      description: 'Striving for excellence in all our projects and personal development initiatives.'
    },
    {
      icon: Target,
      title: 'Integrity',
      description: 'Maintaining the highest ethical standards in all our actions and decisions.'
    }
  ];

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-br from-primary/10 to-secondary/20">
        <div className="container-custom">
          <AnimationWrapper>
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                About <span className="text-primary">Rotaract Club of KPRCAS</span>
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                A vibrant youth-led organization committed to spreading smiles, inspiring hope, 
                and building a brighter, better tomorrow through fellowship and service.
              </p>
            </div>
          </AnimationWrapper>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12">
            <AnimationWrapper>
              <Card className="h-full bg-gradient-to-br from-primary to-primary-light text-white border-none shadow-medium hover-lift">
                <CardContent className="p-8">
                  <div className="flex items-center mb-6">
                    <Target className="h-8 w-8 mr-3 animate-heartbeat" />
                    <h2 className="text-2xl font-bold animate-gradient-text">Our Mission</h2>
                  </div>
                  <p className="text-lg leading-relaxed opacity-95">
                    To empower students to grow as socially responsible leaders through 
                    service, leadership, diversity, integrity, and fellowship, creating 
                    positive change in our communities.
                  </p>
                </CardContent>
              </Card>
            </AnimationWrapper>

            <AnimationWrapper delay={300}>
              <Card className="h-full bg-gradient-to-br from-gold to-gold-light text-white border-none shadow-medium hover-lift">
                <CardContent className="p-8">
                  <div className="flex items-center mb-6">
                    <Eye className="h-8 w-8 mr-3 animate-wave" />
                    <h2 className="text-2xl font-bold animate-gradient-text">Our Vision</h2>
                  </div>
                  <p className="text-lg leading-relaxed opacity-95">
                    To be a movement driven by the belief that small actions spark big change, 
                    fostering personal development and community impact through impactful 
                    service projects and leadership programs.
                  </p>
                </CardContent>
              </Card>
            </AnimationWrapper>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="section-padding bg-secondary/30">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <AnimationWrapper>
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Our <span className="text-primary">Story</span>
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    The Rotaract Club of KPRCAS, established in 2021 under Rotary International 
                    District 3201 and sponsored by the Rotary Club of Coimbatore Central, is a 
                    vibrant youth-led organization at KPR College of Arts Science and Research. 
                    With a foundation rooted in service, leadership, diversity, integrity, and 
                    fellowship, the club empowers students to grow as socially responsible leaders.
                  </p>
                  <p>
                    Despite being a young club, it has shown remarkable energy and dedication as a 
                    reviving force, now entering its 5th Rotaract year with renewed passion. From 
                    impactful service projects and awareness drives to enriching fellowships and 
                    leadership programs, the club fosters personal development and community impact. 
                    More than just a club, it's a movement driven by the belief that small actions 
                    spark big change.
                  </p>
                  <p>
                    Committed to spreading smiles, inspiring hope, striving to build a brighter, 
                    better tomorrow and igniting purpose, the Rotaract Club of KPRCAS proudly lives 
                    its motto: <strong>"Fellowship through Service"</strong>
                  </p>
                </div>
              </div>
            </AnimationWrapper>

            <AnimationWrapper delay={300} animation="slide-in-right">
              <div className="relative">
                <img
                  src={teamPhoto}
                  alt="Team Photo"
                  className="rounded-2xl shadow-strong w-full"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent rounded-2xl" />
              </div>
            </AnimationWrapper>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding">
        <div className="container-custom">
          <AnimationWrapper className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Our <span className="text-primary">Core Values</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              The principles that guide everything we do and every decision we make
            </p>
          </AnimationWrapper>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <AnimationWrapper key={value.title} delay={index * 150} animation="bounce-in">
                <Card className="card-hover h-full text-center bg-white border-none shadow-soft">
                  <CardContent className="p-6">
                    <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-primary to-primary-light rounded-full flex items-center justify-center">
                      <value.icon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold mb-3">{value.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              </AnimationWrapper>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section-padding bg-gradient-to-br from-secondary/20 to-primary/5">
        <div className="container-custom">
          <AnimationWrapper className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Our <span className="text-primary">Journey</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              Key milestones in our club's history
            </p>
          </AnimationWrapper>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 top-0 bottom-0 w-0.5 bg-primary/30" />
              
              {milestones.map((milestone, index) => (
                <AnimationWrapper key={milestone.year} delay={index * 200}>
                  <div className={`relative flex items-center mb-8 ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}>
                    {/* Timeline dot */}
                    <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 w-4 h-4 bg-primary rounded-full border-4 border-background z-10" />
                    
                    {/* Content */}
                    <div className={`ml-12 md:ml-0 md:w-1/2 ${
                      index % 2 === 0 ? 'md:pr-8' : 'md:pl-8'
                    }`}>
                      <Card className="bg-white border-none shadow-soft">
                        <CardContent className="p-6">
                          <div className="flex items-center mb-2">
                            <span className="bg-primary text-white px-3 py-1 rounded-full text-sm font-semibold">
                              {milestone.year}
                            </span>
                          </div>
                          <h3 className="text-lg font-semibold mb-2">{milestone.event}</h3>
                          <p className="text-muted-foreground">{milestone.description}</p>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </AnimationWrapper>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;