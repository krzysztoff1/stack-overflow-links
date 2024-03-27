import { Button } from "@/components/ui/button";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Button> = {
  component: Button,
};

export default meta;
type Story = StoryObj<typeof Button>;

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/api/csf
 * to learn how to use render functions.
 */
export const Primary: Story = {
  render: () => <Button variant={"default"}>Default</Button>,
};

export const Secondary: Story = {
  render: () => <Button variant={"secondary"}>Secondary</Button>,
};

export const Destructive: Story = {
  render: () => <Button variant={"destructive"}>Destructive</Button>,
};

export const Ghost: Story = {
  render: () => <Button variant={"ghost"}>Ghost</Button>,
};
