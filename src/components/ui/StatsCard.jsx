const DEFAULT_MATERIAL_COLORS = {
	vidrio: "#6ee7b7",
	papel: "#93c5fd",
	plastico: "#fde68a",
	metal: "#c4b5fd",
	organico: "#86efac",
}

const formatMetric = (value, decimals = 1) => {
	const num = Number(value) || 0
	return num.toLocaleString("es-CL", {
		minimumFractionDigits: 0,
		maximumFractionDigits: decimals,
	})
}

const Donut = ({ slices, totalKg }) => {
	const cx = 72
	const cy = 72
	const r = 54
	const circ = 2 * Math.PI * r
	let offset = 0

	const computed = slices.map((slice) => {
		const len = (slice.pct / 100) * circ
		const withOffset = { ...slice, len, offset }
		offset += len
		return withOffset
	})

	return (
		<svg viewBox="0 0 144 144" className="w-28 h-28 sm:w-32 sm:h-32 shrink-0" aria-label="Distribucion por material">
			<circle cx={cx} cy={cy} r={r} fill="none" stroke="#e6ece5" strokeWidth={24} />
			{computed.map((slice) => (
				<circle
					key={slice.key}
					cx={cx}
					cy={cy}
					r={r}
					fill="none"
					stroke={slice.color}
					strokeWidth={24}
					strokeLinecap="round"
					strokeDasharray={`${slice.len} ${circ - slice.len}`}
					strokeDashoffset={-slice.offset}
					transform={`rotate(-90 ${cx} ${cy})`}
				/>
			))}
			<text x={cx} y={cy - 2} textAnchor="middle" style={{ fontSize: 12, fontWeight: 700, fill: "#004d27" }}>
				{formatMetric(totalKg, 2)} kg
			</text>
			<text x={cx} y={cy + 14} textAnchor="middle" style={{ fontSize: 9, fill: "#3f4940" }}>
				reciclados
			</text>
		</svg>
	)
}

const StatsCard = ({
	userName = "Comunidad EcoTips",
	energia = 0,
	agua = 0,
	co2 = 0,
	materials = [],
	className = "",
}) => {
	const year = new Date().getFullYear()
	const normalized = materials
		.map((m) => {
			const key = (m.key || m.label || "otro").toLowerCase().trim()
			const kg = Number(m.kg) || 0
			return {
				key,
				label: m.label || "Otro",
				kg,
				color: m.color || DEFAULT_MATERIAL_COLORS[key] || "#8ad99f",
			}
		})
		.filter((m) => m.kg > 0)

	const totalKg = normalized.reduce((sum, m) => sum + m.kg, 0)
	const safeTotal = totalKg > 0 ? totalKg : 1
	const slices = normalized.map((m) => ({
		...m,
		pct: Math.round((m.kg / safeTotal) * 100),
	}))

	return (
		<article
			className={`relative overflow-hidden rounded-2xl border border-primary/15 bg-surface-container-lowest editorial-shadow aspect-4/5 p-3 sm:p-4 flex flex-col ${className}`}
			aria-label="Tarjeta de impacto social"
		>
			<div
				className="pointer-events-none absolute inset-0"
				aria-hidden="true"
				style={{
					background:
						"radial-gradient(circle at 12% 10%, rgba(158,246,182,0.38), transparent 45%), radial-gradient(circle at 90% 100%, rgba(0,104,55,0.12), transparent 48%), linear-gradient(180deg, #ffffff 0%, #f6fbf3 100%)",
				}}
			/>

			<header className="relative z-10 flex items-start justify-between gap-2">
				<div>
					<p className="text-[10px] uppercase tracking-[0.16em] text-primary/80 font-display leading-none">Impacto Social</p>
					<h2 className="font-display text-[22px] sm:text-headline-md text-primary leading-tight mt-1">Logro de reciclaje</h2>
					<p className="text-[12px] text-on-surface-variant mt-1 leading-tight">{userName}</p>
				</div>
				<img src="/branding/ecologo.svg" alt="EcoTips" className="h-7 sm:h-8 w-auto" loading="eager" />
			</header>

			<section className="relative z-10 mt-3 grid grid-cols-3 gap-2">
				<div className="rounded-2xl border border-border bg-white/80 p-2 text-center flex flex-col items-center">
					<div className="w-12 h-12 rounded-full flex items-center justify-center shadow-[0_10px_22px_rgba(0,77,39,0.22)] border border-white/60"
						style={{ background: "radial-gradient(circle at 30% 25%, #c9eadf 0%, #83d99c 55%, #4d6a62 100%)" }}>
						<span className="material-symbols-outlined text-white text-[24px]" style={{ fontVariationSettings: "'FILL' 1" }}>bolt</span>
					</div>
					<p className="mt-1.5 text-[10px] text-on-surface-variant leading-tight">Energia</p>
					<p className="font-display text-[17px] leading-tight text-primary">{formatMetric(energia, 1)}</p>
					<p className="text-[10px] text-on-surface-variant leading-tight">kWh ahorrada</p>
				</div>

				<div className="rounded-2xl border border-border bg-white/80 p-2 text-center flex flex-col items-center">
					<div className="w-12 h-12 rounded-full flex items-center justify-center shadow-[0_10px_22px_rgba(37,99,235,0.22)] border border-white/60"
						style={{ background: "radial-gradient(circle at 30% 25%, #dbeafe 0%, #93c5fd 55%, #3b82f6 100%)" }}>
						<span className="material-symbols-outlined text-white text-[24px]" style={{ fontVariationSettings: "'FILL' 1" }}>water_drop</span>
					</div>
					<p className="mt-1.5 text-[10px] text-on-surface-variant leading-tight">Agua</p>
					<p className="font-display text-[17px] leading-tight text-primary">{formatMetric(agua, 1)}</p>
					<p className="text-[10px] text-on-surface-variant leading-tight">L conservada</p>
				</div>

				<div className="rounded-2xl border border-border bg-white/80 p-2 text-center flex flex-col items-center">
					<div className="w-12 h-12 rounded-full flex items-center justify-center shadow-[0_10px_22px_rgba(161,98,7,0.2)] border border-white/60"
						style={{ background: "radial-gradient(circle at 30% 25%, #fef3c7 0%, #fde68a 55%, #d97706 100%)" }}>
						<span className="material-symbols-outlined text-white text-[24px]" style={{ fontVariationSettings: "'FILL' 1" }}>co2</span>
					</div>
					<p className="mt-1.5 text-[10px] text-on-surface-variant leading-tight">CO2</p>
					<p className="font-display text-[17px] leading-tight text-primary">{formatMetric(co2, 2)}</p>
					<p className="text-[10px] text-on-surface-variant leading-tight">kg no emitido</p>
				</div>
			</section>

			<section className="relative z-10 mt-3 rounded-2xl border border-primary/10 bg-white/75 p-2.5">
				<p className="font-display text-[11px] uppercase tracking-[0.14em] text-primary/75 mb-1.5">Por material</p>
				{slices.length > 0 ? (
					<div className="flex items-center gap-2">
						<Donut slices={slices} totalKg={totalKg} />
						<ul className="flex-1 space-y-1" aria-label="Distribucion de materiales reciclados">
							{slices.map((slice) => (
								<li key={slice.key} className="flex items-center gap-1.5 text-[11px] leading-tight">
									<span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: slice.color }} aria-hidden="true" />
									<span className="text-on-surface truncate">{slice.label}</span>
									<span className="ml-auto text-on-surface-variant">{formatMetric(slice.kg, 2)} kg</span>
									<span className="w-8 text-right font-semibold text-primary">{slice.pct}%</span>
								</li>
							))}
						</ul>
					</div>
				) : (
					<div className="rounded-xl border border-dashed border-border p-3 text-center text-[12px] text-on-surface-variant leading-tight">
						Agrega materiales en la calculadora para visualizar tu progreso.
					</div>
				)}
			</section>

			<footer className="relative z-10 mt-auto pt-2.5 border-t border-border/80 space-y-1">
				<p className="text-[10px] text-on-surface-variant leading-tight">Comparte tu impacto y motiva a mas personas a reciclar.</p>
				<p className="text-[11px] text-primary font-medium break-all leading-tight">https://eco-tips-ochre.vercel.app/</p>
				<p className="text-[10px] text-on-surface-variant leading-tight">© {year} John Vicent. Todos los Derechos Reservados.</p>
			</footer>
		</article>
	)
}
export default StatsCard
