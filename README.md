<div align="center">
  <img src="admin-dashboard/public/brand-mark.svg" alt="Adminbox logo" width="76" height="76" />
  <h1>Adminbox</h1>
  <p>A responsive admin workspace for team, customer, and business operations.</p>
  <p>
    <img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=20232A" alt="React 19" />
    <img src="https://img.shields.io/badge/Material_UI-9-007FFF?style=for-the-badge&logo=mui&logoColor=white" alt="Material UI 9" />
    <img src="https://img.shields.io/badge/Formik-Forms-2563EB?style=for-the-badge" alt="Formik forms" />
    <img src="https://img.shields.io/badge/Yup-Validation-7C3AED?style=for-the-badge" alt="Yup validation" />
  </p>
</div>

## About

Adminbox is a React admin dashboard built around a compact navigation sidebar, a searchable top bar, and focused workspace pages. It includes a dark and light theme, responsive tables and charts, and a custom dashboard identity.

### Reference image

The image below is the thumbnail for the [React admin dashboard tutorial](https://www.youtube.com/watch?v=wYpCWwD1oz0&t=7115s) that inspired the project. It is a reference, not a screenshot of Adminbox.

[![Build a complete React admin dashboard tutorial](https://img.youtube.com/vi/wYpCWwD1oz0/hqdefault.jpg)](https://www.youtube.com/watch?v=wYpCWwD1oz0&t=7115s)

## Features

- Dashboard overview with revenue, customer, order, and task metrics.
- Revenue trend, revenue mix, and recent transaction panels.
- Team directory with search, role filters, and an add-member form.
- Contact directory and invoice register with searchable data grids.
- Bar, pie, and line analytics pages, plus an interactive country activity map.
- Calendar with month navigation and a lightweight event list.
- Profile form built with Formik and Yup validation.
- FAQ topics, collapsible sidebar, page search, account menu, and notifications.
- Theme toggle with shared light and dark palettes.

## Screens and routes

| Page | Route | What it contains |
| --- | --- | --- |
| Overview | `/` | Workspace metrics, revenue charts, recent transactions |
| Team | `/team` | Member table, role filters, add-member form |
| Contacts | `/contacts` | Customer directory and contact search |
| Invoices | `/invoices` | Invoice totals, payment states, and search |
| Profile | `/form` | Validated personal and location details |
| Calendar | `/calendar` | Month view, event list, and month navigation |
| Bar chart | `/bar` | Product activity by market |
| Line chart | `/line` | Visitor trends by channel |
| Pie chart | `/pie` | Work distribution by department |
| Geography | `/geography` | Selectable world activity map |
| Help center | `/faq` | Filterable workspace, billing, and account answers |

## Run locally

Use Node.js and npm, then run the app from its project directory:

```bash
cd admin-dashboard
npm install
npm start
```

The development server opens at [http://localhost:3000](http://localhost:3000).

Create a production build with:

```bash
npm run build
```

## Tech stack

- React and React Router
- Material UI and MUI X Data Grid
- Nivo bar and pie visualizations
- Formik and Yup
- SVG charts and map rendering

## Project layout

```text
admin-dashboard/
├── public/
│   ├── assets/                 # Profile image
│   ├── brand-mark.svg          # Adminbox app and browser icon
│   ├── index.html               # Page title and metadata
│   └── manifest.json            # Installable app metadata
└── src/
    ├── components/              # Shared page headers and UI
    ├── data/                    # Demo team, invoice, chart, and map data
    ├── scenes/                  # Dashboard and routed workspace pages
    ├── App.js                   # App layout and route definitions
    └── theme.js                 # Shared themes and color mode
```

## Demo data

Dashboard metrics, contacts, invoices, charts, and map values use sample data from `src/data`. Team additions and calendar events stay in the current browser session. The profile form validates and submits locally; connect these pages to an API or database to persist records.

## Image credits

- Tutorial thumbnail: [Build a COMPLETE React Admin Dashboard App](https://www.youtube.com/watch?v=wYpCWwD1oz0&t=7115s), by Ed Roh, served by YouTube.
- Stack badges: [Shields.io](https://shields.io/).
