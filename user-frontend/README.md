# PeerPrep User Frontend
We are using [Nuxt.js](https://nuxtjs.org/) for our frontend, which is a framework of [Vue](https://vuejs.org/).

Hence, whatever can be done in Vue can be done in Nuxt. If you need to Google, e.g. error, how to do..., you can search it as Vue as well.
Likewise, for the tutorials, Vue tutorials are also applicable to Nuxt framework as well.

## Build Setup
For a detailed explanation of how things work, check out the [documentation](https://nuxtjs.org).
```bash
# install dependencies
$ yarn install

# serve with hot reload at localhost:8082
$ yarn dev
```

## Main structure of PeerPrep User Frontend

We will be mainly touching these 4 folders
For UI,
- Pages 
- Components

For logic/interaction with backend,
- Store
- Mixins

We are using [Vuetify](https://vuetifyjs.com/en/) as our UI framework. It is a very powerful and easy to style framework. Any component found on the website can be directly imported into your page/component.

Dive into each of the folders, 

### `pages`

This directory contains your application views and routes. Nuxt will read all the `*.vue` files inside this directory and set up Vue Router automatically.

E.g. You created a file called `question.vue`. Nuxt will set up the page routing for you, and you will be able to access your page via `http://localhost:8082/question`.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/get-started/routing).

### `components`

The components directory contains your Vue.js components. Components make up the different parts of your page and can be reused and imported into your pages, layouts and even other components.

Ideally, we try not to overcrowd the page. We will separate each component of the page into its own Vue file, and it can promote reusability if required to be used on another page.

If in doubt, I highly recommend just create a component for each part of your page and import it into your page.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/components).

### `store`

This directory contains your Vuex store files. Creating a file in this directory automatically activates Vuex.

So what is `Vuex`? It is similar to the Flux architecture structured as went through in the lecture. It is a variation of MV* pattern which is modelled as a "single" flow.

#### Setup store
- Ideally, copy the `editor` folder.
- Within each subfolder (e.g. `editor`), there are 5 files
  1. `action-type.ts` -> An enum that describes what the action method should do.
  2. `actions.ts` -> Actions which will interact with your backend services. Please reference the examples and [this link](https://axios.nuxtjs.org/usage) and see how it works as I'll not go into the specific details of what parameters or what each Axios method can do.
  - `CREATE` is `$post`, `DELETE` is `$delete`, `UPDATE` is `$put` and GET is `$get`.
  - Side Note: **ONLY** includes actions which a normal user can do. So, methods such as `hard/soft-delete`, `update` (depending on which service) should not be defined on the user frontend. Those methods should be exclusive to the admin frontend.
  3. `getters.ts` -> Allows your variables to read the value from the store. 
  4. `index.ts` -> Define the variables for your store.
  5. `mutation-types.ts` -> An enum that describes what kind of data mutation can a user perform.
  6. `mutations.ts` -> Contains mutation methods that will set/change the values of your variables defined in your `index.ts`.

This is a brief overview. By copying the `editor` folder and changing it to your respective service should suffice.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/store).

### `mixins`
Similar to components (for reusing of UI), methods can be reused as well by using mixin.

Ideally, most logic such as data manipulation or data handling should be done in the mixin. We call it the "brain" of the page. It abstracts away all the logic-related methods.

More information about the usage of this directory in [the documentation](https://vuejs.org/v2/guide/mixins.html).

## Other special directories

You can create the following extra directories, some of which have special behaviours. This is for your own reading if you are interested.

### `assets`

The assets directory contains your uncompiled assets such as Stylus or Sass files, images, or fonts.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/assets).

### `layouts`

Layouts are a great help when you want to change the look and feel of your Nuxt app, whether you want to include a sidebar or have distinct layouts for mobile and desktop.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/layouts).

### `plugins`

The plugins directory contains JavaScript plugins that you want to run before instantiating the root Vue.js Application. This is the place to add Vue plugins and to inject functions or constants. Every time you need to use `Vue.use()`, you should create a file in `plugins/` and add its path to plugins in `nuxt.config.js`.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/plugins).

### `static`

This directory contains your static files. Each file inside this directory is mapped to `/`.

Example: `/static/robots.txt` is mapped as `/robots.txt`.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/static).
