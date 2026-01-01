export function FlowerInfo({ flower, onClose }) {
  if (!flower) return null

  return (
    <div style={{
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: '85vw',
      height: '80vh',
      backgroundColor: '#fff',
      zIndex: 2000,
      display: 'flex',
      flexDirection: 'column',
      fontFamily: '"Helvetica", "Arial", sans-serif',
      boxShadow: '0 20px 60px rgba(0,0,0,0.4)',
      color: '#1a1a1a'
    }}>
      {/* Header */}
      <div style={{ padding: '40px 60px', borderBottom: '1px solid #eee', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
        <div>
          <h1 style={{ margin: 0, fontSize: '3.5rem', fontWeight: '700', letterSpacing: '-2px' }}>{flower.name}</h1>
          <p style={{ margin: '5px 0 0 0', fontStyle: 'italic', color: '#888', fontSize: '1.2rem' }}>{flower.scientificName}</p>
        </div>
        <button onClick={onClose} style={{ background: '#1a1a1a', color: '#fff', border: 'none', padding: '12px 24px', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 'bold', textTransform: 'uppercase' }}>
          Back to Greenhouse
        </button>
      </div>

      {/* Content */}
      <div style={{ display: 'flex', flex: 1, padding: '60px', gap: '80px', overflowY: 'auto' }}>
        <div style={{ flex: 1 }}>
          <div style={{ marginBottom: '40px' }}>
            <h3 style={{ fontSize: '0.7rem', textTransform: 'uppercase', color: '#aaa', letterSpacing: '2px', marginBottom: '15px' }}>Classification</h3>
            <p style={{ margin: '5px 0' }}><strong>Family:</strong> {flower.family}</p>
            <p style={{ margin: '5px 0' }}><strong>Origin:</strong> {flower.origin}</p>
          </div>
          
          <div>
            <h3 style={{ fontSize: '0.7rem', textTransform: 'uppercase', color: '#aaa', letterSpacing: '2px', marginBottom: '15px' }}>Language of Flowers</h3>
            <p style={{ fontSize: '1.3rem', lineHeight: '1.5', fontWeight: '300' }}>{flower.language}</p>
          </div>
        </div>

        <div style={{ flex: 1.5 }}>
          <h3 style={{ fontSize: '0.7rem', textTransform: 'uppercase', color: '#aaa', letterSpacing: '2px', marginBottom: '15px' }}>Description</h3>
          <p style={{ fontSize: '1.1rem', lineHeight: '1.8', marginBottom: '30px' }}>{flower.info}</p>
          
          <div style={{ backgroundColor: '#f5f5f5', padding: '30px', borderLeft: '2px solid #1a1a1a' }}>
            <h3 style={{ fontSize: '0.7rem', textTransform: 'uppercase', marginBottom: '10px' }}>Botanical Note</h3>
            <p style={{ margin: 0, fontSize: '1rem', lineHeight: '1.6' }}>{flower.fact}</p>
          </div>
        </div>
      </div>
    </div>
  )
}