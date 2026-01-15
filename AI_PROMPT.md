# HashTribe AI Generation Prompt

Use the following context and instructions when asking an AI (like Gemini, ChatGPT, Claude, or Stitch) to generate UI components or pages for HashTribe.

---

## 📋 **Role & Objective**
**Role:** Expert Frontend Engineer & UI/UX Designer specializing in premium, developer-centric dark mode interfaces.  
**Objective:** Generate a React component/page for **HashTribe** (a social platform for developers) that fits perfectly into the existing design system.

## 🎨 **Design System**

### **1. Visual Style**
- **Theme:** Ultra-premium **Dark Mode** only.
- **Aesthetic:** Monochromatic, Minimalist, "Graphite & Steel".
- **Backgrounds:** 
  - Main: `#0a0a0a` (Charcoal-950) or Black.
  - Cards/Panels: `#1a1a1a` (Charcoal-900) with slight transparency (`bg-charcoal-900/50`).
  - Glassmorphism: Heavy use of `backdrop-blur-xl` and thin borders.
- **Borders:** Thin, subtle borders (`border-charcoal-800` or `border-white/10`) to define hierarchy.
- **Accents:** strictly White (`#ffffff`) or very light Greys for primary actions/text. **No colorful buttons** unless for specific status indicators (Green/Red).

### **2. Color Palette (Tailwind CSS)**
Use these custom classes based on `tailwind.config.js`:

| Token | Usage | Hex |
| :--- | :--- | :--- |
| `bg-black` | Main Page Background | `#000000` |
| `bg-charcoal-950`| Section Background | `#0a0a0a` |
| `bg-charcoal-900`| Card / input Background | `#1a1a1a` |
| `border-charcoal-800` | Default Border | `#383838` |
| `text-white` | Headings, Primary Text | `#ffffff` |
| `text-grey-400` | Secondary Text | `#a3a3a3` |
| `text-grey-600` | Placeholders / Hints | `#525252` |
| `font-mono` | Code snippets | JetBrains Mono |

### **3. UI Components**
- **Buttons (Primary):** `bg-white text-black font-bold hover:bg-grey-200 rounded-lg`
- **Buttons (Secondary):** `bg-charcoal-900 border border-charcoal-800 text-white hover:bg-charcoal-800 rounded-lg`
- **Ghost Button:** `text-grey-400 hover:text-white transition-colors`
- **Inputs:** `bg-charcoal-900 border border-charcoal-800 text-white rounded-lg focus:border-grey-600 focus:outline-none placeholder-grey-600`
- **Cards:** `bg-charcoal-900/50 border border-charcoal-800 rounded-xl backdrop-blur-sm p-6`

### **4. Typography**
- **Headings:** `Next.js` / Inter. Bold, tight tracking.
- **Body:** Inter. 
- **Code:** JetBrains Mono.

## 🛠️ **Technical Constraints**
- **Framework:** React + TypeScript + Vite.
- **Styling:** Tailwind CSS (No custom CSS files, use utility classes).
- **Icons:** `lucide-react` (e.g., `<User className="w-5 h-5" />`).
- **State:** `useState` for local, `zustand` for global.
- **Routing:** `react-router-dom` (use `<Link>` and `useNavigate`).

## 💡 **Example Prompt to Copy-Paste**

> "Create a **[Component Name, e.g., 'ProjectSettingsPanel']** for HashTribe. 
> It should be a React TypeScript component using Tailwind CSS.
> **Style Requirements:**
> - Use the 'Charcoal' dark theme (deep blacks/greys).
> - The container should be a glassmorphic card (`bg-charcoal-900/50`, `backdrop-blur`).
> - Use `lucide-react` for icons.
> - Inputs should be dark with subtle borders.
> - Primary actions should be White buttons with Black text.
> - The design must look premium and developer-focused.
> 
> **Functionality:**
> - [Describe feature 1]
> - [Describe feature 2]"

---
