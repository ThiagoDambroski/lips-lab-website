import React from "react";
import type { GlittersOptions } from "./Types";
import { useApp } from "../../Contexts/AppProvider";

type GlitterBaseType = {
  step: number;
  glitterSelected: GlittersOptions;
  setGlitterSelected: React.Dispatch<React.SetStateAction<GlittersOptions>>;
  type: string;
  baseSelected: string;
  setBaseSelected: React.Dispatch<React.SetStateAction<string>>;
};

function GlitterBaseSelection({
  step,
  glitterSelected,
  setGlitterSelected,
  type,
  baseSelected,
  setBaseSelected,
}: GlitterBaseType) {


  const {glitterOptions,dustOptions,baseBatom,baseGloss} = useApp()

  

  return (
    <div>
    
      {step === 2 && (
        <div>
          <p
            onClick={() => setGlitterSelected("none")}
            style={{
              backgroundColor: glitterSelected === "none" ? "green" : "",
              cursor: "pointer",
            }}
          >
            None
          </p>

          <p>Glitter</p>
          <ul>
            {glitterOptions.map((g) => (
              <li
                key={g}
                onClick={() => setGlitterSelected(g)}
                style={{
                  backgroundColor: glitterSelected === g ? "green" : "",
                  cursor: "pointer",
                }}
              >
                {g}
              </li>
            ))}
          </ul>

          <p>Dust</p>
          <ul>
            {dustOptions.map((d) => (
              <li
                key={d}
                onClick={() => setGlitterSelected(d)}
                style={{
                  backgroundColor: glitterSelected === d ? "green" : "",
                  cursor: "pointer",
                }}
              >
                {d}
              </li>
            ))}
          </ul>
        </div>
      )}

   
      {step === 3 && (
        <div>
          <p
            style={{
              backgroundColor: baseSelected === "none" ? "green" : "",
              cursor: "pointer",
            }}
            onClick={() => setBaseSelected("none")}
          >
            None
          </p>
          {type === "batom" && (
            <ul>
              {baseBatom.map((b) => (
                <li
                  key={b.id}
                  onClick={() => setBaseSelected(b.id)}
                  style={{
                    backgroundColor: baseSelected === b.id ? "green" : "",
                  }}
                >
                  <strong>{b.name}</strong>
                  <p>
                    {b.description}
                  </p>
                </li>
              ))}
            </ul>
          )}
          {type === "gloss" && (
            <ul>
              {baseGloss.map((b) => (
                <li
                  key={b.id}
                  onClick={() => setBaseSelected(b.id)}
                  style={{
                    backgroundColor: baseSelected === b.id ? "green" : "",
                   
                  }}
                >
                  <strong>{b.name}</strong>
                  <p>
                    {b.description}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}

export default GlitterBaseSelection;
