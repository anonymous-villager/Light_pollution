import { useState, useEffect } from 'react';
import { CelestialBody } from '../services/astronomy';

interface UIOverlayProps {
    searchTerm: string;
    onSearch: (term: string) => void;
    showZodiacStars: boolean;
    setShowZodiacStars: (show: boolean) => void;
    showCelestialGrid: boolean;
    setShowCelestialGrid: (show: boolean) => void;
    activeBody: CelestialBody | null;
    targetBody?: CelestialBody | null;
    pollutionStrength: number;
    onPollutionChange: (val: number) => void;
}

const UIOverlay = ({
    searchTerm,
    onSearch,
    showZodiacStars,
    setShowZodiacStars,
    showCelestialGrid,
    setShowCelestialGrid,
    activeBody,
    targetBody,
    pollutionStrength,
    onPollutionChange
}: UIOverlayProps) => {
    const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());
    const [currentDate, setCurrentDate] = useState(new Date().toLocaleDateString());

    useEffect(() => {
        const timer = setInterval(() => {
            const now = new Date();
            setCurrentTime(now.toLocaleTimeString());
            setCurrentDate(now.toLocaleDateString());
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const bodyInfo = activeBody || targetBody;

    return (
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
            {/* Top Right: Clock */}
            <div style={{ position: 'absolute', top: '20px', right: '20px', color: 'white', fontFamily: 'monospace', textAlign: 'right' }}>
                <div style={{ fontSize: '24px' }}>{currentTime}</div>
                <div style={{ fontSize: '14px', color: '#aaa' }}>{currentDate}</div>
            </div>

            {/* Bottom Left: Controls */}
            <div style={{ position: 'absolute', bottom: '20px', left: '20px', pointerEvents: 'auto', background: 'rgba(0,0,0,0.7)', padding: '20px', borderRadius: '8px', color: 'white', fontFamily: 'sans-serif' }}>
                <h3 style={{ margin: '0 0 15px 0', fontSize: '18px', borderBottom: '1px solid #444', paddingBottom: '10px' }}>Controls</h3>

                <div style={{ marginBottom: '15px' }}>
                    <input
                        type="text"
                        placeholder="Search Star/Planet..."
                        style={{ background: '#222', border: '1px solid #444', color: 'white', padding: '8px', borderRadius: '4px', width: '200px' }}
                        value={searchTerm}
                        onChange={(e) => onSearch(e.target.value)}
                    />
                </div>

                <div style={{ marginBottom: '10px' }}>
                    <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                        <input
                            type="checkbox"
                            checked={showZodiacStars}
                            onChange={(e) => setShowZodiacStars(e.target.checked)}
                            style={{ marginRight: '10px' }}
                        />
                        Show Constellations
                    </label>
                </div>

                <div style={{ marginBottom: '15px' }}>
                    <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                        <input
                            type="checkbox"
                            checked={showCelestialGrid}
                            onChange={(e) => setShowCelestialGrid(e.target.checked)}
                            style={{ marginRight: '10px' }}
                        />
                        Show Celestial Grid
                    </label>
                </div>

                <div style={{ marginBottom: '10px' }}>
                    <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px' }}>
                        Light Pollution: {pollutionStrength}
                    </label>
                    <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.1"
                        value={pollutionStrength}
                        onChange={(e) => onPollutionChange(parseFloat(e.target.value))}
                        style={{ width: '100%' }}
                    />
                </div>
            </div>

            {/* Top Left: Info Panel */}
            {bodyInfo && (
                <div style={{ position: 'absolute', top: '20px', left: '20px', background: 'rgba(0,0,0,0.8)', padding: '20px', borderRadius: '8px', color: 'white', maxWidth: '300px', borderLeft: `4px solid ${bodyInfo.color}` }}>
                    <h2 style={{ margin: '0 0 5px 0', fontSize: '24px' }}>{bodyInfo.name}</h2>
                    <div style={{ fontSize: '14px', color: '#aaa', marginBottom: '10px' }}>ID: {bodyInfo.id}</div>
                    {bodyInfo.description && <div style={{ fontSize: '14px', lineHeight: '1.4' }}>{bodyInfo.description}</div>}

                    {/* Add more details here later from stars.json or horizons */}
                    <div style={{ marginTop: '10px', fontSize: '12px', color: '#666' }}>
                        Position: {bodyInfo.position.x.toFixed(0)}, {bodyInfo.position.y.toFixed(0)}, {bodyInfo.position.z.toFixed(0)}
                    </div>
                </div>
            )}
        </div>
    );
};

export default UIOverlay;
