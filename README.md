# JavaScript full-stack server side rendering playground.
write how to ssr prefetch

- [x] React (hooks)
- [x] Redux (witch Redux Toolkit)
- [x] Redux dev tools SSR support
- [x] SSR
- [x] Node
- [x] Express
- [x] MongoDB
- [ ] TypeScript
- [x] ES6 syntax
- [x] Webpack
- [ ] Production webpack
- [ ] Docker mongo + server
- [x] .env
- [x] auth user with passport.js (Google, Facebook)
- [x] styled components

## TODO:
- [ ] clear dependencies
- [ ] linters
- [ ] css grid


### Postgres

Image: `docker run --name postgres -e POSTGRES_PASSWORD=admin -d -p 5432:5432 postgres`

Enter to docker db: `docker exec -it postgres psql -U postgres`

### Project structure

```
src
├── client # React application
│   ├── components # React components
|   ├── pages # Application pages used in routing
|   ├── client.tsx # entry point of React application, coresponding with renderer.tsx helper on server side
|   ├── rootReducer.ts # Redux root reducer including all reducers
|   └── Routes.tsx # Application routing with SSR prerendering logic
├── helpers # SSR helpers used in index.ts
│   ├── createStore.ts # Redux create store function used on server side
│   ├── renderer.tsx # SSR with main html template, SEO etc. coresponding with client.tsx on client side
│   └── session.ts # Passport.js session logic

│   └── ...
│       ├── ...
│       ├── ...
│       │   ├── ...
├── schema # GraphQL 

```
