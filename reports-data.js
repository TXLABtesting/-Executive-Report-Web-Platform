// Unified content model — Digital Transformation Department executive reports.
// Add a new weekly report by appending to `archive` and (if current) updating the report objects.

export const site = {
  org: "Ministry of Cabinet Affairs",
  dept: "Digital Transformation Department",
  lastUpdated: "Wednesday, 22 July 2026",
};

export const wgsReport = {
  id: "wgs-2026-07-17",
  href: "wgs-weekly-status.html",
  pdf: "uploads/WGS_Weekly_Status_Report_17July.pdf",
  title: "WGS Weekly Status Report",
  programme: "Digital Transformation Strategy 2027",
  subtitle: "WGS Digital Transformation 2027 — Internal Status Update",
  date: "17 July 2026",
  weekOf: "Week of 13 July 2026",
  overallStatus: "In Progress",
  summary: "7 sessions completed this week across Salesforce, Evento, Community Portal and Program Portal. Salesforce onboarding started — PM assigned, kickoff targeted for late next week. 3 medium risks tracked; 6 action items in motion.",
  glance: {
    stats: [
      { n: "7", label: "Sessions Held" },
      { n: "Started", label: "Salesforce Onboarding" },
    ],
    covers: [
      "Meetings Held — 7 Sessions",
      "Workstream Focus — Community Portal",
      "Salesforce Integration — Deep Dive",
      "Key Decisions & Risks",
      "Action Items & Next Steps",
    ],
  },
  meetings: [
    { num: "01", group: "Integration & Community Sessions", title: "Salesforce — Pre-Kickoff & Progress", badge: "2 Sessions Complete",
      attendees: "Shamma · Haider · Abdulla · Hind · Ibrahim (MOCA) · Barnie · Joonas · Carlos · Mike (Salesforce)",
      outcomes: [
        "Briefed Salesforce on our platform and the single-point program-portal integration — already aligned internally",
        "Staffing largely in place — PM assigned; core dev & MuleSoft teams set; technical architect the main open role",
        "Kickoff targeted for late next week; PM to introduce herself to WGS (Shamma & Haider) and share a plan",
        "Security clearance to start; WGS to engage the technical team with 1020; discovery to follow onboarding",
      ] },
    { num: "02", group: "Integration & Community Sessions", title: "Evento — Demo & Badge Printing", badge: "Complete",
      attendees: "Shamma · Haider · Hind · Ibrahim · Hind AlTamimi · M. Shaaban · Abdulla (MOCA) · Mubeenulla · M. Raza (Evento)",
      outcomes: [
        "Badge print / reprint status to sync from Evento to Salesforce, keeping Salesforce current",
        "Self-service printing for participants only; reprints handled by an authorised supervisor after verification",
        "A reprint deactivates the original badge and the replacement becomes active, with a confirmation prompt",
        "New Authorized-Person field for badge collection; bulk “Print All” with progress and a short buffer",
      ] },
    { num: "03", group: "Integration & Community Sessions", title: "Community Portal — Permissions & Requirements", badge: "2 Sessions Complete",
      attendees: "Ibrahim · Shamma · Hind · Haider (MOCA / WGS) · TenTwenty project team",
      outcomes: [
        "Role-based permission matrix reviewed; profiles & networking limited to backend-published users",
        "Program vs Community Portal boundary aligned — coordinators vs participants / speakers",
        "Registration to separate WGS-covered vs self-paid travel / booking; meeting-room flows clarified",
        "Test accounts created; TenTwenty to consolidate clarifications and close high-fidelity flows this week",
      ] },
    { num: "04", group: "Program Portal Sessions", title: "Program Portal — Screen Content", badge: "Complete",
      attendees: "MOCA / WGS · TenTwenty · Publicis",
      outcomes: [
        "Screen-content export by session / room / bulk with EN, AR & bilingual transparent-PNG output",
        "Permission-based access with approval status, version control and marked “Not Approved” rehearsal access",
        "Session content, run-of-show & media managed in-portal as a single source of truth",
        "Screen fields, approval responsibilities & prior-year specs pending from WGS / MoCA & Publicis",
      ] },
    { num: "05", group: "Program Portal Sessions", title: "Program Portal — Feedback Clarifications", badge: "Complete",
      attendees: "WGS · TenTwenty",
      outcomes: [
        "Checklist to become an end-to-end approval workflow — session & program gates mapped separately",
        "Newspaper module updated; sponsor-logo layout to be standardised into a space-efficient grid",
        "Interactive split-screen newspaper preview demoed; to be reviewed with Marketing / Marcom",
        "WGS to share approval-flow mappings; default venue / capacity data pending from Publicis",
      ] },
  ],
  workstream: {
    title: "Community Portal",
    subtitle: "Two requirement sessions held · permissions, user flows, registration & room booking clarified",
    timeline: [
      { step: 1, phase: "Requirements Gathering", status: "In Progress" },
      { step: 2, phase: "Architecture & Design", status: "TBC" },
      { step: 3, phase: "Development", status: "TBC" },
      { step: 4, phase: "Data Migration & Sanity", status: "TBC" },
      { step: 5, phase: "UAT & Go-Live", status: "TBC" },
    ],
    currentStatus: [
      "Permission matrix reviewed across user types; nominee-quota visibility limited to Government & partner / member users",
      "Participant directory & networking gated to backend-published, portal-enabled profiles only",
      "Program vs Community Portal boundary aligned — coordinators on Program Portal, participants / speakers on Community Portal",
      "Registration to separate WGS-covered vs self-paid travel & accommodation, with WGS facilitation",
      "Meeting-room booking to serve partner-lounge & delegate flows; Salesforce as the central room source",
      "Test accounts for key roles & journey states created and shared; recorded-session access provided",
    ],
    openDecisions: [
      "Duplicate / non-relevant requirements to be cleaned from the tracker before further deep-dives",
      "Self-paid booking, unique registration links & passport / image validation pending feasibility review",
      "Nomination & registration to stay separate; extra early-stage fields optional until full registration",
    ],
    nextSteps: [
      "TenTwenty to complete the internal review and return a consolidated list of clarification points",
      "Review unresolved Excel enhancements first, including the authorised-photo self-printing requirement",
      "Validate remaining speaker, request, session-material & logistics flows and close high-fidelity flows this week",
      "Refine the technical design for registration, self-paid booking and meeting-room workflows",
    ],
  },
  salesforce: {
    context: "17 July 2026 · Salesforce Progress / Staffing Update · WGS / Salesforce",
    blocks: [
      { title: "Staffing Progress", body: "PM assigned (Carlos meeting her this week); core development & MuleSoft teams largely in place; technical architect the key open role due to assignment restrictions." },
      { title: "Kickoff Timing", body: "Carlos to confirm a realistic date after the PM session — targeted mid-to-end of next week (Monday at the latest); PM to propose an intro meeting early next week." },
      { title: "Security & Access", body: "PM to identify the personnel needing server / system access and begin coordination; Salesforce to start sending the security-clearance documentation between today and Monday." },
      { title: "Technical Engagement & Discovery", body: "WGS to engage the technical team with 1020 next week to arrange collaboration; the discovery phase begins once the Salesforce resources are onboarded." },
    ],
    shared: "The Salesforce team was briefed on our integrated platform and the single-point integration via the program portal — already aligned internally — so they understand our systems ahead of the kickoff.",
    decisions: "PM to lead kickoff prep and coordinate with Shamma & Haider; the open technical-architect role is not a blocker; kickoff targeted for late next week, with security-clearance documentation starting by Monday.",
  },
  decisions: [
    { item: "Salesforce Kickoff & Staffing", detail: "A Salesforce PM has been assigned to lead kickoff preparation and coordinate with WGS (Shamma & Haider); core development and MuleSoft teams are largely in place, with the technical architect the main open role.", status: "In Progress" },
    { item: "Portal Roles & Boundaries", detail: "Coordinators use the Program Portal (permission-based views); participants and speakers use the Community Portal. Profiles and networking appear only for backend-published users.", status: "In Progress" },
    { item: "Badge Printing Integration", detail: "Self-service printing for participants only; supervised reprints deactivate the old badge; print / reprint status synced from Evento to Salesforce; new Authorized-Person field.", status: "In Progress" },
  ],
  risks: [
    { level: "MED", risk: "Technical Architect Still Open", mitigation: "Core dev & MuleSoft teams are in place, but no suitable technical architect found yet (assignment restrictions + summer availability). Mitigation: does not block PM intro or planning; resource managers pushing to fill, update at next call." },
    { level: "MED", risk: "Program Portal Inputs & Approvals", mitigation: "Screen-content fields, approval responsibilities, document categories and prior-year specs are pending (WGS / MoCA + Publicis). Mitigation: confirm outstanding decisions and share operational data / prior-year outputs." },
    { level: "MED", risk: "Community Portal Requirements Cleanup", mitigation: "Enhancement tracker holds unclear, duplicate and non-relevant items; unresolved Excel items block finalisation. Mitigation: TenTwenty internal review to return a consolidated clarification list this week." },
  ],
  actions: [
    { action: "Conclude Salesforce staffing (technical architect) and confirm the kickoff date after the PM session", owner: "Carlos Amell / Salesforce", target: "Late next week", status: "In Progress" },
    { action: "PM to introduce herself to WGS (Shamma & Haider), share a plan and engage the technical teams with 1020", owner: "Salesforce PM · WGS", target: "Next week", status: "Planned" },
    { action: "Identify personnel needing server / system access; start clearance documentation; create sandbox & grant DevOps access", owner: "Salesforce PM · Shamma / IT", target: "By Monday", status: "Pending" },
    { action: "Community Portal test accounts & recorded-session access shared; TenTwenty to update the permission matrix & detailed flows", owner: "Haider Ali / MoCA · TenTwenty", target: "Next review", status: "In Progress" },
    { action: "Program Portal: Publicis to share screen specs & capacities; WGS / MoCA to finalise content fields & approvals", owner: "Publicis · WGS / MoCA · TenTwenty", target: "By 23 July", status: "Pending" },
    { action: "Evento: add Authorized-Person field, sync badge status to Salesforce, update Salesforce / Community Portal fields", owner: "WGS · Salesforce · Evento", target: "TBC", status: "Pending" },
  ],
};

const P = (name, entity, status, updates, next, goLive) => ({ name, entity, status, updates, next, goLive });

export const demandReport = {
  id: "demand-2026-07-22",
  href: "ministry-project-demand.html",
  pdf: "uploads/project-demand-status-report.pdf",
  title: "Project & Demand Status Report",
  subtitle: "Weekly Update · Wednesday, 22 July 2026",
  org: "Ministry of Cabinet Affairs",
  dept: "Digital Transformation Department · Confidential",
  date: "22 July 2026",
  overallStatus: "In Progress",
  summary: "Portfolio of 93 items — 66 projects & enhancements, 27 demands, 32 live in production — across entities / sectors. Near-term go-lives: UAE GLP Website Revamp, Events Calendar (MOCASmart) and MOCASmart Release 5 (31 July), Org Structure (31 Aug), Government Missions (1 Sep).",
  stats: [
    { n: "93", label: "Total Projects", sub: "All projects, releases & demands" },
    { n: "66", label: "Projects & enhancements", sub: "Active deliveries & releases" },
    { n: "27", label: "Demands", sub: "Backlog & requests" },
    { n: "32", label: "Live", sub: "Currently in production" },
  ],
  entities: [
    { name: "CSS", n: 37 }, { name: "MOCA", n: 24 }, { name: "PMO", n: 8 }, { name: "WGS", n: 7 },
    { name: "Performance & Govt Excellence", n: 4 }, { name: "Strategy & Innovation", n: 3 }, { name: "GSOC", n: 3 },
    { name: "FCSC", n: 2 }, { name: "Govt Development & Future Office", n: 1 }, { name: "GEEO", n: 1 },
    { name: "Office of Secretary-General", n: 1 }, { name: "Govt Leadership & Talent", n: 1 }, { name: "GMO", n: 1 },
  ],
  sections: [
    { id: "projects", num: "01", title: "Projects", groups: [
      { label: "Banan Taleb", items: [
        P("Organization Structure (HR Services)", "CSS", "On Track",
          ["The development has been completed for the business feedback that we received", "Following up with the business to get the final confirmation"],
          ["Close the project"], "3 Aug 2026"),
        P("FAHR Sick Leave Integration", "CSS", "On Track",
          ["Following up with the business team to get the signed SOW", "Start the development"],
          ["Received the signed SOW", "Continue the development"], "23 Nov 2026"),
        P("GSR Platform Enhancements", "PMO", "On Track",
          ["Meeting with TDRA has been completed and confirmed to UAE Pass as a sole log in mechanism", "The feedback has been received from the business team after the testing", "Phase 3 under development with 40% completed"],
          ["Proceed with phase 2 deployment to production"], "30 Sep 2026"),
        P("Talent Management System Design", "CSS", "On Track",
          ["Meeting with the business team has been completed to review the wireframe", "Schedule a meeting by Friday with the vendor to present the home page and key screens from their side"],
          ["Get the business feedback after the demo"], "21 Sep 2026"),
        P("Vendor Management – NER Enhancement", "CSS", "On Track",
          ["The development completed and waiting for the business confirmation"],
          ["Share closure document and close the project"], "TBD — awaiting business confirmation to go live"),
        P("MBRGEA", "Performance & Govt Excellence", "On Track",
          ["The testing is in progress from the business side for the AI summarization tool and AI insight", "New enhancement has been received from the business side and it is under development"],
          ["Complete the ADAA integration enhancement", "Complete the testing and get the UAT document sign off"], "26 Oct 2026"),
        P("APEX – Outsource Hiring", "CSS", "Initiation",
          ["Revised plan has been shared with the business team"],
          ["Start the project"], "12 Feb 2027"),
        P("APEX – Contract Renewal", "CSS", "Closure",
          ["The updated demo of the notification email has been shared with the TX team"],
          ["Align on the next step after receiving the confirmation from Ali about the notification email demo"], "TBD — pending HR confirmation on email design"),
      ] },
      { label: "Noura Almansoori", items: [
        P("Government Missions", "Strategy & Innovation", "On Track",
          ["Reviewed the updated project timeline. The official launch remains 1 September, with some milestone dates adjusted", "Presented the high-level implementation plan covering the four project phases", "Agreed to complete the production go-live before the official launch to allow for testing and final validation"],
          ["The Omnia team will share the detailed project timeline, including activities, milestones, dependencies, and progress tracking", "The Omnia team will finalize the updated design concept and provide a preview early next week, subject to confirmation on Monday", "Project progress meetings will be held twice a week to track progress, review deliverables, and address any blockers"], "1 Sep 2026"),
        P("Superset", "PMO", "In Progress",
          ["Superset is part of the PMS (Raqmn) platform and serves as a subsite used for reporting and dashboard visualization", "Raqmn is live now, after security scan and everything, it was published as pms.egsep.ae, then project published with new url raqmn.egsep.gae"],
          ["Confirm next step with the project owner"], "TBD — not yet baselined"),
        P("Stemexe", "FCSC", "In Progress",
          ["Stemex is a system used to manage projects", "The project started two months ago", "The workflow has been deployed on FedNet"],
          ["Confirm next step with the project owner"], "TBD — not yet baselined"),
        P("National Statistical Data Platform", "FCSC", "In Progress",
          ["The project kicked off on 27/1/2026", "It is currently in the discovery phase", "There are two discovery phases: a technology discovery phase focused on implementation and the tools to be used, and a business discovery phase"],
          ["Schedule a meeting with Presight to present the solution, scope and the roadmap (Sasi)", "Review the RACI matrix and share the feedback (Shamma)"], "TBD — not yet baselined"),
        P("AI Chatbot", "CSS", "On Track",
          ["We went through the plan and the solution demo", "The previous issue has been fixed"],
          ["The password reset process will use a redirect link; the required steps and user guidance should be added", "The offers section will remain as currently implemented", "The issue related to the Employee Directory and user permissions should be fixed"], "7 Sep 2026"),
      ] },
      { label: "Shamma Almarri", items: [
        P("WGS Website 2027", "WGS", "Initiation", ["Not yet started"], ["Confirm next step with the project owner"], "31 Dec 2026"),
        P("WGS Mobile App 2027", "WGS", "Initiation", ["Not yet started"], ["Confirm next step with the project owner"], "31 Dec 2026"),
        P("WGS Community Portal 2027", "WGS", "Initiation", ["Not yet started"], ["Continue on finalizing requirements"], "31 Dec 2026"),
        P("WGS Program Portal 2027", "WGS", "Initiation",
          ["All requirements and session completed between business and vendor"],
          ["To plan for a demo session to present to business progress on the development part"], "31 Dec 2026"),
        P("WGS API Development 2027", "WGS", "Initiation",
          ["We are exploring shifting from eclrex to salesforce", "Meetings with Salesforce completed to explain requirements"],
          ["To finalize commercial engagement with Salesforce and kick-off with them"], "31 Dec 2026"),
        P("WGS Salesforce Enhancements 2027", "WGS", "Initiation",
          ["We are exploring shifting from eclrex to salesforce", "Meetings with Salesforce completed to explain requirements"],
          ["To finalize commercial engagement with Salesforce and kick-off with them"], "13 Jan 2027"),
      ] },
      { label: "Zeyad Dallah", items: [
        P("AI Solution for KPI Insights (ADAA)", "Performance & Govt Excellence", "On Track",
          ["BRD has been approved by business users", "Development phase started", "Following up with IT team to finish the setup of staging environment"],
          ["Finalizing the staging and production environment"], "30 Oct 2026"),
        P("Media Monitoring & Public Feedback Intelligence Platform", "PMO", "Initiation",
          ["Vendor evaluation is under process by business users and procurement; reminder sent to business"],
          ["Finalize the vendor evaluation process with business users"], "TBD — under technical evaluation; plan not provided"),
        P("MBRGS Application", "MOCA", "In Progress",
          ["Requirements gathering session has been accomplished", "New design branding is sent by business to finalize the BRD", "Initiate the UAE Pass integration process with TDRA"],
          ["Prepare and provide the BRD to business for approval", "Technical meeting with TDRA for UAE Pass integration"], "31 Dec 2026"),
        P("MBRGS Call Center", "MOCA", "Initiation",
          ["Toll number 800 has been requested and sent to Etisalat", "Two resources under review by TEO"],
          ["Waiting IT team to upload the request in Etisalat B2B portal for number reservation to start the configuration"], "27 Nov 2026"),
        P("Org Structure", "CSS", "On Track",
          ["Development is completed and final corrections is under preparation", "UAT sessions started this week where we collect the first feedback from business"],
          ["Continue UAT session with business user", "Finalize the delivery date from the tracking sheet with business"], "31 Aug 2026"),
        P("AI Board Observer – Cabinet", "GSOC", "On Track",
          ["Data migration has been accomplished on staging (100 subjects) to verify the behavior of AI and to confirm it with business users before start on production"],
          ["Fine tuning the data migration in staging along with all vendors to start the UAT with business users, before moving to production, as we are targeting 10 years"], "31 Jan 2026 — pending top management decision"),
        P("UAE Regulatory Intelligence – Technical & Hosting", "Office of Secretary-General", "On Track",
          ["Preparing for the phase 2 with vendor as the GPU hardware will be received by September", "Had technical meeting with our system team and vendor to finalize the approach of phase 2"],
          ["Test and QA for the platform", "Close the security reported item from Cybersecurity team"], "TBD — timeline unapproved; Phase 2 scope open"),
        P("UAE GLP Website Revamp", "Govt Leadership & Talent", "On Track",
          ["Design approved by Business users", "Application is under development"],
          ["Prepare for the UAT sessions and deployment", "Sending the site for security scan"], "31 Jul 2026"),
        P("E-Cabinet System 2.0", "GSOC", "On Track",
          ["Working on data migration for current ecabinet activity with both vendors and prepare the infrastructure for documents migration", "BRD are approved from business", "Development is going on as the initial plan"],
          ["Finalizing the documents in follow up system and moving it to pre-production environment"], "31 Oct 2026"),
      ] },
    ] },
    { id: "mocasmart", num: "02", title: "MOCASmart", groups: [
      { label: "Active releases", items: [
        P("Events Calendar (MOCASmart)", "CSS", "On Track",
          ["The testing has been completed from the business team", "Received a new enhancement and shared with the vendor", "The enhancement completed and shared with the business for the testing"],
          ["Complete the business testing"], "31 Jul 2026"),
        P("Release 4.6 – Managerial & Executive Level View", "CSS", "Initiation",
          ["Revised plan has been created"], ["Start the project"], "18 Sep 2026"),
        P("MOCASmart Release 5 – Business Mission", "CSS", "On Track",
          ["The approval development is under process from the Oracle side", "Received the updated design for the approval part and shared with the vendor", "Implement the business mission evaluation in Oracle"],
          ["Finalize the development for the approval process", "Schedule a testing session with the business team"], "31 Jul 2026"),
      ] },
      { label: "Future releases", items: [
        P("MOCASmart Procurement Module", "CSS", "Not active",
          ["Received the proposal document from the vendor", "Shared the proposal with the business team to obtain approval"],
          ["Initiate the project"], "TBD — not active; pending AI decision"),
        P("Peer Assignment System", "CSS", "Not active",
          ["Awaiting internal confirmation"], ["Await HR confirmation"], "TBD — not active; pending HR confirmation"),
        P("HR Requests (Job Description Icon & Oracle Integration, Employee Benefits, Contracts, Acknowledgment Page)", "CSS", "Under Scope Analysis",
          ["Draft SOW shared with the business; Job Description will be a separate scope"],
          ["Await confirmation from the business"], "TBD — draft SOW awaiting confirmation"),
        P("Working Remotely Enhancement", "CSS", "Not active",
          ["Meeting with the HR team scheduled for a brainstorming session"],
          ["Hold the brainstorming session with the HR team"], "TBD — to be reactivated with HR"),
      ] },
      { label: "Delivered releases", items: [
        P("Release 4.5", "CSS", "Live", ["Leave Visibility (FYI)", "Leave History & Attendance Report Enhancement"], [], "Live"),
        P("Release 4.4", "CSS", "Live", ["Gift Disclosure Enhancement", "Payslip Design Enhancement – MOCASmart", "Hajj Leave Enhancement", "Personalized Eid Al Adha Greeting Link", "Survey Push Notification"], [], "Live"),
        P("Release 4.3", "CSS", "Live", ["Vendor Catalog & Tiers Enhancement", "Reject Requests (Petty Cash, Reimbursement, Credit Card)", "Employee Address Update", "Enhancing the Submission for Compassionate Leave", "Survey Push Notification"], [], "Live"),
        P("Release 4.2", "CSS", "Live", ["News & Announcements", "Absence Statistics (Check-In & Check-Out Time)", "WFH Check-In / Check-Out"], [], "Live"),
        P("Release 4.1", "CSS", "Live", ["Duaa Popup Feature", "TMS Guide on MOCASmart", "Gift Disclosure Integration with Oracle"], [], "Live"),
        P("Release 4", "CSS", "Live", ["Pop-up for Pending Justification", "Change Password Feature", "Policies Section", "Duaa Icon & Push Notification", "Relative Declaration Card"], [], "Live"),
        P("Release 3", "CSS", "Live", ["Released and in production"], [], "Live"),
      ] },
    ] },
    { id: "demands", num: "03", title: "Demands", groups: [
      { label: "Banan Taleb", items: [
        P("Gov Survey Upgrade", "MOCA", "Under Scope Analysis",
          ["Apply for a security clearance for the resource and waiting for the approval"],
          ["To start the project"], "—"),
        P("Acting Project", "MOCA", "Under Scope Analysis",
          ["Meeting with Oracle team has been completed and confirmed that 2-way integration is not possible since this feature is not available in Oracle", "Discuss with the HR team to start the development in Oracle first"],
          ["Schedule a meeting with the HR team to align on the next step"], "—"),
        P("Decrees (HR Services)", "MOCA", "With Business",
          ["New demo conducted for the template feature on GovSign", "HR liked this feature and would like to proceed"],
          ["Await chief approval"], "—"),
        P("HR Requests (Job Description Icon & Oracle Integration, Employee Benefits, Contracts and Acknowledgment Page)", "MOCA", "Under Scope Analysis",
          ["Draft SOW shared with the business; Job Description will be a separate scope"],
          ["Await confirmation from the business"], "—"),
      ] },
      { label: "Noura Almansoori", items: [
        P("Demand & Digital Transformation Services in MOCA App", "MOCA", "Under Scope Analysis",
          ["The Scope of Work has been updated and approved", "We had a meeting with the design team to discuss the changes, and we shared with them the feedback"],
          ["We are waiting for the design team to share the updated design"], "—"),
        P("Application Development for Government Relations & Protocol Dept.", "MOCA", "Under Scope Analysis",
          ["The SOW has been approved by the business team", "We have invited the vendors to submit their proposals for the Government Relations & Protocol System – Mobile Application project", "The proposal submission deadline is 28 July"],
          [], "—"),
        P("Breathable Infrastructure Competition Website", "PMO", "Under Scope Analysis",
          ["The business has approved proceeding with awarding Planet Green as the vendor"],
          ["We will schedule a kickoff meeting with the business and the vendor to initiate the project"], "—"),
        P("Automating the Department Achievements Report (INJAZ)", "MOCA", "Proposal Review",
          ["We received the proposal from the Kalvad team", "We have shared the proposal with business", "Multiple meetings were held with the business team and design team to discuss the Scope of Work; additional changes have been requested, and once finalized we will proceed"],
          [], "—"),
        P("Photographer & Videographer Requests (EMS and MOCA App)", "MOCA", "Under Scope Analysis",
          ["MOCA Smart will be used by employees to submit requests for photographers and videographers", "Admin users in EMS will be able to add/edit photographer and videographer schedules and show their leaves from Oracle", "In EMS, photographers will have the option to click “Start Job” when they begin and “End Job” upon completion"],
          ["The business team has decided to include Agentic AI in the project scope; we are currently updating the Scope of Work (SOW) and will share the revised version"], "—"),
        P("EMS Phase 2", "MOCA", "Under Scope Analysis",
          ["We had a meeting with the Design Team and the Business Team", "The proposed design was approved", "The business team will arrange a meeting with project managers from different entities to gather their feedback on the design"],
          ["Once we receive the PMs' feedback, we will share the comments with the vendor for implementation and deployment of the new design", "Meeting is done with business team, and we are working on updating the SOW"], "—"),
        P("Assets Request", "MOCA", "Under Scope Analysis",
          ["We had a meeting with Motion Pexels and the business team to review the solution and gather their feedback", "Motion Pexels team will share the technical proposal, initial plan and cost that includes AI recommendations", "Saif and Shaikha will provide details of existing systems and API access information for Span, and other data sources to enable integrations"],
          ["Saif & Shaikha will send a sample of the client's data"], "—"),
        P("Avatar AI Phase 2", "PMO", "Under Scope Analysis",
          ["Explored the possibility of replicating the current avatar (same look and feel) to enable simultaneous deployment across multiple government entities", "The objective is to evolve the avatar from a single “minister” persona into an advisor supporting multiple ministers or government leadership teams", "Replicating the solution as a UAE national persona by adapting the avatar’s appearance and accent, while maintaining the same advisory function"],
          ["Business team is awaiting vendor feedback on the previously shared questions regarding the proposed change of persona from “Minister” to “Advisor”"], "—"),
        P("Store Management System", "MOCA", "RFI",
          ["Business team will not proceed with in-house development; we have shared the SOW with several vendors, and we expect to receive their proposals soon"],
          ["Once we receive the proposals, we will schedule a meeting with the business team to review and evaluate"], "—"),
        P("Automating Group Email Creation Process", "MOCA", "Proposal Review",
          ["The Oracle plan has been shared with the business team", "We have received the final proposal from the Kalvad team", "We are currently finalizing the SP plan and will share the complete project plan with the business team once it is finalized"],
          [], "—"),
      ] },
      { label: "Zeyad Dallah", items: [
        P("Automating the Cabinet Health-Check Process", "MOCA", "Under Scope Analysis",
          ["Scope and design has been highlighted to the vendor, and we expect the first release to be in July 2026"],
          ["Having a live demo with business once the release is deployed"], "—"),
      ] },
    ] },
    { id: "live", num: "04", title: "Live Projects", groups: [
      { label: "", items: [
        P("Events Calendar (MOCAverse)", "CSS", "Live", [], ["Finish the development"], "Live"),
        P("Executive Dashboard Release 2 – Enhancement", "CSS", "Live", [], ["The UAT session scheduled on Monday 11/5"], "Live"),
        P("MOCA SSA", "CSS", "Live", [], ["Share closure document"], "Live"),
        P("Enhancing MOCA Letters", "CSS", "Live", [], ["To complete remaining letters", "To prepare closure document"], "Live"),
        P("Government Accelerator Website", "PMO", "Live", [], ["Share the closure document"], "Live"),
        P("WGS Website", "WGS", "Live", [], [], "Live"),
        P("NER", "CSS", "Live", [], [], "Live"),
        P("DOR", "CSS", "Live", [], ["Share the DOW and EIT report extract with the HR team", "Share the closure document"], "Live"),
        P("API Migration to OIC (MOCAVerse)", "CSS", "Live", [], [], "Live"),
        P("API Migration to OIC (FORAS)", "CSS", "Live", [], [], "Live"),
        P("Vendor Dashboard", "CSS", "Live", [], ["Get a confirmation from the business team to move to production"], "Live"),
        P("APEX – Off-Boarding", "CSS", "Live", [], ["Send a closure document"], "Live"),
        P("APEX – Relative Declaration", "CSS", "Live", [], [], "Live"),
        P("APEX – Probation Extension", "CSS", "Live", [], [], "Live"),
        P("Talent Hub", "MBRCGI / Strategy & Innovation", "Live", [], [], "Live"),
        P("MOHAP Sick Leave Integration", "CSS", "Live", [], ["Go Live"], "Live"),
        P("Gift Disclosure Enhancement", "CSS", "Live", [], ["Begin the development"], "Live"),
        P("Avatar AI", "Govt Development & Future Office", "Live", [], ["Support phase initiation sign-off is done"], "Live"),
        P("Event Management System", "CSS", "Live", [], [], "Live"),
        P("Customer Pulse", "Performance & Govt Excellence", "Live", [], [], "Live"),
        P("GSOC Employee Worksheet", "GSOC", "Live", [], ["Handing over the full application to business by this week including the management screen"], "Live"),
        P("GEEP", "GEEO", "Live", [], ["We will start the project closure process"], "Live"),
        P("Innovation Ecosystem", "Strategy & Innovation", "Live", [], [], "Live"),
        P("AGEA System", "Performance & Govt Excellence", "Live", [], [], "Live"),
      ] },
    ] },
    { id: "onhold", num: "05", title: "On Hold / Not Active", groups: [
      { label: "", items: [
        P("Digital Library", "MOCA", "On Hold",
          ["We had a meeting with the AI Office and the vendor to review the proposed solution", "During the discussion, Saqr suggested adding an MCP layer on top of the solution; this would simplify future integrations and enhance the scalability", "The Media Info team will confirm if adding the MCP layer is feasible"],
          ["Khawla will start filtering the content", "Kickoff meeting"], "TBD — not yet baselined"),
        P("We the UAE", "PMO", "Delayed by Business",
          ["We had a meeting last week with the business and vendor teams", "The business team requested changes to both the existing design and the new design"],
          ["Santhosh is working on implementing all the design changes, business feedback, and suggestions to ensure the demo version aligns with expectations"], "TBD — awaiting business direction (target Aug/Sep)"),
        P("Project Dashboard in Executive Dashboard", "CSS", "On Hold",
          ["Waiting for the developer budget to be approved to onboard the developer"],
          ["Once budget approved, onboard the developer to kick off the project"], "TBD — not yet baselined"),
        P("MOCA Ride", "CSS", "Delayed by Business",
          ["The committee has been completed and presented this project", "The decision has been to continue with RSL for Dubai and AD and keep the MOCA cars for the other Emirates"],
          ["Contract to be signed", "Vendor to do changes requested from business"], "TBD — pending signed contract"),
      ] },
    ] },
    { id: "closed-demands", num: "06", title: "Not Active / Closed Demands", groups: [
      { label: "", items: [
        P("Working Remotely Enhancement", "MOCA", "Not active",
          ["Project team need to reactivate this request with HR"],
          ["Confirm next step with the demand owner"], "—"),
        P("Onboarding (HR Services)", "CSS", "Not active",
          ["Met with Ali to discuss next steps", "We will await confirmation on whether this service will fall within the scope of the Agentic AI project", "Once a direction is provided, we will determine how to proceed accordingly"],
          [], "—"),
        P("Security Form (Data Classification)", "MOCA", "Not active",
          ["Received the initial design from the UX team", "Send the presentation to Moza to schedule a meeting with Fouzia", "Project team will draft the initial SOW after Fouzia’s approval on the design", "The implementation of the form will be based on the old criteria until the new policy is approved"],
          [], "—"),
        P("Executive Dashboard Sprint 3", "MOCA", "Not active",
          ["Fouzia approved to do development once a new developer is onboarded"],
          ["Once a developer joined, a plan will be created for development"], "—"),
        P("Remote Work Balance – GMO", "GMO", "Not active",
          ["GMO study completed; shared with Ali"], ["Await direction"], "—"),
        P("Payroll Bot Implementation", "MOCA", "Not active",
          ["On hold"], ["To select vendor"], "—"),
        P("Peer Assignment System", "MOCA", "Not active",
          ["Awaiting internal confirmation"], [], "—"),
        P("Synthetic Memories UAE", "PMO", "Not active",
          ["The vendor is still finalizing the proposal"], ["We are waiting for an update from the business"], "—"),
        P("Audio Translator in Teams", "MOCA", "Not active",
          ["The proposals were received and shared with the business for feedback"], ["Confirm next step with the demand owner"], "—"),
        P("Tech Trial AWS", "MOCA", "Not active",
          ["The project is currently with IBM and in the design presentation phase for leadership", "We recommended the business to go through the proposal with the IT and cybersecurity teams before presenting"],
          ["Arrange two separate meetings with the IT and Cybersecurity teams to review the requirements"], "—"),
        P("Customer Pulse Integration with Jira", "CSS", "Not active",
          [], ["Confirm next step with the demand owner"], "—"),
      ] },
    ] },
  ],
};

// ==== Report-mapping rules — single source of truth for portal assignment ====
// The Project & Demand data above is the one structured source; the two portals
// below are derived views of it. Every item is assigned to exactly one portal by
// its Entity / Sector value; unrecognized values are flagged for review instead
// of being assigned automatically. All totals are computed from the data —
// never hard-coded — so no project can be lost.

export const CSS_DEMAND_HREF = "css-project-demand.html";
export const MINISTRY_DEMAND_HREF = "ministry-project-demand.html";

export const MINISTRY_ENTITIES = [
  "PMO", "MOCA", "WGS", "GSOC", "FCSC",
  "Performance & Govt Excellence", "Strategy & Innovation", "Govt Service Sector",
  "MBRCGI / Strategy & Innovation", "Govt Development & Future Office",
  "GEEO", "Office of Secretary-General", "Govt Leadership & Talent", "GMO",
];

export const isCssEntity = (e) => e === "CSS";
export const isMinistryEntity = (e) => MINISTRY_ENTITIES.includes(e);
export const isFlaggedEntity = (e) => !isCssEntity(e) && !isMinistryEntity(e);
// Flagged items resolve to the ministry portal href, where the review panel lives.
export const demandHrefFor = (e) => (isCssEntity(e) ? CSS_DEMAND_HREF : MINISTRY_DEMAND_HREF);

// Split the (possibly overridden) Project & Demand report into one portal view.
// Returns the variant's sections plus every flagged item; sections and groups
// left empty by the split are dropped.
export function splitDemand(report, variant) {
  const src = report || demandReport;
  const keep = variant === "css" ? isCssEntity : isMinistryEntity;
  const flagged = [];
  const sections = src.sections
    .map((sec) => ({
      ...sec,
      groups: sec.groups
        .map((g) => ({
          ...g,
          items: g.items.filter((it) => {
            if (isFlaggedEntity(it.entity)) {
              flagged.push({ name: it.name, entity: it.entity, section: sec.title });
              return false;
            }
            return keep(it.entity);
          }),
        }))
        .filter((g) => g.items.length > 0),
    }))
    .filter((sec) => sec.groups.length > 0);
  return { sections, flagged };
}

// Flatten a variant's sections into one item list for stats, filters and counts.
export function flattenDemand(sections) {
  const all = [];
  sections.forEach((sec) =>
    sec.groups.forEach((g) =>
      g.items.forEach((it) => all.push({ ...it, secId: sec.id, secTitle: sec.title, owner: g.label }))
    )
  );
  return all;
}

export const archive = [
  { week: "Week of 20 July 2026", date: "22 July 2026", reports: [
    { title: "Ministry Project & Demand", href: MINISTRY_DEMAND_HREF, pdf: demandReport.pdf, status: demandReport.overallStatus },
    { title: "CSS Project & Demand", href: CSS_DEMAND_HREF, pdf: demandReport.pdf, status: demandReport.overallStatus },
  ] },
  { week: "Week of 13 July 2026", date: "17 July 2026", reports: [
    { title: wgsReport.title, href: wgsReport.href, pdf: wgsReport.pdf, status: wgsReport.overallStatus },
    { title: "Ministry Project & Demand", href: MINISTRY_DEMAND_HREF, pdf: demandReport.pdf, status: demandReport.overallStatus },
    { title: "CSS Project & Demand", href: CSS_DEMAND_HREF, pdf: demandReport.pdf, status: demandReport.overallStatus },
  ] },
];

export const statusColors = {
  "Live":        { bg: "#E5F3E8", fg: "#1D6B37", dot: "#2E9E52" },
  "Complete":    { bg: "#E5F3E8", fg: "#1D6B37", dot: "#2E9E52" },
  "Closed":      { bg: "#E9ECEF", fg: "#3E4A57", dot: "#6B7887" },
  "In Progress": { bg: "#E3EDF9", fg: "#1D5290", dot: "#3273C4" },
  "Pending":     { bg: "#FBF0DC", fg: "#8A5A12", dot: "#D69A2D" },
  "Planned":     { bg: "#EEE9F8", fg: "#54398F", dot: "#7B5FC0" },
  "On Hold":     { bg: "#F1EEEA", fg: "#6B6257", dot: "#948A7C" },
  "Not Started": { bg: "#F1EEEA", fg: "#6B6257", dot: "#948A7C" },
  "TBC":         { bg: "#F1EEEA", fg: "#6B6257", dot: "#948A7C" },
  "HIGH":        { bg: "#F9E3E1", fg: "#9B2C21", dot: "#C74438" },
  "MED":         { bg: "#FBF0DC", fg: "#8A5A12", dot: "#D69A2D" },
  "LOW":         { bg: "#E5F3E8", fg: "#1D6B37", dot: "#2E9E52" },
  // Statuses used by the 22 July 2026 report vocabulary.
  "On Track":             { bg: "#E5F3E8", fg: "#1D6B37", dot: "#2E9E52" },
  "Initiation":           { bg: "#EEE9F8", fg: "#54398F", dot: "#7B5FC0" },
  "Closure":              { bg: "#E3EDF9", fg: "#1D5290", dot: "#3273C4" },
  "Under Scope Analysis": { bg: "#FBF0DC", fg: "#8A5A12", dot: "#D69A2D" },
  "With Business":        { bg: "#FBF0DC", fg: "#8A5A12", dot: "#D69A2D" },
  "Proposal Review":      { bg: "#FBF0DC", fg: "#8A5A12", dot: "#D69A2D" },
  "RFI":                  { bg: "#FBF0DC", fg: "#8A5A12", dot: "#D69A2D" },
  "Delayed by Business":  { bg: "#F9E3E1", fg: "#9B2C21", dot: "#C74438" },
  "Not active":           { bg: "#F1EEEA", fg: "#6B6257", dot: "#948A7C" },
};

// Dark-theme badge colors (translucent fills for dark surfaces).
export const darkStatusColors = {
  "Live":        { bg: "rgba(40,224,165,0.13)", fg: "#3DDFA9", dot: "#3DDFA9" },
  "Complete":    { bg: "rgba(40,224,165,0.13)", fg: "#3DDFA9", dot: "#3DDFA9" },
  "Closed":      { bg: "rgba(148,163,184,0.14)", fg: "#9AA8B8", dot: "#9AA8B8" },
  "In Progress": { bg: "rgba(96,165,250,0.14)", fg: "#6FB1FF", dot: "#6FB1FF" },
  "Pending":     { bg: "rgba(245,184,74,0.15)", fg: "#F5B84A", dot: "#F5B84A" },
  "Planned":     { bg: "rgba(167,139,250,0.16)", fg: "#B8A5FF", dot: "#B8A5FF" },
  "On Hold":     { bg: "rgba(148,163,184,0.12)", fg: "#93A1B0", dot: "#7C8994" },
  "Not Started": { bg: "rgba(148,163,184,0.12)", fg: "#93A1B0", dot: "#7C8994" },
  "TBC":         { bg: "rgba(148,163,184,0.12)", fg: "#93A1B0", dot: "#7C8994" },
  "HIGH":        { bg: "rgba(248,113,113,0.15)", fg: "#F87171", dot: "#F87171" },
  "MED":         { bg: "rgba(245,184,74,0.15)", fg: "#F5B84A", dot: "#F5B84A" },
  "LOW":         { bg: "rgba(40,224,165,0.13)", fg: "#3DDFA9", dot: "#3DDFA9" },
  "On Track":             { bg: "rgba(40,224,165,0.13)", fg: "#3DDFA9", dot: "#3DDFA9" },
  "Initiation":           { bg: "rgba(167,139,250,0.16)", fg: "#B8A5FF", dot: "#B8A5FF" },
  "Closure":              { bg: "rgba(96,165,250,0.14)", fg: "#6FB1FF", dot: "#6FB1FF" },
  "Under Scope Analysis": { bg: "rgba(245,184,74,0.15)", fg: "#F5B84A", dot: "#F5B84A" },
  "With Business":        { bg: "rgba(245,184,74,0.15)", fg: "#F5B84A", dot: "#F5B84A" },
  "Proposal Review":      { bg: "rgba(245,184,74,0.15)", fg: "#F5B84A", dot: "#F5B84A" },
  "RFI":                  { bg: "rgba(245,184,74,0.15)", fg: "#F5B84A", dot: "#F5B84A" },
  "Delayed by Business":  { bg: "rgba(248,113,113,0.15)", fg: "#F87171", dot: "#F87171" },
  "Not active":           { bg: "rgba(148,163,184,0.12)", fg: "#93A1B0", dot: "#7C8994" },
};

// Visual themes — CSS custom properties applied on each page's root element.
export const themes = {
  "Warm Paper": { "--bg": "#FAF7F2", "--sf": "#FFFFFF", "--sf2": "#F3EFE7", "--bd": "#E6E0D4", "--ink": "#22312E", "--mut": "#75807B", "--acc": "#2F6F62", "--accInk": "#FFFFFF", "--glow": "rgba(47,111,98,0.08)" },
  "Mist Blue":  { "--bg": "#F4F6F8", "--sf": "#FFFFFF", "--sf2": "#ECF0F4", "--bd": "#DCE3EA", "--ink": "#20304A", "--mut": "#7C8CA0", "--acc": "#3B6EA8", "--accInk": "#FFFFFF", "--glow": "rgba(59,110,168,0.08)" },
  "Sage":       { "--bg": "#EFF3F1", "--sf": "#FFFFFF", "--sf2": "#E6ECE8", "--bd": "#D8E0DA", "--ink": "#2A3B33", "--mut": "#7B897F", "--acc": "#4A7A5C", "--accInk": "#FFFFFF", "--glow": "rgba(74,122,92,0.10)" },
};

// Flat search index across all report portals.
export function buildSearchIndex() {
  const ix = [];
  ix.push({ type: "Report", title: wgsReport.title, text: wgsReport.summary, href: wgsReport.href, meta: wgsReport.date });
  ix.push({ type: "Report", title: "Ministry Project & Demand", text: demandReport.summary, href: MINISTRY_DEMAND_HREF, meta: demandReport.date });
  ix.push({ type: "Report", title: "CSS Project & Demand", text: demandReport.summary, href: CSS_DEMAND_HREF, meta: demandReport.date });
  wgsReport.meetings.forEach(m => ix.push({ type: "Meeting", title: m.title, text: m.attendees + " " + m.outcomes.join(" "), href: wgsReport.href + "#meetings", meta: wgsReport.weekOf }));
  wgsReport.decisions.forEach(d => ix.push({ type: "Decision", title: d.item, text: d.detail, href: wgsReport.href + "#decisions", meta: d.status }));
  wgsReport.risks.forEach(r => ix.push({ type: "Risk", title: r.risk, text: r.mitigation, href: wgsReport.href + "#decisions", meta: r.level }));
  wgsReport.actions.forEach(a => ix.push({ type: "Action", title: a.action, text: a.owner + " " + a.target, href: wgsReport.href + "#actions", meta: a.status }));
  demandReport.sections.forEach(sec => sec.groups.forEach(g => g.items.forEach(it => ix.push({
    type: sec.id.includes("demand") ? "Demand" : sec.id === "mocasmart" ? "Release" : "Project",
    title: it.name,
    text: [it.entity, g.label, it.updates.join(" "), it.next.join(" ")].join(" "),
    href: demandHrefFor(it.entity) + "#" + sec.id,
    meta: (g.label ? g.label + " · " : "") + it.status + (it.goLive && it.goLive !== "—" ? " · Go-live " + it.goLive : ""),
  }))));
  return ix;
}
