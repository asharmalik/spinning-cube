import React from 'react';
// import { Story, Meta } from '@storybook/react/types-6-0';
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
        'https://path-to-your-image1.jpg',
        'https://path-to-your-image2.jpg',
        'https://path-to-your-image3.jpg',
        'https://path-to-your-image4.jpg',
        'https://path-to-your-image5.jpg',
        'https://path-to-your-image6.jpg'
    ],
};
