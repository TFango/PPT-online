export function createCount() {
  const wrap = document.createElement("div");
  wrap.className = "count";

  wrap.innerHTML = `
  <svg viewBox="0 0 200 200" class="count-svg">
    <circle cx="100" cy="100" r="80"
      fill="none" stroke="#e6e6e6" stroke-width="20" />
    <circle id="arc"
      cx="100" cy="100" r="80"
      fill="none" stroke="#000" stroke-width="20"
      stroke-linecap="round"
      transform="rotate(-90 100 100)" />
    <text id="count"
      x="100" y="100" text-anchor="middle"
      dominant-baseline="middle"
      font-size="72" font-weight="700">
      3
    </text>
  </svg>
  `;

  const arc = wrap.querySelector<SVGCircleElement>("#arc")!;
  const label = wrap.querySelector<SVGTextElement>("#count")!;

  const r = arc.r.baseVal.value;
  const C = 2 * Math.PI * r;
  arc.style.strokeDasharray = String(C);

  let raf: number | null = null;
  let startTime = 0;
  let totalMs = 3000;

  function frame(now: number) {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / totalMs, 1);
    const remaining = Math.max(totalMs - elapsed, 0);

    arc.style.strokeDashoffset = String(C * (1 - progress));
    label.textContent = String(Math.ceil(remaining / 1000));

    if (progress === 1) {
      wrap.dispatchEvent(new Event("done"));
      raf = null;
      return;
    }
    raf = requestAnimationFrame(frame);
  }

  function start(ms = 3000) {
    totalMs = ms;
    startTime = performance.now();
    arc.style.strokeDashoffset = String(C);
    if (raf) cancelAnimationFrame(raf);
    raf = requestAnimationFrame(frame);
  }

  function destroy() {
    if (raf) cancelAnimationFrame(raf);
    wrap.remove();
  }

  return { el: wrap, start, destroy };
}
