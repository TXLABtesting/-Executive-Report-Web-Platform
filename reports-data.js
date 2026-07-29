// Unified content model — Digital Transformation Department executive reports.
// Add a new weekly report by appending to `archive` and (if current) updating the report objects.

export const site = {
  org: "Ministry of Cabinet Affairs",
  dept: "Digital Transformation Department",
  lastUpdated: "29 July 2026",
};

export const wgsReport = {
  id: "wgs-2026-07-24",
  href: "wgs-weekly-status.html",
  pdf: "uploads/WGS_Weekly_Status_Report_24July.pdf",
  title: "WGS Weekly Status Report",
  programme: "Digital Transformation Strategy 2027",
  subtitle: "WGS Digital Transformation 2027 — Internal Status Update",
  date: "24 July 2026",
  weekOf: "Week of 20 July 2026",
  overallStatus: "In Progress",
  summary: "3 sessions completed this week — Security Catch-up 2, Registration Enhancements and the Program Portal AI scope review. AI stays assistive and human-controlled this phase; MuleSoft on-premises selected as the Salesforce API gateway. 3 risks tracked (1 high); 6 action items in motion.",
  glance: {
    stats: [
      { n: "3", label: "Sessions Held" },
      { n: "Aligned", label: "AI Scope" },
    ],
    covers: [
      "Meetings Held — 3 Sessions",
      "Workstream Focus — Program Portal",
      "AI Capability & Security — Deep Dive",
      "Key Decisions & Risks",
      "Action Items & Next Steps",
    ],
  },
  meetings: [
    { num: "01", group: "Requirements, Security & AI Sessions", title: "Security Catch-up 2 — Digital Portals", badge: "Complete",
      attendees: "Ibrahim Zaman · Shamma Almarri · Madhu · Abdulla AlArj (MOCA) · Siddhesh · Vaibhav · Josh · Pankaj (TenTwenty)",
      outcomes: [
        "HLD security review in progress; MOCA Security adding comments in the shared SharePoint document",
        "Deployment starts in dev; MOCA IT promotes through staging, pre-production and production",
        "MuleSoft hosted on-premises selected as the API gateway for the Salesforce integration",
        "AI voice architecture left open pending hosting / data-residency and the internal Gemini upgrade timeline",
      ] },
    { num: "02", group: "Requirements, Security & AI Sessions", title: "Registration Process Enhancements", badge: "Complete",
      attendees: "Hind Yaqoob · Mohammed Shaaban · Mohammed Raza · Abdullah Elhamarneh · Hind AlTamimi · Alia Ahli (MOCA / WGS / Evento)",
      outcomes: [
        "Non-relevant category fields to be made non-mandatory to simplify Salesforce registration",
        "Days & zones defaulted by category; support access from day zero at registration and approval",
        "Photo upload size limit to be raised / removed so photos need not be cropped and re-saved",
        "Membership seat deduction to be fixed so SE / support under a stakeholder keep original passes",
      ] },
    { num: "03", group: "Requirements, Security & AI Sessions", title: "Program Portal — AI Requirements Scope Review", badge: "Complete",
      attendees: "Ibrahim Zaman · WGS Program Team · TenTwenty (Josh)",
      outcomes: [
        "AI to recommend sessions for ministers & speakers; mappings stay suggestion-only, reviewed manually",
        "Assistive AI navigates users & pre-fills forms; no autonomous save, submit or approve this phase",
        "Internal agent integration supported via an exposed MCP & controlled tools for a future phase",
        "On-premise dev access via VPN requested before deployment; approval gates & checklists to be clarified",
      ] },
  ],
  workstream: {
    title: "Program Portal",
    subtitle: "AI requirements scope reviewed · assistive AI, approval gates & agent integration clarified",
    timeline: [
      { step: 1, phase: "Requirements Gathering", status: "In Progress" },
      { step: 2, phase: "Architecture & Design", status: "TBC" },
      { step: 3, phase: "Development", status: "TBC" },
      { step: 4, phase: "Data Migration & Sanity", status: "TBC" },
      { step: 5, phase: "UAT & Go-Live", status: "TBC" },
    ],
    currentStatus: [
      "AI can recommend suitable sessions for ministers & speakers from bios, roles & prior-year participation",
      "Feasible AI suggestions confirmed in scope; unsupported items (e.g. document / PDF generation) logged for a future roadmap",
      "Assistive AI navigates users to portal sections & pre-fills forms; it will not save, submit or approve records",
      "Internal agent may connect via an exposed MCP & controlled tools; only approved capabilities exposed",
      "On-premise development access via VPN requested before deployment to ease debugging",
      "Approval gates & operational checklist workflows paused until the end-to-end flow is understood",
    ],
    openDecisions: [
      "Minister & speaker mappings stay recommendation-only; final session assignments reviewed manually by the Program Team",
      "Autonomous save, submit & approve excluded this phase; priority is a stable core platform with human approval gates",
      "Future agentic & internal-agent integration considered via controlled MCP once use cases & safeguards are agreed",
    ],
    nextSteps: [
      "Hold the workflow clarification session to confirm program & session approval gates and the two checklist flows",
      "Review the consolidated AI scope & status list and agree the date and use cases for the updated demonstration",
      "Prepare a sample minister list & representative AI questions to test the recommendation quality",
      "Resolve the on-premise dev-access dependency and finalise outstanding Community Portal flows & permissions",
    ],
  },
  salesforce: {
    context: "20–22 July 2026 · Security Catch-up 2 & AI Scope Review · MOCA / TenTwenty",
    blocks: [
      { title: "AI Scope & Workflows", body: "Feasible AI suggestions are in scope for this phase; the assistant navigates users and pre-fills forms, while autonomous save, submit and approve are deferred to a future roadmap." },
      { title: "Agent Integration", body: "An internally developed agent can connect to the portal through an exposed Model Context Protocol and controlled tools, with only approved capabilities exposed to protect portal performance." },
      { title: "Security Architecture", body: "Deployment starts in the development environment, with MOCA IT promoting through staging, pre-production and production; VMware Workspace ONE SSO, PAM / MFA and VPN access tiers are documented in the HLD." },
      { title: "Integration & Hosting", body: "MuleSoft hosted on-premises is selected as the Salesforce API gateway; PII encryption, certificate controls and AI-voice hosting / data-residency are still to be confirmed." },
    ],
    shared: "The HLD security review progressed, but PII encryption, privileged access and AI hosting & data residency must be confirmed before production or hybrid-AI approval.",
    decisions: "MOCA Security to complete its HLD comments and notify TenTwenty; TenTwenty to revise the HLD and close the Salesforce & GCP confirmations; the AI voice approach to be selected after the hosting option and internal Gemini upgrade timeline are assessed.",
  },
  decisions: [
    { item: "AI Scope & Approval Gates", detail: "AI stays assistive and human-controlled for this phase — minister / speaker mappings remain recommendation-only and autonomous save, submit and approve are excluded.", status: "In Progress" },
    { item: "Deployment & Integration Model", detail: "Deployment starts in the development environment (MOCA IT promotes through staging, pre-production and production); MuleSoft hosted on-premises is the Salesforce API gateway.", status: "In Progress" },
    { item: "Registration Simplification", detail: "Non-relevant category fields become optional, days & zones default by category, the photo-upload limit is raised, and email is mandatory in the program portal for Salesforce sync.", status: "In Progress" },
  ],
  risks: [
    { level: "HIGH", risk: "PII & AI Data Residency", mitigation: "Sensitive-data encryption, privileged access and AI-voice hosting / data residency are unconfirmed. Mitigation: TenTwenty to close Salesforce / GCP controls; approve hybrid AI only after hosting and the Gemini timeline are assessed." },
    { level: "MED", risk: "Approval & Checklist Workflows", mitigation: "Program & session approval gates and checklist flows are not yet defined, so checklist functionality is paused. Mitigation: hold the clarification session before development continues." },
    { level: "LOW", risk: "On-Premise Dev Access", mitigation: "Development access to the on-premise AI model via VPN is not yet granted; testing only after local deployment risks slower debugging. Mitigation: WGS / Infrastructure to confirm VPN & dev accounts before deployment." },
  ],
  actions: [
    { action: "Complete and finalise the HLD security review — access tiers, VPN, SSO, PAM / MFA and on-prem MuleSoft documented", owner: "MOCA Security · TenTwenty", target: "22 July", status: "In Progress" },
    { action: "Confirm Salesforce / GCP encryption controls and the internal Gemini upgrade vs hybrid voice-relay timeline", owner: "Josh / TenTwenty · MOCA", target: "TBC", status: "In Progress" },
    { action: "Take registration enhancements to Haider & Salesforce and apply the config changes (fields, defaults, photo limit, seats, email)", owner: "Hind Yaqoob · Salesforce / Haider", target: "TBD", status: "Pending" },
    { action: "Align Evento Salesforce statuses and assess bulk-upload feasibility for manual-data categories", owner: "Evento · Salesforce Team", target: "After SF meeting", status: "Pending" },
    { action: "Share the consolidated AI feature status & demo timing; provide approval gates & checklist workflows and arrange the clarification session", owner: "Josh / TenTwenty · Hind / WGS", target: "23 July", status: "Pending" },
    { action: "Confirm on-premise AI model development access via the existing VPN & dev accounts before deployment", owner: "WGS / Infrastructure", target: "TBC", status: "Pending" },
  ],
};

const P = (name, entity, status, updates, next, goLive, outcome) => ({ name, entity, status, updates, next, goLive, outcome: outcome || "" });

export const demandReport = {
  id: "demand-2026-07-29",
  href: "ministry-project-demand.html",
  pdf: "uploads/project-demand-status-report.pdf",
  title: "Project & Demand Status Report",
  subtitle: "Weekly Update · Wednesday, 29 July 2026",
  org: "Ministry of Cabinet Affairs",
  dept: "Digital Transformation Department · Confidential",
  date: "29 July 2026",
  overallStatus: "In Progress",
  summary: "Portfolio of 84 items — 70 projects & enhancements, 14 demands, 33 live in production — across entities / sectors. Near-term go-lives: UAE GLP Website Revamp, Events Calendar (MOCASmart) and Release 5 (31 July), Organization Structure (3 Aug), Org Structure (31 Aug), Government Missions (1 Sep).",
  stats: [
    { n: "84", label: "Total Projects", sub: "All projects, releases & demands" },
    { n: "70", label: "Projects & enhancements", sub: "Active deliveries & releases" },
    { n: "14", label: "Demands", sub: "Backlog & requests" },
    { n: "33", label: "Live", sub: "Currently in production" },
  ],
  entities: [
    { name: "CSS", n: 48 }, { name: "PMO", n: 11 }, { name: "WGS", n: 7 }, { name: "GSOC", n: 4 },
    { name: "Performance & Govt Excellence", n: 4 }, { name: "Strategy & Innovation", n: 3 },
    { name: "Government Service Sector", n: 2 }, { name: "FCSC", n: 2 }, { name: "GEEO", n: 1 },
    { name: "Office of Secretary-General", n: 1 }, { name: "Govt Leadership & Talent", n: 1 },
  ],
  sections: [
    { id: "projects", num: "01", title: "Projects", groups: [
      { label: "Banan", items: [
        P("APEX – Contract Renewal", "CSS", "Closure",
          ["We received feedback for the email notification content to be updated from Ali", "Content team updated the content based on Ali's feedback"],
          ["Oracle team to reflect the changes on the content of the email", "Ali to review and give the final approval to close the project"], "TBD — pending email content update",
          "Automate the contract renewal process"),
        P("APEX – Outsource Hiring", "CSS", "Initiation",
          ["Revised plan has been shared with the business team"],
          ["Start the project"], "12 Feb 2027"),
        P("FAHR Sick Leave Integration", "CSS", "On Track",
          ["Development in progress", "Received the signed SOW"],
          ["Continue the development"], "23 Nov 2026",
          "To have real-time integration with sick leave with committee approvals"),
        P("GSR Platform Enhancements", "PMO", "On Track",
          ["Meeting with TDRA has been completed and confirmed to UAE Pass as a sole log in mechanism", "Solution has been sent to security check to perform the scan and has passed successfully", "Request has been sent to CAB members to approve the going live"],
          ["Proceed with phase 2 deployment to production"], "30 Sep 2026",
          "Enhancements in the UX and workflow in the GSR system"),
        P("MBRGEA", "Performance & Govt Excellence", "On Track",
          ["The testing is in progress from the business side for the AI summarization tool and AI insight", "New enhancement has been received from the business side and it is under development"],
          ["Complete the ADAA integration enhancement", "Complete the testing and get the UAT document sign off"], "26 Oct 2026",
          "Enhancement of the MBRGEA platform and implementing the AI tool to facilitate the assessor assessment"),
        P("MOCA Ride", "CSS", "Delayed by Business",
          ["The contract signing is still pending"],
          ["Contract to be signed", "Vendor to do changes requested from business"], "TBD — pending signed contract",
          "To have an application dedicated for the ministry to provide ride services for the employees"),
        P("Organization Structure (HR Services)", "CSS", "Closure",
          ["Waiting for HR to confirm that all the changes are reflected and reviewed"],
          ["Close the project"], "3 Aug 2026",
          "Build the Organization Structure in Oracle to reflect the changes without any manual work"),
        P("Talent Management System Design", "CSS", "On Track",
          ["Waiting for Patrick to share the prototype based on the Chief's feedback so that it can be reviewed by her"],
          ["Get the feedback after the demo"], "21 Sep 2026",
          "To create a TMS UI/UX design for the new system with an AI module to facilitate the assessment process"),
      ] },
      { label: "Noura", items: [
        P("AI Chatbot", "CSS", "On Track",
          ["We went through the plan and the solution demo with the business team", "The previous issue has been fixed"],
          ["The password reset process will use a redirect link; the required steps and user guidance should be added", "The formatting — text alignment, spacing and layout — should be reviewed and standardized in both the Arabic and English versions"], "7 Sep 2026",
          "Employees get a secure, embedded AI assistant that can accurately answer HR policy questions and directly handle requests"),
        P("Automating the Group Email Creation Process – MOCA Smart App", "CSS", "Initiation",
          ["We have received the final proposal from the Kalvad team"],
          ["We are currently finalizing the SP plan and will share the complete project plan with the business team once it is finalized"], "TBD — Currently finalizing the SP plan",
          "Faster, standardized, and trackable group email requests with less manual work for IT teams"),
        P("Automating the Group Email Creation Process – Oracle", "CSS", "On Track",
          ["The Oracle plan has been shared with the business team", "We have received the final proposal from the Kalvad team", "We are currently finalizing the SP plan and will share the complete project plan with the business team once it is finalized"],
          [], "19 Oct 2026",
          "Faster, standardized, and trackable group email requests with less manual work for IT teams"),
        P("Government Missions", "Strategy & Innovation", "On Track",
          ["Reviewed the updated project timeline. The official launch remains 1 September, with some milestone dates adjusted", "Presented the high-level implementation plan covering the four project phases", "Agreed to complete the production go-live before the official launch to allow for testing and final validation"],
          ["Amna to share the open files for the initiative logo and MBRCGI logo", "Update the platform header to include the initiative logo and government emblem / MBRCGI branding", "Provide additional graphic options for the landing page and challenge tracks"], "1 Sep 2026",
          "Accelerate government innovation and execution by turning priority challenges into impactful solutions"),
        P("National Statistical Data Platform", "FCSC", "In Progress",
          ["The project kicked off on 27/1/2026", "It is currently in the discovery phase", "There are two discovery phases: a technology discovery phase focused on implementation and the tools to be used, and a business discovery phase"],
          ["Schedule a meeting with Presight to present the solution, scope and the roadmap (Sasi)", "Review the RACI matrix and share the feedback (Shamma)"], "TBD — not yet baselined"),
        P("Stemexe", "FCSC", "In Progress",
          ["Stemex is a system used to manage projects", "The project started two months ago", "The workflow has been deployed on FedNet"],
          ["Confirm next step with the project owner"], "TBD — not yet baselined"),
        P("Superset", "PMO", "In Progress",
          ["Superset is part of the PMS (Raqmn) platform and serves as a subsite used for reporting and dashboard visualization", "Raqmn is live now, after security scan and everything, it was published as pms.egsep.ae, then project published with new url raqmn.egsep.gae"],
          ["Confirm next step with the project owner"], "TBD — not yet baselined"),
        P("We the UAE", "PMO", "Delayed by Business",
          ["We had a meeting last week with the business and vendor teams", "The business team requested changes to both the existing design and the new design", "The expected go-live is in August or September", "Santosh confirmed that once the Arabic content is finalized the system can go live; the English content can be added afterward"],
          ["Add an additional button on the Strategic page, under the Scan QR Code section, that allows users to contact the Director of Strategy", "Once the content upload is completed, proceed with integration, testing and staging (approximately two weeks)"], "TBD — awaiting business direction (target Aug/Sep)"),
      ] },
      { label: "Shamma", items: [
        P("WGS API Development 2027", "WGS", "Initiation",
          ["We are exploring shifting from eclrex to salesforce", "Meetings with Salesforce completed to explain requirements"],
          ["To finalize commercial engagement with Salesforce and kick-off with them"], "31 Dec 2026",
          "API Gateway for all WGS platform integration"),
        P("WGS Community Portal 2027", "WGS", "Initiation", ["Not yet started"], ["Continue on finalizing requirements"], "31 Dec 2026",
          "Uplifting Community Portal for WGS 2027"),
        P("WGS Mobile App 2027", "WGS", "Initiation", ["Not yet started"], ["Confirm next step with the project owner"], "31 Dec 2026",
          "Uplifting mobile app for WGS 2027"),
        P("WGS Program Portal 2027", "WGS", "Initiation",
          ["All requirements and session completed between business and vendor"],
          ["To plan for a demo session to present to business progress on the development part"], "31 Dec 2026",
          "Uplifting Program Portal for WGS 2027"),
        P("WGS Salesforce Enhancements 2027", "WGS", "Initiation",
          ["We are exploring shifting from eclrex to salesforce", "Meetings with Salesforce completed to explain requirements"],
          ["To finalize commercial engagement with Salesforce and kick-off with them"], "13 Jan 2027",
          "Enhancing Salesforce features for operations in different streams"),
        P("WGS Website 2027", "WGS", "Initiation", ["Not yet started"], ["Confirm next step with the project owner"], "31 Dec 2026",
          "Uplifting Website for WGS 2027"),
      ] },
      { label: "Zeyad", items: [
        P("AI Board Observer – Cabinet", "GSOC", "On Track",
          ["Data migration has been accomplished on staging (100 subjects) to verify the behavior of AI and to confirm it with business users before start on production"],
          ["Fine tuning the data migration in staging along with all vendors to start the UAT with business users, before moving to production"], "31 Jan 2026 — pending top management decision",
          "Supporting the cabinet and ministerial council members by providing insights on the meeting topics and best practices"),
        P("AI Solution for KPI Insights (ADAA)", "Performance & Govt Excellence", "On Track",
          ["BRD has been approved by business users", "Development phase started", "Following up with IT team to finish the setup of staging environment"],
          ["Finalizing the staging and production environment; technical meeting will take place with the application and system team by 03 Aug"], "30 Oct 2026",
          "Analyzing existing data to summarize performance on the ADAA system, provide actionable insights, and forecast outcomes"),
        P("Candidate Recruitment Committee Website", "GSOC", "In Progress",
          ["Providing access to Omar Altoukhy to TFS so that he can push the code to staging; fixing the permission issue with Omar"],
          ["Setting up the staging environment and pushing the source code", "Send it to security scan"], "30 Sep 2026",
          "Provide a single source of truth for candidate profiles and their appointment status, and streamline the pipeline"),
        P("Digital Experience of the Code", "Government Service Sector", "In Progress",
          ["Had a status meeting with business this week", "Agreed to host the solution on cloud for this project phase"],
          ["Plan a weekly status meeting with vendor and business; verify the AI LLM option with business"], "TBD — plan not yet submitted by the vendor",
          "Enables users to easily navigate, understand and engage with the Code through advanced search and structured content"),
        P("E-Cabinet System 2.0", "GSOC", "On Track",
          ["Working on data migration for current ecabinet activity with both vendors and prepare the infrastructure for documents migration", "BRD are approved from business", "Development is going on as the initial plan"],
          ["Finalizing the documents in follow up system and moving it to pre-production environment"], "31 Oct 2026",
          "Automating all GSOC processes related to cabinet meetings: meetings, subjects, decisions and correspondences"),
        P("GovTech Radar", "Government Service Sector", "In Progress",
          ["Raising a technical challenge to establish the integration channel between the platform (on the vendor tenant) and FedNet; weekly status meeting held"],
          ["Contact Kalvad to set up the channel from the virtual data center they manage to whitelist the vendor IPs"], "31 Oct 2026"),
        P("MBRGS Application", "PMO", "In Progress",
          ["Design has been sent to business", "Weekly meeting and report sent to business", "Feedback from business users collected on the design"],
          ["Rectify and update the design accordingly", "Technical meeting with TDRA for UAE Pass integration"], "31 Dec 2026",
          "Automating the full lifecycle of the Mohammed Bin Rashid Government Scholarships Program"),
        P("MBRGS Call Center", "PMO", "In Progress",
          ["Toll number 800 has been requested and sent to Etisalat", "Two resources under review by TEO"],
          ["Waiting IT team to upload the request in Etisalat B2B portal for number reservation to start the configuration and align the business users"], "27 Nov 2026",
          "Call center to answer all calls of the Mohammed Bin Rashid Government Scholarships Program"),
        P("Media Monitoring & Public Feedback Intelligence Platform", "PMO", "Initiation",
          ["Vendor evaluation is under process by business users and procurement; reminder sent to business; there is some issue in the budgeting"],
          ["Finalize the vendor evaluation process with business users", "If there is no update from budgeting, this project will move to on-hold"], "TBD — under technical evaluation; plan not provided",
          "Enhance the quality, responsiveness and customer-centricity of government services across the UAE"),
        P("Org Structure", "PMO", "On Track",
          ["UAT sessions continued this week where we collect the feedback and notes from business", "First release of the staging after UAT has been deployed on Monday 27/07"],
          ["Continue UAT session with business user", "Finalize the delivery date from the tracking sheet with business", "New project plan to be prepared and sent to business"], "31 Aug 2026",
          "Automate the process of approving the Org Structure for the federal entities and empower the users with the information"),
        P("UAE GLP Website Revamp", "Govt Leadership & Talent", "On Track",
          ["Website development is complete and an interactive version is available, under review by business", "We'll run one final feedback round, then move into deployment preparation"],
          ["Sending the site for security scan"], "31 Jul 2026",
          "Redesign of the UAE government leaders programs by adding a new renovated website replacing the current one"),
        P("UAE Regulatory Intelligence – Technical & Hosting", "Office of Secretary-General", "On Track",
          ["Preparing for the phase 2 with vendor as the GPU hardware will be received by September", "Had technical meeting with our system team and vendor to finalize the approach of phase 2"],
          ["Test and QA for the platform", "Close the security reported item from Cybersecurity team"], "TBD — timeline unapproved; Phase 2 scope open",
          "Enabled AI-powered legislative drafting, reducing effort while identifying legal gaps and conflicts"),
      ] },
    ] },
    { id: "mocasmart", num: "02", title: "MOCASmart", groups: [
      { label: "Active releases", items: [
        P("Events Calendar (MOCASmart)", "CSS", "On Track",
          ["Business tested the changes and shared additional feedback to Kalvad"],
          ["Kalvad is working on the changes"], "31 Jul 2026",
          "Integrate the event calendar in MOCAVerse to have it in MOCA Smart"),
        P("Release 5 – Business Mission", "CSS", "On Track",
          ["Internal testing is planned for today 29/7", "Internal testing will include feedback from the first session and the approval"],
          ["Schedule the physical business testing next week"], "31 Jul 2026",
          "Apply to a business mission through MOCA App"),
        P("Release 4.6 – Managerial & Executive Level View", "CSS", "On Track",
          ["Development in progress"], ["Track development progress"], "18 Sep 2026",
          "Facilitate tracking the employee attendance and leaves for the Executive manager"),
      ] },
      { label: "Future releases", items: [
        P("MOCASmart Procurement Module", "CSS", "Not active",
          ["Received the proposal document from the vendor", "Shared the proposal with the business team to obtain approval"],
          ["Initiate the project"], "TBD — not active; pending AI decision",
          "Not active as we need to know if we will do it through AI"),
        P("Peer Assignment System", "CSS", "Not active",
          ["Awaiting internal confirmation"], ["Await HR confirmation"], "TBD — not active; pending HR confirmation",
          "Not active as we are waiting for HR confirmation"),
        P("HR Requests (Job Description Icon & Oracle Integration, Employee Benefits, Contracts, Acknowledgment Page)", "CSS", "Under Scope Analysis",
          ["Draft SOW shared with the business; Job Description will be a separate scope"],
          ["Await confirmation from the business"], "TBD — draft SOW awaiting confirmation",
          "To add employees benefits and other HR enhancements"),
        P("Working Remotely Enhancement", "CSS", "Not active",
          ["Meeting with the HR team scheduled for a brainstorming session"],
          ["Hold the brainstorming session with the HR team"], "TBD — to be reactivated with HR",
          "Project team need to reactivate this request with HR"),
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
      { label: "Banan", items: [
        P("Decrees (HR Services)", "CSS", "With Business",
          ["New demo conducted for the template feature on GovSign", "HR liked this feature and would like to proceed"],
          ["Await chief approval"], "—"),
        P("Gov Survey Upgrade", "CSS", "Under Scope Analysis",
          ["Apply for a security clearance for the resource and waiting for the approval"],
          ["To start the project"], "—"),
        P("HR Requests (Job Description Icon & Oracle Integration, Employee Benefits, Contracts and Acknowledgment Page)", "CSS", "Under Scope Analysis",
          ["We need to confirm the final Business Requirements and validate the full process flow"],
          ["Meeting to be scheduled with HR to validate"], "—"),
      ] },
      { label: "Noura", items: [
        P("Application Development for Government Relations & Protocol Dept.", "CSS", "Under Scope Analysis",
          ["The SOW has been approved by the business team", "We have invited the vendors to submit their proposals for the Government Relations & Protocol System – Mobile Application project", "The proposal submission deadline is 28 July"],
          [], "—"),
        P("Assets Request", "CSS", "Under Scope Analysis",
          ["We had a meeting with Motion Pexels and the business team to review the solution and gather their feedback", "Motion Pexels team will share the technical proposal, initial plan and cost that includes AI recommendations", "Saif and Shaikha will provide details of existing systems and API access information for Span, and other data sources to enable integrations"],
          ["Saif & Shaikha will send a sample of the client's data"], "—"),
        P("Automating the Department Achievements Report (INJAZ)", "CSS", "Proposal Review",
          ["We received the proposal from the Kalvad team", "We have shared the proposal with business", "Multiple meetings were held with the business team and design team to discuss the Scope of Work; additional changes have been requested"],
          [], "—"),
        P("Avatar AI Phase 2", "PMO", "Under Scope Analysis",
          ["Explored the possibility of replicating the current avatar (same look and feel) to enable simultaneous deployment across multiple government entities", "The objective is to evolve the avatar from a single “minister” persona into an advisor supporting multiple ministers or government leadership teams", "Replicating the solution as a UAE national persona by adapting the avatar’s appearance and accent, while maintaining the same advisory function"],
          ["Business team is awaiting vendor feedback on the previously shared questions regarding the proposed change of persona from “Minister” to “Advisor”"], "—"),
        P("Breathable Infrastructure Competition Website", "PMO", "Under Scope Analysis",
          ["The business has approved proceeding with awarding Planet Green as the vendor"],
          ["We will schedule a kickoff meeting with the business and the vendor to initiate the project"], "—"),
        P("Demand & Digital Transformation Services in MOCA App", "CSS", "Under Scope Analysis",
          ["The Scope of Work has been updated and approved", "We had a meeting with the design team to discuss the changes, and we shared with them the feedback"],
          ["We are waiting for the design team to share the updated design"], "—"),
        P("EMS Phase 2", "CSS", "Under Scope Analysis",
          ["We had a meeting with the Design Team and the Business Team", "The proposed design was approved", "It was agreed that the work will be divided into three separate scopes: system redesign & admin page (no additional cost) and redesign of the existing system"],
          [], "—"),
        P("Photographer & Videographer Requests (EMS and MOCA App)", "CSS", "Under Scope Analysis",
          ["MOCA Smart will be used by employees to submit requests for photographers and videographers", "Admin users in EMS will be able to add/edit photographer and videographer schedules and show their leaves from Oracle", "In EMS, photographers will have the option to click “Start Job” when they begin and “End Job” upon completion"],
          ["The business team has decided to include Agentic AI in the project scope; we are currently updating the Scope of Work (SOW) and will share the revised version"], "—"),
        P("Store Management System", "CSS", "RFI",
          ["Business team will not proceed with in-house development; we have shared the SOW with several vendors and expect to receive their proposals soon"],
          ["Once we receive the proposals, we will schedule a meeting with the business team to review and evaluate"], "—"),
      ] },
      { label: "Shamma", items: [
        P("UGAM Agentic AI Platform", "CSS", "Under Scope Analysis",
          ["Review the scope from project, IT & Security aspects"],
          ["Share the updated scope with business"], "—"),
      ] },
      { label: "Zeyad", items: [
        P("Automating the Cabinet Health-Check Process", "CSS", "Under Scope Analysis",
          ["Scope and design has been highlighted to the vendor, and we expect the first release to be in July 2026"],
          ["Having a live demo with business once the release is deployed"], "—"),
      ] },
    ] },
    { id: "live", num: "04", title: "Live Projects", groups: [
      { label: "Banan", items: [
        P("APEX – Off-Boarding", "CSS", "Live", [], [], "8 May 2026"),
        P("APEX – Probation Extension", "CSS", "Live", [], [], "20 Mar 2026"),
        P("APEX – Relative Declaration", "CSS", "Live", [], [], "9 Mar 2026"),
        P("API Migration to OIC (FORAS)", "CSS", "Live", [], [], "4 Dec 2025"),
        P("API Migration to OIC (MOCAVerse)", "CSS", "Live", [], [], "31 Dec 2025"),
        P("DOR", "CSS", "Live", [], [], "18 Mar 2026"),
        P("Enhancing MOCA Letters", "CSS", "Live", [], [], "1 Apr 2026"),
        P("Events Calendar (MOCAverse)", "CSS", "Live", [], [], "28 Apr 2026"),
        P("Executive Dashboard Release 2 – Enhancement", "CSS", "Live", [], [], "13 May 2026"),
        P("Government Accelerator Website", "PMO", "Live", [], [], "30 Apr 2026"),
        P("MOCA SSA", "CSS", "Live", [], [], "11 May 2026"),
        P("MOHAP Sick Leave Integration", "CSS", "Live", [], [], "24 Jul 2026"),
        P("NER", "CSS", "Live", [], [], "Live"),
        P("Talent Hub", "Strategy & Innovation", "Live", [], [], "Live"),
        P("Vendor Dashboard", "CSS", "Live", [], [], "15 May 2026"),
        P("Vendor Management – NER Enhancement", "CSS", "Live", [], [], "29 Jul 2026"),
        P("WGS Website", "WGS", "Live", [], [], "19 Jan 2026"),
      ] },
      { label: "Ghaya", items: [
        P("Gift Disclosure Enhancement", "CSS", "Live", [], [], "12 May 2026"),
      ] },
      { label: "Noura", items: [
        P("Avatar AI", "PMO", "Live", [], [], "31 Mar 2026"),
        P("Event Management System", "CSS", "Live", [], [], "9 Apr 2025"),
      ] },
      { label: "Shamma", items: [
        P("Customer Pulse", "Performance & Govt Excellence", "Live", [], [], "31 Dec 2025"),
      ] },
      { label: "Zeyad", items: [
        P("AGEA System", "Performance & Govt Excellence", "Live", [], [], "12 Dec 2025"),
        P("GEEP", "GEEO", "Live", [], [], "15 May 2026"),
        P("GSOC Employee Worksheet", "GSOC", "Live", [], [], "15 May 2026"),
        P("Innovation Ecosystem", "Strategy & Innovation", "Live", [], [], "24 Nov 2025"),
      ] },
    ] },
    { id: "onhold", num: "05", title: "On Hold / Not Active", groups: [
      { label: "Noura", items: [
        P("Digital Library", "CSS", "On Hold",
          ["We had a meeting with the AI Office and the vendor to review the proposed solution", "During the discussion, Saqr suggested adding an MCP layer on top of the solution; this would simplify future integrations and enhance the scalability", "The Media Info team will confirm if adding the MCP layer is feasible"],
          ["Khawla will start filtering the content", "Kickoff meeting"], "TBD — not yet baselined"),
      ] },
      { label: "Shamma", items: [
        P("Project Dashboard in Executive Dashboard", "CSS", "On Hold",
          ["Waiting for the developer budget to be approved to onboard the developer"],
          ["Once budget approved, onboard the developer to kick off the project"], "TBD — not yet baselined"),
      ] },
    ] },
    { id: "closed-demands", num: "06", title: "Not Active / Closed Demands", groups: [
      { label: "Banan", items: [
        P("Working Remotely Enhancement", "CSS", "Not active",
          [], ["Confirm next step with the demand owner"], "—"),
        P("Onboarding (HR Services)", "CSS", "Not active",
          ["Met with Ali to discuss next steps", "We will await confirmation on whether this service will fall within the scope of the Agentic AI project", "Once a direction is provided, we will determine how to proceed accordingly"],
          [], "—"),
        P("Security Form (Data Classification)", "CSS", "Not active",
          ["Received the initial design from the UX team", "Send the presentation to Moza to schedule a meeting with Fouzia", "Project team will draft the initial SOW after Fouzia’s approval on the design", "The implementation of the form will be based on the old criteria until the new policy is approved"],
          [], "—"),
        P("Executive Dashboard Sprint 3", "CSS", "Not active",
          ["Fouzia approved to do development once a new developer is onboarded"],
          ["Once a developer joined, a plan will be created for development"], "—"),
        P("Remote Work Balance – GMO", "GMO", "Not active",
          ["GMO study completed; shared with Ali"], ["Await direction"], "—"),
        P("Payroll Bot Implementation", "CSS", "Not active",
          ["On hold"], ["To select vendor"], "—"),
        P("Peer Assignment System", "CSS", "Not active",
          ["Awaiting internal confirmation"], [], "—"),
      ] },
      { label: "Noura", items: [
        P("Synthetic Memories UAE", "PMO", "Not active",
          ["The vendor is still finalizing the proposal"], ["We are waiting for an update from the business"], "—"),
        P("Audio Translator in Teams", "CSS", "Not active",
          ["The proposals were received and shared with the business for feedback"], ["Confirm next step with the demand owner"], "—"),
        P("Tech Trial AWS", "PMO", "Not active",
          ["The project is currently with IBM and in the design presentation phase for leadership", "We recommended the business to go through the proposal with the IT and cybersecurity teams before presenting"],
          ["Arrange two separate meetings with the IT and Cybersecurity teams to review the requirements"], "—"),
      ] },
      { label: "Shamma", items: [
        P("Customer Pulse Integration with Jira", "CSS", "Not active",
          [], ["Confirm next step with the demand owner"], "—"),
      ] },
    ] },
  ],
};

// ---- Historical snapshot: previous week's Project & Demand report ----
// Kept so archived weeks remain viewable after the live report is updated.
// Newer weeks are appended to `demandHistory`; the live report stays in
// `demandReport` above.
export const demandReportPrev = {
  id: "demand-2026-07-17",
  href: "ministry-project-demand.html",
  // No original PDF was archived for this week; the download action is hidden.
  pdf: "",
  title: "Project & Demand Status Report",
  subtitle: "Weekly Update · Friday, 17 July 2026",
  org: "Ministry of Cabinet Affairs",
  dept: "Digital Transformation Department · Confidential",
  date: "17 July 2026",
  overallStatus: "In Progress",
  summary: "Portfolio of 113 items — 79 projects & enhancements, 34 demands, 44 live in production — across 13 entities / sectors. Near-term go-lives: MOHAP Sick Leave Integration (22 July), Vendor Management – NER Enhancement (23 July), E-Cabinet System 2.0, MOCASmart Release 5 and Events Calendar (31 July).",
  stats: [
    { n: "113", label: "Total Projects", sub: "All projects, releases & demands" },
    { n: "79", label: "Projects & enhancements", sub: "Active deliveries & releases" },
    { n: "34", label: "Demands", sub: "Backlog & requests" },
    { n: "44", label: "Live", sub: "Currently in production" },
  ],
  entities: [
    { name: "CSS", n: 68 }, { name: "PMO", n: 13 }, { name: "MOCA", n: 9 }, { name: "WGS", n: 6 },
    { name: "GSOC", n: 4 }, { name: "FCSC", n: 3 }, { name: "Performance & Govt Excellence", n: 2 },
    { name: "Strategy & Innovation", n: 2 }, { name: "Govt Service Sector", n: 2 },
    { name: "MBRCGI / Strategy & Innovation", n: 1 }, { name: "Govt Development & Future Office", n: 1 },
    { name: "GEEO", n: 1 }, { name: "Office of Secretary-General", n: 1 },
  ],
  sections: [
    { id: "projects", num: "01", title: "Projects", groups: [
      { label: "Banan Taleb", items: [
        P("DOR", "CSS", "Live", [], [], "Live"),
        P("APEX – Relative Declaration", "CSS", "Live", [], [], "Live"),
        P("API Migration to OIC (MOCAVerse)", "CSS", "Live", [], [], "Live"),
        P("APEX – Probation Extension", "CSS", "Live", [], [], "Live"),
        P("NER", "CSS", "Live", [], [], "Live"),
        P("Talent Hub", "MBRCGI / Strategy & Innovation", "Live", [], [], "Live"),
        P("APEX – Offboarding", "CSS", "Live", [], [], "Live"),
        P("Executive Dashboard Release 2 – Enhancement", "CSS", "Live", [], [], "Live"),
        P("Vendor Management Dashboard", "CSS", "Live", [], [], "Live"),
        P("Update Goals File – TMS", "CSS", "Live", [], [], "Live"),
        P("Government Accelerator Website", "PMO", "Live", [], [], "Live"),
        P("MOCA SSA App", "CSS", "Live", [], [], "Live"),
        P("APEX – Outsource Hiring", "CSS", "In Progress", ["Revised plan shared with the business team"], ["Start the project"], "—"),
        P("MBRGEA", "Performance & Govt Excellence", "In Progress",
          ["The testing is in progress from the business side for the AI summarization tool and AI insight", "New enhancement has been receive from the business side and its under developmentt"],
          ["Complete the ADAA integration enhancement", "Complete the testing and get the UAT document sign off"], "Oct 2026"),
        P("MOHAP Sick Leave Integration", "CSS", "In Progress",
          ["The deployment process in progress from the GSB side, and waiting to share the production key", "Meeting with MOHAP team has been scheduled 15/7", "MOHAP team confirmed the deployment will be completed by Friday 17/7 and the testing will be conduct in production instant"],
          ["Go Live 22 July"], "22 July"),
        P("APEX – Contract Renewal", "CSS", "In Progress",
          ["The updated UI has been shared with the oracle team based on the TX team feedback", "Oracle team working on a notification email demo"],
          ["Share the demo with the TX team and get the feedback"], "TBD"),
        P("MOCA Ride", "CSS", "In Progress",
          ["The committee has been completed and present this project", "The disision has been to continue with RSL for Dubai and AD and keep the MOCA cars for others Emirates"],
          ["Receive the confirmation email from the business team to know the next step and the final direction"], "TBD"),
        P("Talent Management System Design", "CSS", "In Progress",
          ["The Updated wireframe has been received from Tentwenty including all the cases", "The wireframe under the business review"],
          ["Share the business feedback with the vendor"], "TBD"),
        P("Vendor Management – NER Enhancement", "CSS", "In Progress",
          ["The development completed and waiting for the business confirmation"],
          ["Share closure document and close the project"], "23 July"),
        P("GSR Platform Enhancements", "PMO", "In Progress",
          ["Phase 2 development completed and its under business testing", "Meeting with TDRA scheduled on Monday 22/7 to get clarification regarding the log in mechanism"],
          ["Proceed with phase 2 deployment to production"], "30 Sep"),
        P("FAHR Sick Leave Integration", "CSS", "In Progress",
          ["Following up with the business team to get the signed SOW", "Under development"],
          ["Received the signed SOW", "Continue the development"], "23 Nov"),
        P("Vendor Registration Forms, Transition to Oracle from Jira & Customer Pulse", "CSS", "Planned", [], ["Start the development"], "23 Nov"),
        P("Organization Structure (HR Services)", "CSS", "In Progress",
          ["The development has been completed for the business feedback that we received", "Following up with the business to get the final confirmation"],
          ["Close the project"], "3 August"),
      ] },
      { label: "Ghaya Alhemeiri", items: [
        P("Enhancing MOCA Letters", "CSS", "Live", [], [], "Live"),
        P("Gift Disclosure Enhancement", "CSS", "Live", [], [], "Live"),
        P("MOCASmart Payslip", "CSS", "Live", [], [], "Live"),
        P("Events Calendar (MOCAVerse)", "CSS", "Live", [], [], "Live"),
      ] },
      { label: "Noura Almansoori", items: [
        P("Avatar AI", "Govt Development & Future Office", "Live", [], [], "Live"),
        P("PMS Services 2.0 Dashboard", "PMO", "Live", [], [], "Live"),
        P("AI Chatbot", "CSS", "In Progress",
          ["MCP Implementation is done.", "We went through the solution demo."],
          ["Mouhand will investigate why the following requests are not working: “Apply for leave” · “Who is my line manager?”", "Add add for the following information: Performance details · MOCA experience · Personal information · Family details"], "7 Sept"),
        P("We the UAE", "PMO", "In Progress",
          ["We had a meeting last week with the business and vendor teams.", "The business team requested changes to both the existing design and the new design."],
          ["Santhosh implementing all design changes and feedback so the demo aligns with the upcoming leadership presentation"], "TBD"),
        P("Superset", "PMO", "In Progress",
          ["Sperset is part of the PMS (Raqmn) platform and serves as a subsite used for reporting and dashboard visualization.", "Raqmn is live now, after security scan and everything, it was published as pms.egsep.ae, then project published with new url raqmn.egsep.gae"],
          [], "TBD"),
        P("National Statistical Data Platform", "FCSC", "In Progress",
          ["The project kicked off on 27/1/2026", "It’s currently in the discovery phase.", "There are two discovery phases: a technology discovery phase focused on implementation and the tools to be used, and a business discovery phase focused on federal and internal entities."],
          ["Schedule a meeting with Presight to present the solution, scope and roadmap (Sasi)", "Review the RACI matrix and share feedback (Shamma)"], "TBD"),
        P("Stemexe", "FCSC", "In Progress",
          ["Project management system; started two months ago", "Workflow deployed on FedNet; system currently in staging", "First cybersecurity assessment completed and shared with Exceed to close the findings", "There are no IT requirements from our side at this stage."],
          [], "TBD"),
        P("Digital Library", "MOCA", "On Hold", ["On Hold"], [], "TBD"),
        P("Ripplez", "FCSC", "In Progress",
          ["Ripplez is part of the Raqmn project and serves as its low-code/no-code platform.", "In process of performing the Vulnerability Assessments. However, Cybersecurity team is still having some difficulties in terms of Application flow"],
          [], "TBD"),
      ] },
      { label: "Zeyad Dallah", items: [
        P("Regulatory Intelligence Website", "GSOC", "Closed", ["Closed"], [], "Live"),
        P("FCSC Website Revamp", "FCSC", "Closed", ["Closed"], [], "Live"),
        P("EGSEP Website", "Govt Service Sector", "Closed", ["Closed"], [], "Live"),
        P("Zero Bureaucracy Website", "PMO", "Closed", ["Closed"], [], "Live"),
        P("AGEA System", "Performance & Govt Excellence", "Closed", ["Closed"], [], "Live"),
        P("GX.ae Platform Enhancements", "Govt Service Sector", "Live", [], [], "Live"),
        P("GEEP", "GEEO", "Closed", ["Closed"], [], "Live"),
        P("GSOC Employee Worksheet", "GSOC", "Live", [], [], "Live"),
        P("AI Board Observer – Cabinet", "GSOC", "In Progress",
          ["Data migration has been accomplished on staging (100 subjects) to verify the behavior of AI and to confirm it with business users before start on production."],
          ["Fine tuning the data migration in staging along with all vendors to start the UAT with business users, before moving to production, as we are targeting 10 years to be done on 30-July."], "TBD"),
        P("Org Structure", "CSS", "In Progress",
          ["Development is completed and final corrections is under preparation.", "UAT sessions started this week where we collect the first feedback from business."],
          ["Deploy the notes collected from UAT into the staging and starting the UAT sessions next week."], "30 June"),
        P("E-Cabinet System 2.0", "GSOC", "In Progress",
          ["Working on data migration for current ecabinet activity with both vendors and prepare the infrastructure for documents migration.", "Working to approve the BRD with business as ran several meeting with them.", "Development is going on as the initial plan."],
          ["Arranging the data migration sessions with follow up vendor to start the analysis phase."], "31 July"),
        P("UAE Regulatory Intelligence – Technical & Hosting", "Office of Secretary-General", "In Progress",
          ["Preparing for the phase 2 with vendor as the GPU hardware will be received by September.", "Had technical meeting with our system team and vendor to finalize the approach of phase 2."],
          ["Test and QA for the platform.", "Close the security reported item from Cybersecurity team."], "TBD"),
        P("Automating the Cabinet Health-Check Process", "MOCA", "In Progress",
          ["Scope and design shared with the vendor; first release expected July 2026"],
          ["Hold a live demo with the business once the release is deployed"], "TBD"),
        P("AI Solution for KPI Insights (ADAA)", "PMO", "In Progress",
          ["BRD has been approved by business users.", "Development phase started.", "Following up with IT team to finish the setup of staging enviroment."],
          ["Finalizing the staging and production enviroment."], "30 Oct"),
        P("MBRGS Application", "MOCA", "In Progress",
          ["Requirements gathering session has been accomplished.", "New design branding is pending by business to finalize the BRD.", "Initiate the UAE Pass integration process with TDRA."],
          ["Getting the design branding document from business.", "Prepare Provide the BRD to business for approval."], "31 Dec"),
        P("MBRGS Call Center", "MOCA", "In Progress",
          ["Toll number 800 has been requested and sent to Etisalat.", "Two resources under review by TEO."],
          ["Waiting IT team to upload the request in Etisalat B2B portal for number reservation to start the configuration."], "27 Nov"),
        P("UAE GLP Website Revamp", "PMO", "In Progress",
          ["Design approved by Business users.", "Application is under development."],
          ["Prepare for the UAT sessions and deployment."], "30 Jun"),
        P("Media Monitoring & Public Feedback Intelligence Platform", "PMO", "In Progress",
          ["Vendor evaluation in under process by business users and procurement."], [], "TBD"),
      ] },
      { label: "Shamma Almarri", items: [
        P("WGS Salesforce Enhancements 2027", "WGS", "In Progress",
          ["We are exploring shifting from eclrex to salesforce", "Meetings with Salesforce completed to explain requirements"],
          ["To finalize commercial engagement with Salesforce and kick-off with them"], "31 Jan 2027"),
        P("WGS API Development 2027", "WGS", "In Progress",
          ["We are exploring shifting from eclrex to salesforce", "Meetings with Salesforce completed to explain requirements"],
          ["To finalize commercial engagement with Salesforce and kick-off with them"], "TBD"),
        P("WGS Program Portal 2027", "WGS", "In Progress",
          ["All requirements and session completed between business and vendor"],
          ["To plan for a demo session to present to business progress on the development part"], "31 Dec"),
        P("WGS Community Portal 2027", "WGS", "In Progress",
          ["Gather the requirement"], ["Continue on finalizing requirements"], "1 Dec"),
        P("WGS Mobile App 2027", "WGS", "Not Started", ["Not yet started"], [], "31 Dec"),
        P("WGS Website 2027", "WGS", "Not Started", ["Not yet started"], [], "31 Dec"),
      ] },
    ] },
    { id: "mocasmart", num: "02", title: "MOCASmart releases", groups: [
      { label: "Release 4", items: [
        P("Pop-up for Pending Justification", "CSS", "Live", [], [], "Live"),
        P("Change Password Feature", "CSS", "Live", [], [], "Live"),
        P("Policies Section", "CSS", "Live", [], [], "Live"),
        P("Duaa Icon & Push Notification", "CSS", "Live", [], [], "Live"),
        P("Relative Declaration Card", "CSS", "Live", [], [], "Live"),
      ] },
      { label: "Release 4.1", items: [
        P("Duaa Popup Feature", "CSS", "Live", [], [], "Live"),
        P("TMS Guide on MOCASmart", "CSS", "Live", [], [], "Live"),
        P("Gift Disclosure Integration with Oracle", "CSS", "Live", [], [], "Live"),
      ] },
      { label: "Release 4.2", items: [
        P("News & Announcements", "CSS", "Live", [], [], "Live"),
        P("Absence Statistics (Check-In & Check-Out Time)", "CSS", "Live", [], [], "Live"),
        P("WFH Check-In / Check-Out", "CSS", "Live", [], [], "Live"),
      ] },
      { label: "Release 4.3", items: [
        P("Vendor Catalog & Tiers Enhancement", "CSS", "Live", [], [], "Live"),
        P("Reject Requests (Petty Cash, Reimbursement, Credit Card)", "CSS", "Live", [], [], "Live"),
        P("Employee Address Update", "CSS", "Live", [], [], "Live"),
        P("Enhancing the Submission for Compassionate Leave", "CSS", "Live", [], [], "Live"),
        P("Survey Push Notification", "CSS", "Live", [], [], "Live"),
      ] },
      { label: "Release 4.4", items: [
        P("Gift Disclosure Enhancement", "CSS", "Live", [], [], "Live"),
        P("Payslip Design Enhancement – MOCASmart", "CSS", "Live", [], [], "Live"),
        P("Hajj Leave Enhancement", "CSS", "Live", [], [], "Live"),
        P("Personalized Eid Al Adha Greeting Link", "CSS", "Live", [], [], "Live"),
        P("Survey Push Notification", "CSS", "Live", [], [], "Live"),
      ] },
      { label: "Release 4.5", items: [
        P("Leave Visibility (FYI) · Leave History & Attendance Report Enhancement", "CSS", "Live", [], [], "Live"),
      ] },
      { label: "Release 4.6", items: [
        P("Managerial & Executive Level View", "CSS", "In Progress",
          ["Updated scope and plan shared with the business; sign-off received"], ["Start the project"], "20 Aug"),
      ] },
      { label: "Future releases", items: [
        P("MOCASmart Procurement Module", "CSS", "Planned", [], ["Initiate the project"], "TBD"),
        P("Peer Assignment System", "CSS", "Pending", ["Awaiting internal confirmation"], [], "TBD"),
        P("HR Requests (Job Description Icon & Oracle Integration, Employee Benefits, Contracts, Acknowledgment Page)", "CSS", "Pending",
          ["Draft SOW shared with the business; Job Description will be a separate scope"], ["Await confirmation from the business"], "TBD"),
        P("Working Remotely Enhancement", "CSS", "Planned", ["Meeting with the HR team scheduled for a brainstorming session"], [], "TBD"),
      ] },
      { label: "Upcoming releases", items: [
        P("MOCASmart Release 5 – Business Mission", "CSS", "In Progress",
          ["Received the oracle flow for the bulk approval for the SH", "Business testing session has been completed and shared the feedback with the vendor", "Initiate the survey process from the customer pulse"],
          ["Receive the figma design for approval process scenarios", "Complete the development", "Update the SOW and get the business sign off"], "31 July"),
        P("Events Calendar (MOCASmart)", "CSS", "In Progress",
          ["Start the development from Kalvad side", "The development has been completed", "Shared the test version with the buisness to do the testing"],
          ["Start the deployment process", "Go live"], "31 July"),
      ] },
    ] },
    { id: "demands", num: "03", title: "Demands", groups: [
      { label: "", items: [
        P("Remote Work Balance – GMO", "CSS", "Pending", ["GMO study completed and shared with Ali"], ["Await direction"], "TBD"),
        P("Security Form (Data Classification)", "MOCA", "On Hold", ["On Hold"], [], "TBD"),
        P("Pantry Services", "CSS", "Pending", ["Committee has been completed for this project and waiting for the direction"], [], "TBD"),
        P("Customer Pulse Integration with Jira", "CSS", "On Hold", ["On hold"], [], "TBD"),
        P("Payroll Bot", "CSS", "On Hold", ["On hold for now due to agentic AI"], [], "TBD"),
        P("Dragonfly Thinking", "Strategy & Innovation", "In Progress",
          ["The Dragonfly team has provided our team with access to the GitHub files.", "At this stage, our team is reviewing the repository.", "Whitelisting has been completed for three users, while Mohammed AlTaher is scheduled for Monday.", "We also require visibility and support from the IT team regarding the Claude installation."],
          [], "TBD"),
        P("Automating Group Email Creation Process", "CSS", "In Progress",
          ["The Oracle plan has been shared with the business team."],
          ["We have received the final proposal from the Kalvad team.", "We are currently finalizing the SP plan and will share the complete project plan with the business team once it is finalized."], "TBD"),
        P("Audio Translator in Teams", "CSS", "On Hold", ["On Hold"], [], "TBD"),
        P("Photographer & Videographer Requests (Media Request)", "CSS", "In Progress",
          ["MOCA Smart will be used by employees to submit requests for photographers and videographers.", "Admin users in EMS will be able to add/edit photographer and videographer schedules and show their leaves from Oracle.", "In EMS, photographers will have the option to click “Start Job” when they begin and “End Job” upon completion.", "For vendor requests: once the requester submits a request, the ECC team will review and approve it, after which the vendor will receive a notification email. In EMS, the project manager will be able to view the request details, access PR information in Oracle, and raise event-related requests."],
          ["The business team has decided to include Agentic AI in the project scope. We are currently updating the Scope of Work (SOW) and will share the revised version with the business team for approval."], "TBD"),
        P("Automating the Department Achievements Report (INJAZ)", "CSS", "In Progress",
          ["Proposal received from the Kalvad team"],
          ["We have shared the proposal with business", "Multiple meetings were held with the business team and design team to discuss the Scope of Work. Additional changes have been requested, and once the SOW is finalized, we will proceed with the project."], "TBD"),
        P("Tech Trial AWS", "Strategy & Innovation", "On Hold", ["On Hold"], [], "TBD"),
        P("Avatar AI Phase 2", "PMO", "In Progress",
          ["Explored the possibility of replicating the current avatar (same look and feel) to enable simultaneous deployment across multiple government entities, each with its own knowledge base and area of expertise.", "The objective is to evolve the avatar from a single “minister” persona into an advisor supporting multiple ministers or government leadership teams.", "Replicating the solution as a UAE national persona by adapting the avatar’s appearance and accent, while maintaining the same advisory function and multi-department deployment model", "The questionnaire has been completed by the IT and Cybersecurity teams."],
          ["Business team is awaiting vendor feedback on the previously shared questions regarding the proposed change of persona from “Minister” to “Advisor”, including the technical, operational, cost, and deployment implications. This input is required to provide leadership with a complete view of the available options before the final direction is approved."], "TBD"),
        P("Synthetic Memories UAE", "PMO", "Pending", ["Vendor still finalizing the proposal"], ["Awaiting an update from the business"], "TBD"),
        P("Assets Request", "CSS", "In Progress",
          ["Met with Motion Pexels and the business team to review the solution and gather feedback"],
          ["Motion Pexels to share the technical proposal, initial plan and cost, including AI recommendations", "Saif and Shaikha to provide details of existing systems, API access for Span and other data sources, plus a sample of client data", "Follow-up meeting planned after the Eid holiday to review data and systems"], "TBD"),
        P("EMS Phase 2", "CSS", "In Progress",
          ["We had a meeting with the Design Team and the Business Team.", "The proposed design was approved."],
          ["The business team will arrange a meeting with project managers from different entities to gather their feedback on the design.", "Once we receive the PMs' feedback, we will share the comments with the vendor for implementation and deployment of the new design.", "Meeting is done with business team, and we are working on updating the SOW."], "TBD"),
        P("Store Management System", "CSS", "On Hold",
          ["On hold"],
          ["Business will wait until the tool replacement is completed; the system will be developed in-house (6–8 months)"], "TBD"),
        P("Government Missions", "MOCA", "In Progress",
          ["The initial look and feel guide for the competition has been shared.", "The logo is not final and can be used as a temporary placeholder.", "The guide is intended to provide an initial design direction.", "The platform design should not be limited by the guide, and the team is encouraged to explore creative execution approaches."],
          ["Discussion about next phase (design development)", "24 August — Official launch of the mission, website goes live.", "24–26 August — 48-hour mission acceptance and initial registration window reflected on the website", "27 August – 3 September — Entity leads nomination and team formation / registration on the platform", "7 September — Briefing session for participating entities", "7–18 September — Proposal development sprint (10 working days)", "21–24 September — Internal review and shortlisting of submissions", "29 September — Main pitching day before the judging panel", "30 September – 5 October — Internal approval and selection of the Top 10 projects", "6–7 October — Public voting on the Top 10 projects (48 hours)", "8–11 October — Final review and approval of the Top 5 projects", "12 October — Announcement of the Top 5 winning projects", "13 October – 23 November — Execution phase (30 working days)", "Late November 2026 — National showcase and recognition of outcomes during UAE Innovation Month"], "TBD"),
        P("Decrees (HR Services)", "CSS", "Pending",
          ["New demo conducted for the template feature on GovSign", "HR liked the feature and would like to proceed"],
          ["Awaiting chief approval"], "TBD"),
        P("Onboarding (HR Services)", "CSS", "Pending",
          ["Met with Ali to discuss next steps", "Awaiting confirmation on whether this service falls within the Agentic AI project scope"],
          ["Determine how to proceed once a direction is provided"], "TBD"),
        P("Breathable Infrastructure Competition Website", "PMO", "Pending",
          ["Business considers the pricing high given the scope is limited to a landing-page website", "Further price negotiations requested with both SWORD and Planet Green"],
          ["Awaiting management approval"], "TBD"),
        P("Application Development for Government Relations & Protocol Dept.", "MOCA", "In Progress",
          ["The SOW has been approved by the business team."],
          ["The approved SOW has been distributed to multiple vendors for proposal submission."], "TBD"),
        P("Demand & Digital Transformation Services in MOCA App", "MOCA", "In Progress",
          ["SOW is approved", "We had meeting with design team to visualize the requirements"],
          ["We planned another meeting with design team to go through the updated design."], "TBD"),
        P("Acting Project", "MOCA", "In Progress",
          ["Technical meeting has been completed and the updated github link has been share with the IT team to proceed with the next step"],
          ["Get the direction from the technical team and proceed to the next step"], "TBD"),
        P("Gov Survey Upgrade", "MOCA", "In Progress",
          ["Meeting with the technical and security team has been completed", "Received the requirement from the teams and waiting to get the users name from the vendor to confirm if they have an access in our TFS to proceed with the staging deployment"],
          [], "TBD"),
        P("Executive Dashboard Sprint 3", "CSS", "On Hold", ["On Hold"], [], "TBD"),
        P("Internal Audit Survey Migration to Customer Pulse", "CSS", "Pending",
          ["Testing link created for UAE Gov Surveys and sent to the business for feedback"],
          ["Await feedback"], "TBD"),
      ] },
    ] },
  ],
};

export const demandHistory = [demandReportPrev];

// Resolve the Project & Demand report for a given built-in week id. Returns the
// live report when no id (or the live id) is given, a historical snapshot when
// the id matches one, or null when it is unknown (e.g. a localStorage upload id).
export function findDemandReport(weekId) {
  if (!weekId || weekId === demandReport.id) return demandReport;
  return demandHistory.find((r) => r.id === weekId) || null;
}


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
// Routing rule: CSS items go to the CSS portal; every other entity/sector goes
// to the Ministry portal. Nothing is auto-flagged, so no project is left out.
export const isMinistryEntity = (e) => !isCssEntity(e);
export const isFlaggedEntity = () => false;
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
  { week: "Week of 20 July 2026", date: "24 July 2026", reports: [
    { title: wgsReport.title, href: wgsReport.href, pdf: wgsReport.pdf, status: wgsReport.overallStatus },
    { title: "Ministry Project & Demand", href: MINISTRY_DEMAND_HREF, pdf: demandReport.pdf, status: demandReport.overallStatus },
    { title: "CSS Project & Demand", href: CSS_DEMAND_HREF, pdf: demandReport.pdf, status: demandReport.overallStatus },
  ] },
  { week: "Week of 13 July 2026", date: "17 July 2026", reports: [
    { title: "Ministry Project & Demand", href: MINISTRY_DEMAND_HREF + "?week=" + demandReportPrev.id, pdf: demandReportPrev.pdf, status: demandReportPrev.overallStatus },
    { title: "CSS Project & Demand", href: CSS_DEMAND_HREF + "?week=" + demandReportPrev.id, pdf: demandReportPrev.pdf, status: demandReportPrev.overallStatus },
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
  "Royal Navy": { "--bg": "#F5F8FC", "--sf": "#FFFFFF", "--sf2": "#EAF1F9", "--bd": "#D8E2EF", "--ink": "#16233B", "--mut": "#66758A", "--acc": "#1E4E8C", "--accInk": "#FFFFFF", "--glow": "rgba(30,78,140,0.10)" },
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
    text: [it.entity, g.label, it.updates.join(" "), it.next.join(" "), it.outcome || ""].join(" "),
    href: demandHrefFor(it.entity) + "#" + sec.id,
    meta: (g.label ? g.label + " · " : "") + it.status + (it.goLive && it.goLive !== "—" ? " · Go-live " + it.goLive : ""),
  }))));
  return ix;
}
