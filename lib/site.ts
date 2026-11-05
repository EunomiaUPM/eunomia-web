/** Facts about the project, in one place. */

/** Set when the site is served from a sub-path. */
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

/** A file under public/, with the base path in front. */
export function asset(path: string): string {
  return `${basePath}${path}`;
}

/** The deployment site and its repository: where people go to run EUNOMIA. */
const docs = 'https://eunomiaupm.github.io/eunomia-deployment';

export const site = {
  name: 'EUNOMIA',
  title: 'EUNOMIA: the pieces to build a data space',
  description:
    'An open-source framework to build data spaces: a minimal footprint, an ergonomic API and open standards, made from scratch in Rust and Go by GING at Universidad Politécnica de Madrid.',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://eunomia.dit.upm.es',
  github: 'https://github.com/EunomiaUPM',
  contact: 'gi.internetng@upm.es',
  license: 'GPL-3.0',
  address: ['E.T.S. de Ingenieros de Telecomunicación, Building B', 'Av. Complutense, 30', '28040 Madrid, Spain'],
};

export const deployment = {
  web: docs,
  repo: 'https://github.com/EunomiaUPM/eunomia-deployment',
  codespaces: 'https://codespaces.new/EunomiaUPM/eunomia-deployment',
  quickstart: `${docs}/docs/quickstart`,
  requirements: `${docs}/docs/requirements`,
  extension: `${docs}/docs/guides/build-an-extension`,
  factory: `${docs}/docs/components/demo-factory`,
  api: `${docs}/docs/api`,
};

export const ging = {
  name: 'GING',
  fullName: 'Next Generation Internet Group',
  url: 'https://ging.github.io/',
  about:
    'A research group of the Telematics Engineering Department (DIT) at Universidad Politécnica de Madrid, working on data space technologies, generative AI, e-learning and videoconferencing, with experience in protocol design, software development and publicly funded national and European projects.',
};

export const funding =
  'Funded by INCIBE through the call “Solutions for sovereignty, trust and security in data spaces” (ETD202300196), co-financed by the European Union Recovery and Resilience Facility.';

export const drivers = [
  {
    title: 'Minimal footprint',
    body: 'An agent with its wallet, database and cache takes around 200 MB at rest. Light enough for the edge, and ready for the cloud.',
  },
  {
    title: 'An ergonomic API',
    body: 'Manage entities, speak the protocol, or run a whole flow with one RPC call: three levels, so an application only sees the one it needs.',
  },
  {
    title: 'Standards all the way',
    body: 'No proprietary handshake. Any participant that speaks the same open protocols can join the same data space.',
  },
];

export const standards = [
  { group: 'Data sharing', items: ['DSP', 'ODRL'] },
  { group: 'Identity and access', items: ['OIDC', 'GNAP', 'did:web', 'did:jwk'] },
  { group: 'Credentials', items: ['Verifiable Credentials', 'Verifiable Presentations'] },
  { group: 'Trust framework', items: ['Gaia-X'] },
];

export const alignedWith = ['IDSA', 'DSSC'];

export type Piece = {
  name: string;
  role: string;
  body: string;
  status?: 'Available' | 'Released soon';
  repo?: string;
};

export const pieces: Piece[] = [
  {
    name: 'Heimdall',
    role: 'Authority',
    status: 'Available',
    repo: 'https://github.com/EunomiaUPM/heimdall',
    body: 'Feeds the data space with trust: a Verifiable Credential issuer for different types of credentials, aligned with Gaia-X.',
  },
  {
    name: 'DS-Agent',
    role: 'Data space agent',
    status: 'Available',
    repo: 'https://github.com/EunomiaUPM/ds-agent',
    body: 'The connector each participant runs. It implements DSP, holds the source catalog, offers a management API and has an enterprise-grade event bus to connect with other systems.',
  },
  {
    name: 'Federated catalog',
    role: 'Discovery',
    status: 'Released soon',
    body: 'One place to find what the participants of a data space offer.',
  },
  {
    name: 'Orchestrator',
    role: 'Operations',
    status: 'Released soon',
    body: 'Coordinates the pieces of a data space as one system.',
  },
  {
    name: 'Control and governance',
    role: 'Governance',
    body: 'The systems that keep a data space under its own rules.',
  },
];

export const projects = [
  {
    name: 'ECOSTARS',
    body: 'Sustainability data: environmental and social metrics from the hospitality sector, exchanged between participants of a EUNOMIA data space.',
    repo: 'https://github.com/EunomiaUPM/eunomia-ecostars-deployment',
  },
  {
    name: 'EDACCIT',
    body: 'Geospatial data: transport and meteorological datasets, with governed access through the data space from a map viewer.',
    repo: 'https://github.com/EunomiaUPM/eunomia-edaccit-deployment',
  },
];

export const team = [
  { name: 'Joaquín Salvachúa', role: 'Principal Investigator' },
  { name: 'Andrés Muñoz Arcentales', role: 'Assistant Professor' },
  { name: 'Carlos Aparicio', role: 'PhD candidate' },
  { name: 'Rodrigo Menéndez', role: 'Intern' },
];
