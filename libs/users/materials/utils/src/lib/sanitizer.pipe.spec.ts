import { SanitizerPipe } from './sanitizer.pipe';

describe('SanitizerPipe', () => {
  it('create an instance', () => {
    const pipe = new SanitizerPipe();
    expect(pipe).toBeTruthy();
  });
});
