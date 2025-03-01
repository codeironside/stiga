import React from 'react';
import { Linkedin, Twitter, Github } from 'lucide-react';

const team = [
  {
    name: 'Jane Cooper',
    role: 'CEO / Co-Founder',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    bio: 'Jane has over 15 years of experience in technology and business leadership.',
    social: {
      twitter: '#',
      linkedin: '#',
      github: '#',
    },
  },
  {
    name: 'Michael Foster',
    role: 'CTO',
    image: 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    bio: 'Michael leads our technical team with expertise in cloud architecture and AI.',
    social: {
      twitter: '#',
      linkedin: '#',
      github: '#',
    },
  },
  {
    name: 'Dries Vincent',
    role: 'Design Director',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    bio: 'Dries brings creative vision and user-centered design principles to all our projects.',
    social: {
      twitter: '#',
      linkedin: '#',
      github: '#',
    },
  },
  {
    name: 'Lindsay Walton',
    role: 'Front-end Developer',
    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    bio: 'Lindsay specializes in creating responsive, accessible, and performant web interfaces.',
    social: {
      twitter: '#',
      linkedin: '#',
      github: '#',
    },
  },
];

const TeamSection = () => {
  return (
    <section id="team" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
            <h2 className="text-base text-primary font-semibold tracking-wide uppercase">Our Team</h2>

            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-neutral sm:text-4xl">

            Meet the People Behind ACME
          </p>
            <p className="mt-4 max-w-2xl text-xl text-neutral lg:mx-auto">

            Our diverse team of experts is passionate about delivering exceptional results.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {team.map((person, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
              <img className="w-full h-64 object-cover" src={person.image} alt={person.name} />
              <div className="p-6">
                <h3 className="text-lg font-medium text-neutral">{person.name}</h3>
                <p className="text-sm text-primary">{person.role}</p>
                <p className="mt-3 text-base text-neutral">{person.bio}</p>
                <div className="mt-4 flex space-x-3">
                  <a href={person.social.twitter} className="text-gray-400 hover:text-gray-500">
                    <span className="sr-only">Twitter</span>
                    <Twitter className="h-5 w-5" />
                  </a>
                  <a href={person.social.linkedin} className="text-gray-400 hover:text-gray-500">
                    <span className="sr-only">LinkedIn</span>
                    <Linkedin className="h-5 w-5" />
                  </a>
                  <a href={person.social.github} className="text-gray-400 hover:text-gray-500">
                    <span className="sr-only">GitHub</span>
                    <Github className="h-5 w-5" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
