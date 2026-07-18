import React from 'react';

export interface PropDef {
  name: string;
  type: string;
  default?: string;
  description: React.ReactNode;
}

export function PropsTable({ data }: { data: PropDef[] }) {
  if (!data || data.length === 0) return null;

  return (
    <div className="my-6 w-full overflow-hidden rounded-lg border border-border bg-background shadow-sm">
      <div className="w-full overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-muted/50 border-b border-border">
            <tr>
              <th className="px-4 py-3 font-medium text-foreground w-[15%]">Prop</th>
              <th className="px-4 py-3 font-medium text-foreground w-[25%]">Type</th>
              <th className="px-4 py-3 font-medium text-foreground w-[15%]">Default</th>
              <th className="px-4 py-3 font-medium text-foreground w-[45%]">Description</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {data.map((prop, i) => (
              <tr key={i} className="hover:bg-muted/30 transition-colors">
                <td className="px-4 py-3 font-mono text-xs text-indigo-500 font-medium">
                  {prop.name}
                </td>
                <td className="px-4 py-3 font-mono text-xs text-pink-500 whitespace-nowrap">
                  {prop.type}
                </td>
                <td className="px-4 py-3 font-mono text-xs text-muted-foreground">
                  {prop.default ? (
                    <span className="bg-muted px-1.5 py-0.5 rounded-md">{prop.default}</span>
                  ) : (
                    <span className="text-muted-foreground/50">-</span>
                  )}
                </td>
                <td className="px-4 py-3 text-muted-foreground">
                  {prop.description}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
