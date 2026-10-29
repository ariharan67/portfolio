// Skill levels represent your current practical familiarity, not formal proficiency scores.

export const skillGroups = [
  {
    id: "soc",
    title: "SOC and defensive security",
    skills: [
      { name: "SIEM (Wazuh, Splunk)", level: 55 },
      { name: "Log Analysis and Event Investigation", level: 55 },
      { name: "Security Alert Triage", level: 50 },
      { name: "Custom Detection Rules (Wazuh)", level: 45 },
      { name: "Endpoint Detection and Response (Elastic Defend)", level: 40 },
      { name: "Windows Event Log Analysis", level: 50 },
      { name: "Linux Authentication Monitoring", level: 55 },
      { name: "MITRE ATT&CK Fundamentals", level: 40 },
      { name: "Incident Response Fundamentals", level: 40 },
    ],
  },

  {
    id: "networking",
    title: "networking and traffic analysis",
    skills: [
      { name: "Network Fundamentals (TCP/IP, DNS, DHCP)", level: 60 },
      { name: "Packet Analysis (Wireshark)", level: 55 },
      { name: "Port Scanning (Nmap)", level: 45 },
      { name: "Network Protocols and Ports", level: 55 },
      { name: "SSH Authentication and Monitoring", level: 55 },
      { name: "Basic Network Troubleshooting", level: 45 },
    ],
  },

  {
    id: "systems",
    title: "operating systems and virtualization",
    skills: [
      { name: "Linux (Kali Linux, Lubuntu)", level: 55 },
      { name: "Windows Security Event Logs", level: 50 },
      { name: "Docker and Docker Compose", level: 40 },
      { name: "VirtualBox and Virtual Labs", level: 50 },
      { name: "Linux Command Line", level: 50 },
      { name: "Git and GitHub", level: 40 },
    ],
  },

  {
    id: "scripting",
    title: "scripting and automation",
    skills: [
      { name: "Python Fundamentals", level: 50 },
      { name: "Bash Fundamentals", level: 40 },
      { name: "Splunk Search Processing Language (SPL)", level: 40 },
    ],
  },
];

export const toolbelt = [
  "Wazuh SIEM",
  "Splunk",
  "Elastic Security",
  "Elastic Defend",
  "Elastic Agent",
  "Wireshark",
  "Nmap",
  "Kali Linux",
  "Lubuntu",
  "Windows",
  "Linux",
  "Docker",
  "Docker Compose",
  "VirtualBox",
  "Git",
  "GitHub",
  "MITRE ATT&CK",
  "SSH",
];
