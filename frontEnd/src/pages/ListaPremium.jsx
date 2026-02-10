import { useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "mochilista.listaPremium.v1";

const CATEGORY_OPTIONS = [
  "Ropa y Calzado",
  "Equipo Técnico",
  "Salud e Higiene",
  "Electrónica",
  "Documentación",
  "Otros",
];

const categoryIcon = (category) => {
  switch (category) {
    case "Ropa y Calzado":
      return "apparel";
    case "Salud e Higiene":
      return "medical_services";
    case "Electrónica":
      return "devices";
    case "Documentación":
      return "description";
    case "Equipo":
      return "hiking";
    default:
      return "inventory_2";
  }
};

const uid = () =>
  globalThis.crypto?.randomUUID?.() ??
  `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;

const toKgLabel = (grams) => `${(grams / 1000).toFixed(2)} kg`;

export default function ListaPremium() {
  const [tripName, setTripName] = useState("");
  const [groupByType, setGroupByType] = useState(true);
  const [items, setItems] = useState([]);
  const [newItemName, setNewItemName] = useState("");

  // Cargar estado guardado
  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return;
    try {
      const parsed = JSON.parse(raw);
      if (typeof parsed.tripName === "string") setTripName(parsed.tripName);
      if (typeof parsed.groupByType === "boolean") setGroupByType(parsed.groupByType);
      if (Array.isArray(parsed.items)) setItems(parsed.items);
    } catch {
      // Si falla parseo, ignoramos y arrancamos limpio
    }
  }, []);

  // Guardar automáticamente
  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ tripName, groupByType, items })
    );
  }, [tripName, groupByType, items]);

  const totalWeightG = useMemo(
    () =>
      items.reduce((acc, item) => {
        const weight = Number(item.weight) || 0;
        const qty = Number(item.qty) || 0;
        return acc + weight * qty;
      }, 0),
    [items]
  );


  const grouped = useMemo(() => {
    if (!groupByType) {
      return [
        {
          category: "Todos",
          icon: "inventory_2",
          items,
        },
      ];
    }

    return CATEGORY_OPTIONS.map((cat) => ({
      category: cat,
      icon: categoryIcon(cat),
      items: items.filter((item) => item.category === cat),
    })).filter((group) => group.items.length > 0);
  }, [groupByType, items]);

  const addItem = () => {
    const name = newItemName.trim();
    if (!name) return;

    const newItem = {
      id: uid(),
      name,
      category: CATEGORY_OPTIONS[0],
      weight: "", // vacío al crear
      qty: 1,
      checked: false,
    };

    setItems((prev) => [...prev, newItem]);
    setNewItemName("");
  };

  const updateItem = (id, patch) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...patch } : item))
    );
  };

  const removeItem = (id) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const clearAll = () => {
    setItems([]);
  };

  const listTitle = tripName.trim() || "Nueva lista";

  return (
    <div className="bg-background-light dark:bg-background-dark min-h-screen text-slate-900 dark:text-slate-100">
      <nav className="sticky top-0 z-50 bg-white/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2 text-primary">
              <span className="material-symbols-outlined text-2xl font-bold">
                backpack
              </span>
              <span className="text-lg font-bold tracking-tight text-slate-900 dark:text-white">
                Mochilista
              </span>
            </div>
            <div className="hidden md:flex items-center gap-6">
              <a className="text-xs font-semibold text-primary" href="#">
                Mis Listas
              </a>
              <a
                className="text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-primary transition-colors"
                href="#"
              >
                Explorar
              </a>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={clearAll}
              className="text-xs font-medium text-slate-500 hover:text-red-500 transition-colors"
              type="button"
            >
              Vaciar lista
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-6 py-8">
        <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="min-w-0">
            <nav className="flex items-center gap-2 text-xs text-slate-500 mb-2">
              <a className="hover:text-primary" href="#">
                Mis Listas
              </a>
              <span className="material-symbols-outlined text-[10px]">
                chevron_right
              </span>
              <span className="text-slate-900 dark:text-white font-medium truncate">
                {listTitle}
              </span>
            </nav>

            <div className="flex flex-col gap-2">
              <input
                value={tripName}
                onChange={(e) => setTripName(e.target.value)}
                placeholder="Nombre de la lista (ej. Viaje a Noruega)"
                className="text-2xl font-extrabold tracking-tight bg-transparent outline-none border-b border-transparent focus:border-primary w-full md:w-[420px] placeholder:text-slate-400"
              />

              <div className="flex items-center gap-2 px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-full w-fit">
                <span className="material-symbols-outlined text-sm text-slate-500">
                  weight
                </span>
                <span className="text-sm font-bold text-slate-700 dark:text-slate-300">
                  {toKgLabel(totalWeightG)}
                </span>
                <span className="text-[10px] text-slate-400 font-medium">
                  Peso total
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 mr-4 bg-slate-50 dark:bg-slate-900/50 p-1 rounded-lg border border-slate-200 dark:border-slate-800">
              <span className="text-[11px] font-semibold text-slate-500 px-2 uppercase tracking-wider">
                Agrupar por tipo
              </span>
              <button
                type="button"
                onClick={() => setGroupByType((v) => !v)}
                className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${groupByType ? "bg-primary" : "bg-slate-300 dark:bg-slate-600"
                  }`}
                aria-pressed={groupByType}
                aria-label="Agrupar por tipo"
              >
                <span
                  className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${groupByType ? "translate-x-4" : "translate-x-0"
                    }`}
                />
              </button>
            </div>

            <button
              type="button"
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-white hover:bg-blue-700 transition-all font-bold text-sm shadow-md shadow-primary/10"
            >
              <span className="material-symbols-outlined text-lg leading-none">
                save
              </span>
              Guardado automático
            </button>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900/50 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
          {items.length === 0 ? (
            <div className="px-6 py-10 text-center">
              <span className="material-symbols-outlined text-4xl text-slate-300 dark:text-slate-600">
                inventory_2
              </span>
              <p className="mt-3 text-sm text-slate-500">
                Tu lista está vacía. Añade tu primer objeto abajo.
              </p>
            </div>
          ) : (
            grouped.map((group) => {
              const groupWeight = group.items.reduce((acc, item) => {
                const weight = Number(item.weight) || 0;
                const qty = Number(item.qty) || 0;
                return acc + weight * qty;
              }, 0);

              return (
                <div key={group.category}>
                  <div className="bg-slate-50/80 dark:bg-slate-800/50 px-4 py-2 flex items-center justify-between border-y border-slate-200 dark:border-slate-800">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-sm text-slate-400">
                        {group.icon}
                      </span>
                      <span className="text-[11px] font-bold uppercase tracking-widest text-slate-500">
                        {group.category}
                      </span>
                    </div>
                    <span className="text-[11px] font-medium text-slate-400">
                      {group.items.length} objeto
                      {group.items.length !== 1 ? "s" : ""} •{" "}
                      {toKgLabel(groupWeight)}
                    </span>
                  </div>

                  <div className="divide-y divide-slate-100 dark:divide-slate-800">
                    {group.items.map((item) => (
                      <div
                        key={item.id}
                        className="group flex items-center px-4 py-2.5 hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors gap-4"
                      >
                        <div className="flex items-center shrink-0">
                          <input
                            checked={item.checked}
                            onChange={(e) =>
                              updateItem(item.id, { checked: e.target.checked })
                            }
                            className="custom-checkbox w-4 h-4 rounded border-slate-300 dark:border-slate-600 text-primary focus:ring-primary/20 cursor-pointer"
                            type="checkbox"
                          />
                        </div>

                        <div className="flex-1 min-w-0">
                          <input
                            value={item.name}
                            onChange={(e) =>
                              updateItem(item.id, { name: e.target.value })
                            }
                            className="text-sm font-bold text-primary bg-transparent outline-none border-b border-transparent focus:border-primary w-full"
                            placeholder="Nombre del objeto"
                          />
                        </div>

                        <div className="flex items-center gap-3 shrink-0">
                          <div className="relative flex items-center">
                            <span className="material-symbols-outlined absolute left-2 text-sm text-slate-400 pointer-events-none">
                              {categoryIcon(item.category)}
                            </span>
                            <select
                              value={item.category}
                              onChange={(e) =>
                                updateItem(item.id, { category: e.target.value })
                              }
                              className="pl-7 pr-8 py-1 bg-transparent border-slate-200 dark:border-slate-700 rounded-md text-[11px] font-medium text-slate-600 dark:text-slate-400 focus:ring-1 focus:ring-primary focus:border-primary appearance-none min-w-[140px]"
                            >
                              {CATEGORY_OPTIONS.map((cat) => (
                                <option key={cat} value={cat}>
                                  {cat}
                                </option>
                              ))}
                            </select>
                            <span className="material-symbols-outlined absolute right-1.5 text-xs text-slate-400 pointer-events-none">
                              expand_more
                            </span>
                          </div>

                          <div className="flex items-center gap-1.5">
                            <input
                              className="compact-input w-20 px-2 py-1 text-right text-xs font-semibold bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded focus:ring-1 focus:ring-primary focus:border-primary transition-all"
                              type="number"
                              min="0"
                              step="1"
                              value={item.weight}
                              onChange={(e) =>
                                updateItem(item.id, { weight: e.target.value })
                              }
                              placeholder="0"
                            />
                            <span className="text-[10px] font-bold text-slate-400 uppercase">
                              g
                            </span>
                          </div>

                          <div className="flex items-center border border-slate-200 dark:border-slate-700 rounded-md bg-white dark:bg-slate-900 p-0.5">
                            <button
                              type="button"
                              onClick={() =>
                                updateItem(item.id, {
                                  qty: Math.max(1, (Number(item.qty) || 1) - 1),
                                })
                              }
                              className="w-6 h-6 flex items-center justify-center text-slate-400 hover:text-primary transition-colors"
                            >
                              <span className="material-symbols-outlined text-sm">
                                remove
                              </span>
                            </button>
                            <span className="w-6 text-center text-xs font-bold text-slate-700 dark:text-slate-300">
                              {item.qty || 1}
                            </span>
                            <button
                              type="button"
                              onClick={() =>
                                updateItem(item.id, {
                                  qty: Math.max(1, (Number(item.qty) || 1) + 1),
                                })
                              }
                              className="w-6 h-6 flex items-center justify-center text-slate-400 hover:text-primary transition-colors"
                            >
                              <span className="material-symbols-outlined text-sm">
                                add
                              </span>
                            </button>
                          </div>

                          <button
                            type="button"
                            onClick={() => removeItem(item.id)}
                            className="text-slate-300 hover:text-red-500 transition-all opacity-0 group-hover:opacity-100 flex items-center justify-center w-8"
                            title="Eliminar"
                          >
                            <span className="material-symbols-outlined text-lg">
                              delete
                            </span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })
          )}

          <div className="px-4 py-3 bg-slate-50/20 dark:bg-slate-800/10 border-t border-slate-200 dark:border-slate-800">
            <div className="relative flex items-center group">
              <span className="material-symbols-outlined absolute left-3 text-primary text-lg">
                add
              </span>
              <input
                value={newItemName}
                onChange={(e) => setNewItemName(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") addItem();
                }}
                className="w-full pl-10 pr-24 py-2 bg-white dark:bg-slate-800 border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:border-primary focus:ring-0 focus:border-solid transition-all outline-none placeholder:text-slate-400"
                placeholder="Añadir nuevo objeto..."
                type="text"
              />
              <div className="absolute right-3 flex items-center gap-2">
                <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-semibold text-slate-400 bg-slate-100 dark:bg-slate-700 rounded border border-slate-200 dark:border-slate-600">
                  ENTER
                </kbd>
                <button
                  type="button"
                  onClick={addItem}
                  className="text-xs font-semibold text-primary hover:opacity-80"
                >
                  Añadir
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-end items-center gap-4 text-xs text-slate-500 bg-white dark:bg-slate-900/40 px-6 py-4 rounded-xl border border-slate-200 dark:border-slate-800">
          <button className="hover:text-primary transition-colors font-medium">
            Exportar Lista
          </button>
          <span className="text-slate-200 dark:text-slate-700">|</span>
          <button className="hover:text-primary transition-colors font-medium">
            Compartir
          </button>
        </div>
      </main>

      <div className="md:hidden fixed bottom-6 right-6">
        <button
          type="button"
          onClick={addItem}
          className="w-12 h-12 bg-primary text-white rounded-full shadow-xl flex items-center justify-center hover:scale-105 transition-transform active:scale-95"
          title="Añadir objeto"
        >
          <span className="material-symbols-outlined">add</span>
        </button>
      </div>
    </div>
  );
}