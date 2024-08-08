import { useState } from "react";
import "./App.css";
import ColorPicker from "./Picker";

function App() {
  const [color, setColor] = useState(
    "linear-gradient(90deg, rgba(96,93,93,1) 0%, rgba(255,255,255,1) 100%)"
  );

  return (
    <div style={{overflow:"hidden"}}>
      <ColorPicker
        value={color}
        onChange={setColor}

        hidePresets
        hideOpacity
        hideAdvancedSliders
        hideColorGuide
        hideGradientControls
      />
    </div>
  );
}

export default App;
