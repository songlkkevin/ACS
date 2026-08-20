# COMP4611 Fall 2026 Course Website

This repository contains the source and published files for the COMP4611 Fall 2026 course website.

- Official URL: <https://course.cse.ust.hk/comp4611/>
- CSE server directory: `/course/comp4611/Web/2026F`

The complete Git repository may be kept directly in the CSE server directory above. Apache, the CSE web server, reads `index.html` and its referenced files and sends their contents to students' browsers.

## Published website files

The files required by the public course page are:

```text
index.html
site.css
site.js
course-assets/
  book1.png
  book2.png
  book3.png
```

All links in `index.html` use relative paths so that the site works under the CSE course URL.

The other repository files, including `app/`, `tests/`, `package.json`, and build configuration files, are used for local development and are not required by Apache.

## File permissions on the CSE server

Students do not access the Unix directory directly. Their browsers request files from Apache. Apache must therefore be able to read the published files.

Use the following permissions after cloning the repository or running `git pull` on the CSE server:

```bash
cd /course/comp4611/Web/2026F

chmod 644 index.html site.css site.js
chmod 2755 course-assets
chmod 644 course-assets/*
```

For a regular file, permission `644` means:

- the file owner can read and modify the file;
- the group can read the file;
- other users, including the web server when applicable, can read the file;
- nobody except the owner can modify the file through Unix file access.

For the asset directory, permission `2755` allows Apache to enter the directory and read its public files. It does not give students permission to modify files through their browsers.

If a published file has permission `600`, only its owner can read it. Apache will be unable to serve it, and visitors may receive `403 Forbidden`.

Git does not record the complete Unix permissions represented by `600` or `644`. Newly created files after `git clone`, `git checkout`, or `git pull` may therefore receive restrictive permissions from the server environment. Run the permission commands above after every deployment.

Do not run:

```bash
chmod -R 755 .
```

That command would make many development and repository files readable through the web server.

## What students can and cannot do

Students can:

- open the course website in a browser;
- download files that are intentionally linked from the website;
- view or save the HTML, CSS, JavaScript, images, and PDF files delivered to their browsers.

Students cannot:

- modify or delete files on the CSE server through the course website;
- push changes to this Git repository unless they have separate GitHub permission;
- obtain SSH access to the course directory from browser access alone.

Do not store passwords, API keys, `.env` files, student grades, unpublished examinations, assignment solutions, or other confidential material in this repository. A repository file that becomes readable by Apache may be downloadable if someone knows its URL.

## Updating the deployed website

On the CSE server:

```bash
cd /course/comp4611/Web/2026F
git pull

chmod 644 index.html site.css site.js
chmod 2755 course-assets
chmod 644 course-assets/*
```

Verify that Apache can read the homepage:

```bash
curl -sS https://course.cse.ust.hk/comp4611/ | head -n 10
```

A successful response should begin with the HTML document declaration and the COMP4611 page content. A `403 Forbidden` response usually indicates that Apache cannot read `index.html` or enter one of the required directories.

## Local development

Install the development dependencies and start the local preview:

```bash
npm install
npm run dev
```

The static files used by the CSE server remain `index.html`, `site.css`, `site.js`, and `course-assets/`.

## Content still requiring confirmation

- Canvas course URL
- Lecture and tutorial schedule
- Assessment weights
- Lecture notes and videos
- Homework and project dates
- Teaching assistant roster and responsibilities
- Fall 2026 prerequisite wording

Replace `TBA`, `To be announced`, blank schedule rows, and other placeholders only after the course team confirms the corresponding information.
