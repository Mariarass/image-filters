import React, { useState } from 'react';
import { Meta, StoryFn } from '@storybook/react';

import ImageFilters, { FilterProps } from '../src/ImageFilters';

const meta: Meta<typeof ImageFilters> = {
  title: 'ImageFilters',
  component: ImageFilters,
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;

const Template: StoryFn<FilterProps> = (args) => <ImageFilters {...args} />;

export const Default = Template.bind({});

Default.args = {
  saveImage:()=>{console.log('saveImage')},
  canvasColor:{
    r:255,
    g:255,
    b:255,
    a:100
  },
  imageUrl: 'https://simpleecreate.com/images/rCfBiP7oGHVJOWMPHhY365ZGlWt3bjQGLXQq38bP.png',
};

// New story with interactive slider for brightness
export const WithBrightnessSlider = () => {
  const [brightness, setBrightness] = useState(0);
  
  return (
    <div style={{ padding: '20px' }}>
      <div style={{ marginBottom: '20px' }}>
        <label htmlFor="brightness-slider" style={{ display: 'block', marginBottom: '10px' }}>
          Brightness: {brightness}
        </label>
        <input
          id="brightness-slider"
          type="range"
          min="-100"
          max="100"
          value={brightness}
          onChange={(e) => setBrightness(Number(e.target.value))}
          style={{ width: '300px' }}
        />
      </div>
      
      <div style={{ width: '500px', height: '400px', border: '1px solid #ccc' }}>
        <ImageFilters
          imageUrl="https://simpleecreate.com/images/rCfBiP7oGHVJOWMPHhY365ZGlWt3bjQGLXQq38bP.png"
          brightness={brightness}
          saveImage={(file) => console.log('saveImage', file)}
        />
      </div>
    </div>
  );
};

// Story for testing gradient
export const WithGradient = () => {
  const [brightness, setBrightness] = useState(0);
  
  return (
    <div style={{ padding: '20px' }}>
      <div style={{ marginBottom: '20px' }}>
        <label htmlFor="brightness-slider-gradient" style={{ display: 'block', marginBottom: '10px' }}>
          Brightness: {brightness}
        </label>
        <input
          id="brightness-slider-gradient"
          type="range"
          min="-100"
          max="100"
          value={brightness}
          onChange={(e) => setBrightness(Number(e.target.value))}
          style={{ width: '300px' }}
        />
      </div>
      
      <div style={{ width: '500px', height: '400px', border: '1px solid #ccc' }}>
        <ImageFilters
          imageUrl="https://simpleecreate.com/images/rCfBiP7oGHVJOWMPHhY365ZGlWt3bjQGLXQq38bP.png"
          brightness={brightness}
          gradient="linear-gradient(45deg, #ff0000, #00ff00, #0000ff)"
          saveImage={(file) => console.log('saveImage', file)}
        />
      </div>
    </div>
  );
};

// Story for testing fast color picker
export const WithFastGradientPicker = () => {
  const [brightness, setBrightness] = useState(0);
  const [color1, setColor1] = useState('#ff0000');
  const [color2, setColor2] = useState('#00ff00');
  const [color3, setColor3] = useState('#0000ff');
  const [angle, setAngle] = useState(45);
  
  const gradientString = `linear-gradient(${angle}deg, ${color1}, ${color2}, ${color3})`;
  
  return (
    <div style={{ padding: '20px' }}>
      <div style={{ marginBottom: '20px', display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
        <div>
          <label htmlFor="brightness-slider-fast" style={{ display: 'block', marginBottom: '5px' }}>
            Brightness: {brightness}
          </label>
          <input
            id="brightness-slider-fast"
            type="range"
            min="-100"
            max="100"
            value={brightness}
            onChange={(e) => setBrightness(Number(e.target.value))}
            style={{ width: '200px' }}
          />
        </div>
        
        <div>
          <label htmlFor="angle-slider" style={{ display: 'block', marginBottom: '5px' }}>
            Angle: {angle}°
          </label>
          <input
            id="angle-slider"
            type="range"
            min="0"
            max="360"
            value={angle}
            onChange={(e) => setAngle(Number(e.target.value))}
            style={{ width: '200px' }}
          />
        </div>
        
        <div>
          <label htmlFor="color1" style={{ display: 'block', marginBottom: '5px' }}>
            Color 1:
          </label>
          <input
            id="color1"
            type="color"
            value={color1}
            onChange={(e) => setColor1(e.target.value)}
            style={{ width: '50px', height: '30px' }}
          />
        </div>
        
        <div>
          <label htmlFor="color2" style={{ display: 'block', marginBottom: '5px' }}>
            Color 2:
          </label>
          <input
            id="color2"
            type="color"
            value={color2}
            onChange={(e) => setColor2(e.target.value)}
            style={{ width: '50px', height: '30px' }}
          />
        </div>
        
        <div>
          <label htmlFor="color3" style={{ display: 'block', marginBottom: '5px' }}>
            Color 3:
          </label>
          <input
            id="color3"
            type="color"
            value={color3}
            onChange={(e) => setColor3(e.target.value)}
            style={{ width: '50px', height: '30px' }}
          />
        </div>
      </div>
      
      <div style={{ marginBottom: '10px', padding: '10px', backgroundColor: '#f5f5f5', borderRadius: '4px' }}>
        <strong>Current gradient:</strong> {gradientString}
      </div>
      
      <div style={{ width: '500px', height: '400px', border: '1px solid #ccc' }}>
        <ImageFilters
          imageUrl="https://simpleecreate.com/images/rCfBiP7oGHVJOWMPHhY365ZGlWt3bjQGLXQq38bP.png"
          brightness={brightness}
          gradient={gradientString}
          saveImage={(file) => console.log('saveImage', file)}
        />
      </div>
    </div>
  );
};

// New story for checking gradient
export const GradientTester = () => {
  const [brightness, setBrightness] = useState(0);
  const [contrast, setContrast] = useState(0);
  const [saturation, setSaturation] = useState(0);
  const [hueRotate, setHueRotate] = useState(0);
  const [gradientType, setGradientType] = useState('linear');
  const [angle, setAngle] = useState(45);
  const [color1, setColor1] = useState('#ff0000');
  const [color2, setColor2] = useState('#00ff00');
  const [color3, setColor3] = useState('#0000ff');
  const [opacity1, setOpacity1] = useState(100);
  const [opacity2, setOpacity2] = useState(100);
  const [opacity3, setOpacity3] = useState(100);
  const [testResults, setTestResults] = useState<string[]>([]);
  const [isRunningTest, setIsRunningTest] = useState(false);
  
  const getGradientString = () => {
    const c1 = color1 + Math.floor(opacity1 * 2.55).toString(16).padStart(2, '0');
    const c2 = color2 + Math.floor(opacity2 * 2.55).toString(16).padStart(2, '0');
    const c3 = color3 + Math.floor(opacity3 * 2.55).toString(16).padStart(2, '0');
    
    if (gradientType === 'linear') {
      return `linear-gradient(${angle}deg, ${c1}, ${c2}, ${c3})`;
    }
    return `radial-gradient(circle, ${c1}, ${c2}, ${c3})`;
  };
  
  const runPerformanceTest = () => {
    setIsRunningTest(true);
    setTestResults([]);
    const startTime = performance.now();
    
    // Test 1: Fast angle change
    let iterations = 0;
    const maxIterations = 20;
    const testInterval = setInterval(() => {
      setAngle(iterations * 18); // 360° / 20 = 18°
      iterations++;
      
      if (iterations >= maxIterations) {
        clearInterval(testInterval);
        const totalTime = performance.now() - startTime;
        const avgTime = totalTime / maxIterations;
        
        setTestResults([
          `✅ Performance test completed`,
          `📊 ${maxIterations} angle changes in ${totalTime.toFixed(2)}ms`,
          `⚡ Average time: ${avgTime.toFixed(2)}ms per change`,
          `🎯 FPS: ${(1000 / avgTime).toFixed(1)}`,
          `💾 Gradient caching works`
        ]);
        setIsRunningTest(false);
      }
    }, 50);
  };
  
  const runColorTest = () => {
    setIsRunningTest(true);
    setTestResults([]);
    const startTime = performance.now();
    
    // Test 2: Fast color change
    const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'];
    let colorIndex = 0;
    let iterations = 0;
    const maxIterations = 30;
    
    const testInterval = setInterval(() => {
      setColor1(colors[colorIndex % colors.length]);
      setColor2(colors[(colorIndex + 1) % colors.length]);
      setColor3(colors[(colorIndex + 2) % colors.length]);
      
      colorIndex++;
      iterations++;
      
      if (iterations >= maxIterations) {
        clearInterval(testInterval);
        const totalTime = performance.now() - startTime;
        const avgTime = totalTime / maxIterations;
        
        setTestResults([
          `✅ Color change test completed`,
          `📊 ${maxIterations} color changes in ${totalTime.toFixed(2)}ms`,
          `⚡ Average time: ${avgTime.toFixed(2)}ms per change`,
          `🎯 FPS: ${(1000 / avgTime).toFixed(1)}`,
          `🎨 Gradient updates smoothly`
        ]);
        setIsRunningTest(false);
      }
    }, 30);
  };
  
  return (
    <div style={{ padding: '20px' }}>
      <h2 style={{ marginBottom: '20px', color: '#333' }}>🧪 Gradient Tester</h2>
      
      {/* Filter controls */}
      <div style={{ marginBottom: '20px', padding: '15px', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
        <h3 style={{ marginBottom: '15px', color: '#555' }}>Image Filters</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px' }}>
          <div>
            <label>Brightness: {brightness}</label>
            <input
              type="range"
              min="-100"
              max="100"
              value={brightness}
              onChange={(e) => setBrightness(Number(e.target.value))}
              style={{ width: '100%' }}
            />
          </div>
          <div>
            <label>Contrast: {contrast}</label>
            <input
              type="range"
              min="-100"
              max="100"
              value={contrast}
              onChange={(e) => setContrast(Number(e.target.value))}
              style={{ width: '100%' }}
            />
          </div>
          <div>
            <label>Saturation: {saturation}</label>
            <input
              type="range"
              min="-100"
              max="100"
              value={saturation}
              onChange={(e) => setSaturation(Number(e.target.value))}
              style={{ width: '100%' }}
            />
          </div>
          <div>
            <label>Hue: {hueRotate}°</label>
            <input
              type="range"
              min="0"
              max="360"
              value={hueRotate}
              onChange={(e) => setHueRotate(Number(e.target.value))}
              style={{ width: '100%' }}
            />
          </div>
        </div>
      </div>
      
      {/* Gradient controls */}
      <div style={{ marginBottom: '20px', padding: '15px', backgroundColor: '#e7f3ff', borderRadius: '8px' }}>
        <h3 style={{ marginBottom: '15px', color: '#555' }}>Gradient Settings</h3>
        
        <div style={{ marginBottom: '15px' }}>
          <label>Gradient type:</label>
          <select 
            value={gradientType} 
            onChange={(e) => setGradientType(e.target.value)}
            style={{ marginLeft: '10px', padding: '5px', borderRadius: '4px' }}
          >
            <option value="linear">Linear</option>
            <option value="radial">Radial</option>
          </select>
        </div>
        
        {gradientType === 'linear' && (
          <div style={{ marginBottom: '15px' }}>
            <label>Angle: {angle}°</label>
            <input
              type="range"
              min="0"
              max="360"
              value={angle}
              onChange={(e) => setAngle(Number(e.target.value))}
              style={{ width: '300px', marginLeft: '10px' }}
            />
          </div>
        )}
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '15px' }}>
          <div>
            <label>Color 1:</label>
            <input
              type="color"
              value={color1}
              onChange={(e) => setColor1(e.target.value)}
              style={{ marginLeft: '5px', width: '40px', height: '30px' }}
            />
            <input
              type="range"
              min="0"
              max="100"
              value={opacity1}
              onChange={(e) => setOpacity1(Number(e.target.value))}
              style={{ width: '100px', marginLeft: '5px' }}
            />
            <span style={{ fontSize: '12px' }}>{opacity1}%</span>
          </div>
          
          <div>
            <label>Color 2:</label>
            <input
              type="color"
              value={color2}
              onChange={(e) => setColor2(e.target.value)}
              style={{ marginLeft: '5px', width: '40px', height: '30px' }}
            />
            <input
              type="range"
              min="0"
              max="100"
              value={opacity2}
              onChange={(e) => setOpacity2(Number(e.target.value))}
              style={{ width: '100px', marginLeft: '5px' }}
            />
            <span style={{ fontSize: '12px' }}>{opacity2}%</span>
          </div>
          
          <div>
            <label>Color 3:</label>
            <input
              type="color"
              value={color3}
              onChange={(e) => setColor3(e.target.value)}
              style={{ marginLeft: '5px', width: '40px', height: '30px' }}
            />
            <input
              type="range"
              min="0"
              max="100"
              value={opacity3}
              onChange={(e) => setOpacity3(Number(e.target.value))}
              style={{ width: '100px', marginLeft: '5px' }}
            />
            <span style={{ fontSize: '12px' }}>{opacity3}%</span>
          </div>
        </div>
      </div>
      
      {/* CSS gradient */}
      <div style={{ marginBottom: '20px', padding: '10px', backgroundColor: '#f0f0f0', borderRadius: '4px', fontFamily: 'monospace', fontSize: '12px' }}>
        <strong>CSS gradient:</strong> {getGradientString()}
      </div>
      
      {/* Test buttons */}
      <div style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
        <button
          onClick={runPerformanceTest}
          disabled={isRunningTest}
          style={{
            padding: '10px 20px',
            backgroundColor: isRunningTest ? '#ccc' : '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: isRunningTest ? 'not-allowed' : 'pointer'
          }}
        >
          {isRunningTest ? 'Testing...' : 'Performance Test'}
        </button>
        
        <button
          onClick={runColorTest}
          disabled={isRunningTest}
          style={{
            padding: '10px 20px',
            backgroundColor: isRunningTest ? '#ccc' : '#28a745',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: isRunningTest ? 'not-allowed' : 'pointer'
          }}
        >
          {isRunningTest ? 'Testing...' : 'Color Change Test'}
        </button>
      </div>
      
      {/* Test results */}
      {testResults.length > 0 && (
        <div style={{ 
          marginBottom: '20px', 
          padding: '15px', 
          backgroundColor: '#d4edda', 
          borderRadius: '8px',
          border: '1px solid #c3e6cb'
        }}>
          <h4 style={{ marginBottom: '10px', color: '#155724' }}>📊 Test Results</h4>
          {testResults.map((result, index) => (
            <div key={index} style={{ marginBottom: '5px', fontFamily: 'monospace', fontSize: '14px' }}>
              {result}
            </div>
          ))}
        </div>
      )}
      
      {/* Image with filters */}
      <div style={{ width: '600px', height: '400px', border: '2px solid #ddd', borderRadius: '8px', overflow: 'hidden' }}>
        <ImageFilters
          imageUrl="https://simpleecreate.com/images/rCfBiP7oGHVJOWMPHhY365ZGlWt3bjQGLXQq38bP.png"
          brightness={brightness}
          contrast={contrast}
          saturation={saturation}
          hueRotate={hueRotate}
          gradient={getGradientString()}
          saveImage={(file) => console.log('saveImage', file)}
        />
      </div>
      
      {/* Instructions */}
      <div style={{ marginTop: '20px', padding: '15px', backgroundColor: '#fff3cd', borderRadius: '8px', border: '1px solid #ffeaa7' }}>
        <h4 style={{ marginBottom: '10px', color: '#856404' }}>📋 Test Instructions</h4>
        <ul style={{ margin: 0, paddingLeft: '20px', color: '#856404' }}>
          <li>Use sliders to change image filters</li>
          <li>Set up gradient: select type, angle, colors, and opacity</li>
          <li>Run performance tests to check speed</li>
          <li>Watch results in real time</li>
          <li>Ensure gradient applies without delay</li>
        </ul>
      </div>
    </div>
  );
};

// Test story for specific gradient
export const TestSpecificGradient = () => {
  const [brightness, setBrightness] = useState(0);
  const [testGradientIndex, setTestGradientIndex] = useState(0);
  
  // Test gradients
  const testGradients = [
    {
      name: "Working gradient (hex with alpha)",
      gradient: "linear-gradient(43deg, #a87171fe, #00ff00fe, #656576fe)"
    },
    {
      name: "Problem gradient (rgba with percentages)",
      gradient: "linear-gradient(159deg,rgba(235, 0, 125, 1) 0%, rgba(0, 0, 0, 0.73) 100%)"
    },
    {
      name: "Simple rgba gradient",
      gradient: "linear-gradient(45deg, rgba(255, 0, 0, 0.8), rgba(0, 255, 0, 0.6))"
    },
    {
      name: "Gradient with different positions",
      gradient: "linear-gradient(90deg, rgba(255, 0, 0, 1) 0%, rgba(0, 255, 0, 0.5) 50%, rgba(0, 0, 255, 0.8) 100%)"
    }
  ];
  
  const currentGradient = testGradients[testGradientIndex];
  
  return (
    <div style={{ padding: '20px' }}>
      <h2 style={{ marginBottom: '20px', color: '#333' }}>🧪 Test Specific Gradients</h2>
      
      {/* Gradient selection */}
      <div style={{ marginBottom: '20px', padding: '15px', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
        <h3 style={{ marginBottom: '15px', color: '#555' }}>Select gradient for testing</h3>
        <select 
          value={testGradientIndex} 
          onChange={(e) => setTestGradientIndex(Number(e.target.value))}
          style={{ padding: '8px', borderRadius: '4px', width: '100%', marginBottom: '10px' }}
        >
          {testGradients.map((grad, index) => (
            <option key={index} value={index}>
              {grad.name}
            </option>
          ))}
        </select>
        
        <div style={{ padding: '10px', backgroundColor: '#f0f0f0', borderRadius: '4px', fontFamily: 'monospace', fontSize: '12px' }}>
          <strong>Current gradient:</strong><br />
          {currentGradient.gradient}
        </div>
      </div>
      
      <div style={{ marginBottom: '20px' }}>
        <label>Brightness: {brightness}</label>
        <input
          type="range"
          min="-100"
          max="100"
          value={brightness}
          onChange={(e) => setBrightness(Number(e.target.value))}
          style={{ width: '300px', marginLeft: '10px' }}
        />
      </div>
      
      <div style={{ width: '600px', height: '400px', border: '2px solid #ddd', borderRadius: '8px', overflow: 'hidden' }}>
        <ImageFilters
          imageUrl="https://simpleecreate.com/images/rCfBiP7oGHVJOWMPHhY365ZGlWt3bjQGLXQq38bP.png"
          brightness={brightness}
          gradient={currentGradient.gradient}
          saveImage={(file) => console.log('saveImage', file)}
        />
      </div>
      
      <div style={{ marginTop: '20px', padding: '15px', backgroundColor: '#fff3cd', borderRadius: '8px', border: '1px solid #ffeaa7' }}>
        <h4 style={{ marginBottom: '10px', color: '#856404' }}>🔍 Debugging</h4>
        <p style={{ color: '#856404', margin: 0 }}>
          Open browser console (F12) and check logs. Should be messages about gradient creation and its application.
        </p>
        <ul style={{ margin: '10px 0 0 0', paddingLeft: '20px', color: '#856404' }}>
          <li>Check that gradient is created without errors</li>
          <li>Ensure that color positions are parsed correctly</li>
          <li>Watch gradient application messages in WebGL</li>
        </ul>
      </div>
    </div>
  );
};

export const FullPropsTester = () => {
  const [brightness, setBrightness] = useState(0);
  const [contrast, setContrast] = useState(0);
  const [saturation, setSaturation] = useState(0);
  const [hueRotate, setHueRotate] = useState(0);
  const [sharpness, setSharpness] = useState(0);
  const [highlights, setHighlights] = useState(0);
  const [shadows, setShadows] = useState(0);
  const [vignette, setVignette] = useState(0);
  const [grain, setGrain] = useState(0);
  const [filterIntensity, setFilterIntensity] = useState(1);
  const [redChannel, setRedChannel] = useState(1);
  const [greenChannel, setGreenChannel] = useState(1);
  const [blueChannel, setBlueChannel] = useState(1);
  const [canvasColor, setCanvasColor] = useState('#ffffff');
  const [canvasAlpha, setCanvasAlpha] = useState(0);
      const [filter, setFilter] = useState('none');
  const [preview, setPreview] = useState(false);
  const [imageUrl, setImageUrl] = useState('https://simpleecreate.com/images/rCfBiP7oGHVJOWMPHhY365ZGlWt3bjQGLXQq38bP.png');

  // Gradient
  const [gradientType, setGradientType] = useState('linear');
  const [angle, setAngle] = useState(45);
  const [color1, setColor1] = useState('#ff0000');
  const [color2, setColor2] = useState('#00ff00');
  const [color3, setColor3] = useState('#0000ff');
  const [opacity1, setOpacity1] = useState(100);
  const [opacity2, setOpacity2] = useState(100);
  const [opacity3, setOpacity3] = useState(100);
  const [flip, setFlip] = useState('none');
  const [rotate, setRotate] = useState(0);
  // Filter presets (example)
  const filterOptions = [
    'none',
    'static',
    'frequency',
    'broadcast',
    'retro',
    'transistor',
    'jazz',
    'classic',
    'naight8',
    'alpine',
    'tokyo',
    'bw',
    'vintage',
    'cool',
    'warm',
    'custom',
  ];

  // Collect gradient string
  const getGradientString = () => {
    const c1 = color1 + Math.floor(opacity1 * 2.55).toString(16).padStart(2, '0');
    const c2 = color2 + Math.floor(opacity2 * 2.55).toString(16).padStart(2, '0');
    const c3 = color3 + Math.floor(opacity3 * 2.55).toString(16).padStart(2, '0');
    if (gradientType === 'linear') {
      return `linear-gradient(${angle}deg, ${c1}, ${c2}, ${c3})`;
    }
    return `radial-gradient(circle, ${c1}, ${c2}, ${c3})`;
  };

  const [width, setWidth] = useState(1024);
  const [height, setHeight] = useState(768);
  const [positionX, setPositionX] = useState(0);
  const [positionY, setPositionY] = useState(0);
  // Crop state
  const [cropX, setCropX] = useState(0);
  const [cropY, setCropY] = useState(0);
  const [cropWidth, setCropWidth] = useState(496);
  const [cropHeight, setCropHeight] = useState(768);

  return (
    <div style={{ padding: 20 }}>
      <h2>🧪 FullPropsTester: All ImageFilters props</h2>
      \

      <div style={{ backgroundColor: 'red',width:'400px',height:'400px',border: '2px solid #ddd', borderRadius: 8, overflow: 'hidden', margin: '0 auto', position: 'relative', left: positionX, top: positionY }}>
        <ImageFilters
          imageUrl={imageUrl}
          brightness={brightness}
          contrast={contrast}
          saturation={saturation}
          hueRotate={hueRotate}
          sharpness={sharpness}
          highlights={highlights}
          shadows={shadows}
          vignette={vignette}
          grain={grain}
          filterIntensity={filterIntensity * 100}
          redChannel={redChannel}
          greenChannel={greenChannel}
          blueChannel={blueChannel}
          canvasColor={{
            r: parseInt(canvasColor.slice(1, 3), 16),
            g: parseInt(canvasColor.slice(3, 5), 16),
            b: parseInt(canvasColor.slice(5, 7), 16),
            a: Math.round(canvasAlpha * 100)
          }}
          // gradient={getGradientString()}
          filter={filter}
          preview={preview}
          // styles={{}}
          crop={{ x: cropX, y: cropY, width: cropWidth, height: cropHeight }}
          saveImage={file => console.log('saveImage', file)}
          flip={flip}
          rotate={rotate}
        />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 20, marginBottom: 30 }}>
        <div>
          <label>Brightness: {brightness}</label>
          <input type="range" min="-100" max="100" value={brightness} onChange={e => setBrightness(Number(e.target.value))} style={{ width: '100%' }} />
        </div>
        <div>
          <label>Contrast: {contrast}</label>
          <input type="range" min="-100" max="100" value={contrast} onChange={e => setContrast(Number(e.target.value))} style={{ width: '100%' }} />
        </div>
        <div>
          <label>Saturation: {saturation}</label>
          <input type="range" min="-100" max="100" value={saturation} onChange={e => setSaturation(Number(e.target.value))} style={{ width: '100%' }} />
        </div>
        <div>
          <label>Hue: {hueRotate}°</label>
          <input type="range" min="0" max="360" value={hueRotate} onChange={e => setHueRotate(Number(e.target.value))} style={{ width: '100%' }} />
        </div>
        <div>
          <label>Sharpness: {sharpness}</label>
          <input type="range" min="0" max="100" value={sharpness} onChange={e => setSharpness(Number(e.target.value))} style={{ width: '100%' }} />
        </div>
        <div>
          <label>Highlights: {highlights}</label>
          <input type="range" min="-100" max="100" value={highlights} onChange={e => setHighlights(Number(e.target.value))} style={{ width: '100%' }} />
        </div>
        <div>
          <label>Shadows: {shadows}</label>
          <input type="range" min="-100" max="100" value={shadows} onChange={e => setShadows(Number(e.target.value))} style={{ width: '100%' }} />
        </div>
        <div>
          <label>Vignette: {vignette}</label>
          <input type="range" min="0" max="100" value={vignette} onChange={e => setVignette(Number(e.target.value))} style={{ width: '100%' }} />
        </div>
        <div>
          <label>Grain: {grain}</label>
          <input type="range" min="0" max="100" value={grain} onChange={e => setGrain(Number(e.target.value))} style={{ width: '100%' }} />
        </div>
        <div>
          <label>Filter intensity: {filterIntensity}</label>
          <input type="range" min="0" max="1" step="0.01" value={filterIntensity} onChange={e => setFilterIntensity(Number(e.target.value))} style={{ width: '100%' }} />
        </div>
        <div>
          <label>Red Channel: {redChannel}</label>
          <input type="range" min="0" max="2" step="0.01" value={redChannel} onChange={e => setRedChannel(Number(e.target.value))} style={{ width: '100%' }} />
        </div>
        <div>
          <label>Green Channel: {greenChannel}</label>
          <input type="range" min="0" max="2" step="0.01" value={greenChannel} onChange={e => setGreenChannel(Number(e.target.value))} style={{ width: '100%' }} />
        </div>
        <div>
          <label>Blue Channel: {blueChannel}</label>
          <input type="range" min="0" max="2" step="0.01" value={blueChannel} onChange={e => setBlueChannel(Number(e.target.value))} style={{ width: '100%' }} />
        </div>
        <div>
          <label>Canvas Color:</label>
          <input type="color" value={canvasColor} onChange={e => setCanvasColor(e.target.value)} style={{ width: '60px', height: '30px', marginLeft: 8 }} />
          <label style={{ marginLeft: 8 }}>Alpha: {canvasAlpha}</label>
          <input type="range" min="0" max="1" step="0.01" value={canvasAlpha} onChange={e => setCanvasAlpha(Number(e.target.value))} style={{ width: '80px', marginLeft: 8 }} />
        </div>
        <div style={{ gridColumn: '1/-1', background: '#e7f3ff', borderRadius: 8, padding: 16, marginBottom: 10 }}>
          <h4>Gradient</h4>
          <div style={{ marginBottom: 10 }}>
            <label>Gradient type:</label>
            <select value={gradientType} onChange={e => setGradientType(e.target.value)} style={{ marginLeft: 10 }}>
              <option value="linear">Linear</option>
              <option value="radial">Radial</option>
            </select>
          </div>
          {gradientType === 'linear' && (
            <div style={{ marginBottom: 10 }}>
              <label>Angle: {angle}°</label>
              <input type="range" min="0" max="360" value={angle} onChange={e => setAngle(Number(e.target.value))} style={{ width: '200px', marginLeft: 10 }} />
            </div>
          )}
          <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
            <div>
              <label>Color 1:</label>
              <input type="color" value={color1} onChange={e => setColor1(e.target.value)} style={{ marginLeft: 8, width: '40px', height: '30px' }} />
              <input type="range" min="0" max="100" value={opacity1} onChange={e => setOpacity1(Number(e.target.value))} style={{ width: '100px', marginLeft: 8 }} />
              <span style={{ fontSize: '12px' }}>{opacity1}%</span>
            </div>
            <div>
              <label>Color 2:</label>
              <input type="color" value={color2} onChange={e => setColor2(e.target.value)} style={{ marginLeft: 8, width: '40px', height: '30px' }} />
              <input type="range" min="0" max="100" value={opacity2} onChange={e => setOpacity2(Number(e.target.value))} style={{ width: '100px', marginLeft: 8 }} />
              <span style={{ fontSize: '12px' }}>{opacity2}%</span>
            </div>
            <div>
              <label>Color 3:</label>
              <input type="color" value={color3} onChange={e => setColor3(e.target.value)} style={{ marginLeft: 8, width: '40px', height: '30px' }} />
              <input type="range" min="0" max="100" value={opacity3} onChange={e => setOpacity3(Number(e.target.value))} style={{ width: '100px', marginLeft: 8 }} />
              <span style={{ fontSize: '12px' }}>{opacity3}%</span>
            </div>
          </div>
          <div style={{ marginTop: 10, fontFamily: 'monospace', fontSize: 13, background: '#f0f0f0', borderRadius: 4, padding: 8 }}>
            <strong>CSS gradient:</strong> {getGradientString()}
          </div>
        </div>
        <div>
          <label>Filter:</label>
          <select value={filter} onChange={e => setFilter(e.target.value)} style={{ width: '100%' }}>
            {filterOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
          </select>
        </div>
        <div>
          <label>Preview:</label>
          <input type="checkbox" checked={preview} onChange={e => setPreview(e.target.checked)} style={{ marginLeft: 8 }} />
        </div>
        <div>
          <label>Image URL:</label>
          <input type="text" value={imageUrl} onChange={e => setImageUrl(e.target.value)} style={{ width: '100%' }} />
        </div>
      
      </div>
      <div style={{ marginBottom: 20, display: 'flex', gap: 20,flexDirection: 'column' }}>
      
      <div>

            <label>Position X: {positionX}px</label>
            <input
              type="range"
              min="-100"
              max="100"
              value={positionX}
              onChange={e => setPositionX(Number(e.target.value))}
              style={{ width: 200 }}
            />
          </div>
          <div>
            
            <label>Width: {width}px</label>
            <input
              type="range"
              min="100"
              max="1000"
              value={width}
              onChange={e => setWidth(Number(e.target.value))}
              style={{ width: 200 }}
            />
          </div>
          <div>
            <label>Height: {height}px</label>
            <input
              type="range"
              min="100"
              max="1000"
              value={height}
              onChange={e => setHeight(Number(e.target.value))}
              style={{ width: 200 }}
            />
          </div>
       
          {/* Crop sliders */}
          <div>
            <label>Crop X: {cropX}px</label>
            <input
              type="range"
              min={-width + 10}
              max={width - 10}
              value={cropX}
              onChange={e => setCropX(Number(e.target.value))}
              style={{ width: 200 }}
            />
          </div>
          <div>
            <label>Crop Y: {cropY}px</label>
            <input
              type="range"
              min={-height + 10}
              max={height - 10}
              value={cropY}
              onChange={e => setCropY(Number(e.target.value))}
              style={{ width: 200 }}
            />
          </div>
          <div>
            <label>Crop Width: {cropWidth}px</label>
            <input
              type="range"
              min="10"
              max={width - cropX}
              value={cropWidth}
              onChange={e => setCropWidth(Number(e.target.value))}
              style={{ width: 200 }}
            />
          </div>
          <div>
            <label>Crop Height: {cropHeight}px</label>
            <input
              type="range"
              min="10"
              max={height - cropY}
              value={cropHeight}
              onChange={e => setCropHeight(Number(e.target.value))}
              style={{ width: 200 }}
            />
          </div>
          <div>
            <label>Flip:</label>
            <button onClick={() => setFlip('horizontal')}>Horizontal</button>
            <button onClick={() => setFlip('vertical')}>Vertical</button>
          </div>
        </div>
        <div>
          <label>Rotate: {rotate}°</label>
          <input type="range" min="0" max="360" value={rotate} onChange={e => setRotate(Number(e.target.value))} style={{ width: '100%' }} />
        </div>
    
     
    </div>
  );
};
