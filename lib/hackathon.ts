/** The event: every date, place and challenge on the hackathon page comes from here. */

export const hackathon = {
  name: 'EUNOMIA Hackathon',
  tagline: 'Solve the challenges of the data economy.',
  dateLabel: '30 November 2026',
  days: ['Monday 30 November'],
  /** Europe/Madrid: the first day starts, the last one ends. */
  start: '2026-11-30T09:15:00+01:00',
  end: '2026-11-30T18:00:00+01:00',
  placeShort: 'ETSIT UPM, Madrid, and online',
  place: 'E.T.S. de Ingenieros de Telecomunicación, Universidad Politécnica de Madrid',
  address: 'Av. Complutense, 30, 28040 Madrid',
  map: 'https://www.openstreetmap.org/search?query=ETSI%20Telecomunicaci%C3%B3n%20UPM%20Madrid',
  format: 'Hybrid: at UPM and online',
  /** While null the page says it is to be announced. */
  schedule: '9:15 to 18:00' as string | null,
  room: null as string | null,
  registrationUrl: 'https://gaiax-spain.com/registro-hackaton-gaia-x-espana-10-nov/' as string | null,
};

export const agenda: { time: string; activity: string; pause?: boolean }[] = [
  { time: '9:15 – 9:30', activity: 'Welcome and registration' },
  { time: '9:30 – 9:45', activity: 'Opening of the hackathon' },
  { time: '9:45 – 11:30', activity: 'The challenges explained, and teams formed' },
  { time: '11:30 – 12:00', activity: 'Coffee break', pause: true },
  { time: '12:00 – 17:00', activity: 'Hacking' },
  { time: '17:00 – 18:00', activity: 'Awards and closing' },
];

export type Milestone = {
  number: string;
  title: string;
  subtitle: string;
  steps: string[];
  commands: string[];
  result: string;
};

export const milestones: Milestone[] = [
  {
    number: '01',
    title: 'Ignition',
    subtitle: 'From a clean laptop to your own authority and agent.',
    steps: [
      'Clone the repository, or open it in GitHub Codespaces and skip the install entirely.',
      'Check the machine, then start an authority and a first agent: it gets its wallet, its DID and its credentials on the way up.',
    ],
    commands: ['./eunomia doctor', './eunomia authority add authority', './eunomia agent add alice'],
    result: 'An authority and an agent, healthy, with verifiable credentials in its wallet.',
  },
  {
    number: '02',
    title: 'Identity and discovery',
    subtitle: 'A second agent, trust between them, a catalog.',
    steps: [
      'Add a second agent: same software, its own identity, its own Gaia-X legal and label credentials.',
      'Start the demo factory and publish it from alice. bob logs in to alice over GNAP and reads the DCAT catalog over the Dataspace Protocol.',
    ],
    commands: [
      './eunomia agent add bob',
      './eunomia demo up',
      './eunomia demo publish alice',
      './eunomia demo test --consumer bob --provider alice --list-datasets',
    ],
    result: 'The catalog of alice in your terminal, fetched by an agent it now trusts.',
  },
  {
    number: '03',
    title: 'ODRL negotiation',
    subtitle: 'Contracts the machines agree on.',
    steps: [
      'The catalog offers three ODRL policies, in extensions/demo/payloads/ 04, 05 and 06. The test negotiates the first: change the DID in 04 and publish again.',
      'Run the eight-state Dataspace Protocol negotiation between bob and alice and watch your term travel through it.',
    ],
    commands: ['./eunomia demo publish alice --force', './eunomia demo test --consumer bob --provider alice -v'],
    result: 'A FINALIZED agreement between the two agents, with your term in it.',
  },
  {
    number: '04',
    title: 'Live data, both ways',
    subtitle: 'Pull the fleet. Stream the robots. Swap roles.',
    steps: [
      'Pull every robot through the data plane of alice, which adds the factory token: bob never sees it. Then stream the robot events live.',
      'Publish the factory from bob too and run it the other way round: every agent provides and consumes.',
    ],
    commands: [
      './eunomia demo robots --consumer bob --provider alice',
      './eunomia demo events --consumer bob --provider alice',
      './eunomia demo publish bob',
      './eunomia demo test --consumer alice --provider bob',
    ],
    result: 'Real data flowing between two sovereign agents, in both directions.',
  },
];

/** A list entry: plain text, or a bold lead and its text. */
export type Item = string | [string, string];

export type Section = { heading: string; text?: string[]; items?: Item[]; ordered?: boolean; closing?: string };

export type Challenge = {
  number: string;
  title: string;
  tagline: string;
  prize?: string;
  /** Challenge 1 is the milestones, against the clock. */
  milestones?: boolean;
  sections: Section[];
};

export type Track = {
  id: string;
  name: string;
  span: string;
  prize: string;
  prizeNote: string;
  challenges: Challenge[];
  funding?: string;
};

export const tracks: Track[] = [
  {
    id: 'upm',
    name: 'UPM challenges',
    span: 'Challenges 1, 2 and 3',
    prize: '2 × iPad Pro',
    prizeNote: 'One for the winning team of Challenge 2, one for the winning team of Challenge 3.',
    challenges: [
      {
        number: '1',
        title: 'Data Space in 60 Minutes',
        tagline: 'The deployment race',
        milestones: true,
        sections: [
          {
            heading: 'Context',
            text: [
              'One of the biggest brakes on adopting federated data spaces is the initial complexity: configuration, catalog negotiation, connectors to start. EUNOMIA wants to break that barrier and bring the entry curve down to minutes.',
            ],
          },
          {
            heading: 'The challenge',
            text: ['Starting from the EUNOMIA base artefacts and repositories (eunomia-deployment), configure, start and orchestrate a working data space ecosystem with:'],
            ordered: true,
            items: [
              ['An authority environment:', 'issuing and validating identities and credentials.'],
              ['At least one provider node:', 'publishing DCAT catalogs and data services.'],
              ['At least one consumer node:', 'negotiating a contract over the Dataspace Protocol and actually transferring the data.'],
            ],
          },
          {
            heading: 'Key milestone',
            text: ['The whole cycle (bootstrapping, negotiation and transfer) completes and is verified in under 60 minutes, from a clean environment.'],
          },
        ],
      },
      {
        number: '2',
        title: 'Ephemeral Data Spaces on the Fly for Disasters',
        tagline: 'The DANA scenario',
        prize: 'iPad Pro',
        sections: [
          {
            heading: 'Context',
            text: [
              'In extreme emergencies such as floods, flash floods or natural disasters, response times are critical. Coordinating means sharing data in real time between public bodies (rescue services, meteorology, security forces) and citizen or private organisations on the ground.',
            ],
          },
          {
            heading: 'The challenge',
            text: ['Build and demonstrate the on-the-fly provisioning of an emergency data space that allows:'],
            items: [
              ['Immediate ingestion and exchange of critical streams:', 'flooded spots in real time, road status, the location of trapped people and the supplies needed.'],
              ['Official and unofficial actors working side by side:', 'UME, Civil Protection, AEMET and 112, together with volunteer platforms, machinery companies and NGOs.'],
              ['Contingency channels:', 'a field node joins the network in minutes and starts sending telemetry, without weeks of bureaucratic approval.'],
            ],
          },
          {
            heading: 'Expected result',
            text: ['A working demonstration of an emergency data space provisioned in minutes, exchanging data in real time between every actor involved.'],
          },
        ],
      },
      {
        number: '3',
        title: 'Cloud-Native Multi-Environment Orchestration and Elastic Resilience',
        tagline: 'From localhost to production',
        prize: 'iPad Pro',
        sections: [
          {
            heading: 'Context',
            text: [
              'A data space cannot depend only on localhost or fragile local instances. It has to be deployed declaratively, in public or sovereign clouds as well as on edge nodes or decentralised data centres.',
            ],
          },
          {
            heading: 'The challenge',
            text: ['Take the EUNOMIA deployment base (docker-compose and bash scripts) towards a production-ready, cloud-native architecture:'],
            items: [
              ['Declarative manifests', '(Kubernetes, Helm charts, Terraform) to deploy EUNOMIA nodes on any cloud provider: AWS, GCP, Azure or Gaia-X compatible European clouds.'],
              ['Self-healing,', 'load balancing in the data plane, and a strict separation between the control plane and the transfer plane.'],
              ['Built-in telemetry and observability:', 'negotiation latency metrics, the status of the identity store and real-time dashboards.'],
            ],
          },
          {
            heading: 'Expected result',
            text: ['A cloud-native, resilient and observable deployment base, that can also be used for fast deployments in emergencies.'],
          },
        ],
      },
    ],
  },
  {
    id: 'tree',
    name: 'Tree Technology challenge',
    span: 'Challenge 4',
    prize: '€1,000',
    prizeNote: 'For the winning team of Challenge 4.',
    funding:
      'This project has received funding from the European Union’s Horizon Europe research and innovation programme under grant agreement No 101168467.',
    challenges: [
      {
        number: '4',
        title: 'TrustED PETs Transformer',
        tagline: 'Protect the data, keep its value',
        prize: '€1,000',
        sections: [
          {
            heading: 'Context',
            text: [
              'Organisations often need to share, analyse or publish data, but the original data may hold personal, sensitive, confidential or otherwise restricted information. Removing names and other obvious identifiers is rarely enough: each type of data needs different protection techniques, and transformations that are too aggressive can destroy the value of the dataset.',
            ],
          },
          {
            heading: 'The challenge',
            text: [
              'Inspired by the European project TrustED (GA No 101168467), build a working prototype that applies privacy-enhancing technologies (PETs) to sensitive datasets while keeping their analytical utility. Teams will:',
            ],
            ordered: true,
            items: [
              'Detect or classify the types of data present and identify the main privacy risks attached to them.',
              'Choose and justify the PETs or transformation techniques that fit the data and risks, given the sharing scenario provided.',
              'Transform the dataset and produce a protected version or a protected view of it.',
              'Show evidence that the transformations reduce the privacy risks identified, with metrics, tests or assessments suited to the chosen PETs.',
              'Show that the protected version keeps enough utility for the reference analytical purpose.',
            ],
          },
          {
            heading: 'The data',
            text: [
              'One or more realistic synthetic datasets will be provided, from fields such as cybersecurity, health, smart cities, mobility, energy, finance, education, public administration or customer service. They may include direct identifiers, quasi-identifiers, timestamps, locations, free-text fields, technical identifiers, categorical attributes, numeric measures or aggregate statistics.',
              'Each dataset comes with a sharing scenario and at least one reference analytical purpose, whose utility is measured before and after the transformation. Teams may propose further analyses, as long as they are justified.',
            ],
          },
          {
            heading: 'Possible PETs and transformations',
            text: [
              'Among others: masking, pseudonymisation, tokenisation, generalisation, binning, suppression, aggregation, synthetic data generation, redaction of sensitive information in free text, reduced location precision, rounded timestamps, or differential privacy for aggregate queries.',
              'The list is a guide, not a limit. Teams are not expected to apply every technique, but to pick a combination that fits the risks identified and the scenario.',
            ],
          },
          {
            heading: 'Deliverables',
            text: ['The final demonstration shows:'],
            ordered: true,
            items: [
              'The data types and main privacy risks identified in the original dataset.',
              'The PETs or transformation techniques chosen for each data type, and why.',
              'The working prototype, and the transformed dataset or protected view it produces.',
              'Evidence that the privacy risks went down, through one or more metrics, tests or assessments consistent with the techniques applied and the risks identified.',
              'A comparison of utility before and after the transformation for the reference analytical purpose, with the same analysis or evaluation criterion.',
              'Why the protected data can be fit for the sharing scenario provided, including possible residual risks, limitations and conditions of use.',
            ],
            closing:
              'The best solutions strike a justified balance between privacy and utility: they show evidence that the relevant risks went down, while keeping enough of the patterns, distributions, trends, relationships or indicators the intended use case needs.',
          },
        ],
      },
    ],
  },
];

export type Criterion = { title: string; body: string; points: string };

/** How the UPM challenges are judged: 50 common points, 50 technical, up to 10 more. */
export const upmJudging = {
  summary: [
    { label: 'Cross-cutting criteria', points: '50 pts' },
    { label: 'Technical execution', points: '50 pts' },
    { label: 'Bonus', points: '+10 pts' },
  ],
  crossCutting: [
    {
      title: 'Feasibility and impact',
      body: 'Is the solution realistic and scalable in a real production or emergency setting? Does it solve a clear business, governance or social problem?',
      points: '15',
    },
    {
      title: 'Innovation and approach',
      body: 'Has the team used novel architectural approaches or gone beyond the easy path? The design of the user or developer experience (UX, DX).',
      points: '15',
    },
    { title: 'Demo quality: clarity', body: 'Explaining the problem, the solution and the usage scenario within the time given.', points: '10' },
    { title: 'Demo quality: live', body: 'The demo runs on live software, not only slides or recorded videos.', points: '10' },
  ] as Criterion[],
  technical: [
    {
      challenge: '2',
      title: 'Ephemeral data spaces on the fly (DANA)',
      note: 'Build a use case of interest, with the end systems that emit, query and consume the data. Every data transfer must first be published in the data space catalog, then negotiated as a contract and transferred. The topology of the use case is up to you.',
      criteria: [
        { title: 'Fast provisioning and contingency', body: 'A field node shown joining the network in minutes, sidestepping slow bureaucratic approvals.', points: '5' },
        { title: 'Real-time ingestion', body: 'Processing and exchanging critical telemetry streams instantly.', points: '15' },
        { title: 'Hybrid federation', body: 'Official and unofficial actors shown working side by side.', points: '10' },
        { title: 'Network resilience', body: 'The network survives and keeps moving data when a central or coordinating node simulates a failure.', points: '10' },
        { title: 'Service topology complexity', body: 'The number of end systems and data consumers emulates a real deployment.', points: '10' },
      ] as Criterion[],
    },
    {
      challenge: '3',
      title: 'Cloud-native multi-environment orchestration',
      note: 'Improve how the systems deploy to cloud and multi-cloud environments, automating the deployment of the current environment. Not only the data space systems: deploying the end data systems and the consumers has to be ergonomic too.',
      criteria: [
        { title: 'Declarative manifests', body: 'Kubernetes, Helm charts or Terraform used well to deploy EUNOMIA nodes, beyond the local docker-compose.', points: '10' },
        { title: 'Control plane vs data plane', body: 'A strict architectural separation, and load balancing you can see in the data plane.', points: '10' },
        { title: 'Self-healing', body: 'A pod or node destroyed live and recovered automatically, without losing state.', points: '10' },
        { title: 'Observability', body: 'Real-time telemetry dashboards with latency metrics and the status of the identity store.', points: '10' },
        { title: 'Service topology complexity', body: 'The number of end systems and data consumers emulates a real deployment.', points: '10' },
      ] as Criterion[],
    },
  ],
  bonus: [
    { title: 'No model', body: 'No business model mentioned, or a generic use case that adds no real value.', points: '0' },
    { title: 'Basic concept', body: 'A valid use case for the data space, but the business model is undefined or unrealistic.', points: '3' },
    { title: 'Solid design', body: 'A clear conceptual design of the ecosystem and a credible, sustainable business model.', points: '7' },
    {
      title: 'Strategic excellence',
      body: 'A high-level conceptual design showing a deep grasp of the data space economy: incentives, governance mechanisms and a disruptive business model.',
      points: '10',
    },
  ] as Criterion[],
  tiebreak: [
    'Higher Bonus score (business models and conceptual design).',
    'Higher Technical execution score.',
    'The more automated deployment: less manual work during the live demo.',
    'The casting vote of the Lead Technical Jury, on the robustness of the code or architecture delivered.',
  ],
};

/** How the Tree Technology challenge is judged: out of 100, each criterion at a level from 0 to 4. */
export const treeJudging: { title: string; points: string; levels: [string, string, string] }[] = [
  {
    title: 'Risk identification',
    points: '10',
    levels: [
      'Generic. Risks not tied to the attacker or the technique. Height and weight ignored.',
      'Names singling out, linkability and inference, without pointing at variables.',
      'Separates quasi-identifiers and sensitive variables by column name. The risks fit the technique (membership for synthetic data, for instance).',
    ],
  },
  {
    title: 'Evidence of protection',
    points: '20',
    levels: [
      'No metrics, measured on the original, or the “proof” is the utility, or that the data is synthetic.',
      'Some right metric, but incomplete (k over demographics only, DCR without a control).',
      'Fitting metrics, on what is delivered, against the attacker in the brief, reproducible, before and after, with low risk.',
    ],
  },
  {
    title: 'Residual risks',
    points: '10',
    levels: [
      '“Zero risk”, or not mentioned.',
      'Generic limitations (“there could be risk”).',
      'Concrete and quantified: which attacker or what extra knowledge would break the protection.',
    ],
  },
  {
    title: 'Minimum analysis',
    points: '15',
    levels: [
      'A group off by more than 3 pp or 0.3 visits, groups suppressed without reason, or the apnea or pneumonia trend reversed.',
      'All within “acceptable” (≤ 3 pp, ≤ 0.3 visits).',
      'All within “very good” (≤ 1 pp, ≤ 0.1 visits), a complete table and no relevant reversals.',
    ],
  },
  {
    title: 'The other variables',
    points: '20',
    levels: [
      'Drops many variables without reason, or breaks consistency and the age–mortality relationship.',
      'Keeps most of them and compares some distributions.',
      'Keeps nearly all, compares distributions and correlations, keeps consistency and the key relationships.',
    ],
  },
  {
    title: 'Justified decisions',
    points: '10',
    levels: [
      'Data dictionary missing or incomplete.',
      'A complete dictionary, with brief reasons.',
      'Every decision is reasoned and tied to the risk it reduces or the utility it keeps.',
    ],
  },
  {
    title: 'Reproducibility',
    points: '5',
    levels: [
      'The code does not run, or does not produce what was delivered.',
      'Runs with manual tweaks.',
      'Runs as is, with seeds, and reproduces the CSV and the metrics.',
    ],
  },
  {
    title: 'Communication',
    points: '10',
    levels: [
      'A confusing report: what was done is unclear.',
      'Clear but technical: a non-specialist gets lost.',
      'A hospital manager could decide from it: what is shared, what risk remains and what is lost.',
    ],
  },
];

export const needs = [
  'A laptop with Docker Desktop (Windows, macOS) or Docker Engine (Linux)',
  'Or a browser and a GitHub account, for Codespaces',
  'About 4 GB of free memory for Docker and 3 GB of disk for the images',
  'Python is optional: without it the CLI runs in a container',
];

/** Run at home: the images are downloaded once, and not on the venue's network. */
export const beforeYouCome = [
  'git clone https://github.com/EunomiaUPM/eunomia-deployment.git',
  'cd eunomia-deployment',
  './eunomia doctor',
  './eunomia authority add authority',
];

export const faq = [
  {
    q: 'Can I take part online?',
    a: 'Yes. The hackathon is hybrid: come to the ETSIT at UPM, or join online. Register either way.',
  },
  {
    q: 'Do I need to know what a data space is?',
    a: 'No. The milestones teach it by doing: identity, catalog, contract, data. The morning session explains every challenge before teams form.',
  },
  {
    q: 'What do I need to install?',
    a: 'Docker. With Codespaces, not even that. On Apple Silicon the images run under emulation in Docker Desktop.',
  },
  {
    q: 'Which challenges have a prize?',
    a: 'Challenges 2 and 3 win an iPad Pro each, and Challenge 4 wins €1,000. Challenge 1 is the race to a working data space, and the best way into the others.',
  },
  {
    q: 'Can I keep going afterwards?',
    a: 'Everything you run is open source under GPL-3.0 and stays on your machine. The deployment site covers the next steps: more agents, your own data, production.',
  },
];
