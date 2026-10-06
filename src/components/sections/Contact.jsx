import { forwardRef } from "react";
import { contact } from "../../data/portfolioData";

const Contact = forwardRef(function Contact(_, ref) {
  return (
    <div ref={ref} className="contact-panel">
      <div className="contact-inner">
        <h2 className="contact-title">
          Let's build
          <br />
          something.
        </h2>
        <div className="contact-links">
          <a className="contact-link" href={`mailto:${contact.email}`}>
            Email
          </a>
          <a className="contact-link" href="/resume.pdf" target="_blank" rel="noreferrer">
            Resume
          </a>
        </div>
      </div>
    </div>
  );
});

export default Contact;
