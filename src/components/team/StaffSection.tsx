import { useState } from 'react';
import { Button } from '../ui/button';
import AnimationWrapper from '../AnimationWrapper';

export const StaffSection = () => {
  const [showStaffCoordinatorDetails, setShowStaffCoordinatorDetails] = useState(false);

  return (
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

        <div className="max-w-4xl mx-auto">
          <AnimationWrapper delay={100}>
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:scale-[1.02]">
              <div className="p-8">
                <div className="text-center mb-6">
                  <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-white shadow-lg mx-auto transition-transform duration-300 hover:scale-105">
                    <img 
                      src="/src/assets/staff-coordinator.jpg" 
                      alt="Staff Coordinator - Dr. Vinayak SP"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.onerror = null;
                        target.src = '/src/assets/placeholder-avatar.jpg';
                      }}
                    />
                  </div>
                </div>
                
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    Dr. Vinayak SP
                  </h3>
                  <div className="flex flex-wrap items-center justify-center gap-2 mb-4">
                    <span className="bg-primary text-white px-3 py-1 rounded-full text-sm font-semibold">
                      Head Staff Coordinator
                    </span>
                    <span className="bg-primary text-white px-3 py-1 rounded-full text-sm font-semibold">
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
                          <li>• Guided the club through the transformative Roar year 2024-25</li>
                          <li>• Provided steady administrative support and mentorship</li>
                          <li>• Encouraged innovative ideas and bold initiatives</li>
                          <li>• Fostered a culture of trust and collaboration</li>
                          <li>• Supported student leadership development</li>
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
                      className="text-primary border-primary hover:bg-primary hover:text-white transition-colors"
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
  );
};

export default StaffSection;
