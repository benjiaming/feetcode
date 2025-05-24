File Explorer App 

Requirements:
* The names of the directories/files should be displayed.

Directories:
* Contents of the directory should be displayed in a manner that indicates it belongs within the directory. The recommended approach is to indent the contents to the right.
* Directories can be expanded and collapsed. Clicking on a directory should toggle its expanded/collapsed state.
* Directories should appear before files. All the items should be sorted alphabetically within their respective categories.
* You may style the expand/collapse functionality in a way you prefer as long as it is clear that the item is a directory and whether it is in the expanded or collapsed state.
* Directories can be empty.

Files:
* Files are not expandable and cannot be interacted with.

The focus of the exercise is on the functionality and not the styling.

Data format
```typescript
interface FileObject {
  id: number;
  name: string;
  children?: FileObject[];
}
```

Run: `npx vite src/react/file-explorer/`


