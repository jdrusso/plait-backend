declare module 'california-license-plates' {
    export function search(query: string): Promise<{ available: boolean, src?: string }>;
}
