import { env } from './env';

describe('env', () => {
  afterEach(() => {
    delete process.env.FOO;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    global.window = undefined as any;
  });

  it('should return a value from the server', () => {
    process.env.FOO = 'bar';

    expect(env('FOO')).toBe('bar');
  });

  it('should return a value from the browser', () => {
    Object.defineProperty(global, 'window', {
      value: {
        __ENV: {
          NEXT_PUBLIC_FOO: 'bar',
        },
      },
      writable: true,
    });

    expect(env('NEXT_PUBLIC_FOO')).toBe('bar');
  });

  it('should return undefined when variable does not exist on the server', () => {
    expect(env('BAM_BAM')).toBe(undefined);
  });

  it('should return undefined when variable does not exist in the browser', () => {
    Object.defineProperty(global, 'window', {
      value: {
        __ENV: {
          NEXT_PUBLIC_FOO: 'bar',
        },
      },
      writable: true,
    });

    expect(env('BAM_BAM')).toBe(undefined);
  });
});
