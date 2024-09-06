import React from 'react'
import { createRoot } from 'react-dom/client';
import Content from './Content';
import '../index.css'

// const div = document.createElement("div")
// div.id = "root2"
// document.body.appendChild(div)

const root = createRoot(document.getElementById("root"));
root.render(<Content />);