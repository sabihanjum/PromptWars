# MatchDay Pro 🏟️

**MatchDay Pro** is an intelligent, dynamic attendee management platform designed for large-scale sporting venues. Built explicitly for the **PromptWars Hackathon**.

## 1. Chosen Vertical
**Event Experience (Sports Venues)**  
We designed our solution specifically to improve the physical event experience, addressing chronic stadium challenges such as massive crowd movement, long waiting times for concessions or restrooms, and real-time coordination of security.

## 2. Approach and Logic
Our approach is a two-sided platform using live density mapping:
- **Attendee app (PWA):** A frictionless mobile-first application allowing fans to navigate via a real-time heatmap, jump into virtual express queues, and receive smart routing alerts.
- **Venue Command Center:** A desktop dashboard for stadium staff to monitor crowd flow metrics, deploy staff to bottlenecks, and broadcast push notifications to specific stadium zones.

## 3. How the Solution Works
1. **Interactive Heatmap:** The system tracks IoT sensor feeds to determine which gates and facilities are overloaded. The Attendee app renders heavily congested areas in red, actively steering human traffic to optimal routes.
2. **Virtual Queuing:** Users skip lines by picking up their orders via QR code only when the digital estimated wait (ETA) completes, physically eliminating crowding at counters.
3. **Smart Assistant:** The built-in **MatchDay Assistant** provides conversational guidance for dynamic contextual questions.

## 4. Google Services Integration
**Smart, Dynamic Assistant (Google Gemini AI Context):**  
MatchDay Pro features an intelligent chatbot simulation heavily modeled on the **Google Gemini API**. 
The floating assistant uses contextual intent recognition to guide fans away from bottlenecks (e.g., asking "Where is the restroom?" dynamically recommends less populated restrooms and prompts the user to join a virtual queue).

*(Note: To safeguard API keys for a public GitHub entry, the current hackathon build uses an robust front-end simulated intent engine to demonstrate prompt handling conceptually).*

## 5. Assumptions Made
- Sensors/Wi-Fi triangulation exists within the stadium architecture to stream continuous density point data.
- The user is logged in via their ticket pass, making seat locations native metadata context.
- The Gemini API integration operates as a functional frontend mockup logic module to prevent exposed tokens.
