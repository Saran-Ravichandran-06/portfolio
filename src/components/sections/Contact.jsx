import { forwardRef } from "react";
import { contact } from "../../data/portfolioData";

const Contact = forwardRef(function Contact(_, ref) {
  return (
    <div ref={ref} className="contact-panel">
      <div className="contact-inner">
        <span className="eyebrow" style={{ justifyContent: "center", marginBottom: "1rem" }}>
          Let's talk
        </span>
        <h2 className="contact-title">
          Let's build
          <br />
          something.
        </h2>
        <p className="contact-sub">
          Have an idea worth building? I'd love to hear about it.
        </p>
        <div className="contact-links">
          <a className="contact-link" href={`mailto:${contact.email}`}>
            Email
          </a>
          <a className="contact-link" href="/resume.pdf" target="_blank" rel="noreferrer">
            Resume
          </a>
        </div>
        <p className="contact-foot">{contact.location}</p>
      </div>
    </div>
  );
});

export default Contact;
