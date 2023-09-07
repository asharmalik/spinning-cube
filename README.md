# Spinning Cube React Component 🌀

A visually captivating 3D spinning cube for React applications, made easy with React Three Fiber. Perfect for any UI needing a touch of 3D brilliance. Easily customizable with different images and rotation speeds. Check out the [Storybook](https://asharmalik.github.io/spinning-cube/?path=/story/spinningcube--default) for a live demo and documentation.

## Features

- 🖼 Easily customizable with different images on cube faces.
- 🔄 Adjustable rotation speed.
- 📏 Adjustable size.
- 📚 Fully integrated with Storybook for component documentation and testing.

## Installation

Using npm:

```bash
npm install spinning-cube
```


## Usage
Here's a quick example
```javascript
import SpinningCube from 'spinning-cube';

function MyApp() {
    return (
        <SpinningCube 
            imageUrls={[
                'url1',
                'url2',
                'url3',
                'url4',
                'url5',
                'url6'
            ]}
            rotationSpeed={0.00625}
            size={250}
        />
    );
}
```

## Props


| Prop          | Type      | Description                                     |
|---------------|-----------|-------------------------------------------------|
| imageUrls     | string[]  | URLs of images for the cube faces.              |
| rotationSpeed | number    | Speed of cube rotation. Default is 0.00625.     |
| size          | number    | Width/height of the cube in px. Default is 250. |
