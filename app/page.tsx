"use client";

import { useEffect, type ReactNode } from "react";

const navigation = [
  ["announcements", "Announcements"],
  ["course-information", "Course Information"],
  ["grading-scheme", "Grading Scheme"],
  ["lecture-notes", "Lecture Notes"],
  ["homework", "Homework"],
  ["project-assignments", "Course Project"],
  ["instructors", "Instructor"],
  ["teaching-assistants", "Teaching Assistants"],
] as const;

export default function Home() {
  useEffect(() => {
    const sections = navigation
      .map(([id]) => document.getElementById(id))
      .filter((section): section is HTMLElement => Boolean(section));
    const links = Array.from(document.querySelectorAll<HTMLAnchorElement>(".nav-link[data-section]"));

    const updateActiveLink = () => {
      const marker = window.scrollY + 140;
      let activeId = sections[0]?.id;
      for (const section of sections) {
        if (section.offsetTop <= marker) activeId = section.id;
      }
      links.forEach((link) => {
        const active = link.dataset.section === activeId;
        link.classList.toggle("active", active);
        if (active) link.setAttribute("aria-current", "location");
        else link.removeAttribute("aria-current");
      });
    };

    updateActiveLink();
    window.addEventListener("scroll", updateActiveLink, { passive: true });
    return () => window.removeEventListener("scroll", updateActiveLink);
  }, []);

  return (
    <div className="course-shell">
      <aside className="sidebar">
        <div className="sidebar-inner">
          <a className="course-brand" href="#announcements" aria-label="Advanced AI Computing and Systems home">
            <span className="course-title">Advanced AI Computing and Systems</span>
            <span className="semester">Fall 2026</span>
          </a>

          <details className="mobile-menu">
            <summary>Course menu</summary>
            <Navigation />
          </details>
          <div className="desktop-menu">
            <Navigation />
          </div>

          <div className="sidebar-note">
            <span className="status-dot" aria-hidden="true" />
            Course materials available
          </div>
        </div>
      </aside>

      <main className="content-area">
        <section id="announcements" className="content-section first-section">
          <SectionTitle eyebrow="Latest updates" title="Announcements" />
          <div className="announcement-featured">
            <div>
              <span className="announcement-label">Welcome</span>
              <h3>Advanced AI Computing and Systems · Fall 2026</h3>
              <p>
                This postgraduate course explores the architectures, networks, and distributed
                systems behind modern AI computing and large language model infrastructure.
              </p>
            </div>
            <time dateTime="2026-08-28">28 Aug 2026</time>
          </div>
          <div className="announcement-grid">
            <article className="announcement-card">
              <span className="card-kicker">Course materials</span>
              <h3>Content coming soon</h3>
              <p>Slides and supporting materials will appear in the Lecture Notes section.</p>
            </article>
            <article className="announcement-card">
              <span className="card-kicker">Canvas</span>
              <h3>Course page to be announced</h3>
              <p>The Canvas link will be added after the Fall 2026 course page is available.</p>
            </article>
          </div>
        </section>

        <section id="course-information" className="content-section">
          <SectionTitle eyebrow="About the course" title="Course Information" />
          <article className="course-article">
            <h3>Course Overview</h3>
            <p>
              This 5000-level postgraduate course introduces state-of-the-art computer
              architectures, networks, and distributed systems for AI computing. It connects
              hardware and systems evolution with large language model infrastructure, then
              brings the ideas together in an end-to-end course project.
            </p>
          </article>

          <article className="course-article">
            <h3>Prerequisites</h3>
            <ul>
              <li>Operating Systems, Design and Analysis of Computer Architectures, or Computer and Communication Networks</li>
              <li>Basic C++ programming knowledge</li>
              <li>Basic machine learning knowledge</li>
              <li>A passion for understanding computer architectures, networks, and LLM systems in depth</li>
            </ul>
          </article>

          <article className="course-article">
            <h3>Major Learning Goals</h3>
            <ul className="outcome-list">
              <li>Understand widely used and state-of-the-art techniques in AI infrastructure.</li>
              <li>Design and build an end-to-end infrastructure stack for large language models.</li>
              <li>Develop practical skills in multithreaded programming and AI algorithms that are valuable for research and industry careers.</li>
              <li>Build intuition for system design choices, trade-offs, and the many interconnected factors involved in becoming a strong system architect.</li>
            </ul>
          </article>

          <article className="course-article">
            <h3>Academic Integrity</h3>
            <p>All exercises submitted for grading must represent the results of each student&apos;s own independent efforts. Students may discuss methodologies with classmates, but must do the work independently.</p>
            <ul>
              <li>Do not copy work from another student or person.</li>
              <li>Do not look at another student&apos;s actual solution.</li>
              <li>Do not share actual code or solution schemes with other students or people.</li>
              <li>Do not post your work online.</li>
              <li>Discussion is encouraged, but every student must complete the work independently.</li>
            </ul>
            <p>Refer to the <a href="https://registry.hkust.edu.hk/resource-library/academic-honor-code-and-academic-integrity" target="_blank" rel="noreferrer">University&apos;s Honor Code</a> and the <a href="https://registry.hkust.edu.hk/resource-library/what-happens-if-you-are-caught-cheating" target="_blank" rel="noreferrer">University&apos;s penalties for cheating</a>.</p>
          </article>
        </section>

        <section id="grading-scheme" className="content-section">
          <SectionTitle eyebrow="Assessment" title="Grading Scheme" />
          <ResponsiveTable
            headers={["ITEM", "PERCENTAGE"]}
            rows={[
              ["Four individual homework assignments", "40%"],
              ["Course project", "60%"],
            ]}
          />
          <p><strong>There are no exams in this course.</strong> Students are expected to devote substantial time and effort to the course project.</p>
        </section>

        <section id="lecture-notes" className="content-section">
          <SectionTitle eyebrow="Weekly materials" title="Lecture Notes" />
          <ResponsiveTable
            headers={["Week", "Topic", "Slides", "Summary"]}
            rows={[
              ["Week 1", "TBA", "TBA", "TBA"],
              ["Week 2", "TBA", "TBA", "TBA"],
              ["Week 3", "TBA", "TBA", "TBA"],
            ]}
          />
        </section>

        <section id="homework" className="content-section">
          <SectionTitle eyebrow="Individual work" title="Homework" />
          <ResponsiveTable
            headers={["Homework", "Released", "Due", "Materials"]}
            rows={[
              ["Homework 1", "TBA", "TBA", "—"],
              ["Homework 2", "TBA", "TBA", "—"],
              ["Homework 3", "TBA", "TBA", "—"],
              ["Homework 4", "TBA", "TBA", "—"],
            ]}
          />
        </section>

        <section id="project-assignments" className="content-section">
          <SectionTitle eyebrow="Applied work" title="Course Project" />
          <ResponsiveTable
            headers={["Component", "Weight", "Assessment Focus"]}
            rows={[
              ["Code repository", "50%", "Completeness and ease of use"],
              ["Presentation", "50%", "Critical thinking behind the project"],
            ]}
          />
        </section>

        <section id="instructors" className="content-section">
          <SectionTitle eyebrow="Course team" title="Instructor" />
          <div className="people-grid">
            <article className="person-card instructor-card">
              <img className="person-photo" src="/course-assets/kai-chen.jpg" alt="Prof. Kai Chen" />
              <div>
                <span className="person-role">Instructor</span>
                <h3>Prof. Kai Chen</h3>
                <p><a href="mailto:kaichen@cse.ust.hk">kaichen@cse.ust.hk</a></p>
                <p>Office: CYT-3006 (Lift 35/36) · Office hours: by appointment</p>
                <p><a href="https://www.cse.ust.hk/~kaichen/" target="_blank" rel="noreferrer">Personal website</a> · <a href="https://ising.cse.ust.hk/" target="_blank" rel="noreferrer">iSING Lab</a></p>
              </div>
            </article>
          </div>
        </section>

        <section id="teaching-assistants" className="content-section last-section">
          <SectionTitle eyebrow="Course team" title="Teaching Assistants" />
          <p>Different teaching assistants are responsible for different aspects of the course. Contact the relevant TA when responsibilities are announced.</p>
          <div className="people-grid">
            <Person initials="HX" name="Huang Xinyang" email="xhuangci@connect.ust.hk" />
            <Person initials="SY" name="Sun Yijun" />
            <Person initials="ZD" name="Zhang Daoping" />
            <Person initials="CZ" name="Chen Zhuo" />
            <Person initials="XS" name="Xie Songrun" />
            <Person initials="YX" name="Yang Xinyu" email="xinyu.yang@connect.ust.hk" />
          </div>
        </section>

        <footer>
          <span>Advanced AI Computing and Systems · Fall 2026</span>
          <span>HKUST Department of Computer Science and Engineering</span>
        </footer>
      </main>
    </div>
  );
}

function Navigation() {
  return (
    <nav aria-label="Course sections">
      <ul className="nav-list">
        {navigation.map(([id, label]) => (
          <li key={id}>
            <a className="nav-link" data-section={id} href={`#${id}`}>
              {label}
            </a>
          </li>
        ))}
      </ul>
      <div className="canvas-link is-disabled" aria-label="Canvas is used for scores; link is not yet available">
        <span>Canvas</span>
        <small>Link to be announced</small>
      </div>
    </nav>
  );
}

function SectionTitle({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <header className="section-heading">
      <span>{eyebrow}</span>
      <h2>{title}</h2>
    </header>
  );
}

function ResponsiveTable({ headers, rows }: { headers: string[]; rows: ReactNode[][] }) {
  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>{headers.map((header) => <th key={header}>{header}</th>)}</tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, cellIndex) => <td key={cellIndex}>{cell}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Person({ initials, name, email }: { initials: string; name: string; email?: string }) {
  return (
    <article className="person-card">
      <div className="person-avatar">{initials}</div>
      <div>
        <span className="person-role">Teaching Assistant</span>
        <h3>{name}</h3>
        {email ? <a href={`mailto:${email}`}>{email}</a> : null}
      </div>
    </article>
  );
}
