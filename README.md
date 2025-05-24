# feetcode 👣
Leetcode for FrontEnd

![feetcode](https://github.com/benjiaming/feetcode/actions/workflows/node.js.yml/badge.svg?branch=main)


## FE Interview Kit
Adapted from https://www.linkedin.com/feed/update/urn:li:activity:7330824884316504066/:

### Most important concepts to know:

- Data structures: Arrays, Maps, Stacks, Trees, Sets
- HTML: Semantic HTML, Form validation, Form submission
- CSS: Box model, Selectors, Specificity, Positioning, Units, Flexbox, Grid, CSS custom properties (variables)
- JavaScript​: Closures, Callbacks, Promise, async/await, this keyword
- DOM: DOM traversal, DOM creation, DOM manipulation, Accessing element/node properties, Event delegation
- Runtime APIs: setTimeout(), setInterval(), fetch()
- Accessibility: ARIA roles, States & properties, Keyboard interactions
- React: useState, useEffect, Props vs State

### Most important JavaScript questions:

| Topic           | Description                                  | Solution                                  |
|-----------------|----------------------------------------------|-------------------------------------------|
| Debounce        | [question](https://www.greatfrontend.com/interviews/study/gfe75/questions/javascript/debounce)                    | [solution](./src/javascript/debounce/debounce.ts)    |
| Classnames      | [question](https://www.greatfrontend.com/interviews/study/gfe75/questions/javascript/classnames)                   | [solution](./src/javascript/classnames/classnames.ts)|
| Flatten         | [question](https://www.greatfrontend.com/interviews/study/gfe75/questions/javascript/flatten)                   | [solution](./src/javascript/flatten/flatten.ts)      |
| Throttle        | [question](https://www.greatfrontend.com/interviews/study/gfe75/questions/javascript/throttle)                     | [solution](./src/javascript/throttle/throttle.ts)    |
| Promise.all     | [question](https://www.greatfrontend.com/interviews/study/gfe75/questions/javascript/promise-all)                    | [solution](./src/javascript/promise-all/promise-all.ts)|
| Deep Clone      | [question](https://www.greatfrontend.com/interviews/study/gfe75/questions/javascript/deep-clone)              | [solution](./src/javascript/deep-clone/deep-clone.ts)|
| Event Emitter   | [question](https://www.greatfrontend.com/interviews/study/gfe75/questions/javascript/event-emitter)                    | [solution](./src/javascript/event-emitter/event-emitter.ts)|
| Map Async Limit | [question](https://www.greatfrontend.com/interviews/study/gfe75/questions/javascript/map-async-limit)     | [solution](./src/javascript/map-async-limit/map-async-limit.ts)                  |
| Deep Equal      | [question](https://www.greatfrontend.com/interviews/study/gfe75/questions/javascript/deep-equal)  | [solution](./src/javascript/deep-equal/deep-equal.ts)
| Memoize         | [question](https://www.greatfrontend.com/interviews/study/gfe75/questions/javascript/memoize)  | [solution](./src/javascript/memoize/memoize.ts)
| Curry           | [question](https://www.greatfrontend.com/interviews/study/gfe75/questions/javascript/curry)                    | [solution](./src/javascript/curry/curry.ts)


### Most important React questions:

| Topic           | Description                                  | Solution                                  |
|-------------------|---------------------------------------------------|-------------------|
| Todo List         | [question](https://www.greatfrontend.com/questions/user-interface/todo-list/react?framework=react)                  | [solution](./src/react/todo/src/Todo.tsx)               |
| Contact Form      | [question](https://www.greatfrontend.com/questions/user-interface/contact-form/react?framework=react)                  | [solution](./src/react/contact-form/src/ContactForm.tsx)                  |
| Job Board         | [question](https://www.greatfrontend.com/interviews/study/gfe75/questions/user-interface/job-board)                  | [solution](./src/react/job-board/src/JobBoard.tsx)                  |
| Accordion         | [question](https://www.greatfrontend.com/interviews/study/gfe75/questions/user-interface/accordion)                  |  [solution](./src/react/accordion/src/Accordion.tsx)                 |
| Image Carousel    | [question](https://www.greatfrontend.com/interviews/study/gfe75/questions/user-interface/image-carousel)                  | [solution](./src/react/image-carousel/src/ImageCarousel.tsx)                  |
| Data Table        | [question](https://www.greatfrontend.com/interviews/study/gfe75/questions/user-interface/data-table)                  |  [solution](./src/react/data-table/src/DataTable.tsx)                 |
| File Explorer     | [question](https://www.greatfrontend.com/interviews/study/gfe75/questions/user-interface/file-explorer)                  | [solution](./src/react/file-explorer/src/FileExplorer.tsx)                  |
| Tic-tac-toe       | [question](https://www.greatfrontend.com/interviews/study/gfe75/questions/user-interface/tic-tac-toe)                  | [solution](./src/react/tic-tac-toe/src/TicTacToe.tsx)                  |
| Nested Checkboxes | [question](https://www.greatfrontend.com/interviews/study/gfe75/questions/user-interface/nested-checkboxes)                  | [solution](./src/react/nested-checkboxes/src/Checkboxes.tsx)                  |

## Demos

### JavaScript
Run: `npx bun src/javascript/[question]/[question]-demo.ts`

e.g.`npx bun src/javascript/debounce/debounce-demo.ts`

### React
Run: `npx vite src/react/[question]`

e.g. `npx vite src/react/data-table/`

### Tests

All tests: `npm run test`

JavaScript tests: `npm run test:javascript`

React tests: `npm run test:react`
