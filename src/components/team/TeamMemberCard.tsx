import { useState } from 'react';
import { Button } from '../ui/button';
import AnimationWrapper from '../AnimationWrapper';

interface TeamMemberCardProps {
  name: string;
  position: string;
  image: string;
  description: string;
  details?: {
    title: string;
    content: string | string[];
  }[];
  achievements?: {
    icon: string;
    text: string;
  }[];
  delay?: number;
}

export const TeamMemberCard = ({
  name,
  position,
  image,
  description,
  details = [],
  achievements = [],
  delay = 0,
}: TeamMemberCardProps) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <AnimationWrapper delay={delay}>
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:scale-[1.02]">
        <div className="p-8">
          <div className="text-center mb-6">
            <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-white shadow-lg mx-auto transition-transform duration-300 hover:scale-105">
              <img 
                src={image} 
                alt={`${name} - ${position}`}
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
              {name}
            </h3>
            <div className="flex flex-wrap items-center justify-center gap-2 mb-4">
              {position.split(',').map((pos, idx) => (
                <span 
                  key={idx}
                  className="bg-primary text-white px-3 py-1 rounded-full text-sm font-semibold"
                >
                  {pos.trim()}
                </span>
              ))}
            </div>
          </div>
          
          <div className="prose prose-gray max-w-none">
            <p className="text-gray-700 leading-relaxed mb-4 text-sm">
              {description}
            </p>
            
            {showDetails && details.length > 0 && (
              <div className="space-y-4">
                {details.map((detail, idx) => (
                  <div key={idx} className="mb-4">
                    <h5 className="font-semibold text-gray-900 mb-2 text-sm">
                      {detail.title}
                    </h5>
                    {Array.isArray(detail.content) ? (
                      <ul className="text-gray-700 text-sm space-y-1 ml-4">
                        {detail.content.map((item, i) => (
                          <li key={i} dangerouslySetInnerHTML={{ __html: item }} />
                        ))}
                      </ul>
                    ) : (
                      <p className="text-gray-700 text-sm">
                        {detail.content}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}
            
            {(details.length > 0 || achievements.length > 0) && (
              <div className="text-center mt-4">
                <Button 
                  onClick={() => setShowDetails(!showDetails)}
                  variant="outline"
                  size="sm"
                  className="text-primary border-primary hover:bg-primary hover:text-white transition-colors"
                >
                  {showDetails ? 'Read Less' : 'Read More'}
                </Button>
              </div>
            )}
          </div>
          
          {achievements.length > 0 && (
            <div className="mt-6 pt-4 border-t border-gray-200">
              <h4 className="text-sm font-semibold text-gray-900 mb-3">
                {showDetails ? 'Key Highlights' : 'Key Achievements'}
              </h4>
              <div className="space-y-2">
                {achievements.map((achievement, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <span className="text-primary text-xs">{achievement.icon}</span>
                    <span className="text-xs text-gray-700">{achievement.text}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </AnimationWrapper>
  );
};

export default TeamMemberCard;
