"use client";

import { useEffect } from "react";

const navigation = [
  ["announcements", "Announcements"],
  ["course-information", "Course Information"],
  ["rubrics", "Rubrics"],
  ["lecture-notes", "Lecture Notes and Summary"],
  ["lecture-videos", "Lecture Videos"],
  ["tutorials", "Tutorials"],
  ["homework", "Homework"],
  ["past-exams", "Past Exams"],
  ["project-assignments", "Project Assignments"],
  ["instructors", "Instructors"],
  ["teaching-assistants", "Teaching Assistants"],
  ["references", "References"],
] as const;

const placeholderRows = [1, 2, 3];

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
          <a className="course-brand" href="#announcements" aria-label="COMP4611 home">
            <span className="course-code">COMP4611</span>
            <span className="course-title">Design and Analysis of Computer Architectures</span>
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
            Website preparation in progress
          </div>
        </div>
      </aside>

      <main className="content-area">
        <section id="announcements" className="content-section first-section">
          <SectionTitle eyebrow="Latest updates" title="Announcements" />
          <div className="announcement-featured">
            <div>
              <span className="announcement-label">Welcome</span>
              <h3>COMP4611 · Fall 2026</h3>
              <p>
                The course website is being prepared. Lecture materials, assessment details,
                and important dates will be published here as they are confirmed.
              </p>
            </div>
            <time dateTime="2026-08-10">10 Aug 2026</time>
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
            <h3>Course Descriptions</h3>
            <p>The course vector is <strong>[3-0-1:3]</strong>. The course consists of the following teaching activities in each week:</p>
            <ul>
              <li>3 hours of lecture session</li>
              <li>1 hour of tutorial</li>
            </ul>
          </article>

          <article className="course-article">
            <h3>Prerequisites</h3>
            <p>COMP 2611 or ELEC 2300 or ELEC 2350</p>
          </article>

          <article className="course-article">
            <h3>Course Outcomes</h3>
            <p>On successful completion of this course, students are expected to be able to:</p>
            <ul className="outcome-list">
              <li>Assess the intricate nuances of designing computer architectures with the aim of improving performance, balancing performance, cost and power consumption.</li>
              <li>Analyze various techniques at different levels of computer architecture design that can be used effectively to meet performance goals.</li>
              <li>Critically evaluate computer architectures and systems.</li>
              <li>Select and apply various performance evaluation techniques and tools.</li>
            </ul>
          </article>

          <article className="course-article">
            <h3>Textbook</h3>
            <BookEntry
              image="/course-assets/book1.png"
              alt="Cover of Computer Architecture: A Quantitative Approach"
              title="Computer Architecture: A Quantitative Approach (5th or 6th Edition)"
              isbn="978-0128119051"
            />
          </article>

          <article className="course-article">
            <h3>Reference Books</h3>
            <BookEntry
              image="/course-assets/book2.png"
              alt="Cover of Computer Organization and Design MIPS Edition"
              title="Computer Organization and Design MIPS Edition: The Hardware/Software Interface, 6th Edition"
              isbn="978-0128201091"
            />
            <BookEntry
              image="/course-assets/book3.png"
              alt="Cover of Digital Design and Computer Architecture"
              title="Digital Design and Computer Architecture, 2nd Edition"
              isbn="978-0123944245"
            />
          </article>

          <article className="course-article">
            <h3>Lecture Schedule</h3>
            <BlankSchedule headers={["Section", "Instructor", "Time", "Venue"]} />
          </article>

          <article className="course-article">
            <h3>Tutorial Schedule</h3>
            <BlankSchedule headers={["Section", "Instructor", "Time", "Venue"]} />
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
            <p>
              Refer to the <a href="https://registry.hkust.edu.hk/resource-library/academic-honor-code-and-academic-integrity" target="_blank" rel="noreferrer">University&apos;s Honor Code</a> and the <a href="https://registry.hkust.edu.hk/resource-library/what-happens-if-you-are-caught-cheating" target="_blank" rel="noreferrer">University&apos;s penalties for cheating</a>.
            </p>
          </article>

          <article className="course-article">
            <h3>Grading Scheme</h3>
            <BlankSchedule headers={["Assessment Item", "Contribution (%)"]} />
          </article>
        </section>

        <section id="rubrics" className="content-section">
          <SectionTitle eyebrow="Assessment" title="Rubrics" />
          <ResponsiveTable
            headers={["Component", "Weight", "Notes"]}
            rows={[
              ["Homework", "TBA", "Details will be announced"],
              ["Project assignments", "TBA", "Details will be announced"],
              ["Midterm examination", "TBA", "Date and coverage to be announced"],
              ["Final examination", "TBA", "Date and coverage to be announced"],
            ]}
          />
        </section>

        <section id="lecture-notes" className="content-section">
          <SectionTitle eyebrow="Weekly materials" title="Lecture Notes and Summary" />
          <ResponsiveTable
            headers={["Week", "Topic", "Slides", "Summary"]}
            rows={placeholderRows.map((week) => [
              `Week ${week}`,
              "To be announced",
              "—",
              "—",
            ])}
          />
          <p className="section-footnote">Additional weeks will be added as the teaching schedule is finalized.</p>
        </section>

        <section id="lecture-videos" className="content-section">
          <SectionTitle eyebrow="Recordings" title="Lecture Videos" />
          <EmptyState
            label="Video access"
            title="Lecture video information will be announced"
            body="If recordings are provided, the course team will publish the access link here or on Canvas."
          />
        </section>

        <section id="tutorials" className="content-section">
          <SectionTitle eyebrow="Supporting sessions" title="Tutorials" />
          <ResponsiveTable
            headers={["Tutorial", "Topic", "Materials", "Date"]}
            rows={[["Tutorial 1", "To be announced", "—", "TBA"]]}
          />
        </section>

        <section id="homework" className="content-section">
          <SectionTitle eyebrow="Individual work" title="Homework" />
          <ResponsiveTable
            headers={["Homework", "Released", "Due", "Materials"]}
            rows={[
              ["Homework 1", "TBA", "TBA", "—"],
              ["Homework 2", "TBA", "TBA", "—"],
            ]}
          />
        </section>

        <section id="past-exams" className="content-section">
          <SectionTitle eyebrow="Revision" title="Past Exams" />
          <EmptyState
            label="Exam materials"
            title="Past examination materials will be announced"
            body="Availability and access rules will be confirmed by the course instructor."
          />
        </section>

        <section id="project-assignments" className="content-section">
          <SectionTitle eyebrow="Applied work" title="Project Assignments" />
          <ResponsiveTable
            headers={["Assignment", "Released", "Due", "Specification"]}
            rows={[
              ["Project Assignment 1", "TBA", "TBA", "—"],
              ["Project Assignment 2", "TBA", "TBA", "—"],
            ]}
          />
        </section>

        <section id="instructors" className="content-section">
          <SectionTitle eyebrow="Course team" title="Instructors" />
          <div className="people-grid">
            <article className="person-card">
              <div className="person-avatar">KC</div>
              <div>
                <span className="person-role">Instructor</span>
                <h3>Prof. Kai Chen</h3>
                <a href="mailto:kaichen@cse.ust.hk">kaichen@cse.ust.hk</a>
                <p>Office hour: by appointment</p>
              </div>
            </article>
          </div>
        </section>

        <section id="teaching-assistants" className="content-section">
          <SectionTitle eyebrow="Course team" title="Teaching Assistants" />
          <div className="empty-roster">
            <p>Teaching assistant details and responsibilities will be announced.</p>
          </div>
        </section>

        <section id="references" className="content-section last-section">
          <SectionTitle eyebrow="Reading" title="References" />
          <EmptyState
            label="Reference materials"
            title="Textbook and reading list to be announced"
            body="Confirmed references will be listed here with links or access instructions."
          />
        </section>

        <footer>
          <span>COMP4611 · Fall 2026</span>
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
      <div className="canvas-link is-disabled" aria-label="Canvas link is not yet available">
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

function BookEntry({ image, alt, title, isbn }: { image: string; alt: string; title: string; isbn: string }) {
  return (
    <div className="book-entry">
      <img src={image} alt={alt} />
      <div>
        <strong>{title}</strong>
        <span>ISBN: {isbn}</span>
      </div>
    </div>
  );
}

function BlankSchedule({ headers }: { headers: string[] }) {
  return (
    <div className="table-wrap blank-table">
      <table>
        <thead><tr>{headers.map((header) => <th key={header}>{header}</th>)}</tr></thead>
        <tbody><tr><td colSpan={headers.length} aria-label="Information to be confirmed" /></tr></tbody>
      </table>
    </div>
  );
}

function ResponsiveTable({ headers, rows }: { headers: string[]; rows: string[][] }) {
  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>{headers.map((header) => <th key={header}>{header}</th>)}</tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={`${row[0]}-${rowIndex}`}>
              {row.map((cell, cellIndex) => <td key={`${cell}-${cellIndex}`}>{cell}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function EmptyState({ label, title, body }: { label: string; title: string; body: string }) {
  return (
    <div className="empty-state">
      <span>{label}</span>
      <h3>{title}</h3>
      <p>{body}</p>
    </div>
  );
}
