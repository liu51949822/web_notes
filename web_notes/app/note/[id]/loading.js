export default function NoteSkeleton() {
  return (
    <div className="note skeleton-container"
    role="progressbar"
    aria-busy="true">
        <div className="note header">
            <div className="note-title skeleton"
            style={{
                height: '3em',
                width: '65%',
                marginInline: '12px 1em'
            }}/>
            <div className="skeleton skeleton--button"
            style={{
                height: '8em',
                width: '2.5em'
            }}/>
        </div> 
        <div className="note-preview">
        <div className="skeleton v-stack" style={{ height: '1.5em' }} />
        <div className="skeleton v-stack" style={{ height: '1.5em' }} />
        <div className="skeleton v-stack" style={{ height: '1.5em' }} />
        <div className="skeleton v-stack" style={{ height: '1.5em' }} />
        <div className="skeleton v-stack" style={{ height: '1.5em' }} />
      </div>
    </div>
  );
}