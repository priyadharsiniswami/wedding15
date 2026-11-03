# Vignesh & Jeevitha - South Indian Digital Wedding Invitation Web App
## விக்னேஷ் & ஜீவிதா திருமண அழைப்பிதழ் வலைத்தளம்

A mobile-first, interactive South Indian royal wedding invitation web application designed with traditional aesthetics (temple gopurams, marigold garlands, banana leaves, brass bells, kolam patterns) and modern web interactions.

---

### ✨ Features & Key Highlights

1. **3D Interactive Temple Gate Entrance (மங்கள வாசல் திறப்பு)**:
   - Carved South Indian wooden temple doors with embossed Lord Ganesha and Lord Murugan medallions.
   - Central auspicious golden seal ("சுப முகூர்த்தம் - 15.11.2026").
   - Realistic temple bronze bell chime sound upon tapping to open.
   - Smooth 3D perspective door opening swing revealing the wedding experience.

2. **Auspicious Background Music (மங்கள வாத்தியம்)**:
   - Plays traditional wedding nadaswaram/shehnai melodies.
   - Built-in Web Audio API synthesizer fallback (Tanpura drone + Mohanam raga chimes).
   - Sticky top bar controller with dancing audio equalizer visualizer bars.

3. **Bilingual Support (தமிழ் / English)**:
   - Instant 1-click language switcher (`தமிழ் / English`) at the top.
   - Authentic traditional Tamil wedding terminology extracted directly from the printed card (`பராபவ வருடம் ஐப்பசி 29`, `விருச்சிக லக்கினம்`, `உத்திராடம் நட்சத்திரம்`).

4. **Live Real-time Countdown Timer (சுப முகூர்த்த கவுண்ட்டவுன்)**:
   - Ticking down in real-time to **Sunday, 15th November 2026, 6:05 AM IST**.
   - Elegant gold-framed boxes for Days, Hours, Minutes, and Seconds.

5. **Interactive Gold Glitter Scratch Card (கீறி அறியும் அட்டை)**:
   - Touch & mouse-friendly HTML5 Canvas scratch-off surface.
   - Reveals the wedding date, muhurtham timing, and temple venue.
   - Automatic celebration confetti burst upon reaching 40% scratched, plus an "Instant Reveal" button.

6. **Wedding Events & Venues with Instant Actions**:
   - **Holy Wedding Muhurtham (புனித சுப முகூர்த்தம்)**:
     - 15 November 2026 | 6:05 AM - 7:25 AM
     - **Arulmigu Sri Meenakshi Amman Temple, Paramakudi**
     - 📍 Google Maps direct directions & 📅 Add to Google Calendar / .ICS
   - **Reception & Grand Feast (வரவேற்பு & திருமண விருந்து)**:
     - 15 November 2026 | 9:30 AM Onwards
     - **MGM Mahal**, Opposite E.B. Office, Kaattuparamakudi, Paramakudi
     - 📍 Google Maps direct directions & 📅 Add to Google Calendar

7. **Family Lineage & Blessings (குடும்ப விபரம்)**:
   - Complete details for Groom's and Bride's sides:
     - Groom: **K. Vignesh Pandi B.Sc.** (Tamilnadu Grama Bank)
     - Bride: **Ka. Jeevitha M.Sc.**
     - Parents, Grandparents, Brothers, Sisters, and native places (Rajagambeeram, Poovilathur, Somanathapuram).
     - Direct Call and WhatsApp chat buttons.

8. **Guest Transit & Logistics Guide (பயண வழிகாட்டி)**:
   - Train connectivity: Paramakudi (PMK) Station (2.5 km), Ramanathapuram (RMD) (38 km), Madurai Junction (MDU) (75 km).
   - Airport: Madurai International Airport (IXM) (~70 km via 4-lane NH 87 highway).
   - Bus routes and highway directions.

9. **Places to Explore Near Paramakudi (சுற்றுலாத் தலங்கள்)**:
   - Swipeable carousel featuring 6 top cultural and heritage destinations:
     1. Ramanathaswamy Temple, Rameswaram (~85 km)
     2. Dhanushkodi & Arichal Munai (~105 km)
     3. Dr. APJ Abdul Kalam National Memorial, Peikarumbu (~80 km)
     4. Madurai Sri Meenakshi Amman Temple (~75 km)
     5. Sethupathi Palace (Ramalinga Vilasam), Ramanathapuram (~38 km)
     6. Iconic Pamban Cantilever Sea Bridge (~75 km)

10. **Interactive Wishes & Guestbook (வாழ்த்தரங்கம்)**:
    - Guests can submit wedding wishes with their name and city.
    - Stored in browser `localStorage` and displayed in a real-time feed.
    - One-click "Send Wishes on WhatsApp" pre-composed message button.

11. **Original Printed Invitation Card Lightbox**:
    - High-resolution viewer for the original printed Tamil invitation card.
    - Zoom In, Zoom Out, Rotate 90°, and Download capabilities.

12. **Shareable on WhatsApp & Social Media**:
    - Web Share API and WhatsApp direct share link with formatted invitation text.
    - Copy link with visual toast confirmation.

---

### 📂 File Structure

```
wedding15/
├── index.html                 # Main HTML structure with bilingual markup
├── style.css                  # South Indian royal wedding styles & 3D animations
├── script.js                  # Audio, scratch card, countdown, petals & calendar logic
├── server.js                  # Lightweight local Node.js static & media streaming server
├── README.md                  # Project documentation & guide
└── assets/
    ├── ganesha.svg            # Lord Ganesha golden emblem
    ├── murugan.svg            # Lord Murugan with Divine Vel emblem
    ├── gopuram.svg            # Meenakshi Temple Dravidian Gopuram illustration
    ├── kalasam.svg            # Traditional Kalasam with mango leaves & coconut
    ├── bell.svg               # Hanging brass temple bell
    ├── thali.svg              # Sacred Thirumangalyam / Mangalsutra knot emblem
    ├── banana-leaf.svg        # Auspicious banana leaf graphic
    ├── kolam.svg              # Traditional Tamil pulli kolam rangoli motif
    ├── nadaswaram.svg         # Mangala Vaathiyam musical instrument icon
    ├── original-invitation.jpg# Right-side-up photo of the original printed card
    └── wedding-music.mp4      # Auspicious wedding audio soundtrack
```

---

### 🚀 Running Locally

To run the local server:
```bash
node server.js
```
Open [http://localhost:3000](http://localhost:3000) in your web browser or mobile phone connected to the same Wi-Fi.

### 🌐 Deploying to the Web

This project has **zero build dependencies** and can be deployed directly in 1 minute to:
- **Netlify**: Drag and drop the `wedding15` folder into [Netlify Drop](https://app.netlify.com/drop).
- **Vercel**: Run `npx vercel` or import from GitHub.
- **GitHub Pages**: Push this directory to a GitHub repository and turn on GitHub Pages under Settings > Pages.

