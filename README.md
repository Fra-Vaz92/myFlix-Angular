# MyFlixAngularClient

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.0.6.


## Installation

1) **Install Dependencies**
   Ensure you have Node.js (v20 or higher) and npm (v10 or higher) installed.
```
npm install
```

2) **Angular CLI** If you haven't installed Angular CLI:
```
npm install -g @angular/cli
```
3) Add Angular gh-pages
```
ng add angular-cli-ghpages
```

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Component generation

Angular CLI includes powerful code tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Key Features
- Welcome View: Users can log in or register.
- Movie Dashboard: Authenticated users can view a list of movies.
- Single Movie View:
  - A button to display movie summary.
  - A button to view director information.
  - A button to view genre details.
- User Profile:
  - Update user information.
  - Deregister account.
- Favorite Movies:
    - Add or remove movies from favorites.
    - Filter movies to show only favorites.

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Documentation
TypeDoc are used for code documentation.

To generate the documentation:
```
npx typedoc --out docs src/
```
Open the docs folder to view the generated API documentation.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
