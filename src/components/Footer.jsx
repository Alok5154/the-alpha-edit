import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, ArrowUpRight } from 'lucide-react';
import './Footer.css';

const InstagramIcon = (props) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
    <rect x="4" y="4" width="16" height="16" rx="5" />
    <circle cx="12" cy="12" r="3.5" />
    <circle cx="17" cy="7" r="1" />
  </svg>
);

const LinkedinIcon = (props) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
    <path d="M6.5 9.5V18" />
    <path d="M6.5 6.5V6.4" />
    <path d="M11 18v-8.5" />
    <path d="M11 13.1c0-2.2 1.35-3.8 3.4-3.8 1.95 0 3.1 1.35 3.1 3.7v5" />
  </svg>
);

const socialLinks = [
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/thealphaedit.in?igsh=MWF5N3puMThuenk2eg==',
    icon: InstagramIcon,
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/company/thealphaedit/?viewAsMember=true',
    icon: LinkedinIcon,
  },
  {
    label: 'Email',
    href: 'mailto:thealphaedit101@gmail.com',
    icon: Mail,
  },
];

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/mqenwpvr';

const Footer = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: 'YouTube Editing',
    details: '',
  });
  const [formStatus, setFormStatus] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    setFormStatus(null);

    if (FORMSPREE_ENDPOINT.includes('YOUR_FORM_ID')) {
      const mailBody = `Name: ${formData.name}\nEmail: ${formData.email}\nService: ${formData.service}\nProject Details:\n${formData.details}`;
      window.location.href = `mailto:thealphaedit101@gmail.com?subject=Custom Video Editing Request&body=${encodeURIComponent(mailBody)}`;
      setSubmitting(false);
      setFormStatus('success');
      return;
    }

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          service: formData.service,
          details: formData.details,
          _subject: 'Custom Video Editing Request',
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      setFormStatus('success');
      setFormData({ name: '', email: '', service: 'YouTube Editing', details: '' });
    } catch (error) {
      setFormStatus('error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <section className="final-cta-section">
        <div className="spotlight-bg"></div>
        <div className="cta-orbit orbit-one" aria-hidden="true"></div>
        <div className="cta-orbit orbit-two" aria-hidden="true"></div>
        <div className="container final-cta-container">
          <motion.h2
            className="final-cta-title"
            initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            STOP DELAYING YOUR GROWTH.<br />SCALE TODAY.
          </motion.h2>

          <motion.a
            href="https://wa.me/message/XXVVKUQAMRZLG1"
            className="btn-primary final-cta-btn"
            initial={{ opacity: 0, scale: 0.85, y: 20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{
              scale: 1.06,
              boxShadow: "0 0 40px rgba(217, 253, 49, 0.4), 0 0 80px rgba(120, 220, 255, 0.2)",
            }}
            whileTap={{ scale: 0.95 }}
          >
            Book a Chat
            <ArrowUpRight size={20} />
          </motion.a>
        </div>
      </section>

      <footer className="site-footer">
        <div className="container footer-container">
          <motion.div
            className="footer-left"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6 }}
          >
            <div className="footer-brand">
              <img src="/alpha-edit-header-logo.png" alt="The Alpha Edit" className="footer-logo" />
            </div>
            <p className="footer-desc">
              The ultimate creative partner for YouTubers and brands, engineered for high retention and maximum growth.
            </p>
            <div className="footer-whatsapp">
              <strong>WhatsApp:</strong> <a href="https://wa.me/919217540120" target="_blank" rel="noreferrer">+91 92175 40120</a>
            </div>
            <div className="footer-socials" aria-label="Connect with us">
              {socialLinks.map(({ label, href, icon: Icon }, index) => (
                <motion.a
                  key={label}
                  href={href}
                  className="social-link"
                  aria-label={label}
                  title={label}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel={href.startsWith('http') ? 'noreferrer' : undefined}
                  initial={{ opacity: 0, y: 12, scale: 0.9 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.2 + index * 0.08 }}
                  whileHover={{
                    y: -6,
                    scale: 1.12,
                    rotate: 8,
                    boxShadow: "0 0 20px rgba(217, 253, 49, 0.35)"
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon size={18} strokeWidth={2.2} />
                </motion.a>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="footer-links"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, delay: 0.12 }}
          >
            <div className="link-group">
              <span className="link-group-title">Sections</span>
              {['Services', 'Why Us?', 'Pricing'].map((text, i) => (
                <motion.a
                  key={text}
                  href={`#${text === 'Why Us?' ? 'whyus' : text.toLowerCase()}`}
                  whileHover={{ x: 6, color: 'var(--accent-neon)' }}
                  transition={{ duration: 0.2 }}
                >
                  {text}
                </motion.a>
              ))}
            </div>
            <div className="link-group">
              <span className="link-group-title">Pages</span>
              {[
                { text: 'Home', href: '#' },
                { text: 'Contact', href: '#contact' },
                { text: 'FAQ', href: '#faq' },
              ].map(({ text, href }) => (
                <motion.a
                  key={text}
                  href={href}
                  whileHover={{ x: 6, color: 'var(--accent-neon)' }}
                  transition={{ duration: 0.2 }}
                >
                  {text}
                </motion.a>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="footer-contact"
            id="contact"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <span className="contact-label">Custom Request</span>
            <h3 className="contact-title">Start your custom video editing project</h3>
            <p className="contact-copy">Tell us what you need and we'll send the details straight to your inbox.</p>

            <form className="contact-form" onSubmit={handleSubmit}>
              <label>
                Name*
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your full name"
                  required
                />
              </label>

              <label>
                Email*
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  required
                />
              </label>

              <label>
                Service required*
                <select name="service" value={formData.service} onChange={handleChange} required>
                  <option>YouTube Editing</option>
                  <option>Shorts / Reels</option>
                  <option>Brand Video</option>
                  <option>Channel Growth Strategy</option>
                  <option>Full Channel Management</option>
                </select>
              </label>

              <label>
                Project details*
                <textarea
                  name="details"
                  value={formData.details}
                  onChange={handleChange}
                  placeholder="Describe the video, deadline, style, and any assets you have."
                  rows="5"
                  required
                />
              </label>

              <motion.button
                type="submit"
                className="btn-primary contact-submit"
                disabled={submitting}
                whileHover={{ scale: 1.02, boxShadow: '0 16px 40px rgba(217, 253, 49, 0.2)' }}
                whileTap={{ scale: 0.98 }}
              >
                {submitting ? 'Sending...' : 'Send Request'}
              </motion.button>

              {formStatus === 'success' && (
                <motion.p
                  className="form-note success"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  Request ready. If you used the mail fallback, your email app should open now.
                </motion.p>
              )}
              {formStatus === 'error' && (
                <motion.p
                  className="form-note error"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  Unable to send right now. Please use <a href="mailto:thealphaedit101@gmail.com">thealphaedit101@gmail.com</a>.
                </motion.p>
              )}
            </form>
          </motion.div>
        </div>
        <motion.div
          className="footer-bottom"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <p>© {new Date().getFullYear()} The Alpha Edit. All rights reserved.</p>
        </motion.div>
      </footer>
    </>
  );
};

export default Footer;
