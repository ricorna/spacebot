export interface EndpointPreset {
	label: string;
	/** Empty string means "use provider default" */
	url: string;
}

export const ENDPOINT_PRESETS: Record<string, EndpointPreset[]> = {
	zhipu: [
		{ label: "Z.ai (General)", url: "" },
		{ label: "Z.ai Coding Plan", url: "https://api.z.ai/api/coding/paas/v4" },
	],
	moonshot: [
		{ label: "Moonshot International", url: "" },
		{ label: "Moonshot China", url: "https://api.moonshot.cn" },
		{ label: "Kimi Coding Plan", url: "https://api.kimi.com/coding" },
	],
	minimax: [
		{ label: "MiniMax International", url: "" },
		{ label: "MiniMax China", url: "https://api.minimaxi.com/anthropic" },
	],
	ollama: [
		{ label: "Local (localhost:11434)", url: "" },
		{ label: "Remote (custom)", url: "http://" },
	],
};
