Nested checkboxes component displays a hierarchical structure of checkboxes. The component should handle parent-child relationships between checkboxes and manage their states efficiently.

Requirements:
* A checkbox's value is determined by the value of its direct children:
* When all children of a parent are checked, the parent should be checked.
* When some (but not all or none) children of a parent are checked, the parent should be in an indeterminate state, with a dash displayed within the box.
* When none of the children of a parent are checked, the parent is unchecked.
* If a parent checkbox is checked or unchecked, all the descendant checkboxes (not just direct children) will be updated with that new value.
* The focus of the exercise is on the functionality and not the styling. You may style the checkboxes in any way you prefer as long as the states are clear.

Data format:
```typescript
interface CheckboxItem {
  id: number;
  name: string;
  checked: boolean | 'indeterminate';
  children?: CheckboxItem[];
}
```
Run: `npx vite src/react/nested-checkboxes/`


