type Palette = {
  primary: string;
  secondary: string;
  glow: string;
  line: string;
};

type PortraitSpec = {
  archetype: "knight" | "mage" | "rogue" | "summoner" | "priest" | "sage" | "vanguard";
  palette: Palette;
  title: string;
  imagePath: string;
  hidden: boolean;
};

type HiddenPortrait = {
  imagePath: string;
  palette: Palette;
};

const HIDDEN_JOB_PORTRAITS: Record<string, HiddenPortrait> = {
  魔王の後継者: {
    imagePath: "/images/classes/summoner-dark.png",
    palette: {
      primary: "#b66bff",
      secondary: "#ff5f8f",
      glow: "rgba(182, 107, 255, 0.55)",
      line: "#f2dcff"
    }
  },
  世界一運のいい村人: {
    imagePath: "/images/classes/rogue-wind.png",
    palette: {
      primary: "#ffd166",
      secondary: "#fff3b0",
      glow: "rgba(255, 209, 102, 0.55)",
      line: "#fff7dd"
    }
  },
  奇跡の大聖者: {
    imagePath: "/images/classes/priest-water.png",
    palette: {
      primary: "#fff0b3",
      secondary: "#9fe8ff",
      glow: "rgba(255, 240, 179, 0.55)",
      line: "#fffbe8"
    }
  },
  無銘の勇者: {
    imagePath: "/images/classes/knight-fire.png",
    palette: {
      primary: "#eef7ff",
      secondary: "#ffd166",
      glow: "rgba(238, 247, 255, 0.5)",
      line: "#ffffff"
    }
  }
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

  if (jobName.includes("賢者")) {
    return "sage";
  }

  if (jobName.includes("魔導")) {
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

function getImagePath(archetype: PortraitSpec["archetype"], element: string) {
  switch (archetype) {
    case "knight":
    case "vanguard":
      return "/images/classes/knight-fire.png";
    case "priest":
      return "/images/classes/priest-water.png";
    case "rogue":
      return "/images/classes/rogue-wind.png";
    case "mage":
      return "/images/classes/mage-thunder.png";
    case "sage":
      return "/images/classes/sage-light.png";
    case "summoner":
      return "/images/classes/summoner-dark.png";
    default:
      return element === "光"
        ? "/images/classes/sage-light.png"
        : "/images/classes/knight-fire.png";
  }
}

export function getPortraitSpec(jobName: string, element: string): PortraitSpec {
  const hiddenPortrait = HIDDEN_JOB_PORTRAITS[jobName];

  if (hiddenPortrait) {
    return {
      archetype: inferArchetype(jobName),
      palette: hiddenPortrait.palette,
      title: `${element}属性の${jobName}`,
      imagePath: hiddenPortrait.imagePath,
      hidden: true
    };
  }

  const archetype = inferArchetype(jobName);

  return {
    archetype,
    palette: ELEMENT_PALETTES[element] ?? ELEMENT_PALETTES["光"],
    title: `${element}属性の${jobName}`,
    imagePath: getImagePath(archetype, element),
    hidden: false
  };
}
