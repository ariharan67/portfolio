// status: "shipped" | "in progress" | "archived"

export const projects = [
  {
    id: "wazuh-soc-lab",
    name: "Wazuh SOC Home Lab",
    summary:
      "Built a SOC home lab using Wazuh SIEM to monitor Linux and Windows authentication events, investigate SSH brute-force attempts, create custom detection rules, generate alerts, and map detections to MITRE ATT&CK.",
    tags: ["Wazuh", "SIEM", "SOC", "Log Analysis", "MITRE ATT&CK"],
    status: "shipped",
    repo: "https://github.com/ariharan67/wazuh-soc-home-lab",
    // demo: "",
  },

  {
    id: "elastic-edr-lab",
    name: "Elastic Defend EDR Lab",
    summary:
      "Configured Elastic Agent and Elastic Defend on a Lubuntu endpoint connected to Elastic Cloud Serverless. Practiced endpoint monitoring, process investigation, security alert analysis, and documenting detection evidence.",
    tags: [
      "Elastic Security",
      "EDR",
      "Endpoint Monitoring",
      "Threat Detection",
    ],
    status: "shipped",
    repo: "https://github.com/ariharan67/Elastic-Defend-Edr-Lab",
    // demo: "",
  },

  // {
  //   id: "splunk-log-analysis",
  //   name: "Splunk Windows Log Analysis",
  //   summary:
  //     "Imported Windows security logs into Splunk and practiced searching and filtering authentication events, investigating successful logins and failed login attempts, and identifying relevant security event patterns using SPL.",
  //   tags: ["Splunk", "SPL", "Windows Event Logs", "SIEM", "Authentication Monitoring"],
  //   status: "shipped",
  //   repo: "",
  //   demo: "",
  // },

  {
    id: "wireshark-traffic-analysis",
    name: "Wireshark Network Traffic Analysis",
    summary:
      "Analyzed network traffic using Wireshark to examine communication patterns, investigate suspicious packets, understand network protocols, and practice identifying potentially malicious activity.",
    tags: [
      "Wireshark",
      "Network Security",
      "Packet Analysis",
      "Incident Investigation",
    ],
    status: "shipped",
    repo: "https://github.com/ariharan67/Wireshark-network-investigation",
    // demo: "",
  },
];
