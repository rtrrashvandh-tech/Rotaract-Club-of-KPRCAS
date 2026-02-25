import React, { useState } from 'react';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog';
import AnimationWrapper from '../components/AnimationWrapper';

interface TeamMember {
  id: number;
  name: string;
  position: string;
  image: string;
}

const Team = () => {
  const [showPresidentDetails, setShowPresidentDetails] = useState(false);
  const [showVicePresidentDetails, setShowVicePresidentDetails] = useState(false);
  const [showTreasurerDetails, setShowTreasurerDetails] = useState(false);
  const [showSecretaryDetails, setShowSecretaryDetails] = useState(false);
  const [showWebchairDetails, setShowWebchairDetails] = useState(false);
  const [showPrchairDetails, setShowPrchairDetails] = useState(false);
  const [showCommunityDetails, setShowCommunityDetails] = useState(false);
  const [showSanjayDetails, setShowSanjayDetails] = useState(false);
  const [showPrajjeeithDetails, setShowPrajjeeithDetails] = useState(false);
  const [showPavithraDetails, setShowPavithraDetails] = useState(false);
  const [showPratheeshDetails, setShowPratheeshDetails] = useState(false);
  const [showPraveenDetails, setShowPraveenDetails] = useState(false);
  const [showCommunityChairDetails, setShowCommunityChairDetails] = useState(false);
  const [showDeepanaDetails, setShowDeepanaDetails] = useState(false);
  const [showBrindhaDetails, setShowBrindhaDetails] = useState(false);
  const [showMiruthulaDetails, setShowMiruthulaDetails] = useState(false);
  const [showSivahariniDetails, setShowSivahariniDetails] = useState(false);
  const [showNarenDetails, setShowNarenDetails] = useState(false);
  const [showDharaneeshDetails, setShowDharaneeshDetails] = useState(false);
  const [showPriyankaDetails, setShowPriyankaDetails] = useState(false);
  const [showSrinithiDetails, setShowSrinithiDetails] = useState(false);
  const [showRithanyaDetails, setShowRithanyaDetails] = useState(false);
  const [showJointSecretaryDetails, setShowJointSecretaryDetails] = useState(false);
  const [showAnuvarshiniDetails, setShowAnuvarshiniDetails] = useState(false);
  const [showInternationalDetails, setShowInternationalDetails] = useState(false);
  const [showMonishaDetails, setShowMonishaDetails] = useState(false);
  const [showPastPresidentDetails, setShowPastPresidentDetails] = useState(false);
  const [showStaffCoordinatorDetails, setShowStaffCoordinatorDetails] = useState(false);

  const teamMembers: TeamMember[] = [
    {
      id: 1,
      name: 'Rtr. Angala Pariwar',
      image: 'https://res.cloudinary.com/drmwtmeg3/image/upload/v1755411663/angala_pariwar_vauawb.jpg',
      position: 'DIRECTOR-PARTNER AND SERVICES'
    },
    {
      id: 2,
      name: 'Rtr. Hari Priya G',
      image: 'https://res.cloudinary.com/drmwtmeg3/image/upload/v1755411665/Hari_PriyaG_f7xxu4.jpg',
      position: 'LEARNING FACILITATOR - CHAIR '
    },
    {
      id: 3,
      name: 'Rtr. Jairam',
      image: 'https://res.cloudinary.com/drmwtmeg3/image/upload/v1755411664/Jairam_wiwxrr.jpg',
      position: 'MEMBERSHIP CHAIR '
    },
    {
      id: 4,
      name: 'Rtr. Lohit',
      image: 'https://res.cloudinary.com/drmwtmeg3/image/upload/v1755411664/lohit_nnfyiq.jpg',
      position: 'PHOTOGRAPHY CHAIR '
    },
    {
      id: 5,
      name: 'Rtr. Niswetha',
      image: 'https://res.cloudinary.com/drmwtmeg3/image/upload/v1755411664/niswetha_yvg0d0.jpg',
      position: 'CHAIR SOCIAL MEDIA'
    },
    {
      id: 6,
      name: 'Rtr. Prateesh',
      image: 'https://res.cloudinary.com/drmwtmeg3/image/upload/v1755411666/prateesh_vj5chv.jpg',
      position: 'ALL OPERATION CHAIR '
    },
    {
      id: 7,
      name: 'Rtr. Sakthi Ram',
      image: 'https://res.cloudinary.com/drmwtmeg3/image/upload/v1755411666/srisakti_vtnylf.jpg',
      position: ' IMMEDIATE PAST PRESIDENT  '
    },
    {
      id: 8,
      name: 'Rtr. Surya Prakash',
      image: 'https://res.cloudinary.com/drmwtmeg3/image/upload/v1755411667/Surya_Prakash_joopwi.jpg',
      position: 'SEARGANT AT ARMS'
    },
    {
      id: 9,
      name: 'Rtr. Vallamai',
      image: 'https://res.cloudinary.com/drmwtmeg3/image/upload/v1755411667/vallamai_leog4m.jpg',
      position: 'HOSPITALITY '
    },
    {
      id: 10,
      name: 'Rtr. Vishnu Prasad',
      image: 'https://res.cloudinary.com/drmwtmeg3/image/upload/v1755411662/vishnu_prasad_x8dh8n.jpg',
      position: 'MEMBERSHIP DIRECTOR '
    }
  ];

  return (
    <div className="min-h-screen pt-16 md:pt-20">
      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-br from-primary/10 to-secondary/20">
        <div className="container-custom">
          <AnimationWrapper>
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Meet Our <span className="text-primary">Team</span>
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Dedicated leaders and passionate members working together to create
                positive change in our community.
              </p>
            </div>
          </AnimationWrapper>
        </div>
      </section>

      {/* Chairman Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <AnimationWrapper>
            <div className="text-center max-w-4xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-8">
                Our <span className="text-primary">Chairman</span>
              </h2>
            </div>
          </AnimationWrapper>

          {/* Chairman Card */}
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <AnimationWrapper delay={100}>
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:scale-[1.02]">
                <div className="p-6 sm:p-8">
                  <div className="text-center mb-6">
                    <div className="w-40 h-40 sm:w-48 sm:h-48 rounded-full overflow-hidden border-4 border-white shadow-lg mx-auto transition-transform duration-300 hover:scale-105">
                      <img
                        src="https://res.cloudinary.com/drmwtmeg3/image/upload/v1755411671/Chairman_sir_mcs6ns.avif"
                        alt="Chairman"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>

                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      Dr. K.P. Ramasamy
                    </h3>
                    <div className="flex flex-wrap items-center justify-center gap-2 mb-4">
                      <span className="bg-primary text-white px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap">
                        Chairman
                      </span>
                      <span className="bg-primary text-white px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap">
                        KPR Group of Institutions
                      </span>
                    </div>
                  </div>

                  <div className="prose prose-gray max-w-none">
                    <p className="text-gray-700 leading-relaxed mb-4 text-sm text-center">
                      Guiding the institution with visionary leadership and unwavering commitment to excellence in education.
                    </p>
                  </div>
                </div>
              </div>
            </AnimationWrapper>
          </div>
        </div>
      </section>

      {/* Principal Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <AnimationWrapper>
            <div className="text-center max-w-4xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-8">
                Our <span className="text-primary">Principal</span>
              </h2>
            </div>
          </AnimationWrapper>

          {/* Principal Card */}
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <AnimationWrapper delay={100}>
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:scale-[1.02]">
                <div className="p-6 sm:p-8">
                  <div className="text-center mb-6">
                    <div className="w-40 h-40 sm:w-48 sm:h-48 rounded-full overflow-hidden border-4 border-white shadow-lg mx-auto transition-transform duration-300 hover:scale-105">
                      <img
                        src="https://res.cloudinary.com/drmwtmeg3/image/upload/v1755411672/principal_mam_gzmnvm.jpg"
                        alt="Principal"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>

                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      Dr. Geetha .P
                    </h3>
                    <div className="flex flex-wrap items-center justify-center gap-2 mb-4">
                      <span className="bg-primary text-white px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap">
                        Principal
                      </span>
                      <span className="bg-primary text-white px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap">
                        KPRCAS
                      </span>
                    </div>
                  </div>

                  <div className="prose prose-gray max-w-none">
                    <p className="text-gray-700 leading-relaxed mb-4 text-sm text-center">
                      Leading the institution with vision and dedication, our Principal provides invaluable support to all student initiatives.
                    </p>
                  </div>
                </div>
              </div>
            </AnimationWrapper>
          </div>
        </div>
      </section>

      {/* Staff Coordinator Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <AnimationWrapper>
            <div className="text-center max-w-4xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-8">
                Staff <span className="text-primary">Coordinator</span>
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Our dedicated staff coordinator who provides guidance and support to our club activities.
              </p>
            </div>
          </AnimationWrapper>

          {/* Staff Coordinator Card */}
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <AnimationWrapper delay={100}>
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:scale-[1.02]">
                <div className="p-6 sm:p-8">
                  {/* Staff Coordinator Photo */}
                  <div className="text-center mb-6">
                    <div className="w-40 h-40 sm:w-48 sm:h-48 rounded-full overflow-hidden border-4 border-white shadow-lg mx-auto transition-transform duration-300 hover:scale-105">
                      <img
                        src="https://res.cloudinary.com/drmwtmeg3/image/upload/v1755411699/staff_coordinator_u61x5h.jpg"
                        alt="Staff Coordinator"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>

                  {/* Staff Coordinator Details */}
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      Dr. Vinayak SP
                    </h3>
                    <div className="flex flex-wrap items-center justify-center gap-2 mb-4">
                      <span className="bg-primary text-white px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap">
                        Head Staff Coordinator
                      </span>
                      <span className="bg-primary text-white px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap">
                        Faculty Advisor
                      </span>
                    </div>
                  </div>

                  <div className="prose prose-gray max-w-none">
                    <p className="text-gray-700 leading-relaxed mb-4 text-sm">
                      As the Staff Coordinator, it has been an honor to support and guide our Rotaract Club through the Roar year 2024-25.
                      I have always believed in the incredible potential of student leadership, and it has been truly inspiring to
                      witness the enthusiasm, creativity, and commitment of our members.
                    </p>

                    {showStaffCoordinatorDetails && (
                      <>
                        <p className="text-gray-700 leading-relaxed mb-4 text-sm">
                          My role has been to provide steady support, help navigate administrative processes, and encourage bold
                          ideas that can make a meaningful impact. Seeing the club's revival and growth has been one of the most
                          rewarding experiences in my career.
                        </p>

                        <p className="text-gray-700 leading-relaxed mb-4 text-sm">
                          I am proud of how the team has taken ownership and demonstrated resilience in the face of challenges.
                          Together, we have created a culture of trust and collaboration that will continue to strengthen the club's future.
                          I look forward to continuing this journey and supporting our members as they lead with passion and purpose.
                        </p>

                        <div className="mb-4">
                          <h5 className="font-semibold text-gray-900 mb-2 text-sm">Key Contributions</h5>
                          <ul className="text-gray-700 text-sm space-y-1 ml-4">
                            <li>ΓÇó Guided the club through the transformative Roar year 2024-25</li>
                            <li>ΓÇó Provided steady administrative support and mentorship</li>
                            <li>ΓÇó Encouraged innovative ideas and bold initiatives</li>
                            <li>ΓÇó Fostered a culture of trust and collaboration</li>
                            <li>ΓÇó Supported student leadership development</li>
                          </ul>
                        </div>

                        <div>
                          <h5 className="font-semibold text-gray-900 mb-2 text-sm">Vision for the Club</h5>
                          <p className="text-gray-700 text-sm">
                            Committed to continuing the journey of supporting passionate student leaders who drive meaningful change
                            in our community through service, innovation, and collaborative leadership.
                          </p>
                        </div>
                      </>
                    )}

                    <div className="text-center mt-4">
                      <Button
                        onClick={() => setShowStaffCoordinatorDetails(!showStaffCoordinatorDetails)}
                        variant="outline"
                        size="sm"
                        className="text-primary border-primary hover:bg-primary hover:text-white transition-colors w-full sm:w-auto"
                      >
                        {showStaffCoordinatorDetails ? 'Read Less' : 'Read More'}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </AnimationWrapper>
          </div>
        </div>
      </section>

      {/* Team Members Section */}
      <section className="section-padding">
        <div className="container-custom">
          <AnimationWrapper>
            <div className="text-center max-w-4xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-8">
                Our <span className="text-primary">Leadership</span>
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Meet the dedicated individuals who lead our club with passion and commitment.
              </p>
            </div>
          </AnimationWrapper>

          {/* Team Members Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto px-4 sm:px-6">

            {/* Rtr. Sanjith Kumar Sri Krishnan - President */}
            <AnimationWrapper delay={100}>
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:scale-[1.02]">
                <div className="p-6 sm:p-8">
                  {/* Team Member Photo */}
                  <div className="text-center mb-6">
                    <div className="w-40 h-40 sm:w-48 sm:h-48 rounded-full overflow-hidden border-4 border-white shadow-lg mx-auto transition-transform duration-300 hover:scale-105">
                      <img
                        src="https://res.cloudinary.com/drmwtmeg3/image/upload/v1755411667/sanjith_yfeoyr.jpg"
                        alt="Rtr. Sanjith Kumar Sri Krishnan - President"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>

                  {/* Team Member Details */}
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      Rtr. Sanjith Kumar Sri Krishnan
                    </h3>
                    <div className="flex flex-wrap items-center justify-center gap-2 mb-4">
                      <span className="bg-primary text-white px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap">
                        President
                      </span>
                      <span className="bg-primary text-white px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap">
                        Since 2024
                      </span>
                    </div>
                  </div>

                  <div className="prose prose-gray max-w-none">
                    <p className="text-gray-700 leading-relaxed mb-4 text-sm">
                      A dedicated and dynamic member of Rotary since 2021, Rtr. Sanjith Kumar Sri Krishnan has made a significant
                      impact through his leadership and passion for service.
                    </p>

                    {showPresidentDetails && (
                      <>
                        <div className="mb-4">
                          <h5 className="font-semibold text-gray-900 mb-2 text-sm">Early Achievements</h5>
                          <ul className="text-gray-700 text-sm space-y-1 ml-4">
                            <li>ΓÇó Sergeant-at-Arms, Interact Club of National Model (2021-2022)</li>
                            <li>ΓÇó Advisor and Deputy Secretary, Interact Club of National Model (2022-2023)</li>
                            <li>ΓÇó Recipient of the Best Interactor Award</li>
                          </ul>
                        </div>

                        <div className="mb-4">
                          <h5 className="font-semibold text-gray-900 mb-2 text-sm">Impactful Contributions</h5>
                          <ul className="text-gray-700 text-sm space-y-1 ml-4">
                            <li>ΓÇó Conducted over 40 dynamic events during school days, positively impacting society</li>
                            <li>ΓÇó Supported the club as All Avenue Chair, setting and planning events as a Rotaractor (2024-2025)</li>
                          </ul>
                        </div>

                        <div className="mb-4">
                          <h5 className="font-semibold text-gray-900 mb-2 text-sm">Leadership Roles</h5>
                          <ul className="text-gray-700 text-sm space-y-1 ml-4">
                            <li>ΓÇó Secretary Administration (2024-2025): Led administrative aspects, framed bylaws, and structured club functions</li>
                            <li>ΓÇó Led a team of 100 members</li>
                            <li>ΓÇó Best Secretary (2024-2025): Achieved outstanding membership growth and mentored the club for wholesome success</li>
                          </ul>
                        </div>

                        <div className="mb-4">
                          <h5 className="font-semibold text-gray-900 mb-2 text-sm">Transformational Impact</h5>
                          <ul className="text-gray-700 text-sm space-y-1 ml-4">
                            <li>ΓÇó Transformed the club from active to hyper-active, earning a Rolling Trophy with 10+ recognitions</li>
                            <li>ΓÇó Built a strong foundation for legacy and attracted potential Rotaractors</li>
                          </ul>
                        </div>

                        <div className="mb-4">
                          <h5 className="font-semibold text-gray-900 mb-2 text-sm">Future Vision</h5>
                          <p className="text-gray-700 text-sm">
                            Poised to lead the club in the new district with a clear vision and framework, set to unleash the legacy in 2025-2026.
                          </p>
                        </div>
                      </>
                    )}

                    <div className="text-center mt-4">
                      <Button
                        onClick={() => setShowPresidentDetails(!showPresidentDetails)}
                        variant="outline"
                        size="sm"
                        className="text-primary border-primary hover:bg-primary hover:text-white transition-colors"
                      >
                        {showPresidentDetails ? 'Read Less' : 'Read More'}
                      </Button>
                    </div>
                  </div>

                  {/* Awards and Achievements */}
                  <div className="mt-6 pt-4 border-t border-gray-200">
                    <h4 className="text-sm font-semibold text-gray-900 mb-3">Key Achievements</h4>
                    <div className="space-y-1 sm:space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="text-yellow-600 text-xs">≡ƒÅå</span>
                        <span className="text-[10px] sm:text-xs text-gray-700">Best Secretary 2024-2025</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-green-600 text-xs">Γ¡É</span>
                        <span className="text-[10px] sm:text-xs text-gray-700">Best Interactor Award</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-blue-600 text-xs">≡ƒÄ»</span>
                        <span className="text-[10px] sm:text-xs text-gray-700">Rolling Trophy with 10+ Recognition</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-purple-600 text-xs">≡ƒæÑ</span>
                        <span className="text-[10px] sm:text-xs text-gray-700">Led Team of 100 Members</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-orange-600 text-xs">≡ƒÜÇ</span>
                        <span className="text-[10px] sm:text-xs text-gray-700">40+ Impactful Events Conducted</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </AnimationWrapper>
            {/* Rtr. Haripriya - Secretary Administration */}
            <AnimationWrapper delay={300}>
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:scale-[1.02]">
                <div className="p-6 sm:p-8">
                  {/* Team Member Photo */}
                  <div className="text-center mb-6">
                    <div className="w-40 h-40 sm:w-48 sm:h-48 rounded-full overflow-hidden border-4 border-white shadow-lg mx-auto transition-transform duration-300 hover:scale-105">
                      <img
                        src="https://res.cloudinary.com/drmwtmeg3/image/upload/v1755411703/team-member-haripriya_gj96fq.jpg"
                        alt="Rtr. Haripriya - Secretary Administration"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>

                  {/* Team Member Details */}
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      Rtr. Haripriya
                    </h3>
                    <div className="flex flex-wrap items-center justify-center gap-2 mb-4">
                      <span className="bg-primary text-white px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap">
                        Secretary Administration
                      </span>
                      <span className="bg-primary text-white px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap">
                        Vision Year
                      </span>
                    </div>
                  </div>

                  <div className="prose prose-gray max-w-none">
                    <p className="text-gray-700 leading-relaxed mb-4 text-sm">
                      A Visionary Leader, A Creative Soul. Rtr. Haripriya has been a defining presence in the Roar Year of the
                      Rotaract Club of KPRCAS, embodying quiet strength and impactful leadership.
                    </p>

                    {showSecretaryDetails && (
                      <>
                        <div className="mb-4">
                          <h5 className="font-semibold text-gray-900 mb-2 text-sm">Leadership Journey</h5>
                          <p className="text-gray-700 text-sm mb-3">
                            As Vice President, she played a crucial role in club operationsΓÇöcoordinating with the board, tracking events,
                            resolving concerns, and maintaining seamless communication. Her calm, detail-oriented approach made her a strong
                            support system to the President and a dependable force within the team.
                          </p>
                        </div>

                        <div className="mb-4">
                          <h5 className="font-semibold text-gray-900 mb-2 text-sm">Key Achievements</h5>
                          <ul className="text-gray-700 text-sm space-y-1 ml-4">
                            <li>ΓÇó Event Chairperson of "Blooming Blossom" - Major District Priority Project</li>
                            <li>ΓÇó Impacted over 100 beneficiaries across Coimbatore and Tiruppur</li>
                            <li>ΓÇó Earned esteemed Roar Recognition from the District</li>
                            <li>ΓÇó Editor of the Roar Year Scrapbook - Creative documentation</li>
                          </ul>
                        </div>

                        <div className="mb-4">
                          <h5 className="font-semibold text-gray-900 mb-2 text-sm">District Representation</h5>
                          <p className="text-gray-700 text-sm">
                            Actively represented at district-level events such as Tanzanite, XVII District Conference, Rotabuzz,
                            Rotamind, the Incoming IDYE, and the District Awards. Her consistent presence reflects her dedication
                            to Rotaract's larger purpose and enthusiasm to grow through collaboration.
                          </p>
                        </div>

                        <div className="mb-4">
                          <h5 className="font-semibold text-gray-900 mb-2 text-sm">Current Role</h5>
                          <p className="text-gray-700 text-sm">
                            Continuing her commitment to service as Secretary - Administration for the Vision Year. With her proven
                            leadership, creative capabilities, and unwavering dedication, she is all set to contribute with renewed
                            purpose, adding value to every initiative she touches and leading with both heart and vision.
                          </p>
                        </div>
                      </>
                    )}

                    <div className="text-center mt-4">
                      <Button
                        onClick={() => setShowSecretaryDetails(!showSecretaryDetails)}
                        variant="outline"
                        size="sm"
                        className="text-primary border-primary hover:bg-primary hover:text-white transition-colors"
                      >
                        {showSecretaryDetails ? 'Read Less' : 'Read More'}
                      </Button>
                    </div>
                  </div>

                  {/* Awards and Achievements */}
                  <div className="mt-6 pt-4 border-t border-gray-200">
                    <h4 className="text-sm font-semibold text-gray-900 mb-3">Key Highlights</h4>
                    <div className="space-y-1 sm:space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="text-yellow-600 text-xs">≡ƒÅå</span>
                        <span className="text-[10px] sm:text-xs text-gray-700">Roar Recognition from District</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-green-600 text-xs">≡ƒî╕</span>
                        <span className="text-[10px] sm:text-xs text-gray-700">Blooming Blossom Project Lead</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-blue-600 text-xs">≡ƒôû</span>
                        <span className="text-[10px] sm:text-xs text-gray-700">Roar Year Scrapbook Editor</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-purple-600 text-xs">≡ƒæÑ</span>
                        <span className="text-[10px] sm:text-xs text-gray-700">100+ Beneficiaries Impacted</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-orange-600 text-xs">≡ƒÄ»</span>
                        <span className="text-[10px] sm:text-xs text-gray-700">District Events Representative</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </AnimationWrapper>
            {/* Rtr. Mounesh ΓÇô Secretary ΓÇô Communication */}
            <AnimationWrapper delay={500}>
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:scale-[1.02]">
                <div className="p-6 sm:p-8">
                  {/* Team Member Photo */}
                  <div className="text-center mb-6">
                    <div className="w-40 h-40 sm:w-48 sm:h-48 rounded-full overflow-hidden border-4 border-white shadow-lg mx-auto transition-transform duration-300 hover:scale-105">
                      <img
                        src="https://res.cloudinary.com/drmwtmeg3/image/upload/v1755411701/mounish_kblucw.jpg"
                        alt="Rtr. Mounesh ΓÇô Secretary ΓÇô Communication"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>

                  {/* Team Member Details */}
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      Rtr. Mounesh
                    </h3>
                    <div className="flex flex-wrap items-center justify-center gap-2 mb-4">
                      <span className="bg-primary text-white px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap">
                        Secretary ΓÇô Communication
                      </span>
                      <span className="bg-primary text-white px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap">
                        Former Treasurer
                      </span>
                    </div>
                  </div>

                  <div className="prose prose-gray max-w-none">
                    <p className="text-gray-700 leading-relaxed mb-4 text-sm">
                      Rtr. Mounesh began his Rotaract journey as Treasurer of the Rotaract Club of KPRCAS,
                      where his keen knowledge in managing finances ensured transparency and efficiency in the clubΓÇÖs operations.
                      His dedication and skill in handling responsibilities set the tone for his journey as a dependable leader.
                    </p>

                    {showSecretaryDetails && (
                      <>
                        <div className="mb-4">
                          <h5 className="font-semibold text-gray-900 mb-2 text-sm">District-Level Engagement</h5>
                          <p className="text-gray-700 text-sm mb-3">
                            Beyond his role as Treasurer, Mounesh showcased his activeness by enthusiastically participating
                            in numerous district-level events, reflecting his commitment to learning, collaboration, and fellowship.
                          </p>
                        </div>

                        <div className="mb-4">
                          <h5 className="font-semibold text-gray-900 mb-2 text-sm">Historic IDYE Contribution</h5>
                          <p className="text-gray-700 text-sm mb-3">
                            A defining milestone during his tenure was when the club proudly hosted its first-ever IDYE.
                            Behind the success of this grand initiative stood Mounesh, who served as one of the strongest pillars
                            of the eventΓÇöproviding both operational support and unwavering morale strength to the team.
                          </p>
                        </div>

                        <div className="mb-4">
                          <h5 className="font-semibold text-gray-900 mb-2 text-sm">Steadfast Leadership</h5>
                          <p className="text-gray-700 text-sm mb-3">
                            Throughout his journey, he has been a constant source of encouragement and stability, ensuring the smooth
                            functioning of the club and standing by his fellow Rotaractors with quiet resilience. His dedication, humility,
                            and reliability have made him a trusted presence within the club.
                          </p>
                        </div>

                        <div className="mb-4">
                          <h5 className="font-semibold text-gray-900 mb-2 text-sm">Current Role</h5>
                          <p className="text-gray-700 text-sm">
                            Recognizing his contributions and commitment, Rtr. Mounesh now serves as the Secretary ΓÇô Communication
                            for the Vision Year. With his experience, steadfast nature, and passion for service, he continues to
                            strengthen the spirit of teamwork, ensure effective communication, and add immense value to the clubΓÇÖs endeavors.
                          </p>
                        </div>
                      </>
                    )}

                    <div className="text-center mt-4">
                      <Button
                        onClick={() => setShowSecretaryDetails(!showSecretaryDetails)}
                        variant="outline"
                        size="sm"
                        className="text-primary border-primary hover:bg-primary hover:text-white transition-colors"
                      >
                        {showSecretaryDetails ? 'Read Less' : 'Read More'}
                      </Button>
                    </div>
                  </div>

                  {/* Awards and Achievements */}
                  <div className="mt-6 pt-4 border-t border-gray-200">
                    <h4 className="text-sm font-semibold text-gray-900 mb-3">Key Highlights</h4>
                    <div className="space-y-1 sm:space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="text-green-600 text-xs">≡ƒÆ░</span>
                        <span className="text-[10px] sm:text-xs text-gray-700">Financial Transparency as Treasurer</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-blue-600 text-xs">≡ƒîì</span>
                        <span className="text-[10px] sm:text-xs text-gray-700">Active Participation in District Events</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-purple-600 text-xs">≡ƒÅ¢∩╕Å</span>
                        <span className="text-[10px] sm:text-xs text-gray-700">Pillar of Support in IDYE</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-yellow-600 text-xs">≡ƒ¢í∩╕Å</span>
                        <span className="text-[10px] sm:text-xs text-gray-700">Reliable & Resilient Leader</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-orange-600 text-xs">≡ƒôó</span>
                        <span className="text-[10px] sm:text-xs text-gray-700">Secretary ΓÇô Communication (Vision Year)</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </AnimationWrapper>
            {/* Rtr.Saran G - Vice President */}
            <AnimationWrapper delay={200}>
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:scale-[1.02]">
                <div className="p-6 sm:p-8">
                  {/* Team Member Photo */}
                  <div className="text-center mb-6">
                    <div className="w-40 h-40 sm:w-48 sm:h-48 rounded-full overflow-hidden border-4 border-white shadow-lg mx-auto transition-transform duration-300 hover:scale-105">
                      <img
                        src="https://res.cloudinary.com/drmwtmeg3/image/upload/v1755412967/team-member-saran_rhfrcq.jpg"
                        alt="Rtr.Saran G - Vice President"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>

                  {/* Team Member Details */}
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      Rtr.Saran G
                    </h3>
                    <div className="flex flex-wrap items-center justify-center gap-2 mb-4">
                      <span className="bg-primary text-white px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap">
                        Vice President
                      </span>
                      <span className="bg-primary text-white px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap">
                        Since 2022
                      </span>
                    </div>
                  </div>

                  <div className="prose prose-gray max-w-none">
                    <p className="text-gray-700 leading-relaxed mb-4 text-sm">
                      Rtr.Saran G is serving the Rotaract Club of KPRCAS since 2022. This is his 4th year of Rotaraction.
                      He served in the Club as Community Service Chair, The Rotary Foundation Chair, District Priority
                      Projects Chair in the past three years.
                    </p>

                    {showVicePresidentDetails && (
                      <>
                        <p className="text-gray-700 leading-relaxed mb-4 text-sm">
                          Currently, he serves as Vice President with 100% commitment. As the DPP Chair he organized events
                          under the Theme BLOOMING in an admirable way and won the Outstanding DPP Performance Award from
                          the District and the our event BLOOMING BLOSSOM ≡ƒî╕ was also named as the BEST PROJECT for the Year.
                        </p>
                        <p className="text-gray-700 leading-relaxed text-sm mb-4">
                          He had also received Radiant Circle of Academic Excellence Award from the District for his exemplary
                          Performance in Rotaract as well as Academics.
                        </p>
                        {/* Awards and Achievements */}
                        <div className="mt-6 pt-4 border-t border-gray-200">
                          <h4 className="text-sm font-semibold text-gray-900 mb-3">Awards & Achievements</h4>
                          <div className="space-y-1 sm:space-y-2">
                            <div className="flex items-center gap-2">
                              <span className="text-yellow-600 text-xs">≡ƒÅå</span>
                              <span className="text-[10px] sm:text-xs text-gray-700">Outstanding DPP Performance Award</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-green-600 text-xs">≡ƒî╕</span>
                              <span className="text-[10px] sm:text-xs text-gray-700">BEST PROJECT - BLOOMING BLOSSOM</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-blue-600 text-xs">Γ¡É</span>
                              <span className="text-[10px] sm:text-xs text-gray-700">Radiant Circle of Academic Excellence Award</span>
                            </div>
                          </div>
                        </div>
                      </>
                    )}

                    <div className="text-center mt-4">
                      <Button
                        onClick={() => setShowVicePresidentDetails(!showVicePresidentDetails)}
                        variant="outline"
                        size="sm"
                        className="text-primary border-primary hover:bg-primary hover:text-white transition-colors"
                      >
                        {showVicePresidentDetails ? 'Read Less' : 'Read More'}
                      </Button>
                    </div>
                  </div>

                  {/* Awards and Achievements */}
                  <div className="mt-6 pt-4 border-t border-gray-200">
                    <h4 className="text-sm font-semibold text-gray-900 mb-3">Awards & Achievements</h4>
                    <div className="space-y-1 sm:space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="text-yellow-600 text-xs">≡ƒÅå</span>
                        <span className="text-[10px] sm:text-xs text-gray-700">Outstanding DPP Performance Award</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-green-600 text-xs">≡ƒî╕</span>
                        <span className="text-[10px] sm:text-xs text-gray-700">BEST PROJECT - BLOOMING BLOSSOM</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-blue-600 text-xs">Γ¡É</span>
                        <span className="text-[10px] sm:text-xs text-gray-700">Radiant Circle of Academic Excellence Award</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </AnimationWrapper>
            {/* Rtr. Pratheesh ΓÇô Special Aid to the President */}
            <AnimationWrapper delay={500}>
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:scale-[1.02]">
                <div className="p-8">

                  {/* Team Member Photo */}
                  <div className="text-center mb-6">
                    <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-white shadow-lg mx-auto transition-transform duration-300 hover:scale-105">
                      <img
                        src="https://res.cloudinary.com/drmwtmeg3/image/upload/v1755413221/prateesh_xfstxd.jpg"
                        alt="Rtr. Pratheesh ΓÇô Special Aid to the President"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>

                  {/* Team Member Details */}
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      Rtr. Pratheesh
                    </h3>
                    <div className="flex items-center justify-center gap-2 mb-4">
                      <span className="bg-primary text-white px-3 py-1 rounded-full text-sm font-semibold">
                        Special Aid to the President
                      </span>
                    </div>
                  </div>

                  {/* Description with Read More */}
                  <div className="prose prose-gray max-w-none">
                    <p className="text-gray-700 leading-relaxed mb-4 text-sm">
                      We are thrilled to welcome <span className="font-semibold">Rtr. Pratheesh</span>
                      to our leadership team in his new role as
                      <span className="font-semibold"> Special Aid to the President</span>. In this vital
                      position, he will serve as a key advisor and collaborator, working directly with the
                      President to ensure the seamless execution of our club's goals.
                    </p>

                    {showPratheeshDetails && (
                      <>
                        <div className="mb-4">
                          <h5 className="font-semibold text-gray-900 mb-2 text-sm">Dedication & Proactive Spirit</h5>
                          <p className="text-gray-700 text-sm mb-3">
                            His journey in Rotaract has been defined by his dedication and proactive spirit.
                            He brings a fresh perspective and a strategic mind, which will be instrumental in
                            supporting the various avenues of service and driving our projects forward.
                          </p>
                        </div>

                        <div className="mb-4">
                          <h5 className="font-semibold text-gray-900 mb-2 text-sm">Key Responsibilities</h5>
                          <p className="text-gray-700 text-sm mb-3">
                            His responsibilities will include coordinating with different committees,
                            providing support for major initiatives, and helping to maintain the high
                            standards of our clubΓÇÖs work.
                          </p>
                        </div>

                        <div className="mb-4">
                          <h5 className="font-semibold text-gray-900 mb-2 text-sm">Inspiring Teamwork</h5>
                          <p className="text-gray-700 text-sm mb-3">
                            Beyond his official duties, he is known for his ability to inspire teamwork
                            and foster a positive, collaborative environment among members.
                          </p>
                        </div>

                        <div className="mb-4">
                          <h5 className="font-semibold text-gray-900 mb-2 text-sm">Commitment to Service</h5>
                          <p className="text-gray-700 text-sm">
                            His commitment to the Rotaract motto
                            <span className="italic"> ΓÇ£Service Above SelfΓÇ¥</span> is evident in everything he does.
                            We are confident that his leadership and passion will be a tremendous asset to
                            our club as we strive to make a lasting impact.
                          </p>
                        </div>
                      </>
                    )}

                    <div className="text-center mt-4">
                      <Button
                        onClick={() => setShowPratheeshDetails(!showPratheeshDetails)}
                        variant="outline"
                        size="sm"
                        className="text-primary border-primary hover:bg-primary hover:text-white transition-colors"
                      >
                        {showPratheeshDetails ? 'Read Less' : 'Read More'}
                      </Button>
                    </div>
                  </div>

                  {/* Key Highlights */}
                  <div className="mt-6 pt-4 border-t border-gray-200">
                    <h4 className="text-sm font-semibold text-gray-900 mb-3">Key Highlights</h4>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="text-blue-600 text-xs">≡ƒñ¥</span>
                        <span className="text-xs text-gray-700">Advisor & Collaborator with the President</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-green-600 text-xs">≡ƒÜÇ</span>
                        <span className="text-xs text-gray-700">Proactive & Strategic Mindset</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-purple-600 text-xs">≡ƒôî</span>
                        <span className="text-xs text-gray-700">Coordinates with Committees & Major Initiatives</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-yellow-600 text-xs">≡ƒîƒ</span>
                        <span className="text-xs text-gray-700">Fosters Teamwork & Collaboration</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-pink-600 text-xs">Γ£¿</span>
                        <span className="text-xs text-gray-700">Embodies ΓÇ£Service Above SelfΓÇ¥</span>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </AnimationWrapper>

            {/* Rtr. Netra - Joint Secretary */}
            <AnimationWrapper delay={400}>
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:scale-[1.02]">
                <div className="p-6 sm:p-8">
                  {/* Team Member Photo */}
                  <div className="text-center mb-6">
                    <div className="w-40 h-40 sm:w-48 sm:h-48 rounded-full overflow-hidden border-4 border-white shadow-lg mx-auto transition-transform duration-300 hover:scale-105">
                      <img
                        src="https://res.cloudinary.com/drmwtmeg3/image/upload/v1755411704/team-member-netra_obbhqr.jpg"
                        alt="Rtr. Netra - Joint Secretary"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>

                  {/* Team Member Details */}
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      Rtr. Netra
                    </h3>
                    <div className="flex flex-wrap items-center justify-center gap-2 mb-4">
                      <span className="bg-primary text-white px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap">
                        Joint Secretary
                      </span>
                      <span className="bg-primary text-white px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap">
                        3rd Year
                      </span>
                    </div>
                  </div>

                  <div className="prose prose-gray max-w-none">
                    <p className="text-gray-700 leading-relaxed mb-4 text-sm">
                      Netra, the Joint Secretary of the Rotaract Club of KPRCAS, has been a dynamic and committed member of the club,
                      showcasing exceptional leadership and a deep passion for community service.
                    </p>

                    {showJointSecretaryDetails && (
                      <>
                        <div className="mb-4">
                          <h5 className="font-semibold text-gray-900 mb-2 text-sm">Leadership Journey</h5>
                          <p className="text-gray-700 text-sm mb-3">
                            Throughout her journey, she has actively contributed to the growth and visibility of the club by taking part
                            in impactful initiatives and fostering youth engagement. Her consistent dedication and ability to work
                            collaboratively have made her a respected and inspiring figure within the Rotaract community.
                          </p>
                        </div>

                        <div className="mb-4">
                          <h5 className="font-semibold text-gray-900 mb-2 text-sm">World Record Achievement</h5>
                          <p className="text-gray-700 text-sm mb-3">
                            One of Netra's most remarkable achievements is her contribution to a world record in Bharathanatyam,
                            performed with 1,200 students through the Rotaract Club. This extraordinary feat stands as a symbol of
                            cultural pride, discipline, and unity, and reflects her dedication to preserving and promoting India's
                            classical art forms.
                          </p>
                          <p className="text-gray-700 text-sm mb-3">
                            Her efforts played a key role in coordinating and bringing together a large group of performers, making
                            the event a memorable moment in both club and cultural history.
                          </p>
                        </div>

                        <div className="mb-4">
                          <h5 className="font-semibold text-gray-900 mb-2 text-sm">Current Role & Growth</h5>
                          <p className="text-gray-700 text-sm">
                            Now in her third year with the Rotaract Club, Netra continues to grow as a leader and changemaker.
                            Her journey reflects a perfect balance of passion, cultural commitment, and organizational skills.
                          </p>
                        </div>
                      </>
                    )}

                    <div className="text-center mt-4">
                      <Button
                        onClick={() => setShowJointSecretaryDetails(!showJointSecretaryDetails)}
                        variant="outline"
                        size="sm"
                        className="text-primary border-primary hover:bg-primary hover:text-white transition-colors"
                      >
                        {showJointSecretaryDetails ? 'Read Less' : 'Read More'}
                      </Button>
                    </div>
                  </div>

                  {/* Awards and Achievements */}
                  <div className="mt-6 pt-4 border-t border-gray-200">
                    <h4 className="text-sm font-semibold text-gray-900 mb-3">Key Highlights</h4>
                    <div className="space-y-1 sm:space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="text-yellow-600 text-xs">≡ƒÅå</span>
                        <span className="text-[10px] sm:text-xs text-gray-700">World Record - Bharathanatyam</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-green-600 text-xs">≡ƒÄ¡</span>
                        <span className="text-[10px] sm:text-xs text-gray-700">1,200 Students Coordinated</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-blue-600 text-xs">Γ¡É</span>
                        <span className="text-[10px] sm:text-xs text-gray-700">Cultural Preservation Champion</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-purple-600 text-xs">≡ƒæÑ</span>
                        <span className="text-[10px] sm:text-xs text-gray-700">Youth Engagement Leader</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-orange-600 text-xs">≡ƒÜÇ</span>
                        <span className="text-[10px] sm:text-xs text-gray-700">3rd Year Dedicated Member</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </AnimationWrapper>

            {/* Rtr. Sanjay Harish - Past President */}
            <AnimationWrapper delay={500}>
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:scale-[1.02]">
                <div className="p-6 sm:p-8">
                  {/* Team Member Photo */}
                  <div className="text-center mb-6">
                    <div className="w-40 h-40 sm:w-48 sm:h-48 rounded-full overflow-hidden border-4 border-white shadow-lg mx-auto transition-transform duration-300 hover:scale-105">
                      <img
                        src="https://res.cloudinary.com/drmwtmeg3/image/upload/v1755411708/team-member-sanjay_lpxwng.jpg"
                        alt="Rtr. Sanjay Harish - Past President"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>

                  {/* Team Member Details */}
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      Rtr. Sanjay Harish
                    </h3>
                    <div className="flex flex-wrap items-center justify-center gap-2 mb-4">
                      <span className="bg-primary text-white px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap">
                        Past President
                      </span>
                      <span className="bg-primary text-white px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap">
                        Mentor
                      </span>
                    </div>
                  </div>

                  <div className="prose prose-gray max-w-none">
                    <p className="text-gray-700 leading-relaxed mb-4 text-sm">
                      Rtr. Sanjay Harish, Past President of the Rotaract Club of KPRCAS, is known for his exceptional leadership,
                      vision, and unwavering dedication to the ideals of Rotaract.
                    </p>

                    {showPastPresidentDetails && (
                      <>
                        <div className="mb-4">
                          <h5 className="font-semibold text-gray-900 mb-2 text-sm">Presidential Leadership</h5>
                          <p className="text-gray-700 text-sm mb-3">
                            During his tenure, he played a pivotal role in elevating the club's presence through innovative projects,
                            impactful community service, and strong team-building initiatives. Under his guidance, the club reached
                            new milestones and gained recognition for its vibrant activities and strong member engagement.
                          </p>
                        </div>

                        <div className="mb-4">
                          <h5 className="font-semibold text-gray-900 mb-2 text-sm">Leadership Philosophy</h5>
                          <p className="text-gray-700 text-sm mb-3">
                            Sanjay's presidency was marked by a focus on inclusivity, professionalism, and service excellence.
                            He encouraged members to step out of their comfort zones and take up responsibilities that would develop
                            both personal and professional skills.
                          </p>
                          <p className="text-gray-700 text-sm mb-3">
                            His approachable nature and commitment to teamwork created a motivating environment for everyone involved.
                            He also encouraged members to take up responsibilities that would develop both personal and professional skills.
                          </p>
                        </div>

                        <div className="mb-4">
                          <h5 className="font-semibold text-gray-900 mb-2 text-sm">Ongoing Impact</h5>
                          <p className="text-gray-700 text-sm">
                            Even after completing his term, Sanjay Harish continues to be an active mentor and guiding force within
                            the club. His journey stands as an inspiration for future leaders, reflecting the spirit of service above
                            self and the lasting impact of strong Rotaract leadership.
                          </p>
                        </div>
                      </>
                    )}

                    <div className="text-center mt-4">
                      <Button
                        onClick={() => setShowPastPresidentDetails(!showPastPresidentDetails)}
                        variant="outline"
                        size="sm"
                        className="text-primary border-primary hover:bg-primary hover:text-white transition-colors"
                      >
                        {showPastPresidentDetails ? 'Read Less' : 'Read More'}
                      </Button>
                    </div>
                  </div>

                  {/* Awards and Achievements */}
                  <div className="mt-6 pt-4 border-t border-gray-200">
                    <h4 className="text-sm font-semibold text-gray-900 mb-3">Key Highlights</h4>
                    <div className="space-y-1 sm:space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="text-yellow-600 text-xs">≡ƒÅå</span>
                        <span className="text-[10px] sm:text-xs text-gray-700">Exceptional Leadership</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-green-600 text-xs">≡ƒÄ»</span>
                        <span className="text-[10px] sm:text-xs text-gray-700">Innovative Projects</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-blue-600 text-xs">Γ¡É</span>
                        <span className="text-[10px] sm:text-xs text-gray-700">Service Excellence</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-purple-600 text-xs">≡ƒæÑ</span>
                        <span className="text-[10px] sm:text-xs text-gray-700">Team Building Expert</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-orange-600 text-xs">≡ƒÜÇ</span>
                        <span className="text-[10px] sm:text-xs text-gray-700">Active Mentor</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </AnimationWrapper>
            {/* Rtr. Midun ΓÇô Treasurer */}
            <AnimationWrapper delay={500}>
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:scale-[1.02]">
                <div className="p-6 sm:p-8">
                  {/* Team Member Photo */}
                  <div className="text-center mb-6">
                    <div className="w-40 h-40 sm:w-48 sm:h-48 rounded-full overflow-hidden border-4 border-white shadow-lg mx-auto transition-transform duration-300 hover:scale-105">
                      <img
                        src="https://res.cloudinary.com/drmwtmeg3/image/upload/v1755411704/team-member-midun_gxbwsp.jpg"
                        alt="Rtr. Midun ΓÇô Treasurer"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>

                  {/* Team Member Details */}
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      Rtr. Midun
                    </h3>
                    <div className="flex flex-wrap items-center justify-center gap-2 mb-4">
                      <span className="bg-primary text-white px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap">
                        Treasurer
                      </span>
                    </div>
                  </div>

                  <div className="prose prose-gray max-w-none">
                    <p className="text-gray-700 leading-relaxed mb-4 text-sm">
                      A passionate and dedicated individual who believes in hard work, teamwork, and balance in both personal and professional life.
                      With a strong interest in sports, Midun enjoys playing cricket, which teaches him discipline, strategy, and collaborationΓÇövalues
                      that make him a reliable team player both on and off the field.
                    </p>

                    {showTreasurerDetails && (
                      <>
                        <div className="mb-4">
                          <h5 className="font-semibold text-gray-900 mb-2 text-sm">Calm Under Pressure</h5>
                          <p className="text-gray-700 text-sm mb-3">
                            One of his greatest strengths is the ability to manage work pressure effectively. He remains calm and focused during
                            challenging situations, ensuring clarity, efficiency, and responsibility in everything he undertakes.
                            This quality has earned him leadership opportunities and the trust of his peers.
                          </p>
                        </div>

                        <div className="mb-4">
                          <h5 className="font-semibold text-gray-900 mb-2 text-sm">Treasurer Role</h5>
                          <p className="text-gray-700 text-sm mb-3">
                            Currently serving as the Treasurer of the Rotaract Club, Midun manages financial responsibilities with accuracy and
                            transparency. This role has sharpened his organizational skills and reinforced his sense of accountability in handling
                            key tasks for the club.
                          </p>
                        </div>

                        <div className="mb-4">
                          <h5 className="font-semibold text-gray-900 mb-2 text-sm">Vision & Goals</h5>
                          <p className="text-gray-700 text-sm">
                            Looking ahead, his ultimate goal is to lead his family with dignity and provide them with a life filled with comfort,
                            respect, and happiness. He firmly believes in continuous growth, learning from experiences, and moving forward with
                            determination and resilience.
                          </p>
                        </div>
                      </>
                    )}

                    <div className="text-center mt-4">
                      <Button
                        onClick={() => setShowTreasurerDetails(!showTreasurerDetails)}
                        variant="outline"
                        size="sm"
                        className="text-primary border-primary hover:bg-primary hover:text-white transition-colors"
                      >
                        {showTreasurerDetails ? 'Read Less' : 'Read More'}
                      </Button>
                    </div>
                  </div>

                  {/* Awards and Achievements */}
                  <div className="mt-6 pt-4 border-t border-gray-200">
                    <h4 className="text-sm font-semibold text-gray-900 mb-3">Key Highlights</h4>
                    <div className="space-y-1 sm:space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="text-green-600 text-xs">≡ƒÅÅ</span>
                        <span className="text-[10px] sm:text-xs text-gray-700">Cricket Enthusiast & Team Player</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-blue-600 text-xs">≡ƒºÿ</span>
                        <span className="text-[10px] sm:text-xs text-gray-700">Calm & Focused Under Pressure</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-yellow-600 text-xs">≡ƒÆ╝</span>
                        <span className="text-[10px] sm:text-xs text-gray-700">Financial Accuracy & Transparency</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-purple-600 text-xs">≡ƒôè</span>
                        <span className="text-[10px] sm:text-xs text-gray-700">Organizational & Leadership Skills</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-orange-600 text-xs">≡ƒÄ»</span>
                        <span className="text-[10px] sm:text-xs text-gray-700">Vision of Family Leadership & Growth</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </AnimationWrapper>
            {/* Rtr. Prabhagar S ΓÇô Community Service Director */}
            <AnimationWrapper delay={500}>
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:scale-[1.02]">
                <div className="p-6 sm:p-8">
                  {/* Team Member Photo */}
                  <div className="text-center mb-6">
                    <div className="w-40 h-40 sm:w-48 sm:h-48 rounded-full overflow-hidden border-4 border-white shadow-lg mx-auto transition-transform duration-300 hover:scale-105">
                      <img
                        src="https://res.cloudinary.com/drmwtmeg3/image/upload/v1755411707/team-member-prabhagar_x5ggfk.jpg"
                        alt="Rtr. Prabhagar S ΓÇô Community Service Director"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>

                  {/* Team Member Details */}
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      Rtr. Prabhagar S
                    </h3>
                    <div className="flex flex-wrap items-center justify-center gap-2 mb-4">
                      <span className="bg-primary text-white px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap">
                        Community Service Director
                      </span>
                    </div>
                  </div>

                  <div className="prose prose-gray max-w-none">
                    <p className="text-gray-700 leading-relaxed mb-4 text-sm">
                      As the Community Service Director of our Rotaract Club, Prabhagar takes pride in serving with confidence,
                      bold vision, and an unwavering commitment to positive change. His journey in service is driven by a passion
                      for making a difference and standing up for those in need.
                    </p>

                    {showCommunityDetails && (
                      <>
                        <div className="mb-4">
                          <h5 className="font-semibold text-gray-900 mb-2 text-sm">Active Participation</h5>
                          <p className="text-gray-700 text-sm mb-3">
                            Being an active member, he stays involved in every stage of projectsΓÇöfrom planning to executionΓÇöensuring
                            that efforts create a real impact in the lives of others. Consistency, dedication, and teamwork are his
                            guiding principles.
                          </p>
                        </div>

                        <div className="mb-4">
                          <h5 className="font-semibold text-gray-900 mb-2 text-sm">Bold & Confident Leadership</h5>
                          <p className="text-gray-700 text-sm mb-3">
                            Confidence allows him to take the lead in building partnerships, organizing outreach programs, and inspiring
                            others to join the journey of service. He is bold in his approachΓÇönever afraid to step out of his comfort
                            zone and represent the club with pride.
                          </p>
                        </div>

                        <div className="mb-4">
                          <h5 className="font-semibold text-gray-900 mb-2 text-sm">Vision Through Service</h5>
                          <p className="text-gray-700 text-sm">
                            Through service, Prabhagar aims to inspire, empower, and uplift communities. His vision is to build a stronger,
                            kinder, and more united society where teamwork creates lasting change.
                          </p>
                        </div>
                      </>
                    )}

                    <div className="text-center mt-4">
                      <Button
                        onClick={() => setShowCommunityDetails(!showCommunityDetails)}
                        variant="outline"
                        size="sm"
                        className="text-primary border-primary hover:bg-primary hover:text-white transition-colors"
                      >
                        {showCommunityDetails ? 'Read Less' : 'Read More'}
                      </Button>
                    </div>
                  </div>

                  {/* Awards and Achievements */}
                  <div className="mt-6 pt-4 border-t border-gray-200">
                    <h4 className="text-sm font-semibold text-gray-900 mb-3">Key Highlights</h4>
                    <div className="space-y-1 sm:space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="text-green-600 text-xs">≡ƒñ¥</span>
                        <span className="text-[10px] sm:text-xs text-gray-700">Passionate Community Service Leader</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-blue-600 text-xs">ΓÜí</span>
                        <span className="text-[10px] sm:text-xs text-gray-700">Bold & Confident Decision Maker</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-yellow-600 text-xs">≡ƒôï</span>
                        <span className="text-[10px] sm:text-xs text-gray-700">Hands-On in Planning & Execution</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-purple-600 text-xs">≡ƒîì</span>
                        <span className="text-[10px] sm:text-xs text-gray-700">Impactful Outreach & Partnerships</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-orange-600 text-xs">Γ£¿</span>
                        <span className="text-[10px] sm:text-xs text-gray-700">Inspires & Empowers Communities</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </AnimationWrapper>
            {/* Rtr. Mirthula R ΓÇô International Service Director */}
            <AnimationWrapper delay={500}>
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:scale-[1.02]">
                <div className="p-6 sm:p-8">
                  {/* Team Member Photo */}
                  <div className="text-center mb-6">
                    <div className="w-40 h-40 sm:w-48 sm:h-48 rounded-full overflow-hidden border-4 border-white shadow-lg mx-auto transition-transform duration-300 hover:scale-105">
                      <img
                        src="https://res.cloudinary.com/drmwtmeg3/image/upload/v1755411704/team-member-mirthural_shkrm3.jpg"
                        alt="Rtr. Mirthula R ΓÇô International Service Director"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>

                  {/* Team Member Details */}
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      Rtr. Mirthula R
                    </h3>
                    <div className="flex flex-wrap items-center justify-center gap-2 mb-4">
                      <span className="bg-primary text-white px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap">
                        International Service Director
                      </span>
                    </div>
                  </div>

                  <div className="prose prose-gray max-w-none">
                    <p className="text-gray-700 leading-relaxed mb-4 text-sm">
                      As International Service Director, Mirthula considers herself a person who is constantly learning and evolving.
                      She believes that life is about growth, and embraces every opportunity that comes her way. Her curious and
                      open-minded nature allows her to adapt to new situations and connect with people from diverse backgrounds.
                    </p>

                    {showInternationalDetails && (
                      <>
                        <div className="mb-4">
                          <h5 className="font-semibold text-gray-900 mb-2 text-sm">Academic & Professional Balance</h5>
                          <p className="text-gray-700 text-sm mb-3">
                            Mirthula strives to balance both academics and practical experiences. She enjoys taking up responsibilities,
                            discovering her strengths, and working on her weaknesses. While teamwork excites her, she also values independence
                            and self-reliance when needed.
                          </p>
                        </div>

                        <div className="mb-4">
                          <h5 className="font-semibold text-gray-900 mb-2 text-sm">Personal Values & Interests</h5>
                          <p className="text-gray-700 text-sm mb-3">
                            Honesty, kindness, and respect are qualities she holds close. In her free time, she loves reading, exploring
                            new ideas, and engaging in meaningful conversations. She also nurtures creativity and problem-solving in
                            her everyday life.
                          </p>
                        </div>

                        <div className="mb-4">
                          <h5 className="font-semibold text-gray-900 mb-2 text-sm">Vision & Contribution</h5>
                          <p className="text-gray-700 text-sm">
                            A motivated and enthusiastic individual, Mirthula is determined to make positive contributions wherever she goes.
                            Her goal is to keep improving herself and use her skills to benefit others, strengthening the spirit of
                            international fellowship and collaboration in Rotaract.
                          </p>
                        </div>
                      </>
                    )}

                    <div className="text-center mt-4">
                      <Button
                        onClick={() => setShowInternationalDetails(!showInternationalDetails)}
                        variant="outline"
                        size="sm"
                        className="text-primary border-primary hover:bg-primary hover:text-white transition-colors"
                      >
                        {showInternationalDetails ? 'Read Less' : 'Read More'}
                      </Button>
                    </div>
                  </div>

                  {/* Awards and Achievements */}
                  <div className="mt-6 pt-4 border-t border-gray-200">
                    <h4 className="text-sm font-semibold text-gray-900 mb-3">Key Highlights</h4>
                    <div className="space-y-1 sm:space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="text-blue-600 text-xs">≡ƒîÉ</span>
                        <span className="text-[10px] sm:text-xs text-gray-700">International Service Advocate</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-green-600 text-xs">≡ƒôÜ</span>
                        <span className="text-[10px] sm:text-xs text-gray-700">Balances Learning & Practical Experience</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-purple-600 text-xs">≡ƒñ¥</span>
                        <span className="text-[10px] sm:text-xs text-gray-700">Team-Oriented & Independent Worker</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-yellow-600 text-xs">≡ƒÆí</span>
                        <span className="text-[10px] sm:text-xs text-gray-700">Creative Thinker & Problem Solver</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-orange-600 text-xs">Γ£¿</span>
                        <span className="text-[10px] sm:text-xs text-gray-700">Motivated & Positive Contributor</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </AnimationWrapper>
            {/* Rtr. Indupriya S ΓÇô Community Service Chair */}
            <AnimationWrapper delay={500}>
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:scale-[1.02]">
                <div className="p-6 sm:p-8">
                  {/* Team Member Photo */}
                  <div className="text-center mb-6">
                    <div className="w-40 h-40 sm:w-48 sm:h-48 rounded-full overflow-hidden border-4 border-white shadow-lg mx-auto transition-transform duration-300 hover:scale-105">
                      <img
                        src="https://res.cloudinary.com/drmwtmeg3/image/upload/v1755411703/team-member-indupriya_emom2c.jpg"
                        alt="Rtr. Indupriya S ΓÇô Community Service Chair"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>

                  {/* Team Member Details */}
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      Rtr. Indupriya S
                    </h3>
                    <div className="flex flex-wrap items-center justify-center gap-2 mb-4">
                      <span className="bg-primary text-white px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap">
                        Community Service Chair
                      </span>
                    </div>
                  </div>

                  <div className="prose prose-gray max-w-none">
                    <p className="text-gray-700 leading-relaxed mb-4 text-sm">
                      Being the Community Service Chair of our club is not just a role for Indupriya,
                      it is a responsibility she truly values. Always active and committed, she believes
                      in giving her best in everything she takes up. Community service has taught her that
                      even the smallest effort can bring a smile to someoneΓÇÖs face, and that is what motivates her every day.
                    </p>

                    {showCommunityChairDetails && (
                      <>
                        <div className="mb-4">
                          <h5 className="font-semibold text-gray-900 mb-2 text-sm">Adaptability & Teamwork</h5>
                          <p className="text-gray-700 text-sm mb-3">
                            Indupriya adapts quickly to situations and people, which helps her contribute effectively
                            across different projects. Whether itΓÇÖs planning, organizing, or hands-on execution, she gives
                            her fullest effort. With bold and clear communication, she shares ideas openly while also listening
                            to others, ensuring teamwork remains at the core of every initiative.
                          </p>
                        </div>

                        <div className="mb-4">
                          <h5 className="font-semibold text-gray-900 mb-2 text-sm">Calm & Practical Leadership</h5>
                          <p className="text-gray-700 text-sm mb-3">
                            She handles challenges calmly and practically, believing that every obstacle is an opportunity to prove
                            that with the right mindset, solutions can always be found. As a potential leader, she never hesitates
                            to take responsibility and works tirelessly until goals are achieved.
                          </p>
                        </div>

                        <div className="mb-4">
                          <h5 className="font-semibold text-gray-900 mb-2 text-sm">Vision as Community Service Chair</h5>
                          <p className="text-gray-700 text-sm">
                            As Community Service Chair, her only aim is to create projects that truly make a difference
                            in peopleΓÇÖs livesΓÇöuplifting communities with compassion, action, and dedication.
                          </p>
                        </div>
                      </>
                    )}

                    <div className="text-center mt-4">
                      <Button
                        onClick={() => setShowCommunityChairDetails(!showCommunityChairDetails)}
                        variant="outline"
                        size="sm"
                        className="text-primary border-primary hover:bg-primary hover:text-white transition-colors"
                      >
                        {showCommunityChairDetails ? 'Read Less' : 'Read More'}
                      </Button>
                    </div>
                  </div>

                  {/* Key Highlights */}
                  <div className="mt-6 pt-4 border-t border-gray-200">
                    <h4 className="text-sm font-semibold text-gray-900 mb-3">Key Highlights</h4>
                    <div className="space-y-1 sm:space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="text-green-600 text-xs">≡ƒî▒</span>
                        <span className="text-[10px] sm:text-xs text-gray-700">Dedicated to Community Impact</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-blue-600 text-xs">≡ƒñ¥</span>
                        <span className="text-[10px] sm:text-xs text-gray-700">Strong Team Player & Communicator</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-yellow-600 text-xs">≡ƒºÿ</span>
                        <span className="text-[10px] sm:text-xs text-gray-700">Handles Challenges Calmly & Practically</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-purple-600 text-xs">≡ƒÆ¬</span>
                        <span className="text-[10px] sm:text-xs text-gray-700">Hardworking & Responsible Leader</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-pink-600 text-xs">Γ£¿</span>
                        <span className="text-[10px] sm:text-xs text-gray-700">Passionate About Service Projects</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </AnimationWrapper>
            {/* Rtr. Monisha ΓÇô Chair, District Priority Projects */}
            <AnimationWrapper delay={500}>
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:scale-[1.02]">
                <div className="p-6 sm:p-8">

                  {/* Team Member Photo */}
                  <div className="text-center mb-6">
                    <div className="w-40 h-40 sm:w-48 sm:h-48 rounded-full overflow-hidden border-4 border-white shadow-lg mx-auto transition-transform duration-300 hover:scale-105">
                      <img
                        src="https://res.cloudinary.com/drmwtmeg3/image/upload/v1755411704/team-member-monisha_jpfpnu.jpg"
                        alt="Rtr. Monisha ΓÇô Chair, District Priority Projects"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>

                  {/* Team Member Details */}
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      Rtr. Monisha
                    </h3>
                    <div className="flex flex-wrap items-center justify-center gap-2 mb-4">
                      <span className="bg-primary text-white px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap">
                        Chair ΓÇô District Priority Projects
                      </span>
                    </div>
                  </div>

                  {/* Description with Read More */}
                  <div className="prose prose-gray max-w-none">
                    <p className="text-gray-700 leading-relaxed mb-4 text-sm">
                      I am Rtr. Monisha, currently serving as the Chair ΓÇô District Priority Projects of the Rotaract Club of KPRCAS.
                      Pursuing my studies at KPRCAS, I strive to grow as an individual who can make a meaningful difference in society
                      through both academics and Rotaract.
                    </p>

                    {showMonishaDetails && (
                      <>
                        <div className="mb-4">
                          <h5 className="font-semibold text-gray-900 mb-2 text-sm">Passion & Belief</h5>
                          <p className="text-gray-700 text-sm mb-3">
                            My passion lies in leadership, community service, and personal development, and I believe Rotaract
                            provides the perfect platform to bring these together.
                          </p>
                        </div>

                        <div className="mb-4">
                          <h5 className="font-semibold text-gray-900 mb-2 text-sm">Rotaract Journey</h5>
                          <p className="text-gray-700 text-sm mb-3">
                            Being part of this club has not only shaped my skills but also connected me with like-minded individuals
                            who share the vision of ΓÇ£Service Above Self.ΓÇ¥
                          </p>
                        </div>

                        <div className="mb-4">
                          <h5 className="font-semibold text-gray-900 mb-2 text-sm">Creativity & Craft</h5>
                          <p className="text-gray-700 text-sm mb-3">
                            Alongside my academic and Rotaract journey, I nurture my creativity through crocheting, a craft that
                            reflects patience and passion for creating meaningful work.
                          </p>
                        </div>

                        <div className="mb-4">
                          <h5 className="font-semibold text-gray-900 mb-2 text-sm">Vision & Goals</h5>
                          <p className="text-gray-700 text-sm">
                            As part of the Rotaract movement, my goal is to continue learning, growing, and serving with dedication
                            to achieve impactful results!
                          </p>
                        </div>
                      </>
                    )}

                    <div className="text-center mt-4">
                      <Button
                        onClick={() => setShowMonishaDetails(!showMonishaDetails)}
                        variant="outline"
                        size="sm"
                        className="text-primary border-primary hover:bg-primary hover:text-white transition-colors"
                      >
                        {showMonishaDetails ? 'Read Less' : 'Read More'}
                      </Button>
                    </div>
                  </div>

                  {/* Key Highlights */}
                  <div className="mt-6 pt-4 border-t border-gray-200">
                    <h4 className="text-sm font-semibold text-gray-900 mb-3">Key Highlights</h4>
                    <div className="space-y-1 sm:space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="text-blue-600 text-xs">≡ƒÅà</span>
                        <span className="text-[10px] sm:text-xs text-gray-700">Chair ΓÇô District Priority Projects</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-green-600 text-xs">≡ƒñ¥</span>
                        <span className="text-[10px] sm:text-xs text-gray-700">Leadership, Service & Personal Growth</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-purple-600 text-xs">≡ƒº╢</span>
                        <span className="text-[10px] sm:text-xs text-gray-700">Creative Thinker (Crocheting)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-yellow-600 text-xs">≡ƒÄ»</span>
                        <span className="text-[10px] sm:text-xs text-gray-700">Impact-Oriented Vision</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-orange-600 text-xs">≡ƒîƒ</span>
                        <span className="text-[10px] sm:text-xs text-gray-700">Embodies ΓÇ£Service Above SelfΓÇ¥</span>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </AnimationWrapper>
            {/* Rtr. Rithanya L ΓÇô Director, Professional Services */}
            <AnimationWrapper delay={500}>
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:scale-[1.02]">
                <div className="p-6 sm:p-8">

                  {/* Team Member Photo */}
                  <div className="text-center mb-6">
                    <div className="w-40 h-40 sm:w-48 sm:h-48 rounded-full overflow-hidden border-4 border-white shadow-lg mx-auto transition-transform duration-300 hover:scale-105">
                      <img
                        src="https://res.cloudinary.com/drmwtmeg3/image/upload/v1755413228/rithanaya_m5iwib.jpg"
                        alt="Rtr. Rithanya L ΓÇô Director, Professional Services"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>

                  {/* Team Member Details */}
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      Rtr. Rithanya L
                    </h3>
                    <div className="flex flex-wrap items-center justify-center gap-2 mb-4">
                      <span className="bg-primary text-white px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap">
                        Director ΓÇô Professional Services
                      </span>
                    </div>
                  </div>

                  {/* Description with Read More */}
                  <div className="prose prose-gray max-w-none">
                    <p className="text-gray-700 leading-relaxed mb-4 text-sm">
                      I am Rtr. Rithanya L, proudly serving as the Director ΓÇô Professional Services of the Rotaract Club of KPRCAS.
                      At KPRCAS, I strive to create a balance between academics and Rotaract, shaping myself into an individual who
                      can bring purposeful change to society.
                    </p>

                    {showRithanyaDetails && (
                      <>
                        <div className="mb-4">
                          <h5 className="font-semibold text-gray-900 mb-2 text-sm">Passion & Belief</h5>
                          <p className="text-gray-700 text-sm mb-3">
                            With a passion for leadership, community service, and personal growth, I see Rotaract as more than
                            just a platformΓÇöit is a movement that empowers me to transform ideas into action.
                          </p>
                        </div>

                        <div className="mb-4">
                          <h5 className="font-semibold text-gray-900 mb-2 text-sm">Rotaract Journey</h5>
                          <p className="text-gray-700 text-sm mb-3">
                            This journey has enriched my skills while connecting me with passionate changemakers who share
                            the vision of ΓÇ£Service with Impact.ΓÇ¥
                          </p>
                        </div>

                        <div className="mb-4">
                          <h5 className="font-semibold text-gray-900 mb-2 text-sm">Creativity & Craft</h5>
                          <p className="text-gray-700 text-sm mb-3">
                            Beyond my academic and Rotaract commitments, I find joy in crochetingΓÇöa creative pursuit that
                            reflects patience, focus, and dedication to detail.
                          </p>
                        </div>

                        <div className="mb-4">
                          <h5 className="font-semibold text-gray-900 mb-2 text-sm">Vision & Goals</h5>
                          <p className="text-gray-700 text-sm">
                            As part of the Rotaract movement, my mission is to learn continuously, lead with purpose, and
                            serve wholeheartedly, creating meaningful outcomes that inspire others.
                          </p>
                        </div>
                      </>
                    )}

                    <div className="text-center mt-4">
                      <Button
                        onClick={() => setShowRithanyaDetails(!showRithanyaDetails)}
                        variant="outline"
                        size="sm"
                        className="text-primary border-primary hover:bg-primary hover:text-white transition-colors"
                      >
                        {showRithanyaDetails ? 'Read Less' : 'Read More'}
                      </Button>
                    </div>
                  </div>

                  {/* Key Highlights */}
                  <div className="mt-6 pt-4 border-t border-gray-200">
                    <h4 className="text-sm font-semibold text-gray-900 mb-3">Key Highlights</h4>
                    <div className="space-y-1 sm:space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="text-blue-600 text-xs">≡ƒÅà</span>
                        <span className="text-[10px] sm:text-xs text-gray-700">Director ΓÇô Professional Services</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-green-600 text-xs">≡ƒñ¥</span>
                        <span className="text-[10px] sm:text-xs text-gray-700">Leadership, Service & Personal Growth</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-purple-600 text-xs">≡ƒº╢</span>
                        <span className="text-[10px] sm:text-xs text-gray-700">Creative Thinker (Crocheting)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-yellow-600 text-xs">≡ƒÄ»</span>
                        <span className="text-[10px] sm:text-xs text-gray-700">Transforms Ideas into Action</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-orange-600 text-xs">≡ƒîƒ</span>
                        <span className="text-[10px] sm:text-xs text-gray-700">Embodies ΓÇ£Service with ImpactΓÇ¥</span>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </AnimationWrapper>
            {/* Rtr. Anuvarshini K.M ΓÇô Director of Reporting and Grievance */}
            <AnimationWrapper delay={500}>
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:scale-[1.02]">
                <div className="p-6 sm:p-8">

                  {/* Team Member Photo */}
                  <div className="text-center mb-6">
                    <div className="w-40 h-40 sm:w-48 sm:h-48 rounded-full overflow-hidden border-4 border-white shadow-lg mx-auto transition-transform duration-300 hover:scale-105">
                      <img
                        src="https://res.cloudinary.com/drmwtmeg3/image/upload/v1755411699/team-member-anuvarshini_dp3vxl.jpg"
                        alt="Rtr. Anuvarshini K.M ΓÇô Director of Reporting and Grievance"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>

                  {/* Team Member Details */}
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      Rtr. Anuvarshini K.M
                    </h3>
                    <div className="flex flex-wrap items-center justify-center gap-2 mb-4">
                      <span className="bg-primary text-white px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap">
                        Director ΓÇô Reporting and Grievance
                      </span>
                    </div>
                  </div>

                  {/* Description with Read More */}
                  <div className="prose prose-gray max-w-none">
                    <p className="text-gray-700 leading-relaxed mb-4 text-sm">
                      As an enthusiastic and active individual, I believe in taking responsibility with dedication and commitment.
                      My role primarily involves addressing grievances, ensuring transparency, and maintaining smooth communication
                      between the board and members.
                    </p>

                    {showAnuvarshiniDetails && (
                      <>
                        <div className="mb-4">
                          <h5 className="font-semibold text-gray-900 mb-2 text-sm">Responsibility & Role</h5>
                          <p className="text-gray-700 text-sm mb-3">
                            I strive to create an open environment where everyone feels comfortable sharing their opinions, challenges,
                            and suggestions. As Director of Reporting and Grievance, I aim to ensure that every memberΓÇÖs voice is heard,
                            valued, and represented fairly.
                          </p>
                        </div>

                        <div className="mb-4">
                          <h5 className="font-semibold text-gray-900 mb-2 text-sm">Teamwork & Belief</h5>
                          <p className="text-gray-700 text-sm mb-3">
                            I strongly believe that teamwork and mutual respect are the keys to success in any organization.
                            My focus is to maintain harmony and transparency within the club.
                          </p>
                        </div>

                        <div className="mb-4">
                          <h5 className="font-semibold text-gray-900 mb-2 text-sm">Participation & Service</h5>
                          <p className="text-gray-700 text-sm mb-3">
                            Apart from my official duties, I actively take part in club events, community service projects,
                            and social initiatives. I am passionate about helping others and solving problems with a positive mindset.
                          </p>
                        </div>

                        <div className="mb-4">
                          <h5 className="font-semibold text-gray-900 mb-2 text-sm">Vision & Goals</h5>
                          <p className="text-gray-700 text-sm">
                            My vision is to foster unity within our club, encourage active participation, and strengthen the
                            bond among members so that together we can achieve greater heights and make a meaningful difference in society.
                          </p>
                        </div>
                      </>
                    )}

                    <div className="text-center mt-4">
                      <Button
                        onClick={() => setShowAnuvarshiniDetails(!showAnuvarshiniDetails)}
                        variant="outline"
                        size="sm"
                        className="text-primary border-primary hover:bg-primary hover:text-white transition-colors"
                      >
                        {showAnuvarshiniDetails ? 'Read Less' : 'Read More'}
                      </Button>
                    </div>
                  </div>

                  {/* Key Highlights */}
                  <div className="mt-6 pt-4 border-t border-gray-200">
                    <h4 className="text-sm font-semibold text-gray-900 mb-3">Key Highlights</h4>
                    <div className="space-y-1 sm:space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="text-blue-600 text-xs">≡ƒÅà</span>
                        <span className="text-[10px] sm:text-xs text-gray-700">Director ΓÇô Reporting and Grievance</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-green-600 text-xs">≡ƒñ¥</span>
                        <span className="text-[10px] sm:text-xs text-gray-700">Transparency & Communication</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-purple-600 text-xs">≡ƒîƒ</span>
                        <span className="text-[10px] sm:text-xs text-gray-700">Problem-Solver with Positive Mindset</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-yellow-600 text-xs">≡ƒÄ»</span>
                        <span className="text-[10px] sm:text-xs text-gray-700">Unity & Member Participation</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-orange-600 text-xs">≡ƒÆí</span>
                        <span className="text-[10px] sm:text-xs text-gray-700">Dedicated to Service & Growth</span>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </AnimationWrapper>
            {/* Rtr. Sivaharini K. ΓÇô Chair, Grievances and Reporting */}
            <AnimationWrapper delay={500}>
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:scale-[1.02]">
                <div className="p-6 sm:p-8">

                  {/* Team Member Photo */}
                  <div className="text-center mb-6">
                    <div className="w-40 h-40 sm:w-48 sm:h-48 rounded-full overflow-hidden border-4 border-white shadow-lg mx-auto transition-transform duration-300 hover:scale-105">
                      <img
                        src="https://res.cloudinary.com/drmwtmeg3/image/upload/v1755411666/sivaharini_ze7s9y.jpg"
                        alt="Rtr. Sivaharini K ΓÇô Chair, Grievances and Reporting"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>

                  {/* Team Member Details */}
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      Rtr. Sivaharini K.
                    </h3>
                    <div className="flex flex-wrap items-center justify-center gap-2 mb-4">
                      <span className="bg-primary text-white px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap">
                        Chair ΓÇô Grievances and Reporting
                      </span>
                    </div>
                  </div>

                  {/* Description with Read More */}
                  <div className="prose prose-gray max-w-none">
                    <p className="text-gray-700 leading-relaxed mb-4 text-sm">
                      I am an enthusiastic and responsible individual with a strong foundation in leadership, communication, and teamwork.
                      Known for my dedication and ability to uphold a positive reputation for my department, I consistently aim to deliver
                      quality results in every role I take on.
                    </p>

                    {showSivahariniDetails && (
                      <>
                        <div className="mb-4">
                          <h5 className="font-semibold text-gray-900 mb-2 text-sm">Adaptability & Dedication</h5>
                          <p className="text-gray-700 text-sm mb-3">
                            I quickly adapt to new environments, remain eager to learn, and embrace challenges with a proactive mindset.
                          </p>
                        </div>

                        <div className="mb-4">
                          <h5 className="font-semibold text-gray-900 mb-2 text-sm">Secretary Experience</h5>
                          <p className="text-gray-700 text-sm mb-3">
                            During my tenure as Secretary (2024ΓÇô2025), I acted as a vital link between faculty and students, effectively
                            managing communication and leading several initiatives. One of my key accomplishments was spearheading
                            <strong> MAVERICKS'25</strong>, a successful intra-collegiate event that reflected my event management
                            capabilities and collaborative spirit. I have also served as an emcee at various programs, honing my public
                            speaking and presentation skills.
                          </p>
                        </div>

                        <div className="mb-4">
                          <h5 className="font-semibold text-gray-900 mb-2 text-sm">Rotaract Journey</h5>
                          <p className="text-gray-700 text-sm mb-3">
                            My active involvement in the Rotaract Club has further enriched my experience. Currently serving as the
                            <strong> Grievances & Reporting Chair</strong>, IΓÇÖm recognized for my approachable nature, active listening,
                            and conflict resolution skills that contribute to a positive club environment. Additionally, I have served
                            as the reporting head, assisting in the creation of monthly bulletins.
                          </p>
                        </div>

                        <div className="mb-4">
                          <h5 className="font-semibold text-gray-900 mb-2 text-sm">Vision & Goals</h5>
                          <p className="text-gray-700 text-sm">
                            With a strong sense of responsibility and a passion for leadership and service, I strive to make a meaningful
                            impact in all I do.
                          </p>
                        </div>
                      </>
                    )}

                    <div className="text-center mt-4">
                      <Button
                        onClick={() => setShowSivahariniDetails(!showSivahariniDetails)}
                        variant="outline"
                        size="sm"
                        className="text-primary border-primary hover:bg-primary hover:text-white transition-colors"
                      >
                        {showSivahariniDetails ? 'Read Less' : 'Read More'}
                      </Button>
                    </div>
                  </div>

                  {/* Key Highlights */}
                  <div className="mt-6 pt-4 border-t border-gray-200">
                    <h4 className="text-sm font-semibold text-gray-900 mb-3">Key Highlights</h4>
                    <div className="space-y-1 sm:space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="text-blue-600 text-xs">≡ƒÅà</span>
                        <span className="text-[10px] sm:text-xs text-gray-700">Chair ΓÇô Grievances and Reporting</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-green-600 text-xs">≡ƒñ¥</span>
                        <span className="text-[10px] sm:text-xs text-gray-700">Leadership, Communication & Teamwork</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-purple-600 text-xs">≡ƒÄñ</span>
                        <span className="text-[10px] sm:text-xs text-gray-700">Event Host & Public Speaker</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-yellow-600 text-xs">≡ƒÄ»</span>
                        <span className="text-[10px] sm:text-xs text-gray-700">Organizer of MAVERICKS'25</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-orange-600 text-xs">≡ƒîƒ</span>
                        <span className="text-[10px] sm:text-xs text-gray-700">Conflict Resolution & Transparency</span>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </AnimationWrapper>
            {/* Rtr. Srinithi ΓÇô Club Service Chair */}
            <AnimationWrapper delay={500}>
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:scale-[1.02]">
                <div className="p-6 sm:p-8">

                  {/* Team Member Photo */}
                  <div className="text-center mb-6">
                    <div className="w-40 h-40 sm:w-48 sm:h-48 rounded-full overflow-hidden border-4 border-white shadow-lg mx-auto transition-transform duration-300 hover:scale-105">
                      <img
                        src="https://res.cloudinary.com/drmwtmeg3/image/upload/v1755411666/Srinith_zb8k5t.jpg"
                        alt="Rtr. Srinithi ΓÇô Club Service Chair"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>

                  {/* Team Member Details */}
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      Rtr. Srinithi
                    </h3>
                    <div className="flex flex-wrap items-center justify-center gap-2 mb-4">
                      <span className="bg-primary text-white px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap">
                        Club Service Chair
                      </span>
                    </div>
                  </div>

                  {/* Description with Read More */}
                  <div className="prose prose-gray max-w-none">
                    <p className="text-gray-700 leading-relaxed mb-4 text-sm">
                      As the Club Service Chair, I bring with me an enthusiastic and cheerful approach backed by strong
                      leadership and effective communication skills. Last year, I served as the Joint Chair in the Club
                      Service Avenue of our Rotaract Club, gaining valuable exposure to organizing activities, collaborating
                      with peers, and building strong networks.
                    </p>

                    {showSrinithiDetails && (
                      <>
                        <div className="mb-4">
                          <h5 className="font-semibold text-gray-900 mb-2 text-sm">Leadership Journey</h5>
                          <p className="text-gray-700 text-sm mb-3">
                            I also had the privilege of serving as the Department President, where I successfully organized
                            a major departmental event, further strengthening my ability to lead teams, manage responsibilities,
                            and deliver impactful outcomes.
                          </p>
                        </div>

                        <div className="mb-4">
                          <h5 className="font-semibold text-gray-900 mb-2 text-sm">Club Service Vision</h5>
                          <p className="text-gray-700 text-sm mb-3">
                            I believe club service is more than just managing activitiesΓÇöit is about creating meaningful
                            connections, fostering collaboration, and encouraging participation. In my current role, I have
                            initiated and organized several engaging events under the Club Service Avenue, ensuring smooth
                            execution and enthusiastic involvement.
                          </p>
                        </div>

                        <div className="mb-4">
                          <h5 className="font-semibold text-gray-900 mb-2 text-sm">Event Hosting</h5>
                          <p className="text-gray-700 text-sm mb-3">
                            I also had the opportunity to emcee key programs such as <strong>Farewell ΓÇÖ24</strong> and
                            <strong> CharterΓÇÖs Day ΓÇÖ25</strong>, showcasing my confidence in public speaking and ability
                            to engage audiences effectively.
                          </p>
                        </div>

                        <div className="mb-4">
                          <h5 className="font-semibold text-gray-900 mb-2 text-sm">Commitment & Growth</h5>
                          <p className="text-gray-700 text-sm">
                            With empathy, energy, and commitment, I strive to uphold the values of Rotaract while contributing
                            positively to my peers and institution, continuously learning and growing in the process.
                          </p>
                        </div>
                      </>
                    )}

                    <div className="text-center mt-4">
                      <Button
                        onClick={() => setShowSrinithiDetails(!showSrinithiDetails)}
                        variant="outline"
                        size="sm"
                        className="text-primary border-primary hover:bg-primary hover:text-white transition-colors"
                      >
                        {showSrinithiDetails ? 'Read Less' : 'Read More'}
                      </Button>
                    </div>
                  </div>

                  {/* Key Highlights */}
                  <div className="mt-6 pt-4 border-t border-gray-200">
                    <h4 className="text-sm font-semibold text-gray-900 mb-3">Key Highlights</h4>
                    <div className="space-y-1 sm:space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="text-blue-600 text-xs">≡ƒÅà</span>
                        <span className="text-[10px] sm:text-xs text-gray-700">Club Service Chair</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-green-600 text-xs">≡ƒñ¥</span>
                        <span className="text-[10px] sm:text-xs text-gray-700">Leadership & Team Collaboration</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-purple-600 text-xs">≡ƒÄñ</span>
                        <span className="text-[10px] sm:text-xs text-gray-700">Event Host ΓÇô Farewell ΓÇÖ24 & CharterΓÇÖs Day ΓÇÖ25</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-yellow-600 text-xs">≡ƒÄ»</span>
                        <span className="text-[10px] sm:text-xs text-gray-700">Organizer of Club Service Events</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-orange-600 text-xs">≡ƒîƒ</span>
                        <span className="text-[10px] sm:text-xs text-gray-700">Department President Experience</span>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </AnimationWrapper>
            {/* Rtr. Priyanka J. K ΓÇô Chair, All Operations */}
            <AnimationWrapper delay={500}>
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:scale-[1.02]">
                <div className="p-6 sm:p-8">

                  {/* Team Member Photo */}
                  <div className="text-center mb-6">
                    <div className="w-40 h-40 sm:w-48 sm:h-48 rounded-full overflow-hidden border-4 border-white shadow-lg mx-auto transition-transform duration-300 hover:scale-105">
                      <img
                        src="https://res.cloudinary.com/drmwtmeg3/image/upload/v1755411663/JK_priyanka_hit03k.jpg"
                        alt="Rtr. Priyanka J. K ΓÇô Chair, All Operations"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>

                  {/* Team Member Details */}
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      Rtr. Priyanka J. K
                    </h3>
                    <div className="flex flex-wrap items-center justify-center gap-2 mb-4">
                      <span className="bg-primary text-white px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap">
                        Chair ΓÇô All Operations
                      </span>
                    </div>
                  </div>

                  {/* Description with Read More */}
                  <div className="prose prose-gray max-w-none">
                    <p className="text-gray-700 leading-relaxed mb-4 text-sm">
                      I am Priyanka J. K, a dedicated member of the Rotaract Club of KPRCAS,
                      where I have had the privilege of serving in key leadership roles.
                      For the year 2024ΓÇô2025, I held the position of Secretary of Communication,
                      a role that sharpened my communication, planning, and organizational skills.
                    </p>

                    {showPriyankaDetails && (
                      <>
                        <div className="mb-4">
                          <h5 className="font-semibold text-gray-900 mb-2 text-sm">Secretary of Communication</h5>
                          <p className="text-gray-700 text-sm mb-3">
                            In this role, I actively engaged with members, managed effective communication
                            channels, and strengthened the overall visibility of the club. I coordinated
                            updates, handled correspondence, and ensured smooth information flow across
                            all levels of the clubΓÇÖs functioning.
                          </p>
                        </div>

                        <div className="mb-4">
                          <h5 className="font-semibold text-gray-900 mb-2 text-sm">Chair ΓÇô All Operations</h5>
                          <p className="text-gray-700 text-sm mb-3">
                            Building on this foundation, I have taken up the role of Chair ΓÇô All Operations
                            for the year 2025ΓÇô2026. This role carries greater responsibility, involving
                            the coordination and oversight of multiple activities within the club. I am
                            committed to ensuring efficiency, teamwork, and impactful execution of initiatives
                            that reflect the spirit of Rotaract.
                          </p>
                        </div>

                        <div className="mb-4">
                          <h5 className="font-semibold text-gray-900 mb-2 text-sm">Personal Growth</h5>
                          <p className="text-gray-700 text-sm">
                            Through these experiences, Rotaract has given me the platform to grow as a leader,
                            improve my interpersonal skills, and contribute to service, fellowship, and
                            professional development.
                          </p>
                        </div>
                      </>
                    )}

                    <div className="text-center mt-4">
                      <Button
                        onClick={() => setShowPriyankaDetails(!showPriyankaDetails)}
                        variant="outline"
                        size="sm"
                        className="text-primary border-primary hover:bg-primary hover:text-white transition-colors"
                      >
                        {showPriyankaDetails ? 'Read Less' : 'Read More'}
                      </Button>
                    </div>
                  </div>

                  {/* Key Highlights */}
                  <div className="mt-6 pt-4 border-t border-gray-200">
                    <h4 className="text-sm font-semibold text-gray-900 mb-3">Key Highlights</h4>
                    <div className="space-y-1 sm:space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="text-blue-600 text-xs">≡ƒÅà</span>
                        <span className="text-[10px] sm:text-xs text-gray-700">Chair ΓÇô All Operations (2025ΓÇô2026)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-green-600 text-xs">≡ƒô⌐</span>
                        <span className="text-[10px] sm:text-xs text-gray-700">Former Secretary of Communication (2024ΓÇô2025)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-purple-600 text-xs">≡ƒñ¥</span>
                        <span className="text-[10px] sm:text-xs text-gray-700">Teamwork & Coordination</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-yellow-600 text-xs">≡ƒÄ»</span>
                        <span className="text-[10px] sm:text-xs text-gray-700">Efficient Planning & Execution</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-orange-600 text-xs">≡ƒîƒ</span>
                        <span className="text-[10px] sm:text-xs text-gray-700">Leadership & Professional Growth</span>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </AnimationWrapper>
            {/* Rtr. Naren ΓÇô International Service Director */}
            <AnimationWrapper delay={500}>
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:scale-[1.02]">
                <div className="p-6 sm:p-8">

                  {/* Team Member Photo */}
                  <div className="text-center mb-6">
                    <div className="w-40 h-40 sm:w-48 sm:h-48 rounded-full overflow-hidden border-4 border-white shadow-lg mx-auto transition-transform duration-300 hover:scale-105">
                      <img
                        src="https://res.cloudinary.com/drmwtmeg3/image/upload/v1755411704/team-member-naren_ntcxpk.jpg"
                        alt="Rtr. Naren ΓÇô International Service Director"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>

                  {/* Team Member Details */}
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      Rtr. Naren
                    </h3>
                    <div className="flex flex-wrap items-center justify-center gap-2 mb-4">
                      <span className="bg-primary text-white px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap">
                        International Service Director
                      </span>
                    </div>
                  </div>

                  {/* Description with Read More */}
                  <div className="prose prose-gray max-w-none">
                    <p className="text-gray-700 leading-relaxed mb-4 text-sm">
                      I am a passionate and dedicated individual who strongly believes in
                      teamwork, hard work, and balance in all aspects of life. With a keen
                      interest in sports, especially cricket, I have developed qualities of
                      discipline, strategy, and collaborationΓÇövalues that continue to shape
                      my personal and professional journey.
                    </p>

                    {showNarenDetails && (
                      <>
                        <div className="mb-4">
                          <h5 className="font-semibold text-gray-900 mb-2 text-sm">Calm Under Pressure</h5>
                          <p className="text-gray-700 text-sm mb-3">
                            I am known for staying calm and focused, even in challenging
                            situations. My ability to manage pressure effectively helps me
                            handle responsibilities with clarity and efficiency, earning the
                            trust and respect of my peers.
                          </p>
                        </div>

                        <div className="mb-4">
                          <h5 className="font-semibold text-gray-900 mb-2 text-sm">International Service Vision</h5>
                          <p className="text-gray-700 text-sm mb-3">
                            As the International Service Director of the Rotaract Club, I am
                            committed to building cross-cultural connections and organizing
                            impactful collaborations. I strive to strengthen global understanding
                            and promote inclusivity through meaningful projects and partnerships,
                            embodying the true essence of RotaractΓÇÖs international service.
                          </p>
                        </div>

                        <div className="mb-4">
                          <h5 className="font-semibold text-gray-900 mb-2 text-sm">Future Aspirations</h5>
                          <p className="text-gray-700 text-sm">
                            Looking ahead, I aspire to create lasting opportunities that inspire
                            service and leadership. Guided by determination and continuous learning,
                            I also hold a personal goal of leading my family with dignity, ensuring
                            they live with comfort, respect, and happiness.
                          </p>
                        </div>
                      </>
                    )}

                    <div className="text-center mt-4">
                      <Button
                        onClick={() => setShowNarenDetails(!showNarenDetails)}
                        variant="outline"
                        size="sm"
                        className="text-primary border-primary hover:bg-primary hover:text-white transition-colors"
                      >
                        {showNarenDetails ? 'Read Less' : 'Read More'}
                      </Button>
                    </div>
                  </div>

                  {/* Key Highlights */}
                  <div className="mt-6 pt-4 border-t border-gray-200">
                    <h4 className="text-sm font-semibold text-gray-900 mb-3">Key Highlights</h4>
                    <div className="space-y-1 sm:space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="text-blue-600 text-xs">≡ƒîì</span>
                        <span className="text-[10px] sm:text-xs text-gray-700">International Service Director</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-green-600 text-xs">≡ƒÅÅ</span>
                        <span className="text-[10px] sm:text-xs text-gray-700">Cricket Enthusiast ΓÇô Discipline & Strategy</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-purple-600 text-xs">≡ƒºÿ</span>
                        <span className="text-[10px] sm:text-xs text-gray-700">Calm & Focused Under Pressure</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-yellow-600 text-xs">≡ƒñ¥</span>
                        <span className="text-[10px] sm:text-xs text-gray-700">Cross-Cultural Connections & Inclusivity</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-orange-600 text-xs">≡ƒîƒ</span>
                        <span className="text-[10px] sm:text-xs text-gray-700">Leadership & Family Values</span>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </AnimationWrapper>
            {/* Rtr. Prajjeeith ΓÇô District Priority Projects Director */}
            <AnimationWrapper delay={500}>
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:scale-[1.02]">
                <div className="p-6 sm:p-8">

                  {/* Team Member Photo */}
                  <div className="text-center mb-6">
                    <div className="w-40 h-40 sm:w-48 sm:h-48 rounded-full overflow-hidden border-4 border-white shadow-lg mx-auto transition-transform duration-300 hover:scale-105">
                      <img
                        src="https://res.cloudinary.com/drmwtmeg3/image/upload/v1755411707/team-member-prajjeeith_ckmlxz.jpg"
                        alt="Rtr. Prajjeeith ΓÇô District Priority Projects Director"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>

                  {/* Team Member Details */}
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      Rtr. Prajjeeith
                    </h3>
                    <div className="flex flex-wrap items-center justify-center gap-2 mb-4">
                      <span className="bg-primary text-white px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap">
                        District Priority Projects Director
                      </span>
                    </div>
                  </div>

                  {/* Description with Read More */}
                  <div className="prose prose-gray max-w-none">
                    <p className="text-gray-700 leading-relaxed mb-4 text-sm">
                      I am Prajjeeith MurgaPrakash, serving as the District Priority Project
                      Director at the Rotaract Club of KPRCAS. My journey in Rotaract has been
                      shaped by values of leadership, confidence, and pressure management,
                      which have helped me grow as both an individual and a professional.
                    </p>

                    {showPrajjeeithDetails && (
                      <>
                        <div className="mb-4">
                          <h5 className="font-semibold text-gray-900 mb-2 text-sm">Commitment to Leadership</h5>
                          <p className="text-gray-700 text-sm mb-3">
                            True leadership is not only about guiding others but also about
                            being a strong pillar of support to ensure collective success.
                            I take pride in standing by my peers and contributing wherever
                            needed to achieve common goals.
                          </p>
                        </div>

                        <div className="mb-4">
                          <h5 className="font-semibold text-gray-900 mb-2 text-sm">Impactful Projects</h5>
                          <p className="text-gray-700 text-sm mb-3">
                            Recently, I contributed to a remarkable project in our district.
                            While I was not the lead, my role in supporting, coordinating, and
                            ensuring smooth execution was an enriching experience that highlighted
                            the power of teamwork and consistency.
                          </p>
                        </div>

                        <div className="mb-4">
                          <h5 className="font-semibold text-gray-900 mb-2 text-sm">Skills & Growth</h5>
                          <p className="text-gray-700 text-sm">
                            Through Rotaract, I have developed skills in event management,
                            project execution, and collaboration. I value adaptability,
                            responsibility, and the ability to turn challenges into opportunities
                            for growth and service.
                          </p>
                        </div>

                        <div className="mb-4">
                          <h5 className="font-semibold text-gray-900 mb-2 text-sm">Future Vision</h5>
                          <p className="text-gray-700 text-sm">
                            As District Priority Projects Director, I aspire to support initiatives
                            that encourage innovation, inclusivity, and sustainability. My vision
                            is to inspire others to recognize their potential and create lasting
                            contributions that align with RotaractΓÇÖs values.
                          </p>
                        </div>
                      </>
                    )}

                    <div className="text-center mt-4">
                      <Button
                        onClick={() => setShowPrajjeeithDetails(!showPrajjeeithDetails)}
                        variant="outline"
                        size="sm"
                        className="text-primary border-primary hover:bg-primary hover:text-white transition-colors"
                      >
                        {showPrajjeeithDetails ? 'Read Less' : 'Read More'}
                      </Button>
                    </div>
                  </div>

                  {/* Key Highlights */}
                  <div className="mt-6 pt-4 border-t border-gray-200">
                    <h4 className="text-sm font-semibold text-gray-900 mb-3">Key Highlights</h4>
                    <div className="space-y-1 sm:space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="text-blue-600 text-xs">≡ƒôî</span>
                        <span className="text-[10px] sm:text-xs text-gray-700">District Priority Projects Director</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-green-600 text-xs">≡ƒÆí</span>
                        <span className="text-[10px] sm:text-xs text-gray-700">Strong Leadership & Team Support</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-purple-600 text-xs">≡ƒ¢á∩╕Å</span>
                        <span className="text-[10px] sm:text-xs text-gray-700">Event Management & Project Execution</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-yellow-600 text-xs">≡ƒñ¥</span>
                        <span className="text-[10px] sm:text-xs text-gray-700">Team Collaboration & Coordination</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-red-600 text-xs">≡ƒÜÇ</span>
                        <span className="text-[10px] sm:text-xs text-gray-700">Vision for Innovation & Sustainability</span>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </AnimationWrapper>
            {/* Rtr. Deepana ΓÇô Chair of Professional Services */}
            <AnimationWrapper delay={500}>
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:scale-[1.02]">
                <div className="p-6 sm:p-8">

                  {/* Team Member Photo */}
                  <div className="text-center mb-6">
                    <div className="w-40 h-40 sm:w-48 sm:h-48 rounded-full overflow-hidden border-4 border-white shadow-lg mx-auto transition-transform duration-300 hover:scale-105">
                      <img
                        src="https://res.cloudinary.com/drmwtmeg3/image/upload/v1755411662/deepana_wqphgt.jpg"
                        alt="Rtr. Deepana ΓÇô Chair of Professional Services"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>

                  {/* Team Member Details */}
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      Rtr. Deepana S.
                    </h3>
                    <div className="flex flex-wrap items-center justify-center gap-2 mb-4">
                      <span className="bg-primary text-white px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap">
                        Chair of Professional Services
                      </span>
                    </div>
                  </div>

                  {/* Description with Read More */}
                  <div className="prose prose-gray max-w-none">
                    <p className="text-gray-700 leading-relaxed mb-4 text-sm">
                      As the Chair of Professional Services at Rotaract Club of KPRCAS,
                      I am driven to make a lasting impact. Rotaract is a powerful
                      catalyst for change, allowing me to merge my academic pursuits
                      with community service while finding a community of passionate
                      individuals united by the vision of ΓÇ£Service with Impact.ΓÇ¥
                    </p>

                    {showDeepanaDetails && (
                      <>
                        <div className="mb-4">
                          <h5 className="font-semibold text-gray-900 mb-2 text-sm">Leadership & Growth</h5>
                          <p className="text-gray-700 text-sm mb-3">
                            Through this journey, IΓÇÖve developed leadership skills,
                            learned to collaborate with my peers, and engaged in
                            impactful projects that benefit society. Every step has
                            been an opportunity for both service and self-improvement.
                          </p>
                        </div>

                        <div className="mb-4">
                          <h5 className="font-semibold text-gray-900 mb-2 text-sm">Beyond Rotaract</h5>
                          <p className="text-gray-700 text-sm mb-3">
                            Outside of Rotaract, I enjoy exploring new opportunities
                            for personal growth and creativity. Whether itΓÇÖs acquiring
                            new skills or pursuing hobbies, I am always eager to
                            challenge myself and improve.
                          </p>
                        </div>

                        <div className="mb-4">
                          <h5 className="font-semibold text-gray-900 mb-2 text-sm">Vision & Purpose</h5>
                          <p className="text-gray-700 text-sm">
                            My goal is to embody the spirit of Rotaract ΓÇô learning,
                            leading, and serving with purpose ΓÇô while inspiring
                            others to do the same. Together, we can create a
                            positive impact in our community and beyond.
                          </p>
                        </div>
                      </>
                    )}

                    <div className="text-center mt-4">
                      <Button
                        onClick={() => setShowDeepanaDetails(!showDeepanaDetails)}
                        variant="outline"
                        size="sm"
                        className="text-primary border-primary hover:bg-primary hover:text-white transition-colors"
                      >
                        {showDeepanaDetails ? 'Read Less' : 'Read More'}
                      </Button>
                    </div>
                  </div>

                  {/* Key Highlights */}
                  <div className="mt-6 pt-4 border-t border-gray-200">
                    <h4 className="text-sm font-semibold text-gray-900 mb-3">Key Highlights</h4>
                    <div className="space-y-1 sm:space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="text-blue-600 text-xs">≡ƒôî</span>
                        <span className="text-[10px] sm:text-xs text-gray-700">Chair of Professional Services</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-green-600 text-xs">≡ƒî▒</span>
                        <span className="text-[10px] sm:text-xs text-gray-700">Leadership & Continuous Growth</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-purple-600 text-xs">≡ƒñ¥</span>
                        <span className="text-[10px] sm:text-xs text-gray-700">Collaboration & Team Spirit</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-yellow-600 text-xs">≡ƒÄ»</span>
                        <span className="text-[10px] sm:text-xs text-gray-700">Service with Purpose & Impact</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-pink-600 text-xs">Γ£¿</span>
                        <span className="text-[10px] sm:text-xs text-gray-700">Personal Growth & Creativity</span>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </AnimationWrapper>
            {/* Rtr. Miruthula Sri ΓÇô International Service Chair */}
            <AnimationWrapper delay={500}>
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:scale-[1.02]">
                <div className="p-6 sm:p-8">

                  {/* Team Member Photo */}
                  <div className="text-center mb-6">
                    <div className="w-40 h-40 sm:w-48 sm:h-48 rounded-full overflow-hidden border-4 border-white shadow-lg mx-auto transition-transform duration-300 hover:scale-105">
                      <img
                        src="https://res.cloudinary.com/drmwtmeg3/image/upload/v1755411664/mirthal_sri_hmns70.jpg"
                        alt="Rtr. Miruthula Sri ΓÇô International Service Chair"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>

                  {/* Team Member Details */}
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      Rtr. Miruthula Sri
                    </h3>
                    <div className="flex flex-wrap items-center justify-center gap-2 mb-4">
                      <span className="bg-primary text-white px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap">
                        International Service Chair
                      </span>
                    </div>
                  </div>

                  {/* Description with Read More */}
                  <div className="prose prose-gray max-w-none">
                    <p className="text-gray-700 leading-relaxed mb-4 text-sm">
                      Meet the dynamic teenage leader bursting with energy! Passionate about
                      traveling, exploring cultures, and creating unforgettable memories,
                      she blends her adventurous spirit with leadership. As the
                      <span className="font-semibold"> International Service Chair</span>, sheΓÇÖs
                      committed to building global connections and empowering her peers
                      through impactful service.
                    </p>

                    {showMiruthulaDetails && (
                      <>
                        <div className="mb-4">
                          <h5 className="font-semibold text-gray-900 mb-2 text-sm">Youthful Energy</h5>
                          <p className="text-gray-700 text-sm mb-3">
                            Always full of life and enthusiasm, I thrive on new experiences
                            that challenge me to grow and inspire others along the way.
                          </p>
                        </div>

                        <div className="mb-4">
                          <h5 className="font-semibold text-gray-900 mb-2 text-sm">Passion for Travel</h5>
                          <p className="text-gray-700 text-sm mb-3">
                            Exploring new cultures and meeting people across the globe
                            has broadened my perspective and fueled my commitment
                            to international service.
                          </p>
                        </div>

                        <div className="mb-4">
                          <h5 className="font-semibold text-gray-900 mb-2 text-sm">Leadership</h5>
                          <p className="text-gray-700 text-sm mb-3">
                            With natural leadership skills, I embrace responsibility,
                            guide others with confidence, and aim to make every initiative
                            impactful and inclusive.
                          </p>
                        </div>

                        <div className="mb-4">
                          <h5 className="font-semibold text-gray-900 mb-2 text-sm">Vision</h5>
                          <p className="text-gray-700 text-sm">
                            As International Service Chair, I aim to promote cultural exchange,
                            strengthen global fellowship, and empower young people to create
                            a positive impact that reaches far beyond borders.
                          </p>
                        </div>
                      </>
                    )}

                    <div className="text-center mt-4">
                      <Button
                        onClick={() => setShowMiruthulaDetails(!showMiruthulaDetails)}
                        variant="outline"
                        size="sm"
                        className="text-primary border-primary hover:bg-primary hover:text-white transition-colors"
                      >
                        {showMiruthulaDetails ? 'Read Less' : 'Read More'}
                      </Button>
                    </div>
                  </div>

                  {/* Key Highlights */}
                  <div className="mt-6 pt-4 border-t border-gray-200">
                    <h4 className="text-sm font-semibold text-gray-900 mb-3">Key Highlights</h4>
                    <div className="space-y-1 sm:space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="text-blue-600 text-xs">≡ƒîì</span>
                        <span className="text-[10px] sm:text-xs text-gray-700">International Service Chair</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-green-600 text-xs">Γ£¿</span>
                        <span className="text-[10px] sm:text-xs text-gray-700">Young, Energetic & Passionate</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-purple-600 text-xs">Γ£ê∩╕Å</span>
                        <span className="text-[10px] sm:text-xs text-gray-700">Loves Traveling & Exploring Cultures</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-yellow-600 text-xs">≡ƒææ</span>
                        <span className="text-[10px] sm:text-xs text-gray-700">Natural Leadership Skills</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-pink-600 text-xs">≡ƒñ¥</span>
                        <span className="text-[10px] sm:text-xs text-gray-700">Committed to Global Service & Fellowship</span>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </AnimationWrapper>
            {/* Rtr. Dharaneesh ΓÇô Treasurer */}
            <AnimationWrapper delay={500}>
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:scale-[1.02]">
                <div className="p-6 sm:p-8">

                  {/* Team Member Photo */}
                  <div className="text-center mb-6">
                    <div className="w-40 h-40 sm:w-48 sm:h-48 rounded-full overflow-hidden border-4 border-white shadow-lg mx-auto transition-transform duration-300 hover:scale-105">
                      <img
                        src="https://res.cloudinary.com/drmwtmeg3/image/upload/v1755413218/Dharanessh_fowipx.jpg"
                        alt="Rtr. Dharaneesh ΓÇô Treasurer"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>

                  {/* Team Member Details */}
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      Rtr. Dharaneesh
                    </h3>
                    <div className="flex flex-wrap items-center justify-center gap-2 mb-4">
                      <span className="bg-primary text-white px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap">
                        Treasurer
                      </span>
                    </div>
                  </div>

                  {/* Description with Read More */}
                  <div className="prose prose-gray max-w-none">
                    <p className="text-gray-700 leading-relaxed mb-4 text-sm">
                      Serving as a Board Member in the Rotaract Club of KPRCAS for the past
                      two years has been a transformative journey. This role gave me the
                      opportunity to actively plan, execute, and evaluate impactful
                      service-oriented and professional development activities, while
                      building strong collaboration with peers and leaders.
                    </p>

                    {showDharaneeshDetails && (
                      <>
                        <div className="mb-4">
                          <h5 className="font-semibold text-gray-900 mb-2 text-sm">Event Organization</h5>
                          <p className="text-gray-700 text-sm mb-3">
                            I have contributed to organizing awareness campaigns, leadership
                            workshops, and outreach programs that made a difference both on
                            campus and in the community.
                          </p>
                        </div>

                        <div className="mb-4">
                          <h5 className="font-semibold text-gray-900 mb-2 text-sm">Collaboration & Networking</h5>
                          <p className="text-gray-700 text-sm mb-3">
                            My role involved coordinating with other clubs and external
                            organizations, which helped foster partnerships and broaden
                            our impact.
                          </p>
                        </div>

                        <div className="mb-4">
                          <h5 className="font-semibold text-gray-900 mb-2 text-sm">Leadership & Growth</h5>
                          <p className="text-gray-700 text-sm">
                            Being part of the decision-making body sharpened my leadership,
                            teamwork, and time-management skills while giving me valuable
                            insight into club management and financial responsibility.
                          </p>
                        </div>
                      </>
                    )}

                    <div className="text-center mt-4">
                      <Button
                        onClick={() => setShowDharaneeshDetails(!showDharaneeshDetails)}
                        variant="outline"
                        size="sm"
                        className="text-primary border-primary hover:bg-primary hover:text-white transition-colors"
                      >
                        {showDharaneeshDetails ? 'Read Less' : 'Read More'}
                      </Button>
                    </div>
                  </div>

                  {/* Key Highlights */}
                  <div className="mt-6 pt-4 border-t border-gray-200">
                    <h4 className="text-sm font-semibold text-gray-900 mb-3">Key Highlights</h4>
                    <div className="space-y-1 sm:space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="text-blue-600 text-xs">≡ƒÆ░</span>
                        <span className="text-[10px] sm:text-xs text-gray-700">Treasurer ΓÇô Financial Oversight</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-green-600 text-xs">≡ƒôà</span>
                        <span className="text-[10px] sm:text-xs text-gray-700">Organizer of Events & Campaigns</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-purple-600 text-xs">≡ƒñ¥</span>
                        <span className="text-[10px] sm:text-xs text-gray-700">Collaboration & Partnerships</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-yellow-600 text-xs">≡ƒæ¿ΓÇì≡ƒÆ╝</span>
                        <span className="text-[10px] sm:text-xs text-gray-700">Leadership & Decision-Making</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-pink-600 text-xs">≡ƒîƒ</span>
                        <span className="text-[10px] sm:text-xs text-gray-700">Service Above Self</span>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </AnimationWrapper>
            {/* Rtr. Brindha ΓÇô Director, Professional Services */}
            <AnimationWrapper delay={500}>
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:scale-[1.02]">
                <div className="p-6 sm:p-8">

                  {/* Team Member Photo */}
                  <div className="text-center mb-6">
                    <div className="w-40 h-40 sm:w-48 sm:h-48 rounded-full overflow-hidden border-4 border-white shadow-lg mx-auto transition-transform duration-300 hover:scale-105">
                      <img
                        src="https://res.cloudinary.com/drmwtmeg3/image/upload/v1755413216/Brinda_uk2jgf.jpg"
                        alt="Rtr. Brindha ΓÇô Director, Professional Services"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>

                  {/* Team Member Details */}
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      Rtr. Brindha P
                    </h3>
                    <div className="flex flex-wrap items-center justify-center gap-2 mb-4">
                      <span className="bg-primary text-white px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap">
                        Director ΓÇô Professional Services
                      </span>
                    </div>
                  </div>

                  {/* Description with Read More */}
                  <div className="prose prose-gray max-w-none">
                    <p className="text-gray-700 leading-relaxed mb-4 text-sm">
                      I am Rtr. Brindha P, proudly serving as the
                      <span className="font-semibold"> Director ΓÇô Professional Services</span>
                      of the Rotaract Club of KPRCAS. At KPRCAS, I strive to balance academics
                      with Rotaract responsibilities, shaping myself into an individual
                      capable of bringing purposeful change to society.
                    </p>

                    {showBrindhaDetails && (
                      <>
                        <div className="mb-4">
                          <h5 className="font-semibold text-gray-900 mb-2 text-sm">Leadership & Service</h5>
                          <p className="text-gray-700 text-sm mb-3">
                            With a passion for leadership and community service, I see Rotaract
                            as more than just a platformΓÇöit is a movement that empowers me
                            to transform ideas into impactful actions.
                          </p>
                        </div>

                        <div className="mb-4">
                          <h5 className="font-semibold text-gray-900 mb-2 text-sm">Growth & Impact</h5>
                          <p className="text-gray-700 text-sm mb-3">
                            This journey has enriched my skills, strengthened my vision,
                            and connected me with changemakers who share the goal of
                            ΓÇ£Service Beyond Self, Impact Beyond Measure.ΓÇ¥
                          </p>
                        </div>

                        <div className="mb-4">
                          <h5 className="font-semibold text-gray-900 mb-2 text-sm">Creative Pursuits</h5>
                          <p className="text-gray-700 text-sm">
                            Beyond academics and Rotaract, I find joy in crochetingΓÇöa hobby
                            that reflects patience, creativity, and dedication to detail.
                          </p>
                        </div>

                        <div className="mb-4">
                          <h5 className="font-semibold text-gray-900 mb-2 text-sm">Vision</h5>
                          <p className="text-gray-700 text-sm">
                            My mission is to learn continuously, lead with purpose,
                            and serve wholeheartedly to create meaningful outcomes
                            that inspire others.
                          </p>
                        </div>
                      </>
                    )}

                    <div className="text-center mt-4">
                      <Button
                        onClick={() => setShowBrindhaDetails(!showBrindhaDetails)}
                        variant="outline"
                        size="sm"
                        className="text-primary border-primary hover:bg-primary hover:text-white transition-colors"
                      >
                        {showBrindhaDetails ? 'Read Less' : 'Read More'}
                      </Button>
                    </div>
                  </div>

                  {/* Key Highlights */}
                  <div className="mt-6 pt-4 border-t border-gray-200">
                    <h4 className="text-sm font-semibold text-gray-900 mb-3">Key Highlights</h4>
                    <div className="space-y-1 sm:space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="text-blue-600 text-xs">≡ƒôî</span>
                        <span className="text-[10px] sm:text-xs text-gray-700">Director ΓÇô Professional Services</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-green-600 text-xs">≡ƒôû</span>
                        <span className="text-[10px] sm:text-xs text-gray-700">Balancing Academics & Service</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-purple-600 text-xs">≡ƒîì</span>
                        <span className="text-[10px] sm:text-xs text-gray-700">Service Beyond Self, Impact Beyond Measure</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-yellow-600 text-xs">≡ƒº╢</span>
                        <span className="text-[10px] sm:text-xs text-gray-700">Creative Hobby ΓÇô Crocheting</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-pink-600 text-xs">Γ£¿</span>
                        <span className="text-[10px] sm:text-xs text-gray-700">Leadership, Growth & Inspiration</span>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </AnimationWrapper>
            {/* Rtr. Pavithra KS ΓÇô Chair, InteractΓÇôRotaract Relationship */}
            <AnimationWrapper delay={500}>
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:scale-[1.02]">
                <div className="p-6 sm:p-8">

                  {/* Team Member Photo */}
                  <div className="text-center mb-6">
                    <div className="w-40 h-40 sm:w-48 sm:h-48 rounded-full overflow-hidden border-4 border-white shadow-lg mx-auto transition-transform duration-300 hover:scale-105">
                      <img
                        src="https://res.cloudinary.com/drmwtmeg3/image/upload/v1755413219/Pavithra_utrapb.jpg"
                        alt="Rtr. Pavithra KS ΓÇô Chair, InteractΓÇôRotaract Relationship"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>

                  {/* Team Member Details */}
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      Rtr. Pavithra KS
                    </h3>
                    <div className="flex flex-wrap items-center justify-center gap-2 mb-4">
                      <span className="bg-primary text-white px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap">
                        Chair ΓÇô InteractΓÇôRotaract Relationship
                      </span>
                    </div>
                  </div>

                  {/* Description with Read More */}
                  <div className="prose prose-gray max-w-none">
                    <p className="text-gray-700 leading-relaxed mb-4 text-sm">
                      I am Rtr. Pavithra KS, proudly serving as the
                      <span className="font-semibold"> Chair ΓÇô InteractΓÇôRotaract Relationship</span>
                      of the Rotaract Club of KPRCAS. At KPRCAS, I strive to balance academics
                      with Rotaract responsibilities, shaping myself into an individual capable
                      of creating purposeful change in society.
                    </p>

                    {showPavithraDetails && (
                      <>
                        <div className="mb-4">
                          <h5 className="font-semibold text-gray-900 mb-2 text-sm">Leadership & Service</h5>
                          <p className="text-gray-700 text-sm mb-3">
                            With a deep passion for leadership, community service, and personal
                            growth, I see Rotaract not just as a platform, but as a movement that
                            transforms ideas into impactful actions.
                          </p>
                        </div>

                        <div className="mb-4">
                          <h5 className="font-semibold text-gray-900 mb-2 text-sm">Growth & Vision</h5>
                          <p className="text-gray-700 text-sm mb-3">
                            This journey has strengthened my skills while connecting me with
                            like-minded changemakers who are driven by a shared vision of progress.
                          </p>
                        </div>

                        <div className="mb-4">
                          <h5 className="font-semibold text-gray-900 mb-2 text-sm">Creative Pursuits</h5>
                          <p className="text-gray-700 text-sm">
                            Beyond academics and Rotaract, I find joy in crochetingΓÇöa creative
                            pursuit that reflects patience, focus, and dedication to detail.
                          </p>
                        </div>

                        <div className="mb-4">
                          <h5 className="font-semibold text-gray-900 mb-2 text-sm">Vision & Mission</h5>
                          <p className="text-gray-700 text-sm">
                            As a proud Rotaractor, my mission is to learn continuously, lead with
                            integrity, and serve wholeheartedlyΓÇöleaving behind footprints of
                            positive change.
                          </p>
                          <p className="italic text-primary text-sm mt-2">
                            Γ£¿ ΓÇ£True leadership lies in learning, serving, and inspiring others to
                            believe that change begins with them.ΓÇ¥
                          </p>
                        </div>
                      </>
                    )}

                    <div className="text-center mt-4">
                      <Button
                        onClick={() => setShowPavithraDetails(!showPavithraDetails)}
                        variant="outline"
                        size="sm"
                        className="text-primary border-primary hover:bg-primary hover:text-white transition-colors"
                      >
                        {showPavithraDetails ? 'Read Less' : 'Read More'}
                      </Button>
                    </div>
                  </div>

                  {/* Key Highlights */}
                  <div className="mt-6 pt-4 border-t border-gray-200">
                    <h4 className="text-sm font-semibold text-gray-900 mb-3">Key Highlights</h4>
                    <div className="space-y-1 sm:space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="text-blue-600 text-xs">≡ƒôî</span>
                        <span className="text-[10px] sm:text-xs text-gray-700">Chair ΓÇô InteractΓÇôRotaract Relationship</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-green-600 text-xs">≡ƒôû</span>
                        <span className="text-[10px] sm:text-xs text-gray-700">Balancing Academics & Service</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-purple-600 text-xs">≡ƒîì</span>
                        <span className="text-[10px] sm:text-xs text-gray-700">Transforming Ideas into Action</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-yellow-600 text-xs">≡ƒº╢</span>
                        <span className="text-[10px] sm:text-xs text-gray-700">Creative Hobby ΓÇô Crocheting</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-pink-600 text-xs">Γ£¿</span>
                        <span className="text-[10px] sm:text-xs text-gray-700">Leadership, Growth & Inspiration</span>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </AnimationWrapper>
            {/* Rtr. Praveen ΓÇô Club Service Director */}
            <AnimationWrapper delay={500}>
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:scale-[1.02]">
                <div className="p-6 sm:p-8">

                  {/* Team Member Photo */}
                  <div className="text-center mb-6">
                    <div className="w-40 h-40 sm:w-48 sm:h-48 rounded-full overflow-hidden border-4 border-white shadow-lg mx-auto transition-transform duration-300 hover:scale-105">
                      <img
                        src="https://res.cloudinary.com/drmwtmeg3/image/upload/v1755411664/praveen_l0psb8.jpg"
                        alt="Rtr. Praveen ΓÇô Club Service Director"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>

                  {/* Team Member Details */}
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      Rtr. Praveen
                    </h3>
                    <div className="flex flex-wrap items-center justify-center gap-2 mb-4">
                      <span className="bg-primary text-white px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap">
                        Club Service Director
                      </span>
                    </div>
                  </div>

                  {/* Description with Read More */}
                  <div className="prose prose-gray max-w-none">
                    <p className="text-gray-700 leading-relaxed mb-4 text-sm">
                      I am Rtr. Praveen, a passionate and dedicated individual who believes
                      in <span className="font-semibold">hard work, teamwork and balance</span>
                      in both personal and professional life. With a strong interest in sports,
                      especially cricket and football, I embrace the discipline, strategy, and
                      collaboration that they teach.
                    </p>

                    {showPraveenDetails && (
                      <>
                        <div className="mb-4">
                          <h5 className="font-semibold text-gray-900 mb-2 text-sm">Sports & Teamwork</h5>
                          <p className="text-gray-700 text-sm mb-3">
                            Being on the field has shaped me into a true team player, someone who
                            motivates and supports others while working toward common goals.
                          </p>
                        </div>

                        <div className="mb-4">
                          <h5 className="font-semibold text-gray-900 mb-2 text-sm">Calm Under Pressure</h5>
                          <p className="text-gray-700 text-sm mb-3">
                            One of my greatest strengths is managing work pressure with focus and
                            clarity, ensuring responsibilities are handled with efficiency. This
                            quality has allowed me to lead successfully and earn trust from peers.
                          </p>
                        </div>

                        <div className="mb-4">
                          <h5 className="font-semibold text-gray-900 mb-2 text-sm">Club Service Director</h5>
                          <p className="text-gray-700 text-sm mb-3">
                            Currently, I serve as the Club Service Director of the Rotaract Club,
                            where I organize engaging activities and events that foster fellowship
                            and strengthen bonds among members.
                          </p>
                        </div>

                        <div className="mb-4">
                          <h5 className="font-semibold text-gray-900 mb-2 text-sm">Vision & Mission</h5>
                          <p className="text-gray-700 text-sm">
                            My ultimate goal is to lead my family with dignity and provide them
                            a life of comfort, respect, and happinessΓÇöwhile growing continuously,
                            learning from every experience, and moving forward with determination.
                          </p>
                        </div>
                      </>
                    )}

                    <div className="text-center mt-4">
                      <Button
                        onClick={() => setShowPraveenDetails(!showPraveenDetails)}
                        variant="outline"
                        size="sm"
                        className="text-primary border-primary hover:bg-primary hover:text-white transition-colors"
                      >
                        {showPraveenDetails ? 'Read Less' : 'Read More'}
                      </Button>
                    </div>
                  </div>

                  {/* Key Highlights */}
                  <div className="mt-6 pt-4 border-t border-gray-200">
                    <h4 className="text-sm font-semibold text-gray-900 mb-3">Key Highlights</h4>
                    <div className="space-y-1 sm:space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="text-blue-600 text-xs">≡ƒôî</span>
                        <span className="text-[10px] sm:text-xs text-gray-700">Club Service Director</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-green-600 text-xs">ΓÜ╜</span>
                        <span className="text-[10px] sm:text-xs text-gray-700">Sports Enthusiast ΓÇô Cricket & Football</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-purple-600 text-xs">≡ƒîƒ</span>
                        <span className="text-[10px] sm:text-xs text-gray-700">Calm & Focused Under Pressure</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-yellow-600 text-xs">≡ƒñ¥</span>
                        <span className="text-[10px] sm:text-xs text-gray-700">Promotes Fellowship & Bonding</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-pink-600 text-xs">≡ƒÄ»</span>
                        <span className="text-[10px] sm:text-xs text-gray-700">Vision ΓÇô Lead with Dignity & Determination</span>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </AnimationWrapper>
            {/* Rtr. Sanjay D ΓÇô All Avenue Chair */}
            <AnimationWrapper delay={500}>
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:scale-[1.02]">
                <div className="p-6 sm:p-8">

                  {/* Team Member Photo */}
                  <div className="text-center mb-6">
                    <div className="w-40 h-40 sm:w-48 sm:h-48 rounded-full overflow-hidden border-4 border-white shadow-lg mx-auto transition-transform duration-300 hover:scale-105">
                      <img
                        src="https://res.cloudinary.com/drmwtmeg3/image/upload/v1755411667/Sanjay_f8kema.jpg"
                        alt="Rtr. Sanjay D ΓÇô All Avenue Chair"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>

                  {/* Team Member Details */}
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      Rtr. Sanjay D
                    </h3>
                    <div className="flex flex-wrap items-center justify-center gap-2 mb-4">
                      <span className="bg-primary text-white px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap">
                        All Avenue Chair
                      </span>
                    </div>
                  </div>

                  {/* Description with Read More */}
                  <div className="prose prose-gray max-w-none">
                    <p className="text-gray-700 leading-relaxed mb-4 text-sm">
                      I am Rtr. Sanjay D, proudly serving as the
                      <span className="font-semibold"> All Avenue Chair</span> of the Rotaract Club of KPRCAS,
                      carrying the responsibility of harmonizing every avenue of service into one united vision
                      for the club.
                    </p>

                    {showSanjayDetails && (
                      <>
                        <div className="mb-4">
                          <h5 className="font-semibold text-gray-900 mb-2 text-sm">Leadership & Coordination</h5>
                          <p className="text-gray-700 text-sm mb-3">
                            With dedication and leadership, I ensure that the activities of Club Service,
                            Community Service, International Service, and Professional Development are
                            well-coordinated and impactful.
                          </p>
                        </div>

                        <div className="mb-4">
                          <h5 className="font-semibold text-gray-900 mb-2 text-sm">Promoting Collaboration</h5>
                          <p className="text-gray-700 text-sm mb-3">
                            As a connecting link among avenues, I promote collaboration, encourage innovation,
                            and support directors in executing meaningful projects.
                          </p>
                        </div>

                        <div className="mb-4">
                          <h5 className="font-semibold text-gray-900 mb-2 text-sm">Inspiration & Inclusiveness</h5>
                          <p className="text-gray-700 text-sm mb-3">
                            My role extends beyond coordinationΓÇöI inspire creativity, motivate members, and
                            nurture a spirit of inclusiveness within the club, ensuring every project contributes
                            to collective growth.
                          </p>
                        </div>

                        <div className="mb-4">
                          <h5 className="font-semibold text-gray-900 mb-2 text-sm">Vision & Mission</h5>
                          <p className="text-gray-700 text-sm">
                            My commitment as All Avenue Chair reflects the true essence of Rotaract leadershipΓÇö
                            bringing people together, driving harmony, and creating lasting change in the
                            community and beyond.
                          </p>
                          <p className="italic text-primary text-sm mt-2">
                            Γ£¿ ΓÇ£Service Above Self.ΓÇ¥
                          </p>
                        </div>
                      </>
                    )}

                    <div className="text-center mt-4">
                      <Button
                        onClick={() => setShowSanjayDetails(!showSanjayDetails)}
                        variant="outline"
                        size="sm"
                        className="text-primary border-primary hover:bg-primary hover:text-white transition-colors"
                      >
                        {showSanjayDetails ? 'Read Less' : 'Read More'}
                      </Button>
                    </div>
                  </div>

                  {/* Key Highlights */}
                  <div className="mt-6 pt-4 border-t border-gray-200">
                    <h4 className="text-sm font-semibold text-gray-900 mb-3">Key Highlights</h4>
                    <div className="space-y-1 sm:space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="text-blue-600 text-xs">≡ƒôî</span>
                        <span className="text-[10px] sm:text-xs text-gray-700">All Avenue Chair</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-green-600 text-xs">≡ƒñ¥</span>
                        <span className="text-[10px] sm:text-xs text-gray-700">Harmonizes All Avenues of Service</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-purple-600 text-xs">≡ƒîì</span>
                        <span className="text-[10px] sm:text-xs text-gray-700">Promotes Collaboration & Inclusiveness</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-yellow-600 text-xs">≡ƒÆí</span>
                        <span className="text-[10px] sm:text-xs text-gray-700">Encourages Innovation & Creativity</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-pink-600 text-xs">Γ£¿</span>
                        <span className="text-[10px] sm:text-xs text-gray-700">Embodies ΓÇ£Service Above SelfΓÇ¥</span>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </AnimationWrapper>
            {/* Rtr. Rashvandh ΓÇô Web Chair */}
            <AnimationWrapper delay={500}>
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:scale-[1.02]">
                <div className="p-6 sm:p-8">

                  {/* Team Member Photo */}
                  <div className="text-center mb-6">
                    <div className="w-40 h-40 sm:w-48 sm:h-48 rounded-full overflow-hidden border-4 border-white shadow-lg mx-auto transition-transform duration-300 hover:scale-105">
                      <img
                        src="https://res.cloudinary.com/drmwtmeg3/image/upload/v1755411665/rashvandh_vkgvm4.jpg"
                        alt="Rtr. [Your Name] ΓÇô Web Chair"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>

                  {/* Team Member Details */}
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      Rtr. Rashvandh A
                    </h3>
                    <div className="flex flex-wrap items-center justify-center gap-2 mb-4">
                      <span className="bg-primary text-white px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap">
                        Web Chair
                      </span>
                    </div>
                  </div>

                  {/* Description with Read More */}
                  <div className="prose prose-gray max-w-none">
                    <p className="text-gray-700 leading-relaxed mb-4 text-sm">
                      As a <span className="font-semibold">first-year Rotaractor</span>, I proudly serve as the
                      <span className="font-semibold"> Web Chair</span> of the Rotaract Club of KPRCAS.
                      My journey in Rotaract is just beginning, but I am determined to use my passion for
                      technology and creativity to strengthen our clubΓÇÖs digital presence.
                    </p>

                    {showWebchairDetails && (
                      <>
                        <div className="mb-4">
                          <h5 className="font-semibold text-gray-900 mb-2 text-sm">A Fresh Perspective</h5>
                          <p className="text-gray-700 text-sm mb-3">
                            Being in my first year, I bring a fresh outlook filled with curiosity,
                            eagerness to learn, and the drive to contribute meaningfully to every project.
                          </p>
                        </div>

                        <div className="mb-4">
                          <h5 className="font-semibold text-gray-900 mb-2 text-sm">Passion for Technology</h5>
                          <p className="text-gray-700 text-sm mb-3">
                            With a deep interest in web development and digital creativity, I aim to
                            create impactful online platforms that represent our clubΓÇÖs spirit, projects,
                            and values to a wider audience.
                          </p>
                        </div>

                        <div className="mb-4">
                          <h5 className="font-semibold text-gray-900 mb-2 text-sm">Building Connections</h5>
                          <p className="text-gray-700 text-sm mb-3">
                            Through my role, I strive to connect Rotaractors not just within our club,
                            but also with the wider communityΓÇöfostering collaboration, innovation, and unity.
                          </p>
                        </div>

                        <div className="mb-4">
                          <h5 className="font-semibold text-gray-900 mb-2 text-sm">Vision & Mission</h5>
                          <p className="text-gray-700 text-sm">
                            My goal is to grow alongside Rotaract, develop my skills, and ensure that
                            our clubΓÇÖs digital identity remains strong, engaging, and inspiring for all.
                          </p>
                          <p className="italic text-primary text-sm mt-2">
                            Γ£¿ ΓÇ£Every big journey starts with a small stepΓÇöand this is mine.ΓÇ¥
                          </p>
                        </div>
                      </>
                    )}

                    <div className="text-center mt-4">
                      <Button
                        onClick={() => setShowWebchairDetails(!showWebchairDetails)}
                        variant="outline"
                        size="sm"
                        className="text-primary border-primary hover:bg-primary hover:text-white transition-colors"
                      >
                        {showWebchairDetails ? 'Read Less' : 'Read More'}
                      </Button>
                    </div>
                  </div>

                  {/* Key Highlights */}
                  <div className="mt-6 pt-4 border-t border-gray-200">
                    <h4 className="text-sm font-semibold text-gray-900 mb-3">Key Highlights</h4>
                    <div className="space-y-1 sm:space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="text-blue-600 text-xs">≡ƒîÉ</span>
                        <span className="text-[10px] sm:text-xs text-gray-700">Web Chair ΓÇô First Year</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-green-600 text-xs">≡ƒÜÇ</span>
                        <span className="text-[10px] sm:text-xs text-gray-700">Fresh Perspective & Eager to Learn</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-purple-600 text-xs">≡ƒÆ╗</span>
                        <span className="text-[10px] sm:text-xs text-gray-700">Passionate About Technology & Digital Growth</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-yellow-600 text-xs">≡ƒñ¥</span>
                        <span className="text-[10px] sm:text-xs text-gray-700">Connects Members Through Online Platforms</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-pink-600 text-xs">Γ£¿</span>
                        <span className="text-[10px] sm:text-xs text-gray-700">Vision ΓÇô Strengthen ClubΓÇÖs Digital Identity</span>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </AnimationWrapper>
            {/* Rtr. Dharsan Sastikesh S.P ΓÇô Public Relations Chair */}
            <AnimationWrapper delay={500}>
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:scale-[1.02]">
                <div className="p-6 sm:p-8">

                  {/* Team Member Photo */}
                  <div className="text-center mb-6">
                    <div className="w-40 h-40 sm:w-48 sm:h-48 rounded-full overflow-hidden border-4 border-white shadow-lg mx-auto transition-transform duration-300 hover:scale-105">
                      <img
                        src="https://res.cloudinary.com/drmwtmeg3/image/upload/v1755411662/Darshan_jnxkak.jpg"
                        alt="Rtr. Dharsan Sastikesh S.P ΓÇô Public Relations Chair"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>

                  {/* Team Member Details */}
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      Rtr. Dharsan Sastikesh S.P
                    </h3>
                    <div className="flex flex-wrap items-center justify-center gap-2 mb-4">
                      <span className="bg-primary text-white px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap">
                        Public Relations Chair
                      </span>
                    </div>
                  </div>

                  {/* Description with Read More */}
                  <div className="prose prose-gray max-w-none">
                    <p className="text-gray-700 leading-relaxed mb-4 text-sm">
                      As the <span className="font-semibold">Public Relations (PR) Chair</span>, I play a
                      vital role in enhancing the image and visibility of the Rotaract Club of KPRCAS.
                      My focus is on <span className="font-semibold">Promoting Club Image (PCI)</span>
                      through effective communication, social media presence, and creative outreach.
                    </p>

                    {showPrchairDetails && (
                      <>
                        <div className="mb-4">
                          <h5 className="font-semibold text-gray-900 mb-2 text-sm">Promote Club Image</h5>
                          <p className="text-gray-700 text-sm mb-3">
                            I ensure a consistent and professional outlook across all platforms,
                            aligning our branding with Rotaract values and maintaining visibility.
                          </p>
                        </div>

                        <div className="mb-4">
                          <h5 className="font-semibold text-gray-900 mb-2 text-sm">Social Media Management</h5>
                          <p className="text-gray-700 text-sm mb-3">
                            From engaging posts to reels, I make sure our social media reflects
                            our vibrant projects and inspires wider community engagement.
                          </p>
                        </div>

                        <div className="mb-4">
                          <h5 className="font-semibold text-gray-900 mb-2 text-sm">Event Promotion & Communication</h5>
                          <p className="text-gray-700 text-sm mb-3">
                            I handle event publicity through creative campaigns and maintain
                            effective internal communication (IC) with members and external
                            communication (EC) with partners and media.
                          </p>
                        </div>

                        <div className="mb-4">
                          <h5 className="font-semibold text-gray-900 mb-2 text-sm">Documentation & Reporting</h5>
                          <p className="text-gray-700 text-sm">
                            I capture photographs, videos, and maintain a <span className="font-semibold">Photo & Video Archive (PVA)</span>.
                            I also contribute to Monthly Newsletters (MN) and press releases.
                          </p>
                          <p className="italic text-primary text-sm mt-2">
                            Γ£¿ ΓÇ£Visibility creates impactΓÇöand impact builds legacy.ΓÇ¥
                          </p>
                        </div>
                      </>
                    )}

                    <div className="text-center mt-4">
                      <Button
                        onClick={() => setShowPrchairDetails(!showPrchairDetails)}
                        variant="outline"
                        size="sm"
                        className="text-primary border-primary hover:bg-primary hover:text-white transition-colors"
                      >
                        {showPrchairDetails ? 'Read Less' : 'Read More'}
                      </Button>
                    </div>
                  </div>

                  {/* Key Highlights */}
                  <div className="mt-6 pt-4 border-t border-gray-200">
                    <h4 className="text-sm font-semibold text-gray-900 mb-3">Key Highlights</h4>
                    <div className="space-y-1 sm:space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="text-blue-600 text-xs">≡ƒôó</span>
                        <span className="text-[10px] sm:text-xs text-gray-700">Promotes Club Image (PCI)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-green-600 text-xs">≡ƒô▒</span>
                        <span className="text-[10px] sm:text-xs text-gray-700">Manages Social Media (SMM)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-purple-600 text-xs">≡ƒÄë</span>
                        <span className="text-[10px] sm:text-xs text-gray-700">Creative Event Promotion (EP)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-yellow-600 text-xs">≡ƒô¥</span>
                        <span className="text-[10px] sm:text-xs text-gray-700">Documentation & Reporting (DR)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-pink-600 text-xs">≡ƒô╕</span>
                        <span className="text-[10px] sm:text-xs text-gray-700">Maintains Photo & Video Archive (PVA)</span>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </AnimationWrapper>

          </div>

          {/* Team member section */}
          <AnimationWrapper delay={600}>
            <div className="text-center mt-16">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
                {teamMembers.map((member, index) => (
                  <AnimationWrapper
                    key={member.id}
                    delay={0.1 * (index + 1)}
                    className="h-full"
                  >
                    <Card className="h-full transition-all duration-300 hover:shadow-lg hover:-translate-y-2">
                      <div className="p-6 text-center">
                        <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden border-4 border-primary/20">
                          <img
                            src={member.image}
                            alt={member.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <h4 className="text-xl font-semibold mb-1">{member.name}</h4>
                        <p className="text-sm text-muted-foreground mb-3">{member.position}</p>
                        <div className="flex justify-center space-x-3">
                        </div>
                      </div>
                    </Card>
                  </AnimationWrapper>
                ))}
              </div>
              <h3 className="text-2xl font-bold mb-6">
                Our <span className="text-primary">Team</span>
              </h3>
              <p className="text-muted-foreground mb-6">
                Here we have our dedicated team members who are working hard to make our club a success.
              </p>
              <Button className="btn-primary mb-12">
                Join Our Team
              </Button>
            </div>
          </AnimationWrapper>
        </div>
      </section>
    </div>
  );
};

export default Team;
