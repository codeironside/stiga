import { motion } from "framer-motion";
import { FadeIn, SlideUp } from 'framer-motion'; // Make sure to define your animations here
import { useState } from "react";

// About Us page component
const AboutPage = () => {
  return (
    <section className="py-20 bg-dark-blue text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center"
        >
          <h2 className="text-4xl font-display font-extrabold leading-tight text-neutral-100">
            About Us
          </h2>
          <p className="mt-4 max-w-3xl text-lg text-neutral-300 lg:mx-auto">
            At Striga, we specialize in providing secure and innovative solutions for industries like IT, security, construction, and real estate. Through strategic relationships, partnerships, and targeted sponsorships, we position ourselves as a leader in the space of technology risk mitigation and secure solutions.
          </p>
        </motion.div>

        <motion.div
          className="mt-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 1 }}
        >
          <div className="space-y-12">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="bg-neutral-800 p-8 rounded-lg shadow-lg"
            >
              <h3 className="text-2xl font-medium text-neutral-100">
                1. Networking and Relationship Building
              </h3>
              <p className="mt-4 text-neutral-300">
                Networking is at the heart of our strategy. We join industry-specific groups in IT, security, construction, and real estate sectors, establishing credibility through participation in events. These connections not only enhance our network but also provide us with opportunities to showcase our expertise.
              </p>

              <motion.div
                className="mt-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 1 }}
              >
                <h4 className="text-xl font-medium text-neutral-100">Industry-Specific Networking</h4>
                <p className="text-neutral-300">
                  We actively engage with local chambers of commerce and other industry leaders, attending events and forming connections with influential businesses and government organizations.
                </p>
              </motion.div>

              <motion.div
                className="mt-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1, duration: 1 }}
              >
                <h4 className="text-xl font-medium text-neutral-100">VIP Events</h4>
                <p className="text-neutral-300">
                  We host exclusive dinners and meetups for executives, high-net-worth individuals, and government officials, where we can present Striga’s value in an intimate setting.
                </p>
              </motion.div>

              <motion.div
                className="mt-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.4, duration: 1 }}
              >
                <h4 className="text-xl font-medium text-neutral-100">Leveraging Our Network</h4>
                <p className="text-neutral-300">
                  Using our connections, we engage with key individuals and explore introductions that help position Striga as a trusted provider of innovative, secure solutions.
                </p>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.7, duration: 1 }}
              className="bg-neutral-800 p-8 rounded-lg shadow-lg"
            >
              <h3 className="text-2xl font-medium text-neutral-100">
                2. Targeted Sponsorships and Partnerships
              </h3>
              <p className="mt-4 text-neutral-300">
                Our company thrives on the strategic partnerships and sponsorships we forge. Through these, we increase our exposure and amplify Striga’s role as an industry leader in secure, innovative solutions.
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutPage;
