import React from 'react';
import { Code, BarChart, Layers, Globe, Shield, Zap } from 'lucide-react';

const services = [
  {
    title: 'Web Development',
    description: 'Custom websites and web applications built with the latest technologies to meet your specific business needs.',
    icon: Code,
  },
  {
    title: 'Data Analytics',
    description: 'Turn your data into actionable insights with our advanced analytics and reporting solutions.',
    icon: BarChart,
  },
  {
    title: 'UI/UX Design',
    description: 'User-centered design that creates intuitive, engaging experiences for your customers.',
    icon: Layers,
  },
  {
    title: 'Digital Marketing',
    description: 'Comprehensive digital marketing strategies to increase your online presence and drive growth.',
    icon: Globe,
  },
  {
    title: 'Cybersecurity',
    description: 'Protect your business with our robust security solutions and best practices implementation.',
    icon: Shield,
  },
  {
    title: 'Cloud Solutions',
    description: 'Scalable cloud infrastructure and services to optimize your operations and reduce costs.',
    icon: Zap,
  },
];

const ServicesSection = () => {
  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
            <h2 className="text-base text-primary font-semibold tracking-wide uppercase">Services</h2>

            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-neutral sm:text-4xl">

            What We Offer
          </p>
            <p className="mt-4 max-w-2xl text-xl text-neutral lg:mx-auto">

            Comprehensive solutions to help your business thrive in the digital landscape.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <div
              key={index}
              className="relative p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <div>
                <div className="absolute h-12 w-12 rounded-md bg-blue-600 flex items-center justify-center">
                  <service.icon className="h-6 w-6 text-white" aria-hidden="true" />
                </div>
                <div className="ml-16">
                  <h3 className="text-lg font-medium text-neutral">{service.title}</h3>
                  <p className="mt-2 text-base text-neutral">{service.description}</p>
                </div>
              </div>
              <div className="mt-6 ml-16">
                <a href="#contact" className="text-base font-medium text-primary hover:text-primary-500">
                  Learn more <span aria-hidden="true">&rarr;</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
