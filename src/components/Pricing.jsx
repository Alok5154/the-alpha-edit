import { motion, useScroll, useTransform } from 'framer-motion';
import { CheckCircle2, CreditCard, Landmark, ShieldCheck, Star, Wallet } from 'lucide-react';
import { useRef } from 'react';
import './Pricing.css';

const plans = [
  {
    name: "ESSENTIAL",
    oldPrice: "₹10k",
    price: "₹4k",
    for: "For creators starting their short-form journey",
    features: [
      "8 High-Quality Shorts/Reels per month",
      "Trending Audio Selection",
      "Dynamic Captions",
      "Weekly delivery"
    ],
    highlight: false
  },
  {
    name: "ELITE",
    badge: "most popular",
    oldPrice: "₹18k",
    price: "₹10k",
    for: "For dedicated YouTubers scaling their main channel",
    features: [
      "4 YouTube Long-Form Videos (up to 15m)",
      "4 Repurposed YouTube Shorts",
      "Custom Motion Graphics & VFX",
      "4 Custom High-CTR Thumbnails",
      "Priority Slack Communication"
    ],
    highlight: true
  },
  {
    name: "ULTIMATE",
    oldPrice: "₹30k",
    price: "₹18k",
    for: "For established brands seeking full management",
    features: [
      "8 YouTube Long-Form Videos",
      "15 High-Quality Shorts/Reels",
      "A/B Testing Thumbnails (2 per video)",
      "YouTube SEO & Upload Management",
      "Dedicated Creative Director"
    ],
    highlight: false
  }
];

const paymentOptions = [
  {
    icon: Wallet,
    title: "UPI Payments",
    text: "Fast Indian checkout through UPI after your plan is confirmed."
  },
  {
    icon: CreditCard,
    title: "Cards & Wallets",
    text: "Pay monthly using major debit cards, credit cards, or wallet options."
  },
  {
    icon: Landmark,
    title: "Bank Transfer",
    text: "Invoice-based transfer available for brands and agency retainers."
  }
];

const cardVariants = {
  hidden: { opacity: 0, y: 60, scale: 0.9 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: i * 0.15,
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

const Pricing = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const yTransform = useTransform(scrollYProgress, [0, 1], [200, -200]);
  const rotateTransform = useTransform(scrollYProgress, [0, 1], [0, 360]);

  return (
    <section id="pricing" className="pricing-section" ref={sectionRef}>
      <div className="shooting-stars">
        <div className="shooting-star"></div>
        <div className="shooting-star" style={{ animationDelay: '2s', left: '20%', top: '10%' }}></div>
        <div className="shooting-star" style={{ animationDelay: '4s', left: '70%', top: '30%' }}></div>
      </div>

      <motion.div
        className="parallax-star left"
        style={{ y: yTransform, rotate: rotateTransform }}
      >
        <Star size={200} strokeWidth={1} />
      </motion.div>

      <motion.div
        className="parallax-star right"
        style={{ y: useTransform(scrollYProgress, [0, 1], [-200, 200]), rotate: useTransform(scrollYProgress, [0, 1], [360, 0]) }}
      >
        <Star size={150} strokeWidth={1} />
      </motion.div>

      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">The Best Services <span className="text-neon">Ever</span></h2>
          <p className="section-subtitle">Pick your plan and scale your channel today. One flat monthly fee.</p>
        </motion.div>

        <div className="pricing-grid">
          {plans.map((plan, idx) => (
            <motion.div
              key={idx}
              className={`pricing-card glass ${plan.highlight ? 'highlight' : ''} ${plan.name === 'ULTIMATE' ? 'ultimate-card' : ''}`}
              custom={idx}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              variants={cardVariants}
              whileHover={{
                y: -14,
                scale: plan.highlight ? 1.04 : 1.03,
                rotateX: 2,
                rotateY: idx === 1 ? 0 : idx === 0 ? -3 : 3,
                transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] },
              }}
            >
              {plan.badge && (
                <motion.div
                  className="plan-badge"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5, type: 'spring', stiffness: 300 }}
                >
                  {plan.badge}
                </motion.div>
              )}
              <h3 className="plan-name">{plan.name}</h3>
              <div className="plan-price-box">
                <span className="old-price">{plan.oldPrice}</span>
                <div className="current-price">
                  <span className="price-val">{plan.price}</span>
                  <span className="price-suffix">/mo</span>
                </div>
              </div>
              <p className="plan-for">{plan.for}</p>

              <motion.a
                href="https://wa.me/message/XXVVKUQAMRZLG1"
                className={`btn-primary plan-btn ${plan.highlight ? '' : 'btn-outline'}`}
                whileHover={{ scale: 1.04, boxShadow: plan.highlight ? '0 12px 30px rgba(217, 253, 49, 0.3)' : '0 12px 30px rgba(217, 253, 49, 0.15)' }}
                whileTap={{ scale: 0.96 }}
              >
                Book a Chat
              </motion.a>

              <div className="plan-features">
                <div className="features-title">what's included:</div>
                <ul>
                  {plan.features.map((feat, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -12 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.15 + i * 0.06, duration: 0.5 }}
                    >
                      <CheckCircle2 size={16} className="feat-icon" />
                      <span>{feat}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="payment-section glass"
          initial={{ opacity: 0, y: 40, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="payment-copy">
            <div className="payment-kicker">
              <ShieldCheck size={18} />
              Secure monthly payments
            </div>
            <h3>Choose your plan, confirm the scope, then pay safely.</h3>
            <p>
              We collect payment only after the discovery call, so your deliverables, timeline, and revision process are clear before work begins.
            </p>
          </div>

          <div className="payment-options">
            {paymentOptions.map(({ icon: Icon, title, text }, index) => (
              <motion.div
                className="payment-option"
                key={title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                whileHover={{
                  y: -8,
                  rotateX: 3,
                  boxShadow: '0 18px 42px rgba(0, 0, 0, 0.24), inset 0 0 28px rgba(217, 253, 49, 0.06)',
                  borderColor: 'rgba(217, 253, 49, 0.3)',
                  transition: { duration: 0.3 },
                }}
              >
                <motion.span
                  className="payment-icon"
                  whileHover={{ rotate: 8, scale: 1.1 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <Icon size={22} />
                </motion.span>
                <strong>{title}</strong>
                <span>{text}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Pricing;
