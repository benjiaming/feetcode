import { useState, useCallback } from 'react';
import './FileExplorer.css';

type NodeType = {
    id: string | number;
    name: string;
    children?: NodeType[];
};

type DataNodeProps = {
    node: NodeType;
    level: number;
    visibility: Set<string | number>;
    toggle: (id: string | number) => void;
    onClickFile?: (file: NodeType) => void;
};

const DataNode = ({ node, level, visibility, toggle, onClickFile }: DataNodeProps) => {
    const nodeClassName = node.children ? 'bold' : '';
    const sign = visibility.has(node.id) ? '-' : '+';
    const Spacer = () => <span style={{ marginLeft: level * 10 + 'px' }} />;
    const Expand = () => node.children ? <>[ {sign} ]</> : <></>;
    const handleClick = () => {
        if (node.children) {
            toggle(node.id);
        } else if (onClickFile) {
            onClickFile(node);
        }
    };
    return (
        <li className={nodeClassName}>
            <button onClick={handleClick}>
                <Spacer /> {node['name']} <Expand />
            </button>
        </li>
    );
};

const Nodes = ({ node, level, visibility, toggle, onClickFile }: DataNodeProps) => {
    if (!node.children) {
        return <DataNode key={node.id} node={node} level={level} visibility={visibility} toggle={toggle} onClickFile={onClickFile} />;
    }

    const sortedChildren = node.children.sort((a, b) => a.name.localeCompare(b.name));
    const result = [];

    result.push(
        <DataNode key={node.id} node={node} level={level} visibility={visibility} toggle={toggle} onClickFile={onClickFile} />
    );
    if (visibility.has(node.id)) {
        sortedChildren.forEach(d => {
            result.push(
                <Nodes key={d.id} node={d} level={level + 1} visibility={visibility} toggle={toggle} onClickFile={onClickFile} />
            );
        });
    }
    return <>{result}</>;
};

type FileExplorerProps = {
    data: NodeType[];
    onClick?: (file: NodeType) => void;
};

export default function FileExplorer({ data, onClick }: FileExplorerProps) {
    const nodes: any[] = [];

    const [visibility, setVisibility] = useState<Set<string | number>>(new Set());

    const toggle = useCallback((id: string | number) => {
        setVisibility(prev => {
            const next = new Set(prev);
            next.has(id) ? next.delete(id) : next.add(id);
            return next;
        });
    }, []);

    const queue: any[] = [];
    data.sort((a, b) => a.name.localeCompare(b.name)).forEach(d => {
        if (d.children) {
            nodes.push(
                <Nodes key={d.id} node={d} level={0} visibility={visibility} toggle={toggle} onClickFile={onClick} />
            );
        } else {
            queue.push(
                <Nodes key={d.id} node={d} level={0} visibility={visibility} toggle={toggle} onClickFile={onClick} />
            );
        }
    });
    return (
        <div className='file-explorer-root'>
            <ul>
                {nodes}
                {queue}
            </ul>
        </div>
    );
}
