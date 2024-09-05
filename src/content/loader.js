import React from 'react'
import ReactDOM from 'react-dom';
import Content from './Content';
import '../index.css'

const div = document.createElement("div")
div.id = "root2"
document.body.appendChild(div)

ReactDOM.render(<Content />, document.getElementById("root2"))