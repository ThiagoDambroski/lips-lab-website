import sparks from "../../../assets/sparks.svg";
import star from "../../../assets/star.svg";
import heart from "../../../assets/heart.svg";
import flower from "../../../assets/flower.svg";
import lipsIcon from "../../../assets/libs icon.svg";
import infinity from "../../../assets/inifity.svg";
import aries from "../../../assets/aries.svg";
import taurus from "../../../assets/taurus.svg";
import gemini from "../../../assets/gemini.svg";
import cancer from "../../../assets/cancer.svg";
import leo from "../../../assets/leo.svg";
import virgo from "../../../assets/virgo.svg";
import libra from "../../../assets/libra.svg";
import scorpio from "../../../assets/scorpio.svg";
import sagittarius from "../../../assets/sagittarius.svg";
import capricornio from "../../../assets/capricornio.svg";
import aquarius from "../../../assets/aquarius.svg";
import peixe from "../../../assets/peixe.svg";

export type SymbolOption = {
  id: string;
  img: string;
};

export const SYMBOL_OPTIONS: SymbolOption[] = [
  { id: "sparks", img: sparks },
  { id: "star", img: star },
  { id: "heart", img: heart },
  { id: "flower", img: flower },
  { id: "lips", img: lipsIcon },
  { id: "infinity", img: infinity },
  { id: "aries", img: aries },
  { id: "taurus", img: taurus },
  { id: "gemini", img: gemini },
  { id: "cancer", img: cancer },
  { id: "leo", img: leo },
  { id: "virgo", img: virgo },
  { id: "libra", img: libra },
  { id: "scorpio", img: scorpio },
  { id: "sagittarius", img: sagittarius },
  { id: "capricornio", img: capricornio },
  { id: "aquarius", img: aquarius },
  { id: "peixes", img: peixe },
];

export function findSymbolImage(symbolId: string): string | undefined {
  return SYMBOL_OPTIONS.find((symbol) => symbol.id === symbolId)?.img;
}
