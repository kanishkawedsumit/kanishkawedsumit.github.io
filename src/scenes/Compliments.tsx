import { InvitationScroll } from './FamilyScroll';
import { asset } from '../lib/assets';

interface ComplimentsProps {
  config: {
    compliments: string[];
  };
}

export default function Compliments({ config }: ComplimentsProps) {
  if (!config.compliments?.length) return null;

  return (
    <section
      className="scene"
      style={{ minHeight: 'auto', padding: 0, background: '#f6f1e6', position: 'relative' }}
    >
      <div
        aria-hidden="true"
        style={{
          width: '100%',
          height: '34px',
          backgroundImage: `url('${asset('assets/torn-paper-edge.svg')}')`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'bottom center',
          backgroundColor: '#7a1f33',
        }}
      />
      <div style={{ padding: '.7rem 1.25rem .5rem' }}>
        <InvitationScroll title="With Best Compliments From:" lines={config.compliments} variant="compact" />
      </div>
    </section>
  );
}
