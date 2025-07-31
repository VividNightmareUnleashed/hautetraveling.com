# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a static website for HAUTE TRAVELING MEDIA GROUP - a luxury travel media company. It's a single-page landing site with no backend or build process.

## Tech Stack

- Pure HTML5, CSS3, and Vanilla JavaScript
- No frameworks, no build tools, no package managers
- Fully self-contained with no external dependencies

## Running the Project

Since this is a static site, you can:
- Open `index.html` directly in a browser
- Or serve it with any static web server (e.g., `python -m http.server 8000`)

## Project Structure

```
index.html      # Main page with all content sections
css/styles.css  # All styling, animations, and responsive design
js/script.js    # Form handling and interactive animations
```

## Key Features to Know

### Form Handling
The contact form in `js/script.js` currently:
- Validates fields client-side (email format, required fields, message length)
- Shows success/error messages
- Does NOT actually submit data (logs to console and simulates success)
- Future backend integration point at line 168 in script.js

### Media Partners Section
Located in `index.html` lines 70-77. Current partners:
- Forbes Travel
- Travel + Leisure
- Condé Naste Traveler
- Luxury Travel Magazine
- Luxury Lifestyle Magazine
- LA Magazine
- Haute Living
- & Many More

### Animation Features
- Number counters animate when scrolled into view (Intersection Observer)
- Smooth scrolling for anchor links
- CSS animations throughout for luxury feel

## Deployment

Simply upload all files to any static hosting service maintaining the directory structure.