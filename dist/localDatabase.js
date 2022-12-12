// Mock database tables
const posts = new Map();
const users = new Map();
// Seed initial posts
posts.set(1, { id: "1", authorID: "1", title: 'First post', body: 'Lorem Ipsum...', published: true, views: 100 });
posts.set(2, { id: "2", authorID: "1", title: 'Second post', body: 'Lorem Ipsum...', published: false, views: 0 });
posts.set(3, { id: "3", authorID: "2", title: 'Third post', body: 'Lorem Ipsum Bobum...', published: false, views: 27 });
posts.set(4, { id: "4", authorID: "2", title: 'Fourth post', body: 'Lorem Ipsum Bobum...', published: true, views: 42 });
// Seed initial users
users.set(1, { id: "1", firstName: 'Alice', lastName: 'Foo', age: 38, email: null });
users.set(2, { id: "2", firstName: 'Bob', lastName: 'Bar', age: 27, email: null });
// Export the seeded tables
const localDatabase = {
    posts,
    users,
};
export default localDatabase;
