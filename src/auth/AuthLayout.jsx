export default function AuthLayout({ children }) {
  return (
    <main className="w-full max-w-300 grid grid-cols-1 md:grid-cols-2 bg-surface-container-lowest rounded-3xl overflow-hidden soft-shadow min-h-[700px]">
      {children}
    </main>
  );
}
