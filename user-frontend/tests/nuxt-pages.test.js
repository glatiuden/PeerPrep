import BaseLanding from "@/components/Session/VueWebRTC";
import BaseChangePassword from "@/components/BaseChangePassword";
import { mount } from "@vue/test-utils";

describe("Component Mounted", () => {
  test("is a Vue instance", () => {
    const wrapper = mount(BaseLanding);
    expect(wrapper.vm).toBeTruthy();
  });

  test("is a Vue instance", () => {
    const wrapper = mount(BaseChangePassword);
    expect(wrapper.vm).toBeTruthy();
  });
});
