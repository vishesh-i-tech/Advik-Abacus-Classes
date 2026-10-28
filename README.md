# Abacus Classes — High-Converting Editorial Landing Page

A fast, modern, mobile-first landing page for **Abacus Classes** in Gulabra, Chhindwara. Redesigned with an editorial, confident, and spacious aesthetic inspired by modern educational platforms (bold typography, large imagery, clean line icons, and rectangular 12px buttons).

---

## 📸 Image Assets You Need to Supply

Place your real photos in the `assets/` folder using the exact filenames below to replace the starter graphics:

| Filename | Purpose | Recommended Dimensions | Format |
| :--- | :--- | :--- | :--- |
| **`assets/hero-child.png`** | Hero child photo (cutout or inside the organic blob) | 600 × 650 px | Transparent PNG or JPG |
| **`assets/abacus-float.png`** | Floating abacus badge at the bottom corner of hero | 260 × 160 px | Transparent PNG |
| **`assets/course-abacus.png`** | Abacus Mental Arithmetic course image | 500 × 400 px | PNG or JPG |
| **`assets/course-maths.png`** | Foundational Mathematics course image | 500 × 400 px | PNG or JPG |
| **`assets/course-english.png`** | Creative English & Phonics course image | 500 × 400 px | PNG or JPG |
| **`assets/about-teacher.png`** | Instructor / classroom photo inside the about blob | 500 × 550 px | PNG or JPG |

---

## 📝 Business Information & Placeholders to Fill

All editable text, phone numbers, and placeholders are managed in **one central `CONFIG` object** at the top of [`script.js`](file:///d:/TECH/Advik%20Abacus%20Classes/script.js):

```javascript
const CONFIG = {
  BUSINESS_NAME: "Abacus Classes", // Change to "Advik Abacus Classes" anytime
  PHONE_DISPLAY: "+91 97543 74490",
  PHONE_RAW: "+919754374490",
  WHATSAPP_NUMBER: "919754374490",
  LOCATION_SHORT: "Gulabra, Chhindwara, MP 480001",
  ...
};
```

### Current Visible Placeholders:
1. **Full Center Address**: `CONFIG.FULL_ADDRESS_PLACEHOLDER` (e.g., `"Near City Hospital, Main Market, Gulabra"`)
2. **Batch Timings**: `CONFIG.TIMINGS_PLACEHOLDER` (e.g., `"Mon–Sat 4:00 PM – 7:30 PM | Weekend Batches Available"`)
3. **Fee Structure**: `CONFIG.FEES_PLACEHOLDER` (e.g., `"₹1,200/month with Abacus Kit & Workbooks included"`)
4. **Lead Educator Info**: `CONFIG.TEACHER_INFO_PLACEHOLDER` (e.g., `"Certified Soroban Abacus Trainer with 6+ years teaching experience"`)
5. **Center Email**: `CONFIG.EMAIL_PLACEHOLDER` (e.g., `"advik.abacus@gmail.com"`)
6. **Founding Offer**: `CONFIG.OFFER_DETAILS` & `CONFIG.SHOW_FOUNDING_OFFER` (e.g., `"Special introductory fee concession for the first 15 admissions + Free Abacus Starter Kit"`)

---

## 🌐 How to Make It Live on GitHub Pages

Follow these simple steps in your terminal inside the project directory (`d:\TECH\Advik Abacus Classes`):

### Step 1: Initialize Git and Link Repository
```bash
git init
git add .
git commit -m "feat: complete editorial redesign for Abacus Classes landing page"
git branch -M main
git remote add origin https://github.com/vishesh-i-tech/Advik-Abacus-Classes.git
git push -u origin main
```

### Step 2: Turn On GitHub Pages
1. Open your repository on GitHub: [https://github.com/vishesh-i-tech/Advik-Abacus-Classes](https://github.com/vishesh-i-tech/Advik-Abacus-Classes)
2. Go to **Settings** (tab at the top right of the repository).
3. In the left sidebar, click **Pages** (under the "Code and automation" section).
4. Under **Build and deployment > Source**, select **Deploy from a branch**.
5. Under **Branch**, select **`main`** and the folder as **`/(root)`**, then click **Save**.
6. Within 1 to 2 minutes, your website will be live at:
   👉 **`https://vishesh-i-tech.github.io/Advik-Abacus-Classes/`**

---

## 📊 Connecting Google Sheets (Lead Capture)

When parents submit the Demo Form, the site automatically opens WhatsApp with a formatted message. If you also want leads saved directly to a Google Sheet:

1. Create a Google Sheet.
2. In the sheet menu, go to **Extensions > Apps Script**.
3. Paste the following script:
   ```javascript
   function doPost(e) {
     var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
     var data = JSON.parse(e.postData.contents);
     sheet.appendRow([
       new Date(),
       data.parentName,
       data.phone,
       data.childAge,
       data.course,
       data.time
     ]);
     return ContentService.createTextOutput("Success").setMimeType(ContentService.MimeType.TEXT);
   }
   ```
4. Click **Deploy > New deployment**, select **Web app**, set **Who has access** to **Anyone**, and click **Deploy**.
5. Copy the Web App URL and paste it into `script.js`:
   ```javascript
   FORM_ENDPOINT: "https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec"
   ```

---

## ✨ Features & Architecture

- **Editorial Scale**: Big bold H1 (clamp 56-72px desktop), 90vh hero, generous 96px vertical section padding.
- **Educax Visual Style**: Clean organic image blobs, thin 2px hand-drawn line loops, and Lucide-style line icons.
- **Conversion Focused**: Rectangular 12px radius buttons (54px tall), direct WhatsApp lead dispatch, and mobile sticky bottom bar with safe-area support.
- **Fast & Zero-Dependency**: 100% vanilla HTML5, CSS3, and JavaScript without external frameworks or build steps.
