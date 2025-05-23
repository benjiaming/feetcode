import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Accordion from './Accordion'

const data = {
  HTML: `The HyperText Markup Language or HTML is the
    standard markup language for documents designed to
    be displayed in a web browser.`,
  CSS: `Cascading Style Sheets is a style sheet language
    used for describing the presentation of a document
    written in a markup language such as HTML or XML.`,
  JavaScript: `JavaScript, often abbreviated as JS, is a
    programming language that is one of the core
    technologies of the World Wide Web, alongside HTML
    and CSS.`,
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Accordion data={data} />
  </StrictMode>,
)
