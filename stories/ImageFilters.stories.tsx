import React from 'react';
import { Meta, StoryFn } from '@storybook/react';

import ImageFilters, { FilterProps } from '../src/ImageFilters';

const meta: Meta<typeof ImageFilters> = {
  title: 'ImageFilters',
  component: ImageFilters,
  argTypes: {
    children: {
      control: {
        type: 'text',
      },
    },
  },
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;

const Template: StoryFn<FilterProps> = (args) => <ImageFilters {...args} />;

export const Default = Template.bind({});

Default.args = {
  saveImage:()=>{},
  imageUrl: 'https://static.vecteezy.com/system/resources/previews/028/627/212/non_2x/photorealistic-panoramic-view-of-the-beautiful-natural-landscape-on-the-edge-of-the-lake-in-the-forest-created-with-ai-generative-free-photo.jpg',
};
