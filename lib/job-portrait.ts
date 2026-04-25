type Palette = {
  primary: string;
  secondary: string;
  glow: string;
  line: string;
};

type PortraitSpec = {
  archetype: "knight" | "mage" | "rogue" | "summoner" | "priest" | "vanguard";
  palette: Palette;
  title: string;
};

const ELEMENT_PALETTES: Record<string, Palette> = {
  炎: {
    primary: "#ff7a59",
    secondary: "#ffd166",
    glow: "rgba(255, 122, 89, 0.42)",
    line: "#ffe1c9"
  },
  水: {
    primary: "#5fd0ff",
    secondary: "#82f7ff",
    glow: "rgba(95, 208, 255, 0.4)",
    line: "#defcff"
  },
  風: {
    primary: "#6cffb0",
    secondary: "#d6ff7a",
    glow: "rgba(108, 255, 176, 0.4)",
    line: "#e8ffe8"
  },
  雷: {
    primary: "#9a7cff",
    secondary: "#71c3ff",
    glow: "rgba(154, 124, 255, 0.42)",
    line: "#efe6ff"
  },
  光: {
    primary: "#ffe27a",
    secondary: "#fff8c7",
    glow: "rgba(255, 226, 122, 0.42)",
    line: "#fff7dd"
  },
  闇: {
    primary: "#ff74cc",
    secondary: "#8f7bff",
    glow: "rgba(255, 116, 204, 0.4)",
    line: "#ffe2f7"
  }
};

function inferArchetype(jobName: string): PortraitSpec["archetype"] {
  if (jobName.includes("騎士") || jobName.includes("騎装") || jobName.includes("守護")) {
    return "knight";
  }

  if (jobName.includes("賢者") || jobName.includes("魔導")) {
    return "mage";
  }

  if (jobName.includes("影") || jobName.includes("遊撃")) {
    return "rogue";
  }

  if (jobName.includes("召喚")) {
    return "summoner";
  }

  if (jobName.includes("聖") || jobName.includes("祝祭") || jobName.includes("詠唱")) {
    return "priest";
  }

  return "vanguard";
}

export function getPortraitSpec(jobName: string, element: string): PortraitSpec {
  return {
    archetype: inferArchetype(jobName),
    palette: ELEMENT_PALETTES[element] ?? ELEMENT_PALETTES["光"],
    title: `${element}属性の${jobName}`
  };
}
