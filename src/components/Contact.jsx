import { Download, Github, Linkedin, Mail, MapPin, Phone } from "lucide-react";
import { profile } from "../data/profile";
import MotionWrapper from "./MotionWrapper";
import SectionTitle from "./SectionTitle";

export default function Contact() {
  return (
    <section id="contact" className="section-shell section-band" aria-labelledby="contact-heading">
      <SectionTitle
        id="contact-heading"
        eyebrow="Contact"
        title="Available for AI products, automation, and full-stack builds."
        description="Clear next actions for recruiters, founders, and teams who need a practical builder."
      />

      <div className="contact-grid">
        <MotionWrapper className="contact-card contact-card-primary">
          <p className="contact-kicker">Best fit</p>
          <h3>AI engineering roles, freelance automation systems, and SaaS MVP delivery.</h3>
          <p>
            Send a short message with the product, workflow, or role you have in mind. I will reply with the
            clearest next step.
          </p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <a className="btn btn-primary" href={profile.socials.email}>
              <Mail aria-hidden="true" />
              Email Hari
            </a>
            <a className="btn btn-secondary" href={profile.cv.english} download>
              <Download aria-hidden="true" />
              English CV
            </a>
          </div>
        </MotionWrapper>

        <MotionWrapper className="contact-card">
          <div className="contact-list">
            <a href={profile.socials.email}>
              <Mail aria-hidden="true" />
              <span>
                Email
                <strong>{profile.email}</strong>
              </span>
            </a>
            <a href={`tel:${profile.phone.replace(/\s/g, "")}`}>
              <Phone aria-hidden="true" />
              <span>
                Phone
                <strong>{profile.phone}</strong>
              </span>
            </a>
            <a href={profile.socials.linkedin} target="_blank" rel="noreferrer">
              <Linkedin aria-hidden="true" />
              <span>
                LinkedIn
                <strong>mohamed-rizq-hari</strong>
              </span>
            </a>
            <a href={profile.socials.github} target="_blank" rel="noreferrer">
              <Github aria-hidden="true" />
              <span>
                GitHub
                <strong>HariMohamed</strong>
              </span>
            </a>
            <div>
              <MapPin aria-hidden="true" />
              <span>
                Location
                <strong>{profile.location}</strong>
              </span>
            </div>
          </div>

          <div className="language-grid" aria-label="Languages">
            {profile.languages.map((language) => (
              <div key={language.name}>
                <span>{language.name}</span>
                <strong>{language.level}</strong>
              </div>
            ))}
          </div>
        </MotionWrapper>
      </div>
    </section>
  );
}
