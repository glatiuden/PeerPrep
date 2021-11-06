const { Nuxt, Builder } = require("nuxt");
const nuxtConfig = require("../nuxt.config.js");
import Vuetify from "vuetify";
import Vuex from "vuex";
import { createLocalVue, mount, shallowMount } from "@vue/test-utils";

import BaseEloMatchDialog from "@/components/Match/BaseEloMatchDialog";
const localVue = createLocalVue();
localVue.use(Vuex);

let nuxt = null;

beforeAll(async () => {
  nuxt = new Nuxt({
    ...nuxtConfig,
    server: { port: 3001 },
    buildDir: ".nuxt-build-jest",
  });

  let vuetify = new Vuetify();

  wrapper = mount(BaseEloMatchDialog, {
    store: new Vuex.Store({
      state: { "match/open_elo_match_dialog": false },
    }),
    localVue,
    vuetify,
  });

  await new Builder(nuxt).build();
  await nuxt.server.listen(3001, "localhost");
}, 300000);

// Example of testing only generated html
describe("GET /", () => {
  test("Route / exits and render HTML", async () => {
    const { html } = await nuxt.server.renderRoute("/", {});
    expect(html).toContain("Vuetify");
  });
});
// Close server and ask nuxt to stop listening to file changes
afterAll(() => {
  nuxt.close();
});
