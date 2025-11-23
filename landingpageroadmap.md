# Step-by-Step Component Build Map

**Tech: shadcn/ui + TailwindCSS + Framer Motion**
**Goal: Architectural, quiet, premium 2025 landing page**

This is the exact build order and component structure your dev agent should follow.

---

# 0. **Global Setup**

### Install & configure:

* Tailwind CSS (with container padding + custom colors)
* Shadcn/ui (core components: Button, Card, Separator, Accordion, Sheet, HoverCard, AspectRatio, Form)
* Framer Motion
* Lucide icons

### Global utilities:

* Motion wrapper components (e.g., `FadeIn`, `SlideUp`, `StaggerChildren`)
* Theme provider (shadcn system)
* Typography scale (Inter / Neue Montreal-like)

---

# 1. **Ambient Layer Loader**

**Component:** `components/loader/LayerLoader.tsx`

### Build steps:

1. Create 2–3 thin vertical lines using Tailwind (`w-px h-12 bg-neutral-700`)
2. Wrap with Framer Motion:

   * slow pulse animation
   * hover displacement
3. Add exit animation that splits lines outward then fades
4. Export as a standalone full-screen overlay

### Integrate:

* In `_app` or root layout, conditionally render until first image loads.

---

# 2. **Navigation Bar**

**Component:** `components/layout/NavBar.tsx`
**Mobile Menu:** `Sheet` from shadcn

### Build steps:

1. Minimal top navbar with container + flex
2. Add logo: simple geometric mark
3. Desktop links: Work / Studio / Process / Services / Contact
4. Add CTA button (shadcn `Button`)
5. Add mobile hamburger menu using `Sheet`
6. Add scroll-based blur and border (`backdrop-blur-sm border-b`)

### Animation:

* Framer Motion fade-in + slight slide from top

---

# 3. **Hero Section (Parallax + Scramble Text)**

**Component:** `components/sections/Hero.tsx`

### Build steps:

1. `AspectRatio` container for hero image
2. Apply parallax motion: base image moves slightly on scroll
3. Headline with text-scramble effect on last word
4. Subtext + two CTAs
5. Light gradient overlay for depth

### Animation:

* Staggered reveal for headline, subtext, CTAs
* Parallax via `useScroll` + motion transforms

---

# 4. **Scroll-Reveal Motion Wrappers**

**Components:**

* `FadeIn.tsx`
* `SlideUp.tsx`
* `StaggerChildren.tsx`

### Build steps:

1. Create utility wrappers with viewport-based triggers
2. Default values:

   * opacity 0 → 1
   * translateY 6px → 0
   * duration 0.4–0.6
3. Export reusable motion components

### Integrate:

* Wrap all sections with these.

---

# 5. **Featured Projects Grid**

**Component:** `components/sections/FeaturedProjects.tsx`
**Project Card:** `ProjectCard.tsx`

### Build steps:

1. 3–6 card layout using Tailwind grid
2. Each card uses shadcn `Card` with `AspectRatio`
3. On hover:

   * subtle zoom-in image
   * dark overlay fade
   * title slide up
4. Add tap animation for mobile (scale 0.97)

### Animation:

* Staggered reveal as cards enter viewport

---

# 6. **Architectural Line Sweep Divider**

**Component:** `components/motion/LineSweep.tsx`

### Build steps:

1. Create a thin horizontal line (`h-px bg-neutral-700`)
2. Animate width from 0% → 100% using Framer Motion
3. Add slight opacity fade

### Integrate:

* Before headers in each section

---

# 7. **Philosophy Section**

**Component:** `components/sections/Philosophy.tsx`

### Build steps:

1. Header + line sweep
2. 3 design philosophy pillars
3. Light architectural composition layout with big spacing

### Animation:

* Slide-up stagger for each pillar

---

# 8. **Process Section (Onion-Layer Diagram)**

**Components:**

* `ProcessSection.tsx`
* `ProcessLayer.tsx`

### Build steps:

1. Draw layered circular elements (Tailwind rounded-full + borders)
2. On hover:

   * layer expands 2–3%
   * slight shadow grow
3. On click: open shadcn `HoverCard` or right-side detail panel
4. Each layer corresponds to a step:

   * Research
   * Concept
   * Iteration
   * Detailing
   * Delivery

### Animation:

* Use Framer Motion for scale + shadow
* Add opacity fade for detail panel

---

# 9. **Services Grid**

**Component:** `components/sections/Services.tsx`

### Build steps:

1. 6-card layout using shadcn `Card`
2. No heavy hover effect, just slight lift
3. Icons from lucide
4. Keep spacing large and calm (architectural feel)

### Animation:

* Standard fade-in on scroll

---

# 10. **Testimonials / Social Proof**

**Component:** `components/sections/Testimonials.tsx`
**Carousel:** shadcn `Carousel`

### Build steps:

1. 2–3 testimonial cards
2. Add shadcn carousel for sliding motion
3. Minimal design: portrait, quote, role

### Animation:

* Slow auto-slide
* Card scale on focus

---

# 11. **Studio Snapshot**

**Component:** `components/sections/StudioSnapshot.tsx`

### Build steps:

1. Split layout (image left, text right)
2. Awards / press logos as muted icons
3. HoverCard for details on logos

### Animation:

* Subtle scroll reveal

---

# 12. **Interactive Contact CTA**

**Component:** `components/sections/ContactCTA.tsx`

### Build steps:

1. Bold but minimal headline
2. CTA button with magnetic hover
3. Mini contact details
4. Optional Form using shadcn `Form` (name, email, message)

### Animation:

* CTA button: magnetic pointer tracking
* Section: slow fade

---

# 13. **Footer**

**Component:** `components/layout/Footer.tsx`

### Build steps:

1. 2–3 column layout
2. Mini nav
3. Address + socials
4. Legal links

### Animation:

* None (keep solid and grounded)

---

# 14. **Ambient Background Motion (Optional)**

**Component:** `components/background/AmbientNoise.tsx`

### Build steps:

1. Subtle noise texture layer
2. CSS keyframe slow drift
3. Keep opacity under 3%

### Animation:

* Imperceptible drift

---

# 15. **Global Page Assembly**

**File:** `app/page.tsx`

### Build steps:

1. Render loader

2. Render NavBar

3. Sequentially place sections:

   * Hero
   * Projects
   * Philosophy
   * Process
   * Services
   * Testimonials
   * Studio
   * Contact
   * Footer

4. Wrap sections with motion utilities (`FadeIn`, `StaggerChildren`)

---
