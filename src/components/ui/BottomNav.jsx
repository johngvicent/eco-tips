import Button from './Button'

const NAV_ITEMS = [
  { key: 'dashboard',  label: 'Inicio',     icon: 'dashboard' },
  { key: 'search',     label: 'Buscar',     icon: 'search' },
  { key: 'calculator', label: 'Calcular',   icon: 'calculate' },
  { key: 'guide',      label: 'Guía',       icon: 'book' },
  { key: 'tips',       label: 'Tips',       icon: 'lightbulb' },
];

const BottomNav = ({ currentView, onNavigate }) => (
  <nav
    aria-label="Navegación móvil"
    className="md:hidden fixed bottom-0 left-0 right-0 bg-surface border-t border-border flex justify-around items-center h-16 px-space-2 z-50"
  >
    {NAV_ITEMS.map(({ key, label, icon }) => {
      const active = currentView === key;
      return (
        <Button
          variant="ghost"
          key={key}
          onClick={() => onNavigate(key)}
          aria-label={label}
          aria-current={active ? 'page' : undefined}
          className={`flex flex-col items-center justify-center gap-0.5 min-w-11 min-h-11 rounded-md transition-base focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2 ${
            active ? 'text-primary' : 'text-on-surface-variant'
          }`}
        >
          <span
            className="material-symbols-outlined text-[22px]"
            style={active ? { fontVariationSettings: "'FILL' 1" } : {}}
          >
            {icon}
          </span>
          <span className="text-[10px] font-medium leading-none">{label}</span>
        </Button>
      );
    })}
  </nav>
);

export default BottomNav;

