import React from 'react'
import type { SmelltOptions } from './Types';

type SmellAndAditivePros = {
    step:number
}

function SmellAndAditive({step}:SmellAndAditivePros) {

  const SMELL_OPTIONS: { id: SmelltOptions; name: string; description: string }[] = [
  {
    id: "none",
    name: "Sem fragrância",
    description: "Versão neutra, sem adição de aroma.",
  },
  {
    id: "doce-de-cenoura",
    name: "Doce de Cenoura",
    description:
      "Aroma quente e reconfortante, com notas suaves de especiarias e baunilha.",
  },
  {
    id: "cereja-doce",
    name: "Cereja Doce",
    description: "Frutado e vibrante, com toque gourmand e feminino.",
  },
  {
    id: "canela-e-acucar",
    name: "Canela e Açúcar",
    description:
      "Doce e envolvente, com aquele aroma acolhedor típico de inverno.",
  },
  {
    id: "caramelo-brulee",
    name: "Caramelo Brûlée",
    description: "Cremoso e sofisticado — mistura de baunilha e açúcar tostado.",
  },
  {
    id: "avela-cremosa",
    name: "Avelã Cremosa",
    description: "Notas suaves e doces, com toque amendoados irresistível.",
  },
  {
    id: "coco-tropical",
    name: "Coco Tropical",
    description:
      "Fresco e exótico, com um leve toque cítrico de lima.",
  },
  {
    id: "flor-de-mimosa",
    name: "Flor de Mimosa",
    description:
      "Floral, delicado e elegante — uma fragrância leve e feminina.",
  },
  {
    id: "menta-fresca",
    name: "Menta Fresca",
    description:
      "Refrescante e limpa, ideal para quem adora sensação de frescor nos lábios.",
  },
  {
    id: "pessego-doce",
    name: "Pêssego Doce",
    description:
      "Frutado e suave, com aquele toque de verão e leveza.",
  },
  {
    id: "champanhe-rose",
    name: "Champanhe Rosé",
    description:
      "Elegante e festivo, com notas frutadas e cintilantes.",
  },
  {
    id: "framboesa-chocolate",
    name: "Framboesa & Chocolate",
    description:
      "Irresistivelmente doce e sensual — mistura perfeita entre fruta e tentação.",
  },
  {
    id: "licor-de-anis",
    name: "Licor de Anis",
    description:
      "Aroma marcante e sofisticado, levemente doce e exótico.",
  },
  ];

  return (
    <div>
        {step === 4 && 
        <>
        teste
        </>
        }
    </div>
  )
}

export default SmellAndAditive