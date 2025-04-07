
import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const staggerChildren = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.2
      } 
    }
  };

  return (
    <div className="bg-background text-foreground">
      {/* Hero section */}
      <motion.section 
        className="relative py-16 md:py-24"
        initial="hidden"
        animate="visible"
        variants={fadeIn}
      >
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <motion.h1 
              className="text-4xl md:text-5xl font-bold mb-6"
              variants={fadeIn}
            >
              Our Story
            </motion.h1>
            <motion.p 
              className="text-lg md:text-xl text-muted-foreground mb-8"
              variants={fadeIn}
            >
              We're on a mission to bring style, comfort and sustainability to your everyday essentials
            </motion.p>
          </div>
        </div>
      </motion.section>

      {/* Our mission */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <img 
                src="https://images.unsplash.com/photo-1556740738-b6a63e27c4df?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" 
                alt="Our mission" 
                className="rounded-lg shadow-lg w-full h-auto object-cover aspect-[4/3]"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
              <p className="text-muted-foreground mb-6">
                At The Socks Box, we believe that the smallest details make the biggest difference. 
                Our mission is to transform an everyday essential into something extraordinary. 
                We're committed to crafting premium socks that blend comfort, durability, 
                and style while maintaining our dedication to sustainable and ethical practices.
              </p>
              <p className="text-muted-foreground">
                Each pair of socks we create is designed to provide you with unparalleled comfort 
                while expressing your unique personal style. Whether you're dressing for a business 
                meeting, a casual outing, or an athletic endeavor, we have the perfect pair waiting for you.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our values */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center max-w-2xl mx-auto mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold mb-4">Our Values</h2>
            <p className="text-muted-foreground">
              The principles that guide everything we do at The Socks Box
            </p>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={staggerChildren}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div 
              className="bg-card rounded-lg p-6 shadow-md"
              variants={fadeIn}
            >
              <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <span className="text-primary text-2xl">♻️</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Sustainability</h3>
              <p className="text-muted-foreground">
                We're committed to reducing our environmental footprint through sustainable materials,
                ethical manufacturing, and eco-friendly packaging.
              </p>
            </motion.div>
            
            <motion.div 
              className="bg-card rounded-lg p-6 shadow-md"
              variants={fadeIn}
            >
              <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <span className="text-primary text-2xl">🔍</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Quality</h3>
              <p className="text-muted-foreground">
                We source the finest materials and employ rigorous quality control to ensure 
                our socks provide exceptional comfort and longevity.
              </p>
            </motion.div>
            
            <motion.div 
              className="bg-card rounded-lg p-6 shadow-md"
              variants={fadeIn}
            >
              <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <span className="text-primary text-2xl">🎨</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Innovation</h3>
              <p className="text-muted-foreground">
                We continuously explore new designs, materials, and technologies to enhance 
                comfort, durability, and style in every pair of socks.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Team section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center max-w-2xl mx-auto mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold mb-4">Our Team</h2>
            <p className="text-muted-foreground">
              Meet the passionate individuals behind The Socks Box
            </p>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={staggerChildren}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              {
                name: "Sarah Johnson",
                role: "Founder & CEO",
                image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"
              },
              {
                name: "Michael Chen",
                role: "Head of Design",
                image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"
              },
              {
                name: "Elena Rodriguez",
                role: "Operations Manager",
                image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=388&q=80"
              },
              {
                name: "David Thompson",
                role: "Marketing Director",
                image: "https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
              }
            ].map((member, index) => (
              <motion.div 
                key={index}
                className="bg-card rounded-lg overflow-hidden shadow-md"
                variants={fadeIn}
                whileHover={{ y: -5 }}
                transition={{ type: "tween" }}
              >
                <div className="aspect-[3/4] relative overflow-hidden">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="p-4 text-center">
                  <h3 className="font-semibold text-lg">{member.name}</h3>
                  <p className="text-muted-foreground">{member.role}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;
