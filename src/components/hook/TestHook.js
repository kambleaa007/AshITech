import React from "react";
import { useState } from "react";

export default function TestHook() {
  const [state, setState] = useState("initialState");

  return <div>Hook Rendered!!!</div>;
}
