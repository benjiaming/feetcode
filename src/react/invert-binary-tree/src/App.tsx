import { useState, useEffect, useRef } from "react";
import Tree from "react-d3-tree";

type TreeNode = {
  name: string;
  children?: TreeNode[];
};

const initialData: TreeNode = {
  name: "A",
  children: [
    {
      name: "B",
      children: [{ name: "D" }, { name: "E" }],
    },
    {
      name: "C",
      children: [{ name: "F" }, { name: "G" }],
    },
  ],
};

function invertTree(node: TreeNode | undefined): TreeNode | undefined {
  if (!node || !node.children) return node;

  const [left, right] = node.children;
  node.children = [invertTree(right), invertTree(left)].filter(
    Boolean
  ) as TreeNode[];
  return node;
}

export default function App() {
  const [data, setData] = useState<TreeNode>(initialData);
  const [translate, setTranslate] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      const { width, height } = containerRef.current.getBoundingClientRect();
      setTranslate({ x: width / 2, y: height / 4 });
    }
  }, []);

  const handleInvert = () => {
    const inverted = invertTree(structuredClone(data));
    setData(inverted!);
  };

  return (
    <div
      ref={containerRef}
      style={{ width: "100%", height: "100vh", position: "relative" }}
    >
      <div
        style={{
          position: "absolute",
          zIndex: 10,
          top: 24,
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          justifyContent: "center",
          width: "fit-content",
        }}
      >
        <button
          onClick={handleInvert}
          style={{
            padding: "8px 16px",
            backgroundColor: "#333",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            fontSize: "16px",
            fontWeight: "bold",
          }}
        >
          Invert Tree
        </button>
      </div>
      <Tree
        data={data}
        translate={translate}
        orientation="vertical"
        collapsible={true}
        enableLegacyTransitions={true}
        transitionDuration={500}
      />
    </div>
  );
}
