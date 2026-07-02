import type { EsenceOptions, SmelltOptions } from "../Types";
import espc from "../../../assets/espec.png";
import bauni from "../../../assets/bauni.png";
import cappu from "../../../assets/cappu.png";
import citri from "../../../assets/citricos.png";
import choco from "../../../assets/chocolate.png";

export const ESSENCE_ICON_BY_ID: Partial<Record<EsenceOptions, string>> = {
  "Especiarias Exóticas": espc,
  Baunilha: bauni,
  Cappuccino: cappu,
  "LARANJA E FLOR DE MIMOSA": citri,
  Chocolate: choco,
};

export function resolveSmellIcon(_id: SmelltOptions, fallback?: string): string | undefined {
  return fallback;
}

export function resolveEssenceIcon(id: EsenceOptions, fallback?: string): string | undefined {
  return fallback ?? ESSENCE_ICON_BY_ID[id];
}
