# ariansaleh.com — Site Files

Built by Claude. Dark, cinematic, yours completely.

---

## What's in here

```
arian-saleh/
├── index.html          ← Homepage (work grid + hero)
├── css/
│   └── style.css       ← All styling
├── js/
│   └── site.js         ← Nav, audio player, scroll reveals
├── pages/
│   ├── about.html      ← About / biography
│   ├── contact.html    ← Contact page
│   └── music.html      ← Recording artist / discography
└── images/
    ├── hero.jpg             ← NEEDED: full-bleed hero image
    ├── arian-saleh.jpg      ← NEEDED: your photo (for about page)
    ├── albums/              ← NEEDED: album artwork
    │   ├── exoskeleton.jpg
    │   ├── swan-bird.jpg
    │   ├── antoinette.jpg
    │   └── undone.jpg
    └── projects/            ← NEEDED: film poster / stills
        ├── friends-house.jpg
        ├── roxie.jpg
        ├── blackfeet.jpg
        ├── girl-icon.jpg
        ├── the-moment.jpg
        ├── dream-on.jpg
        ├── revenge-porn.jpg
        └── all-sorts.jpg
```

---

## Step 1 — Add your images

Download your existing images from Squarespace (go to each project page, right-click → Save Image). Put them in the `images/` folders above.

For the hero image: pick your most cinematic still from The Friend's House is Here or another film. Landscape orientation, dark/moody preferred. At least 1920px wide.

Image tips:
- Keep files under 500KB each (use squoosh.app to compress)
- JPG format for photos, PNG only if transparency needed

---

## Step 2 — Add your audio

Create an `audio/` folder and add short MP3 excerpts (30–60 seconds each):
```
audio/
├── friends-house-excerpt.mp3
├── roxie-excerpt.mp3
├── blackfeet-excerpt.mp3
├── girl-icon-excerpt.mp3
├── the-moment-excerpt.mp3
├── dream-on-excerpt.mp3
├── revenge-porn-excerpt.mp3
└── all-sorts-excerpt.mp3
```

Keep each under 2MB. If a project doesn't have audio yet, remove its `<button class="play-btn">` in index.html — Claude can do this for you.

---

## Step 3 — Update your email

In `pages/contact.html`, find this line and replace with your actual email:
```html
<a href="mailto:arian@ariansaleh.com" class="contact-email">
```

---

## Step 4 — Push to GitHub

1. Go to github.com → New repository → name it `ariansaleh.com` → Public → Create
2. Open Terminal (Mac) or Command Prompt (Windows)
3. Run these commands one at a time:

```bash
cd path/to/arian-saleh
git init
git add .
git commit -m "Initial site"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/ariansaleh.com.git
git push -u origin main
```

Replace `YOUR-USERNAME` with your GitHub username.

---

## Step 5 — Deploy on Vercel

1. Go to vercel.com → Sign up with your GitHub account
2. Click "Add New Project" → Import your `ariansaleh.com` repo
3. Click Deploy — it'll be live in ~30 seconds at a vercel.app URL
4. To connect your real domain: Settings → Domains → Add `ariansaleh.com`
5. Follow Vercel's instructions to update your domain's DNS records

---

## Making updates

Whenever you want to change something, just tell Claude:
- "Add a new project called X, directed by Y, category film"
- "Change my email address"  
- "Update the bio"
- "The Roxie image is called roxie-poster.jpg"

Claude will give you the updated code to paste in, or make the change directly.

---

## Fonts used

- **Cormorant Garamond** — headlines, titles (loaded from Google Fonts, free)
- **Martian Mono** — labels, nav, metadata (loaded from Google Fonts, free)

---

## Cloudflare R2 (for images & audio — when you're ready)

Once you sign up for Cloudflare R2:
1. Create a bucket called `arian-saleh-assets`
2. Upload your images and audio files there
3. Cloudflare gives each file a public URL like:
   `https://your-bucket.r2.cloudflarestorage.com/images/hero.jpg`
4. Replace the local `images/` paths in the HTML with those URLs

Claude can do the find-and-replace for you once you have the URLs.
