import type { Meta, StoryObj } from "@storybook/react";
import { TableDemo } from "./table-example";

const meta: Meta<typeof TableDemo> = {
  component: TableDemo,
};

export default meta;
type Story = StoryObj<typeof TableDemo>;

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/api/csf
 * to learn how to use render functions.
 */
export const Primary: Story = {
  render: () => <TableDemo />,
};
