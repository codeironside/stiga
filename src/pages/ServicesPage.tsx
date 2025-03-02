import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';
import { Code, BarChart, Layers, Globe, Shield, Zap, CheckCircle, ArrowRight } from 'lucide-react';

// Updated Animation Variants with added scale and easing for a dynamic feel
const fadeIn = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: { duration: 0.7, ease: "easeOut" }
  }
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2
    }
  }
};

const services = [
  {
    id: 'web-development',
    title: 'Web Development',
    description: 'Custom websites and web applications built with the latest technologies to meet your specific business needs.',
    icon: Code,
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    features: [
      'Responsive design for all devices',
      'Custom CMS integration',
      'E-commerce solutions',
      'Progressive Web Apps (PWAs)',
      'API development and integration',
      'Performance optimization'
    ],
    process: [
      { title: 'Discovery', description: 'We start by understanding your business goals, target audience, and requirements.' },
      { title: 'Planning', description: 'We create a detailed project plan, including sitemap, wireframes, and technical specifications.' },
      { title: 'Design', description: 'Our designers create visually appealing mockups that align with your brand identity.' },
      { title: 'Development', description: 'Our developers bring the designs to life using the latest technologies and best practices.' },
      { title: 'Testing', description: 'We thoroughly test the website across devices and browsers to ensure quality.' },
      { title: 'Launch', description: 'We deploy your website and provide training on how to manage it.' }
    ]
  },
  {
    id: 'data-analytics',
    title: 'Data Analytics',
    description: 'Turn your data into actionable insights with our advanced analytics and reporting solutions.',
    icon: BarChart,
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    features: [
      'Data visualization dashboards',
      'Predictive analytics',
      'Business intelligence solutions',
      'Custom reporting tools',
      'Data integration and ETL',
      'Machine learning models'
    ],
    process: [
      { title: 'Data Assessment', description: 'We evaluate your current data sources, quality, and infrastructure.' },
      { title: 'Strategy Development', description: 'We create a data strategy aligned with your business objectives.' },
      { title: 'Data Architecture', description: 'We design a scalable data architecture to support your analytics needs.' },
      { title: 'Implementation', description: 'We implement the solution, including data pipelines and visualization tools.' },
      { title: 'Training', description: 'We provide training to ensure your team can effectively use the analytics tools.' },
      { title: 'Ongoing Support', description: 'We offer continuous support and optimization of your analytics solution.' }
    ]
  },
  {
    id: 'design',
    title: 'UI/UX Design',
    description: 'User-centered design that creates intuitive, engaging experiences for your customers.',
    icon: Layers,
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    features: [
      'User research and testing',
      'Information architecture',
      'Wireframing and prototyping',
      'Visual design',
      'Interaction design',
      'Accessibility compliance'
    ],
    process: [
      { title: 'Research', description: 'We conduct user research to understand your target audience and their needs.' },
      { title: 'Information Architecture', description: 'We organize content and functionality in a logical, intuitive way.' },
      { title: 'Wireframing', description: 'We create low-fidelity mockups to establish layout and functionality.' },
      { title: 'Visual Design', description: 'We develop the visual language, including colors, typography, and imagery.' },
      { title: 'Prototyping', description: 'We build interactive prototypes to test user flows and interactions.' },
      { title: 'User Testing', description: 'We validate designs with real users to ensure usability and effectiveness.' }
    ]
  },
  {
    id: 'marketing',
    title: 'Digital Marketing',
    description: 'Comprehensive digital marketing strategies to increase your online presence and drive growth.',
    icon: Globe,
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    features: [
      'Search Engine Optimization (SEO)',
      'Pay-Per-Click (PPC) advertising',
      'Social media marketing',
      'Content marketing',
      'Email marketing campaigns',
      'Analytics and performance tracking'
    ],
    process: [
      { title: 'Audit', description: 'We analyze your current digital presence and identify opportunities for improvement.' },
      { title: 'Strategy Development', description: 'We create a customized marketing strategy aligned with your business goals.' },
      { title: 'Campaign Planning', description: 'We plan targeted campaigns across relevant channels.' },
      { title: 'Content Creation', description: 'We develop engaging content that resonates with your audience.' },
      { title: 'Implementation', description: 'We execute campaigns and continuously optimize for performance.' },
      { title: 'Reporting', description: 'We provide detailed reports on campaign performance and ROI.' }
    ]
  },
  {
    id: 'cybersecurity',
    title: 'Cybersecurity',
    description: 'Protect your business with our robust security solutions and best practices implementation.',
    icon: Shield,
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    features: [
      'Security assessments and audits',
      'Vulnerability management',
      'Network security',
      'Data protection',
      'Security awareness training',
      'Incident response planning'
    ],
    process: [
      { title: 'Assessment', description: 'We evaluate your current security posture and identify vulnerabilities.' },
      { title: 'Strategy Development', description: 'We create a comprehensive security strategy tailored to your business.' },
      { title: 'Implementation', description: 'We implement security controls and technologies to protect your assets.' },
      { title: 'Training', description: 'We provide security awareness training for your employees.' },
      { title: 'Monitoring', description: 'We continuously monitor for threats and vulnerabilities.' },
      { title: 'Response Planning', description: 'We develop incident response plans to address security breaches.' }
    ]
  },
  {
    id: 'cloud-solutions',
    title: 'Cloud Solutions',
    description: 'Scalable cloud infrastructure and services to optimize your operations and reduce costs.',
    icon: Zap,
    image: 'https://images.unsplash.com/photo-1535378917042-10a22c95931a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    features: [
      'Cloud migration',
      'Infrastructure as a Service (IaaS)',
      'Platform as a Service (PaaS)',
      'Software as a Service (SaaS)',
      'Cloud security',
      'DevOps implementation'
    ],
    process: [
      { title: 'Assessment', description: 'We evaluate your current infrastructure and identify cloud migration opportunities.' },
      { title: 'Strategy Development', description: 'We create a cloud strategy aligned with your business objectives.' },
      { title: 'Architecture Design', description: 'We design a scalable, secure cloud architecture.' },
      { title: 'Migration', description: 'We migrate your applications and data to the cloud with minimal disruption.' },
      { title: 'Optimization', description: 'We optimize your cloud environment for performance and cost-efficiency.' },
      { title: 'Management', description: 'We provide ongoing cloud management and support services.' }
    ]
  }
];

const ServicesPage = () => {
  // Hero section in-view hook
  const [heroRef, heroInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // Services overview section in-view hook
  const [overviewRef, overviewInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }} 
      animate={{ opacity: 1, scale: 1 }} 
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.5 }}
    >
      {/* Hero Section */}
      <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 bg-gradient-to-br from-primary-50 to-neutral-50 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-30">
          <div className="absolute inset-0 bg-[radial-gradient(#f97316_1px,transparent_1px)] [background-size:20px_20px] animate-pulse"></div>
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            ref={heroRef}
            variants={fadeIn}
            initial="hidden"
            animate={heroInView ? "visible" : "hidden"}
            className="max-w-3xl mx-auto text-center"
          >
            <span className="inline-block px-3 py-1 text-xs font-semibold text-primary-600 bg-primary-100 rounded-full">
              Services
            </span>
            <h1 className="mt-2 text-4xl font-display font-extrabold tracking-tight text-neutral-900 sm:text-5xl md:text-6xl">
              Our Services
            </h1>
            <p className="mt-6 text-xl text-neutral-600">
              We offer a comprehensive range of digital services to help your business thrive in today's competitive landscape. From web development to cybersecurity, we've got you covered.
            </p>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent"></div>
      </section>

      {/* Services Overview Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            ref={overviewRef}
            variants={fadeIn}
            initial="hidden"
            animate={overviewInView ? "visible" : "hidden"}
            className="text-center"
          >
            <span className="inline-block px-3 py-1 text-xs font-semibold text-primary-600 bg-primary-100 rounded-full">
              What We Offer
            </span>
            <h2 className="mt-2 text-3xl leading-8 font-display font-extrabold tracking-tight text-neutral-900 sm:text-4xl">
              Comprehensive Solutions
            </h2>
            <p className="mt-4 max-w-2xl text-xl text-neutral-600 lg:mx-auto">
              Our services are designed to address all aspects of your digital presence and operations.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={overviewInView ? "visible" : "hidden"}
            className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3"
          >
            {services.map((service, index) => (
              <motion.div
                key={index}
                variants={fadeIn}
                whileHover={{ scale: 1.03, y: -5, boxShadow: '0 10px 25px rgba(0,0,0,0.15)' }}
                className="relative p-6 bg-white rounded-lg shadow-md transition-all duration-300"
              >
                <div>
                  <div className="absolute h-12 w-12 rounded-md bg-gradient-to-r from-primary-600 to-primary-500 flex items-center justify-center">
                    <service.icon className="h-6 w-6 text-white" aria-hidden="true" />
                  </div>
                  <div className="ml-16">
                    <h3 className="text-lg font-display font-medium text-neutral-900">
                      {service.title}
                    </h3>
                    <p className="mt-2 text-base text-neutral-600">
                      {service.description}
                    </p>
                  </div>
                </div>
                <div className="mt-6 ml-16">
                  <a
                    href={`#${service.id}`}
                    className="text-base font-medium text-primary-600 hover:text-primary-500 inline-flex items-center transition-colors duration-300"
                  >
                    Learn more <ArrowRight className="ml-1 h-4 w-4" />
                  </a>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Individual Service Sections */}
      {services.map((service, index) => {
        const [serviceRef, serviceInView] = useInView({
          triggerOnce: true,
          threshold: 0.1,
        });

        return (
          <section 
            key={service.id} 
            id={service.id} 
            className={`py-20 ${index % 2 === 0 ? 'bg-neutral-50' : 'bg-white'}`}
          >
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="lg:grid lg:grid-cols-2 lg:gap-12 lg:items-center">
                <motion.div
                  ref={serviceRef}
                  variants={fadeIn}
                  initial="hidden"
                  animate={serviceInView ? "visible" : "hidden"}
                  className={index % 2 === 0 ? 'order-1' : 'order-2'}
                >
                  <span className="inline-block px-3 py-1 text-xs font-semibold text-primary-600 bg-primary-100 rounded-full">
                    Service
                  </span>
                  <h2 className="mt-2 text-3xl leading-8 font-display font-extrabold tracking-tight text-neutral-900 sm:text-4xl">
                    {service.title}
                  </h2>
                  <p className="mt-4 text-lg text-neutral-600">
                    {service.description}
                  </p>
                  <div className="mt-8">
                    <h3 className="text-xl font-display font-semibold text-neutral-900">Key Features</h3>
                    <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                      {service.features.map((feature, featureIndex) => (
                        <motion.div 
                          key={featureIndex} 
                          className="flex items-start"
                          initial={{ opacity: 0, x: -20 }}
                          animate={serviceInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                          transition={{ duration: 0.5, delay: featureIndex * 0.1 }}
                        >
                          <div className="flex-shrink-0">
                            <CheckCircle className="h-6 w-6 text-primary-500" aria-hidden="true" />
                          </div>
                          <p className="ml-3 text-base text-neutral-600">{feature}</p>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                  <div className="mt-10">
                    <Link
                      to="/contact"
                      className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-700 hover:to-primary-600 transition-all duration-300 transform hover:scale-105"
                    >
                      Get Started
                    </Link>
                  </div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
                  animate={serviceInView ? { opacity: 1, x: 0 } : { opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className={`mt-10 lg:mt-0 ${index % 2 === 0 ? 'order-2' : 'order-1'}`}
                >
                  <div className="relative rounded-lg overflow-hidden shadow-xl transform hover:scale-105 transition-transform duration-300">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-center object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-primary-500 mix-blend-multiply opacity-20"></div>
                  </div>
                </motion.div>
              </div>

              {/* Process Section */}
              <div className="mt-20">
                <div className="text-center">
                  <h3 className="text-2xl font-display font-semibold text-neutral-900">Our Process</h3>
                  <p className="mt-4 max-w-2xl text-lg text-neutral-600 mx-auto">
                    How we deliver exceptional {service.title} solutions.
                  </p>
                </div>
                <div className="mt-12 max-w-5xl mx-auto">
                  <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {service.process.map((step, stepIndex) => (
                      <motion.div
                        key={stepIndex}
                        initial={{ opacity: 0, y: 20 }}
                        animate={serviceInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                        transition={{ duration: 0.5, delay: stepIndex * 0.1 + 0.3 }}
                        className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
                      >
                        <div className="flex items-center mb-4">
                          <div className="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-full bg-primary-100 text-primary-600 font-bold text-lg">
                            {stepIndex + 1}
                          </div>
                          <h4 className="ml-4 text-lg font-medium text-neutral-900">{step.title}</h4>
                        </div>
                        <p className="text-neutral-600">{step.description}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>
        );
      })}

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary-600 to-primary-500">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-display font-bold text-white sm:text-4xl">
              Ready to transform your business?
            </h2>
            <p className="mt-4 text-xl text-primary-100">
              Get in touch with us today to discuss how our services can help you achieve your goals.
            </p>
            <div className="mt-8 flex justify-center">
              <motion.div
                whileHover={{ scale: 1.05, rotate: 1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-primary-600 bg-white hover:bg-neutral-100 transition-all duration-300"
                >
                  Contact us
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default ServicesPage;
