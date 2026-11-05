/** The event: every date, place and challenge on the hackathon page comes from here. */

export const hackathon = {
  name: 'EUNOMIA Hackathon',
  dateLabel: '10–11 November 2026',
  days: ['Tuesday 10 November', 'Wednesday 11 November'],
  /** Europe/Madrid: the first day starts, the last one ends. */
  start: '2026-11-10T00:00:00+01:00',
  end: '2026-11-12T00:00:00+01:00',
  placeShort: 'ETSIT UPM, Madrid',
  place: 'E.T.S. de Ingenieros de Telecomunicación, Universidad Politécnica de Madrid',
  address: 'Av. Complutense, 30, 28040 Madrid',
  map: 'https://www.openstreetmap.org/search?query=ETSI%20Telecomunicaci%C3%B3n%20UPM%20Madrid',
  /** While null the page says it is to be announced. */
  schedule: null as string | null,
  room: null as string | null,
  registrationUrl: null as string | null,
};

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

export type Challenge = { title: string; body: string; link?: { text: string; to: 'extension' | 'factory' } };

export const challenges: { level: string; items: Challenge[] }[] = [
  {
    level: 'Warm-up',
    items: [
      {
        title: 'Fleet dashboard',
        body: 'Pull the robots through the data space and chart OEE, defect rate and energy: five robots, four years of measures each.',
        link: { text: 'The data', to: 'factory' },
      },
      {
        title: 'Live alerts',
        body: 'Take the pushed events on an endpoint of your own and raise an alarm when robot_temperature or robot_vibration cross a threshold.',
      },
    ],
  },
  {
    level: 'Level up',
    items: [
      {
        title: 'Predictive maintenance',
        body: 'Combine the yearly MTBF, maintenance and downtime figures with the live events to guess which robot fails next.',
      },
      {
        title: 'Policy guard',
        body: 'The agents carry ODRL terms through the negotiation without evaluating their constraints: an expired offer still reaches an agreement. Write the check that refuses it, on date, purpose or count.',
      },
      {
        title: 'Two authorities',
        body: 'Start a second authority with --role dataspace, onboard agents with one, the other or both, and map who belongs to which data space.',
      },
    ],
  },
  {
    level: 'Ambitious',
    items: [
      {
        title: 'Your own extension',
        body: 'Bring your own data: a backend, its connector, its catalog entry and a test, as eunomia <yours>.',
        link: { text: 'Build an extension', to: 'extension' },
      },
      {
        title: 'A team marketplace',
        body: 'One machine, one authority, one agent per team: every team publishes something and consumes from the others.',
      },
      {
        title: 'A negotiation UI',
        body: 'Walk a user through catalog, offer, contract and transfer, showing the protocol state at every step. eunomia notebook runs each call in Jupyter, to see what to build on.',
      },
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
    q: 'Do I need to know what a data space is?',
    a: 'No. The milestones teach it by doing: identity, catalog, contract, data.',
  },
  {
    q: 'What do I need to install?',
    a: 'Docker. With Codespaces, not even that. On Apple Silicon the images run under emulation in Docker Desktop.',
  },
  {
    q: 'Can I bring my own data?',
    a: 'Yes: that is the Your own extension challenge. Your code stays in your own repository, and EUNOMIA stays untouched.',
  },
  {
    q: 'Can I keep going afterwards?',
    a: 'Everything you run is open source under GPL-3.0 and stays on your machine. The deployment site covers the next steps: more agents, your own data, production.',
  },
];
