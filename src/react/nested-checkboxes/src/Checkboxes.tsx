import * as React from 'react';
import './Checkboxes.css';

type CheckboxNode = {
  id: string;
  name: string;
  children?: CheckboxNode[];
};

export interface CheckboxesProps {
  defaultCheckboxData: CheckboxNode[];
}

export default function Checkboxes({ defaultCheckboxData }: CheckboxesProps) {
  const { parents, children } = React.useMemo(() => {
    const parents: { [key: string]: string | null } = {};
    const children: { [key: string]: string[] } = {};
    const buildTree = (node: CheckboxNode, parentId: string | null = null) => {
      if (parentId) parents[node.id] = parentId;
      if (node.children) {
        children[node.id] = node.children.map(child => child.id);
        node.children.forEach(child => buildTree(child, node.id));
      }
    };
    defaultCheckboxData.forEach(root => buildTree(root));
    return { parents, children };
  }, [defaultCheckboxData]);

  const initialState: { [key: string]: number } = {};
  Object.keys(parents).concat(Object.keys(children)).forEach(id => {
    initialState[id] = 0;
  });
  defaultCheckboxData.forEach(node => { initialState[node.id] = 0; });

  const [state, dispatch] = React.useReducer(reducer, initialState);

  const handleToggle = (id: string) => {
    dispatch({ type: 'TOGGLE', payload: { id, parents, children } });
  };

  const Checkbox: React.FC<{ node: CheckboxNode }> = ({ node }) => (
    <div style={{ marginLeft: 20 }}>
      <label>
        <input
          type="checkbox"
          checked={state[node.id] === 1}
          ref={input => {
            if (input && state[node.id] === 2) input.indeterminate = true
          }}
          onChange={() => handleToggle(node.id)}
        />
        {node.name}
      </label>
      {node.children && (
        <div className="child-group">
          {node.children.map(child => (
            <Checkbox key={child.id} node={child} />
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className="nested-checkboxes-root">
      {defaultCheckboxData.map(node => (
        <Checkbox key={node.id} node={node} />
      ))}
    </div>
  );
}

function reducer(state: any, action: { type: any; payload: { id: any; parents: any; children: any; }; }) {
  switch (action.type) {
    case 'TOGGLE': {
      const { id, parents, children } = action.payload;
      const draft = { ...state };

      // Toggle the clicked node
      draft[id] = draft[id] === 1 ? 0 : 1;

      // Propagate to children
      const updateChildren = (nodeId: string | number, value: any) => {
        (children[nodeId] || []).forEach((childId: string | number) => {
          draft[childId] = value;
          updateChildren(childId, value);
        });
      };
      updateChildren(id, draft[id]);

      // Update parents recursively
      const updateParents = (nodeId: string | number) => {
        const parentId = parents[nodeId];
        if (!parentId) return;
        const childIds = children[parentId] || [];
        const sum = childIds.reduce((acc: number, cid: string | number) => acc + (draft[cid] === 1 ? 2 : draft[cid] === 2 ? 1 : 0), 0);
        const full = childIds.length * 2;

        if (sum === 0) draft[parentId] = 0;
        else if (sum === full) draft[parentId] = 1;
        else draft[parentId] = 2;

        updateParents(parentId);
      };
      updateParents(id);

      return draft;
    }
    default:
      return state;
  }
}
