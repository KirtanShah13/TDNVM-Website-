import React from 'react';
import { Mail, Phone, Linkedin, Calendar, Award, Users } from 'lucide-react';

const CoreTeamPage: React.FC = () => {
  const coreTeam = [
    {
      id: 1,
      name: 'Mr. Bankim Shah',
      designation: 'President',
      photo: 'https://qhalttjlytvfjxpvuyit.supabase.co/storage/v1/object/public/core-team//Bankim_Shah.png',
      description: 'Leading our community with vision and dedication for over 4 years. Passionate about cultural preservation and community building.',
      email: 'rajesh@samudaya.org',
      phone: '+91 98765 43210',
      linkedin: '#',
      experience: '4 years',
      achievements: 'Organized 50+ events, Increased membership by 200%'
    },
    {
      id: 2,
      name: 'Mr. Sanjit Parikh',
      designation: 'Secretary',
      photo: 'https://qhalttjlytvfjxpvuyit.supabase.co/storage/v1/object/public/core-team//Sanjit_parikh.jpg',
      description: 'Expert in event management and community outreach. Brings innovative ideas to strengthen our cultural programs.',
      email: 'priya@samudaya.org',
      phone: '+91 98765 43211',
      linkedin: '#',
      experience: '3 years',
      achievements: 'Event Excellence Award, Community Impact Recognition'
    },
    {
      id: 3,
      name: 'Mr. Rajesh Shah',
      designation: 'Secretary',
      photo: 'https://qhalttjlytvfjxpvuyit.supabase.co/storage/v1/object/public/core-team//Rajesh_Shah.jpg',
      description: 'Financial expert ensuring transparent and efficient management of community resources and fundraising initiatives.',
      email: 'amit@samudaya.org',
      phone: '+91 98765 43212',
      linkedin: '#',
      experience: '3 years',
      achievements: 'Zero budget deficit, Increased donations by 150%'
    },
    {
      id: 4,
      name: 'Mr. Kiritbhai Gandhi',
      designation: 'Former President',
      photo: 'https://qhalttjlytvfjxpvuyit.supabase.co/storage/v1/object/public/core-team//Kiritbhai_gandhi.jpg',
      description: 'Passionate about Indian arts and culture. Coordinates all cultural programs and maintains our rich traditions.',
      email: 'meera@samudaya.org',
      phone: '+91 98765 43213',
      linkedin: '#',
      experience: '2 years',
      achievements: 'Cultural Heritage Award, 30+ Cultural Programs'
    },
    {
      id: 5,
      name: 'Mr. Sanjay Gandhi',
      designation: 'Vice President',
      photo: 'https://qhalttjlytvfjxpvuyit.supabase.co/storage/v1/object/public/core-team//Sanjay_Gandhi.jpg',
      description: 'Former athlete promoting sports and fitness within our community. Organizes tournaments and wellness programs.',
      email: 'suresh@samudaya.org',
      phone: '+91 98765 43214',
      linkedin: '#',
      experience: '2 years',
      achievements: 'Sports Excellence Award, 20+ Tournaments Organized'
    }, 

    {
      id: 6,
      name: 'Mr. Jayesh Shah',
      designation: 'Vice President',
      photo: 'https://qhalttjlytvfjxpvuyit.supabase.co/storage/v1/object/public/core-team//Sanjay_Shah.png',
      description: 'Former athlete promoting sports and fitness within our community. Organizes tournaments and wellness programs.',
      email: 'suresh@samudaya.org',
      phone: '+91 98765 43214',
      linkedin: '#',
      experience: '2 years',
      achievements: 'Sports Excellence Award, 20+ Tournaments Organized'
    },
    
    {
      id: 7,
      name: 'Mr. Dinesh Shah',
      designation: 'Executive Member',
      photo: 'https://qhalttjlytvfjxpvuyit.supabase.co/storage/v1/object/public/core-team//Dinesh_Shah.jpg',
      description: 'Tech enthusiast managing our digital presence and modernizing community operations with innovative solutions.',
      email: 'arun@samudaya.org',
      phone: '+91 98765 43216',
      linkedin: '#',
      experience: '1 year',
      achievements: 'Digital Transformation Leader, Website & App Development'
    },
    {
      id: 8,
      name: 'Mr. Asish Shah',
      designation: 'Executive Member',
      photo: 'https://qhalttjlytvfjxpvuyit.supabase.co/storage/v1/object/public/core-team//Asish_shah%20.jpg',
      description: 'Communications expert building bridges with other communities and managing our public image and partnerships.',
      email: 'deepika@samudaya.org',
      phone: '+91 98765 43217',
      linkedin: '#',
      experience: '1 year',
      achievements: 'Media Relations Expert, 10+ Partnership Agreements'
    },
    {
      id: 9,
      name: 'Mr. Nikunj Sheth',
      designation: 'Executive Member',
      photo: 'https://wbasgeeijimgbvhduilu.supabase.co/storage/v1/object/sign/core-team/Nikunj_Sheth.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV81N2IwNWJiOC02MmIzLTQ2ODgtYjkzNy02ZTFlNjFhNzFiMWYiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJjb3JlLXRlYW0vTmlrdW5qX1NoZXRoLmpwZyIsImlhdCI6MTc1MDI0NjE4NiwiZXhwIjo4NjU3NTAxNTk3ODZ9.Lvg7FOaMUDRo_Jg2C-80VB_kNeIWZ9FMAl8GBXGWL9k',
      description: 'Event management specialist ensuring smooth execution of all community gatherings and celebrations.',
      email: 'vikram@samudaya.org',
      phone: '+91 98765 43218',
      linkedin: '#',
      experience: '1 year',
      achievements: 'Perfect Event Execution Record, 25+ Events Managed'
    },
    {
      id: 10,
      name: 'Mr. Mahesh Shah',
      designation: 'Executive Member',
      photo: 'https://qhalttjlytvfjxpvuyit.supabase.co/storage/v1/object/public/core-team//Mahesh_Shah.png',
      description: 'Digital marketing expert growing our online community and keeping members connected through social platforms.',
      email: 'anita@samudaya.org',
      phone: '+91 98765 43219',
      linkedin: '#',
      experience: '1 year',
      achievements: '500% Social Media Growth, 10K+ Online Community'
    },
    {
      id: 11,
      name: 'Mr. Varun Desai',
      designation: 'Executive Member',
      photo: 'https://qhalttjlytvfjxpvuyit.supabase.co/storage/v1/object/public/core-team//Varun_Desai.png',
      description: 'Legal expert providing guidance on community matters and ensuring compliance with all regulations.',
      email: 'ravi@samudaya.org',
      phone: '+91 98765 43220',
      linkedin: '#',
      experience: '2 years',
      achievements: 'Legal Compliance 100%, Community Rights Advocate'
    },
    {
      id: 12,
      name: 'Mr. Manish Desai' ,
      designation: 'Executive Member',
      photo: 'https://qhalttjlytvfjxpvuyit.supabase.co/storage/v1/object/public/core-team//Manish_Desai.jpg',
      description: 'Social worker dedicated to community welfare and supporting members in need through various assistance programs.',
      email: 'sita@samudaya.org',
      phone: '+91 98765 43221',
      linkedin: '#',
      experience: '3 years',
      achievements: 'Community Service Award, 100+ Families Helped'
    },
    {
      id: 13,
      name: 'Mr. Bhumir Sheth',   
      designation: 'Executive Member',
      photo: 'https://qhalttjlytvfjxpvuyit.supabase.co/storage/v1/object/public/core-team//Bhumir_Sheth.png',
      description: 'Education advocate promoting learning opportunities and scholarships for community students and professionals.',
      email: 'kiran@samudaya.org',
      phone: '+91 98765 43222',
      linkedin: '#',
      experience: '2 years',
      achievements: 'Educational Excellence Award, 50+ Scholarships Awarded'
    },

    {
      id: 14,
      name: 'Mr. Neel Desai',   
      designation: 'Executive Member',
      photo: 'https://qhalttjlytvfjxpvuyit.supabase.co/storage/v1/object/public/core-team//Neel_Patel.png',
      description: 'Education advocate promoting learning opportunities and scholarships for community students and professionals.',
      email: 'kiran@samudaya.org',
      phone: '+91 98765 43222',
      linkedin: '#',
      experience: '2 years',
      achievements: 'Educational Excellence Award, 50+ Scholarships Awarded'
    }
  ];

  return (
    <div className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Core Team
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Meet the dedicated leaders who drive our community forward. Our core team consists of 
            passionate volunteers committed to preserving culture, building connections, and creating 
            meaningful impact in our community.
          </p>
        </div>

        {/* Team Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="text-center">
            <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="h-8 w-8 text-primary-600" />
            </div>
            <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">13</div>
            <div className="text-gray-600 dark:text-gray-400">Core Members</div>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-secondary-100 dark:bg-secondary-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Calendar className="h-8 w-8 text-secondary-600" />
            </div>
            <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">25+</div>
            <div className="text-gray-600 dark:text-gray-400">Years Combined Experience</div>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-accent-100 dark:bg-accent-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Award className="h-8 w-8 text-accent-600" />
            </div>
            <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">100+</div>
            <div className="text-gray-600 dark:text-gray-400">Successful Events</div>
          </div>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {coreTeam.map((member) => (
            <div key={member.id} className="card overflow-hidden group hover:shadow-2xl transition-all duration-300">
              <div className="relative">
                <img
                  src={member.photo}
                  alt={member.name}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              
              <div className="p-6">
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                    {member.name}
                  </h3>
                  <div className="bg-primary-100 dark:bg-primary-900/20 text-primary-800 dark:text-primary-300 px-3 py-1 rounded-full text-sm font-medium inline-block">
                    {member.designation}
                  </div>
                </div>
                
                <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm leading-relaxed">
                  {member.description}
                </p>
                
                <div className="space-y-2 mb-4 text-sm">
                  <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                    <Calendar className="h-4 w-4 text-primary-500" />
                    <span>Experience: {member.experience}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                    <Award className="h-4 w-4 text-primary-500" />
                    <span className="text-xs">{member.achievements}</span>
                  </div>
                </div>
                
                <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                  <div className="flex space-x-3">
                    <a
                      href={`mailto:${member.email}`}
                      className="flex items-center justify-center w-8 h-8 bg-gray-100 dark:bg-gray-700 hover:bg-primary-100 dark:hover:bg-primary-900/20 rounded-full transition-colors"
                      title="Email"
                    >
                      <Mail className="h-4 w-4 text-gray-600 dark:text-gray-400 hover:text-primary-600" />
                    </a>
                    <a
                      href={`tel:${member.phone}`}
                      className="flex items-center justify-center w-8 h-8 bg-gray-100 dark:bg-gray-700 hover:bg-primary-100 dark:hover:bg-primary-900/20 rounded-full transition-colors"
                      title="Phone"
                    >
                      <Phone className="h-4 w-4 text-gray-600 dark:text-gray-400 hover:text-primary-600" />
                    </a>
                    <a
                      href={member.linkedin}
                      className="flex items-center justify-center w-8 h-8 bg-gray-100 dark:bg-gray-700 hover:bg-primary-100 dark:hover:bg-primary-900/20 rounded-full transition-colors"
                      title="LinkedIn"
                    >
                      <Linkedin className="h-4 w-4 text-gray-600 dark:text-gray-400 hover:text-primary-600" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Leadership Message */}
        <div className="bg-gradient-to-r from-primary-50 to-secondary-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-8 mb-12">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              A Message from Our Leadership
            </h2>
            <blockquote className="text-lg text-gray-700 dark:text-gray-300 italic max-w-3xl mx-auto mb-6">
              "Our strength lies in our unity and shared vision. Together, we're not just preserving 
              our cultural heritage, but actively building a legacy for future generations. Every member 
              of our core team brings unique skills and unwavering dedication to serve our community."
            </blockquote>
            <cite className="text-primary-600 font-medium">- Bankim Shah, President</cite>
          </div>
        </div>

        {/* Join Leadership CTA */}
        <div className="bg-gradient-to-r from-secondary-500 to-primary-500 text-white rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Interested in Leadership?</h2>
          <p className="text-secondary-100 mb-6 max-w-2xl mx-auto">
            We're always looking for passionate community members to join our leadership team. 
            If you're interested in making a difference and have skills to contribute, we'd love to hear from you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-secondary-600 px-8 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors">
              Apply for Leadership
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-medium hover:bg-white hover:text-secondary-600 transition-colors">
              Learn About Roles
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoreTeamPage;