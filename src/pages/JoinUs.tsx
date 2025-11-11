import { useEffect } from 'react';
import { User, GraduationCap, Building, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AnimationWrapper from '@/components/AnimationWrapper';

const JoinUs = () => {
  useEffect(() => {
    document.title = 'Join Rotaract Club of KPRCAS | Membership Information';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', 'Learn how to join the Rotaract Club of KPRCAS. Leadership, community service, and professional growth opportunities.');
  }, []);

  const benefits = [
    {
      icon: GraduationCap,
      title: 'Leadership Development',
      description: 'Develop essential leadership skills through hands-on experience and mentorship opportunities.'
    },
    {
      icon: User,
      title: 'Personal Growth',
      description: 'Build confidence, communication skills, and expand your comfort zone through diverse experiences.'
    },
    {
      icon: Building,
      title: 'Professional Networking',
      description: 'Connect with like-minded individuals, professionals, and alumni in various industries.'
    },
    {
      icon: CheckCircle,
      title: 'Community Impact',
      description: 'Make a meaningful difference in your community through impactful service projects.'
    }
  ];

  const requirements = [
    'Be a current student at KPRCAS',
    'Maintain good academic standing',
    'Commit to regular meeting attendance',
    'Participate in at least 2 service projects per semester',
    'Pay annual membership dues',
    'Uphold Rotaract values and ethics'
  ];

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-br from-primary/10 to-secondary/20">
        <div className="container-custom">
          <AnimationWrapper>
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Join <span className="text-primary">Our Club</span>
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Become part of a vibrant community of young leaders dedicated to 
                service, fellowship, and personal development.
              </p>
            </div>
          </AnimationWrapper>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="section-padding">
        <div className="container-custom">
          <AnimationWrapper>
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
              Why Join <span className="text-primary">Rotaract?</span>
            </h2>
          </AnimationWrapper>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {benefits.map((benefit, index) => (
              <AnimationWrapper key={benefit.title} delay={index * 100} animation="bounce-in">
                <Card className="card-hover h-full text-center bg-white border-none shadow-soft">
                  <CardContent className="p-6">
                    <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-primary to-primary-light rounded-2xl flex items-center justify-center">
                      <benefit.icon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold mb-3">{benefit.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {benefit.description}
                    </p>
                  </CardContent>
                </Card>
              </AnimationWrapper>
            ))}
          </div>
        </div>
      </section>

      {/* Requirements Section */}
      <section className="section-padding bg-secondary/30">
        <div className="container-custom max-w-4xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8">
            <AnimationWrapper>
              <Card className="bg-white border-none shadow-soft">
                <CardHeader>
                  <CardTitle className="text-2xl">Membership Requirements</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {requirements.map((requirement, index) => (
                      <li key={index} className="flex items-start space-x-3">
                        <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{requirement}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </AnimationWrapper>

            <AnimationWrapper delay={200}>
              <Card className="bg-gradient-to-br from-primary to-primary-light text-white border-none h-full">
                <CardContent className="p-6 h-full flex flex-col">
                  <div className="flex-grow">
                    <h3 className="text-xl font-semibold mb-3">Interested in Joining?</h3>
                    <p className="opacity-90 mb-6">
                      If you're interested in becoming a member or have any questions about our club, 
                      feel free to reach out to us. We'd love to hear from you!
                    </p>
                  </div>
                  <Button 
                    variant="outline" 
                    className="mt-4 bg-white/10 border-white text-white hover:bg-white hover:text-primary w-full"
                    onClick={() => window.location.href = '/contact'}
                  >
                    Contact Us
                  </Button>
                </CardContent>
              </Card>
            </AnimationWrapper>
          </div>
        </div>
      </section>
    </div>
  );
};

export default JoinUs;