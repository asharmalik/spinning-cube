import React from 'react';
import type { Meta, StoryFn } from '@storybook/react';

import SpinningCube, { SpinningCubeProps } from './SpinningCube';

export default {
    title: 'SpinningCube',
    component: SpinningCube,
} as Meta;

const Template: StoryFn<SpinningCubeProps> = (args) => <SpinningCube {...args} />;

export const Default = Template.bind({});
Default.args = {
    imageUrls: [
        './cube-side.png',
        './cube-side.png',
        './cube-side.png',
        './cube-side.png',
        './cube-side.png',
        './cube-side.png',
    ],
    rotationSpeed: 0.00625,
    size: 250
};

Default.argTypes = {
    rotationSpeed: {
        control: {
            type: 'number',
            min: 0,
            max: 1,
            step: 0.001,
        },
    },
};
