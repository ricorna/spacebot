import { useState } from "react";
import { ENDPOINT_PRESETS } from "@/lib/endpointPresets";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem, Input } from "@/ui";

interface EndpointSelectorProps {
	providerId: string;
	value: string;
	onChange: (url: string) => void;
}

const DEFAULT_SENTINEL = "__default__";
const CUSTOM_SENTINEL = "__custom__";

export function EndpointSelector({ providerId, value, onChange }: EndpointSelectorProps) {
	const presets = ENDPOINT_PRESETS[providerId];
	const [showCustom, setShowCustom] = useState(false);

	// No presets: collapsible custom URL input
	if (!presets) {
		return (
			<div className="flex flex-col gap-2">
				<button
					type="button"
					onClick={() => {
						setShowCustom(!showCustom);
						if (showCustom) onChange("");
					}}
					className="text-left text-tiny font-medium text-ink-faint hover:text-ink-dull transition-colors"
				>
					Custom Endpoint {showCustom ? "▾" : "▸"}
				</button>
				{showCustom && (
					<Input
						type="text"
						value={value}
						onChange={(e) => onChange(e.target.value)}
						placeholder="https://..."
					/>
				)}
			</div>
		);
	}

	// With presets: dropdown selector + custom URL escape hatch
	const isCustom = value !== "" && !presets.some((p) => p.url === value);
	const selectValue = isCustom ? CUSTOM_SENTINEL : value === "" ? DEFAULT_SENTINEL : value;

	const handleSelectChange = (v: string) => {
		if (v === CUSTOM_SENTINEL) {
			onChange(value || "https://");
		} else if (v === DEFAULT_SENTINEL) {
			onChange("");
		} else {
			onChange(v);
		}
	};

	return (
		<div className="flex flex-col gap-2">
			<label className="text-tiny font-medium text-ink-dull">Endpoint</label>
			<Select value={selectValue} onValueChange={handleSelectChange}>
				<SelectTrigger>
					<SelectValue />
				</SelectTrigger>
				<SelectContent>
					{presets.map((preset) => (
						<SelectItem
							key={preset.url || DEFAULT_SENTINEL}
							value={preset.url || DEFAULT_SENTINEL}
						>
							{preset.label}
						</SelectItem>
					))}
					<SelectItem value={CUSTOM_SENTINEL}>Custom URL</SelectItem>
				</SelectContent>
			</Select>
			{isCustom && (
				<Input
					type="text"
					value={value}
					onChange={(e) => onChange(e.target.value)}
					placeholder="https://..."
				/>
			)}
		</div>
	);
}
