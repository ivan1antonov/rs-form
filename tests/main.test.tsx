import * as ReactDOMClient from 'react-dom/client';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import type { Mock } from 'vitest';

vi.mock('react-dom/client', () => ({
  createRoot: vi.fn(() => ({
    render: vi.fn(),
  })),
}));

describe('main.tsx', () => {
  let createRootMock: Mock;

  beforeEach(() => {
    document.body.innerHTML = '<div id="root"></div>';
    vi.resetModules();
    createRootMock = ReactDOMClient.createRoot as unknown as Mock;
  });

  afterEach(() => {
    document.body.innerHTML = '';
    vi.resetAllMocks();
  });

  it('calls createRoot and render', async () => {
    await import('../src/main.tsx');

    expect(createRootMock).toHaveBeenCalledWith(
      document.getElementById('root')
    );

    const rootInstance = createRootMock.mock.results[0].value;
    expect(rootInstance.render).toHaveBeenCalled();
  });

  it('throws error if root container is missing', async () => {
    document.body.innerHTML = '';

    await expect(async () => {
      await import('../src/main.tsx');
    }).rejects.toThrow('Sorry, root does not exist');
  });
});
