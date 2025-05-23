import { useState } from 'react'
import './Accordion.css'

type AccordionData = Record<string, string>;

interface AccordionProps {
  data: AccordionData;
}

export default function Accordion({ data }: AccordionProps) {
  const [selected, setSelected] = useState('');

  const handleClick = (key: string) => {
    setSelected(prev => (prev === key ? '' : key));
  };

  type DataKey = keyof typeof data;
  const elements = (Object.keys(data) as DataKey[]).map(key => (
    <div key={key}>
      <button
        className="accordionTitle"
        aria-expanded={key === selected}
        aria-controls={`section-${key}`}
        id={`accordion-${key}`}
        onClick={() => handleClick(key)}
      >
        <span>{key} </span>
        <span
          aria-hidden="true"
          className={key === selected ? "accordion-icon accordion-icon--rotated" : "accordion-icon"}
        />
      </button>
      <div
        id={`section-${key}`}
        role="region"
        aria-labelledby={`accordion-${key}`}
        style={{ display: key === selected ? 'block' : 'none' }}
      >
        {data[key]}
      </div>
    </div>
  ));

  return <div className="accordion">{elements}</div>;
}
