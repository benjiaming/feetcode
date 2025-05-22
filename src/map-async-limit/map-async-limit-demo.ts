import mapAsyncLimit from "./map-async-limit";

// Mocked async function to simulate API call
async function fetchUpperCase(q: string) {
    return new Promise<string>(resolve =>
        setTimeout(() => resolve(q.toUpperCase()), 500)
    );
}

async function testFetchUpperCase() {
    // Only a maximum of 2 pending requests at any one time.
    const results = await mapAsyncLimit(
        ['foo', 'bar', 'qux', 'quz'],
        fetchUpperCase,
        2,
    );
    console.log(results); // ['FOO', 'BAR', 'QUX', 'QUZ'];
}

testFetchUpperCase().catch(console.error);