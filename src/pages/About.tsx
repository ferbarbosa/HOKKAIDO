import React, { Component } from 'react'
import { Routes, Route, Link } from "react-router-dom";

export default class About extends Component {
  render() {
    return (
      <div>

        <main>
            <h2>Who are we?</h2>
            <p>
            That feels like an existential question, don't you
            think?
            </p>
        </main>
        <nav>
            <Link to="/">Home</Link>
        </nav>

      </div>
    )
  }
}