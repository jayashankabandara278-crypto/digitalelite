# Elite Digital Work — Web Development Portfolio

A ready-to-deploy **responsive portfolio website for a web-design/web-development business**. Built with plain HTML, CSS, and JavaScript. No database, npm install, or API keys required.

## What's included

- Premium violet-and-cyan design, animated preview, responsive homepage, and working mobile menu
- Dark/light mode toggle (saved on the visitor's device)
- Four service cards and a four-step workflow
- Three editable project examples with category filters and working case-study popups
- Three enquiry packages (no fabricated fixed prices)
- FAQ section, expertise showcase, technology chips, and call-to-action banner
- Working Netlify Forms integration with spam honeypot and thank-you page
- Optional WhatsApp, email, Instagram, and LinkedIn contact links
- Animated UI, accessibility basics, metadata, and favicon

## Customize your website (important)

**1. Open `script.js`.** At the very top, edit the `SITE_SETTINGS` object:

```js
const SITE_SETTINGS = {
  studioName: "Elite Digital Work",
  email: "hello@yourdomain.com",
  whatsappNumber: "94771234567", // numbers only, with country code
  location: "Based in Sri Lanka · Available worldwide",
  availabilityLabel: "Available for new projects",
  instagramUrl: "https://instagram.com/yourprofile",
  linkedinUrl: "https://linkedin.com/in/yourprofile",
  formMode: "netlify",
  showDemoNote: false
};
```

Leave social fields blank to hide their links. If you don't use WhatsApp, leave the number blank. If you don't have an email yet, the Netlify contact form can still receive enquiries, but the direct email link won't work until you fill it in.

**2. Edit the `PROJECTS` array** in the same file. The sample projects are *examples inspired by printing, jewelry, and inventory sites* and must be verified/replaced before you present them as your commercial work. Set each project's `title`, `description`, `details`, `features`, `category`, and optional `liveUrl`. Use one of `website`, `commerce`, `system` as its category, and one of `print`, `jewelry`, `system` as the built-in preview style. The preview illustrations are not real screenshots.

**3. Edit your copy** in `index.html`. Search for text such as `We make`, `What we do`, package descriptions, and FAQs.

**4. Change colors** near the top of `styles.css`. The main brand color is `--accent` in the ELITE DIGITAL WORK signature visual system near the bottom of the stylesheet.

**5. Update the metadata** in `<head>` of `index.html`, such as the description and title. The page's tab title is also set dynamically using `studioName` in `script.js`.

## Publish with Netlify and GitHub

### Option A: deploy the ZIP/folder to Netlify

1. Extract this ZIP file.
2. Go to Netlify's dashboard and choose the option to deploy a site manually.
3. Drag the **contents of `elite-digital-work`** or the unzipped folder to the deploy area.
4. Netlify will host the website. Visit the URL, test the mobile layout, and submit a test project enquiry.
5. In Netlify, check **Forms** to see incoming enquiries. Depending on your Netlify settings or plan, you may need to enable form detection and redeploy. Check current Netlify form limits/settings in your dashboard.

### Option B: deploy through GitHub (recommended for future updates)

1. Create a **new public or private GitHub repository**.
2. Upload `index.html`, `styles.css`, `script.js`, `thank-you.html`, `favicon.svg`, and `netlify.toml` into its root folder.
3. In Netlify, choose **Add new project/site → Import an existing project** and connect the GitHub repository.
4. Use no build command; **publish directory `.`** (the repository root). The included `netlify.toml` already sets this.
5. Publish. Future GitHub edits will trigger redeployment.

## Enquiry form behavior

- `formMode: "netlify"` is the default. On a deployed Netlify site, form submissions are processed by **Netlify Forms** (no custom database). Form name: `project-enquiry`. Form response page: `thank-you.html`.
- When previewing locally with a file or localhost, submissions won't go to Netlify. If you set an email in `SITE_SETTINGS`, the preview will open your email app. Otherwise, it will try to copy the enquiry to your clipboard.
- If you host somewhere other than Netlify, set `formMode: "email"` and add an email; visitors will need their own email app to send it. For a server-backed form on another provider, you would need a form endpoint or a third-party form service.
- Netlify Forms may require form detection and has usage limits. Verify submissions before sharing your portfolio publicly.

## Before going live

- [ ] Add your real business/studio name and contact information
- [ ] Replace demo project content with work you can accurately describe
- [ ] Add your real project URLs where appropriate
- [ ] Check the contact form on the deployed site
- [ ] Proofread service descriptions, packages and FAQs
- [ ] Check on a real phone and desktop screen
- [ ] Set `showDemoNote: false` after replacing demo projects

## Privacy and security

Do **not** place database passwords, API secret keys, Supabase `service_role` keys, or other private credentials into `script.js`, `index.html`, or any publicly hosted front-end file. Netlify Forms submissions are handled by the hosting provider, so review your privacy needs before collecting sensitive information.

## Local preview

Double-click `index.html` to preview it, or run `python -m http.server 8000` inside the folder and open `http://localhost:8000`. The site uses no front-end build tools.

## Elite Digital Work edition

Brand name is already set to **Elite Digital Work**. This edition retains the contact email and WhatsApp number found in the supplied `script.js`. Please verify these before publishing. The three projects use illustrated concept previews, not screenshots of deployed websites.

No database changes or new backend configuration are needed. Google Fonts are optional: the site falls back to system fonts if they cannot load.
