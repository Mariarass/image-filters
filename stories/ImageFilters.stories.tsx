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
  saveImage:()=>{console.log('saveImage')},
  gradient:'radial-gradient(circle,rgba(63, 94, 251, 0.28) 0%, rgba(252, 70, 107, 1) 100%)',
  imageUrl: 'https://simpleecreate.com/images/rCfBiP7oGHVJOWMPHhY365ZGlWt3bjQGLXQq38bP.png',
};
