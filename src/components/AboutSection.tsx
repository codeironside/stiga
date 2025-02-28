import React from 'react';
import { CheckCircle } from 'lucide-react';

const features = [
  'Over 10 years of industry experience',
  'Team of certified professionals',
  'Customized solutions for your business',
  'Ongoing support and maintenance',
  'Transparent pricing and no hidden fees',
  'Commitment to meeting deadlines',
];

const AboutSection = () => {
  return (
    <section id="about" className="py-20 bg-orange-50" data-aos="fade-up">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-8 lg:items-center">
          <div data-aos="fade-right">
            <h2 className="text-base text-orange-600 font-semibold tracking-wide uppercase">About Us</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-800 sm:text-4xl">
              Your Trusted Business Partner
            </p>
            <p className="mt-4 max-w-2xl text-lg text-gray-600">
              Founded in 2010, Stigma has been at the forefront of digital innovation, helping businesses transform and thrive in an increasingly competitive landscape.
            </p>
            <div className="mt-8">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-start">
                    <div className="flex-shrink-0">
                      <CheckCircle className="h-6 w-6 text-green-500" aria-hidden="true" />
                    </div>
                    <p className="ml-3 text-base text-gray-500">{feature}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-10">
              <a
                href="#contact"
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
              >
                Contact Us
              </a>
            </div>
          </div>
          <div className="mt-10 lg:mt-0" data-aos="fade-left">
            <div className="aspect-w-5 aspect-h-3 rounded-lg overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-1.2.1&auto=format&fit=crop&w=2850&q=80"
                alt="Team collaborating"
                className="w-full h-full object-center object-cover"
              />
            </div>
            <div className="mt-4 grid grid-cols-2 gap-4">
              <div className="aspect-w-3 aspect-h-2 rounded-lg overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
                  alt="Office space"
                  className="w-full h-48 object-center object-cover"
                />
              </div>
              <div className="aspect-w-3 aspect-h-2 rounded-lg overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1556761175-4b46a572b786?ixlib=rb-1.2.1&auto=format&fit=crop&w=1567&q=80"
                  alt="Team meeting"
                  className="w-full h-48 object-center object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
