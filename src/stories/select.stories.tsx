import type { Meta, StoryObj } from "@storybook/react";
import { SelectExample } from "./select-example";

const meta: Meta<typeof SelectExample> = {
  component: SelectExample,
};

export default meta;
type Story = StoryObj<typeof SelectExample>;

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/api/csf
 * to learn how to use render functions.
 */
export const Basic: Story = {
  render: () => <SelectExample />,
};
