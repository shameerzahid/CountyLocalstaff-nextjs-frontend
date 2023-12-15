"use client";

function Tab({ children }: { name: string, children: React.ReactNode }) {
  return <div className="tab-content-panel">{children}</div>;
}

export default Tab;
